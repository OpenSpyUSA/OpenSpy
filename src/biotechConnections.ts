import type { BranchId, SourceLink } from './types'

export type BiotechConnectionCategory =
  | 'biotech policy'
  | 'biomedical regulator'
  | 'biosecurity'
  | 'pharma background'
  | 'lab-leak and gof politics'

export interface BiotechConnectionProfile {
  branchId: BranchId
  category: BiotechConnectionCategory
  evidenceLabel: string
  name: string
  personId: string
  sources: SourceLink[]
  story: string
  subtitle: string
  title: string
}

export const BIOTECH_CONNECTIONS: BiotechConnectionProfile[] = [
  {
    branchId: 'legislative',
    category: 'biotech policy',
    evidenceLabel: 'Commission chair',
    name: 'Todd Young',
    personId: 'senate-todd-young',
    sources: [
      {
        label: 'Young emerging biotech page',
        locationLabel: 'priority page on emerging biotech',
        textFragment: 'Emerging Biotech',
        url: 'https://www.young.senate.gov/priorities/emerging-biotech/',
      },
      {
        label: 'NSCEB commissioners',
        locationLabel: 'commissioner listing for Todd Young',
        textFragment: 'Todd Young',
        url: 'https://www.biotech.senate.gov/commissioners/',
      },
      {
        label: 'Young on AI and biotech legislation',
        locationLabel: 'headline on AI and biotech legislation',
        textFragment: 'AI and biotech',
        url: 'https://www.young.senate.gov/newsroom/press-releases/young-colleagues-introduce-bill-to-ensure-american-leadership-in-ai-and-biotech/',
      },
    ],
    story:
      'Young is one of the clearest true biotech-policy figures on this site. He chairs the National Security Commission on Emerging Biotechnology and publicly frames biotech as a strategic national-security and industrial-policy field.',
    subtitle: 'Senate • Indiana',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'biotech policy',
    evidenceLabel: 'Commissioner + bill sponsor',
    name: 'Ro Khanna',
    personId: 'house-ro-khanna-california-17th',
    sources: [
      {
        label: 'Ro Khanna NSCEB bio',
        locationLabel: 'commissioner bio for Ro Khanna',
        textFragment: 'Ro Khanna',
        url: 'https://www.biotech.senate.gov/bio-ro-khanna/',
      },
      {
        label: 'NSCEB commissioners',
        locationLabel: 'commissioner listing for Ro Khanna',
        textFragment: 'Ro Khanna',
        url: 'https://www.biotech.senate.gov/commissioners/',
      },
      {
        label: 'National Biotechnology Initiative Act release',
        locationLabel: 'headline on the National Biotechnology Initiative Act',
        textFragment: 'National Biotechnology Initiative Act',
        url: 'https://www.biotech.senate.gov/press-releases/national-security-commission-on-emerging-biotechnology-congressional-commissioners-introduce-bill-to-promote-u-s-biotechnology-innovation/',
      },
    ],
    story:
      'Khanna is an NSCEB commissioner and a sponsor of legislation to promote U.S. biotechnology innovation. His connection is formal biotech strategy, not a bioweapons allegation.',
    subtitle: 'House • California 17th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'biotech policy',
    evidenceLabel: 'Commissioner + public biotech advocacy',
    name: 'Alex Padilla',
    personId: 'senate-alex-padilla',
    sources: [
      {
        label: 'Alex Padilla NSCEB bio',
        locationLabel: 'commissioner bio for Alex Padilla',
        textFragment: 'Alex Padilla',
        url: 'https://www.biotech.senate.gov/bio-alex-padilla/',
      },
      {
        label: 'NSCEB commissioners',
        locationLabel: 'commissioner listing for Alex Padilla',
        textFragment: 'Alex Padilla',
        url: 'https://www.biotech.senate.gov/commissioners/',
      },
      {
        label: 'Padilla at AI Biotechnology Summit',
        locationLabel: 'headline and summit remarks',
        textFragment: 'AI Biotechnology Summit',
        url: 'https://www.padilla.senate.gov/newsroom/press-releases/padilla-delivers-keynote-address-at-ai-biotechnology-summit/',
      },
    ],
    story:
      'Padilla is another formal biotech-policy player through the congressional biotechnology commission. His public remarks place biotech inside a wider strategy that spans medicines, computing, and industrial capacity.',
    subtitle: 'Senate • California',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'biosecurity',
    evidenceLabel: 'Bill sponsor',
    name: 'Raja Krishnamoorthi',
    personId: 'house-raja-krishnamoorthi-illinois-8th',
    sources: [
      {
        label: 'BIOSECURE Act text',
        locationLabel: 'bill text short title',
        textFragment: 'This Act may be cited as the “BIOSECURE Act”',
        url: 'https://www.congress.gov/bill/118th-congress/house-bill/8333/text',
      },
      {
        label: 'Krishnamoorthi-Wenstrup BIOSECURE release',
        locationLabel: 'headline introducing the BIOSECURE Act',
        textFragment: 'BIOSECURE Act',
        url: 'https://democrats-selectcommitteeontheccp.house.gov/media/press-releases/krishnamoorthi-wenstrup-introduce-bipartisan-biosecure-act-safeguard-american',
      },
      {
        label: 'Comer support release',
        locationLabel: 'support release for the BIOSECURE Act',
        textFragment: 'BIOSECURE Act',
        url: 'https://oversight.house.gov/release/comer-delivers-remarks-in-support-of-bipartisan-biosecure-act/',
      },
    ],
    story:
      'Krishnamoorthi is a strong biotech-supply-chain and biosecurity match because he helped lead the BIOSECURE Act. That effort treated foreign-adversary-linked biotech firms as a U.S. health-security and national-security problem.',
    subtitle: 'House • Illinois 8th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'pharma background',
    evidenceLabel: 'Private-sector operator',
    name: 'Shri Thanedar',
    personId: 'house-shri-thanedar-michigan-13th',
    sources: [
      {
        label: 'Avomeen recapitalization note',
        url: 'https://www.capstonepartners.com/transactions/capstone-partners-advises-avomeen-analytical-services-its-recapitalization-high-street/',
      },
      {
        label: 'Contract Pharma on Avomeen',
        url: 'https://www.contractpharma.com/breaking-news/avomeen-named-inc-5005000-honoree/',
      },
      {
        label: 'CBS Detroit profile',
        url: 'https://www.cbsnews.com/detroit/news/entrepreneur-shri-thanedar-is-running-for-michigan-governor/',
      },
    ],
    story:
      'Thanedar is not a biosecurity figure, but he does have a real private-sector connection to pharma-adjacent analytical and development services. He belongs here because of business background, not because of any public biolab or bioweapon rhetoric.',
    subtitle: 'House • Michigan 13th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'executive',
    category: 'biomedical regulator',
    evidenceLabel: 'Cabinet jurisdiction',
    name: 'Robert F. Kennedy, Jr.',
    personId: 'executive-robert-f-kennedy-jr',
    sources: [
      {
        label: 'HHS leadership biography',
        locationLabel: 'leadership profile header',
        textFragment: 'Robert F. Kennedy Jr.',
        url: 'https://www.hhs.gov/about/leadership/robert-kennedy.html',
      },
      {
        label: 'HHS swearing-in release',
        locationLabel: 'headline on swearing in as HHS secretary',
        textFragment: 'Robert Kennedy, Jr. Sworn in as the 26th Secretary of HHS',
        url: 'https://www.hhs.gov/about/news/2025/02/13/robert-kennedy-jr-sworn-26th-secretary-hhs-president-trump-signs-executive-order-make-america-healthy-again.html',
      },
      {
        label: 'AP on Kennedy at HHS',
        url: 'https://apnews.com/article/5e1e9e3208c42b6a185facad26e3b457',
      },
    ],
    story:
      'Kennedy is central to federal biomedical power because HHS sits above FDA, CDC, NIH, and CMS. His relevance comes from jurisdiction over the federal health-science system, not from a biotech-company role.',
    subtitle: 'Department of Health and Human Services',
    title: 'Secretary of Health and Human Services',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Committee chair',
    name: 'Bill Cassidy',
    personId: 'senate-bill-cassidy',
    sources: [
      {
        label: 'Cassidy to chair HELP',
        locationLabel: 'headline on chairing the HELP Committee',
        textFragment: 'Cassidy to Chair HELP Committee in 119th Congress',
        url: 'https://www.help.senate.gov/rep/newsroom/press/cassidy-to-chair-help-committee-in-119th-congress',
      },
      {
        label: 'Senate HELP Committee',
        locationLabel: 'committee homepage header',
        textFragment: 'Health, Education, Labor and Pensions',
        url: 'https://www.help.senate.gov/',
      },
    ],
    story:
      'Cassidy is a strong biomedical-policy match because the Senate HELP Committee is a major jurisdictional center for federal health, FDA, NIH, and public-health legislation. He also brings a physician background on top of that committee power.',
    subtitle: 'Senate • Louisiana',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Committee ranking member',
    name: 'Bernard Sanders',
    personId: 'senate-bernard-sanders',
    sources: [
      {
        label: 'HELP ranking member page',
        locationLabel: 'ranking member profile for Bernie Sanders',
        textFragment: 'Bernie Sanders',
        url: 'https://www.help.senate.gov/ranking/about',
      },
      {
        label: 'Senate HELP Committee',
        locationLabel: 'committee homepage header',
        textFragment: 'Health, Education, Labor and Pensions',
        url: 'https://www.help.senate.gov/',
      },
    ],
    story:
      'Sanders is relevant because he is one of the highest-profile Senate actors on drug pricing, pharmaceutical incentives, and broader biomedical-policy fights through the HELP Committee.',
    subtitle: 'Senate • Vermont',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Committee chair',
    name: 'Brett Guthrie',
    personId: 'house-brett-guthrie-kentucky-2nd',
    sources: [
      {
        label: 'Energy and Commerce chairman page',
        url: 'https://energycommerce.house.gov/meet-the-chairman',
      },
      {
        label: 'Subcommittee assignments announcement',
        url: 'https://energycommerce.house.gov/posts/chairman-guthrie-announces-119th-energy-and-commerce-republican-subcommittee-assignments',
      },
    ],
    story:
      'Guthrie is a major biomedical-policy figure because House Energy and Commerce is one of the main House power centers for FDA-facing law, health regulation, and medical-innovation policy.',
    subtitle: 'House • Kentucky 2nd',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Committee ranking member',
    name: 'Frank Pallone',
    personId: 'house-frank-pallone-new-jersey-6th',
    sources: [
      {
        label: 'Democratic Energy and Commerce release',
        url: 'https://democrats-energycommerce.house.gov/media/press-releases/pallone-announces-energy-commerce-subcommittee-ranking-members-and-democratic',
      },
      {
        label: 'Democratic Energy and Commerce site',
        url: 'https://democrats-energycommerce.house.gov/',
      },
    ],
    story:
      'Pallone belongs in the biomedical-regulator bucket because House Energy and Commerce is a central venue for health-law negotiations that shape FDA, drug, and public-health policy.',
    subtitle: 'House • New Jersey 6th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Appropriations chair',
    name: 'Shelley Moore Capito',
    personId: 'senate-shelley-moore-capito',
    sources: [
      {
        label: 'Senate Labor-HHS-Education subcommittee',
        url: 'https://www.appropriations.senate.gov/subcommittees/labor-health-and-human-services-education-and-related-agencies',
      },
      {
        label: 'Appropriations roster announcement',
        url: 'https://www.appropriations.senate.gov/news/minority/collins-murray-announce-appropriations-subcommittees-leadership-and-rosters-for-the-119th-congress',
      },
    ],
    story:
      'Capito is relevant because the Senate Labor-HHS-Education appropriations panel controls major funding lines for NIH, CDC, BARDA, and other federal biomedical institutions.',
    subtitle: 'Senate • West Virginia',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Appropriations ranking member',
    name: 'Tammy Baldwin',
    personId: 'senate-tammy-baldwin',
    sources: [
      {
        label: 'Senate Labor-HHS-Education subcommittee',
        url: 'https://www.appropriations.senate.gov/subcommittees/labor-health-and-human-services-education-and-related-agencies',
      },
      {
        label: 'Baldwin appropriations release',
        url: 'https://www.baldwin.senate.gov/news/press-releases/senate-appropriations-committee-approves-baldwins-labor-health-and-human-services-education-and-related-agencies-appropriations-bill',
      },
    ],
    story:
      'Baldwin is a major biomedical-funding actor because she serves on the Senate subcommittee that writes the Labor-HHS-Education bill covering core federal health and research agencies.',
    subtitle: 'Senate • Wisconsin',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Appropriations chair',
    name: 'Robert Aderholt',
    personId: 'house-robert-aderholt-alabama-4th',
    sources: [
      {
        label: 'Aderholt Labor-HHS chair release',
        url: 'https://aderholt.house.gov/media-center/press-releases/congressman-robert-aderholt-serve-chairman-labor-health-and-human',
      },
      {
        label: 'House Appropriations Committee',
        url: 'https://appropriations.house.gov/',
      },
    ],
    story:
      'Aderholt is a top House biomedical-funding node because he chairs the House Labor-HHS-Education appropriations subcommittee, which writes major NIH, CDC, and HHS spending lines.',
    subtitle: 'House • Alabama 4th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'biomedical regulator',
    evidenceLabel: 'Appropriations ranking member',
    name: 'Rosa DeLauro',
    personId: 'house-rosa-delauro-connecticut-3rd',
    sources: [
      {
        label: 'Democratic Labor-HHS subcommittee page',
        url: 'https://democrats-appropriations.house.gov/subcommittees/labor-health-and-human-services-education-and-related-agencies-119th-congress',
      },
      {
        label: 'Appropriations Democratic roster release',
        url: 'https://democrats-appropriations.house.gov/news/press-releases/delauro-announces-appropriations-committee-roster-119th-congress',
      },
    ],
    story:
      'DeLauro belongs here because she is one of the most powerful House Democrats on public-health and research funding, especially through the appropriations process.',
    subtitle: 'House • Connecticut 3rd',
    title: 'U.S. Representative',
  },
  {
    branchId: 'executive',
    category: 'biosecurity',
    evidenceLabel: 'Executive order',
    name: 'Donald J. Trump',
    personId: 'executive-donald-j-trump',
    sources: [
      {
        label: 'White House biological research safety order',
        url: 'https://www.whitehouse.gov/presidential-actions/2025/05/improving-the-safety-and-security-of-biological-research/',
      },
      {
        label: 'Federal Register order text',
        url: 'https://www.govinfo.gov/content/pkg/FR-2025-05-08/pdf/FR-2025-05-08.pdf',
      },
    ],
    story:
      'Trump belongs in the broad biosecurity bucket because his White House directly issued policy aimed at dangerous biological research and lab-safety controls. That is a real executive-branch biosecurity lever, separate from campaign rhetoric.',
    subtitle: 'The White House',
    title: 'President of the United States',
  },
  {
    branchId: 'legislative',
    category: 'biosecurity',
    evidenceLabel: 'Official bill + statement',
    name: 'Tom Cotton',
    personId: 'senate-tom-cotton',
    sources: [
      {
        label: 'Biothreat Prevention Act release',
        url: 'https://www.cotton.senate.gov/news/press-releases/cotton-introduces-bill-to-ban-to-protect-american-agriculture-from-biothreats',
      },
      {
        label: 'Ban U.S. funds for Wuhan research',
        url: 'https://www.cotton.senate.gov/news/press-releases/cotton-barrasso-introduce-bill-to-ban-us-funds-for-research-in-wuhan-china',
      },
      {
        label: 'Cotton on CIA COVID origins findings',
        url: 'https://www.cotton.senate.gov/news/press-releases/chairman-cotton-statement-on-cia-findings-on-covid-origins',
      },
    ],
    story:
      'Cotton is one of the clearest congressional biosecurity hawks on the site. He combines China-focused lab and research restrictions with a broader biothreat-prevention framing.',
    subtitle: 'Senate • Arkansas',
    title: 'U.S. Senator',
  },
  {
    branchId: 'executive',
    category: 'biosecurity',
    evidenceLabel: 'Intelligence assessment',
    name: 'John Ratcliffe',
    personId: 'executive-john-ratcliffe-central-intelligence-agency',
    sources: [
      {
        label: 'CIA director page',
        url: 'https://www.cia.gov/about/director-of-cia/',
      },
      {
        label: 'AP on CIA lab-origin assessment',
        url: 'https://apnews.com/article/9ab7e84c626fed68ca13c8d2e453dde1',
      },
    ],
    story:
      'Ratcliffe is a biosecurity match through intelligence, not industry. His relevance comes from the CIA’s public low-confidence assessment favoring a laboratory origin for COVID-19 and from his role leading that agency.',
    subtitle: 'Central Intelligence Agency',
    title: 'Director of the Central Intelligence Agency',
  },
  {
    branchId: 'executive',
    category: 'biosecurity',
    evidenceLabel: 'Official role + public controversy',
    name: 'Tulsi Gabbard',
    personId: 'executive-tulsi-gabbard-office-of-the-director-of-national-intelligence',
    sources: [
      {
        label: 'ODNI biosecurity center',
        url: 'https://www.dni.gov/index.php/who-we-are/organizations/205-about/organization/national-counterproliferation-and-biosecurity-center',
      },
      {
        label: 'AP on Ukraine biolab controversy',
        url: 'https://apnews.com/article/a798adaf9cd531a5d0c9329f7597f0f6',
      },
    ],
    story:
      'Gabbard sits over intelligence structures that include formal biosecurity work, and she also became a public figure in the Ukraine biolab controversy. That makes her relevant both institutionally and rhetorically.',
    subtitle: 'Office of the Director of National Intelligence',
    title: 'Director of National Intelligence',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official letters + bill',
    name: 'Rand Paul',
    personId: 'senate-rand-paul',
    sources: [
      {
        label: 'Paul letter to NIH on gain-of-function',
        url: 'https://www.paul.senate.gov/dr-rand-paul-releases-letter-to-nih-demanding-details-on-gain-of-function-research/',
      },
      {
        label: 'Paul bill to end GOF funding',
        url: 'https://www.paul.senate.gov/sen-rand-paul-introduces-bill-to-end-taxpayer-funding-of-gain-of-function-research/',
      },
    ],
    story:
      'Paul made gain-of-function oversight and NIH-linked Wuhan funding a signature issue. He is one of the strongest examples on the site of direct, repeated public engagement with risky-pathogen-research politics.',
    subtitle: 'Senate • Kentucky',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official statement + bill',
    name: 'Roger Marshall',
    personId: 'senate-roger-marshall',
    sources: [
      {
        label: 'Marshall on sanctions and GOF ban',
        url: 'https://www.marshall.senate.gov/newsroom/press-releases/with-covid-origins-back-in-the-spotlight-sen-marshall-leads-legislation-to-sanction-china-ban-gain-of-function-research/',
      },
      {
        label: 'Marshall on Wuhan funding',
        url: 'https://www.marshall.senate.gov/newsroom/press-releases/sen-marshall-joins-sen-lankford-in-calling-on-hhs-to-halt-all-taxpayer-funding-going-to-wuhan-lab/',
      },
    ],
    story:
      'Marshall is a particularly strong match because he explicitly linked COVID origins, gain-of-function, and federal policy responses. His public materials move well beyond generic healthcare rhetoric.',
    subtitle: 'Senate • Kansas',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official bill + declassification push',
    name: 'Josh Hawley',
    personId: 'senate-josh-hawley',
    sources: [
      {
        label: 'Hawley-Braun declassification bill',
        url: 'https://www.hawley.senate.gov/hawley-braun-introduce-bill-declassify-intel-wuhan-lab-leak',
      },
      {
        label: 'Congress bill page',
        url: 'https://www.congress.gov/bill/118th-congress/senate-bill/619',
      },
    ],
    story:
      'Hawley is a major lab-leak-politics figure because he pushed to declassify intelligence tied to the Wuhan lab-leak theory. His relevance is about origins politics and intelligence transparency.',
    subtitle: 'Senate • Missouri',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official statements',
    name: 'Ted Cruz',
    personId: 'senate-ted-cruz',
    sources: [
      {
        label: 'Cruz calls for COVID origins investigation',
        url: 'https://www.cruz.senate.gov/newsroom/press-releases/sen-cruz-calls-for-congressional-investigation-into-the-origins-of-coronavirus-pandemic',
      },
      {
        label: 'Cruz says Wuhan lab origin is true',
        url: 'https://www.cruz.senate.gov/newsroom/press-releases/sen-cruz-i-believe-it-to-be-true-that-the-coronavirus-originated-from-the-wuhan-lab',
      },
    ],
    story:
      'Cruz is in the broad list because he repeatedly and publicly argued that COVID came from the Wuhan lab and backed investigation and sanctions tied to that claim.',
    subtitle: 'Senate • Texas',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official letter',
    name: 'Mike Lee',
    personId: 'senate-mike-lee',
    sources: [
      {
        label: 'Lee letter on GOF, WIV, and lab leak',
        url: 'https://www.lee.senate.gov/services/files/C8F3A56B-6127-4EE7-A3EA-F470ED511BFB',
      },
    ],
    story:
      'Lee belongs here because an official Senate letter from his office explicitly tied together gain-of-function, the Wuhan Institute of Virology, and a possible lab leak.',
    subtitle: 'Senate • Utah',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official bill sponsor',
    name: 'Marsha Blackburn',
    personId: 'senate-marsha-blackburn',
    sources: [
      {
        label: 'Blackburn 2025 GOF bill release',
        url: 'https://www.blackburn.senate.gov/2025/3/blackburn-colleagues-introduce-bill-to-prevent-taxpayer-funded-gain-of-function-research',
      },
      {
        label: 'Blackburn 2021 GOF moratorium release',
        url: 'https://www.blackburn.senate.gov/2021/6/blackburn-marshall-introduce-bill-to-place-moratorium-on-gain-of-function-research',
      },
    ],
    story:
      'Blackburn qualifies because she publicly and repeatedly pushed legislation for a moratorium on taxpayer-funded gain-of-function research.',
    subtitle: 'Senate • Tennessee',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official bill sponsor',
    name: 'Joni Ernst',
    personId: 'senate-joni-ernst',
    sources: [
      {
        label: 'Ernst GOF moratorium release',
        url: 'https://www.ernst.senate.gov/news/press-releases/ernst-marshall-blackburn-introduce-moratorium-on-gain-of-function-research',
      },
    ],
    story:
      'Ernst is in this bucket because she officially backed a gain-of-function research moratorium and framed the issue as risky pathogen governance rather than ordinary health policy.',
    subtitle: 'Senate • Iowa',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official sanctions bill',
    name: 'James Lankford',
    personId: 'senate-james-lankford',
    sources: [
      {
        label: 'Lankford sanctions release on COVID origins obstruction',
        url: 'https://www.lankford.senate.gov/news/press-releases/lankford-marshall-lead-legislation-to-sanction-beijing-for-obstructing-covid-origins-investigation-to-us',
      },
    ],
    story:
      'Lankford appears because he publicly tied Beijing sanctions to obstruction of the COVID origins investigation, placing him directly in the Wuhan-origins policy fight.',
    subtitle: 'Senate • Oklahoma',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official hearing material',
    name: 'Ron Johnson',
    personId: 'senate-ron-johnson',
    sources: [
      {
        label: 'Johnson on evidence regarding COVID origins',
        url: 'https://www.ronjohnson.senate.gov/2023/2/sen-johnson-witnesses-detail-evidence-regarding-covid-19-origins',
      },
    ],
    story:
      'Johnson qualifies because his official Senate materials promoted testimony and evidence focused on COVID origins and lab-leak-related questions.',
    subtitle: 'Senate • Wisconsin',
    title: 'U.S. Senator',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Committee oversight',
    name: 'James Comer',
    personId: 'house-james-comer-kentucky-1st',
    sources: [
      {
        label: 'Comer on taxpayer-funded GOF in Wuhan',
        url: 'https://oversight.house.gov/release/comer-american-tax-dollars-were-used-to-fund-gain-of-function-research-in-the-wuhan-lab/',
      },
      {
        label: 'Oversight COVID origins investigation release',
        url: 'https://oversight.house.gov/release/wenstrup-comer-launch-first-select-subcommittee-investigation-into-covid-origins-and-u-s-taxpayer-dollars-funneled-to-the-wuhan-lab%EF%BF%BC/',
      },
    ],
    story:
      'Comer is one of the strongest House oversight matches because his committee materials explicitly discuss dangerous gain-of-function research, Wuhan funding, and COVID origins.',
    subtitle: 'House • Kentucky 1st',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Signed oversight letter',
    name: 'Jim Jordan',
    personId: 'house-jim-jordan-ohio-4th',
    sources: [
      {
        label: 'House letter to Fauci re GOF testimony',
        url: 'https://oversight.house.gov/wp-content/uploads/2021/07/Letter-to-Fauci-Re.-Testimony.pdf',
      },
    ],
    story:
      'Jordan is included because he signed formal oversight correspondence focused on alleged NIAID funding of gain-of-function research at the Wuhan Institute of Virology.',
    subtitle: 'House • Ohio 4th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Committee report',
    name: 'Michael McCaul',
    personId: 'house-michael-mccaul-texas-10th',
    sources: [
      {
        label: 'McCaul addendum on COVID origins',
        url: 'https://foreignaffairs.house.gov/news/press-releases/mccaul-releases-addendum-origins-covid-19-report',
      },
      {
        label: 'McCaul interim report release',
        url: 'https://foreignaffairs.house.gov/press-release/mccaul-releases-interim-report-on-origins-of-covid-19-pandemic/',
      },
    ],
    story:
      'McCaul belongs here because official committee material under his name explicitly said gain-of-function research was happening at the Wuhan Institute of Virology.',
    subtitle: 'House • Texas 10th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official statement',
    name: 'Andy Barr',
    personId: 'house-andy-barr-kentucky-6th',
    sources: [
      {
        label: 'Barr on Wuhan lab leak and GOF',
        url: 'https://barr.house.gov/2021/8/rep-barr-covid-19-likely-leaked-from-wuhan-virology-lab-time-to-ban-gain-of-function-research',
      },
    ],
    story:
      'Barr publicly argued that COVID likely leaked from the Wuhan lab and explicitly called for a ban on taxpayer-funded gain-of-function research.',
    subtitle: 'House • Kentucky 6th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official statement',
    name: 'Brian Fitzpatrick',
    personId: 'house-brian-fitzpatrick-pennsylvania-1st',
    sources: [
      {
        label: 'Fitzpatrick on GOF and lab-escape evidence',
        url: 'https://fitzpatrick.house.gov/2021/5/rep-brian-fitzpatrick-our-nation-has-been-through-hell-we-need-answers-now',
      },
    ],
    story:
      'Fitzpatrick is a strong match because his own House statement explicitly connected EcoHealth, gain-of-function work, Wuhan, and biosafety concerns.',
    subtitle: 'House • Pennsylvania 1st',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official bill announcement',
    name: 'Michael Turner',
    personId: 'house-michael-turner-ohio-10th',
    sources: [
      {
        label: 'Turner EMPOWER NIH Act release',
        url: 'https://turner.house.gov/2021/6/rep-mike-turner-oh-10-introduces-empower-nih-act',
      },
    ],
    story:
      'Turner belongs in this group because his bill announcement explicitly described gain-of-function experimentation at WIV as risky and in need of stronger oversight.',
    subtitle: 'House • Ohio 10th',
    title: 'U.S. Representative',
  },
  {
    branchId: 'legislative',
    category: 'lab-leak and gof politics',
    evidenceLabel: 'Official letter release',
    name: 'Chip Roy',
    personId: 'house-chip-roy-texas-21st',
    sources: [
      {
        label: 'Roy demands answers on GOF in Wuhan',
        url: 'https://roy.house.gov/media/press-releases/rep-roy-doubles-down-and-demands-answers-fauci-emails',
      },
    ],
    story:
      'Roy appears here because his office explicitly framed COVID origins and gain-of-function research in Wuhan as subjects for formal congressional inquiry.',
    subtitle: 'House • Texas 21st',
    title: 'U.S. Representative',
  },
] as const
