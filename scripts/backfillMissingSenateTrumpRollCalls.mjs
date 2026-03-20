import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { senateTrumpRollCallPool } from './legislativeTrumpRollCalls.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')

function normalizeNameMatch(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(jr|jr\.|sr|sr\.|ii|iii|iv|v)\b/gi, ' ')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function removeSingleLetterNameTokens(value) {
  return value
    .split(' ')
    .filter((token) => token.length > 1)
    .join(' ')
}

function buildNormalizedNameTokens(value) {
  return removeSingleLetterNameTokens(normalizeNameMatch(value))
    .split(' ')
    .filter(Boolean)
}

function uniqueStrings(items) {
  return [...new Set(items.filter(Boolean))]
}

function clampTrumpScore(score) {
  return Math.max(0, Math.min(10, score))
}

function clampTrumpScoreToSingleDecimal(score) {
  return Number(clampTrumpScore(score).toFixed(1))
}

function buildLegislativeTrumpLabel(score) {
  if (score >= 8) {
    return 'Very often pro-Trump in scored votes'
  }

  if (score >= 6.5) {
    return 'Mostly pro-Trump in scored votes'
  }

  if (score >= 4.5) {
    return 'Mixed, slight pro-Trump lean'
  }

  if (score >= 2.5) {
    return 'Mixed, slight anti-Trump lean'
  }

  if (score >= 0.5) {
    return 'Usually not pro-Trump in scored votes'
  }

  return 'Never pro-Trump in scored votes'
}

function getLegislativeTrumpConfidence(sampleSize, selectedCount) {
  if (sampleSize >= Math.ceil(selectedCount * 0.5)) {
    return 'High'
  }

  if (sampleSize >= Math.ceil(selectedCount * 0.25)) {
    return 'Medium'
  }

  return 'Low'
}

function isSkippedLegislativeCast(cast) {
  return cast === 'Did Not Vote' || cast === 'Not Voting' || cast === 'Present'
}

function normalizeLegislativeCast(cast) {
  const normalized = cast.trim().toLowerCase()

  if (normalized === 'yea' || normalized === 'aye') {
    return 'yea'
  }

  if (normalized === 'nay' || normalized === 'no') {
    return 'nay'
  }

  return normalized
}

function getLegislativeCastSide(cast) {
  const normalized = normalizeLegislativeCast(cast)

  if (normalized === 'yea' || normalized === 'aye' || normalized === 'guilty') {
    return 'affirmative'
  }

  if (normalized === 'nay' || normalized === 'no' || normalized === 'not guilty') {
    return 'negative'
  }

  return null
}

function resolveWinningLegislativeSide(resultText, yeaTotal, nayTotal) {
  const normalized = (resultText ?? '').replace(/\s+/g, ' ').trim().toLowerCase()
  const negativePatterns = [
    /\bnot guilty\b/,
    /\bacquitted\b/,
    /\bnot agreed(?: to)?\b/,
    /\bnot adopted\b/,
    /\bnot confirmed\b/,
    /\bnot passed\b/,
    /\bnot invoked\b/,
    /\bnot sustained\b/,
    /\brejected\b/,
    /\bfailed\b/,
    /\bdefeated\b/,
  ]
  const affirmativePatterns = [
    /\bagreed(?: to)?\b/,
    /\badopted\b/,
    /\bconfirmed\b/,
    /\bpassed\b/,
    /\binvoked\b/,
    /\bsustained\b/,
    /\bguilty\b/,
    /\bconvicted\b/,
    /\bratified\b/,
  ]

  for (const pattern of negativePatterns) {
    if (pattern.test(normalized)) {
      return 'negative'
    }
  }

  for (const pattern of affirmativePatterns) {
    if (pattern.test(normalized)) {
      return 'affirmative'
    }
  }

  if (Number.isFinite(yeaTotal) && Number.isFinite(nayTotal) && yeaTotal !== nayTotal) {
    return yeaTotal > nayTotal ? 'affirmative' : 'negative'
  }

  return null
}

function deriveTrumpRollCallOutcome(proTrumpCast, resultText, yeaTotal, nayTotal) {
  const trumpSide = getLegislativeCastSide(proTrumpCast)
  const winningSide = resolveWinningLegislativeSide(resultText, yeaTotal, nayTotal)

  if (!trumpSide || !winningSide) {
    return null
  }

  return trumpSide === winningSide ? 'pro' : 'anti'
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function cleanHtmlText(value) {
  return decodeHtmlEntities(value ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildSenateRollCallPageUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.htm`
}

async function fetchText(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(15000),
    }).catch(() => null)

    if (response?.ok) {
      return response.text()
    }

    if (response && ![403, 429].includes(response.status) && response.status < 500) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)))
  }

  throw new Error(`Failed to fetch ${url} after retries`)
}

function parseSenateVoteHtml(html) {
  const question = cleanHtmlText(html.match(/<question>([\s\S]*?)<\/question>/i)?.[1] ?? '')
  const rollCallNumber = Number(html.match(/<b>\s*Vote Number:\s*<\/b>\s*(\d+)/i)?.[1] ?? Number.NaN)
  const date = cleanHtmlText(html.match(/<b>\s*Vote Date:\s*<\/b>([\s\S]*?)<\/div>/i)?.[1] ?? '')
  const resultText = cleanHtmlText(html.match(/<b>\s*Vote Result:\s*<\/b>([\s\S]*?)<\/div>/i)?.[1] ?? '')
  const billNumber = cleanHtmlText(
    html.match(/<B>(?:Measure|Nomination) Number:\s*<\/B>\s*<a [^>]+>([\s\S]*?)<\/a>/i)?.[1] ?? '',
  )
  const title = cleanHtmlText(
    html.match(/<B>(?:Measure Title|Nomination Description):\s*<\/B>([\s\S]*?)<\/div>/i)?.[1] ?? '',
  )
  const yeaTotal = Number(html.match(/YEAs(?:<span [^>]+>)?(\d+)/i)?.[1] ?? Number.NaN)
  const nayTotal = Number(html.match(/NAYs<\/div>\s*<div[^>]*>(\d+)/i)?.[1] ?? Number.NaN)
  const entries = []

  for (const match of html.matchAll(
    /(?:<span class="contenttext">|<br>)([^<(]+?)\s*\(([DRI])-([A-Z]{2})\),\s*<b>([^<]+)<\/b>/g,
  )) {
    entries.push({
      cast: cleanHtmlText(match[4]),
      partyCode: cleanHtmlText(match[2]),
      stateCode: cleanHtmlText(match[3]),
      surname: cleanHtmlText(match[1]),
    })
  }

  return {
    billNumber: billNumber || undefined,
    date,
    entries,
    nayTotal,
    question,
    resultText,
    rollCallNumber: Number.isFinite(rollCallNumber) ? rollCallNumber : undefined,
    title,
    yeaTotal,
  }
}

function findMatchingSenatorFromPageEntry(entry, senators) {
  const normalizedSurname = removeSingleLetterNameTokens(normalizeNameMatch(entry.surname))
  const candidates = senators.filter((person) => person.stateCode === entry.stateCode)
  const matches = candidates.filter((person) => {
    const tokens = buildNormalizedNameTokens(person.name)
    const personLastOne = tokens.slice(-1).join(' ')
    const personLastTwo = tokens.slice(-2).join(' ')

    return (
      normalizedSurname === personLastOne ||
      normalizedSurname === personLastTwo ||
      normalizedSurname.endsWith(` ${personLastOne}`) ||
      personLastTwo.endsWith(` ${normalizedSurname}`)
    )
  })

  if (matches.length === 1) {
    return matches[0]
  }

  return null
}

function toStoredSnapshot(event, parsed, sourceUrl) {
  return {
    billNumber: parsed.billNumber,
    category: event.category,
    chamber: 'senate',
    congress: event.congress,
    date: parsed.date,
    id: event.id,
    label: event.label,
    nayTotal: parsed.nayTotal,
    proTrumpCast: event.proTrumpCast,
    question: parsed.question,
    rollCallNumber: parsed.rollCallNumber,
    scoreIncluded: event.scoreIncluded !== false,
    session: String(event.session),
    signalTier: event.signalTier ?? 'high_signal_scored',
    sourceUrl,
    title: parsed.title,
    trumpOutcome: deriveTrumpRollCallOutcome(
      event.proTrumpCast,
      parsed.resultText,
      parsed.yeaTotal,
      parsed.nayTotal,
    ),
    yeaTotal: parsed.yeaTotal,
  }
}

async function main() {
  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const selectedSenateRollCalls = senateTrumpRollCallPool.filter((item) => item.selected)
  const scoredSenateCount = selectedSenateRollCalls.filter((item) => item.scoreIncluded !== false).length
  const existingEventsById = new Map(dataset.legislativeTrumpRollCalls.selectedEvents.map((event) => [event.id, event]))
  const requestedIds = process.argv.slice(2)
  const targetIds =
    requestedIds.length > 0
      ? requestedIds
      : selectedSenateRollCalls
          .filter((event) => !existingEventsById.has(event.id))
          .map((event) => event.id)

  if (targetIds.length === 0) {
    console.log('No missing selected Senate Trump roll calls to backfill.')
    return
  }

  const targetEvents = targetIds.map((id) => {
    const event = selectedSenateRollCalls.find((item) => item.id === id)

    if (!event) {
      throw new Error(`Unknown or non-selected Senate roll call id: ${id}`)
    }

    if (existingEventsById.has(id)) {
      throw new Error(`Refusing to backfill an already-stored Senate roll call: ${id}`)
    }

    return event
  })

  const senators = dataset.people.filter(
    (person) => person.branchId === 'legislative' && person.sectionId === 'senate',
  )
  const additionsByPersonId = new Map(
    senators.map((person) => [
      person.id,
      {
        antiVotes: 0,
        evidence: [],
        missedCount: 0,
        notInOfficeCount: 0,
        proVotes: 0,
        rollCallPositions: {},
        sampleSize: 0,
      },
    ]),
  )
  const newEventsById = new Map()

  for (const event of targetEvents) {
    const sourceUrl = buildSenateRollCallPageUrl(event.congress, event.session, event.voteNumber)
    const parsed = parseSenateVoteHtml(await fetchText(sourceUrl))
    const storedSnapshot = toStoredSnapshot(event, parsed, sourceUrl)
    const matchedSenatorIds = new Set()
    const unmatchedEntries = []

    newEventsById.set(event.id, storedSnapshot)

    for (const entry of parsed.entries) {
      const matchedSenator = findMatchingSenatorFromPageEntry(entry, senators)

      if (!matchedSenator) {
        unmatchedEntries.push(`${entry.surname} (${entry.partyCode}-${entry.stateCode})`)
        continue
      }

      matchedSenatorIds.add(matchedSenator.id)

      const additions = additionsByPersonId.get(matchedSenator.id)

      if (!additions) {
        continue
      }

      if (isSkippedLegislativeCast(entry.cast)) {
        additions.rollCallPositions[event.id] = 'missed'
        if (event.scoreIncluded !== false) {
          additions.missedCount += 1
        }
        continue
      }

      const isProTrump =
        normalizeLegislativeCast(entry.cast) === normalizeLegislativeCast(event.proTrumpCast)
      additions.rollCallPositions[event.id] = isProTrump ? 'pro' : 'anti'

      if (event.scoreIncluded === false) {
        continue
      }

      additions.sampleSize += 1

      if (isProTrump) {
        additions.proVotes += 1
      } else {
        additions.antiVotes += 1
      }

      if (event.highlight && additions.evidence.length < 4) {
        additions.evidence.push(
          `${event.label}: ${entry.cast} (${isProTrump ? 'pro-Trump side' : 'not pro-Trump side'}).`,
        )
      }
    }

    if (unmatchedEntries.length > 0) {
      throw new Error(`Unmatched Senate entries for ${event.id}: ${unmatchedEntries.join(', ')}`)
    }

    for (const senator of senators) {
      if (matchedSenatorIds.has(senator.id)) {
        continue
      }

      const additions = additionsByPersonId.get(senator.id)

      if (!additions) {
        continue
      }

      additions.rollCallPositions[event.id] = 'not_in_office'
      if (event.scoreIncluded !== false) {
        additions.notInOfficeCount += 1
      }
    }
  }

  dataset.people = dataset.people.map((person) => {
    if (person.branchId !== 'legislative' || person.sectionId !== 'senate') {
      return person
    }

    const additions = additionsByPersonId.get(person.id)

    if (!additions) {
      return person
    }

    const trumpProCount = Number(person.trumpProCount ?? 0) + additions.proVotes
    const trumpAntiCount = Number(person.trumpAntiCount ?? 0) + additions.antiVotes
    const trumpSampleSize = Number(person.trumpSampleSize ?? 0) + additions.sampleSize
    const trumpMissedCount = Number(person.trumpMissedCount ?? 0) + additions.missedCount
    const trumpNotInOfficeCount =
      Number(person.trumpNotInOfficeCount ?? 0) + additions.notInOfficeCount
    const trumpScore =
      trumpSampleSize === 0 ? 0 : clampTrumpScoreToSingleDecimal((trumpProCount / trumpSampleSize) * 10)
    const trumpConfidence = getLegislativeTrumpConfidence(trumpSampleSize, scoredSenateCount)
    const existingHighlightEvidence = (person.trumpEvidence ?? []).slice(2)
    const highlightEvidence = uniqueStrings([...existingHighlightEvidence, ...additions.evidence]).slice(0, 4)

    return {
      ...person,
      trumpAntiCount,
      trumpAvailableEvents: scoredSenateCount,
      trumpConfidence,
      trumpEvidence: [
        `${trumpProCount} Pro Trump votes and ${trumpAntiCount} Not pro Trump votes across ${trumpSampleSize} counted high-signal scored Senate roll calls.`,
        `Sample size: ${trumpSampleSize} of ${scoredSenateCount} high-signal scored votes. Confidence: ${trumpConfidence}.`,
        ...highlightEvidence,
      ],
      trumpLabel: buildLegislativeTrumpLabel(trumpScore),
      trumpMissedCount,
      trumpNote: `Score is derived from high-signal scored Senate roll calls on this site: ${trumpProCount}/${trumpSampleSize} counted votes on Trump's side, converted to ${trumpScore.toFixed(1)}/10.`,
      trumpNotInOfficeCount,
      trumpProCount,
      trumpRollCallPositions: {
        ...(person.trumpRollCallPositions ?? {}),
        ...additions.rollCallPositions,
      },
      trumpSampleSize,
      trumpScore,
    }
  })

  const houseEvents = dataset.legislativeTrumpRollCalls.selectedEvents.filter((event) => event.chamber === 'house')
  const senateEvents = selectedSenateRollCalls.map((event) => {
    const storedEvent = existingEventsById.get(event.id) ?? newEventsById.get(event.id)

    if (!storedEvent) {
      throw new Error(`Missing stored event snapshot for ${event.id}`)
    }

    return storedEvent
  })

  dataset.legislativeTrumpRollCalls = {
    ...dataset.legislativeTrumpRollCalls,
    selectedEvents: [...houseEvents, ...senateEvents],
    senateCandidateCount: senateTrumpRollCallPool.length,
    senateScoredCount: scoredSenateCount,
    senateSelectedCount: selectedSenateRollCalls.length,
  }

  writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`)
  console.log(`Backfilled ${targetEvents.length} Senate Trump roll calls into ${datasetPath}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
