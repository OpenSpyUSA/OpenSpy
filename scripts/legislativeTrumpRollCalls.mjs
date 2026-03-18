function house(id, year, rollNumber, category, options = {}) {
  return {
    chamber: 'house',
    category,
    highlight: false,
    id,
    proTrumpCast: 'Yea',
    rollNumber,
    selected: false,
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
    proTrumpCast: 'Yea',
  }),
  selectedHouse('house-border-emergency-rule-1', 2019, 93, 'emergency-powers', {
    label: 'First border emergency disapproval rule adoption',
    proTrumpCast: 'Yea',
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
    proTrumpCast: 'Yea',
  }),
  selectedHouse('house-border-emergency-rule-2', 2019, 550, 'emergency-powers', {
    label: 'Second border emergency disapproval rule adoption',
    proTrumpCast: 'Yea',
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
    proTrumpCast: 'Yea',
  }),
  selectedHouse('house-iran-war-powers-rule-1', 2020, 6, 'war-powers', {
    label: 'Iran war powers rule adoption',
    proTrumpCast: 'Yea',
  }),
  selectedHouse('house-iran-war-powers-1', 2020, 7, 'war-powers', {
    highlight: true,
    label: 'Iran war powers resolution',
    proTrumpCast: 'Nay',
  }),
  selectedHouse('house-iran-war-powers-rule-2', 2020, 95, 'war-powers', {
    label: 'Second Iran war powers rule previous question',
    proTrumpCast: 'Yea',
  }),
  selectedHouse('house-iran-war-powers-rule-2-adopt', 2020, 96, 'war-powers', {
    label: 'Second Iran war powers rule adoption',
    proTrumpCast: 'Yea',
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
    label: 'Kayla Hamilton Act rule previous question',
  }),
  selectedHouse('house-2025-kayla-hamilton-rule', 2025, 338, 'immigration', {
    label: 'Kayla Hamilton Act rule adoption',
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
  }),
  selectedSenate('senate-obamacare-commit-murray', 115, 1, 178, 'health-care', {
    label: 'Obamacare repeal Murray commit motion',
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
]

const senateCandidateExtras = [
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
  }),
  senate('senate-obamacare-2017-171', 115, 1, 171, 'health-care', {
    label: 'Obamacare repeal Casey commit motion',
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
  }),
  senate('senate-second-impeachment-procedure-2', 117, 1, 56, 'impeachment', {
    label: 'Second impeachment trial procedures 2',
  }),
  senate('senate-energy-emergency-termination', 119, 1, 95, 'emergency-powers', {
    label: 'Energy emergency termination',
    proTrumpCast: 'Nay',
  }),
  senate('senate-rollins-confirm', 119, 1, 53, 'nominations', {
    label: 'Brooke Rollins confirmation',
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
  senate('senate-emil-bove-confirm', 119, 1, 448, 'nominations', {
    label: 'Emil Bove III confirmation',
  }),
  senate('senate-matthew-lohmeier-confirm', 119, 1, 434, 'nominations', {
    label: 'Matthew Lohmeier confirmation',
  }),
]

export const houseTrumpRollCallPool = [
  ...selectedHouseRollCalls,
  ...houseCandidateExtras.map((item) => ({ ...item, selected: true })),
]
export const senateTrumpRollCallPool = [
  ...selectedSenateRollCalls,
  ...senateCandidateExtras.map((item) => ({ ...item, selected: true })),
]
