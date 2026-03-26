import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  houseTrumpRollCallPool,
  senateTrumpRollCallPool,
} from './legislativeTrumpRollCalls.mjs'
import {
  getHouseCastForRepresentative as getGuardedHouseCastForRepresentative,
  getMatchedSenateVoteEntryForPerson,
} from './legislativeVoteMatching.mjs'
import { manualCareerHistoryById } from './manualCareerHistory.mjs'
import { manualPublicControversiesById } from './manualPublicControversies.mjs'
import { manualDepartmentBudgetsByDepartment } from './manualDepartmentBudgets.mjs'
import { manualIndependentAgencyBudgetsByDepartment } from './manualIndependentAgencyBudgets.mjs'
import { resolvePersonNaming, stripDiacritics } from './personNaming.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '../public/data/governmentData.json')
const independentAgencyPortraitDirectory = resolve(__dirname, '../public/portraits/independent-agencies')
const independentAgencyPortraitExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
const wikimediaImageUrlCache = new Map()

const REQUEST_HEADERS = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
}

function loadPreviousDataset() {
  if (!existsSync(outPath)) {
    return null
  }

  try {
    return JSON.parse(readFileSync(outPath, 'utf8'))
  } catch {
    return null
  }
}

const previousDataset = loadPreviousDataset()
const previousPeople = previousDataset?.people ?? []
const previousPeopleById = new Map(previousPeople.map((person) => [person.id, person]))
const previousPeopleByWebsite = new Map(
  previousPeople.filter((person) => person.website).map((person) => [person.website, person]),
)
const previousHouseImageBySeat = new Map(
  previousPeople
    .filter((person) => person.sectionId === 'house' && person.stateCode && person.district)
    .map((person) => [`${person.stateCode}|${person.district}`, person.imageUrl])
    .filter((entry) => entry[1]),
)

function clonePerson(person) {
  return {
    ...person,
    agencyBudgetAmount: person.agencyBudgetAmount,
    agencyBudgetLabel: person.agencyBudgetLabel,
    agencyBudgetNote: person.agencyBudgetNote,
    agencyBudgetSourceLabel: person.agencyBudgetSourceLabel,
    agencyBudgetSourceUrl: person.agencyBudgetSourceUrl,
    agencyFundingModel: person.agencyFundingModel,
    aliases: person.aliases ? [...person.aliases] : undefined,
    birthDate: person.birthDate,
    birthYear: person.birthYear,
    careerHistory: person.careerHistory ? person.careerHistory.map((entry) => ({ ...entry })) : undefined,
    committees: person.committees ? [...person.committees] : undefined,
    displayName: person.displayName,
    education: person.education ? person.education.map((entry) => ({ ...entry })) : undefined,
    departmentBudgetDiscretionaryAmount: person.departmentBudgetDiscretionaryAmount,
    departmentBudgetDiscretionaryLabel: person.departmentBudgetDiscretionaryLabel,
    departmentBudgetNote: person.departmentBudgetNote,
    departmentBudgetSourceLabel: person.departmentBudgetSourceLabel,
    departmentBudgetSourceUrl: person.departmentBudgetSourceUrl,
    departmentBudgetTotalAmount: person.departmentBudgetTotalAmount,
    departmentBudgetTotalLabel: person.departmentBudgetTotalLabel,
    highestDegree: person.highestDegree,
    highestEducationField: person.highestEducationField,
    highestEducationSchool: person.highestEducationSchool,
    financialDisclosureSearchLastName: person.financialDisclosureSearchLastName,
    financialDisclosureSearchName: person.financialDisclosureSearchName,
    liabilities: person.liabilities ? person.liabilities.map((entry) => ({ ...entry })) : undefined,
    officialName: person.officialName,
    publicControversies: person.publicControversies
      ? person.publicControversies.map((entry) => ({ ...entry }))
      : undefined,
    recentTrades: person.recentTrades ? person.recentTrades.map((entry) => ({ ...entry })) : undefined,
    trumpEvidence: person.trumpEvidence ? [...person.trumpEvidence] : undefined,
    topHoldings: person.topHoldings ? person.topHoldings.map((entry) => ({ ...entry })) : undefined,
  }
}

function applyManualCareerHistoryOverrides(people) {
  return people.map((person) =>
    manualCareerHistoryById[person.id]
      ? {
          ...person,
          careerHistory: manualCareerHistoryById[person.id].map((entry) => ({ ...entry })),
        }
      : person,
  )
}

function applyManualPublicControversyOverrides(people) {
  return people.map((person) =>
    manualPublicControversiesById[person.id]
      ? {
          ...person,
          publicControversies: manualPublicControversiesById[person.id].map((entry) => ({
            ...entry,
          })),
        }
      : person,
  )
}

const SOURCES = [
  {
    label: 'The White House Cabinet',
    url: 'https://www.whitehouse.gov/administration/the-cabinet/',
  },
  {
    label: "OGE Officials' Individual Disclosures Search Collection",
    url: 'https://www.oge.gov/Web/OGE.nsf/Officials%20Individual%20Disclosures%20Search%20Collection?OpenForm=',
  },
  {
    label: 'U.S. Senate Current Members XML',
    url: 'https://www.senate.gov/general/contact_information/senators_cfm.xml',
  },
  {
    label: 'Senate eFD Search',
    url: 'https://efdsearch.senate.gov/search/home/',
  },
  {
    label: 'U.S. House Representatives',
    url: 'https://www.house.gov/representatives',
  },
  {
    label: 'House Financial Disclosure Search',
    url: 'https://disclosures-clerk.house.gov/FinancialDisclosure',
  },
  {
    label: 'President Compensation Statute',
    url: 'https://uscode.house.gov/view.xhtml?req=%28title%3A3+section%3A102+edition%3Aprelim%29',
  },
  {
    label: 'OPM 2026 Senior Political Pay Freeze Guidance',
    url: 'https://www.opm.gov/chcoc/latest-memos/updated-guidance-pay-freeze-for-certain-senior-political-officials-1.pdf',
  },
  {
    label: 'CRS Report on Salaries of Members of Congress',
    url: 'https://clerk.house.gov/reference-files/congressional_research_service_report.pdf',
  },
  {
    label: '2026 Executive Schedule rates',
    url: 'https://www.whitehouse.gov/presidential-actions/2025/12/adjustments-of-certain-rates-of-pay/',
  },
  {
    label: 'Senate Salaries Since 1789',
    url: 'https://www.senate.gov/legislative/common/generic/Salaries.htm',
  },
  {
    label: 'Judicial Compensation',
    url: 'https://www.uscourts.gov/judges-judgeships/judicial-compensation',
  },
  {
    label: 'House Roll Call 17 (Second Trump Impeachment)',
    url: 'https://clerk.house.gov/Votes/202117',
  },
  {
    label: 'House Roll Calls 10 and 11 (Electoral Vote Objections)',
    url: 'https://clerk.house.gov/Votes/202110',
  },
  {
    label: 'Supreme Court Current Members',
    url: 'https://www.supremecourt.gov/about/biographies.aspx',
  },
  {
    label: 'Federal Judicial Financial Disclosure Reports',
    url: 'https://pub.jefs.uscourts.gov/',
  },
  {
    label: 'Trump v. United States opinion',
    url: 'https://www.supremecourt.gov/opinions/23pdf/603us1r57_2dp3.pdf',
  },
  {
    label: 'Trump v. CASA, Inc. opinion',
    url: 'https://www.supremecourt.gov/opinions/24pdf/24a884_8n59.pdf',
  },
  {
    label: 'Learning Resources, Inc. v. Trump opinion',
    url: 'https://www.supremecourt.gov/opinions/25pdf/24-1287_new_3135.pdf',
  },
  {
    label: 'Senate Roll Call Vote 59 (Second Trump Impeachment Trial)',
    url: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00059.htm',
  },
  {
    label: 'Senate Roll Call Votes 1 and 2 (Electoral Vote Objections)',
    url: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00001.htm',
  },
  {
    label: 'Federal Reserve Board leadership',
    url: 'https://www.federalreserve.gov/aboutthefed/bios/board/powell.htm',
  },
  {
    label: 'SEC commissioners',
    url: 'https://www.sec.gov/about/commissioners/paul-s-atkins',
  },
  {
    label: 'FTC commissioners and staff',
    url: 'https://www.ftc.gov/about-ftc/commissioners-staff/andrew-n-ferguson',
  },
  {
    label: 'FCC leadership',
    url: 'https://www.fcc.gov/about/leadership/brendan-carr',
  },
  {
    label: 'CFTC chair',
    url: 'https://www.cftc.gov/About/Commissioners/MichaelSelig/index.htm',
  },
  {
    label: 'Wikidata person records',
    url: 'https://www.wikidata.org/',
  },
  {
    label: 'Wikipedia biographies (fallback)',
    url: 'https://en.wikipedia.org/',
  },
]

const DEFAULT_ECONOMY_SNAPSHOT = [
  {
    category: 'Output',
    detail: 'Real GDP level, Q4 2025 second estimate, chained 2017 dollars (SAAR).',
    history: [
      { label: 'Q1 24', value: 23.08 },
      { label: 'Q2 24', value: 23.29 },
      { label: 'Q3 24', value: 23.48 },
      { label: 'Q4 24', value: 23.59 },
      { label: 'Q1 25', value: 23.55 },
      { label: 'Q2 25', value: 23.77 },
      { label: 'Q3 25', value: 24.03 },
      { label: 'Q4 25', value: 24.07 },
    ],
    id: 'real-gdp',
    label: 'Real GDP',
    sourceDate: 'Mar 13, 2026',
    sourceLabel: 'FRED GDPC1 series',
    sourceUrl: 'https://fred.stlouisfed.org/series/GDPC1',
    tone: 'cool',
    value: '$24.07T',
  },
  {
    category: 'Households',
    detail: 'Personal income, monthly change for January 2026.',
    history: [
      { label: 'Jun 25', value: 0.19 },
      { label: 'Jul 25', value: 0.67 },
      { label: 'Aug 25', value: 0.49 },
      { label: 'Sep 25', value: 0.39 },
      { label: 'Oct 25', value: 0.11 },
      { label: 'Nov 25', value: 0.36 },
      { label: 'Dec 25', value: 0.29 },
      { label: 'Jan 26', value: 0.43 },
    ],
    id: 'personal-income',
    label: 'Personal income',
    sourceDate: 'Mar 13, 2026',
    sourceLabel: 'BEA Economy at a Glance',
    sourceUrl: 'https://www.bea.gov/index.php/news/glance',
    tone: 'cool',
    value: '+0.4%',
  },
  {
    category: 'Labor',
    detail: 'Total nonfarm payroll change in February 2026.',
    history: [
      { label: 'Jul 25', value: 64 },
      { label: 'Aug 25', value: -70 },
      { label: 'Sep 25', value: 76 },
      { label: 'Oct 25', value: -140 },
      { label: 'Nov 25', value: 41 },
      { label: 'Dec 25', value: -17 },
      { label: 'Jan 26', value: 126 },
      { label: 'Feb 26', value: -92 },
    ],
    id: 'payroll-jobs',
    label: 'Payroll jobs',
    sourceDate: 'Mar 6, 2026',
    sourceLabel: 'BLS Employment Situation',
    sourceUrl: 'https://www.bls.gov/news.release/empsit.htm',
    tone: 'warm',
    value: '-92k',
  },
  {
    category: 'Labor',
    detail: 'Civilian unemployment rate in February 2026.',
    history: [
      { label: 'Jun 25', value: 4.1 },
      { label: 'Jul 25', value: 4.3 },
      { label: 'Aug 25', value: 4.3 },
      { label: 'Sep 25', value: 4.4 },
      { label: 'Nov 25', value: 4.5 },
      { label: 'Dec 25', value: 4.4 },
      { label: 'Jan 26', value: 4.3 },
      { label: 'Feb 26', value: 4.4 },
    ],
    id: 'unemployment-rate',
    label: 'Unemployment rate',
    sourceDate: 'Mar 6, 2026',
    sourceLabel: 'BLS Employment Situation',
    sourceUrl: 'https://www.bls.gov/news.release/empsit.htm',
    tone: 'neutral',
    value: '4.4%',
  },
  {
    category: 'Labor',
    detail: 'Civilian labor force participation rate in February 2026.',
    history: [
      { label: 'Jun 25', value: 62.3 },
      { label: 'Jul 25', value: 62.2 },
      { label: 'Aug 25', value: 62.3 },
      { label: 'Sep 25', value: 62.5 },
      { label: 'Nov 25', value: 62.5 },
      { label: 'Dec 25', value: 62.4 },
      { label: 'Jan 26', value: 62.1 },
      { label: 'Feb 26', value: 62.0 },
    ],
    id: 'labor-force-participation',
    label: 'Labor-force participation',
    sourceDate: 'Mar 6, 2026',
    sourceLabel: 'FRED CIVPART series',
    sourceUrl: 'https://fred.stlouisfed.org/series/CIVPART',
    tone: 'neutral',
    value: '62.0%',
  },
  {
    category: 'Prices',
    detail: 'CPI-U, 12 months ending February 2026.',
    history: [
      { label: 'Jun 25', value: 2.68 },
      { label: 'Jul 25', value: 2.74 },
      { label: 'Aug 25', value: 2.94 },
      { label: 'Sep 25', value: 3.02 },
      { label: 'Nov 25', value: 2.99 },
      { label: 'Dec 25', value: 3.0 },
      { label: 'Jan 26', value: 2.83 },
      { label: 'Feb 26', value: 2.66 },
    ],
    id: 'cpi-inflation',
    label: 'CPI inflation',
    sourceDate: 'Mar 12, 2026',
    sourceLabel: 'BLS Consumer Price Index',
    sourceUrl: 'https://www.bls.gov/news.release/cpi.htm',
    tone: 'warm',
    value: '+2.4%',
  },
  {
    category: 'Rates',
    detail: 'Target range after the March 18, 2026 FOMC meeting.',
    history: [
      { label: 'Aug 25', value: 4.375 },
      { label: 'Sep 25', value: 4.125 },
      { label: 'Oct 25', value: 3.875 },
      { label: 'Nov 25', value: 3.875 },
      { label: 'Dec 25', value: 3.625 },
      { label: 'Jan 26', value: 3.625 },
      { label: 'Feb 26', value: 3.625 },
      { label: 'Mar 26', value: 3.625 },
    ],
    id: 'fed-funds-rate',
    label: 'Fed funds target',
    sourceDate: 'Mar 18, 2026',
    sourceLabel: 'Federal Reserve statement',
    sourceUrl: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20260318a.htm',
    tone: 'warm',
    value: '3.5%-3.75%',
  },
  {
    category: 'Rates',
    detail: '10-year Treasury yield, latest posted daily curve rate.',
    history: [
      { label: 'Aug 25', value: 4.23 },
      { label: 'Sep 25', value: 4.16 },
      { label: 'Oct 25', value: 4.11 },
      { label: 'Nov 25', value: 4.02 },
      { label: 'Dec 25', value: 4.18 },
      { label: 'Jan 26', value: 4.26 },
      { label: 'Feb 26', value: 3.97 },
      { label: 'Mar 26', value: 4.39 },
    ],
    id: 'ten-year-treasury',
    label: '10-year Treasury',
    sourceDate: 'Mar 23, 2026',
    sourceLabel: 'Treasury yield curve',
    sourceUrl:
      'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026',
    tone: 'neutral',
    value: '4.34%',
  },
  {
    category: 'Markets',
    detail: 'S&P 500 index level, latest close in the public FRED series.',
    history: [
      { label: 'Apr 25', value: 5569.06 },
      { label: 'May 25', value: 5911.69 },
      { label: 'Jun 25', value: 6204.95 },
      { label: 'Jul 25', value: 6339.39 },
      { label: 'Aug 25', value: 6460.26 },
      { label: 'Sep 25', value: 6688.46 },
      { label: 'Oct 25', value: 6840.2 },
      { label: 'Nov 25', value: 6849.09 },
      { label: 'Dec 25', value: 6845.5 },
      { label: 'Jan 26', value: 6939.03 },
      { label: 'Feb 26', value: 6878.88 },
      { label: 'Mar 26', value: 6556.37 },
    ],
    id: 'sp500',
    label: 'S&P 500',
    sourceDate: 'Mar 24, 2026',
    sourceLabel: 'FRED SP500 series',
    sourceUrl: 'https://fred.stlouisfed.org/series/SP500',
    tone: 'cool',
    value: '6,556.37',
  },
  {
    category: 'Markets',
    detail: 'Dow Jones Industrial Average level, latest close in the public FRED series.',
    history: [
      { label: 'Apr 25', value: 40669.36 },
      { label: 'May 25', value: 42270.07 },
      { label: 'Jun 25', value: 44094.77 },
      { label: 'Jul 25', value: 44130.98 },
      { label: 'Aug 25', value: 45544.88 },
      { label: 'Sep 25', value: 46397.89 },
      { label: 'Oct 25', value: 47562.87 },
      { label: 'Nov 25', value: 47716.42 },
      { label: 'Dec 25', value: 48063.29 },
      { label: 'Jan 26', value: 48892.47 },
      { label: 'Feb 26', value: 48977.92 },
      { label: 'Mar 26', value: 46124.06 },
    ],
    id: 'dow',
    label: 'Dow',
    sourceDate: 'Mar 24, 2026',
    sourceLabel: 'FRED DJIA series',
    sourceUrl: 'https://fred.stlouisfed.org/series/DJIA',
    tone: 'cool',
    value: '46,124.06',
  },
  {
    category: 'Energy',
    detail: 'WTI crude oil spot price, latest daily observation in the public FRED series.',
    history: [
      { label: 'Apr 25', value: 59.55 },
      { label: 'May 25', value: 61.46 },
      { label: 'Jun 25', value: 66.3 },
      { label: 'Jul 25', value: 70.36 },
      { label: 'Aug 25', value: 64.36 },
      { label: 'Sep 25', value: 63.17 },
      { label: 'Oct 25', value: 61.75 },
      { label: 'Nov 25', value: 58.58 },
      { label: 'Dec 25', value: 57.26 },
      { label: 'Jan 26', value: 64.5 },
      { label: 'Feb 26', value: 66.96 },
      { label: 'Mar 26', value: 93.39 },
    ],
    id: 'wti-crude',
    label: 'WTI crude',
    sourceDate: 'Mar 16, 2026',
    sourceLabel: 'FRED DCOILWTICO series',
    sourceUrl: 'https://fred.stlouisfed.org/series/DCOILWTICO',
    tone: 'warm',
    value: '$93.39/bbl',
  },
  {
    category: 'Energy',
    detail: 'Brent crude oil spot price, latest daily observation in the public FRED series.',
    history: [
      { label: 'Apr 25', value: 63.37 },
      { label: 'May 25', value: 64.32 },
      { label: 'Jun 25', value: 68.15 },
      { label: 'Jul 25', value: 73.43 },
      { label: 'Aug 25', value: 67.83 },
      { label: 'Sep 25', value: 68.52 },
      { label: 'Oct 25', value: 65.44 },
      { label: 'Nov 25', value: 64.07 },
      { label: 'Dec 25', value: 61.35 },
      { label: 'Jan 26', value: 72.25 },
      { label: 'Feb 26', value: 71.32 },
      { label: 'Mar 26', value: 101.04 },
    ],
    id: 'brent-crude',
    label: 'Brent crude',
    sourceDate: 'Mar 16, 2026',
    sourceLabel: 'FRED DCOILBRENTEU series',
    sourceUrl: 'https://fred.stlouisfed.org/series/DCOILBRENTEU',
    tone: 'warm',
    value: '$101.04/bbl',
  },
  {
    category: 'Energy',
    detail: 'U.S. regular retail gasoline price, latest weekly reading in the public FRED series.',
    history: [
      { label: 'Apr 25', value: 3.133 },
      { label: 'May 25', value: 3.16 },
      { label: 'Jun 25', value: 3.164 },
      { label: 'Jul 25', value: 3.123 },
      { label: 'Aug 25', value: 3.147 },
      { label: 'Sep 25', value: 3.118 },
      { label: 'Oct 25', value: 3.035 },
      { label: 'Nov 25', value: 3.061 },
      { label: 'Dec 25', value: 2.811 },
      { label: 'Jan 26', value: 2.853 },
      { label: 'Feb 26', value: 2.937 },
      { label: 'Mar 26', value: 3.961 },
    ],
    id: 'gasoline-price',
    label: 'U.S. gasoline',
    sourceDate: 'Mar 23, 2026',
    sourceLabel: 'FRED GASREGW series',
    sourceUrl: 'https://fred.stlouisfed.org/series/GASREGW',
    tone: 'warm',
    value: '$3.961/gal',
  },
  {
    category: 'Trade',
    detail: 'Goods and services trade balance in January 2026. Negative values mean a trade deficit.',
    history: [
      { label: 'Jun 25', value: -57.637 },
      { label: 'Jul 25', value: -74.233 },
      { label: 'Aug 25', value: -56.011 },
      { label: 'Sep 25', value: -49.168 },
      { label: 'Oct 25', value: -31.102 },
      { label: 'Nov 25', value: -56.026 },
      { label: 'Dec 25', value: -72.9 },
      { label: 'Jan 26', value: -54.455 },
    ],
    id: 'trade-balance',
    label: 'Trade balance',
    sourceDate: 'Mar 12, 2026',
    sourceLabel: 'FRED BOPGSTB series',
    sourceUrl: 'https://fred.stlouisfed.org/series/BOPGSTB',
    tone: 'warm',
    value: '-$54.5B',
  },
  {
    category: 'Fiscal',
    detail: 'Total federal receipts in February 2026.',
    history: [
      { label: 'Jul 25', value: 338.492 },
      { label: 'Aug 25', value: 344.315 },
      { label: 'Sep 25', value: 543.663 },
      { label: 'Oct 25', value: 404.371 },
      { label: 'Nov 25', value: 336.001 },
      { label: 'Dec 25', value: 484.384 },
      { label: 'Jan 26', value: 559.935 },
      { label: 'Feb 26', value: 313.122 },
    ],
    id: 'federal-receipts',
    label: 'Federal receipts',
    sourceDate: 'Mar 11, 2026',
    sourceLabel: 'FRED MTSR133FMS series',
    sourceUrl: 'https://fred.stlouisfed.org/series/MTSR133FMS',
    tone: 'cool',
    value: '$313.1B',
  },
  {
    category: 'Fiscal',
    detail: 'Total federal outlays in February 2026.',
    history: [
      { label: 'Jul 25', value: 629.635 },
      { label: 'Aug 25', value: 689.107 },
      { label: 'Sep 25', value: 345.713 },
      { label: 'Oct 25', value: 688.721 },
      { label: 'Nov 25', value: 509.278 },
      { label: 'Dec 25', value: 629.133 },
      { label: 'Jan 26', value: 654.551 },
      { label: 'Feb 26', value: 620.623 },
    ],
    id: 'federal-outlays',
    label: 'Federal outlays',
    sourceDate: 'Mar 11, 2026',
    sourceLabel: 'FRED MTSO133FMS series',
    sourceUrl: 'https://fred.stlouisfed.org/series/MTSO133FMS',
    tone: 'warm',
    value: '$620.6B',
  },
  {
    category: 'Fiscal',
    detail:
      'Monthly federal budget balance in February 2026. Negative values mean a deficit; positive values mean a surplus.',
    history: [
      { label: 'Jul 25', value: -291.143 },
      { label: 'Aug 25', value: -344.792 },
      { label: 'Sep 25', value: 197.95 },
      { label: 'Oct 25', value: -284.35 },
      { label: 'Nov 25', value: -173.277 },
      { label: 'Dec 25', value: -144.749 },
      { label: 'Jan 26', value: -94.615 },
      { label: 'Feb 26', value: -307.501 },
    ],
    id: 'federal-deficit',
    label: 'Federal deficit',
    sourceDate: 'Mar 11, 2026',
    sourceLabel: 'FRED MTSDS133FMS series',
    sourceUrl: 'https://fred.stlouisfed.org/series/MTSDS133FMS',
    tone: 'warm',
    value: '-$307.5B',
  },
  {
    category: 'Public finance',
    detail: 'Total public debt outstanding from the latest Debt to the Penny record.',
    history: [
      { label: 'Apr 25', value: 36.209 },
      { label: 'May 25', value: 36.214 },
      { label: 'Jun 25', value: 36.565 },
      { label: 'Jul 25', value: 36.729 },
      { label: 'Aug 25', value: 36.687 },
      { label: 'Sep 25', value: 36.789 },
      { label: 'Oct 25', value: 37.027 },
      { label: 'Nov 25', value: 37.672 },
      { label: 'Dec 25', value: 38.197 },
      { label: 'Jan 26', value: 38.533 },
      { label: 'Feb 26', value: 38.922 },
      { label: 'Mar 26', value: 39.002 },
    ],
    id: 'public-debt',
    label: 'Public debt',
    sourceDate: 'Mar 20, 2026',
    sourceLabel: 'Treasury Debt to the Penny',
    sourceUrl: 'https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/debt-to-the-penny',
    tone: 'neutral',
    value: '$39.00T',
  },
]

function mergeEconomySnapshot(previousSnapshot, defaultSnapshot) {
  if (!Array.isArray(previousSnapshot) || previousSnapshot.length === 0) {
    return defaultSnapshot
  }

  const previousById = new Map(previousSnapshot.map((metric) => [metric.id, metric]))
  const defaultIds = new Set(defaultSnapshot.map((metric) => metric.id))
  const merged = defaultSnapshot.map((metric) => previousById.get(metric.id) ?? metric)
  const extraPreviousMetrics = previousSnapshot.filter((metric) => !defaultIds.has(metric.id))

  return [...merged, ...extraPreviousMetrics]
}

const ECONOMY_SNAPSHOT = mergeEconomySnapshot(
  previousDataset?.economySnapshot,
  DEFAULT_ECONOMY_SNAPSHOT,
)

const STATE_NAMES = {
  AK: 'Alaska',
  AL: 'Alabama',
  AR: 'Arkansas',
  AS: 'American Samoa',
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'District of Columbia',
  DE: 'Delaware',
  FL: 'Florida',
  FM: 'Federated States of Micronesia',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  IA: 'Iowa',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MI: 'Michigan',
  MN: 'Minnesota',
  MO: 'Missouri',
  MP: 'Northern Mariana Islands',
  MS: 'Mississippi',
  MT: 'Montana',
  NC: 'North Carolina',
  ND: 'North Dakota',
  NE: 'Nebraska',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NV: 'Nevada',
  NY: 'New York',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  PW: 'Palau',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  VI: 'Virgin Islands',
  VT: 'Vermont',
  WA: 'Washington',
  WI: 'Wisconsin',
  WV: 'West Virginia',
  WY: 'Wyoming',
}

const PARTY_DATA = {
  D: { alignment: 'democratic', label: 'Democratic' },
  I: { alignment: 'independent', label: 'Independent' },
  R: { alignment: 'republican', label: 'Republican' },
}

const STATE_CODES_BY_NAME = Object.fromEntries(
  Object.entries(STATE_NAMES).map(([code, name]) => [name, code]),
)

const CONGRESSIONAL_SALARY_NOTE =
  'Members of Congress receive a statutory federal salary, with some leadership posts receiving additional compensation.'
const CONGRESSIONAL_WEALTH_NOTE =
  'Personal wealth varies widely. Congressional filings are public, but they disclose assets and liabilities mostly in ranges rather than as one exact net-worth number.'
const EXECUTIVE_SALARY_NOTE =
  'Senior executive branch pay is set by federal law and executive schedule rules; cabinet secretaries file annual financial disclosures.'
const EXECUTIVE_WEALTH_NOTE = ''
const JUSTICE_SALARY_NOTE =
  'Supreme Court compensation is set by law for the chief justice and associate justices, alongside annual financial disclosure requirements.'
const JUSTICE_WEALTH_NOTE =
  'Justices file public annual financial disclosures. These reports are more reliable than outside net-worth estimates, and ideological color-coding on this site is descriptive only.'
const PRESIDENT_SALARY_SOURCE_URL =
  'https://uscode.house.gov/view.xhtml?req=%28title%3A3+section%3A102+edition%3Aprelim%29'
const SENIOR_POLITICAL_PAY_FREEZE_SOURCE_URL =
  'https://www.opm.gov/chcoc/latest-memos/updated-guidance-pay-freeze-for-certain-senior-political-officials-1.pdf'
const SENIOR_POLITICAL_PAY_FREEZE_SOURCE_LABEL = 'OPM 2026 senior political pay guidance'
const HOUSE_SALARY_SOURCE_URL =
  'https://clerk.house.gov/reference-files/congressional_research_service_report.pdf'
const SENATE_SALARY_SOURCE_URL = 'https://www.senate.gov/senators/SenateSalariesSince1789.htm'
const JUDICIAL_SALARY_SOURCE_URL =
  'https://www.uscourts.gov/judges-judgeships/judicial-compensation'
const EXECUTIVE_SCHEDULE_2026_SOURCE_URL =
  'https://www.whitehouse.gov/presidential-actions/2025/12/adjustments-of-certain-rates-of-pay/'

const houseSalaryOverrides = new Map([
  [
    'Mike Johnson',
    {
      amount: '$223,500',
      note: 'Current House speaker salary is $223,500 per year.',
    },
  ],
  [
    'Steve Scalise',
    {
      amount: '$193,400',
      note: 'Current House majority and minority leaders are paid $193,400 per year; this member currently holds one of those leadership posts.',
    },
  ],
  [
    'Hakeem Jeffries',
    {
      amount: '$193,400',
      note: 'Current House majority and minority leaders are paid $193,400 per year; this member currently holds one of those leadership posts.',
    },
  ],
])

const senateLeadershipSalaryOverrides = new Map([
  [
    'Majority Leader',
    {
      amount: '$193,400',
      note: 'Current Senate majority and minority leaders, along with the president pro tempore, are paid $193,400 per year.',
    },
  ],
  [
    'Democratic Leader Chair of the Conference',
    {
      amount: '$193,400',
      note: 'Current Senate majority and minority leaders, along with the president pro tempore, are paid $193,400 per year.',
    },
  ],
  [
    'President Pro Tempore',
    {
      amount: '$193,400',
      note: 'Current Senate majority and minority leaders, along with the president pro tempore, are paid $193,400 per year.',
    },
  ],
])

const independentAgencySalaryOverrides = new Map([
  [
    'Jerome H. Powell',
    {
      amount: '$250,600 official 2026 rate',
      note:
        'Federal law ties the Federal Reserve chair to Executive Schedule Level I; the official 2026 Level I rate is $250,600 before any separate payable limitations that may apply in a given year.',
    },
  ],
  [
    'Paul S. Atkins',
    {
      amount: '$209,600 official 2026 rate',
      note:
        'The SEC chair is an Executive Schedule Level III office; the official 2026 Level III rate is $209,600 before any separate payable limitations that may apply in a given year.',
    },
  ],
  [
    'Andrew N. Ferguson',
    {
      amount: '$209,600 official 2026 rate',
      note:
        'The FTC chair is an Executive Schedule Level III office; the official 2026 Level III rate is $209,600 before any separate payable limitations that may apply in a given year.',
    },
  ],
  [
    'Brendan Carr',
    {
      amount: '$209,600 official 2026 rate',
      note:
        'The FCC chair is an Executive Schedule Level III office; the official 2026 Level III rate is $209,600 before any separate payable limitations that may apply in a given year.',
    },
  ],
  [
    'Michael S. Selig',
    {
      amount: '$209,600 official 2026 rate',
      note:
        'The CFTC chair is an Executive Schedule Level III office; the official 2026 Level III rate is $209,600 before any separate payable limitations that may apply in a given year.',
    },
  ],
])

const SEC_DERIVED_HOLDING_ESTIMATES = new Map([
  [
    'house-earl-carter-georgia-1st|Ameris Bancorp (ABCB) [ST]',
    {
      derivedEstimate:
        'Approx. 61,659 ABCB shares (0.4% of the class) from Ameris Bancorp\'s SEC proxy, as of March 10, 2025.',
      derivedSourceLabel: 'SEC 2025 proxy ownership table',
      derivedSourceUrl:
        'https://www.sec.gov/Archives/edgar/data/92108/000095017025037709/abcb-def14a_20250428.htm',
    },
  ],
  [
    'house-j-hill-arkansas-2nd|Simmons First National Corporation (SFNC) [ST]',
    {
      derivedEstimate:
        'Approx. 99,418 SFNC shares (0.4% of the class) from Simmons First\'s SEC proxy, as of March 10, 2025.',
      derivedSourceLabel: 'SEC 2025 proxy ownership table',
      derivedSourceUrl:
        'https://www.sec.gov/Archives/edgar/data/90498/000155837025004380/sfnc-20250310xdef14a.htm',
    },
  ],
  [
    'senate-tim-sheehy|BAER - Bridger Aerospace Group Holdings Inc',
    {
      derivedEstimate:
        'Approx. 9,444,018 BAER shares (42.9% of the class) from Bridger Aerospace\'s SEC proxy, as of April 24, 2025.',
      derivedSourceLabel: 'SEC 2025 proxy ownership table',
      derivedSourceUrl:
        'https://www.sec.gov/Archives/edgar/data/1941536/000121390025036517/def14a0425_bridgeraero.htm',
    },
  ],
])

const INDEPENDENT_AGENCY_WIKIPEDIA_TITLE_OVERRIDES = new Map([
  ['Commodity Futures Trading Commission', 'United States Commodity Futures Trading Commission'],
  ['Corporation for National and Community Service', 'AmeriCorps'],
  ['Environmental Protection Agency', 'United States Environmental Protection Agency'],
  ['Equal Employment Opportunity Commission', 'United States Equal Employment Opportunity Commission'],
  ['Federal Mediation and Conciliation Service', 'Federal Mediation and Conciliation Service (United States)'],
  ['Federal Reserve System', 'Federal Reserve'],
  ['Merit Systems Protection Board', 'United States Merit Systems Protection Board'],
  ['National Aeronautics and Space Administration', 'NASA'],
  ['National Railroad Passenger Corporation (AMTRAK)', 'Amtrak'],
  ['Office of Government Ethics', 'United States Office of Government Ethics'],
  ['Office of Personnel Management', 'United States Office of Personnel Management'],
  ['Office of the Director of National Intelligence', 'Office of the Director of National Intelligence'],
  ['Overseas Private Investment Corporation', 'U.S. International Development Finance Corporation'],
  ['Securities and Exchange Commission', 'United States Securities and Exchange Commission'],
  ['Trade and Development Agency', 'United States Trade and Development Agency'],
  ['Consumer Product Safety Commission', 'United States Consumer Product Safety Commission'],
  ['United States International Trade Commission', 'U.S. International Trade Commission'],
])

const INDEPENDENT_AGENCY_PROFILE_OVERRIDES = new Map([
  [
    'Commodity Futures Trading Commission',
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      appointedBy: 'Donald J. Trump',
      description:
        'Michael S. Selig is chairman of the Commodity Futures Trading Commission, the independent regulator for U.S. derivatives markets including futures, swaps, and options.',
      id: 'executive-michael-s-selig',
      imageUrl: 'https://www.cftc.gov/sites/default/files/2026-02/Selig%20Headshot_0.jpg',
      name: 'Michael S. Selig',
      roleSinceYear: '2025',
      sourceUrl: 'https://www.cftc.gov/About/Commissioners/MichaelSelig/index.htm',
      title: 'Chair of the Commodity Futures Trading Commission',
      website: 'https://www.cftc.gov/',
    },
  ],
  [
    'Federal Communications Commission',
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      appointedBy: 'Donald J. Trump',
      description:
        'Brendan Carr is chairman of the Federal Communications Commission, the independent regulator for interstate and international communications by radio, television, wire, satellite, and broadband.',
      id: 'executive-brendan-carr',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Brendan_Carr%2C_official_portrait_2025.jpg/330px-Brendan_Carr%2C_official_portrait_2025.jpg',
      name: 'Brendan Carr',
      roleSinceYear: '2025',
      sourceUrl: 'https://www.fcc.gov/about/leadership/brendan-carr',
      title: 'Chair of the Federal Communications Commission',
      website: 'https://www.fcc.gov/',
    },
  ],
  [
    'Federal Housing Finance Agency',
    {
      title: 'Director of the Federal Housing Finance Agency',
    },
  ],
  [
    'Federal Reserve System',
    {
      alignment: 'nonpartisan',
      alignmentLabel: 'Nonpartisan',
      appointmentNote:
        'Trump elevated Powell to the chair in 2018, and Biden reappointed him to another four-year term as chair in 2022.',
      appointedBy: 'Donald J. Trump',
      description:
        'Jerome H. Powell is chair of the Board of Governors of the Federal Reserve System, the independent central bank that sets monetary policy and supervises major parts of the banking system.',
      id: 'executive-jerome-h-powell',
      imageUrl:
        'https://www.federalreserve.gov/aboutthefed/images/Powell_Jerome_Aug_16_22-674_8x10_rdax_130x162s.jpg',
      name: 'Jerome H. Powell',
      roleSinceYear: '2018',
      sourceUrl: 'https://www.federalreserve.gov/aboutthefed/bios/board/powell.htm',
      title: 'Chair of the Federal Reserve Board',
      website: 'https://www.federalreserve.gov/',
      wikidataId: 'Q6182718',
    },
  ],
  [
    'Federal Trade Commission',
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      appointedBy: 'Donald J. Trump',
      description:
        'Andrew N. Ferguson is chairman of the Federal Trade Commission, the independent agency focused on competition policy and consumer protection enforcement.',
      id: 'executive-andrew-n-ferguson',
      imageUrl:
        'https://www.ftc.gov/system/files/styles/square_sm/private/ftc_gov/images/Commissioner-Andrew-N-Ferguson-headshot.jpg?h=fa4f33d7&itok=8yGU-ymX',
      name: 'Andrew N. Ferguson',
      roleSinceYear: '2025',
      sourceUrl: 'https://www.ftc.gov/about-ftc/commissioners-staff/andrew-n-ferguson',
      title: 'Chair of the Federal Trade Commission',
      website: 'https://www.ftc.gov/',
    },
  ],
  [
    'National Archives and Records Administration',
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      description:
        'Marco Rubio is serving as acting archivist of the United States, overseeing the National Archives, federal records policy, and the preservation of key national documents.',
      id: 'executive-marco-rubio-national-archives-and-records-administration',
      name: 'Marco Rubio',
      sourceUrl: 'https://www.archives.gov/about/organization/senior-staff',
      title: 'Acting Archivist of the United States',
      website: 'https://www.archives.gov/',
    },
  ],
  [
    'National Foundation on the Arts and the Humanities',
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      description:
        'Mary Anne Carter is profiled here as the current chair of the National Endowment for the Arts, one of the central grant-making leadership posts housed within the National Foundation on the Arts and the Humanities umbrella.',
      id: 'executive-mary-anne-carter-national-foundation-on-the-arts-and-the-humanities',
      name: 'Mary Anne Carter',
      sourceUrl: 'https://www.arts.gov/about/nea-chairman',
      title: 'Chair of the National Endowment for the Arts',
      website: 'https://www.arts.gov/',
    },
  ],
  [
    'United States Postal Service',
    {
      title: 'Postmaster General of the United States Postal Service',
    },
  ],
  [
    'Equal Employment Opportunity Commission',
    {
      title: 'Acting Chair of the Equal Employment Opportunity Commission',
    },
  ],
  [
    'Federal Mine Safety and Health Review Commission',
    {
      title: 'Chairman of the Federal Mine Safety and Health Review Commission',
    },
  ],
  [
    'Federal Mediation and Conciliation Service',
    {
      title: 'Acting Director of the Federal Mediation and Conciliation Service',
    },
  ],
  [
    'National Labor Relations Board',
    {
      description:
        'Marvin E. Kaplan is chairman of the National Labor Relations Board, the independent labor-law board that handles union representation disputes and unfair-labor-practice cases.',
      id: 'executive-marvin-e-kaplan-national-labor-relations-board',
      name: 'Marvin E. Kaplan',
      sourceUrl: 'https://www.nlrb.gov/bio/marvin-e-kaplan',
      title: 'Chairman of the National Labor Relations Board',
      website: 'https://www.nlrb.gov/about-nlrb/who-we-are',
    },
  ],
  [
    'United States Commission on Civil Rights',
    {
      title: 'Chair of the United States Commission on Civil Rights',
    },
  ],
  [
    'Administrative Conference of the United States',
    {
      title: 'Chairman of the Administrative Conference of the United States',
    },
  ],
  [
    'Federal Election Commission',
    {
      title: 'Chair of the Federal Election Commission',
    },
  ],
  [
    'Federal Retirement Thrift Investment Board',
    {
      title: 'Executive Director of the Federal Retirement Thrift Investment Board',
    },
  ],
  [
    'General Services Administration',
    {
      title: 'Acting Administrator of the General Services Administration',
    },
  ],
  [
    'National Science Foundation',
    {
      description:
        'Brian Stone is performing the duties of the NSF director, helping lead the federal science-funding agency while the director position remains unfilled.',
      id: 'executive-brian-stone-national-science-foundation',
      name: 'Brian Stone',
      sourceUrl: 'https://www.nsf.gov/about/leadership',
      title: 'Performing the duties of Director of the National Science Foundation',
      website: 'https://www.nsf.gov/',
    },
  ],
  [
    'National Capital Planning Commission',
    {
      title: 'Chair of the National Capital Planning Commission',
    },
  ],
  [
    'Central Intelligence Agency',
    {
      title: 'Director of the Central Intelligence Agency',
    },
  ],
  [
    'Consumer Product Safety Commission',
    {
      title: 'Acting Chairman of the Consumer Product Safety Commission',
    },
  ],
  [
    'Office of the Director of National Intelligence',
    {
      description:
        'Tulsi Gabbard serves as director of national intelligence, coordinating the U.S. intelligence community and delivering intelligence support to the president and national-security policymakers.',
      id: 'executive-tulsi-gabbard-office-of-the-director-of-national-intelligence',
      name: 'Tulsi Gabbard',
      sourceUrl:
        'https://www.dni.gov/index.php/who-we-are/leadership/director-of-national-intelligence',
      title: 'Director of National Intelligence',
      website: 'https://www.dni.gov/',
    },
  ],
  [
    'Corporation for National and Community Service',
    {
      title: 'Interim Agency Head of the Corporation for National and Community Service',
    },
  ],
  [
    'Pension Benefit Guaranty Corporation',
    {
      title: 'Director of the Pension Benefit Guaranty Corporation',
    },
  ],
  [
    'Postal Regulatory Commission',
    {
      description:
        'Michael M. Kubayanda is chairman of the Postal Regulatory Commission, the independent regulator that reviews U.S. Postal Service rates, service standards, and related compliance matters.',
      id: 'executive-michael-m-kubayanda-postal-regulatory-commission',
      name: 'Michael M. Kubayanda',
      sourceUrl:
        'https://www.prc.gov/press-releases/michael-m-kubayanda-designated-chairman-postal-regulatory-commission/5044',
      title: 'Chairman of the Postal Regulatory Commission',
      website: 'https://www.prc.gov/',
    },
  ],
  [
    'Securities and Exchange Commission',
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      appointedBy: 'Donald J. Trump',
      description:
        'Paul S. Atkins is chair of the Securities and Exchange Commission, the independent regulator that oversees U.S. securities markets, public-company disclosure, and broker-dealers.',
      id: 'executive-paul-s-atkins',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/SEC_Commissioner_Paul_Atkins.jpg/330px-SEC_Commissioner_Paul_Atkins.jpg',
      name: 'Paul S. Atkins',
      roleSinceYear: '2025',
      sourceUrl: 'https://www.sec.gov/about/commissioners/paul-s-atkins',
      title: 'Chair of the Securities and Exchange Commission',
      website: 'https://www.sec.gov/',
      wikidataId: 'Q7158251',
    },
  ],
  [
    'Small Business Administration',
    {
      sourceUrl: 'https://www.sba.gov/person/kelly-loeffler',
      title: 'Administrator of the Small Business Administration',
      website: 'https://www.sba.gov/person/kelly-loeffler',
    },
  ],
  [
    'Trade and Development Agency',
    {
      description:
        'Thomas R. Hardy is serving as acting director of the U.S. Trade and Development Agency, the export-promotion agency that backs project preparation and infrastructure partnerships abroad.',
      id: 'executive-thomas-r-hardy-trade-and-development-agency',
      name: 'Thomas R. Hardy',
      sourceUrl: 'https://www.ustda.gov/leadership/thomas-r-hardy/',
      title: 'Acting Director of the U.S. Trade and Development Agency',
      website: 'https://www.ustda.gov/',
    },
  ],
  [
    'United States Agency for International Development',
    {
      title: 'Administrator (acting) of the United States Agency for International Development',
    },
  ],
  [
    'Defense Nuclear Facilities Safety Board',
    {
      description:
        'Patricia L. Lee is profiled here as the current sitting board member of the Defense Nuclear Facilities Safety Board, which has been operating without its full complement of members.',
      id: 'executive-patricia-l-lee-defense-nuclear-facilities-safety-board',
      name: 'Patricia L. Lee',
      sourceUrl: 'https://www.dnfsb.gov/about/board-members',
      title: 'Board Member of the Defense Nuclear Facilities Safety Board',
      website: 'https://www.dnfsb.gov/',
    },
  ],
])

const INDEPENDENT_AGENCY_IMAGE_OVERRIDES = new Map([
  [
    'Corporation for National and Community Service',
    '/portraits/independent-agencies/jennifer-tahmasebi.jpg',
  ],
  [
    'Defense Nuclear Facilities Safety Board',
    '/portraits/independent-agencies/patricia-l-lee.jpg',
  ],
  [
    'Export-Import Bank of the United States',
    '/portraits/independent-agencies/john-jovanovic.jpg',
  ],
  ['Farm Credit Administration', '/portraits/independent-agencies/jeffery-s-hall.jpg'],
  [
    'Federal Deposit Insurance Corporation',
    '/portraits/independent-agencies/travis-hill.jpg',
  ],
  ['Federal Election Commission', '/portraits/independent-agencies/shana-m-broussard.jpg'],
  [
    'Federal Maritime Commission',
    '/portraits/independent-agencies/laura-dibella.jpg',
  ],
  [
    'Federal Mediation and Conciliation Service',
    '/portraits/independent-agencies/anna-davis.jpg',
  ],
  [
    'Federal Mine Safety and Health Review Commission',
    '/portraits/independent-agencies/marco-m-rajkovich.jpg',
  ],
  [
    'National Foundation on the Arts and the Humanities',
    '/portraits/independent-agencies/mary-anne-carter.jpg',
  ],
  [
    'National Labor Relations Board',
    '/portraits/independent-agencies/marvin-e-kaplan.webp',
  ],
  ['National Mediation Board', '/portraits/independent-agencies/loren-sweatt.jpg'],
  [
    'National Railroad Passenger Corporation (AMTRAK)',
    '/portraits/independent-agencies/roger-harris.jpg',
  ],
  ['National Science Foundation', '/portraits/independent-agencies/brian-stone.jpg'],
  ['Nuclear Regulatory Commission', '/portraits/independent-agencies/ho-nieh.jpg'],
  ['Occupational Safety and Health Review Commission', '/portraits/independent-agencies/jonathan-snare.jpg'],
  ['Office of Government Ethics', '/portraits/independent-agencies/eric-ueland.jpg'],
  [
    'Overseas Private Investment Corporation',
    '/portraits/independent-agencies/benjamin-black.jpg',
  ],
  ['Peace Corps', '/portraits/independent-agencies/paul-shea.jpg'],
  [
    'Postal Regulatory Commission',
    '/portraits/independent-agencies/michael-m-kubayanda.jpg',
  ],
  ['Railroad Retirement Board', '/portraits/independent-agencies/erhard-r-chorle.jpg'],
  ['Selective Service System', '/portraits/independent-agencies/craig-t-brown.jpg'],
  ['Tennessee Valley Authority', '/portraits/independent-agencies/don-moul.jpg'],
  ['Trade and Development Agency', '/portraits/independent-agencies/thomas-r-hardy.jpg'],
  [
    'United States Agency for Global Media',
    '/portraits/independent-agencies/michael-rigas.jpg',
  ],
  [
    'United States Commission on Civil Rights',
    '/portraits/independent-agencies/rochelle-garza.webp',
  ],
  [
    'United States International Trade Commission',
    '/portraits/independent-agencies/amy-a-karpel.jpg',
  ],
])

const INDEPENDENT_AGENCY_SERVICE_OVERRIDES = new Map([
  [
    'Central Intelligence Agency',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Consumer Financial Protection Bureau',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Environmental Protection Agency',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Equal Employment Opportunity Commission',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Federal Deposit Insurance Corporation',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2026',
    },
  ],
  [
    'Federal Housing Finance Agency',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'General Services Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Aeronautics and Space Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Archives and Records Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Capital Planning Commission',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Labor Relations Board',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Transportation Safety Board',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2021',
    },
  ],
  [
    'Nuclear Regulatory Commission',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2026',
    },
  ],
  [
    'Office of Personnel Management',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Office of the Director of National Intelligence',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Postal Regulatory Commission',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2021',
    },
  ],
  [
    'Small Business Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Social Security Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States Agency for International Development',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States Office of Special Counsel',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States Postal Service',
    {
      appointedBy: 'USPS Board of Governors',
      roleSinceYear: '2025',
    },
  ],
  [
    'Export-Import Bank of the United States',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Farm Credit Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Credit Union Administration',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States International Trade Commission',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2024',
    },
  ],
  [
    'Federal Maritime Commission',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Railroad Passenger Corporation (AMTRAK)',
    {
      appointedBy: 'Amtrak Board of Directors',
      roleSinceYear: '2022',
    },
  ],
  [
    'Surface Transportation Board',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Tennessee Valley Authority',
    {
      appointedBy: 'TVA Board of Directors',
      roleSinceYear: '2025',
    },
  ],
  [
    'Federal Labor Relations Authority',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Federal Mine Safety and Health Review Commission',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Federal Mediation and Conciliation Service',
    {
      appointedBy: 'FMCS succession',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Mediation Board',
    {
      appointedBy: 'National Mediation Board',
      roleSinceYear: '2024',
    },
  ],
  [
    'Occupational Safety and Health Review Commission',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States Commission on Civil Rights',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2023',
    },
  ],
  [
    'Administrative Conference of the United States',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2022',
    },
  ],
  [
    'Federal Election Commission',
    {
      appointedBy: 'Federal Election Commission',
      roleSinceYear: '2025',
    },
  ],
  [
    'Federal Retirement Thrift Investment Board',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2022',
    },
  ],
  [
    'Merit Systems Protection Board',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Office of Government Ethics',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Foundation on the Arts and the Humanities',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'National Science Foundation',
    {
      appointedBy: 'National Science Foundation succession',
      roleSinceYear: '2025',
    },
  ],
  [
    'Consumer Product Safety Commission',
    {
      appointedBy: 'Consumer Product Safety Commission',
      roleSinceYear: '2025',
    },
  ],
  [
    'Defense Nuclear Facilities Safety Board',
    {
      appointedBy: 'Joe Biden',
      roleSinceYear: '2024',
    },
  ],
  [
    'Selective Service System',
    {
      appointedBy: 'Selective Service System succession',
      roleSinceYear: '2021',
    },
  ],
  [
    'Corporation for National and Community Service',
    {
      appointedBy: 'AmeriCorps leadership',
      roleSinceYear: '2025',
    },
  ],
  [
    'Peace Corps',
    {
      appointedBy: 'Peace Corps leadership',
      roleSinceYear: '2025',
    },
  ],
  [
    'Pension Benefit Guaranty Corporation',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Railroad Retirement Board',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2019',
    },
  ],
  [
    'Inter-American Foundation',
    {
      appointedBy: 'Inter-American Foundation Board of Directors',
      roleSinceYear: '2022',
    },
  ],
  [
    'Overseas Private Investment Corporation',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'Trade and Development Agency',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States African Development Foundation',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2025',
    },
  ],
  [
    'United States Agency for Global Media',
    {
      appointedBy: 'Donald J. Trump',
      roleSinceYear: '2026',
    },
  ],
])

function findIndependentAgencyLocalPortraitPath(name) {
  if (!name) {
    return null
  }

  const slug = slugify(name)

  for (const extension of independentAgencyPortraitExtensions) {
    const portraitFileName = `${slug}${extension}`

    if (existsSync(resolve(independentAgencyPortraitDirectory, portraitFileName))) {
      return `/portraits/independent-agencies/${portraitFileName}`
    }
  }

  return null
}

async function resolveStableWikimediaImageUrl(imageUrl) {
  if (
    !imageUrl ||
    !/^https?:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//i.test(imageUrl)
  ) {
    return imageUrl
  }

  const normalizedImageUrl = imageUrl.replace(/^http:\/\//i, 'https://')

  if (wikimediaImageUrlCache.has(normalizedImageUrl)) {
    return wikimediaImageUrlCache.get(normalizedImageUrl)
  }

  try {
    const specialPathTitle = decodeURIComponent(
      normalizedImageUrl.replace(/^https?:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//i, ''),
    )
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: `File:${specialPathTitle}`,
      prop: 'imageinfo',
      iiprop: 'url',
      iiurlwidth: '512',
    })
    const payload = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`)
    const pages = Object.values(payload?.query?.pages ?? {})
    const imageInfo = pages.find((page) => page?.imageinfo?.[0])?.imageinfo?.[0]
    const resolvedImageUrl = imageInfo?.thumburl ?? imageInfo?.url ?? normalizedImageUrl
    wikimediaImageUrlCache.set(normalizedImageUrl, resolvedImageUrl)
    return resolvedImageUrl
  } catch {
    wikimediaImageUrlCache.set(normalizedImageUrl, normalizedImageUrl)
    return normalizedImageUrl
  }
}

const INDEPENDENT_AGENCY_ID_OVERRIDES = new Map([
  ['Commodity Futures Trading Commission', 'executive-michael-s-selig'],
  ['Federal Communications Commission', 'executive-brendan-carr'],
  ['Federal Reserve System', 'executive-jerome-h-powell'],
  ['Federal Trade Commission', 'executive-andrew-n-ferguson'],
  ['Securities and Exchange Commission', 'executive-paul-s-atkins'],
])

function cleanWikipediaInfoboxText(value) {
  return stripTags(value.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<link\b[^>]*>/gi, ''))
    .replace(/\[\s*\d+\s*\]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:)])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .trim()
}

function normalizeIndependentAgencyWebsite(rawUrl) {
  if (!rawUrl) {
    return null
  }

  const cleaned = decodeHtml(rawUrl)
    .replace(/\s+/g, '')
    .replace(/^\/\//, 'https://')
    .replace(/^www\./i, 'https://www.')
    .trim()

  if (!cleaned) {
    return null
  }

  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned
  }

  if (/^[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\/.*)?$/.test(cleaned)) {
    return `https://${cleaned}`
  }

  return null
}

function extractBalancedHtmlTable(html, classFragment) {
  const lowerHtml = html.toLowerCase()
  const lowerFragment = classFragment.toLowerCase()
  let searchStart = 0

  while (true) {
    const tableStart = lowerHtml.indexOf('<table', searchStart)

    if (tableStart === -1) {
      return null
    }

    const openTagEnd = lowerHtml.indexOf('>', tableStart)

    if (openTagEnd === -1) {
      return null
    }

    const openTag = lowerHtml.slice(tableStart, openTagEnd + 1)

    if (!openTag.includes(lowerFragment)) {
      searchStart = openTagEnd + 1
      continue
    }

    const tableTagPattern = /<\/?table\b[^>]*>/gi
    tableTagPattern.lastIndex = tableStart
    let depth = 0
    let match

    while ((match = tableTagPattern.exec(html))) {
      if (match[0].startsWith('</')) {
        depth -= 1
        if (depth === 0) {
          return html.slice(tableStart, match.index + match[0].length)
        }
      } else {
        depth += 1
      }
    }

    return null
  }
}

function extractIndependentAgencyInfoboxRows(html) {
  const tableHtml = extractBalancedHtmlTable(html, 'infobox')

  if (!tableHtml) {
    return []
  }

  return [...tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((match) => match[1])
    .map((rowHtml) => {
      const keyMatch = rowHtml.match(/<th\b[^>]*>([\s\S]*?)<\/th>/i)
      const valueMatch = rowHtml.match(/<td\b[^>]*>([\s\S]*?)<\/td>/i)

      if (!keyMatch || !valueMatch) {
        return null
      }

      const valueHtml = valueMatch[1]
      const wikiLinks = [...valueHtml.matchAll(/<a\b[^>]*href="\/wiki\/([^"#?]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
        .map((linkMatch) => ({
          text: cleanWikipediaInfoboxText(linkMatch[2]),
          title: decodeURIComponent(linkMatch[1]).replace(/_/g, ' '),
        }))
        .filter((link) => link.text && !link.title.includes(':'))
      const externalLinks = [
        ...valueHtml.matchAll(/<a\b[^>]*href="((?:https?:)?\/\/[^"]+)"[^>]*>/gi),
      ].map((linkMatch) => normalizeIndependentAgencyWebsite(linkMatch[1]))

      return {
        externalLinks: externalLinks.filter(Boolean),
        key: cleanWikipediaInfoboxText(keyMatch[1]),
        text: cleanWikipediaInfoboxText(valueHtml),
        wikiLinks,
      }
    })
    .filter(Boolean)
}

function isLikelyIndependentAgencyPersonLink(link) {
  if (!link?.text) {
    return false
  }

  const text = link.text.trim()

  if (!text || text.length < 4) {
    return false
  }

  if (
    /agency|board|bureau|commission|committee|council|department|foundation|government|office|system|united states/i.test(
      text,
    )
  ) {
    return false
  }

  return text.split(/\s+/).length >= 2 || /[A-Z]\./.test(text)
}

function extractIndependentAgencyLeaderTitle(row, leaderName, nextLeaderName) {
  const normalizedKey = row.key.toLowerCase()

  if (
    [
      'administrator',
      'president & ceo',
      'president and chief executive officer',
      'president and ceo',
    ].includes(normalizedKey)
  ) {
    return row.key
  }

  const nameIndex = row.text.indexOf(leaderName)

  if (nameIndex === -1) {
    return row.key
  }

  let remainder = row.text.slice(nameIndex + leaderName.length)

  if (nextLeaderName) {
    const nextIndex = remainder.indexOf(nextLeaderName)
    if (nextIndex !== -1) {
      remainder = remainder.slice(0, nextIndex)
    }
  }

  const parenMatch = remainder.match(/^\s*\(\s*([^()]+?)\s*\)/)

  if (parenMatch?.[1]) {
    return parenMatch[1].trim()
  }

  let cleanedRemainder = remainder
    .replace(/\[\s*\d+\s*\]/g, ' ')
    .replace(/^\s*[,;:–—-]+\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()

  for (const pattern of [
    /\bVacant\b/i,
    /\bTBA\b/i,
    /\b[A-Z][a-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,3},\s*(?:acting|chief|deputy|general counsel|commissioner|director|administrator|chair|chairman|chairwoman|ceo|vice)/i,
  ]) {
    const index = cleanedRemainder.search(pattern)

    if (index > 0) {
      cleanedRemainder = cleanedRemainder.slice(0, index).trim()
    }
  }

  return cleanedRemainder || row.key
}

function expandIndependentAgencyTitle(rawTitle, agencyName) {
  if (!rawTitle) {
    return `Leader of the ${agencyName}`
  }

  const normalizedTitle = rawTitle.trim()

  if (/of the /i.test(normalizedTitle) || normalizedTitle.includes(agencyName)) {
    return normalizedTitle
  }

  return `${normalizedTitle} of the ${agencyName}`
}

function buildIndependentAgencyDescription(name, title, agencyName, typeLabel) {
  const roleText = title ? `${title[0].toLowerCase()}${title.slice(1)}` : 'current leader'

  return `${name} serves as ${roleText} and leads ${agencyName}, the ${typeLabel.toLowerCase()} in the executive branch.`.replace(
    /\s+/g,
    ' ',
  )
}

function loadIndependentAgencyCatalogEntries() {
  const catalogPath = resolve(__dirname, '../src/independentAgencyCatalog.ts')
  const text = readFileSync(catalogPath, 'utf8')

  return [...text.matchAll(/name:\s*'([^']+)'\s*,\s*typeLabel:\s*'([^']+)'/g)].map((match) => ({
    name: match[1],
    typeLabel: match[2],
  }))
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url))
}

async function resolveWikipediaTitleForIndependentAgency(agencyName) {
  const override = INDEPENDENT_AGENCY_WIKIPEDIA_TITLE_OVERRIDES.get(agencyName)

  if (override) {
    return override
  }

  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    list: 'search',
    srlimit: '5',
    srsearch: agencyName,
  })
  const payload = await fetchJson(`https://en.wikipedia.org/w/api.php?${params}`)
  return payload.query?.search?.[0]?.title ?? null
}

async function resolveWikidataIdForWikipediaTitle(title) {
  if (!title) {
    return null
  }

  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'pageprops',
    redirects: '1',
    titles: title,
  })
  const payload = await fetchJson(`https://en.wikipedia.org/w/api.php?${params}`)
  const page = Object.values(payload.query?.pages ?? {}).find((entry) => entry?.pageprops?.wikibase_item)
  return page?.pageprops?.wikibase_item ?? null
}

async function fetchIndependentAgencyProfileSeed(item) {
  const wikipediaTitle = await resolveWikipediaTitleForIndependentAgency(item.name)

  if (!wikipediaTitle) {
    return {}
  }

  const html = await fetchText(`https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaTitle.replace(/ /g, '_'))}`)
  const rows = extractIndependentAgencyInfoboxRows(html)
  const websiteRow = rows.find((row) => row.key.toLowerCase() === 'website') ?? null
  const website =
    websiteRow?.externalLinks.find((link) => !/\.onion/i.test(link)) ??
    normalizeIndependentAgencyWebsite(websiteRow?.text)
  const candidateRow =
    rows.find((row) => /agency executive/i.test(row.key)) ??
    rows.find((row) => /^board executive$/i.test(row.key)) ??
    rows.find((row) => /^administrator$/i.test(row.key)) ??
    rows.find((row) => /^president\s*&\s*ceo$/i.test(row.key)) ??
    rows.find((row) => /^president and chief executive officer$/i.test(row.key)) ??
    rows.find((row) => /^key people$/i.test(row.key)) ??
    rows.find((row) => /director/i.test(row.key) && row.wikiLinks.some(isLikelyIndependentAgencyPersonLink)) ??
    null

  if (!candidateRow) {
    return { website, wikipediaTitle }
  }

  const peopleLinks = candidateRow.wikiLinks.filter(isLikelyIndependentAgencyPersonLink)
  const leaderLink = peopleLinks[0] ?? null

  if (!leaderLink?.text) {
    const textLead = candidateRow.text
      .replace(/\[\s*\d+\s*\]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    if (!/^(Vacant|TBA)\b/i.test(textLead)) {
      const fallbackName = textLead.match(/^([A-Z][A-Za-z'.-]+(?:\s+[A-Z][A-Za-z'.-]+){1,4})/)

      if (fallbackName?.[1]) {
        return {
          name: fallbackName[1].trim(),
          rawTitle: extractIndependentAgencyLeaderTitle(candidateRow, fallbackName[1].trim(), null),
          website,
          wikipediaTitle,
          wikidataId: null,
        }
      }
    }

    return { website, wikipediaTitle }
  }

  const nextLeaderName = peopleLinks[1]?.text ?? null
  const rawTitle = extractIndependentAgencyLeaderTitle(candidateRow, leaderLink.text, nextLeaderName)

  return {
    name: leaderLink.text,
    rawTitle,
    website,
    wikipediaTitle,
    wikidataId: await resolveWikidataIdForWikipediaTitle(leaderLink.title),
  }
}

async function buildIndependentAgencyHeads() {
  const catalogEntries = loadIndependentAgencyCatalogEntries()

  return mapWithConcurrency(catalogEntries, 8, async (item, index) => {
    const override = {
      ...(INDEPENDENT_AGENCY_SERVICE_OVERRIDES.get(item.name) ?? {}),
      ...(INDEPENDENT_AGENCY_PROFILE_OVERRIDES.get(item.name) ?? {}),
    }
    const seed = await fetchIndependentAgencyProfileSeed(item).catch(() => ({}))
    const name = override.name ?? seed.name
    const rawImageUrl =
      findIndependentAgencyLocalPortraitPath(name) ??
      INDEPENDENT_AGENCY_IMAGE_OVERRIDES.get(item.name) ??
      override.imageUrl
    const imageUrl = await resolveStableWikimediaImageUrl(rawImageUrl)

    if (!name) {
      const cachedMatch = previousPeople.find(
        (person) => person.sectionId === 'independent-agencies' && person.department === item.name,
      )

      if (cachedMatch) {
        const cachedImageUrl = await resolveStableWikimediaImageUrl(imageUrl ?? cachedMatch.imageUrl)

        return {
          ...clonePerson(cachedMatch),
          department: item.name,
          imageUrl: cachedImageUrl,
          sortOrder: 30 + index,
          subtitle: item.name,
        }
      }

      throw new Error(`Unable to resolve independent-agency leader for ${item.name}`)
    }

    const rawTitle = override.title ?? expandIndependentAgencyTitle(seed.rawTitle, item.name)
    const alignment = override.alignment ?? 'nonpartisan'
    const alignmentLabel =
      override.alignmentLabel ??
      (alignment === 'republican'
        ? 'Republican'
        : alignment === 'democratic'
          ? 'Democratic'
          : alignment === 'independent'
            ? 'Independent'
            : 'Nonpartisan')

    return {
      alignment,
      alignmentLabel,
      appointmentNote: override.appointmentNote,
      appointedBy: override.appointedBy,
      branchId: 'executive',
      department: item.name,
      description:
        override.description ?? buildIndependentAgencyDescription(name, rawTitle, item.name, item.typeLabel),
      id:
        override.id ??
        INDEPENDENT_AGENCY_ID_OVERRIDES.get(item.name) ??
        `executive-${slugify(name)}-${slugify(item.name)}`,
      imageUrl,
      name,
      salaryNote: EXECUTIVE_SALARY_NOTE,
      sectionId: 'independent-agencies',
      sortOrder: 30 + index,
      sourceUrl:
        override.sourceUrl ?? override.website ?? seed.website ?? 'https://www.usgovernmentmanual.gov/',
      subtitle: item.name,
      title: rawTitle,
      wealthNote: EXECUTIVE_WEALTH_NOTE,
      website: override.website ?? seed.website ?? null,
      wikidataId: override.wikidataId ?? seed.wikidataId ?? null,
      roleSinceYear: override.roleSinceYear,
    }
  })
}

const executiveRoleMap = new Map([
  [
    'Secretary of State',
    {
      department: 'Department of State',
      sortOrder: 10,
      title: 'Secretary of State',
    },
  ],
  [
    'Secretary of the Treasury',
    {
      department: 'Department of the Treasury',
      sortOrder: 11,
      title: 'Secretary of the Treasury',
    },
  ],
  [
    'Secretary of War',
    {
      department: 'Department of Defense',
      sortOrder: 12,
      title: 'Secretary of Defense',
    },
  ],
  [
    'Attorney General',
    {
      department: 'Department of Justice',
      sortOrder: 13,
      title: 'Attorney General',
    },
  ],
  [
    'Secretary of the Interior',
    {
      department: 'Department of the Interior',
      sortOrder: 14,
      title: 'Secretary of the Interior',
    },
  ],
  [
    'Secretary of Agriculture',
    {
      department: 'Department of Agriculture',
      sortOrder: 15,
      title: 'Secretary of Agriculture',
    },
  ],
  [
    'Secretary of Commerce',
    {
      department: 'Department of Commerce',
      sortOrder: 16,
      title: 'Secretary of Commerce',
    },
  ],
  [
    'Secretary of Labor',
    {
      department: 'Department of Labor',
      sortOrder: 17,
      title: 'Secretary of Labor',
    },
  ],
  [
    'Secretary of Health and Human Services',
    {
      department: 'Department of Health and Human Services',
      sortOrder: 18,
      title: 'Secretary of Health and Human Services',
    },
  ],
  [
    'Secretary of Housing and Urban Development',
    {
      department: 'Department of Housing and Urban Development',
      sortOrder: 19,
      title: 'Secretary of Housing and Urban Development',
    },
  ],
  [
    'Secretary of Transportation',
    {
      department: 'Department of Transportation',
      sortOrder: 20,
      title: 'Secretary of Transportation',
    },
  ],
  [
    'Secretary of Energy',
    {
      department: 'Department of Energy',
      sortOrder: 21,
      title: 'Secretary of Energy',
    },
  ],
  [
    'Secretary of Education',
    {
      department: 'Department of Education',
      sortOrder: 22,
      title: 'Secretary of Education',
    },
  ],
  [
    'Secretary of Veterans Affairs',
    {
      department: 'Department of Veterans Affairs',
      sortOrder: 23,
      title: 'Secretary of Veterans Affairs',
    },
  ],
  [
    'Secretary of Homeland Security',
    {
      department: 'Department of Homeland Security',
      sortOrder: 24,
      title: 'Secretary of Homeland Security',
    },
  ],
])

const supremeCourtImageMap = {
  'Amy Coney Barrett': '/portraits/judicial/amy-coney-barrett.jpg',
  'Brett M. Kavanaugh': '/portraits/judicial/brett-m-kavanaugh.jpg',
  'Clarence Thomas': '/portraits/judicial/clarence-thomas.jpg',
  'Elena Kagan': '/portraits/judicial/elena-kagan.jpg',
  'John G. Roberts, Jr.': '/portraits/judicial/john-g-roberts-jr.jpg',
  'Ketanji Brown Jackson': '/portraits/judicial/ketanji-brown-jackson.jpg',
  'Neil M. Gorsuch': '/portraits/judicial/neil-m-gorsuch.jpg',
  'Samuel A. Alito, Jr.': '/portraits/judicial/samuel-a-alito-jr.jpg',
  'Sonia Sotomayor': '/portraits/judicial/sonia-sotomayor.jpg',
}

const justices = [
  {
    alignment: 'republican',
    alignmentLabel: 'Appointed by Republican president Bush',
    description:
      'John G. Roberts, Jr. has served as chief justice since 2005, leading the Supreme Court and presiding over the federal judiciary.',
    id: 'judicial-john-g-roberts-jr',
    name: 'John G. Roberts, Jr.',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 1,
    title: 'Chief Justice of the United States',
  },
  {
    alignment: 'republican',
    alignmentLabel: 'Appointed by Republican president Bush',
    description:
      'Clarence Thomas has served as an associate justice since 1991 after a career in the executive branch and on the U.S. Court of Appeals for the D.C. Circuit.',
    id: 'judicial-clarence-thomas',
    name: 'Clarence Thomas',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 2,
    title: 'Associate Justice',
  },
  {
    alignment: 'republican',
    alignmentLabel: 'Appointed by Republican president Bush',
    description:
      'Samuel A. Alito, Jr. joined the Court in 2006 after serving on the U.S. Court of Appeals for the Third Circuit and in the Justice Department.',
    id: 'judicial-samuel-a-alito-jr',
    name: 'Samuel A. Alito, Jr.',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 3,
    title: 'Associate Justice',
  },
  {
    alignment: 'democratic',
    alignmentLabel: 'Appointed by Democratic president Obama',
    description:
      'Sonia Sotomayor became the first Latina justice in 2009 after serving as a federal district judge and on the U.S. Court of Appeals for the Second Circuit.',
    id: 'judicial-sonia-sotomayor',
    name: 'Sonia Sotomayor',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 4,
    title: 'Associate Justice',
  },
  {
    alignment: 'democratic',
    alignmentLabel: 'Appointed by Democratic president Obama',
    description:
      'Elena Kagan joined the Court in 2010 following service as U.S. solicitor general, dean of Harvard Law School, and a White House policy adviser.',
    id: 'judicial-elena-kagan',
    name: 'Elena Kagan',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 5,
    title: 'Associate Justice',
  },
  {
    alignment: 'republican',
    alignmentLabel: 'Appointed by Republican president Trump',
    description:
      'Neil M. Gorsuch has served as an associate justice since 2017 after a decade on the U.S. Court of Appeals for the Tenth Circuit.',
    id: 'judicial-neil-m-gorsuch',
    name: 'Neil M. Gorsuch',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 6,
    title: 'Associate Justice',
  },
  {
    alignment: 'republican',
    alignmentLabel: 'Appointed by Republican president Trump',
    description:
      'Brett M. Kavanaugh joined the Court in 2018 after serving on the U.S. Court of Appeals for the D.C. Circuit and in multiple White House roles.',
    id: 'judicial-brett-m-kavanaugh',
    name: 'Brett M. Kavanaugh',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 7,
    title: 'Associate Justice',
  },
  {
    alignment: 'republican',
    alignmentLabel: 'Appointed by Republican president Trump',
    description:
      'Amy Coney Barrett became an associate justice in 2020 after serving on the U.S. Court of Appeals for the Seventh Circuit and teaching at Notre Dame Law School.',
    id: 'judicial-amy-coney-barrett',
    name: 'Amy Coney Barrett',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 8,
    title: 'Associate Justice',
  },
  {
    alignment: 'democratic',
    alignmentLabel: 'Appointed by Democratic president Biden',
    description:
      'Ketanji Brown Jackson joined the Court in 2022 after service as a district judge, appellate judge, public defender, and U.S. Sentencing Commission member.',
    id: 'judicial-ketanji-brown-jackson',
    name: 'Ketanji Brown Jackson',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    sortOrder: 9,
    title: 'Associate Justice',
  },
].map((justice) => ({
  ...justice,
  branchId: 'judicial',
  court: 'Supreme Court of the United States',
  imageUrl: supremeCourtImageMap[justice.name],
  salaryNote: JUSTICE_SALARY_NOTE,
  sectionId: 'supreme-court',
  subtitle: 'Supreme Court',
  wealthNote: JUSTICE_WEALTH_NOTE,
}))

const supremeCourtTrumpAdministrationCases = [
  {
    caseName: 'Learning Resources, Inc. v. Trump',
    date: '2026-02-20',
    id: 'learning-resources-v-trump',
    type: 'merits',
    issue: 'Tariff power under IEEPA. The case asked whether Trump could use that emergency statute to impose broad tariffs.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Tariffs',
    result: 'The Court held that IEEPA does not authorize the President to impose tariffs.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/25pdf/24-1287_new_3135.pdf',
  },
  {
    caseName: 'Trump v. Illinois',
    date: '2025-12-23',
    id: 'trump-v-illinois',
    type: 'order',
    issue:
      "National Guard federalization. The case asked whether Trump could keep the Guard federalized over Illinois's objection while litigation continued.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Military',
    result: "The Court denied Trump's stay application.",
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/25a443.html',
  },
  {
    caseName: 'Trump v. Orr',
    date: '2025-11-06',
    id: 'trump-v-orr',
    type: 'order',
    issue:
      'Passport sex-marker policy. The case asked whether the administration could enforce its rule requiring passports to reflect biological sex at birth while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Passports',
    result: 'The Court granted the administration stay relief.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/25pdf/25a319_i4dj.pdf',
  },
  {
    caseName: 'Trump v. Slaughter',
    date: '2025-09-22',
    id: 'trump-v-slaughter',
    type: 'order',
    issue:
      "FTC removal protections. The case asked whether statutory limits on removing FTC commissioners can block Trump's firing power.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Removal',
    result: 'The Court granted a stay and granted certiorari before judgment.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/25a264_o759.pdf',
  },
  {
    caseName: 'Trump v. Boyle',
    date: '2025-07-23',
    id: 'trump-v-boyle',
    type: 'order',
    issue:
      'Removal power at the Consumer Product Safety Commission. The case asked whether Trump could remove a commissioner and keep her out during the appeal.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Removal',
    result: "The Court granted Trump's stay, relying on Trump v. Wilcox.",
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/25a11_2cp3.pdf',
  },
  {
    caseName: 'McMahon v. New York',
    date: '2025-07-14',
    id: 'mcmahon-v-new-york',
    type: 'order',
    issue:
      'Department of Education shutdown effort. The case asked whether the administration could keep its mass layoff and closure plan moving while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Education',
    result: 'The Court granted the administration stay relief.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a1203_new_6j37.pdf',
  },
  {
    caseName: 'Trump v. American Federation of Government Employees',
    date: '2025-07-08',
    id: 'trump-v-afge',
    type: 'order',
    issue:
      'Federal workforce reorganization. The case asked whether the administration could keep implementing its government-wide reorganization and reduction-in-force directives during the appeal.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'pro',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Workforce',
    result:
      'The Court granted the administration stay relief; Sotomayor concurred in the grant, and Jackson dissented.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a1174_h3ci.pdf',
  },
  {
    caseName: 'Trump v. CASA, Inc.',
    date: '2025-06-27',
    id: 'trump-v-casa',
    type: 'order',
    issue:
      "Nationwide injunctions and Trump's citizenship order. The case asked how far lower courts could go in blocking the order before merits review.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Citizenship',
    result:
      'The Court narrowed universal-injunction relief and partly stayed lower-court orders, without deciding the citizenship merits.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a884_8n59.pdf',
  },
  {
    caseName: 'Department of Homeland Security v. D.V.D.',
    date: '2025-06-23',
    id: 'dhs-v-dvd',
    type: 'order',
    issue:
      'Third-country removals. The case asked whether the administration could resume deportations to countries such as South Sudan and Libya while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Deportation',
    result: 'The Court granted the administration stay relief.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a1153_l5gm.pdf',
  },
  {
    caseName: 'Noem v. Doe',
    date: '2025-05-30',
    id: 'noem-v-doe',
    type: 'order',
    issue:
      'Temporary protected status and work authorization. The case asked whether the administration could end TPS-linked protections for hundreds of thousands of people while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Immigration',
    result: 'The Court granted the administration stay relief.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a1079_p86b.pdf',
  },
  {
    caseName: 'Trump v. Wilcox',
    date: '2025-05-22',
    id: 'trump-v-wilcox',
    type: 'order',
    issue:
      'Removal power over independent agencies. The case asked whether Trump could keep fired NLRB and MSPB officials out while the litigation proceeded.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Removal',
    result: "The Court granted Trump's stay and let the removals remain in effect during the appeal.",
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a966_1b8e.pdf',
  },
  {
    caseName: 'A.A.R.P. v. Trump',
    date: '2025-05-16',
    id: 'aarp-v-trump',
    type: 'order',
    issue:
      "Alien Enemies Act removals. The case asked whether detainees could obtain injunction relief against removals tied to Trump's March 2025 proclamation while the litigation continued.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Deportation',
    result:
      'The Court granted an injunction pending further proceedings, vacated the Fifth Circuit, and remanded.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a1007_g2bh.pdf',
  },
  {
    caseName: 'A.A.R.P. v. Trump',
    date: '2025-04-19',
    id: 'aarp-v-trump-interim-order',
    type: 'order',
    issue:
      "Alien Enemies Act removals. The case asked whether the Court should immediately halt removals tied to Trump's March 2025 proclamation while emergency briefing continued.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Deportation',
    result:
      'The Court ordered the Government not to remove any putative class member until further order.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/24pdf/24a1007_22p3.pdf',
  },
  {
    caseName: 'Trump v. J.G.G.',
    date: '2025-04-07',
    id: 'trump-v-jgg',
    type: 'order',
    issue:
      "Alien Enemies Act removals. The case asked whether the district court could keep using a TRO to block deportations under Trump's March 2025 proclamation.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Deportation',
    result:
      'The Court vacated the district-court TROs and pushed the dispute back into the usual habeas track.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/24a931.html',
  },
  {
    caseName: 'Trump v. United States',
    date: '2024-07-01',
    id: 'trump-v-united-states',
    type: 'merits',
    issue:
      'Presidential immunity. The case asked how much criminal immunity a former President has for official acts.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Immunity',
    result:
      'The Court recognized absolute immunity for core constitutional powers and presumptive immunity for official acts.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/23pdf/603us1r57_2dp3.pdf',
  },
  {
    caseName: 'Collins v. Yellen',
    date: '2021-06-23',
    id: 'collins-v-yellen',
    type: 'merits',
    issue:
      'FHFA removal protections. The case asked whether Congress could shield the FHFA director from at-will presidential removal and what remedy followed.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Removal',
    result:
      "The Court held that the FHFA director's for-cause removal protection is unconstitutional and remanded on remedy.",
    sourceUrl: 'https://www.supremecourt.gov/opinions/20pdf/19-422_new_c0n2.pdf',
  },
  {
    caseName: 'California v. Texas',
    date: '2021-06-17',
    id: 'california-v-texas',
    type: 'merits',
    issue:
      'ACA challenge after the individual-penalty change. The case asked whether challengers backed by the Trump administration had standing to invalidate the law.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'anti',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Healthcare',
    result:
      'The Court held that the challengers lacked standing and left the Affordable Care Act in place.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/20pdf/19-840_new_5hdk.pdf',
  },
  {
    caseName: 'Trump v. New York',
    date: '2020-12-18',
    id: 'trump-v-new-york',
    type: 'procedural',
    issue:
      'Apportionment base and undocumented immigrants. The case asked whether Trump could exclude certain undocumented immigrants from the census count used to apportion House seats.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Census',
    result:
      'The Court treated the case as too uncertain and not ripe, vacated the lower ruling, and remanded.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/20pdf/592us1r10_fd9g.pdf',
  },
  {
    caseName: 'Department of Homeland Security v. Thuraissigiam',
    date: '2020-06-25',
    id: 'dhs-v-thuraissigiam',
    type: 'merits',
    issue:
      'Expedited removal and habeas review. The case asked whether the Trump administration could sharply limit judicial review of an asylum-seeker’s expedited-removal order.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Immigration',
    result:
      'The Court upheld the limits on habeas review as applied here and ruled for the administration, with Sotomayor and Kagan dissenting.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19-161.html',
  },
  {
    caseName: 'Little Sisters of the Poor Saints Peter and Paul Home v. Pennsylvania',
    date: '2020-07-08',
    id: 'little-sisters-v-pennsylvania',
    type: 'merits',
    issue:
      'ACA contraceptive-mandate exemptions. The case asked whether the Trump administration could broaden religious and moral exemptions by rule.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Healthcare',
    result:
      'The Court held that the administration had authority to issue the religious and moral exemptions and reversed the injunction.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/19pdf/19-431_5i36.pdf',
  },
  {
    caseName: 'Seila Law LLC v. Consumer Financial Protection Bureau',
    date: '2020-06-29',
    id: 'seila-law-v-cfpb',
    type: 'merits',
    issue:
      'CFPB removal protections. The case asked whether Congress could insulate the CFPB director from at-will presidential removal.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Removal',
    result:
      "The Court held that the CFPB director's removal protection is unconstitutional but severable from the rest of the statute.",
    sourceUrl: 'https://www.supremecourt.gov/opinions/19pdf/19-7_new_bq7d.pdf',
  },
  {
    caseName: 'Trump v. Sierra Club',
    date: '2020-07-31',
    id: 'trump-v-sierra-club',
    type: 'order',
    issue:
      'Border wall funding transfer. The case asked whether Trump could keep using diverted military funds for wall construction while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Appropriations',
    result:
      'The Court denied a motion to lift its stay, leaving the administration free to keep using the funds while the case proceeded.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19a60.html',
  },
  {
    caseName: 'Trump v. Sierra Club',
    date: '2019-07-26',
    id: 'trump-v-sierra-club-2019-stay',
    type: 'order',
    issue:
      'Border wall funding transfer. The case asked whether Trump could begin using diverted military funds for wall construction while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Appropriations',
    result:
      'The Court granted the administration stay application and let the funding transfer proceed while the appeal continued.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/18pdf/19a60_o75p.pdf',
  },
  {
    caseName: 'Wolf v. Innovation Law Lab',
    date: '2020-03-11',
    id: 'wolf-v-innovation-law-lab',
    type: 'order',
    issue:
      'Remain in Mexico policy. The case asked whether the Trump administration could keep enforcing the Migrant Protection Protocols while the appeal continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Immigration',
    result:
      'The Court granted the administration’s stay application and allowed the policy to remain in effect during the appeal.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19a960.html',
  },
  {
    caseName: 'Barton v. Barr',
    date: '2020-04-23',
    id: 'barton-v-barr',
    type: 'merits',
    issue:
      'Cancellation of removal eligibility. The case asked whether a noncitizen could be disqualified based on a Section 1182(a)(2) offense even when that was not the removal charge.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Deportation',
    result:
      'The Court ruled for the Government and held that the stop-time bar could block cancellation of removal even if the offense was not the removal charge.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/19pdf/18-725_f2bh.pdf',
  },
  {
    caseName: 'Nasrallah v. Barr',
    date: '2020-06-01',
    id: 'nasrallah-v-barr',
    type: 'merits',
    issue:
      'CAT review for criminal noncitizens. The case asked whether courts of appeals could review factual challenges to CAT protection denials.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Deportation',
    result:
      'The Court held that courts of appeals may review factual challenges to CAT orders and reversed the Government-backed position.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/19pdf/18-1432_e2pg.pdf',
  },
  {
    caseName: 'Guerrero-Lasprilla v. Barr',
    date: '2020-03-23',
    id: 'guerrero-lasprilla-v-barr',
    type: 'merits',
    issue:
      'Judicial review of legal questions in removal cases. The case asked whether courts could review mixed questions of law and fact in this immigration context.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Deportation',
    result:
      'The Court held that the statute allows review of mixed questions of law and fact and vacated the Fifth Circuit judgments.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/19pdf/18-776_8759.pdf',
  },
  {
    caseName: 'Department of Homeland Security v. New York',
    date: '2020-01-27',
    id: 'dhs-v-new-york-public-charge',
    type: 'order',
    issue:
      'Public-charge rule. The case asked whether the Trump administration could enforce its immigration public-charge rule while lower-court injunctions were on appeal.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Immigration',
    result: 'The Court granted the stay and allowed the public-charge rule to take effect pending appeal.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19a785.html',
  },
  {
    caseName: 'Barr v. East Bay Sanctuary Covenant',
    date: '2019-09-11',
    id: 'barr-v-east-bay-sanctuary-covenant',
    type: 'order',
    issue:
      'Third-country-transit asylum rule. The case asked whether the Trump administration could enforce its restrictive asylum rule nationwide while litigation continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Asylum',
    result: 'The Court granted the stay and let the asylum rule take effect nationwide during the appeal.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19a230.html',
  },
  {
    caseName: 'Department of Homeland Security v. Regents of the University of California',
    date: '2020-06-18',
    id: 'dhs-v-regents',
    type: 'merits',
    issue:
      "DACA rescission. The case asked whether the administration's move to end DACA complied with the APA.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Deportation',
    result:
      'The Court held the rescission was arbitrary and capricious as explained and sent the case back.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/19pdf/591us1r46_1o23.pdf',
  },
  {
    caseName: 'Department of Commerce v. New York',
    date: '2019-06-27',
    id: 'department-of-commerce-v-new-york',
    type: 'merits',
    issue:
      'Census citizenship question. The case asked whether the Trump administration could add a citizenship question to the 2020 census on the rationale it gave.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Census',
    result:
      "The Court said the administration's stated rationale was inadequate and sent the matter back.",
    sourceUrl: 'https://www.supremecourt.gov/opinions/preliminaryprint/588US2PP_final.pdf#page=414',
  },
  {
    caseName: 'Nielsen v. Preap',
    date: '2019-03-19',
    id: 'nielsen-v-preap',
    type: 'merits',
    issue:
      'Mandatory immigration detention. The case asked whether the Trump administration could detain certain noncitizens under the statute even if immigration authorities did not arrest them immediately upon release from criminal custody.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Detention',
    result:
      'The Court ruled for the administration and upheld its broad reading of the mandatory-detention provision, 5-4.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/boundvolumes/586BV.pdf#page=591',
  },
  {
    caseName: 'Trump v. East Bay Sanctuary Covenant',
    date: '2018-12-21',
    id: 'trump-v-east-bay-sanctuary-covenant',
    type: 'order',
    issue:
      'Asylum-ban stay request. The case asked whether the Trump administration could immediately enforce its asylum rule while the lower-court injunction remained in place.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Asylum',
    result: 'The Court denied the stay request.',
    sourceUrl: 'https://www.supremecourt.gov/orders/courtorders/122118zr_986b.pdf',
  },
  {
    caseName: 'Trump v. Hawaii',
    date: '2018-06-26',
    id: 'trump-v-hawaii',
    type: 'merits',
    issue:
      'Travel ban and entry suspension. The case asked whether Trump could use federal immigration law to restrict entry from several countries.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'not_on_court',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Immigration',
    result: 'The Court upheld the Proclamation and allowed the entry restrictions to take effect.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/17-965.html',
  },
  {
    caseName: 'Trump v. Hawaii (2017 stay order)',
    date: '2017-06-26',
    id: 'trump-v-hawaii-2017-stay',
    type: 'order',
    issue:
      'Travel-ban and refugee-suspension stay applications. The case asked whether Sections 2(c) and 6 of Executive Order 13780 could take effect while the litigation continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'pro',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'not_on_court',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Refugees',
    result:
      'The Court granted the Government applications in part, let core entry and refugee restrictions take effect against people without a qualifying U.S. connection, and set the case for argument.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/16-1540.html',
  },
  {
    caseName: 'Trump v. International Refugee Assistance Project',
    date: '2017-06-26',
    id: 'trump-v-irap',
    type: 'order',
    issue:
      'Travel-ban stay applications in the Fourth Circuit challenge. The case asked whether Section 2(c) of Executive Order 13780 could take effect while the litigation continued.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'pro',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'not_on_court',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Immigration',
    result:
      'The Court granted the Government applications in part, let the entry-suspension rules take effect against people without a qualifying U.S. connection, and set the case for argument.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/16-1436.html',
  },
]

const supremeCourtTrumpPersonalCases = [
  {
    caseName: 'Trump v. New York',
    date: '2025-01-09',
    id: 'trump-v-new-york-criminal-stay',
    type: 'order',
    issue:
      'State criminal sentencing stay. The case asked whether Trump could halt sentencing in the New York criminal case while his immunity and evidentiary objections continued on appeal.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'anti',
    },
    powerTag: 'Criminal',
    result: "The Court denied Trump's stay application.",
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/24a666.html',
  },
  {
    caseName: 'Republican Party of Pennsylvania v. Boockvar',
    date: '2020-10-28',
    id: 'republican-party-of-pa-v-boockvar-expedition',
    type: 'procedural',
    issue:
      'Pre-election Pennsylvania mail-ballot deadline dispute. The case asked whether the Court should fast-track review before the 2020 election of the state court ruling extending the statutory receipt deadline.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'took_no_part',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Election',
    result: 'The Court denied expedition before the election.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/20pdf/20-542(1)_3e04.pdf',
  },
  {
    caseName: 'Trump v. Anderson',
    date: '2024-03-04',
    id: 'trump-v-anderson',
    type: 'merits',
    issue:
      'Ballot eligibility under Section 3. The case asked whether Colorado could keep Trump off the presidential ballot under the Fourteenth Amendment disqualification clause.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'pro',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'pro',
      'judicial-elena-kagan': 'pro',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'pro',
      'judicial-amy-coney-barrett': 'pro',
      'judicial-ketanji-brown-jackson': 'pro',
    },
    powerTag: 'Ballot',
    result:
      'The Court unanimously held that states cannot enforce Section 3 against presidential candidates for federal office on their own.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/23pdf/601us1r06_a86c.pdf',
  },
  {
    caseName: 'Trump v. Thompson',
    date: '2022-01-19',
    id: 'trump-v-thompson',
    type: 'order',
    issue:
      'January 6 records and executive privilege. The case asked whether Trump could block release of White House records to the House January 6 committee.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'anti',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Records',
    result: "The Court denied Trump's stay application and left the D.C. Circuit ruling in place.",
    sourceUrl: 'https://www.supremecourt.gov/opinions/21pdf/21a272_9p6b.pdf',
  },
  {
    caseName: 'Republican Party of Pennsylvania v. Degraffenreid / Corman v. Pennsylvania Democratic Party',
    date: '2021-02-22',
    id: 'republican-party-of-pa-v-degraffenreid',
    type: 'procedural',
    issue:
      'Post-election Pennsylvania mail-ballot deadline dispute. The petitions asked whether the state court could override the legislature and extend the federal-election receipt deadline.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'pro',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Election',
    result: 'The Court denied certiorari.',
    sourceUrl: 'https://www.supremecourt.gov/opinions/20pdf/20-542_2c83.pdf',
  },
  {
    caseName: 'Trump v. Vance',
    date: '2020-07-09',
    id: 'trump-v-vance',
    type: 'merits',
    issue:
      "State grand-jury subpoena. The case asked whether a sitting President had absolute immunity from a state prosecutor's subpoena for private records.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Records',
    result: 'The Court rejected absolute immunity and allowed the subpoena fight to continue.',
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19-635.html',
  },
  {
    caseName: 'Trump v. Mazars USA, LLP',
    date: '2020-07-09',
    id: 'trump-v-mazars',
    type: 'merits',
    issue:
      "Congressional subpoenas for Trump's financial records. The case asked whether House committees could demand those records from third parties.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Records',
    result:
      "The Court rejected Trump's categorical position and sent the dispute back under a new separation-of-powers test.",
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19-715.html',
  },
  {
    caseName: 'Trump v. Deutsche Bank AG',
    date: '2020-07-09',
    id: 'trump-v-deutsche-bank',
    type: 'merits',
    issue:
      "Congressional subpoenas to Trump's lenders. The case asked whether House committees could obtain Trump-related financial records from Deutsche Bank and Capital One.",
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'not_on_court',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Finance',
    result:
      "The Court rejected Trump's categorical position and vacated the judgment, remanding under the same separation-of-powers framework used in Mazars.",
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/19-760.html',
  },
  {
    caseName: 'Texas v. Pennsylvania',
    date: '2020-12-11',
    id: 'texas-v-pennsylvania',
    type: 'procedural',
    issue:
      '2020 election challenge. Texas, backed by Trump, asked the Court to let it sue four battleground states over how they ran the presidential election and to block the use of those states’ electoral votes.',
    justiceStances: {
      'judicial-john-g-roberts-jr': 'anti',
      'judicial-clarence-thomas': 'pro',
      'judicial-samuel-a-alito-jr': 'pro',
      'judicial-sonia-sotomayor': 'anti',
      'judicial-elena-kagan': 'anti',
      'judicial-neil-m-gorsuch': 'anti',
      'judicial-brett-m-kavanaugh': 'anti',
      'judicial-amy-coney-barrett': 'anti',
      'judicial-ketanji-brown-jackson': 'not_on_court',
    },
    powerTag: 'Election',
    result: 'The Court refused the case for lack of standing.',
    sourceUrl:
      'https://www.supremecourt.gov/search.aspx?filename=%2Fdocket%2Fdocketfiles%2Fhtml%2Fpublic%2F22o155.html',
  },
]

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8230;/g, '...')
    .replace(/&#039;/g, "'")
    .replace(/<sup>(.*?)<\/sup>/g, '$1')
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  return match ? decodeHtml(match[1]).trim() : ''
}

function formatCommaName(name) {
  if (!name.includes(',')) {
    return name.trim()
  }

  const [last, first] = name.split(',').map((part) => part.trim())
  return `${first} ${last}`.trim()
}

function sentenceCaseParty(code) {
  return PARTY_DATA[code]?.label ?? 'Nonpartisan'
}

function alignmentFromParty(code) {
  return PARTY_DATA[code]?.alignment ?? 'nonpartisan'
}

function congressPhotoUrl(bioguideId) {
  if (!bioguideId) {
    return undefined
  }

  const trimmed = bioguideId.trim().toUpperCase()

  if (!trimmed) {
    return undefined
  }

  return `https://unitedstates.github.io/images/congress/225x275/${trimmed}.jpg`
}

const HOUSE_SECOND_IMPEACHMENT_VOTE_URL = 'https://clerk.house.gov/Votes/202117'
const HOUSE_ELECTORAL_OBJECTION_VOTE_URLS = [
  'https://clerk.house.gov/Votes/202110',
  'https://clerk.house.gov/Votes/202111',
]
const SENATE_SECOND_IMPEACHMENT_VOTE_URL =
  'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00059.htm'
const SENATE_ELECTORAL_OBJECTION_VOTE_URLS = [
  'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00001.htm',
  'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00002.htm',
]

const trumpManualOverrides = new Map([
  [
    'Donald J. Trump',
    {
      evidence: ['The score anchor for the project: Trump himself.'],
      note: 'Trump is the reference point for the scale, so he is fixed at the maximum.',
      score: 10,
    },
  ],
  [
    'J.D. Vance',
    {
      evidence: ['Current vice president.', 'Trump’s 2024 national running mate.'],
      note: 'The vice presidency and 2024 running-mate status place Vance in Trump’s closest public political circle.',
      score: 10,
    },
  ],
  [
    'Bernard Sanders',
    {
      evidence: [
        'Independent senator who caucuses with Democrats.',
        'Longtime national political opponent of Trump.',
      ],
      note: 'Sanders sits at the far-opposition end of the scale and outside Trump’s party coalition.',
      score: 0,
    },
  ],
  [
    'Angus S. Jr. King',
    {
      evidence: [
        'Independent senator who caucuses with Democrats.',
        'Not part of Trump’s party coalition.',
      ],
      note: 'King is outside Trump’s coalition, but without the same direct national rivalry as Sanders.',
      score: 1,
    },
  ],
  [
    'Jerome H. Powell',
    {
      evidence: [
        'Trump elevated Powell to the Fed chair in 2017.',
        'Biden later reappointed Powell to another term in 2022.',
        'The Federal Reserve is structured to operate independently of the White House.',
      ],
      note:
        'Powell has a direct Trump appointment history, but the Fed’s legal independence and his later Biden reappointment keep this in the middle range rather than near Trump’s inner circle.',
      score: 5,
    },
  ],
  [
    'Paul S. Atkins',
    {
      evidence: ['Sworn in as SEC chair in 2025 after nomination by Trump.'],
      note:
        'Trump put Atkins at the top of the SEC, creating a direct institutional tie even though the SEC is an independent regulator rather than a cabinet department.',
      score: 8,
    },
  ],
  [
    'Andrew N. Ferguson',
    {
      evidence: ['Trump designated Ferguson as FTC chairman on January 20, 2025.'],
      note:
        'Ferguson leads an independent regulator, but his current chairmanship still comes directly from Trump, which supports a high score.',
      score: 8,
    },
  ],
  [
    'Brendan Carr',
    {
      evidence: [
        'Trump designated Carr as FCC chairman in 2025.',
        'Carr first joined the FCC after Trump elevated him in 2017.',
      ],
      note:
        'Carr’s chairmanship and earlier elevation at the FCC both run through Trump, making this one of the stronger independent-agency ties.',
      score: 9,
    },
  ],
  [
    'Michael S. Selig',
    {
      evidence: ['Sworn in as CFTC chairman in December 2025 after nomination by Trump.'],
      note:
        'Selig’s current leadership role at the CFTC comes directly from Trump’s nomination and Senate confirmation path, so the score stays high.',
      score: 8,
    },
  ],
])

const houseLeadershipFacts = new Map([
  ['Mike Johnson', { delta: 4, text: 'Speaker of the House.' }],
  ['Steve Scalise', { delta: 3, text: 'House majority leader.' }],
  ['Tom Emmer', { delta: 2, text: 'House majority whip.' }],
  ['Lisa McClain', { delta: 2, text: 'House Republican conference chair.' }],
  ['Hakeem Jeffries', { delta: 0, text: 'House Democratic leader.' }],
  ['Katherine Clark', { delta: 0, text: 'House Democratic whip.' }],
  ['Pete Aguilar', { delta: 0, text: 'House Democratic caucus chair.' }],
])

const legislativeManualEvidence = new Map([
  ['Bennie Thompson', { delta: -1, text: 'Chaired the House January 6 committee.' }],
  [
    'Jamie Raskin',
    { delta: -1, text: 'Served as lead House impeachment manager in Trump’s second impeachment trial.' },
  ],
  [
    'Adam B. Schiff',
    { delta: -1, text: 'Led the first House impeachment case against Trump while serving in the House.' },
  ],
  ['Pete Aguilar', { delta: -1, text: 'Served on the House January 6 committee.' }],
])

const supremeCourtTrumpFacts = new Map([
  ['Neil M. Gorsuch', { note: 'Nominated to the Supreme Court by Trump in 2017.', score: 7 }],
  ['Brett M. Kavanaugh', { note: 'Nominated to the Supreme Court by Trump in 2018.', score: 7 }],
  ['Amy Coney Barrett', { note: 'Nominated to the Supreme Court by Trump in 2020.', score: 7 }],
])

const manualXUrlOverrides = new Map([
  ['Donald J. Trump', 'https://x.com/realDonaldTrump'],
  ['J.D. Vance', 'https://x.com/JDVance'],
])

const manualXUrlSuppressions = new Set(['Rochelle Garza'])

const genericXHandles = new Set([
  'whitehouse',
  'potus',
  'vp',
  'senatedems',
  'senategop',
  'housegop',
  'housedemocrats',
  'gop',
  'democrats',
  'republicans',
  'twitter',
  'x',
])

function trumpLabelFromScore(score) {
  if (score >= 9) {
    return 'Trump inner circle'
  }

  if (score >= 7) {
    return 'Strong Trump ally'
  }

  if (score >= 5) {
    return 'Generally Trump-aligned'
  }

  if (score >= 3) {
    return 'Mixed or arm’s length'
  }

  if (score >= 1) {
    return 'Usually opposed'
  }

  return 'Clear opponent'
}

function clampTrumpScore(score) {
  return Math.max(0, Math.min(10, Math.round((score + Number.EPSILON) * 100) / 100))
}

function clampTrumpScoreToSingleDecimal(score) {
  return Math.max(0, Math.min(10, Math.round((score + Number.EPSILON) * 10) / 10))
}

function judicialTrumpLabelFromScore(score) {
  if (score >= 9) {
    return 'Very often pro-Trump in selected cases'
  }

  if (score >= 7) {
    return 'Mostly pro-Trump in selected cases'
  }

  if (score >= 5) {
    return 'Leans pro-Trump in selected cases'
  }

  if (score >= 3) {
    return 'Mixed in selected cases'
  }

  if (score >= 1) {
    return 'Usually not pro-Trump in selected cases'
  }

  return 'Never pro-Trump in selected cases'
}

function uniqueStrings(items) {
  return [...new Set(items.filter(Boolean))]
}

function extractBioguideIdFromImageUrl(imageUrl) {
  const match = imageUrl?.match(/\/photo\/[A-Z]\/([A-Z0-9]+)\.jpg$/)
  return match ? match[1] : undefined
}

function normalizeNameMatch(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(jr|jr\.|sr|sr\.|ii|iii|iv|v)\b/gi, ' ')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function removeSingleLetterNameTokens(value) {
  return value
    .split(' ')
    .filter((token) => token.length > 1)
    .join(' ')
}

const FIRST_NAME_EQUIVALENTS = new Map(
  [
    ['bernie', ['bernard']],
    ['bill', ['william']],
    ['chuck', ['charles']],
    ['chris', ['christopher']],
    ['jack', ['john']],
    ['jacky', ['jacklyn', 'jackie']],
    ['jim', ['james']],
    ['katie', ['katherine']],
    ['maggie', ['margaret']],
    ['thom', ['thomas']],
    ['tim', ['timothy']],
  ].flatMap(([key, values]) => [
    [key, [key, ...values]],
    ...values.map((value) => [value, [key, ...values]]),
  ]),
)

const executiveCongressServiceOverrides = new Map([
  [
    'executive-jd-vance',
    [
      {
        chamber: 'senate',
        endDate: '2025-01-10',
        label: 'U.S. senator from Ohio (2023-2025)',
        matchName: 'JD Vance',
        startDate: '2023-01-03',
        stateCode: 'OH',
      },
    ],
  ],
  [
    'executive-marco-rubio',
    [
      {
        chamber: 'senate',
        endDate: '2025-01-20',
        label: 'U.S. senator from Florida (2011-2025)',
        startDate: '2011-01-03',
        stateCode: 'FL',
      },
    ],
  ],
  [
    'executive-marco-rubio-national-archives-and-records-administration',
    [
      {
        chamber: 'senate',
        endDate: '2025-01-20',
        label: 'U.S. senator from Florida (2011-2025)',
        startDate: '2011-01-03',
        stateCode: 'FL',
      },
    ],
  ],
  [
    'executive-kelly-loeffler-small-business-administration',
    [
      {
        chamber: 'senate',
        endDate: '2021-01-20',
        label: 'U.S. senator from Georgia (2020-2021)',
        startDate: '2020-01-06',
        stateCode: 'GA',
      },
    ],
  ],
  [
    'executive-lori-chavez-deremer',
    [
      {
        chamber: 'house',
        endDate: '2025-01-03',
        label: "U.S. representative for Oregon's 5th congressional district (2023-2025)",
        startDate: '2023-01-03',
        stateCode: 'OR',
      },
    ],
  ],
  [
    'executive-doug-collins',
    [
      {
        chamber: 'house',
        endDate: '2021-01-03',
        label: "U.S. representative for Georgia's 9th congressional district (2013-2021)",
        startDate: '2013-01-03',
        stateCode: 'GA',
      },
    ],
  ],
  [
    'executive-sean-duffy',
    [
      {
        chamber: 'house',
        endDate: '2019-09-23',
        label: "U.S. representative for Wisconsin's 7th congressional district (2011-2019)",
        startDate: '2011-01-03',
        stateCode: 'WI',
      },
    ],
  ],
  [
    'executive-kristi-noem',
    [
      {
        chamber: 'house',
        endDate: '2019-01-03',
        label: "U.S. representative for South Dakota's at-large district (2011-2019)",
        startDate: '2011-01-03',
        stateCode: 'SD',
      },
    ],
  ],
  [
    'executive-lee-zeldin-environmental-protection-agency',
    [
      {
        chamber: 'house',
        endDate: '2023-01-03',
        label: 'U.S. representative for New York (2015-2023)',
        startDate: '2015-01-03',
        stateCode: 'NY',
      },
    ],
  ],
  [
    'executive-john-ratcliffe-central-intelligence-agency',
    [
      {
        chamber: 'house',
        endDate: '2020-05-22',
        label: 'U.S. representative for Texas (2015-2021)',
        startDate: '2015-01-06',
        stateCode: 'TX',
      },
    ],
  ],
  [
    'executive-tulsi-gabbard-office-of-the-director-of-national-intelligence',
    [
      {
        chamber: 'house',
        endDate: '2021-01-03',
        label: 'U.S. representative for Hawaii (2013-2021)',
        startDate: '2013-01-03',
        stateCode: 'HI',
      },
    ],
  ],
])

function buildNormalizedNameTokens(value) {
  return removeSingleLetterNameTokens(normalizeNameMatch(value))
    .split(' ')
    .filter(Boolean)
}

function getEquivalentFirstNames(value) {
  return FIRST_NAME_EQUIVALENTS.get(value) ?? [value]
}

function firstNamesLikelyMatch(left, right) {
  if (!left || !right) {
    return false
  }

  if (left === right) {
    return true
  }

  if ((left.startsWith(right) || right.startsWith(left)) && Math.min(left.length, right.length) >= 3) {
    return true
  }

  const leftEquivalents = getEquivalentFirstNames(left)
  const rightEquivalents = getEquivalentFirstNames(right)

  return leftEquivalents.some((candidate) => rightEquivalents.includes(candidate))
}

function parseIsoDateToTimestamp(value) {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    return null
  }

  const [, year, month, day] = match
  return Date.UTC(Number(year), Number(month) - 1, Number(day))
}

function parseRollCallDateToTimestamp(value) {
  const trimmed = value?.replace(/\s+/g, ' ').trim()

  if (!trimmed) {
    return null
  }

  const shortMonthMatch = trimmed.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/)

  if (shortMonthMatch) {
    const [, day, monthText, year] = shortMonthMatch
    const month = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ].indexOf(monthText.toLowerCase())

    if (month >= 0) {
      return Date.UTC(Number(year), month, Number(day))
    }
  }

  const longMonthMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})/)

  if (longMonthMatch) {
    const [, monthText, day, year] = longMonthMatch
    const month = new Date(`${monthText} 1, 2000 UTC`).getUTCMonth()

    if (Number.isFinite(month)) {
      return Date.UTC(Number(year), month, Number(day))
    }
  }

  const timestamp = Date.parse(trimmed)
  return Number.isNaN(timestamp) ? null : timestamp
}

function isExecutiveServiceActiveOnSnapshot(service, snapshot) {
  const snapshotTimestamp = parseRollCallDateToTimestamp(snapshot.date)

  if (snapshotTimestamp === null) {
    return true
  }

  const startTimestamp = parseIsoDateToTimestamp(service.startDate)

  if (startTimestamp !== null && snapshotTimestamp < startTimestamp) {
    return false
  }

  const endTimestamp = parseIsoDateToTimestamp(service.endDate)

  if (endTimestamp !== null && snapshotTimestamp > endTimestamp) {
    return false
  }

  return true
}

function parseHouseVoteEntryName(entryName) {
  const raw = entryName ?? ''
  const [lastPart, firstPart = ''] = raw.includes(',') ? raw.split(',', 2) : ['', raw]
  const fallbackTokens = buildNormalizedNameTokens(raw)
  const firstTokens = buildNormalizedNameTokens(firstPart)
  const lastTokens = buildNormalizedNameTokens(lastPart)
  const firstName = firstTokens[0] ?? fallbackTokens[0] ?? ''
  const lastName = lastTokens.join(' ') || fallbackTokens.slice(1).join(' ') || fallbackTokens.slice(-1).join(' ')

  return { firstName, lastName }
}

function parseHouseVoteEntries(html) {
  return [...html.matchAll(/<a href="\/Members\/([A-Z]\d{6})"[^>]*aria-label="[^"]+? Voted ([A-Za-z ]+)"/g)].map(
    (match) => ({
      bioguideId: match[1],
      cast: match[2].trim(),
    }),
  )
}

function parseSenateVoteEntries(html) {
  const normalized = decodeHtml(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?b>/gi, '')
    .replace(/<[^>]+>/g, ' ')

  return [
    ...normalized.matchAll(
      /([A-Za-zÀ-ÖØ-öø-ÿ'., -]+?) \(([A-Z])-([A-Z]{2})\),\s*(Guilty|Not Guilty|Yea|Nay|Present|Not Voting|Did Not Vote)/g,
    ),
  ].map((match) => ({
    cast: match[4].trim(),
    name: match[1].trim(),
    partyCode: match[2],
    stateCode: match[3],
  }))
}

function findMatchingSenator(voteEntry, senators) {
  const voteFirstName = buildNormalizedNameTokens(voteEntry.firstName ?? voteEntry.name)[0] ?? ''
  const voteLastName = removeSingleLetterNameTokens(normalizeNameMatch(voteEntry.lastName ?? voteEntry.name))
  const candidates = senators.filter((person) => person.stateCode === voteEntry.stateCode)

  return (
    candidates.find((person) => {
      const tokens = buildNormalizedNameTokens(person.name)

      if (tokens.length === 0) {
        return false
      }

      const personFirstName = tokens[0]
      const personLastOne = tokens.slice(-1).join(' ')
      const personLastTwo = tokens.slice(-2).join(' ')
      const surnameMatches =
        personLastOne === voteLastName ||
        personLastTwo === voteLastName ||
        voteLastName.endsWith(` ${personLastOne}`) ||
        personLastTwo.endsWith(` ${voteLastName}`)

      return surnameMatches && firstNamesLikelyMatch(personFirstName, voteFirstName)
    }) ?? null
  )
}

function findMatchingRepresentative(voteEntry, representatives) {
  void voteEntry
  void representatives
  throw new Error('House roll-call matching by name is forbidden. Use bioguideId-based lookup only.')
}

function findMatchingExecutiveCongressVoteEntry(voteEntries, service, fallbackName) {
  const referenceName = service.matchName ?? fallbackName
  const referenceTokens = buildNormalizedNameTokens(referenceName)
  const referenceFirstName = referenceTokens[0] ?? ''
  const referenceLastOne = referenceTokens.slice(-1).join(' ')
  const referenceLastTwo = referenceTokens.slice(-2).join(' ')

  return (
    voteEntries.find((entry) => {
      if (service.stateCode && entry.stateCode !== service.stateCode) {
        return false
      }

      if (service.chamber === 'senate') {
        const voteFirstName = buildNormalizedNameTokens(entry.firstName ?? entry.name)[0] ?? ''
        const voteLastName = removeSingleLetterNameTokens(
          normalizeNameMatch(entry.lastName ?? entry.name),
        )
        const surnameMatches =
          referenceLastOne === voteLastName ||
          referenceLastTwo === voteLastName ||
          voteLastName.endsWith(` ${referenceLastOne}`) ||
          referenceLastTwo.endsWith(` ${voteLastName}`)

        if (!surnameMatches) {
          return false
        }

        if (!voteFirstName || !referenceFirstName) {
          return true
        }

        return firstNamesLikelyMatch(referenceFirstName, voteFirstName)
      }

      const { firstName: voteFirstName, lastName: voteLastName } = parseHouseVoteEntryName(entry.name)
      const surnameMatches =
        referenceLastOne === voteLastName ||
        referenceLastTwo === voteLastName ||
        voteLastName.endsWith(` ${referenceLastOne}`) ||
        referenceLastTwo.endsWith(` ${voteLastName}`)

      if (!surnameMatches) {
        return false
      }

      if (!voteFirstName || !referenceFirstName) {
        return true
      }

      return firstNamesLikelyMatch(referenceFirstName, voteFirstName)
    }) ?? null
  )
}

async function fetchHouseVoteMap(url) {
  const html = await fetchText(url)
  return new Map(parseHouseVoteEntries(html).map((entry) => [entry.bioguideId, entry.cast]))
}

async function fetchSenateVoteEntriesForUrl(url) {
  const html = await fetchText(url)
  return parseSenateVoteEntries(html)
}

function buildHouseRollCallXmlUrl(year, rollNumber) {
  return `https://clerk.house.gov/evs/${year}/roll${String(rollNumber).padStart(3, '0')}.xml`
}

function encodeHouseVotesTitle(title) {
  return encodeURIComponent(title).replace(/%2C/g, ',')
}

function buildHouseRollCallPageUrl(year, rollNumber, title) {
  const baseUrl = `https://clerk.house.gov/Votes/${year}${Number(rollNumber)}`

  if (!title) {
    return baseUrl
  }

  return `${baseUrl}?Title=${encodeHouseVotesTitle(title)}`
}

function buildSenateRollCallXmlUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.xml`
}

function buildSenateRollCallPageUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.htm`
}

function formatLegislationNumber(value) {
  const cleaned = value.replace(/\./g, ' ').replace(/\s+/g, ' ').trim()

  if (!cleaned) {
    return ''
  }

  const tokens = cleaned.split(' ')
  const numberIndex = tokens.findIndex((token) => /\d/.test(token))

  if (numberIndex <= 0) {
    return cleaned
  }

  const prefix = tokens
    .slice(0, numberIndex)
    .map((token) => (/^[A-Za-z]+$/.test(token) ? `${token.toUpperCase()}.` : token))

  return [...prefix, ...tokens.slice(numberIndex)].join(' ')
}

function parseHouseVoteXml(xml) {
  const congress = Number(xml.match(/<congress>(\d+)<\/congress>/)?.[1] ?? Number.NaN)
  const session = xml.match(/<session>([^<]+)<\/session>/)?.[1]?.trim() ?? ''
  const date = xml.match(/<action-date>([^<]+)<\/action-date>/)?.[1]?.trim() ?? ''
  const actionTime = xml.match(/<action-time(?: [^>]*)?>([^<]+)<\/action-time>/)?.[1]?.trim() ?? ''
  const rollCallNumber = Number(xml.match(/<rollcall-num>(\d+)<\/rollcall-num>/)?.[1] ?? Number.NaN)
  const billNumber = formatLegislationNumber(xml.match(/<legis-num>([^<]+)<\/legis-num>/)?.[1]?.trim() ?? '')
  const question = xml.match(/<vote-question>([^<]+)<\/vote-question>/)?.[1]?.trim() ?? ''
  const resultText = xml.match(/<vote-result>([^<]+)<\/vote-result>/)?.[1]?.trim() ?? ''
  const title = xml.match(/<vote-desc>([^<]+)<\/vote-desc>/)?.[1]?.trim() ?? ''
  const yeaTotal = Number(xml.match(/<totals-by-vote>[\s\S]*?<yea-total>(\d+)<\/yea-total>/)?.[1] ?? Number.NaN)
  const nayTotal = Number(xml.match(/<totals-by-vote>[\s\S]*?<nay-total>(\d+)<\/nay-total>/)?.[1] ?? Number.NaN)
  const entries = new Map()
  const voteEntries = []

  for (const match of xml.matchAll(
    /<recorded-vote><legislator[^>]+name-id="([A-Z]\d{6})"[\s\S]*?sort-field="([^"]+)"[\s\S]*?state="([A-Z]{2})"[\s\S]*?<\/legislator><vote>([^<]+)<\/vote><\/recorded-vote>/g,
  )) {
    entries.set(match[1], match[4].trim())
    voteEntries.push({
      bioguideId: match[1],
      cast: match[4].trim(),
      name: match[2].trim(),
      stateCode: match[3].trim(),
    })
  }

  return {
    actionTime,
    billNumber: billNumber || undefined,
    congress: Number.isFinite(congress) ? congress : undefined,
    date,
    entries,
    voteEntries,
    nayTotal,
    question,
    resultText,
    rollCallNumber: Number.isFinite(rollCallNumber) ? rollCallNumber : undefined,
    session: session || undefined,
    title,
    yeaTotal,
  }
}

function parseSenateVoteXml(xml) {
  const congress = Number(xml.match(/<congress>(\d+)<\/congress>/)?.[1] ?? Number.NaN)
  const session = xml.match(/<session>([^<]+)<\/session>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const rollCallNumber = Number(xml.match(/<vote_number>(\d+)<\/vote_number>/)?.[1] ?? Number.NaN)
  const billNumber = formatLegislationNumber(
    xml.match(/<document_name>([\s\S]*?)<\/document_name>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
  )
  const date = xml.match(/<vote_date>([^<]+)<\/vote_date>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const question = xml.match(/<question>([\s\S]*?)<\/question>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const resultText =
    xml.match(/<vote_result_text>([\s\S]*?)<\/vote_result_text>/)?.[1]?.replace(/\s+/g, ' ').trim() ??
    xml.match(/<vote_result>([\s\S]*?)<\/vote_result>/)?.[1]?.replace(/\s+/g, ' ').trim() ??
    ''
  const title = xml.match(/<vote_title>([\s\S]*?)<\/vote_title>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const yeaTotal = Number(xml.match(/<yeas>(\d+)<\/yeas>/)?.[1] ?? Number.NaN)
  const nayTotal = Number(xml.match(/<nays>(\d+)<\/nays>/)?.[1] ?? Number.NaN)
  const entries = []

  for (const match of xml.matchAll(
    /<member>[\s\S]*?<last_name>([^<]+)<\/last_name>[\s\S]*?<first_name>([^<]+)<\/first_name>[\s\S]*?<party>([^<]*)<\/party>[\s\S]*?<state>([^<]*)<\/state>[\s\S]*?<vote_cast>([^<]+)<\/vote_cast>[\s\S]*?<\/member>/g,
  )) {
    entries.push({
      cast: match[5].trim(),
      firstName: match[2].trim(),
      lastName: match[1].trim(),
      name: `${match[2].trim()} ${match[1].trim()}`.trim(),
      partyCode: match[3].trim(),
      stateCode: match[4].trim(),
    })
  }

  return {
    billNumber: billNumber || undefined,
    congress: Number.isFinite(congress) ? congress : undefined,
    date,
    entries,
    nayTotal,
    question,
    resultText,
    rollCallNumber: Number.isFinite(rollCallNumber) ? rollCallNumber : undefined,
    session: session || undefined,
    title,
    yeaTotal,
  }
}

function buildLegislativeTrumpLabel(score) {
  if (score >= 8) {
    return 'Very often pro-Trump in scored votes'
  }

  if (score >= 6.5) {
    return 'Mostly pro-Trump in scored votes'
  }

  if (score >= 4.5) {
    return 'Mixed, slight pro-Trump lean'
  }

  if (score >= 2.5) {
    return 'Mixed, slight anti-Trump lean'
  }

  if (score >= 0.5) {
    return 'Usually not pro-Trump in scored votes'
  }

  return 'Never pro-Trump in scored votes'
}

function getLegislativeTrumpConfidence(sampleSize, selectedCount) {
  if (sampleSize >= Math.ceil(selectedCount * 0.5)) {
    return 'High'
  }

  if (sampleSize >= Math.ceil(selectedCount * 0.25)) {
    return 'Medium'
  }

  return 'Low'
}

function isSkippedLegislativeCast(cast) {
  return cast === 'Did Not Vote' || cast === 'Not Voting' || cast === 'Present'
}

function normalizeLegislativeCast(cast) {
  const normalized = cast.trim().toLowerCase()

  if (normalized === 'yea' || normalized === 'aye') {
    return 'yea'
  }

  if (normalized === 'nay' || normalized === 'no') {
    return 'nay'
  }

  return normalized
}

function getLegislativeCastSide(cast) {
  const normalized = normalizeLegislativeCast(cast)

  if (normalized === 'yea' || normalized === 'aye' || normalized === 'guilty') {
    return 'affirmative'
  }

  if (normalized === 'nay' || normalized === 'no' || normalized === 'not guilty') {
    return 'negative'
  }

  return null
}

function resolveWinningLegislativeSide(resultText, yeaTotal, nayTotal) {
  const normalized = (resultText ?? '').replace(/\s+/g, ' ').trim().toLowerCase()
  const negativePatterns = [
    /\bnot guilty\b/,
    /\bacquitted\b/,
    /\bnot agreed(?: to)?\b/,
    /\bnot adopted\b/,
    /\bnot confirmed\b/,
    /\bnot passed\b/,
    /\bnot invoked\b/,
    /\bnot sustained\b/,
    /\brejected\b/,
    /\bfailed\b/,
    /\bdefeated\b/,
  ]
  const affirmativePatterns = [
    /\bagreed(?: to)?\b/,
    /\badopted\b/,
    /\bconfirmed\b/,
    /\bpassed\b/,
    /\binvoked\b/,
    /\bsustained\b/,
    /\bguilty\b/,
    /\bconvicted\b/,
    /\bratified\b/,
  ]

  for (const pattern of negativePatterns) {
    if (pattern.test(normalized)) {
      return 'negative'
    }
  }

  for (const pattern of affirmativePatterns) {
    if (pattern.test(normalized)) {
      return 'affirmative'
    }
  }

  if (Number.isFinite(yeaTotal) && Number.isFinite(nayTotal) && yeaTotal !== nayTotal) {
    return yeaTotal > nayTotal ? 'affirmative' : 'negative'
  }

  return null
}

function deriveTrumpRollCallOutcome(proTrumpCast, resultText, yeaTotal, nayTotal) {
  const trumpSide = getLegislativeCastSide(proTrumpCast)
  const winningSide = resolveWinningLegislativeSide(resultText, yeaTotal, nayTotal)

  if (!trumpSide || !winningSide) {
    return null
  }

  return trumpSide === winningSide ? 'pro' : 'anti'
}

async function buildSelectedLegislativeRollCallSnapshots() {
  const selectedHouseRollCalls = houseTrumpRollCallPool.filter((item) => item.selected)
  const selectedSenateRollCalls = senateTrumpRollCallPool.filter((item) => item.selected)
  const scoredHouseRollCalls = selectedHouseRollCalls.filter((item) => item.scoreIncluded !== false)
  const scoredSenateRollCalls = selectedSenateRollCalls.filter((item) => item.scoreIncluded !== false)
  const selectedRollCalls = [...selectedHouseRollCalls, ...selectedSenateRollCalls]

  const snapshots = await mapWithConcurrency(selectedRollCalls, 8, async (event) => {
    if (event.chamber === 'house') {
      const xmlUrl = buildHouseRollCallXmlUrl(event.year, event.rollNumber)
      const xml = await fetchText(xmlUrl)
      const parsed = parseHouseVoteXml(xml)
      const sourceUrl = buildHouseRollCallPageUrl(event.year, event.rollNumber, parsed.title || event.label)

      return {
        ...event,
        actionTime: parsed.actionTime,
        billNumber: parsed.billNumber,
        congress: parsed.congress,
        date: parsed.date,
        entries: parsed.entries,
        voteEntries: parsed.voteEntries,
        nayTotal: parsed.nayTotal,
        question: parsed.question,
        rollCallNumber: parsed.rollCallNumber,
        session: parsed.session,
        sourceUrl,
        title: parsed.title,
        trumpOutcome: deriveTrumpRollCallOutcome(
          event.proTrumpCast,
          parsed.resultText,
          parsed.yeaTotal,
          parsed.nayTotal,
        ),
        yeaTotal: parsed.yeaTotal,
      }
    }

    const xmlUrl = buildSenateRollCallXmlUrl(event.congress, event.session, event.voteNumber)
    const sourceUrl = buildSenateRollCallPageUrl(event.congress, event.session, event.voteNumber)
    const xml = await fetchText(xmlUrl)
    const parsed = parseSenateVoteXml(xml)

    return {
      ...event,
      billNumber: parsed.billNumber,
      congress: parsed.congress,
      date: parsed.date,
      entries: parsed.entries,
      voteEntries: parsed.entries,
      nayTotal: parsed.nayTotal,
      question: parsed.question,
      rollCallNumber: parsed.rollCallNumber,
      session: parsed.session,
      sourceUrl,
      title: parsed.title,
      trumpOutcome: deriveTrumpRollCallOutcome(
        event.proTrumpCast,
        parsed.resultText,
        parsed.yeaTotal,
        parsed.nayTotal,
      ),
      yeaTotal: parsed.yeaTotal,
    }
  })

  return {
    scoredHouseCount: scoredHouseRollCalls.length,
    scoredSenateCount: scoredSenateRollCalls.length,
    selectedHouseCount: selectedHouseRollCalls.length,
    selectedSenateCount: selectedSenateRollCalls.length,
    snapshots,
  }
}

function buildExecutiveCongressServiceHistoryMap(executivePeople, snapshots) {
  const historyByPersonId = new Map()

  for (const person of executivePeople) {
    const serviceOverrides = executiveCongressServiceOverrides.get(person.id) ?? []

    if (!serviceOverrides.length) {
      continue
    }

    const services = []

    for (const service of serviceOverrides) {
      const serviceVotes = []
      let proCount = 0
      let antiCount = 0
      let missedCount = 0
      let directVoteCount = 0
      let broadVoteCount = 0

      for (const snapshot of snapshots) {
        if (snapshot.chamber !== service.chamber) {
          continue
        }

        if (!isExecutiveServiceActiveOnSnapshot(service, snapshot)) {
          continue
        }

        const matchedEntry = findMatchingExecutiveCongressVoteEntry(
          snapshot.voteEntries ?? [],
          service,
          person.name,
        )

        if (!matchedEntry) {
          continue
        }

        const skipped = isSkippedLegislativeCast(matchedEntry.cast)
        const position = skipped
          ? 'missed'
          : normalizeLegislativeCast(matchedEntry.cast) ===
              normalizeLegislativeCast(snapshot.proTrumpCast)
            ? 'pro'
            : 'anti'

        if (snapshot.scoreIncluded === false) {
          broadVoteCount += 1
        } else {
          directVoteCount += 1
        }

        if (position === 'missed') {
          missedCount += 1
        } else if (snapshot.scoreIncluded !== false) {
          if (position === 'pro') {
            proCount += 1
          } else {
            antiCount += 1
          }
        }

        serviceVotes.push({
          actionTime: snapshot.actionTime,
          billNumber: snapshot.billNumber,
          category: snapshot.category,
          chamber: snapshot.chamber,
          congress: snapshot.congress,
          date: snapshot.date,
          id: snapshot.id,
          label: snapshot.label,
          position,
          proTrumpCast: snapshot.proTrumpCast,
          question: snapshot.question,
          rollCallNumber: snapshot.rollCallNumber,
          scoreIncluded: snapshot.scoreIncluded !== false,
          signalTier: snapshot.signalTier ?? 'high_signal_scored',
          sourceUrl: snapshot.sourceUrl,
          title: snapshot.title,
          trumpOutcome: snapshot.trumpOutcome,
          voteCast: matchedEntry.cast,
        })
      }

      if (!serviceVotes.length) {
        continue
      }

      services.push({
        antiCount,
        broadVoteCount,
        chamber: service.chamber,
        countedVoteCount: proCount + antiCount,
        directVoteCount,
        label: service.label,
        missedCount,
        proCount,
        votes: serviceVotes,
      })
    }

    if (services.length) {
      historyByPersonId.set(person.id, services)
    }
  }

  return historyByPersonId
}

async function buildTrumpRelationshipContext(executivePeople, senators, representatives) {
  const { scoredHouseCount, scoredSenateCount, selectedHouseCount, selectedSenateCount, snapshots } =
    await buildSelectedLegislativeRollCallSnapshots()
  const metricsByPersonId = new Map()
  const executiveCongressHistoryByPersonId = buildExecutiveCongressServiceHistoryMap(
    executivePeople,
    snapshots,
  )
  const allLegislators = [...senators, ...representatives]

  for (const person of allLegislators) {
    metricsByPersonId.set(person.id, {
      antiVotes: 0,
      availableEvents: person.sectionId === 'senate' ? scoredSenateCount : scoredHouseCount,
      chamber: person.sectionId,
      evidence: [],
      missedCount: 0,
      notInOfficeCount: 0,
      proVotes: 0,
      rollCallPositions: {},
      sampleSize: 0,
    })
  }

  for (const snapshot of snapshots) {
    if (snapshot.chamber === 'house') {
      for (const person of representatives) {
        const cast = getGuardedHouseCastForRepresentative(snapshot.entries, person)
        const metrics = metricsByPersonId.get(person.id)

        if (!metrics) {
          continue
        }

        if (!cast) {
          metrics.rollCallPositions[snapshot.id] = 'not_in_office'
          if (snapshot.scoreIncluded !== false) {
            metrics.notInOfficeCount += 1
          }
          continue
        }

        if (isSkippedLegislativeCast(cast)) {
          metrics.rollCallPositions[snapshot.id] = 'missed'
          if (snapshot.scoreIncluded !== false) {
            metrics.missedCount += 1
          }
          continue
        }

        const isProTrump =
          normalizeLegislativeCast(cast) === normalizeLegislativeCast(snapshot.proTrumpCast)
        metrics.rollCallPositions[snapshot.id] = isProTrump ? 'pro' : 'anti'

        if (snapshot.scoreIncluded === false) {
          continue
        }

        if (isProTrump) {
          metrics.proVotes += 1
        } else {
          metrics.antiVotes += 1
        }

        metrics.sampleSize += 1

        if (snapshot.highlight && metrics.evidence.length < 4) {
          metrics.evidence.push(
            `${snapshot.label}: ${cast} (${isProTrump ? 'pro-Trump side' : 'not pro-Trump side'}).`,
          )
        }
      }

      continue
    }

    for (const person of senators) {
      const metrics = metricsByPersonId.get(person.id)

      if (!metrics) {
        continue
      }

      const matched = getMatchedSenateVoteEntryForPerson(snapshot.entries, person, snapshot.id)
      const matchedEntry = matched?.entry

      if (!matchedEntry) {
        metrics.rollCallPositions[snapshot.id] = 'not_in_office'
        if (snapshot.scoreIncluded !== false) {
          metrics.notInOfficeCount += 1
        }
        continue
      }

      if (isSkippedLegislativeCast(matchedEntry.cast)) {
        metrics.rollCallPositions[snapshot.id] = 'missed'
        if (snapshot.scoreIncluded !== false) {
          metrics.missedCount += 1
        }
        continue
      }

      const isProTrump =
        normalizeLegislativeCast(matchedEntry.cast) ===
        normalizeLegislativeCast(snapshot.proTrumpCast)
      metrics.rollCallPositions[snapshot.id] = isProTrump ? 'pro' : 'anti'

      if (snapshot.scoreIncluded === false) {
        continue
      }

      if (isProTrump) {
        metrics.proVotes += 1
      } else {
        metrics.antiVotes += 1
      }

      metrics.sampleSize += 1

      if (snapshot.highlight && metrics.evidence.length < 4) {
        metrics.evidence.push(
          `${snapshot.label}: ${matchedEntry.cast} (${isProTrump ? 'pro-Trump side' : 'not pro-Trump side'}).`,
        )
      }
    }
  }

  return {
    executiveCongressHistoryByPersonId,
    legislativeMetricsByPersonId: metricsByPersonId,
    legislativeRollCallSummary: {
      houseCandidateCount: houseTrumpRollCallPool.length,
      houseScoredCount: scoredHouseCount,
      houseSelectedCount: selectedHouseCount,
      selectedEvents: snapshots.map((snapshot) => ({
        actionTime: snapshot.actionTime,
        billNumber: snapshot.billNumber,
        category: snapshot.category,
        chamber: snapshot.chamber,
        congress: snapshot.congress,
        date: snapshot.date,
        id: snapshot.id,
        label: snapshot.label,
        nayTotal: snapshot.nayTotal,
        proTrumpCast: snapshot.proTrumpCast,
        question: snapshot.question,
        rollCallNumber: snapshot.rollCallNumber,
        scoreIncluded: snapshot.scoreIncluded !== false,
        session: snapshot.session,
        signalTier: snapshot.signalTier ?? 'high_signal_scored',
        sourceUrl: snapshot.sourceUrl,
        title: snapshot.title,
        trumpOutcome: snapshot.trumpOutcome,
        yeaTotal: snapshot.yeaTotal,
      })),
      senateCandidateCount: senateTrumpRollCallPool.length,
      senateScoredCount: scoredSenateCount,
      senateSelectedCount: selectedSenateCount,
    },
  }
}

function finalizeTrumpAnnotation(person, score, note, evidence) {
  const finalScore = clampTrumpScore(score)

  return {
    ...person,
    trumpEvidence: uniqueStrings(evidence),
    trumpLabel: trumpLabelFromScore(finalScore),
    trumpNote: note,
    trumpScore: finalScore,
  }
}

function extractExecutiveTrumpEvidence(person) {
  const evidence = []

  if (person.name === 'Donald J. Trump') {
    return evidence
  }

  if (person.title === 'Vice President of the United States') {
    evidence.push('Current vice president.')
  } else {
    evidence.push('Serving in Trump’s current administration.')
  }

  if (/Trump-Vance Transition Team/i.test(person.description)) {
    evidence.push('Held a senior role on the Trump-Vance transition team during the 2024 campaign.')
  }

  if (/served in President Donald Trump’s Cabinet/i.test(person.description)) {
    evidence.push('Previously served in Trump’s first cabinet.')
  }

  if (/America First Policy Institute/i.test(person.description)) {
    evidence.push('Worked at the America First Policy Institute between Trump terms.')
  }

  return evidence
}

function buildExecutiveTrumpNote(person, evidence) {
  if (person.name === 'Donald J. Trump') {
    return 'Trump is the reference point for the relationship scale, so the score is fixed at 10.'
  }

  if (person.name === 'J.D. Vance') {
    return 'The vice presidency and the 2024 ticket make this one of the clearest high-alignment cases in the entire dataset.'
  }

  if (person.sectionId === 'independent-agencies') {
    if (/acting|interim|performing the duties/i.test(person.title)) {
      return 'This profile is tied to an acting or interim independent-agency leadership role, so the score stays in the middle range unless there is a clearer direct Trump appointment path.'
    }

    if (/board member|vice chair|vice chairman/i.test(person.title)) {
      return 'This profile tracks a current senior official in an independent agency, but not a full White House or cabinet-style role, so the score stays modest.'
    }

    if (person.appointedBy === 'Donald J. Trump' || person.alignment === 'republican') {
      return 'A direct Trump appointment path pushes this independent-agency score above the middle range, while still stopping short of White House or cabinet inner-circle status.'
    }

    return 'Independent agencies sit at some formal distance from the White House, so the default score stays near the middle unless there is a stronger direct Trump-specific link.'
  }

  if (evidence.length > 1) {
    return 'Current service in Trump’s administration plus earlier Trump-linked roles push this estimate close to the top of the scale.'
  }

  return 'Current service in Trump’s administration is the clearest factual tie in this dataset, so the score stays high without claiming personal friendship.'
}

function buildExecutiveCongressTrumpRelationship(person, context) {
  const services = context.executiveCongressHistoryByPersonId?.get(person.id) ?? []

  if (!services.length) {
    return null
  }

  let proVotes = 0
  let antiVotes = 0
  let missedCount = 0
  let directVoteCount = 0
  let broadVoteCount = 0
  const chambers = new Set()

  for (const service of services) {
    proVotes += service.proCount
    antiVotes += service.antiCount
    missedCount += service.missedCount
    directVoteCount += service.directVoteCount
    broadVoteCount += service.broadVoteCount
    chambers.add(service.chamber)
  }

  const sampleSize = proVotes + antiVotes

  if (sampleSize === 0) {
    return null
  }

  const availableEvents = [...chambers].reduce((total, chamber) => {
    if (chamber === 'senate') {
      return total + (context.legislativeRollCallSummary?.senateScoredCount ?? 0)
    }

    return total + (context.legislativeRollCallSummary?.houseScoredCount ?? 0)
  }, 0)
  const confidence = getLegislativeTrumpConfidence(sampleSize, availableEvents || sampleSize)
  const derivedScore = clampTrumpScoreToSingleDecimal((proVotes / sampleSize) * 10)
  const chamberLabel =
    chambers.size > 1 ? 'House and Senate' : chambers.has('senate') ? 'Senate' : 'House'
  const noteParts = [
    `Score is derived from selected Trump-linked ${chamberLabel} roll calls on this site during this official's time in Congress: ${proVotes}/${sampleSize} counted votes on Trump's side, converted to ${derivedScore.toFixed(1)}/10.`,
  ]

  if (missedCount > 0) {
    noteParts.push(`Missed ${missedCount} direct votes.`)
  }

  if (broadVoteCount > 0) {
    noteParts.push(`${broadVoteCount} broader unscored votes are listed separately below.`)
  }

  const evidence = [
    `${proVotes} Pro Trump votes and ${antiVotes} Not pro Trump votes across ${sampleSize} counted ${chamberLabel} votes during this official's past service in Congress.`,
    `Sample size: ${sampleSize}${availableEvents ? ` of ${availableEvents}` : ''} selected scored votes. Confidence: ${confidence}.`,
  ]

  if (missedCount > 0) {
    evidence.push(`Missed or abstained on ${missedCount} direct votes in the listed record.`)
  }

  if (broadVoteCount > 0) {
    evidence.push(`${broadVoteCount} broader, unscored Trump-linked votes are also listed in the congressional history section.`)
  }

  return {
    ...person,
    trumpAntiCount: antiVotes,
    trumpAvailableEvents: availableEvents || undefined,
    trumpConfidence: confidence,
    trumpEvidence: uniqueStrings(evidence),
    trumpLabel: buildLegislativeTrumpLabel(derivedScore),
    trumpMissedCount: missedCount,
    trumpProCount: proVotes,
    trumpSampleSize: sampleSize,
    trumpNote: noteParts.join(' '),
    trumpScore: derivedScore,
  }
}

function annotateExecutiveTrumpRelationship(person, context) {
  const override = trumpManualOverrides.get(person.name)

  if (override) {
    return finalizeTrumpAnnotation(person, override.score, override.note, override.evidence)
  }

  const congressVoteBasedAnnotation = buildExecutiveCongressTrumpRelationship(person, context)

  if (congressVoteBasedAnnotation) {
    return congressVoteBasedAnnotation
  }

  const evidence = extractExecutiveTrumpEvidence(person)

  if (person.sectionId === 'independent-agencies') {
    let score = 5

    if (person.appointedBy === 'Donald J. Trump' || person.alignment === 'republican') {
      score = 7
    }

    if (/acting|interim|performing the duties/i.test(person.title)) {
      score = Math.min(score, 4)
    }

    if (/board member|vice chair|vice chairman/i.test(person.title)) {
      score = Math.min(score, 3)
    }

    return finalizeTrumpAnnotation(person, score, buildExecutiveTrumpNote(person, evidence), evidence)
  }

  const score = person.title === 'Vice President of the United States' ? 10 : 9

  return finalizeTrumpAnnotation(person, score, buildExecutiveTrumpNote(person, evidence), evidence)
}

function annotateJudicialTrumpRelationship(person) {
  let proVotes = 0
  let antiVotes = 0
  let notOnCourt = 0
  const caseCount = supremeCourtTrumpAdministrationCases.length

  for (const caseItem of supremeCourtTrumpAdministrationCases) {
    const stance = caseItem.justiceStances[person.id]

    if (stance === 'pro') {
      proVotes += 1
    } else if (stance === 'anti') {
      antiVotes += 1
    } else if (stance === 'not_on_court') {
      notOnCourt += 1
    }
  }

  const countedVotes = proVotes + antiVotes
  const derivedScore = countedVotes === 0 ? 0 : clampTrumpScoreToSingleDecimal((proVotes / countedVotes) * 10)
  const evidence = [
    `${proVotes} Pro Trump votes and ${antiVotes} Not pro Trump votes across the ${caseCount} selected Administration Cases on this site.`,
  ]
  const trumpAppointment = supremeCourtTrumpFacts.get(person.name)

  if (notOnCourt > 0) {
    evidence.push(`Not on Court for ${notOnCourt} of the ${caseCount} selected Administration Cases on this site.`)
  }

  if (trumpAppointment) {
    evidence.push(trumpAppointment.note)
  }

  return {
    ...person,
    trumpEvidence: uniqueStrings(evidence),
    trumpLabel: judicialTrumpLabelFromScore(derivedScore),
    trumpNote: `Score is derived from the ${caseCount} selected Administration Cases on this site: ${proVotes}/${countedVotes} counted votes on Trump's side, converted to ${derivedScore.toFixed(1)}/10.`,
    trumpScore: derivedScore,
  }
}

function getLegislativeLeadershipEvidence(person) {
  const houseFact = houseLeadershipFacts.get(person.name)

  if (houseFact) {
    return houseFact
  }

  if (!person.leadership) {
    return null
  }

  const delta = /Leader|Speaker/i.test(person.leadership) ? 2 : /Whip|Conference/i.test(person.leadership) ? 1 : 0

  return {
    delta,
    text: `${person.leadership}.`,
  }
}

function buildLegislativeTrumpNote(person, flags) {
  if (flags.jan6Objector && flags.leadership && person.partyCode === 'R') {
    return 'Republican leadership status plus a January 6, 2021 Electoral College objection place this member near the top of Trump’s congressional coalition.'
  }

  if (flags.convictedOrImpeached && flags.leadership && person.partyCode === 'D') {
    return 'Current Democratic leadership plus a 2021 impeachment vote place this member in the institutional opposition to Trump.'
  }

  if (flags.convictedOrImpeached) {
    return person.partyCode === 'R'
      ? 'This member broke with Trump on a defining post-January 6, 2021 impeachment vote, which pulls the score below most current Republicans.'
      : 'This member was on the anti-Trump side of the 2021 impeachment process, reinforcing an already oppositional political position.'
  }

  if (flags.jan6Objector) {
    return 'Support for a January 6, 2021 objection to counting Electoral College votes is treated here as a concrete sign of alignment with Trump at a pivotal moment.'
  }

  if (flags.leadership && person.partyCode === 'R') {
    return 'Current Republican leadership status places this member close to Trump’s governing coalition, though the score is about public alignment rather than private loyalty.'
  }

  if (flags.leadership && person.partyCode === 'D') {
    return 'Current Democratic leadership status places this member in the institutional opposition to Trump.'
  }

  if (flags.no2021VoteRecord) {
    return 'This member was not serving for the 2021 Trump-related votes used in this model, so the estimate leans more on current party and leadership than on a longer shared history.'
  }

  if (person.partyCode === 'R') {
    return 'No stronger Trump-specific break or tie surfaced in this lightweight model, so the estimate mostly reflects current Republican coalition membership.'
  }

  if (person.partyCode === 'D') {
    return 'No stronger Trump-specific role surfaced in this lightweight model, so the estimate mostly reflects current Democratic opposition.'
  }

  return 'This member sits outside Trump’s party coalition, but without enough direct Trump-specific history in the model to push the score lower.'
}

function annotateLegislativeTrumpRelationship(person, context) {
  const metrics = context.legislativeMetricsByPersonId.get(person.id)

  if (!metrics) {
    return finalizeTrumpAnnotation(person, 0, 'No high-signal scored Trump-linked legislative votes were available for this member in the current model.', [])
  }

  const derivedScore =
    metrics.sampleSize === 0
      ? 0
      : clampTrumpScoreToSingleDecimal((metrics.proVotes / metrics.sampleSize) * 10)
  const confidence = getLegislativeTrumpConfidence(metrics.sampleSize, metrics.availableEvents)
  const noteParts = [
    `Score is derived from high-signal scored ${person.sectionId === 'senate' ? 'Senate' : 'House'} roll calls on this site: ${metrics.proVotes}/${metrics.sampleSize} counted votes on Trump's side, converted to ${derivedScore.toFixed(1)}/10.`,
  ]

  const evidence = [
    `${metrics.proVotes} Pro Trump votes and ${metrics.antiVotes} Not pro Trump votes across ${metrics.sampleSize} counted high-signal scored ${person.sectionId === 'senate' ? 'Senate' : 'House'} roll calls.`,
    `Sample size: ${metrics.sampleSize} of ${metrics.availableEvents} high-signal scored votes. Confidence: ${confidence}.`,
  ]

  evidence.push(...metrics.evidence)

  return {
    ...person,
    trumpAntiCount: metrics.antiVotes,
    trumpAvailableEvents: metrics.availableEvents,
    trumpConfidence: confidence,
    trumpEvidence: uniqueStrings(evidence),
    trumpLabel: buildLegislativeTrumpLabel(derivedScore),
    trumpMissedCount: metrics.missedCount,
    trumpNote: noteParts.join(' '),
    trumpNotInOfficeCount: metrics.notInOfficeCount,
    trumpProCount: metrics.proVotes,
    trumpRollCallPositions: metrics.rollCallPositions,
    trumpSampleSize: metrics.sampleSize,
    trumpScore: derivedScore,
  }
}

function annotateExecutiveCongressHistory(person, context) {
  if (person.branchId !== 'executive') {
    return person
  }

  const history = context.executiveCongressHistoryByPersonId?.get(person.id)

  if (!history?.length) {
    return person
  }

  return {
    ...person,
    executiveCongressServiceHistory: history,
  }
}

function annotateTrumpProximity(person, context) {
  if (person.branchId === 'executive') {
    return annotateExecutiveTrumpRelationship(person, context)
  }

  if (person.branchId === 'judicial') {
    return annotateJudicialTrumpRelationship(person)
  }

  if (person.branchId === 'legislative') {
    return annotateLegislativeTrumpRelationship(person, context)
  }

  return finalizeTrumpAnnotation(person, 5, 'Fallback editorial estimate.', [])
}

function finalizeSalary(person, amount, note, sourceLabel, sourceUrl) {
  return {
    ...person,
    salaryAmount: amount,
    salaryNote: note,
    salarySourceLabel: sourceLabel,
    salarySourceUrl: sourceUrl,
  }
}

function getCurrentSenateSeatCycleLabel(senateClass, referenceDate = new Date()) {
  const termStartRemainders = {
    'Class I': 3,
    'Class II': 5,
    'Class III': 1,
  }
  const remainder = termStartRemainders[senateClass]

  if (remainder === undefined) {
    return null
  }

  let year = referenceDate.getUTCFullYear()
  while ((year % 6 + 6) % 6 !== remainder) {
    year -= 1
  }

  return `${year}-${year + 6}`
}

function annotateSalary(person) {
  if (person.branchId === 'executive') {
    if (person.name === 'Donald J. Trump') {
      return finalizeSalary(
        person,
        '$400,000',
        'The statutory presidential salary is $400,000 per year, plus a $50,000 expense allowance.',
        'President compensation statute',
        PRESIDENT_SALARY_SOURCE_URL,
      )
    }

    if (person.title === 'Vice President of the United States') {
      return finalizeSalary(
        person,
        '$235,100',
        'The payable 2026 vice presidential salary is frozen at $235,100 under current OPM guidance for covered senior political officials.',
        SENIOR_POLITICAL_PAY_FREEZE_SOURCE_LABEL,
        SENIOR_POLITICAL_PAY_FREEZE_SOURCE_URL,
      )
    }

    const independentAgencyOverride = independentAgencySalaryOverrides.get(person.name)

    if (independentAgencyOverride) {
      return finalizeSalary(
        person,
        independentAgencyOverride.amount,
        independentAgencyOverride.note,
        '2026 Executive Schedule rates',
        EXECUTIVE_SCHEDULE_2026_SOURCE_URL,
      )
    }

    return finalizeSalary(
      person,
      '$203,500',
      'The payable 2026 rate for Executive Schedule Level I positions held by covered senior political appointees is frozen at $203,500.',
      SENIOR_POLITICAL_PAY_FREEZE_SOURCE_LABEL,
      SENIOR_POLITICAL_PAY_FREEZE_SOURCE_URL,
    )
  }

  if (person.branchId === 'judicial') {
    if (/Chief Justice/i.test(person.title)) {
      return finalizeSalary(
        person,
        '$320,700',
        'The 2026 salary for the chief justice is $320,700 per year.',
        'Judicial compensation',
        JUDICIAL_SALARY_SOURCE_URL,
      )
    }

    return finalizeSalary(
      person,
      '$306,600',
      'The 2026 salary for an associate justice is $306,600 per year.',
      'Judicial compensation',
      JUDICIAL_SALARY_SOURCE_URL,
    )
  }

  if (person.branchId === 'legislative') {
    if (person.sectionId === 'senate') {
      const override = person.leadership ? senateLeadershipSalaryOverrides.get(person.leadership) : null

      if (override) {
        return finalizeSalary(
          person,
          override.amount,
          override.note,
          'Senate salary history and current pay',
          SENATE_SALARY_SOURCE_URL,
        )
      }

      return finalizeSalary(
        person,
        '$174,000',
        'The current annual salary for senators is $174,000.',
        'Senate salary history and current pay',
        SENATE_SALARY_SOURCE_URL,
      )
    }

    if (person.sectionId === 'house') {
      const override = houseSalaryOverrides.get(person.name)

      if (override) {
        return finalizeSalary(
          person,
          override.amount,
          override.note,
          'CRS report on congressional salaries',
          HOUSE_SALARY_SOURCE_URL,
        )
      }

      return finalizeSalary(
        person,
        '$174,000',
        'The current annual salary for House members, delegates, and the resident commissioner is $174,000.',
        'CRS report on congressional salaries',
        HOUSE_SALARY_SOURCE_URL,
      )
    }
  }

  return person
}

function annotateDepartmentBudget(person) {
  if (person.sectionId !== 'cabinet' || !person.department) {
    return person
  }

  const budget = manualDepartmentBudgetsByDepartment[person.department]

  if (!budget) {
    return person
  }

  return {
    ...person,
    departmentBudgetDiscretionaryAmount: budget.discretionaryAmount,
    departmentBudgetDiscretionaryLabel: budget.discretionaryLabel,
    departmentBudgetNote: budget.note,
    departmentBudgetSourceLabel: budget.sourceLabel,
    departmentBudgetSourceUrl: budget.sourceUrl,
    departmentBudgetTotalAmount: budget.totalAmount,
    departmentBudgetTotalLabel: budget.totalLabel,
  }
}

function annotateIndependentAgencyBudget(person) {
  if (person.sectionId !== 'independent-agencies' || !person.department) {
    return person
  }

  const budget = manualIndependentAgencyBudgetsByDepartment[person.department]

  if (!budget) {
    return person
  }

  return {
    ...person,
    agencyBudgetAmount: budget.amount,
    agencyBudgetLabel: budget.label,
    agencyBudgetNote: budget.note,
    agencyBudgetSourceLabel: budget.sourceLabel,
    agencyBudgetSourceUrl: budget.sourceUrl,
    agencyFundingModel: budget.fundingModel,
  }
}

function joinList(items) {
  if (items.length <= 1) {
    return items[0] ?? ''
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`
  }

  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`
}

function getDisclosureSearchHint(name) {
  return stripDiacritics(name)
    .replace(/\b(Jr|Sr)\.?\b/gi, ' ')
    .replace(/\bII|III|IV|V\b/g, ' ')
    .replace(/[^A-Za-z\s-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .at(-1)
}

function annotateFinancialDisclosure(person) {
  const naming = resolvePersonNaming(person)
  const searchHint = getDisclosureSearchHint(
    naming.financialDisclosureSearchLastName ||
      naming.financialDisclosureSearchName ||
      naming.displayName,
  )
  const personWithNaming = {
    ...person,
    aliases: naming.aliases,
    displayName: naming.displayName,
    financialDisclosureSearchLastName: naming.financialDisclosureSearchLastName,
    financialDisclosureSearchName: naming.financialDisclosureSearchName,
    officialName: naming.officialName,
  }

  if (person.branchId === 'executive') {
    return {
      ...personWithNaming,
      financialDisclosureLabel: 'OGE disclosure portal',
      financialDisclosureSearchHint: searchHint,
      financialDisclosureUrl:
        'https://www.oge.gov/Web/OGE.nsf/Officials%20Individual%20Disclosures%20Search%20Collection?OpenForm=',
    }
  }

  if (person.sectionId === 'senate') {
    return {
      ...personWithNaming,
      financialDisclosureLabel: 'Senate eFD search',
      financialDisclosureNote: searchHint
        ? `Search ${searchHint} in the Senate eFD system for annual filings and periodic transaction reports.`
        : 'Use the Senate eFD system for annual filings and periodic transaction reports.',
      financialDisclosureSearchHint: searchHint,
      financialDisclosureUrl: 'https://efdsearch.senate.gov/search/home/',
    }
  }

  if (person.sectionId === 'house') {
    return {
      ...personWithNaming,
      financialDisclosureLabel: 'House disclosure search',
      financialDisclosureNote: searchHint
        ? `Search ${searchHint} in the House Clerk database and choose the filing year.`
        : 'Use the House Clerk database and choose the filing year.',
      financialDisclosureSearchHint: searchHint,
      financialDisclosureUrl: 'https://disclosures-clerk.house.gov/FinancialDisclosure',
    }
  }

  if (person.branchId === 'judicial') {
    return {
      ...personWithNaming,
      financialDisclosureLabel: 'Judicial disclosure database',
      financialDisclosureNote:
        'Annual disclosure report links here are local mirrors of the official judiciary PDFs, because the federal judiciary portal requires an entry form before opening reports.',
      financialDisclosureSearchHint: searchHint,
      financialDisclosureUrl: 'https://pub.jefs.uscourts.gov/',
    }
  }

  return personWithNaming
}

function annotateDerivedHoldingEstimates(person) {
  if (!person.topHoldings?.length) {
    return person
  }

  return {
    ...person,
    topHoldings: person.topHoldings.map((holding) => {
      const derivedFields = SEC_DERIVED_HOLDING_ESTIMATES.get(`${person.id}|${holding.label}`)
      return derivedFields ? { ...holding, ...derivedFields } : holding
    }),
  }
}

function parseStateDistrict(value) {
  const cleaned = value.replace(/\s+/g, ' ').trim()
  const match = cleaned.match(
    /^(.*?)(?:\s+(At Large|Delegate|Resident Commissioner|\d+(?:st|nd|rd|th)))$/,
  )

  if (!match) {
    return { district: '', state: cleaned }
  }

  return {
    district: match[2],
    state: match[1],
  }
}

async function fetchText(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(15000),
    }).catch(() => null)

    if (response?.ok) {
      return response.text()
    }

    if (response && ![403, 429].includes(response.status) && response.status < 500) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)))
  }

  throw new Error(`Failed to fetch ${url} after retries`)
}

function buildNameTokenInfo(name) {
  const tokens = name
    .toLowerCase()
    .replace(/\b(jr|jr\.|sr|sr\.|ii|iii|iv|v)\b/g, ' ')
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  return {
    compact: tokens.join(''),
    first: tokens[0] ?? '',
    givenNames: tokens.slice(0, -1).join(''),
    initials: tokens.map((token) => token[0]).join(''),
    last: tokens.at(-1) ?? '',
    tokens,
  }
}

function normalizeXUrl(rawUrl) {
  if (!rawUrl) {
    return null
  }

  const cleaned = decodeHtml(rawUrl)
    .replace(/\\u002f/gi, '/')
    .replace(/\\\//g, '/')
    .trim()
    .replace(/^[('"`\s]+/, '')
    .replace(/[)"'`,.;\s]+$/, '')

  const withProtocol = cleaned.startsWith('//')
    ? `https:${cleaned}`
    : /^https?:\/\//i.test(cleaned)
      ? cleaned
      : `https://${cleaned}`

  let parsed

  try {
    parsed = new URL(withProtocol)
  } catch {
    return null
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '')

  if (hostname !== 'twitter.com' && hostname !== 'x.com' && hostname !== 'mobile.twitter.com') {
    return null
  }

  const segments = parsed.pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)

  const handle = segments[0]?.replace(/^@/, '')

  if (!handle) {
    return null
  }

  if (
    ['compose', 'explore', 'hashtag', 'home', 'i', 'intent', 'messages', 'search', 'share'].includes(
      handle.toLowerCase(),
    )
  ) {
    return null
  }

  if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) {
    return null
  }

  return `https://x.com/${handle}`
}

function extractXCandidates(html) {
  const normalizedHtml = html
    .replace(/\\u002f/gi, '/')
    .replace(/\\\//g, '/')
    .replace(/&#x2f;/gi, '/')
    .replace(/&#47;/g, '/')

  const directMatches = [
    ...normalizedHtml.matchAll(/(?:https?:)?\/\/(?:www\.)?(?:twitter|x)\.com\/[^"'`\s<>()\\]+/gi),
  ].map((match) => match[0])

  const encodedMatches = [
    ...normalizedHtml.matchAll(
      /https?:%2f%2f(?:www\.)?(?:twitter|x)\.com%2f[^"'`\s<>()\\]+/gi,
    ),
  ]
    .map((match) => {
      try {
        return decodeURIComponent(match[0])
      } catch {
        return null
      }
    })
    .filter(Boolean)

  return [...new Set([...directMatches, ...encodedMatches].map(normalizeXUrl).filter(Boolean))]
}

function buildUrlVariants(url) {
  try {
    const parsed = new URL(url)
    const variants = [parsed.toString()]

    if (parsed.hostname.startsWith('www.')) {
      const alternate = new URL(parsed)
      alternate.hostname = parsed.hostname.replace(/^www\./, '')
      variants.push(alternate.toString())
    } else if (/\.(?:house|senate)\.gov$/i.test(parsed.hostname)) {
      const alternate = new URL(parsed)
      alternate.hostname = `www.${parsed.hostname}`
      variants.push(alternate.toString())
    }

    return [...new Set(variants)]
  } catch {
    return [url]
  }
}

async function fetchOptionalText(url) {
  const variants = buildUrlVariants(url)

  for (const variant of variants) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(variant, {
          headers: REQUEST_HEADERS,
          signal: AbortSignal.timeout(12000),
        })

        if (!response.ok) {
          if (response.status >= 500 || response.status === 429) {
            await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)))
            continue
          }

          break
        }

        return await response.text()
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)))
      }
    }
  }

  return null
}

function isInstitutionalXHandle(handle, person, tokenInfo) {
  if (genericXHandles.has(handle)) {
    return true
  }

  const signals = [
    tokenInfo.last,
    tokenInfo.first.length >= 3 ? tokenInfo.first : '',
    tokenInfo.givenNames.length >= 2 ? tokenInfo.givenNames : '',
    tokenInfo.initials.length >= 2 ? tokenInfo.initials : '',
  ].filter(Boolean)

  const hasNameSignal = signals.some((signal) => handle.includes(signal))

  if (hasNameSignal) {
    return false
  }

  if (
    /(committee|congress|dems|democrats|gop|house|judiciary|office|press|republicans|senate|whitehouse)/.test(
      handle,
    )
  ) {
    return true
  }

  if (person.branchId === 'executive' && /(gov|policy|press|staff|team)/.test(handle)) {
    return true
  }

  return false
}

function scoreXCandidate(person, url) {
  const handle = url.split('/').at(-1)?.toLowerCase() ?? ''
  const tokenInfo = buildNameTokenInfo(person.name)

  if (!handle || isInstitutionalXHandle(handle, person, tokenInfo)) {
    return -100
  }

  let score = 0

  if (tokenInfo.compact && handle.includes(tokenInfo.compact)) {
    score += 12
  }

  if (tokenInfo.last && handle.includes(tokenInfo.last)) {
    score += 7
  }

  if (tokenInfo.first.length >= 3 && handle.includes(tokenInfo.first)) {
    score += 3
  }

  if (tokenInfo.givenNames.length >= 2 && handle.includes(tokenInfo.givenNames)) {
    score += 4
  }

  if (tokenInfo.initials.length >= 2 && handle.includes(tokenInfo.initials)) {
    score += 2
  }

  if (/^(rep|sen|speaker|sec|secretary|ag|judge|justice|gov|potus|vp)/.test(handle)) {
    score += 1
  }

  if (person.sectionId === 'house' && /^rep/.test(handle)) {
    score += 2
  }

  if (person.sectionId === 'senate' && /^sen/.test(handle)) {
    score += 2
  }

  if (person.branchId === 'executive' && /^(potus|president|sec|vp)/.test(handle)) {
    score += 2
  }

  return score
}

function chooseBestXUrl(person, candidates) {
  if (candidates.length === 0) {
    return undefined
  }

  const scoredCandidates = candidates
    .map((url) => ({
      score: scoreXCandidate(person, url),
      url,
    }))
    .sort((left, right) => right.score - left.score || left.url.localeCompare(right.url))

  const bestCandidate = scoredCandidates[0]
  const secondCandidate = scoredCandidates[1]

  if (!bestCandidate) {
    return undefined
  }

  if (bestCandidate.score < 1) {
    return undefined
  }

  if (secondCandidate && bestCandidate.score === secondCandidate.score && bestCandidate.score < 8) {
    return undefined
  }

  return bestCandidate.url
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length)
  let currentIndex = 0

  async function worker() {
    while (true) {
      const index = currentIndex
      currentIndex += 1

      if (index >= items.length) {
        return
      }

      results[index] = await mapper(items[index], index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, () => worker()),
  )

  return results
}

async function enrichPeopleWithXUrls(people) {
  const skipExternalXFetch = process.env.SKIP_X_FETCH === '1'
  const enrichedPeople = await mapWithConcurrency(people, 10, async (person) => {
    if (manualXUrlSuppressions.has(person.name)) {
      return person
    }

    const override = manualXUrlOverrides.get(person.name)
    const cachedPerson =
      previousPeopleById.get(person.id) ??
      (person.website ? previousPeopleByWebsite.get(person.website) : undefined)

    if (override) {
      return {
        ...person,
        xUrl: override,
      }
    }

    if (!skipExternalXFetch) {
      const urlsToCheck = [...new Set([person.website, person.sourceUrl].filter(Boolean))]

      for (const url of urlsToCheck) {
        const html = await fetchOptionalText(url)

        if (!html) {
          continue
        }

        const bestXUrl = chooseBestXUrl(person, extractXCandidates(html))

        if (bestXUrl) {
          return {
            ...person,
            xUrl: bestXUrl,
          }
        }
      }
    }

    return cachedPerson?.xUrl
      ? {
          ...person,
          xUrl: cachedPerson.xUrl,
        }
      : person
  })

  const xCount = enrichedPeople.filter((person) => person.xUrl).length
  const legislativeXCount = enrichedPeople.filter(
    (person) => person.branchId === 'legislative' && person.xUrl,
  ).length

  console.log(`Attached ${xCount} X profiles total, including ${legislativeXCount} lawmakers.`)

  return enrichedPeople
}

function getCachedLegislativeFinancials(person) {
  const cachedPerson =
    previousPeopleById.get(person.id) ??
    (person.website ? previousPeopleByWebsite.get(person.website) : undefined)

  if (!cachedPerson) {
    return {}
  }

  return {
    financialAnnualReportUrl: cachedPerson.financialAnnualReportUrl,
    financialAnnualReportLabel: cachedPerson.financialAnnualReportLabel,
    financialFilingDate: cachedPerson.financialFilingDate,
    liabilities: cachedPerson.liabilities,
    recentTrades: cachedPerson.recentTrades,
    topHoldings: cachedPerson.topHoldings,
  }
}

function getCachedExecutiveFinancials(person) {
  const cachedPerson =
    previousPeopleById.get(person.id) ??
    (person.website ? previousPeopleByWebsite.get(person.website) : undefined)

  if (!cachedPerson) {
    return {}
  }

  return {
    financialAnnualReportUrl: cachedPerson.financialAnnualReportUrl,
    financialAnnualReportLabel: cachedPerson.financialAnnualReportLabel,
    financialFilingDate: cachedPerson.financialFilingDate,
    liabilities: cachedPerson.liabilities,
    recentTrades: cachedPerson.recentTrades,
    topHoldings: cachedPerson.topHoldings,
  }
}

function getCachedBackground(person) {
  const cachedPerson =
    previousPeopleById.get(person.id) ??
    (person.website ? previousPeopleByWebsite.get(person.website) : undefined)

  if (!cachedPerson) {
    return {}
  }

  return {
    birthDate: cachedPerson.birthDate,
    birthYear: cachedPerson.birthYear,
    careerHistory: cachedPerson.careerHistory,
    education: cachedPerson.education,
    highestDegree: cachedPerson.highestDegree,
    highestEducationField: cachedPerson.highestEducationField,
    highestEducationSchool: cachedPerson.highestEducationSchool,
    imageUrl: cachedPerson.imageUrl,
  }
}

async function enrichPeopleWithExecutiveFinancials(people) {
  const executivePeople = people.filter((person) => person.branchId === 'executive')

  if (executivePeople.length === 0) {
    return people
  }

  let financialDetailsById = {}

  try {
    const rawOutput = execFileSync(
      'python3',
      [resolve(__dirname, './fetch_executive_finance.py')],
      {
        cwd: resolve(__dirname, '..'),
        encoding: 'utf8',
        input: JSON.stringify({ people: executivePeople }),
        maxBuffer: 32 * 1024 * 1024,
      },
    )

    financialDetailsById = JSON.parse(rawOutput)
  } catch (error) {
    console.warn('Executive finance enrichment failed, using cached values when available.')
    console.warn(error instanceof Error ? error.message : error)
  }

  return people.map((person) => {
    if (person.branchId !== 'executive') {
      return person
    }

    const fetchedDetails = financialDetailsById[person.id] ?? {}
    const cachedDetails = getCachedExecutiveFinancials(person)

    return {
      ...person,
      ...cachedDetails,
      ...fetchedDetails,
    }
  })
}

async function enrichPeopleWithLegislativeFinancials(people) {
  const legislativePeople = people.filter((person) => person.branchId === 'legislative')

  if (legislativePeople.length === 0) {
    return people
  }

  let financialDetailsById = {}

  try {
    const rawOutput = execFileSync(
      'python3',
      [resolve(__dirname, './fetch_legislative_finance.py')],
      {
        cwd: resolve(__dirname, '..'),
        encoding: 'utf8',
        input: JSON.stringify({ people: legislativePeople }),
        maxBuffer: 24 * 1024 * 1024,
      },
    )

    financialDetailsById = JSON.parse(rawOutput)
  } catch (error) {
    console.warn('Legislative finance enrichment failed, using cached values when available.')
    console.warn(error instanceof Error ? error.message : error)
  }

  return people.map((person) => {
    if (person.branchId !== 'legislative') {
      return person
    }

    const fetchedDetails = financialDetailsById[person.id] ?? {}
    const cachedDetails = getCachedLegislativeFinancials(person)

    return {
      ...person,
      ...cachedDetails,
      ...fetchedDetails,
    }
  })
}

async function enrichPeopleWithBackground(people) {
  if (people.length === 0) {
    return people
  }

  let backgroundDetailsById = {}

  try {
    const rawOutput = execFileSync('python3', [resolve(__dirname, './fetch_person_background.py')], {
      cwd: resolve(__dirname, '..'),
      encoding: 'utf8',
      input: JSON.stringify({ people }),
      maxBuffer: 24 * 1024 * 1024,
    })

    backgroundDetailsById = JSON.parse(rawOutput)
  } catch (error) {
    console.warn('Background enrichment failed, using cached values when available.')
    console.warn(error instanceof Error ? error.message : error)
  }

  return people.map((person) => {
    const fetchedDetails = backgroundDetailsById[person.id] ?? {}
    const cachedDetails = getCachedBackground(person)
    const imageUrl = person.imageUrl ?? fetchedDetails.imageUrl ?? cachedDetails.imageUrl

    return {
      ...person,
      ...cachedDetails,
      ...fetchedDetails,
      imageUrl,
    }
  })
}

async function buildExecutivePeople() {
  const independentAgencyHeads = await buildIndependentAgencyHeads()
  let html = ''

  try {
    html = await fetchText('https://www.whitehouse.gov/administration/the-cabinet/')
  } catch {
    const cachedExecutive = previousPeople
      .filter((person) => person.branchId === 'executive')
      .map(clonePerson)

    if (cachedExecutive.some((person) => person.sectionId === 'independent-agencies')) {
      return cachedExecutive
    }

    if (cachedExecutive.length === 17) {
      return [...cachedExecutive, ...independentAgencyHeads]
    }

    throw new Error('Unable to fetch executive roster and no cached executive snapshot is available.')
  }

  const entries = [
    ...html.matchAll(
      /<h2[^>]*><strong(?:><strong)*>([^<]+)(?:<\/strong>)+<\/h2>[\s\S]*?<h3[^>]*><strong(?:><strong)*>([^<]+)(?:<\/strong>)+<\/h3>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<p>(.*?)<\/p>/g,
    ),
  ]

  const cabinetPeople = entries
    .map((match) => {
      const rawRole = stripTags(match[2]).replace(/\s+/g, ' ').trim()
      const roleConfig = executiveRoleMap.get(rawRole)

      if (!roleConfig) {
        return null
      }

      const name = stripTags(match[1]).replace(/\s+/g, ' ').trim()
      const imageUrl = decodeHtml(match[3]).trim()
      const description = stripTags(match[4])

      return {
        alignment: 'republican',
        alignmentLabel: 'Republican',
        branchId: 'executive',
        department: roleConfig.department,
        description,
        id: `executive-${slugify(name)}`,
        imageUrl,
        name,
        salaryNote: EXECUTIVE_SALARY_NOTE,
        sectionId: 'cabinet',
        sortOrder: roleConfig.sortOrder,
        sourceUrl: 'https://www.whitehouse.gov/administration/the-cabinet/',
        subtitle: roleConfig.department,
        title: roleConfig.title,
        wealthNote: EXECUTIVE_WEALTH_NOTE,
      }
    })
    .filter(Boolean)

  if (cabinetPeople.length !== 15) {
    throw new Error(`Expected 15 cabinet secretaries, found ${cabinetPeople.length}`)
  }

  const whiteHouse = [
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      branchId: 'executive',
      description:
        'Donald J. Trump is the 47th President of the United States and leads the executive branch, federal agencies, cabinet nominations, and commander-in-chief duties.',
      id: 'executive-donald-j-trump',
      imageUrl:
        'https://www.whitehouse.gov/wp-content/uploads/2026/01/Screenshot-2026-01-21-at-10.13.23-AM-3.jpg?w=580',
      name: 'Donald J. Trump',
      salaryNote:
        'The presidency carries a statutory salary of $400,000 plus official allowances, and annual financial disclosure filings are required.',
      sectionId: 'white-house',
      sortOrder: 1,
      sourceUrl: 'https://www.whitehouse.gov/administration/',
      subtitle: 'The White House',
      title: 'President of the United States',
      wealthNote:
        'Public disclosure forms are available, and they are more reliable than media net-worth estimates because they report covered assets and liabilities in official filing ranges.',
    },
    {
      alignment: 'republican',
      alignmentLabel: 'Republican',
      branchId: 'executive',
      description:
        'J.D. Vance serves as vice president, first in the presidential line of succession and a constitutional presiding officer of the Senate.',
      id: 'executive-jd-vance',
      imageUrl:
        'https://www.whitehouse.gov/wp-content/uploads/2026/01/Vice-President-J.D.-Vance.jpg-1.jpg?w=580',
      name: 'J.D. Vance',
      salaryNote:
        'The vice presidency is a salaried elected office with required public financial disclosure reporting.',
      sectionId: 'white-house',
      sortOrder: 2,
      sourceUrl: 'https://www.whitehouse.gov/administration/jd-vance/',
      subtitle: 'The White House',
      title: 'Vice President of the United States',
      wealthNote:
        'Vice presidential financial disclosures are public, and those official forms are more reliable than media net-worth estimates because many values are reported in ranges.',
    },
  ]

  return [...whiteHouse, ...cabinetPeople, ...independentAgencyHeads]
}

async function buildSenators() {
  let xml = ''

  try {
    xml = await fetchText('https://www.senate.gov/general/contact_information/senators_cfm.xml')
  } catch {
    const cachedSenators = previousPeople
      .filter((person) => person.sectionId === 'senate')
      .map(clonePerson)

    if (cachedSenators.length === 100) {
      return cachedSenators
    }

    throw new Error('Unable to fetch Senate roster and no cached Senate snapshot is available.')
  }

  const members = [...xml.matchAll(/<member>([\s\S]*?)<\/member>/g)]

  return members.map((match, index) => {
    const block = match[1]
    const firstName = extractTag(block, 'first_name')
    const lastName = extractTag(block, 'last_name')
    const partyCode = extractTag(block, 'party')
    const stateCode = extractTag(block, 'state')
    const office = extractTag(block, 'address')
    const phone = extractTag(block, 'phone')
    const website = extractTag(block, 'website') || extractTag(block, 'email')
    const senateClass = extractTag(block, 'class')
    const leadership = extractTag(block, 'leadership_position')
    const bioguideId = extractTag(block, 'bioguide_id')
    const state = STATE_NAMES[stateCode] ?? stateCode
    const name = `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim()
    const partyLabel = sentenceCaseParty(partyCode)
    const leadershipSentence = leadership
      ? ` Currently serves as ${leadership.toLowerCase()} in the Senate.`
      : ''
    const senateSeatCycle = getCurrentSenateSeatCycleLabel(senateClass)
    const senateClassSentence = senateClass
      ? ` ${senateClass} seat${senateSeatCycle ? ` (current seat cycle: ${senateSeatCycle}).` : '.'}`
      : ''

    return {
      alignment: alignmentFromParty(partyCode),
      alignmentLabel: partyLabel,
      branchId: 'legislative',
      description: `${name} is a ${partyLabel.toLowerCase()} U.S. senator from ${state}.${leadershipSentence}${senateClassSentence}`.replace(
        /\s+/g,
        ' ',
      ),
      id: `senate-${slugify(name)}`,
      imageUrl: congressPhotoUrl(bioguideId),
      leadership: leadership || undefined,
      name,
      office,
      partyCode,
      phone,
      salaryNote: CONGRESSIONAL_SALARY_NOTE,
      sectionId: 'senate',
      sortOrder: index + 1,
      sourceUrl: website || 'https://www.senate.gov/general/contact_information/senators_cfm.xml',
      state,
      stateCode,
      subtitle: `Senate • ${state}`,
      title: 'U.S. Senator',
      website,
      wealthNote: CONGRESSIONAL_WEALTH_NOTE,
    }
  })
}

async function buildHouseBioguideMap() {
  let xml = ''

  try {
    xml = await fetchText('https://clerk.house.gov/xml/lists/MemberData.xml')
  } catch {
    return new Map()
  }

  const members = [...xml.matchAll(/<member>([\s\S]*?)<\/member>/g)]
  const bioguideMap = new Map()

  for (const match of members) {
    const block = match[1]
    const stateCodeMatch = block.match(/<state postal-code="([^"]+)">/)
    const district = extractTag(block, 'district')
    const bioguideId = extractTag(block, 'bioguideID')
    const stateCode = stateCodeMatch?.[1]

    if (!stateCode || !district || !bioguideId) {
      continue
    }

    bioguideMap.set(`${stateCode}|${district}`, bioguideId)
  }

  return bioguideMap
}

async function buildRepresentatives() {
  const bioguideMap = await buildHouseBioguideMap()
  let html = ''

  try {
    html = await fetchText('https://www.house.gov/representatives')
  } catch {
    const cachedRepresentatives = previousPeople
      .filter((person) => person.sectionId === 'house')
      .map(clonePerson)

    if (cachedRepresentatives.length >= 430) {
      return cachedRepresentatives
    }

    throw new Error('Unable to fetch House roster and no cached House snapshot is available.')
  }

  const rowPattern =
    /<tr>\s*<td[^>]*views-field-value-1[^>]*>\s*<a href="([^"]+)">([^<]+)<\/a>\s*<\/td>\s*<td[^>]*views-field-value-3 views-field-value-4[^>]*>([^<]+)<\/td>\s*<td[^>]*views-field-value-6[^>]*>([^<]+)<\/td>\s*<td[^>]*views-field-value-7 views-field-value-8[^>]*>([^<]+)<\/td>\s*<td[^>]*views-field-value-9[^>]*>([^<]+)<\/td>\s*<td[^>]*views-field-markup[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/g
  const seen = new Set()
  const representatives = []

  for (const match of html.matchAll(rowPattern)) {
    const website = decodeHtml(match[1]).trim()
    const rawName = decodeHtml(match[2]).trim()
    const location = decodeHtml(match[3]).trim()
    const partyCode = decodeHtml(match[4]).trim()
    const office = decodeHtml(match[5]).trim()
    const phone = decodeHtml(match[6]).trim()
    const committees = stripTags(match[7])
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean)

    if (seen.has(website)) {
      continue
    }

    seen.add(website)

    const name = formatCommaName(rawName)
    const { district, state } = parseStateDistrict(location)
    const stateCode = STATE_CODES_BY_NAME[state]
    const bioguideId = stateCode ? bioguideMap.get(`${stateCode}|${district}`) : undefined
    const representativeId = `house-${slugify(name)}-${slugify(location)}`
    const cachedPerson =
      previousPeopleById.get(representativeId) ?? previousPeopleByWebsite.get(website)
    const partyLabel = sentenceCaseParty(partyCode)
    const locationText =
      district === 'Delegate'
        ? `serves as a delegate for ${state}`
        : district === 'Resident Commissioner'
          ? `serves as resident commissioner for ${state}`
          : district === 'At Large'
            ? `represents ${state} at large`
            : `represents ${state}'s ${district} congressional district`
    const committeeSentence = committees.length
      ? ` House assignments listed on house.gov include ${joinList(committees)}.`
      : ''

    representatives.push({
      alignment: alignmentFromParty(partyCode),
      alignmentLabel: partyLabel,
      branchId: 'legislative',
      committees,
      description: `${name} ${locationText} in the U.S. House.${committeeSentence}`.replace(
        /\s+/g,
        ' ',
      ),
      district,
      id: representativeId,
      imageUrl:
        congressPhotoUrl(bioguideId) ??
        previousHouseImageBySeat.get(stateCode ? `${stateCode}|${district}` : '') ??
        cachedPerson?.imageUrl,
      name,
      office,
      partyCode,
      phone,
      salaryNote: CONGRESSIONAL_SALARY_NOTE,
      sectionId: 'house',
      sortOrder: representatives.length + 1,
      sourceUrl: website,
      state,
      stateCode,
      subtitle: `House • ${location}`,
      title:
        district === 'Delegate'
          ? 'Delegate to the U.S. House'
          : district === 'Resident Commissioner'
            ? 'Resident Commissioner'
            : 'U.S. Representative',
      website,
      wealthNote: CONGRESSIONAL_WEALTH_NOTE,
    })
  }

  if (representatives.length < 430) {
    throw new Error(`Expected full House roster, found ${representatives.length}`)
  }

  return representatives
}

function buildExecutiveBranch(executivePeople) {
  return {
    headline:
      'The president, vice president, cabinet, and independent-agency leaders shape executive power and federal regulation.',
    id: 'executive',
    name: 'Executive',
    sections: [
      {
        countLabel: `${executivePeople.filter((person) => person.sectionId === 'white-house').length} White House principals`,
        description:
          'Start with the elected leadership at the center of the executive branch.',
        id: 'white-house',
        label: 'The White House',
        personIds: executivePeople
          .filter((person) => person.sectionId === 'white-house')
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .map((person) => person.id),
      },
      {
        countLabel: `${executivePeople.filter((person) => person.sectionId === 'cabinet').length} department heads`,
        description:
          'These are the heads of the 15 executive departments in the Cabinet.',
        id: 'cabinet',
        label: 'Cabinet Departments',
        personIds: executivePeople
          .filter((person) => person.sectionId === 'cabinet')
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .map((person) => person.id),
      },
      {
        countLabel: `${executivePeople.filter((person) => person.sectionId === 'independent-agencies').length} profiled leaders`,
        description:
          'This section now profiles the full independent-agency and government-corporation catalog used on this site.',
        id: 'independent-agencies',
        label: 'Independent Agencies',
        personIds: executivePeople
          .filter((person) => person.sectionId === 'independent-agencies')
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .map((person) => person.id),
      },
    ],
    summary:
      'Explore the presidency, vice presidency, the 15 cabinet secretaries, and the full profiled independent-agency roster with short profiles and finance notes.',
  }
}

function buildBranches(executivePeople, senators, representatives) {
  return [
    buildExecutiveBranch(executivePeople),
    {
      headline: 'Congress writes laws through the Senate and the House of Representatives.',
      id: 'legislative',
      name: 'Legislative',
      sections: [
        {
          countLabel: `${senators.length} sitting senators`,
          description:
            'Every state sends two senators to the upper chamber, with party color, leadership roles, and contact basics shown here.',
          id: 'senate',
          label: 'United States Senate',
          personIds: senators
            .slice()
            .sort((left, right) => left.name.localeCompare(right.name))
            .map((person) => person.id),
        },
        {
          countLabel: `${representatives.length} representatives and delegates`,
          description:
            'The House roster includes voting representatives plus delegates and the resident commissioner listed on house.gov.',
          id: 'house',
          label: 'United States House',
          personIds: representatives
            .slice()
            .sort((left, right) => left.name.localeCompare(right.name))
            .map((person) => person.id),
        },
      ],
      summary:
        'Browse the current congressional roster with search, chamber filters, party color, and compact detail cards.',
    },
    {
      headline: 'The federal judiciary interprets laws, with the Supreme Court at its apex.',
      id: 'judicial',
      name: 'Judicial',
      sections: [
        {
          countLabel: `${justices.length} sitting justices`,
          description:
            'This build focuses on the nine current Supreme Court justices and the party of the appointing president.',
          id: 'supreme-court',
          label: 'Supreme Court of the United States',
          personIds: justices.map((justice) => justice.id),
        },
      ],
      summary:
        'View the sitting Supreme Court justices, their roles on the Court, and a simple read on appointment history.',
    },
  ]
}

async function main() {
  const executiveOnly = process.env.EXEC_ONLY === '1'

  if (executiveOnly && previousDataset) {
    const executivePeople = await buildExecutivePeople()
    const preservedPeople = previousPeople
      .filter((person) => person.branchId !== 'executive')
      .map(clonePerson)
    const senators = preservedPeople.filter((person) => person.sectionId === 'senate')
    const representatives = preservedPeople.filter((person) => person.sectionId === 'house')
    const trumpRelationshipContext = await buildTrumpRelationshipContext(
      executivePeople,
      senators,
      representatives,
    )
    const executiveBasePeople = executivePeople
      .map((person) => annotateTrumpProximity(person, trumpRelationshipContext))
      .map(annotateSalary)
      .map(annotateDepartmentBudget)
      .map(annotateIndependentAgencyBudget)
      .map(annotateFinancialDisclosure)
    const executiveWithFinancials = await enrichPeopleWithExecutiveFinancials(executiveBasePeople)
    const executiveWithBackground = await enrichPeopleWithBackground(executiveWithFinancials)
    const executiveWithManualCareerHistory =
      applyManualCareerHistoryOverrides(executiveWithBackground)
    const executiveWithManualPublicControversies =
      applyManualPublicControversyOverrides(executiveWithManualCareerHistory)
    const executiveWithCongressHistory = executiveWithManualPublicControversies.map((person) =>
      annotateExecutiveCongressHistory(person, trumpRelationshipContext),
    )
    const executiveWithDerivedEstimates =
      executiveWithCongressHistory.map(annotateDerivedHoldingEstimates)
    const refreshedExecutivePeople = await enrichPeopleWithXUrls(executiveWithDerivedEstimates)
    const dataset = {
      ...previousDataset,
      branches: buildBranches(refreshedExecutivePeople, senators, representatives),
      economySnapshot: ECONOMY_SNAPSHOT,
      generatedAt: new Date().toISOString(),
      people: [...refreshedExecutivePeople, ...preservedPeople],
    }

    mkdirSync(resolve(__dirname, '../public/data'), { recursive: true })
    writeFileSync(outPath, `${JSON.stringify(dataset, null, 2)}\n`)

    console.log(
      `Wrote ${dataset.people.length} profiles with executive-only refresh: ${refreshedExecutivePeople.length} executive, ${refreshedExecutivePeople.filter((person) => person.sectionId === 'independent-agencies').length} independent-agency leaders.`,
    )
    return
  }

  const [executivePeople, senators, representatives] = await Promise.all([
    buildExecutivePeople(),
    buildSenators(),
    buildRepresentatives(),
  ])
  const trumpRelationshipContext = await buildTrumpRelationshipContext(
    executivePeople,
    senators,
    representatives,
  )

  const basePeople = [...executivePeople, ...senators, ...representatives, ...justices]
    .map((person) => annotateTrumpProximity(person, trumpRelationshipContext))
    .map(annotateSalary)
    .map(annotateDepartmentBudget)
    .map(annotateIndependentAgencyBudget)
    .map(annotateFinancialDisclosure)
  const executiveEnrichedPeople = await enrichPeopleWithExecutiveFinancials(basePeople)
  const legislativelyEnrichedPeople = await enrichPeopleWithLegislativeFinancials(
    executiveEnrichedPeople,
  )
  const peopleWithBackground = await enrichPeopleWithBackground(legislativelyEnrichedPeople)
  const peopleWithManualCareerHistory = applyManualCareerHistoryOverrides(peopleWithBackground)
  const peopleWithManualPublicControversies =
    applyManualPublicControversyOverrides(peopleWithManualCareerHistory)
  const peopleWithExecutiveCongressHistory = peopleWithManualPublicControversies.map((person) =>
    annotateExecutiveCongressHistory(person, trumpRelationshipContext),
  )
  const peopleWithDerivedEstimates =
    peopleWithExecutiveCongressHistory.map(annotateDerivedHoldingEstimates)
  const people = await enrichPeopleWithXUrls(peopleWithDerivedEstimates)

  const branches = buildBranches(executivePeople, senators, representatives)

  const dataset = {
    branches,
    economySnapshot: ECONOMY_SNAPSHOT,
    generatedAt: new Date().toISOString(),
    legislativeTrumpRollCalls: trumpRelationshipContext.legislativeRollCallSummary,
    people,
    supremeCourtCases: supremeCourtTrumpAdministrationCases,
    supremeCourtPersonalCases: supremeCourtTrumpPersonalCases,
    sources: SOURCES,
  }

  mkdirSync(resolve(__dirname, '../public/data'), { recursive: true })
  writeFileSync(outPath, `${JSON.stringify(dataset, null, 2)}\n`)

  console.log(
    `Wrote ${people.length} profiles: ${executivePeople.length} executive, ${senators.length} senators, ${representatives.length} house members, ${justices.length} justices.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
