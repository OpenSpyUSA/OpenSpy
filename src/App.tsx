import {
  Fragment,
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'
import { Avatar } from './components/Avatar'
import { IndependentAgencyDirectory } from './components/IndependentAgencyDirectory'
import { HOUSE_VACANCIES } from './houseVacancies'
import { compareIndependentAgenciesByImportance } from './independentAgencyCatalog'
import { LegislativeVoteMatrix } from './components/LegislativeVoteMatrix'
import { LegislativeMap } from './components/LegislativeMap'
import './App.css'
import {
  formatAgeLabel,
  getCompactAgeValue,
  getCompactLastName,
  getCompactSinceValue,
  getSortableAge,
} from './personMeta'
import { describeLegislativeRollCall } from './legislativeRollCallMeta'
import { FIFTY_STATE_CODES, STATE_CODE_TO_NAME } from './stateMeta'
import { formatTrumpScore, getTrumpBand } from './trumpScore'
import { formatXHandle } from './xProfile'
import type {
  Alignment,
  BranchId,
  BranchSection,
  GovernmentBranch,
  GovernmentDataset,
  GovernmentPerson,
  LegislativeTrumpRollCall,
  StateDelegationSummary,
  SupremeCourtCase,
  TrumpCaseSide,
} from './types'

const branchIdSet = new Set<BranchId>(['executive', 'judicial', 'legislative'])
const caseDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})

type RouteState = {
  branchId: BranchId | null
  personId: string | null
}

type PartyFilter = Alignment | 'all'
type ChamberFilter = 'all' | 'house' | 'senate'
type PresidentPartyTone = 'democratic' | 'republican'

function createPartyCounts(): Record<Alignment, number> {
  return {
    democratic: 0,
    independent: 0,
    nonpartisan: 0,
    republican: 0,
  }
}

function capitalizeAlignment(alignment: Alignment) {
  return alignment.charAt(0).toUpperCase() + alignment.slice(1)
}

function formatCaseDate(value: string) {
  return caseDateFormatter.format(new Date(`${value}T00:00:00Z`))
}

const rollCallDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
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

function getJusticeShortName(name: string) {
  const cleaned = name.replace(/,?\s+(Jr\.|Sr\.|II|III|IV)$/i, '').trim()
  const parts = cleaned.split(/\s+/)
  return parts[parts.length - 1] ?? cleaned
}

function getTrumpCaseStanceLabel(side: TrumpCaseSide) {
  switch (side) {
    case 'pro':
      return 'Pro Trump'
    case 'anti':
      return 'Not pro Trump'
    case 'not_on_court':
      return 'Not on Court'
  }
}

function getTrumpCaseTypeLabel(type: SupremeCourtCase['type']) {
  switch (type) {
    case 'merits':
      return 'Merits'
    case 'order':
      return 'Order'
    case 'procedural':
      return 'Procedural'
  }
}

function parseRollCallTimestamp(value: string, fallbackIndex = 0) {
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

function formatRollCallDate(value: string) {
  const timestamp = parseRollCallTimestamp(value)

  if (!Number.isFinite(timestamp) || timestamp === Number.MAX_SAFE_INTEGER) {
    return value
  }

  return rollCallDateFormatter.format(new Date(timestamp))
}

function formatRollCallCategory(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatRollCallOutcome(outcome?: LegislativeTrumpRollCall['trumpOutcome']) {
  if (outcome === 'pro') {
    return 'On Trump side'
  }

  if (outcome === 'anti') {
    return 'Not on Trump side'
  }

  return 'Unavailable'
}

function formatRollCallVoteTotals(event: LegislativeTrumpRollCall) {
  if (!Number.isFinite(event.yeaTotal) || !Number.isFinite(event.nayTotal)) {
    return null
  }

  return `${event.yeaTotal} YEAs • ${event.nayTotal} NAYs`
}

function formatRollCallChamber(chamber: LegislativeTrumpRollCall['chamber']) {
  return chamber === 'house' ? 'House' : 'Senate'
}

function formatDisplayedTrumpScore(person: GovernmentPerson) {
  if (person.branchId === 'judicial') {
    return `Trump ${person.trumpScore.toFixed(1)}/10`
  }

  return formatTrumpScore(person.trumpScore)
}

function shouldShowTrumpRelationship(person: GovernmentPerson) {
  return person.branchId !== 'executive'
}

function parseHash(hash: string, peopleById?: Map<string, GovernmentPerson>): RouteState {
  const clean = hash.replace(/^#\/?/, '').trim()

  if (!clean) {
    return { branchId: null, personId: null }
  }

  const [branchCandidate, personId] = clean.split('/')
  const branchId = branchIdSet.has(branchCandidate as BranchId)
    ? (branchCandidate as BranchId)
    : null

  if (!branchId) {
    return { branchId: null, personId: null }
  }

  const selectedPerson = personId && peopleById ? peopleById.get(personId) : null

  if (selectedPerson && selectedPerson.branchId !== branchId) {
    return { branchId, personId: null }
  }

  return {
    branchId,
    personId: peopleById ? (selectedPerson ? personId : null) : personId ?? null,
  }
}

function toHash(branchId: BranchId | null, personId?: string | null) {
  if (!branchId) {
    return '#/'
  }

  return personId ? `#/${branchId}/${personId}` : `#/${branchId}`
}

function formatSectionMeta(person: GovernmentPerson) {
  if (person.branchId === 'executive') {
    return person.department ?? person.subtitle ?? 'Executive branch'
  }

  if (person.sectionId === 'senate') {
    return person.leadership ? `${person.state} • ${person.leadership}` : person.state ?? 'Senate'
  }

  if (person.sectionId === 'house') {
    const districtText = person.district ? ` • ${person.district}` : ''
    return `${person.state ?? 'House'}${districtText}`
  }

  return person.court ?? 'Supreme Court'
}

function extractYearFromText(value?: string) {
  if (!value) {
    return null
  }

  const patterns = [
    /since (\d{4})/i,
    /(\d{4})\s*-\s*present/i,
    /joined (?:the )?court in (\d{4})/i,
    /joined (?:the )?supreme court in (\d{4})/i,
    /became .*?justice in (\d{4})/i,
  ]

  for (const pattern of patterns) {
    const match = value.match(pattern)

    if (match?.[1]) {
      return match[1]
    }
  }

  return null
}

function getSupremeCourtServiceLabel(person: GovernmentPerson) {
  if (person.branchId !== 'judicial') {
    return null
  }

  const justiceRecord = person.careerHistory?.find(
    (record) =>
      /justice/i.test(record.label) ||
      /justice of the supreme court|chief justice|associate justice/i.test(record.summary),
  )

  const startYear =
    extractYearFromText(justiceRecord?.startDate) ??
    extractYearFromText(justiceRecord?.summary) ??
    extractYearFromText(person.description)

  return startYear ? `since ${startYear}` : null
}

function getLegislativeServiceLabel(person: GovernmentPerson) {
  if (person.branchId !== 'legislative') {
    return null
  }

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

function isIndependentAgencyPerson(person: GovernmentPerson) {
  return person.branchId === 'executive' && person.sectionId === 'independent-agencies'
}

function getIndependentAgencyServiceLabel(person: GovernmentPerson) {
  if (!isIndependentAgencyPerson(person) || !person.roleSinceYear) {
    return null
  }

  return `since ${person.roleSinceYear}`
}

function usesInternalIndependentAgencySelection(appointer: string) {
  return /board|governors|commission|directors|leadership|succession/i.test(appointer)
}

function getDisplayedAppointedByValue(person: GovernmentPerson) {
  if (!person.appointedBy) {
    return null
  }

  if (isIndependentAgencyPerson(person) && usesInternalIndependentAgencySelection(person.appointedBy)) {
    return 'themselves'
  }

  return person.appointedBy
}

function getPresidentPartyTone(appointer?: string | null): PresidentPartyTone | null {
  if (!appointer) {
    return null
  }

  if (/trump|bush|reagan|ford|nixon|eisenhower/i.test(appointer)) {
    return 'republican'
  }

  if (/biden|obama|clinton|carter|johnson|kennedy/i.test(appointer)) {
    return 'democratic'
  }

  return null
}

function getIndependentAgencyAppointerLabel(person: GovernmentPerson) {
  const displayedAppointer = getDisplayedAppointedByValue(person)

  if (!isIndependentAgencyPerson(person) || !displayedAppointer) {
    return null
  }

  return `Appointed by ${getJusticeShortName(displayedAppointer)}`
}

function isNonVotingHouseMember(person: GovernmentPerson) {
  return (
    person.branchId === 'legislative' &&
    person.sectionId === 'house' &&
    (person.title === 'Delegate to the U.S. House' || person.title === 'Resident Commissioner')
  )
}

function shouldDisplayLegislativePerson(person: GovernmentPerson) {
  return !isNonVotingHouseMember(person)
}

function comparePeopleByAgeAscending(left: GovernmentPerson, right: GovernmentPerson) {
  const leftAge = getSortableAge(left.birthDate, left.birthYear)
  const rightAge = getSortableAge(right.birthDate, right.birthYear)

  if (leftAge == null && rightAge == null) {
    return left.name.localeCompare(right.name)
  }

  if (leftAge == null) {
    return 1
  }

  if (rightAge == null) {
    return -1
  }

  if (leftAge !== rightAge) {
    return leftAge - rightAge
  }

  return left.name.localeCompare(right.name)
}

function normalizeSearchText(value?: string | null) {
  return (value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase()
}

function buildLegislativeSearchHaystack(person: GovernmentPerson) {
  const xHandle = formatXHandle(person.xUrl)
  const normalizedDistrict = person.district?.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1')
  const chamberTerms =
    person.sectionId === 'senate'
      ? ['senate', 'senator', 'upper chamber', 'congress', 'congress member']
      : person.sectionId === 'house'
        ? [
            'house',
            'representative',
            'representatives',
            'house of representatives',
            'congress',
            'congress member',
          ]
        : []

  return normalizeSearchText(
    [
      person.name,
      person.title,
      person.state,
      person.stateCode,
      person.district,
      normalizedDistrict,
      person.department,
      person.court,
      person.leadership,
      person.description,
      person.alignmentLabel,
      person.partyCode,
      person.office,
      xHandle,
      xHandle?.replace(/^@/, ''),
      ...chamberTerms,
      ...(person.committees ?? []),
    ]
      .filter(Boolean)
      .join(' '),
  )
}

function getLegislativeSearchScore(person: GovernmentPerson, searchTerm: string) {
  const normalizedSearch = normalizeSearchText(searchTerm)

  if (!normalizedSearch) {
    return 0
  }

  const tokens = normalizedSearch.split(/\s+/).filter(Boolean)
  const normalizedName = normalizeSearchText(person.name)
  const normalizedTitle = normalizeSearchText(person.title)
  const normalizedState = normalizeSearchText(person.state)
  const normalizedHandle = normalizeSearchText(formatXHandle(person.xUrl))
  let score = 0

  if (normalizedName === normalizedSearch) {
    score += 1000
  } else if (normalizedName.startsWith(normalizedSearch)) {
    score += 700
  }

  if (normalizedHandle === normalizedSearch) {
    score += 600
  } else if (normalizedHandle.startsWith(normalizedSearch)) {
    score += 300
  }

  for (const token of tokens) {
    if (normalizedName.split(' ').some((part) => part.startsWith(token))) {
      score += 120
      continue
    }

    if (normalizedName.includes(token)) {
      score += 80
    }

    if (normalizedHandle.startsWith(token)) {
      score += 50
    }

    if (normalizedState.startsWith(token)) {
      score += 30
    }

    if (normalizedTitle.includes(token)) {
      score += 20
    }
  }

  return score
}

function matchLegislativePerson(
  person: GovernmentPerson,
  searchTerm: string,
  partyFilter: PartyFilter,
  chamberFilter: ChamberFilter,
  selectedStateCode: string | null,
) {
  if (selectedStateCode && person.stateCode !== selectedStateCode) {
    return false
  }

  if (chamberFilter !== 'all' && person.sectionId !== chamberFilter) {
    return false
  }

  if (partyFilter !== 'all' && person.alignment !== partyFilter) {
    return false
  }

  if (!searchTerm) {
    return true
  }

  const normalizedSearch = normalizeSearchText(searchTerm)

  if (!normalizedSearch) {
    return true
  }

  const tokens = normalizedSearch.split(/\s+/).filter(Boolean)
  const haystack = buildLegislativeSearchHaystack(person)

  return tokens.every((token) => haystack.includes(token))
}

function resolveDominantAlignment(
  totalPartyCounts: Record<Alignment, number>,
  housePartyCounts: Record<Alignment, number>,
): Alignment | 'split' {
  const rankedTotals = Object.entries(totalPartyCounts)
    .sort((left, right) => right[1] - left[1]) as Array<[Alignment, number]>

  if (rankedTotals[0]?.[1] === 0) {
    return 'split'
  }

  if (rankedTotals[0][1] > (rankedTotals[1]?.[1] ?? 0)) {
    return rankedTotals[0][0]
  }

  const rankedHouse = Object.entries(housePartyCounts)
    .sort((left, right) => right[1] - left[1]) as Array<[Alignment, number]>

  if (rankedHouse[0]?.[1] > (rankedHouse[1]?.[1] ?? 0)) {
    return rankedHouse[0][0]
  }

  return 'split'
}

function buildBalanceLabel(
  dominantAlignment: Alignment | 'split',
  totalPartyCounts: Record<Alignment, number>,
) {
  if (dominantAlignment === 'split') {
    return 'Delegation is closely split between parties'
  }

  return `${capitalizeAlignment(dominantAlignment)} edge: ${totalPartyCounts[dominantAlignment]} of ${Object.values(
    totalPartyCounts,
  ).reduce((sum, count) => sum + count, 0)} members`
}

function buildStateDelegationSummaries(people: GovernmentPerson[]) {
  return FIFTY_STATE_CODES.map((stateCode) => {
    const statePeople = people
      .filter((person) => person.stateCode === stateCode)
      .sort((left, right) => {
        if (left.sectionId !== right.sectionId) {
          return left.sectionId === 'senate' ? -1 : 1
        }

        return left.sortOrder - right.sortOrder
      })
    const senators = statePeople
      .filter((person) => person.sectionId === 'senate')
      .sort(comparePeopleByAgeAscending)
    const representatives = statePeople
      .filter((person) => person.sectionId === 'house')
      .sort(comparePeopleByAgeAscending)
    const totalPartyCounts = statePeople.reduce((counts, person) => {
      counts[person.alignment] += 1
      return counts
    }, createPartyCounts())
    const housePartyCounts = representatives.reduce((counts, person) => {
      counts[person.alignment] += 1
      return counts
    }, createPartyCounts())
    const dominantAlignment = resolveDominantAlignment(totalPartyCounts, housePartyCounts)
    const houseCount = representatives.length

    return {
      balanceLabel: buildBalanceLabel(dominantAlignment, totalPartyCounts),
      dominantAlignment,
      houseCount,
      housePartyCounts,
      memberCount: statePeople.length,
      people: statePeople,
      representativeCountLabel:
        houseCount === 1 ? '1 representative in the House' : `${houseCount} representatives in the House`,
      senateCount: senators.length,
      stateCode,
      stateName: STATE_CODE_TO_NAME[stateCode],
      senators,
      representatives,
      totalPartyCounts,
    } satisfies StateDelegationSummary
  }).filter((summary) => summary.memberCount > 0)
}

function buildBranchStats(
  branch: GovernmentBranch,
  people: GovernmentPerson[],
) {
  const partyCounts = people.reduce(
    (counts, person) => {
      counts[person.alignment] += 1
      return counts
    },
    {
      democratic: 0,
      independent: 0,
      nonpartisan: 0,
      republican: 0,
    },
  )

  if (branch.id === 'executive') {
    return [
      { label: 'Profiles', value: `${people.length}` },
      {
        label: 'Elected core',
        value: `${people.filter((person) => person.sectionId === 'white-house').length}`,
      },
      {
        label: 'Cabinet',
        value: `${people.filter((person) => person.sectionId === 'cabinet').length}`,
      },
      {
        label: 'Independent profiles',
        value: `${people.filter((person) => person.sectionId === 'independent-agencies').length}`,
      },
    ]
  }

  return [
    { label: 'Justices', value: `${people.length}` },
    { label: 'Republican appointees', value: `${partyCounts.republican}` },
    { label: 'Democratic appointees', value: `${partyCounts.democratic}` },
  ]
}

function buildLegislativeChamberStats(people: GovernmentPerson[]) {
  const senateCounts = createPartyCounts()
  const houseCounts = createPartyCounts()

  for (const person of people) {
    if (!shouldDisplayLegislativePerson(person)) {
      continue
    }

    if (person.sectionId === 'senate') {
      senateCounts[person.alignment] += 1
    }

    if (person.sectionId === 'house') {
      houseCounts[person.alignment] += 1
    }
  }

  return [
    { counts: senateCounts, id: 'senate', label: 'Senate' },
    { counts: houseCounts, id: 'house', label: 'House' },
  ] as const
}

function HouseVacancySection({
  selectedStateCode,
}: {
  selectedStateCode: string | null
}) {
  const sortedVacancies = [...HOUSE_VACANCIES].sort((left, right) => {
    const leftSelected = left.stateCode === selectedStateCode
    const rightSelected = right.stateCode === selectedStateCode

    if (leftSelected !== rightSelected) {
      return leftSelected ? -1 : 1
    }

    return left.openedDate.localeCompare(right.openedDate)
  })

  return (
    <section className="section-card vacancy-section">
      <div className="section-card__header vacancy-section__header">
        <div>
          <p className="eyebrow">Vacant House seats</p>
          <h2>{HOUSE_VACANCIES.length} current voting-seat vacancies</h2>
        </div>
        <p>Non-voting delegates and the resident commissioner are excluded from the House roster.</p>
      </div>

      <div className="vacancy-grid">
        {sortedVacancies.map((vacancy) => (
          <article
            className={`vacancy-card${
              selectedStateCode === vacancy.stateCode ? ' vacancy-card--selected' : ''
            }`}
            key={`${vacancy.stateCode}-${vacancy.districtLabel}`}
          >
            <div className="vacancy-card__header">
              <strong>{vacancy.districtLabel}</strong>
              <span>Vacant since {formatCaseDate(vacancy.openedDate)}</span>
            </div>
            <p>Former member: {vacancy.formerMember}</p>
            <a href={vacancy.sourceUrl} rel="noreferrer" target="_blank">
              {vacancy.sourceLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function buildDetailFacts(
  person: GovernmentPerson,
) {
  const xHandle = formatXHandle(person.xUrl)
  const serviceStartYear =
    person.roleSinceYear ??
    getLegislativeServiceLabel(person)?.replace(/^since\s+/i, '') ??
    getSupremeCourtServiceLabel(person)?.replace(/^since\s+/i, '') ??
    getIndependentAgencyServiceLabel(person)?.replace(/^since\s+/i, '')
  const displayedAppointer = getDisplayedAppointedByValue(person)
  const appointerTone = getPresidentPartyTone(person.appointedBy)

  return [
    serviceStartYear ? { label: 'In role since', value: serviceStartYear } : null,
    displayedAppointer
      ? { label: 'Appointed by', value: displayedAppointer, tone: appointerTone }
      : null,
    xHandle ? { label: 'X', value: xHandle } : null,
    person.agencyBudgetAmount ? { label: 'Budget', value: person.agencyBudgetAmount } : null,
    person.agencyFundingModel ? { label: 'Funding model', value: person.agencyFundingModel } : null,
    person.salaryAmount ? { label: 'Annual salary', value: person.salaryAmount } : null,
    person.departmentBudgetTotalAmount
      ? { label: 'Total budget', value: person.departmentBudgetTotalAmount }
      : null,
    person.departmentBudgetDiscretionaryAmount
      ? { label: 'Discretionary budget', value: person.departmentBudgetDiscretionaryAmount }
      : null,
    person.department ? { label: 'Department', value: person.department } : null,
    person.court ? { label: 'Court', value: person.court } : null,
    person.district ? { label: 'Seat', value: person.district } : null,
    person.leadership ? { label: 'Leadership', value: person.leadership } : null,
    person.phone ? { label: 'Phone', value: person.phone } : null,
  ].filter(Boolean) as Array<{ label: string; tone?: PresidentPartyTone | null; value: string }>
}

function SupremeCourtCaseMatrix({
  cases,
  justices,
  onOpenPerson,
  selectedPersonId,
}: {
  cases: SupremeCourtCase[]
  justices: GovernmentPerson[]
  onOpenPerson: (personId: string) => void
  selectedPersonId: string | null
}) {
  if (!cases.length || !justices.length) {
    return null
  }

  const sortedCases = [...cases].sort((left, right) => {
    return Date.parse(`${right.date}T00:00:00Z`) - Date.parse(`${left.date}T00:00:00Z`)
  })

  return (
    <section className="section-card case-section">
      <div className="section-card__header case-section__header">
        <div>
          <p className="eyebrow">Trump Power Cases</p>
          <h2>How The Nine Justices Lined Up</h2>
        </div>
        <p>{cases.length} Supreme Court cases. Click any justice row for the profile or any case header for the official source.</p>
      </div>

      <div className="vote-matrix">
        <div className="vote-matrix__header">
          <p className="vote-matrix__axes">Rows follow the current Court. Newest cases on the left.</p>
          <div className="vote-matrix__legend" aria-label="Case matrix legend">
            <span className="vote-matrix__legend-item">
              <i className="vote-cell vote-cell--pro" />
              Pro Trump
            </span>
            <span className="vote-matrix__legend-item">
              <i className="vote-cell vote-cell--anti" />
              Not pro Trump
            </span>
            <span className="vote-matrix__legend-item">
              <i className="vote-cell vote-cell--not_on_court" />
              Not on Court
            </span>
          </div>
        </div>

        <div className="vote-matrix__scroller">
          <table className="vote-matrix__table">
            <thead>
              <tr>
                <th className="vote-matrix__corner" scope="col">
                  <span>{justices.length} justices</span>
                  <strong>{sortedCases.length} cases</strong>
                </th>
                {sortedCases.map((caseItem) => (
                  <th className="vote-matrix__event" key={caseItem.id} scope="col">
                    <a
                      className="vote-matrix__event-link"
                      href={caseItem.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                      title={`${caseItem.caseName} • ${formatCaseDate(caseItem.date)} • ${caseItem.powerTag} • ${getTrumpCaseTypeLabel(caseItem.type)}`}
                    >
                      <span className="vote-matrix__event-date">{formatCaseDate(caseItem.date)}</span>
                      <span className="vote-matrix__event-category">{caseItem.powerTag}</span>
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {justices.map((justice) => {
                const ageLabel = formatAgeLabel(justice.birthDate, justice.birthYear)
                const serviceLabel = getSupremeCourtServiceLabel(justice)
                const scoreLabel = `${justice.trumpScore.toFixed(1)}/10`
                const compactScoreLabel = justice.trumpScore.toFixed(1)
                const isSelected = selectedPersonId === justice.id
                const compactAgeLabel = getCompactAgeValue(ageLabel)
                const compactSinceLabel = getCompactSinceValue(serviceLabel)
                const detailLabel = [ageLabel, serviceLabel].filter(Boolean).join(' • ')

                return (
                  <tr className={isSelected ? 'is-selected' : ''} key={justice.id}>
                    <th className="vote-matrix__person" scope="row">
                      <button
                        className={`vote-matrix__person-button vote-matrix__person-button--${justice.alignment}${
                          isSelected ? ' is-selected' : ''
                        }`}
                        onClick={() => onOpenPerson(justice.id)}
                        type="button"
                      >
                        <Avatar className="vote-matrix__avatar" imageUrl={justice.imageUrl} name={justice.name} />
                        <span className="vote-matrix__person-copy">
                          <span className="vote-matrix__person-heading">
                            <strong>
                              <span className="vote-matrix__desktop-copy">{justice.name}</span>
                              <span className="vote-matrix__mobile-copy">
                                {getCompactLastName(justice.name)}
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
                    {sortedCases.map((caseItem) => {
                      const stance = caseItem.justiceStances[justice.id] ?? 'not_on_court'
                      return (
                        <td className="vote-matrix__cell" key={`${justice.id}-${caseItem.id}`}>
                          <span
                            className={`vote-cell vote-cell--${stance}`}
                            title={`${justice.name} • ${caseItem.caseName} • ${getTrumpCaseStanceLabel(stance)}`}
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
      </div>
    </section>
  )
}

function HomeView({
  data,
  onBranchSelect,
}: {
  data: GovernmentDataset
  onBranchSelect: (branchId: BranchId) => void
}) {
  return (
    <main className="screen screen--home">
      <section className="branch-orbit" aria-label="Three branches of government">
        {data.branches.map((branch) => {
          const count = data.people.filter((person) =>
            branch.id === 'legislative'
              ? person.branchId === branch.id && shouldDisplayLegislativePerson(person)
              : person.branchId === branch.id,
          ).length

          return (
            <button
              key={branch.id}
              className={`branch-orb branch-orb--${branch.id}`}
              onClick={() => onBranchSelect(branch.id)}
              type="button"
            >
              <span className="branch-orb__halo" />
              <span className="branch-orb__label">{branch.name}</span>
              <strong className="branch-orb__count">{count} profiles</strong>
              <span className="branch-orb__summary">{branch.summary}</span>
            </button>
          )
        })}
      </section>
    </main>
  )
}

function PersonCard({
  isSelected,
  onOpen,
  person,
}: {
  isSelected: boolean
  onOpen: (personId: string) => void
  person: GovernmentPerson
}) {
  const xHandle = formatXHandle(person.xUrl)
  const ageLabel = formatAgeLabel(person.birthDate, person.birthYear)
  const supremeCourtServiceLabel = getSupremeCourtServiceLabel(person)
  const legislativeServiceLabel = getLegislativeServiceLabel(person)
  const independentAgencyServiceLabel = getIndependentAgencyServiceLabel(person)
  const independentAgencyAppointerLabel = getIndependentAgencyAppointerLabel(person)
  const appointerTone = getPresidentPartyTone(person.appointedBy)
  const showTrumpRelationship = shouldShowTrumpRelationship(person)
  const serviceLabels = [
    supremeCourtServiceLabel ? { label: supremeCourtServiceLabel } : null,
    legislativeServiceLabel ? { label: legislativeServiceLabel } : null,
    independentAgencyServiceLabel ? { label: independentAgencyServiceLabel } : null,
    independentAgencyAppointerLabel
      ? { label: independentAgencyAppointerLabel, tone: appointerTone }
      : null,
  ].filter(Boolean) as Array<{ label: string; tone?: PresidentPartyTone | null }>

  return (
    <button
      aria-pressed={isSelected}
      className={`person-card person-card--${person.alignment}${isSelected ? ' is-selected' : ''}`}
      onClick={() => onOpen(person.id)}
      type="button"
    >
      <Avatar className="person-avatar" imageUrl={person.imageUrl} name={person.name} />
      <span className="person-card__body">
        <span className="person-card__name-row">
          <span className="person-card__name">{person.name}</span>
          {ageLabel ? <span className="age-badge">{ageLabel}</span> : null}
        </span>
        <span className="person-card__title">{person.title}</span>
        <span className="person-card__meta">{formatSectionMeta(person)}</span>
        {serviceLabels.length > 0 ? (
          <span className="person-card__service-row">
            {serviceLabels.map(({ label, tone }) => (
              <span
                className={`service-chip${tone ? ` service-chip--${tone}` : ''}`}
                key={`${person.id}-${label}`}
              >
                {label}
              </span>
            ))}
          </span>
        ) : null}
        <span className="person-card__chips">
          <span className={`alignment-chip alignment-chip--${person.alignment}`}>
            {person.alignmentLabel}
          </span>
          {showTrumpRelationship ? (
            <span className={`trump-chip trump-chip--${getTrumpBand(person.trumpScore)}`}>
              {formatDisplayedTrumpScore(person)}
            </span>
          ) : null}
          {xHandle ? <span className="social-chip">X {xHandle}</span> : null}
        </span>
      </span>
    </button>
  )
}

function DetailPanel({
  branch,
  onClose,
  person,
  rollCall,
  section,
  supremeCourtCases,
}: {
  branch: GovernmentBranch
  onClose: () => void
  person: GovernmentPerson | null
  rollCall: LegislativeTrumpRollCall | null
  section: BranchSection | null
  supremeCourtCases: SupremeCourtCase[]
}) {
  if (rollCall) {
    const voteTotals = formatRollCallVoteTotals(rollCall)
    const outcomeLabel = formatRollCallOutcome(rollCall.trumpOutcome)
    const narrative = describeLegislativeRollCall(rollCall)

    return (
      <aside className="detail-panel detail-panel--filled">
        <button className="detail-close" onClick={onClose} type="button">
          Close
        </button>
        <div className="detail-header detail-header--roll-call">
          <div className="detail-header__copy">
            <p className="eyebrow">{formatRollCallChamber(rollCall.chamber)} roll call</p>
            <div className="detail-header__name-row">
              <h2>{rollCall.label}</h2>
            </div>
            <p className="detail-title">{formatRollCallDate(rollCall.date)}</p>
          </div>
        </div>

        <div className="detail-tags">
          <span className="detail-tag">{formatRollCallChamber(rollCall.chamber)}</span>
          <span className="detail-tag">{formatRollCallCategory(rollCall.category)}</span>
          <span
            className={`detail-tag${
              rollCall.trumpOutcome ? ` detail-tag--${rollCall.trumpOutcome}` : ''
            }`}
          >
            {outcomeLabel}
          </span>
        </div>

        <p className="detail-description">{narrative.summary}</p>

        <div className="detail-facts">
          <div className="fact-row">
            <span>Question</span>
            <strong>{rollCall.question}</strong>
          </div>
          <div className="fact-row">
            <span>Trump side cast</span>
            <strong>{rollCall.proTrumpCast}</strong>
          </div>
          <div className="fact-row">
            <span>Final result</span>
            <strong>{outcomeLabel}</strong>
          </div>
          {voteTotals ? (
            <div className="fact-row">
              <span>Vote totals</span>
              <strong>{voteTotals}</strong>
            </div>
          ) : null}
        </div>

        <section className="detail-block">
          <h3>What this vote did</h3>
          <p>{narrative.stage}</p>
        </section>

        <section className="detail-block">
          <h3>Why it counts here</h3>
          <p>{narrative.trumpLink}</p>
        </section>

        {rollCall.title !== rollCall.label ? (
          <section className="detail-block">
            <h3>Official title</h3>
            <p>{rollCall.title}</p>
          </section>
        ) : null}

        <section className="detail-links">
          <a href={rollCall.sourceUrl} rel="noreferrer" target="_blank">
            Official source
          </a>
        </section>
      </aside>
    )
  }

  if (!person || !section) {
    return (
      <aside className="detail-panel detail-panel--empty">
        <div className="detail-empty">
          <p className="eyebrow">Profile Drawer</p>
          <h2>Select a person or roll call</h2>
          <p>
            Click any person row, profile card, or Trump-linked roll call to open
            the detail view here.
          </p>
        </div>
      </aside>
    )
  }

  const facts = buildDetailFacts(person)
  const xHandle = formatXHandle(person.xUrl)
  const ageLabel = formatAgeLabel(person.birthDate, person.birthYear)
  const legislativeServiceLabel = getLegislativeServiceLabel(person)
  const independentAgencyServiceLabel = getIndependentAgencyServiceLabel(person)
  const independentAgencyAppointerLabel = getIndependentAgencyAppointerLabel(person)
  const showTrumpRelationship = shouldShowTrumpRelationship(person)
  const judicialCases =
    person.branchId === 'judicial'
      ? supremeCourtCases.filter((caseItem) => caseItem.justiceStances[person.id])
      : []

  return (
    <aside className="detail-panel detail-panel--filled">
      <button className="detail-close" onClick={onClose} type="button">
        Close
      </button>
      <div className="detail-header">
        <Avatar
          className={`detail-avatar detail-avatar--${person.alignment}`}
          imageUrl={person.imageUrl}
          name={person.name}
        />
        <div className="detail-header__copy">
          <p className="eyebrow">{section.label}</p>
          <div className="detail-header__name-row">
            <h2>{person.name}</h2>
            {ageLabel ? <span className="age-badge age-badge--detail">{ageLabel}</span> : null}
          </div>
          <p className="detail-title">{person.title}</p>
        </div>
      </div>

      <div className="detail-tags">
        <span className={`alignment-chip alignment-chip--${person.alignment}`}>
          {person.alignmentLabel}
        </span>
        <span className="detail-tag">{branch.name} Branch</span>
        {legislativeServiceLabel ? (
          <span className="service-chip">{legislativeServiceLabel}</span>
        ) : null}
        {independentAgencyServiceLabel ? (
          <span className="service-chip">{independentAgencyServiceLabel}</span>
        ) : null}
        {independentAgencyAppointerLabel ? (
          <span
            className={`service-chip${
              getPresidentPartyTone(person.appointedBy)
                ? ` service-chip--${getPresidentPartyTone(person.appointedBy)}`
                : ''
            }`}
          >
            {independentAgencyAppointerLabel}
          </span>
        ) : null}
        {showTrumpRelationship ? (
          <span className={`trump-chip trump-chip--${getTrumpBand(person.trumpScore)}`}>
            {formatDisplayedTrumpScore(person)}
          </span>
        ) : null}
      </div>

      <p className="detail-description">{person.description}</p>

      <div className="detail-facts">
        {facts.map((fact) => (
          <div className="fact-row" key={`${person.id}-${fact.label}`}>
            <span>{fact.label}</span>
            <strong className={fact.tone ? `fact-row__value--${fact.tone}` : undefined}>
              {fact.value}
            </strong>
          </div>
        ))}
      </div>

      {person.appointmentNote ? (
        <section className="detail-block">
          <h3>Appointment</h3>
          <p>{person.appointmentNote}</p>
        </section>
      ) : null}

      {person.committees && person.committees.length > 0 ? (
        <section className="detail-block">
          <h3>Committees</h3>
          <ul className="detail-list">
            {person.committees.map((committee) => (
              <li key={committee}>{committee}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {person.careerHistory && person.careerHistory.length > 0 ? (
        <section className="detail-block">
          <h3>Career history</h3>
          <ul className="detail-list">
            {person.careerHistory.map((record) => (
              <li key={`${person.id}-${record.category}-${record.summary}`}>{record.summary}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {judicialCases.length > 0 ? (
        <section className="detail-block">
          <h3>Trump Power Cases</h3>
          <div className="justice-case-list">
            {judicialCases.map((caseItem) => {
              const stance = caseItem.justiceStances[person.id]

              return (
                <article className="justice-case-item" key={`${person.id}-${caseItem.id}`}>
                  <div className="justice-case-item__header">
                    <div>
                      <h4>{caseItem.caseName}</h4>
                      <p>
                        {formatCaseDate(caseItem.date)} • {getTrumpCaseTypeLabel(caseItem.type)}
                      </p>
                    </div>
                    <span className={`case-stance-chip case-stance-chip--${stance}`}>
                      {getTrumpCaseStanceLabel(stance)}
                    </span>
                  </div>
                  <p>{caseItem.issue}</p>
                  <p>
                    <strong>Result:</strong> {caseItem.result}
                  </p>
                  <a href={caseItem.sourceUrl} rel="noreferrer" target="_blank">
                    Official source
                  </a>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {person.highestEducationSchool || person.highestDegree || person.highestEducationField ? (
        <section className="detail-block">
          <h3>Education</h3>
          {person.highestDegree ? (
            <p>
              <strong>Highest degree:</strong> {person.highestDegree}
            </p>
          ) : null}
          {person.highestEducationField ? (
            <p>
              <strong>Field:</strong> {person.highestEducationField}
            </p>
          ) : null}
          {person.highestEducationSchool ? (
            <p>
              <strong>School:</strong> {person.highestEducationSchool}
            </p>
          ) : null}
        </section>
      ) : null}

      {person.departmentBudgetTotalAmount || person.departmentBudgetDiscretionaryAmount ? (
        <section className="detail-block">
          <h3>Department Budget</h3>
          {person.departmentBudgetTotalAmount ? (
            <p>
              <strong>{person.departmentBudgetTotalLabel ?? 'Total budget'}:</strong>{' '}
              {person.departmentBudgetTotalAmount}
            </p>
          ) : null}
          {person.departmentBudgetDiscretionaryAmount ? (
            <p>
              <strong>
                {person.departmentBudgetDiscretionaryLabel ?? 'Discretionary budget'}:
              </strong>{' '}
              {person.departmentBudgetDiscretionaryAmount}
            </p>
          ) : null}
          {person.departmentBudgetNote ? <p>{person.departmentBudgetNote}</p> : null}
          {person.departmentBudgetSourceUrl && person.departmentBudgetSourceLabel ? (
            <p>
              <a href={person.departmentBudgetSourceUrl} rel="noreferrer" target="_blank">
                {person.departmentBudgetSourceLabel}
              </a>
            </p>
          ) : null}
        </section>
      ) : null}

      {person.agencyBudgetAmount || person.agencyFundingModel ? (
        <section className="detail-block">
          <h3>Agency Budget</h3>
          {person.agencyBudgetAmount ? (
            <p>
              <strong>{person.agencyBudgetLabel ?? 'Public budget'}:</strong>{' '}
              {person.agencyBudgetAmount}
            </p>
          ) : null}
          {person.agencyFundingModel ? (
            <p>
              <strong>Funding model:</strong> {person.agencyFundingModel}
            </p>
          ) : null}
          {person.agencyBudgetNote ? <p>{person.agencyBudgetNote}</p> : null}
          {person.agencyBudgetSourceUrl && person.agencyBudgetSourceLabel ? (
            <p>
              <a href={person.agencyBudgetSourceUrl} rel="noreferrer" target="_blank">
                {person.agencyBudgetSourceLabel}
              </a>
            </p>
          ) : null}
        </section>
      ) : null}

      {showTrumpRelationship ? (
        <section className="detail-block">
          <h3>Trump Relationship Estimate</h3>
          <p>
            <strong>{person.trumpLabel}.</strong>
          </p>
          {person.branchId === 'legislative' && person.trumpSampleSize != null ? (
            <p>
              <strong>Sample size:</strong> {person.trumpSampleSize}
              {person.trumpAvailableEvents ? ` of ${person.trumpAvailableEvents}` : ''} selected votes
            </p>
          ) : null}
          {person.branchId === 'legislative' && person.trumpConfidence ? (
            <p>
              <strong>Confidence:</strong> {person.trumpConfidence}
            </p>
          ) : null}
          <p>{person.trumpNote}</p>
          {person.trumpEvidence && person.trumpEvidence.length > 0 ? (
            <>
              <p>
                <strong>Evidence used:</strong>
              </p>
              <ul className="detail-list">
                {person.trumpEvidence.map((item) => (
                  <li key={`${person.id}-trump-${item}`}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ) : null}

      <section className="detail-block">
        <h3>Pay & Financial Disclosure</h3>
        {person.salaryAmount ? (
          <p>
            <strong>Current annual salary:</strong> {person.salaryAmount}
          </p>
        ) : null}
        <p>{person.salaryNote}</p>
        {person.salarySourceUrl && person.salarySourceLabel ? (
          <p>
            <a href={person.salarySourceUrl} rel="noreferrer" target="_blank">
              {person.salarySourceLabel}
            </a>
          </p>
        ) : null}
        {person.branchId === 'legislative' ? null : <p>{person.wealthNote}</p>}
        {person.financialFilingDate ? (
          <p>
            <strong>Latest annual filing date:</strong> {person.financialFilingDate}
          </p>
        ) : null}
        {person.financialDisclosureNote ? <p>{person.financialDisclosureNote}</p> : null}
      </section>

      {person.topHoldings && person.topHoldings.length > 0 ? (
        <section className="detail-block">
          <h3>Top Holdings</h3>
          <ul className="detail-list">
            {person.topHoldings.map((holding) => (
              <li className="holding-item" key={`${person.id}-${holding.label}`}>
                <span className="holding-name">{holding.label}</span>
                <span className="holding-value">{holding.value}</span>
                {holding.derivedEstimate ? (
                  <span className="holding-derived">
                    <strong>Derived estimate:</strong> {holding.derivedEstimate}
                  </span>
                ) : null}
                {holding.derivedSourceUrl && holding.derivedSourceLabel ? (
                  <a
                    className="holding-source"
                    href={holding.derivedSourceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {holding.derivedSourceLabel}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {person.liabilities && person.liabilities.length > 0 ? (
        <section className="detail-block">
          <h3>Liabilities</h3>
          <ul className="detail-list">
            {person.liabilities.map((liability) => (
              <li key={`${person.id}-${liability.creditor}-${liability.type}`}>
                {liability.creditor}: {liability.type} ({liability.amount})
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {person.recentTrades && person.recentTrades.length > 0 ? (
        <section className="detail-block">
          <h3>Recent Trades</h3>
          <ul className="detail-list">
            {person.recentTrades.map((trade) => (
              <li key={`${person.id}-${trade.assetName}-${trade.date}-${trade.amount}`}>
                {trade.date}: {trade.type} {trade.assetName} ({trade.amount})
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="detail-links">
        <a href={person.sourceUrl} rel="noreferrer" target="_blank">
          Official source
        </a>
        {person.financialDisclosureUrl && person.financialDisclosureLabel ? (
          <a href={person.financialDisclosureUrl} rel="noreferrer" target="_blank">
            {person.financialDisclosureLabel}
          </a>
        ) : null}
        {person.financialAnnualReportUrl ? (
          <a href={person.financialAnnualReportUrl} rel="noreferrer" target="_blank">
            Annual disclosure report
          </a>
        ) : null}
        {person.website && person.website !== person.sourceUrl ? (
          <a href={person.website} rel="noreferrer" target="_blank">
            Personal office site
          </a>
        ) : null}
        {person.xUrl && xHandle ? (
          <a href={person.xUrl} rel="noreferrer" target="_blank">
            X {xHandle}
          </a>
        ) : null}
      </section>
    </aside>
  )
}

function App() {
  const datasetUrl = `${import.meta.env.BASE_URL}data/governmentData.json`
  const [dataset, setDataset] = useState<GovernmentDataset | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash))
  const [isResettingLegislative, setIsResettingLegislative] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [partyFilter, setPartyFilter] = useState<PartyFilter>('all')
  const [chamberFilter, setChamberFilter] = useState<ChamberFilter>('all')
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null)
  const [selectedRollCallId, setSelectedRollCallId] = useState<string | null>(null)

  const deferredSearch = useDeferredValue(searchValue)
  const branches = dataset?.branches ?? []
  const people = dataset?.people ?? []
  const supremeCourtCases = dataset?.supremeCourtCases ?? []
  const legislativeRollCallEvents = dataset?.legislativeTrumpRollCalls?.selectedEvents ?? []
  const peopleById = new Map(people.map((person) => [person.id, person]))
  const branchesById = new Map(branches.map((branch) => [branch.id, branch]))
  const selectedBranch = route.branchId ? branchesById.get(route.branchId) ?? null : null
  const legislativePeople = people
    .filter((person) => person.branchId === 'legislative')
    .filter(shouldDisplayLegislativePerson)
  const legislativeStateSummaries = buildStateDelegationSummaries(legislativePeople)
  const rawBranchPeople = selectedBranch
    ? people.filter((person) => person.branchId === selectedBranch.id)
    : []
  const branchPeople =
    selectedBranch?.id === 'legislative'
      ? rawBranchPeople.filter(shouldDisplayLegislativePerson)
      : rawBranchPeople
  const branchSections = selectedBranch
    ? selectedBranch.sections.map((section) => {
        const allPeople = section.personIds
          .map((personId) => peopleById.get(personId))
          .filter(Boolean) as GovernmentPerson[]
        const displayPeople =
          selectedBranch.id === 'legislative'
            ? allPeople.filter(shouldDisplayLegislativePerson)
            : allPeople
        const filteredPeople =
          selectedBranch.id === 'legislative'
            ? displayPeople.filter((person) =>
                matchLegislativePerson(
                  person,
                  deferredSearch,
                  partyFilter,
                  chamberFilter,
                  selectedStateCode,
                ),
              )
            : allPeople
        const sortedPeople =
          selectedBranch.id === 'legislative' && (section.id === 'senate' || section.id === 'house')
            ? [...filteredPeople].sort((left, right) => {
                if (normalizeSearchText(deferredSearch)) {
                  const rightScore = getLegislativeSearchScore(right, deferredSearch)
                  const leftScore = getLegislativeSearchScore(left, deferredSearch)

                  if (leftScore !== rightScore) {
                    return rightScore - leftScore
                  }
                }

                return comparePeopleByAgeAscending(left, right)
              })
            : selectedBranch.id === 'executive' && section.id === 'independent-agencies'
              ? [...filteredPeople].sort((left, right) => {
                  const rankDifference = compareIndependentAgenciesByImportance(
                    left.department ?? left.subtitle ?? left.name,
                    right.department ?? right.subtitle ?? right.name,
                  )

                  if (rankDifference !== 0) {
                    return rankDifference
                  }

                  return left.sortOrder - right.sortOrder
                })
              : filteredPeople

        return {
          ...section,
          countLabel:
            selectedBranch.id === 'legislative' && section.id === 'house'
              ? `${displayPeople.length} sitting representatives`
              : section.countLabel,
          description:
            selectedBranch.id === 'legislative' && section.id === 'house'
              ? 'Voting members of the U.S. House are shown here. Current vacant seats are listed separately above.'
              : section.description,
          rollCallEvents:
            selectedBranch.id === 'legislative' && (section.id === 'house' || section.id === 'senate')
              ? legislativeRollCallEvents.filter((event) => event.chamber === section.id)
              : [],
          people: sortedPeople,
        }
      })
    : []
  const visiblePeople = branchSections.flatMap((section) => section.people)
  const visiblePersonIds = new Set(visiblePeople.map((person) => person.id))
  const selectedPerson =
    route.personId && visiblePersonIds.has(route.personId) ? peopleById.get(route.personId) ?? null : null
  const selectedSection =
    selectedPerson == null || !selectedBranch
      ? null
      : selectedBranch.sections.find((section) => section.id === selectedPerson.sectionId) ?? null
  const selectedStateSummary =
    selectedBranch?.id === 'legislative' && selectedStateCode
      ? legislativeStateSummaries.find((summary) => summary.stateCode === selectedStateCode) ?? null
      : null
  const statsPeople =
    visiblePeople.length > 0
      ? visiblePeople
      : selectedBranch?.id === 'legislative' && selectedStateCode
        ? branchPeople.filter((person) => person.stateCode === selectedStateCode)
        : branchPeople
  const stats = selectedBranch ? buildBranchStats(selectedBranch, statsPeople) : []
  const legislativeStats =
    selectedBranch?.id === 'legislative' ? buildLegislativeChamberStats(statsPeople) : []
  const judicialJustices =
    selectedBranch?.id === 'judicial'
      ? visiblePeople
          .filter((person) => person.sectionId === 'supreme-court')
          .slice()
          .sort((left, right) => left.sortOrder - right.sortOrder)
      : []
  const visibleRollCallEvents =
    selectedBranch?.id === 'legislative'
      ? branchSections.flatMap((section) => section.rollCallEvents ?? [])
      : []
  const selectedRollCall =
    selectedBranch?.id === 'legislative' && selectedRollCallId
      ? visibleRollCallEvents.find((event) => event.id === selectedRollCallId) ?? null
      : null

  useEffect(() => {
    let active = true

    fetch(datasetUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load data snapshot (${response.status})`)
        }

        return response.json() as Promise<GovernmentDataset>
      })
      .then((data) => {
        if (!active) {
          return
        }

        setDataset(data)
        setRoute(parseHash(window.location.hash, new Map(data.people.map((person) => [person.id, person]))))
      })
      .catch((error: unknown) => {
        if (!active) {
          return
        }

        setLoadError(error instanceof Error ? error.message : 'Unable to load government data.')
      })

    return () => {
      active = false
    }
  }, [datasetUrl])

  const handleHashChange = useEffectEvent(() => {
    const nextRoute = parseHash(window.location.hash, peopleById)

    if (nextRoute.branchId !== 'legislative') {
      setSelectedRollCallId(null)
    }

    setRoute(nextRoute)
  })

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!isResettingLegislative) {
      return
    }

    const resetCompleted =
      route.branchId === 'legislative' &&
      route.personId == null &&
      searchValue === '' &&
      partyFilter === 'all' &&
      chamberFilter === 'all' &&
      selectedStateCode == null

    if (resetCompleted) {
      const timeoutId = window.setTimeout(() => {
        setIsResettingLegislative(false)
      }, 0)

      return () => window.clearTimeout(timeoutId)
    }
  }, [
    chamberFilter,
    isResettingLegislative,
    partyFilter,
    route.branchId,
    route.personId,
    searchValue,
    selectedStateCode,
  ])

  function navigateTo(branchId: BranchId | null, personId?: string | null) {
    if (branchId !== 'legislative') {
      setSelectedRollCallId(null)
    }

    const nextHash = toHash(branchId, personId)

    if (window.location.hash === nextHash) {
      setRoute(parseHash(nextHash, peopleById))
      return
    }

    window.location.assign(nextHash)
  }

  function openBranch(branchId: BranchId) {
    startTransition(() => navigateTo(branchId))
  }

  function openPerson(personId: string) {
    if (!selectedBranch) {
      return
    }

    setSelectedRollCallId(null)
    startTransition(() => navigateTo(selectedBranch.id, personId))
  }

  function closePerson() {
    if (selectedRollCallId) {
      setSelectedRollCallId(null)
      return
    }

    if (!selectedBranch) {
      return
    }

    startTransition(() => navigateTo(selectedBranch.id))
  }

  function openRollCall(rollCallId: string) {
    setSelectedRollCallId(rollCallId)

    if (selectedBranch?.id === 'legislative' && route.personId) {
      startTransition(() => navigateTo('legislative'))
    }
  }

  function selectState(stateCode: string) {
    setSelectedStateCode((current) => (current === stateCode ? null : stateCode))
  }

  function clearSelectedState() {
    setSelectedStateCode(null)
  }

  function resetLegislativeView() {
    if (isResettingLegislative) {
      return
    }

    setIsResettingLegislative(true)
    setSearchValue('')
    setPartyFilter('all')
    setChamberFilter('all')
    setSelectedStateCode(null)
    setSelectedRollCallId(null)
    startTransition(() => navigateTo('legislative'))
  }

  if (loadError) {
    return (
      <main className="screen screen--home">
        <section className="hero-card">
          <p className="eyebrow">U.S. Government Atlas</p>
          <h1>Data failed to load.</h1>
          <p className="hero-copy">{loadError}</p>
        </section>
      </main>
    )
  }

  if (!dataset) {
    return (
      <main className="screen screen--home">
        <section className="hero-card">
          <p className="eyebrow">U.S. Government Atlas</p>
          <h1>Loading the branches and profiles...</h1>
          <p className="hero-copy">
            Fetching the current snapshot for the executive branch, Congress, and
            the Supreme Court.
          </p>
        </section>
      </main>
    )
  }

  if (!selectedBranch) {
    return <HomeView data={dataset} onBranchSelect={openBranch} />
  }

  return (
    <main className={`screen screen--branch screen--${selectedBranch.id}`}>
      <header className={`branch-banner branch-banner--${selectedBranch.id}`}>
        <div className="branch-banner__top">
          <button className="back-link" onClick={() => navigateTo(null)} type="button">
            Back to home
          </button>
          <div className="branch-banner__title-row">
            {selectedBranch.id === 'legislative' ? (
              <button
                aria-busy={isResettingLegislative}
                aria-label="Reset legislative view"
                className={`branch-title-button${isResettingLegislative ? ' is-loading' : ''}`}
                disabled={isResettingLegislative}
                onClick={resetLegislativeView}
                type="button"
              >
                {isResettingLegislative ? 'Refreshing...' : selectedBranch.name}
              </button>
            ) : (
              <h1>{selectedBranch.name}</h1>
            )}
            {selectedBranch.id === 'legislative' && selectedStateSummary ? (
              <h2 className="branch-state-heading">{selectedStateSummary.stateName}</h2>
            ) : null}
          </div>
        </div>
        {selectedBranch.id === 'legislative' ? null : (
          <div className="branch-banner__copy">
            <p>{selectedBranch.headline}</p>
            <p className="branch-summary">{selectedBranch.summary}</p>
          </div>
        )}
        <div
          className={`branch-stats${
            selectedBranch.id === 'legislative' ? ' branch-stats--legislative' : ''
          }`}
        >
          {selectedBranch.id === 'legislative'
            ? legislativeStats.map((group) => (
                <section className="stat-group" key={group.id}>
                  <p className="stat-group__label">{group.label}</p>
                  <div className="stat-group__grid">
                    {(['democratic', 'republican', 'independent'] as const).map((alignment) => (
                      <div
                        className={`stat-card stat-card--${alignment}`}
                        key={`${group.id}-${alignment}`}
                      >
                        <strong>{group.counts[alignment]}</strong>
                        <span>{capitalizeAlignment(alignment)}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            : stats.map((stat) => (
                <div className="stat-card" key={`${selectedBranch.id}-${stat.label}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
        </div>
      </header>

      {selectedBranch.id === 'legislative' ? (
        <>
          <LegislativeMap
            onSelectState={selectState}
            selectedStateCode={selectedStateCode}
            summaries={legislativeStateSummaries}
          />

          <section className="toolbar">
            <label className="toolbar-search">
              <span>Search lawmakers</span>
              <input
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Name, state, district, committee..."
                type="search"
                value={searchValue}
              />
            </label>
            <label>
              <span>Chamber</span>
              <select
                onChange={(event) => setChamberFilter(event.target.value as ChamberFilter)}
                value={chamberFilter}
              >
                <option value="all">All chambers</option>
                <option value="senate">Senate only</option>
                <option value="house">House only</option>
              </select>
            </label>
            <label>
              <span>Party color</span>
              <select
                onChange={(event) => setPartyFilter(event.target.value as PartyFilter)}
                value={partyFilter}
              >
                <option value="all">All parties</option>
                <option value="democratic">Democratic</option>
                <option value="republican">Republican</option>
                <option value="independent">Independent</option>
              </select>
            </label>
            <div className="toolbar-state">
              <span>Focused state</span>
              {selectedStateSummary ? (
                <button className="toolbar-state__button" onClick={clearSelectedState} type="button">
                  {selectedStateSummary.stateName}
                </button>
              ) : (
                <strong>All states</strong>
              )}
            </div>
          </section>
        </>
      ) : null}

      <section className="branch-layout">
        <div className="branch-sections">
          {branchSections.map((section) => {
            const chamberUsesMatrix =
              selectedBranch.id === 'legislative' &&
              (section.id === 'house' || section.id === 'senate') &&
              section.rollCallEvents.length > 0

            return (
              <Fragment key={section.id}>
                <section className={`section-card${chamberUsesMatrix ? ' section-card--matrix' : ''}`}>
                  <div className="section-card__header">
                    <div>
                      <p className="eyebrow">{section.countLabel}</p>
                      <h2>{section.label}</h2>
                    </div>
                    {!chamberUsesMatrix && section.description ? <p>{section.description}</p> : null}
                  </div>

                  {section.people.length ? (
                    chamberUsesMatrix ? (
                      <LegislativeVoteMatrix
                        chamberLabel={section.label}
                        events={section.rollCallEvents}
                        onOpenRollCall={openRollCall}
                        onOpenPerson={openPerson}
                        people={section.people}
                        selectedRollCallId={selectedRollCallId}
                        selectedPersonId={selectedPerson?.id ?? null}
                      />
                    ) : (
                      <div className={`people-grid people-grid--${selectedBranch.id}`}>
                        {section.people.map((person) => (
                          <PersonCard
                            isSelected={selectedPerson?.id === person.id}
                            key={person.id}
                            onOpen={openPerson}
                            person={person}
                          />
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="empty-results">
                      No profiles match the current search and filter settings.
                    </div>
                  )}
                </section>

                {selectedBranch.id === 'judicial' && section.id === 'supreme-court' ? (
                  <SupremeCourtCaseMatrix
                    cases={supremeCourtCases}
                    justices={judicialJustices}
                    onOpenPerson={openPerson}
                    selectedPersonId={selectedPerson?.id ?? null}
                  />
                ) : null}
              </Fragment>
            )
          })}
        </div>

        <DetailPanel
          branch={selectedBranch}
          onClose={closePerson}
          person={selectedPerson}
          rollCall={selectedRollCall}
          section={selectedSection}
          supremeCourtCases={supremeCourtCases}
        />
      </section>

      {selectedBranch.id === 'legislative' && chamberFilter !== 'senate' ? (
        <HouseVacancySection selectedStateCode={selectedStateCode} />
      ) : null}

      {selectedBranch.id === 'executive' ? (
        <IndependentAgencyDirectory
          onOpenPerson={openPerson}
          peopleById={peopleById}
          selectedPersonId={selectedPerson?.id ?? null}
        />
      ) : null}
    </main>
  )
}

export default App
