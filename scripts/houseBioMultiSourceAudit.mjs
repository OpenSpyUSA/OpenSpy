import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DATASET_PATH = resolve('public/data/governmentData.json')
const TARGETS_PATH = resolve('/tmp/house_bio_targets.json')

const BIOTECH_CONNECTIONS_PATH = resolve('src/biotechConnections.ts')
const BIOTECH_MENTIONS_PATH = resolve('src/biotechMentionEvidence.ts')
const EXTRA_URLS_PATH = resolve('/tmp/house-bio-extra-urls.json')

const OUT_JSON_PATH = resolve('/tmp/house-bio-multisource-audit.json')
const OUT_MD_PATH = resolve('/tmp/house-bio-multisource-audit.md')

const CACHE_DIR = resolve('/tmp/house-bio-multisource-cache')

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

const MAX_SITEMAP_URLS = 500
const MAX_FALLBACK_PAGES = 80
const MAX_FALLBACK_DEPTH = 2

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
  return text
    .replace(/\u00ad/g, '')
    .replace(/[\u2010\u2011\u2012\u2013\u2212\uFE63\uFF0D]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

function snippetAround(text, phrase, windowSize = 140) {
  const lower = text.toLowerCase()
  const target = phrase.toLowerCase()
  const index = lower.indexOf(target)
  if (index === -1) return ''
  const start = Math.max(0, index - windowSize)
  const end = Math.min(text.length, index + target.length + windowSize)
  return text.slice(start, end).replace(/\s+/g, ' ').trim()
}

function urlLooksLikeContent(url) {
  if (!url) return false
  if (/^mailto:|^tel:|^javascript:/i.test(url)) return false
  if (/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|xml)(\?|$)/i.test(url)) return false
  if (/\/tag\/|\/category\/|\/author\/|\/wp-json\/|\/feed\/|\/rss\/?|\/search\/?/i.test(url)) {
    return false
  }
  return true
}

function canonicalizeUrl(url) {
  try {
    const parsed = new URL(url)
    parsed.hash = ''
    if (/\.house\.gov$/i.test(parsed.hostname)) {
      parsed.protocol = 'https:'
    }
    if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.replace(/\/+$/, '')
    }
    return parsed.toString()
  } catch {
    return url
  }
}

function canQueueSameSiteUrl(url, originHost) {
  try {
    const parsed = new URL(canonicalizeUrl(url))
    if (!['http:', 'https:'].includes(parsed.protocol)) return false
    const host = parsed.hostname.toLowerCase()
    const root = originHost.toLowerCase()
    if (host !== root && !host.endsWith(`.${root}`)) return false
    return urlLooksLikeContent(url)
  } catch {
    return false
  }
}

function extractLinksFromHtml(html, pageUrl, originHost) {
  const links = new Set()
  for (const match of html.matchAll(/href\s*=\s*["']([^"'#]+)["']/gi)) {
    const href = match[1].trim()
    if (!href) continue
    try {
      const resolved = canonicalizeUrl(new URL(href, pageUrl).toString())
      if (canQueueSameSiteUrl(resolved, originHost)) links.add(resolved)
    } catch {
      // ignore malformed hrefs
    }
  }
  return [...links]
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
      signal: AbortSignal.timeout(25000),
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

    await sleep(800 * (attempt + 1))
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

async function fetchDocumentWithCache(url) {
  const cacheKey = sha1(url)
  const cachePath = resolve(CACHE_DIR, `${cacheKey}.json`)

  try {
    return JSON.parse(readFileSync(cachePath, 'utf8'))
  } catch {
    // continue
  }

  const fetched = await fetchBinary(url)
  if (!fetched.ok || !fetched.arrayBuffer) {
    const errorResult = { ok: false, status: fetched.status, kind: 'fetch_error', rawText: '', text: '' }
    try {
      writeFileSync(cachePath, `${JSON.stringify(errorResult)}\n`, 'utf8')
    } catch {
      // ignore
    }
    return errorResult
  }

  const buffer = Buffer.from(fetched.arrayBuffer)
  const probe = buffer.subarray(0, 8).toString('ascii')
  const decoded = new TextDecoder('utf-8', { fatal: false }).decode(buffer)
  const contentType = fetched.contentType.toLowerCase()

  let kind = 'html'
  let rawText = ''
  let text = ''

  if ((/pdf/i.test(contentType) || /\.pdf(\?|$)/i.test(url)) && probe.startsWith('%PDF-')) {
    kind = 'pdf'
    const pdfPath = resolve(CACHE_DIR, `${cacheKey}.pdf`)
    try {
      writeFileSync(pdfPath, buffer)
      text = normalizeText(pdfToText(pdfPath))
    } catch {
      text = ''
    }
  } else if (/xml/i.test(contentType) || /^\s*<\?xml/i.test(decoded) || /^\s*<(urlset|sitemapindex)\b/i.test(decoded)) {
    kind = 'xml'
    rawText = decoded
    text = normalizeText(stripHtml(decoded))
  } else {
    kind = 'html'
    rawText = decoded
    text = normalizeText(stripHtml(decoded))
  }

  const result = { ok: true, status: 200, kind, rawText, text }
  try {
    writeFileSync(cachePath, `${JSON.stringify(result)}\n`, 'utf8')
  } catch {
    // ignore
  }
  return result
}

function extractSitemapLocs(xmlText) {
  const locs = []
  for (const match of xmlText.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    const url = match[1].trim()
    if (url) locs.push(canonicalizeUrl(url))
  }
  return locs
}

async function discoverSitemapUrls(baseUrl) {
  const root = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const robotsUrl = `${root}/robots.txt`
  const discovered = new Set()

  const robots = await fetchDocumentWithCache(robotsUrl)
  if (robots.ok && robots.rawText) {
    for (const match of robots.rawText.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) {
      discovered.add(canonicalizeUrl(match[1].trim()))
    }
  }

  for (const candidate of [`${root}/sitemap.xml`, `${root}/sitemap_index.xml`, `${root}/wp-sitemap.xml`]) {
    discovered.add(canonicalizeUrl(candidate))
  }

  const valid = []
  for (const candidate of discovered) {
    const fetched = await fetchDocumentWithCache(candidate)
    if (!fetched.ok || fetched.kind !== 'xml' || !fetched.rawText) continue
    if (!/<(urlset|sitemapindex)\b/i.test(fetched.rawText)) continue
    valid.push(candidate)
  }

  return [...new Set(valid)]
}

async function collectAllSitemapLocs(sitemapUrls) {
  const locs = new Set()
  const queue = [...sitemapUrls]
  const seen = new Set()

  while (queue.length > 0 && locs.size < MAX_SITEMAP_URLS && seen.size < MAX_SITEMAP_URLS) {
    const current = queue.shift()
    if (!current || seen.has(current)) continue
    seen.add(current)

    const fetched = await fetchDocumentWithCache(current)
    if (!fetched.ok || fetched.kind !== 'xml' || !fetched.rawText) continue

    const matches = extractSitemapLocs(fetched.rawText)
    if (/<sitemapindex\b/i.test(fetched.rawText)) {
      for (const child of matches) {
        if (!seen.has(child)) queue.push(child)
      }
      continue
    }

    for (const url of matches) {
      if (urlLooksLikeContent(url)) locs.add(url)
      if (locs.size >= MAX_SITEMAP_URLS) break
    }
  }

  return [...locs]
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
  if (u.includes('docs.house.gov') || u.includes('house.gov/meetings/')) return 'official transcript'
  if (u.includes('congress.gov') || u.includes('govinfo.gov')) return 'congressional/government record'
  if (u.includes('c-span.org') || u.includes('youtube.com') || u.includes('youtu.be')) return 'direct video'
  if (u.includes('transcript') && (u.includes('cnn.com') || u.includes('foxnews.com') || u.includes('nbcnews.com'))) {
    return 'news transcript'
  }
  if (u.includes('.house.gov') || u.includes('.gov')) return 'official office page'
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

function loadTargets(housePeople) {
  let rawTargets = null
  try {
    rawTargets = JSON.parse(readFileSync(TARGETS_PATH, 'utf8'))
  } catch {
    return housePeople
  }

  const items = Array.isArray(rawTargets)
    ? rawTargets
    : Array.isArray(rawTargets.house)
      ? rawTargets.house
      : [...(rawTargets.ids ?? []), ...(rawTargets.names ?? [])]

  const byId = new Map(housePeople.map((person) => [person.id, person]))
  const byName = new Map(housePeople.map((person) => [normalizeName(person.name), person]))

  const resolved = []
  for (const item of items) {
    if (typeof item !== 'string') continue
    const person = byId.get(item) ?? byName.get(normalizeName(item))
    if (person) resolved.push(person)
  }

  const seen = new Set()
  return resolved.filter((person) => {
    if (seen.has(person.id)) return false
    seen.add(person.id)
    return true
  })
}

async function scanMatchedSource(url, origin) {
  const canonicalUrl = canonicalizeUrl(url)
  const fetched = await fetchDocumentWithCache(canonicalUrl)
  if (!fetched.ok || !fetched.text) return null
  const hits = matchPhrases(fetched.text)
  if (!hits.length) return null
  return {
    url: canonicalUrl,
    sourceType: classifySourceType(canonicalUrl),
    matchedTerms: hits,
    snippets: hits.slice(0, 4).map((phrase) => ({
      phrase,
      snippet: snippetAround(fetched.text, phrase),
    })),
    origin,
  }
}

async function crawlOfficialFallback(baseUrl) {
  const canonicalBaseUrl = canonicalizeUrl(baseUrl)
  const originHost = new URL(canonicalBaseUrl).hostname
  const queue = [{ url: canonicalBaseUrl, depth: 0 }]
  const visited = new Set()
  const matches = []

  while (queue.length > 0 && visited.size < MAX_FALLBACK_PAGES) {
    const current = queue.shift()
    if (!current || visited.has(current.url)) continue
    visited.add(current.url)

    const fetched = await fetchDocumentWithCache(current.url)
    if (!fetched.ok || !fetched.text) continue

    const hits = matchPhrases(fetched.text)
    if (hits.length) {
      matches.push({
        url: current.url,
        sourceType: 'official office page',
        matchedTerms: hits,
        snippets: hits.slice(0, 4).map((phrase) => ({
          phrase,
          snippet: snippetAround(fetched.text, phrase),
        })),
        origin: ['official-site-fallback-crawl'],
      })
    }

    if (fetched.kind !== 'html' || !fetched.rawText || current.depth >= MAX_FALLBACK_DEPTH) continue

      const links = extractLinksFromHtml(fetched.rawText, current.url, originHost)
      for (const link of links) {
        if (!visited.has(link) && queue.length < MAX_FALLBACK_PAGES) {
          queue.push({ url: link, depth: current.depth + 1 })
      }
    }
  }

  return { visitedPages: visited.size, matches }
}

async function main() {
  mkdirSync(CACHE_DIR, { recursive: true })

  const dataset = JSON.parse(readFileSync(DATASET_PATH, 'utf8'))
  const housePeople = (dataset.people ?? []).filter((person) => person.sectionId === 'house')
  const targetPeople = loadTargets(housePeople)

  let extraUrlMap = new Map()
  try {
    const extra = JSON.parse(readFileSync(EXTRA_URLS_PATH, 'utf8'))
    extraUrlMap = new Map(
      Object.entries(extra).map(([personId, urls]) => [personId, new Set((urls ?? []).filter(Boolean))]),
    )
  } catch {
    // optional file
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

  for (let i = 0; i < targetPeople.length; i += 1) {
    const person = targetPeople[i]
    const baseUrl = canonicalizeUrl((person.website || person.sourceUrl || '').trim())
    if (!baseUrl) {
      errors.push({ personId: person.id, name: person.name, error: 'missing_website' })
      continue
    }

    const sources = new Map()
    const addSource = (entry) => {
      const existing = sources.get(entry.url)
      if (!existing) {
        sources.set(entry.url, entry)
        return
      }

      sources.set(entry.url, {
        ...existing,
        matchedTerms: [...new Set([...(existing.matchedTerms ?? []), ...(entry.matchedTerms ?? [])])].sort(),
        origin: [...new Set([...(existing.origin ?? []), ...(entry.origin ?? [])])].sort(),
        snippets: [...(existing.snippets ?? []), ...(entry.snippets ?? [])]
          .filter((snippet, index, list) => list.findIndex((item) => item.snippet === snippet.snippet) === index)
          .slice(0, 6),
      })
    }

    const curatedUrls = [
      ...(evidenceUrlMap.get(person.id) ?? new Set()),
      ...(extraUrlMap.get(person.id) ?? new Set()),
    ]

    const curatedScanned = await mapWithConcurrency(curatedUrls, 6, async (url) =>
      scanMatchedSource(url, ['curated-or-extra']),
    )
    for (const item of curatedScanned.filter(Boolean)) addSource(item)

    let sitemapUrls = []
    let sitemapLocs = []
    try {
      sitemapUrls = await discoverSitemapUrls(baseUrl)
      sitemapLocs = await collectAllSitemapLocs(sitemapUrls)
    } catch (error) {
      errors.push({
        personId: person.id,
        name: person.name,
        error: `sitemap_error:${error instanceof Error ? error.message : 'unknown'}`,
      })
    }

    const sitemapMatches = await mapWithConcurrency(sitemapLocs, 10, async (url) =>
      scanMatchedSource(url, ['official-site-sitemap']),
    )
    for (const item of sitemapMatches.filter(Boolean)) addSource(item)

    let fallback = { visitedPages: 0, matches: [] }
    if (sitemapLocs.length < 8) {
      fallback = await crawlOfficialFallback(baseUrl)
      for (const item of fallback.matches) addSource(item)
    }

    results.push({
      personId: person.id,
      name: person.name,
      state: person.state,
      website: baseUrl,
      committees: person.committees ?? [],
      sitemapUrls,
      sitemapLocCount: sitemapLocs.length,
      fallbackVisitedPages: fallback.visitedPages,
      sources: [...sources.values()].sort((a, b) => a.url.localeCompare(b.url)),
      sourceCount: sources.size,
    })

    process.stdout.write(`House ${i + 1}/${targetPeople.length}: ${person.name} -> ${sources.size} sources\n`)
  }

  const summary = {
    updatedAt: new Date().toISOString(),
    scope: 'House targets only',
    phrases: PHRASES,
    totals: {
      people: results.length,
      peopleWithHits: results.filter((person) => person.sourceCount > 0).length,
      totalSources: results.reduce((sum, person) => sum + person.sourceCount, 0),
    },
    people: results.sort((a, b) => a.name.localeCompare(b.name)),
    errors,
  }

  writeFileSync(OUT_JSON_PATH, `${JSON.stringify(summary, null, 2)}\n`, 'utf8')

  const md = []
  md.push('# House Bio-Term Multi-Source Audit')
  md.push('')
  md.push(`Updated: ${summary.updatedAt}`)
  md.push('')
  md.push(`People: ${summary.totals.people}`)
  md.push(`People with hits: ${summary.totals.peopleWithHits}`)
  md.push(`Total sources: ${summary.totals.totalSources}`)
  md.push('')
  md.push('Phrases:')
  md.push(PHRASES.map((phrase) => `- ${phrase}`).join('\n'))
  md.push('')

  for (const person of summary.people) {
    md.push(`## ${person.name}`)
    md.push('')
    md.push(`State: ${person.state}`)
    md.push(`Website: ${person.website}`)
    md.push(`Sitemaps discovered: ${person.sitemapUrls.length}`)
    md.push(`Sitemap loc count: ${person.sitemapLocCount}`)
    md.push(`Fallback pages visited: ${person.fallbackVisitedPages}`)
    md.push('')
    if (!person.sources.length) {
      md.push('No verified exact-match sources found in this run.')
      md.push('')
      continue
    }
    for (const source of person.sources) {
      md.push(`${source.sourceType}: ${source.url}`)
      md.push(`Matched: ${source.matchedTerms.join(', ')}`)
      md.push(`Origin: ${source.origin.join(', ')}`)
      for (const snippet of source.snippets ?? []) {
        md.push(`Snippet (${snippet.phrase}): ${snippet.snippet}`)
      }
      md.push('')
    }
  }

  if (summary.errors.length) {
    md.push('## Errors')
    md.push('')
    for (const error of summary.errors) {
      md.push(`${error.name || error.personId}: ${error.error}`)
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
