import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const outPath = resolve('tmp/biotech-candidate-source-audit.json')

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

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function snippetAround(text, phrase, windowSize = 120) {
  const lower = text.toLowerCase()
  const target = phrase.toLowerCase()
  const index = lower.indexOf(target)
  if (index === -1) return ''
  const start = Math.max(0, index - windowSize)
  const end = Math.min(text.length, index + target.length + windowSize)
  return text.slice(start, end).replace(/\s+/g, ' ').trim()
}

function pdfToText(pdfBuffer, url) {
  const path = resolve(tmpdir(), `candidate-bio-${sha1(url)}.pdf`)
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

function parseConnectionBlocks(text) {
  const records = []
  const blocks = [
    ...text.matchAll(
      /\{[\s\S]*?branchId: '([^']+)'[\s\S]*?category: '([^']+)'[\s\S]*?name: '([^']+)'[\s\S]*?personId: '([^']+)'[\s\S]*?sources: \[([\s\S]*?)\][\s\S]*?\},/g,
    ),
  ]
  for (const match of blocks) {
    const [, branchId, category, name, personId, sourcesBlock] = match
    const urls = [...sourcesBlock.matchAll(/url: '([^']+)'/g)].map((result) => result[1])
    records.push({
      branchId,
      category,
      name,
      personId,
      urls,
      source: 'biotechConnections',
    })
  }
  return records
}

function parseMentionBlocks(text) {
  const records = []
  const blocks = [
    ...text.matchAll(
      /\{[\s\S]*?id: '([^']+)'[\s\S]*?tier: '([^']+)'[\s\S]*?personIds: \[([\s\S]*?)\][\s\S]*?sources: \[([\s\S]*?)\][\s\S]*?\},/g,
    ),
  ]
  for (const match of blocks) {
    const [, id, tier, personIdsBlock, sourcesBlock] = match
    const personIds = [...personIdsBlock.matchAll(/'([^']+)'/g)].map((result) => result[1])
    const urls = [...sourcesBlock.matchAll(/url: '([^']+)'/g)].map((result) => result[1])
    records.push({
      id,
      tier,
      personIds,
      urls,
      source: 'biotechMentionEvidence',
    })
  }
  return records
}

async function main() {
  mkdirSync(resolve('tmp'), { recursive: true })

  const connectionRecords = parseConnectionBlocks(readFileSync(resolve('src/biotechConnections.ts'), 'utf8'))
  const mentionRecords = parseMentionBlocks(readFileSync(resolve('src/biotechMentionEvidence.ts'), 'utf8'))

  const urlToOwners = new Map()

  for (const record of connectionRecords) {
    for (const url of record.urls) {
      const owners = urlToOwners.get(url) ?? []
      owners.push({
        sourceFile: record.source,
        personId: record.personId,
        name: record.name,
        branchId: record.branchId,
        category: record.category,
      })
      urlToOwners.set(url, owners)
    }
  }

  for (const record of mentionRecords) {
    for (const url of record.urls) {
      const owners = urlToOwners.get(url) ?? []
      for (const personId of record.personIds) {
        owners.push({
          sourceFile: record.source,
          personId,
          tier: record.tier,
        })
      }
      urlToOwners.set(url, owners)
    }
  }

  const urls = [...urlToOwners.keys()]

  const scanned = await mapWithConcurrency(urls, 10, async (url, index) => {
    const fetched = await fetchText(url)
    const hits = []
    const snippets = []

    if (fetched.ok && fetched.text) {
      for (const { phrase, regex } of PHRASE_REGEXES) {
        if (regex.test(fetched.text)) {
          hits.push(phrase)
          snippets.push({ phrase, snippet: snippetAround(fetched.text, phrase) })
        }
      }
    }

    process.stdout.write(`Candidate source ${index + 1}/${urls.length}: ${url}\n`)

    return {
      url,
      fetchStatus: fetched.reason,
      hits,
      snippets,
      owners: urlToOwners.get(url) ?? [],
    }
  })

  const summary = {
    phrases: PHRASES,
    urlsScanned: scanned.length,
    urlsWithHits: scanned.filter((item) => item.hits.length > 0).length,
    scanned,
    matched: scanned.filter((item) => item.hits.length > 0),
  }

  writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`)

  console.log(`Done. URLs scanned: ${summary.urlsScanned}. URLs with hits: ${summary.urlsWithHits}.`)
  console.log(`Wrote: ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
