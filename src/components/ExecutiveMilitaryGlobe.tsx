import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { geoCentroid, geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { feature, mesh } from 'topojson-client'
import worldAtlas from 'world-atlas/countries-110m.json'
import {
  EXECUTIVE_MILITARY_BASE_REGIONS,
  EXECUTIVE_MILITARY_BASE_SOURCE_LABEL,
  EXECUTIVE_MILITARY_BASE_SOURCE_URL,
  EXECUTIVE_MILITARY_BASES,
  type ExecutiveMilitaryBase,
  type ExecutiveMilitaryBaseRegion,
  type ExecutiveMilitaryBaseService,
} from '../executiveMilitaryBaseData'
import {
  EXECUTIVE_GOODS_TRADE_AS_OF,
  EXECUTIVE_GOODS_TRADE_BY_COUNTRY,
} from '../executiveGoodsTradeData'
import {
  EXECUTIVE_TREASURY_DEBT_AS_OF,
  EXECUTIVE_TREASURY_DEBT_BY_COUNTRY_BILLIONS,
} from '../executiveTreasuryDebtData'

const GLOBE_SIZE = 840
const GLOBE_CENTER = GLOBE_SIZE / 2
const GLOBE_SCALE = 332
const DEFAULT_GLOBE_LATITUDE = -14
const DEFAULT_GLOBE_LONGITUDE = -22
const MAX_GLOBE_LATITUDE = 75
const DRAG_LONGITUDE_MULTIPLIER = 0.32
const DRAG_LATITUDE_MULTIPLIER = 0.24
const CLICK_SUPPRESSION_MS = 160
const HEMISPHERE_VISIBILITY_EPSILON = 1e-6

type MilitaryBaseScopeFilter = 'all' | 'partner' | 'u.s.'
type MilitaryGlobeViewMode = 'countries' | 'sites'
type MilitaryBaseCategoryFilter =
  | 'airfields'
  | 'all'
  | 'arctic-sites'
  | 'naval-bases'
  | 'ports'
  | 'storage'
type MilitaryBaseTypeFamily =
  | 'air'
  | 'all'
  | 'ground'
  | 'hq-logistics'
  | 'medical'
  | 'missile-space'
  | 'naval'
  | 'training'

type GlobeDragState = {
  hasMoved: boolean
  pointerId: number
  startLatitude: number
  startLongitude: number
  startX: number
  startY: number
}

type ProjectedBase = {
  base: ExecutiveMilitaryBase
  point: [number, number]
}

type CountrySummary = {
  bases: ExecutiveMilitaryBase[]
  count: number
  country: string
  latitude: number
  longitude: number
  partnerCount: number
  regions: ExecutiveMilitaryBaseRegion[]
  services: ExecutiveMilitaryBaseService[]
}

type CountryMarker = {
  point: [number, number]
  summary: CountrySummary
}

type SelectedCountrySource = 'catalog' | 'map'

type WorldCountryFeature = {
  geometry: unknown
  id?: string
  properties?: {
    name?: string
  }
  type: string
}

const SERVICE_ORDER: ExecutiveMilitaryBaseService[] = [
  'Joint',
  'Air Force',
  'Navy',
  'Army',
  'Marine Corps',
]

const SCOPE_FILTER_OPTIONS: Array<{
  label: string
  value: MilitaryBaseScopeFilter
}> = [
  { label: 'All', value: 'all' },
  { label: 'U.S. sites', value: 'u.s.' },
  { label: 'Partner', value: 'partner' },
]

const VIEW_MODE_OPTIONS: Array<{
  label: string
  value: MilitaryGlobeViewMode
}> = [
  { label: 'Sites', value: 'sites' },
  { label: 'Countries', value: 'countries' },
]

const TYPE_FILTER_OPTIONS: Array<{
  label: string
  value: MilitaryBaseTypeFamily
}> = [
  { label: 'All', value: 'all' },
  { label: 'Air', value: 'air' },
  { label: 'Naval', value: 'naval' },
  { label: 'Ground', value: 'ground' },
  { label: 'Training', value: 'training' },
  { label: 'Missile / space', value: 'missile-space' },
  { label: 'HQ / logistics', value: 'hq-logistics' },
  { label: 'Medical', value: 'medical' },
]

const CATEGORY_FILTER_OPTIONS: Array<{
  label: string
  value: MilitaryBaseCategoryFilter
}> = [
  { label: 'All', value: 'all' },
  { label: 'Airfields', value: 'airfields' },
  { label: 'Ports', value: 'ports' },
  { label: 'Naval bases', value: 'naval-bases' },
  { label: 'Storage', value: 'storage' },
  { label: 'Arctic stations', value: 'arctic-sites' },
]

const WORLD_COUNTRIES = feature(
  worldAtlas as never,
  (worldAtlas as { objects: { countries: unknown } }).objects.countries as never,
)
const WORLD_COUNTRY_FEATURES = (WORLD_COUNTRIES as unknown as { features: WorldCountryFeature[] })
  .features
const WORLD_BORDERS = mesh(
  worldAtlas as never,
  (worldAtlas as { objects: { countries: unknown } }).objects.countries as never,
  (left, right) => left !== right,
)

const COUNTRY_NAME_ALIASES: Record<string, string> = {
  alaska: 'united states',
  guam: 'united states',
  hawaii: 'united states',
  'northern mariana islands': 'united states',
  'puerto rico': 'united states',
  'united states of america': 'united states',
  'wake island': 'united states',
}

const U_S_JURISDICTIONS = new Set([
  'Alaska',
  'Guam',
  'Hawaii',
  'Northern Mariana Islands',
  'Puerto Rico',
  'Wake Island',
])

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function normalizeCountryLookupName(value: string) {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase()

  return COUNTRY_NAME_ALIASES[normalized] ?? normalized
}

function clampLatitude(value: number) {
  return Math.max(-MAX_GLOBE_LATITUDE, Math.min(MAX_GLOBE_LATITUDE, value))
}

function normalizeLongitude(value: number) {
  if (value < -180) {
    return ((value + 180) % 360 + 360) % 360 - 180
  }

  if (value > 180) {
    return ((value - 180) % 360 + 360) % 360 - 180
  }

  return value
}

function getMilitaryServiceClassName(service: ExecutiveMilitaryBaseService) {
  return service.toLowerCase().replace(/\s+/g, '-')
}

function isPartnerFacility(base: ExecutiveMilitaryBase) {
  const typeText = normalizeSearchText(base.type)
  const noteText = normalizeSearchText(base.note)

  return (
    typeText.includes('partner') ||
    noteText.includes('australian') ||
    noteText.includes('allied') ||
    base.name === 'Joint Defence Facility Pine Gap'
  )
}

function getMilitaryBaseScope(base: ExecutiveMilitaryBase): Exclude<MilitaryBaseScopeFilter, 'all'> {
  return isPartnerFacility(base) ? 'partner' : 'u.s.'
}

function getMilitaryBaseHostCountry(base: ExecutiveMilitaryBase) {
  return U_S_JURISDICTIONS.has(base.country) ? 'United States' : base.country
}

function matchesMilitaryBaseCategoryFilter(
  base: ExecutiveMilitaryBase,
  filter: Exclude<MilitaryBaseCategoryFilter, 'all'>,
) {
  const typeText = normalizeSearchText(base.type)
  const nameText = normalizeSearchText(base.name)

  switch (filter) {
    case 'airfields':
      return (
        typeText.includes('airfield') ||
        typeText.includes('airport') ||
        typeText.includes('airstrip') ||
        typeText.includes('air base') ||
        typeText.includes('air station') ||
        nameText.includes('airport') ||
        nameText.includes('airfield') ||
        nameText.includes('airstrip')
      )
    case 'ports':
      return (
        typeText.includes('port') ||
        typeText.includes('dock') ||
        typeText.includes('harbor') ||
        typeText.includes('seaport') ||
        typeText.includes('wharf') ||
        typeText.includes('maritime') ||
        nameText.includes('port') ||
        nameText.includes('dock') ||
        nameText.includes('harbor')
      )
    case 'naval-bases':
      return (
        typeText.includes('naval base') ||
        typeText.includes('naval station') ||
        typeText.includes('naval support activity') ||
        typeText.includes('naval air station') ||
        typeText.includes('fleet activities') ||
        nameText.includes('naval base') ||
        nameText.includes('naval station') ||
        nameText.includes('naval support activity') ||
        nameText.includes('fleet activities')
      )
    case 'storage':
      return (
        typeText.includes('storage') ||
        typeText.includes('depot') ||
        typeText.includes('fuel') ||
        typeText.includes('cave complex') ||
        nameText.includes('storage') ||
        nameText.includes('cargo city') ||
        nameText.includes('fuel terminal')
      )
    case 'arctic-sites':
      return base.region === 'Arctic'
  }
}

function getMilitaryBaseTypeFamily(base: ExecutiveMilitaryBase): Exclude<MilitaryBaseTypeFamily, 'all'> {
  const typeText = normalizeSearchText(base.type)

  if (typeText.includes('medical')) {
    return 'medical'
  }

  if (
    typeText.includes('missile') ||
    typeText.includes('space') ||
    typeText.includes('radar') ||
    typeText.includes('test site')
  ) {
    return 'missile-space'
  }

  if (typeText.includes('training')) {
    return 'training'
  }

  if (
    typeText.includes('naval') ||
    typeText.includes('fleet') ||
    typeText.includes('port') ||
    typeText.includes('wharves') ||
    typeText.includes('undersea')
  ) {
    return 'naval'
  }

  if (
    typeText.includes('air') ||
    typeText.includes('airfield') ||
    typeText.includes('air base') ||
    typeText.includes('air station')
  ) {
    return 'air'
  }

  if (
    typeText.includes('command') ||
    typeText.includes('support') ||
    typeText.includes('logistics') ||
    typeText.includes('depot') ||
    typeText.includes('communications')
  ) {
    return 'hq-logistics'
  }

  if (base.service === 'Navy') {
    return 'naval'
  }

  if (base.service === 'Air Force') {
    return 'air'
  }

  return 'ground'
}

function getMilitaryBaseSearchText(base: ExecutiveMilitaryBase) {
  return normalizeSearchText(
    `${base.name} ${base.location} ${base.country} ${getMilitaryBaseHostCountry(base)} ${base.region} ${base.service} ${base.type} ${getMilitaryBaseTypeFamily(base)} ${getMilitaryBaseScope(base)}`,
  )
}

function getRegionCountLabel(
  region: 'all' | ExecutiveMilitaryBaseRegion,
  count: number,
  total: number,
) {
  if (region === 'all') {
    return `${total} exact sites in the catalog`
  }

  return `${count} exact sites in ${region}`
}

function getMilitaryTypeLabel(value: MilitaryBaseTypeFamily) {
  switch (value) {
    case 'hq-logistics':
      return 'HQ / logistics'
    case 'missile-space':
      return 'Missile / space'
    default:
      return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

function formatTreasuryDebtHoldings(valueInBillions: number) {
  if (valueInBillions >= 1000) {
    return `$${(valueInBillions / 1000).toFixed(2)}T`
  }

  return `$${valueInBillions.toFixed(1)}B`
}

function formatGoodsTradeMillions(valueInMillions: number) {
  if (Math.abs(valueInMillions) >= 1000000) {
    return `$${(valueInMillions / 1000000).toFixed(2)}T`
  }

  return `$${(valueInMillions / 1000).toFixed(1)}B`
}

export function ExecutiveMilitaryGlobe() {
  const [viewMode, setViewMode] = useState<MilitaryGlobeViewMode>('sites')
  const [regionFilter, setRegionFilter] = useState<'all' | ExecutiveMilitaryBaseRegion>('all')
  const [scopeFilter, setScopeFilter] = useState<MilitaryBaseScopeFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<MilitaryBaseCategoryFilter>('all')
  const [serviceFilter, setServiceFilter] = useState<'all' | ExecutiveMilitaryBaseService>('all')
  const [typeFilter, setTypeFilter] = useState<MilitaryBaseTypeFamily>('all')
  const [searchValue, setSearchValue] = useState('')
  const [selectedBaseId, setSelectedBaseId] = useState<string | null>(null)
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null)
  const [selectedCountrySource, setSelectedCountrySource] = useState<SelectedCountrySource | null>(null)
  const [globeRotation, setGlobeRotation] = useState({
    latitude: DEFAULT_GLOBE_LATITUDE,
    longitude: DEFAULT_GLOBE_LONGITUDE,
  })
  const [isDragging, setIsDragging] = useState(false)
  const dragStateRef = useRef<GlobeDragState | null>(null)
  const lastDragAtRef = useRef(0)
  const searchNeedle = normalizeSearchText(searchValue)

  const filteredBases = EXECUTIVE_MILITARY_BASES.filter((base) => {
    if (regionFilter !== 'all' && base.region !== regionFilter) {
      return false
    }

    if (scopeFilter !== 'all' && getMilitaryBaseScope(base) !== scopeFilter) {
      return false
    }

    if (categoryFilter !== 'all' && !matchesMilitaryBaseCategoryFilter(base, categoryFilter)) {
      return false
    }

    if (serviceFilter !== 'all' && base.service !== serviceFilter) {
      return false
    }

    if (typeFilter !== 'all' && getMilitaryBaseTypeFamily(base) !== typeFilter) {
      return false
    }

    if (!searchNeedle) {
      return true
    }

    return getMilitaryBaseSearchText(base).includes(searchNeedle)
  }).sort((left, right) => {
    const regionDifference =
      EXECUTIVE_MILITARY_BASE_REGIONS.indexOf(left.region) -
      EXECUTIVE_MILITARY_BASE_REGIONS.indexOf(right.region)

    if (regionDifference !== 0) {
      return regionDifference
    }

    return left.name.localeCompare(right.name)
  })

  const filteredCountrySummaries = Array.from(
    filteredBases.reduce((map, base) => {
      const hostCountry = getMilitaryBaseHostCountry(base)
      const existing = map.get(hostCountry)

      if (existing) {
        existing.bases.push(base)
        existing.count += 1
        existing.latitude += base.latitude
        existing.longitude += base.longitude

        if (getMilitaryBaseScope(base) === 'partner') {
          existing.partnerCount += 1
        }

        if (!existing.regions.includes(base.region)) {
          existing.regions.push(base.region)
        }

        if (!existing.services.includes(base.service)) {
          existing.services.push(base.service)
        }

        return map
      }

      map.set(hostCountry, {
        bases: [base],
        count: 1,
        country: hostCountry,
        latitude: base.latitude,
        longitude: base.longitude,
        partnerCount: getMilitaryBaseScope(base) === 'partner' ? 1 : 0,
        regions: [base.region],
        services: [base.service],
      })

      return map
    }, new Map<string, CountrySummary>()).values(),
  )
    .map((summary) => ({
      ...summary,
      latitude: summary.latitude / summary.count,
      longitude: summary.longitude / summary.count,
    }))
    .sort((left, right) => right.count - left.count || left.country.localeCompare(right.country))

  useEffect(() => {
    if (!selectedBaseId) {
      return
    }

    const stillVisible = filteredBases.some((base) => base.id === selectedBaseId)

    if (!stillVisible) {
      setSelectedBaseId(null)
    }
  }, [filteredBases, selectedBaseId])

  useEffect(() => {
    if (!selectedCountryName) {
      return
    }

    if (selectedCountrySource === 'map') {
      return
    }

    const stillVisible = filteredCountrySummaries.some(
      (summary) => summary.country === selectedCountryName,
    )

    if (!stillVisible) {
      setSelectedCountryName(null)
      setSelectedCountrySource(null)
    }
  }, [filteredCountrySummaries, selectedCountryName, selectedCountrySource])

  const projection = geoOrthographic()
    .translate([GLOBE_CENTER, GLOBE_CENTER])
    .scale(GLOBE_SCALE)
    .rotate([globeRotation.longitude, globeRotation.latitude])
    .clipAngle(90)
    .precision(0.1)

  const visibleCenter: [number, number] = [-globeRotation.longitude, -globeRotation.latitude]

  const projectedBases = filteredBases
    .map((base) => {
      const angularDistance = geoDistance([base.longitude, base.latitude], visibleCenter)

      if (angularDistance > Math.PI / 2 - HEMISPHERE_VISIBILITY_EPSILON) {
        return { base, point: null }
      }

      const point = projection([base.longitude, base.latitude])

      return { base, point }
    })
    .filter((item): item is ProjectedBase => item.point != null)

  const mapEntities = projectedBases
    .map((item) => ({
      base: item.base,
      id: item.base.id,
      point: item.point,
    }))
    .sort((left, right) => {
      const leftSelected = left.base.id === selectedBaseId
      const rightSelected = right.base.id === selectedBaseId

      if (leftSelected !== rightSelected) {
        return leftSelected ? 1 : -1
      }

      return left.point[1] - right.point[1]
    })

  const visibleCountryPoints = projectedBases.reduce((map, item) => {
    const hostCountry = getMilitaryBaseHostCountry(item.base)
    const existing = map.get(hostCountry)

    if (existing) {
      existing.count += 1
      existing.point[0] += item.point[0]
      existing.point[1] += item.point[1]
      return map
    }

    map.set(hostCountry, {
      count: 1,
      point: [item.point[0], item.point[1]] as [number, number],
    })

    return map
  }, new Map<string, { count: number; point: [number, number] }>())

  const countryMapEntities = filteredCountrySummaries
    .map((summary) => {
      const visiblePoint = visibleCountryPoints.get(summary.country)

      if (!visiblePoint) {
        return null
      }

      return {
        point: [
          visiblePoint.point[0] / visiblePoint.count,
          visiblePoint.point[1] / visiblePoint.count,
        ] as [number, number],
        summary,
      }
    })
    .filter((item): item is CountryMarker => item != null)
    .sort((left, right) => {
      const leftSelected = left.summary.country === selectedCountryName
      const rightSelected = right.summary.country === selectedCountryName

      if (leftSelected !== rightSelected) {
        return leftSelected ? 1 : -1
      }

      return left.point[1] - right.point[1]
    })

  const selectedBase =
    filteredBases.find((base) => base.id === selectedBaseId) ??
    EXECUTIVE_MILITARY_BASES.find((base) => base.id === selectedBaseId) ??
    null
  const selectedCountrySummary =
    filteredCountrySummaries.find((summary) => summary.country === selectedCountryName) ?? null
  const selectedCountry =
    selectedCountrySummary ??
    (selectedCountryName
      ? {
          bases: [],
          count: 0,
          country: selectedCountryName,
          latitude: 0,
          longitude: 0,
          partnerCount: 0,
          regions: [],
          services: [],
        }
      : null)
  const selectedCountryTreasuryDebt =
    selectedCountry != null
      ? EXECUTIVE_TREASURY_DEBT_BY_COUNTRY_BILLIONS[selectedCountry.country] ?? null
      : null
  const selectedCountryGoodsTrade =
    selectedCountry != null ? EXECUTIVE_GOODS_TRADE_BY_COUNTRY[selectedCountry.country] ?? null : null
  const selectedCountryFeature = selectedCountryName
    ? WORLD_COUNTRY_FEATURES.find((countryFeature) => {
        const countryName = countryFeature.properties?.name

        if (!countryName) {
          return false
        }

        return normalizeCountryLookupName(countryName) === normalizeCountryLookupName(selectedCountryName)
      }) ?? null
    : null

  const path = geoPath(projection)
  const spherePath = path({ type: 'Sphere' } as never) ?? ''
  const graticulePath = path(geoGraticule10() as never) ?? ''
  const selectedCountryOutlinePath = selectedCountryFeature
    ? path(selectedCountryFeature as never) ?? ''
    : ''
  const countrySummaryByMapName = new Map<string, CountrySummary>(
    filteredCountrySummaries.map((summary) => [
      normalizeCountryLookupName(summary.country),
      summary,
    ]),
  )
  const visibleCount = projectedBases.length
  const backHemisphereCount = Math.max(filteredBases.length - visibleCount, 0)
  const visibleCountryCount = countryMapEntities.length
  const hiddenCountryCount = Math.max(filteredCountrySummaries.length - visibleCountryCount, 0)
  const serviceCounts = SERVICE_ORDER.map((service) => ({
    count: filteredBases.filter((base) => base.service === service).length,
    service,
  })).filter((entry) => entry.count > 0)

  function focusBase(base: ExecutiveMilitaryBase) {
    setViewMode('sites')
    setSelectedBaseId(base.id)
    setSelectedCountryName(null)
    setSelectedCountrySource(null)
    setGlobeRotation({
      latitude: clampLatitude(-base.latitude),
      longitude: normalizeLongitude(-base.longitude),
    })
  }

  function focusCountry(summary: CountrySummary) {
    setViewMode('countries')
    setSelectedBaseId(null)
    setSelectedCountryName(summary.country)
    setSelectedCountrySource('catalog')
    setGlobeRotation({
      latitude: clampLatitude(-summary.latitude),
      longitude: normalizeLongitude(-summary.longitude),
    })
  }

  function focusCountryByName(countryName: string, latitude: number, longitude: number) {
    setViewMode('countries')
    setSelectedBaseId(null)
    setSelectedCountryName(countryName)
    setSelectedCountrySource('map')
    setGlobeRotation({
      latitude: clampLatitude(-latitude),
      longitude: normalizeLongitude(-longitude),
    })
  }

  function beginDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) {
      return
    }

    dragStateRef.current = {
      hasMoved: false,
      pointerId: event.pointerId,
      startLatitude: globeRotation.latitude,
      startLongitude: globeRotation.longitude,
      startX: event.clientX,
      startY: event.clientY,
    }
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragState.startX
    const deltaY = event.clientY - dragState.startY

    if (!dragState.hasMoved && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
      dragState.hasMoved = true
      lastDragAtRef.current = Date.now()
      setIsDragging(true)

      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId)
      }
    }

    if (!dragState.hasMoved) {
      return
    }

    if (selectedBaseId) {
      setSelectedBaseId(null)
    }

    setGlobeRotation({
      latitude: clampLatitude(dragState.startLatitude - deltaY * DRAG_LATITUDE_MULTIPLIER),
      longitude: normalizeLongitude(
        dragState.startLongitude + deltaX * DRAG_LONGITUDE_MULTIPLIER,
      ),
    })
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    dragStateRef.current = null
    if (dragState.hasMoved) {
      setIsDragging(false)
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function shouldSuppressMarkerClick() {
    return Date.now() - lastDragAtRef.current < CLICK_SUPPRESSION_MS
  }

  return (
    <section className="section-card executive-globe-section">
      <div className="section-card__header executive-globe-section__header">
        <div>
          <p className="eyebrow">Global Map</p>
          <h2>U.S. military base globe</h2>
        </div>
        <p>
          Major global U.S. bases, hubs, strategic sites, and a small number of allied
          partner facilities used heavily by U.S. forces are plotted on an orthographic
          globe. This is a near-exhaustive public map rather than a classified or
          installation-by-installation ground-truth inventory. Coordinates are approximate
          for readability.{' '}
          <a href={EXECUTIVE_MILITARY_BASE_SOURCE_URL} rel="noreferrer" target="_blank">
            {EXECUTIVE_MILITARY_BASE_SOURCE_LABEL}
          </a>
        </p>
      </div>

      <div className="executive-globe-layout">
        <div className="executive-globe-stage">
          <div
            className={`executive-globe-shell${isDragging ? ' is-dragging' : ''}`}
            onPointerCancel={endDrag}
            onPointerDown={beginDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
          >
            <svg
              aria-label="World globe showing major U.S. military bases and hubs"
              className="executive-globe-svg"
              viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
            >
              <defs>
                <radialGradient id="executive-globe-ocean" cx="36%" cy="32%" r="72%">
                  <stop offset="0%" stopColor="#4c7df3" />
                  <stop offset="55%" stopColor="#234eab" />
                  <stop offset="100%" stopColor="#11264d" />
                </radialGradient>
                <radialGradient id="executive-globe-highlight" cx="30%" cy="24%" r="68%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="45%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <filter id="executive-globe-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="24" floodColor="rgba(15,23,42,0.28)" stdDeviation="28" />
                </filter>
              </defs>

              <ellipse
                className="executive-globe-shadow"
                cx={GLOBE_CENTER}
                cy={GLOBE_CENTER + 210}
                rx={206}
                ry={54}
              />

              <g filter="url(#executive-globe-shadow)">
                <path className="executive-globe-sphere" d={spherePath} />
                {WORLD_COUNTRY_FEATURES.map((countryFeature) => {
                  const countryName = countryFeature.properties?.name
                  const matchedSummary = countryName
                    ? countrySummaryByMapName.get(normalizeCountryLookupName(countryName)) ?? null
                    : null
                  const countryPath = path(countryFeature as never)
                  const centroid = geoCentroid(countryFeature as never)

                  if (!countryPath) {
                    return null
                  }

                  const displayCountryName = matchedSummary?.country ?? countryName ?? 'Unknown'
                  const isInteractive = countryName != null
                  const isSelected = displayCountryName === selectedCountryName

                  return (
                    <path
                      aria-label={
                        isInteractive
                          ? `${displayCountryName}, ${matchedSummary?.count ?? 0} mapped sites`
                          : undefined
                      }
                      className={`executive-globe-country${
                        isInteractive ? ' is-interactive' : ''
                      }${matchedSummary ? ' has-assets' : ''}${
                        selectedCountrySource === 'map' && !matchedSummary ? ' is-empty-selection-ready' : ''
                      }${isSelected ? ' is-selected' : ''}`}
                      d={countryPath}
                      key={countryFeature.id ?? countryName ?? countryPath}
                      onClick={
                        isInteractive
                          ? () => {
                              if (shouldSuppressMarkerClick()) {
                                return
                              }

                              focusCountryByName(displayCountryName, centroid[1], centroid[0])
                            }
                          : undefined
                      }
                      onKeyDown={
                        isInteractive
                          ? (event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                focusCountryByName(displayCountryName, centroid[1], centroid[0])
                              }
                            }
                          : undefined
                      }
                      role={isInteractive ? 'button' : undefined}
                      tabIndex={isInteractive ? 0 : undefined}
                    />
                  )
                })}
                <path className="executive-globe-graticule" d={graticulePath} />
                <path className="executive-globe-borders" d={path(WORLD_BORDERS as never) ?? ''} />
                {selectedCountryOutlinePath ? (
                  <path className="executive-globe-country-outline" d={selectedCountryOutlinePath} />
                ) : null}
                <path className="executive-globe-highlight" d={spherePath} />
              </g>

              {mapEntities.map((entity) => {
                const isSelected = selectedBase?.id === entity.base.id
                const markerClassName = `executive-base-marker executive-base-marker--${getMilitaryServiceClassName(
                  entity.base.service,
                )}${isSelected ? ' is-selected' : ''}`
                const isCountryMode = viewMode === 'countries'

                return (
                  <g
                    aria-label={`${entity.base.name}, ${getMilitaryBaseHostCountry(entity.base)}`}
                    className={`executive-base-hit${isCountryMode ? ' is-passive' : ''}`}
                    key={entity.id}
                    onClick={
                      isCountryMode
                        ? undefined
                        : () => {
                            if (shouldSuppressMarkerClick()) {
                              return
                            }

                            focusBase(entity.base)
                          }
                    }
                    onKeyDown={
                      isCountryMode
                        ? undefined
                        : (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              focusBase(entity.base)
                            }
                          }
                    }
                    role={isCountryMode ? undefined : 'button'}
                    tabIndex={isCountryMode ? undefined : 0}
                    transform={`translate(${entity.point[0]}, ${entity.point[1]})`}
                  >
                    <circle className="executive-base-hit__area" r={18} />
                    {isSelected ? <circle className="executive-base-marker__ring" r={11} /> : null}
                    <circle className={markerClassName} r={isSelected ? 6.8 : 5.2} />
                  </g>
                )
              })}

              <path className="executive-globe-rim" d={spherePath} />
            </svg>
          </div>

          <div className="executive-globe-legend">
            {serviceCounts.map(({ count, service }) => (
              <span className="executive-globe-legend__item" key={service}>
                <i
                  className={`executive-globe-legend__dot executive-globe-legend__dot--${getMilitaryServiceClassName(
                    service,
                  )}`}
                />
                {service} ({count})
              </span>
            ))}

            <article className="executive-globe-focus-card">
              <span>{viewMode === 'countries' ? 'Focused country' : 'Focused site'}</span>
              {viewMode === 'countries' ? (
                selectedCountry ? (
                  <>
                    <strong>{selectedCountry.country}</strong>
                    <small>{selectedCountry.count} mapped site{selectedCountry.count === 1 ? '' : 's'}</small>
                    <small className="executive-globe-focus-card__trade">
                      {selectedCountry.country === 'United States'
                        ? `Goods trade line not applicable (${EXECUTIVE_GOODS_TRADE_AS_OF}).`
                        : selectedCountryGoodsTrade != null
                          ? `Goods trade with U.S.: ${formatGoodsTradeMillions(
                              selectedCountryGoodsTrade.exportsMillions +
                                selectedCountryGoodsTrade.importsMillions,
                            )} total · exports ${formatGoodsTradeMillions(
                              selectedCountryGoodsTrade.exportsMillions,
                            )} · imports ${formatGoodsTradeMillions(
                              selectedCountryGoodsTrade.importsMillions,
                            )} (${EXECUTIVE_GOODS_TRADE_AS_OF})`
                          : `Not separately listed in Census FT900 selected-country table (${EXECUTIVE_GOODS_TRADE_AS_OF}).`}
                    </small>
                    <small className="executive-globe-focus-card__debt">
                      {selectedCountry.country === 'United States'
                        ? `Foreign-holder table only, not applicable (${EXECUTIVE_TREASURY_DEBT_AS_OF}).`
                        : selectedCountryTreasuryDebt != null
                          ? `Treasury debt held there: ${formatTreasuryDebtHoldings(selectedCountryTreasuryDebt)} (${EXECUTIVE_TREASURY_DEBT_AS_OF})`
                          : `Not separately listed in Treasury TIC (${EXECUTIVE_TREASURY_DEBT_AS_OF}).`}
                    </small>
                  </>
                ) : (
                  <>
                    <strong>Nothing selected</strong>
                    <small>Click any country on the globe to open its country panel.</small>
                  </>
                )
              ) : selectedBase ? (
                <>
                  <strong>{selectedBase.name}</strong>
                  <small>
                    {selectedBase.location} • {getMilitaryBaseHostCountry(selectedBase)}
                  </small>
                </>
              ) : (
                <>
                  <strong>Nothing selected</strong>
                  <small>Click any site dot or switch to Countries and click a country.</small>
                </>
              )}
            </article>

            <div className="executive-globe-summary-grid">
              <article className="executive-globe-summary-card">
                <span>Sites</span>
                <strong>{filteredBases.length}</strong>
                <small>{getRegionCountLabel(regionFilter, filteredBases.length, EXECUTIVE_MILITARY_BASES.length)}</small>
              </article>
              <article className="executive-globe-summary-card">
                <span>Countries</span>
                <strong>{filteredCountrySummaries.length}</strong>
                <small>Host countries in the current filtered set</small>
              </article>
              <article className="executive-globe-summary-card">
                <span>{viewMode === 'countries' ? 'Visible countries' : 'Visible sites'}</span>
                <strong>{viewMode === 'countries' ? visibleCountryCount : visibleCount}</strong>
                <small>
                  {viewMode === 'countries'
                    ? 'Front hemisphere country badges'
                    : 'Front hemisphere exact sites'}
                </small>
              </article>
              <article className="executive-globe-summary-card">
                <span>{viewMode === 'countries' ? 'Hidden countries' : 'Back hemisphere'}</span>
                <strong>{viewMode === 'countries' ? hiddenCountryCount : backHemisphereCount}</strong>
                <small>
                  {viewMode === 'countries'
                    ? 'Countries hidden from this angle'
                    : 'Sites hidden from this angle'}
                </small>
              </article>
            </div>
          </div>
        </div>

        <div
          className={`executive-globe-bottom${
            viewMode === 'countries' ? ' executive-globe-bottom--countries' : ''
          }`}
        >
          <div className="executive-globe-controls">
            <label className="executive-globe-search">
              <span>Search bases</span>
              <input
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Base, country, region, service..."
                type="search"
                value={searchValue}
              />
            </label>

            <div className="executive-globe-filter-groups">
              <div className="executive-globe-filter-group">
                <span>View</span>
                <div className="executive-globe-filters" role="tablist" aria-label="Military globe view mode">
                  {VIEW_MODE_OPTIONS.map((option) => (
                    <button
                      className={`executive-globe-filter${viewMode === option.value ? ' is-active' : ''}`}
                      key={option.value}
                      onClick={() => setViewMode(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="executive-globe-filter-group">
                <span>Scope</span>
                <div className="executive-globe-filters" role="tablist" aria-label="Military base scope filter">
                  {SCOPE_FILTER_OPTIONS.map((option) => (
                    <button
                      className={`executive-globe-filter${scopeFilter === option.value ? ' is-active' : ''}`}
                      key={option.value}
                      onClick={() => setScopeFilter(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="executive-globe-filter-group">
                <span>Quick filters</span>
                <div
                  className="executive-globe-filters"
                  role="tablist"
                  aria-label="Military base quick category filter"
                >
                  {CATEGORY_FILTER_OPTIONS.map((option) => (
                    <button
                      className={`executive-globe-filter${categoryFilter === option.value ? ' is-active' : ''}`}
                      key={option.value}
                      onClick={() => setCategoryFilter(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="executive-globe-filter-group">
                <span>Service</span>
                <div className="executive-globe-filters" role="tablist" aria-label="Military service filter">
                  <button
                    className={`executive-globe-filter${serviceFilter === 'all' ? ' is-active' : ''}`}
                    onClick={() => setServiceFilter('all')}
                    type="button"
                  >
                    All
                  </button>
                  {SERVICE_ORDER.map((service) => (
                    <button
                      className={`executive-globe-filter${serviceFilter === service ? ' is-active' : ''}`}
                      key={service}
                      onClick={() => setServiceFilter(service)}
                      type="button"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="executive-globe-filter-group">
                <span>Type</span>
                <div className="executive-globe-filters" role="tablist" aria-label="Military site type filter">
                  {TYPE_FILTER_OPTIONS.map((option) => (
                    <button
                      className={`executive-globe-filter${typeFilter === option.value ? ' is-active' : ''}`}
                      key={option.value}
                      onClick={() => setTypeFilter(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="executive-globe-filter-group">
                <span>Region</span>
                <div className="executive-globe-filters" role="tablist" aria-label="Military base region filter">
                  <button
                    className={`executive-globe-filter${regionFilter === 'all' ? ' is-active' : ''}`}
                    onClick={() => setRegionFilter('all')}
                    type="button"
                  >
                    All
                  </button>
                  {EXECUTIVE_MILITARY_BASE_REGIONS.map((region) => (
                    <button
                      className={`executive-globe-filter${regionFilter === region ? ' is-active' : ''}`}
                      key={region}
                      onClick={() => setRegionFilter(region)}
                      type="button"
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'sites' ? (
            <aside className="executive-globe-sidebar">
              <div
                className={`executive-globe-detail${selectedBase ? '' : ' executive-globe-detail--empty'}`}
              >
                {selectedBase ? (
                  <>
                    <div className="executive-globe-detail__top">
                      <p className="eyebrow">Focused base</p>
                      <button
                        className="executive-globe-reset"
                        onClick={() => setSelectedBaseId(null)}
                        type="button"
                      >
                        Clear focus
                      </button>
                    </div>
                    <h3>{selectedBase.name}</h3>
                    <p className="executive-globe-detail__meta">
                      {selectedBase.location} • {getMilitaryBaseHostCountry(selectedBase)}
                    </p>
                    <div className="executive-globe-detail__chips">
                      <span className="detail-tag">{selectedBase.region}</span>
                      <span className="detail-tag">{selectedBase.service}</span>
                      <span className="detail-tag">{selectedBase.type}</span>
                    </div>
                    <p>{selectedBase.note}</p>
                  </>
                ) : (
                  <>
                    <p className="eyebrow">Focused view</p>
                    <h3>Manual globe</h3>
                    <p>
                      Drag the globe to rotate it. Every visible dot is now an exact site marker, so
                      dense regions can overlap directly. Use rotation, filters, or the directory
                      below to pull apart crowded areas.
                    </p>
                  </>
                )}
              </div>
            </aside>
          ) : null}

          <div className="executive-globe-directory">
            <div className="executive-globe-directory__header">
              <p className="eyebrow">{viewMode === 'countries' ? 'Countries' : 'Directory'}</p>
              <strong>{viewMode === 'countries' ? filteredCountrySummaries.length : filteredBases.length}</strong>
            </div>

            {(viewMode === 'countries' ? filteredCountrySummaries.length : filteredBases.length) ? (
              <div className="executive-globe-directory__list">
                {viewMode === 'countries'
                  ? filteredCountrySummaries.map((summary) => (
                      <button
                        className={`executive-globe-row${
                          selectedCountry?.country === summary.country ? ' is-selected' : ''
                        }`}
                        key={summary.country}
                        onClick={() => focusCountry(summary)}
                        type="button"
                      >
                        <span className="executive-globe-row__count">{summary.count}</span>
                        <span className="executive-globe-row__copy">
                          <strong>{summary.country}</strong>
                          <span>
                            {summary.count} mapped site{summary.count === 1 ? '' : 's'}
                            {summary.partnerCount ? ` • ${summary.partnerCount} partner-linked` : ''}
                          </span>
                        </span>
                        <span className="executive-globe-row__meta">{summary.regions.join(' • ')}</span>
                      </button>
                    ))
                  : filteredBases.map((base) => (
                      <button
                        className={`executive-globe-row${selectedBase?.id === base.id ? ' is-selected' : ''}`}
                        key={base.id}
                        onClick={() => focusBase(base)}
                        type="button"
                      >
                        <span
                          className={`executive-globe-row__dot executive-globe-row__dot--${getMilitaryServiceClassName(
                            base.service,
                          )}`}
                        />
                        <span className="executive-globe-row__copy">
                          <strong>{base.name}</strong>
                          <span>
                            {base.location} • {getMilitaryBaseHostCountry(base)}
                          </span>
                        </span>
                        <span className="executive-globe-row__meta">
                          {base.region} • {getMilitaryTypeLabel(getMilitaryBaseTypeFamily(base))}
                        </span>
                      </button>
                    ))}
              </div>
            ) : (
              <div className="executive-globe-empty">
                No {viewMode === 'countries' ? 'countries' : 'bases'} match this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
