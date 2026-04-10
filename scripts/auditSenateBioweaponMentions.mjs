import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')
const outJsonPath = resolve(__dirname, '../tmp/senate-bioweapon-audit.json')
const outMdPath = resolve(__dirname, '../notes/senate-bioweapon-audit.md')
const cacheDir = resolve(__dirname, '../tmp/senate-bioweapon-audit-cache')
const pdfDir = resolve(__dirname, '../tmp/senate-bioweapon-audit-pdf')

const WORD_RE = /\bbioweapons?\b/i

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function safeUrl(url) {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

function sha1(text) {
  return createHash('sha1').update(text).digest('hex')
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
      return {
        arrayBuffer,
        contentType,
        status: response.status,
      }
    }

    if (response && ![403, 429].includes(response.status) && response.status < 500) {
      return { arrayBuffer: null, contentType: '', status: response.status }
    }

    await sleep(700 * (attempt + 1))
  }

  return { arrayBuffer: null, contentType: '', status: 0 }
}

async function fetchText(url) {
  const cacheKey = sha1(url)
  const cachePath = resolve(cacheDir, `${cacheKey}.txt`)

  try {
    const cached = readFileSync(cachePath, 'utf8')
    return { ok: true, status: 200, text: cached, fromCache: true }
  } catch {
    // continue
  }

  const { arrayBuffer, status } = await fetchBinary(url)
  if (!arrayBuffer) return { ok: false, status, text: '', fromCache: false }
  const text = new TextDecoder('utf-8', { fatal: false }).decode(arrayBuffer)

  try {
    writeFileSync(cachePath, text)
  } catch {
    // ignore cache write errors
  }

  return { ok: true, status: 200, text, fromCache: false }
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
  const candidates = [
    `${root}/sitemap_index.xml`,
    `${root}/sitemap.xml`,
    `${root}/wp-sitemap.xml`,
  ]

  for (const url of candidates) {
    const response = await fetchText(url)
    if (response.ok && /<\?xml|<sitemapindex|<urlset/i.test(response.text)) {
      const locs = extractSitemapLocs(response.text)
      const isIndex = /<sitemapindex/i.test(response.text)
      if (isIndex) {
        return { kind: 'index', url, locs }
      }
      return { kind: 'urlset', url, locs }
    }
  }

  return { kind: 'none', url: '', locs: [] }
}

function normalizeTextSnippet(text, aroundIndex, windowSize = 120) {
  const start = Math.max(0, aroundIndex - windowSize)
  const end = Math.min(text.length, aroundIndex + windowSize)
  const raw = text.slice(start, end)
  return raw.replace(/\s+/g, ' ').trim()
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function urlLooksLikeContent(url) {
  // Keep this permissive: we’re trying to avoid misses.
  // But still drop obvious non-content endpoints.
  if (/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url)) return false
  if (/\/tag\/|\/category\/|\/author\/|\/wp-json\/|\/feed\/|\/rss/i.test(url)) return false
  return true
}

async function scanHtmlUrl(url) {
  const response = await fetchText(url)
  if (!response.ok) return null

  const text = stripHtml(response.text)
  const lower = text.toLowerCase()
  const matchIndex = lower.search(WORD_RE)
  if (matchIndex === -1) return null
  const snippet = normalizeTextSnippet(text, matchIndex)

  return {
    url,
    kind: 'html',
    snippet,
  }
}

function pdfToText(pdfPath) {
  try {
    const output = execFileSync('pdftotext', [pdfPath, '-'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    return output
  } catch {
    return ''
  }
}

async function scanPdfUrl(url) {
  const cacheKey = sha1(url)
  const pdfPath = resolve(pdfDir, `${cacheKey}.pdf`)

  try {
    // If already downloaded, reuse.
    readFileSync(pdfPath)
  } catch {
    const { arrayBuffer, contentType } = await fetchBinary(url)
    if (!arrayBuffer) return null
    if (!/pdf/i.test(contentType) && !/\.pdf(\?|$)/i.test(url)) {
      // Not a PDF.
      return null
    }
    // Some sites serve HTML error pages behind a .pdf URL.
    const probe = Buffer.from(arrayBuffer).subarray(0, 8).toString('ascii')
    if (!probe.startsWith('%PDF-')) return null
    try {
      writeFileSync(pdfPath, Buffer.from(arrayBuffer))
    } catch {
      return null
    }
  }

  const text = pdfToText(pdfPath)
  if (!text) return null
  const lower = text.toLowerCase()
  const matchIndex = lower.search(WORD_RE)
  if (matchIndex === -1) return null
  const snippet = normalizeTextSnippet(text.replace(/\s+/g, ' '), matchIndex)

  return {
    url,
    kind: 'pdf',
    snippet,
  }
}

async function scanUrl(url) {
  if (!urlLooksLikeContent(url)) return null
  if (/\.pdf(\?|$)/i.test(url)) return scanPdfUrl(url)
  return scanHtmlUrl(url)
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

function buildMarkdownReport(summary) {
  const lines = [
    '# Senate Bioweapon Mention Audit (Exact-Word)',
    '',
    `Updated: ${new Date().toISOString()}`,
    '',
    '## Rule',
    '',
    '- Exact whole-word match only for `bioweapon` or `bioweapons` (case-insensitive).',
    '- This script crawls each senator official `*.senate.gov` site via sitemap discovery and scans HTML + PDFs.',
    '- This does not automatically prove “direct self-use” vs “contextual mention”; it collects raw evidence lines for human classification.',
    '',
    '## Summary',
    '',
    `- senators scanned: ${summary.senatorsTotal}`,
    `- senators with >=1 exact-word hit on their official site corpus: ${summary.senatorsWithHits}`,
    `- total evidence hits: ${summary.totalHits}`,
    '',
  ]

  for (const senator of summary.senators) {
    lines.push(`## ${senator.name} (${senator.stateCode})`, '')
    lines.push(`- Site: ${senator.baseUrl}`)
    lines.push(`- Sitemap: ${senator.sitemap.url || 'none found'}`)
    lines.push(`- URLs scanned: ${senator.urlsScanned}`)
    lines.push(`- Hits: ${senator.hits.length}`)
    if (senator.hits.length === 0) {
      lines.push('')
      continue
    }
    lines.push('')
    for (const hit of senator.hits) {
      lines.push(`- ${hit.kind.toUpperCase()}: ${hit.url}`)
      lines.push(`  Snippet: ${hit.snippet}`)
    }
    lines.push('')
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  mkdirSync(dirname(outJsonPath), { recursive: true })
  mkdirSync(dirname(outMdPath), { recursive: true })
  mkdirSync(cacheDir, { recursive: true })
  mkdirSync(pdfDir, { recursive: true })

  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const senators = (dataset.people ?? []).filter(
    (person) => person.branchId === 'legislative' && person.sectionId === 'senate',
  )

  const pass1Results = await mapWithConcurrency(senators, 3, async (senator, index) => {
    const baseUrl = senator.sourceUrl || senator.website || ''
    const parsed = safeUrl(baseUrl)
    if (!parsed) {
      return {
        baseUrl,
        hits: [],
        id: senator.id,
        name: senator.name,
        sitemap: { kind: 'none', url: '', locs: [] },
        stateCode: senator.stateCode,
        urlsScanned: 0,
        warnings: ['invalid_base_url'],
      }
    }

    const siteRoot = `${parsed.protocol}//${parsed.host}`
    const sitemap = await discoverSitemapUrls(siteRoot)

    // If sitemap is an index, fetch nested sitemaps (bounded).
    let urlCandidates = []
    if (sitemap.kind === 'index') {
      const nested = sitemap.locs
        .filter((url) => /\.xml(\?|$)/i.test(url))
        .slice(0, 18)
      const nestedXml = await mapWithConcurrency(nested, 2, async (xmlUrl) => {
        const response = await fetchText(xmlUrl)
        if (!response.ok) return []
        if (!/<urlset/i.test(response.text)) return []
        return extractSitemapLocs(response.text)
      })
      urlCandidates = nestedXml.flat()
    } else if (sitemap.kind === 'urlset') {
      urlCandidates = sitemap.locs
    }

    // Keep only in-domain URLs.
    const inDomain = []
    for (const raw of urlCandidates) {
      const u = safeUrl(raw)
      if (!u) continue
      if (u.host !== parsed.host) continue
      inDomain.push(raw)
    }

    // Prefer content-heavy paths, but keep some breadth.
    const preferred = []
    const fallback = []
    for (const url of inDomain) {
      if (/\.(pdf)(\?|$)/i.test(url)) {
        preferred.push(url)
        continue
      }
      if (
        /\/(press|news|media|releases|statements|speeches|issues|letters|imo\/media\/doc|uploads|files)\b/i.test(
          url,
        )
      ) {
        preferred.push(url)
      } else {
        fallback.push(url)
      }
    }

    // Pass 1: high-signal scan only (press/news/releases/docs + all PDFs).
    // The deeper scan is pass 2 and only runs for senators with zero hits.
    const urlsToScan = [...new Set(preferred)].slice(0, 500)

    process.stdout.write(
      `Pass 1: ${index + 1}/${senators.length} ${senator.name} (${senator.stateCode}) urls=${urlsToScan.length} sitemap=${sitemap.kind}\n`,
    )

    const hits = []
    const scanned = await mapWithConcurrency(urlsToScan, 6, async (url) => {
      const hit = await scanUrl(url)
      if (hit) hits.push(hit)
      return null
    })
    void scanned

    return {
      baseUrl: siteRoot,
      hits,
      id: senator.id,
      name: senator.name,
      sitemap: { kind: sitemap.kind, url: sitemap.url, locCount: sitemap.locs.length },
      stateCode: senator.stateCode,
      urlsScanned: urlsToScan.length,
      warnings: sitemap.kind === 'none' ? ['no_sitemap_found'] : [],
      _fallbackPoolSize: fallback.length,
      _fallbackUrls: fallback,
    }
  })

  const pass2Targets = pass1Results.filter((s) => s.hits.length === 0 && s._fallbackUrls?.length)
  const pass2ById = new Map()

  // Pass 2: for “no hit” senators, scan a bounded slice of non-preferred URLs for breadth.
  await mapWithConcurrency(pass2Targets, 2, async (senatorResult, index) => {
    const fallbackUrls = senatorResult._fallbackUrls.slice(0, 220)
    process.stdout.write(
      `Pass 2: ${index + 1}/${pass2Targets.length} ${senatorResult.name} (${senatorResult.stateCode}) urls=${fallbackUrls.length}\n`,
    )

    const hits = []
    await mapWithConcurrency(fallbackUrls, 6, async (url) => {
      const hit = await scanUrl(url)
      if (hit) hits.push(hit)
      return null
    })

    pass2ById.set(senatorResult.id, hits)
  })

  const senatorResults = pass1Results.map((s) => {
    const pass2Hits = pass2ById.get(s.id) ?? []
    return {
      ...s,
      hits: [...s.hits, ...pass2Hits],
      pass2AddedHits: pass2Hits.length,
    }
  })

  const summary = {
    senatorsTotal: senatorResults.length,
    senatorsWithHits: senatorResults.filter((s) => s.hits.length > 0).length,
    totalHits: senatorResults.reduce((sum, s) => sum + s.hits.length, 0),
    senators: senatorResults
      .map((s) => ({
        baseUrl: s.baseUrl,
        hits: s.hits,
        name: s.name,
        sitemap: s.sitemap,
        stateCode: s.stateCode,
        urlsScanned: s.urlsScanned,
        warnings: s.warnings,
        pass2AddedHits: s.pass2AddedHits ?? 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }

  writeFileSync(outJsonPath, `${JSON.stringify(summary, null, 2)}\n`)
  writeFileSync(outMdPath, buildMarkdownReport(summary))

  console.log(
    `Done. Senators: ${summary.senatorsTotal}. Senators with hits: ${summary.senatorsWithHits}. Total hits: ${summary.totalHits}.`,
  )
  console.log(`Wrote: ${outJsonPath}`)
  console.log(`Wrote: ${outMdPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
