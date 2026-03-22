import { useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import {
  CANTON_CODE_TO_META,
  CANTON_MAP_NAME_TO_CODE,
  getCantonOptionLabel,
  type CantonCode,
} from '../cantonMeta'
import swissCantons from '../data/swiss-cantons.topo.json'
import type { ChamberId, Person } from '../switzerlandData'

const MAP_WIDTH = 960
const MAP_HEIGHT = 620

type SwissAtlasObjects = {
  cantons: GeometryCollection
}

type CantonFeature = {
  centroid: [number, number]
  code: CantonCode
  hasOffset: boolean
  label: string
  labelPosition: [number, number]
  path: string
}

const LABEL_OFFSETS: Partial<Record<CantonCode, { dx: number; dy: number }>> = {
  AI: { dx: 22, dy: 18 },
  AR: { dx: 20, dy: -12 },
  BL: { dx: 22, dy: 12 },
  BS: { dx: 24, dy: -8 },
  NW: { dx: 18, dy: 12 },
  OW: { dx: -18, dy: 18 },
  ZG: { dx: 18, dy: -12 },
}

const swissAtlas = swissCantons as unknown as Topology<SwissAtlasObjects>
const cantonCollection = feature(
  swissAtlas,
  swissAtlas.objects.cantons,
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>
const projection = geoMercator().fitSize([MAP_WIDTH, MAP_HEIGHT], cantonCollection)
const pathGenerator = geoPath(projection)

const cantonFeatures: CantonFeature[] = cantonCollection.features
  .map((cantonFeature) => {
    const mapName = String(cantonFeature.properties?.name ?? '')
    const code = CANTON_MAP_NAME_TO_CODE[mapName]

    if (!code) {
      return null
    }

    const path = pathGenerator(cantonFeature)
    const centroid = pathGenerator.centroid(cantonFeature)

    if (!path || Number.isNaN(centroid[0]) || Number.isNaN(centroid[1])) {
      return null
    }

    const offset = LABEL_OFFSETS[code]
    const labelPosition: [number, number] = [
      centroid[0] + (offset?.dx ?? 0),
      centroid[1] + (offset?.dy ?? 0),
    ]

    return {
      centroid: [centroid[0], centroid[1]],
      code,
      hasOffset: Boolean(offset),
      label: getCantonOptionLabel(code),
      labelPosition,
      path,
    }
  })
  .filter((value): value is CantonFeature => value !== null)

function getCountTone(count: number) {
  if (count >= 2) {
    return 'dense'
  }

  if (count === 1) {
    return 'single'
  }

  return 'empty'
}

function getChamberLabel(chamberId: ChamberId) {
  return chamberId === 'national-council' ? 'National Council' : 'Council of States'
}

export function SwissCantonMap({
  activeChamber,
  partyFilterLabel,
  people,
  selectedCantonCode,
  onSelectCantonCode,
}: {
  activeChamber: ChamberId
  partyFilterLabel: string | null
  people: Person[]
  selectedCantonCode: CantonCode | null
  onSelectCantonCode: (code: CantonCode | null) => void
}) {
  const [hoveredCantonCode, setHoveredCantonCode] = useState<CantonCode | null>(null)
  const countByCode = new Map<CantonCode, number>()

  for (const person of people) {
    const code = person.cantonCode as CantonCode | undefined

    if (!code) {
      continue
    }

    countByCode.set(code, (countByCode.get(code) ?? 0) + 1)
  }

  const cantonsWithSeed = cantonFeatures.filter((featureItem) => (countByCode.get(featureItem.code) ?? 0) > 0)
    .length
  const previewCantonCode = selectedCantonCode ?? hoveredCantonCode
  const previewMeta = previewCantonCode ? CANTON_CODE_TO_META[previewCantonCode] : null
  const previewPeople = previewCantonCode
    ? people
        .filter((person) => person.cantonCode === previewCantonCode)
        .sort((left, right) => left.sortOrder - right.sortOrder)
    : []
  const chamberLabel = getChamberLabel(activeChamber)

  return (
    <section className="section-block">
      <div className="section-heading">
        <p className="eyebrow">Canton navigator</p>
        <h2>Navigate the seeded legislative roster spatially</h2>
        <p className="section-heading__copy">
          Shading shows seeded profiles in the current chamber view
          {partyFilterLabel ? ` filtered to ${partyFilterLabel}` : ''}. This map is a
          navigation layer for the seeded dataset, not a complete membership map.
        </p>
      </div>

      <div className="canton-layout">
        <div className="canton-map-shell">
          <svg
            aria-label="Map of Switzerland by canton"
            className="canton-map"
            role="img"
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          >
            {cantonFeatures.map((featureItem) => {
              const count = countByCode.get(featureItem.code) ?? 0
              const tone = getCountTone(count)
              const isHovered = hoveredCantonCode === featureItem.code
              const isSelected = selectedCantonCode === featureItem.code
              const isDimmed = Boolean(selectedCantonCode) && !isSelected

              return (
                <g key={featureItem.code}>
                  <path
                    aria-label={`${featureItem.label}, ${count} seeded profile${count === 1 ? '' : 's'} in the current view`}
                    className={`canton-shape canton-shape--${tone}${
                      isHovered ? ' is-hovered' : ''
                    }${isSelected ? ' is-selected' : ''}${isDimmed ? ' is-dimmed' : ''}`}
                    d={featureItem.path}
                    onBlur={() => setHoveredCantonCode(null)}
                    onClick={() =>
                      onSelectCantonCode(isSelected ? null : featureItem.code)
                    }
                    onFocus={() => setHoveredCantonCode(featureItem.code)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onSelectCantonCode(isSelected ? null : featureItem.code)
                      }
                    }}
                    onMouseEnter={() => setHoveredCantonCode(featureItem.code)}
                    onMouseLeave={() => setHoveredCantonCode(null)}
                    role="button"
                    tabIndex={0}
                  >
                    <title>
                      {featureItem.label}: {count} seeded profile{count === 1 ? '' : 's'} in the{' '}
                      {chamberLabel} view
                    </title>
                  </path>

                  {featureItem.hasOffset ? (
                    <line
                      className={`canton-callout${isSelected ? ' is-selected' : ''}`}
                      x1={featureItem.centroid[0]}
                      x2={featureItem.labelPosition[0]}
                      y1={featureItem.centroid[1]}
                      y2={featureItem.labelPosition[1]}
                    />
                  ) : null}

                  <text
                    className={`canton-label${isSelected ? ' is-selected' : ''}${
                      isDimmed ? ' is-dimmed' : ''
                    }`}
                    textAnchor="middle"
                    x={featureItem.labelPosition[0]}
                    y={featureItem.labelPosition[1] + 4}
                  >
                    {featureItem.code}
                  </text>
                </g>
              )
            })}
          </svg>

          <div className="canton-legend" aria-label="Seeded data legend">
            <span className="canton-legend__item">
              <i className="canton-legend__swatch canton-legend__swatch--empty" />
              No seeded profile in this view
            </span>
            <span className="canton-legend__item">
              <i className="canton-legend__swatch canton-legend__swatch--single" />
              1 seeded profile
            </span>
            <span className="canton-legend__item">
              <i className="canton-legend__swatch canton-legend__swatch--dense" />
              2 or more seeded profiles
            </span>
          </div>
        </div>

        <aside className="canton-panel">
          <span className="eyebrow">Current map view</span>
          <h3>{previewMeta ? previewMeta.nameEn : 'All cantons'}</h3>
          <p className="canton-panel__summary">
            {people.length} seeded profile{people.length === 1 ? '' : 's'} currently visible across{' '}
            {cantonsWithSeed} canton{cantonsWithSeed === 1 ? '' : 's'} in the {chamberLabel}
            {partyFilterLabel ? ` · ${partyFilterLabel}` : ''} view.
          </p>

          {previewMeta ? (
            <>
              <dl className="canton-panel__meta">
                <dt>Canton</dt>
                <dd>{getCantonOptionLabel(previewMeta.code)}</dd>

                <dt>Seeded profiles here</dt>
                <dd>{previewPeople.length}</dd>

                {activeChamber === 'council-of-states' ? (
                  <>
                    <dt>Council of States norm</dt>
                    <dd>
                      {previewMeta.councilOfStatesSeats} seat
                      {previewMeta.councilOfStatesSeats === 1 ? '' : 's'}
                      {previewMeta.isHalfCanton ? ' · historical half-canton' : ''}
                    </dd>
                  </>
                ) : null}
              </dl>

              {previewPeople.length > 0 ? (
                <div className="canton-panel__list">
                  <h4>Seeded profiles in this canton</h4>
                  <ul>
                    {previewPeople.map((person) => (
                      <li key={`${previewMeta.code}-${person.id}`}>
                        <strong>{person.name}</strong>
                        <span>{person.partyLabel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="canton-panel__empty">
                  No seeded profile is loaded for this canton in the current chamber view yet.
                </p>
              )}

              <button
                className="canton-panel__clear"
                onClick={() => onSelectCantonCode(null)}
                type="button"
              >
                Show all cantons
              </button>
            </>
          ) : (
            <p className="canton-panel__empty">
              Click a canton to filter the member cards below. Hover states are only previews;
              the page filter changes on click.
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}
