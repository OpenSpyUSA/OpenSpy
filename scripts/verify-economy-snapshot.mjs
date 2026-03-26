import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = resolve(__dirname, '../public/data/governmentData.json')

const SHOULD_FIX = process.argv.includes('--fix')
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function round(value, digits) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function formatMonthLabel(dateOrMonthKey) {
  const [year, month] = dateOrMonthKey.slice(0, 7).split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${String(year).slice(-2)}`
}

function formatQuarterLabel(dateStr) {
  const [year, month] = dateStr.split('-').map(Number)
  const quarter = Math.floor((month - 1) / 3) + 1
  return `Q${quarter} ${String(year).slice(-2)}`
}

function formatLongDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`
}

function comparePoints(left, right) {
  if (!left || !right) {
    return false
  }

  return left.label === right.label && Math.abs(Number(left.value) - Number(right.value)) <= 1e-9
}

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return response.text()
}

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return response.json()
}

async function fetchFredCsv(seriesId, cosd = '2014-01-01') {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(seriesId)}&cosd=${cosd}`
  const text = await fetchText(url)

  return text
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const separatorIndex = line.indexOf(',')
      return {
        date: line.slice(0, separatorIndex),
        value: line.slice(separatorIndex + 1),
      }
    })
    .filter((row) => row.value && row.value !== '.')
}

async function fetchTreasuryDebtRows() {
  const url =
    'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?fields=record_date,tot_pub_debt_out_amt&filter=record_date:gte:2014-01-01&sort=record_date&page[size]=5000&format=json'
  const payload = await fetchJson(url)

  return (payload.data ?? [])
    .map((row) => ({
      date: row.record_date,
      value: row.tot_pub_debt_out_amt,
    }))
    .filter((row) => row.value)
}

async function fetchTreasuryTenYearRows(startYear, endYear) {
  const allRows = []

  for (let year = startYear; year <= endYear; year += 1) {
    const url =
      `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?` +
      `data=daily_treasury_yield_curve&field_tdr_date_value=${year}`
    const text = await fetchText(url)
    const entryBlocks = [...text.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => match[1])

    for (const entry of entryBlocks) {
      const dateMatch = entry.match(/<d:NEW_DATE m:type="Edm.DateTime">([^<]+)<\/d:NEW_DATE>/)
      const valueMatch = entry.match(/<d:BC_10YEAR m:type="Edm.Double">([^<]+)<\/d:BC_10YEAR>/)
      if (!dateMatch || !valueMatch || !valueMatch[1]) {
        continue
      }

      allRows.push({
        date: dateMatch[1].slice(0, 10),
        value: valueMatch[1],
      })
    }
  }

  return allRows.sort((left, right) => left.date.localeCompare(right.date))
}

function buildMonthlyLast(rows, digits, transform = (value) => value) {
  const byMonth = new Map()

  for (const row of rows) {
    byMonth.set(row.date.slice(0, 7), transform(Number(row.value)))
  }

  return [...byMonth.entries()]
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([monthKey, value]) => ({
      label: formatMonthLabel(monthKey),
      value: round(value, digits),
    }))
}

function buildMonthlyDirect(rows, digits, transform = (value) => value) {
  return rows.map((row) => ({
    label: formatMonthLabel(row.date),
    value: round(transform(Number(row.value)), digits),
  }))
}

function buildMonthlyChange(rows, digits, transform = (current, previous) => current - previous) {
  const points = []

  for (let index = 1; index < rows.length; index += 1) {
    const current = Number(rows[index].value)
    const previous = Number(rows[index - 1].value)
    points.push({
      label: formatMonthLabel(rows[index].date),
      value: round(transform(current, previous), digits),
    })
  }

  return points
}

function buildMonthlyYearOverYear(rows, digits) {
  const points = []

  for (let index = 12; index < rows.length; index += 1) {
    const current = Number(rows[index].value)
    const previous = Number(rows[index - 12].value)
    points.push({
      label: formatMonthLabel(rows[index].date),
      value: round(((current / previous) - 1) * 100, digits),
    })
  }

  return points
}

function buildQuarterlyDirect(rows, digits, transform = (value) => value) {
  return rows.map((row) => ({
    label: formatQuarterLabel(row.date),
    value: round(transform(Number(row.value)), digits),
  }))
}

function formatTreasuryValue(value) {
  return `${Number(value).toFixed(2)}%`
}

async function buildExpectedHistories() {
  const currentYear = new Date().getUTCFullYear()

  const [
    gdpc1,
    personalIncome,
    payrollJobs,
    unemploymentRate,
    laborForceParticipation,
    cpi,
    fedFundsLower,
    fedFundsUpper,
    sp500,
    dow,
    wti,
    brent,
    gasoline,
    tradeBalance,
    federalReceipts,
    federalOutlays,
    federalDeficit,
    debtRows,
    treasuryTenYearRows,
  ] = await Promise.all([
    fetchFredCsv('GDPC1'),
    fetchFredCsv('PI'),
    fetchFredCsv('PAYEMS'),
    fetchFredCsv('UNRATE'),
    fetchFredCsv('CIVPART'),
    fetchFredCsv('CPIAUCSL'),
    fetchFredCsv('DFEDTARL'),
    fetchFredCsv('DFEDTARU'),
    fetchFredCsv('SP500'),
    fetchFredCsv('DJIA'),
    fetchFredCsv('DCOILWTICO'),
    fetchFredCsv('DCOILBRENTEU'),
    fetchFredCsv('GASREGW'),
    fetchFredCsv('BOPGSTB'),
    fetchFredCsv('MTSR133FMS'),
    fetchFredCsv('MTSO133FMS'),
    fetchFredCsv('MTSDS133FMS'),
    fetchTreasuryDebtRows(),
    fetchTreasuryTenYearRows(currentYear - 11, currentYear),
  ])

  const fedLowerByMonth = new Map()
  const fedUpperByMonth = new Map()

  for (const row of fedFundsLower) {
    fedLowerByMonth.set(row.date.slice(0, 7), Number(row.value))
  }

  for (const row of fedFundsUpper) {
    fedUpperByMonth.set(row.date.slice(0, 7), Number(row.value))
  }

  const fedFundsSeries = [...fedLowerByMonth.keys()]
    .filter((monthKey) => fedUpperByMonth.has(monthKey))
    .sort()
    .map((monthKey) => ({
      label: formatMonthLabel(monthKey),
      value: round((fedLowerByMonth.get(monthKey) + fedUpperByMonth.get(monthKey)) / 2, 3),
    }))

  const latestTreasuryTenYear = treasuryTenYearRows.at(-1)

  return new Map([
    [
      'real-gdp',
      {
        history: buildQuarterlyDirect(gdpc1, 2, (value) => value / 1000).slice(-40),
      },
    ],
    [
      'personal-income',
      {
        history: buildMonthlyChange(
          personalIncome,
          2,
          (current, previous) => ((current / previous) - 1) * 100,
        ).slice(-120),
      },
    ],
    [
      'payroll-jobs',
      {
        history: buildMonthlyChange(payrollJobs, 0, (current, previous) => current - previous).slice(
          -120,
        ),
      },
    ],
    [
      'unemployment-rate',
      {
        history: buildMonthlyDirect(unemploymentRate, 1).slice(-120),
      },
    ],
    [
      'labor-force-participation',
      {
        history: buildMonthlyDirect(laborForceParticipation, 1).slice(-120),
      },
    ],
    [
      'cpi-inflation',
      {
        history: buildMonthlyYearOverYear(cpi, 2).slice(-120),
      },
    ],
    [
      'fed-funds-rate',
      {
        history: fedFundsSeries.slice(-120),
      },
    ],
    [
      'ten-year-treasury',
      {
        history: buildMonthlyLast(treasuryTenYearRows, 2).slice(-120),
        latestValue: latestTreasuryTenYear ? formatTreasuryValue(latestTreasuryTenYear.value) : null,
        sourceDate: latestTreasuryTenYear ? formatLongDate(latestTreasuryTenYear.date) : null,
      },
    ],
    [
      'sp500',
      {
        history: buildMonthlyLast(sp500, 2).slice(-120),
      },
    ],
    [
      'dow',
      {
        history: buildMonthlyLast(dow, 2).slice(-120),
      },
    ],
    [
      'wti-crude',
      {
        history: buildMonthlyLast(wti, 2).slice(-120),
      },
    ],
    [
      'brent-crude',
      {
        history: buildMonthlyLast(brent, 2).slice(-120),
      },
    ],
    [
      'gasoline-price',
      {
        history: buildMonthlyLast(gasoline, 3).slice(-120),
      },
    ],
    [
      'trade-balance',
      {
        history: buildMonthlyDirect(tradeBalance, 3, (value) => value / 1000).slice(-120),
      },
    ],
    [
      'federal-receipts',
      {
        history: buildMonthlyDirect(federalReceipts, 3, (value) => value / 1000).slice(-120),
      },
    ],
    [
      'federal-outlays',
      {
        history: buildMonthlyDirect(federalOutlays, 3, (value) => value / 1000).slice(-120),
      },
    ],
    [
      'federal-deficit',
      {
        history: buildMonthlyDirect(federalDeficit, 3, (value) => value / 1000).slice(-120),
      },
    ],
    [
      'public-debt',
      {
        history: buildMonthlyLast(debtRows, 3, (value) => value / 1_000_000_000_000).slice(-120),
      },
    ],
  ])
}

async function main() {
  const dataset = JSON.parse(readFileSync(DATA_PATH, 'utf8'))
  const metrics = dataset.economySnapshot ?? []
  const metricsById = new Map(metrics.map((metric) => [metric.id, metric]))
  const expectedById = await buildExpectedHistories()

  const mismatchedMetrics = []
  let totalPointMismatches = 0

  for (const [metricId, expected] of expectedById.entries()) {
    const metric = metricsById.get(metricId)
    if (!metric) {
      mismatchedMetrics.push({ metricId, reason: 'missing metric', sample: [] })
      totalPointMismatches += 1
      console.log(`MISSING ${metricId}`)
      continue
    }

    const storedHistory = metric.history ?? []
    const expectedHistory = expected.history
    const mismatches = []

    if (storedHistory.length !== expectedHistory.length) {
      mismatches.push({
        kind: 'length',
        stored: storedHistory.length,
        expected: expectedHistory.length,
      })
    }

    const maxLength = Math.max(storedHistory.length, expectedHistory.length)
    for (let index = 0; index < maxLength; index += 1) {
      if (!comparePoints(storedHistory[index], expectedHistory[index])) {
        mismatches.push({
          kind: 'point',
          index,
          stored: storedHistory[index] ?? null,
          expected: expectedHistory[index] ?? null,
        })
      }
    }

    if (mismatches.length === 0) {
      console.log(
        `OK ${metricId} (${storedHistory.length} points, ${storedHistory[0]?.label} -> ${storedHistory.at(-1)?.label})`,
      )
      continue
    }

    totalPointMismatches += mismatches.filter((entry) => entry.kind === 'point').length
    mismatchedMetrics.push({
      metricId,
      reason: 'history mismatch',
      sample: mismatches.slice(0, 5),
      pointMismatches: mismatches.filter((entry) => entry.kind === 'point').length,
    })

    console.log(
      `MISMATCH ${metricId} (${mismatches.filter((entry) => entry.kind === 'point').length} point mismatches)`,
    )
    for (const entry of mismatches.slice(0, 5)) {
      console.log(JSON.stringify(entry))
    }

    if (SHOULD_FIX) {
      metric.history = expectedHistory

      if (expected.latestValue) {
        metric.value = expected.latestValue
      }

      if (expected.sourceDate) {
        metric.sourceDate = expected.sourceDate
      }
    }
  }

  if (SHOULD_FIX && mismatchedMetrics.length > 0) {
    writeFileSync(DATA_PATH, `${JSON.stringify(dataset, null, 2)}\n`)
    console.log(`\nUpdated ${DATA_PATH}`)
  }

  console.log(
    `\nAudit complete: ${expectedById.size - mismatchedMetrics.length} clean, ${mismatchedMetrics.length} mismatched, ${totalPointMismatches} point mismatches.`,
  )

  if (mismatchedMetrics.length > 0 && !SHOULD_FIX) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
