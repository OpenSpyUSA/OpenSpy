function buildCommonsFilePath(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`
}

const INDEPENDENT_AGENCY_SEAL_FILE_OVERRIDES: Record<string, string[]> = {
  'Administrative Conference of the United States': [
    'Seal of the Administrative Conference of the United States.svg',
  ],
  'Central Intelligence Agency': [
    'Seal of the U.S. Central Intelligence Agency.svg',
    'Seal of the Central Intelligence Agency.svg',
  ],
  'Commodity Futures Trading Commission': ['Commodity Futures Trading Commission seal.svg'],
  'Consumer Financial Protection Bureau': [
    'Seal of the Consumer Financial Protection Bureau.svg',
  ],
  'Consumer Product Safety Commission': [
    'Seal of the United States Consumer Product Safety Commission.svg',
  ],
  'Corporation for National and Community Service': ['AmeriCorps Logo.svg'],
  'Defense Nuclear Facilities Safety Board': [
    'Seal of the Defense Nuclear Facilities Safety Board.png',
  ],
  'Equal Employment Opportunity Commission': [
    'Seal of the Equal Employment Opportunity Commission.svg',
  ],
  'Environmental Protection Agency': [
    'Seal of the United States Environmental Protection Agency.svg',
  ],
  'Export-Import Bank of the United States': [
    'Seal of the United States Export-Import Bank.svg',
  ],
  'Farm Credit Administration': ['Seal of the Farm Credit Administration.svg'],
  'Federal Communications Commission': [
    'Seal of the Federal Communications Commission.svg',
  ],
  'Federal Deposit Insurance Corporation': [
    'Seal of the United States Federal Deposit Insurance Corporation.svg',
  ],
  'Federal Election Commission': ['Seal of the Federal Election Commission.svg'],
  'Federal Housing Finance Agency': [
    'Seal of the United States Federal Housing Finance Agency.svg',
  ],
  'Federal Labor Relations Authority': [
    'Seal of the Federal Labor Relations Authority.svg',
  ],
  'Federal Maritime Commission': ['Seal of the Federal Maritime Commission.svg'],
  'Federal Mediation and Conciliation Service': [
    'Seal of the Federal Mediation and Conciliation Service.svg',
  ],
  'Federal Mine Safety and Health Review Commission': [
    'Seal of the Federal Mine Safety and Health Review Commission.svg',
  ],
  'Federal Reserve System': [
    'Seal of the United States Federal Reserve System.svg',
  ],
  'Federal Retirement Thrift Investment Board': [
    'Seal of the Federal Retirement Thrift Investment Board.svg',
  ],
  'Federal Trade Commission': ['Seal of the United States Federal Trade Commission.svg'],
  'General Services Administration': [
    'Seal of the United States General Services Administration.svg',
  ],
  'Inter-American Foundation': ['Seal of the Inter-American Foundation.svg'],
  'Merit Systems Protection Board': ['Seal of the Merit Systems Protection Board.svg'],
  'National Aeronautics and Space Administration': [
    'Seal of the National Aeronautics and Space Administration.svg',
    'NASA logo.svg',
  ],
  'National Archives and Records Administration': [
    'Seal of the National Archives and Records Administration.svg',
  ],
  'National Capital Planning Commission': [
    'Seal of the National Capital Planning Commission.svg',
  ],
  'National Credit Union Administration': [
    'Seal of the National Credit Union Administration.svg',
  ],
  'National Foundation on the Arts and the Humanities': [
    'Seal of the National Foundation on the Arts and the Humanities.svg',
    'National Endowment for the Arts logo.svg',
  ],
  'National Labor Relations Board': ['Seal of the National Labor Relations Board.svg'],
  'National Mediation Board': ['Seal of the National Mediation Board.svg'],
  'National Railroad Passenger Corporation (AMTRAK)': ['Amtrak logo.svg'],
  'National Science Foundation': ['Seal of the National Science Foundation.svg'],
  'National Transportation Safety Board': [
    'Seal of the United States National Transportation Safety Board.svg',
  ],
  'Nuclear Regulatory Commission': [
    'Seal of the United States Nuclear Regulatory Commission.svg',
  ],
  'Occupational Safety and Health Review Commission': [
    'Seal of the Occupational Safety and Health Review Commission.svg',
  ],
  'Office of Government Ethics': ['Seal of the Office of Government Ethics.svg'],
  'Office of Personnel Management': [
    'Seal of the United States Office of Personnel Management.svg',
  ],
  'Office of the Director of National Intelligence': [
    'Seal of the Office of the Director of National Intelligence.svg',
  ],
  'Overseas Private Investment Corporation': [
    'Overseas Private Investment Corporation logo.svg',
  ],
  'Peace Corps': ['Peace Corps logo.svg'],
  'Pension Benefit Guaranty Corporation': [
    'Seal of the Pension Benefit Guaranty Corporation.svg',
  ],
  'Postal Regulatory Commission': ['Seal of the Postal Regulatory Commission.svg'],
  'Railroad Retirement Board': ['Seal of the Railroad Retirement Board.svg'],
  'Securities and Exchange Commission': [
    'Seal of the United States Securities and Exchange Commission.svg',
  ],
  'Selective Service System': ['Seal of the Selective Service System.svg'],
  'Small Business Administration': [
    'Seal of the United States Small Business Administration.svg',
  ],
  'Social Security Administration': [
    'Seal of the United States Social Security Administration.svg',
  ],
  'Surface Transportation Board': ['Seal of the Surface Transportation Board.svg'],
  'Tennessee Valley Authority': ['Tennessee Valley Authority logo.svg'],
  'Trade and Development Agency': ['Seal of the Trade and Development Agency.svg'],
  'United States African Development Foundation': [
    'United States African Development Foundation logo.svg',
  ],
  'United States Agency for Global Media': [
    'Seal of the United States Agency for Global Media.svg',
  ],
  'United States Agency for International Development': [
    'Seal of the United States Agency for International Development.svg',
    'USAID-Identity.svg',
  ],
  'United States Commission on Civil Rights': [
    'Seal of the United States Commission on Civil Rights.svg',
  ],
  'United States International Trade Commission': [
    'United States International Trade Commission seal.PNG',
  ],
  'United States Office of Special Counsel': [
    'Seal of the United States Office of Special Counsel.svg',
  ],
  'United States Postal Service': ['Seal of the United States Postal Service.svg'],
}

function getGenericSealFileCandidates(name: string) {
  const strippedName = name.replace(/\s+\([^)]*\)/g, '').trim()
  const baseNames = [...new Set([name, strippedName])]
  const fileNames: string[] = []

  for (const baseName of baseNames) {
    fileNames.push(`Seal of the United States ${baseName}.svg`)
    fileNames.push(`Seal of the United States ${baseName}.png`)
    fileNames.push(`Seal of the ${baseName}.svg`)
    fileNames.push(`Seal of the ${baseName}.png`)
    fileNames.push(`Seal of ${baseName}.svg`)
    fileNames.push(`Seal of ${baseName}.png`)
    fileNames.push(`${baseName} seal.svg`)
    fileNames.push(`${baseName} seal.png`)
    fileNames.push(`${baseName} logo.svg`)
    fileNames.push(`${baseName} logo.png`)
  }

  return fileNames
}

export function getIndependentAgencySealCandidates(name: string) {
  const specificCandidates = INDEPENDENT_AGENCY_SEAL_FILE_OVERRIDES[name] ?? []
  const fileNames = [...new Set([...specificCandidates, ...getGenericSealFileCandidates(name)])]

  return fileNames.map((fileName) => buildCommonsFilePath(fileName))
}
