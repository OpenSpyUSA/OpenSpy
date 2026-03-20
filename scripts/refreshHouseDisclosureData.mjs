import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolvePersonNaming, stripDiacritics } from './personNaming.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')
const targetNames = new Set(
  (process.env.TARGET_NAMES || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
)

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

const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
dataset.people = dataset.people.map((person) =>
  person.sectionId === 'house' ? applyDisclosureNaming(person) : person,
)

const targets = dataset.people.filter(
  (person) =>
    person.sectionId === 'house' && (targetNames.size === 0 || targetNames.has(person.name)),
)

if (targets.length === 0) {
  console.log('No matching House targets.')
  process.exit(0)
}

const rawOutput = execFileSync('python3', [resolve(__dirname, './fetch_legislative_finance.py')], {
  cwd: resolve(__dirname, '..'),
  encoding: 'utf8',
  input: JSON.stringify({ people: targets }),
  maxBuffer: 24 * 1024 * 1024,
})
const financialDetailsById = JSON.parse(rawOutput)

dataset.people = dataset.people.map((person) => {
  if (person.sectionId !== 'house' || (targetNames.size > 0 && !targetNames.has(person.name))) {
    return person
  }

  return {
    ...person,
    financialAnnualReportUrl: undefined,
    financialFilingDate: undefined,
    liabilities: undefined,
    recentTrades: undefined,
    topHoldings: undefined,
    ...(financialDetailsById[person.id] ?? {}),
  }
})

writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`)

const refreshedTargets = dataset.people.filter(
  (person) => person.sectionId === 'house' && (targetNames.size === 0 || targetNames.has(person.name)),
)
const annualCount = refreshedTargets.filter((person) => person.financialAnnualReportUrl).length

console.log(`Refreshed ${refreshedTargets.length} House members.`)
console.log(`Annual reports present for ${annualCount}.`)
