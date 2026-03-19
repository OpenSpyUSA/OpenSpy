export type Alignment = 'democratic' | 'independent' | 'nonpartisan' | 'republican'

export type BranchId = 'executive' | 'judicial' | 'legislative'

export interface SourceLink {
  label: string
  url: string
}

export interface DisclosureHolding {
  derivedEstimate?: string
  derivedSourceLabel?: string
  derivedSourceUrl?: string
  label: string
  value: string
}

export interface EducationRecord {
  degree?: string
  field?: string
  school: string
  summary: string
}

export interface CareerRecord {
  category: 'occupation' | 'position'
  endDate?: string
  isCurrent?: boolean
  label: string
  startDate?: string
  summary: string
}

export interface DisclosureLiability {
  amount: string
  creditor: string
  type: string
}

export interface DisclosureTrade {
  amount: string
  assetName: string
  date: string
  owner?: string
  sourceUrl?: string
  ticker?: string
  type: string
}

export type TrumpCaseSide = 'anti' | 'not_on_court' | 'pro'

export interface SupremeCourtCase {
  caseName: string
  date: string
  id: string
  issue: string
  justiceStances: Record<string, TrumpCaseSide>
  powerTag: string
  result: string
  sourceUrl: string
  type: 'merits' | 'order' | 'procedural'
}

export interface LegislativeTrumpRollCall {
  actionTime?: string
  billNumber?: string
  category: string
  chamber: 'house' | 'senate'
  congress?: number
  date: string
  id: string
  label: string
  nayTotal?: number
  proTrumpCast: string
  question: string
  rollCallNumber?: number
  session?: string
  sourceUrl: string
  title: string
  trumpOutcome?: 'anti' | 'pro'
  weight: number
  yeaTotal?: number
}

export type LegislativeVotePosition = 'anti' | 'missed' | 'not_in_office' | 'pro'

export interface LegislativeTrumpRollCallSummary {
  houseCandidateCount: number
  houseSelectedCount: number
  selectedEvents: LegislativeTrumpRollCall[]
  senateCandidateCount: number
  senateSelectedCount: number
}

export interface GovernmentPerson {
  id: string
  agencyBudgetAmount?: string
  agencyBudgetLabel?: string
  agencyBudgetNote?: string
  agencyBudgetSourceLabel?: string
  agencyBudgetSourceUrl?: string
  agencyFundingModel?: string
  alignment: Alignment
  alignmentLabel: string
  appointmentNote?: string
  appointedBy?: string
  branchId: BranchId
  court?: string
  department?: string
  departmentBudgetDiscretionaryAmount?: string
  departmentBudgetDiscretionaryLabel?: string
  departmentBudgetNote?: string
  departmentBudgetSourceLabel?: string
  departmentBudgetSourceUrl?: string
  departmentBudgetTotalAmount?: string
  departmentBudgetTotalLabel?: string
  description: string
  district?: string
  birthDate?: string
  birthYear?: number
  careerHistory?: CareerRecord[]
  education?: EducationRecord[]
  highestDegree?: string
  highestEducationField?: string
  highestEducationSchool?: string
  imageUrl?: string
  leadership?: string
  name: string
  office?: string
  partyCode?: string
  phone?: string
  salaryAmount?: string
  financialDisclosureLabel?: string
  financialDisclosureNote?: string
  financialDisclosureSearchHint?: string
  financialDisclosureUrl?: string
  financialAnnualReportUrl?: string
  financialFilingDate?: string
  liabilities?: DisclosureLiability[]
  recentTrades?: DisclosureTrade[]
  salaryNote: string
  salarySourceLabel?: string
  salarySourceUrl?: string
  sectionId: string
  roleSinceYear?: string
  sortOrder: number
  sourceUrl: string
  state?: string
  stateCode?: string
  subtitle?: string
  title: string
  trumpAvailableEvents?: number
  trumpConfidence?: string
  trumpLabel: string
  trumpMissedCount?: number
  trumpNotInOfficeCount?: number
  trumpEvidence?: string[]
  trumpNote: string
  trumpProCount?: number
  trumpScore: number
  trumpSampleSize?: number
  trumpAntiCount?: number
  trumpRollCallPositions?: Record<string, LegislativeVotePosition>
  topHoldings?: DisclosureHolding[]
  website?: string
  wealthNote: string
  wikidataId?: string
  xUrl?: string
  committees?: string[]
}

export interface BranchSection {
  countLabel: string
  description: string
  id: string
  label: string
  personIds: string[]
}

export interface GovernmentBranch {
  headline: string
  id: BranchId
  name: string
  sections: BranchSection[]
  summary: string
}

export interface GovernmentDataset {
  branches: GovernmentBranch[]
  generatedAt: string
  legislativeTrumpRollCalls?: LegislativeTrumpRollCallSummary
  people: GovernmentPerson[]
  supremeCourtCases?: SupremeCourtCase[]
  supremeCourtPersonalCases?: SupremeCourtCase[]
  sources: SourceLink[]
}

export interface StateDelegationSummary {
  balanceLabel: string
  dominantAlignment: Alignment | 'split'
  houseCount: number
  housePartyCounts: Record<Alignment, number>
  memberCount: number
  people: GovernmentPerson[]
  representativeCountLabel: string
  senateCount: number
  stateCode: string
  stateName: string
  senators: GovernmentPerson[]
  representatives: GovernmentPerson[]
  totalPartyCounts: Record<Alignment, number>
}
