import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const datasetPath = resolve('public/data/governmentData.json')
const biotechConnectionsPath = resolve('src/biotechConnections.ts')
const biotechMentionsPath = resolve('src/biotechMentionEvidence.ts')
const outPath = resolve('tmp/biotech-candidate-terms-audit.json')

const PHRASES = [
  'bioweapon',
  'bioweapons',
  'biosecurity',
  'biological threat',
  'biological threats',
  'embryo editing',
  'bioterrorism',
  'gain-of-function',
  'genetic engineering',
  'biological weapon',
  'biological weapons',
  'biodefense',
  'engineered pathogen',
]

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildPhraseRegex(phrase) {
  return new RegExp(`(^|[^A-Za-z])${escapeRegex(phrase)}([^A-Za-z]|$)`, 'i')
}

const PHRASE_REGEXES = PHRASES.map((phrase) => ({
  phrase,
  regex: buildPhraseRegex(phrase),
}))

function sha1(text) {
  return createHash('sha1').update(text).digest('hex')
}

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function pdfToText(pdfBuffer, url) {
  const path = resolve(tmpdir(), `biotech-candidate-${sha1(url)}.pdf`)
  try {
    writeFileSync(path, pdfBuffer)
    return execFileSync('pdftotext', [path, '-'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return ''
  } finally {
    try {
      unlinkSync(path)
    } catch {
      // ignore cleanup errors
    }
  }
}

async function fetchText(url) {
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(20000),
    })

    if (!response.ok) {
      return { ok: false, reason: `http_${response.status}`, text: '' }
    }

    const contentType = response.headers.get('content-type') ?? ''
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (/pdf/i.test(contentType) || /\.pdf(\?|$)/i.test(url)) {
      const probe = buffer.subarray(0, 8).toString('ascii')
      if (!probe.startsWith('%PDF-')) {
        return { ok: false, reason: 'not_pdf_payload', text: '' }
      }
      return {
        ok: true,
        reason: 'pdf',
        text: normalizeText(pdfToText(buffer, url)),
      }
    }

    return {
      ok: true,
      reason: 'html',
      text: normalizeText(stripHtml(new TextDecoder('utf-8', { fatal: false }).decode(buffer))),
    }
  } catch {
    return { ok: false, reason: 'fetch_error', text: '' }
  }
}

function extractCandidateEntries(text) {
  const entries = []
  const blocks = [...text.matchAll(/\{[\s\S]*?personId[s]?:[\s\S]*?\}/g)]

  for (const blockMatch of blocks) {
    const block = blockMatch[0]
    const personIds = [...block.matchAll(/personId[s]?:\s*(?:\[\s*([\s\S]*?)\s*\]|'([^']+)')/g)].flatMap(
      (match) => {
        if (match[2]) return [match[2]]
        return [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1])
      },
    )
    const urls = [...block.matchAll(/url:\s*'([^']+)'/g)].map((match) => match[1])

    if (personIds.length && urls.length) {
      entries.push({ personIds, urls })
    }
  }

  return entries
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (nextIndex < items.length) {
        const currentIndex = nextIndex
        nextIndex += 1
        results[currentIndex] = await mapper(items[currentIndex], currentIndex)
      }
    }),
  )

  return results
}

async function main() {
  mkdirSync(resolve('tmp'), { recursive: true })

  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const peopleById = new Map((dataset.people ?? []).map((person) => [person.id, person]))

  const entries = [
    ...extractCandidateEntries(readFileSync(biotechConnectionsPath, 'utf8')),
    ...extractCandidateEntries(readFileSync(biotechMentionsPath, 'utf8')),
  ]

  const pairs = []
  const seen = new Set()

  for (const entry of entries) {
    for (const personId of entry.personIds) {
      if (!peopleById.has(personId)) continue
      for (const url of entry.urls) {
        const key = `${personId}::${url}`
        if (seen.has(key)) continue
        seen.add(key)
        pairs.push({ personId, url })
      }
    }
  }

  const results = await mapWithConcurrency(pairs, 12, async ({ personId, url }, index) => {
    const person = peopleById.get(personId)
    const fetched = await fetchText(url)
    const hits = []

    if (fetched.ok && fetched.text) {
      for (const { phrase, regex } of PHRASE_REGEXES) {
        if (regex.test(fetched.text)) hits.push(phrase)
      }
    }

    process.stdout.write(`Checked ${index + 1}/${pairs.length}: ${person?.name ?? personId}\n`)

    return {
      personId,
      name: person?.name ?? personId,
      branchId: person?.branchId ?? '',
      sectionId: person?.sectionId ?? '',
      url,
      fetchStatus: fetched.reason,
      hits,
    }
  })

  const matched = results.filter((result) => result.hits.length > 0)
  const summary = {
    phrases: PHRASES,
    pairsScanned: results.length,
    pairsWithHits: matched.length,
    matched,
  }

  writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`)

  console.log(`Done. Pairs scanned: ${summary.pairsScanned}. Pairs with hits: ${summary.pairsWithHits}.`)
  console.log(`Wrote: ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
