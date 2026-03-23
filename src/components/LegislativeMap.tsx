import { geoAlbersUsa, geoArea, geoPath } from 'd3-geo'
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { feature } from 'topojson-client'
import usAtlas from 'us-atlas/states-10m.json'
import { FIFTY_STATE_CODES, STATE_FIPS_TO_CODE, STATE_LABEL_OFFSETS } from '../stateMeta'
import { STATE_PROFILE_META } from '../stateProfileMeta'
import type { StateDelegationSummary } from '../types'

const MAP_WIDTH = 975
const MAP_HEIGHT = 610
const EARTH_RADIUS_KM = 6371.0088
const SQ_MILES_PER_SQ_KM = 0.3861021585

const DENSITY_BUCKETS = [
  { color: '#f4f8fc', label: 'Under 10', max: 10 },
  { color: '#e3eef8', label: '10-25', max: 25 },
  { color: '#d0e1f2', label: '25-50', max: 50 },
  { color: '#adc9e7', label: '50-100', max: 100 },
  { color: '#80abd7', label: '100-250', max: 250 },
  { color: '#4c7eb4', label: '250-500', max: 500 },
  { color: '#234a7d', label: '500+', max: Number.POSITIVE_INFINITY },
] as const

type AtlasObjects = {
  nation: GeometryCollection
  states: GeometryCollection
}

type MapFeature = {
  centroid: [number, number]
  densityPerSquareMile: number
  hasOffset: boolean
  labelPosition: [number, number]
  path: string
  stateCode: (typeof FIFTY_STATE_CODES)[number]
}

const atlas = usAtlas as unknown as Topology<AtlasObjects>
const nationFeature = feature(
  atlas,
  atlas.objects.nation,
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>
const stateCollection = feature(
  atlas,
  atlas.objects.states,
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>
const projection = geoAlbersUsa().fitSize([MAP_WIDTH, MAP_HEIGHT], nationFeature)
const pathGenerator = geoPath(projection)
const densityFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
})

function getStateAreaSquareMiles(stateFeature: FeatureCollection<Geometry, GeoJsonProperties>['features'][number]) {
  const areaSqKm = geoArea(stateFeature) * EARTH_RADIUS_KM * EARTH_RADIUS_KM
  return areaSqKm * SQ_MILES_PER_SQ_KM
}

function getDensityBucket(densityPerSquareMile: number) {
  return DENSITY_BUCKETS.find((bucket) => densityPerSquareMile < bucket.max) ?? DENSITY_BUCKETS.at(-1)!
}

const mapFeatures: MapFeature[] = stateCollection.features
  .map((stateFeature) => {
    const rawId = String(stateFeature.id ?? '').padStart(2, '0')
    const stateCode = STATE_FIPS_TO_CODE[rawId]

    if (!stateCode) {
      return null
    }

    const path = pathGenerator(stateFeature)
    const centroid = pathGenerator.centroid(stateFeature)

    if (!path || Number.isNaN(centroid[0]) || Number.isNaN(centroid[1])) {
      return null
    }

    const population = STATE_PROFILE_META[stateCode]?.population

    if (!population) {
      return null
    }

    const areaSquareMiles = getStateAreaSquareMiles(stateFeature)
    const offset = STATE_LABEL_OFFSETS[stateCode]
    const labelPosition: [number, number] = [
      centroid[0] + (offset?.dx ?? 0),
      centroid[1] + (offset?.dy ?? 0),
    ]

    return {
      centroid: [centroid[0], centroid[1]],
      densityPerSquareMile: population / areaSquareMiles,
      hasOffset: Boolean(offset),
      labelPosition,
      path,
      stateCode,
    }
  })
  .filter((value): value is MapFeature => value !== null)

export function LegislativeMap({
  onSelectState,
  selectedStateCode,
  summaries,
}: {
  onSelectState: (stateCode: string) => void
  selectedStateCode: string | null
  summaries: StateDelegationSummary[]
}) {
  const summaryByCode = new Map(summaries.map((summary) => [summary.stateCode, summary]))

  return (
    <section className="section-card map-card">
      <div className="map-stage">
        <svg
          aria-label="Map of the United States by state"
          className="us-map"
          role="img"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        >
          {mapFeatures.map((mapFeature) => {
            const summary = summaryByCode.get(mapFeature.stateCode)
            const dominantAlignment = summary?.dominantAlignment ?? 'split'
            const houseCount = summary?.houseCount ?? 0
            const isSelected = mapFeature.stateCode === selectedStateCode
            const hasCallout = mapFeature.hasOffset
            const densityBucket = getDensityBucket(mapFeature.densityPerSquareMile)
            const densityLabel = densityFormatter.format(mapFeature.densityPerSquareMile)

            return (
              <g key={mapFeature.stateCode}>
                <path
                  aria-label={`${summary?.stateName ?? mapFeature.stateCode}, ${densityLabel} people per square mile, ${houseCount} representatives`}
                  className={`us-state${isSelected ? ' is-selected' : ''}`}
                  d={mapFeature.path}
                  onClick={() => onSelectState(mapFeature.stateCode)}
                  role="button"
                  style={{ fill: densityBucket.color }}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectState(mapFeature.stateCode)
                    }
                  }}
                />

                {hasCallout ? (
                  <line
                    className="state-callout"
                    x1={mapFeature.centroid[0]}
                    x2={mapFeature.labelPosition[0]}
                    y1={mapFeature.centroid[1]}
                    y2={mapFeature.labelPosition[1]}
                  />
                ) : null}

                <g
                  className={`state-label state-label--${dominantAlignment}${isSelected ? ' is-selected' : ''}`}
                  transform={`translate(${mapFeature.labelPosition[0]}, ${mapFeature.labelPosition[1]})`}
                >
                  <text className="state-label__abbr" textAnchor="middle" y="-18">
                    {mapFeature.stateCode}
                  </text>
                  <circle className="state-label__badge" r="14" />
                  <text className="state-label__count" textAnchor="middle" y="5">
                    {houseCount}
                  </text>
                </g>
              </g>
            )
          })}
        </svg>

        <div className="map-legend">
          {DENSITY_BUCKETS.map((bucket) => (
            <span className="map-legend__item" key={bucket.label}>
              <i className="map-legend__swatch" style={{ background: bucket.color }} />
              {bucket.label} people / sq. mi.
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
