import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const datasetPath = resolve('public/data/governmentData.json')
const biotechConnectionsPath = resolve('src/biotechConnections.ts')
const biotechMentionEvidencePath = resolve('src/biotechMentionEvidence.ts')
const outPath = resolve('tmp/roster-primary-bio-terms-sweep.json')

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

function pdfToText(pdfBuffer, url) {
  const path = resolve(tmpdir(), `roster-bio-${sha1(url)}.pdf`)
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

async function main() {
  mkdirSync(resolve('tmp'), { recursive: true })

  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const people = dataset.people ?? []
  const curatedUrlMap = buildCuratedUrlMap()

  const results = await mapWithConcurrency(people, 16, async (person, index) => {
    const urls = [
      ...new Set([
        ...[person.sourceUrl, person.website].filter(Boolean).map((url) => ({
          url,
          sourceType: url === person.sourceUrl ? 'sourceUrl' : 'website',
        })),
        ...(curatedUrlMap.get(person.id) ?? []).map((url) => ({
          url,
          sourceType: 'curated',
        })),
      ].map((entry) => `${entry.sourceType}\t${entry.url}`)),
    ].map((entry) => {
      const [sourceType, url] = entry.split('\t')
      return { sourceType, url }
    })
    const urlResults = []

    for (const { sourceType, url } of urls) {
      const fetched = await fetchText(url)
      if (!fetched.ok || !fetched.text) {
        urlResults.push({ url, sourceType, fetchStatus: fetched.reason, hits: [] })
        continue
      }

      const hits = []
      for (const { phrase, regex } of PHRASE_REGEXES) {
        if (regex.test(fetched.text)) hits.push(phrase)
      }

      urlResults.push({
        url,
        sourceType,
        fetchStatus: fetched.reason,
        hits,
      })
    }

    process.stdout.write(`Scanned ${index + 1}/${people.length}: ${person.name}\n`)

    return {
      id: person.id,
      name: person.name,
      branchId: person.branchId,
      sectionId: person.sectionId,
      urls: urlResults,
    }
  })

  const matched = results.filter((person) => person.urls.some((url) => url.hits.length > 0))
  const summary = {
    phrases: PHRASES,
    peopleScanned: results.length,
    peopleWithHits: matched.length,
    matched,
  }

  writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`)

  console.log(`Done. People scanned: ${summary.peopleScanned}. People with hits: ${summary.peopleWithHits}.`)
  console.log(`Wrote: ${outPath}`)
}

function buildCuratedUrlMap() {
  const map = new Map()

  const biotechConnectionsText = readFileSync(biotechConnectionsPath, 'utf8')
  const biotechConnectionBlocks = biotechConnectionsText.matchAll(
    /\{[\s\S]*?personId: '([^']+)'[\s\S]*?sources: \[([\s\S]*?)\][\s\S]*?\},/g,
  )

  for (const match of biotechConnectionBlocks) {
    const personIds = [match[1]]
    const urls = [...match[2].matchAll(/url: '([^']+)'/g)].map((entry) => entry[1])
    for (const personId of personIds) {
      if (!map.has(personId)) map.set(personId, new Set())
      for (const url of urls) map.get(personId).add(url)
    }
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

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
