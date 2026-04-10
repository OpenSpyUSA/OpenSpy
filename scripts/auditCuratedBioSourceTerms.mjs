import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const outPath = resolve('tmp/curated-bio-source-terms-sweep.json')
const files = [resolve('src/biotechConnections.ts'), resolve('src/biotechMentionEvidence.ts')]

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

const PHRASE_REGEXES = PHRASES.map((phrase) => ({ phrase, regex: buildPhraseRegex(phrase) }))

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

function buildSnippet(text, matchIndex, windowSize = 120) {
  const start = Math.max(0, matchIndex - windowSize)
  const end = Math.min(text.length, matchIndex + windowSize)
  return normalizeText(text.slice(start, end))
}

function pdfToText(pdfBuffer, url) {
  const path = resolve(tmpdir(), `curated-bio-${sha1(url)}.pdf`)
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

function collectCuratedUrls() {
  const map = new Map()

  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    const entries = [...text.matchAll(/personId[s]?:\s*(\[[\s\S]*?\]|'[^']+')([\s\S]*?)sources:\s*\[([\s\S]*?)\]/g)]

    for (const match of entries) {
      const personIdsBlock = match[1]
      const sourcesBlock = match[3]
      const personIds = [...personIdsBlock.matchAll(/'([^']+)'/g)].map((item) => item[1])
      const urls = [...sourcesBlock.matchAll(/url:\s*'([^']+)'/g)].map((item) => item[1])

      for (const url of urls) {
        if (!map.has(url)) {
          map.set(url, new Set())
        }
        for (const personId of personIds) {
          map.get(url).add(personId)
        }
      }
    }
  }

  return [...map.entries()].map(([url, personIds]) => ({
    url,
    personIds: [...personIds].sort(),
  }))
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

  const items = collectCuratedUrls()
  const results = await mapWithConcurrency(items, 10, async (item, index) => {
    const fetched = await fetchText(item.url)
    const hits = []

    if (fetched.ok && fetched.text) {
      for (const { phrase, regex } of PHRASE_REGEXES) {
        const match = regex.exec(fetched.text)
        if (match) {
          hits.push({
            phrase,
            snippet: buildSnippet(fetched.text, match.index),
          })
        }
      }
    }

    process.stdout.write(`Scanned ${index + 1}/${items.length}: ${item.url}\n`)

    return {
      ...item,
      fetchStatus: fetched.reason,
      hits,
    }
  })

  const matched = results.filter((item) => item.hits.length > 0)
  const summary = {
    phrases: PHRASES,
    urlsScanned: results.length,
    urlsWithHits: matched.length,
    matched,
  }

  writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`)

  console.log(`Done. URLs scanned: ${summary.urlsScanned}. URLs with hits: ${summary.urlsWithHits}.`)
  console.log(`Wrote: ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
