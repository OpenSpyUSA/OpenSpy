import type { SourceLink } from './types'

export type ExecutiveShutdownEventId =
  | 'fy2026-broad'
  | 'fy2026-partial-january'
  | 'fy2026-dhs-only'

export interface ExecutiveShutdownEvent {
  dateLabel: string
  endDate: string | null
  id: ExecutiveShutdownEventId
  scopeLabel: string
  shortLabel: string
  startDate: string
  sourceLinks: SourceLink[]
  status: 'ongoing' | 'resolved'
  summary: string
  title: string
}

export interface ExecutiveShutdownArea {
  eventIds: ExecutiveShutdownEventId[]
  id: string
  label: string
  note: string
  workforceLabel?: string
}

export interface ExecutiveShutdownAreaGroup {
  areas: ExecutiveShutdownArea[]
  id: string
  label: string
}

export const EXECUTIVE_SHUTDOWN_EVENTS: ExecutiveShutdownEvent[] = [
  {
    dateLabel: 'Oct 1-Nov 12, 2025',
    endDate: '2025-11-12',
    id: 'fy2026-broad',
    scopeLabel: 'Broad FY2026 lapse',
    shortLabel: 'Oct-Nov 2025',
    startDate: '2025-10-01',
    sourceLinks: [
      {
        label: 'H.R. 5371',
        url: 'https://www.congress.gov/bill/119th-congress/house-bill/5371',
      },
      {
        label: 'FY2026 status table',
        url: 'https://www.congress.gov/crs-appropriations-status-table/2026',
      },
    ],
    status: 'resolved',
    summary:
      'Start-of-fiscal-year shutdown that hit the White House and all annually appropriated cabinet departments before the November 12, 2025 stopgap became law.',
    title: 'Broad FY2026 shutdown',
  },
  {
    dateLabel: 'Jan 31-Feb 3, 2026',
    endDate: '2026-02-03',
    id: 'fy2026-partial-january',
    scopeLabel: 'Late-January partial lapse',
    shortLabel: 'Jan 31-Feb 3',
    startDate: '2026-01-31',
    sourceLinks: [
      {
        label: 'H.R. 7148',
        url: 'https://www.congress.gov/bill/119th-congress/house-bill/7148',
      },
      {
        label: 'FY2026 status table',
        url: 'https://www.congress.gov/crs-appropriations-status-table/2026',
      },
    ],
    status: 'resolved',
    summary:
      'Brief second shutdown after January 30, 2026 that affected only the still-unresolved Defense, DHS, Labor-HHS-Education, Transportation-HUD, FSGG, and State-related bills.',
    title: 'Late-January partial shutdown',
  },
  {
    dateLabel: 'Since Feb 14, 2026',
    endDate: null,
    id: 'fy2026-dhs-only',
    scopeLabel: 'Department-specific lapse',
    shortLabel: 'Since Feb 14',
    startDate: '2026-02-14',
    sourceLinks: [
      {
        label: 'CRS DHS report',
        url: 'https://www.everycrsreport.com/reports/R48874.html',
      },
      {
        label: 'AP explainer',
        url: 'https://apnews.com/article/homeland-security-funding-ice-airport-security-lines-ed04ac573dfb27e939b7234cc8245b16',
      },
    ],
    status: 'ongoing',
    summary:
      'DHS-only shutdown that began when the two-week Homeland Security stopgap expired on February 14, 2026, while the rest of government stayed funded through September 30, 2026.',
    title: 'DHS-only shutdown',
  },
]

export const EXECUTIVE_SHUTDOWN_AREA_GROUPS: ExecutiveShutdownAreaGroup[] = [
  {
    id: 'white-house',
    label: 'White House',
    areas: [
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'white-house-eop',
        label: 'Executive Office of the President',
        note: 'FSGG accounts were hit by the broad October-November lapse and the late-January partial lapse.',
      },
    ],
  },
  {
    id: 'cabinet',
    label: 'Cabinet Departments',
    areas: [
      {
        eventIds: ['fy2026-broad'],
        id: 'dept-agriculture',
        label: 'Department of Agriculture',
        note: 'Full-year funding arrived in the November 2025 package.',
        workforceLabel: 'Workforce ~100k',
      },
      {
        eventIds: ['fy2026-broad'],
        id: 'dept-commerce',
        label: 'Department of Commerce',
        note: 'Commerce-Justice-Science accounts were funded before the January 31 lapse.',
        workforceLabel: 'Workforce ~47k',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-defense',
        label: 'Department of Defense',
        note: 'Defense was still unresolved when the January 30 CR expired.',
        workforceLabel: 'Workforce 3M+',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-education',
        label: 'Department of Education',
        note: 'Labor-HHS-Education remained unresolved into early February 2026.',
        workforceLabel: 'Workforce ~2.2k',
      },
      {
        eventIds: ['fy2026-broad'],
        id: 'dept-energy',
        label: 'Department of Energy',
        note: 'Energy-Water accounts were funded before the January 31 lapse.',
        workforceLabel: 'Workforce ~14k federal',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-hhs',
        label: 'Department of Health and Human Services',
        note: 'Labor-HHS-Education remained unresolved into early February 2026.',
        workforceLabel: 'Workforce 80k+',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january', 'fy2026-dhs-only'],
        id: 'dept-dhs',
        label: 'Department of Homeland Security',
        note: 'Only cabinet department with the additional shutdown that began on February 14, 2026.',
        workforceLabel: 'Workforce 260k+',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-hud',
        label: 'Department of Housing and Urban Development',
        note: 'Transportation-HUD remained unresolved into early February 2026.',
        workforceLabel: 'Workforce ~8.6k',
      },
      {
        eventIds: ['fy2026-broad'],
        id: 'dept-interior',
        label: 'Department of the Interior',
        note: 'Interior-Environment was funded before the January 31 lapse.',
        workforceLabel: 'Workforce ~70k',
      },
      {
        eventIds: ['fy2026-broad'],
        id: 'dept-justice',
        label: 'Department of Justice',
        note: 'Commerce-Justice-Science accounts were funded before the January 31 lapse.',
        workforceLabel: 'Workforce 115k+',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-labor',
        label: 'Department of Labor',
        note: 'Labor-HHS-Education remained unresolved into early February 2026.',
        workforceLabel: 'Workforce ~16k',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-state',
        label: 'Department of State',
        note: 'State-related accounts were still unresolved when the January 30 CR expired.',
        workforceLabel: 'Workforce 80k+',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-transportation',
        label: 'Department of Transportation',
        note: 'Transportation-HUD remained unresolved into early February 2026.',
        workforceLabel: 'Workforce 55k+',
      },
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'dept-treasury',
        label: 'Department of the Treasury',
        note: 'Treasury fell under FSGG and rolled into the late-January partial lapse.',
        workforceLabel: 'Workforce ~100k',
      },
      {
        eventIds: ['fy2026-broad'],
        id: 'dept-va',
        label: 'Department of Veterans Affairs',
        note: 'MilCon-VA received full-year funding in the November 2025 package.',
        workforceLabel: 'Workforce 480k+',
      },
    ],
  },
  {
    id: 'independent-agencies',
    label: 'Independent Agencies',
    areas: [
      {
        eventIds: ['fy2026-broad', 'fy2026-partial-january'],
        id: 'independent-appropriated',
        label: 'Appropriated or mixed agencies',
        note: 'Best fit for FSGG-style commissions and similar bodies with annual appropriations, such as the SEC, CFTC, or FTC.',
      },
      {
        eventIds: ['fy2026-broad'],
        id: 'independent-broad-only',
        label: 'Broad-only appropriated agencies',
        note: 'Best fit for agencies in bills that got full-year funding before January 31, such as many CJS or Interior-Environment entities.',
      },
      {
        eventIds: [],
        id: 'independent-fee-funded',
        label: 'Fee-funded or self-funded agencies',
        note: 'Best fit for entities like the Federal Reserve or largely fee-funded regulators; this site does not mark an annual appropriations shutdown by default.',
      },
    ],
  },
]

export const EXECUTIVE_SHUTDOWN_EVENT_MAP = new Map(
  EXECUTIVE_SHUTDOWN_EVENTS.map((event) => [event.id, event]),
)
