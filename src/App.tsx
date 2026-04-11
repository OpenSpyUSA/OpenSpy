import {
  Fragment,
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'
import type { CSSProperties } from 'react'
import { Avatar } from './components/Avatar'
import { CompanyLogoMark } from './components/CompanyLogoMark'
import { ExecutiveMilitaryGlobe } from './components/ExecutiveMilitaryGlobe'
import { IndependentAgencyDirectory } from './components/IndependentAgencyDirectory'
import {
  EXECUTIVE_SHUTDOWN_AREA_GROUPS,
  EXECUTIVE_SHUTDOWN_EVENTS,
  EXECUTIVE_SHUTDOWN_EVENT_MAP,
} from './executiveShutdownMeta'
import { EXECUTIVE_AREA_SEAL_URLS } from './executiveAreaSeals'
import { HOUSE_VACANCIES } from './houseVacancies'
import { compareIndependentAgenciesByImportance } from './independentAgencyCatalog'
import { LegislativeVoteMatrix } from './components/LegislativeVoteMatrix'
import {
  compareLegislativeRollCallsByRecency,
  formatRollCallRecordedLine,
  formatRollCallReferenceLine,
  getRollCallThresholdLabel,
} from './legislativeRollCallFormat'
import { LegislativeMap } from './components/LegislativeMap'
import { getRollCallVideoLink } from './legislativeRollCallVideo'
import './App.css'
import trumpTruthAvatarUrl from './assets/trump-truth-avatar.jpeg'
import trumpTruthHeaderUrl from './assets/trump-truth-header.jpeg'
import {
  formatAgeLabel,
  getCompactAgeValue,
  getCompactLastName,
  getCompactSinceValue,
  getSortableAge,
} from './personMeta'
import { describeLegislativeRollCall } from './legislativeRollCallMeta'
import { FIFTY_STATE_CODES, STATE_CODE_TO_NAME } from './stateMeta'
import { STATE_PROFILE_META } from './stateProfileMeta'
import {
  STATE_PROFILE_DEBT_OUTSTANDING_THOUSANDS,
  STATE_PROFILE_DEBT_SOURCE_URL,
} from './stateProfileMeta'
import {
  BIOTECH_CONNECTIONS,
  type BiotechConnectionCategory,
} from './biotechConnections'
import { BIOTECH_COMPANIES, type BiotechCompanyCategory } from './biotechCompanies'
import {
  BIOTECH_MENTIONS,
  type BiotechMentionTier,
} from './biotechMentionEvidence'
import { BIOTECH_EVENT_INDEX } from './biotechEventIndex'
import {
  JUDICIAL_BIOTECH_CASES,
  JUDICIAL_BIOTECH_CASE_GROUPS,
  type JudicialBiotechCaseGroupId,
} from './judicialBiotechCases'
import { SOURCE_DATE_OVERRIDES_BY_URL } from './sourceDateOverrides'
import { TRUMP_TRUTH_SNAPSHOT, type TrumpTruthPost } from './trumpTruthSnapshot'
import { formatTrumpScore, getTrumpBand } from './trumpScore'
import { formatXHandle } from './xProfile'
import type {
  Alignment,
  BranchId,
  EconomyHistoryPoint,
  EconomyHistoryRange,
  BranchSection,
  EconomyMetric,
  ExecutiveCongressRollCallVote,
  ExecutiveCongressServiceRecord,
  GovernmentBranch,
  GovernmentDataset,
  GovernmentPerson,
  DisclosureTrade,
  LegislativeTrumpRollCall,
  SourceLink,
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
const populationCountFormatter = new Intl.NumberFormat('en-US')
const trumpTruthDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  month: 'long',
  timeZone: 'America/New_York',
  year: 'numeric',
})
const shutdownTimelineMonthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})
const shutdownChipMonthDayFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})
const shutdownChipMonthDayYearFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})
const FALLBACK_SOURCE_CHECKED_DATE_LABEL = 'Checked Apr 10, 2026'
const MS_PER_DAY = 24 * 60 * 60 * 1000
const ECONOMY_SHORT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const ECONOMY_MONTH_INDEX_BY_NAME = new Map(
  ECONOMY_SHORT_MONTH_NAMES.map((monthName, monthIndex) => [monthName, monthIndex]),
)
const SOURCE_SHORT_MONTH_INDEX_BY_NAME = new Map([
  ['jan', 0],
  ['january', 0],
  ['feb', 1],
  ['february', 1],
  ['mar', 2],
  ['march', 2],
  ['apr', 3],
  ['april', 3],
  ['may', 4],
  ['jun', 5],
  ['june', 5],
  ['jul', 6],
  ['july', 6],
  ['aug', 7],
  ['august', 7],
  ['sep', 8],
  ['sept', 8],
  ['september', 8],
  ['oct', 9],
  ['october', 9],
  ['nov', 10],
  ['november', 10],
  ['dec', 11],
  ['december', 11],
])
const sourceDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})
const sourceMonthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})
type JudicialMediaMirrorLink = {
  label: string
  url: string
}

function createYouTubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`
}

const JUDICIAL_MEDIA_MIRRORS: Record<string, JudicialMediaMirrorLink> = {
  'amgen-v-sanofi': {
    label: 'The High Court Report video',
    url: createYouTubeWatchUrl('xPSqZsr-z44'),
  },
  'bowman-v-monsanto': {
    label: 'PuppyJusticeAutomated video',
    url: createYouTubeWatchUrl('Oeh1ZnLLMsc'),
  },
  'bruesewitz-v-wyeth': {
    label: 'PuppyJusticeAutomated video',
    url: createYouTubeWatchUrl('P6P4o7vhpX0'),
  },
  'dobbs-v-jackson': {
    label: '@SCOTUSOralArgument video',
    url: createYouTubeWatchUrl('11g5nAAPw4M'),
  },
  'fda-v-alliance-for-hippocratic-medicine': {
    label: '@SCOTUSOralArgument video',
    url: createYouTubeWatchUrl('TzXCPlqpRiI'),
  },
  'mayo-v-prometheus': {
    label: 'PuppyJusticeAutomated video',
    url: createYouTubeWatchUrl('ydRGXjAX-Vs'),
  },
  'myriad-genetics': {
    label: 'PuppyJusticeAutomated video',
    url: createYouTubeWatchUrl('ukihf6A-5bo'),
  },
  'mutual-pharmaceutical-v-bartlett': {
    label: 'PuppyJusticeAutomated video',
    url: createYouTubeWatchUrl('CAwjRS5Rp38'),
  },
  'pliva-v-mensing': {
    label: 'PuppyJusticeAutomated video',
    url: createYouTubeWatchUrl('br3Qj76xFCI'),
  },
}

function createUtcDate(year: number, monthIndex: number, day: number) {
  return new Date(Date.UTC(year, monthIndex, day))
}

function normalizeSourceMonthName(monthName: string) {
  return monthName.toLowerCase().replace(/\.$/, '')
}

function formatParsedSourceDate(year: number, monthIndex: number, day?: number) {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(monthIndex) ||
    monthIndex < 0 ||
    monthIndex > 11 ||
    (day != null && (!Number.isInteger(day) || day < 1 || day > 31))
  ) {
    return null
  }

  const safeDate = createUtcDate(year, monthIndex, day ?? 1)
  if (
    safeDate.getUTCFullYear() !== year ||
    safeDate.getUTCMonth() !== monthIndex ||
    (day != null && safeDate.getUTCDate() !== day)
  ) {
    return null
  }

  return day ? sourceDateFormatter.format(safeDate) : sourceMonthYearFormatter.format(safeDate)
}

function inferSourceDateFromText(text: string) {
  const monthDayYearMatch = text.match(
    /\b(Jan\.?|January|Feb\.?|February|Mar\.?|March|Apr\.?|April|May|Jun\.?|June|Jul\.?|July|Aug\.?|August|Sep\.?|Sept\.?|September|Oct\.?|October|Nov\.?|November|Dec\.?|December)\s+(\d{1,2}),\s*(\d{4})\b/i,
  )
  if (monthDayYearMatch) {
    const monthIndex = SOURCE_SHORT_MONTH_INDEX_BY_NAME.get(
      normalizeSourceMonthName(monthDayYearMatch[1]),
    )
    if (monthIndex != null) {
      return formatParsedSourceDate(
        Number(monthDayYearMatch[3]),
        monthIndex,
        Number(monthDayYearMatch[2]),
      )
    }
  }

  const monthYearMatch = text.match(
    /\b(Jan\.?|January|Feb\.?|February|Mar\.?|March|Apr\.?|April|May|Jun\.?|June|Jul\.?|July|Aug\.?|August|Sep\.?|Sept\.?|September|Oct\.?|October|Nov\.?|November|Dec\.?|December)\s+(\d{4})\b/i,
  )
  if (monthYearMatch) {
    const monthIndex = SOURCE_SHORT_MONTH_INDEX_BY_NAME.get(
      normalizeSourceMonthName(monthYearMatch[1]),
    )
    if (monthIndex != null) {
      return formatParsedSourceDate(Number(monthYearMatch[2]), monthIndex)
    }
  }

  const isoDateMatch = text.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/)
  if (isoDateMatch) {
    return formatParsedSourceDate(
      Number(isoDateMatch[1]),
      Number(isoDateMatch[2]) - 1,
      Number(isoDateMatch[3]),
    )
  }

  return null
}

function inferSourceDateFromUrl(url: string) {
  const normalizedUrl = decodeURIComponent(url)

  const slugDateMatch = normalizedUrl.match(/\/(20\d{2})(\d{2})(\d{2})(?:[/?#]|$)/)
  if (slugDateMatch) {
    return formatParsedSourceDate(
      Number(slugDateMatch[1]),
      Number(slugDateMatch[2]) - 1,
      Number(slugDateMatch[3]),
    )
  }

  const pathDateMatch = normalizedUrl.match(/\/(20\d{2})\/(\d{1,2})\/(\d{1,2})(?:[/?#]|$)/)
  if (pathDateMatch) {
    return formatParsedSourceDate(
      Number(pathDateMatch[1]),
      Number(pathDateMatch[2]) - 1,
      Number(pathDateMatch[3]),
    )
  }

  const packageDateMatch = normalizedUrl.match(/\b(?:CREC|cr?ec)-?(20\d{2})-(\d{2})-(\d{2})\b/i)
  if (packageDateMatch) {
    return formatParsedSourceDate(
      Number(packageDateMatch[1]),
      Number(packageDateMatch[2]) - 1,
      Number(packageDateMatch[3]),
    )
  }

  const dottedDateMatch = normalizedUrl.match(/(?:^|[^\d])(20\d{2})[._-](\d{1,2})[._-](\d{1,2})(?=[^\d]|$)/)
  if (dottedDateMatch) {
    return formatParsedSourceDate(
      Number(dottedDateMatch[1]),
      Number(dottedDateMatch[2]) - 1,
      Number(dottedDateMatch[3]),
    )
  }

  const shortYearDateMatch = normalizedUrl.match(
    /(?:^|[^\d])(\d{1,2})[._-](\d{1,2})[._-](\d{2})(?=[^\d]|$)/,
  )
  if (shortYearDateMatch) {
    return formatParsedSourceDate(
      2000 + Number(shortYearDateMatch[3]),
      Number(shortYearDateMatch[1]) - 1,
      Number(shortYearDateMatch[2]),
    )
  }

  const yearMonthPathMatch = normalizedUrl.match(/\/(20\d{2})\/(\d{1,2})(?:[/?#]|$)/)
  if (yearMonthPathMatch) {
    return formatParsedSourceDate(Number(yearMonthPathMatch[1]), Number(yearMonthPathMatch[2]) - 1)
  }

  return null
}

function getSourceDateLabel(source: SourceLink) {
  if (source.dateLabel) {
    return source.dateLabel
  }

  return (
    SOURCE_DATE_OVERRIDES_BY_URL[source.url] ??
    inferSourceDateFromText(source.label) ??
    inferSourceDateFromUrl(source.url) ??
    FALLBACK_SOURCE_CHECKED_DATE_LABEL
  )
}

function looksLikePdfUrl(url: string) {
  return /\.pdf($|[?#])/i.test(url)
}

function appendPdfViewerParams(
  url: string,
  options: {
    page?: number
    searchText?: string
  },
) {
  const hashParts: string[] = []
  if (options.page && Number.isFinite(options.page)) {
    hashParts.push(`page=${options.page}`)
  }
  if (options.searchText) {
    hashParts.push(`search=${encodeURIComponent(options.searchText)}`)
  }
  if (!hashParts.length) {
    return url
  }

  const [baseUrl, existingHash] = url.split('#', 2)
  if (existingHash) {
    return `${baseUrl}#${existingHash}&${hashParts.join('&')}`
  }
  return `${baseUrl}#${hashParts.join('&')}`
}

function appendTextFragment(url: string, text: string) {
  if (!text) {
    return url
  }

  const [baseUrl, existingHash] = url.split('#', 2)
  const encodedText = encodeURIComponent(text)

  if (!existingHash) {
    return `${baseUrl}#:~:text=${encodedText}`
  }

  if (existingHash.includes(':~:text=')) {
    return url
  }

  return `${baseUrl}#${existingHash}:~:text=${encodedText}`
}

function getSourceLocatorText(source: SourceLink, fallbackExactMatches?: string[]) {
  if (source.textFragment) {
    return source.textFragment
  }
  if (source.searchText) {
    return source.searchText
  }
  return fallbackExactMatches?.[0] ?? ''
}

function getSourceLocationNote(source: SourceLink, fallbackExactMatches?: string[]) {
  if (source.locationLabel) {
    return source.locationLabel
  }

  const locationParts: string[] = []
  if (source.page) {
    locationParts.push(`page ${source.page}`)
  }

  const locatorText = getSourceLocatorText(source, fallbackExactMatches)
  if (locatorText) {
    locationParts.push(
      looksLikePdfUrl(source.url) ? `search "${locatorText}"` : `opens near "${locatorText}"`,
    )
  }

  return locationParts.join(' • ')
}

function getDeepLinkedSourceUrl(source: SourceLink, fallbackExactMatches?: string[]) {
  const locatorText = getSourceLocatorText(source, fallbackExactMatches)
  if (looksLikePdfUrl(source.url)) {
    return appendPdfViewerParams(source.url, {
      page: source.page,
      searchText: locatorText || undefined,
    })
  }
  if (locatorText) {
    return appendTextFragment(source.url, locatorText)
  }
  return source.url
}

function getSourceLocationTitle(source: SourceLink, fallbackExactMatches?: string[]) {
  const titleParts = [source.label]
  const sourceDateLabel = getSourceDateLabel(source)
  const locationNote = getSourceLocationNote(source, fallbackExactMatches)

  if (sourceDateLabel) {
    titleParts.push(sourceDateLabel)
  }

  if (locationNote) {
    titleParts.push(locationNote)
  }

  return titleParts.join(' — ')
}

function formatBiotechProceedingVenue(venue: string) {
  if (venue === 'House') {
    return 'House of Congress'
  }
  if (venue === 'Senate') {
    return 'Senate of Congress'
  }
  return venue
}

function includesAnyBiotechProceedingKeyword(haystack: string, keywords: string[]) {
  return keywords.some((keyword) => haystack.includes(keyword))
}

function biotechProceedingHasPublicMaterials(sources: SourceLink[]) {
  return sources.some((source) =>
    includesAnyBiotechProceedingKeyword(
      [
        source.label,
        source.locationLabel ?? '',
        source.searchText ?? '',
        source.url,
      ]
        .join(' ')
        .toLowerCase(),
      [
        'video',
        'youtube',
        'videocast',
        'webcast',
        'livestream',
        'recording',
        'audio',
        'transcript',
        'minutes',
        'slides',
        'presentation',
        'testimony',
        'statement',
        'meeting materials',
        'materials packet',
        'materials',
        'proceedings',
        'archive',
        'report',
        'summary',
      ],
    ),
  )
}

function getBiotechProceedingFilterCategory(event: {
  source: SourceLink
  sourceLinks?: SourceLink[]
  title: string
  topics: string[]
  type: 'Administrative' | 'Congress'
  venue: string
}) {
  if (event.type === 'Congress') {
    return 'hearings'
  }

  const sources = event.sourceLinks && event.sourceLinks.length > 0 ? event.sourceLinks : [event.source]
  const sourceHaystack = sources
    .flatMap((source) => [source.label, source.locationLabel ?? '', source.searchText ?? '', source.url])
    .join(' ')
    .toLowerCase()
  const haystack = [event.title, event.venue, ...event.topics, sourceHaystack].join(' ').toLowerCase()
  const hasPublicMaterials = biotechProceedingHasPublicMaterials(sources)
  const isHearing = includesAnyBiotechProceedingKeyword(haystack, [
    ' hearing',
    'hearing ',
    'hearings',
    'hearing:',
    'hearing with',
    'senate hearing',
    'house hearing',
    'congress.gov hearing',
    'witness statement',
    'opening statement',
    'testimony',
  ])
  const isWorkshopOrWebinar = includesAnyBiotechProceedingKeyword(haystack, [
    'workshop',
    'webinar',
    'town hall',
    'listening session',
    'outreach session',
    'roundtable',
    'pitch day',
    'pitch days',
  ])
  const isNoticeOrAgenda = includesAnyBiotechProceedingKeyword(haystack, [
    'notice',
    'agenda',
    'announcement',
    'save-the-date',
    'save the date',
    'federal register',
    'public inspection',
  ])
  const isMeetingLike = includesAnyBiotechProceedingKeyword(haystack, [
    'meeting',
    'meetings',
    'advisory',
    'committee',
    'council',
    'board',
    'session',
    'consultation',
    'materials',
    'minutes',
    'archive',
    'proceedings',
  ])

  if (isNoticeOrAgenda && !hasPublicMaterials) {
    return 'notices_agendas'
  }

  if (isHearing) {
    return 'hearings'
  }

  if (isWorkshopOrWebinar) {
    return 'workshops_webinars'
  }

  if (isNoticeOrAgenda) {
    return 'notices_agendas'
  }

  if (isMeetingLike) {
    return 'meetings'
  }

  if (!hasPublicMaterials) {
    return 'notices_agendas'
  }

  return 'meetings'
}

function SourceEvidenceLink({
  fallbackExactMatches,
  hideDate = false,
  source,
}: {
  fallbackExactMatches?: string[]
  hideDate?: boolean
  source: SourceLink
}) {
  const sourceDateLabel = getSourceDateLabel(source)
  const locationNote = getSourceLocationNote(source, fallbackExactMatches)

  return (
    <a
      href={getDeepLinkedSourceUrl(source, fallbackExactMatches)}
      rel="noreferrer"
      target="_blank"
      title={getSourceLocationTitle(source, fallbackExactMatches)}
    >
      {!hideDate && sourceDateLabel ? (
        <span className="source-evidence-link__date">{sourceDateLabel}</span>
      ) : null}
      <span className="source-evidence-link__label">{source.label}</span>
      {locationNote ? <span className="source-evidence-link__locator">{locationNote}</span> : null}
    </a>
  )
}

function getCompanyWebsiteUrl(sources: SourceLink[]) {
  const officialSiteSource =
    sources.find(
      (source) =>
        /official site/i.test(source.label) || /company website/i.test(source.locationLabel ?? ''),
    ) ?? null

  return officialSiteSource?.url ?? null
}

type ExecutivePageId = 'profiles' | 'systems'
type BiotechCompanyCategoryFilter = 'all' | BiotechCompanyCategory
type BiotechProceedingCategoryFilter =
  | 'all'
  | 'hearings'
  | 'meetings'
  | 'workshops_webinars'
  | 'notices_agendas'
type BiotechPageId =
  | 'companies'
  | 'judicial-cases'
  | 'proceedings'
  | 'people-profiles'
  | 'official-language'
type SpecialPageId = 'biotech'

type RouteState = {
  branchId: BranchId | null
  biotechPage: BiotechPageId | null
  executivePage: ExecutivePageId | null
  personId: string | null
  specialPage: SpecialPageId | null
}

const BIOTECH_PROCEEDING_CATEGORY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'hearings', label: 'Hearings' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'workshops_webinars', label: 'Workshops / webinars' },
  { id: 'notices_agendas', label: 'Notices / agendas' },
] as const satisfies Array<{ id: BiotechProceedingCategoryFilter; label: string }>

type SupremeCourtCaseSelection = {
  caseItem: SupremeCourtCase
  groupLabel: string
}

type ExecutiveOverviewCard = {
  id: string
  countLabel: string
  title: string
}

type EconomyTimelineTick = {
  label: string
  time: number
}

type EconomyTimeline = {
  endTime: number
  startTime: number
  ticks: EconomyTimelineTick[]
}

type TimedEconomyHistoryPoint = EconomyHistoryPoint & {
  time: number
}

type ExecutivePageCard = {
  description: string
  eyebrow: string
  id: ExecutivePageId
  title: string
}

type PartyFilter = Alignment | 'all'
type ChamberFilter = 'all' | 'house' | 'senate'
type PresidentPartyTone = 'democratic' | 'republican'
type AudienceMode = 'citizen' | 'observer'

const JUDICIAL_INFERENCE_NOTE =
  "A \"?\" means this justice's stance is inferred from the Court's result or a partial public statement, rather than fully listed justice-by-justice in the official text."
const AUDIENCE_MODE_STORAGE_KEY = 'open-spy-audience-mode'
const executivePageIdSet = new Set<ExecutivePageId>(['profiles', 'systems'])
const biotechPageIdSet = new Set<BiotechPageId>([
  'companies',
  'judicial-cases',
  'proceedings',
  'people-profiles',
  'official-language',
])
const specialPageIdSet = new Set<SpecialPageId>(['biotech'])
const BIOTECH_CATEGORY_ORDER = [
  'biotech policy',
  'biomedical regulator',
  'biosecurity',
  'pharma background',
  'lab-leak and gof politics',
] as const satisfies readonly BiotechConnectionCategory[]
const BIOTECH_MENTION_TIER_ORDER = [
  'direct self-use',
  'signed or office-owned document',
  'official contextual mention',
] as const satisfies readonly BiotechMentionTier[]
const BIOTECH_CATEGORY_META: Record<
  BiotechConnectionCategory,
  { heading: string; pillLabel: string; summary: string }
> = {
  'biotech policy': {
    heading: 'Biotech Policy',
    pillLabel: 'Biotech Policy',
    summary: 'Formal biotechnology strategy, industrial policy, and commission-level roles.',
  },
  'biomedical regulator': {
    heading: 'Biomedical Regulators',
    pillLabel: 'Biomedical Power',
    summary: 'People who hold real institutional power over federal health, research, and drug policy.',
  },
  biosecurity: {
    heading: 'Biosecurity',
    pillLabel: 'Biosecurity',
    summary: 'Threat prevention, lab security, and national-security oversight.',
  },
  'pharma background': {
    heading: 'Pharma Background',
    pillLabel: 'Pharma Background',
    summary: 'Private-sector pharmaceutical or related business backgrounds, kept separate from government biosecurity claims.',
  },
  'lab-leak and gof politics': {
    heading: 'Lab-Leak and GOF Politics',
    pillLabel: 'Lab-Leak / GOF',
    summary: 'Public fights over Wuhan, gain-of-function research, risky pathogen oversight, and lab-origin claims.',
  },
}
const BIOTECH_MENTION_TIER_META: Record<
  BiotechMentionTier,
  { heading: string; summary: string }
> = {
  'direct self-use': {
    heading: 'Direct Self-Use',
    summary:
      'Separate from the role-based biotech buckets above. This tier covers direct wording in official hearings, floor remarks, releases, presidential actions, and attributed quotes.',
  },
  'signed or office-owned document': {
    heading: 'Signed / Office-Owned Document',
    summary:
      'Signed letters, hosted PDFs, issue pages, committee releases, office releases, and other office-owned material that carry the target language without being treated here as direct self-use.',
  },
  'official contextual mention': {
    heading: 'Official Contextual Mention',
    summary:
      "The official source contains the target language on material tied to the person, but not as that person's own direct self-use in this pass.",
  },
}
const BIOTECH_PAGE_META: Record<
  BiotechPageId,
  { eyebrow: string; title: string; summary: string }
> = {
  companies: {
    eyebrow: 'Biotech page five',
    title: 'Company Atlas of the World',
    summary:
      'A ranked market atlas across pharma, biopharma, medtech, diagnostics, and outsourced biologics manufacturing. Market value moves fast, so the more durable layer here is what each company actually makes, where it is headquartered, and where it sits in the healthcare stack.',
  },
  'judicial-cases': {
    eyebrow: 'Biotech page one',
    title: 'Judicial Cases of the U.S.',
    summary:
      'Judicial cases spanning genetics, patents, GMOs, FDA power, tissue ownership, IVF, embryo disputes, and hard bioethics. State cases below are not automatically overrulable; the U.S. Supreme Court usually steps in only if a real federal question is presented.',
  },
  proceedings: {
    eyebrow: 'Biotech page two',
    title: 'Biotech, Healthcare & Biosecurity Proceedings',
    summary:
      'It includes congressional hearings plus administrative and advisory proceedings across biotech, healthcare, public health, biodefense, food safety, pandemic oversight, and related governance, with a dedicated official-source sweep across HHS agencies and advisory bodies including FDA, CDC, NIH, CMS, USDA, HRSA, AHRQ, SAMHSA, IHS, DHS/CWMD, DoD health and biotech venues, VA research bodies, and OSTP/NSF bioeconomy proceedings.',
  },
  'people-profiles': {
    eyebrow: 'Biotech page three',
    title: 'People Profiles',
    summary:
      'Current people on this site with source-linked biotech, biomedical, regulator, or biosecurity ties.',
  },
  'official-language': {
    eyebrow: 'Biotech page four',
    title: 'Official Biosecurity / Bioweapon Language',
    summary:
      'Official-source language hits for biosecurity, bioweapon, biodefense, gain-of-function, and related terms.',
  },
}
const BIOTECH_COMPANY_CATEGORY_ORDER = [
  'Big Pharma',
  'Biotech / Biopharma',
  'Medtech',
  'Diagnostics & Tools',
  'Biomanufacturing / CDMO',
] as const satisfies readonly BiotechCompanyCategory[]
const BIOTECH_COMPANY_CATEGORY_SUMMARY: Record<BiotechCompanyCategory, string> = {
  'Big Pharma': 'Diversified global drugmakers with broad commercial medicine portfolios.',
  'Biotech / Biopharma':
    'Biotech-led or biologics-heavy medicine companies built around platform innovation and specialty therapeutics.',
  Medtech: 'Medical devices, procedure platforms, implants, and surgical systems.',
  'Diagnostics & Tools': 'Lab instruments, testing systems, research tools, and diagnostics infrastructure.',
  'Biomanufacturing / CDMO':
    'Outsourced drug-development, biologics manufacturing, and production capacity providers.',
}
const EXECUTIVE_PAGE_META: Record<
  ExecutivePageId,
  { chooserDescription: string; chooserEyebrow: string; chooserTitle: string; heading: string }
> = {
  profiles: {
    chooserDescription:
      'White House, Cabinet Departments, executive profile cards, and the Trump Social block.',
    chooserEyebrow: 'Page one',
    chooserTitle: 'Profiles and Social',
    heading: 'Profiles and Social',
  },
  systems: {
    chooserDescription:
      'Shutdown timeline, independent-agency landscape, and the military footprint map.',
    chooserEyebrow: 'Page two',
    chooserTitle: 'Shutdowns and Systems',
    heading: 'Shutdowns and Systems',
  },
}

const HOME_AUDIENCE_COPY: Record<
  AudienceMode,
  {
    copy: string
    eyebrow: string
    title: string
  }
> = {
  citizen: {
    copy: 'Open the executive, legislative, and judicial branches to trace the people, power, and public-facing machinery of the U.S. government.',
    eyebrow: 'Citizen View',
    title: "Let's see your government.",
  },
  observer: {
    copy: 'Open the executive, legislative, and judicial branches to trace the people, power, and public-facing machinery of the U.S. government from the outside in.',
    eyebrow: 'Observer View',
    title: "Let's spy on the U.S. government.",
  },
}

const HOME_FLAG_STAR_ROWS = [6, 5, 6, 5, 6, 5, 6, 5, 6] as const
const HOME_FLAG_STAR_PATH =
  'M0 -2.8L0.78 -0.92H2.8L1.12 0.38L1.76 2.44L0 1.22L-1.76 2.44L-1.12 0.38L-2.8 -0.92H-0.78Z'

function isAudienceMode(value: string | null): value is AudienceMode {
  return value === 'citizen' || value === 'observer'
}

function readStoredAudienceMode() {
  try {
    const storedValue = window.localStorage.getItem(AUDIENCE_MODE_STORAGE_KEY)
    return isAudienceMode(storedValue) ? storedValue : null
  } catch {
    return null
  }
}

function storeAudienceMode(mode: AudienceMode) {
  try {
    window.localStorage.setItem(AUDIENCE_MODE_STORAGE_KEY, mode)
  } catch {
    // Ignore storage failures and keep the in-memory selection.
  }
}

function createPartyCounts(): Record<Alignment, number> {
  return {
    democratic: 0,
    independent: 0,
    nonpartisan: 0,
    republican: 0,
  }
}

function formatPopulationCount(value: number) {
  return populationCountFormatter.format(value)
}

function formatTrumpTruthDate(value: string) {
  return trumpTruthDateFormatter.format(new Date(value))
}

function formatShutdownTimelineMonth(value: Date) {
  return shutdownTimelineMonthFormatter.format(value)
}

function formatShutdownChipLabel(startDate: string, endDate: string | null) {
  const start = parseUtcDate(startDate)

  if (!endDate) {
    return `Shutdown since ${shutdownChipMonthDayYearFormatter.format(start)}`
  }

  const end = parseUtcDate(endDate)
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear()
  const startLabel = sameYear
    ? shutdownChipMonthDayFormatter.format(start)
    : shutdownChipMonthDayYearFormatter.format(start)

  return `Shutdown ${startLabel} to ${shutdownChipMonthDayYearFormatter.format(end)}`
}

function parseUtcDate(value: string) {
  return new Date(`${value}T00:00:00Z`)
}

function getUtcStartOfDay(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()))
}

function addUtcDays(value: Date, days: number) {
  return new Date(value.getTime() + days * MS_PER_DAY)
}

function getShutdownTimelineMonthTicks(rangeStart: Date, rangeEndExclusive: Date) {
  const ticks: Date[] = []
  const current = new Date(Date.UTC(rangeStart.getUTCFullYear(), rangeStart.getUTCMonth(), 1))

  while (current < rangeEndExclusive) {
    ticks.push(new Date(current.getTime()))
    current.setUTCMonth(current.getUTCMonth() + 1)
  }

  return ticks
}

function formatStateGdpLabel(gdpMillions: number) {
  const gdpBillions = gdpMillions / 1000

  if (gdpBillions >= 1000) {
    return `$${(gdpBillions / 1000).toFixed(1)}T`
  }

  return `$${gdpBillions.toFixed(1)}B`
}

function formatStateGdpPerCapitaLabel(gdpMillions: number, population: number) {
  const dollarsPerPerson = (gdpMillions * 1_000_000) / population
  return `$${Math.round(dollarsPerPerson).toLocaleString('en-US')}`
}

function formatStateDebtLabel(debtThousands: number) {
  const debtBillions = debtThousands / 1_000_000

  if (debtBillions >= 1000) {
    return `$${(debtBillions / 1000).toFixed(1)}T`
  }

  if (debtBillions >= 1) {
    return `$${debtBillions.toFixed(1)}B`
  }

  return `$${(debtThousands / 1000).toFixed(1)}M`
}

function formatStateDebtPerCapitaLabel(debtThousands: number, population: number) {
  const dollarsPerPerson = (debtThousands * 1000) / population
  return `$${Math.round(dollarsPerPerson).toLocaleString('en-US')}`
}

function formatMarketCapSnapshotLabel(billions: number) {
  if (billions >= 1000) {
    return `$${(billions / 1000).toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}T`
  }

  return `$${billions.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: billions >= 100 ? 0 : 2,
  })}B`
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
    case 'took_no_part':
      return 'Took no part'
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

function getSupremeCourtCaseOutcomeSide(caseItem: SupremeCourtCase) {
  let proCount = 0
  let antiCount = 0

  for (const side of Object.values(caseItem.justiceStances)) {
    if (side === 'pro') {
      proCount += 1
    } else if (side === 'anti') {
      antiCount += 1
    }
  }

  if (proCount > antiCount) {
    return 'pro' as const
  }

  if (antiCount > proCount) {
    return 'anti' as const
  }

  return null
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

const supremeCourtCaseOralArgumentOverrides = new Map<string, SourceLink[]>([
  [
    'learning-resources-v-trump',
    [
      {
        dateLabel: 'May 15, 2025',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2025/24-1287',
      },
    ],
  ],
  [
    'trump-v-united-states',
    [
      {
        dateLabel: 'Apr 25, 2024',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2023/23-939',
      },
    ],
  ],
  [
    'trump-v-anderson',
    [
      {
        dateLabel: 'Feb 8, 2024',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2023/23-719',
      },
    ],
  ],
  [
    'trump-v-vance',
    [
      {
        dateLabel: 'May 12, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/19-635',
      },
    ],
  ],
  [
    'trump-v-mazars',
    [
      {
        dateLabel: 'May 12, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/19-715',
      },
    ],
  ],
  [
    'collins-v-yellen',
    [
      {
        dateLabel: 'Dec 9, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2020/19-422',
      },
    ],
  ],
  [
    'california-v-texas',
    [
      {
        dateLabel: 'Nov 10, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2020/19-840',
      },
    ],
  ],
  [
    'dhs-v-thuraissigiam',
    [
      {
        dateLabel: 'Mar 2, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/19-161',
      },
    ],
  ],
  [
    'little-sisters-v-pennsylvania',
    [
      {
        dateLabel: 'May 6, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/19-431',
      },
    ],
  ],
  [
    'seila-law-v-cfpb',
    [
      {
        dateLabel: 'Mar 3, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/19-7',
      },
    ],
  ],
  [
    'barton-v-barr',
    [
      {
        dateLabel: 'Nov 4, 2019',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/18-725',
      },
    ],
  ],
  [
    'nasrallah-v-barr',
    [
      {
        dateLabel: 'Nov 4, 2019',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/18-1432',
      },
    ],
  ],
  [
    'guerrero-lasprilla-v-barr',
    [
      {
        dateLabel: 'Oct 7, 2019',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/18-776',
      },
    ],
  ],
  [
    'dhs-v-regents',
    [
      {
        dateLabel: 'Nov 12, 2019',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/18-587',
      },
    ],
  ],
  [
    'trump-v-deutsche-bank',
    [
      {
        dateLabel: 'May 12, 2020',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page for the consolidated records-subpoena argument',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2019/19-715',
      },
    ],
  ],
  [
    'nielsen-v-preap',
    [
      {
        dateLabel: 'Oct 10, 2018',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2018/16-1363',
      },
    ],
  ],
  [
    'department-of-commerce-v-new-york',
    [
      {
        dateLabel: 'Apr 23, 2019',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2018/18-966',
      },
    ],
  ],
  [
    'trump-v-hawaii',
    [
      {
        dateLabel: 'Apr 25, 2018',
        label: 'Oral argument audio + transcript',
        locationLabel: 'official Supreme Court oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2017/17-965',
      },
    ],
  ],
])

const judicialBiotechCaseSourceOverrides = new Map<string, SourceLink[]>([
  [
    'mayo-v-prometheus',
    [
      {
        dateLabel: 'Dec 7, 2011',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2011/10-1150',
      },
      {
        dateLabel: 'Dec 7, 2011',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2011/10-1150.pdf',
      },
    ],
  ],
  [
    'myriad-genetics',
    [
      {
        dateLabel: 'Apr 15, 2013',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2012/12-398',
      },
      {
        dateLabel: 'Apr 15, 2013',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2012/12-398_h3dj.pdf',
      },
    ],
  ],
  [
    'bowman-v-monsanto',
    [
      {
        dateLabel: 'Feb 19, 2013',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2012/11-796',
      },
      {
        dateLabel: 'Feb 19, 2013',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2012/11-796-1j43.pdf',
      },
    ],
  ],
  [
    'amgen-v-sanofi',
    [
      {
        dateLabel: 'Mar 27, 2023',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2022/21-757',
      },
      {
        dateLabel: 'Mar 27, 2023',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2022/21-757_cjmb.pdf',
      },
    ],
  ],
  [
    'bruesewitz-v-wyeth',
    [
      {
        dateLabel: 'Oct 12, 2010',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2010/09-152',
      },
      {
        dateLabel: 'Oct 12, 2010',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2010/09-152.pdf',
      },
    ],
  ],
  [
    'fda-v-alliance-for-hippocratic-medicine',
    [
      {
        dateLabel: 'Mar 26, 2024',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2023/23-235',
      },
      {
        dateLabel: 'Mar 26, 2024',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2023/23-235_g71f.pdf',
      },
    ],
  ],
  [
    'pliva-v-mensing',
    [
      {
        dateLabel: 'Nov 30, 2010',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2010/09-993',
      },
      {
        dateLabel: 'Nov 30, 2010',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2010/09-993.pdf',
      },
    ],
  ],
  [
    'mutual-pharmaceutical-v-bartlett',
    [
      {
        dateLabel: 'Mar 19, 2013',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2012/12-142',
      },
      {
        dateLabel: 'Mar 19, 2013',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2012/12-142_fchk.pdf',
      },
    ],
  ],
  [
    'dobbs-v-jackson',
    [
      {
        dateLabel: 'Dec 1, 2021',
        label: 'Supreme Court oral argument audio',
        locationLabel: 'official oral-argument page',
        url: 'https://www.supremecourt.gov/oral_arguments/audio/2021/19-1392',
      },
      {
        dateLabel: 'Dec 1, 2021',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2021/19-1392_bq7d.pdf',
      },
    ],
  ],
  [
    'diamond-v-chakrabarty',
    [
      {
        dateLabel: 'Mar 17, 1980',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/pdfs/transcripts/1979/79-136_03-17-1980.pdf',
      },
    ],
  ],
  [
    'merck-v-integra',
    [
      {
        dateLabel: 'Apr 20, 2005',
        label: 'Supreme Court oral argument transcript',
        locationLabel: 'official transcript PDF',
        url: 'https://www.supremecourt.gov/pdfs/transcripts/2004/03-1237.pdf',
      },
    ],
  ],
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
    'JUSTICE KAGAN, with whom JUSTICE SOTOMAYOR and JUSTICE JACKSON join, dissenting from the grant of the application for stay.',
  ],
  'trump-v-boyle': [
    'The application for stay presented to THE CHIEF JUSTICE and by him referred to the Court is granted.',
    'JUSTICE KAVANAUGH, concurring in the grant of the application for stay.',
    'JUSTICE KAGAN, with whom JUSTICE SOTOMAYOR and JUSTICE JACKSON join, dissenting from the grant of the application for stay.',
  ],
  'mcmahon-v-new-york': [
    'The application for stay presented to JUSTICE JACKSON and by her referred to the Court is granted.',
    'JUSTICE SOTOMAYOR, with whom JUSTICE KAGAN and JUSTICE JACKSON join, dissenting.',
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
    'JUSTICE SOTOMAYOR, with whom JUSTICE KAGAN and JUSTICE JACKSON join, dissenting.',
  ],
  'noem-v-doe': [
    'The application for stay presented to JUSTICE JACKSON and by her referred to the Court is granted.',
    'JUSTICE JACKSON, with whom JUSTICE SOTOMAYOR joins, dissenting from the grant of the application for a stay.',
  ],
  'trump-v-wilcox': [
    'The application for stay presented to THE CHIEF JUSTICE and by him referred to the Court is granted.',
    'JUSTICE KAGAN, with whom JUSTICE SOTOMAYOR and JUSTICE JACKSON join, dissenting from the grant of the application for stay.',
  ],
  'aarp-v-trump': [
    'The Court ordered "[t]he Government" not to remove a "putative class of detainees" until this Court issues a superseding order.',
    'JUSTICE ALITO, with whom JUSTICE THOMAS joins, dissenting.',
  ],
  'trump-v-jgg': [
    'The application to vacate the orders issued by the United States District Court for the District of Columbia is granted.',
    'Justice Kavanaugh, concurring.',
    'Justice Sotomayor, with whom Justice Kagan and Justice Jackson join, and with whom Justice Barrett joins as to Parts II and III-B, dissenting.',
  ],
  'trump-v-united-states': [
    'ROBERTS, C. J., delivered the opinion of the Court, in which THOMAS, ALITO, GORSUCH, and KAVANAUGH, JJ., joined in full...',
  ],
  'collins-v-yellen': [
    'ALITO, J., delivered the opinion of the Court, in which ROBERTS, C. J., and THOMAS, KAVANAUGH, and BARRETT, JJ., joined in full; in which KAGAN and BREYER, JJ., joined as to all but Part III-B; in which GORSUCH, J., joined as to all but Part III-C; and in which SOTOMAYOR, J., joined as to Parts I, II, and III-C.',
  ],
  'california-v-texas': [
    'BREYER, J., delivered the opinion of the Court, in which ROBERTS, C. J., and THOMAS, SOTOMAYOR, KAGAN, KAVANAUGH, and BARRETT, JJ., joined.',
    'THOMAS, J., filed a concurring opinion.',
    'ALITO, J., filed a dissenting opinion, in which GORSUCH, J., joined.',
  ],
  'trump-v-new-york': [
    'PER CURIAM. Every ten years, the Nation undertakes an "Enumeration" of its population...',
    'JUSTICE BREYER, with whom JUSTICE SOTOMAYOR and JUSTICE KAGAN join, dissenting.',
  ],
  'dhs-v-thuraissigiam': [
    'ALITO, J., delivered the opinion of the Court, in which ROBERTS, C. J., and THOMAS, GORSUCH, and KAVANAUGH, JJ., joined.',
  ],
  'little-sisters-v-pennsylvania': [
    'THOMAS, J., delivered the opinion of the Court, in which ROBERTS, C. J., and ALITO, GORSUCH, and KAVANAUGH, JJ., joined.',
    'ALITO, J., filed a concurring opinion, in which GORSUCH, J., joined.',
    'KAGAN, J., filed an opinion concurring in the judgment, in which BREYER, J., joined.',
    'GINSBURG, J., filed a dissenting opinion, in which SOTOMAYOR, J., joined.',
  ],
  'seila-law-v-cfpb': [
    'ROBERTS, C. J., delivered the opinion of the Court with respect to Parts I, II, and III, in which THOMAS, ALITO, GORSUCH, and KAVANAUGH, JJ., joined, and an opinion with respect to Part IV, in which ALITO and KAVANAUGH, JJ., joined.',
    'THOMAS, J., filed an opinion concurring in part and dissenting in part, in which GORSUCH, J., joined.',
    'KAGAN, J., filed an opinion concurring in the judgment with respect to severability and dissenting in part, in which GINSBURG, BREYER, and SOTOMAYOR, JJ., joined.',
  ],
  'trump-v-sierra-club': [
    'The application for stay presented to JUSTICE KAGAN and by her referred to the Court is granted.',
  ],
  'wolf-v-innovation-law-lab': [
    'Application (19A960) granted by the Court.',
    'The application for stay presented to Justice Kagan and by her referred to the Court is granted...',
  ],
  'barton-v-barr': [
    'KAVANAUGH, J., delivered the opinion of the Court, in which ROBERTS, C. J., and THOMAS, ALITO, and GORSUCH, JJ., joined.',
    'SOTOMAYOR, J., filed a dissenting opinion, in which GINSBURG, BREYER, and KAGAN, JJ., joined.',
  ],
  'nasrallah-v-barr': [
    'KAVANAUGH, J., delivered the opinion of the Court, in which ROBERTS, C. J., and GINSBURG, BREYER, SOTOMAYOR, KAGAN, and GORSUCH, JJ., joined.',
    'THOMAS, J., filed a dissenting opinion, in which ALITO, J., joined.',
  ],
  'guerrero-lasprilla-v-barr': [
    'BREYER, J., delivered the opinion of the Court, in which ROBERTS, C. J., and GINSBURG, SOTOMAYOR, KAGAN, GORSUCH, and KAVANAUGH, JJ., joined.',
    'THOMAS, J., filed a dissenting opinion, in which ALITO, J., joined as to all but Part II-A-1.',
  ],
  'dhs-v-new-york-public-charge': [
    'The application for stay presented to JUSTICE GINSBURG and by her referred to the Court is granted.',
    'JUSTICE KAGAN would deny the application.',
    'JUSTICE GORSUCH, with whom JUSTICE THOMAS joins, concurring in the grant of stay.',
  ],
  'barr-v-east-bay-sanctuary-covenant': [
    'The application for stay presented to JUSTICE KAGAN and by her referred to the Court is granted.',
    'JUSTICE SOTOMAYOR, with whom JUSTICE GINSBURG joins, dissenting from grant of stay.',
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
    'JUSTICE BARRETT took no part in the consideration or decision of this motion.',
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
    new Set([
      'judicial-clarence-thomas',
      'judicial-elena-kagan',
      'judicial-neil-m-gorsuch',
    ]),
  ],
  [
    'noem-v-doe',
    new Set(['judicial-sonia-sotomayor', 'judicial-ketanji-brown-jackson']),
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
    'dhs-v-dvd',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-ketanji-brown-jackson',
    ]),
  ],
  [
    'mcmahon-v-new-york',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-ketanji-brown-jackson',
    ]),
  ],
  [
    'trump-v-boyle',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-brett-m-kavanaugh',
      'judicial-ketanji-brown-jackson',
    ]),
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
    'trump-v-jgg',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-brett-m-kavanaugh',
      'judicial-amy-coney-barrett',
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
    'trump-v-slaughter',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-ketanji-brown-jackson',
    ]),
  ],
  [
    'trump-v-wilcox',
    new Set([
      'judicial-sonia-sotomayor',
      'judicial-elena-kagan',
      'judicial-ketanji-brown-jackson',
    ]),
  ],
  [
    'trump-v-thompson',
    new Set(['judicial-clarence-thomas', 'judicial-brett-m-kavanaugh']),
  ],
  [
    'barr-v-east-bay-sanctuary-covenant',
    new Set(['judicial-sonia-sotomayor']),
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

function getSupremeCourtCaseOralArgumentLinks(caseItem: SupremeCourtCase) {
  return supremeCourtCaseOralArgumentOverrides.get(caseItem.id) ?? []
}

function SupremeCourtCaseLinks({ caseItem }: { caseItem: SupremeCourtCase }) {
  const opinionUrl = getSupremeCourtCaseOpinionUrl(caseItem)
  const docketUrl = getSupremeCourtCaseDocketUrl(caseItem)
  const oralArgumentLinks = getSupremeCourtCaseOralArgumentLinks(caseItem)
  const linkCount = Number(Boolean(opinionUrl)) + Number(Boolean(docketUrl)) + oralArgumentLinks.length

  return (
    <div className={`detail-links${linkCount === 2 ? ' detail-links--pair' : ''}`}>
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
      {oralArgumentLinks.map((link) => (
        <a href={link.url} key={`${caseItem.id}-${link.url}`} rel="noreferrer" target="_blank">
          {link.label}
        </a>
      ))}
    </div>
  )
}

function getSupremeCourtOfficialWording(caseItem: SupremeCourtCase) {
  return supremeCourtCaseOfficialWording[caseItem.id] ?? []
}

function shouldShowAnnualDisclosureReportLink(person: GovernmentPerson) {
  return Boolean(person.financialAnnualReportUrl) && person.sectionId !== 'senate'
}

function parseDisclosureDateToTimestamp(value?: string) {
  if (!value) {
    return null
  }

  const matched = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  if (!matched) {
    return null
  }

  const [, month, day, year] = matched
  return Date.parse(`${year}-${month}-${day}T00:00:00Z`)
}

function shouldDisplayTradeAfterLatestAnnualReport(person: GovernmentPerson, trade: DisclosureTrade) {
  const filingTimestamp = parseDisclosureDateToTimestamp(person.financialFilingDate)
  const tradeTimestamp = parseDisclosureDateToTimestamp(trade.date)

  if (filingTimestamp === null || tradeTimestamp === null) {
    return false
  }

  return tradeTimestamp > filingTimestamp
}

function formatDisclosureOwner(owner?: string) {
  const normalized = owner?.trim()

  if (!normalized) {
    return null
  }

  const upper = normalized.toUpperCase()

  if (upper === 'SP' || upper.includes('SPOUSE')) {
    return 'Spouse'
  }

  if (upper === 'JT' || upper.includes('JOINT')) {
    return 'Joint'
  }

  if (upper === 'DC' || upper.includes('CHILD') || upper.includes('DEPENDENT')) {
    return 'Child'
  }

  if (upper === 'SELF' || upper === 'FILER') {
    return 'Self'
  }

  return normalized
}

function DisclosureOwnerBadge({ owner }: { owner?: string }) {
  const label = formatDisclosureOwner(owner)

  if (!label) {
    return null
  }

  return <span className="disclosure-owner-badge">{label}</span>
}

function shouldShowTradeSourceLink(person: GovernmentPerson, trade: DisclosureTrade) {
  if (!trade.sourceUrl) {
    return false
  }

  return person.sectionId !== 'senate'
}

function resolvePersonLink(url: string) {
  if (/^(https?:)?\/\//i.test(url)) {
    return url
  }

  return `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`
}

function isInferredSupremeCourtJusticeStance(caseItem: SupremeCourtCase, justiceId: string) {
  const stance = caseItem.justiceStances[justiceId] ?? 'not_on_court'

  if (
    stance === 'not_on_court' ||
    stance === 'took_no_part' ||
    !inferredSupremeCourtCaseIds.has(caseItem.id)
  ) {
    return false
  }

  return !confirmedSupremeCourtJusticeIdsByCase.get(caseItem.id)?.has(justiceId)
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

function formatRollCallVoteTotals(event: LegislativeTrumpRollCall) {
  if (!Number.isFinite(event.yeaTotal) || !Number.isFinite(event.nayTotal)) {
    return null
  }

  return `${event.yeaTotal} YEAs • ${event.nayTotal} NAYs`
}

function formatRollCallChamber(chamber: LegislativeTrumpRollCall['chamber']) {
  return chamber === 'house' ? 'House' : 'Senate'
}

function compareExecutiveCongressVotesByRecency(
  left: ExecutiveCongressRollCallVote,
  right: ExecutiveCongressRollCallVote,
  leftIndex = 0,
  rightIndex = 0,
) {
  return compareLegislativeRollCallsByRecency(
    left as LegislativeTrumpRollCall,
    right as LegislativeTrumpRollCall,
    leftIndex,
    rightIndex,
  )
}

function formatExecutiveCongressVotePosition(position: ExecutiveCongressRollCallVote['position']) {
  switch (position) {
    case 'pro':
      return 'On Trump side'
    case 'anti':
      return 'Not on Trump side'
    case 'missed':
      return 'Missed'
  }
}

function buildExecutiveCongressHistorySummary(service: ExecutiveCongressServiceRecord) {
  const parts = [
    `${service.directVoteCount} direct`,
    service.broadVoteCount > 0 ? `${service.broadVoteCount} broader` : null,
    `${service.proCount} on Trump side`,
    `${service.antiCount} not on Trump side`,
    service.missedCount > 0 ? `${service.missedCount} missed` : null,
  ].filter(Boolean)

  return `${parts.join(' • ')}`
}

function formatDisplayedTrumpScore(person: GovernmentPerson) {
  if (person.branchId === 'judicial') {
    return `Trump ${person.trumpScore.toFixed(1)}/10`
  }

  return formatTrumpScore(person.trumpScore)
}

function shouldShowTrumpRelationship(person: GovernmentPerson) {
  if (person.branchId !== 'executive') {
    return true
  }

  return (person.executiveCongressServiceHistory?.length ?? 0) > 0
}

function isExecutivePageId(value: string | null | undefined): value is ExecutivePageId {
  return executivePageIdSet.has(value as ExecutivePageId)
}

function isBiotechPageId(value: string | null | undefined): value is BiotechPageId {
  return biotechPageIdSet.has(value as BiotechPageId)
}

function isSpecialPageId(value: string | null | undefined): value is SpecialPageId {
  return specialPageIdSet.has(value as SpecialPageId)
}

function parseHash(hash: string, peopleById?: Map<string, GovernmentPerson>): RouteState {
  const clean = hash.replace(/^#\/?/, '').trim()

  if (!clean) {
    return { biotechPage: null, branchId: null, executivePage: null, personId: null, specialPage: null }
  }

  const [branchCandidate, secondSegment, thirdSegment] = clean.split('/')

  if (isSpecialPageId(branchCandidate)) {
    return {
      biotechPage: branchCandidate === 'biotech' && isBiotechPageId(secondSegment) ? secondSegment : null,
      branchId: null,
      executivePage: null,
      personId: null,
      specialPage: branchCandidate,
    }
  }

  const branchId = branchIdSet.has(branchCandidate as BranchId)
    ? (branchCandidate as BranchId)
    : null

  if (!branchId) {
    return { biotechPage: null, branchId: null, executivePage: null, personId: null, specialPage: null }
  }

  const executivePage =
    branchId === 'executive'
      ? isExecutivePageId(secondSegment)
        ? secondSegment
        : null
      : null
  const personId =
    branchId === 'executive'
      ? executivePage
        ? thirdSegment ?? null
        : secondSegment ?? null
      : secondSegment ?? null
  const selectedPerson = personId && peopleById ? peopleById.get(personId) : null

  if (selectedPerson && selectedPerson.branchId !== branchId) {
    return { biotechPage: null, branchId, executivePage, personId: null, specialPage: null }
  }

  return {
    biotechPage: null,
    branchId,
    executivePage:
      branchId === 'executive'
        ? executivePage ?? (selectedPerson ? 'profiles' : null)
        : null,
    personId: peopleById ? (selectedPerson ? personId : null) : personId ?? null,
    specialPage: null,
  }
}

function toHash(branchId: BranchId | null, personId?: string | null, executivePage?: ExecutivePageId | null) {
  if (!branchId) {
    return '#/'
  }

  if (branchId === 'executive') {
    if (executivePage) {
      return personId ? `#/executive/${executivePage}/${personId}` : `#/executive/${executivePage}`
    }

    return personId ? `#/executive/profiles/${personId}` : '#/executive'
  }

  return personId ? `#/${branchId}/${personId}` : `#/${branchId}`
}

function toSpecialHash(specialPage: SpecialPageId | null, biotechPage?: BiotechPageId | null) {
  if (!specialPage) {
    return '#/'
  }

  if (specialPage === 'biotech' && biotechPage) {
    return `#/biotech/${biotechPage}`
  }

  return `#/${specialPage}`
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

function getDisplayedTrumpNote(person: GovernmentPerson) {
  if (person.branchId !== 'legislative') {
    return person.trumpNote
  }

  return person.trumpNote
    .replace(/\s+Not in office for \d+ high-signal scored votes\./g, '')
    .replace(/\s+Missed or abstained on \d+ high-signal scored votes\./g, '')
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

function getLegislativeServiceStartYear(person: GovernmentPerson) {
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

  const startYearText =
    person.roleSinceYear ??
    extractYearFromText(roleRecord?.startDate) ??
    extractYearFromText(roleRecord?.summary)
  const startYear = startYearText ? Number.parseInt(startYearText, 10) : Number.NaN

  return Number.isFinite(startYear) ? startYear : null
}

function compareLegislativePeopleByService(left: GovernmentPerson, right: GovernmentPerson) {
  const leftStartYear = getLegislativeServiceStartYear(left)
  const rightStartYear = getLegislativeServiceStartYear(right)

  if (leftStartYear == null && rightStartYear == null) {
    return comparePeopleByAgeAscending(left, right)
  }

  if (leftStartYear == null) {
    return 1
  }

  if (rightStartYear == null) {
    return -1
  }

  if (leftStartYear !== rightStartYear) {
    return leftStartYear - rightStartYear
  }

  return comparePeopleByAgeAscending(left, right)
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

function getCommitteeSlug(value: string) {
  return normalizeSearchText(value).replace(/\s+/g, '-')
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

type LegislativeCommitteeSummary = {
  committee: string
  counts: Record<Alignment, number>
  members: GovernmentPerson[]
  slug: string
}

const HOUSE_COMMITTEES_SORTED_LAST = new Set(['Oversight and Government Reform'])

function buildLegislativeCommitteeSummaries(people: GovernmentPerson[]) {
  const summaries = new Map<string, LegislativeCommitteeSummary>()

  for (const person of people) {
    if (person.sectionId !== 'house' || !person.committees || person.committees.length === 0) {
      continue
    }

    for (const rawCommittee of person.committees) {
      const committee = rawCommittee.trim()

      if (!committee) {
        continue
      }

      const existingSummary = summaries.get(committee) ?? {
        committee,
        counts: createPartyCounts(),
        members: [] as GovernmentPerson[],
        slug: getCommitteeSlug(committee),
      }

      existingSummary.members.push(person)
      existingSummary.counts[person.alignment] += 1
      summaries.set(committee, existingSummary)
    }
  }

  return [...summaries.values()].sort((left, right) => {
    const leftPinnedLast = HOUSE_COMMITTEES_SORTED_LAST.has(left.committee)
    const rightPinnedLast = HOUSE_COMMITTEES_SORTED_LAST.has(right.committee)

    if (leftPinnedLast !== rightPinnedLast) {
      return leftPinnedLast ? 1 : -1
    }

    if (right.members.length !== left.members.length) {
      return right.members.length - left.members.length
    }

    return left.committee.localeCompare(right.committee)
  })
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

function LegislativeCommitteeDetailSection({
  onBack,
  onOpenPerson,
  selectedPersonId,
  summary,
}: {
  onBack: () => void
  onOpenPerson: (personId: string) => void
  selectedPersonId: string | null
  summary: LegislativeCommitteeSummary
}) {
  const sortedMembers = [...summary.members].sort(compareLegislativePeopleByService)

  return (
    <section className="section-card committee-detail-section" id="committee-detail">
      <div className="section-card__header committee-detail-section__header">
        <div>
          <p className="eyebrow">House committee</p>
          <h2>{summary.committee}</h2>
        </div>
        <button className="committee-detail-section__back" onClick={onBack} type="button">
          Back to committees
        </button>
      </div>

      <div className="committee-detail-section__stats">
        <article className="committee-detail-stat">
          <span>Total members</span>
          <strong>{summary.members.length}</strong>
        </article>
        {(['democratic', 'republican', 'independent'] as const)
          .filter((alignment) => summary.counts[alignment] > 0)
          .map((alignment) => (
            <article
              className={`committee-detail-stat committee-detail-stat--${alignment}`}
              key={`${summary.committee}-${alignment}`}
            >
              <span>{capitalizeAlignment(alignment)}</span>
              <strong>{summary.counts[alignment]}</strong>
            </article>
          ))}
      </div>

      <p className="committee-detail-section__summary">
        This page shows the full current House roster for this committee. Open any member
        below to inspect biography, finance, and Trump-linked voting data.
      </p>

      <div className="people-grid people-grid--legislative">
        {sortedMembers.map((person) => (
          <PersonCard
            isSelected={selectedPersonId === person.id}
            key={person.id}
            onOpen={onOpenPerson}
            person={person}
          />
        ))}
      </div>
    </section>
  )
}

function LegislativeCommitteeSection({
  onOpenCommittee,
  onOpenPerson,
  people,
  searchValue,
  selectedCommitteeSlug,
  selectedStateSummary,
}: {
  onOpenCommittee: (committeeSlug: string) => void
  onOpenPerson: (personId: string) => void
  people: GovernmentPerson[]
  searchValue: string
  selectedCommitteeSlug: string | null
  selectedStateSummary: StateDelegationSummary | null
}) {
  const houseMembersWithCommittees = people.filter(
    (person) => person.sectionId === 'house' && person.committees && person.committees.length > 0,
  )
  const committeeSummaries = buildLegislativeCommitteeSummaries(houseMembersWithCommittees)
  const previewLimit =
    selectedStateSummary || normalizeSearchText(searchValue) ? 10 : 6

  return (
    <section className="section-card committee-section">
      <div className="section-card__header committee-section__header">
        <div>
          <p className="eyebrow">House committees</p>
          <h2>{committeeSummaries.length} committees</h2>
        </div>
        <p>
          {selectedStateSummary
            ? `${houseMembersWithCommittees.length} visible representatives from ${selectedStateSummary.stateName} currently carry committee assignments here.`
            : `${houseMembersWithCommittees.length} visible representatives currently carry House committee assignments in this view.`}
        </p>
      </div>

      {committeeSummaries.length > 0 ? (
        <div className="committee-grid">
          {committeeSummaries.map((summary) => {
            const visibleMembers = summary.members.slice(0, previewLimit)
            const hiddenCount = Math.max(0, summary.members.length - visibleMembers.length)
            const balanceChips = (
              ['democratic', 'republican', 'independent'] as const
            ).filter((alignment) => summary.counts[alignment] > 0)

            return (
              <article
                className={`committee-card${
                  selectedCommitteeSlug === summary.slug ? ' committee-card--selected' : ''
                }`}
                key={summary.committee}
                onClick={() => onOpenCommittee(summary.slug)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onOpenCommittee(summary.slug)
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="committee-card__top">
                  <div className="committee-card__copy">
                    <strong>{summary.committee}</strong>
                    <span>
                      {summary.members.length} member{summary.members.length === 1 ? '' : 's'} in current view
                    </span>
                  </div>
                  <div className="committee-card__balance">
                    {balanceChips.map((alignment) => (
                      <span
                        className={`committee-balance-chip committee-balance-chip--${alignment}`}
                        key={`${summary.committee}-${alignment}`}
                      >
                        {summary.counts[alignment]} {capitalizeAlignment(alignment)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="committee-card__members">
                  {visibleMembers.map((person) => (
                    <button
                      className={`committee-member-chip committee-member-chip--${person.alignment}`}
                      key={`${summary.committee}-${person.id}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        onOpenPerson(person.id)
                      }}
                      type="button"
                    >
                      {person.name}
                    </button>
                  ))}
                  {hiddenCount > 0 ? (
                    <span className="committee-member-chip committee-member-chip--more">
                      +{hiddenCount} more
                    </span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="empty-results">
          No House committee assignments match the current legislative filters.
        </div>
      )}
    </section>
  )
}

function ExecutiveShutdownSection() {
  const timelineStart = parseUtcDate(
    EXECUTIVE_SHUTDOWN_EVENTS.reduce((earliest, event) => {
      return event.startDate < earliest ? event.startDate : earliest
    }, EXECUTIVE_SHUTDOWN_EVENTS[0]?.startDate ?? '2025-10-01'),
  )
  const today = getUtcStartOfDay(new Date())
  const timelineEndDay = EXECUTIVE_SHUTDOWN_EVENTS.reduce((latest, event) => {
    const eventEnd = event.endDate ? parseUtcDate(event.endDate) : today

    return eventEnd > latest ? eventEnd : latest
  }, today)
  const timelineEndExclusive = addUtcDays(timelineEndDay, 1)
  const timelineSpan = Math.max(timelineEndExclusive.getTime() - timelineStart.getTime(), MS_PER_DAY)
  const monthTicks = getShutdownTimelineMonthTicks(timelineStart, timelineEndExclusive)
  const ongoingCount = EXECUTIVE_SHUTDOWN_EVENTS.filter((event) => event.status === 'ongoing').length
  const timelineRowCount = EXECUTIVE_SHUTDOWN_AREA_GROUPS.reduce((count, group) => {
    return count + group.areas.length
  }, 0)

  return (
    <section className="section-card executive-shutdown-section">
      <div className="section-card__header executive-shutdown-section__header">
        <div>
          <p className="eyebrow">Shutdown Timeline</p>
          <h2>47th-term executive funding lapses</h2>
        </div>
        <p>
          This is an appropriations view. A shutdown label here means the office sat inside
          a lapsed funding bucket, not that every employee or function necessarily stopped
          working.
        </p>
      </div>

      <div className="executive-shutdown-timeline">
        <div className="executive-shutdown-timeline__summary">
          <article className="executive-shutdown-timeline__summary-card">
            <span>Timeline span</span>
            <strong>
              {formatShutdownTimelineMonth(timelineStart)}-{formatShutdownTimelineMonth(timelineEndDay)}
            </strong>
          </article>
          <article className="executive-shutdown-timeline__summary-card">
            <span>Chart rows</span>
            <strong>{timelineRowCount}</strong>
          </article>
          <article className="executive-shutdown-timeline__summary-card">
            <span>Recorded lapses</span>
            <strong>{EXECUTIVE_SHUTDOWN_EVENTS.length}</strong>
          </article>
          <article className="executive-shutdown-timeline__summary-card">
            <span>Still ongoing</span>
            <strong>{ongoingCount}</strong>
          </article>
        </div>

        <div className="executive-shutdown-timeline__legend">
          {EXECUTIVE_SHUTDOWN_EVENTS.map((event) => (
            <article className="executive-shutdown-timeline__legend-item" key={event.id}>
              <span
                className={`executive-shutdown-timeline__legend-swatch executive-shutdown-timeline__legend-swatch--${event.id}`}
              />
              <div className="executive-shutdown-timeline__legend-copy">
                <strong>{event.title}</strong>
                <span>{event.dateLabel}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="executive-shutdown-timeline__axis">
          <div className="executive-shutdown-timeline__axis-copy">
            <span>Office or department</span>
          </div>
          <div className="executive-shutdown-timeline__axis-track">
            {monthTicks.map((tick) => {
              const left =
                ((tick.getTime() - timelineStart.getTime()) / timelineSpan) * 100

              return (
                <div
                  className="executive-shutdown-timeline__tick"
                  key={tick.toISOString()}
                  style={{ left: `${Math.min(100, Math.max(0, left))}%` }}
                >
                  <span>{formatShutdownTimelineMonth(tick)}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="executive-shutdown-timeline__group-list">
          {EXECUTIVE_SHUTDOWN_AREA_GROUPS.map((group) => (
            <section className="executive-shutdown-timeline__group" key={group.id}>
              <div className="executive-shutdown-timeline__group-header">
                <span>{group.label}</span>
              </div>
              <div className="executive-shutdown-timeline__rows">
                {group.areas.map((area) => {
                  const areaEvents = area.eventIds
                    .map((eventId) => EXECUTIVE_SHUTDOWN_EVENT_MAP.get(eventId))
                    .filter((event) => event != null)

                  const timelineNote =
                    areaEvents.length > 0
                      ? areaEvents.map((event) => event.shortLabel).join(' • ')
                      : 'No annual lapse marker'

                  return (
                    <article className="executive-shutdown-timeline__row" key={area.id}>
                      <div className="executive-shutdown-timeline__row-copy">
                        <strong>{area.label}</strong>
                        <p>{timelineNote}</p>
                      </div>
                      <div className="executive-shutdown-timeline__lane">
                        {monthTicks.map((tick) => {
                          const tickLeft =
                            ((tick.getTime() - timelineStart.getTime()) / timelineSpan) * 100

                          return (
                            <span
                              className="executive-shutdown-timeline__gridline"
                              key={`${area.id}-${tick.toISOString()}`}
                              style={{ left: `${Math.min(100, Math.max(0, tickLeft))}%` }}
                            />
                          )
                        })}
                        {areaEvents.length > 0 ? (
                          areaEvents.map((event) => {
                            const eventStart = parseUtcDate(event.startDate)
                            const eventEndDay = event.endDate ? parseUtcDate(event.endDate) : today
                            const eventEndExclusive = addUtcDays(eventEndDay, 1)
                            const left =
                              ((eventStart.getTime() - timelineStart.getTime()) / timelineSpan) * 100
                            const width =
                              ((eventEndExclusive.getTime() - eventStart.getTime()) / timelineSpan) *
                              100

                            return (
                              <div
                                className={`executive-shutdown-timeline__bar executive-shutdown-timeline__bar--${event.id}`}
                                key={`${area.id}-${event.id}`}
                                style={{
                                  left: `${Math.min(100, Math.max(0, left))}%`,
                                  width: `${Math.min(100, Math.max(width, 1.6))}%`,
                                }}
                                aria-label={`${event.title} ${event.dateLabel}`}
                                title={`${event.title} ${event.dateLabel}`}
                              />
                            )
                          })
                        ) : (
                          <span className="executive-shutdown-timeline__no-lapse">
                            No annual lapse marker
                          </span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="executive-shutdown-events">
        {EXECUTIVE_SHUTDOWN_EVENTS.map((event) => (
          <article
            className={`executive-shutdown-event${
              event.status === 'ongoing' ? ' executive-shutdown-event--ongoing' : ''
            }`}
            key={event.id}
          >
            <div className="executive-shutdown-event__top">
              <span className="executive-shutdown-event__date">{event.dateLabel}</span>
              <span
                className={`shutdown-status-chip shutdown-status-chip--${event.status}`}
              >
                {event.status === 'ongoing' ? 'Ongoing' : 'Resolved'}
              </span>
            </div>
            <h3>{event.title}</h3>
            <p className="executive-shutdown-event__scope">{event.scopeLabel}</p>
            <p>{event.summary}</p>
            <div className="executive-shutdown-event__links">
              {event.sourceLinks.map((link) => (
                <SourceEvidenceLink key={`${event.id}-${link.label}-${link.url}`} source={link} />
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="executive-shutdown-groups">
        {EXECUTIVE_SHUTDOWN_AREA_GROUPS.map((group) => (
          <section
            className={`executive-shutdown-group executive-shutdown-group--${group.id}`}
            key={group.id}
          >
            <div className="executive-shutdown-group__header">
              <h3>{group.label}</h3>
            </div>
              <div className="executive-shutdown-area-grid">
                {group.areas.map((area) => (
                  <article className="executive-shutdown-area" key={area.id}>
                    <div className="executive-shutdown-area__header">
                      {EXECUTIVE_AREA_SEAL_URLS[area.id] ? (
                        <div className="executive-shutdown-area__seal-frame">
                          <img
                            alt={`${area.label} seal`}
                            className="executive-shutdown-area__seal"
                            decoding="async"
                            loading="lazy"
                            src={EXECUTIVE_AREA_SEAL_URLS[area.id]}
                          />
                        </div>
                      ) : null}
                      <div className="executive-shutdown-area__title">
                        <strong>{area.label}</strong>
                        {area.workforceLabel ? (
                          <span className="executive-shutdown-area__meta">
                            {area.workforceLabel}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="executive-shutdown-area__chips">
                      {area.eventIds.length > 0 ? (
                        area.eventIds.map((eventId) => {
                          const event = EXECUTIVE_SHUTDOWN_EVENT_MAP.get(eventId)

                          if (!event) {
                            return null
                          }

                          return (
                            <span
                              className={`shutdown-event-chip shutdown-event-chip--${
                                event.status === 'ongoing' ? 'ongoing' : 'resolved'
                              }`}
                              key={`${area.id}-${event.id}`}
                            >
                              {formatShutdownChipLabel(event.startDate, event.endDate)}
                            </span>
                          )
                        })
                      ) : (
                        <span className="shutdown-event-chip shutdown-event-chip--none">
                          No annual-lapse marker
                        </span>
                      )}
                    </div>
                    <p>{area.note}</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

function getTrumpTruthPostKindLabel(kind: TrumpTruthPost['kind']) {
  switch (kind) {
    case 'media':
      return 'Media post'
    case 'retruth':
      return 'ReTruth'
    default:
      return 'Post'
  }
}

function getTrumpTruthPostDisplayText(post: TrumpTruthPost) {
  const trimmed = post.text.trim()

  if (!trimmed) {
    return ''
  }

  if (post.kind === 'retruth' && /^RT:\s*https?:\/\//i.test(trimmed)) {
    return ''
  }

  return trimmed
}

function getTrumpTruthPostSummary(post: TrumpTruthPost) {
  const displayText = getTrumpTruthPostDisplayText(post)

  if (displayText) {
    return displayText
  }

  switch (post.kind) {
    case 'media':
      return 'Media-only post captured in the archive snapshot.'
    case 'retruth':
      return 'ReTruthed post without standalone text in the current snapshot.'
    default:
      return 'Post captured without visible text in the current snapshot.'
  }
}

function ExecutiveTrumpTruthSection() {
  const leftPosts = TRUMP_TRUTH_SNAPSHOT.posts.slice(0, Math.ceil(TRUMP_TRUTH_SNAPSHOT.posts.length / 2))
  const rightPosts = TRUMP_TRUTH_SNAPSHOT.posts.slice(Math.ceil(TRUMP_TRUTH_SNAPSHOT.posts.length / 2))
  const truthProfileStyle = {
    '--truth-header-image': `url(${trumpTruthHeaderUrl})`,
  } as CSSProperties

  const renderPostCard = (post: TrumpTruthPost, index: number) => (
    <article
      className={`executive-truth-card${post.previewImageUrl ? ' executive-truth-card--with-preview' : ''}`}
      key={post.id}
    >
      <div className="executive-truth-card__rail">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="executive-truth-card__panel">
        <div
          className={`executive-truth-card__content${post.previewImageUrl ? ' executive-truth-card__content--with-preview' : ''}`}
        >
          {post.previewImageUrl ? (
            <a className="executive-truth-card__thumb" href={post.archiveUrl} rel="noreferrer" target="_blank">
              <img
                alt={`Archived preview of Trump's ${getTrumpTruthPostKindLabel(post.kind).toLowerCase()} from ${formatTrumpTruthDate(post.publishedAt)}`}
                className="executive-truth-card__image"
                src={post.previewImageUrl}
              />
            </a>
          ) : null}

          <div className="executive-truth-card__copy">
            <div className="executive-truth-card__topline">
              <span className={`executive-truth-card__kind executive-truth-card__kind--${post.kind}`}>
                {getTrumpTruthPostKindLabel(post.kind)}
              </span>
              <time className="executive-truth-card__date" dateTime={post.publishedAt}>
                {formatTrumpTruthDate(post.publishedAt)}
              </time>
            </div>

            <p className="executive-truth-card__summary">{getTrumpTruthPostSummary(post)}</p>

            <div className="executive-truth-card__links">
              <a href={post.originalUrl} rel="noreferrer" target="_blank">
                Original
              </a>
              <a href={post.archiveUrl} rel="noreferrer" target="_blank">
                Archive
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )

  return (
    <section className="section-card executive-truth-section">
      <div className="section-card__header executive-truth-section__header">
        <div>
          <p className="eyebrow executive-truth-section__eyebrow">
            <img alt="Trump Truth Social profile image" className="executive-truth-section__badge" src={trumpTruthAvatarUrl} />
            <span>Trump Social</span>
          </p>
          <h2>{TRUMP_TRUTH_SNAPSHOT.posts.length} most recent Truth Social posts</h2>
        </div>
        <p>
          Snapshot from{' '}
          <a href={TRUMP_TRUTH_SNAPSHOT.sourceUrl} rel="noreferrer" target="_blank">
            {TRUMP_TRUTH_SNAPSHOT.sourceLabel}
          </a>{' '}
          as of {formatTrumpTruthDate(TRUMP_TRUTH_SNAPSHOT.updatedAt)}.
        </p>
      </div>

      <div className="executive-truth-profile" style={truthProfileStyle}>
        <div className="executive-truth-profile__banner" />
        <div className="executive-truth-profile__meta">
          <img
            alt="Donald Trump Truth Social profile image"
            className="executive-truth-profile__avatar"
            src={trumpTruthAvatarUrl}
          />
          <div className="executive-truth-profile__identity">
            <strong>Donald J. Trump</strong>
            <span>@realDonaldTrump</span>
          </div>
        </div>
      </div>

      <div className="executive-truth-stage">
        <div className="executive-truth-grid">
          <div className="executive-truth-column">{leftPosts.map((post, index) => renderPostCard(post, index))}</div>
          <div className="executive-truth-column">
            {rightPosts.map((post, index) => renderPostCard(post, index + leftPosts.length))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExecutiveCabinetControversiesSection({
  onOpenPerson,
  people,
  selectedPersonId,
}: {
  onOpenPerson: (personId: string) => void
  people: GovernmentPerson[]
  selectedPersonId: string | null
}) {
  const featuredPersonIds: string[] = [
    'executive-pam-bondi',
    'executive-pete-hegseth',
    'executive-robert-f-kennedy-jr',
    'executive-kristi-noem',
    'executive-linda-mcmahon',
    'executive-howard-lutnick',
    'executive-sean-duffy',
  ]
  const featuredRank = new Map(featuredPersonIds.map((id, index) => [id, index]))
  const featuredPeople = people
    .filter((person) => featuredRank.has(person.id))
    .sort((left, right) => {
      return (featuredRank.get(left.id) ?? 999) - (featuredRank.get(right.id) ?? 999)
    })
    .filter((person) => (person.publicControversies?.length ?? 0) > 0)
  const totalControversyCount = featuredPeople.reduce(
    (sum, person) => sum + (person.publicControversies?.length ?? 0),
    0,
  )

  if (!featuredPeople.length) {
    return null
  }

  return (
    <section className="section-card executive-controversy-section">
      <div className="section-card__header">
        <div>
          <p className="eyebrow">
            {totalControversyCount} controversy entries across {featuredPeople.length} selected Cabinet heads
          </p>
          <h2>Selected Public Controversies</h2>
        </div>
        <p>Higher-salience entries only. Click a name to open the full profile card.</p>
      </div>

      <div className="executive-controversy-list">
        {featuredPeople.map((person) => {
          const isSelected = selectedPersonId === person.id
          const controversies = person.publicControversies ?? []

          return (
            <article className={`executive-controversy-card${isSelected ? ' is-selected' : ''}`} key={person.id}>
              <div className="executive-controversy-card__top">
                <div className="executive-controversy-card__title-group">
                  <button
                    className={`executive-controversy-card__person executive-controversy-card__person--${person.alignment}${
                      isSelected ? ' is-selected' : ''
                    }`}
                    onClick={() => onOpenPerson(person.id)}
                    type="button"
                  >
                    <span>{person.department ?? person.title}</span>
                    <strong>{person.name}</strong>
                  </button>
                  <span className="executive-controversy-card__count">
                    {controversies.length} {controversies.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>
              </div>

              <div className="executive-controversy-entry-list">
                {controversies.map((entry) => (
                  <section
                    className="executive-controversy-entry"
                    key={`${person.id}-${entry.date}-${entry.sourceUrl}`}
                  >
                    <div className="executive-controversy-entry__meta">
                      <time className="executive-controversy-card__date" dateTime={entry.date}>
                        {formatCaseDate(entry.date)}
                      </time>
                      <a href={entry.sourceUrl} rel="noreferrer" target="_blank">
                        {entry.sourceLabel}
                      </a>
                    </div>
                    <p>
                      <strong>What happened:</strong> {entry.whatHappened}
                    </p>
                    <p>
                      <strong>Why it was criticized:</strong> {entry.whyCriticized}
                    </p>
                  </section>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ExecutiveOverviewSection({
  cards,
  onOpen,
}: {
  cards: ExecutiveOverviewCard[]
  onOpen: (id: string) => void
}) {
  return (
    <section className="executive-overview">
      {cards.map((card) => (
        <button className="executive-overview-card" key={card.id} onClick={() => onOpen(card.id)} type="button">
          <span>{card.countLabel}</span>
          <strong>{card.title}</strong>
        </button>
      ))}
    </section>
  )
}

function ExecutivePageChooserSection({
  activePage,
  cards,
  onOpen,
}: {
  activePage: ExecutivePageId | null
  cards: ExecutivePageCard[]
  onOpen: (pageId: ExecutivePageId) => void
}) {
  return (
    <section className="executive-page-chooser">
      {cards.map((card) => {
        const isActive = activePage === card.id

        return (
          <button
            aria-pressed={isActive}
            className={`executive-page-card${isActive ? ' is-active' : ''}`}
            key={card.id}
            onClick={() => onOpen(card.id)}
            type="button"
          >
            <span>{card.eyebrow}</span>
            <strong>{card.title}</strong>
            <p>{card.description}</p>
          </button>
        )
      })}
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
          <p className="vote-matrix__axes">
            {JUDICIAL_INFERENCE_NOTE}
          </p>
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
            <span className="vote-matrix__legend-item">
              <i className="vote-cell vote-cell--took_no_part" />
              Took no part
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
                  const outcomeSide = getSupremeCourtCaseOutcomeSide(caseItem)

                  return (
                    <th
                      className={`vote-matrix__event${
                        outcomeSide ? ` vote-matrix__event--${outcomeSide}` : ''
                      }${isSelectedCase ? ' is-selected' : ''}`}
                      key={caseItem.id}
                      scope="col"
                    >
                      <button
                        className={`vote-matrix__event-link${
                          outcomeSide ? ` vote-matrix__event-link--${outcomeSide}` : ''
                        }${isSelectedCase ? ' is-selected' : ''}`}
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

function JudicialBiotechCasesSection() {
  const [selectedGroupId, setSelectedGroupId] = useState<'all' | JudicialBiotechCaseGroupId>('all')
  const visibleGroups = JUDICIAL_BIOTECH_CASE_GROUPS.filter((group) =>
    selectedGroupId === 'all' ? true : group.id === selectedGroupId,
  )
  const visibleCaseCount = visibleGroups.reduce(
    (count, group) =>
      count + JUDICIAL_BIOTECH_CASES.filter((caseItem) => caseItem.groupId === group.id).length,
    0,
  )
  const selectedGroupLabel =
    selectedGroupId === 'all'
      ? null
      : JUDICIAL_BIOTECH_CASE_GROUPS.find((group) => group.id === selectedGroupId)?.title ?? null

  return (
    <section className="section-card case-section case-section--judicial-biotech">
      <div className="section-card__header case-section__header">
        <div>
          <p className="eyebrow">
            {populationCountFormatter.format(visibleCaseCount)} cases
            {selectedGroupLabel ? ` • ${selectedGroupLabel}` : ''}
          </p>
          <h2>Biotech & Bioethics Cases</h2>
        </div>
      </div>

      <div aria-label="Judicial biotech case groups" className="biotech-event-index__filters">
        <button
          className={`biotech-event-index__filter-chip${selectedGroupId === 'all' ? ' is-active' : ''}`}
          onClick={() => setSelectedGroupId('all')}
          type="button"
        >
          All
        </button>
        {JUDICIAL_BIOTECH_CASE_GROUPS.map((group) => (
          <button
            className={`biotech-event-index__filter-chip${
              selectedGroupId === group.id ? ' is-active' : ''
            }`}
            key={group.id}
            onClick={() => setSelectedGroupId(group.id)}
            type="button"
          >
            {group.title}
          </button>
        ))}
      </div>

      <div className="judicial-case-groups">
        {visibleGroups.map((group) => {
          const groupCases = JUDICIAL_BIOTECH_CASES.filter((caseItem) => caseItem.groupId === group.id).sort(
            (left, right) => right.year - left.year,
          )

          return (
            <section className="judicial-case-group" key={group.id}>
              <div className="judicial-case-group__header">
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <span className="judicial-case-group__count">{groupCases.length} cases</span>
              </div>

              <div className="case-grid">
                {groupCases.map((caseItem) => {
                  const mediaMirror = JUDICIAL_MEDIA_MIRRORS[caseItem.id]
                  const titleSourceUrl = getDeepLinkedSourceUrl(caseItem.source)
                  const titleSourceTitle = getSourceLocationTitle(caseItem.source)
                  const sourceLinks = [
                    ...(caseItem.sourceLinks ?? []),
                    ...(judicialBiotechCaseSourceOverrides.get(caseItem.id) ?? []),
                  ]

                  return (
                    <article className="case-card case-card--judicial-biotech" key={caseItem.id}>
                      <div className="case-card__meta">
                        <div className="case-card__tags">
                          <span className="case-tag">{caseItem.court}</span>
                          <span className="case-date">{caseItem.year}</span>
                        </div>
                      </div>

                      <div className="case-card__header">
                        <h3>
                          <a
                            className="case-card__title-link"
                            href={titleSourceUrl}
                            rel="noreferrer"
                            target="_blank"
                            title={titleSourceTitle}
                          >
                            {caseItem.caseName}
                          </a>
                        </h3>
                      </div>

                      <p className="case-card__issue">
                        <strong>Issue:</strong> {caseItem.issue}
                      </p>
                      <p className="case-card__result">
                        <strong>Holding:</strong> {caseItem.holding}
                      </p>
                      <p className="case-card__note">
                        <strong>Why it matters:</strong> {caseItem.whyItMatters}
                      </p>

                      {sourceLinks.length > 0 || mediaMirror ? (
                        <div className="biotech-card__sources">
                          {sourceLinks.map((source) => (
                            <SourceEvidenceLink
                              hideDate
                              key={`${caseItem.id}-${source.label}-${source.url}`}
                              source={source}
                            />
                          ))}
                          {mediaMirror ? (
                            <a href={mediaMirror.url} rel="noreferrer" target="_blank">
                              <span className="source-evidence-link__date">Mirror</span>
                              <span className="source-evidence-link__label">{mediaMirror.label}</span>
                              <span className="source-evidence-link__locator">Unofficial YouTube mirror upload</span>
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}

function EconomySnapshotSection({ metrics }: { metrics: EconomyMetric[] }) {
  const [historyRange, setHistoryRange] = useState<EconomyHistoryRange>('1y')
  const timeline = getEconomyTimeline(metrics, historyRange)

  if (metrics.length === 0) {
    return null
  }

  return (
    <section className="economy-strip" aria-labelledby="economy-strip-title">
      <div className="economy-strip__intro">
        <p className="eyebrow">Economy Snapshot</p>
        <div className="economy-strip__intro-main">
          <div className="economy-strip__intro-copy">
            <h2 id="economy-strip-title">{metrics.length} official histories with selectable range.</h2>
            <p>Switch every row between the last 1 year, 2 years, 5 years, or 10 years.</p>
          </div>
          <div className="economy-strip__controls" role="group" aria-label="Economy history range">
            {(['1y', '2y', '5y', '10y'] as EconomyHistoryRange[]).map((range) => (
              <button
                aria-pressed={historyRange === range}
                className={`economy-range-button${historyRange === range ? ' is-active' : ''}`}
                key={range}
                onClick={() => setHistoryRange(range)}
                type="button"
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="economy-history-list">
        {metrics.map((metric) => {
          const visibleHistory = getEconomyHistoryWindow(metric, historyRange)
          const historyRangeLabel = getEconomyHistoryRangeLabel(visibleHistory)

          return (
            <article
              className={`economy-history-row economy-history-row--${metric.tone ?? 'neutral'}`}
              key={metric.id}
            >
              <div className="economy-history-row__summary">
                <div className="economy-history-row__meta">
                  <span>{metric.category}</span>
                  <span>{metric.sourceDate}</span>
                </div>
                <div className="economy-history-row__heading">
                  <h3>{metric.label}</h3>
                  <strong className="economy-history-row__value">{metric.value}</strong>
                </div>
                {historyRangeLabel ? (
                  <p className="economy-history-row__range">{historyRangeLabel}</p>
                ) : null}
                <p>{metric.detail}</p>
                <a
                  className="economy-history-row__source"
                  href={metric.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{metric.sourceLabel}</span>
                  <span>Open</span>
                </a>
              </div>
              <div className="economy-history-row__plot-shell">
                {visibleHistory.length >= 2 && timeline != null ? (
                  <EconomyHistoryLine
                    metric={metric}
                    points={visibleHistory}
                    range={historyRange}
                    timeline={timeline}
                  />
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function getEconomyHistoryPointCount(metricId: EconomyMetric['id'], range: EconomyHistoryRange) {
  const yearlyPointCount = metricId === 'real-gdp' ? 4 : 12

  switch (range) {
    case '1y':
      return yearlyPointCount
    case '2y':
      return yearlyPointCount * 2
    case '5y':
      return yearlyPointCount * 5
    case '10y':
      return yearlyPointCount * 10
  }
}

function getEconomyHistoryWindow(metric: EconomyMetric, range: EconomyHistoryRange) {
  if (!metric.history || metric.history.length === 0) {
    return []
  }

  return metric.history.slice(-getEconomyHistoryPointCount(metric.id, range))
}

function getEconomyHistoryRangeLabel(points: EconomyHistoryPoint[]) {
  if (points.length === 0) {
    return null
  }

  return `${points[0].label} to ${points[points.length - 1].label}`
}

function parseEconomyHistoryPointTime(point: EconomyHistoryPoint) {
  const quarterMatch = point.label.match(/^Q([1-4]) (\d{2})$/)
  if (quarterMatch) {
    const quarterIndex = Number(quarterMatch[1]) - 1
    const year = 2000 + Number(quarterMatch[2])
    return Date.UTC(year, quarterIndex * 3, 1)
  }

  const monthMatch = point.label.match(/^([A-Z][a-z]{2}) (\d{2})$/)
  if (monthMatch) {
    const monthIndex = ECONOMY_MONTH_INDEX_BY_NAME.get(monthMatch[1])
    if (monthIndex == null) {
      return null
    }

    const year = 2000 + Number(monthMatch[2])
    return Date.UTC(year, monthIndex, 1)
  }

  return null
}

function addUtcMonths(time: number, monthOffset: number) {
  const date = new Date(time)
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + monthOffset, 1)
}

function formatEconomyTickTime(time: number, range: EconomyHistoryRange) {
  const date = new Date(time)
  const year = date.getUTCFullYear()

  if (range === '5y' || range === '10y') {
    return String(year)
  }

  return `${ECONOMY_SHORT_MONTH_NAMES[date.getUTCMonth()]} ${String(year).slice(-2)}`
}

function getEconomyAxisStepMonths(range: EconomyHistoryRange) {
  switch (range) {
    case '1y':
      return 3
    case '2y':
      return 6
    case '5y':
      return 12
    case '10y':
      return 24
  }
}

function getEconomyAxisTickCount(range: EconomyHistoryRange) {
  switch (range) {
    case '1y':
    case '2y':
      return 5
    case '5y':
    case '10y':
      return 6
  }
}

function getEconomyTimeline(metrics: EconomyMetric[], range: EconomyHistoryRange): EconomyTimeline | null {
  const timedPoints = metrics.flatMap((metric) =>
    getEconomyHistoryWindow(metric, range)
      .map((point) => {
        const time = parseEconomyHistoryPointTime(point)
        return time == null ? null : { ...point, time }
      })
      .filter((point): point is TimedEconomyHistoryPoint => point != null),
  )

  if (timedPoints.length === 0) {
    return null
  }

  const startTime = Math.min(...timedPoints.map((point) => point.time))
  const endTime = Math.max(...timedPoints.map((point) => point.time))
  const tickCount = getEconomyAxisTickCount(range)
  const stepMonths = getEconomyAxisStepMonths(range)
  const ticks = Array.from({ length: tickCount }, (_, tickIndex) => {
    const offset = stepMonths * (tickCount - tickIndex - 1)
    const time = addUtcMonths(endTime, -offset)

    return {
      label: formatEconomyTickTime(time, range),
      time,
    }
  })

  return {
    endTime,
    startTime,
    ticks,
  }
}

function getEconomyChartWidth(range: EconomyHistoryRange) {
  switch (range) {
    case '1y':
      return 880
    case '2y':
      return 980
    case '5y':
      return 1160
    case '10y':
      return 1320
  }
}

function formatEconomyAxisLabel(label: string) {
  return label
}

function formatEconomyDollarHistoryValue(value: number) {
  const absoluteValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (absoluteValue >= 1000) {
    return `${sign}$${(absoluteValue / 1000).toFixed(2)}T`
  }

  return `${sign}$${absoluteValue.toFixed(1)}B`
}

function formatEconomyPriceHistoryValue(metricId: EconomyMetric['id'], value: number) {
  if (metricId === 'gasoline-price') {
    return `$${value.toFixed(2)}`
  }

  return `$${value.toFixed(2)}`
}

function formatEconomyHistoryValue(metricId: EconomyMetric['id'], value: number) {
  switch (metricId) {
    case 'payroll-jobs':
      return `${value > 0 ? '+' : ''}${Math.round(value)}k`
    case 'real-gdp':
    case 'real-gdp-growth':
      return `$${value.toFixed(2)}T`
    case 'trade-balance':
    case 'federal-receipts':
    case 'federal-outlays':
    case 'federal-deficit':
      return formatEconomyDollarHistoryValue(value)
    case 'wti-crude':
    case 'brent-crude':
    case 'gasoline-price':
      return formatEconomyPriceHistoryValue(metricId, value)
    case 'public-debt':
      return `$${value.toFixed(3)}T`
    case 'dow':
    case 'sp500':
      return value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
      })
    case 'labor-force-participation':
    case 'unemployment-rate':
      return `${value.toFixed(1)}%`
    case 'fed-funds-rate':
    case 'ten-year-treasury':
      return `${value.toFixed(2)}%`
    default:
      return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }
}

function buildEconomyLineGeometry(
  points: TimedEconomyHistoryPoint[],
  width: number,
  height: number,
  timeline: EconomyTimeline,
) {
  if (points.length === 0) {
    return null
  }

  const paddingLeft = 44
  const paddingRight = 44
  const paddingTop = 28
  const paddingBottom = 34
  const values = points.map((point) => point.value)
  let minValue = Math.min(...values)
  let maxValue = Math.max(...values)

  if (minValue === maxValue) {
    minValue -= 1
    maxValue += 1
  }

  const span = maxValue - minValue
  const timeSpan = Math.max(timeline.endTime - timeline.startTime, 1)
  const usableWidth = width - paddingLeft - paddingRight
  const usableHeight = height - paddingTop - paddingBottom
  const mapX = (time: number) => paddingLeft + ((time - timeline.startTime) / timeSpan) * usableWidth
  const mapY = (value: number) =>
    height - paddingBottom - ((value - minValue) / span) * usableHeight
  const chartPoints = points.map((point, index) => ({
    ...point,
    index,
    x: mapX(point.time),
    y: mapY(point.value),
  }))
  const polyline = chartPoints.map((point) => `${point.x},${point.y}`).join(' ')
  const lastPoint = points[points.length - 1]
  const lastX = mapX(lastPoint.time)
  const lastY = mapY(lastPoint.value)
  const tickPoints = timeline.ticks.map((tick) => ({
    ...tick,
    label: formatEconomyAxisLabel(tick.label),
    x: mapX(tick.time),
  }))

  return {
    areaPath: `M ${paddingLeft},${height - paddingBottom} L ${polyline
      .split(' ')
      .join(' L ')} L ${lastX},${height - paddingBottom} Z`,
    baselineY: minValue < 0 && maxValue > 0 ? mapY(0) : null,
    chartPoints,
    gridBottomY: height - paddingBottom,
    gridTopY: paddingTop,
    lastX,
    lastY,
    labelY: height - 8,
    polyline,
    tickPoints,
  }
}

function getEconomyChartValueEvery(metricId: EconomyMetric['id'], pointCount: number) {
  if (metricId === 'real-gdp') {
    if (pointCount <= 8) {
      return 1
    }

    if (pointCount <= 20) {
      return 4
    }

    return 8
  }

  if (pointCount <= 12) {
    return 1
  }

  if (pointCount <= 24) {
    return 3
  }

  if (pointCount <= 60) {
    return 6
  }

  return 12
}

function EconomyHistoryLine({
  metric,
  points,
  range,
  timeline,
}: {
  metric: EconomyMetric
  points: EconomyHistoryPoint[]
  range: EconomyHistoryRange
  timeline: EconomyTimeline
}) {
  const width = Math.max(760, getEconomyChartWidth(range))
  const height = 164
  const timedPoints = points
    .map((point) => {
      const time = parseEconomyHistoryPointTime(point)
      return time == null ? null : { ...point, time }
    })
    .filter((point): point is TimedEconomyHistoryPoint => point != null)
  const geometry = buildEconomyLineGeometry(timedPoints, width, height, timeline)

  if (geometry == null) {
    return null
  }

  const valueEvery = getEconomyChartValueEvery(metric.id, points.length)
  const pointRadius = points.length > 60 ? 3.5 : 4.75
  const firstPoint = timedPoints[0]
  const lastPoint = timedPoints[timedPoints.length - 1]
  const ariaLabel = `${metric.label} history from ${firstPoint.label} ${formatEconomyHistoryValue(
    metric.id,
    firstPoint.value,
  )} to ${lastPoint.label} ${formatEconomyHistoryValue(metric.id, lastPoint.value)}`

  return (
    <div className="economy-history-line">
      <svg
        aria-label={ariaLabel}
        className="economy-history-line__svg"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        {geometry.baselineY != null ? (
          <line
            className="economy-history-line__baseline"
            x1="44"
            x2={String(width - 44)}
            y1={String(geometry.baselineY)}
            y2={String(geometry.baselineY)}
          />
        ) : null}
        {geometry.tickPoints.map((tick) => (
          <line
            className="economy-history-line__gridline"
            key={`${metric.id}-grid-${tick.time}`}
            x1={String(tick.x)}
            x2={String(tick.x)}
            y1={String(geometry.gridTopY)}
            y2={String(geometry.gridBottomY)}
          />
        ))}
        <path className="economy-history-line__area" d={geometry.areaPath} />
        <polyline className="economy-history-line__stroke" points={geometry.polyline} />
        {geometry.chartPoints.map((point, pointIndex) => {
          const isLastPoint = pointIndex === geometry.chartPoints.length - 1
          const showValue = pointIndex % valueEvery === 0 || isLastPoint
          const valueOffset = point.y < 42 ? 18 : -12
          const valueClass = isLastPoint ? ' economy-history-line__value-text--current' : ''

          return (
            <Fragment key={`${metric.id}-${point.label}`}>
              <g>
                <title>
                  {point.label} {formatEconomyHistoryValue(metric.id, point.value)}
                </title>
                <circle
                  className="economy-history-line__dot"
                  cx={String(point.x)}
                  cy={String(point.y)}
                  r={String(pointRadius)}
                />
              </g>
              {showValue ? (
                <text
                  className={`economy-history-line__value-text${valueClass}`}
                  textAnchor="middle"
                  x={String(point.x)}
                  y={String(point.y + valueOffset)}
                >
                  {formatEconomyHistoryValue(metric.id, point.value)}
                </text>
              ) : null}
            </Fragment>
          )
        })}
        {geometry.tickPoints.map((tick) => (
          <text
            className="economy-history-line__tick-text"
            key={`${metric.id}-tick-${tick.time}`}
            textAnchor="middle"
            x={String(tick.x)}
            y={String(geometry.labelY)}
          >
            {tick.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

function HomeView({
  audienceMode,
  data,
  onBranchSelect,
  onOpenBiotechPage,
}: {
  audienceMode: AudienceMode
  data: GovernmentDataset
  onBranchSelect: (branchId: BranchId) => void
  onOpenBiotechPage: () => void
}) {
  const homeCopy = HOME_AUDIENCE_COPY[audienceMode]

  return (
    <main className="screen screen--home">
      <section className="hero-card hero-card--intro">
        <div className="hero-card__intro-copy">
          <p className="eyebrow">{homeCopy.eyebrow}</p>
          <h1>{homeCopy.title}</h1>
          <p className="hero-copy">{homeCopy.copy}</p>
          <p className="hero-note">
            Some official links may open only from a U.S. IP address or a U.S. VPN node.
          </p>
        </div>
        <div aria-hidden="true" className="hero-card__flag-shell">
          <svg
            className="hero-card__flag"
            role="img"
            viewBox="0 0 190 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>United States flag</title>
            <rect fill="#ffffff" height="100" rx="8" width="190" />
            {Array.from({ length: 13 }, (_, index) => (
              <rect
                fill={index % 2 === 0 ? '#b22234' : '#ffffff'}
                height={100 / 13}
                key={`home-flag-stripe-${index}`}
                width="190"
                y={(100 / 13) * index}
              />
            ))}
            <rect fill="#3c3b6e" height={(100 / 13) * 7} width={190 * 0.4} />
            {HOME_FLAG_STAR_ROWS.flatMap((starCount, rowIndex) => {
              const startX = starCount === 6 ? 10 : 15.2
              const gapX = 10.1
              const y = 8 + rowIndex * 6

              return Array.from({ length: starCount }, (_, starIndex) => (
                <path
                  d={HOME_FLAG_STAR_PATH}
                  fill="#ffffff"
                  key={`home-flag-star-${rowIndex}-${starIndex}`}
                  transform={`translate(${startX + starIndex * gapX} ${y}) scale(0.9)`}
                />
              ))
            })}
          </svg>
        </div>
      </section>
      <section className="branch-orbit" aria-label="Three branches of government">
        {data.branches.map((branch) => {
          const count = data.people.filter((person) =>
            branch.id === 'legislative'
              ? person.branchId === branch.id && shouldDisplayLegislativePerson(person)
              : person.branchId === branch.id,
          ).length

          return (
            <button
              className={`branch-orb branch-orb--${branch.id}`}
              key={branch.id}
              onClick={() => onBranchSelect(branch.id)}
              type="button"
            >
              <span className="branch-orb__halo" />
              <span className="branch-orb__content">
                <span className="branch-orb__label">{branch.name}</span>
                <strong className="branch-orb__count">{count} profiles</strong>
                <span className="branch-orb__summary">{branch.summary}</span>
              </span>
            </button>
          )
        })}
      </section>
      <section className="section-card home-topic-card">
        <div className="home-topic-card__copy">
          <div>
            <p className="eyebrow">Special topic</p>
            <h2>Biotech, Biosecurity &amp; Power</h2>
          </div>
          <p>
            A dedicated hub for a world company atlas, U.S. judicial cases, and U.S. biotech,
            healthcare, and biosecurity proceedings, all source-linked and separated from the main
            three-branch view.
          </p>
        </div>
        <div className="home-topic-card__meta">
          <div className="home-topic-card__stats">
            <div className="stat-card">
              <strong>{BIOTECH_COMPANIES.length}</strong>
              <span>companies</span>
            </div>
            <div className="stat-card">
              <strong>{JUDICIAL_BIOTECH_CASES.length}</strong>
              <span>judicial cases</span>
            </div>
            <div className="stat-card">
              <strong>{BIOTECH_EVENT_INDEX.length}</strong>
              <span>proceedings</span>
            </div>
          </div>
          <button className="home-topic-card__button" onClick={onOpenBiotechPage} type="button">
            Open biotech hub
          </button>
        </div>
      </section>
      <EconomySnapshotSection metrics={data.economySnapshot ?? []} />
    </main>
  )
}

function BiotechConnectionsView({
  biotechPage,
  branchesById,
  onBackHome,
  onBackToChooser,
  onOpenBiotechPage,
  onOpenPerson,
  peopleById,
}: {
  biotechPage: BiotechPageId | null
  branchesById: Map<BranchId, GovernmentBranch>
  onBackHome: () => void
  onBackToChooser: () => void
  onOpenBiotechPage: (pageId: BiotechPageId) => void
  onOpenPerson: (personId: string) => void
  peopleById: Map<string, GovernmentPerson>
}) {
  const [expandedPersonId, setExpandedPersonId] = useState<string | null>(null)
  const [biotechCompanyCategoryFilter, setBiotechCompanyCategoryFilter] =
    useState<BiotechCompanyCategoryFilter>('all')
  const [biotechProceedingsCategoryFilter, setBiotechProceedingsCategoryFilter] =
    useState<BiotechProceedingCategoryFilter>('all')
  const biotechConnections = BIOTECH_CONNECTIONS.filter(
    (connection) => connection.branchId !== 'judicial',
  )
  const biotechMentions = BIOTECH_MENTIONS.filter(
    (entry) => !entry.personIds.some((personId) => personId.startsWith('judicial-')),
  )
  const groupedConnections = BIOTECH_CATEGORY_ORDER.map((category) => ({
    category,
    items: biotechConnections.filter((connection) => connection.category === category),
    meta: BIOTECH_CATEGORY_META[category],
  })).filter((group) => group.items.length > 0)
  const mentionGroups = BIOTECH_MENTION_TIER_ORDER.map((tier) => ({
    items: biotechMentions.filter((entry) => entry.tier === tier),
    meta: BIOTECH_MENTION_TIER_META[tier],
    tier,
  })).filter((group) => group.items.length > 0)
  const biotechEventRows = BIOTECH_EVENT_INDEX.map((event) => ({
    ...event,
    displayDate: caseDateFormatter.format(new Date(`${event.date}T00:00:00Z`)),
    primarySource:
      event.sourceLinks && event.sourceLinks.length > 0 ? event.sourceLinks[0] : event.source,
    sourceLinks:
      event.sourceLinks && event.sourceLinks.length > 0 ? event.sourceLinks : [event.source],
    filterCategory: getBiotechProceedingFilterCategory(event),
  }))
    .map((event) => ({
      ...event,
      secondarySourceLinks: event.sourceLinks.filter(
        (source, index, collection) =>
          source.url !== event.primarySource.url &&
          collection.findIndex(
            (candidate) => candidate.url === source.url && candidate.label === source.label,
          ) === index,
      ),
    }))
    .sort((left, right) => right.date.localeCompare(left.date))
  const biotechCompanies = [...BIOTECH_COMPANIES].sort(
    (left, right) => right.marketCapBillions - left.marketCapBillions,
  )
  const biotechCompaniesSnapshotDate =
    biotechCompanies
      .flatMap((company) =>
        company.sources
          .map((source) => source.dateLabel)
          .filter((label): label is string => Boolean(label)),
      )
      .find(Boolean) ?? 'Apr 2026'
  const biotechCompanyCategoryCountMap = biotechCompanies.reduce((counts, company) => {
    counts.set(company.category, (counts.get(company.category) ?? 0) + 1)
    return counts
  }, new Map<BiotechCompanyCategory, number>())
  const biotechCompanyCategoryCounts = BIOTECH_COMPANY_CATEGORY_ORDER.map((category) => [
    category,
    biotechCompanyCategoryCountMap.get(category) ?? 0,
  ] as const).filter(([, count]) => count > 0)
  const filteredBiotechCompanies =
    biotechCompanyCategoryFilter === 'all'
      ? biotechCompanies
      : biotechCompanies.filter((company) => company.category === biotechCompanyCategoryFilter)
  const filteredBiotechCompanyTotalMarketCap = filteredBiotechCompanies.reduce(
    (sum, company) => sum + company.marketCapBillions,
    0,
  )
  const filteredBiotechCompanyCountryCount = new Set(
    filteredBiotechCompanies.map(
      (company) => company.headquarters.split(', ').at(-1) ?? company.headquarters,
    ),
  ).size
  const largestBiotechCompany = filteredBiotechCompanies[0] ?? null
  const filteredBiotechEventRows =
    biotechProceedingsCategoryFilter === 'all'
      ? biotechEventRows
      : biotechEventRows.filter((event) => event.filterCategory === biotechProceedingsCategoryFilter)
  const biotechProfileCount = new Set(biotechConnections.map((connection) => connection.personId)).size
  const biotechEntryPages = [
    {
      count: biotechCompanies.length,
      id: 'companies',
      tone: 'companies',
    },
    {
      count: JUDICIAL_BIOTECH_CASES.length,
      id: 'judicial-cases',
      tone: 'judicial',
    },
    {
      count: biotechEventRows.length,
      id: 'proceedings',
      tone: 'proceedings',
    },
    {
      count: biotechProfileCount,
      id: 'people-profiles',
      tone: 'profiles',
    },
    {
      count: biotechMentions.length,
      id: 'official-language',
      tone: 'language',
    },
  ] satisfies Array<{
    count: number
    id: BiotechPageId
    tone: 'companies' | 'judicial' | 'proceedings' | 'profiles' | 'language'
  }>
  const biotechEntryPageCards = biotechEntryPages.map((entry) => ({
    ...entry,
    ...BIOTECH_PAGE_META[entry.id],
  }))
  const visibleBiotechEntryPageCards = biotechEntryPageCards.filter(
    (entry) => entry.id !== 'people-profiles' && entry.id !== 'official-language',
  )
  const currentBiotechMeta = biotechPage ? BIOTECH_PAGE_META[biotechPage] : null

  useEffect(() => {
    setExpandedPersonId(null)
    setBiotechCompanyCategoryFilter('all')
    setBiotechProceedingsCategoryFilter('all')
  }, [biotechPage])

  const biotechEntryGrid = (
    <nav aria-label="Biotech page sections" className="biotech-entry-grid">
      {visibleBiotechEntryPageCards.map((entry) => (
        <button
          className={`biotech-entry-block biotech-entry-block--${entry.tone}`}
          key={entry.id}
          onClick={() => onOpenBiotechPage(entry.id)}
          type="button"
        >
          <span className="biotech-entry-block__eyebrow">Click to enter</span>
          <strong className="biotech-entry-block__count">
            {populationCountFormatter.format(entry.count)}
          </strong>
          <div className="biotech-entry-block__body">
            <h3>{entry.title}</h3>
            <p>{entry.summary}</p>
          </div>
          <span className="biotech-entry-block__cta">Open page</span>
        </button>
      ))}
    </nav>
  )

  if (!biotechPage) {
    return (
      <main className="screen screen--topic">
        <header className="branch-banner branch-banner--topic">
          <div className="branch-banner__top">
            <button className="back-link" onClick={onBackHome} type="button">
              Back to home
            </button>
            <div className="branch-banner__title-row">
              <h1 className="branch-banner__topic-title--biotech">
                Biotech, Biosecurity & Power
              </h1>
              <h2 className="branch-state-heading">Choose a biotech page</h2>
            </div>
          </div>
          {biotechEntryGrid}
        </header>
      </main>
    )
  }

  return (
    <main className="screen screen--topic">
      <header className="branch-banner branch-banner--topic">
        <div className="branch-banner__top">
          <button className="back-link" onClick={onBackToChooser} type="button">
            Back to biotech
          </button>
          <div className="branch-banner__title-row">
            <h1 className="branch-banner__topic-title--biotech">
              Biotech, Biosecurity & Power
            </h1>
            <h2 className="branch-state-heading">{currentBiotechMeta?.title}</h2>
          </div>
        </div>
      </header>

      <section className="biotech-sections">
        {biotechPage === 'companies' ? (
          <div className="biotech-stack">
            <section className="section-card biotech-company-overview">
              <div className="section-card__header">
                <div>
                  <p className="eyebrow">
                    {formatPopulationCount(filteredBiotechCompanies.length)} companies
                    {biotechCompanyCategoryFilter !== 'all'
                      ? ` • ${biotechCompanyCategoryFilter}`
                      : ''}
                    {' • '}
                    {biotechCompaniesSnapshotDate} market-cap snapshot
                  </p>
                  <h2>Global Biotech / Med / Pharma Companies</h2>
                </div>
              </div>

              <div className="biotech-company-overview__glossary">
                <div className="biotech-company-overview__glossary-row">
                  <span className="biotech-company-overview__glossary-label">Glossary filter</span>
                  <div className="biotech-company-overview__glossary-filters">
                    <button
                      className={`biotech-company-filter-chip${
                        biotechCompanyCategoryFilter === 'all' ? ' is-active' : ''
                      }`}
                      onClick={() => setBiotechCompanyCategoryFilter('all')}
                      type="button"
                    >
                      All <strong>{formatPopulationCount(biotechCompanies.length)}</strong>
                    </button>
                    {biotechCompanyCategoryCounts.map(([category, count]) => (
                      <button
                        className={`biotech-company-filter-chip${
                          biotechCompanyCategoryFilter === category ? ' is-active' : ''
                        }`}
                        key={category}
                        onClick={() => setBiotechCompanyCategoryFilter(category)}
                        type="button"
                      >
                        {category} <strong>{formatPopulationCount(count)}</strong>
                      </button>
                    ))}
                  </div>
                </div>
                <p className="biotech-company-overview__glossary-note">
                  {biotechCompanyCategoryFilter === 'all'
                    ? 'Click a category and only that lane will be shown below.'
                    : `${biotechCompanyCategoryFilter}: ${BIOTECH_COMPANY_CATEGORY_SUMMARY[biotechCompanyCategoryFilter]}`}
                </p>
              </div>

              <div className="biotech-company-overview__stats">
                <article className="biotech-company-stat">
                  <span>Combined market value</span>
                  <strong>{formatMarketCapSnapshotLabel(filteredBiotechCompanyTotalMarketCap)}</strong>
                  <small>{biotechCompaniesSnapshotDate} snapshot</small>
                </article>
                <article className="biotech-company-stat">
                  <span>Largest company</span>
                  <strong>{largestBiotechCompany?.name ?? 'N/A'}</strong>
                  <small>{largestBiotechCompany?.marketCapLabel ?? 'No snapshot'}</small>
                </article>
                <article className="biotech-company-stat">
                  <span>Footprint</span>
                  <strong>{filteredBiotechCompanyCountryCount} HQ countries</strong>
                  <small>
                    {biotechCompanyCategoryFilter === 'all'
                      ? `${biotechCompanyCategoryCounts.length} major categories`
                      : `${formatPopulationCount(biotechCompanies.length)} total companies in atlas`}
                  </small>
                </article>
              </div>
            </section>

            <section className="biotech-company-grid" aria-label="Global biotech and pharma companies">
              {filteredBiotechCompanies.map((company, index) => (
                <article className="biotech-company-card" key={company.id}>
                  <div className="biotech-company-card__top">
                    <div className="biotech-company-card__headerline">
                      <div className="biotech-company-card__badges">
                        <p className="eyebrow">#{index + 1}</p>
                      </div>

                      <div className="biotech-company-card__market">
                        <span className="biotech-company-card__market-label">Market value</span>
                        <strong>{company.marketCapLabel}</strong>
                        <span className="biotech-company-card__market-date">
                          {biotechCompaniesSnapshotDate} snapshot
                        </span>
                      </div>
                    </div>

                    <div className="biotech-company-card__title-group">
                      <div className="biotech-company-card__brand">
                        <CompanyLogoMark
                          className="biotech-company-card__logo"
                          name={company.name}
                          ticker={company.ticker}
                          websiteUrl={getCompanyWebsiteUrl(company.sources)}
                        />
                        <h3>{company.name}</h3>
                      </div>
                      <p className="biotech-company-card__summary">{company.summary}</p>
                    </div>
                  </div>

                  <div className="biotech-company-card__meta">
                    <div className="biotech-company-meta">
                      <span>Headquarters</span>
                      <strong>{company.headquarters}</strong>
                    </div>
                    <div className="biotech-company-meta">
                      <span>Main lane</span>
                      <strong>{company.category}</strong>
                    </div>
                  </div>

                  <div className="biotech-company-card__products-wrap">
                    <p className="biotech-company-card__products-label">Main products / platforms</p>
                    <div className="biotech-company-card__products">
                      {company.mainProducts.map((product) => (
                        <span className="biotech-company-chip" key={`${company.id}-${product}`}>
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="biotech-card__sources">
                    {company.sources.map((source) => (
                      <SourceEvidenceLink key={`${company.id}-${source.label}-${source.url}`} source={source} />
                    ))}
                  </div>
                </article>
              ))}
            </section>
          </div>
        ) : null}

        {biotechPage === 'judicial-cases' ? <JudicialBiotechCasesSection /> : null}

        {biotechPage === 'proceedings' ? (
          <section className="section-card biotech-event-index">
            <div className="section-card__header">
              <div>
                <p className="eyebrow">
                  {populationCountFormatter.format(filteredBiotechEventRows.length)} proceedings
                  {biotechProceedingsCategoryFilter !== 'all'
                    ? ` • ${
                        BIOTECH_PROCEEDING_CATEGORY_FILTERS.find(
                          ({ id }) => id === biotechProceedingsCategoryFilter,
                        )?.label
                      }`
                    : ''}
                </p>
                <h2>Biotech, Healthcare & Biosecurity Proceedings</h2>
              </div>
            </div>

            <div aria-label="Proceedings category filters" className="biotech-event-index__filters">
              {BIOTECH_PROCEEDING_CATEGORY_FILTERS.map((filterOption) => (
                <button
                  className={`biotech-event-index__filter-chip${
                    biotechProceedingsCategoryFilter === filterOption.id ? ' is-active' : ''
                  }`}
                  key={filterOption.id}
                  onClick={() => setBiotechProceedingsCategoryFilter(filterOption.id)}
                  type="button"
                >
                  {filterOption.label}
                </button>
              ))}
            </div>

            <div className="biotech-event-index__table-wrap">
              <table className="biotech-event-index__table">
                <thead>
                  <tr>
                    <th scope="col">Venue</th>
                    <th scope="col">Proceeding</th>
                    <th scope="col">Date</th>
                    <th scope="col">Themes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBiotechEventRows.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <div className="biotech-event-index__venue-cell">
                          <strong className="biotech-event-index__venue-name">
                            {formatBiotechProceedingVenue(event.venue)}
                          </strong>
                        </div>
                      </td>
                      <td>
                        <div className="biotech-event-index__event-cell">
                          <a
                            className="biotech-event-index__title-link"
                            href={getDeepLinkedSourceUrl(event.primarySource)}
                            rel="noreferrer"
                            target="_blank"
                            title={getSourceLocationTitle(event.primarySource)}
                          >
                            {event.title}
                          </a>
                          {event.secondarySourceLinks.length > 0 ? (
                            <div className="biotech-event-index__source-note">
                              {event.secondarySourceLinks.map((source) => (
                                <SourceEvidenceLink
                                  hideDate
                                  key={`${event.id}-${source.label}-${source.url}`}
                                  source={source}
                                />
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </td>
                      <td className="biotech-event-index__date-cell">{event.displayDate}</td>
                      <td>
                        <div className="biotech-event-index__topics">
                          {event.topics.map((topic) => (
                            <span
                              className="biotech-event-index__topic"
                              key={`${event.id}-${topic}`}
                              title={topic}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {biotechPage === 'people-profiles' ? (
          <div className="biotech-stack">
            <section className="section-card">
              <div className="section-card__header">
                <div>
                  <p className="eyebrow">
                    {populationCountFormatter.format(biotechProfileCount)} current profiles
                  </p>
                  <h2>People Profiles</h2>
                </div>
                <p>
                  Role-based profiles already on this site, grouped by biotechnology policy,
                  biomedical regulation, biosecurity oversight, pharma background, and lab-leak /
                  gain-of-function politics.
                </p>
              </div>
            </section>

            {groupedConnections.map((group) => (
              <section className="section-card" key={group.category}>
                <div className="section-card__header">
                  <div>
                    <p className="eyebrow">{group.items.length} profiles</p>
                    <h2>{group.meta.heading}</h2>
                  </div>
                  <p>{group.meta.summary}</p>
                </div>

                <div className="biotech-grid">
                  {group.items.map((connection) => (
                    (() => {
                      const person = peopleById.get(connection.personId)
                      const branch = person ? branchesById.get(person.branchId) ?? null : null
                      const section =
                        person && branch
                          ? branch.sections.find((candidate) => candidate.id === person.sectionId) ?? null
                          : null

                      if (!person || !branch || !section) {
                        return null
                      }

                      const isExpanded = expandedPersonId === connection.personId

                      return (
                        <article className="biotech-card" key={connection.personId}>
                          <section className="biotech-card__intro">
                            <div className="biotech-card__intro-top">
                              <div className="biotech-card__pill-row">
                                <span
                                  className={`biotech-pill biotech-pill--${connection.category.replace(/[^a-z]+/g, '-')}`}
                                >
                                  {group.meta.pillLabel}
                                </span>
                                <span className="biotech-evidence-pill">{connection.evidenceLabel}</span>
                              </div>
                              <div className="biotech-card__actions">
                                <button
                                  className={`biotech-card__toggle-button${
                                    isExpanded ? ' biotech-card__toggle-button--active' : ''
                                  }`}
                                  onClick={() =>
                                    setExpandedPersonId((currentId) =>
                                      currentId === connection.personId ? null : connection.personId,
                                    )
                                  }
                                  type="button"
                                >
                                  {isExpanded ? 'Hide full here' : 'Show full here'}
                                </button>
                                <button
                                  className="biotech-card__profile-button"
                                  onClick={() => onOpenPerson(connection.personId)}
                                  type="button"
                                >
                                  Open profile
                                </button>
                              </div>
                            </div>
                            <p className="biotech-card__story">{connection.story}</p>
                            <div className="biotech-card__sources">
                              {connection.sources.map((source) => (
                                <SourceEvidenceLink
                                  key={`${connection.personId}-${source.label}-${source.url}`}
                                  source={source}
                                />
                              ))}
                            </div>
                          </section>

                          <PersonDetailContent
                            branch={branch}
                            person={person}
                            section={section}
                            variant={isExpanded ? 'default' : 'biotech-compact'}
                          />
                        </article>
                      )
                    })()
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {biotechPage === 'official-language' ? (
          <div className="biotech-stack">
            {mentionGroups.length > 0 ? (
              <section className="section-card biotech-evidence-intro">
                <div className="section-card__header">
                  <div>
                    <p className="eyebrow">{BIOTECH_MENTIONS.length} official-source entries</p>
                    <h2>Official Biosecurity / Bioweapon Language</h2>
                  </div>
                  <p>
                    Kept separate from the role-based biotech buckets above. This layer tracks where
                    official material tied to profiles already on this site uses target terms such as
                    biosecurity, biological threats, bioweapon, bioweapons, biological weapons,
                    biodefense, bioterrorism, or gain-of-function.
                  </p>
                </div>
                <p className="biotech-evidence-intro__note">
                  Current-roster Supreme Court justices: no primary-verified target phrase in this
                  pass.
                </p>
              </section>
            ) : null}

            {mentionGroups.map((group) => (
              <section className="section-card" key={group.tier}>
                <div className="section-card__header">
                  <div>
                    <p className="eyebrow">{group.items.length} entries</p>
                    <h2>{group.meta.heading}</h2>
                  </div>
                  <p>{group.meta.summary}</p>
                </div>

                <div className="biotech-mention-grid">
                  {group.items.map((entry) => {
                    const profiles = entry.personIds
                      .map((personId) => peopleById.get(personId))
                      .filter(Boolean) as GovernmentPerson[]

                    if (!profiles.length) {
                      return null
                    }

                    const primaryProfile = profiles[0]
                    const hasMultipleProfiles = profiles.length > 1

                    return (
                      <article className="biotech-mention-card" key={entry.id}>
                        <div className="biotech-mention-card__top">
                          <div className="biotech-mention-card__meta">
                            <p className="eyebrow">
                              {hasMultipleProfiles
                                ? `${profiles.length} current profiles on this site`
                                : primaryProfile.subtitle ?? primaryProfile.title}
                            </p>
                            <span className="biotech-evidence-pill">{entry.evidenceLabel}</span>
                          </div>
                          <div className="biotech-mention-card__title-group">
                            <h3>{primaryProfile.name}</h3>
                            <p className="biotech-mention-card__title">
                              {hasMultipleProfiles
                                ? 'Evidence applies to multiple current profiles here'
                                : primaryProfile.title}
                            </p>
                          </div>
                        </div>

                        <p className="biotech-mention-card__story">{entry.story}</p>
                        {entry.exactMatches && entry.exactMatches.length > 0 ? (
                          <p className="biotech-mention-card__matches">
                            <strong>Exact matches:</strong> {entry.exactMatches.join(', ')}
                          </p>
                        ) : null}

                        <div className="biotech-mention-card__actions">
                          {profiles.map((profile) => (
                            <button
                              className="biotech-card__profile-button biotech-mention-card__profile-button"
                              key={`${entry.id}-${profile.id}`}
                              onClick={() => onOpenPerson(profile.id)}
                              type="button"
                            >
                              {hasMultipleProfiles ? profile.subtitle ?? profile.title : 'Open profile'}
                            </button>
                          ))}
                        </div>

                        <div className="biotech-card__sources">
                          {entry.sources.map((source) => (
                            <SourceEvidenceLink
                              fallbackExactMatches={entry.exactMatches}
                              key={`${entry.id}-${source.label}-${source.url}`}
                              source={source}
                            />
                          ))}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}

function EntryGate({ onSelect }: { onSelect: (mode: AudienceMode) => void }) {
  return (
    <main className="screen screen--entry">
      <section className="hero-card hero-card--entry">
        <h1>Are you a U.S. citizen?</h1>
        <div className="entry-actions">
          <button
            className="entry-choice entry-choice--citizen"
            onClick={() => onSelect('citizen')}
            type="button"
          >
            <strong className="entry-choice__label">YES</strong>
          </button>
          <button
            className="entry-choice entry-choice--observer"
            onClick={() => onSelect('observer')}
            type="button"
          >
            <strong className="entry-choice__label">NO</strong>
          </button>
        </div>
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

function PersonDetailContent({
  branch,
  person,
  section,
  variant = 'default',
}: {
  branch: GovernmentBranch
  person: GovernmentPerson
  section: BranchSection
  variant?: 'default' | 'biotech-compact'
}) {
  const isBiotechCompact = variant === 'biotech-compact'
  const facts = buildDetailFacts(person).filter((fact) => {
    if (!isBiotechCompact) {
      return true
    }

    return ['Appointed by', 'Budget', 'Funding model'].includes(fact.label)
  })
  const xHandle = formatXHandle(person.xUrl)
  const ageLabel = formatAgeLabel(person.birthDate, person.birthYear)
  const legislativeServiceLabel = getLegislativeServiceLabel(person)
  const independentAgencyServiceLabel = getIndependentAgencyServiceLabel(person)
  const independentAgencyAppointerLabel = getIndependentAgencyAppointerLabel(person)
  const showTrumpRelationship = shouldShowTrumpRelationship(person)
  const executiveCongressHistory =
    person.branchId === 'executive' ? person.executiveCongressServiceHistory ?? [] : []

  return (
    <>
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
        {showTrumpRelationship && !isBiotechCompact ? (
          <span className={`trump-chip trump-chip--${getTrumpBand(person.trumpScore)}`}>
            {formatDisplayedTrumpScore(person)}
          </span>
        ) : null}
      </div>

      <p className="detail-description">{person.description}</p>

      {facts.length > 0 ? (
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
      ) : null}

      {person.appointmentNote && !isBiotechCompact ? (
        <section className="detail-block">
          <h3>Appointment</h3>
          <p>{person.appointmentNote}</p>
        </section>
      ) : null}

      {person.committees && person.committees.length > 0 && !isBiotechCompact ? (
        <section className="detail-block">
          <h3>Committees</h3>
          <ul className="detail-list">
            {person.committees.map((committee) => (
              <li key={committee}>{committee}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {person.careerHistory && person.careerHistory.length > 0 && !isBiotechCompact ? (
        <section className="detail-block">
          <h3>Career history</h3>
          <ul className="detail-list">
            {person.careerHistory.map((record) => (
              <li key={`${person.id}-${record.category}-${record.summary}`}>{record.summary}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {executiveCongressHistory.length > 0 && !isBiotechCompact ? (
        <section className="detail-block">
          <h3>Past Trump-linked votes in Congress</h3>
          <p className="detail-note">
            Selected House or Senate roll calls from this site during this official&apos;s time in
            Congress.
          </p>
          <div className="executive-congress-history">
            {executiveCongressHistory.map((service) => {
              const sortedVotes = service.votes
                .map((vote, index) => ({ index, vote }))
                .sort((left, right) =>
                  compareExecutiveCongressVotesByRecency(
                    left.vote,
                    right.vote,
                    left.index,
                    right.index,
                  ),
                )
                .map(({ vote }) => vote)

              return (
                <article className="executive-congress-service" key={`${person.id}-${service.label}`}>
                  <div className="executive-congress-service__header">
                    <div>
                      <h4>{service.label}</h4>
                      <p>{buildExecutiveCongressHistorySummary(service)}</p>
                    </div>
                  </div>

                  <ul className="executive-congress-vote-list">
                    {sortedVotes.map((vote) => {
                      const referenceLine = formatRollCallReferenceLine(
                        vote as LegislativeTrumpRollCall,
                      )
                      const recordedLine = formatRollCallRecordedLine(vote as LegislativeTrumpRollCall)
                      const voteVideoLink = getRollCallVideoLink(vote)

                      return (
                        <li
                          className="executive-congress-vote-item"
                          key={`${person.id}-${service.label}-${vote.id}`}
                        >
                          <div className="executive-congress-vote-item__header">
                            <div>
                              <strong>{vote.label}</strong>
                              <p>
                                {[
                                  recordedLine,
                                  `Vote: ${vote.voteCast}`,
                                  vote.scoreIncluded ? 'Direct' : 'Broader',
                                ]
                                  .filter(Boolean)
                                  .join(' • ')}
                              </p>
                            </div>
                            <span className={`case-stance-chip case-stance-chip--${vote.position}`}>
                              {formatExecutiveCongressVotePosition(vote.position)}
                            </span>
                          </div>
                          {referenceLine ? (
                            <p className="executive-congress-vote-item__meta">{referenceLine}</p>
                          ) : null}
                          <div className="executive-congress-vote-item__links">
                            <a href={vote.sourceUrl} rel="noreferrer" target="_blank">
                              Official Vote
                            </a>
                            {voteVideoLink ? (
                              <a href={voteVideoLink.url} rel="noreferrer" target="_blank">
                                {voteVideoLink.label}
                              </a>
                            ) : null}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {(person.highestEducationSchool || person.highestDegree || person.highestEducationField) &&
      !isBiotechCompact ? (
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

      {(person.departmentBudgetTotalAmount || person.departmentBudgetDiscretionaryAmount) &&
      !isBiotechCompact ? (
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

      {(person.agencyBudgetAmount || person.agencyFundingModel) && !isBiotechCompact ? (
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

      {showTrumpRelationship && !isBiotechCompact ? (
        <section className="detail-block">
          <h3>Trump Relationship Estimate</h3>
          {person.trumpSampleSize != null ? (
            <p>
              <strong>Sample size:</strong> {person.trumpSampleSize}
              {person.trumpAvailableEvents ? ` of ${person.trumpAvailableEvents}` : ''} selected votes
            </p>
          ) : null}
          <p>{getDisplayedTrumpNote(person)}</p>
          {person.branchId !== 'legislative' && person.trumpEvidence && person.trumpEvidence.length > 0 ? (
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

      {!isBiotechCompact ? (
        <section className="detail-block">
          <h3>Pay & Financial Disclosure</h3>
          {person.salaryAmount ? (
            <p>
              <strong>Current annual salary:</strong> {person.salaryAmount}
            </p>
          ) : null}
          {person.financialFilingDate ? (
            <p>
              <strong>Disclosure filing date:</strong> {person.financialFilingDate}
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
          {person.branchId !== 'legislative' && person.wealthNote ? <p>{person.wealthNote}</p> : null}
        </section>
      ) : null}

      {!isBiotechCompact && person.topHoldings && person.topHoldings.length > 0 ? (
        <section className="detail-block">
          <h3>Top Holdings</h3>
          <ul className="detail-list">
            {person.topHoldings.map((holding) => (
              <li className="holding-item" key={`${person.id}-${holding.label}`}>
                <div className="holding-heading">
                  <span className="holding-name">{holding.label}</span>
                  <DisclosureOwnerBadge owner={holding.owner} />
                </div>
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

      {!isBiotechCompact && person.liabilities && person.liabilities.length > 0 ? (
        <section className="detail-block">
          <h3>Liabilities</h3>
          <ul className="detail-list">
            {person.liabilities.map((liability) => (
              <li
                className="disclosure-line-item"
                key={`${person.id}-${liability.creditor}-${liability.type}`}
              >
                <DisclosureOwnerBadge owner={liability.owner} />
                <span>
                  {liability.creditor}: {liability.type} ({liability.amount})
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {(() => {
        if (isBiotechCompact) {
          return null
        }

        const displayedTrades =
          person.recentTrades?.filter((trade) =>
            shouldDisplayTradeAfterLatestAnnualReport(person, trade),
          ) ?? []

        if (displayedTrades.length === 0) {
          return null
        }

        const tradesHeading =
          person.branchId === 'legislative'
            ? `PTR Trades Since ${person.financialFilingDate}`
            : `Recent Trades Since ${person.financialFilingDate}`

        return (
          <section className="detail-block">
            <h3>{tradesHeading}</h3>
            <ul className="detail-list">
              {displayedTrades.map((trade) => (
                <li
                  className="disclosure-line-item"
                  key={`${person.id}-${trade.assetName}-${trade.date}-${trade.amount}`}
                >
                  <DisclosureOwnerBadge owner={trade.owner} />
                  <span>
                    {trade.date}: {trade.type} {trade.assetName} ({trade.amount})
                  </span>
                  {shouldShowTradeSourceLink(person, trade) ? (
                    <a
                      className="holding-source"
                      href={resolvePersonLink(trade.sourceUrl ?? '')}
                      rel="noreferrer"
                      target="_blank"
                    >
                      source
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        )
      })()}

      {!isBiotechCompact ? (
        <section className="detail-links">
          <a href={resolvePersonLink(person.sourceUrl)} rel="noreferrer" target="_blank">
            Official source
          </a>
          {person.financialDisclosureUrl && person.financialDisclosureLabel ? (
            <a
              href={resolvePersonLink(person.financialDisclosureUrl)}
              rel="noreferrer"
              target="_blank"
            >
              {person.financialDisclosureLabel}
            </a>
          ) : null}
          {person.financialAnnualReportUrl && shouldShowAnnualDisclosureReportLink(person) ? (
            <a
              href={resolvePersonLink(person.financialAnnualReportUrl)}
              rel="noreferrer"
              target="_blank"
            >
              {person.financialAnnualReportLabel ?? 'Annual disclosure report'}
            </a>
          ) : null}
          {person.website && person.website !== person.sourceUrl ? (
            <a href={resolvePersonLink(person.website)} rel="noreferrer" target="_blank">
              Personal office site
            </a>
          ) : null}
          {person.xUrl && xHandle ? (
            <a href={resolvePersonLink(person.xUrl)} rel="noreferrer" target="_blank">
              X {xHandle}
            </a>
          ) : null}
        </section>
      ) : null}
      {person.branchId === 'judicial' && person.financialDisclosureNote && !isBiotechCompact ? (
        <p className="detail-note">{person.financialDisclosureNote}</p>
      ) : null}
    </>
  )
}

function DetailPanel({
  branch,
  onClose,
  person,
  rollCall,
  section,
  supremeCourtCaseSelection,
}: {
  branch: GovernmentBranch
  onClose: () => void
  person: GovernmentPerson | null
  rollCall: LegislativeTrumpRollCall | null
  section: BranchSection | null
  supremeCourtCaseSelection: SupremeCourtCaseSelection | null
}) {
  if (rollCall) {
    const voteTotals = formatRollCallVoteTotals(rollCall)
    const outcomeLabel = formatRollCallOutcome(rollCall.trumpOutcome)
    const signalTierLabel = formatRollCallSignalTier(rollCall)
    const thresholdLabel = getRollCallThresholdLabel(rollCall)
    const narrative = describeLegislativeRollCall(rollCall)
    const referenceLine = formatRollCallReferenceLine(rollCall)
    const recordedLine = formatRollCallRecordedLine(rollCall)
    const rollCallVideoLink = getRollCallVideoLink(rollCall)

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
          {thresholdLabel ? <span className="detail-tag detail-tag--threshold">{thresholdLabel}</span> : null}
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
          {thresholdLabel ? (
            <div className="fact-row">
              <span>Passage threshold</span>
              <strong>{thresholdLabel}</strong>
            </div>
          ) : null}
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

        <section className={`detail-links${rollCallVideoLink ? ' detail-links--pair' : ''}`}>
          <a href={rollCall.sourceUrl} rel="noreferrer" target="_blank">
            Official Vote
          </a>
          {rollCallVideoLink ? (
            <a href={rollCallVideoLink.url} rel="noreferrer" target="_blank">
              {rollCallVideoLink.label}
            </a>
          ) : null}
        </section>
      </aside>
    )
  }

  if (supremeCourtCaseSelection) {
    const { caseItem, groupLabel } = supremeCourtCaseSelection
    const officialWording = getSupremeCourtOfficialWording(caseItem)

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

  return (
    <aside className="detail-panel detail-panel--filled">
      <button className="detail-close" onClick={onClose} type="button">
        Close
      </button>
      <PersonDetailContent branch={branch} person={person} section={section} />
    </aside>
  )
}

function App() {
  const datasetUrl = `${import.meta.env.BASE_URL}data/governmentData.json?v=${encodeURIComponent(__BUILD_ID__)}`
  const [dataset, setDataset] = useState<GovernmentDataset | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [audienceMode, setAudienceMode] = useState<AudienceMode | null>(() => readStoredAudienceMode())
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash))
  const [isResettingLegislative, setIsResettingLegislative] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [partyFilter, setPartyFilter] = useState<PartyFilter>('all')
  const [chamberFilter, setChamberFilter] = useState<ChamberFilter>('all')
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null)
  const [selectedCommitteeSlug, setSelectedCommitteeSlug] = useState<string | null>(null)
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
  const selectedBiotechPage = route.biotechPage
  const selectedSpecialPage = route.specialPage
  const selectedExecutivePage = selectedBranch?.id === 'executive' ? route.executivePage : null
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

                return compareLegislativePeopleByService(left, right)
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
  const selectedStateProfile = selectedStateSummary
    ? STATE_PROFILE_META[selectedStateSummary.stateCode] ?? null
    : null
  const selectedStateDebtOutstandingThousands = selectedStateSummary
    ? STATE_PROFILE_DEBT_OUTSTANDING_THOUSANDS[selectedStateSummary.stateCode] ?? null
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
  const allHouseCommitteeSummaries =
    selectedBranch?.id === 'legislative'
      ? buildLegislativeCommitteeSummaries(
          legislativePeople.filter(
            (person) => person.sectionId === 'house' && (person.committees?.length ?? 0) > 0,
          ),
        )
      : []
  const selectedCommitteeSummary =
    selectedBranch?.id === 'legislative' && selectedCommitteeSlug
      ? allHouseCommitteeSummaries.find((summary) => summary.slug === selectedCommitteeSlug) ?? null
      : null
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
            { cases: supremeCourtCases, groupLabel: 'Administration Cases' },
            { cases: supremeCourtPersonalCases, groupLabel: 'Personal Cases' },
          ] as Array<{ cases: SupremeCourtCase[]; groupLabel: string }>
        )
          .flatMap(({ cases, groupLabel }) => cases.map((caseItem) => ({ caseItem, groupLabel })))
          .find(({ caseItem }) => caseItem.id === selectedSupremeCourtCaseId) ?? null
      : null
  const executiveOverviewCards =
    selectedBranch?.id === 'executive' && selectedExecutivePage === 'profiles'
      ? ([
          {
            id: 'executive-trump-social',
            countLabel: `${TRUMP_TRUTH_SNAPSHOT.posts.length} most recent Truth Social posts`,
            title: 'Trump Social',
          },
          ...branchSections.map((section) => ({
            id: `executive-${section.id}`,
            countLabel: section.countLabel,
            title: section.label,
          })),
        ] satisfies ExecutiveOverviewCard[])
      : []
  const executivePageCards =
    selectedBranch?.id === 'executive'
      ? ([
          {
            description: EXECUTIVE_PAGE_META.profiles.chooserDescription,
            eyebrow: EXECUTIVE_PAGE_META.profiles.chooserEyebrow,
            id: 'profiles',
            title: EXECUTIVE_PAGE_META.profiles.chooserTitle,
          },
          {
            description: EXECUTIVE_PAGE_META.systems.chooserDescription,
            eyebrow: EXECUTIVE_PAGE_META.systems.chooserEyebrow,
            id: 'systems',
            title: EXECUTIVE_PAGE_META.systems.chooserTitle,
          },
        ] satisfies ExecutivePageCard[])
      : []
  const shouldShowExecutiveProfiles = selectedBranch?.id === 'executive' && selectedExecutivePage === 'profiles'
  const shouldShowExecutiveSystems = selectedBranch?.id === 'executive' && selectedExecutivePage === 'systems'
  const hasActiveDetailSelection =
    selectedPerson != null || selectedRollCall != null || selectedSupremeCourtCase != null
  const executiveCabinetPeople =
    selectedBranch?.id === 'executive'
      ? branchSections.find((section) => section.id === 'cabinet')?.people ?? []
      : []

  useEffect(() => {
    if (selectedBranch?.id !== 'legislative') {
      setSelectedCommitteeSlug(null)
      return
    }

    if (chamberFilter === 'senate') {
      setSelectedCommitteeSlug(null)
    }
  }, [chamberFilter, selectedBranch?.id])

  useEffect(() => {
    if (!selectedCommitteeSummary) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById('committee-detail')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [selectedCommitteeSummary])

  useEffect(() => {
    let active = true

    fetch(datasetUrl, {
      cache: 'no-store',
    })
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

  function navigateTo(
    branchId: BranchId | null,
    personId?: string | null,
    executivePage?: ExecutivePageId | null,
  ) {
    if (branchId !== 'legislative') {
      setSelectedRollCallId(null)
    }

    if (branchId !== 'judicial') {
      setSelectedSupremeCourtCaseId(null)
    }

    const nextHash = toHash(branchId, personId, executivePage)

    if (window.location.hash === nextHash) {
      setRoute(parseHash(nextHash, peopleById))
      return
    }

    window.location.assign(nextHash)
  }

  function navigateToSpecialPage(specialPage: SpecialPageId | null, biotechPage?: BiotechPageId | null) {
    setSelectedRollCallId(null)
    setSelectedSupremeCourtCaseId(null)

    const nextHash = toSpecialHash(specialPage, biotechPage)

    if (window.location.hash === nextHash) {
      setRoute(parseHash(nextHash, peopleById))
      return
    }

    window.location.assign(nextHash)
  }

  function openBranch(branchId: BranchId) {
    startTransition(() => navigateTo(branchId))
  }

  function openSpecialPage(specialPage: SpecialPageId, biotechPage?: BiotechPageId | null) {
    startTransition(() => navigateToSpecialPage(specialPage, biotechPage))
  }

  function openExecutivePage(pageId: ExecutivePageId) {
    setSelectedRollCallId(null)
    setSelectedSupremeCourtCaseId(null)
    startTransition(() => navigateTo('executive', null, pageId))
  }

  function openPerson(personId: string) {
    const person = peopleById.get(personId)

    if (!person) {
      return
    }

    const executivePage =
      person.branchId === 'executive'
        ? selectedBranch?.id === 'executive'
          ? selectedExecutivePage ?? 'profiles'
          : 'profiles'
        : null

    setSelectedRollCallId(null)
    setSelectedSupremeCourtCaseId(null)
    startTransition(() =>
      navigateTo(
        person.branchId,
        personId,
        executivePage,
      ),
    )
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

    startTransition(() =>
      navigateTo(
        selectedBranch.id,
        null,
        selectedBranch.id === 'executive' ? selectedExecutivePage ?? 'profiles' : null,
      ),
    )
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

  function openCommittee(committeeSlug: string) {
    setSelectedCommitteeSlug(committeeSlug)
    setSelectedRollCallId(null)
  }

  function closeCommittee() {
    setSelectedCommitteeSlug(null)
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
    setSelectedCommitteeSlug(null)
    setSelectedRollCallId(null)
    startTransition(() => navigateTo('legislative'))
  }

  function handleAudienceSelect(mode: AudienceMode) {
    storeAudienceMode(mode)
    setAudienceMode(mode)
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  if (!audienceMode) {
    return <EntryGate onSelect={handleAudienceSelect} />
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
    if (selectedSpecialPage === 'biotech') {
      return (
        <BiotechConnectionsView
          biotechPage={selectedBiotechPage}
          branchesById={branchesById}
          onBackHome={() => navigateToSpecialPage(null)}
          onBackToChooser={() => navigateToSpecialPage('biotech')}
          onOpenBiotechPage={(pageId) => openSpecialPage('biotech', pageId)}
          onOpenPerson={openPerson}
          peopleById={peopleById}
        />
      )
    }

    return (
      <HomeView
        audienceMode={audienceMode}
        data={dataset}
        onBranchSelect={openBranch}
        onOpenBiotechPage={() => openSpecialPage('biotech')}
      />
    )
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
            ) : selectedBranch.id === 'executive' && selectedExecutivePage ? (
              <button
                aria-label="Back to Executive pages"
                className="branch-title-button"
                onClick={() => navigateTo('executive')}
                type="button"
              >
                {selectedBranch.name}
              </button>
            ) : (
              <h1>{selectedBranch.name}</h1>
            )}
            {selectedBranch.id === 'legislative' && selectedStateSummary ? (
              <h2 className="branch-state-heading">{selectedStateSummary.stateName}</h2>
            ) : selectedBranch.id === 'executive' && selectedExecutivePage ? (
              <h2 className="branch-state-heading">
                {EXECUTIVE_PAGE_META[selectedExecutivePage].heading}
              </h2>
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
            <p className="branch-banner__note">
              Some official links may open only from a U.S. IP address or a U.S. VPN node.
            </p>
          </div>
        ) : selectedBranch.id === 'executive' ? (
          <div className="branch-banner__copy branch-banner__copy--executive">
            <p className="branch-banner__lede">{selectedBranch.headline}</p>
            <p className="branch-summary">{selectedBranch.summary}</p>
          </div>
        ) : (
          <div className="branch-banner__copy">
            <p>{selectedBranch.headline}</p>
            <p className="branch-summary">{selectedBranch.summary}</p>
            <p className="branch-banner__note">
              Some official links may open only from a U.S. IP address or a U.S. VPN node.
            </p>
          </div>
        )}
        {selectedBranch.id !== 'executive' ? (
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
        ) : null}
      </header>

      {selectedBranch.id === 'executive' ? (
        <ExecutivePageChooserSection
          activePage={selectedExecutivePage}
          cards={executivePageCards}
          onOpen={openExecutivePage}
        />
      ) : null}

      {selectedBranch.id === 'executive' && selectedExecutivePage === 'profiles' ? (
        <ExecutiveOverviewSection cards={executiveOverviewCards} onOpen={scrollToSection} />
      ) : null}

      {selectedBranch.id === 'legislative' ? (
        <>
          <LegislativeMap
            onSelectState={selectState}
            selectedStateCode={selectedStateCode}
            summaries={legislativeStateSummaries}
          />

          {selectedStateSummary && selectedStateProfile ? (
            <section className="section-card state-profile-card">
              <div className="state-profile-card__header">
                <p className="eyebrow">State snapshot</p>
                <h2>{selectedStateSummary.stateName}</h2>
              </div>
              <div className="state-profile-card__grid">
                <article className="state-profile-card__item">
                  <span>Population</span>
                  <strong>{formatPopulationCount(selectedStateProfile.population)}</strong>
                  <small>2025 estimate</small>
                </article>
                <article className="state-profile-card__item">
                  <span>GDP</span>
                  <strong>{formatStateGdpLabel(selectedStateProfile.gdpMillions)}</strong>
                  <small>2024 current-dollar GDP</small>
                </article>
                <article className="state-profile-card__item">
                  <span>GDP per capita</span>
                  <strong>
                    {formatStateGdpPerCapitaLabel(
                      selectedStateProfile.gdpMillions,
                      selectedStateProfile.population,
                    )}
                  </strong>
                  <small>Derived from 2024 GDP and 2025 population</small>
                </article>
                {selectedStateDebtOutstandingThousands != null ? (
                  <article className="state-profile-card__item">
                    <span>State debt</span>
                    <strong>{formatStateDebtLabel(selectedStateDebtOutstandingThousands)}</strong>
                    <small>
                      2024 total debt outstanding
                    </small>
                  </article>
                ) : null}
                {selectedStateDebtOutstandingThousands != null ? (
                  <article className="state-profile-card__item">
                    <span>Debt per capita</span>
                    <strong>
                      {formatStateDebtPerCapitaLabel(
                        selectedStateDebtOutstandingThousands,
                        selectedStateProfile.population,
                      )}
                    </strong>
                    <small>
                      Derived from 2024 Census debt and 2025 population
                    </small>
                  </article>
                ) : null}
              </div>
              {selectedStateDebtOutstandingThousands != null ? (
                <p className="state-profile-card__source">
                  Debt source: 2024 Census Annual Survey of State Government Finances, aggregate SF0429.{' '}
                  <a href={STATE_PROFILE_DEBT_SOURCE_URL} rel="noreferrer" target="_blank">
                    Official API
                  </a>
                </p>
              ) : null}
            </section>
          ) : null}

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

      {(selectedBranch.id !== 'executive' || shouldShowExecutiveProfiles) ? (
        <section className="branch-layout">
          <div className="branch-sections">
            {branchSections.map((section) => {
              const chamberUsesMatrix =
                selectedBranch.id === 'legislative' &&
                (section.id === 'house' || section.id === 'senate') &&
                section.rollCallEvents.length > 0

              return (
                <Fragment key={section.id}>
                  <section
                    className={`section-card${chamberUsesMatrix ? ' section-card--matrix' : ''}`}
                    id={selectedBranch.id === 'executive' ? `executive-${section.id}` : undefined}
                  >
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
                      eyebrow="Administration Cases"
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
                      eyebrow="Personal Cases"
                      justices={judicialJustices}
                      onOpenCase={openSupremeCourtCase}
                      onOpenPerson={openPerson}
                      selectedCaseId={selectedSupremeCourtCaseId}
                      selectedPersonId={selectedPerson?.id ?? null}
                      showScore={false}
                    />
                  ) : null}
                  {selectedBranch.id === 'judicial' && section.id === 'supreme-court' ? (
                    <JudicialBiotechCasesSection />
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
            supremeCourtCaseSelection={selectedSupremeCourtCase}
          />
        </section>
      ) : null}

      {selectedBranch.id === 'legislative' && chamberFilter !== 'senate' ? (
        <HouseVacancySection selectedStateCode={selectedStateCode} />
      ) : null}

      {selectedBranch.id === 'legislative' && chamberFilter !== 'senate' ? (
        <LegislativeCommitteeSection
          onOpenCommittee={openCommittee}
          onOpenPerson={openPerson}
          people={visiblePeople}
          searchValue={deferredSearch}
          selectedCommitteeSlug={selectedCommitteeSlug}
          selectedStateSummary={selectedStateSummary}
        />
      ) : null}

      {selectedBranch.id === 'legislative' && selectedCommitteeSummary ? (
        <LegislativeCommitteeDetailSection
          onBack={closeCommittee}
          onOpenPerson={openPerson}
          selectedPersonId={selectedPerson?.id ?? null}
          summary={selectedCommitteeSummary}
        />
      ) : null}

      {shouldShowExecutiveProfiles ? (
        <div className="executive-secondary-stack">
          <div id="executive-trump-social">
            <ExecutiveTrumpTruthSection />
          </div>
          <ExecutiveCabinetControversiesSection
            onOpenPerson={openPerson}
            people={executiveCabinetPeople}
            selectedPersonId={selectedPerson?.id ?? null}
          />
        </div>
      ) : null}

      {shouldShowExecutiveSystems ? (
        <section className={`branch-layout${hasActiveDetailSelection ? '' : ' branch-layout--single'}`}>
          <div className="branch-sections">
            <ExecutiveShutdownSection />
            <IndependentAgencyDirectory
              onOpenPerson={openPerson}
              peopleById={peopleById}
              selectedPersonId={selectedPerson?.id ?? null}
            />
            <ExecutiveMilitaryGlobe />
          </div>

          {hasActiveDetailSelection ? (
            <DetailPanel
              branch={selectedBranch}
              onClose={closePerson}
              person={selectedPerson}
              rollCall={selectedRollCall}
              section={selectedSection}
              supremeCourtCaseSelection={selectedSupremeCourtCase}
            />
          ) : null}
        </section>
      ) : null}
    </main>
  )
}

export default App
