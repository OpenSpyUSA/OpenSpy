import { useDeferredValue, useEffect, useState } from 'react'
import { geoAlbersUsa, geoArea, geoPath } from 'd3-geo'
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { feature } from 'topojson-client'
import usAtlas from 'us-atlas/states-10m.json'
import { INFRASTRUCTURE_MARKERS } from '../infrastructureMapData'
import {
  FIFTY_STATE_CODES,
  STATE_CODE_TO_NAME,
  STATE_FIPS_TO_CODE,
  STATE_LABEL_OFFSETS,
} from '../stateMeta'
import { STATE_PROFILE_META } from '../stateProfileMeta'
import type { InfrastructureCategory, InfrastructureMarker, StateDelegationSummary } from '../types'

const MAP_WIDTH = 975
const MAP_HEIGHT = 610
const EARTH_RADIUS_KM = 6371.0088
const SQ_MILES_PER_SQ_KM = 0.3861021585
const CLUSTER_MEMBER_PREVIEW_LIMIT = 8
const AIRPORT_ICON_PATH =
  'M 0 -4.2 L 0.95 -1.15 L 3.5 -0.35 L 3.5 0.35 L 0.95 1.15 L 0 4.2 L -0.95 4.2 L -0.62 1.45 L -3.15 2.2 L -3.15 1.3 L -0.62 0.38 L -0.62 -0.38 L -3.15 -1.3 L -3.15 -2.2 L -0.62 -1.45 L -0.95 -4.2 Z'
const CLUSTER_CELL_SIZE: Record<InfrastructureCategory, number> = {
  airport: 24,
  datacenter: 34,
  university: 26,
  nuclear: 28,
}

const OVERLAY_CATEGORY_SORT_ORDER: Record<InfrastructureCategory, number> = {
  airport: 0,
  datacenter: 1,
  university: 2,
  nuclear: 3,
}

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

type MapInfrastructureMarker = InfrastructureMarker & {
  x: number
  y: number
}

type OverlayScope = 'all' | 'featured'

type InfrastructureMarkerEntity = {
  category: InfrastructureCategory
  id: string
  kind: 'marker'
  marker: MapInfrastructureMarker
  members: [MapInfrastructureMarker]
  x: number
  y: number
}

type InfrastructureClusterEntity = {
  category: InfrastructureCategory
  count: number
  id: string
  kind: 'cluster'
  members: MapInfrastructureMarker[]
  x: number
  y: number
}

type InfrastructureOverlayEntity = InfrastructureMarkerEntity | InfrastructureClusterEntity

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

function isFeaturedInfrastructure(marker: InfrastructureMarker) {
  return marker.importance >= 2
}

function formatOverlayCount(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`
}

function formatOverlayShownSummary(value: number, total: number, singular: string, plural: string) {
  if (value === total) {
    return formatOverlayCount(value, singular, plural)
  }

  return `${value} of ${total} ${total === 1 ? singular : plural} shown`
}

function normalizeOverlayQuery(value: string) {
  return value.trim().toLowerCase()
}

function getOverlayCategoryLabel(category: InfrastructureCategory) {
  if (category === 'airport') {
    return 'Airport'
  }

  if (category === 'datacenter') {
    return 'Datacenter hub'
  }

  if (category === 'university') {
    return 'University'
  }

  return 'Nuclear site'
}

function getOverlayCategoryPluralLabel(category: InfrastructureCategory, count: number) {
  if (category === 'airport') {
    return count === 1 ? 'airport' : 'airports'
  }

  if (category === 'datacenter') {
    return count === 1 ? 'datacenter hub' : 'datacenter hubs'
  }

  if (category === 'university') {
    return count === 1 ? 'university' : 'universities'
  }

  return count === 1 ? 'nuclear site' : 'nuclear sites'
}

function getOverlayTierLabel(marker: InfrastructureMarker) {
  return isFeaturedInfrastructure(marker) ? 'Featured' : 'Expanded'
}

function getOverlayMarkerRadius(marker: InfrastructureMarker) {
  return isFeaturedInfrastructure(marker) ? 7.8 : 6.1
}

function getInfrastructureSearchText(marker: InfrastructureMarker) {
  const stateName = STATE_CODE_TO_NAME[marker.stateCode as keyof typeof STATE_CODE_TO_NAME] ?? ''

  return [
    marker.title,
    marker.subtitle,
    marker.city,
    marker.stateCode,
    stateName,
    marker.code ?? '',
    marker.note,
    getOverlayCategoryLabel(marker.category),
  ]
    .join(' ')
    .toLowerCase()
}

function matchesInfrastructureSearch(marker: InfrastructureMarker, normalizedQuery: string) {
  if (!normalizedQuery) {
    return true
  }

  return getInfrastructureSearchText(marker).includes(normalizedQuery)
}

function getInfrastructureSearchPriority(marker: InfrastructureMarker, normalizedQuery: string) {
  if (!normalizedQuery) {
    return 10
  }

  const code = (marker.code ?? '').toLowerCase()
  const title = marker.title.toLowerCase()
  const city = marker.city.toLowerCase()
  const subtitle = marker.subtitle.toLowerCase()

  if (code === normalizedQuery) {
    return 0
  }

  if (code.startsWith(normalizedQuery)) {
    return 1
  }

  if (title.startsWith(normalizedQuery)) {
    return 2
  }

  if (city.startsWith(normalizedQuery)) {
    return 3
  }

  if (subtitle.startsWith(normalizedQuery)) {
    return 4
  }

  return 5
}

function sortInfrastructureMarkers(
  left: InfrastructureMarker,
  right: InfrastructureMarker,
  normalizedQuery: string,
) {
  const searchPriorityDelta =
    getInfrastructureSearchPriority(left, normalizedQuery) - getInfrastructureSearchPriority(right, normalizedQuery)

  if (searchPriorityDelta !== 0) {
    return searchPriorityDelta
  }

  if (left.sortOrder !== right.sortOrder) {
    return left.sortOrder - right.sortOrder
  }

  if (left.category !== right.category) {
    return OVERLAY_CATEGORY_SORT_ORDER[left.category] - OVERLAY_CATEGORY_SORT_ORDER[right.category]
  }

  return left.title.localeCompare(right.title)
}

function uniqueValues(values: string[]) {
  return [...new Set(values)]
}

function getClusterStateSummary(members: MapInfrastructureMarker[]) {
  const stateCodes = uniqueValues(members.map((member) => member.stateCode))

  if (stateCodes.length === 1) {
    return STATE_CODE_TO_NAME[stateCodes[0] as keyof typeof STATE_CODE_TO_NAME] ?? stateCodes[0]
  }

  if (stateCodes.length === 2) {
    return stateCodes
      .map((stateCode) => STATE_CODE_TO_NAME[stateCode as keyof typeof STATE_CODE_TO_NAME] ?? stateCode)
      .join(' + ')
  }

  if (stateCodes.length <= 4) {
    return stateCodes.join(', ')
  }

  return `${stateCodes.length} states`
}

function getMarkerLocationLabel(marker: InfrastructureMarker) {
  if (marker.city) {
    return `${marker.city}, ${marker.stateCode}`
  }

  return STATE_CODE_TO_NAME[marker.stateCode as keyof typeof STATE_CODE_TO_NAME] ?? marker.stateCode
}

function getClusterTitle(category: InfrastructureCategory, members: MapInfrastructureMarker[]) {
  const cities = uniqueValues(members.map((member) => member.city).filter(Boolean))
  const pluralLabel = getOverlayCategoryPluralLabel(category, members.length)

  if (cities.length === 1) {
    return `${cities[0]} ${pluralLabel}`
  }

  const stateCodes = uniqueValues(members.map((member) => member.stateCode))

  if (stateCodes.length === 1) {
    const stateName = STATE_CODE_TO_NAME[stateCodes[0] as keyof typeof STATE_CODE_TO_NAME] ?? stateCodes[0]
    return `${stateName} ${pluralLabel}`
  }

  if (stateCodes.length === 2) {
    return `${stateCodes.join(' + ')} ${pluralLabel}`
  }

  return `Regional ${pluralLabel}`
}

function getClusterSubtitle(category: InfrastructureCategory, members: MapInfrastructureMarker[]) {
  const countLabel = formatOverlayCount(
    members.length,
    getOverlayCategoryPluralLabel(category, 1),
    getOverlayCategoryPluralLabel(category, 2),
  )

  return `${countLabel} · ${getClusterStateSummary(members)}`
}

function getClusterNote(category: InfrastructureCategory, members: MapInfrastructureMarker[]) {
  const countLabel = formatOverlayCount(
    members.length,
    getOverlayCategoryPluralLabel(category, 1),
    getOverlayCategoryPluralLabel(category, 2),
  )

  return `Nearby ${countLabel} are grouped together in the national view so the map stays readable. Search or open a state to inspect each location separately.`
}

function getCountMarkerRadius(category: InfrastructureCategory, count: number) {
  const base =
    category === 'airport'
      ? 10.5
      : category === 'datacenter'
        ? 11.5
        : category === 'university'
          ? 10.9
          : 11.2
  return Math.min(22, base + Math.sqrt(count) * 1.8)
}

function getCountMarkerLabel(count: number) {
  return count > 99 ? '99+' : String(count)
}

function getCountMarkerSize(count: number) {
  if (count > 99) {
    return 8
  }

  if (count > 9) {
    return 9
  }

  return 10.5
}

function createMarkerEntity(marker: MapInfrastructureMarker): InfrastructureMarkerEntity {
  return {
    category: marker.category,
    id: marker.id,
    kind: 'marker',
    marker,
    members: [marker],
    x: marker.x,
    y: marker.y,
  }
}

function createClusterEntity(category: InfrastructureCategory, members: MapInfrastructureMarker[]) {
  const x = members.reduce((sum, member) => sum + member.x, 0) / members.length
  const y = members.reduce((sum, member) => sum + member.y, 0) / members.length

  return {
    category,
    count: members.length,
    id: `cluster-${category}-${Math.round(x)}-${Math.round(y)}-${members.length}`,
    kind: 'cluster' as const,
    members,
    x,
    y,
  }
}

function buildInfrastructureEntities(
  markers: MapInfrastructureMarker[],
  shouldCluster: boolean,
) {
  if (!shouldCluster) {
    return markers.map((marker) => createMarkerEntity(marker))
  }

  const buckets = new Map<string, MapInfrastructureMarker[]>()

  for (const marker of markers) {
    const cellSize = CLUSTER_CELL_SIZE[marker.category]
    const cellX = Math.round(marker.x / cellSize)
    const cellY = Math.round(marker.y / cellSize)
    const key = `${marker.category}:${cellX}:${cellY}`

    const bucket = buckets.get(key)

    if (bucket) {
      bucket.push(marker)
    } else {
      buckets.set(key, [marker])
    }
  }

  return [...buckets.values()]
    .map((members) => {
      const sortedMembers = [...members].sort((left, right) => left.sortOrder - right.sortOrder)

      if (sortedMembers.length === 1) {
        return createMarkerEntity(sortedMembers[0])
      }

      return createClusterEntity(sortedMembers[0].category, sortedMembers)
    })
    .sort((left, right) => {
      if (left.category !== right.category) {
        return OVERLAY_CATEGORY_SORT_ORDER[left.category] - OVERLAY_CATEGORY_SORT_ORDER[right.category]
      }

      if (left.kind !== right.kind) {
        return left.kind === 'cluster' ? -1 : 1
      }

      if (left.members.length !== right.members.length) {
        return right.members.length - left.members.length
      }

      return left.members[0].sortOrder - right.members[0].sortOrder
    })
}

function getOverlayEntityTitle(entity: InfrastructureOverlayEntity) {
  if (entity.kind === 'marker') {
    return entity.marker.title
  }

  return getClusterTitle(entity.category, entity.members)
}

function getOverlayEntitySubtitle(entity: InfrastructureOverlayEntity) {
  if (entity.kind === 'marker') {
    return entity.marker.subtitle
  }

  return getClusterSubtitle(entity.category, entity.members)
}

function getOverlayEntityNote(entity: InfrastructureOverlayEntity) {
  if (entity.kind === 'marker') {
    return entity.marker.note
  }

  return getClusterNote(entity.category, entity.members)
}

function getOverlayEntityEyebrow(entity: InfrastructureOverlayEntity) {
  if (entity.kind === 'marker') {
    return `${getOverlayCategoryLabel(entity.category)}${
      entity.marker.code ? ` · ${entity.marker.code}` : ''
    } · ${getOverlayTierLabel(entity.marker)}`
  }

  return `${getOverlayCategoryLabel(entity.category)} cluster · ${entity.count} grouped`
}

function getOverlayEntityBadgeLabel(entity: InfrastructureOverlayEntity) {
  if (entity.kind === 'marker') {
    return entity.marker.code ?? 'DC'
  }

  return getCountMarkerLabel(entity.count)
}

function getOverlayEntitySecondaryMeta(entity: InfrastructureOverlayEntity) {
  if (entity.kind === 'marker') {
    return getOverlayTierLabel(entity.marker)
  }

  return `${entity.count} grouped`
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

const projectedInfrastructureMarkers: MapInfrastructureMarker[] = INFRASTRUCTURE_MARKERS.map((marker) => {
  const projected = projection([marker.longitude, marker.latitude])

  if (!projected) {
    return null
  }

  return {
    ...marker,
    x: projected[0],
    y: projected[1],
  }
}).filter((value): value is MapInfrastructureMarker => value !== null)

export function LegislativeMap({
  onSelectState,
  selectedStateCode,
  summaries,
}: {
  onSelectState: (stateCode: string) => void
  selectedStateCode: string | null
  summaries: StateDelegationSummary[]
}) {
  const [overlayScope, setOverlayScope] = useState<OverlayScope>('featured')
  const [overlaySearch, setOverlaySearch] = useState('')
  const [hoveredEntityId, setHoveredEntityId] = useState<string | null>(null)
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null)
  const deferredOverlaySearch = useDeferredValue(overlaySearch)
  const normalizedOverlaySearch = normalizeOverlayQuery(deferredOverlaySearch)
  const hasActiveSearch = normalizedOverlaySearch.length > 0
  const summaryByCode = new Map(summaries.map((summary) => [summary.stateCode, summary]))
  const selectedStateSummary = selectedStateCode ? summaryByCode.get(selectedStateCode) ?? null : null
  const selectedMapFeature =
    selectedStateCode ? mapFeatures.find((feature) => feature.stateCode === selectedStateCode) ?? null : null

  const matchingInfrastructureMarkers = projectedInfrastructureMarkers
    .filter((marker) => {
      if (selectedStateCode && marker.stateCode !== selectedStateCode) {
        return false
      }

      return matchesInfrastructureSearch(marker, normalizedOverlaySearch)
    })
    .sort((left, right) => sortInfrastructureMarkers(left, right, normalizedOverlaySearch))

  const shouldRestrictToFeaturedMarkers = !selectedStateCode && !hasActiveSearch && overlayScope === 'featured'
  const visibleInfrastructureMarkers = matchingInfrastructureMarkers.filter((marker) => {
    if (!shouldRestrictToFeaturedMarkers) {
      return true
    }

    return isFeaturedInfrastructure(marker)
  })

  const shouldShowNationalCounts = !selectedStateCode && !hasActiveSearch
  const visibleInfrastructureEntities = buildInfrastructureEntities(
    visibleInfrastructureMarkers,
    shouldShowNationalCounts,
  )

  useEffect(() => {
    if (visibleInfrastructureEntities.length === 0) {
      if (hoveredEntityId !== null) {
        setHoveredEntityId(null)
      }

      if (selectedEntityId !== null) {
        setSelectedEntityId(null)
      }

      return
    }

    if (!selectedEntityId || !visibleInfrastructureEntities.some((entity) => entity.id === selectedEntityId)) {
      setSelectedEntityId(visibleInfrastructureEntities[0].id)
    }
  }, [hoveredEntityId, selectedEntityId, visibleInfrastructureEntities])

  useEffect(() => {
    if (!hoveredEntityId) {
      return
    }

    if (!visibleInfrastructureEntities.some((entity) => entity.id === hoveredEntityId)) {
      setHoveredEntityId(null)
    }
  }, [hoveredEntityId, visibleInfrastructureEntities])

  const activeEntityId = hoveredEntityId ?? selectedEntityId
  const selectedInfrastructureEntity =
    visibleInfrastructureEntities.find((entity) => entity.id === activeEntityId) ?? null
  const matchingCount = matchingInfrastructureMarkers.length
  const shownCount = visibleInfrastructureMarkers.length
  const shownEntityCount = visibleInfrastructureEntities.length
  const visibleAirportCount = visibleInfrastructureMarkers.filter((marker) => marker.category === 'airport').length
  const matchingAirportCount = matchingInfrastructureMarkers.filter((marker) => marker.category === 'airport').length

  const overlayCountSummary = formatOverlayShownSummary(
    visibleAirportCount,
    matchingAirportCount,
    'airport',
    'airports',
  )

  let overlayContextNote =
    'Featured keeps the national airport layer readable. Switch to All for the broader airport layer.'

  if (overlayScope === 'all' && !selectedStateCode && !hasActiveSearch) {
    overlayContextNote = 'Full national airport layer.'
  }

  if (shouldShowNationalCounts) {
    overlayContextNote =
      'National view turns nearby airports into numeric count badges. Search or click a state to break them back into individual locations.'
  }

  if (hasActiveSearch) {
    overlayContextNote = 'Search expands beyond the featured national layer so matching airports are easier to find.'
  }

  if (selectedStateSummary) {
    overlayContextNote = `${selectedStateSummary.stateName} focus shows the full matching airport layer for that state.`
  }

  const scopeFilters = [
    ['featured', 'Featured'],
    ['all', 'All'],
  ] as const
  return (
    <section className="section-card map-card">
      <div className="map-stage">
        <div className="map-overlay-toolbar">
          <div className="map-overlay-toolbar__copy">
            <span>Infrastructure overlay</span>
            <strong>{overlayCountSummary}</strong>
            <p>{overlayContextNote}</p>
          </div>

          <label className="map-overlay-search">
            <span>Search</span>
            <input
              onChange={(event) => setOverlaySearch(event.target.value)}
              placeholder="Airport, city, IATA code..."
              type="search"
              value={overlaySearch}
            />
          </label>

          <div className="map-overlay-toolbar__stack">
            {!selectedStateCode && !hasActiveSearch ? (
              <div className="map-overlay-toolbar__filters" role="tablist" aria-label="National density filter">
                {scopeFilters.map(([value, label]) => (
                  <button
                    aria-pressed={overlayScope === value}
                    className={`map-filter-chip${overlayScope === value ? ' is-active' : ''}`}
                    key={value}
                    onClick={() => setOverlayScope(value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="map-overlay-layout">
          <div className="map-overlay-canvas">
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
                      className={`state-label state-label--${dominantAlignment}`}
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

              {selectedMapFeature ? (
                <path className="us-state-outline" d={selectedMapFeature.path} />
              ) : null}

              {visibleInfrastructureEntities.map((entity) => {
                const isSelected = entity.id === selectedEntityId
                const isHovered = entity.id === hoveredEntityId

                if (entity.kind === 'marker' && !shouldShowNationalCounts) {
                  const marker = entity.marker
                  const markerRadius = getOverlayMarkerRadius(marker)
                  const markerBoxSize = markerRadius * 2.08
                  const markerHitRadius = markerRadius + 6
                  const markerHitBoxSize = markerBoxSize + 11

                  return (
                    <g
                      aria-label={`${marker.title}${marker.city ? `, ${marker.city}` : ''}`}
                      className={`infra-marker infra-marker--${marker.category}${
                        isFeaturedInfrastructure(marker) ? ' infra-marker--featured' : ''
                      }${isHovered ? ' is-hovered' : ''}${isSelected ? ' is-selected' : ''}`}
                      key={entity.id}
                      onBlur={() => setHoveredEntityId((current) => (current === entity.id ? null : current))}
                      onClick={() => setSelectedEntityId(entity.id)}
                      onFocus={() => setHoveredEntityId(entity.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedEntityId(entity.id)
                        }
                      }}
                      onMouseEnter={() => setHoveredEntityId(entity.id)}
                      onMouseLeave={() => setHoveredEntityId((current) => (current === entity.id ? null : current))}
                      role="button"
                      tabIndex={0}
                      transform={`translate(${marker.x}, ${marker.y})`}
                    >
                      {marker.category === 'airport' || marker.category === 'university' || marker.category === 'nuclear' ? (
                        <circle className="infra-marker__hitarea" r={markerHitRadius} />
                      ) : null}
                      {marker.category === 'datacenter' ? (
                        <rect
                          className="infra-marker__hitarea"
                          height={markerHitBoxSize}
                          rx={6}
                          ry={6}
                          width={markerHitBoxSize}
                          x={markerHitBoxSize / -2}
                          y={markerHitBoxSize / -2}
                        />
                      ) : null}
                      {marker.category === 'airport' || marker.category === 'university' || marker.category === 'nuclear' ? (
                        <circle className="infra-marker__badge" r={markerRadius} />
                      ) : null}
                      {marker.category === 'datacenter' ? (
                        <rect
                          className="infra-marker__badge"
                          height={markerBoxSize}
                          rx={4}
                          ry={4}
                          width={markerBoxSize}
                          x={markerBoxSize / -2}
                          y={markerBoxSize / -2}
                        />
                      ) : null}
                      {marker.category === 'airport' ? (
                        <path
                          className="infra-marker__icon"
                          d={AIRPORT_ICON_PATH}
                        />
                      ) : marker.category === 'university' ? (
                        <path
                          className="infra-marker__icon"
                          d="M -3.8 -0.9 L 0 -3.2 L 3.8 -0.9 L 0 1.3 Z M -2.2 0.5 V 2.8 M 2.2 0.5 V 2.8 M -2.2 2.8 H 2.2"
                        />
                      ) : marker.category === 'nuclear' ? (
                        <path
                          className="infra-marker__icon"
                          d="M 0 -3.5 L 0 -1.1 M -3 -1.7 L -0.9 -0.4 M 3 -1.7 L 0.9 -0.4 M -2.2 2.6 L -0.4 0.8 M 2.2 2.6 L 0.4 0.8 M 0 1.2 A 0.9 0.9 0 1 0 0 -0.6 A 0.9 0.9 0 1 0 0 1.2"
                        />
                      ) : (
                        <path
                          className="infra-marker__icon"
                          d="M -3.4 -2.6 H 3.4 M -3.4 0 H 3.4 M -3.4 2.6 H 3.4"
                        />
                      )}
                    </g>
                  )
                }

                const entityCount = entity.members.length
                const clusterRadius = getCountMarkerRadius(entity.category, entityCount)
                const clusterBoxSize = clusterRadius * 2.16
                const clusterHitRadius = clusterRadius + 7
                const clusterHitBoxSize = clusterBoxSize + 12

                return (
                  <g
                    aria-label={`${entityCount} ${getOverlayCategoryPluralLabel(entity.category, entityCount)} grouped together`}
                    className={`infra-marker infra-marker--${entity.category} infra-marker--cluster${
                      isHovered ? ' is-hovered' : ''
                    }${isSelected ? ' is-selected' : ''}`}
                    key={entity.id}
                    onBlur={() => setHoveredEntityId((current) => (current === entity.id ? null : current))}
                    onClick={() => setSelectedEntityId(entity.id)}
                    onFocus={() => setHoveredEntityId(entity.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelectedEntityId(entity.id)
                      }
                    }}
                    onMouseEnter={() => setHoveredEntityId(entity.id)}
                    onMouseLeave={() => setHoveredEntityId((current) => (current === entity.id ? null : current))}
                    role="button"
                    tabIndex={0}
                    transform={`translate(${entity.x}, ${entity.y})`}
                  >
                    {entity.category === 'airport' || entity.category === 'university' || entity.category === 'nuclear' ? (
                      <circle className="infra-marker__hitarea" r={clusterHitRadius} />
                    ) : null}
                    {entity.category === 'datacenter' ? (
                      <rect
                        className="infra-marker__hitarea"
                        height={clusterHitBoxSize}
                        rx={8}
                        ry={8}
                        width={clusterHitBoxSize}
                        x={clusterHitBoxSize / -2}
                        y={clusterHitBoxSize / -2}
                      />
                    ) : null}
                    {entity.category === 'airport' || entity.category === 'university' || entity.category === 'nuclear' ? (
                      <circle className="infra-marker__badge infra-marker__badge--cluster" r={clusterRadius} />
                    ) : (
                      <rect
                        className="infra-marker__badge infra-marker__badge--cluster"
                        height={clusterBoxSize}
                        rx={7}
                        ry={7}
                        width={clusterBoxSize}
                        x={clusterBoxSize / -2}
                        y={clusterBoxSize / -2}
                      />
                    )}
                    <text
                      className="infra-marker__cluster-count"
                      fontSize={getCountMarkerSize(entityCount)}
                      textAnchor="middle"
                      y={entityCount > 99 ? 2.8 : 3.2}
                    >
                      {getCountMarkerLabel(entityCount)}
                    </text>
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
              <span className="map-legend__item map-legend__item--overlay">
                {shouldShowNationalCounts ? (
                  <span className="map-legend__marker map-legend__marker--airport" aria-hidden="true">
                    <span className="map-legend__marker-count">#</span>
                  </span>
                ) : (
                  <span className="map-legend__marker map-legend__marker--airport" aria-hidden="true">
                    <svg viewBox="-5 -5 10 10">
                      <path d={AIRPORT_ICON_PATH} />
                    </svg>
                  </span>
                )}
                Airports
              </span>
            </div>
          </div>

          <aside className="map-overlay-sidebar">
            <div className="map-overlay-sidebar__top">
              <div className="map-overlay-sidebar__copy">
                <p className="eyebrow">Infrastructure explorer</p>
                <h3>{selectedStateSummary ? selectedStateSummary.stateName : 'United States'}</h3>
                <p>{overlayContextNote}</p>
              </div>
              {selectedStateCode ? (
                <button className="state-focus__clear" onClick={() => onSelectState(selectedStateCode)} type="button">
                  Clear state
                </button>
              ) : null}
            </div>

            <div className="map-overlay-summary-grid">
              <article className="map-overlay-summary-card">
                <span>{shouldShowNationalCounts ? 'Groups' : 'Visible'}</span>
                <strong>{shouldShowNationalCounts ? shownEntityCount : shownCount}</strong>
                <small>
                  {shouldShowNationalCounts
                    ? `${shownCount} markers represented`
                    : shownCount === matchingCount
                      ? 'current layer'
                      : `${matchingCount} total matches`}
                </small>
              </article>
              <article className="map-overlay-summary-card">
                <span>Airports</span>
                <strong>{visibleAirportCount}</strong>
                <small>{matchingAirportCount} matching markers</small>
              </article>
            </div>

            <div className={`map-overlay-panel${selectedInfrastructureEntity ? '' : ' map-overlay-panel--empty'}`}>
              {selectedInfrastructureEntity ? (
                <>
                  <p className="eyebrow">{getOverlayEntityEyebrow(selectedInfrastructureEntity)}</p>
                  <h3>{getOverlayEntityTitle(selectedInfrastructureEntity)}</h3>
                  <p className="map-overlay-panel__meta">{getOverlayEntitySubtitle(selectedInfrastructureEntity)}</p>
                  {selectedInfrastructureEntity.kind === 'marker' ? (
                    <p className="map-overlay-panel__meta">{getMarkerLocationLabel(selectedInfrastructureEntity.marker)}</p>
                  ) : null}
                  <p className="map-overlay-panel__note">{getOverlayEntityNote(selectedInfrastructureEntity)}</p>

                  {selectedInfrastructureEntity.kind === 'cluster' ? (
                    <div className="map-overlay-cluster-members">
                      <div className="map-overlay-cluster-members__header">
                        <span>Drill into member locations</span>
                        <strong>{selectedInfrastructureEntity.count}</strong>
                      </div>

                      <div className="map-overlay-cluster-members__list">
                        {selectedInfrastructureEntity.members
                          .slice(0, CLUSTER_MEMBER_PREVIEW_LIMIT)
                          .map((member) => (
                            <button
                              className="map-overlay-cluster-member"
                              key={member.id}
                              onClick={() => {
                                setSelectedEntityId(member.id)
                                setHoveredEntityId(null)
                                onSelectState(member.stateCode)
                              }}
                              type="button"
                            >
                              <strong>{member.title}</strong>
                              <span>{member.subtitle}</span>
                            </button>
                          ))}
                      </div>

                      {selectedInfrastructureEntity.members.length > CLUSTER_MEMBER_PREVIEW_LIMIT ? (
                        <p className="map-overlay-panel__note">
                          Showing the first {CLUSTER_MEMBER_PREVIEW_LIMIT} locations. Open a state or search to inspect the
                          full cluster.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <p className="eyebrow">Selection</p>
                  <h3>{selectedStateSummary ? `${selectedStateSummary.stateName} infrastructure` : 'Infrastructure directory'}</h3>
                  <p className="map-overlay-panel__note">
                    {shownCount === 0
                      ? 'No markers match the current state, category, and search filters.'
                      : 'Choose a marker on the map or in the directory to inspect it here.'}
                  </p>
                </>
              )}
            </div>

            <div className="map-overlay-directory">
              <div className="map-overlay-directory__header">
                <p className="eyebrow">{shouldShowNationalCounts ? 'Visible groups' : 'Visible markers'}</p>
                <strong>{shouldShowNationalCounts ? shownEntityCount : shownCount}</strong>
              </div>

              {visibleInfrastructureEntities.length ? (
                <div className="map-overlay-directory__list">
                  {visibleInfrastructureEntities.map((entity) => (
                    <button
                      className={`map-overlay-row${hoveredEntityId === entity.id ? ' is-hovered' : ''}${
                        selectedEntityId === entity.id ? ' is-selected' : ''
                      }`}
                      key={entity.id}
                      onBlur={() => setHoveredEntityId((current) => (current === entity.id ? null : current))}
                      onClick={() => setSelectedEntityId(entity.id)}
                      onFocus={() => setHoveredEntityId(entity.id)}
                      onMouseEnter={() => setHoveredEntityId(entity.id)}
                      onMouseLeave={() => setHoveredEntityId((current) => (current === entity.id ? null : current))}
                      type="button"
                    >
                      <span
                        className={`map-overlay-row__badge map-overlay-row__badge--${entity.category}${
                          entity.kind === 'cluster' ? ' map-overlay-row__badge--cluster' : ''
                        }${
                          entity.kind === 'marker' && isFeaturedInfrastructure(entity.marker) ? ' is-featured' : ''
                        }`}
                      >
                        {getOverlayEntityBadgeLabel(entity)}
                      </span>
                      <span className="map-overlay-row__copy">
                        <strong>{getOverlayEntityTitle(entity)}</strong>
                        <span>{getOverlayEntitySubtitle(entity)}</span>
                      </span>
                      <span className="map-overlay-row__meta">
                        <span>{entity.kind === 'cluster' ? `${getOverlayCategoryLabel(entity.category)} cluster` : getOverlayCategoryLabel(entity.category)}</span>
                        <span>{getOverlayEntitySecondaryMeta(entity)}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="map-overlay-empty">No infrastructure markers match this filter.</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
