import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const datasetPath = resolve('public/data/governmentData.json')
const biotechConnectionsPath = resolve('src/biotechConnections.ts')
const biotechMentionEvidencePath = resolve('src/biotechMentionEvidence.ts')
const outPath = resolve('tmp/executive-bio-gap-audit.json')

// Exact whole-word / whole-phrase targets (case-insensitive).
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
  'biothreat',
  'biothreats',
  'bio-weapon',
  'bio weapon',
  'bioweaponization',
]

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildPhraseRegex(phrase) {
  // "Whole-word" across ASCII letters only (matches our earlier audit style).
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

function buildSnippet(text, matchIndex, windowSize = 140) {
  const start = Math.max(0, matchIndex - windowSize)
  const end = Math.min(text.length, matchIndex + windowSize)
  return normalizeText(text.slice(start, end))
}

function pdfToText(pdfBuffer, url) {
  const path = resolve(tmpdir(), `exec-bio-${sha1(url)}.pdf`)
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
      signal: AbortSignal.timeout(25000),
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

function buildCuratedUrlMap() {
  const map = new Map()

  const biotechConnectionsText = readFileSync(biotechConnectionsPath, 'utf8')
  const biotechConnectionBlocks = biotechConnectionsText.matchAll(
    /\{[\s\S]*?personId: '([^']+)'[\s\S]*?sources: \[([\s\S]*?)\][\s\S]*?\},/g,
  )

  for (const match of biotechConnectionBlocks) {
    const personId = match[1]
    const urls = [...match[2].matchAll(/url: '([^']+)'/g)].map((entry) => entry[1])
    if (!map.has(personId)) map.set(personId, new Set())
    for (const url of urls) map.get(personId).add(url)
  }

  const mentionEvidenceText = readFileSync(biotechMentionEvidencePath, 'utf8')
  const mentionBlocks = mentionEvidenceText.matchAll(
    /\{[\s\S]*?personIds: \[([\s\S]*?)\][\s\S]*?sources: \[([\s\S]*?)\][\s\S]*?\},/g,
  )

  for (const match of mentionBlocks) {
    const personIds = [...match[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1])
    const urls = [...match[2].matchAll(/url: '([^']+)'/g)].map((entry) => entry[1])
    for (const personId of personIds) {
      if (!map.has(personId)) map.set(personId, new Set())
      for (const url of urls) map.get(personId).add(url)
    }
  }

  return new Map([...map.entries()].map(([personId, urls]) => [personId, [...urls]]))
}

function inferSourceType(url) {
  try {
    const u = new URL(url)
    const host = u.hostname.toLowerCase()

    if (host.endsWith('congress.gov') || host.endsWith('govinfo.gov') || host.endsWith('gao.gov')) {
      return 'congressional/government record'
    }

    if (host.endsWith('whitehouse.gov') || host.endsWith('.gov') || host.endsWith('.mil')) {
      // Default .gov/.mil bucket; we refine manually later if needed.
      return 'official office page'
    }

    if (host.endsWith('senate.gov') || host.endsWith('house.gov')) {
      return 'official office page'
    }

    if (host.includes('youtube.com') || host.includes('youtu.be') || host.includes('c-span.org') || host.includes('cspan.org')) {
      return 'direct video'
    }

    return 'media quote / secondary report'
  } catch {
    return 'media quote / secondary report'
  }
}

async function main() {
  mkdirSync(resolve('tmp'), { recursive: true })

  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const people = (dataset.people ?? []).filter((person) => person.branchId === 'executive')
  const curatedUrlMap = buildCuratedUrlMap()

  const results = await mapWithConcurrency(people, 10, async (person, index) => {
    const urlEntries = [
      ...[person.sourceUrl, person.website]
        .filter(Boolean)
        .map((url) => ({ url, source: url === person.sourceUrl ? 'sourceUrl' : 'website' })),
      ...(curatedUrlMap.get(person.id) ?? []).map((url) => ({ url, source: 'curated' })),
    ]

    // Deduplicate by URL string.
    const unique = []
    const seen = new Set()
    for (const entry of urlEntries) {
      if (seen.has(entry.url)) continue
      seen.add(entry.url)
      unique.push(entry)
    }

    const checked = []

    for (const entry of unique) {
      const fetched = await fetchText(entry.url)
      const hits = []
      const hitDetails = []

      if (fetched.ok && fetched.text) {
        for (const { phrase, regex } of PHRASE_REGEXES) {
          const match = regex.exec(fetched.text)
          if (match) {
            hits.push(phrase)
            hitDetails.push({ phrase, snippet: buildSnippet(fetched.text, match.index) })
          }
        }
      }

      checked.push({
        url: entry.url,
        source: entry.source,
        inferredSourceType: inferSourceType(entry.url),
        fetchStatus: fetched.reason,
        hits,
        hitDetails,
      })
    }

    process.stdout.write(`Exec scanned ${index + 1}/${people.length}: ${person.name}\n`)

    return {
      id: person.id,
      name: person.name,
      sectionId: person.sectionId,
      title: person.title ?? null,
      checked,
    }
  })

  const withHits = results.filter((p) => p.checked.some((u) => u.hits.length > 0))

  writeFileSync(
    outPath,
    `${JSON.stringify({
      generatedAt: new Date().toISOString(),
      phrases: PHRASES,
      peopleScanned: results.length,
      peopleWithHits: withHits.length,
      matched: withHits,
      all: results,
    }, null, 2)}\n`,
  )

  console.log(`Done. Exec scanned: ${results.length}. People with hits: ${withHits.length}.`) 
  console.log(`Wrote: ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
