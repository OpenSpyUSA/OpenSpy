import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolvePersonNaming, stripDiacritics } from './personNaming.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')

function getDisclosureSearchHint(name = '') {
  return stripDiacritics(name)
    .replace(/\b(Jr|Sr)\.?\b/gi, ' ')
    .replace(/\bII|III|IV|V\b/g, ' ')
    .replace(/[^A-Za-z\s-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .at(-1)
}

function applyDisclosureNaming(person) {
  const naming = resolvePersonNaming(person)
  const searchHint = getDisclosureSearchHint(
    naming.financialDisclosureSearchLastName ||
      naming.financialDisclosureSearchName ||
      naming.displayName,
  )

  return {
    ...person,
    aliases: naming.aliases,
    displayName: naming.displayName,
    financialDisclosureSearchHint: searchHint || person.financialDisclosureSearchHint,
    financialDisclosureSearchLastName: naming.financialDisclosureSearchLastName,
    financialDisclosureSearchName: naming.financialDisclosureSearchName,
    officialName: naming.officialName,
  }
}

function clearSenateFinancialSnapshot(person) {
  return {
    ...person,
    financialAnnualReportUrl: undefined,
    financialAnnualReportLabel: undefined,
    financialFilingDate: undefined,
    liabilities: undefined,
    recentTrades: undefined,
    topHoldings: undefined,
  }
}

const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
dataset.people = dataset.people.map(applyDisclosureNaming)

const senatePeople = dataset.people.filter((person) => person.sectionId === 'senate')
const rawOutput = execFileSync('python3', [resolve(__dirname, './fetch_legislative_finance.py')], {
  cwd: resolve(__dirname, '..'),
  encoding: 'utf8',
  input: JSON.stringify({ people: senatePeople }),
  maxBuffer: 24 * 1024 * 1024,
})
const financialDetailsById = JSON.parse(rawOutput)

dataset.people = dataset.people.map((person) => {
  if (person.sectionId !== 'senate') {
    return person
  }

  return {
    ...clearSenateFinancialSnapshot(person),
    ...(financialDetailsById[person.id] ?? {}),
  }
})

writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`)

const refreshedSenators = dataset.people.filter((person) => person.sectionId === 'senate')
const annualCount = refreshedSenators.filter((person) => person.financialAnnualReportUrl).length
const tradeCount = refreshedSenators.filter((person) => person.recentTrades?.length).length
const unresolved = refreshedSenators
  .filter((person) => !person.financialAnnualReportUrl)
  .map((person) => person.name)

console.log(`Refreshed ${refreshedSenators.length} senators.`)
console.log(`Annual reports present for ${annualCount}. Recent trades present for ${tradeCount}.`)
console.log(`Still missing annual reports for ${unresolved.length}: ${unresolved.join(', ')}`)
