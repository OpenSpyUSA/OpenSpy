import { Avatar } from './Avatar'
import {
  compareLegislativeRollCallsByRecency,
  formatRollCallMatrixDateLabel,
} from '../legislativeRollCallFormat'
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

const CATEGORY_SHORT_LABELS: Record<string, string> = {
  appropriations: 'Funds',
  'culture-war': 'Social',
  'emergency-powers': 'Power',
  energy: 'Energy',
  'health-care': 'Health',
  immigration: 'Immig',
  impeachment: 'Impch',
  jan6: 'Jan 6',
  labor: 'Labor',
  nominations: 'Nom',
  reconciliation: 'Recon',
  rescissions: 'Cuts',
  tariffs: 'Tariff',
  taxes: 'Tax',
  trade: 'Trade',
  'veto-override': 'Veto',
  'war-powers': 'War',
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

function formatRollCallSignalTier(event: LegislativeTrumpRollCall) {
  return event.signalTier === 'broad_admin_related'
    ? 'Broader Trump-related'
    : 'Direct Trump-related'
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
    }))
    .sort((left, right) =>
      compareLegislativeRollCallsByRecency(left.event, right.event, left.index, right.index),
    )
    .map(({ event }) => event)
  const scoredCount = sortedEvents.filter((event) => event.scoreIncluded).length
  const broadCount = sortedEvents.length - scoredCount

  return (
    <section className="vote-matrix">
      <div className="vote-matrix__header">
        <div>
          <p className="eyebrow">Vote matrix</p>
          <h3>{chamberLabel} Trump-linked roll calls</h3>
          <p className="vote-matrix__axes">
            Rows sorted by age. Newest votes on the left. <strong>Direct</strong> votes affect the
            Trump score. <strong>Broader</strong> votes are shown for context only.
          </p>
          <div className="vote-matrix__scope-summary" aria-label="Roll-call scope summary">
            <span className="vote-matrix__scope-pill vote-matrix__scope-pill--scored">
              Direct Trump-related {scoredCount}
            </span>
            {broadCount > 0 ? (
              <span className="vote-matrix__scope-pill vote-matrix__scope-pill--broad">
                Broader Trump-related {broadCount}
              </span>
            ) : null}
          </div>
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
                  const scopeLabel = formatRollCallSignalTier(event)

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
                        title={`${event.label} • ${formatRollCallMatrixDateLabel(event)} • ${scopeLabel} • ${getRollCallOutcomeLabel(event.trumpOutcome)}${
                          countsLabel ? ` • ${countsLabel}` : ''
                        }${event.scoreIncluded ? ' • Used in Trump score' : ' • Shown for context only'}`}
                        type="button"
                      >
                        <span className="vote-matrix__event-date">
                          {formatRollCallMatrixDateLabel(event)}
                        </span>
                        <span className="vote-matrix__event-category">
                          {getCategoryShortLabel(event.category)}
                        </span>
                        <span
                          className={`vote-matrix__event-scope vote-matrix__event-scope--${
                            event.scoreIncluded ? 'scored' : 'broad'
                          }`}
                        >
                          {event.scoreIncluded ? 'Direct' : 'Broader'}
                        </span>
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
              const detailLabel = [ageLabel, sinceLabel]
                .filter(Boolean)
                .join(' • ')
              const compactDetailLabel = [
                getCompactAgeValue(ageLabel),
                getCompactSinceValue(sinceLabel),
              ]
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
                            <span className="vote-matrix__mobile-copy">{compactScoreLabel}</span>
                          </span>
                        </span>
                        <span className="vote-matrix__person-detail">
                          <span className="vote-matrix__desktop-copy">{detailLabel}</span>
                          <span className="vote-matrix__mobile-copy">{compactDetailLabel}</span>
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
