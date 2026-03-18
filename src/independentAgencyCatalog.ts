export interface IndependentAgencyCatalogItem {
  featuredProfileId?: string
  name: string
  typeLabel: string
}

export interface IndependentAgencyCatalogCategory {
  description: string
  id: string
  items: IndependentAgencyCatalogItem[]
  label: string
}

const MAX_IMPORTANCE_RANK = 10_000

export const INDEPENDENT_AGENCY_SOURCE_LABEL =
  'Current U.S. Government Manual list'
export const INDEPENDENT_AGENCY_SOURCE_URL = 'https://www.usgovernmentmanual.gov/'

export const independentAgencyCatalog: IndependentAgencyCatalogCategory[] = [
  {
    id: 'finance-and-markets',
    label: 'Finance and Markets',
    description:
      'Independent bodies that supervise money, credit, securities, competition, trade, and major consumer-finance markets.',
    items: [
      {
        featuredProfileId: 'executive-michael-s-selig',
        name: 'Commodity Futures Trading Commission',
        typeLabel: 'Derivatives regulator',
      },
      {
        name: 'Consumer Financial Protection Bureau',
        typeLabel: 'Consumer-finance regulator',
      },
      {
        name: 'Export-Import Bank of the United States',
        typeLabel: 'Government bank and export finance',
      },
      {
        name: 'Farm Credit Administration',
        typeLabel: 'Farm credit regulator',
      },
      {
        name: 'Federal Deposit Insurance Corporation',
        typeLabel: 'Bank insurer and regulator',
      },
      {
        name: 'Federal Housing Finance Agency',
        typeLabel: 'Housing-finance regulator',
      },
      {
        featuredProfileId: 'executive-jerome-h-powell',
        name: 'Federal Reserve System',
        typeLabel: 'Central bank and bank regulator',
      },
      {
        featuredProfileId: 'executive-andrew-n-ferguson',
        name: 'Federal Trade Commission',
        typeLabel: 'Competition and consumer-protection regulator',
      },
      {
        name: 'National Credit Union Administration',
        typeLabel: 'Credit-union regulator and insurer',
      },
      {
        featuredProfileId: 'executive-paul-s-atkins',
        name: 'Securities and Exchange Commission',
        typeLabel: 'Securities regulator',
      },
      {
        name: 'United States International Trade Commission',
        typeLabel: 'Trade and import-injury commission',
      },
    ],
  },
  {
    id: 'infrastructure-and-communications',
    label: 'Infrastructure and Communications',
    description:
      'Agencies and public enterprises tied to transportation networks, communications systems, postal governance, and energy infrastructure.',
    items: [
      {
        featuredProfileId: 'executive-brendan-carr',
        name: 'Federal Communications Commission',
        typeLabel: 'Communications regulator',
      },
      {
        name: 'Federal Maritime Commission',
        typeLabel: 'Ocean shipping regulator',
      },
      {
        name: 'National Railroad Passenger Corporation (AMTRAK)',
        typeLabel: 'Passenger rail corporation',
      },
      {
        name: 'Postal Regulatory Commission',
        typeLabel: 'Postal rate and service regulator',
      },
      {
        name: 'Surface Transportation Board',
        typeLabel: 'Freight rail and rate regulator',
      },
      {
        name: 'Tennessee Valley Authority',
        typeLabel: 'Power and river-management corporation',
      },
      {
        name: 'United States Postal Service',
        typeLabel: 'Postal public enterprise',
      },
    ],
  },
  {
    id: 'labor-and-civil-rights',
    label: 'Labor and Civil Rights',
    description:
      'Bodies that oversee labor relations, workplace disputes, employment rights, and civil-rights enforcement.',
    items: [
      {
        name: 'Equal Employment Opportunity Commission',
        typeLabel: 'Employment civil-rights regulator',
      },
      {
        name: 'Federal Labor Relations Authority',
        typeLabel: 'Federal labor relations regulator',
      },
      {
        name: 'Federal Mine Safety and Health Review Commission',
        typeLabel: 'Mine-safety adjudicator',
      },
      {
        name: 'Federal Mediation and Conciliation Service',
        typeLabel: 'Labor mediation service',
      },
      {
        name: 'National Labor Relations Board',
        typeLabel: 'Private-sector labor regulator',
      },
      {
        name: 'National Mediation Board',
        typeLabel: 'Railway and airline labor mediator',
      },
      {
        name: 'Occupational Safety and Health Review Commission',
        typeLabel: 'Workplace-safety adjudicator',
      },
      {
        name: 'United States Commission on Civil Rights',
        typeLabel: 'Civil-rights fact-finding commission',
      },
    ],
  },
  {
    id: 'administration-and-governance',
    label: 'Administration and Governance',
    description:
      'Cross-government bodies for administrative law, ethics, elections, records, facilities, personnel, and internal federal governance.',
    items: [
      {
        name: 'Administrative Conference of the United States',
        typeLabel: 'Administrative-law improvement body',
      },
      {
        name: 'Federal Election Commission',
        typeLabel: 'Campaign-finance regulator',
      },
      {
        name: 'Federal Retirement Thrift Investment Board',
        typeLabel: 'Federal retirement savings board',
      },
      {
        name: 'General Services Administration',
        typeLabel: 'Government operations and procurement agency',
      },
      {
        name: 'Merit Systems Protection Board',
        typeLabel: 'Civil-service appeals board',
      },
      {
        name: 'National Archives and Records Administration',
        typeLabel: 'Federal records and archives agency',
      },
      {
        name: 'National Capital Planning Commission',
        typeLabel: 'Federal planning commission',
      },
      {
        name: 'Office of Government Ethics',
        typeLabel: 'Executive-branch ethics office',
      },
      {
        name: 'Office of Personnel Management',
        typeLabel: 'Federal HR and benefits management',
      },
      {
        name: 'United States Office of Special Counsel',
        typeLabel: 'Whistleblower and Hatch Act enforcement',
      },
    ],
  },
  {
    id: 'science-environment-and-culture',
    label: 'Science, Environment, and Culture',
    description:
      'Independent entities focused on research, space, environment, nuclear oversight, and national cultural support.',
    items: [
      {
        name: 'Environmental Protection Agency',
        typeLabel: 'Environmental regulator',
      },
      {
        name: 'National Aeronautics and Space Administration',
        typeLabel: 'Space and aeronautics agency',
      },
      {
        name: 'National Foundation on the Arts and the Humanities',
        typeLabel: 'Arts and humanities umbrella foundation',
      },
      {
        name: 'National Science Foundation',
        typeLabel: 'Research funding agency',
      },
      {
        name: 'Nuclear Regulatory Commission',
        typeLabel: 'Civil nuclear regulator',
      },
    ],
  },
  {
    id: 'security-and-safety',
    label: 'Security and Safety',
    description:
      'National-security, intelligence, military-readiness, and public-safety organizations outside the cabinet departments.',
    items: [
      {
        name: 'Central Intelligence Agency',
        typeLabel: 'Foreign intelligence agency',
      },
      {
        name: 'Consumer Product Safety Commission',
        typeLabel: 'Product-safety regulator',
      },
      {
        name: 'Defense Nuclear Facilities Safety Board',
        typeLabel: 'Nuclear-defense safety board',
      },
      {
        name: 'National Transportation Safety Board',
        typeLabel: 'Accident investigation board',
      },
      {
        name: 'Office of the Director of National Intelligence',
        typeLabel: 'Intelligence coordination office',
      },
      {
        name: 'Selective Service System',
        typeLabel: 'Military draft registration system',
      },
    ],
  },
  {
    id: 'benefits-and-service',
    label: 'Benefits and Service',
    description:
      'Organizations that deliver public benefits, national service, retirement protection, and broad domestic support programs.',
    items: [
      {
        name: 'Corporation for National and Community Service',
        typeLabel: 'National service agency',
      },
      {
        name: 'Peace Corps',
        typeLabel: 'International volunteer service agency',
      },
      {
        name: 'Pension Benefit Guaranty Corporation',
        typeLabel: 'Pension insurance corporation',
      },
      {
        name: 'Railroad Retirement Board',
        typeLabel: 'Railroad retirement and unemployment benefits',
      },
      {
        name: 'Small Business Administration',
        typeLabel: 'Small-business finance and support agency',
      },
      {
        name: 'Social Security Administration',
        typeLabel: 'National benefits administration',
      },
    ],
  },
  {
    id: 'international-development',
    label: 'International Development and Global Outreach',
    description:
      'Foreign-aid, development-finance, broadcasting, and overseas partnership bodies in the executive branch.',
    items: [
      {
        name: 'Inter-American Foundation',
        typeLabel: 'Latin America and Caribbean development grantmaker',
      },
      {
        name: 'Overseas Private Investment Corporation',
        typeLabel: 'Development finance corporation',
      },
      {
        name: 'Trade and Development Agency',
        typeLabel: 'Project preparation and export promotion agency',
      },
      {
        name: 'United States African Development Foundation',
        typeLabel: 'Africa-focused development foundation',
      },
      {
        name: 'United States Agency for Global Media',
        typeLabel: 'International broadcasting network',
      },
      {
        name: 'United States Agency for International Development',
        typeLabel: 'Foreign aid and development agency',
      },
    ],
  },
]

export const independentAgencyTotal = independentAgencyCatalog.reduce(
  (sum, category) => sum + category.items.length,
  0,
)

export const independentAgencyImportanceOrder = [
  'Federal Reserve System',
  'Central Intelligence Agency',
  'Office of the Director of National Intelligence',
  'Environmental Protection Agency',
  'Social Security Administration',
  'Securities and Exchange Commission',
  'Federal Communications Commission',
  'Federal Deposit Insurance Corporation',
  'Consumer Financial Protection Bureau',
  'Federal Housing Finance Agency',
  'Federal Trade Commission',
  'National Aeronautics and Space Administration',
  'United States Postal Service',
  'Office of Personnel Management',
  'Small Business Administration',
  'United States Agency for International Development',
  'Nuclear Regulatory Commission',
  'General Services Administration',
  'National Archives and Records Administration',
  'Commodity Futures Trading Commission',
  'Export-Import Bank of the United States',
  'Equal Employment Opportunity Commission',
  'National Labor Relations Board',
  'Federal Election Commission',
  'National Science Foundation',
  'United States International Trade Commission',
  'Tennessee Valley Authority',
  'National Transportation Safety Board',
  'Consumer Product Safety Commission',
  'Pension Benefit Guaranty Corporation',
  'Federal Retirement Thrift Investment Board',
  'National Credit Union Administration',
  'Surface Transportation Board',
  'Postal Regulatory Commission',
  'Merit Systems Protection Board',
  'Office of Government Ethics',
  'Federal Labor Relations Authority',
  'Railroad Retirement Board',
  'Selective Service System',
  'Peace Corps',
  'National Foundation on the Arts and the Humanities',
  'National Railroad Passenger Corporation (AMTRAK)',
  'Overseas Private Investment Corporation',
  'United States Agency for Global Media',
  'Trade and Development Agency',
  'Inter-American Foundation',
  'United States African Development Foundation',
  'Corporation for National and Community Service',
  'National Capital Planning Commission',
  'United States Office of Special Counsel',
  'Administrative Conference of the United States',
  'Federal Maritime Commission',
  'Occupational Safety and Health Review Commission',
  'Federal Mediation and Conciliation Service',
  'Federal Mine Safety and Health Review Commission',
  'National Mediation Board',
  'United States Commission on Civil Rights',
  'Defense Nuclear Facilities Safety Board',
  'Farm Credit Administration',
] as const

const independentAgencyImportanceRank: Map<string, number> = new Map(
  independentAgencyImportanceOrder.map((name, index) => [name, index + 1]),
)

export function getIndependentAgencyImportanceRank(name: string | undefined) {
  if (!name) {
    return MAX_IMPORTANCE_RANK
  }

  return independentAgencyImportanceRank.get(name) ?? MAX_IMPORTANCE_RANK
}

export function compareIndependentAgenciesByImportance(
  leftName: string | undefined,
  rightName: string | undefined,
) {
  const rankDifference =
    getIndependentAgencyImportanceRank(leftName) - getIndependentAgencyImportanceRank(rightName)

  if (rankDifference !== 0) {
    return rankDifference
  }

  return (leftName ?? '').localeCompare(rightName ?? '')
}
