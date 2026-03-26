function house(id, year, rollNumber, category, options = {}) {
  return {
    chamber: 'house',
    category,
    highlight: false,
    id,
    proTrumpCast: 'Yea',
    rollNumber,
    scoreIncluded: true,
    selected: false,
    signalTier: 'high_signal_scored',
    year,
    ...options,
  }
}

function senate(id, congress, session, voteNumber, category, options = {}) {
  return {
    chamber: 'senate',
    category,
    congress,
    highlight: false,
    id,
    proTrumpCast: 'Yea',
    selected: false,
    session,
    voteNumber,
    ...options,
  }
}

function selectedHouse(id, year, rollNumber, category, options = {}) {
  return house(id, year, rollNumber, category, { selected: true, ...options })
}

function selectedSenate(id, congress, session, voteNumber, category, options = {}) {
  return senate(id, congress, session, voteNumber, category, { selected: true, ...options })
}

function selectedBroadHouse(id, year, rollNumber, category, options = {}) {
  return house(id, year, rollNumber, category, {
    scoreIncluded: false,
    selected: true,
    signalTier: 'broad_admin_related',
    ...options,
  })
}

function selectedBroadSenate(id, congress, session, voteNumber, category, options = {}) {
  return senate(id, congress, session, voteNumber, category, {
    scoreIncluded: false,
    selected: true,
    signalTier: 'broad_admin_related',
    ...options,
  })
}

const selectedHouseRollCalls = [
  selectedHouse('house-ahca-rule-pq', 2017, 252, 'health-care', {
    label: 'American Health Care Act rule',
  }),
  selectedHouse('house-ahca-rule', 2017, 253, 'health-care', {
    label: 'American Health Care Act rule adoption',
  }),
  selectedHouse('house-ahca-passage', 2017, 256, 'health-care', {
    highlight: true,
    label: 'American Health Care Act passage',
  }),
  selectedHouse('house-no-sanctuary-rule', 2017, 332, 'immigration', {
    label: 'No Sanctuary for Criminals Act rule',
  }),
  selectedHouse('house-kates-law-rule-pq', 2017, 339, 'immigration', {
    label: "Kate's Law rule previous question",
  }),
  selectedHouse('house-kates-law-rule', 2017, 340, 'immigration', {
    label: "Kate's Law rule adoption",
  }),
  selectedHouse('house-no-sanctuary-passage', 2017, 342, 'immigration', {
    highlight: true,
    label: 'No Sanctuary for Criminals Act passage',
  }),
  selectedHouse('house-tax-cuts-rule-pq', 2017, 632, 'taxes', {
    label: 'Tax Cuts and Jobs Act rule previous question',
  }),
  selectedHouse('house-tax-cuts-rule', 2017, 633, 'taxes', {
    label: 'Tax Cuts and Jobs Act rule adoption',
  }),
  selectedHouse('house-tax-cuts-passage', 2017, 637, 'taxes', {
    highlight: true,
    label: 'Tax Cuts and Jobs Act House passage',
  }),
  selectedHouse('house-tax-cuts-conference-rule-pq', 2017, 688, 'taxes', {
    label: 'Tax Cuts and Jobs Act conference rule previous question',
  }),
  selectedHouse('house-tax-cuts-conference-rule', 2017, 689, 'taxes', {
    label: 'Tax Cuts and Jobs Act conference rule adoption',
  }),
  selectedHouse('house-tax-cuts-conference', 2017, 692, 'taxes', {
    highlight: true,
    label: 'Tax Cuts and Jobs Act conference report',
  }),
  selectedHouse('house-tax-cuts-final-concur', 2017, 699, 'taxes', {
    highlight: true,
    label: 'Tax Cuts and Jobs Act final concur vote',
  }),
  selectedHouse('house-2018-border-rule-pq', 2018, 285, 'immigration', {
    label: 'Border Security and Immigration Reform Act rule previous question',
  }),
  selectedHouse('house-2018-border-rule', 2018, 286, 'immigration', {
    label: 'Border Security and Immigration Reform Act rule adoption',
  }),
  selectedHouse('house-2018-border-passage', 2018, 297, 'immigration', {
    highlight: true,
    label: 'Border Security and Immigration Reform Act passage',
  }),
  selectedHouse('house-ice-support-resolution', 2018, 337, 'immigration', {
    highlight: true,
    label: 'Support for ICE resolution',
  }),
  selectedHouse('house-border-emergency-rule-pq-1', 2019, 92, 'emergency-powers', {
    label: 'First border emergency disapproval rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-border-emergency-rule-1', 2019, 93, 'emergency-powers', {
    label: 'First border emergency disapproval rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-border-emergency-disapproval-1', 2019, 94, 'emergency-powers', {
    highlight: true,
    label: 'First border emergency disapproval resolution',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-border-emergency-veto-override', 2019, 127, 'emergency-powers', {
    highlight: true,
    label: 'Border emergency veto override attempt',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-border-emergency-rule-pq-2', 2019, 549, 'emergency-powers', {
    label: 'Second border emergency disapproval rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-border-emergency-rule-2', 2019, 550, 'emergency-powers', {
    label: 'Second border emergency disapproval rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-border-emergency-disapproval-2', 2019, 553, 'emergency-powers', {
    highlight: true,
    label: 'Second border emergency disapproval resolution',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-first-impeachment-rule-pq', 2019, 693, 'impeachment', {
    label: 'First Trump impeachment rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-first-impeachment-rule', 2019, 694, 'impeachment', {
    label: 'First Trump impeachment rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-first-impeachment-article-1', 2019, 695, 'impeachment', {
    highlight: true,
    label: 'First Trump impeachment Article I',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-first-impeachment-article-2', 2019, 696, 'impeachment', {
    highlight: true,
    label: 'First Trump impeachment Article II',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-rule-pq-1', 2020, 5, 'war-powers', {
    label: 'Iran war powers rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-rule-1', 2020, 6, 'war-powers', {
    label: 'Iran war powers rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-1', 2020, 7, 'war-powers', {
    highlight: true,
    label: 'Iran war powers resolution',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-rule-2', 2020, 95, 'war-powers', {
    label: 'Second Iran war powers rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-rule-2-adopt', 2020, 96, 'war-powers', {
    label: 'Second Iran war powers rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-2', 2020, 101, 'war-powers', {
    highlight: true,
    label: 'Second Iran war powers resolution',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-ndaa-veto-override', 2020, 253, 'veto-override', {
    highlight: true,
    label: 'NDAA veto override',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-objection-arizona', 2021, 10, 'jan6', {
    highlight: true,
    label: 'Arizona electoral objection',
  }),
  selectedHouse('house-jan6-objection-pennsylvania', 2021, 11, 'jan6', {
    highlight: true,
    label: 'Pennsylvania electoral objection',
  }),
  selectedHouse('house-second-impeachment-rule-pq', 2021, 15, 'impeachment', {
    label: 'Second Trump impeachment rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-second-impeachment-rule', 2021, 16, 'impeachment', {
    label: 'Second Trump impeachment rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-second-impeachment', 2021, 17, 'impeachment', {
    highlight: true,
    label: 'Second Trump impeachment',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-commission-rule-pq', 2021, 151, 'jan6', {
    label: 'January 6 commission rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-commission-rule', 2021, 152, 'jan6', {
    label: 'January 6 commission rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-commission', 2021, 154, 'jan6', {
    highlight: true,
    label: 'January 6 commission passage',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-select-committee-rule-pq', 2021, 189, 'jan6', {
    label: 'January 6 select committee rule previous question',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-select-committee-rule', 2021, 190, 'jan6', {
    label: 'January 6 select committee rule adoption',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-jan6-select-committee', 2021, 197, 'jan6', {
    highlight: true,
    label: 'January 6 select committee creation',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-bannon-contempt', 2021, 329, 'jan6', {
    highlight: true,
    label: 'Steve Bannon contempt vote',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-meadows-contempt', 2021, 447, 'jan6', {
    highlight: true,
    label: 'Mark Meadows contempt vote',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-navarro-scavino-contempt', 2022, 118, 'jan6', {
    highlight: true,
    label: 'Navarro and Scavino contempt vote',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-2024-laken-riley-rule-pq', 2024, 62, 'immigration', {
    label: 'Laken Riley Act rule previous question',
  }),
  selectedHouse('house-2024-laken-riley-rule', 2024, 63, 'immigration', {
    label: 'Laken Riley Act rule adoption',
  }),
  selectedHouse('house-2024-laken-riley', 2024, 66, 'immigration', {
    highlight: true,
    label: 'Laken Riley Act passage',
  }),
  selectedHouse('house-2025-laken-riley-initial', 2025, 6, 'immigration', {
    highlight: true,
    label: 'Laken Riley Act initial House passage',
  }),
  selectedHouse('house-2025-laken-riley-rule-pq', 2025, 20, 'immigration', {
    label: 'Laken Riley Act Senate-amendment rule previous question',
  }),
  selectedHouse('house-2025-laken-riley-rule', 2025, 21, 'immigration', {
    label: 'Laken Riley Act Senate-amendment rule adoption',
  }),
  selectedHouse('house-2025-laken-riley-final', 2025, 23, 'immigration', {
    highlight: true,
    label: 'Laken Riley Act final passage',
  }),
  selectedHouse('house-2025-hr1-rule-pq', 2025, 141, 'reconciliation', {
    label: 'One Big Beautiful Bill rule previous question',
  }),
  selectedHouse('house-2025-hr1-rule', 2025, 142, 'reconciliation', {
    label: 'One Big Beautiful Bill rule adoption',
  }),
  selectedHouse('house-2025-hr1-passage', 2025, 145, 'reconciliation', {
    highlight: true,
    label: 'One Big Beautiful Bill Act House passage',
  }),
  selectedHouse('house-2025-sanctuary-package-rule-pq', 2025, 148, 'immigration', {
    label: 'Sanctuary-city package rule previous question',
  }),
  selectedHouse('house-2025-sanctuary-package-rule', 2025, 149, 'immigration', {
    label: 'Sanctuary-city package rule adoption',
  }),
  selectedHouse('house-2025-save-sba', 2025, 153, 'immigration', {
    highlight: true,
    label: 'Save SBA from Sanctuary Cities Act passage',
  }),
  selectedHouse('house-2025-rescissions-rule-pq', 2025, 164, 'rescissions', {
    label: 'Rescissions Act rule previous question',
  }),
  selectedHouse('house-2025-rescissions-rule', 2025, 165, 'rescissions', {
    label: 'Rescissions Act rule adoption',
  }),
  selectedHouse('house-2025-rescissions-passage', 2025, 168, 'rescissions', {
    highlight: true,
    label: 'Rescissions Act House passage',
  }),
  selectedHouse('house-2025-dc-immigration', 2025, 171, 'immigration', {
    highlight: true,
    label: 'D.C. Federal Immigration Compliance Act passage',
  }),
  selectedHouse('house-2025-hr1-senate-rule-pq', 2025, 187, 'reconciliation', {
    label: 'One Big Beautiful Bill Senate-amendment rule previous question',
  }),
  selectedHouse('house-2025-hr1-senate-rule', 2025, 189, 'reconciliation', {
    label: 'One Big Beautiful Bill Senate-amendment rule adoption',
  }),
  selectedHouse('house-2025-hr1-senate-concur', 2025, 190, 'reconciliation', {
    highlight: true,
    label: 'One Big Beautiful Bill Act final House concurrence',
  }),
  selectedHouse('house-2025-rescissions-senate-rule-pq', 2025, 202, 'rescissions', {
    label: 'Rescissions Act Senate-amendment rule previous question',
  }),
  selectedHouse('house-2025-rescissions-senate-rule', 2025, 203, 'rescissions', {
    label: 'Rescissions Act Senate-amendment rule adoption',
  }),
  selectedHouse('house-2025-kayla-hamilton-rule-pq', 2025, 337, 'immigration', {
    label: 'December 2025 energy-and-immigration package rule previous question',
  }),
  selectedHouse('house-2025-kayla-hamilton-rule', 2025, 338, 'immigration', {
    label: 'December 2025 energy-and-immigration package rule adoption',
  }),
  selectedHouse('house-2025-kayla-hamilton-passage', 2025, 340, 'immigration', {
    highlight: true,
    label: 'Kayla Hamilton Act passage',
  }),
  selectedHouse('house-2026-dhs-rule-pq-initial', 2026, 39, 'appropriations', {
    label: 'FY2026 DHS appropriations initial rule previous question',
  }),
  selectedHouse('house-2026-dhs-rule-initial', 2026, 41, 'appropriations', {
    label: 'FY2026 DHS appropriations initial rule adoption',
  }),
  selectedHouse('house-2026-dhs-passage-initial', 2026, 42, 'appropriations', {
    highlight: true,
    label: 'FY2026 DHS appropriations initial House passage',
  }),
  selectedHouse('house-2026-dhs-rule-pq', 2026, 79, 'appropriations', {
    label: 'FY2026 DHS appropriations rule previous question',
  }),
  selectedHouse('house-2026-dhs-rule', 2026, 80, 'appropriations', {
    label: 'FY2026 DHS appropriations rule adoption',
  }),
  selectedHouse('house-2026-dhs-passage', 2026, 87, 'appropriations', {
    highlight: true,
    label: 'FY2026 DHS appropriations House passage',
  }),
]

const houseCandidateExtras = [
  house('house-ahca-rule-pq-initial', 2017, 191, 'health-care', {
    label: 'American Health Care Act early rule previous question',
  }),
  house('house-ahca-rule-initial', 2017, 192, 'health-care', {
    label: 'American Health Care Act early rule adoption',
  }),
  house('house-no-sanctuary-rule-pq', 2017, 331, 'immigration', {
    label: 'No Sanctuary for Criminals Act rule previous question',
  }),
  house('house-no-sanctuary-recommit', 2017, 341, 'immigration', {
    label: 'No Sanctuary for Criminals Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-kates-law-recommit', 2017, 343, 'immigration', {
    label: "Kate's Law recommit motion",
    proTrumpCast: 'Nay',
  }),
  house('house-kates-law-passage', 2017, 344, 'immigration', {
    label: "Kate's Law passage",
  }),
  house('house-tax-cuts-go-to-conference', 2017, 653, 'taxes', {
    label: 'Tax Cuts and Jobs Act motion to go to conference',
  }),
  house('house-tax-cuts-instruct-conferees', 2017, 654, 'taxes', {
    label: 'Tax Cuts and Jobs Act motion to instruct conferees',
    proTrumpCast: 'Nay',
  }),
  house('house-tax-cuts-recommit-conference', 2017, 691, 'taxes', {
    label: 'Tax Cuts and Jobs Act conference recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-tax-cuts-senate-rule-pq', 2017, 697, 'taxes', {
    label: 'Tax Cuts and Jobs Act Senate-amendment rule previous question',
  }),
  house('house-tax-cuts-senate-rule', 2017, 698, 'taxes', {
    label: 'Tax Cuts and Jobs Act Senate-amendment rule adoption',
  }),
  house('house-2018-medicaid-rule-pq', 2018, 273, 'health-care', {
    label: 'IMD CARE Act rule previous question',
  }),
  house('house-2018-medicaid-rule', 2018, 274, 'health-care', {
    label: 'IMD CARE Act rule adoption',
  }),
  house('house-2018-medicaid-recommit', 2018, 275, 'health-care', {
    label: 'IMD CARE Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2018-medicaid-passage', 2018, 276, 'health-care', {
    label: 'IMD CARE Act passage',
  }),
  house('house-2018-border-recommit', 2018, 296, 'immigration', {
    label: 'Border Security and Immigration Reform Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-trump-impeachment-table', 2025, 322, 'impeachment', {
    highlight: true,
    label: 'Motion to table Trump impeachment resolution',
  }),
  house('house-2025-hr1-recommit', 2025, 144, 'reconciliation', {
    label: 'One Big Beautiful Bill Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-save-sba-recommit', 2025, 152, 'immigration', {
    label: 'Save SBA from Sanctuary Cities Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-rescissions-recommit', 2025, 167, 'rescissions', {
    label: 'Rescissions Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-dc-immigration-rule-pq', 2025, 160, 'immigration', {
    label: 'D.C. Federal Immigration Compliance Act rule previous question',
  }),
  house('house-2025-dc-immigration-rule', 2025, 161, 'immigration', {
    label: 'D.C. Federal Immigration Compliance Act rule adoption',
  }),
  house('house-2025-dc-immigration-recommit', 2025, 170, 'immigration', {
    label: 'D.C. Federal Immigration Compliance Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-kayla-hamilton-recommit', 2025, 339, 'immigration', {
    label: 'Kayla Hamilton Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-war-powers-western-hemisphere', 2025, 345, 'war-powers', {
    highlight: true,
    label: 'Western Hemisphere war powers resolution',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-war-powers-venezuela', 2025, 346, 'war-powers', {
    highlight: true,
    label: 'Venezuela war powers resolution',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-cr-rule-pq', 2025, 272, 'appropriations', {
    label: 'FY2026 continuing appropriations rule previous question',
  }),
  house('house-2025-cr-rule', 2025, 273, 'appropriations', {
    label: 'FY2026 continuing appropriations rule adoption',
  }),
  house('house-2025-cr-recommit', 2025, 280, 'appropriations', {
    label: 'FY2026 continuing appropriations recommit motion',
    proTrumpCast: 'Nay',
  }),
  house('house-2025-cr-passage', 2025, 281, 'appropriations', {
    label: 'Continuing Appropriations and Extensions Act, 2026 House passage',
  }),
  house('house-2025-cr-senate-rule-pq', 2025, 283, 'appropriations', {
    label: 'FY2026 continuing appropriations Senate-amendment rule previous question',
  }),
  house('house-2025-cr-senate-rule', 2025, 284, 'appropriations', {
    label: 'FY2026 continuing appropriations Senate-amendment rule adoption',
  }),
  house('house-2025-cr-senate-concur', 2025, 285, 'appropriations', {
    label: 'Continuing Appropriations and Extensions Act, 2026 final House concurrence',
  }),
  house('house-2026-consolidated-senate-rule-pq', 2026, 51, 'appropriations', {
    label: 'FY2026 consolidated appropriations Senate-amendment rule previous question',
  }),
  house('house-2026-consolidated-senate-rule', 2026, 52, 'appropriations', {
    label: 'FY2026 consolidated appropriations Senate-amendment rule adoption',
  }),
  house('house-2026-consolidated-senate-concur', 2026, 53, 'appropriations', {
    label: 'Consolidated Appropriations Act, 2026 final House concurrence',
  }),
  house('house-2026-dhs-recommit', 2026, 86, 'appropriations', {
    label: 'FY2026 DHS appropriations recommit motion',
    proTrumpCast: 'Nay',
  }),
]

const broadHouseRollCalls = [
  selectedBroadHouse('house-2023-secure-border-rule-pq', 2023, 205, 'immigration', {
    label: 'Secure the Border Act rule previous question',
  }),
  selectedBroadHouse('house-2023-secure-border-rule', 2023, 207, 'immigration', {
    label: 'Secure the Border Act rule adoption',
  }),
  selectedBroadHouse('house-2023-secure-border-recommit', 2023, 208, 'immigration', {
    label: 'Secure the Border Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2023-secure-border-passage', 2023, 209, 'immigration', {
    label: 'Secure the Border Act passage',
  }),
  selectedBroadHouse('house-2023-border-spending-rule-pq', 2023, 508, 'appropriations', {
    label: 'Spending Reduction and Border Security Act rule previous question',
  }),
  selectedBroadHouse('house-2023-border-spending-rule', 2023, 509, 'appropriations', {
    label: 'Spending Reduction and Border Security Act rule adoption',
  }),
  selectedBroadHouse('house-2023-border-spending-recommit', 2023, 510, 'appropriations', {
    label: 'Spending Reduction and Border Security Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2023-border-spending-passage', 2023, 511, 'appropriations', {
    label: 'Spending Reduction and Border Security Act passage',
  }),
  selectedBroadHouse('house-2023-communities-border-rule-pq', 2023, 678, 'immigration', {
    label: 'Protecting Our Communities from Failure to Secure the Border Act rule previous question',
  }),
  selectedBroadHouse('house-2023-communities-border-rule', 2023, 679, 'immigration', {
    label: 'Protecting Our Communities from Failure to Secure the Border Act rule adoption',
  }),
  selectedBroadHouse('house-2023-communities-border-passage', 2023, 689, 'immigration', {
    label: 'Protecting Our Communities from Failure to Secure the Border Act passage',
  }),
  selectedBroadHouse('house-2024-hamas-immigration-rule-pq', 2024, 22, 'immigration', {
    label: 'No Immigration Benefits for Hamas Terrorists Act rule previous question',
  }),
  selectedBroadHouse('house-2024-hamas-immigration-rule', 2024, 23, 'immigration', {
    label: 'No Immigration Benefits for Hamas Terrorists Act rule adoption',
  }),
  selectedBroadHouse('house-2024-hamas-immigration-passage', 2024, 28, 'immigration', {
    label: 'No Immigration Benefits for Hamas Terrorists Act passage',
  }),
  selectedBroadHouse('house-2024-trump-assassination-task-force', 2024, 393, 'trump', {
    label: 'Trump assassination task force resolution',
  }),
  selectedBroadHouse('house-2024-detain-deport-assault-cops', 2024, 204, 'immigration', {
    label: 'Detain and Deport Illegal Aliens Who Assault Cops Act passage',
  }),
  selectedBroadHouse('house-2024-police-our-border-passage', 2024, 215, 'immigration', {
    label: 'Police Our Border Act passage',
  }),
  selectedBroadHouse('house-2024-sanctuary-cities-recommit', 2024, 436, 'immigration', {
    label: 'No Bailout for Sanctuary Cities Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2024-sanctuary-cities-passage', 2024, 437, 'immigration', {
    label: 'No Bailout for Sanctuary Cities Act passage',
  }),
  selectedBroadHouse('house-2025-workforce-rule-discharge', 2025, 321, 'labor', {
    label: "Protect America's Workforce Act rule discharge motion",
  }),
  selectedBroadHouse('house-2025-state-planning-power', 2025, 323, 'energy', {
    label: 'State Planning for Reliability and Affordability Act passage',
  }),
  selectedBroadHouse('house-2025-electric-supply-chain', 2025, 324, 'energy', {
    label: 'Electric Supply Chain Act passage',
  }),
  selectedBroadHouse('house-2025-permit-recommit', 2025, 329, 'energy', {
    label: 'PERMIT Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-permit-passage', 2025, 330, 'energy', {
    label: 'PERMIT Act passage',
  }),
  selectedBroadHouse('house-2025-workforce-rule', 2025, 331, 'labor', {
    label: "Protect America's Workforce Act rule adoption",
  }),
  selectedBroadHouse('house-2025-workforce-passage', 2025, 332, 'labor', {
    label: "Protect America's Workforce Act passage",
  }),
  selectedBroadHouse('house-2025-pipeline-recommit', 2025, 333, 'energy', {
    label: 'Pipeline Reviews Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-pipeline-passage', 2025, 334, 'energy', {
    label: 'Pipeline Reviews Act passage',
  }),
  selectedBroadHouse('house-2025-health-package-rule-pq', 2025, 343, 'health-care', {
    label: 'December 2025 health-and-SPEED package rule previous question',
  }),
  selectedBroadHouse('house-2025-health-package-rule', 2025, 344, 'health-care', {
    label: 'December 2025 health-and-SPEED package rule adoption',
  }),
  selectedBroadHouse('house-2025-reliable-power', 2025, 347, 'energy', {
    label: 'Reliable Power Act passage',
  }),
  selectedBroadHouse('house-2025-lower-premiums-recommit', 2025, 348, 'health-care', {
    label: 'Lower Health Care Premiums Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-lower-premiums-passage', 2025, 349, 'health-care', {
    label: 'Lower Health Care Premiums Act passage',
  }),
  selectedBroadHouse('house-2025-childrens-innocence-recommit', 2025, 350, 'culture-war', {
    label: "Protect Children's Innocence Act recommit motion",
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-childrens-innocence-passage', 2025, 351, 'culture-war', {
    label: "Protect Children's Innocence Act passage",
  }),
  selectedBroadHouse('house-2025-speed-recommit', 2025, 355, 'energy', {
    label: 'SPEED Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-speed-passage', 2025, 356, 'energy', {
    label: 'SPEED Act passage',
  }),
  selectedBroadHouse('house-2025-mining-recommit', 2025, 357, 'energy', {
    label: 'Mining Regulatory Clarity Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-mining-passage', 2025, 358, 'energy', {
    label: 'Mining Regulatory Clarity Act passage',
  }),
  selectedBroadHouse('house-2025-do-no-harm-medicaid-recommit', 2025, 361, 'health-care', {
    label: 'Do No Harm in Medicaid Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-do-no-harm-medicaid-passage', 2025, 362, 'health-care', {
    label: 'Do No Harm in Medicaid Act passage',
  }),
  selectedBroadHouse('house-2025-power-plant-recommit', 2025, 341, 'energy', {
    label: 'Power Plant Reliability Act recommit motion',
    proTrumpCast: 'Nay',
  }),
  selectedBroadHouse('house-2025-power-plant-passage', 2025, 342, 'energy', {
    label: 'Power Plant Reliability Act passage',
  }),
  selectedBroadHouse('house-2026-deporting-fraudsters-rule-pq', 2026, 90, 'immigration', {
    label: 'Deporting Fraudsters Act rule previous question',
  }),
  selectedBroadHouse('house-2026-deporting-fraudsters-rule', 2026, 91, 'immigration', {
    label: 'Deporting Fraudsters Act rule adoption',
  }),
  selectedBroadHouse('house-2026-deporting-fraudsters-passage', 2026, 94, 'immigration', {
    label: 'Deporting Fraudsters Act passage',
  }),
]

const selectedSenateRollCalls = [
  selectedSenate('senate-obamacare-2017-5', 115, 1, 5, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 1',
  }),
  selectedSenate('senate-obamacare-2017-6', 115, 1, 6, 'health-care', {
    highlight: true,
    label: 'Trump no-cuts Medicaid amendment test',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-obamacare-2017-9', 115, 1, 9, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 2',
  }),
  selectedSenate('senate-obamacare-2017-11', 115, 1, 11, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 3',
  }),
  selectedSenate('senate-obamacare-2017-13', 115, 1, 13, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 4',
  }),
  selectedSenate('senate-obamacare-2017-16', 115, 1, 16, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 5',
  }),
  selectedSenate('senate-obamacare-2017-17', 115, 1, 17, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 6',
  }),
  selectedSenate('senate-obamacare-2017-19', 115, 1, 19, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 7',
  }),
  selectedSenate('senate-obamacare-2017-22', 115, 1, 22, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 8',
  }),
  selectedSenate('senate-obamacare-2017-24', 115, 1, 24, 'health-care', {
    label: 'Obamacare repeal reserve-fund vote 9',
  }),
  selectedSenate('senate-obamacare-motion-to-proceed', 115, 1, 167, 'health-care', {
    highlight: true,
    label: 'Obamacare repeal motion to proceed',
  }),
  selectedSenate('senate-obamacare-heller-medicaid', 115, 1, 172, 'health-care', {
    highlight: true,
    label: 'Medicaid expansion protection test',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-obamacare-commit-schumer', 115, 1, 176, 'health-care', {
    label: 'Obamacare repeal Schumer commit motion',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-obamacare-commit-murray', 115, 1, 178, 'health-care', {
    label: 'Obamacare repeal Murray commit motion',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-tax-cuts-motion-to-proceed', 115, 1, 284, 'taxes', {
    label: 'Tax Cuts and Jobs Act motion to proceed',
  }),
  selectedSenate('senate-tax-cuts-passage', 115, 1, 303, 'taxes', {
    highlight: true,
    label: 'Tax Cuts and Jobs Act Senate passage',
  }),
  selectedSenate('senate-tax-cuts-conference', 115, 1, 306, 'taxes', {
    highlight: true,
    label: 'Tax Cuts and Jobs Act conference request',
  }),
  selectedSenate('senate-tax-cuts-final', 115, 1, 323, 'taxes', {
    highlight: true,
    label: 'Tax Cuts and Jobs Act final vote',
  }),
  selectedSenate('senate-gorsuch-cloture', 115, 1, 105, 'nominations', {
    label: 'Gorsuch cloture',
  }),
  selectedSenate('senate-gorsuch-confirm', 115, 1, 111, 'nominations', {
    highlight: true,
    label: 'Gorsuch confirmation',
  }),
  selectedSenate('senate-barrett-7th-cloture', 115, 1, 254, 'nominations', {
    label: 'Amy Coney Barrett 7th Circuit cloture',
  }),
  selectedSenate('senate-barrett-7th-confirm', 115, 1, 255, 'nominations', {
    highlight: true,
    label: 'Amy Coney Barrett 7th Circuit confirmation',
  }),
  selectedSenate('senate-bibas-cloture', 115, 1, 260, 'nominations', {
    label: 'Stephanos Bibas cloture',
  }),
  selectedSenate('senate-bibas-confirm', 115, 1, 261, 'nominations', {
    highlight: true,
    label: 'Stephanos Bibas confirmation',
  }),
  selectedSenate('senate-lighthizer-cloture', 115, 1, 126, 'trade', {
    label: 'Lighthizer cloture',
  }),
  selectedSenate('senate-lighthizer-confirm', 115, 1, 127, 'trade', {
    highlight: true,
    label: 'Lighthizer confirmation',
  }),
  selectedSenate('senate-vought-deputy-omb-cloture', 115, 2, 39, 'nominations', {
    label: 'Russell Vought deputy OMB cloture',
  }),
  selectedSenate('senate-vought-deputy-omb-confirm', 115, 2, 40, 'nominations', {
    highlight: true,
    label: 'Russell Vought deputy OMB confirmation',
  }),
  selectedSenate('senate-kavanaugh-cloture', 115, 2, 222, 'nominations', {
    label: 'Kavanaugh cloture',
  }),
  selectedSenate('senate-kavanaugh-confirm', 115, 2, 223, 'nominations', {
    highlight: true,
    label: 'Kavanaugh confirmation',
  }),
  selectedSenate('senate-mcaleenan-cloture', 115, 2, 55, 'immigration', {
    label: 'Kevin McAleenan cloture',
  }),
  selectedSenate('senate-mcaleenan-confirm', 115, 2, 56, 'immigration', {
    highlight: true,
    label: 'Kevin McAleenan confirmation',
  }),
  selectedSenate('senate-border-emergency-2019', 116, 1, 49, 'emergency-powers', {
    highlight: true,
    label: 'First border emergency disapproval',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-border-emergency-2019-second', 116, 1, 302, 'emergency-powers', {
    highlight: true,
    label: 'Second border emergency disapproval',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-border-emergency-veto-override', 116, 1, 325, 'emergency-powers', {
    highlight: true,
    label: 'Border emergency veto override attempt',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-usmca-waive', 116, 2, 13, 'trade', {
    label: 'USMCA budget waiver vote',
  }),
  selectedSenate('senate-usmca-passage', 116, 2, 14, 'trade', {
    highlight: true,
    label: 'USMCA passage',
  }),
  selectedSenate('senate-first-impeachment-article-1', 116, 2, 33, 'impeachment', {
    highlight: true,
    label: 'First Trump impeachment trial Article I',
    proTrumpCast: 'Not Guilty',
  }),
  selectedSenate('senate-first-impeachment-article-2', 116, 2, 34, 'impeachment', {
    highlight: true,
    label: 'First Trump impeachment trial Article II',
    proTrumpCast: 'Not Guilty',
  }),
  selectedSenate('senate-barrett-scotus-cloture', 116, 2, 222, 'nominations', {
    label: 'Barrett Supreme Court cloture',
  }),
  selectedSenate('senate-barrett-scotus-confirm', 116, 2, 224, 'nominations', {
    highlight: true,
    label: 'Barrett Supreme Court confirmation',
  }),
  selectedSenate('senate-vought-omb-cloture', 116, 2, 130, 'nominations', {
    label: 'Russell Vought OMB cloture',
  }),
  selectedSenate('senate-vought-omb-confirm', 116, 2, 131, 'nominations', {
    highlight: true,
    label: 'Russell Vought OMB confirmation',
  }),
  selectedSenate('senate-iran-war-powers', 116, 2, 52, 'war-powers', {
    highlight: true,
    label: 'Iran war powers resolution',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-iran-war-powers-veto-override', 116, 2, 84, 'war-powers', {
    highlight: true,
    label: 'Iran war powers veto override attempt',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-jan6-objection-arizona', 117, 1, 1, 'jan6', {
    highlight: true,
    label: 'Arizona electoral objection',
  }),
  selectedSenate('senate-jan6-objection-pennsylvania', 117, 1, 2, 'jan6', {
    highlight: true,
    label: 'Pennsylvania electoral objection',
  }),
  selectedSenate('senate-second-impeachment-jurisdiction', 117, 1, 57, 'impeachment', {
    highlight: true,
    label: 'Second impeachment jurisdiction vote',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-second-impeachment-conviction', 117, 1, 59, 'impeachment', {
    highlight: true,
    label: 'Second Trump impeachment trial conviction vote',
    proTrumpCast: 'Not Guilty',
  }),
  selectedSenate('senate-canada-tariff-termination', 119, 1, 160, 'tariffs', {
    highlight: true,
    label: 'Canada tariff emergency termination',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-global-tariff-termination', 119, 1, 225, 'tariffs', {
    highlight: true,
    label: 'Global tariff emergency termination',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-global-tariff-reconsider-table', 119, 1, 226, 'tariffs', {
    label: 'Tabling reconsideration on global tariff emergency',
  }),
  selectedSenate('senate-canada-tariff-termination-october', 119, 1, 598, 'tariffs', {
    highlight: true,
    label: 'Canada tariff emergency termination revisit',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-global-tariff-termination-october', 119, 1, 600, 'tariffs', {
    highlight: true,
    label: 'Global tariff emergency termination revisit',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr1-motion-to-proceed', 119, 1, 329, 'reconciliation', {
    label: 'One Big Beautiful Bill motion to proceed',
  }),
  selectedSenate('senate-hr1-chair-ruling', 119, 1, 331, 'reconciliation', {
    label: 'One Big Beautiful Bill Byrd-rule chair ruling',
  }),
  selectedSenate('senate-hr1-waive', 119, 1, 334, 'reconciliation', {
    label: 'One Big Beautiful Bill budget waiver',
  }),
  selectedSenate('senate-hr1-medicaid-immigration', 119, 1, 345, 'reconciliation', {
    highlight: true,
    label: 'One Big Beautiful Bill Medicaid immigration provision',
  }),
  selectedSenate('senate-hr1-passage', 119, 1, 372, 'reconciliation', {
    highlight: true,
    label: 'One Big Beautiful Bill Senate passage',
  }),
  selectedSenate('senate-ratcliffe-cloture', 119, 1, 12, 'nominations', {
    label: 'Ratcliffe cloture',
  }),
  selectedSenate('senate-ratcliffe-confirm', 119, 1, 13, 'nominations', {
    highlight: true,
    label: 'Ratcliffe confirmation',
  }),
  selectedSenate('senate-noem-cloture', 119, 1, 16, 'nominations', {
    label: 'Noem cloture',
  }),
  selectedSenate('senate-noem-confirm', 119, 1, 17, 'nominations', {
    highlight: true,
    label: 'Noem confirmation',
  }),
  selectedSenate('senate-bessent-cloture', 119, 1, 18, 'nominations', {
    label: 'Bessent cloture',
  }),
  selectedSenate('senate-bessent-confirm', 119, 1, 19, 'nominations', {
    highlight: true,
    label: 'Bessent confirmation',
  }),
  selectedSenate('senate-duffy-cloture', 119, 1, 20, 'nominations', {
    label: 'Duffy cloture',
  }),
  selectedSenate('senate-duffy-confirm', 119, 1, 21, 'nominations', {
    highlight: true,
    label: 'Duffy confirmation',
  }),
  selectedSenate('senate-zeldin-cloture', 119, 1, 23, 'nominations', {
    label: 'Zeldin cloture',
  }),
  selectedSenate('senate-zeldin-confirm', 119, 1, 24, 'nominations', {
    highlight: true,
    label: 'Zeldin confirmation',
  }),
  selectedSenate('senate-collins-va-cloture', 119, 1, 28, 'nominations', {
    label: 'Doug Collins cloture',
  }),
  selectedSenate('senate-collins-va-confirm', 119, 1, 32, 'nominations', {
    highlight: true,
    label: 'Doug Collins confirmation',
  }),
  selectedSenate('senate-vought-2025-motion-to-proceed', 119, 1, 29, 'nominations', {
    label: 'Russell Vought 2025 motion to proceed',
  }),
  selectedSenate('senate-vought-2025-cloture', 119, 1, 36, 'nominations', {
    label: 'Russell Vought 2025 cloture',
  }),
  selectedSenate('senate-vought-2025-confirm', 119, 1, 37, 'nominations', {
    highlight: true,
    label: 'Russell Vought 2025 confirmation',
  }),
  selectedSenate('senate-gabbard-cloture', 119, 1, 49, 'nominations', {
    label: 'Tulsi Gabbard cloture',
  }),
  selectedSenate('senate-gabbard-confirm', 119, 1, 50, 'nominations', {
    highlight: true,
    label: 'Tulsi Gabbard confirmation',
  }),
  selectedSenate('senate-rfk-cloture', 119, 1, 51, 'nominations', {
    label: 'Robert F. Kennedy Jr. cloture',
  }),
  selectedSenate('senate-rfk-confirm', 119, 1, 52, 'nominations', {
    highlight: true,
    label: 'Robert F. Kennedy Jr. confirmation',
  }),
  selectedSenate('senate-lutnick-cloture', 119, 1, 54, 'nominations', {
    label: 'Howard Lutnick cloture',
  }),
  selectedSenate('senate-lutnick-confirm', 119, 1, 57, 'nominations', {
    highlight: true,
    label: 'Howard Lutnick confirmation',
  }),
  selectedSenate('senate-loeffler-cloture', 119, 1, 55, 'nominations', {
    label: 'Kelly Loeffler cloture',
  }),
  selectedSenate('senate-loeffler-confirm', 119, 1, 59, 'nominations', {
    highlight: true,
    label: 'Kelly Loeffler confirmation',
  }),
  selectedSenate('senate-greer-cloture', 119, 1, 89, 'trade', {
    label: 'Jamieson Greer cloture',
  }),
  selectedSenate('senate-greer-confirm', 119, 1, 94, 'trade', {
    highlight: true,
    label: 'Jamieson Greer confirmation',
  }),
  selectedSenate('senate-chavez-deremer-cloture', 119, 1, 109, 'nominations', {
    label: 'Lori Chavez-DeRemer cloture',
  }),
  selectedSenate('senate-chavez-deremer-confirm', 119, 1, 111, 'nominations', {
    highlight: true,
    label: 'Lori Chavez-DeRemer confirmation',
  }),
  selectedSenate('senate-oz-cloture', 119, 1, 164, 'health-care', {
    label: 'Mehmet Oz cloture',
  }),
  selectedSenate('senate-oz-confirm', 119, 1, 167, 'health-care', {
    highlight: true,
    label: 'Mehmet Oz confirmation',
  }),
  selectedSenate('senate-atkins-cloture', 119, 1, 200, 'nominations', {
    label: 'Paul Atkins cloture',
  }),
  selectedSenate('senate-atkins-confirm', 119, 1, 205, 'nominations', {
    highlight: true,
    label: 'Paul Atkins confirmation',
  }),
  selectedSenate('senate-s5-cloture-motion-to-proceed', 119, 1, 1, 'immigration', {
    label: 'Laken Riley Act cloture on motion to proceed',
  }),
  selectedSenate('senate-s5-motion-to-proceed', 119, 1, 2, 'immigration', {
    highlight: true,
    label: 'Laken Riley Act motion to proceed',
  }),
  selectedSenate('senate-s5-cornyn-amendment', 119, 1, 3, 'immigration', {
    label: 'Laken Riley Act Cornyn amendment',
  }),
  selectedSenate('senate-s5-coons-amendment', 119, 1, 4, 'immigration', {
    label: 'Laken Riley Act Coons amendment',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-s5-cloture', 119, 1, 5, 'immigration', {
    label: 'Laken Riley Act cloture',
  }),
  selectedSenate('senate-s5-ernst-amendment', 119, 1, 6, 'immigration', {
    label: 'Laken Riley Act Ernst amendment',
  }),
  selectedSenate('senate-s5-passage', 119, 1, 7, 'immigration', {
    highlight: true,
    label: 'Laken Riley Act passage',
  }),
  selectedSenate('senate-iran-hostilities-sjres59-discharge', 119, 1, 328, 'war-powers', {
    highlight: true,
    label: 'Iran hostilities discharge (S.J. Res. 59)',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr4-discharge', 119, 1, 391, 'rescissions', {
    label: 'H.R. 4 rescissions discharge motion',
  }),
  selectedSenate('senate-hr4-motion-to-proceed', 119, 1, 392, 'rescissions', {
    highlight: true,
    label: 'H.R. 4 rescissions motion to proceed',
  }),
  selectedSenate('senate-hr4-schmitt-substitute', 119, 1, 410, 'rescissions', {
    label: 'H.R. 4 rescissions substitute amendment',
  }),
  selectedSenate('senate-hr4-passage', 119, 1, 411, 'rescissions', {
    highlight: true,
    label: 'H.R. 4 rescissions passage',
  }),
  selectedSenate('senate-s2882-initial-passage', 119, 1, 527, 'appropriations', {
    highlight: true,
    label: 'S. 2882 continuing appropriations initial passage',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr5371-initial-passage', 119, 1, 528, 'appropriations', {
    highlight: true,
    label: 'H.R. 5371 continuing appropriations initial passage',
  }),
  selectedSenate('senate-s2882-reconsidered-passage', 119, 1, 534, 'appropriations', {
    label: 'S. 2882 continuing appropriations reconsidered passage',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr5371-reconsidered-passage', 119, 1, 535, 'appropriations', {
    label: 'H.R. 5371 continuing appropriations reconsidered passage',
  }),
  selectedSenate('senate-s2882-oct1-cloture-motion-to-proceed', 119, 1, 536, 'appropriations', {
    label: 'S. 2882 continuing appropriations cloture on motion to proceed',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr5371-oct1-cloture-motion-to-proceed', 119, 1, 537, 'appropriations', {
    label: 'H.R. 5371 continuing appropriations cloture on motion to proceed',
  }),
  selectedSenate('senate-hr5371-nov9-cloture-motion-to-proceed', 119, 1, 610, 'appropriations', {
    label: 'H.R. 5371 continuing appropriations cloture on motion to proceed revisit',
  }),
  selectedSenate('senate-hr5371-motion-to-proceed', 119, 1, 611, 'appropriations', {
    label: 'H.R. 5371 continuing appropriations motion to proceed',
  }),
  selectedSenate('senate-hr5371-cloture', 119, 1, 617, 'appropriations', {
    label: 'H.R. 5371 continuing appropriations cloture',
  }),
  selectedSenate('senate-hr5371-final-passage', 119, 1, 618, 'appropriations', {
    highlight: true,
    label: 'H.R. 5371 continuing appropriations final passage',
  }),
  selectedSenate('senate-venezuela-hostilities-sjres98-discharge', 119, 2, 5, 'war-powers', {
    highlight: true,
    label: 'Venezuela hostilities discharge (S.J. Res. 98)',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr6938-cloture-motion-to-proceed', 119, 2, 7, 'appropriations', {
    label: 'H.R. 6938 consolidated appropriations cloture on motion to proceed',
  }),
  selectedSenate('senate-hr6938-cloture', 119, 2, 10, 'appropriations', {
    label: 'H.R. 6938 consolidated appropriations cloture',
  }),
  selectedSenate('senate-hr6938-passage', 119, 2, 11, 'appropriations', {
    highlight: true,
    label: 'H.R. 6938 consolidated appropriations passage',
  }),
  selectedSenate('senate-hr7148-cloture-motion-to-proceed', 119, 2, 13, 'appropriations', {
    label: 'H.R. 7148 further appropriations cloture on motion to proceed',
  }),
  selectedSenate('senate-hr7148-sanders-amendment', 119, 2, 18, 'rescissions', {
    label: 'H.R. 7148 Sanders ICE and Medicaid amendment',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr7148-merkley-waiver', 119, 2, 19, 'rescissions', {
    label: 'H.R. 7148 Merkley anti-impoundment waiver',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr7148-passage', 119, 2, 20, 'appropriations', {
    highlight: true,
    label: 'H.R. 7148 further appropriations passage',
  }),
  selectedSenate('senate-hr7147-feb12-cloture-motion-to-proceed', 119, 2, 38, 'appropriations', {
    label: 'H.R. 7147 further appropriations cloture on motion to proceed',
  }),
  selectedSenate('senate-hr7147-feb24-cloture-motion-to-proceed', 119, 2, 39, 'appropriations', {
    label: 'H.R. 7147 further appropriations cloture on motion to proceed revisit',
  }),
  selectedSenate('senate-iran-hostilities-sjres104-discharge', 119, 2, 46, 'war-powers', {
    highlight: true,
    label: 'Iran hostilities discharge (S.J. Res. 104)',
    proTrumpCast: 'Nay',
  }),
  selectedSenate('senate-hr7147-mar5-cloture-motion-to-proceed', 119, 2, 47, 'appropriations', {
    label: 'H.R. 7147 further appropriations cloture on motion to proceed reconsideration',
  }),
  selectedSenate('senate-hr7147-mar12-cloture-motion-to-proceed', 119, 2, 54, 'appropriations', {
    label: 'H.R. 7147 further appropriations cloture on motion to proceed final attempt',
  }),
  selectedSenate('senate-st-john-cloture', 119, 2, 55, 'nominations', {
    label: 'Anna St. John cloture',
  }),
  selectedSenate('senate-st-john-confirm', 119, 2, 56, 'nominations', {
    highlight: true,
    label: 'Anna St. John confirmation',
  }),
  selectedSenate('senate-iran-hostilities-sjres118-discharge', 119, 2, 58, 'war-powers', {
    highlight: true,
    label: 'Iran hostilities discharge (S.J. Res. 118)',
    proTrumpCast: 'Nay',
  }),
]

const senateCandidateExtras = [
  senate('senate-ratcliffe-motion-to-proceed', 119, 1, 9, 'nominations', {
    label: 'Ratcliffe motion to proceed',
  }),
  senate('senate-kash-patel-motion-to-proceed', 119, 1, 56, 'nominations', {
    highlight: true,
    label: 'Kash Patel motion to proceed',
  }),
  senate('senate-kash-patel-cloture', 119, 1, 60, 'nominations', {
    highlight: true,
    label: 'Kash Patel cloture',
  }),
  senate('senate-kash-patel-confirm', 119, 1, 61, 'nominations', {
    highlight: true,
    label: 'Kash Patel confirmation',
  }),
  senate('senate-budget-resolution-motion-to-proceed', 119, 1, 58, 'reconciliation', {
    highlight: true,
    label: 'FY2025 budget resolution motion to proceed',
  }),
  senate('senate-budget-resolution-adoption', 119, 1, 87, 'reconciliation', {
    highlight: true,
    label: 'FY2025 budget resolution adoption',
  }),
  selectedBroadSenate('senate-boem-cra-motion-to-proceed', 119, 1, 91, 'energy', {
    label: 'BOEM archaeology rule disapproval motion to proceed',
  }),
  selectedBroadSenate('senate-boem-cra-passage', 119, 1, 92, 'energy', {
    highlight: true,
    label: 'BOEM archaeology rule disapproval',
  }),
  selectedBroadSenate('senate-epa-methane-cra-motion-to-proceed', 119, 1, 96, 'energy', {
    label: 'EPA methane fee rule disapproval motion to proceed',
  }),
  selectedBroadSenate('senate-epa-methane-cra-passage', 119, 1, 97, 'energy', {
    highlight: true,
    label: 'EPA methane fee rule disapproval',
  }),
  selectedBroadSenate('senate-irs-crypto-cra-motion-to-proceed', 119, 1, 101, 'taxes', {
    label: 'IRS crypto reporting rule disapproval motion to proceed',
  }),
  selectedBroadSenate('senate-irs-crypto-cra-passage', 119, 1, 102, 'taxes', {
    highlight: true,
    label: 'IRS crypto reporting rule disapproval',
  }),
  selectedBroadSenate('senate-cfpb-payments-cra-motion-to-proceed', 119, 1, 103, 'trade', {
    label: 'CFPB digital payments rule disapproval motion to proceed',
  }),
  selectedBroadSenate('senate-cfpb-payments-cra-passage', 119, 1, 106, 'trade', {
    highlight: true,
    label: 'CFPB digital payments rule disapproval',
  }),
  senate('senate-driscoll-cloture', 119, 1, 88, 'nominations', {
    label: 'Daniel Driscoll cloture',
  }),
  senate('senate-driscoll-confirm', 119, 1, 90, 'nominations', {
    highlight: true,
    label: 'Daniel Driscoll confirmation',
  }),
  senate('senate-blanche-cloture', 119, 1, 104, 'nominations', {
    label: 'Todd Blanche cloture',
  }),
  senate('senate-blanche-confirm', 119, 1, 105, 'nominations', {
    highlight: true,
    label: 'Todd Blanche confirmation',
  }),
  senate('senate-edgar-cloture', 119, 1, 107, 'immigration', {
    label: 'Troy Edgar cloture',
  }),
  senate('senate-edgar-confirm', 119, 1, 108, 'immigration', {
    highlight: true,
    label: 'Troy Edgar confirmation',
  }),
  senate('senate-bradbury-cloture', 119, 1, 112, 'nominations', {
    label: 'Steven Bradbury cloture',
  }),
  senate('senate-bradbury-confirm', 119, 1, 113, 'nominations', {
    highlight: true,
    label: 'Steven Bradbury confirmation',
  }),
  senate('senate-slater-cloture', 119, 1, 114, 'nominations', {
    label: 'Abigail Slater cloture',
  }),
  senate('senate-slater-confirm', 119, 1, 115, 'nominations', {
    highlight: true,
    label: 'Abigail Slater confirmation',
  }),
  senate('senate-sonderling-cloture', 119, 1, 118, 'nominations', {
    label: 'Keith Sonderling cloture',
  }),
  senate('senate-sonderling-confirm', 119, 1, 119, 'nominations', {
    highlight: true,
    label: 'Keith Sonderling confirmation',
  }),
  senate('senate-pulte-cloture', 119, 1, 120, 'nominations', {
    label: 'William Pulte cloture',
  }),
  senate('senate-pulte-confirm', 119, 1, 121, 'nominations', {
    highlight: true,
    label: 'William Pulte confirmation',
  }),
  senate('senate-mattis-confirm', 115, 1, 29, 'nominations', {
    label: 'James Mattis confirmation',
  }),
  senate('senate-pompeo-cia-motion-to-proceed', 115, 1, 31, 'nominations', {
    label: 'Mike Pompeo CIA motion to proceed',
  }),
  senate('senate-pompeo-cia-confirm', 115, 1, 32, 'nominations', {
    label: 'Mike Pompeo CIA confirmation',
  }),
  senate('senate-haley-un-confirm', 115, 1, 33, 'nominations', {
    label: 'Nikki Haley U.N. confirmation',
  }),
  senate('senate-tillerson-cloture', 115, 1, 34, 'nominations', {
    label: 'Rex Tillerson cloture',
  }),
  senate('senate-chao-confirm', 115, 1, 35, 'nominations', {
    label: 'Elaine Chao confirmation',
  }),
  senate('senate-tillerson-confirm', 115, 1, 36, 'nominations', {
    label: 'Rex Tillerson confirmation',
  }),
  senate('senate-devos-motion-to-proceed', 115, 1, 40, 'nominations', {
    label: 'Betsy DeVos motion to proceed',
  }),
  senate('senate-devos-cloture', 115, 1, 52, 'nominations', {
    label: 'Betsy DeVos cloture',
  }),
  senate('senate-devos-confirm', 115, 1, 54, 'nominations', {
    label: 'Betsy DeVos confirmation',
  }),
  senate('senate-sessions-motion-to-proceed', 115, 1, 44, 'nominations', {
    label: 'Jeff Sessions motion to proceed',
  }),
  senate('senate-sessions-cloture', 115, 1, 55, 'nominations', {
    label: 'Jeff Sessions cloture',
  }),
  senate('senate-sessions-confirm', 115, 1, 59, 'nominations', {
    label: 'Jeff Sessions confirmation',
  }),
  senate('senate-price-motion-to-proceed', 115, 1, 46, 'health-care', {
    label: 'Tom Price motion to proceed',
  }),
  senate('senate-price-cloture', 115, 1, 60, 'health-care', {
    label: 'Tom Price cloture',
  }),
  senate('senate-price-confirm', 115, 1, 61, 'health-care', {
    label: 'Tom Price confirmation',
  }),
  senate('senate-mnuchin-motion-to-proceed', 115, 1, 48, 'nominations', {
    label: 'Steven Mnuchin motion to proceed',
  }),
  senate('senate-mnuchin-cloture', 115, 1, 62, 'nominations', {
    label: 'Steven Mnuchin cloture',
  }),
  senate('senate-mnuchin-confirm', 115, 1, 63, 'nominations', {
    label: 'Steven Mnuchin confirmation',
  }),
  senate('senate-shulkin-confirm', 115, 1, 64, 'nominations', {
    label: 'David Shulkin confirmation',
  }),
  senate('senate-mcmahon-sba-confirm', 115, 1, 65, 'nominations', {
    label: 'Linda McMahon SBA confirmation',
  }),
  senate('senate-mulvaney-omb-cloture', 115, 1, 67, 'nominations', {
    label: 'Mick Mulvaney OMB cloture',
  }),
  senate('senate-mulvaney-omb-confirm', 115, 1, 68, 'nominations', {
    label: 'Mick Mulvaney OMB confirmation',
  }),
  senate('senate-pruitt-cloture', 115, 1, 69, 'nominations', {
    label: 'Scott Pruitt cloture',
  }),
  senate('senate-pruitt-confirm', 115, 1, 71, 'nominations', {
    label: 'Scott Pruitt confirmation',
  }),
  senate('senate-ross-cloture', 115, 1, 72, 'nominations', {
    label: 'Wilbur Ross cloture',
  }),
  senate('senate-ross-confirm', 115, 1, 73, 'nominations', {
    label: 'Wilbur Ross confirmation',
  }),
  senate('senate-zinke-cloture', 115, 1, 74, 'nominations', {
    label: 'Ryan Zinke cloture',
  }),
  senate('senate-zinke-confirm', 115, 1, 75, 'nominations', {
    label: 'Ryan Zinke confirmation',
  }),
  senate('senate-carson-cloture', 115, 1, 76, 'nominations', {
    label: 'Ben Carson cloture',
  }),
  senate('senate-carson-confirm', 115, 1, 77, 'nominations', {
    label: 'Ben Carson confirmation',
  }),
  senate('senate-perry-cloture', 115, 1, 78, 'nominations', {
    label: 'Rick Perry cloture',
  }),
  senate('senate-perry-confirm', 115, 1, 79, 'nominations', {
    label: 'Rick Perry confirmation',
  }),
  senate('senate-verma-cms-cloture', 115, 1, 85, 'health-care', {
    label: 'Seema Verma cloture',
  }),
  senate('senate-verma-cms-confirm', 115, 1, 86, 'health-care', {
    label: 'Seema Verma confirmation',
  }),
  senate('senate-coats-dni-cloture', 115, 1, 88, 'nominations', {
    label: 'Dan Coats cloture',
  }),
  senate('senate-coats-dni-confirm', 115, 1, 89, 'nominations', {
    label: 'Dan Coats confirmation',
  }),
  senate('senate-friedman-israel-cloture', 115, 1, 95, 'nominations', {
    label: 'David Friedman cloture',
  }),
  senate('senate-friedman-israel-confirm', 115, 1, 96, 'nominations', {
    label: 'David Friedman confirmation',
  }),
  senate('senate-perdue-agriculture-confirm', 115, 1, 112, 'nominations', {
    label: 'Sonny Perdue confirmation',
  }),
  senate('senate-acosta-labor-cloture', 115, 1, 115, 'nominations', {
    label: 'Alexander Acosta cloture',
  }),
  senate('senate-acosta-labor-confirm', 115, 1, 116, 'nominations', {
    label: 'Alexander Acosta confirmation',
  }),
  senate('senate-gottlieb-fda-cloture', 115, 1, 123, 'health-care', {
    label: 'Scott Gottlieb cloture',
  }),
  senate('senate-gottlieb-fda-confirm', 115, 1, 124, 'health-care', {
    label: 'Scott Gottlieb confirmation',
  }),
  senate('senate-wray-fbi-confirm', 115, 1, 181, 'nominations', {
    label: 'Christopher Wray confirmation',
  }),
  senate('senate-nielsen-dhs-cloture', 115, 1, 304, 'immigration', {
    label: 'Kirstjen Nielsen cloture',
  }),
  senate('senate-nielsen-dhs-confirm', 115, 1, 305, 'immigration', {
    label: 'Kirstjen Nielsen confirmation',
  }),
  senate('senate-azar-hhs-cloture', 115, 2, 20, 'health-care', {
    label: 'Alex Azar cloture',
  }),
  senate('senate-azar-hhs-confirm', 115, 2, 21, 'health-care', {
    label: 'Alex Azar confirmation',
  }),
  senate('senate-powell-fed-cloture', 115, 2, 18, 'nominations', {
    label: 'Jerome Powell cloture',
  }),
  senate('senate-powell-fed-confirm', 115, 2, 19, 'nominations', {
    label: 'Jerome Powell confirmation',
  }),
  senate('senate-pompeo-state-cloture', 115, 2, 83, 'nominations', {
    label: 'Mike Pompeo State cloture',
  }),
  senate('senate-pompeo-state-confirm', 115, 2, 84, 'nominations', {
    label: 'Mike Pompeo State confirmation',
  }),
  senate('senate-grenell-germany-confirm', 115, 2, 85, 'nominations', {
    label: 'Richard Grenell confirmation',
  }),
  senate('senate-haspel-cia-cloture', 115, 2, 100, 'nominations', {
    label: 'Gina Haspel cloture',
  }),
  senate('senate-haspel-cia-confirm', 115, 2, 101, 'nominations', {
    label: 'Gina Haspel confirmation',
  }),
  senate('senate-wilkie-va-confirm', 115, 2, 163, 'nominations', {
    label: 'Robert Wilkie confirmation',
  }),
  senate('senate-bridenstine-nasa-cloture', 115, 2, 78, 'nominations', {
    label: 'James Bridenstine cloture',
  }),
  senate('senate-bridenstine-nasa-confirm', 115, 2, 80, 'nominations', {
    label: 'James Bridenstine confirmation',
  }),
  senate('senate-jelena-mcwilliams-fdic-cloture', 115, 2, 107, 'nominations', {
    label: 'Jelena McWilliams cloture',
  }),
  senate('senate-jelena-mcwilliams-fdic-confirm', 115, 2, 109, 'nominations', {
    label: 'Jelena McWilliams confirmation',
  }),
  senate('senate-quarles-fed-cloture', 115, 2, 157, 'nominations', {
    label: 'Randal Quarles cloture',
  }),
  senate('senate-quarles-fed-confirm', 115, 2, 158, 'nominations', {
    label: 'Randal Quarles confirmation',
  }),
  senate('senate-clarida-fed-cloture', 115, 2, 196, 'nominations', {
    label: 'Richard Clarida cloture',
  }),
  senate('senate-clarida-fed-confirm', 115, 2, 197, 'nominations', {
    label: 'Richard Clarida confirmation',
  }),
  senate('senate-roisman-sec-cloture', 115, 2, 201, 'nominations', {
    label: 'Elad Roisman cloture',
  }),
  senate('senate-roisman-sec-confirm', 115, 2, 202, 'nominations', {
    label: 'Elad Roisman confirmation',
  }),
  senate('senate-rettig-irs-cloture', 115, 2, 205, 'nominations', {
    label: 'Charles Rettig cloture',
  }),
  senate('senate-rettig-irs-confirm', 115, 2, 206, 'nominations', {
    label: 'Charles Rettig confirmation',
  }),
  senate('senate-kraninger-cfpb-cloture', 115, 2, 252, 'nominations', {
    label: 'Kathleen Kraninger cloture',
  }),
  senate('senate-kraninger-cfpb-confirm', 115, 2, 255, 'nominations', {
    label: 'Kathleen Kraninger confirmation',
  }),
  senate('senate-mcnamee-ferc-cloture', 115, 2, 253, 'nominations', {
    label: 'Bernard McNamee cloture',
  }),
  senate('senate-mcnamee-ferc-confirm', 115, 2, 254, 'nominations', {
    label: 'Bernard McNamee confirmation',
  }),
  senate('senate-muzinich-treasury-cloture', 115, 2, 256, 'nominations', {
    label: 'Justin Muzinich cloture',
  }),
  senate('senate-muzinich-treasury-confirm', 115, 2, 257, 'nominations', {
    label: 'Justin Muzinich confirmation',
  }),
  senate('senate-barr-ag-cloture', 116, 1, 23, 'nominations', {
    label: 'William Barr cloture',
  }),
  senate('senate-barr-ag-confirm', 116, 1, 24, 'nominations', {
    label: 'William Barr confirmation',
  }),
  senate('senate-wheeler-epa-cloture', 116, 1, 32, 'nominations', {
    label: 'Andrew Wheeler EPA cloture',
  }),
  senate('senate-wheeler-epa-confirm', 116, 1, 33, 'nominations', {
    label: 'Andrew Wheeler EPA confirmation',
  }),
  senate('senate-calabria-fhfa-cloture', 116, 1, 63, 'nominations', {
    label: 'Mark Calabria cloture',
  }),
  senate('senate-calabria-fhfa-confirm', 116, 1, 64, 'nominations', {
    label: 'Mark Calabria confirmation',
  }),
  senate('senate-bernhardt-interior-cloture', 116, 1, 76, 'nominations', {
    label: 'David Bernhardt cloture',
  }),
  senate('senate-bernhardt-interior-confirm', 116, 1, 77, 'nominations', {
    label: 'David Bernhardt confirmation',
  }),
  senate('senate-kimberly-reed-exim-cloture', 116, 1, 96, 'nominations', {
    label: 'Kimberly Reed cloture',
  }),
  senate('senate-kimberly-reed-exim-confirm', 116, 1, 100, 'nominations', {
    label: 'Kimberly Reed confirmation',
  }),
  senate('senate-jeffrey-rosen-dag-cloture', 116, 1, 113, 'nominations', {
    label: 'Jeffrey Rosen cloture',
  }),
  senate('senate-jeffrey-rosen-dag-confirm', 116, 1, 116, 'nominations', {
    label: 'Jeffrey Rosen confirmation',
  }),
  senate('senate-tarbert-cftc-chair-cloture', 116, 1, 135, 'nominations', {
    label: 'Heath Tarbert cloture',
  }),
  senate('senate-tarbert-cftc-chair-confirm', 116, 1, 138, 'nominations', {
    label: 'Heath Tarbert confirmation',
  }),
  senate('senate-peter-wright-epa-cloture', 116, 1, 202, 'nominations', {
    label: 'Peter Wright cloture',
  }),
  senate('senate-peter-wright-epa-confirm', 116, 1, 203, 'nominations', {
    label: 'Peter Wright confirmation',
  }),
  senate('senate-esper-defense-cloture', 116, 1, 219, 'nominations', {
    label: 'Mark Esper cloture',
  }),
  senate('senate-esper-defense-confirm', 116, 1, 220, 'nominations', {
    label: 'Mark Esper confirmation',
  }),
  senate('senate-stephen-dickson-faa-cloture', 116, 1, 221, 'nominations', {
    label: 'Stephen Dickson cloture',
  }),
  senate('senate-stephen-dickson-faa-confirm', 116, 1, 225, 'nominations', {
    label: 'Stephen Dickson confirmation',
  }),
  senate('senate-kelly-craft-un-cloture', 116, 1, 252, 'nominations', {
    label: 'Kelly Craft U.N. ambassador cloture',
  }),
  senate('senate-kelly-craft-un-confirm', 116, 1, 259, 'nominations', {
    label: 'Kelly Craft U.N. ambassador confirmation',
  }),
  senate('senate-kelly-craft-ga-cloture', 116, 1, 263, 'nominations', {
    label: 'Kelly Craft U.N. sessions cloture',
  }),
  senate('senate-kelly-craft-ga-confirm', 116, 1, 264, 'nominations', {
    label: 'Kelly Craft U.N. sessions confirmation',
  }),
  senate('senate-andrew-saul-ssa-cloture', 116, 1, 131, 'nominations', {
    label: 'Andrew Saul cloture',
  }),
  senate('senate-andrew-saul-ssa-confirm', 116, 1, 133, 'nominations', {
    label: 'Andrew Saul confirmation',
  }),
  senate('senate-scalia-labor-cloture', 116, 1, 309, 'nominations', {
    label: 'Eugene Scalia cloture',
  }),
  senate('senate-scalia-labor-confirm', 116, 1, 313, 'nominations', {
    label: 'Eugene Scalia confirmation',
  }),
  senate('senate-stephen-hahn-fda-cloture', 116, 1, 393, 'health-care', {
    label: 'Stephen Hahn cloture',
  }),
  senate('senate-stephen-hahn-fda-confirm', 116, 1, 397, 'health-care', {
    label: 'Stephen Hahn confirmation',
  }),
  senate('senate-stephen-biegun-confirm', 116, 1, 426, 'nominations', {
    label: 'Stephen Biegun confirmation',
  }),
  senate('senate-brouillette-energy-cloture', 116, 1, 366, 'nominations', {
    label: 'Dan Brouillette cloture',
  }),
  senate('senate-brouillette-energy-confirm', 116, 1, 367, 'nominations', {
    label: 'Dan Brouillette confirmation',
  }),
  senate('senate-chad-wolf-cloture', 116, 1, 353, 'immigration', {
    label: 'Chad Wolf cloture',
  }),
  senate('senate-chad-wolf-confirm', 116, 1, 354, 'immigration', {
    label: 'Chad Wolf confirmation',
  }),
  senate('senate-carranza-sba-cloture', 116, 2, 1, 'nominations', {
    label: 'Jovita Carranza cloture',
  }),
  senate('senate-carranza-sba-confirm', 116, 2, 2, 'nominations', {
    label: 'Jovita Carranza confirmation',
  }),
  senate('senate-paul-ray-oira-cloture', 116, 2, 9, 'nominations', {
    label: 'Paul Ray cloture',
  }),
  senate('senate-paul-ray-oira-confirm', 116, 2, 10, 'nominations', {
    label: 'Paul Ray confirmation',
  }),
  senate('senate-peter-gaynor-fema-cloture', 116, 2, 11, 'nominations', {
    label: 'Peter Gaynor cloture',
  }),
  senate('senate-peter-gaynor-fema-confirm', 116, 2, 12, 'nominations', {
    label: 'Peter Gaynor confirmation',
  }),
  senate('senate-ratcliffe-dni-confirm-2020', 116, 2, 101, 'nominations', {
    label: 'John Ratcliffe DNI confirmation',
  }),
  senate('senate-evanina-ncsc-cloture', 116, 2, 82, 'nominations', {
    label: 'William Evanina cloture',
  }),
  senate('senate-evanina-ncsc-confirm', 116, 2, 83, 'nominations', {
    label: 'William Evanina confirmation',
  }),
  senate('senate-james-trainor-fec-cloture', 116, 2, 95, 'nominations', {
    label: 'James Trainor cloture',
  }),
  senate('senate-james-trainor-fec-confirm', 116, 2, 96, 'nominations', {
    label: 'James Trainor confirmation',
  }),
  senate('senate-michael-pack-cloture', 116, 2, 112, 'nominations', {
    label: 'Michael Pack cloture',
  }),
  senate('senate-michael-pack-confirm', 116, 2, 113, 'nominations', {
    label: 'Michael Pack confirmation',
  }),
  senate('senate-waller-fed-cloture', 116, 2, 247, 'nominations', {
    label: 'Christopher Waller cloture',
  }),
  senate('senate-waller-fed-confirm', 116, 2, 251, 'nominations', {
    label: 'Christopher Waller confirmation',
  }),
  senate('senate-simington-fcc-cloture', 116, 2, 255, 'nominations', {
    label: 'Nathan Simington cloture',
  }),
  senate('senate-simington-fcc-confirm', 116, 2, 257, 'nominations', {
    label: 'Nathan Simington confirmation',
  }),
  senate('senate-joshua-simmons-cloture', 119, 1, 656, 'nominations', {
    label: 'Joshua Simmons cloture',
  }),
  senate('senate-keith-bass-cloture', 119, 1, 657, 'nominations', {
    label: 'Keith Bass cloture',
  }),
  senate('senate-van-hook-cloture', 119, 1, 658, 'nominations', {
    label: 'Alexander C. Van Hook cloture',
  }),
  senate('senate-sara-bailey-cloture', 119, 1, 659, 'nominations', {
    label: 'Sara Bailey cloture',
  }),
  senate('senate-keith-bass-confirm', 119, 2, 1, 'nominations', {
    label: 'Keith Bass confirmation',
  }),
  senate('senate-joshua-simmons-confirm', 119, 2, 2, 'nominations', {
    label: 'Joshua Simmons confirmation',
  }),
  senate('senate-sara-bailey-confirm', 119, 2, 3, 'nominations', {
    label: 'Sara Bailey confirmation',
  }),
  senate('senate-van-hook-confirm', 119, 2, 6, 'nominations', {
    label: 'Alexander C. Van Hook confirmation',
  }),
  senate('senate-fowlkes-cloture', 119, 2, 21, 'nominations', {
    label: 'David Clay Fowlkes cloture',
  }),
  senate('senate-fowlkes-confirm', 119, 2, 22, 'nominations', {
    label: 'David Clay Fowlkes confirmation',
  }),
  senate('senate-ganjei-cloture', 119, 2, 23, 'nominations', {
    label: 'Nicholas Jon Ganjei cloture',
  }),
  senate('senate-ganjei-confirm', 119, 2, 24, 'nominations', {
    label: 'Nicholas Jon Ganjei confirmation',
  }),
  senate('senate-peterson-cloture', 119, 2, 25, 'nominations', {
    label: 'Aaron Christian Peterson cloture',
  }),
  senate('senate-peterson-confirm', 119, 2, 26, 'nominations', {
    label: 'Aaron Christian Peterson confirmation',
  }),
  senate('senate-benton-cloture', 119, 2, 27, 'nominations', {
    label: 'Megan Blair Benton cloture',
  }),
  senate('senate-benton-confirm', 119, 2, 28, 'nominations', {
    label: 'Megan Blair Benton confirmation',
  }),
  senate('senate-lea-cloture', 119, 2, 29, 'nominations', {
    label: 'Brian Charles Lea cloture',
  }),
  senate('senate-lea-confirm', 119, 2, 30, 'nominations', {
    label: 'Brian Charles Lea confirmation',
  }),
  senate('senate-olson-cloture', 119, 2, 31, 'nominations', {
    label: 'Justin R. Olson cloture',
  }),
  senate('senate-olson-confirm', 119, 2, 32, 'nominations', {
    label: 'Justin R. Olson confirmation',
  }),
  senate('senate-daniel-burrows-cloture', 119, 2, 33, 'nominations', {
    label: 'Daniel Burrows cloture',
  }),
  senate('senate-daniel-burrows-confirm', 119, 2, 34, 'nominations', {
    label: 'Daniel Burrows confirmation',
  }),
  senate('senate-john-deleeuw-cloture', 119, 2, 40, 'nominations', {
    label: 'John DeLeeuw cloture',
  }),
  senate('senate-john-deleeuw-confirm', 119, 2, 41, 'nominations', {
    label: 'John DeLeeuw confirmation',
  }),
  senate('senate-ryan-mccormack-cloture', 119, 2, 42, 'nominations', {
    label: 'Ryan McCormack cloture',
  }),
  senate('senate-ryan-mccormack-confirm', 119, 2, 43, 'nominations', {
    label: 'Ryan McCormack confirmation',
  }),
  senate('senate-rudd-cloture', 119, 2, 48, 'nominations', {
    label: 'Lt. Gen. Joshua M. Rudd cloture',
  }),
  senate('senate-rudd-confirm', 119, 2, 49, 'nominations', {
    label: 'Lt. Gen. Joshua M. Rudd confirmation',
  }),
  senate('senate-obamacare-2017-4', 115, 1, 4, 'health-care', {
    label: 'Protect Medicare and Medicaid amendment',
    proTrumpCast: 'Nay',
  }),
  senate('senate-obamacare-2017-18', 115, 1, 18, 'health-care', {
    label: 'Medicaid expansion protection amendment',
    proTrumpCast: 'Nay',
  }),
  senate('senate-obamacare-2017-170', 115, 1, 170, 'health-care', {
    label: 'Obamacare repeal Donnelly commit motion',
    proTrumpCast: 'Nay',
  }),
  senate('senate-obamacare-2017-171', 115, 1, 171, 'health-care', {
    label: 'Obamacare repeal Casey commit motion',
    proTrumpCast: 'Nay',
  }),
  senate('senate-tax-cuts-321', 115, 1, 321, 'taxes', {
    label: 'Tax Cuts and Jobs Act conference motion to proceed',
  }),
  senate('senate-tax-cuts-322', 115, 1, 322, 'taxes', {
    label: 'Tax Cuts and Jobs Act conference budget waiver',
  }),
  senate('senate-gorsuch-mtp-exec', 115, 1, 104, 'nominations', {
    label: 'Gorsuch motion to executive session',
  }),
  senate('senate-barrett-scotus-motion-to-proceed', 116, 2, 217, 'nominations', {
    label: 'Barrett Supreme Court motion to proceed',
  }),
  senate('senate-first-impeachment-procedure-1', 116, 2, 26, 'impeachment', {
    label: 'First impeachment trial procedures 1',
  }),
  senate('senate-first-impeachment-procedure-2', 116, 2, 32, 'impeachment', {
    label: 'First impeachment trial procedures 2',
  }),
  senate('senate-second-impeachment-procedure-1', 117, 1, 9, 'impeachment', {
    label: 'Second impeachment trial procedures 1',
    proTrumpCast: 'Nay',
  }),
  senate('senate-second-impeachment-procedure-2', 117, 1, 56, 'impeachment', {
    label: 'Second impeachment trial procedures 2',
    proTrumpCast: 'Nay',
  }),
  senate('senate-energy-emergency-termination', 119, 1, 95, 'emergency-powers', {
    label: 'Energy emergency termination',
    proTrumpCast: 'Nay',
  }),
  senate('senate-hegseth-motion-to-proceed', 119, 1, 10, 'nominations', {
    label: 'Pete Hegseth motion to proceed',
  }),
  senate('senate-hegseth-cloture', 119, 1, 14, 'nominations', {
    label: 'Pete Hegseth cloture',
  }),
  senate('senate-hegseth-confirm', 119, 1, 15, 'nominations', {
    label: 'Pete Hegseth confirmation',
  }),
  senate('senate-rubio-confirm', 119, 1, 8, 'nominations', {
    label: 'Marco Rubio confirmation',
  }),
  senate('senate-burgum-cloture', 119, 1, 25, 'nominations', {
    label: 'Doug Burgum cloture',
  }),
  senate('senate-burgum-confirm', 119, 1, 26, 'nominations', {
    label: 'Doug Burgum confirmation',
  }),
  senate('senate-wright-cloture', 119, 1, 27, 'nominations', {
    label: 'Chris Wright cloture',
  }),
  senate('senate-wright-confirm', 119, 1, 30, 'nominations', {
    label: 'Chris Wright confirmation',
  }),
  senate('senate-bondi-cloture', 119, 1, 31, 'nominations', {
    label: 'Pam Bondi cloture',
  }),
  senate('senate-bondi-confirm', 119, 1, 33, 'nominations', {
    label: 'Pam Bondi confirmation',
  }),
  senate('senate-turner-cloture', 119, 1, 34, 'nominations', {
    label: 'Scott Turner cloture',
  }),
  senate('senate-turner-confirm', 119, 1, 35, 'nominations', {
    label: 'Scott Turner confirmation',
  }),
  senate('senate-gabbard-motion-to-proceed', 119, 1, 40, 'nominations', {
    label: 'Tulsi Gabbard motion to proceed',
  }),
  senate('senate-rfk-motion-to-proceed', 119, 1, 42, 'health-care', {
    label: 'Robert F. Kennedy Jr. motion to proceed',
  }),
  senate('senate-lutnick-motion-to-proceed', 119, 1, 44, 'nominations', {
    label: 'Howard Lutnick motion to proceed',
  }),
  senate('senate-rollins-motion-to-proceed', 119, 1, 46, 'nominations', {
    label: 'Brooke Rollins motion to proceed',
  }),
  senate('senate-rollins-confirm', 119, 1, 53, 'nominations', {
    label: 'Brooke Rollins confirmation',
  }),
  senate('senate-loeffler-motion-to-proceed', 119, 1, 48, 'nominations', {
    label: 'Kelly Loeffler motion to proceed',
  }),
  senate('senate-mcmahon-education-motion-to-proceed', 119, 1, 93, 'nominations', {
    label: 'Linda McMahon motion to proceed',
  }),
  senate('senate-mcmahon-education-cloture', 119, 1, 98, 'nominations', {
    label: 'Linda McMahon cloture',
  }),
  senate('senate-mcmahon-education-confirm', 119, 1, 99, 'nominations', {
    label: 'Linda McMahon confirmation',
  }),
  senate('senate-miran-cea-cloture', 119, 1, 116, 'nominations', {
    label: 'Stephen Miran CEA cloture',
  }),
  senate('senate-miran-cea-confirm', 119, 1, 117, 'nominations', {
    label: 'Stephen Miran CEA confirmation',
  }),
  senate('senate-kratsios-cloture', 119, 1, 138, 'nominations', {
    label: 'Michael Kratsios cloture',
  }),
  senate('senate-kratsios-confirm', 119, 1, 139, 'nominations', {
    label: 'Michael Kratsios confirmation',
  }),
  senate('senate-meador-cloture', 119, 1, 208, 'nominations', {
    label: 'Mark Meador cloture',
  }),
  senate('senate-meador-confirm', 119, 1, 209, 'nominations', {
    label: 'Mark Meador confirmation',
  }),
  senate('senate-perdue-cloture', 119, 1, 214, 'nominations', {
    label: 'David Perdue cloture',
  }),
  senate('senate-perdue-confirm', 119, 1, 215, 'nominations', {
    label: 'David Perdue confirmation',
  }),
  senate('senate-scott-cloture', 119, 1, 319, 'immigration', {
    label: 'Rodney Scott cloture',
  }),
  senate('senate-scott-confirm', 119, 1, 321, 'immigration', {
    label: 'Rodney Scott confirmation',
  }),
  senate('senate-edlow-cloture', 119, 1, 389, 'immigration', {
    label: 'Joseph Edlow cloture',
  }),
  senate('senate-edlow-confirm', 119, 1, 390, 'immigration', {
    label: 'Joseph Edlow confirmation',
  }),
  senate('senate-emil-bove-cloture', 119, 1, 437, 'nominations', {
    label: 'Emil Bove III cloture',
  }),
  senate('senate-emil-bove-confirm', 119, 1, 448, 'nominations', {
    label: 'Emil Bove III confirmation',
  }),
  senate('senate-matthew-lohmeier-cloture', 119, 1, 433, 'nominations', {
    label: 'Matthew Lohmeier cloture',
  }),
  senate('senate-matthew-lohmeier-confirm', 119, 1, 434, 'nominations', {
    label: 'Matthew Lohmeier confirmation',
  }),
]

export const houseTrumpRollCallPool = [
  ...selectedHouseRollCalls,
  ...houseCandidateExtras.map((item) => ({ ...item, selected: true })),
  ...broadHouseRollCalls,
]
export const senateTrumpRollCallPool = [
  ...selectedSenateRollCalls,
  ...senateCandidateExtras.map((item) => ({ ...item, selected: true })),
]
