import { geoAlbersUsa, geoPath } from 'd3-geo'
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { feature } from 'topojson-client'
import usAtlas from 'us-atlas/states-10m.json'
import { FIFTY_STATE_CODES, STATE_FIPS_TO_CODE, STATE_LABEL_OFFSETS } from '../stateMeta'
import type { StateDelegationSummary } from '../types'

const MAP_WIDTH = 975
const MAP_HEIGHT = 610

type AtlasObjects = {
  nation: GeometryCollection
  states: GeometryCollection
}

type MapFeature = {
  centroid: [number, number]
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

    const offset = STATE_LABEL_OFFSETS[stateCode]
    const labelPosition: [number, number] = [
      centroid[0] + (offset?.dx ?? 0),
      centroid[1] + (offset?.dy ?? 0),
    ]

    return {
      centroid: [centroid[0], centroid[1]],
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

            return (
              <g key={mapFeature.stateCode}>
                <path
                  aria-label={`${summary?.stateName ?? mapFeature.stateCode}, ${houseCount} representatives`}
                  className={`us-state us-state--${dominantAlignment}${isSelected ? ' is-selected' : ''}`}
                  d={mapFeature.path}
                  onClick={() => onSelectState(mapFeature.stateCode)}
                  role="button"
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
                  className={`state-label${isSelected ? ' is-selected' : ''}`}
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
          <span className="map-legend__item">
            <i className="map-legend__swatch map-legend__swatch--democratic" />
            Democratic-leaning delegation
          </span>
          <span className="map-legend__item">
            <i className="map-legend__swatch map-legend__swatch--republican" />
            Republican-leaning delegation
          </span>
          <span className="map-legend__item">
            <i className="map-legend__swatch map-legend__swatch--split" />
            Split or tied
          </span>
        </div>
      </div>
    </section>
  )
}
