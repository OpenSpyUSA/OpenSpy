import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const OUT_JSON_PATH = resolve('tmp/judicial-bio-audit.json')
const OUT_MD_PATH = resolve('tmp/judicial-bio-audit.md')

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

// Current Court (sitting as of 2026-03-27, per project roster).
const JUSTICES = [
  { name: 'John G. Roberts, Jr.', key: 'ROBERTS', speaker: 'CHIEF JUSTICE ROBERTS' },
  { name: 'Clarence Thomas', key: 'THOMAS', speaker: 'JUSTICE THOMAS' },
  { name: 'Samuel A. Alito, Jr.', key: 'ALITO', speaker: 'JUSTICE ALITO' },
  { name: 'Sonia Sotomayor', key: 'SOTOMAYOR', speaker: 'JUSTICE SOTOMAYOR' },
  { name: 'Elena Kagan', key: 'KAGAN', speaker: 'JUSTICE KAGAN' },
  { name: 'Neil M. Gorsuch', key: 'GORSUCH', speaker: 'JUSTICE GORSUCH' },
  { name: 'Brett M. Kavanaugh', key: 'KAVANAUGH', speaker: 'JUSTICE KAVANAUGH' },
  { name: 'Amy Coney Barrett', key: 'BARRETT', speaker: 'JUSTICE BARRETT' },
  { name: 'Ketanji Brown Jackson', key: 'JACKSON', speaker: 'JUSTICE JACKSON' },
]

const SPEAKER_TO_JUSTICE = new Map(JUSTICES.map((j) => [j.speaker, j.name]))

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildPhraseRegex(phrase) {
  // "Whole-word" across ASCII letters only (matches other audit scripts).
  return new RegExp(`(^|[^A-Za-z])${escapeRegex(phrase)}([^A-Za-z]|$)`, 'i')
}

const PHRASE_REGEXES = PHRASES.map((phrase) => ({ phrase, regex: buildPhraseRegex(phrase) }))

function sha1(text) {
  return createHash('sha1').update(text).digest('hex')
}

function pdfToText(pdfBuffer, url) {
  const path = resolve(tmpdir(), `judicial-bio-${sha1(url)}.pdf`)
  try {
    writeFileSync(path, pdfBuffer)
    // Keep it simple: transcripts are well-formatted; default output preserves speaker labels.
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

async function fetchPdfText(url) {
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/pdf,*/*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(30000),
    })

    if (!response.ok) return { ok: false, reason: `http_${response.status}`, text: '' }

    const buffer = Buffer.from(await response.arrayBuffer())
    const probe = buffer.subarray(0, 8).toString('ascii')
    if (!probe.startsWith('%PDF-')) return { ok: false, reason: 'not_pdf_payload', text: '' }

    const text = pdfToText(buffer, url)
    return { ok: true, reason: 'pdf', text }
  } catch {
    return { ok: false, reason: 'fetch_error', text: '' }
  }
}

async function fetchHtml(url) {
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
    if (!response.ok) return { ok: false, reason: `http_${response.status}`, html: '' }
    return { ok: true, reason: 'html', html: await response.text() }
  } catch {
    return { ok: false, reason: 'fetch_error', html: '' }
  }
}

function absolutizeTranscriptHref(href, year) {
  // The transcript pages use relative links like "../argument_transcripts/2017/17-965_l5gm.pdf"
  if (!href) return ''
  const cleaned = href.replace(/^\.\.\//, '')
  if (/^https?:\/\//i.test(cleaned)) return cleaned
  // Most common: "argument_transcripts/{year}/{file}.pdf"
  if (cleaned.startsWith('argument_transcripts/')) {
    return `https://www.supremecourt.gov/oral_arguments/${cleaned}`
  }
  // Fallback: assume already rooted under oral_arguments.
  return `https://www.supremecourt.gov/oral_arguments/argument_transcripts/${year}/${cleaned.replace(/^\//, '')}`
}

function parseTranscriptPdfLinks(html, year) {
  const links = []
  for (const match of html.matchAll(/href=(['"])([^'"]+\.pdf)\1/gi)) {
    const href = match[2]
    if (!/argument_transcripts/i.test(href)) continue
    links.push(absolutizeTranscriptHref(href, year))
  }
  return [...new Set(links)].filter(Boolean).sort()
}

function detectSpeaker(line) {
  // Example: "CHIEF JUSTICE ROBERTS: ..." or "JUSTICE ALITO: ..."
  const m = /^\s*(CHIEF JUSTICE ROBERTS|JUSTICE [A-Z]+)\s*:\s*/.exec(line)
  if (!m) return null
  return m[1]
}

function phraseHitsInLine(line) {
  const hits = []
  for (const { phrase, regex } of PHRASE_REGEXES) {
    if (regex.test(line)) hits.push(phrase)
  }
  return hits
}

function normalizeSpace(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function snippetFromLine(line, phrases) {
  // Keep a compact excerpt for auditing; do not exceed ~220 chars.
  const cleaned = normalizeSpace(line)
  const lower = cleaned.toLowerCase()
  let idx = -1
  for (const p of phrases) {
    const i = lower.indexOf(p.toLowerCase())
    if (i !== -1) idx = idx === -1 ? i : Math.min(idx, i)
  }
  if (idx === -1) return cleaned.slice(0, 220)
  const start = Math.max(0, idx - 60)
  const end = Math.min(cleaned.length, idx + 160)
  return cleaned.slice(start, end)
}

async function scanTranscriptsForJusticeMentions({ fromYear, toYear }) {
  const perJustice = new Map(JUSTICES.map((j) => [j.name, []]))
  const contextual = [] // transcript-level contextual hits, not attributed to a justice speaker.
  const excludedFalsePositives = []
  const scanned = []

  for (let year = fromYear; year <= toYear; year += 1) {
    const indexUrl = `https://www.supremecourt.gov/oral_arguments/argument_transcript/${year}`
    const index = await fetchHtml(indexUrl)
    if (!index.ok || !index.html) continue

    const pdfUrls = parseTranscriptPdfLinks(index.html, String(year))
    for (const pdfUrl of pdfUrls) {
      scanned.push(pdfUrl)
      const fetched = await fetchPdfText(pdfUrl)
      if (!fetched.ok || !fetched.text) continue

      const lines = fetched.text.split(/\r?\n/)
      let currentSpeaker = null
      let currentSpeakerIsJustice = false

      for (const rawLine of lines) {
        const line = rawLine ?? ''
        const speaker = detectSpeaker(line)
        if (speaker) {
          currentSpeaker = speaker
          currentSpeakerIsJustice = SPEAKER_TO_JUSTICE.has(speaker)
        }

        const hits = phraseHitsInLine(line)
        if (hits.length === 0) continue

        if (currentSpeakerIsJustice && currentSpeaker) {
          const justiceName = SPEAKER_TO_JUSTICE.get(currentSpeaker)
          perJustice.get(justiceName).push({
            sourceType: 'official transcript',
            bucket: 'direct self-use',
            url: pdfUrl,
            matchedTerms: hits.sort(),
            note: snippetFromLine(line, hits),
          })
          continue
        }

        // Contextual within the transcript; record a few samples but keep it bounded.
        if (contextual.length < 200) {
          contextual.push({
            sourceType: 'official transcript',
            bucket: 'contextual only',
            url: pdfUrl,
            matchedTerms: hits.sort(),
            note: snippetFromLine(line, hits),
          })
        } else {
          excludedFalsePositives.push({
            url: pdfUrl,
            reason: 'contextual_hits_truncated',
            note: 'Contextual (non-justice-speaker) transcript hits were truncated for report size.',
          })
        }
      }
    }
  }

  // De-dupe per justice by (url + phrase set + note) because some transcripts repeat headers.
  const deduped = new Map()
  for (const [name, entries] of perJustice.entries()) {
    const seen = new Set()
    const out = []
    for (const e of entries) {
      const key = `${e.url}\t${e.matchedTerms.join(',')}\t${e.note}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push(e)
    }
    deduped.set(name, out)
  }

  return {
    scannedCount: scanned.length,
    scannedSample: scanned.slice(0, 10),
    perJustice: Object.fromEntries([...deduped.entries()]),
    contextualSample: contextual.slice(0, 50),
    excludedFalsePositives,
  }
}

function bucketForJustice(entries) {
  if (!entries || entries.length === 0) return 'no verified hit'
  const anyDirect = entries.some((e) => e.bucket === 'direct self-use')
  if (anyDirect) return 'direct self-use'
  return 'contextual only'
}

async function main() {
  mkdirSync(resolve('tmp'), { recursive: true })

  const scan = await scanTranscriptsForJusticeMentions({ fromYear: 2005, toYear: 2025 })

  const people = JUSTICES.map((j) => {
    const sources = scan.perJustice[j.name] ?? []
    return {
      name: j.name,
      bucket: bucketForJustice(sources),
      sources,
    }
  })

  const summary = {
    updatedAt: new Date().toISOString(),
    phrases: PHRASES,
    scope: {
      people: JUSTICES.map((j) => j.name),
      sourceFamilies: ['supremecourt.gov oral argument transcript PDFs (official)'],
      years: { from: 2005, to: 2025 },
    },
    scanned: {
      transcriptPdfCount: scan.scannedCount,
    },
    counts: {
      peopleWithDirectSelfUse: people.filter((p) => p.bucket === 'direct self-use').length,
      peopleWithContextualOnly: people.filter((p) => p.bucket === 'contextual only').length,
      peopleWithNoVerifiedHit: people.filter((p) => p.bucket === 'no verified hit').length,
    },
  }

  const out = {
    updatedAt: summary.updatedAt,
    phrases: PHRASES,
    summary,
    people,
    contextualSample: scan.contextualSample,
    excludedFalsePositives: scan.excludedFalsePositives,
  }

  writeFileSync(OUT_JSON_PATH, `${JSON.stringify(out, null, 2)}\n`)

  const md = []
  md.push('# Judicial Bio-Term Audit (Official Oral Argument Transcripts)')
  md.push('')
  md.push(`Updated: ${summary.updatedAt}`)
  md.push('')
  md.push(`Transcript PDFs scanned: ${summary.scanned.transcriptPdfCount}`)
  md.push('')
  md.push('Phrases:')
  for (const p of PHRASES) md.push(`- ${p}`)
  md.push('')
  md.push('## Results')
  md.push('')
  md.push(`Direct self-use: ${summary.counts.peopleWithDirectSelfUse}`)
  md.push(`Contextual only: ${summary.counts.peopleWithContextualOnly}`)
  md.push(`No verified hit: ${summary.counts.peopleWithNoVerifiedHit}`)
  md.push('')

  for (const person of people) {
    md.push(`### ${person.name}`)
    md.push('')
    md.push(`Bucket: ${person.bucket}`)
    md.push('')
    if (person.sources.length === 0) {
      md.push('(no transcript hits found)')
      md.push('')
      continue
    }
    for (const s of person.sources) {
      md.push(`- ${s.bucket} | ${s.sourceType}`)
      md.push(`  ${s.url}`)
      md.push(`  matchedTerms: ${s.matchedTerms.join(', ')}`)
      md.push(`  note: ${s.note}`)
    }
    md.push('')
  }

  if (out.excludedFalsePositives.length > 0) {
    md.push('## Excluded / False Positives')
    md.push('')
    for (const e of out.excludedFalsePositives.slice(0, 50)) {
      md.push(`- ${e.url}`)
      md.push(`  reason: ${e.reason}`)
      md.push(`  note: ${e.note}`)
    }
    md.push('')
  }

  writeFileSync(OUT_MD_PATH, `${md.join('\n')}\n`)

  console.log(
    `Done. Scanned ${summary.scanned.transcriptPdfCount} transcript PDFs. Direct: ${summary.counts.peopleWithDirectSelfUse}, contextual-only: ${summary.counts.peopleWithContextualOnly}, no-hit: ${summary.counts.peopleWithNoVerifiedHit}.`,
  )
  console.log(`Wrote: ${OUT_JSON_PATH}`)
  console.log(`Wrote: ${OUT_MD_PATH}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
