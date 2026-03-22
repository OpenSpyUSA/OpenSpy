export type BranchId = 'executive' | 'legislative' | 'judicial'
export type ChamberId = 'national-council' | 'council-of-states'

export interface LinkItem {
  label: string
  url: string
}

export interface StatItem {
  label: string
  note: string
  value: string
}

export interface InstitutionCard {
  description: string
  subtitle?: string
  title: string
}

export interface BranchOverview {
  description: string
  id: BranchId
  institutionCards: InstitutionCard[]
  kicker: string
  name: string
  seedNote?: string
  sources: LinkItem[]
  stats: StatItem[]
  title: string
}

export interface Department {
  acronym: string
  description: string
  id: string
  name: string
}

export interface Person {
  birthDate?: string
  birthYear?: number
  branchId: BranchId
  cantonCode?: string
  cantonName?: string
  chamberId?: ChamberId
  chamberLabel?: string
  courtName?: string
  currentOfficeSince?: string
  departmentAcronym?: string
  departmentName?: string
  education: string[]
  groupId: string
  id: string
  links: LinkItem[]
  name: string
  notes?: string[]
  partyCode?: string
  partyLabel?: string
  roleChips?: string[]
  seatLabel?: string
  sortOrder: number
  summary: string
  title: string
  careerHistory: string[]
}

export interface SwitzerlandDataset {
  branches: BranchOverview[]
  departments: Department[]
  generatedAt: string
  people: Person[]
  sources: LinkItem[]
}

export const PARTY_STYLES: Record<string, { accent: string; background: string; text: string }> = {
  'FDP / PLR': {
    accent: '#0054a6',
    background: 'rgba(0, 84, 166, 0.12)',
    text: '#003a73',
  },
  'GLP / Green Liberals': {
    accent: '#9dae2b',
    background: 'rgba(157, 174, 43, 0.16)',
    text: '#5e6d14',
  },
  'Greens': {
    accent: '#2e7d32',
    background: 'rgba(46, 125, 50, 0.14)',
    text: '#1f5a22',
  },
  'No party affiliation': {
    accent: '#59636e',
    background: 'rgba(89, 99, 110, 0.14)',
    text: '#2f3842',
  },
  'SP / PS': {
    accent: '#c42a2a',
    background: 'rgba(196, 42, 42, 0.14)',
    text: '#872020',
  },
  'SVP / UDC': {
    accent: '#4b6e23',
    background: 'rgba(75, 110, 35, 0.16)',
    text: '#304a15',
  },
  'The Centre': {
    accent: '#cc7a1d',
    background: 'rgba(204, 122, 29, 0.14)',
    text: '#8f4f0a',
  },
}

export const branchOrder: BranchId[] = ['executive', 'legislative', 'judicial']

export const switzerlandDataset: SwitzerlandDataset = {
  generatedAt: '2026-03-22',
  sources: [
    {
      label: 'Federal Chancellery: The Swiss Confederation, a brief guide 2026',
      url:
        'https://www.bk.admin.ch/dam/bk/de/dokumente/komm-ue/Buku2026/The%20Swiss%20Confederation.%20A%20brief%20guide%202026.pdf.download.pdf/The%20Swiss%20Confederation.%20A%20brief%20guide%202026.pdf',
    },
    {
      label: 'Swiss Parliament: councillor profiles and chamber data',
      url: 'https://ws-old.parlament.ch/councillors/basicdetails?lang=en',
    },
    {
      label: 'Federal Supreme Court: presidency and judges',
      url:
        'https://www.bger.ch/index/federal/federal-inherit-template/federal-richter/federal-richter-bundesrichter.htm?level=1',
    },
  ],
  branches: [
    {
      id: 'executive',
      name: 'Executive',
      kicker: 'Collective Executive',
      title: 'Federal Council, yearly presidency rotation, and seven federal departments.',
      description:
        'Switzerland’s federal executive is built around the Federal Council, a seven-member collegial body. The Federal President rotates yearly and is first among equals, while the Federal Chancellor supports the Council without being one of the seven councillors.',
      stats: [
        {
          label: 'Federal Councillors',
          note: 'The Swiss executive is collective rather than presidential.',
          value: '7',
        },
        {
          label: 'Federal President',
          note: 'A rotating annual role held by one councillor at a time.',
          value: '2026',
        },
        {
          label: 'Federal departments',
          note: 'Each councillor heads one federal department.',
          value: '7',
        },
      ],
      institutionCards: [
        {
          title: 'Federal Council',
          subtitle: 'Bundesrat / Conseil fédéral / Consiglio federale',
          description:
            'The Federal Council is the national executive. Decisions are taken collegially, and no single councillor has presidential-style control over the whole branch.',
        },
        {
          title: 'Federal President',
          description:
            'The presidency rotates yearly among the councillors. The office carries representational duties but does not create a separate strong executive center.',
        },
        {
          title: 'Federal Chancellor',
          description:
            'The Chancellor runs the Federal Chancellery and supports the Council institutionally, but does not sit as one of the seven Federal Councillors.',
        },
      ],
      sources: [
        {
          label: 'Federal Chancellery overview',
          url: 'https://www.bk.admin.ch/bk/en/home/bk.html',
        },
        {
          label: 'Members of the Federal Council',
          url: 'https://www.admin.ch/gov/en/start/federal-council/members-of-the-federal-council.html',
        },
      ],
    },
    {
      id: 'legislative',
      name: 'Legislative',
      kicker: 'Federal Assembly',
      title: 'National Council, Council of States, parties, and cantonal representation.',
      description:
        'The Federal Assembly is bicameral, but it should not be flattened into U.S.-style House and Senate labels. The National Council represents the population, while the Council of States represents the cantons. Cantons and parties are the central browsing dimensions in this first seed.',
      stats: [
        {
          label: 'National Council seats',
          note: 'The population chamber with seats distributed mainly by canton size.',
          value: '200',
        },
        {
          label: 'Council of States seats',
          note: 'The cantonal chamber, generally two seats per full canton and one per half-canton.',
          value: '46',
        },
        {
          label: 'Seeded member profiles',
          note: 'Version 1 includes a representative multiparty sample while keeping the schema ready for full expansion.',
          value: '18',
        },
      ],
      institutionCards: [
        {
          title: 'Federal Assembly',
          subtitle: 'Bundesversammlung / Assemblée fédérale / Assemblea federale',
          description:
            'The two chambers together make up the federal legislature. Cantonal structure, multilingual politics, and coalition-style multiparty competition matter more than any red-vs-blue frame.',
        },
        {
          title: 'National Council',
          description:
            'The National Council represents the population. Larger cantons send larger delegations, making canton filters especially useful for navigation.',
        },
        {
          title: 'Council of States',
          description:
            'The Council of States represents the cantons. Seats are canton-based rather than district-based, so the chamber should be browsed with a cantonal lens.',
        },
      ],
      seedNote:
        'This first release is a representative subset, not a full parliamentary census. The chamber switch, canton filters, and party filters are designed so the roster can scale out cleanly later.',
      sources: [
        {
          label: 'National Council overview',
          url: 'https://www.parlament.ch/en/organe/Pages/Nationalrat.aspx',
        },
        {
          label: 'Council of States basic details',
          url: 'https://ws-old.parlament.ch/councillors/basicdetails?lang=en&councilFilter=S',
        },
        {
          label: 'Swiss canton TopoJSON for navigation layer',
          url: 'https://swiss-maps.interactivethings.io/api/v0?year=2022&shapes=cantons&format=topojson',
        },
      ],
    },
    {
      id: 'judicial',
      name: 'Judicial',
      kicker: 'Federal Supreme Court',
      title: 'Federal Supreme Court structure, current court leadership, and seeded judge profiles.',
      description:
        'The Federal Supreme Court sits at the top of the federal judiciary, but Swiss judicial roles should not be recast as U.S.-style Supreme Court politics. Party affiliation can be publicly visible in judicial biographies, yet the election and institutional context differ markedly from presidential nomination models.',
      stats: [
        {
          label: 'Highest court',
          note: 'The Federal Supreme Court is the apex of the Swiss federal judiciary.',
          value: '1',
        },
        {
          label: 'Current court leadership',
          note: 'This seed includes the current President and Vice President of the court.',
          value: '2',
        },
        {
          label: 'Seeded judge profiles',
          note: 'A realistic subset for demo use, with the data model ready for broader expansion.',
          value: '6',
        },
      ],
      institutionCards: [
        {
          title: 'Federal Supreme Court of Switzerland',
          subtitle: 'Bundesgericht / Tribunal fédéral / Tribunale federale',
          description:
            'The court’s public structure matters more than any attempt to import U.S. judicial labels. Divisions, presidencies, and public biographies should be read on Swiss terms.',
        },
        {
          title: 'Selection context',
          description:
            'Judges are elected by the United Federal Assembly. That makes the Swiss process institutionally distinct from U.S.-style presidential nomination and Senate confirmation politics.',
        },
        {
          title: 'Profile scope',
          description:
            'Version 1 includes a seeded court roster with official profiles and party references only where they are publicly relevant on court biography pages.',
        },
      ],
      seedNote:
        'Judicial coverage is intentionally seeded rather than exhaustive in version 1. The priority is a Switzerland-correct structure with room to grow.',
      sources: [
        {
          label: 'Federal Supreme Court presidency',
          url: 'https://www.bger.ch/home/federal/federal-gericht/prasidium.html',
        },
        {
          label: 'Federal Supreme Court judges',
          url:
            'https://www.bger.ch/index/federal/federal-inherit-template/federal-richter/federal-richter-bundesrichter.htm?level=1',
        },
      ],
    },
  ],
  departments: [
    {
      id: 'fdfa',
      acronym: 'FDFA',
      name: 'Federal Department of Foreign Affairs',
      description: 'Foreign policy, consular affairs, diplomacy, and international cooperation.',
    },
    {
      id: 'fdha',
      acronym: 'FDHA',
      name: 'Federal Department of Home Affairs',
      description:
        'Health, culture, equality, social insurance, and broad domestic social policy functions.',
    },
    {
      id: 'fdjp',
      acronym: 'FDJP',
      name: 'Federal Department of Justice and Police',
      description: 'Justice, migration, policing coordination, citizenship, and civil status matters.',
    },
    {
      id: 'ddps',
      acronym: 'DDPS',
      name: 'Federal Department of Defence, Civil Protection and Sport',
      description: 'Defence policy, armed forces, civil protection, cybersecurity, and sport.',
    },
    {
      id: 'fdf',
      acronym: 'FDF',
      name: 'Federal Department of Finance',
      description: 'Federal finances, taxation, customs, digital administration, and budgeting.',
    },
    {
      id: 'eaer',
      acronym: 'EAER',
      name: 'Federal Department of Economic Affairs, Education and Research',
      description: 'Economic policy, labour, agriculture, education, research, and innovation.',
    },
    {
      id: 'detec',
      acronym: 'DETEC',
      name: 'Federal Department of the Environment, Transport, Energy and Communications',
      description:
        'Transport, energy, environment, communications, and major infrastructure policy.',
    },
  ],
  people: [
    {
      id: 'executive-elisabeth-baume-schneider',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 1,
      name: 'Elisabeth Baume-Schneider',
      title: 'Federal Councillor · Head of the FDHA',
      summary:
        'Jurassian Social Democrat, former teacher, cantonal minister, and Council of States member who has led the Federal Department of Home Affairs since 2023.',
      birthDate: '1963-12-24',
      partyCode: 'SP / PS',
      partyLabel: 'SP / PS',
      cantonCode: 'JU',
      cantonName: 'Jura',
      departmentAcronym: 'FDHA',
      departmentName: 'Federal Department of Home Affairs',
      currentOfficeSince: 'January 2023',
      education: ['Teacher training in Delémont.'],
      careerHistory: [
        'Worked as a teacher before moving into cantonal politics.',
        'Served in the Jura cantonal parliament from 2002.',
        'Member of the Government of Jura from 2015 to 2022.',
        'Member of the Council of States from 2019 to 2022.',
      ],
      links: [
        {
          label: 'Official profile',
          url:
            'https://www.edi.admin.ch/edi/en/home/documentation/biographies/elisabeth-baume-schneider--federal-councillor.html',
        },
      ],
    },
    {
      id: 'executive-guy-parmelin',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 2,
      name: 'Guy Parmelin',
      title: 'Federal Councillor · Head of the EAER',
      summary:
        'Vaud SVP / UDC farmer-winegrower, Federal Councillor since 2016, and the rotating Federal President for 2026.',
      birthDate: '1959-11-09',
      partyCode: 'SVP / UDC',
      partyLabel: 'SVP / UDC',
      cantonCode: 'VD',
      cantonName: 'Vaud',
      departmentAcronym: 'EAER',
      departmentName: 'Federal Department of Economic Affairs, Education and Research',
      currentOfficeSince: 'January 2016',
      roleChips: ['Federal President 2026'],
      education: ['Agricultural and viticulture training background.'],
      careerHistory: [
        'Worked as a farmer and winegrower in Bursins.',
        'Served in municipal politics and the Vaud cantonal parliament.',
        'Member of the National Council from 2003 to 2015.',
        'Elected to the Federal Council in 2015 and took office in 2016.',
      ],
      links: [
        {
          label: 'Official profile',
          url: 'https://www.wbf.admin.ch/en/guy-parmelin-federal-councillor',
        },
      ],
    },
    {
      id: 'executive-albert-roesti',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 3,
      name: 'Albert Rösti',
      title: 'Federal Councillor · Head of the DETEC',
      summary:
        'Bernese SVP / UDC agricultural engineer and former National Councillor who leads the environment, transport, energy, and communications portfolio.',
      birthDate: '1967-08-07',
      partyCode: 'SVP / UDC',
      partyLabel: 'SVP / UDC',
      cantonCode: 'BE',
      cantonName: 'Bern',
      departmentAcronym: 'DETEC',
      departmentName:
        'Federal Department of the Environment, Transport, Energy and Communications',
      currentOfficeSince: 'January 2023',
      education: ['Agricultural engineering, ETH Zurich.', 'MBA, University of Rochester.'],
      careerHistory: [
        'Ran a farm in Uetendorf and was active in municipal politics there.',
        'Member of the National Council from 2011 to 2022.',
        'President of the Swiss Oil Association from 2015 to 2022.',
        'Elected to the Federal Council in December 2022.',
      ],
      links: [
        {
          label: 'Official profile',
          url: 'https://www.uvek.admin.ch/en/detec/albert-roesti-federal-councillor.html',
        },
      ],
    },
    {
      id: 'executive-beat-jans',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 4,
      name: 'Beat Jans',
      title: 'Federal Councillor · Head of the FDJP',
      summary:
        'Basel SP / PS politician and former member of the Basel-Stadt executive who has led justice and police since 2024.',
      birthYear: 1964,
      partyCode: 'SP / PS',
      partyLabel: 'SP / PS',
      cantonCode: 'BS',
      cantonName: 'Basel-Stadt',
      departmentAcronym: 'FDJP',
      departmentName: 'Federal Department of Justice and Police',
      currentOfficeSince: 'January 2024',
      education: ['Agricultural engineering, ETH Zurich.'],
      careerHistory: [
        'Worked in environmental and development-related roles around Basel.',
        'Member of the National Council from 2010 to 2020.',
        'Member of the Executive Council of Basel-Stadt from 2021 to 2023.',
        'Elected to the Federal Council in December 2023.',
      ],
      links: [
        {
          label: 'Official profile',
          url: 'https://www.ejpd.admin.ch/ejpd/en/home/the-department/beat-jans.html',
        },
      ],
    },
    {
      id: 'executive-karin-keller-sutter',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 5,
      name: 'Karin Keller-Sutter',
      title: 'Federal Councillor · Head of the FDF',
      summary:
        'St. Gallen FDP / PLR leader, former cantonal government member, and former Council of States member heading the finance department since 2019.',
      birthDate: '1963-12-22',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      cantonCode: 'SG',
      cantonName: 'St. Gallen',
      departmentAcronym: 'FDF',
      departmentName: 'Federal Department of Finance',
      currentOfficeSince: 'January 2019',
      education: ['Conference interpreter and teacher by training.'],
      careerHistory: [
        'Worked as a conference interpreter and teacher before entering full-time politics.',
        'Member of the Government of St. Gallen from 2000 to 2012.',
        'Member of the Council of States from 2011 to 2018.',
        'Elected to the Federal Council in 2018 and took office in 2019.',
      ],
      links: [
        {
          label: 'Official profile',
          url: 'https://www.efd.admin.ch/en/karin-keller-sutter-federal-councillor',
        },
      ],
    },
    {
      id: 'executive-martin-pfister',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 6,
      name: 'Martin Pfister',
      title: 'Federal Councillor · Head of the DDPS',
      summary:
        'Zug Centre politician, teacher, historian, and former cantonal health director who entered the Federal Council in 2025.',
      birthDate: '1963-07-31',
      partyCode: 'The Centre',
      partyLabel: 'The Centre',
      cantonCode: 'ZG',
      cantonName: 'Zug',
      departmentAcronym: 'DDPS',
      departmentName: 'Federal Department of Defence, Civil Protection and Sport',
      currentOfficeSince: 'April 2025',
      education: ['Teacher training in Zug.', 'Degree in history, University of Fribourg.'],
      careerHistory: [
        'Worked as a teacher at the elementary and management-school level.',
        'Served in the Zug cantonal parliament and the cantonal government.',
        'Headed the Zug Department of Health from 2016 to 2025.',
        'Elected to the Federal Council in March 2025.',
      ],
      links: [
        {
          label: 'Official profile',
          url: 'https://www.vbs.admin.ch/en/head-ddps',
        },
      ],
    },
    {
      id: 'executive-ignazio-cassis',
      branchId: 'executive',
      groupId: 'federal-council',
      sortOrder: 7,
      name: 'Ignazio Cassis',
      title: 'Federal Councillor · Head of the FDFA',
      summary:
        'Ticino FDP / PLR doctor and former cantonal physician who has led foreign affairs since 2017 and serves as Vice President in 2026.',
      birthDate: '1961-04-13',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      cantonCode: 'TI',
      cantonName: 'Ticino',
      departmentAcronym: 'FDFA',
      departmentName: 'Federal Department of Foreign Affairs',
      currentOfficeSince: 'November 2017',
      roleChips: ['Vice President 2026'],
      education: ['Medicine, University of Zurich.', 'Medical doctor by profession.'],
      careerHistory: [
        'Worked as a medical doctor and later as cantonal physician in Ticino.',
        'Served on the communal parliament of Collina d’Oro.',
        'Member of the National Council from 2007 to 2017.',
        'Elected to the Federal Council in 2017 and served as Federal President in 2022.',
      ],
      links: [
        {
          label: 'Official profile',
          url:
            'https://www.eda.admin.ch/eda/en/fdfa/fdfa/organisation-fdfa/departementsvorsteher/portrait.html',
        },
      ],
    },
    {
      id: 'executive-viktor-rossi',
      branchId: 'executive',
      groupId: 'federal-chancellery',
      sortOrder: 8,
      name: 'Viktor Rossi',
      title: 'Federal Chancellor',
      summary:
        'Federal Chancellor since 2024, with senior administrative roles in the Federal Supreme Court and the Federal Department of Finance.',
      birthYear: 1968,
      partyCode: 'GLP / Green Liberals',
      partyLabel: 'GLP / Green Liberals',
      cantonCode: 'BE',
      cantonName: 'Bern',
      currentOfficeSince: 'January 2024',
      notes: ['The Chancellor supports the Federal Council but is not one of the seven councillors.'],
      education: ['Teacher and lawyer by training.'],
      careerHistory: [
        'Held senior roles in the Federal Assembly services, the Federal Office of Social Insurance, and the Federal Office of Justice.',
        'Secretary General of the Federal Supreme Court from 2015 to 2019.',
        'Secretary General of the Federal Department of Finance from 2019 to 2023.',
        'Elected Federal Chancellor in December 2023.',
      ],
      links: [
        {
          label: 'Official profile',
          url: 'https://www.bk.admin.ch/bk/en/home/bk/bundeskanzler.html',
        },
      ],
    },
    {
      id: 'legislative-thomas-aeschi',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 1,
      name: 'Thomas Aeschi',
      title: 'Member of the National Council',
      summary:
        'Economist from Zug and a leading SVP / UDC parliamentarian with prior service in the Zug cantonal parliament.',
      birthDate: '1979-01-13',
      partyCode: 'SVP / UDC',
      partyLabel: 'SVP / UDC',
      cantonCode: 'ZG',
      cantonName: 'Zug',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: [
        'Economics degree, University of St. Gallen.',
        'Master of Public Administration, Harvard.',
      ],
      careerHistory: [
        'Member of the Zug cantonal parliament from 2010 to 2012.',
        'Held several leadership roles inside the Swiss People’s Party in Zug and nationally.',
        'Parliamentary group leader of the SVP / UDC since 2017.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4053?lang=en',
        },
      ],
    },
    {
      id: 'legislative-katja-christ',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 2,
      name: 'Katja Christ',
      title: 'Member of the National Council',
      summary:
        'Basel-Stadt Green Liberal lawyer and vice-president of the national Green Liberal party.',
      birthDate: '1972-08-01',
      partyCode: 'GLP / Green Liberals',
      partyLabel: 'GLP / Green Liberals',
      cantonCode: 'BS',
      cantonName: 'Basel-Stadt',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: ['Law degree (lic. iur.).'],
      careerHistory: [
        'National vice-president of the Green Liberal Party.',
        'Active in parliamentary groups focused on electromobility, education, innovation, and sport.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4252?lang=en',
        },
      ],
    },
    {
      id: 'legislative-juerg-grossen',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 3,
      name: 'Jürg Grossen',
      title: 'Member of the National Council',
      summary:
        'Bernese Green Liberal parliamentarian and long-running national party president.',
      birthDate: '1969-08-24',
      partyCode: 'GLP / Green Liberals',
      partyLabel: 'GLP / Green Liberals',
      cantonCode: 'BE',
      cantonName: 'Bern',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: [],
      careerHistory: [
        'Served on the Frutigen municipal commission for civil engineering, transport, and water.',
        'Held senior leadership roles in the Bernese and national Green Liberal party.',
        'President of the Green Liberal Party since 2017.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4083?lang=en',
        },
      ],
    },
    {
      id: 'legislative-greta-gysin',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 4,
      name: 'Greta Gysin',
      title: 'Member of the National Council',
      summary:
        'Ticino Green parliamentarian with a humanities background and leadership experience inside the cantonal Greens.',
      birthDate: '1983-10-06',
      partyCode: 'Greens',
      partyLabel: 'Greens',
      cantonCode: 'TI',
      cantonName: 'Ticino',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: ['Master of Arts, University of Zurich.'],
      careerHistory: [
        'Served in the operating leadership of the Greens of Ticino.',
        'Vice-president of the cantonal Green group from December 2019.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4268?lang=en',
        },
      ],
    },
    {
      id: 'legislative-pierre-andre-page',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 5,
      name: 'Pierre-André Page',
      title: 'Member of the National Council',
      summary:
        'Fribourg SVP / UDC farmer with long local executive experience and past service in the Grand Council.',
      birthDate: '1960-04-19',
      partyCode: 'SVP / UDC',
      partyLabel: 'SVP / UDC',
      cantonCode: 'FR',
      cantonName: 'Fribourg',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: ['Master farmer qualification.'],
      careerHistory: [
        'Served in local executive office in his commune, including as mayor.',
        'Member of the Grand Council of Fribourg from 1996 to 2015.',
        'Active in inter-parliamentary groups linked to Korea, Israel, and Africa.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4169?lang=en',
        },
      ],
    },
    {
      id: 'legislative-maja-riniker',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 6,
      name: 'Maja Riniker',
      title: 'Member of the National Council',
      summary:
        'Aargau FDP / PLR parliamentarian with a business administration background and a high national institutional profile.',
      birthDate: '1978-05-23',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      cantonCode: 'AG',
      cantonName: 'Aargau',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: ['University of Applied Sciences degree in business administration.'],
      careerHistory: [
        'Has built a national profile inside the FDP / PLR delegation from Aargau.',
        'Parliamentary group memberships are documented through the Federal Assembly records.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4313?lang=en',
        },
      ],
    },
    {
      id: 'legislative-aline-trede',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 7,
      name: 'Aline Trede',
      title: 'Member of the National Council',
      summary:
        'Bern Green parliamentarian with environmental science training and prominent leadership in the parliamentary Green group.',
      birthDate: '1983-08-26',
      partyCode: 'Greens',
      partyLabel: 'Greens',
      cantonCode: 'BE',
      cantonName: 'Bern',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: ['Environmental sciences, ETH Zurich (MSc).'],
      careerHistory: [
        'Served in the legislature of the City of Bern from 2009 to 2012.',
        'Vice-president of the Swiss Greens from 2008 to 2012.',
        'President of the Green parliamentary group from 2020.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4128?lang=en',
        },
      ],
    },
    {
      id: 'legislative-cedric-wermuth',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 8,
      name: 'Cédric Wermuth',
      title: 'Member of the National Council',
      summary:
        'Aargau Social Democrat and co-president of the SP / PS, with deep roots in youth and cantonal party leadership.',
      birthDate: '1986-02-19',
      partyCode: 'SP / PS',
      partyLabel: 'SP / PS',
      cantonCode: 'AG',
      cantonName: 'Aargau',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: ['Master of Arts, University of Zurich.'],
      careerHistory: [
        'Served on the Baden city council and on a cantonal youth commission.',
        'Held several leadership roles in the Social Democratic Party at cantonal and national level.',
        'Co-president of the SP / PS since 2020.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4057?lang=en',
        },
      ],
    },
    {
      id: 'legislative-philipp-matthias-bregy',
      branchId: 'legislative',
      groupId: 'national-council',
      sortOrder: 9,
      name: 'Philipp Matthias Bregy',
      title: 'Member of the National Council',
      summary:
        'Valais Centre politician with cantonal parliamentary experience and a record in local executive office.',
      birthDate: '1978-07-07',
      partyCode: 'The Centre',
      partyLabel: 'The Centre',
      cantonCode: 'VS',
      cantonName: 'Valais',
      chamberId: 'national-council',
      chamberLabel: 'National Council',
      education: [],
      careerHistory: [
        'Member of the Grand Council of Valais from 2009 to 2018.',
        'Also served as a substitute member of the cantonal parliament and on the municipal council of Naters.',
        'Held leadership roles inside the Christian Democratic and Centre current in Upper Valais.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4230?lang=en',
        },
      ],
    },
    {
      id: 'legislative-pirmin-bischof',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 10,
      name: 'Pirmin Bischof',
      title: 'Member of the Council of States',
      summary:
        'Solothurn Centre senator and lawyer with municipal executive experience and visible cross-sector parliamentary group work.',
      birthDate: '1959-02-24',
      partyCode: 'The Centre',
      partyLabel: 'The Centre',
      cantonCode: 'SO',
      cantonName: 'Solothurn',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Doctor of law.', 'LL.M.'],
      careerHistory: [
        'Member of the Solothurn cantonal parliament from 2005 to 2007.',
        'Member of the municipal executive in Solothurn from 1997 onward.',
        'Co-president of parliamentary groups focused on domestic banks and care policy.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/3871?lang=en',
        },
      ],
    },
    {
      id: 'legislative-thierry-burkart',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 11,
      name: 'Thierry Burkart',
      title: 'Member of the Council of States',
      summary:
        'Aargau FDP / PLR senator, lawyer, and national party president with experience in both federal chambers.',
      birthDate: '1975-08-21',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      cantonCode: 'AG',
      cantonName: 'Aargau',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Law degree.', 'LL.M.', 'Admitted attorney.'],
      careerHistory: [
        'Served in the Grand Council of Aargau from 2001 to 2015.',
        'Member of the National Council from 2015 to 2019.',
        'President of FDP.The Liberals Switzerland since 2021.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4189?lang=en',
        },
      ],
    },
    {
      id: 'legislative-andrea-caroni',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 12,
      name: 'Andrea Caroni',
      title: 'Member of the Council of States',
      summary:
        'Appenzell Ausserrhoden FDP / PLR senator, law professor, and former municipal executive with a Harvard public administration degree.',
      birthDate: '1980-04-19',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      cantonCode: 'AR',
      cantonName: 'Appenzell Ausserrhoden',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Doctor of law.', 'Master of Public Administration, Harvard.'],
      careerHistory: [
        'Served in the municipal executive of Grub and on local audit bodies.',
        'Held senior roles inside the FDP nationally and in Appenzell Ausserrhoden.',
        'Active in international parliamentary work and inter-cantonal groupings.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4075?lang=en',
        },
      ],
    },
    {
      id: 'legislative-daniel-jositsch',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 13,
      name: 'Daniel Jositsch',
      title: 'Member of the Council of States',
      summary:
        'Zurich SP / PS senator and law professor with a long parliamentary footprint and a wide thematic network.',
      birthDate: '1965-03-25',
      partyCode: 'SP / PS',
      partyLabel: 'SP / PS',
      cantonCode: 'ZH',
      cantonName: 'Zurich',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Doctor of law.', 'Law professor.'],
      careerHistory: [
        'Served in local executive office and briefly in the cantonal legislature.',
        'Built a parliamentary profile across justice, security, migration, and education topics.',
        'Leads or supports several friendship and issue groups, including Switzerland-Colombia.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/3891?lang=en',
        },
      ],
    },
    {
      id: 'legislative-johanna-gapany',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 14,
      name: 'Johanna Gapany',
      title: 'Member of the Council of States',
      summary:
        'Fribourg FDP / PLR senator with municipal executive and cantonal legislature experience.',
      birthDate: '1988-07-25',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      cantonCode: 'FR',
      cantonName: 'Fribourg',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: [],
      careerHistory: [
        'Member of the general council of Bulle from 2012 to 2016.',
        'Member of the communal executive of Bulle from 2016 to 2019.',
        'Member of the Grand Council of Fribourg from 2016 to 2019.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4306?lang=en',
        },
      ],
    },
    {
      id: 'legislative-charles-juillard',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 15,
      name: 'Charles Juillard',
      title: 'Member of the Council of States',
      summary:
        'Jura Centre senator and former cantonal minister with substantial experience in cantonal finance and executive leadership.',
      birthDate: '1962-12-17',
      partyCode: 'The Centre',
      partyLabel: 'The Centre',
      cantonCode: 'JU',
      cantonName: 'Jura',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: [],
      careerHistory: [
        'President of the Jura parliament in 2006.',
        'Member of the Jura government from 2006 to 2019, serving several times as its president.',
        'President of the Swiss Conference of Cantonal Finance Directors from 2016 to 2019.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4240?lang=en',
        },
      ],
    },
    {
      id: 'legislative-beat-rieder',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 16,
      name: 'Beat Rieder',
      title: 'Member of the Council of States',
      summary:
        'Valais Centre senator and lawyer with party leadership roots in Upper Valais.',
      birthDate: '1963-02-12',
      partyCode: 'The Centre',
      partyLabel: 'The Centre',
      cantonCode: 'VS',
      cantonName: 'Valais',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Law degree (lic. iur.).'],
      careerHistory: ['Board member of the Centre current in Upper Valais.'],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4204?lang=en',
        },
      ],
    },
    {
      id: 'legislative-carlo-sommaruga',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 17,
      name: 'Carlo Sommaruga',
      title: 'Member of the Council of States',
      summary:
        'Geneva SP / PS senator and lawyer with a long record in municipal, cantonal, and international parliamentary work.',
      birthDate: '1959-07-08',
      partyCode: 'SP / PS',
      partyLabel: 'SP / PS',
      cantonCode: 'GE',
      cantonName: 'Geneva',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Law degree.', 'Bar admission.'],
      careerHistory: [
        'Served in the municipal legislature of Thônex from 1991 to 2001.',
        'Member of the Geneva cantonal legislature from 2001 to 2003.',
        'Co-leads parliamentary groups focused on human rights, international solidarity, and international Geneva.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/1120?lang=en',
        },
      ],
    },
    {
      id: 'legislative-jakob-stark',
      branchId: 'legislative',
      groupId: 'council-of-states',
      sortOrder: 18,
      name: 'Jakob Stark',
      title: 'Member of the Council of States',
      summary:
        'Thurgau SVP / UDC senator and former cantonal government member with deep local executive experience.',
      birthDate: '1958-09-08',
      partyCode: 'SVP / UDC',
      partyLabel: 'SVP / UDC',
      cantonCode: 'TG',
      cantonName: 'Thurgau',
      chamberId: 'council-of-states',
      chamberLabel: 'Council of States',
      education: ['Doctor of philosophy.'],
      careerHistory: [
        'Served as local mayor and in municipal leadership in Kradolf-Schönenberg.',
        'Member of the Thurgau Grand Council from 1996 to 2006.',
        'Member of the cantonal government from 2006 to 2020.',
      ],
      links: [
        {
          label: 'Official parliament profile',
          url: 'https://ws-old.parlament.ch/councillors/4241?lang=en',
        },
      ],
    },
    {
      id: 'judicial-francois-chaix',
      branchId: 'judicial',
      groupId: 'federal-supreme-court',
      sortOrder: 1,
      name: 'François Chaix',
      title: 'President of the Federal Supreme Court',
      summary:
        'President of the Federal Supreme Court, Geneva jurist, and former cantonal judge who joined the court in 2011.',
      birthDate: '1964-08-08',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      courtName: 'Federal Supreme Court of Switzerland',
      currentOfficeSince: 'President since 2025',
      roleChips: ['Court President'],
      education: [
        'Law degree, University of Geneva.',
        'LL.M., University of Trier.',
        'Doctor of law, University of Geneva.',
      ],
      careerHistory: [
        'Served as prosecutor, first-instance judge, police-court president, and appeals judge in Geneva.',
        'Substitute federal judge from 2002 before election as an ordinary federal judge in 2011.',
        'Vice President of the Federal Supreme Court from 2023 to 2024.',
      ],
      links: [
        {
          label: 'Official court profile',
          url:
            'https://www.bger.ch/cms/render/live/de/sites/tfl/home/federal/federal-richter/federal-richter-bundesrichter/federal-richter-bundesrichter-chaixfrancois.html',
        },
      ],
      notes: ['Swiss judicial biographies sometimes note party affiliation publicly; that does not map neatly onto a U.S.-style appointment story.'],
    },
    {
      id: 'judicial-francesco-parrino',
      branchId: 'judicial',
      groupId: 'federal-supreme-court',
      sortOrder: 2,
      name: 'Francesco Parrino',
      title: 'Vice President of the Federal Supreme Court',
      summary:
        'Vice President of the Federal Supreme Court, Ticino-born jurist trained in Neuchâtel, elected to the court in 2013.',
      birthDate: '1967-08-30',
      partyCode: 'SP / PS',
      partyLabel: 'SP / PS',
      courtName: 'Federal Supreme Court of Switzerland',
      currentOfficeSince: 'Vice President since 2025',
      roleChips: ['Court Vice President'],
      education: ['Law studies in Neuchâtel.', 'Bar admission in Neuchâtel.'],
      careerHistory: [
        'Worked in national spatial-planning and federal departmental legal roles.',
        'Led federal appeals bodies in old-age and disability insurance matters.',
        'Judge at the Federal Administrative Court from 2007 to 2013 before election to the Federal Supreme Court.',
      ],
      links: [
        {
          label: 'Official court profile',
          url:
            'https://www.bger.ch/cms/render/live/de/sites/tfl/home/federal/federal-richter/federal-richter-bundesrichter/federal-richter-bundesrichter-parrinofrancesco.html',
        },
      ],
      notes: ['Swiss judicial biographies sometimes note party affiliation publicly; that does not map neatly onto a U.S.-style appointment story.'],
    },
    {
      id: 'judicial-christina-kiss',
      branchId: 'judicial',
      groupId: 'federal-supreme-court',
      sortOrder: 3,
      name: 'Christina Kiss',
      title: 'Federal Supreme Court Judge',
      summary:
        'Federal Supreme Court judge in the First Civil Law Division, previously active in cantonal courts and the Federal Office of Justice.',
      birthDate: '1960-08-03',
      partyCode: 'FDP / PLR',
      partyLabel: 'FDP / PLR',
      courtName: 'Federal Supreme Court of Switzerland',
      currentOfficeSince: 'October 2003',
      education: ['Legal studies in Basel and Bern.', 'Doctor of law, University of Basel.'],
      careerHistory: [
        'Court clerk at the Basel-Landschaft Higher Court from 1990 to 1995.',
        'Worked on procedural-law reform at the Federal Office of Justice.',
        'Served on the constitutional, administrative, and cantonal courts of Basel-Landschaft before election to the Federal Supreme Court.',
      ],
      links: [
        {
          label: 'Official court profile',
          url:
            'https://www.bger.ch/cms/render/live/de/sites/tfl/home/federal/federal-richter/federal-richter-bundesrichter/federal-richter-bundesrichter-kisschristina.html',
        },
      ],
      notes: ['Party reference appears on the official court biography.'],
    },
    {
      id: 'judicial-julia-haenni',
      branchId: 'judicial',
      groupId: 'federal-supreme-court',
      sortOrder: 4,
      name: 'Julia Hänni',
      title: 'Federal Supreme Court Judge',
      summary:
        'Public-law judge with a strong academic profile in legal theory, European law, and energy law.',
      birthDate: '1977-05-29',
      partyCode: 'The Centre',
      partyLabel: 'The Centre',
      courtName: 'Federal Supreme Court of Switzerland',
      currentOfficeSince: 'June 2019',
      education: [
        'Law studies in Zurich.',
        'Doctoral studies in St. Gallen.',
        'Habilitation in law, University of Lucerne.',
      ],
      careerHistory: [
        'Assistant and senior academic roles at the Universities of Zurich and Fribourg.',
        'Court clerk at the Federal Supreme Court from 2012 to 2016.',
        'Assistant professor at the University of Lucerne and honorary professor in St. Gallen.',
      ],
      links: [
        {
          label: 'Official court profile',
          url:
            'https://www.bger.ch/cms/render/live/de/sites/tfl/home/federal/federal-richter/federal-richter-bundesrichter/hanni-julia-1.html',
        },
      ],
      notes: ['Party reference appears on the official court biography.'],
    },
    {
      id: 'judicial-susanne-bollinger',
      branchId: 'judicial',
      groupId: 'federal-supreme-court',
      sortOrder: 5,
      name: 'Susanne Bollinger',
      title: 'Federal Supreme Court Judge',
      summary:
        'Federal Supreme Court judge in public law, formerly court clerk at the court and vice-president of the Schaffhausen Higher Court.',
      birthDate: '1974-05-25',
      partyCode: 'SVP / UDC',
      partyLabel: 'SVP / UDC',
      courtName: 'Federal Supreme Court of Switzerland',
      currentOfficeSince: 'September 2024',
      education: [
        'Law studies at the University of Fribourg.',
        'Doctor of law, University of Lucerne.',
        'Judicial Academy certificate.',
      ],
      careerHistory: [
        'Worked in legal practice and tax advisory roles while studying.',
        'Court clerk at the Federal Supreme Court from 2002 to 2016.',
        'Vice President of the Higher Court of Schaffhausen from 2017 to 2024.',
      ],
      links: [
        {
          label: 'Official court profile',
          url:
            'https://www.bger.ch/cms/render/live/de/sites/tfl/home/federal/federal-richter/federal-richter-bundesrichter/bollinger-susanne.html',
        },
      ],
      notes: ['Party reference appears on the official court biography.'],
    },
    {
      id: 'judicial-yves-donzallaz',
      branchId: 'judicial',
      groupId: 'federal-supreme-court',
      sortOrder: 6,
      name: 'Yves Donzallaz',
      title: 'Federal Supreme Court Judge',
      summary:
        'Federal Supreme Court judge, former court president, legal academic, and lawyer-notary from Valais.',
      birthDate: '1961-11-26',
      partyCode: 'No party affiliation',
      partyLabel: 'No party affiliation',
      courtName: 'Federal Supreme Court of Switzerland',
      currentOfficeSince: 'March 2008',
      education: [
        'Law degree, University of Fribourg.',
        'Doctor of law, University of Fribourg.',
        'Notary and attorney qualifications in Valais.',
      ],
      careerHistory: [
        'Worked as a lawyer and notary in Martigny and Sion from 1987 to 2008.',
        'Taught at the Universities of Lausanne and Chambéry.',
        'Vice President of the Federal Supreme Court from 2021 to 2022 and President from 2023 to 2024.',
      ],
      links: [
        {
          label: 'Official court profile',
          url:
            'https://www.bger.ch/cms/render/live/de/sites/tfl/home/federal/federal-richter/federal-richter-bundesrichter/federal-richter-bundesrichter-donzallazyves.html',
        },
      ],
      notes: ['Official court biography says he was elected on an SVP / UDC proposal but now has no party affiliation.'],
    },
  ],
}
