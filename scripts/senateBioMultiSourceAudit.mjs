import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DATASET_PATH = resolve('public/data/governmentData.json')
const TARGETS_PATH = resolve('/tmp/bio_audit_targets.json')

const BIOTECH_CONNECTIONS_PATH = resolve('src/biotechConnections.ts')
const BIOTECH_MENTIONS_PATH = resolve('src/biotechMentionEvidence.ts')

const EXTRA_URLS_PATH = resolve('/tmp/senate-bio-extra-urls.json')

const OUT_JSON_PATH = resolve('/tmp/senate-bio-multisource-audit.json')
const OUT_MD_PATH = resolve('/tmp/senate-bio-multisource-audit.md')

const CACHE_DIR = resolve('/tmp/senate-bio-multisource-cache')
const PDF_DIR = resolve('/tmp/senate-bio-multisource-pdf')

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
  // Exact whole-word/whole-phrase-ish: enforce non-alpha boundaries on both sides.
  // This matches the repo's earlier audit style, and satisfies "exact whole-word match"
  // for these English terms without accidentally matching inside larger words.
  return new RegExp(`(^|[^A-Za-z])${escapeRegex(phrase)}([^A-Za-z]|$)`, 'i')
}

const PHRASE_REGEXES = PHRASES.map((phrase) => ({ phrase, regex: buildPhraseRegex(phrase) }))

function sha1(text) {
  return createHash('sha1').update(text).digest('hex')
}

function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms))
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
  // Normalize typography that would otherwise cause false negatives for "exact match" terms,
  // especially hyphenated phrases like gain-of-function and bio-weapon.
  // This keeps the match rule strict to the target strings while avoiding Unicode hyphen drift.
  return text
    .replace(/\u00ad/g, '') // soft hyphen
    .replace(/[\u2010\u2011\u2012\u2013\u2212\uFE63\uFF0D]/g, '-') // hyphen variants -> ASCII hyphen
    .replace(/\s+/g, ' ')
    .trim()
}

function urlLooksLikeContent(url) {
  if (/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url)) return false
  if (/\/tag\/|\/category\/|\/author\/|\/wp-json\/|\/feed\/|\/rss/i.test(url)) return false
  return true
}

async function fetchBinary(url) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
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
    }).catch(() => null)

    if (response?.ok) {
      const contentType = response.headers.get('content-type') ?? ''
      const arrayBuffer = await response.arrayBuffer()
      return { ok: true, status: response.status, contentType, arrayBuffer }
    }

    const status = response?.status ?? 0
    if (response && ![403, 429].includes(status) && status < 500) {
      return { ok: false, status, contentType: '', arrayBuffer: null }
    }

    await sleep(700 * (attempt + 1))
  }

  return { ok: false, status: 0, contentType: '', arrayBuffer: null }
}

function pdfToText(pdfPath) {
  try {
    return execFileSync('pdftotext', [pdfPath, '-'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return ''
  }
}

async function fetchTextWithCache(url) {
  const cacheKey = sha1(url)
  const cachePath = resolve(CACHE_DIR, `${cacheKey}.txt`)

  try {
    const cached = readFileSync(cachePath, 'utf8')
    return { ok: true, status: 200, kind: 'cached', text: cached }
  } catch {
    // continue
  }

  const fetched = await fetchBinary(url)
  if (!fetched.ok || !fetched.arrayBuffer) {
    return { ok: false, status: fetched.status, kind: 'fetch_error', text: '' }
  }

  const buffer = Buffer.from(fetched.arrayBuffer)
  const isPdf = /pdf/i.test(fetched.contentType) || /\.pdf(\?|$)/i.test(url)

  let text = ''
  let kind = 'html'
  if (isPdf) {
    const probe = buffer.subarray(0, 8).toString('ascii')
    if (!probe.startsWith('%PDF-')) {
      // Some sites serve HTML behind a .pdf URL.
      kind = 'html'
      text = normalizeText(stripHtml(new TextDecoder('utf-8', { fatal: false }).decode(buffer)))
    } else {
      kind = 'pdf'
      const pdfPath = resolve(PDF_DIR, `${cacheKey}.pdf`)
      try {
        writeFileSync(pdfPath, buffer)
        text = normalizeText(pdfToText(pdfPath))
      } catch {
        text = ''
      }
    }
  } else {
    kind = 'html'
    text = normalizeText(stripHtml(new TextDecoder('utf-8', { fatal: false }).decode(buffer)))
  }

  try {
    writeFileSync(cachePath, text, 'utf8')
  } catch {
    // ignore cache write errors
  }

  return { ok: true, status: 200, kind, text }
}

function extractSitemapLocs(xmlText) {
  const locs = []
  for (const match of xmlText.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = match[1].trim()
    if (url) locs.push(url)
  }
  return locs
}

async function discoverSitemapUrls(base) {
  const root = base.endsWith('/') ? base.slice(0, -1) : base
  const candidates = [`${root}/sitemap_index.xml`, `${root}/sitemap.xml`, `${root}/wp-sitemap.xml`]

  for (const url of candidates) {
    const response = await fetchTextWithCache(url)
    if (response.ok && response.text && /<\?xml|<sitemapindex|<urlset/i.test(response.text)) {
      const isIndex = /<sitemapindex/i.test(response.text)
      const locs = extractSitemapLocs(response.text)
      return { kind: isIndex ? 'index' : 'urlset', url, locs }
    }
  }

  return { kind: 'none', url: '', locs: [] }
}

async function collectAllSitemapLocs(sitemapUrl) {
  const response = await fetchTextWithCache(sitemapUrl)
  if (!response.ok || !response.text) return []
  return extractSitemapLocs(response.text)
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

function matchPhrases(text) {
  const hits = []
  for (const { phrase, regex } of PHRASE_REGEXES) {
    if (regex.test(text)) hits.push(phrase)
  }
  return hits
}

function parseEvidenceUrlMap(text) {
  // Parse personId(s) blocks and source URLs from our TS evidence files.
  // We do not trust labels here; we re-fetch and re-scan for exact matches.
  const map = new Map()
  const blocks = [
    ...text.matchAll(/personId[s]?:\s*(\[[\s\S]*?\]|'[^']+')[\s\S]*?sources:\s*\[([\s\S]*?)\]/g),
  ]

  for (const match of blocks) {
    const personIdsBlock = match[1]
    const sourcesBlock = match[2]
    const personIds = [...personIdsBlock.matchAll(/'([^']+)'/g)].map((m) => m[1])
    const urls = [...sourcesBlock.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1])
    for (const personId of personIds) {
      if (!map.has(personId)) map.set(personId, new Set())
      for (const url of urls) map.get(personId).add(url)
    }
  }

  return new Map([...map.entries()].map(([personId, urls]) => [personId, [...urls]]))
}

function classifySourceType(url) {
  const u = url.toLowerCase()
  if (u.includes('congress.gov') || u.includes('govinfo.gov')) return 'congressional/government record'
  if (u.includes('docs.house.gov')) return 'official transcript'
  if (u.includes('intelligence.senate.gov') || u.includes('/hearings-')) return 'official transcript'
  if (u.includes('c-span.org') || u.includes('youtube.com') || u.includes('youtu.be')) return 'direct video'
  if (u.includes('.senate.gov')) return 'official office page'
  return 'media quote / secondary report'
}

function normalizeName(name) {
  return name
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .toLowerCase()
    .trim()
}

async function main() {
  mkdirSync(CACHE_DIR, { recursive: true })
  mkdirSync(PDF_DIR, { recursive: true })

  const dataset = JSON.parse(readFileSync(DATASET_PATH, 'utf8'))
  const targets = JSON.parse(readFileSync(TARGETS_PATH, 'utf8')).senate

  let extraUrlMap = new Map()
  try {
    const extra = JSON.parse(readFileSync(EXTRA_URLS_PATH, 'utf8'))
    extraUrlMap = new Map(
      Object.entries(extra).map(([personId, urls]) => [personId, new Set((urls ?? []).filter(Boolean))]),
    )
  } catch {
    // optional file
  }

  const senatePeople = (dataset.people ?? []).filter((p) => p.sectionId === 'senate')
  const byNormalizedName = new Map(senatePeople.map((p) => [normalizeName(p.name), p]))

  const targetNames = [...targets.direct, ...targets.contextual]
  const targetPeople = targetNames.map((name) => {
    const person = byNormalizedName.get(normalizeName(name))
    if (!person) {
      throw new Error(`Could not map target name to roster person: ${name}`)
    }
    return person
  })

  const bucketById = new Map()
  for (const name of targets.direct) {
    const person = byNormalizedName.get(normalizeName(name))
    if (person) bucketById.set(person.id, 'direct self-use')
  }
  for (const name of targets.contextual) {
    const person = byNormalizedName.get(normalizeName(name))
    if (person) bucketById.set(person.id, 'contextual only')
  }

  const evidenceUrlMap = new Map()
  for (const map of [
    parseEvidenceUrlMap(readFileSync(BIOTECH_CONNECTIONS_PATH, 'utf8')),
    parseEvidenceUrlMap(readFileSync(BIOTECH_MENTIONS_PATH, 'utf8')),
  ]) {
    for (const [personId, urls] of map.entries()) {
      const set = evidenceUrlMap.get(personId) ?? new Set()
      for (const url of urls) set.add(url)
      evidenceUrlMap.set(personId, set)
    }
  }

  const results = []
  const errors = []

  // Crawl each senator site (official office pages) and merge in curated evidence URLs.
  for (let i = 0; i < targetPeople.length; i += 1) {
    const person = targetPeople[i]
    const bucket = bucketById.get(person.id) ?? 'contextual only'

    const baseUrl = (person.website || person.sourceUrl || '').trim()
    if (!baseUrl) {
      errors.push({ personId: person.id, name: person.name, error: 'missing_website' })
      continue
    }

    const sources = new Map() // url -> source entry
    const addSource = (entry) => {
      const key = entry.url
      const existing = sources.get(key)
      if (!existing) {
        sources.set(key, entry)
      } else {
        const merged = {
          ...existing,
          matchedTerms: [...new Set([...(existing.matchedTerms ?? []), ...(entry.matchedTerms ?? [])])].sort(),
          origin: [...new Set([...(existing.origin ?? []), ...(entry.origin ?? [])])].sort(),
          note: existing.note || entry.note,
        }
        sources.set(key, merged)
      }
    }

    // 1) Curated evidence URLs (external or on-site), re-scanned for exact matches.
    const curatedUrls = [
      ...(evidenceUrlMap.get(person.id) ?? new Set()),
      ...(extraUrlMap.get(person.id) ?? new Set()),
    ]
    const curatedScanned = await mapWithConcurrency(curatedUrls, 6, async (url) => {
      const scanned = await fetchTextWithCache(url)
      if (!scanned.ok || !scanned.text) return null
      const hits = matchPhrases(scanned.text)
      if (!hits.length) return null
      return { url, hits }
    })

    for (const item of curatedScanned.filter(Boolean)) {
      addSource({
        url: item.url,
        sourceType: classifySourceType(item.url),
        matchedTerms: item.hits,
        origin: ['curated'],
        note:
          bucket === 'direct self-use'
            ? 'Known direct/self-use bucket; verify attribution inside the source text if needed.'
            : 'Contextual-only bucket; this source contains the exact term(s) but may not be a direct quote.',
      })
    }

    // 2) Official site crawl via sitemap(s).
    const sitemap = await discoverSitemapUrls(baseUrl)
    let locs = []
    if (sitemap.kind === 'urlset') {
      locs = sitemap.locs
    } else if (sitemap.kind === 'index') {
      // Fetch child sitemaps and union locs.
      const childLocLists = await mapWithConcurrency(sitemap.locs, 4, async (child) => collectAllSitemapLocs(child))
      locs = [...new Set(childLocLists.flat())]
    }

    // Filter obvious junk endpoints.
    locs = locs.filter(urlLooksLikeContent)

    // Scan all discovered locs.
    const scanned = await mapWithConcurrency(locs, 10, async (url) => {
      // Keep this branch strictly official-site-owned.
      if (!url.toLowerCase().includes('.senate.gov')) return null
      const fetched = await fetchTextWithCache(url)
      if (!fetched.ok || !fetched.text) return null
      const hits = matchPhrases(fetched.text)
      if (!hits.length) return null
      return { url, hits }
    })

    for (const item of scanned.filter(Boolean)) {
      addSource({
        url: item.url,
        sourceType: 'official office page',
        matchedTerms: item.hits,
        origin: ['official-site-sitemap'],
        note:
          bucket === 'direct self-use'
            ? 'Official Senate office page contains exact term(s); may be a senator-authored statement or office copy.'
            : 'Official Senate office page contains exact term(s); bucket remains contextual only.',
      })
    }

    results.push({
      personId: person.id,
      name: person.name,
      bucket,
      website: baseUrl,
      sitemap: { kind: sitemap.kind, url: sitemap.url, discoveredLocCount: locs.length },
      sources: [...sources.values()].sort((a, b) => a.url.localeCompare(b.url)),
      sourceCount: sources.size,
    })

    process.stdout.write(`Senate ${i + 1}/${targetPeople.length}: ${person.name} -> ${sources.size} sources\\n`)
  }

  const summary = {
    updatedAt: new Date().toISOString(),
    scope: 'Senate targets only (from /tmp/bio_audit_targets.json)',
    phrases: PHRASES,
    people: results.sort((a, b) => a.name.localeCompare(b.name)),
    totals: {
      people: results.length,
      directSelfUse: results.filter((p) => p.bucket === 'direct self-use').length,
      contextualOnly: results.filter((p) => p.bucket === 'contextual only').length,
      totalSources: results.reduce((sum, p) => sum + p.sourceCount, 0),
    },
    errors,
  }

  writeFileSync(OUT_JSON_PATH, `${JSON.stringify(summary, null, 2)}\n`, 'utf8')

  const md = []
  md.push('# Senate Bio-Term Multi-Source Audit')
  md.push('')
  md.push(`Updated: ${summary.updatedAt}`)
  md.push('')
  md.push(`People: ${summary.totals.people}`)
  md.push(`Direct self-use bucket: ${summary.totals.directSelfUse}`)
  md.push(`Contextual only bucket: ${summary.totals.contextualOnly}`)
  md.push(`Total sources (unique URLs): ${summary.totals.totalSources}`)
  md.push('')
  md.push('Phrases:')
  md.push(PHRASES.map((p) => `- ${p}`).join('\n'))
  md.push('')
  for (const person of summary.people) {
    md.push(`## ${person.name}`)
    md.push('')
    md.push(`Bucket: ${person.bucket}`)
    md.push('')
    md.push(`Website: ${person.website}`)
    md.push('')
    if (person.sitemap.url) {
      md.push(`Sitemap: ${person.sitemap.url} (${person.sitemap.kind}), discovered locs: ${person.sitemap.discoveredLocCount}`)
      md.push('')
    }
    if (!person.sources.length) {
      md.push('No verified exact-match sources found in this run.')
      md.push('')
      continue
    }
    for (const src of person.sources) {
      md.push(`${src.sourceType}: ${src.url}`)
      md.push(`Matched: ${src.matchedTerms.join(', ')}`)
      md.push(`Note: ${src.note}`)
      md.push('')
    }
  }
  if (summary.errors.length) {
    md.push('## Errors')
    md.push('')
    for (const err of summary.errors) {
      md.push(`${err.name || err.personId}: ${err.error}`)
    }
    md.push('')
  }

  writeFileSync(OUT_MD_PATH, `${md.join('\n')}\n`, 'utf8')

  console.log(`Wrote JSON: ${OUT_JSON_PATH}`)
  console.log(`Wrote Markdown: ${OUT_MD_PATH}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
