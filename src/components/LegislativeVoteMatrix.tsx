import { Avatar } from './Avatar'
import {
  formatAgeLabel,
  getCompactAgeValue,
  getCompactLastName,
  getCompactSinceValue,
} from '../personMeta'
import type {
  GovernmentPerson,
  LegislativeTrumpRollCall,
  LegislativeVotePosition,
} from '../types'

const rollCallDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: '2-digit',
})

const HOUSE_MONTH_INDEX: Record<string, number> = {
  Apr: 3,
  Aug: 7,
  Dec: 11,
  Feb: 1,
  Jan: 0,
  Jul: 6,
  Jun: 5,
  Mar: 2,
  May: 4,
  Nov: 10,
  Oct: 9,
  Sep: 8,
}

const CATEGORY_SHORT_LABELS: Record<string, string> = {
  appropriations: 'Funds',
  'emergency-powers': 'Power',
  'health-care': 'Health',
  immigration: 'Immig',
  impeachment: 'Impch',
  jan6: 'Jan 6',
  nominations: 'Nom',
  reconciliation: 'Recon',
  rescissions: 'Cuts',
  tariffs: 'Tariff',
  taxes: 'Tax',
  trade: 'Trade',
  'veto-override': 'Veto',
  'war-powers': 'War',
}

function parseRollCallTimestamp(value: string, fallbackIndex: number) {
  const houseMatch = value.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/)

  if (houseMatch) {
    const [, dayText, monthText, yearText] = houseMatch
    const monthIndex = HOUSE_MONTH_INDEX[monthText]

    if (monthIndex != null) {
      return Date.UTC(Number(yearText), monthIndex, Number(dayText))
    }
  }

  const parsed = Date.parse(value)

  if (!Number.isNaN(parsed)) {
    return parsed
  }

  return Number.MAX_SAFE_INTEGER - fallbackIndex
}

function formatRollCallDateLabel(value: string) {
  const timestamp = parseRollCallTimestamp(value, 0)

  if (!Number.isFinite(timestamp) || timestamp === Number.MAX_SAFE_INTEGER) {
    return value
  }

  return rollCallDateFormatter.format(new Date(timestamp))
}

function getVotePositionLabel(position: LegislativeVotePosition) {
  switch (position) {
    case 'pro':
      return 'On Trump side'
    case 'anti':
      return 'Not on Trump side'
    case 'missed':
      return 'Missed or abstained'
    case 'not_in_office':
      return 'Not in office'
  }
}

function getCategoryShortLabel(category: string) {
  return CATEGORY_SHORT_LABELS[category] ?? category
}

function getRollCallOutcomeLabel(outcome?: LegislativeTrumpRollCall['trumpOutcome']) {
  if (outcome === 'pro') {
    return 'Final result: on Trump side'
  }

  if (outcome === 'anti') {
    return 'Final result: not on Trump side'
  }

  return 'Final result: unavailable'
}

function formatRollCallVoteTotals(event: LegislativeTrumpRollCall) {
  if (!Number.isFinite(event.yeaTotal) || !Number.isFinite(event.nayTotal)) {
    return null
  }

  return `${event.yeaTotal}Y ${event.nayTotal}N`
}

function formatRollCallWeight(event: LegislativeTrumpRollCall) {
  return `Weight ${event.weight.toFixed(2)}`
}

function formatCompactTrumpScore(score: number) {
  return `${score.toFixed(1)}/10`
}

function extractYearFromText(value?: string) {
  if (!value) {
    return null
  }

  const patterns = [
    /since (\d{4})/i,
    /(\d{4})\s*-\s*present/i,
  ]

  for (const pattern of patterns) {
    const match = value.match(pattern)

    if (match?.[1]) {
      return match[1]
    }
  }

  return null
}

function getLegislativeSinceLabel(person: GovernmentPerson) {
  const rolePatterns =
    person.sectionId === 'senate'
      ? [/u\.s\. senator/i, /\bsenator\b/i]
      : [/u\.s\. representative/i, /\bdelegate\b/i, /resident commissioner/i]

  const roleRecord = [...(person.careerHistory ?? [])]
    .reverse()
    .find((record) =>
      rolePatterns.some((pattern) => pattern.test(record.label) || pattern.test(record.summary)),
    )

  const startYear =
    person.roleSinceYear ??
    extractYearFromText(roleRecord?.startDate) ??
    extractYearFromText(roleRecord?.summary)

  return startYear ? `since ${startYear}` : null
}

export function LegislativeVoteMatrix({
  chamberLabel,
  events,
  onOpenRollCall,
  onOpenPerson,
  people,
  selectedRollCallId,
  selectedPersonId,
}: {
  chamberLabel: string
  events: LegislativeTrumpRollCall[]
  onOpenRollCall: (rollCallId: string) => void
  onOpenPerson: (personId: string) => void
  people: GovernmentPerson[]
  selectedRollCallId: string | null
  selectedPersonId: string | null
}) {
  if (!events.length || !people.length) {
    return null
  }

  const sortedEvents = events
    .map((event, index) => ({
      event,
      index,
      sortValue: parseRollCallTimestamp(event.date, index),
    }))
    .sort((left, right) => right.sortValue - left.sortValue || left.index - right.index)
    .map(({ event }) => event)

  return (
    <section className="vote-matrix">
      <div className="vote-matrix__header">
        <div>
          <p className="eyebrow">Vote matrix</p>
          <h3>{chamberLabel} Trump-linked roll calls</h3>
          <p className="vote-matrix__axes">Rows sorted by age. Newest votes on the left.</p>
        </div>
        <div className="vote-matrix__legend" aria-label="Vote matrix legend">
          <span className="vote-matrix__legend-item">
            <i className="vote-cell vote-cell--pro" />
            On Trump side
          </span>
          <span className="vote-matrix__legend-item">
            <i className="vote-cell vote-cell--anti" />
            Not on Trump side
          </span>
          <span className="vote-matrix__legend-item">
            <i className="vote-cell vote-cell--missed" />
            Missed
          </span>
          <span className="vote-matrix__legend-item">
            <i className="vote-cell vote-cell--not_in_office" />
            Not in office
          </span>
        </div>
      </div>

      <div className="vote-matrix__scroller">
        <table className="vote-matrix__table">
          <thead>
            <tr>
              <th className="vote-matrix__corner" scope="col">
                <span>{people.length} people</span>
                <strong>{sortedEvents.length} votes</strong>
              </th>
              {sortedEvents.map((event) => (
                (() => {
                  const countsLabel = formatRollCallVoteTotals(event)
                  const isSelected = selectedRollCallId === event.id
                  const weightLabel = formatRollCallWeight(event)

                  return (
                    <th
                      className={`vote-matrix__event${
                        event.trumpOutcome ? ` vote-matrix__event--${event.trumpOutcome}` : ''
                      }${isSelected ? ' is-selected' : ''}`}
                      key={event.id}
                      scope="col"
                    >
                      <button
                        aria-pressed={isSelected}
                        className={`vote-matrix__event-link${
                          event.trumpOutcome ? ` vote-matrix__event-link--${event.trumpOutcome}` : ''
                        }${isSelected ? ' is-selected' : ''}`}
                        onClick={() => onOpenRollCall(event.id)}
                        title={`${event.label} • ${formatRollCallDateLabel(event.date)} • ${getRollCallOutcomeLabel(event.trumpOutcome)}${
                          countsLabel ? ` • ${countsLabel}` : ''
                        } • ${weightLabel}`}
                        type="button"
                      >
                        <span className="vote-matrix__event-date">
                          {formatRollCallDateLabel(event.date)}
                        </span>
                        <span className="vote-matrix__event-category">
                          {getCategoryShortLabel(event.category)}
                        </span>
                        <span className="vote-matrix__event-weight">{weightLabel}</span>
                        {countsLabel ? (
                          <span className="vote-matrix__event-counts">{countsLabel}</span>
                        ) : null}
                      </button>
                    </th>
                  )
                })()
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map((person) => {
              const ageLabel = formatAgeLabel(person.birthDate, person.birthYear)
              const isSelected = selectedPersonId === person.id
              const scoreLabel = formatCompactTrumpScore(person.trumpScore)
              const compactScoreLabel = person.trumpScore.toFixed(1)
              const sinceLabel = getLegislativeSinceLabel(person)
              const compactAgeLabel = getCompactAgeValue(ageLabel)
              const compactSinceLabel = getCompactSinceValue(sinceLabel)
              const detailLabel = [ageLabel, sinceLabel]
                .filter(Boolean)
                .join(' • ')

              return (
                <tr className={isSelected ? 'is-selected' : ''} key={person.id}>
                  <th className="vote-matrix__person" scope="row">
                    <button
                      className={`vote-matrix__person-button vote-matrix__person-button--${person.alignment}${
                        isSelected ? ' is-selected' : ''
                      }`}
                      onClick={() => onOpenPerson(person.id)}
                      type="button"
                    >
                      <Avatar className="vote-matrix__avatar" imageUrl={person.imageUrl} name={person.name} />
                      <span className="vote-matrix__person-copy">
                        <span className="vote-matrix__person-heading">
                          <strong>
                            <span className="vote-matrix__desktop-copy">{person.name}</span>
                            <span className="vote-matrix__mobile-copy">
                              {getCompactLastName(person.name)}
                            </span>
                          </strong>
                          <span className="vote-matrix__score">
                            <span className="vote-matrix__desktop-copy">{scoreLabel}</span>
                          </span>
                        </span>
                        <span className="vote-matrix__person-detail">
                          <span className="vote-matrix__desktop-copy">{detailLabel}</span>
                          <span className="vote-matrix__mobile-copy vote-matrix__person-detail-mobile">
                            <span className="vote-matrix__person-detail-left">{compactAgeLabel}</span>
                            <span className="vote-matrix__person-detail-right">
                              {compactSinceLabel ? <span>{compactSinceLabel}</span> : null}
                              <span className="vote-matrix__score-chip">{compactScoreLabel}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </th>
                  {sortedEvents.map((event) => {
                    const position = person.trumpRollCallPositions?.[event.id] ?? 'not_in_office'
                    return (
                      <td className="vote-matrix__cell" key={`${person.id}-${event.id}`}>
                        <span
                          className={`vote-cell vote-cell--${position}`}
                          title={`${person.name} • ${event.label} • ${getVotePositionLabel(position)}`}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
