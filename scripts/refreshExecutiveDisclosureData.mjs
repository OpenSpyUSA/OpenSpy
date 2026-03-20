import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')

const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
const executivePeople = dataset.people.filter((person) => person.branchId === 'executive')

if (executivePeople.length === 0) {
  console.log('No executive profiles found.')
  process.exit(0)
}

const rawOutput = execFileSync('python3', [resolve(__dirname, './fetch_executive_finance.py')], {
  cwd: resolve(__dirname, '..'),
  encoding: 'utf8',
  input: JSON.stringify({ people: executivePeople }),
  maxBuffer: 32 * 1024 * 1024,
})
const financialDetailsById = JSON.parse(rawOutput)

dataset.people = dataset.people.map((person) => {
  if (person.branchId !== 'executive') {
    return person
  }

  return {
    ...person,
    financialAnnualReportLabel: undefined,
    financialAnnualReportUrl: undefined,
    financialFilingDate: undefined,
    liabilities: undefined,
    recentTrades: undefined,
    topHoldings: undefined,
    ...(financialDetailsById[person.id] ?? {}),
  }
})

writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`)

const refreshedExecutivePeople = dataset.people.filter((person) => person.branchId === 'executive')
const reportCount = refreshedExecutivePeople.filter((person) => person.financialAnnualReportUrl).length
const holdingsCount = refreshedExecutivePeople.filter((person) => person.topHoldings?.length).length
const liabilityCount = refreshedExecutivePeople.filter((person) => person.liabilities?.length).length
const tradeCount = refreshedExecutivePeople.filter((person) => person.recentTrades?.length).length

console.log(`Refreshed ${refreshedExecutivePeople.length} executive profiles.`)
console.log(`Disclosure reports present for ${reportCount}.`)
console.log(`Top holdings present for ${holdingsCount}.`)
console.log(`Liabilities present for ${liabilityCount}.`)
console.log(`Recent trades present for ${tradeCount}.`)
