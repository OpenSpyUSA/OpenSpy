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
import {
  formatRollCallRecordedLine,
  formatRollCallReferenceLine,
} from './legislativeRollCallFormat'
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

type SupremeCourtCaseSelection = {
  caseItem: SupremeCourtCase
  groupLabel: string
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

function getJusticeShortName(name: string) {
  const cleaned = name.replace(/,?\s+(Jr\.|Sr\.|II|III|IV)$/i, '').trim()
  const parts = cleaned.split(/\s+/)
  return parts[parts.length - 1] ?? cleaned
}

function getTrumpCaseStanceLabel(side: TrumpCaseSide, inferred = false) {
  switch (side) {
    case 'pro':
      return inferred ? 'Pro Trump?' : 'Pro Trump'
    case 'anti':
      return inferred ? 'Not pro Trump?' : 'Not pro Trump'
    case 'not_on_court':
      return 'Not on Court'
  }
}

function getTrumpCaseTypeLabel(type: SupremeCourtCase['type']) {
  switch (type) {
    case 'merits':
      return 'Full decision'
    case 'order':
      return 'Emergency order'
    case 'procedural':
      return 'Process ruling'
  }
}

const supremeCourtCaseOpinionOverrides = new Map<string, string>([
  ['learning-resources-v-trump', 'https://www.supremecourt.gov/opinions/25pdf/24-1287_new_3135.pdf'],
  ['trump-v-illinois', 'https://www.supremecourt.gov/opinions/25pdf/25a443_new_b07d.pdf'],
  ['trump-v-jgg', 'https://www.supremecourt.gov/opinions/24pdf/604us2r25_7648.pdf'],
  ['dhs-v-thuraissigiam', 'https://www.supremecourt.gov/opinions/19pdf/591us1r48_9o6b.pdf'],
  ['trump-v-sierra-club', 'https://www.supremecourt.gov/opinions/19pdf/19a60_bqm1.pdf'],
  ['dhs-v-new-york-public-charge', 'https://www.supremecourt.gov/opinions/19pdf/19a785_j4ek.pdf'],
  ['barr-v-east-bay-sanctuary-covenant', 'https://www.supremecourt.gov/opinions/18pdf/19a230_k53l.pdf'],
  ['trump-v-hawaii', 'https://www.supremecourt.gov/opinions/preliminaryprint/585US2PP_final.pdf#page=172'],
  ['trump-v-vance', 'https://www.supremecourt.gov/opinions/19pdf/591us2r59_g3bi.pdf'],
  ['trump-v-mazars', 'https://www.supremecourt.gov/opinions/19pdf/591us2r60_lkgm.pdf'],
  ['trump-v-deutsche-bank', 'https://www.supremecourt.gov/opinions/19pdf/591us2r60_lkgm.pdf'],
])

const supremeCourtCaseDocketOverrides = new Map<string, string>([
  ['trump-v-east-bay-sanctuary-covenant', 'https://www.supremecourt.gov/docket/docketfiles/html/public/18a615.html'],
  ['republican-party-of-pa-v-degraffenreid', 'https://www.supremecourt.gov/docket/docketfiles/html/public/20-542.html'],
  ['texas-v-pennsylvania', 'https://www.supremecourt.gov/search.aspx?filename=%2Fdocket%2Fdocketfiles%2Fhtml%2Fpublic%2F22o155.html'],
])

const supremeCourtCaseOfficialWording: Record<string, string[]> = {
  'learning-resources-v-trump': [
    'THE CHIEF JUSTICE delivered the opinion of the Court with respect to Part II-B...',
    'JUSTICE BARRETT, concurring.',
    'JUSTICE GORSUCH, concurring.',
    'JUSTICE KAGAN, with whom JUSTICE SOTOMAYOR and JUSTICE JACKSON join, concurring in part and concurring in the judgment.',
    'JUSTICE KAVANAUGH, with whom JUSTICE THOMAS and JUSTICE ALITO join, dissenting.',
  ],
  'trump-v-illinois': [
    'The application for stay is denied.',
    'Justice Kavanaugh, concurring in the judgment.',
    'Justice Alito, with whom Justice Thomas joins, dissenting.',
    'Justice Gorsuch, dissenting.',
  ],
  'trump-v-orr': [
    'The application for stay presented to JUSTICE JACKSON and by her referred to the Court is granted.',
    'JUSTICE JACKSON, with whom JUSTICE SOTOMAYOR and JUSTICE KAGAN join, dissenting from the grant of application for stay.',
  ],
  'trump-v-slaughter': [
    'The application for stay presented to THE CHIEF JUSTICE and by him referred to the Court is granted.',
    'The application is also treated as a petition for a writ of certiorari before judgment, and the petition is granted.',
  ],
  'trump-v-boyle': [
    'The application for stay presented to THE CHIEF JUSTICE and by him referred to the Court is granted.',
    'JUSTICE KAVANAUGH, concurring in the grant of the application for stay.',
    'JUSTICE KAGAN, with whom JUSTICE SOTOMAYOR and JUSTICE JACKSON join, dissenting from the grant of the application for stay.',
  ],
  'mcmahon-v-new-york': [
    'The application for stay presented to JUSTICE JACKSON and by her referred to the Court is granted.',
  ],
  'trump-v-afge': [
    'The application for stay presented to Justice Kagan and by her referred to the Court is granted.',
    'JUSTICE SOTOMAYOR, concurring in the grant of stay.',
    'JUSTICE JACKSON, dissenting from the grant of application for stay.',
  ],
  'trump-v-casa': [
    'BARRETT, J., delivered the opinion of the Court, in which ROBERTS, C. J., and THOMAS, ALITO, GORSUCH, and KAVANAUGH, JJ., joined.',
  ],
  'dhs-v-dvd': [
    'The application for stay presented to JUSTICE JACKSON and by her referred to the Court is granted.',
  ],
  'noem-v-doe': [
    'The application for stay presented to JUSTICE JACKSON and by her referred to the Court is granted.',
    'JUSTICE SOTOMAYOR joins, dissenting from the grant of the application for a stay.',
  ],
  'trump-v-wilcox': [
    'The application for stay presented to THE CHIEF JUSTICE and by him referred to the Court is granted.',
  ],
  'aarp-v-trump': [
    'The Court ordered "[t]he Government" not to remove a "putative class of detainees" until this Court issues a superseding order.',
    'JUSTICE ALITO, with whom JUSTICE THOMAS joins, dissenting.',
  ],
  'trump-v-jgg': [
    'The application to vacate the orders issued by the United States District Court for the District of Columbia is granted.',
  ],
  'trump-v-united-states': [
    'ROBERTS, C. J., delivered the opinion of the Court, in which THOMAS, ALITO, GORSUCH, and KAVANAUGH, JJ., joined in full...',
  ],
  'trump-v-new-york': [
    'PER CURIAM. Every ten years, the Nation undertakes an "Enumeration" of its population...',
    'JUSTICE BREYER, with whom JUSTICE SOTOMAYOR and JUSTICE KAGAN join, dissenting.',
  ],
  'dhs-v-thuraissigiam': [
    'ALITO, J., delivered the opinion of the Court, in which ROBERTS, C. J., and THOMAS, GORSUCH, and KAVANAUGH, JJ., joined.',
  ],
  'trump-v-sierra-club': [
    'The application for stay presented to JUSTICE KAGAN and by her referred to the Court is granted.',
  ],
  'wolf-v-innovation-law-lab': [
    'Application (19A960) granted by the Court.',
    'The application for stay presented to Justice Kagan and by her referred to the Court is granted...',
  ],
  'dhs-v-new-york-public-charge': [
    'The application for stay presented to JUSTICE GINSBURG and by her referred to the Court is granted.',
    'JUSTICE GORSUCH, with whom JUSTICE THOMAS joins, concurring in the grant of stay.',
  ],
  'barr-v-east-bay-sanctuary-covenant': [
    'The application for stay presented to JUSTICE KAGAN and by her referred to the Court is granted.',
  ],
  'dhs-v-regents': [
    'THE CHIEF JUSTICE delivered the opinion of the Court, except as to Part IV...',
  ],
  'department-of-commerce-v-new-york': [
    'ROBERTS, C. J., delivered the opinion for a unanimous Court with respect to Parts I and II...',
  ],
  'nielsen-v-preap': [
    'JUSTICE ALITO delivered the opinion of the Court with respect to Parts I, III-A, III-B-1, and IV...',
  ],
  'trump-v-east-bay-sanctuary-covenant': [
    'The application for stay presented to Justice Kagan and by her referred to the Court is denied.',
    'Justice Thomas, Justice Alito, Justice Gorsuch, and Justice Kavanaugh would grant the application for stay.',
  ],
  'trump-v-hawaii': [
    'ROBERTS, C. J., delivered the opinion of the Court, in which KENNEDY, THOMAS, ALITO, and GORSUCH, JJ., joined.',
  ],
  'trump-v-hawaii-2017-stay': [
    'The application for stay of mandate presented to Justice Kennedy and by him referred to the Court is granted...',
    'Justice Thomas, with whom Justice Alito and Justice Gorsuch join, concurring in part and dissenting in part.',
  ],
  'trump-v-irap': [
    'Application (16A1190) and application (16A1191) are GRANTED IN PART.',
    'Justice Thomas, with whom Justice Alito and Justice Gorsuch join, concurring in part and dissenting in part.',
  ],
  'trump-v-new-york-criminal-stay': [
    'Application (24A666) for stay presented to Justice Sotomayor and by her referred to the Court is denied...',
    'Justice Thomas, Justice Alito, Justice Gorsuch, and Justice Kavanaugh would grant the application.',
  ],
  'republican-party-of-pa-v-boockvar-expedition': [
    'The motion to expedite consideration of the petition for a writ of certiorari is denied.',
    'Statement of JUSTICE ALITO, with whom JUSTICE THOMAS and JUSTICE GORSUCH join.',
  ],
  'trump-v-anderson': [
    'Because the Constitution makes Congress, rather than the States, responsible for enforcing Section 3 against federal officeholders and candidates, we reverse.',
  ],
  'trump-v-thompson': [
    'The application for stay of mandate and injunction pending review presented to THE CHIEF JUSTICE and by him referred to the Court is denied.',
    'JUSTICE THOMAS would grant the application.',
    'Statement of JUSTICE KAVANAUGH respecting the denial of the application.',
  ],
  'republican-party-of-pa-v-degraffenreid': [
    'The petitions for writs of certiorari are denied.',
    'THOMAS, J., dissenting.',
  ],
  'trump-v-vance': [
    'ROBERTS, C. J., delivered the opinion of the Court, in which GINSBURG, BREYER, SOTOMAYOR, and KAGAN, JJ., joined.',
  ],
  'trump-v-mazars': [
    'ROBERTS, C. J., delivered the opinion of the Court, in which GINSBURG, BREYER, SOTOMAYOR, KAGAN, GORSUCH, and KAVANAUGH, JJ., joined.',
  ],
  'trump-v-deutsche-bank': [
    'ROBERTS, C. J., delivered the opinion of the Court, in which GINSBURG, BREYER, SOTOMAYOR, KAGAN, GORSUCH, and KAVANAUGH, JJ., joined.',
  ],
  'texas-v-pennsylvania': [
    "The State of Texas's motion for leave to file a bill of complaint is denied for lack of standing under Article III of the Constitution.",
    'Statement of Justice Alito, with whom Justice Thomas joins: I would therefore grant the motion to file the bill of complaint but would not grant other relief.',
  ],
}

const inferredSupremeCourtCaseIds = new Set<string>([
  'aarp-v-trump',
  'aarp-v-trump-interim-order',
  'barr-v-east-bay-sanctuary-covenant',
  'dhs-v-dvd',
  'dhs-v-new-york-public-charge',
  'mcmahon-v-new-york',
  'noem-v-doe',
  'republican-party-of-pa-v-boockvar-expedition',
  'republican-party-of-pa-v-degraffenreid',
  'texas-v-pennsylvania',
  'trump-v-afge',
  'trump-v-east-bay-sanctuary-covenant',
  'trump-v-hawaii-2017-stay',
  'trump-v-illinois',
  'trump-v-irap',
  'trump-v-jgg',
  'trump-v-new-york-criminal-stay',
  'trump-v-orr',
  'trump-v-sierra-club',
  'trump-v-sierra-club-2019-stay',
  'trump-v-slaughter',
  'trump-v-thompson',
  'trump-v-wilcox',
  'trump-v-boyle',
  'wolf-v-innovation-law-lab',
])

const confirmedSupremeCourtJusticeIdsByCase = new Map<string, Set<string>>([
  [
    'aarp-v-trump',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-brett-m-kavanaugh',
    ]),
  ],
  [
    'aarp-v-trump-interim-order',
    new Set(['judicial-clarence-thomas', 'judicial-samuel-a-alito-jr']),
  ],
  [
    'dhs-v-new-york-public-charge',
    new Set(['judicial-clarence-thomas', 'judicial-neil-m-gorsuch']),
  ],
  [
    'noem-v-doe',
    new Set(['judicial-sonia-sotomayor']),
  ],
  [
    'republican-party-of-pa-v-boockvar-expedition',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-neil-m-gorsuch',
    ]),
  ],
  [
    'republican-party-of-pa-v-degraffenreid',
    new Set(['judicial-clarence-thomas']),
  ],
  [
    'texas-v-pennsylvania',
    new Set(['judicial-clarence-thomas', 'judicial-samuel-a-alito-jr']),
  ],
  [
    'trump-v-afge',
    new Set(['judicial-sonia-sotomayor', 'judicial-ketanji-brown-jackson']),
  ],
  [
    'trump-v-east-bay-sanctuary-covenant',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-neil-m-gorsuch',
      'judicial-brett-m-kavanaugh',
    ]),
  ],
  [
    'trump-v-hawaii-2017-stay',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-neil-m-gorsuch',
    ]),
  ],
  [
    'trump-v-illinois',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-neil-m-gorsuch',
      'judicial-brett-m-kavanaugh',
    ]),
  ],
  [
    'trump-v-irap',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-neil-m-gorsuch',
    ]),
  ],
  [
    'trump-v-new-york-criminal-stay',
    new Set([
      'judicial-clarence-thomas',
      'judicial-samuel-a-alito-jr',
      'judicial-neil-m-gorsuch',
      'judicial-brett-m-kavanaugh',
    ]),
  ],
  [
    'trump-v-orr',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-ketanji-brown-jackson',
    ]),
  ],
  [
    'trump-v-sierra-club',
    new Set(['judicial-sonia-sotomayor', 'judicial-elena-kagan']),
  ],
  [
    'trump-v-sierra-club-2019-stay',
    new Set(['judicial-sonia-sotomayor', 'judicial-elena-kagan']),
  ],
  [
    'trump-v-thompson',
    new Set(['judicial-clarence-thomas', 'judicial-brett-m-kavanaugh']),
  ],
])

function isSupremeCourtOpinionUrl(url: string) {
  return url.includes('/opinions/') || url.includes('/orders/courtorders/')
}

function isSupremeCourtDocketUrl(url: string) {
  return (
    url.includes('/docket/docketfiles/html/public/') ||
    url.includes('filename=%2Fdocket%2Fdocketfiles%2Fhtml%2Fpublic') ||
    url.includes('filename=/docket/docketfiles/html/public/')
  )
}

function extractSupremeCourtDocketId(url: string) {
  const decoded = decodeURIComponent(url)
  const docketMatch = decoded.match(/\/docket\/docketfiles\/html\/public\/([^./?]+)\.html/i)

  if (docketMatch?.[1]) {
    return docketMatch[1]
  }

  const opinionMatch = decoded.match(/\/opinions\/[^/]+\/([0-9a-z-]+)(?:_[^/]+)?\.pdf/i)

  if (opinionMatch?.[1]) {
    return opinionMatch[1]
  }

  return null
}

function buildSupremeCourtDocketUrl(docketId: string) {
  return `https://www.supremecourt.gov/docket/docketfiles/html/public/${docketId}.html`
}

function getSupremeCourtCaseOpinionUrl(caseItem: SupremeCourtCase) {
  return supremeCourtCaseOpinionOverrides.get(caseItem.id) ??
    (isSupremeCourtOpinionUrl(caseItem.sourceUrl) ? caseItem.sourceUrl : null)
}

function getSupremeCourtCaseDocketUrl(caseItem: SupremeCourtCase) {
  const override = supremeCourtCaseDocketOverrides.get(caseItem.id)

  if (override) {
    return override
  }

  if (isSupremeCourtDocketUrl(caseItem.sourceUrl)) {
    return caseItem.sourceUrl
  }

  const docketId = extractSupremeCourtDocketId(caseItem.sourceUrl)
  return docketId ? buildSupremeCourtDocketUrl(docketId) : null
}

function SupremeCourtCaseLinks({ caseItem }: { caseItem: SupremeCourtCase }) {
  const opinionUrl = getSupremeCourtCaseOpinionUrl(caseItem)
  const docketUrl = getSupremeCourtCaseDocketUrl(caseItem)

  return (
    <div className="detail-links detail-links--pair">
      {opinionUrl ? (
        <a href={opinionUrl} rel="noreferrer" target="_blank">
          Opinion
        </a>
      ) : (
        <span className="detail-link-disabled">Opinion unavailable</span>
      )}
      {docketUrl ? (
        <a href={docketUrl} rel="noreferrer" target="_blank">
          Docket
        </a>
      ) : (
        <span className="detail-link-disabled">Docket unavailable</span>
      )}
    </div>
  )
}

function getSupremeCourtOfficialWording(caseItem: SupremeCourtCase) {
  return supremeCourtCaseOfficialWording[caseItem.id] ?? []
}

function isInferredSupremeCourtJusticeStance(caseItem: SupremeCourtCase, justiceId: string) {
  const stance = caseItem.justiceStances[justiceId] ?? 'not_on_court'

  if (stance === 'not_on_court' || !inferredSupremeCourtCaseIds.has(caseItem.id)) {
    return false
  }

  return !confirmedSupremeCourtJusticeIdsByCase.get(caseItem.id)?.has(justiceId)
}

function getSupremeCourtJusticeLineupBySide(
  caseItem: SupremeCourtCase,
  judicialJustices: GovernmentPerson[],
  side: Exclude<TrumpCaseSide, 'not_on_court'>,
) {
  return judicialJustices
    .filter((justice) => caseItem.justiceStances[justice.id] === side)
    .map((justice) => ({
      inferred: isInferredSupremeCourtJusticeStance(caseItem, justice.id),
      name: getJusticeShortName(justice.name),
    }))
}

function getSupremeCourtNotOnCourtLineup(caseItem: SupremeCourtCase, judicialJustices: GovernmentPerson[]) {
  return judicialJustices
    .filter((justice) => caseItem.justiceStances[justice.id] === 'not_on_court')
    .map((justice) => getJusticeShortName(justice.name))
}

function formatSupremeCourtJusticeList(
  lineup: Array<{
    inferred: boolean
    name: string
  }>,
) {
  return lineup.length > 0
    ? lineup.map(({ inferred, name }) => `${name}${inferred ? '?' : ''}`).join(', ')
    : 'None'
}

function formatSupremeCourtLineupCount(
  countLabel: string,
  confirmedCount: number,
  inferredCount: number,
) {
  if (confirmedCount > 0 && inferredCount > 0) {
    return `${confirmedCount} ${countLabel} + ${inferredCount} ${countLabel}?`
  }

  if (inferredCount > 0) {
    return `${inferredCount} ${countLabel}?`
  }

  return `${confirmedCount} ${countLabel}`
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

function formatRollCallSignalTier(rollCall: LegislativeTrumpRollCall) {
  return rollCall.signalTier === 'broad_admin_related'
    ? 'Broader Trump-related'
    : 'Direct Trump-related'
}

function formatRollCallScoringStatus(rollCall: LegislativeTrumpRollCall) {
  return rollCall.scoreIncluded ? 'Used in Trump score' : 'Shown for context only'
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
  eyebrow,
  justices,
  onOpenCase,
  onOpenPerson,
  selectedCaseId,
  selectedPersonId,
  showScore = true,
}: {
  cases: SupremeCourtCase[]
  eyebrow: string
  justices: GovernmentPerson[]
  onOpenCase: (caseId: string) => void
  onOpenPerson: (personId: string) => void
  selectedCaseId: string | null
  selectedPersonId: string | null
  showScore?: boolean
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
          <h2 className="case-section__title">{eyebrow}</h2>
        </div>
        <p>{cases.length} Supreme Court cases. Click any justice row for the profile or any case header for the case card.</p>
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
                {sortedCases.map((caseItem) => {
                  const isSelectedCase = selectedCaseId === caseItem.id

                  return (
                    <th
                      className={`vote-matrix__event${isSelectedCase ? ' is-selected' : ''}`}
                      key={caseItem.id}
                      scope="col"
                    >
                      <button
                        className={`vote-matrix__event-link${isSelectedCase ? ' is-selected' : ''}`}
                        onClick={() => onOpenCase(caseItem.id)}
                        title={`${caseItem.caseName} • ${formatCaseDate(caseItem.date)} • ${caseItem.powerTag} • ${getTrumpCaseTypeLabel(caseItem.type)}`}
                        type="button"
                      >
                        <span className="vote-matrix__event-date">{formatCaseDate(caseItem.date)}</span>
                        <span className="vote-matrix__event-category">{caseItem.powerTag}</span>
                      </button>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {justices.map((justice) => {
                const ageLabel = formatAgeLabel(justice.birthDate, justice.birthYear)
                const serviceLabel = getSupremeCourtServiceLabel(justice)
                const scoreLabel = `${justice.trumpScore.toFixed(1)}/10`
                const compactScoreLabel = justice.trumpScore.toFixed(1)
                const isSelected = selectedPersonId === justice.id
                const detailLabel = [ageLabel, serviceLabel].filter(Boolean).join(' • ')
                const compactDetailLabel = [
                  getCompactAgeValue(ageLabel),
                  getCompactSinceValue(serviceLabel),
                ]
                  .filter(Boolean)
                  .join(' • ')

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
                            {showScore ? (
                              <span className="vote-matrix__score">
                                <span className="vote-matrix__desktop-copy">{scoreLabel}</span>
                                <span className="vote-matrix__mobile-copy">{compactScoreLabel}</span>
                              </span>
                            ) : null}
                          </span>
                          <span className="vote-matrix__person-detail">
                            <span className="vote-matrix__desktop-copy">{detailLabel}</span>
                            <span className="vote-matrix__mobile-copy">{compactDetailLabel}</span>
                          </span>
                        </span>
                      </button>
                    </th>
                    {sortedCases.map((caseItem) => {
                      const stance = caseItem.justiceStances[justice.id] ?? 'not_on_court'
                      const inferred = isInferredSupremeCourtJusticeStance(caseItem, justice.id)
                      return (
                        <td className="vote-matrix__cell" key={`${justice.id}-${caseItem.id}`}>
                          <span
                            className={`vote-cell vote-cell--${stance}${inferred ? ' vote-cell--inferred' : ''}`}
                            title={`${justice.name} • ${caseItem.caseName} • ${getTrumpCaseStanceLabel(stance, inferred)}`}
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
  supremeCourtCaseSelection,
  supremeCourtPersonalCases,
  supremeCourtCases,
  judicialJustices,
}: {
  branch: GovernmentBranch
  onClose: () => void
  person: GovernmentPerson | null
  rollCall: LegislativeTrumpRollCall | null
  section: BranchSection | null
  supremeCourtCaseSelection: SupremeCourtCaseSelection | null
  supremeCourtPersonalCases: SupremeCourtCase[]
  supremeCourtCases: SupremeCourtCase[]
  judicialJustices: GovernmentPerson[]
}) {
  if (rollCall) {
    const voteTotals = formatRollCallVoteTotals(rollCall)
    const outcomeLabel = formatRollCallOutcome(rollCall.trumpOutcome)
    const signalTierLabel = formatRollCallSignalTier(rollCall)
    const narrative = describeLegislativeRollCall(rollCall)
    const referenceLine = formatRollCallReferenceLine(rollCall)
    const recordedLine = formatRollCallRecordedLine(rollCall)

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
            {referenceLine ? <p className="detail-title">{referenceLine}</p> : null}
            {recordedLine ? (
              <p className={referenceLine ? 'detail-subtitle' : 'detail-title'}>{recordedLine}</p>
            ) : null}
          </div>
        </div>

        <div className="detail-tags">
          <span className="detail-tag">{formatRollCallChamber(rollCall.chamber)}</span>
          <span className="detail-tag">{formatRollCallCategory(rollCall.category)}</span>
          <span className="detail-tag">{signalTierLabel}</span>
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
            <span>Tier</span>
            <strong>{signalTierLabel}</strong>
          </div>
          <div className="fact-row">
            <span>Scoring</span>
            <strong>{formatRollCallScoringStatus(rollCall)}</strong>
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

  if (supremeCourtCaseSelection) {
    const { caseItem, groupLabel } = supremeCourtCaseSelection
    const officialWording = getSupremeCourtOfficialWording(caseItem)
    const proJustices = getSupremeCourtJusticeLineupBySide(caseItem, judicialJustices, 'pro')
    const antiJustices = getSupremeCourtJusticeLineupBySide(caseItem, judicialJustices, 'anti')
    const notOnCourtJustices = getSupremeCourtNotOnCourtLineup(caseItem, judicialJustices)
    const confirmedProCount = proJustices.filter((justice) => !justice.inferred).length
    const inferredProCount = proJustices.length - confirmedProCount
    const confirmedAntiCount = antiJustices.filter((justice) => !justice.inferred).length
    const inferredAntiCount = antiJustices.length - confirmedAntiCount

    return (
      <aside className="detail-panel detail-panel--filled">
        <button className="detail-close" onClick={onClose} type="button">
          Close
        </button>
        <div className="detail-header detail-header--roll-call">
          <div className="detail-header__copy">
            <p className="eyebrow">Supreme Court Case</p>
            <div className="detail-header__name-row">
              <h2>{caseItem.caseName}</h2>
            </div>
            <p className="detail-title">
              {formatCaseDate(caseItem.date)} • {getTrumpCaseTypeLabel(caseItem.type)}
            </p>
          </div>
        </div>

        <div className="detail-tags">
          <span className="detail-tag">{groupLabel}</span>
          <span className="detail-tag">{caseItem.powerTag}</span>
          <span className="detail-tag">{getTrumpCaseTypeLabel(caseItem.type)}</span>
        </div>

        <p className="detail-description">{caseItem.issue}</p>

        <div className="detail-facts">
          <div className="fact-row">
            <span>Collection</span>
            <strong>{groupLabel}</strong>
          </div>
          <div className="fact-row">
            <span>Tag</span>
            <strong>{caseItem.powerTag}</strong>
          </div>
          <div className="fact-row">
            <span>Type</span>
            <strong>{getTrumpCaseTypeLabel(caseItem.type)}</strong>
          </div>
          <div className="fact-row">
            <span>Current Court lineup</span>
            <strong>
              {formatSupremeCourtLineupCount('pro', confirmedProCount, inferredProCount)} •{' '}
              {formatSupremeCourtLineupCount('not pro', confirmedAntiCount, inferredAntiCount)} •{' '}
              {notOnCourtJustices.length} not on Court
            </strong>
          </div>
        </div>

        <section className="detail-block">
          <h3>Result</h3>
          <p>{caseItem.result}</p>
        </section>

        {officialWording.length > 0 ? (
          <section className="detail-block">
            <h3>Official wording</h3>
            <div className="detail-quote-list">
              {officialWording.map((quote, index) => (
                <p className="detail-quote" key={`${caseItem.id}-${index}`}>
                  {quote}
                </p>
              ))}
            </div>
          </section>
        ) : null}

        <section className="detail-block">
          <h3>Current Court lineup</h3>
          <p>
            <strong>Pro Trump:</strong> {formatSupremeCourtJusticeList(proJustices)}
          </p>
          <p>
            <strong>Not pro Trump:</strong> {formatSupremeCourtJusticeList(antiJustices)}
          </p>
          {notOnCourtJustices.length > 0 ? (
            <p>
              <strong>Not on Court:</strong> {notOnCourtJustices.join(', ')}
            </p>
          ) : null}
        </section>

        <SupremeCourtCaseLinks caseItem={caseItem} />
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
            Click any person row, profile card, Supreme Court case, or Trump-linked roll
            call to open the detail view here.
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
  const judicialPersonalCases =
    person.branchId === 'judicial'
      ? supremeCourtPersonalCases.filter((caseItem) => caseItem.justiceStances[person.id])
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
          <h3>Trump Administration Cases</h3>
          <div className="justice-case-list">
            {judicialCases.map((caseItem) => {
              const stance = caseItem.justiceStances[person.id]
              const inferred = isInferredSupremeCourtJusticeStance(caseItem, person.id)

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
                      {getTrumpCaseStanceLabel(stance, inferred)}
                    </span>
                  </div>
                  <p>{caseItem.issue}</p>
                  <p>
                    <strong>Result:</strong> {caseItem.result}
                  </p>
                  <SupremeCourtCaseLinks caseItem={caseItem} />
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {judicialPersonalCases.length > 0 ? (
        <section className="detail-block">
          <h3>Trump Personal Cases</h3>
          <div className="justice-case-list">
            {judicialPersonalCases.map((caseItem) => {
              const stance = caseItem.justiceStances[person.id]
              const inferred = isInferredSupremeCourtJusticeStance(caseItem, person.id)

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
                      {getTrumpCaseStanceLabel(stance, inferred)}
                    </span>
                  </div>
                  <p>{caseItem.issue}</p>
                  <p>
                    <strong>Result:</strong> {caseItem.result}
                  </p>
                  <SupremeCourtCaseLinks caseItem={caseItem} />
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
  const [selectedSupremeCourtCaseId, setSelectedSupremeCourtCaseId] = useState<string | null>(null)

  const deferredSearch = useDeferredValue(searchValue)
  const branches = dataset?.branches ?? []
  const people = dataset?.people ?? []
  const supremeCourtCases = dataset?.supremeCourtCases ?? []
  const supremeCourtPersonalCases = dataset?.supremeCourtPersonalCases ?? []
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
  const legislativeOverviewSummary =
    selectedBranch?.id !== 'legislative'
      ? ''
      : selectedStateSummary
        ? `${selectedStateSummary.stateName} currently sends ${selectedStateSummary.houseCount} representatives and ${selectedStateSummary.senateCount} senators. ${selectedStateSummary.balanceLabel}. Open any member below to see biography, finance, social links, and vote context.`
        : 'Start with the state map, then move into the Senate and House below to open member profiles, compare party balance, and trace how lawmakers line up on major Trump-linked votes.'
  const selectedRollCall =
    selectedBranch?.id === 'legislative' && selectedRollCallId
      ? visibleRollCallEvents.find((event) => event.id === selectedRollCallId) ?? null
      : null
  const selectedSupremeCourtCase =
    selectedBranch?.id === 'judicial' && selectedSupremeCourtCaseId
      ? (
          [
            { cases: supremeCourtCases, groupLabel: 'Trump Administration Cases' },
            { cases: supremeCourtPersonalCases, groupLabel: 'Trump Personal Cases' },
          ] as Array<{ cases: SupremeCourtCase[]; groupLabel: string }>
        )
          .flatMap(({ cases, groupLabel }) => cases.map((caseItem) => ({ caseItem, groupLabel })))
          .find(({ caseItem }) => caseItem.id === selectedSupremeCourtCaseId) ?? null
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

    if (nextRoute.branchId !== 'judicial') {
      setSelectedSupremeCourtCaseId(null)
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

    if (branchId !== 'judicial') {
      setSelectedSupremeCourtCaseId(null)
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
    setSelectedSupremeCourtCaseId(null)
    startTransition(() => navigateTo(selectedBranch.id, personId))
  }

  function closePerson() {
    if (selectedRollCallId) {
      setSelectedRollCallId(null)
      return
    }

    if (selectedSupremeCourtCaseId) {
      setSelectedSupremeCourtCaseId(null)
      return
    }

    if (!selectedBranch) {
      return
    }

    startTransition(() => navigateTo(selectedBranch.id))
  }

  function openRollCall(rollCallId: string) {
    setSelectedRollCallId(rollCallId)
    setSelectedSupremeCourtCaseId(null)

    if (selectedBranch?.id === 'legislative' && route.personId) {
      startTransition(() => navigateTo('legislative'))
    }
  }

  function openSupremeCourtCase(caseId: string) {
    setSelectedSupremeCourtCaseId(caseId)
    setSelectedRollCallId(null)

    if (selectedBranch?.id === 'judicial' && route.personId) {
      startTransition(() => navigateTo('judicial'))
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
        {selectedBranch.id === 'legislative' ? (
          <div className="branch-banner__copy branch-banner__copy--legislative">
            <p className="branch-banner__lede">
              Congress translates elections, party coalitions, committees, and state
              delegations into lawmaking, appropriations, confirmations, and oversight.
            </p>
            <p className="branch-summary">{legislativeOverviewSummary}</p>
          </div>
        ) : (
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
                    eyebrow="Trump Administration Cases"
                    justices={judicialJustices}
                    onOpenCase={openSupremeCourtCase}
                    onOpenPerson={openPerson}
                    selectedCaseId={selectedSupremeCourtCaseId}
                    selectedPersonId={selectedPerson?.id ?? null}
                  />
                ) : null}
                {selectedBranch.id === 'judicial' && section.id === 'supreme-court' ? (
                  <SupremeCourtCaseMatrix
                    cases={supremeCourtPersonalCases}
                    eyebrow="Trump Personal Cases"
                    justices={judicialJustices}
                    onOpenCase={openSupremeCourtCase}
                    onOpenPerson={openPerson}
                    selectedCaseId={selectedSupremeCourtCaseId}
                    selectedPersonId={selectedPerson?.id ?? null}
                    showScore={false}
                  />
                ) : null}
              </Fragment>
            )
          })}
        </div>

        <DetailPanel
          branch={selectedBranch}
          judicialJustices={judicialJustices}
          onClose={closePerson}
          person={selectedPerson}
          rollCall={selectedRollCall}
          section={selectedSection}
          supremeCourtCaseSelection={selectedSupremeCourtCase}
          supremeCourtPersonalCases={supremeCourtPersonalCases}
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
