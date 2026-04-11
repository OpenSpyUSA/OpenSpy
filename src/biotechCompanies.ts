import type { SourceLink } from './types'

export type BiotechCompanyCategory =
  | 'Biomanufacturing / CDMO'
  | 'Biotech / Biopharma'
  | 'Diagnostics & Tools'
  | 'Medtech'
  | 'Big Pharma'

export type BiotechCompany = {
  category: BiotechCompanyCategory
  headquarters: string
  id: string
  mainProducts: string[]
  marketCapBillions: number
  marketCapLabel: string
  name: string
  sources: SourceLink[]
  summary: string
  ticker: string
}

export const BIOTECH_COMPANIES: BiotechCompany[] = [
  {
    category: 'Big Pharma',
    headquarters: 'Indianapolis, United States',
    id: 'eli-lilly',
    mainProducts: ['Mounjaro', 'Zepbound', 'Verzenio', 'Trulicity'],
    marketCapBillions: 840.84,
    marketCapLabel: '$840.84B',
    name: 'Eli Lilly',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/eli-lilly/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.lilly.com/',
      },
    ],
    summary:
      'A global pharma heavyweight built around obesity, diabetes, oncology, immunology, and neuroscience franchises.',
    ticker: 'NYSE: LLY',
  },
  {
    category: 'Big Pharma',
    headquarters: 'New Brunswick, United States',
    id: 'johnson-and-johnson',
    mainProducts: ['Darzalex', 'Tremfya', 'medtech devices', 'surgical systems'],
    marketCapBillions: 574.66,
    marketCapLabel: '$574.66B',
    name: 'Johnson & Johnson',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/johnson-and-johnson/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.jnj.com/',
      },
    ],
    summary:
      'A diversified giant spanning branded pharmaceuticals plus a large medtech business in surgery, orthopedics, and cardiovascular care.',
    ticker: 'NYSE: JNJ',
  },
  {
    category: 'Big Pharma',
    headquarters: 'North Chicago, United States',
    id: 'abbvie',
    mainProducts: ['Skyrizi', 'Rinvoq', 'Botox', 'Vraylar'],
    marketCapBillions: 367.79,
    marketCapLabel: '$367.79B',
    name: 'AbbVie',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/abbvie/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.abbvie.com/',
      },
    ],
    summary:
      'A top-tier drugmaker centered on immunology, aesthetics, neuroscience, and oncology with major cash-generating franchises.',
    ticker: 'NYSE: ABBV',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Basel, Switzerland',
    id: 'roche',
    mainProducts: ['Ocrevus', 'Hemlibra', 'Tecentriq', 'diagnostics platforms'],
    marketCapBillions: 331.51,
    marketCapLabel: '$331.51B',
    name: 'Roche',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/roche/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.roche.com/',
      },
    ],
    summary:
      'A Swiss pharma and diagnostics leader with major strength in oncology, neurology, hemophilia, and clinical testing systems.',
    ticker: 'SIX: ROG',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Cambridge, United Kingdom',
    id: 'astrazeneca',
    mainProducts: ['Tagrisso', 'Imfinzi', 'Farxiga', 'Alexion rare-disease portfolio'],
    marketCapBillions: 316.3,
    marketCapLabel: '$316.30B',
    name: 'AstraZeneca',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/astrazeneca/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.astrazeneca.com/',
      },
    ],
    summary:
      'A global drugmaker with major franchises in oncology, rare disease, cardiovascular-metabolic disease, and respiratory care.',
    ticker: 'LSE: AZN',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Rahway, United States',
    id: 'merck-co',
    mainProducts: ['Keytruda', 'Gardasil', 'Winrevair', 'animal health'],
    marketCapBillions: 300.19,
    marketCapLabel: '$300.19B',
    name: 'Merck & Co.',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/merck/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.merck.com/',
      },
    ],
    summary:
      'A major U.S. pharma group led by blockbuster oncology, vaccine, and cardiopulmonary assets, with a sizable animal-health arm.',
    ticker: 'NYSE: MRK',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Basel, Switzerland',
    id: 'novartis',
    mainProducts: ['Entresto', 'Cosentyx', 'Kisqali', 'Pluvicto'],
    marketCapBillions: 297.35,
    marketCapLabel: '$297.35B',
    name: 'Novartis',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/novartis/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.novartis.com/',
      },
    ],
    summary:
      'A large innovative-medicines company with cardiovascular, immunology, radioligand, and oncology franchises.',
    ticker: 'SIX: NOVN',
  },
  {
    category: 'Biotech / Biopharma',
    headquarters: 'Thousand Oaks, United States',
    id: 'amgen',
    mainProducts: ['Prolia / Xgeva', 'Repatha', 'Evenity', 'blinatumomab franchise'],
    marketCapBillions: 189.22,
    marketCapLabel: '$189.22B',
    name: 'Amgen',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/amgen/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.amgen.com/',
      },
    ],
    summary:
      'One of the largest standalone biopharma companies, spanning bone health, cardiometabolic disease, inflammation, and oncology.',
    ticker: 'NASDAQ: AMGN',
  },
  {
    category: 'Diagnostics & Tools',
    headquarters: 'Waltham, United States',
    id: 'thermo-fisher-scientific',
    mainProducts: ['analytical instruments', 'bioproduction systems', 'clinical research services', 'specialty diagnostics'],
    marketCapBillions: 184.36,
    marketCapLabel: '$184.36B',
    name: 'Thermo Fisher Scientific',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/thermo-fisher-scientific/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.thermofisher.com/',
      },
    ],
    summary:
      'A life-science infrastructure giant supplying instruments, diagnostics, lab consumables, and outsourced research and manufacturing services.',
    ticker: 'NYSE: TMO',
  },
  {
    category: 'Medtech',
    headquarters: 'Abbott Park, United States',
    id: 'abbott',
    mainProducts: ['FreeStyle Libre', 'diagnostics systems', 'cardiovascular devices', 'nutrition brands'],
    marketCapBillions: 174.28,
    marketCapLabel: '$174.28B',
    name: 'Abbott',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/abbott-laboratories/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.abbott.com/',
      },
    ],
    summary:
      'A diversified medtech and diagnostics company anchored by glucose monitoring, cardiovascular devices, diagnostics, and nutrition.',
    ticker: 'NYSE: ABT',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Bagsvaerd, Denmark',
    id: 'novo-nordisk',
    mainProducts: ['Ozempic', 'Wegovy', 'Rybelsus', 'insulin portfolio'],
    marketCapBillions: 167.44,
    marketCapLabel: '$167.44B',
    name: 'Novo Nordisk',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/novo-nordisk/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.novonordisk.com/',
      },
    ],
    summary:
      'A global diabetes and obesity leader with GLP-1 medicines plus a large inherited insulin franchise.',
    ticker: 'CPH: NOVO-B',
  },
  {
    category: 'Medtech',
    headquarters: 'Sunnyvale, United States',
    id: 'intuitive-surgical',
    mainProducts: ['da Vinci surgical system', 'Ion endoluminal system'],
    marketCapBillions: 160.04,
    marketCapLabel: '$160.04B',
    name: 'Intuitive Surgical',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/intuitive-surgical/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.intuitive.com/',
      },
    ],
    summary:
      'The dominant surgical-robotics company, best known for the da Vinci platform and recurring procedure-driven economics.',
    ticker: 'NASDAQ: ISRG',
  },
  {
    category: 'Big Pharma',
    headquarters: 'New York, United States',
    id: 'pfizer',
    mainProducts: ['Comirnaty', 'Paxlovid', 'Vyndaqel', 'Prevnar family'],
    marketCapBillions: 153.13,
    marketCapLabel: '$153.13B',
    name: 'Pfizer',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/pfizer/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.pfizer.com/',
      },
    ],
    summary:
      'A large multinational drugmaker with major vaccine, rare-disease, oncology, and primary-care franchises.',
    ticker: 'NYSE: PFE',
  },
  {
    category: 'Diagnostics & Tools',
    headquarters: 'Washington, D.C., United States',
    id: 'danaher',
    mainProducts: ['Cytiva', 'Cepheid', 'Beckman Coulter', 'Leica Microsystems'],
    marketCapBillions: 134.18,
    marketCapLabel: '$134.18B',
    name: 'Danaher',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/danaher/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.danaher.com/',
      },
    ],
    summary:
      'A high-end life-science and diagnostics platform company whose operating businesses are deeply embedded in research and bioprocessing workflows.',
    ticker: 'NYSE: DHR',
  },
  {
    category: 'Medtech',
    headquarters: 'Kalamazoo, United States',
    id: 'stryker',
    mainProducts: ['orthopedic implants', 'MAKO robotics', 'surgical equipment', 'neurotechnology'],
    marketCapBillions: 129.88,
    marketCapLabel: '$129.88B',
    name: 'Stryker',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/stryker-corporation/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.stryker.com/',
      },
    ],
    summary:
      'A leading medtech company in orthopedics, robotics, hospital equipment, and neurovascular products.',
    ticker: 'NYSE: SYK',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Princeton, United States',
    id: 'bristol-myers-squibb',
    mainProducts: ['Opdivo', 'Eliquis', 'Reblozyl', 'cell therapy portfolio'],
    marketCapBillions: 119.68,
    marketCapLabel: '$119.68B',
    name: 'Bristol Myers Squibb',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/bristol-myers-squibb/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.bms.com/',
      },
    ],
    summary:
      'A global pharma group anchored by immuno-oncology, cardiovascular medicines, hematology, and cell therapy.',
    ticker: 'NYSE: BMY',
  },
  {
    category: 'Big Pharma',
    headquarters: 'London, United Kingdom',
    id: 'gsk',
    mainProducts: ['Shingrix', 'ViiV HIV portfolio', 'respiratory medicines', 'specialty medicines'],
    marketCapBillions: 116.3,
    marketCapLabel: '$116.30B',
    name: 'GSK',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/glaxo-smith-kline/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.gsk.com/',
      },
    ],
    summary:
      'A British drugmaker with strong vaccine economics, HIV exposure through ViiV, and a broad specialty-medicines portfolio.',
    ticker: 'LSE: GSK',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Paris, France',
    id: 'sanofi',
    mainProducts: ['Dupixent', 'Beyfortus', 'vaccines', 'rare-disease medicines'],
    marketCapBillions: 113.87,
    marketCapLabel: '$113.87B',
    name: 'Sanofi',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/sanofi/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.sanofi.com/',
      },
    ],
    summary:
      'A French pharma major spanning specialty care, rare disease, immunology, and one of the world’s largest vaccine businesses.',
    ticker: 'EPA: SAN',
  },
  {
    category: 'Medtech',
    headquarters: 'Galway, Ireland',
    id: 'medtronic',
    mainProducts: ['cardiac devices', 'insulin pumps', 'neuroscience implants', 'surgical technologies'],
    marketCapBillions: 111.96,
    marketCapLabel: '$111.96B',
    name: 'Medtronic',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/medtronic/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.medtronic.com/',
      },
    ],
    summary:
      'One of the largest medtech companies in the world, covering cardiovascular, diabetes, neuroscience, and surgical platforms.',
    ticker: 'NYSE: MDT',
  },
  {
    category: 'Biotech / Biopharma',
    headquarters: 'Boston, United States',
    id: 'vertex-pharmaceuticals',
    mainProducts: ['Trikafta / Kaftrio', 'Casgevy', 'Journavx'],
    marketCapBillions: 110.96,
    marketCapLabel: '$110.96B',
    name: 'Vertex Pharmaceuticals',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/vertex-pharmaceuticals/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.vrtx.com/',
      },
    ],
    summary:
      'A rare-disease and genetic-medicine specialist best known for cystic-fibrosis dominance and its move into CRISPR-based therapies.',
    ticker: 'NASDAQ: VRTX',
  },
  {
    category: 'Medtech',
    headquarters: 'Marlborough, United States',
    id: 'boston-scientific',
    mainProducts: ['Watchman', 'electrophysiology devices', 'interventional cardiology', 'urology systems'],
    marketCapBillions: 91.83,
    marketCapLabel: '$91.83B',
    name: 'Boston Scientific',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/boston-scientific/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.bostonscientific.com/',
      },
    ],
    summary:
      'A fast-growing medtech name in cardiovascular devices, electrophysiology, structural heart, and urology.',
    ticker: 'NYSE: BSX',
  },
  {
    category: 'Biotech / Biopharma',
    headquarters: 'Tarrytown, United States',
    id: 'regeneron',
    mainProducts: ['Eylea', 'Dupixent', 'Libtayo', 'antibody platform'],
    marketCapBillions: 79.17,
    marketCapLabel: '$79.17B',
    name: 'Regeneron',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/regeneron-pharmaceuticals/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.regeneron.com/',
      },
    ],
    summary:
      'A leading antibody-focused biopharma company with major ophthalmology, immunology, and oncology exposure.',
    ticker: 'NASDAQ: REGN',
  },
  {
    category: 'Big Pharma',
    headquarters: 'Tokyo, Japan',
    id: 'takeda',
    mainProducts: ['Entyvio', 'plasma-derived therapies', 'rare-disease medicines', 'oncology'],
    marketCapBillions: 57.11,
    marketCapLabel: '$57.11B',
    name: 'Takeda',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/takeda-pharmaceutical/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.takeda.com/',
      },
    ],
    summary:
      'Japan’s biggest pharma name, with major gastrointestinal, rare-disease, plasma, and oncology assets.',
    ticker: 'TSE: 4502',
  },
  {
    category: 'Medtech',
    headquarters: 'Erlangen, Germany',
    id: 'siemens-healthineers',
    mainProducts: ['MRI / CT imaging', 'lab diagnostics', 'Varian radiation oncology'],
    marketCapBillions: 49.45,
    marketCapLabel: '$49.45B',
    name: 'Siemens Healthineers',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/siemens-healthineers/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.siemens-healthineers.com/',
      },
    ],
    summary:
      'A global medtech platform covering medical imaging, diagnostics, and radiation-oncology infrastructure.',
    ticker: 'ETR: SHL',
  },
  {
    category: 'Biomanufacturing / CDMO',
    headquarters: 'Incheon, South Korea',
    id: 'samsung-biologics',
    mainProducts: ['contract biologics manufacturing', 'fill-finish services', 'large-scale bioreactor capacity'],
    marketCapBillions: 48.99,
    marketCapLabel: '$48.99B',
    name: 'Samsung Biologics',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/samsung-biologics/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.samsungbiologics.com/',
      },
    ],
    summary:
      'One of the world’s largest biologics manufacturing platforms, important as outsourced capacity for drug developers.',
    ticker: 'KRX: 207940',
  },
  {
    category: 'Biotech / Biopharma',
    headquarters: 'Melbourne, Australia',
    id: 'csl',
    mainProducts: ['plasma therapies', 'Seqirus vaccines', 'specialty biotech medicines'],
    marketCapBillions: 47.77,
    marketCapLabel: '$47.77B',
    name: 'CSL',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/csl/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.csl.com/',
      },
    ],
    summary:
      'A major Australia-based biopharma group centered on plasma-derived medicines, vaccines, and specialty therapeutics.',
    ticker: 'ASX: CSL',
  },
  {
    category: 'Biomanufacturing / CDMO',
    headquarters: 'Basel, Switzerland',
    id: 'lonza',
    mainProducts: ['biologics manufacturing', 'cell and gene therapy services', 'drug-product services'],
    marketCapBillions: 45.55,
    marketCapLabel: '$45.55B',
    name: 'Lonza',
    sources: [
      {
        dateLabel: 'Apr 2026',
        label: 'Market value source',
        locationLabel: 'CompaniesMarketCap',
        url: 'https://companiesmarketcap.com/lonza/marketcap/',
      },
      {
        label: 'Official site',
        locationLabel: 'Company website',
        url: 'https://www.lonza.com/',
      },
    ],
    summary:
      'A Swiss CDMO and life-science manufacturing company deeply embedded in outsourced biologics and advanced-therapy production.',
    ticker: 'SIX: LONN',
  },
]
