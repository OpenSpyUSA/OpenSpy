import type { SourceLink } from './types'

export type BiotechMentionTier =
  | 'direct self-use'
  | 'signed or office-owned document'
  | 'official contextual mention'

export interface BiotechMentionRecord {
  evidenceLabel: string
  exactMatches?: string[]
  id: string
  personIds: string[]
  sources: SourceLink[]
  story: string
  tier: BiotechMentionTier
}

export const BIOTECH_MENTIONS: BiotechMentionRecord[] = [
  {
    id: 'trump-white-house-biosecurity-order',
    tier: 'direct self-use',
    personIds: ['executive-donald-j-trump'],
    evidenceLabel: 'White House source bundle',
    exactMatches: ['biosecurity', 'biological threats', 'gain-of-function', 'biodefense'],
    story:
      "Multiple official White House actions and strategy documents tied to Trump use the target language in presidential policy on biological research and biodefense.",
    sources: [
      {
        label: 'White House presidential action',
        locationLabel: 'section on biological threats and biosecurity',
        textFragment:
          'driving global leadership in biotechnology, biological countermeasures, biosecurity, and health research',
        url: 'https://www.whitehouse.gov/presidential-actions/2025/05/improving-the-safety-and-security-of-biological-research/',
      },
      {
        label: 'White House fact sheet',
        locationLabel: 'fact sheet line on lab accidents and biosecurity incidents',
        textFragment: 'Protects Americans from lab accidents and other biosecurity incidents',
        url: 'https://www.whitehouse.gov/fact-sheets/2025/05/fact-sheet-president-donald-j-trump-achieves-improved-safety-and-security-of-biological-research/',
      },
      {
        label: 'Archived presidential memorandum',
        locationLabel: 'page title on support for national biodefense',
        textFragment: 'Presidential Memorandum on the Support for National Biodefense',
        url: 'https://trumpwhitehouse.archives.gov/presidential-actions/presidential-memorandum-support-national-biodefense/',
      },
      {
        label: 'National Biodefense Strategy PDF',
        locationLabel: 'page 1 title page',
        page: 1,
        searchText: 'National Biodefense Strategy',
        url: 'https://trumpwhitehouse.archives.gov/wp-content/uploads/2018/09/National-Biodefense-Strategy.pdf',
      },
    ],
  },
  {
    id: 'rubio-senate-intelligence-hearing',
    tier: 'direct self-use',
    personIds: [
      'executive-marco-rubio',
      'executive-marco-rubio-national-archives-and-records-administration',
    ],
    evidenceLabel: 'Hearing source bundle',
    exactMatches: [
      'bioweapon',
      'bioweapons',
      'biological weapon',
      'biological weapons',
      'biodefense',
    ],
    story:
      'Official Senate Intelligence Committee hearing materials attribute direct target-language use to Rubio during questioning. This applies to both current Rubio profiles on the site.',
    sources: [
      {
        label: 'Senate Intelligence hearing page',
        locationLabel: 'hearing landing page for Rubio questioning',
        textFragment: 'Hearings to examine worldwide threats',
        url: 'https://www.intelligence.senate.gov/2022/03/04/hearings-open-hearing-worldwide-threats-2/',
      },
      {
        label: 'Senate Intelligence hearing PDF',
        locationLabel: 'p. 38, Rubio on bioweapon vs. bio research facilities',
        page: 38,
        searchText: 'bioweapon facility',
        url: 'https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-hearings-chrg-117shrg47985.pdf',
      },
    ],
  },
  {
    id: 'ratcliffe-wuhan-hearing-text',
    tier: 'direct self-use',
    personIds: ['executive-john-ratcliffe-central-intelligence-agency'],
    evidenceLabel: 'Transcript bundle',
    exactMatches: ['gain-of-function'],
    story:
      'An official House hearing transcript and supporting media transcripts attribute direct target-language use to John Ratcliffe in discussion of Wuhan gain-of-function research.',
    sources: [
      {
        label: 'House hearing transcript PDF',
        locationLabel: "p. 11, Ratcliffe opening statement on China's gain-of-function research",
        page: 11,
        searchText: "highlight China's gain-of-function research",
        url: 'https://docs.house.gov/meetings/VC/VC00/20230418/115744/HHRG-118-VC00-Transcript-20230418.pdf',
      },
      {
        label: 'Fox News transcript',
        locationLabel: 'transcript section on gain-of-function research',
        textFragment: 'gain-of-function research',
        url: 'https://www.foxnews.com/transcript/the-ingraham-angle-on-afghanistan-covid-vaccines',
      },
      {
        label: 'Fox News video clip',
        locationLabel: 'video clip on gain-of-function research',
        url: 'https://www.foxnews.com/video/6325352818112',
      },
    ],
  },
  {
    id: 'klobuchar-biotech-security-release',
    tier: 'direct self-use',
    personIds: ['senate-amy-klobuchar'],
    evidenceLabel: 'Attributed quote',
    exactMatches: ['bioweapons'],
    story:
      "An official Cotton-Klobuchar release includes Klobuchar's own attributed quote using the target language.",
    sources: [
      {
        label: 'Cotton-Klobuchar biotech security release',
        locationLabel: 'Klobuchar quote on misuse of genetic material',
        textFragment: 'including to create bioweapons',
        url: 'https://www.cotton.senate.gov/news/press-releases/cotton-klobuchar-introduce-bill-to-establish-federal-biotech-security-framework',
      },
    ],
  },
  {
    id: 'marshall-covid-origins-hearing',
    tier: 'direct self-use',
    personIds: ['senate-roger-marshall'],
    evidenceLabel: 'Hearing / release page',
    exactMatches: ['bioweapon', 'bioweapons', 'bioterrorism', 'gain-of-function'],
    story:
      'An official Marshall hearing and release page attributes direct target-language use to him in COVID-origins questioning.',
    sources: [
      {
        label: 'Marshall hearing release',
        locationLabel: 'Marshall question asking if the virus could have been used as a bioweapon',
        textFragment: 'could have been used as a bioweapon',
        url: 'https://www.marshall.senate.gov/newsroom/press-releases/senator-marshall-demands-answers-on-the-origins-of-covid-19-in-senate-committee-hearing/',
      },
    ],
  },
  {
    id: 'peters-biological-threats-hearing',
    tier: 'direct self-use',
    personIds: ['senate-gary-c-peters'],
    evidenceLabel: 'Opening statement',
    exactMatches: [
      'bioweapons',
      'biosecurity',
      'biological threats',
      'biological weapons',
      'biodefense',
    ],
    story:
      'Official Homeland Security and Governmental Affairs Committee opening-statement material attributes direct target-language use to Peters.',
    sources: [
      {
        label: 'Peters HSGAC hearing release',
        locationLabel: 'Peters opener on weaponized biological threats',
        textFragment:
          'These bioweapons have the potential to cause everything from mass casualties',
        url: 'https://www.hsgac.senate.gov/media/dems/peters-convenes-hearing-to-examine-us-preparedness-to-address-biological-threats-to-national-security/',
      },
    ],
  },
  {
    id: 'hassan-floor-remarks-feb-12-2025',
    tier: 'direct self-use',
    personIds: ['senate-margaret-wood-hassan'],
    evidenceLabel: 'Floor remarks',
    exactMatches: ['bioweapon'],
    story:
      'Official Congressional Record floor remarks attribute direct target-language use to Maggie Hassan.',
    sources: [
      {
        label: 'Congressional Record, Feb. 12, 2025',
        locationLabel: 'page 1, Hassan floor remarks using "bioweapon"',
        page: 1,
        searchText: 'bioweapon',
        url: 'https://www.congress.gov/119/crec/2025/02/12/171/29/CREC-2025-02-12-pt1-PgS881.pdf',
      },
    ],
  },
  {
    id: 'ossoff-floor-remarks-feb-12-2025',
    tier: 'direct self-use',
    personIds: ['senate-jon-ossoff'],
    evidenceLabel: 'Floor remarks',
    exactMatches: ['bioweapon'],
    story:
      'Official Congressional Record floor remarks attribute direct target-language use to Jon Ossoff.',
    sources: [
      {
        label: 'Congressional Record, Feb. 12, 2025',
        locationLabel: 'page 1, Ossoff floor remarks using "bioweapon"',
        page: 1,
        searchText: 'bioweapon',
        url: 'https://www.congress.gov/119/crec/2025/02/12/171/29/CREC-2025-02-12-pt1-PgS955.pdf',
      },
    ],
  },
  {
    id: 'cassidy-help-hearing-text',
    tier: 'direct self-use',
    personIds: ['senate-bill-cassidy'],
    evidenceLabel: 'Hearing text',
    exactMatches: ['bioweapon'],
    story:
      'Official Senate HELP hearing text attributes direct target-language use to Bill Cassidy.',
    sources: [
      {
        label: 'Senate HELP hearing text',
        locationLabel: 'Cassidy on Lyme disease as a military bioweapon',
        textFragment: 'military bioweapon',
        url: 'https://www.congress.gov/event/119th-congress/senate-event/LC74210/text',
      },
    ],
  },
  {
    id: 'hickenlooper-help-hearing-text',
    tier: 'direct self-use',
    personIds: ['senate-john-w-hickenlooper'],
    evidenceLabel: 'Hearing text',
    exactMatches: ['bioweapon'],
    story:
      'Official Senate HELP hearing text attributes direct target-language use to John Hickenlooper.',
    sources: [
      {
        label: 'Senate HELP hearing text',
        locationLabel: 'Hickenlooper on a "militaristic bioweapon"',
        textFragment: 'militaristic bioweapon',
        url: 'https://www.congress.gov/event/119th-congress/senate-event/LC74210/text',
      },
    ],
  },
  {
    id: 'bennet-floor-remarks-feb-12-2025',
    tier: 'direct self-use',
    personIds: ['senate-michael-f-bennet'],
    evidenceLabel: 'Congressional Record PDF',
    exactMatches: ['bioweapon', 'bioweapons', 'bioterrorism'],
    story:
      'Official Congressional Record material attributes direct target-language use to Michael Bennet.',
    sources: [
      {
        label: 'Congressional Record Senate PDF',
        locationLabel: 'p. 50, Bennet on genetically engineered bioweapons',
        page: 50,
        searchText: 'genetically engineered bioweapon',
        url: 'https://www.congress.gov/119/crec/2025/02/12/171/29/CREC-2025-02-12-senate.pdf',
      },
    ],
  },
  {
    id: 'cantwell-floor-remarks-feb-12-2025',
    tier: 'direct self-use',
    personIds: ['senate-maria-cantwell'],
    evidenceLabel: 'Congressional Record PDF',
    exactMatches: ['bioweapon', 'bioweapons', 'bioterrorism'],
    story:
      'Official Congressional Record material attributes direct target-language use to Maria Cantwell.',
    sources: [
      {
        label: 'Congressional Record Senate PDF',
        locationLabel: 'p. 36, Cantwell quote on Kennedy’s COVID-19 "bio-weapon" claim',
        page: 36,
        searchText: 'spared Jews and the Chinese',
        url: 'https://www.congress.gov/119/crec/2025/02/12/171/29/CREC-2025-02-12-senate.pdf',
      },
    ],
  },
  {
    id: 'schumer-floor-remarks-feb-11-2025',
    tier: 'direct self-use',
    personIds: ['senate-charles-e-schumer'],
    evidenceLabel: 'Official source bundle',
    exactMatches: ['bioweapon', 'bioweapons', 'biological weapons', 'biosecurity'],
    story:
      "Official Congressional Record material and a Schumer Senate release both attribute direct target-language use to Chuck Schumer, including a later biosecurity quote tied to bird-flu response.",
    sources: [
      {
        label: 'Congressional Record Senate PDF',
        locationLabel: 'p. 46, Schumer floor remarks on "bioweapon laboratories in Ukraine"',
        page: 46,
        searchText: 'bioweapon laboratories in Ukraine',
        url: 'https://www.congress.gov/119/crec/2025/02/11/171/28/CREC-2025-02-11-senate.pdf',
      },
      {
        label: 'Schumer bird-flu biosecurity release',
        locationLabel: 'headline and quote on surging biosecurity',
        textFragment: 'surge biosecurity',
        url: 'https://www.schumer.senate.gov/newsroom/press-releases/schumer-standing-at-rochesters-jines-restaurant-with-egg-and-grocery-prices-rising-due-to-bird-flu-outbreak-calls-on-feds-to-surge-biosecurity-and-get-all-hands-on-deck-to-help-farms-contain-bird-flu_lower-costs-for-upstate-families-and-restaurants',
      },
    ],
  },
  {
    id: 'heinrich-floor-remarks-feb-11-2025',
    tier: 'direct self-use',
    personIds: ['senate-martin-heinrich'],
    evidenceLabel: 'Congressional Record PDF',
    exactMatches: ['bioweapon', 'bioweapons', 'biological weapons'],
    story:
      'Official Congressional Record material attributes direct target-language use to Martin Heinrich.',
    sources: [
      {
        label: 'Congressional Record Senate PDF',
        locationLabel: 'p. 27, Heinrich on bioweapons and biological weapons',
        page: 27,
        searchText: 'bioweapons',
        url: 'https://www.congress.gov/119/crec/2025/02/11/171/28/CREC-2025-02-11-senate.pdf',
      },
    ],
  },
  {
    id: 'warner-intelligence-authorization-release',
    tier: 'direct self-use',
    personIds: ['senate-mark-r-warner'],
    evidenceLabel: 'Attributed quote',
    exactMatches: ['bioweapons'],
    story:
      "An official Cotton-Warner release includes Warner's own attributed quote using the target language.",
    sources: [
      {
        label: 'Cotton-Warner release',
        locationLabel: 'Warner quote on countering biotechnologies and bioweapons',
        textFragment: 'threats relating to biotechnologies and bioweapons',
        url: 'https://www.cotton.senate.gov/news/press-releases/senate-intelligence-committee-passes-intelligence-authorization-act',
      },
    ],
  },
  {
    id: 'padilla-ai-biotech-summit-release',
    tier: 'direct self-use',
    personIds: ['senate-alex-padilla'],
    evidenceLabel: 'Keynote release',
    exactMatches: ['bioweapons', 'bioterrorism'],
    story:
      'An official Padilla keynote release attributes direct target-language use to Alex Padilla.',
    sources: [
      {
        label: 'Padilla AI biotechnology summit release',
        locationLabel: 'keynote line on future warfare',
        textFragment: "It’ll be fought with bioweapons, too.",
        url: 'https://www.padilla.senate.gov/newsroom/press-releases/padilla-delivers-keynote-address-at-ai-biotechnology-summit/',
      },
    ],
  },
  {
    id: 'daines-agroterrorism-hearing-text',
    tier: 'direct self-use',
    personIds: ['senate-steve-daines'],
    evidenceLabel: 'Senate hearing text',
    exactMatches: ['biodefense'],
    story:
      'Official Senate hearing text attributes direct target-language use to Steve Daines in questioning about a biodefense facility and agroterror threats.',
    sources: [
      {
        label: 'Senate hearing text on agroterrorism and food defense',
        locationLabel: 'Daines question on the new biodefense facility in Kansas',
        textFragment: 'advance of the new biodefense facility that is coming online in Kansas',
        url: 'https://www.congress.gov/event/115th-congress/senate-event/LC64938/text',
      },
    ],
  },
  {
    id: 'duckworth-biodefense-and-bioterrorism-pages',
    tier: 'signed or office-owned document',
    personIds: ['senate-tammy-duckworth'],
    evidenceLabel: 'Official release bundle',
    exactMatches: ['biodefense', 'bioterrorism'],
    story:
      "Duckworth's official Senate pages use the target language in office-authored legislative and letter materials, including biodefense and bioterrorism references.",
    sources: [
      {
        label: 'Duckworth NDAA biodefense release',
        locationLabel: 'Duckworth NDAA provision on a Department-wide biodefense strategy',
        textFragment: 'Department-wide strategy on biodefense efforts',
        url: 'https://www.duckworth.senate.gov/news/press-releases/duckworth-provisions-to-support-troops-improve-military-readiness-reduce-reliance-on-foreign-oil-included-in-committee-passed-2023-defense-bill',
      },
      {
        label: 'Duckworth vaccine-access letter page',
        locationLabel: 'release section on bioterrorism risks',
        textFragment: 'bioterrorism',
        url: 'https://www.duckworth.senate.gov/news/press-releases/duckworth-warren-blunt-rochester-condemn-rfk-for-making-it-harder-for-pregnant-women-and-children-to-receive-covid-19-vaccines-putting-their-health-at-risk',
      },
    ],
  },
  {
    id: 'ernst-gain-of-function-pages',
    tier: 'direct self-use',
    personIds: ['senate-joni-ernst'],
    evidenceLabel: 'Official release bundle',
    exactMatches: ['gain-of-function'],
    story:
      'Official Ernst releases and columns attribute direct target-language use to Joni Ernst in arguments against Wuhan-style gain-of-function research.',
    sources: [
      {
        label: 'Ernst release on Trump gain-of-function ban',
        locationLabel: 'Ernst statement on banning risky gain-of-function research in China',
        textFragment: 'ban all federal funding of risky gain-of-function research in China',
        url: 'https://www.ernst.senate.gov/news/press-releases/ernst-applauds-trumps-ban-of-wuhan-style-gain-of-function-research',
      },
      {
        label: 'Ernst column on stopping the next pandemic',
        locationLabel: 'column section on gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://www.ernst.senate.gov/news/columns/ernst-this-is-how-we-stop-the-next-pandemic',
      },
    ],
  },
  {
    id: 'fischer-biosecurity-hearing-pdf',
    tier: 'direct self-use',
    personIds: ['senate-deb-fischer'],
    evidenceLabel: 'Congressional hearing PDF',
    exactMatches: ['gain-of-function', 'biosecurity'],
    story:
      'Official Senate hearing material attributes direct target-language use to Deb Fischer in written questions on biosecurity and gain-of-function research.',
    sources: [
      {
        label: 'Senate hearing PDF on national-security threats and gains from scientific openness',
        locationLabel: 'p. 63, Fischer written question on Gain of Function Research',
        page: 63,
        searchText: 'Questions 7. Gain of Function Research.',
        url: 'https://www.congress.gov/117/chrg/CHRG-117shrg55820/CHRG-117shrg55820.pdf',
      },
    ],
  },
  {
    id: 'cornyn-deepseek-letter',
    tier: 'signed or office-owned document',
    personIds: ['senate-john-cornyn'],
    evidenceLabel: 'Signed Senate letter',
    exactMatches: ['bioweapon attack'],
    story:
      "An official Senate letter hosted on Young's site uses the target language in a document Cornyn signed.",
    sources: [
      {
        label: 'Signed Senate letter PDF',
        locationLabel: 'p. 1, DeepSeek letter on instructions for a bioweapon attack',
        page: 1,
        searchText: 'provide instructions for carrying out a bioweapon attack',
        url: 'https://www.young.senate.gov/wp-content/uploads/8.1.25-Letter-to-Secretary-Lutnick-on-Deepseek-Opensource-model-Final1-1.pdf',
      },
    ],
  },
  {
    id: 'blackburn-deepseek-letter',
    tier: 'signed or office-owned document',
    personIds: ['senate-marsha-blackburn'],
    evidenceLabel: 'Signed Senate letter',
    exactMatches: ['bioweapon attack'],
    story:
      "An official Senate letter hosted on Young's site uses the target language in a document Blackburn signed.",
    sources: [
      {
        label: 'Signed Senate letter PDF',
        locationLabel: 'p. 1, DeepSeek letter on instructions for a bioweapon attack',
        page: 1,
        searchText: 'provide instructions for carrying out a bioweapon attack',
        url: 'https://www.young.senate.gov/wp-content/uploads/8.1.25-Letter-to-Secretary-Lutnick-on-Deepseek-Opensource-model-Final1-1.pdf',
      },
    ],
  },
  {
    id: 'husted-deepseek-letter',
    tier: 'signed or office-owned document',
    personIds: ['senate-jon-husted'],
    evidenceLabel: 'Signed Senate letter',
    exactMatches: ['bioweapon attack'],
    story:
      "An official Senate letter hosted on Young's site uses the target language in a document Jon Husted signed.",
    sources: [
      {
        label: 'Signed Senate letter PDF',
        locationLabel: 'p. 1, DeepSeek letter on instructions for a bioweapon attack',
        page: 1,
        searchText: 'provide instructions for carrying out a bioweapon attack',
        url: 'https://www.young.senate.gov/wp-content/uploads/8.1.25-Letter-to-Secretary-Lutnick-on-Deepseek-Opensource-model-Final1-1.pdf',
      },
    ],
  },
  {
    id: 'curtis-deepseek-letter',
    tier: 'signed or office-owned document',
    personIds: ['senate-john-r-curtis'],
    evidenceLabel: 'Signed Senate letter',
    exactMatches: ['bioweapon attack'],
    story:
      "An official Senate letter hosted on Young's site uses the target language in a document John Curtis signed.",
    sources: [
      {
        label: 'Signed Senate letter PDF',
        locationLabel: 'p. 1, DeepSeek letter on instructions for a bioweapon attack',
        page: 1,
        searchText: 'provide instructions for carrying out a bioweapon attack',
        url: 'https://www.young.senate.gov/wp-content/uploads/8.1.25-Letter-to-Secretary-Lutnick-on-Deepseek-Opensource-model-Final1-1.pdf',
      },
    ],
  },
  {
    id: 'young-deepseek-letter',
    tier: 'signed or office-owned document',
    personIds: ['senate-todd-young'],
    evidenceLabel: 'Signed Senate letter',
    exactMatches: ['bioweapon attack'],
    story:
      "An official Senate letter hosted on Young's site uses the target language in a document Todd Young signed.",
    sources: [
      {
        label: 'Signed Senate letter PDF',
        locationLabel: 'p. 1, DeepSeek letter on instructions for a bioweapon attack',
        page: 1,
        searchText: 'provide instructions for carrying out a bioweapon attack',
        url: 'https://www.young.senate.gov/wp-content/uploads/8.1.25-Letter-to-Secretary-Lutnick-on-Deepseek-Opensource-model-Final1-1.pdf',
      },
    ],
  },
  {
    id: 'van-hollen-biodefense-lab-release',
    tier: 'direct self-use',
    personIds: ['senate-chris-van-hollen'],
    evidenceLabel: 'Official release',
    exactMatches: ['biodefense', 'biological threats'],
    story:
      "Van Hollen's official Senate release attributes direct target-language use to him in remarks about biodefense capacity and evolving biological threats.",
    sources: [
      {
        label: 'Van Hollen, Cardin, Trone on Fort Detrick biodefense lab',
        locationLabel: 'Van Hollen quote on national biodefense capabilities',
        textFragment: 'investing in our national biodefense capabilities is critical',
        url: 'https://www.vanhollen.senate.gov/news/press-releases/van-hollen-cardin-trone-lead-effort-to-provide-long-term-authorization-for-fort-detrick-based-biodefense-lab',
      },
    ],
  },
  {
    id: 'hyde-smith-biosecurity-bill-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-cindy-hyde-smith'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Hyde-Smith's official Senate release uses the target language in office-authored bill material around the National Biosecurity Improvement Act.",
    sources: [
      {
        label: 'Hyde-Smith biosecurity bill release',
        locationLabel: 'headline on improving national biosecurity',
        textFragment: 'improve national biosecurity',
        url: 'https://www.hydesmith.senate.gov/hyde-smith-co-sponsors-bill-improve-national-biosecurity-against-future-pandemics',
      },
    ],
  },
  {
    id: 'johnson-fox-business-gain-of-function-page',
    tier: 'direct self-use',
    personIds: ['senate-ron-johnson'],
    evidenceLabel: 'Official interview page',
    exactMatches: ['gain-of-function'],
    story:
      "Johnson's official Senate page attributes direct target-language use to him in interview remarks about COVID-era gain-of-function research.",
    sources: [
      {
        label: 'Johnson on Fox Business with Maria Bartiromo',
        locationLabel: 'interview page section on gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://www.ronjohnson.senate.gov/2021/9/sen-johnson-on-fox-business-mornings-with-maria-bartiromo-september-8-2021',
      },
    ],
  },
  {
    id: 'kaine-who-biosecurity-letter-page',
    tier: 'direct self-use',
    personIds: ['senate-tim-kaine'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Kaine's official Senate release attributes target-language use to him in a letter warning that withdrawal from the World Health Organization would raise biosecurity risks.",
    sources: [
      {
        label: 'Kaine and Booker on WHO withdrawal risks',
        locationLabel: 'Kaine-Booker letter on WHO withdrawal and biosecurity threats',
        textFragment: 'public health and biosecurity threats',
        url: 'https://www.kaine.senate.gov/press-releases/kaine-and-booker-lead-colleagues-in-pressing-administration-about-public-health-risks-from-withdrawal-from-world-health-organization',
      },
    ],
  },
  {
    id: 'kennedy-fauci-wuhan-page',
    tier: 'direct self-use',
    personIds: ['senate-john-kennedy'],
    evidenceLabel: 'Official release',
    exactMatches: ['gain-of-function'],
    story:
      "Kennedy's official Senate page directly attributes target-language use to him in questioning about whether U.S. grant money funded gain-of-function research in Wuhan.",
    sources: [
      {
        label: 'Kennedy asks Fauci whether Wuhan lab lied',
        locationLabel: 'Kennedy questioning Fauci on Wuhan gain-of-function research',
        textFragment: 'you didn’t give any money to the Wuhan lab to conduct gain-of-function research',
        url: 'https://www.kennedy.senate.gov/public/2021/5/kennedy-asks-fauci-whether-wuhan-lab-lied-you-never-know',
      },
    ],
  },
  {
    id: 'king-monkeypox-biosecurity-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-angus-s-jr-king'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "King's official Senate page uses the target language in office-hosted letter material about vaccine distribution and the federal biosecurity program.",
    sources: [
      {
        label: 'King sounds alarm on monkeypox outbreak',
        locationLabel: 'release section on the federal biosecurity program',
        textFragment: 'biosecurity',
        url: 'https://www.king.senate.gov/newsroom/press-releases/king-sounds-alarm-on-monkeypox-outbreak-calls-for-action-on-vaccine-distribution',
      },
    ],
  },
  {
    id: 'lankford-gain-of-function-moratorium-release',
    tier: 'direct self-use',
    personIds: ['senate-james-lankford'],
    evidenceLabel: 'Official release',
    exactMatches: ['gain-of-function', 'biosecurity'],
    story:
      "Lankford's official Senate release directly attributes target-language use to him in support of a moratorium on gain-of-function research and in discussion of lab biosecurity issues.",
    sources: [
      {
        label: 'Lankford, Marshall to stop dangerous viral research by foreign entities',
        locationLabel: 'Lankford quote on COVID-19 origins and gain-of-function research',
        textFragment: 'the role of gain-of-function research in its development',
        url: 'https://www.lankford.senate.gov/news/press-releases/lankford-marshall-to-stop-dangerous-viral-research-by-foreign-entities/',
      },
    ],
  },
  {
    id: 'lujan-emerging-biothreats-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-ben-ray-lujan'],
    evidenceLabel: 'Official release',
    exactMatches: ['biothreats'],
    story:
      "Lujan's official Senate release uses the target language in office-authored bill material on tackling COVID-19 and emerging biothreats.",
    sources: [
      {
        label: 'Lujan introduces legislation to bolster research and development to tackle COVID-19 and emerging biothreats',
        locationLabel: 'Lujan bill release on COVID-19 and emerging biothreats',
        textFragment: 'COVID-19 and emerging biothreats',
        url: 'https://www.lujan.senate.gov/newsroom/press-releases/lujan-introduces-legislation-to-bolster-research-and-development-to-tackle-covid-19-and-emerging-biothreats/',
      },
    ],
  },
  {
    id: 'aderholt-opening-statement-apr-19-2023',
    tier: 'direct self-use',
    personIds: ['house-robert-aderholt-alabama-4th'],
    evidenceLabel: 'Opening statement PDF',
    exactMatches: ['biodefense'],
    story:
      'An official House Appropriations opening-statement PDF attributes direct target-language use to Robert Aderholt.',
    sources: [
      {
        label: 'Opening Statement of Chairman Robert B. Aderholt',
        locationLabel: 'page 1 opening statement section on biodefense',
        page: 1,
        searchText: 'biodefense',
        url: 'https://docs.house.gov/meetings/AP/AP07/20230419/115687/HHRG-118-AP07-MState-A000055-20230419.pdf',
      },
    ],
  },
  {
    id: 'biggs-america-first-contract',
    tier: 'direct self-use',
    personIds: ['house-andy-biggs-arizona-5th'],
    evidenceLabel: 'Official office page',
    exactMatches: ['gain-of-function'],
    story:
      "Biggs's official House page for the America First Contract directly attributes target-language use to him in a policy plank about COVID-19 origins and U.S. funding of gain-of-function research in China.",
    sources: [
      {
        label: 'The Contract',
        locationLabel: 'contract plank on Chinese gain-of-function research',
        textFragment: 'gain-of-function research in China',
        url: 'https://biggs.house.gov/america-first-contract/contract',
      },
    ],
  },
  {
    id: 'bera-biosecurity-hearing-dec-8-2021',
    tier: 'direct self-use',
    personIds: ['house-ami-bera-california-6th'],
    evidenceLabel: 'House hearing text',
    exactMatches: ['biosecurity', 'biological threats', 'biological weapons', 'bioterrorism'],
    story:
      'Official House Foreign Affairs hearing text attributes direct target-language use to Ami Bera in his opening remarks on global biosecurity, biological threats, and bioterrorism.',
    sources: [
      {
        label: 'Biosecurity for the Future: Strengthening Deterrence and Detection',
        locationLabel: 'Bera opening statement on biological threats, biosecurity, and bioterrorism',
        textFragment:
          'mechanisms to prevent and defeat both naturally occurring health challenges, as well as acts of bioterrorism',
        url: 'https://www.congress.gov/event/117th-congress/house-event/114290/text',
      },
    ],
  },
  {
    id: 'boebert-taxes-and-spending-page',
    tier: 'direct self-use',
    personIds: ['house-lauren-boebert-colorado-4th'],
    evidenceLabel: 'Official office page',
    exactMatches: ['gain-of-function'],
    story:
      "Boebert's official House issues page directly attributes target-language use to her in first-person policy text describing efforts to cut federal funding for gain-of-function research in China.",
    sources: [
      {
        label: 'Taxes and Spending | Representative Lauren Boebert',
        locationLabel: 'issues page section on cutting funding for gain-of-function research',
        textFragment: 'gain-of-function research in China',
        url: 'https://boebert.house.gov/issues/taxes-and-spending',
      },
    ],
  },
  {
    id: 'dale-strong-floor-remarks-mar-10-2025',
    tier: 'direct self-use',
    personIds: ['house-dale-strong-alabama-5th'],
    evidenceLabel: 'House floor remarks',
    exactMatches: [
      'bioweapon',
      'biological threats',
      'bioterrorism',
      'biological weapons',
      'biodefense',
    ],
    story:
      'Official House floor remarks attribute direct target-language use to Dale Strong.',
    sources: [
      {
        label: 'Congressional Record, Mar. 10, 2025',
        locationLabel: "Strong quote on America's bioweapon defense posture",
        textFragment: "My legislation will advance America's bioweapon defense posture",
        url: 'https://www.congress.gov/119/crec/2025/03/10/171/44/modified/CREC-2025-03-10-pt1-PgH1046.htm',
      },
    ],
  },
  {
    id: 'himes-bee-hero-grant-release-aug-2024',
    tier: 'direct self-use',
    personIds: ['house-james-himes-connecticut-4th'],
    evidenceLabel: 'Official office page',
    exactMatches: ['biological threats'],
    story:
      "Himes's official House release directly attributes target-language use to him in a quoted statement supporting NSF-backed research on biological threats to pollinators.",
    sources: [
      {
        label: 'Himes celebrates $400,000 grant for Sacred Heart University bee research',
        locationLabel: 'Himes quote on NSF funding to study biological threats to pollinators',
        textFragment: 'study biological threats to pollinators',
        url: 'https://himes.house.gov/2024/8/himes-celebrates-400-000-grant-for-sacred-heart-university-bee-research',
      },
    ],
  },
  {
    id: 'comer-house-hearing-may-1-2024',
    tier: 'direct self-use',
    personIds: ['house-james-comer-kentucky-1st'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['bioweapons'],
    story:
      'An official House hearing transcript attributes direct target-language use to James Comer.',
    sources: [
      {
        label: 'House hearing transcript',
        locationLabel: 'p. 21, Comer asking whether Wuhan was used to manufacture bioweapons',
        page: 21,
        searchText: 'manufacture bioweapons',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240501/117221/HHRG-118-VC00-Transcript-20240501.pdf',
      },
    ],
  },
  {
    id: 'gosar-house-hearing-jun-10-2025',
    tier: 'direct self-use',
    personIds: ['house-paul-gosar-arizona-9th'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['bioweapon', 'bioweapons'],
    story:
      'An official House hearing transcript attributes direct target-language use to Paul Gosar.',
    sources: [
      {
        label: 'House hearing transcript',
        locationLabel: 'hearing transcript section using "bioweapon"',
        searchText: 'bioweapon',
        url: 'https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf',
      },
    ],
  },
  {
    id: 'mcguire-house-hearing-jun-10-2025',
    tier: 'direct self-use',
    personIds: ['house-john-mcguire-virginia-5th'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['bioweapon'],
    story:
      'An official House hearing transcript attributes direct target-language use to John McGuire.',
    sources: [
      {
        label: 'House hearing transcript',
        locationLabel: "p. 43, McGuire on Americans' data being weaponized through the creation of a bioweapon",
        page: 43,
        searchText: 'creation of a bioweapon',
        url: 'https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf',
      },
    ],
  },
  {
    id: 'timmons-house-hearing-jun-10-2025',
    tier: 'direct self-use',
    personIds: ['house-william-timmons-south-carolina-4th'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['bioweapon', 'bioweapons'],
    story:
      'An official House hearing transcript attributes direct target-language use to William Timmons.',
    sources: [
      {
        label: 'House hearing transcript',
        locationLabel: 'p. 51, Timmons on DNA data being used for bioweapons',
        page: 51,
        searchText: 'used for bioweapons',
        url: 'https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf',
      },
    ],
  },
  {
    id: 'crane-house-hearing-jun-10-2025',
    tier: 'direct self-use',
    personIds: ['house-elijah-crane-arizona-2nd'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['bioweapons'],
    story:
      'An official House hearing transcript attributes direct target-language use to Elijah Crane.',
    sources: [
      {
        label: 'House hearing transcript',
        locationLabel: 'p. 56, Crane on unsecured DNA profiles being used to develop bioweapons',
        page: 56,
        searchText: 'could be used to develop bioweapons',
        url: 'https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf',
      },
    ],
  },
  {
    id: 'ruiz-house-hearing-rebuttal',
    tier: 'direct self-use',
    personIds: ['house-raul-ruiz-california-25th'],
    evidenceLabel: 'Hearing transcripts',
    exactMatches: ['bioweapon'],
    story:
      'Official House hearing transcripts attribute direct target-language use to Raul Ruiz in his rebuttal and probing remarks.',
    sources: [
      {
        label: 'House hearing transcript, May 1, 2024',
        locationLabel: 'p. 17, Ruiz asking whether the virus was used as a bioweapon',
        page: 17,
        searchText: 'used as a bioweapon',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240501/117221/HHRG-118-VC00-Transcript-20240501.pdf',
      },
      {
        label: 'House hearing transcript, Jun. 3, 2024',
        locationLabel: 'p. 21, Ruiz rejecting claims that NIH funding supported a bioweapons research capacity',
        page: 21,
        searchText: 'bioweapons research capacity',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240603/117378/HHRG-118-VC00-Transcript-20240603.pdf',
      },
    ],
  },
  {
    id: 'garcia-house-hearing-critique',
    tier: 'direct self-use',
    personIds: ['house-robert-garcia-california-42nd'],
    evidenceLabel: 'Hearing transcripts',
    exactMatches: ['bioweapon'],
    story:
      'Official House hearing transcripts attribute direct target-language use to Robert Garcia in his critique and quotation remarks.',
    sources: [
      {
        label: 'House hearing transcript, May 1, 2024',
        locationLabel: 'p. 37, Garcia criticizing claims about a Chinese-made bioweapon',
        page: 37,
        searchText: 'Chinese-made bioweapon',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240501/117221/HHRG-118-VC00-Transcript-20240501.pdf',
      },
      {
        label: 'House hearing transcript, Jun. 3, 2024',
        locationLabel: 'p. 47, Garcia quoting and condemning claims that COVID was a bioweapon',
        page: 47,
        searchText: 'COVID was a bioweapon',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240603/117378/HHRG-118-VC00-Transcript-20240603.pdf',
      },
    ],
  },
  {
    id: 'houlahan-house-hearing-mar-12-2024',
    tier: 'direct self-use',
    personIds: ['house-chrissy-houlahan-pennsylvania-6th'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['bioweapons'],
    story:
      'An official House hearing transcript attributes direct target-language use to Chrissy Houlahan.',
    sources: [
      {
        label: 'House hearing transcript',
        locationLabel: 'p. 86, Houlahan on biosecurity, bioterrorism, and bioweapons',
        page: 86,
        searchText: 'you name it, bioweapons',
        url: 'https://docs.house.gov/meetings/IG/IG00/20240312/116929/HHRG-118-IG00-Transcript-20240312.pdf',
      },
    ],
  },
  {
    id: 'obernolte-opening-statement-apr-8-2025',
    tier: 'direct self-use',
    personIds: ['house-jay-obernolte-california-23rd'],
    evidenceLabel: 'Opening statement PDF',
    exactMatches: ['bioweapons'],
    story:
      'An official opening-statement PDF attributes direct target-language use to Jay Obernolte.',
    sources: [
      {
        label: 'Opening statement PDF',
        locationLabel: 'p. 1, Obernolte on bioweapons safeguards in Chinese AI',
        page: 1,
        searchText: 'least effective at blocking information about bioweapons',
        url: 'https://www.congress.gov/119/meeting/house/118111/documents/HMTG-119-SY15-MState-O000019-20250408.pdf',
      },
    ],
  },
  {
    id: 'smith-house-speech-pdf',
    tier: 'direct self-use',
    personIds: ['house-christopher-smith-new-jersey-4th'],
    evidenceLabel: 'Speech PDF',
    exactMatches: ['bioweapons'],
    story:
      'An official office-hosted speech PDF attributes direct target-language use to Christopher Smith.',
    sources: [
      {
        label: 'Office-hosted speech PDF',
        locationLabel: 'page 1, Smith speech on bioweaponization of ticks',
        page: 1,
        searchText: 'bioweapons',
        url: 'https://chrissmith.house.gov/uploadedfiles/2019-07-11_final_ndaa_lyme_ig_amendment_speech.pdf',
      },
    ],
  },
  {
    id: 'gabbard-dni-biosecurity-pages',
    tier: 'official contextual mention',
    personIds: ['executive-tulsi-gabbard-office-of-the-director-of-national-intelligence'],
    evidenceLabel: 'ODNI source bundle',
    exactMatches: ['biosecurity', 'biological threats'],
    story:
      'Multiple current official DNI and ODNI pages use the target language in the institutional context around Tulsi Gabbard rather than as a direct self-use entry.',
    sources: [
      {
        label: 'DNI leadership page',
        url: 'https://www.dni.gov/index.php/who-we-are/leadership/director-of-national-intelligence',
      },
      {
        label: 'National Counterproliferation and Biosecurity Center page',
        url: 'https://www.dni.gov/index.php/who-we-are/organizations/205-about/organization/national-counterproliferation-and-biosecurity-center',
      },
      {
        label: 'ODNI 2.0 fact sheet PDF',
        url: 'https://www.dni.gov/files/ODNI/documents/ODNI-20-Fact-Sheet.pdf',
      },
      {
        label: 'ODNI organization chart PDF',
        url: 'https://www.dni.gov/files/ODNI/documents/ODNI-Org-Chart-2025-05-27.pdf',
      },
    ],
  },
  {
    id: 'rfk-congressional-record-context',
    tier: 'official contextual mention',
    personIds: ['executive-robert-f-kennedy-jr'],
    evidenceLabel: 'Context source bundle',
    exactMatches: ['bioweapon', 'bioweapons', 'bioterrorism', 'biodefense'],
    story:
      'Official Congressional Record passages and multiple current DHS media pages tie the target language to Robert F. Kennedy Jr. without making it a direct primary self-use document in this pass.',
    sources: [
      {
        label: 'Congressional Record Senate PDF',
        url: 'https://www.congress.gov/119/crec/2025/02/12/171/29/CREC-2025-02-12-senate.pdf',
      },
      {
        label: 'DHS media page (021)',
        url: 'https://www.dhs.gov/medialibrary/assets/photo/61387',
      },
      {
        label: 'DHS media page (022)',
        url: 'https://www.dhs.gov/medialibrary/assets/photo/61388',
      },
    ],
  },
  {
    id: 'rollins-usda-biosecurity-release',
    tier: 'official contextual mention',
    personIds: ['executive-brooke-rollins'],
    evidenceLabel: 'USDA source bundle',
    exactMatches: ['biosecurity'],
    story:
      'Multiple current USDA releases tied to Brooke Rollins use the target language in official office context rather than as a direct self-use entry.',
    sources: [
      {
        label: 'USDA avian-flu response release',
        url: 'https://www.usda.gov/about-usda/news/press-releases/2025/02/26/usda-invests-1-billion-combat-avian-flu-and-reduce-egg-prices',
      },
      {
        label: 'USDA Texas roundtable release',
        url: 'https://www.usda.gov/about-usda/news/press-releases/2025/02/24/secretary-rollins-tours-egg-laying-facility-hosts-avian-flu-roundtable-texas',
      },
      {
        label: 'USDA bird-flu strategy update',
        url: 'https://www.usda.gov/about-usda/news/press-releases/2025/06/26/secretary-rollins-provides-update-bird-flu-strategy-egg-prices-continue-fall',
      },
    ],
  },
  {
    id: 'noem-dhs-biodefense-page',
    tier: 'official contextual mention',
    personIds: ['executive-kristi-noem'],
    evidenceLabel: 'DHS source bundle',
    exactMatches: ['biodefense'],
    story:
      'Multiple current DHS media pages tied to Kristi Noem use the target language in official office context rather than as a direct self-use entry.',
    sources: [
      {
        label: 'DHS media page (021)',
        url: 'https://www.dhs.gov/medialibrary/assets/photo/61387',
      },
      {
        label: 'DHS media page (022)',
        url: 'https://www.dhs.gov/medialibrary/assets/photo/61388',
      },
    ],
  },
  {
    id: 'zeldin-epa-bioterrorism-release',
    tier: 'official contextual mention',
    personIds: ['executive-lee-zeldin-environmental-protection-agency'],
    evidenceLabel: 'EPA release',
    exactMatches: ['bioterrorism'],
    story:
      'An EPA release tied to Lee Zeldin uses the target language in official office context rather than as a direct self-use entry.',
    sources: [
      {
        label: 'EPA disaster-incinerator release',
        url: 'https://www.epa.gov/newsreleases/epa-cuts-red-tape-commercial-industrial-incinerators-after-natural-disasters',
      },
    ],
  },
  {
    id: 'hegseth-usda-biosecurity-pages',
    tier: 'official contextual mention',
    personIds: ['executive-pete-hegseth'],
    evidenceLabel: 'USDA source bundle',
    exactMatches: ['biosecurity', 'biodefense'],
    story:
      'Official USDA pages explicitly naming Pete Hegseth use the target language in broader national-security and agriculture-security context rather than as a direct self-use entry.',
    sources: [
      {
        label: 'USDA farm-security action release',
        url: 'https://www.usda.gov/about-usda/news/press-releases/2025/07/08/farm-security-national-security-trump-administration-takes-bold-action-elevate-american-agriculture',
      },
      {
        label: 'USDA support roundup',
        url: 'https://www.usda.gov/about-usda/news/press-releases/2025/07/10/what-they-are-saying-strong-support-secretary-rollins-national-security-action-plan',
      },
    ],
  },
  {
    id: 'lutnick-addressed-biosecurity-letters',
    tier: 'official contextual mention',
    personIds: ['executive-howard-lutnick'],
    evidenceLabel: 'Addressed-document bundle',
    exactMatches: ['bioweapon', 'biosecurity'],
    story:
      'Documents explicitly addressed to Howard Lutnick as Secretary of Commerce use the target language, but this pass does not treat that as Lutnick direct self-use.',
    sources: [
      {
        label: 'Senators letter to Secretary Lutnick',
        url: 'https://www.young.senate.gov/wp-content/uploads/8.1.25-Letter-to-Secretary-Lutnick-on-Deepseek-Opensource-model-Final1-1.pdf',
      },
      {
        label: 'IDSA letter to Secretary Lutnick',
        url: 'https://www.idsociety.org/globalassets/idsa/policy--advocacy/current_topics_and_issues/antimicrobial_resistance/strengthening_us_efforts/letters-manually-added/dept-commerce-sect-232-idsa.pdf',
      },
    ],
  },
  {
    id: 'vance-gain-of-function-cosponsorship-record',
    tier: 'signed or office-owned document',
    personIds: ['executive-jd-vance'],
    evidenceLabel: 'Cosponsorship record bundle',
    exactMatches: ['gain-of-function', 'biosecurity'],
    story:
      "Official Senate records tie J.D. Vance to target-language usage through a cosponsorship notice and the underlying resolution text, but this pass does not treat that as Vance's own direct spoken self-use.",
    sources: [
      {
        label: 'Congressional Record, June 11, 2024',
        url: 'https://www.govinfo.gov/content/pkg/CREC-2024-06-11/pdf/CREC-2024-06-11-senate.pdf',
      },
      {
        label: 'S. Res. 718 PDF',
        url: 'https://www.govinfo.gov/link/bills/118/sres/718?link-type=pdf',
      },
    ],
  },
  {
    id: 'bondi-addressed-gain-of-function-letter',
    tier: 'official contextual mention',
    personIds: ['executive-pam-bondi'],
    evidenceLabel: 'Addressed letter',
    exactMatches: ['gain-of-function'],
    story:
      'An official Senate committee letter addressed to Pam Bondi as Attorney General uses the target language in DOJ-directed context, but this pass does not treat that as Bondi direct self-use.',
    sources: [
      {
        label: 'HSGAC letter to Attorney General Bondi',
        url: 'https://www.hsgac.senate.gov/wp-content/uploads/2025.07.14_Letter-from-Chairman-Paul-to-DOJ___.pdf',
      },
    ],
  },
  {
    id: 'scharf-white-house-gain-of-function-remarks',
    tier: 'direct self-use',
    personIds: ['executive-will-scharf-national-capital-planning-commission'],
    evidenceLabel: 'White House government-record transcript',
    exactMatches: ['gain-of-function'],
    story:
      "An official White House government-record transcript attributes direct target-language use to Will Scharf in spoken remarks, making this a clean direct self-use hit rather than mere page context.",
    sources: [
      {
        label: 'govinfo transcript of White House remarks, May 5, 2025',
        url: 'https://www.govinfo.gov/content/pkg/DCPD-202500556/pdf/DCPD-202500556.pdf',
      },
      {
        label: 'NCPC July 10, 2025 transcript PDF',
        url: 'https://www.ncpc.gov/docs/open_gov_files/transcripts/2025/2025_07_10_NCPC.pdf',
      },
    ],
  },
  {
    id: 'cotton-klobuchar-release-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-tom-cotton'],
    evidenceLabel: 'Office release page',
    exactMatches: ['bioweapons'],
    story:
      "Cotton's official release page contains the target language, but this pass does not treat it as Cotton's own direct self-use.",
    sources: [
      {
        label: 'Cotton-Klobuchar biotech security release',
        locationLabel: 'release section quoting misuse of genetic material to create bioweapons',
        textFragment: 'including to create bioweapons',
        url: 'https://www.cotton.senate.gov/news/press-releases/cotton-klobuchar-introduce-bill-to-establish-federal-biotech-security-framework',
      },
    ],
  },
  {
    id: 'coons-innovation-issue-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-christopher-a-coons'],
    evidenceLabel: 'Issue page',
    exactMatches: ['bioweapons'],
    story:
      "Coons's official innovation page uses the target language in office-owned background material rather than as a direct self-use entry.",
    sources: [
      {
        label: 'Coons innovation issue page',
        locationLabel: 'innovation page section using "bioweapons"',
        textFragment: 'bioweapons',
        url: 'https://www.coons.senate.gov/issues/innovation/',
      },
    ],
  },
  {
    id: 'durbin-fauci-award-remarks',
    tier: 'direct self-use',
    personIds: ['senate-richard-j-durbin'],
    evidenceLabel: 'Prepared remarks release',
    exactMatches: ['bioterrorism'],
    story:
      'Durbin\'s official press release reproduces his prepared remarks and directly attributes the target-language use to him, making this a direct self-use hit.',
    sources: [
      {
        label: 'Durbin remarks honoring Dr. Fauci',
        locationLabel: 'Durbin prepared remarks on anthrax and bioterrorism scares',
        textFragment: 'post-9/11 anthrax and bioterrorism scares',
        url: 'https://www.durbin.senate.gov/newsroom/press-releases/durbin-delivers-remarks-honoring-dr-fauci-as-he-receives-the-senator-paul-h-douglas-award-for-ethics-in-government',
      },
    ],
  },
  {
    id: 'risch-committee-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-james-e-risch'],
    evidenceLabel: 'Committee release',
    exactMatches: ['biological weapons'],
    story:
      'An official committee release tied to James Risch uses the target language in the release text rather than as a direct self-use entry.',
    sources: [
      {
        label: 'Foreign Relations Committee release',
        locationLabel: 'headline on curbing biological weapons development',
        textFragment: 'biological weapons development',
        url: 'https://www.foreign.senate.gov/press/rep/release/risch-introduces-legislation-to-curb-biological-weapons-development',
      },
    ],
  },
  {
    id: 'gillibrand-biodefense-release',
    tier: 'direct self-use',
    personIds: ['senate-kirsten-e-gillibrand'],
    evidenceLabel: 'Official release bundle',
    exactMatches: [
      'bioweapons',
      'biodefense',
      'bioterrorism',
      'biosecurity',
      'biological threats',
      'biothreats',
    ],
    story:
      'Multiple official Gillibrand releases attribute direct target-language use to her in quoted remarks and biosecurity policy material.',
    sources: [
      {
        label: 'Gillibrand biodefense release',
        locationLabel: 'Gillibrand release on Senate passage of the biodefense bill',
        textFragment: 'bipartisan biodefense bill',
        url: 'https://www.gillibrand.senate.gov/news/press/release/gillibrand-announces-senate-passage-of-biodefense-bill-to-strengthen-us-response-to-disease-outbreaks-bioterrorism/',
      },
      {
        label: 'Gillibrand biosecurity strategy release',
        locationLabel: 'headline on strategy to strengthen biosecurity',
        textFragment: 'strengthen biosecurity',
        url: 'https://www.gillibrand.senate.gov/news/press/release/new-report-gives-us-failing-grade-on-preparedness-on-tenth-anniversary-of-anthrax-attacks-gillibrand-announces-strategy-to-strengthen-biosecurity/',
      },
    ],
  },
  {
    id: 'markey-ai-public-health-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-edward-j-markey'],
    evidenceLabel: 'Office release',
    exactMatches: ['bioweapons'],
    story:
      'An official Markey release uses the target language in office background text for an AI public-health threats bill.',
    sources: [
      {
        label: 'Markey-Budd release',
        locationLabel: 'headline on AI public health threats',
        textFragment: 'AI public health threats',
        url: 'https://www.markey.senate.gov/news/press-releases/markey-budd-introduce-bipartisan-bill-to-prepare-for-ai-public-health-threats',
      },
    ],
  },
  {
    id: 'budd-ai-public-health-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-ted-budd'],
    evidenceLabel: 'Office release',
    exactMatches: ['bioweapons'],
    story:
      'The same official Markey-Budd release uses the target language in material tied to Ted Budd without making it a direct self-use entry.',
    sources: [
      {
        label: 'Markey-Budd release',
        locationLabel: 'headline on AI public health threats',
        textFragment: 'AI public health threats',
        url: 'https://www.markey.senate.gov/news/press-releases/markey-budd-introduce-bipartisan-bill-to-prepare-for-ai-public-health-threats',
      },
    ],
  },
  {
    id: 'hagerty-genetic-data-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-bill-hagerty'],
    evidenceLabel: 'Office release',
    exactMatches: ['bioweapon'],
    story:
      "Hagerty's official release contains the target language in quoted or background text on the page rather than as a direct self-use entry.",
    sources: [
      {
        label: 'Hagerty-Peters release',
        locationLabel: 'release section using "bioweapon"',
        textFragment: 'bioweapon',
        url: 'https://www.hagerty.senate.gov/press-releases/2024/03/06/hagerty-peters-applaud-committee-approval-of-bipartisan-legislation-to-protect-american-genetic-data-from-china-controlled-companies/',
      },
    ],
  },
  {
    id: 'grassley-covid-origins-remarks',
    tier: 'direct self-use',
    personIds: ['senate-chuck-grassley'],
    evidenceLabel: 'Prepared remarks page',
    exactMatches: ['gain-of-function'],
    story:
      "Grassley's official remarks page directly attributes target-language use to him in floor remarks about COVID origins and oversight of grants sent to China.",
    sources: [
      {
        label: "Grassley on COVID's origins and oversight of grants sent to China",
        url: 'https://www.grassley.senate.gov/news/remarks/grassley-on-covids-origins-and-oversight-of-grants-sent-to-china',
      },
    ],
  },
  {
    id: 'hawley-nih-censorship-hearing-release',
    tier: 'direct self-use',
    personIds: ['senate-josh-hawley'],
    evidenceLabel: 'Official release',
    exactMatches: ['gain-of-function'],
    story:
      "Hawley's official release directly attributes target-language use to him in questioning about NIH censorship and COVID-era gain-of-function research.",
    sources: [
      {
        label: 'Hawley rebukes former NIH chief over COVID censorship',
        locationLabel: 'Hawley question on NIH funding of gain-of-function research',
        textFragment: 'NIH’s role in funding gain-of-function research at the lab',
        url: 'https://www.hawley.senate.gov/what-world-are-you-living-in-hawley-rebukes-former-nih-chief-for-claiming-zero-censorship-took-place-during-covid-peak/',
      },
    ],
  },
  {
    id: 'hirono-forest-service-biosecurity-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-mazie-k-hirono'],
    evidenceLabel: 'Official office page',
    exactMatches: ['biosecurity'],
    story:
      "Hirono's official Senate page uses the target language in office-authored hearing coverage about support for Hawaii's biosecurity plan.",
    sources: [
      {
        label: 'Hirono secures commitments from Forest Service chief',
        locationLabel: "hearing coverage section on Hawaii's biosecurity plan",
        textFragment: 'biosecurity',
        url: 'https://www.hirono.senate.gov/news/press-releases/hirono-secures-commitments-from-forest-service-chief-on-vital-hawaii-priorities-during-energy-committee-hearing_',
      },
    ],
  },
  {
    id: 'lee-hosted-google-pdf',
    tier: 'signed or office-owned document',
    personIds: ['senate-mike-lee'],
    evidenceLabel: 'Hosted PDF',
    exactMatches: ['bioweapon', 'gain-of-function'],
    story:
      "Lee's official site hosts documents with the target language, but this pass does not treat them as direct self-use entries.",
    sources: [
      {
        label: 'Hosted Google response PDF',
        locationLabel: 'hosted PDF section using "bioweapon"',
        searchText: 'bioweapon',
        url: 'https://www.lee.senate.gov/_cache/files/d17836e7-7aaa-43e1-97d7-e2f1d6956d9a/google.pdf',
      },
      {
        label: 'Lee letter on GOF, WIV, and lab leak',
        locationLabel: 'letter section on gain-of-function research',
        searchText: 'gain-of-function',
        url: 'https://www.lee.senate.gov/services/files/C8F3A56B-6127-4EE7-A3EA-F470ED511BFB',
      },
    ],
  },
  {
    id: 'kennedy-gain-of-function-pages',
    tier: 'direct self-use',
    personIds: ['senate-john-kennedy'],
    evidenceLabel: 'Official release bundle',
    exactMatches: ['gain-of-function'],
    story:
      "Kennedy's official Senate pages reproduce his own remarks and questioning with exact target-language use on gain-of-function research in Wuhan.",
    sources: [
      {
        label: 'Kennedy welcomes debarment over Wuhan gain-of-function research',
        locationLabel: 'headline on Wuhan gain-of-function research',
        textFragment: 'gain-of-function research in Wuhan',
        url: 'https://www.kennedy.senate.gov/public/2025/3/kennedy-welcomes-debarment-of-doctor-who-facilitated-gain-of-function-research-in-wuhan-we-now-have-justice',
      },
      {
        label: 'Kennedy asks Fauci whether Wuhan lab lied',
        locationLabel: 'headline and exchange on gain-of-function research in Wuhan',
        textFragment: 'gain-of-function research in Wuhan',
        url: 'https://www.kennedy.senate.gov/public/2021/5/kennedy-asks-fauci-whether-wuhan-lab-lied-you-never-know',
      },
    ],
  },
  {
    id: 'king-ai-risks-framework-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-angus-s-jr-king'],
    evidenceLabel: 'Official release',
    exactMatches: ['bioweapons'],
    story:
      "King's official Senate release and attached AI-risk framework use the target language in office-owned material discussing catastrophic misuse risks.",
    sources: [
      {
        label: 'King AI risks framework release',
        locationLabel: 'framework release section on catastrophic misuse including bioweapons',
        textFragment: 'bioweapons',
        url: 'https://www.king.senate.gov/newsroom/press-releases/king-colleagues-unveil-bipartisan-framework-to-identify-minimize-artificial-intelligence-risks',
      },
    ],
  },
  {
    id: 'lankford-gain-of-function-moratorium-release',
    tier: 'direct self-use',
    personIds: ['senate-james-lankford'],
    evidenceLabel: 'Official release',
    exactMatches: ['gain-of-function'],
    story:
      "Lankford's official Senate release attributes direct target-language use to him in remarks about federally funded risky gain-of-function projects.",
    sources: [
      {
        label: 'Lankford renews effort to place moratorium on risky gain-of-function projects',
        locationLabel: 'headline on risky gain-of-function projects',
        textFragment: 'gain-of-function projects',
        url: 'https://www.lankford.senate.gov/news/press-releases/lankford-marshall-colleagues-renew-effort-to-place-moratorium-on-federally-funded-risky-gain-of-function-projects/',
      },
    ],
  },
  {
    id: 'merkley-monkeypox-biosecurity-letter-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-jeff-merkley'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Merkley's official Senate release quotes joint-letter text using the target language as part of a federal biosecurity program, so this pass treats it as office-owned material rather than a cleaner direct-self-use page.",
    sources: [
      {
        label: 'Merkley leads colleagues on monkeypox vaccine-access inequities',
        locationLabel: 'release section on the federal biosecurity program',
        textFragment: 'biosecurity',
        url: 'https://www.merkley.senate.gov/merkley-leads-colleagues-sounding-alarm-on-monkeypox-outbreak-highlighting-inequities-of-vaccine-access/',
      },
    ],
  },
  {
    id: 'murray-bioterrorism-research-center-page',
    tier: 'direct self-use',
    personIds: ['senate-patty-murray'],
    evidenceLabel: 'Official release',
    exactMatches: ['bioterrorism'],
    story:
      "Murray's official Senate page includes her own attributed language about strengthening the nation's ability to fight bioterrorism.",
    sources: [
      {
        label: "University of Washington to lead regional center for America's bioterrorism research",
        url: 'https://www.murray.senate.gov/university-of-washington-to-lead-regional-center-for-americas-bioterrorism-research/',
      },
    ],
  },
  {
    id: 'ricketts-shutdown-package-biosecurity-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-pete-ricketts'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Ricketts's official Senate release uses the target language in office-authored summary text describing biosecurity measures in the shutdown package.",
    sources: [
      {
        label: 'Ricketts highlights Nebraska wins in bipartisan solution ending government shutdown',
        locationLabel: 'release section on biosecurity measures',
        textFragment: 'biosecurity',
        url: 'https://www.ricketts.senate.gov/news/press-releases/ricketts-highlights-nebraska-wins-in-bipartisan-solution-ending-government-shutdown/',
      },
    ],
  },
  {
    id: 'murkowski-genetic-engineering-video-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-lisa-murkowski'],
    evidenceLabel: 'Official video page',
    exactMatches: ['genetic engineering'],
    story:
      "Murkowski's official Senate video page uses the target language in office-owned material describing her HELP Committee remarks on genetic engineering.",
    sources: [
      {
        label: 'Murkowski speaks on genetical engineered animal species',
        locationLabel: 'video page title on genetically engineered animal species',
        textFragment: 'genetical engineered animal species',
        url: 'https://www.murkowski.senate.gov/press/videos/watch/senator-murkowski-speaks-on-genetical-engineered-animal-species',
      },
    ],
  },
  {
    id: 'moran-nbaf-biosecurity-facility-release',
    tier: 'direct self-use',
    personIds: ['senate-jerry-moran'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Moran's official Senate release reproduces his own quoted language using the target phrase to describe NBAF as a premier biosecurity facility.",
    sources: [
      {
        label: 'Moran urges USDA to exempt NBAF from hiring freeze',
        locationLabel: 'release quote calling NBAF a premier biosecurity facility',
        textFragment: 'biosecurity facility',
        url: 'https://www.moran.senate.gov/public/index.cfm/2025/11/sen-moran-urges-usda-secretary-rollins-to-exempt-nbaf-from-federal-hiring-freeze',
      },
    ],
  },
  {
    id: 'paul-gain-of-function-pages',
    tier: 'direct self-use',
    personIds: ['senate-rand-paul'],
    evidenceLabel: 'Official release bundle',
    exactMatches: ['gain-of-function'],
    story:
      "Paul's official Senate pages directly attribute target-language use to him in legislation and oversight pushes against gain-of-function research.",
    sources: [
      {
        label: 'Paul reintroduces Risky Research Review Act',
        locationLabel: 'headline on oversight of gain-of-function research',
        textFragment: 'gain-of-function research',
        url: 'https://www.paul.senate.gov/dr-rand-paul-reintroduces-bipartisan-risky-research-review-act-to-oversee-gain-of-function-research/',
      },
      {
        label: 'Paul stops gain-of-function research funding in China',
        locationLabel: 'headline on stopping gain-of-function funding in China',
        textFragment: 'gain-of-function',
        url: 'https://www.paul.senate.gov/dr-rand-paul-stops-gain-function-research-funding-china/',
      },
    ],
  },
  {
    id: 'mccaul-covid-origins-report',
    tier: 'signed or office-owned document',
    personIds: ['house-michael-mccaul-texas-10th'],
    evidenceLabel: 'Hosted report',
    exactMatches: ['bioweapons'],
    story:
      'An official House report tied to Michael McCaul uses the target language in hosted material rather than as a direct self-use entry.',
    sources: [
      {
        label: 'House Foreign Affairs report PDF',
        locationLabel: 'report PDF section using "bioweapons"',
        searchText: 'bioweapons',
        url: 'https://foreignaffairs.house.gov/sites/evo-subsites/republicans-foreignaffairs.house.gov/files/migrated/uploads/2021/08/ORIGINS-OF-COVID-19-REPORT.pdf',
      },
    ],
  },
  {
    id: 'gooden-stop-covid-act-release',
    tier: 'signed or office-owned document',
    personIds: ['house-lance-gooden-texas-5th'],
    evidenceLabel: 'Office page',
    exactMatches: ['bioweapon'],
    story:
      "Gooden's official office page contains the target language, but this pass does not treat it as a direct self-use entry.",
    sources: [
      {
        label: 'Gooden STOP COVID Act release',
        locationLabel: 'release section using "bioweapon"',
        textFragment: 'bioweapon',
        url: 'https://gooden.house.gov/2020/4/gooden-introduces-stop-covid-act-hold-china-accountable-coronavirus-pandemic',
      },
    ],
  },
  {
    id: 'roy-fauci-emails-gain-of-function-letter',
    tier: 'signed or office-owned document',
    personIds: ['house-chip-roy-texas-21st'],
    evidenceLabel: 'Official release / letter',
    exactMatches: ['gain-of-function'],
    story:
      "Roy's official House press release reproduces a letter signed by him that uses the target language in demands for answers about Fauci emails and Wuhan-related gain-of-function research.",
    sources: [
      {
        label: 'Roy demands answers on Fauci emails',
        locationLabel: 'release section on gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://roy.house.gov/media/press-releases/rep-roy-doubles-down-and-demands-answers-fauci-emails',
      },
    ],
  },
  {
    id: 'crenshaw-bio-early-warning-act-release',
    tier: 'signed or office-owned document',
    personIds: ['house-dan-crenshaw-texas-2nd'],
    evidenceLabel: 'Official office page',
    exactMatches: ['biosecurity'],
    story:
      "Crenshaw's official House page for the BIO Early Warning Act uses the target language in office-authored legislative release material.",
    sources: [
      {
        label: 'Crenshaw-Peters BIO Early Warning Act release',
        locationLabel: 'headline on the BIO Early Warning Act',
        textFragment: 'BIO Early Warning Act',
        url: 'https://crenshaw.house.gov/2023/6/crenshaw-peters-release-discussion-draft-of-the-bipartisan-bio-early-warning-act',
      },
    ],
  },
  {
    id: 'jackson-fauci-hearing-gain-of-function',
    tier: 'direct self-use',
    personIds: ['house-ronny-jackson-texas-13th'],
    evidenceLabel: 'Official hearing remarks page',
    exactMatches: ['gain-of-function'],
    story:
      "Jackson's official House page reproduces his own hearing remarks and directly attributes target-language use to him in questioning about Fauci, Wuhan, and gain-of-function research.",
    sources: [
      {
        label: 'Rep. Jackson delivers remarks during Fauci hearing',
        locationLabel: 'hearing remarks section on gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://jackson.house.gov/news/documentsingle.aspx?DocumentID=1091',
      },
    ],
  },
  {
    id: 'nehls-hosted-rogan-transcript-biodefense',
    tier: 'signed or office-owned document',
    personIds: ['house-troy-nehls-texas-22nd'],
    evidenceLabel: 'Hosted transcript PDF',
    exactMatches: ['biodefense'],
    story:
      "Nehls's official House site hosts a transcript PDF containing the target language, but this pass does not treat the matched biodefense wording as Nehls's own direct self-use.",
    sources: [
      {
        label: 'Nehls-hosted Rogan-Malone transcript PDF',
        locationLabel: 'hosted transcript section using "biodefense"',
        searchText: 'biodefense',
        url: 'https://nehls.house.gov/sites/evo-subsites/nehls.house.gov/files/2022-01/JRE-Rogan-Malone-Transcript.pdf',
      },
    ],
  },
  {
    id: 'mace-ndaa-gain-of-function-release',
    tier: 'signed or office-owned document',
    personIds: ['house-nancy-mace-south-carolina-1st'],
    evidenceLabel: 'Official release',
    exactMatches: ['gain-of-function'],
    story:
      "Mace's official House release on NDAA markup uses the target language in office-authored legislative material describing her adopted amendment to ban gain-of-function pathogen research.",
    sources: [
      {
        label: 'Mace NDAA markup release',
        locationLabel: 'release section on banning gain-of-function pathogen research',
        textFragment: 'gain-of-function pathogen research',
        url: 'https://mace.house.gov/media/press-releases/rep-nancy-mace-secures-26-major-legislative-wins-fy26-ndaa-markup-house-armed',
      },
    ],
  },
  {
    id: 'auchincloss-select-committee-release',
    tier: 'signed or office-owned document',
    personIds: ['house-jake-auchincloss-massachusetts-4th'],
    evidenceLabel: 'Office page',
    exactMatches: ['bioweapon'],
    story:
      "Auchincloss's official office page contains the target language in quoted or background text rather than as a direct self-use entry.",
    sources: [
      {
        label: 'Auchincloss biotech release',
        locationLabel: 'release section using "bioweapon"',
        textFragment: 'bioweapon',
        url: 'https://auchincloss.house.gov/media/press-releases/release-auchincloss-joins-bipartisan-group-of-select-committee-members-in-introducing-house-and-senate-bills-to-ban-foreign-adversary-biotech-companies-including-bgi-group',
      },
    ],
  },
  {
    id: 'mcclain-delaney-biodefense-release',
    tier: 'signed or office-owned document',
    personIds: ['house-april-mcclain-delaney-maryland-6th'],
    evidenceLabel: 'Official release',
    exactMatches: ['biodefense'],
    story:
      "McClain Delaney's official House release uses the target language in office-authored material about a Maryland delegation push on Fort Detrick readiness, biodefense, and pandemic preparedness.",
    sources: [
      {
        label: 'McClain Delaney Fort Detrick release',
        locationLabel: 'headline on protecting U.S. biodefense and pandemic preparedness',
        textFragment: 'Protecting U.S. Biodefense and Pandemic Preparedness',
        url: 'https://mcclaindelaney.house.gov/media/press-releases/protecting-us-biodefense-and-pandemic-preparedness-rep-mcclain-delaney',
      },
    ],
  },
  {
    id: 'lynch-inspectors-general-biodefense-release',
    tier: 'direct self-use',
    personIds: ['house-stephen-lynch-massachusetts-8th'],
    evidenceLabel: 'Official release',
    exactMatches: ['biodefense'],
    story:
      "Lynch's official House release directly attributes target-language use to him in quoted remarks about inspectors general and lapses in national biodefense.",
    sources: [
      {
        label: 'Lynch inspectors general release',
        locationLabel: 'release section on lapses in national biodefense',
        textFragment: 'biodefense',
        url: 'https://lynch.house.gov/2021/4/reps-lynch-maloney-hoyer-connolly-gomez-porter-and-lieu-introduce-comprehensive-inspectors-general-legislation-to-increase-transparency-independence',
      },
    ],
  },
  {
    id: 'hoyer-shutdown-remarks-biodefense-page',
    tier: 'direct self-use',
    personIds: ['house-steny-hoyer-maryland-5th'],
    evidenceLabel: 'Official remarks page',
    exactMatches: ['biodefense'],
    story:
      "Hoyer's official House remarks page attributes target-language use to him in posted shutdown remarks where he reads aloud a headline about biodefense preparedness staff.",
    sources: [
      {
        label: 'Hoyer shutdown remarks page',
        locationLabel: 'remarks section reading a biodefense headline aloud',
        textFragment: 'biodefense',
        url: 'https://hoyer.house.gov/media/press-releases/hoyer-every-authoritarian-leader-has-had-his-grim-reaper-russell-vought-donald',
      },
    ],
  },
  {
    id: 'barr-china-floor-speech-and-wuhan-release',
    tier: 'direct self-use',
    personIds: ['house-andy-barr-kentucky-6th'],
    evidenceLabel: 'Official House page bundle',
    exactMatches: ['biosecurity', 'gain-of-function'],
    story:
      "Barr's official House pages use the target language in two ways: a transcribed Barr floor speech directly attributes `biosecurity` wording to him, and a separate Barr release uses `gain-of-function` in office-authored COVID-origin material.",
    sources: [
      {
        label: 'Barr China select committee release',
        locationLabel: 'floor speech text using "biosecurity"',
        textFragment: 'biosecurity',
        url: 'https://barr.house.gov/press-releases?ContentRecord_id=83EA1EA5-4D58-4F31-A678-19DD5CB92520',
      },
      {
        label: 'Barr Wuhan lab release',
        locationLabel: 'release section on banning gain-of-function research',
        textFragment: 'gain-of-function research',
        url: 'https://barr.house.gov/2021/8/rep-barr-covid-19-likely-leaked-from-wuhan-virology-lab-time-to-ban-gain-of-function-research',
      },
    ],
  },
  {
    id: 'mike-johnson-dhs-shutdown-bioterrorism-remarks',
    tier: 'direct self-use',
    personIds: ['house-mike-johnson-louisiana-4th'],
    evidenceLabel: 'Official remarks page',
    exactMatches: ['bioterrorism'],
    story:
      "Johnson's official House remarks page directly attributes target-language use to him in posted remarks about the DHS shutdown, anti-bioterrorism matters, and other homeland-security issues.",
    sources: [
      {
        label: 'Johnson DHS shutdown remarks page',
        locationLabel: 'remarks section on anti-bioterrorism matters',
        textFragment: 'bioterrorism',
        url: 'https://mikejohnson.house.gov/news/documentsingle.aspx?DocumentID=2863',
      },
    ],
  },
  {
    id: 'lahood-covid-origins-bioweapons-statement',
    tier: 'direct self-use',
    personIds: ['house-darin-lahood-illinois-16th'],
    evidenceLabel: 'Official statement page',
    exactMatches: ['bioweapons'],
    story:
      "LaHood's official House statement page directly attributes target-language use to him in quoted remarks about COVID-19 origins, lab-leak evidence, and potential ties to China's bioweapons research program.",
    sources: [
      {
        label: 'LaHood COVID-origins statement',
        locationLabel: "statement section on China's bioweapons research program",
        textFragment: 'bioweapons research program',
        url: 'https://lahood.house.gov/2022/12/lahood-statement-on-intel-gop-report-on-covid-19-origins',
      },
    ],
  },
  {
    id: 'messmer-dod-usda-biosecurity-release',
    tier: 'signed or office-owned document',
    personIds: ['house-mark-messmer-indiana-8th'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Messmer's official House release uses the target language in office-authored legislative material describing his DOD and USDA Interagency Research Act and its focus on biosecurity innovation.",
    sources: [
      {
        label: 'Messmer agricultural and national security release',
        locationLabel: 'release section on biosecurity innovation',
        textFragment: 'biosecurity innovation',
        url: 'https://messmer.house.gov/news/documentsingle.aspx?DocumentID=206',
      },
    ],
  },
  {
    id: 'adam-smith-extension-of-remarks-bioterrorism',
    tier: 'direct self-use',
    personIds: ['house-adam-smith-washington-9th'],
    evidenceLabel: 'Congressional Record',
    exactMatches: ['bioterrorism'],
    story:
      'An official Congressional Record entry attributes direct target-language use to Adam Smith in extension-of-remarks text honoring Washington public-health official Mary Selecky.',
    sources: [
      {
        label: 'GovInfo Congressional Record, Apr. 12, 2013',
        locationLabel: 'GovInfo wrapper for extension-of-remarks text using "bioterrorism"',
        textFragment: 'bioterrorism',
        url: 'https://www.govinfo.gov/app/details/CREC-2013-04-12/CREC-2013-04-12-pt1-PgE447',
      },
    ],
  },
  {
    id: 'kim-schrier-member-day-testimony-bioterrorism',
    tier: 'direct self-use',
    personIds: ['house-kim-schrier-washington-8th'],
    evidenceLabel: 'Hearing testimony',
    exactMatches: ['bioterrorism'],
    story:
      'Official House committee hearing text attributes direct target-language use to Kim Schrier in member-day testimony on public-health emergency preparedness.',
    sources: [
      {
        label: 'Congress.gov hearing text, May 11, 2022',
        locationLabel: 'Schrier testimony on PHEP grants and bioterrorism preparedness',
        textFragment: 'including bioterrorism, natural disasters, and infectious disease outbreaks',
        url: 'https://www.congress.gov/event/117th-congress/house-event/114802/text',
      },
    ],
  },
  {
    id: 'dan-newhouse-dhs-appropriations-biodefense',
    tier: 'direct self-use',
    personIds: ['house-dan-newhouse-washington-4th'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['biodefense'],
    story:
      'An official House appropriations hearing transcript attributes direct target-language use to Dan Newhouse in questioning about DHS priorities and biodefense capabilities.',
    sources: [
      {
        label: 'GovInfo DHS appropriations hearing HTML',
        locationLabel: 'Newhouse on national-lab support for DHS biodefense and cybersecurity work',
        textFragment: 'areas like biodefense and cybersecurity, which you mentioned',
        url: 'https://www.govinfo.gov/content/pkg/CHRG-116hhrg43031/html/CHRG-116hhrg43031.htm',
      },
    ],
  },
  {
    id: 'glenn-grothman-fauci-retirement-gain-of-function',
    tier: 'direct self-use',
    personIds: ['house-glenn-grothman-wisconsin-6th'],
    evidenceLabel: 'Office statement',
    exactMatches: ['gain-of-function'],
    story:
      "An official Grothman office statement attributes direct target-language use to him in criticism of Anthony Fauci and NIH funding tied to Wuhan Lab gain-of-function research.",
    sources: [
      {
        label: 'Grothman statement on Fauci retirement',
        locationLabel: 'statement section on Wuhan Lab gain-of-function research',
        textFragment: 'gain-of-function research',
        url: 'https://grothman.house.gov/news/documentsingle.aspx?DocumentID=3107',
      },
    ],
  },
  {
    id: 'thomas-tiffany-wispolitics-gain-of-function-column',
    tier: 'direct self-use',
    personIds: ['house-thomas-tiffany-wisconsin-7th'],
    evidenceLabel: 'Opinion column',
    exactMatches: ['gain-of-function'],
    story:
      "A published opinion column presented as Thomas Tiffany's own bylined text attributes direct target-language use to him in discussion of Wuhan-related gain-of-function experiments.",
    sources: [
      {
        label: 'WisPolitics opinion column, Aug. 4, 2021',
        locationLabel: 'opinion column section on Wuhan-related gain-of-function experiments',
        textFragment: 'gain-of-function',
        url: 'https://www.wispolitics.com/2021/tom-tiffany-federal-health-officials-lack-of-transparency-leads-to-confusion-among-americans/',
      },
    ],
  },
  {
    id: 'wisconsin-delegation-uw-madison-biosafety-letter',
    tier: 'signed or office-owned document',
    personIds: [
      'house-bryan-steil-wisconsin-1st',
      'house-scott-fitzgerald-wisconsin-5th',
      'house-derrick-van-orden-wisconsin-3rd',
      'house-thomas-tiffany-wisconsin-7th',
      'house-glenn-grothman-wisconsin-6th',
    ],
    evidenceLabel: 'Signed delegation letter',
    exactMatches: ['gain-of-function'],
    story:
      'A published press-release letter text attributes signed Wisconsin House delegation support for requests tied to a UW-Madison biosafety incident and explicitly uses the target language in the letter body.',
    sources: [
      {
        label: 'WisPolitics press release, Apr. 25, 2023',
        locationLabel: 'press release letter text using "gain-of-function"',
        textFragment: 'gain-of-function',
        url: 'https://www.wispolitics.com/2023/wisconsin-congressional-republicans-demand-answers-on-biosafety-incident-at-uw-madison/?pdf=291516',
      },
    ],
  },
  {
    id: 'ben-cline-hhs-budget-hearing-gain-of-function',
    tier: 'direct self-use',
    personIds: ['house-ben-cline-virginia-6th'],
    evidenceLabel: 'Hearing transcript',
    exactMatches: ['gain-of-function'],
    story:
      'An official congressional hearing transcript attributes direct target-language use to Ben Cline in questioning about HHS and gain-of-function research.',
    sources: [
      {
        label: 'Congress.gov HHS FY2023 budget hearing text',
        locationLabel: 'Cline exchange on NIH funding and gain-of-function research',
        textFragment: 'gain-of-function research was occurring and it was known to NIH',
        url: 'https://www.congress.gov/event/117th-congress/house-event/114622/text',
      },
    ],
  },
  {
    id: 'morgan-griffith-gain-of-function-and-biodefense-pages',
    tier: 'direct self-use',
    personIds: ['house-h-griffith-virginia-9th'],
    evidenceLabel: 'Office page bundle',
    exactMatches: ['gain-of-function', 'biodefense'],
    story:
      "Official Morgan Griffith office pages attribute direct target-language use to him in both pandemic-risk remarks about gain-of-function research and formal remarks about biodefense capabilities.",
    sources: [
      {
        label: 'Griffith statement, Jan. 23, 2025',
        locationLabel: 'statement section on gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://morgangriffith.house.gov/news/documentsingle.aspx?DocumentID=404288',
      },
      {
        label: 'Griffith hearing remarks, Feb. 1, 2023',
        locationLabel: 'hearing remarks section on biodefense capabilities',
        textFragment: 'biodefense',
        url: 'https://morgangriffith.house.gov/news/documentsingle.aspx?DocumentID=402787',
      },
    ],
  },
  {
    id: 'virginia-delegation-biosecurity-letter-beyer-vindman-subramanyam',
    tier: 'signed or office-owned document',
    personIds: [
      'house-donald-beyer-virginia-8th',
      'house-eugene-vindman-virginia-7th',
      'house-jennifer-mcclellan-virginia-4th',
      'house-robert-scott-virginia-3rd',
      'house-suhas-subramanyam-virginia-10th',
    ],
    evidenceLabel: 'Delegation letter page',
    exactMatches: ['biosecurity'],
    story:
      'An official Beyer office page says Beyer and named Virginia colleagues wrote a letter whose quoted text explicitly says Virginia must prioritize biosecurity; the attached signed PDF supports attribution to the listed members.',
    sources: [
      {
        label: 'Beyer office page, Feb. 4, 2025',
        locationLabel: 'office page section saying Virginia must prioritize biosecurity',
        textFragment: 'biosecurity',
        url: 'https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6362',
      },
      {
        label: 'Signed Virginia delegation letter PDF',
        locationLabel: 'signed delegation letter section using "biosecurity"',
        searchText: 'biosecurity',
        url: 'https://beyer.house.gov/UploadedFiles/Congressional_Letter_-_Help_Virginia_Bird_Flu_Response_-_02-04-2025.pdf',
      },
    ],
  },
  {
    id: 'robert-wittman-fox-opinion-gain-of-function',
    tier: 'direct self-use',
    personIds: ['house-robert-wittman-virginia-1st'],
    evidenceLabel: 'Opinion column',
    exactMatches: ['gain-of-function'],
    story:
      "A bylined opinion piece authored under Robert Wittman's name attributes direct target-language use to him in discussion of COVID origins and gain-of-function research.",
    sources: [
      {
        label: 'Fox News opinion column, Sept. 15, 2021',
        locationLabel: 'opinion column section on COVID origins and gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://www.foxnews.com/opinion/world-truth-covid-origin-rep-wittman-rep-stefanik',
      },
    ],
  },
  {
    id: 'schiff-national-labs-biosecurity-release',
    tier: 'signed or office-owned document',
    personIds: ['senate-adam-b-schiff'],
    evidenceLabel: 'Official source bundle',
    exactMatches: ['biosecurity'],
    story:
      "Schiff's official Senate materials use the target language in office-owned text about national-lab missions, making this a clean office-owned exact-match hit.",
    sources: [
      {
        label: 'Schiff-Padilla-Lofgren national labs release',
        locationLabel: 'release section on the national-lab biosecurity mission',
        textFragment: 'biosecurity',
        url: 'https://www.schiff.senate.gov/news/press-releases/news-schiff-padilla-lofgren-demand-reversal-of-layoffs-budget-cuts-at-national-laboratories/',
      },
      {
        label: 'Schiff-Padilla-Lofgren national labs PDF',
        locationLabel: 'hosted PDF section using "biosecurity"',
        searchText: 'biosecurity',
        url: 'https://www.schiff.senate.gov/wp-content/uploads/2025/07/Schiff-Padilla-Lofgren-national-lab-staffing-cuts.pdf',
      },
    ],
  },
  {
    id: 'schmitt-written-testimony-gain-of-function',
    tier: 'direct self-use',
    personIds: ['senate-eric-schmitt'],
    evidenceLabel: 'Written testimony PDF',
    exactMatches: ['gain-of-function'],
    story:
      "A congressional hearing PDF titled as Eric Schmitt's written testimony directly attributes target-language use to him in discussion of Wuhan-related gain-of-function research.",
    sources: [
      {
        label: 'Congressional hearing written testimony PDF',
        locationLabel: 'p. 5, Schmitt testimony on Fauci and Wuhan gain-of-function research',
        page: 5,
        searchText:
          'funded dangerous gain-of-function research on coronaviruses at the Wuhan Institute of Virology',
        url: 'https://www.congress.gov/118/meeting/house/115611/witnesses/HHRG-118-FD00-Wstate-SchmittE-20230330.pdf',
      },
    ],
  },
  {
    id: 'rick-scott-covid-origin-letter-bundle',
    tier: 'direct self-use',
    personIds: ['senate-rick-scott'],
    evidenceLabel: 'Official letter bundle',
    exactMatches: ['gain-of-function'],
    story:
      "Rick Scott's official release and hosted letter directly reproduce his written use of the target phrase in demands for accountability over Wuhan-related gain-of-function research.",
    sources: [
      {
        label: 'Rick Scott COVID-origin release',
        locationLabel: 'release section on Wuhan-related gain-of-function research',
        textFragment: 'gain-of-function research',
        url: 'https://www.rickscott.senate.gov/2023/3/sen-rick-scott-to-hhs-secretary-covid-19-origin-records-were-mishandled-hold-people-accountable',
      },
      {
        label: 'Rick Scott hosted letter PDF',
        locationLabel: 'hosted letter section on gain-of-function research',
        searchText: 'gain-of-function',
        url: 'https://www.rickscott.senate.gov/services/files/A28A12BD-CA98-404C-A343-400EC6A2BA05',
      },
    ],
  },
  {
    id: 'shaheen-homeland-security-floor-remarks',
    tier: 'direct self-use',
    personIds: ['senate-jeanne-shaheen'],
    evidenceLabel: 'Floor remarks page',
    exactMatches: ['bioterrorism'],
    story:
      "Shaheen's official Senate floor-remarks page directly attributes target-language use to her in discussion of homeland security funding and bioterrorism threats.",
    sources: [
      {
        label: 'Shaheen homeland security floor remarks',
        locationLabel: 'floor remarks section on homeland security and bioterrorism',
        textFragment: 'bioterrorism',
        url: 'https://www.shaheen.senate.gov/news/press/on-senate-floor-shaheen-highlights-bipartisan-priorties-in-clean-homeland-security-funding-bill',
      },
    ],
  },
  {
    id: 'schatz-ai-safety-letter-biosecurity-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-brian-schatz'],
    evidenceLabel: 'Official office page',
    exactMatches: ['biosecurity'],
    story:
      "Schatz's official Senate release reproduces co-signed Senate letter text that uses the target language in discussion of frontier-model misuse risks.",
    sources: [
      {
        label: 'Schatz-Britt AI safety disclosures release',
        locationLabel: 'release section on frontier-model biosecurity risks',
        textFragment: 'biosecurity',
        url: 'https://www.schatz.senate.gov/news/press-releases/schatz-britt-colleagues-press-ai-companies-to-commit-to-timely-consistent-safety-disclosures-on-models',
      },
    ],
  },
  {
    id: 'slotkin-avian-flu-biosecurity-letter-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-elissa-slotkin'],
    evidenceLabel: 'Committee letter page',
    exactMatches: ['biosecurity'],
    story:
      "An official Senate committee page reproduces a bipartisan letter Slotkin co-signed using the target language in discussion of avian-flu response and livestock protections.",
    sources: [
      {
        label: 'Agriculture Committee avian-flu response page',
        locationLabel: 'letter page section on advanced biosecurity practices',
        textFragment: 'biosecurity',
        url: 'https://www.agriculture.senate.gov/newsroom/dem/press/release/klobuchar-grassley-rounds-slotkin-press-usda-on-avian-flu-response',
      },
    ],
  },
  {
    id: 'tina-smith-nahln-biosecurity-letter-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-tina-smith'],
    evidenceLabel: 'Official letter page',
    exactMatches: ['biosecurity'],
    story:
      "An official Senate office page reproduces a letter Tina Smith co-signed using the target language in support of labs conducting biosecurity measures for the food supply.",
    sources: [
      {
        label: 'Baldwin NAHLN labs funding letter page',
        locationLabel: 'letter page section on labs conducting biosecurity measures',
        textFragment: 'biosecurity measures',
        url: 'https://www.baldwin.senate.gov/news/press-releases/baldwin-demands-trump-admin-stop-withholding-funding-for-labs-that-protect-food-supply-to-prevent-disease-spread-and-price-hikes',
      },
    ],
  },
  {
    id: 'sullivan-newsmax-bioterrorism-page',
    tier: 'direct self-use',
    personIds: ['senate-dan-sullivan'],
    evidenceLabel: 'Official interview page',
    exactMatches: ['bioterrorism'],
    story:
      "Sullivan's official Senate interview page directly attributes target-language use to him in remarks about missile defense and the threat of bioterrorism.",
    sources: [
      {
        label: 'Sullivan on evolving threats from China and Russia',
        locationLabel: 'interview page section using "bioterrorism"',
        textFragment: 'bioterrorism',
        url: 'https://www.sullivan.senate.gov/newsroom/press-releases/sullivan-highlights-need-for-golden-dome-amid-evolving-threats-from-china-and-russia',
      },
    ],
  },
  {
    id: 'thune-avian-flu-biosecurity-letter-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-john-thune'],
    evidenceLabel: 'Official letter page',
    exactMatches: ['biosecurity'],
    story:
      "An official Senate office page reproduces a bipartisan letter Thune signed that uses the target language in calls for advanced biosecurity practices during the avian-flu response.",
    sources: [
      {
        label: 'Baldwin avian-flu coordination letter page',
        locationLabel: 'letter page section on advanced biosecurity practices',
        textFragment: 'biosecurity',
        url: 'https://www.baldwin.senate.gov/news/press-releases/baldwin-bipartisan-group-of-senators-urge-usda-to-strengthen-coordination-in-avian-flu-outbreak-response',
      },
    ],
  },
  {
    id: 'tillis-biodefense-and-biosecurity-pages',
    tier: 'signed or office-owned document',
    personIds: ['senate-thom-tillis'],
    evidenceLabel: 'Official source bundle',
    exactMatches: ['biodefense', 'biosecurity'],
    story:
      "Official Senate pages tied to Tillis use the target language in office-owned appropriations material and in a bipartisan avian-flu letter calling for advanced biosecurity practices.",
    sources: [
      {
        label: 'Tillis and Burr appropriations package release',
        locationLabel: 'appropriations release section on biodefense',
        textFragment: 'biodefense',
        url: 'https://www.tillis.senate.gov/2019/12/tillis-burr-deliver-major-wins-for-north-carolina-including-2-2-billion-for-n-c-military-installations',
      },
      {
        label: 'Baldwin avian-flu coordination letter page',
        locationLabel: 'letter page section on advanced biosecurity practices',
        textFragment: 'biosecurity',
        url: 'https://www.baldwin.senate.gov/news/press-releases/baldwin-bipartisan-group-of-senators-urge-usda-to-strengthen-coordination-in-avian-flu-outbreak-response',
      },
    ],
  },
  {
    id: 'tuberville-nih-hearing-gain-of-function-page',
    tier: 'direct self-use',
    personIds: ['senate-tommy-tuberville'],
    evidenceLabel: 'Official hearing page',
    exactMatches: ['gain-of-function'],
    story:
      "Tuberville's official Senate hearing page directly attributes target-language use to him in questioning about NIH transparency and gain-of-function research.",
    sources: [
      {
        label: 'Tuberville speaks with NIH director about improving research transparency',
        locationLabel: 'hearing page section on gain-of-function research',
        textFragment: 'gain-of-function',
        url: 'https://www.tuberville.senate.gov/newsroom/press-releases/tuberville-speaks-with-nih-director-about-improving-research-transparency/',
      },
    ],
  },
  {
    id: 'tuberville-biosecurity-oversight-bills-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-tommy-tuberville'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Tuberville's official Senate release uses the target language in office-authored background text about public-health oversight bills and lab-facility concerns.",
    sources: [
      {
        label: 'Tuberville public health funding oversight bills release',
        locationLabel: 'release section on biosecurity oversight',
        textFragment: 'biosecurity',
        url: 'https://www.tuberville.senate.gov/newsroom/press-releases/tuberville-continues-demands-for-public-health-funding-oversight-in-two-new-bills/',
      },
    ],
  },
  {
    id: 'warnock-bird-flu-biosecurity-letter-page',
    tier: 'signed or office-owned document',
    personIds: ['senate-raphael-g-warnock'],
    evidenceLabel: 'Official letter page',
    exactMatches: ['biosecurity'],
    story:
      "Warnock's official Senate page reproduces a bipartisan bird-flu letter using the target language in discussion of biosecurity audits and farm-response measures.",
    sources: [
      {
        label: 'Warnock bird-flu response letter page',
        locationLabel: 'letter page section on biosecurity audits',
        textFragment: 'biosecurity',
        url: 'https://www.warnock.senate.gov/newsroom/press-releases/senator-reverend-warnock-colleagues-aim-to-create-road-map-to-fight-bird-flu-lower-egg-prices/',
      },
    ],
  },
  {
    id: 'warren-biosecurity-video-page',
    tier: 'direct self-use',
    personIds: ['senate-elizabeth-warren'],
    evidenceLabel: 'Official video page',
    exactMatches: ['biosecurity'],
    story:
      "Warren's official Senate video page directly attributes target-language use to her in remarks about long-term funding for biosecurity and public-health preparedness.",
    sources: [
      {
        label: 'Warren biosecurity video page',
        locationLabel: 'video page title on stable long-term funding for biosecurity',
        textFragment: 'Stable long-term funding for biosecurity',
        url: 'https://www.warren.senate.gov/newsroom/videos/watch/stable-long-term-funding-for-biosecurity-helps-us-prepare-for-public-health-emergencies',
      },
    ],
  },
  {
    id: 'welch-nsf-biosecurity-grant-page',
    tier: 'official contextual mention',
    personIds: ['senate-peter-welch'],
    evidenceLabel: 'Official office page',
    exactMatches: ['biosecurity'],
    story:
      "Welch's official Senate page listing Vermont NSF awards includes an exact-match biosecurity grant title in office-published material, but this pass does not treat it as Welch's own direct self-use.",
    sources: [
      {
        label: 'Welch NSF awards page',
        locationLabel: 'awards page section with a biosecurity grant title',
        textFragment: 'biosecurity',
        url: 'https://www.welch.senate.gov/welch-celebrates-more-than-8-million-to-vermont-research-institutions-from-national-science-foundation/',
      },
    ],
  },
  {
    id: 'whitehouse-biosecurity-champion-release',
    tier: 'direct self-use',
    personIds: ['senate-sheldon-whitehouse'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity'],
    story:
      "Whitehouse's official Senate release directly attributes target-language use to him in remarks about strengthening America's biosecurity and developing countermeasures.",
    sources: [
      {
        label: 'Alliance for Biosecurity award release',
        locationLabel: 'release section on strengthening America’s biosecurity',
        textFragment: 'biosecurity',
        url: 'https://www.whitehouse.senate.gov/news/release/alliance-for-biosecurity-honors-senator-whitehouse-with-biosecurity-champion-award/',
      },
    ],
  },
  {
    id: 'wicker-safe-act-biosecurity-release',
    tier: 'direct self-use',
    personIds: ['senate-roger-f-wicker'],
    evidenceLabel: 'Official source bundle',
    exactMatches: ['bioweapon', 'bioweapons', 'biosecurity'],
    story:
      "Official Senate floor debate material and a Wicker Senate release together attribute exact target-language use to Wicker in both his own bioweapon remarks and office-owned biosecurity bill material.",
    sources: [
      {
        label: 'Congressional Record Senate PDF, Oct. 9, 2025',
        locationLabel: 'Senate floor debate section using "bioweapon"',
        searchText: 'bioweapon',
        url: 'https://www.govinfo.gov/content/pkg/CREC-2025-10-09/pdf/CREC-2025-10-09-senate.pdf',
      },
      {
        label: 'Wicker SAFE Act release',
        locationLabel: 'SAFE Act release section on biosecurity',
        textFragment: 'biosecurity',
        url: 'https://www.wicker.senate.gov/2025/4/wicker-feenstra-introduce-legislation-to-continue-safe-exports-of-agricultural-products-in-event-of-foreign-animal-disease-outbreak',
      },
    ],
  },
  {
    id: 'wyden-defense-projects-bioterrorism-page',
    tier: 'official contextual mention',
    personIds: ['senate-ron-wyden'],
    evidenceLabel: 'Official office page',
    exactMatches: ['bioterrorism'],
    story:
      "Wyden's official Senate page describing Oregon defense projects includes exact-match bioterrorism language in office-published project descriptions, but this pass does not treat it as Wyden's own direct self-use.",
    sources: [
      {
        label: 'Wyden defense projects page',
        locationLabel: 'defense-projects page section using "bioterrorism"',
        textFragment: 'bioterrorism',
        url: 'https://www.wyden.senate.gov/news/press-releases/wyden-smith-securing-over-100-million-for-oregon-defense-projects',
      },
    ],
  },
  {
    id: 'balderson-pandemic-preparedness-caucus-release',
    tier: 'signed or office-owned document',
    personIds: ['house-troy-balderson-ohio-12th'],
    evidenceLabel: 'Official release',
    exactMatches: ['biodefense'],
    story:
      "Balderson's official House release on the Pandemic Preparedness Caucus uses the target language in office-authored caucus priorities, including biodefense issues.",
    sources: [
      {
        label: 'Balderson pandemic preparedness caucus release',
        locationLabel: 'release section on Pandemic Preparedness Caucus biodefense priorities',
        textFragment: 'biodefense',
        url: 'https://balderson.house.gov/news/documentsingle.aspx?DocumentID=1833',
      },
    ],
  },
  {
    id: 'clarke-biosecurity-hearing-statement',
    tier: 'direct self-use',
    personIds: ['house-yvette-clarke-new-york-9th'],
    evidenceLabel: 'Official statement PDF',
    exactMatches: ['biosecurity'],
    story:
      "An official House hearing statement PDF directly attributes target-language use to Yvette Clarke in opening remarks on biosecurity and AI.",
    sources: [
      {
        label: 'House hearing statement PDF, Dec. 17, 2025',
        locationLabel: 'p. 2, Clarke on examining biosecurity and AI',
        page: 2,
        searchText: 'examining biosecurity and AI',
        url: 'https://docs.house.gov/meetings/IF/IF02/20251217/118773/HHRG-119-IF02-MState-C001067-20251217.pdf',
      },
    ],
  },
  {
    id: 'garbarino-biological-threats-question-appendix',
    tier: 'signed or office-owned document',
    personIds: ['house-andrew-garbarino-new-york-2nd'],
    evidenceLabel: 'Official appendix PDF',
    exactMatches: ['biological threats'],
    story:
      "An official House hearing appendix attributes target-language use to Andrew Garbarino in a submitted written question about detecting biological threats.",
    sources: [
      {
        label: 'House CWMD hearing appendix PDF',
        locationLabel: "p. 46, Garbarino question on CWMD's role in detecting and protecting against biological threats",
        page: 46,
        searchText: 'protecting against biological threats',
        url: 'https://www.congress.gov/117/chrg/CHRG-117hhrg45763/CHRG-117hhrg45763.pdf',
      },
    ],
  },
  {
    id: 'fedorchak-appropriations-biosecurity-release',
    tier: 'signed or office-owned document',
    personIds: ['house-julie-fedorchak-north-dakota-at-large'],
    evidenceLabel: 'Official release',
    exactMatches: ['biosecurity', 'biological threats'],
    story:
      "Fedorchak's official House release uses the target language in office-authored appropriations messaging about American biosecurity and biological threats.",
    sources: [
      {
        label: 'Fedorchak FY26 appropriations release',
        locationLabel: 'appropriations release section on American biosecurity and biological threats',
        textFragment: 'biosecurity',
        url: 'https://fedorchak.house.gov/media/press-releases/fedorchak-votes-complete-annual-appropriations-through-regular-order',
      },
    ],
  },
  {
    id: 'hudson-pandemic-research-oversight-letter',
    tier: 'signed or office-owned document',
    personIds: ['house-richard-hudson-north-carolina-9th'],
    evidenceLabel: 'Signed letter page',
    exactMatches: ['biosecurity'],
    story:
      "A published oversight-letter page explicitly says Hudson joined a letter calling for stronger domestic biosecurity oversight of pandemic research.",
    sources: [
      {
        label: 'Cassidy-Romney-McMorris Rodgers-Hudson oversight letter page',
        locationLabel: 'oversight-letter page section on stronger domestic biosecurity oversight',
        textFragment: 'biosecurity oversight',
        url: 'https://www.cassidy.senate.gov/newsroom/press-releases/ranking-member-cassidy-romney-mcmorris-rodgers-hudson-call-on-biden-administration-to-bolster-oversight-of-pandemic-research/',
      },
    ],
  },
  {
    id: 'jim-jordan-gain-of-function-hearing',
    tier: 'direct self-use',
    personIds: ['house-jim-jordan-ohio-4th'],
    evidenceLabel: 'House hearing transcript',
    exactMatches: ['gain-of-function'],
    story:
      "An official House hearing transcript directly attributes target-language use to Jim Jordan in questioning about Wuhan-related gain-of-function research.",
    sources: [
      {
        label: 'House Select Subcommittee transcript, July 11, 2023',
        locationLabel: 'p. 46, Jordan asking whether gain-of-function research should be done',
        page: 46,
        searchText: 'should we be doing gain-of-function research',
        url: 'https://docs.house.gov/meetings/VC/VC00/20230711/116185/HHRG-118-VC00-Transcript-20230711.pdf',
      },
    ],
  },
  {
    id: 'david-joyce-gain-of-function-hearing',
    tier: 'direct self-use',
    personIds: ['house-david-joyce-ohio-14th'],
    evidenceLabel: 'House hearing transcript',
    exactMatches: ['gain-of-function'],
    story:
      "An official House hearing transcript directly attributes target-language use to David Joyce in remarks about EcoHealth funding and gain-of-function research at Wuhan.",
    sources: [
      {
        label: 'House Select Subcommittee transcript, May 16, 2024',
        locationLabel: 'p. 23, Joyce questioning NIH review of whether proposed work was gain-of-function research',
        page: 23,
        searchText: 'was or was not gain-of-function research',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240516/117318/HHRG-118-VC00-Transcript-20240516.pdf',
      },
    ],
  },
  {
    id: 'marcy-kaptur-bioterrorism-biosecurity-hearing',
    tier: 'direct self-use',
    personIds: ['house-marcy-kaptur-ohio-9th'],
    evidenceLabel: 'House hearing text',
    exactMatches: ['biosecurity', 'bioterrorism'],
    story:
      "An official House hearing text directly attributes target-language use to Marcy Kaptur in appropriations questioning about biosecurity funding and bioterrorism threats.",
    sources: [
      {
        label: 'House Appropriations hearing text, Feb. 28, 2002',
        locationLabel: 'Kaptur follow-up on the biosecurity issue in agricultural preparedness',
        textFragment: 'follow up to the biosecurity issue',
        url: 'https://www.congress.gov/event/107th-congress/house-event/LC16999/text',
      },
    ],
  },
  {
    id: 'timothy-kennedy-biosecurity-hearing-statement',
    tier: 'signed or office-owned document',
    personIds: ['house-timothy-kennedy-new-york-26th'],
    evidenceLabel: 'Official statement PDF',
    exactMatches: ['biosecurity', 'bioterrorism', 'biological weapons', 'biological threat'],
    story:
      "Kennedy's official hearing statement uses multiple target phrases in office-signed material about agroterrorism, biosecurity preparedness, and biological threats.",
    sources: [
      {
        label: 'Homeland Democrats hearing statement PDF, Sept. 16, 2025',
        locationLabel: 'p. 1, Kennedy on agroterrorism and broader biosecurity preparedness',
        page: 1,
        searchText: 'agroterrorism and biosecurity more broadly',
        url: 'https://democrats-homeland.house.gov/download/kennedy-091625?download=1',
      },
    ],
  },
  {
    id: 'robert-latta-bioterrorism-hearing',
    tier: 'direct self-use',
    personIds: ['house-robert-latta-ohio-5th'],
    evidenceLabel: 'House hearing transcript',
    exactMatches: ['bioterrorism'],
    story:
      "An official House hearing transcript directly attributes target-language use to Robert Latta in remarks about imported food safety and bioterrorism threats.",
    sources: [
      {
        label: 'Energy and Commerce hearing PDF, May 6, 2010',
        locationLabel: 'p. 18, Latta on imported food safety and bioterrorism risk',
        page: 18,
        searchText: 'bioterrorism continues to be a threat',
        url: 'https://www.govinfo.gov/content/pkg/CHRG-111hhrg76573/pdf/CHRG-111hhrg76573.pdf',
      },
    ],
  },
  {
    id: 'malliotakis-gain-of-function-and-biosecurity-hearings',
    tier: 'direct self-use',
    personIds: ['house-nicole-malliotakis-new-york-11th'],
    evidenceLabel: 'Official source bundle',
    exactMatches: ['gain-of-function', 'biosecurity'],
    story:
      "Official House hearing records directly attribute target-language use to Nicole Malliotakis in questioning about EcoHealth gain-of-function research and foreign biosecurity standards.",
    sources: [
      {
        label: 'House Select Subcommittee hearing PDF, May 7, 2024',
        locationLabel: 'hearing PDF section on EcoHealth gain-of-function research',
        searchText: 'gain-of-function',
        url: 'https://www.congress.gov/118/chrg/CHRG-118hhrg55548/CHRG-118hhrg55548.pdf',
      },
      {
        label: 'Strengthening Biosafety and Biosecurity Standards hearing text',
        locationLabel: 'hearing text on strengthening biosafety and biosecurity standards',
        textFragment: 'biosecurity standards',
        url: 'https://www.congress.gov/event/118th-congress/house-event/116474/text',
      },
    ],
  },
  {
    id: 'grace-meng-biosecurity-extension-of-remarks',
    tier: 'direct self-use',
    personIds: ['house-grace-meng-new-york-6th'],
    evidenceLabel: 'Extension of remarks PDF',
    exactMatches: ['biosecurity'],
    story:
      "An official House extension-of-remarks PDF directly attributes target-language use to Grace Meng in remarks introducing the Global Pandemic Prevention and Biosecurity Act.",
    sources: [
      {
        label: 'Congressional Record extensions PDF, May 20, 2021',
        locationLabel: 'extension of remarks introducing the Global Pandemic Prevention and Biosecurity Act',
        searchText: 'Global Pandemic Prevention and Biosecurity Act',
        url: 'https://www.govinfo.gov/content/pkg/CREC-2021-05-20/pdf/CREC-2021-05-20-extensions.pdf',
      },
    ],
  },
  {
    id: 'gregory-meeks-biological-weapons-speech',
    tier: 'direct self-use',
    personIds: ['house-gregory-meeks-new-york-5th'],
    evidenceLabel: 'Official speech page',
    exactMatches: ['biological weapons'],
    story:
      "Meeks's official House speech page directly attributes target-language use to him in remarks about the Biological Weapons Convention and non-proliferation policy.",
    sources: [
      {
        label: 'Meeks Adelphi speech page',
        locationLabel: 'speech section on the Biological Weapons Convention',
        textFragment: 'Biological Weapons Convention',
        url: 'https://meeks.house.gov/taxonomy/story-type/speech/america-and-world-balance-between-dominance-and-cooperation-adelphi',
      },
    ],
  },
  {
    id: 'david-rouzer-biosecurity-newsletter',
    tier: 'signed or office-owned document',
    personIds: ['house-david-rouzer-north-carolina-7th'],
    evidenceLabel: 'Official newsletter page',
    exactMatches: ['biosecurity'],
    story:
      "Rouzer's official House newsletter uses the target language in office-authored budget messaging about enhancing livestock biosecurity.",
    sources: [
      {
        label: 'Rouzer Agriculture Committee newsletter page',
        locationLabel: 'newsletter section on enhancing livestock biosecurity',
        textFragment: 'biosecurity',
        url: 'https://rouzer.house.gov/news/email/show.aspx?ID=HNHKVQO6NTREZOLG655IIFZMK4',
      },
    ],
  },
  {
    id: 'deborah-ross-gain-of-function-hearing',
    tier: 'direct self-use',
    personIds: ['house-deborah-ross-north-carolina-2nd'],
    evidenceLabel: 'House hearing transcript',
    exactMatches: ['gain-of-function'],
    story:
      "An official House hearing transcript directly attributes target-language use to Deborah Ross in questioning about NIH definitions and oversight of gain-of-function research.",
    sources: [
      {
        label: 'House Select Subcommittee transcript, May 16, 2024',
        locationLabel: 'hearing transcript section on NIH oversight of gain-of-function research',
        searchText: 'gain-of-function',
        url: 'https://docs.house.gov/meetings/VC/VC00/20240516/117318/HHRG-118-VC00-Transcript-20240516.pdf',
      },
    ],
  },
  {
    id: 'michael-turner-empower-nih-release',
    tier: 'signed or office-owned document',
    personIds: ['house-michael-turner-ohio-10th'],
    evidenceLabel: 'Official release',
    exactMatches: ['gain-of-function'],
    story:
      "Turner's official House release on the EMPOWER NIH Act uses the target language in office-authored background text describing Wuhan-related gain-of-function experimentation.",
    sources: [
      {
        label: 'Turner EMPOWER NIH Act release',
        locationLabel: 'release section describing Wuhan-related gain-of-function experimentation',
        textFragment: 'gain-of-function',
        url: 'https://turner.house.gov/2021/6/rep-mike-turner-oh-10-introduces-empower-nih-act',
      },
    ],
  },
  {
    id: 'donald-norcross-dhs-shutdown-release',
    tier: 'signed or office-owned document',
    personIds: ['house-donald-norcross-new-jersey-1st'],
    evidenceLabel: 'Official release',
    exactMatches: ['biological threats'],
    story:
      "Norcross's official House release on a potential DHS shutdown uses the target language in office-authored background text about countermeasures to devastating biological threats.",
    sources: [
      {
        label: 'Norcross DHS shutdown release',
        locationLabel: 'release section on countermeasures to devastating biological threats',
        textFragment: 'biological threats',
        url: 'https://norcross.house.gov/2015/2/rep-norcross-calls-congress-fund-department-homeland-security-avert',
      },
    ],
  },
  {
    id: 'frank-pallone-biological-threats-hearing-statement',
    tier: 'direct self-use',
    personIds: ['house-frank-pallone-new-jersey-6th'],
    evidenceLabel: 'Official statement PDF',
    exactMatches: ['biological threats', 'biodefense', 'biological threat'],
    story:
      "An official House hearing statement PDF directly attributes multiple target phrases to Frank Pallone in remarks on public-health emergency response, including biological threats, biodefense, and the biological threat.",
    sources: [
      {
        label: 'Pallone statement at hearing on H.R. 3299',
        locationLabel: 'p. 1, Pallone on U.S. readiness to combat and respond to biological threats',
        page: 1,
        searchText: 'combat and respond to biological threats',
        url: 'https://docs.house.gov/meetings/IF/IF14/20160519/104953/HHRG-114-IF14-MState-P000034-20160519.pdf',
      },
    ],
  },
  {
    id: 'john-roberts-trump-v-hawaii-oral-argument',
    tier: 'direct self-use',
    personIds: ['judicial-john-g-roberts-jr'],
    evidenceLabel: 'Official oral argument transcript',
    exactMatches: ['biological weapons'],
    story:
      "An official Supreme Court oral argument transcript attributes target-language use directly to Chief Justice Roberts in a hypothetical about entrants carrying chemical and biological weapons during Trump v. Hawaii.",
    sources: [
      {
        label: 'Trump v. Hawaii oral argument transcript, Apr. 25, 2018',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2017/17-965_l5gm.pdf',
      },
    ],
  },
  {
    id: 'samuel-alito-johnson-v-united-states-oral-argument',
    tier: 'direct self-use',
    personIds: ['judicial-samuel-a-alito-jr'],
    evidenceLabel: 'Official oral argument transcript',
    exactMatches: ['biological weapon', 'biological weapons'],
    story:
      "An official Supreme Court oral argument transcript attributes multiple target-phrase uses directly to Justice Alito in Johnson v. United States, including questions about the risks and prevalence of biological weapons.",
    sources: [
      {
        label: 'Johnson v. United States oral argument transcript, Nov. 5, 2014',
        url: 'https://www.supremecourt.gov/oral_arguments/argument_transcripts/2014/13-7120_aa7i.pdf',
      },
    ],
  },
  {
    id: 'don-bacon-defense-priorities-issue-page',
    tier: 'signed or office-owned document',
    personIds: ['house-don-bacon-nebraska-2nd'],
    evidenceLabel: 'Official issue page',
    exactMatches: ['biodefense'],
    story:
      "Bacon's official House issue page lists his defense priorities and includes the exact phrase national biodefense readiness, making this an office-owned attributable hit.",
    sources: [
      {
        label: 'Bacon national defense issue page',
        locationLabel: 'issue page section listing national biodefense readiness',
        textFragment: 'national biodefense readiness',
        url: 'https://bacon.house.gov/issues/issue?IssueID=14899',
      },
    ],
  },
]
