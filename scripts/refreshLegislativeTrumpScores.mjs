import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import {
  houseTrumpRollCallPool,
  senateTrumpRollCallPool,
} from './legislativeTrumpRollCalls.mjs'

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

const FIRST_NAME_EQUIVALENTS = new Map(
  [
    ['bernie', ['bernard']],
    ['bill', ['william']],
    ['chuck', ['charles']],
    ['chris', ['christopher']],
    ['jack', ['john']],
    ['jacky', ['jacklyn', 'jackie']],
    ['jim', ['james']],
    ['katie', ['katherine']],
    ['maggie', ['margaret']],
    ['thom', ['thomas']],
    ['tim', ['timothy']],
  ].flatMap(([key, values]) => [
    [key, [key, ...values]],
    ...values.map((value) => [value, [key, ...values]]),
  ]),
)

function buildNormalizedNameTokens(value) {
  return removeSingleLetterNameTokens(normalizeNameMatch(value))
    .split(' ')
    .filter(Boolean)
}

function getEquivalentFirstNames(value) {
  return FIRST_NAME_EQUIVALENTS.get(value) ?? [value]
}

function firstNamesLikelyMatch(left, right) {
  if (!left || !right) {
    return false
  }

  if (left === right) {
    return true
  }

  if ((left.startsWith(right) || right.startsWith(left)) && Math.min(left.length, right.length) >= 3) {
    return true
  }

  const leftEquivalents = getEquivalentFirstNames(left)
  const rightEquivalents = getEquivalentFirstNames(right)

  return leftEquivalents.some((candidate) => rightEquivalents.includes(candidate))
}

function extractBioguideIdFromImageUrl(imageUrl) {
  const match = imageUrl?.match(/\/photo\/[A-Z]\/([A-Z0-9]+)\.jpg$/)
  return match ? match[1] : undefined
}

function findMatchingSenator(voteEntry, senators) {
  const voteFirstName = buildNormalizedNameTokens(voteEntry.firstName ?? voteEntry.name)[0] ?? ''
  const voteLastName = removeSingleLetterNameTokens(normalizeNameMatch(voteEntry.lastName ?? voteEntry.name))
  const candidates = senators.filter((person) => person.stateCode === voteEntry.stateCode)

  return (
    candidates.find((person) => {
      const tokens = buildNormalizedNameTokens(person.name)

      if (tokens.length === 0) {
        return false
      }

      const personFirstName = tokens[0]
      const personLastOne = tokens.slice(-1).join(' ')
      const personLastTwo = tokens.slice(-2).join(' ')
      const surnameMatches =
        personLastOne === voteLastName ||
        personLastTwo === voteLastName ||
        voteLastName.endsWith(` ${personLastOne}`) ||
        personLastTwo.endsWith(` ${voteLastName}`)

      return surnameMatches && firstNamesLikelyMatch(personFirstName, voteFirstName)
    }) ?? null
  )
}

function clampTrumpScore(score) {
  return Math.max(0, Math.min(10, score))
}

function clampTrumpScoreToSingleDecimal(score) {
  return Number(clampTrumpScore(score).toFixed(1))
}

function uniqueStrings(items) {
  return [...new Set(items.filter(Boolean))]
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

function rebuildExecutiveCongressServiceHistory(services, snapshotById) {
  return (services ?? []).map((service) => {
    let proCount = 0
    let antiCount = 0
    let missedCount = 0
    let directVoteCount = 0
    let broadVoteCount = 0

    const votes = (service.votes ?? []).map((vote) => {
      const snapshot = snapshotById.get(vote.id)

      if (!snapshot) {
        return vote
      }

      const skipped = isSkippedLegislativeCast(vote.voteCast)
      const position = skipped
        ? 'missed'
        : normalizeLegislativeCast(vote.voteCast) === normalizeLegislativeCast(snapshot.proTrumpCast)
          ? 'pro'
          : 'anti'

      if (snapshot.scoreIncluded === false) {
        broadVoteCount += 1
      } else {
        directVoteCount += 1
      }

      if (position === 'missed') {
        missedCount += 1
      } else if (snapshot.scoreIncluded !== false) {
        if (position === 'pro') {
          proCount += 1
        } else {
          antiCount += 1
        }
      }

      return {
        ...vote,
        actionTime: snapshot.actionTime,
        billNumber: snapshot.billNumber,
        category: snapshot.category,
        chamber: snapshot.chamber,
        congress: snapshot.congress,
        date: snapshot.date,
        label: snapshot.label,
        nayTotal: snapshot.nayTotal,
        position,
        proTrumpCast: snapshot.proTrumpCast,
        question: snapshot.question,
        rollCallNumber: snapshot.rollCallNumber,
        scoreIncluded: snapshot.scoreIncluded !== false,
        signalTier: snapshot.signalTier ?? 'high_signal_scored',
        sourceUrl: snapshot.sourceUrl,
        title: snapshot.title,
        trumpOutcome: snapshot.trumpOutcome,
        yeaTotal: snapshot.yeaTotal,
      }
    })

    return {
      ...service,
      antiCount,
      broadVoteCount,
      countedVoteCount: proCount + antiCount,
      directVoteCount,
      missedCount,
      proCount,
      votes,
    }
  })
}

function rebuildExecutiveTrumpMetrics(person, services, scoredHouseCount, scoredSenateCount) {
  let proVotes = 0
  let antiVotes = 0
  let missedCount = 0
  let directVoteCount = 0
  let broadVoteCount = 0
  const chambers = new Set()

  for (const service of services) {
    proVotes += service.proCount ?? 0
    antiVotes += service.antiCount ?? 0
    missedCount += service.missedCount ?? 0
    directVoteCount += service.directVoteCount ?? 0
    broadVoteCount += service.broadVoteCount ?? 0

    if (service.chamber) {
      chambers.add(service.chamber)
    }
  }

  const sampleSize = proVotes + antiVotes

  if (sampleSize === 0) {
    return {
      ...person,
      executiveCongressServiceHistory: services,
    }
  }

  const availableEvents = [...chambers].reduce((total, chamber) => {
    if (chamber === 'senate') {
      return total + scoredSenateCount
    }

    return total + scoredHouseCount
  }, 0)
  const confidence = getLegislativeTrumpConfidence(sampleSize, availableEvents || sampleSize)
  const derivedScore = clampTrumpScoreToSingleDecimal((proVotes / sampleSize) * 10)
  const chamberLabel =
    chambers.size > 1 ? 'House and Senate' : chambers.has('senate') ? 'Senate' : 'House'
  const noteParts = [
    `Score is derived from selected Trump-linked ${chamberLabel} roll calls on this site during this official's time in Congress: ${proVotes}/${sampleSize} counted votes on Trump's side, converted to ${derivedScore.toFixed(1)}/10.`,
  ]

  if (missedCount > 0) {
    noteParts.push(`Missed ${missedCount} direct votes.`)
  }

  if (broadVoteCount > 0) {
    noteParts.push(`${broadVoteCount} broader unscored votes are listed separately below.`)
  }

  const evidence = [
    `${proVotes} Pro Trump votes and ${antiVotes} Not pro Trump votes across ${sampleSize} counted ${chamberLabel} votes during this official's past service in Congress.`,
    `Sample size: ${sampleSize}${availableEvents ? ` of ${availableEvents}` : ''} selected scored votes. Confidence: ${confidence}.`,
  ]

  if (missedCount > 0) {
    evidence.push(`Missed or abstained on ${missedCount} direct votes in the listed record.`)
  }

  if (broadVoteCount > 0) {
    evidence.push(
      `${broadVoteCount} broader, unscored Trump-linked votes are also listed in the congressional history section.`,
    )
  }

  return {
    ...person,
    executiveCongressServiceHistory: services,
    trumpAntiCount: antiVotes,
    trumpAvailableEvents: availableEvents || undefined,
    trumpConfidence: confidence,
    trumpEvidence: uniqueStrings(evidence),
    trumpLabel: buildLegislativeTrumpLabel(derivedScore),
    trumpMissedCount: missedCount,
    trumpNote: noteParts.join(' '),
    trumpProCount: proVotes,
    trumpSampleSize: sampleSize,
    trumpScore: derivedScore,
  }
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

function buildHouseRollCallXmlUrl(year, rollNumber) {
  return `https://clerk.house.gov/evs/${year}/roll${String(rollNumber).padStart(3, '0')}.xml`
}

function encodeHouseVotesTitle(title) {
  return encodeURIComponent(title).replace(/%2C/g, ',')
}

function buildHouseRollCallPageUrl(year, rollNumber, title) {
  const baseUrl = `https://clerk.house.gov/Votes/${year}${Number(rollNumber)}`

  if (!title) {
    return baseUrl
  }

  return `${baseUrl}?Title=${encodeHouseVotesTitle(title)}`
}

function buildSenateRollCallXmlUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.xml`
}

function buildSenateRollCallPageUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.htm`
}

function formatLegislationNumber(value) {
  const cleaned = value.replace(/\./g, ' ').replace(/\s+/g, ' ').trim()

  if (!cleaned) {
    return ''
  }

  const tokens = cleaned.split(' ')
  const numberIndex = tokens.findIndex((token) => /\d/.test(token))

  if (numberIndex <= 0) {
    return cleaned
  }

  const prefix = tokens
    .slice(0, numberIndex)
    .map((token) => (/^[A-Za-z]+$/.test(token) ? `${token.toUpperCase()}.` : token))

  return [...prefix, ...tokens.slice(numberIndex)].join(' ')
}

function parseHouseVoteXml(xml) {
  const congress = Number(xml.match(/<congress>(\d+)<\/congress>/)?.[1] ?? Number.NaN)
  const session = xml.match(/<session>([^<]+)<\/session>/)?.[1]?.trim() ?? ''
  const date = xml.match(/<action-date>([^<]+)<\/action-date>/)?.[1]?.trim() ?? ''
  const actionTime = xml.match(/<action-time(?: [^>]*)?>([^<]+)<\/action-time>/)?.[1]?.trim() ?? ''
  const rollCallNumber = Number(xml.match(/<rollcall-num>(\d+)<\/rollcall-num>/)?.[1] ?? Number.NaN)
  const billNumber = formatLegislationNumber(xml.match(/<legis-num>([^<]+)<\/legis-num>/)?.[1]?.trim() ?? '')
  const question = xml.match(/<vote-question>([^<]+)<\/vote-question>/)?.[1]?.trim() ?? ''
  const resultText = xml.match(/<vote-result>([^<]+)<\/vote-result>/)?.[1]?.trim() ?? ''
  const title = xml.match(/<vote-desc>([^<]+)<\/vote-desc>/)?.[1]?.trim() ?? ''
  const yeaTotal = Number(xml.match(/<totals-by-vote>[\s\S]*?<yea-total>(\d+)<\/yea-total>/)?.[1] ?? Number.NaN)
  const nayTotal = Number(xml.match(/<totals-by-vote>[\s\S]*?<nay-total>(\d+)<\/nay-total>/)?.[1] ?? Number.NaN)
  const entries = new Map()

  for (const match of xml.matchAll(
    /<recorded-vote><legislator[^>]+name-id="([A-Z]\d{6})"[\s\S]*?<\/legislator><vote>([^<]+)<\/vote><\/recorded-vote>/g,
  )) {
    entries.set(match[1], match[2].trim())
  }

  return {
    actionTime,
    billNumber: billNumber || undefined,
    congress: Number.isFinite(congress) ? congress : undefined,
    date,
    entries,
    nayTotal,
    question,
    resultText,
    rollCallNumber: Number.isFinite(rollCallNumber) ? rollCallNumber : undefined,
    session: session || undefined,
    title,
    yeaTotal,
  }
}

function parseSenateVoteXml(xml) {
  const congress = Number(xml.match(/<congress>(\d+)<\/congress>/)?.[1] ?? Number.NaN)
  const session = xml.match(/<session>([^<]+)<\/session>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const rollCallNumber = Number(xml.match(/<vote_number>(\d+)<\/vote_number>/)?.[1] ?? Number.NaN)
  const billNumber = formatLegislationNumber(
    xml.match(/<document_name>([\s\S]*?)<\/document_name>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
  )
  const date = xml.match(/<vote_date>([^<]+)<\/vote_date>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const question = xml.match(/<question>([\s\S]*?)<\/question>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const resultText =
    xml.match(/<vote_result_text>([\s\S]*?)<\/vote_result_text>/)?.[1]?.replace(/\s+/g, ' ').trim() ??
    xml.match(/<vote_result>([\s\S]*?)<\/vote_result>/)?.[1]?.replace(/\s+/g, ' ').trim() ??
    ''
  const title = xml.match(/<vote_title>([\s\S]*?)<\/vote_title>/)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
  const yeaTotal = Number(xml.match(/<yeas>(\d+)<\/yeas>/)?.[1] ?? Number.NaN)
  const nayTotal = Number(xml.match(/<nays>(\d+)<\/nays>/)?.[1] ?? Number.NaN)
  const entries = []

  for (const match of xml.matchAll(
    /<member>[\s\S]*?<last_name>([^<]+)<\/last_name>[\s\S]*?<first_name>([^<]+)<\/first_name>[\s\S]*?<party>([^<]*)<\/party>[\s\S]*?<state>([^<]*)<\/state>[\s\S]*?<vote_cast>([^<]+)<\/vote_cast>[\s\S]*?<\/member>/g,
  )) {
    entries.push({
      cast: match[5].trim(),
      name: `${match[2].trim()} ${match[1].trim()}`.trim(),
      partyCode: match[3].trim(),
      stateCode: match[4].trim(),
    })
  }

  return {
    billNumber: billNumber || undefined,
    congress: Number.isFinite(congress) ? congress : undefined,
    date,
    entries,
    nayTotal,
    question,
    resultText,
    rollCallNumber: Number.isFinite(rollCallNumber) ? rollCallNumber : undefined,
    session: session || undefined,
    title,
    yeaTotal,
  }
}

async function fetchText(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        accept: 'application/xml,text/xml,text/html;q=0.9,*/*;q=0.8',
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

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length)
  let currentIndex = 0

  async function worker() {
    while (true) {
      const index = currentIndex
      currentIndex += 1

      if (index >= items.length) {
        return
      }

      results[index] = await mapper(items[index], index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, () => worker()),
  )

  return results
}

async function buildSelectedLegislativeRollCallSnapshots() {
  const selectedHouseRollCalls = houseTrumpRollCallPool.filter((item) => item.selected)
  const selectedSenateRollCalls = senateTrumpRollCallPool.filter((item) => item.selected)
  const scoredHouseRollCalls = selectedHouseRollCalls.filter((item) => item.scoreIncluded !== false)
  const scoredSenateRollCalls = selectedSenateRollCalls.filter((item) => item.scoreIncluded !== false)
  const selectedRollCalls = [...selectedHouseRollCalls, ...selectedSenateRollCalls]

  const snapshots = await mapWithConcurrency(selectedRollCalls, 6, async (event) => {
    if (event.chamber === 'house') {
      const xmlUrl = buildHouseRollCallXmlUrl(event.year, event.rollNumber)
      const parsed = parseHouseVoteXml(await fetchText(xmlUrl))
      const sourceUrl = buildHouseRollCallPageUrl(event.year, event.rollNumber, parsed.title || event.label)

      return {
        ...event,
        actionTime: parsed.actionTime,
        billNumber: parsed.billNumber,
        congress: parsed.congress,
        date: parsed.date,
        entries: parsed.entries,
        nayTotal: parsed.nayTotal,
        question: parsed.question,
        rollCallNumber: parsed.rollCallNumber,
        session: parsed.session,
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

    const xmlUrl = buildSenateRollCallXmlUrl(event.congress, event.session, event.voteNumber)
    const sourceUrl = buildSenateRollCallPageUrl(event.congress, event.session, event.voteNumber)
    const parsed = parseSenateVoteXml(await fetchText(xmlUrl))

    return {
      ...event,
      billNumber: parsed.billNumber,
      congress: parsed.congress,
      date: parsed.date,
      entries: parsed.entries,
      nayTotal: parsed.nayTotal,
      question: parsed.question,
      rollCallNumber: parsed.rollCallNumber,
      session: parsed.session,
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
  })

  return {
    scoredHouseCount: scoredHouseRollCalls.length,
    scoredSenateCount: scoredSenateRollCalls.length,
    selectedHouseCount: selectedHouseRollCalls.length,
    selectedSenateCount: selectedSenateRollCalls.length,
    snapshots,
  }
}

async function main() {
  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const people = dataset.people ?? []
  const senators = people.filter((person) => person.branchId === 'legislative' && person.sectionId === 'senate')
  const representatives = people.filter(
    (person) => person.branchId === 'legislative' && person.sectionId === 'house',
  )
  const { scoredHouseCount, scoredSenateCount, selectedHouseCount, selectedSenateCount, snapshots } =
    await buildSelectedLegislativeRollCallSnapshots()
  const snapshotById = new Map(snapshots.map((snapshot) => [snapshot.id, snapshot]))
  const metricsByPersonId = new Map()

  for (const person of [...senators, ...representatives]) {
    metricsByPersonId.set(person.id, {
      antiVotes: 0,
      availableEvents: person.sectionId === 'senate' ? scoredSenateCount : scoredHouseCount,
      evidence: [],
      missedCount: 0,
      notInOfficeCount: 0,
      proVotes: 0,
      rollCallPositions: {},
      sampleSize: 0,
    })
  }

  for (const snapshot of snapshots) {
    if (snapshot.chamber === 'house') {
      for (const person of representatives) {
        const metrics = metricsByPersonId.get(person.id)
        const bioguideId = extractBioguideIdFromImageUrl(person.imageUrl)
        const cast = bioguideId ? snapshot.entries.get(bioguideId) : undefined

        if (!metrics) {
          continue
        }

        if (!cast) {
          metrics.rollCallPositions[snapshot.id] = 'not_in_office'
          if (snapshot.scoreIncluded !== false) {
            metrics.notInOfficeCount += 1
          }
          continue
        }

        if (isSkippedLegislativeCast(cast)) {
          metrics.rollCallPositions[snapshot.id] = 'missed'
          if (snapshot.scoreIncluded !== false) {
            metrics.missedCount += 1
          }
          continue
        }

        const isProTrump =
          normalizeLegislativeCast(cast) === normalizeLegislativeCast(snapshot.proTrumpCast)
        metrics.rollCallPositions[snapshot.id] = isProTrump ? 'pro' : 'anti'

        if (snapshot.scoreIncluded === false) {
          continue
        }

        metrics.sampleSize += 1

        if (isProTrump) {
          metrics.proVotes += 1
        } else {
          metrics.antiVotes += 1
        }

        if (snapshot.highlight && metrics.evidence.length < 4) {
          metrics.evidence.push(
            `${snapshot.label}: ${cast} (${isProTrump ? 'pro-Trump side' : 'not pro-Trump side'}).`,
          )
        }
      }

      continue
    }

    for (const person of senators) {
      const metrics = metricsByPersonId.get(person.id)

      if (!metrics) {
        continue
      }

      const matchedEntry = snapshot.entries.find((entry) => {
        const candidate = findMatchingSenator(entry, [person])
        return candidate?.id === person.id
      })

      if (!matchedEntry) {
        metrics.rollCallPositions[snapshot.id] = 'not_in_office'
        if (snapshot.scoreIncluded !== false) {
          metrics.notInOfficeCount += 1
        }
        continue
      }

      if (isSkippedLegislativeCast(matchedEntry.cast)) {
        metrics.rollCallPositions[snapshot.id] = 'missed'
        if (snapshot.scoreIncluded !== false) {
          metrics.missedCount += 1
        }
        continue
      }

      const isProTrump =
        normalizeLegislativeCast(matchedEntry.cast) ===
        normalizeLegislativeCast(snapshot.proTrumpCast)
      metrics.rollCallPositions[snapshot.id] = isProTrump ? 'pro' : 'anti'

      if (snapshot.scoreIncluded === false) {
        continue
      }

      metrics.sampleSize += 1

      if (isProTrump) {
        metrics.proVotes += 1
      } else {
        metrics.antiVotes += 1
      }

      if (snapshot.highlight && metrics.evidence.length < 4) {
        metrics.evidence.push(
          `${snapshot.label}: ${matchedEntry.cast} (${isProTrump ? 'pro-Trump side' : 'not pro-Trump side'}).`,
        )
      }
    }
  }

  dataset.people = people.map((person) => {
    if (person.branchId === 'executive' && person.executiveCongressServiceHistory?.length) {
      const services = rebuildExecutiveCongressServiceHistory(
        person.executiveCongressServiceHistory,
        snapshotById,
      )

      return rebuildExecutiveTrumpMetrics(person, services, scoredHouseCount, scoredSenateCount)
    }

    if (person.branchId !== 'legislative') {
      return person
    }

    const metrics = metricsByPersonId.get(person.id)

    if (!metrics) {
      return person
    }

    const derivedScore =
      metrics.sampleSize === 0
        ? 0
        : clampTrumpScoreToSingleDecimal((metrics.proVotes / metrics.sampleSize) * 10)
    const confidence = getLegislativeTrumpConfidence(metrics.sampleSize, metrics.availableEvents)
    const noteParts = [
      `Score is derived from high-signal scored ${person.sectionId === 'senate' ? 'Senate' : 'House'} roll calls on this site: ${metrics.proVotes}/${metrics.sampleSize} counted votes on Trump's side, converted to ${derivedScore.toFixed(1)}/10.`,
    ]

    return {
      ...person,
      trumpAntiCount: metrics.antiVotes,
      trumpAvailableEvents: metrics.availableEvents,
      trumpConfidence: confidence,
      trumpEvidence: uniqueStrings([
        `${metrics.proVotes} Pro Trump votes and ${metrics.antiVotes} Not pro Trump votes across ${metrics.sampleSize} counted high-signal scored ${person.sectionId === 'senate' ? 'Senate' : 'House'} roll calls.`,
        `Sample size: ${metrics.sampleSize} of ${metrics.availableEvents} high-signal scored votes. Confidence: ${confidence}.`,
        ...metrics.evidence,
      ]),
      trumpLabel: buildLegislativeTrumpLabel(derivedScore),
      trumpMissedCount: metrics.missedCount,
      trumpNote: noteParts.join(' '),
      trumpNotInOfficeCount: metrics.notInOfficeCount,
      trumpProCount: metrics.proVotes,
      trumpRollCallPositions: metrics.rollCallPositions,
      trumpSampleSize: metrics.sampleSize,
      trumpScore: derivedScore,
    }
  })

  dataset.legislativeTrumpRollCalls = {
    houseCandidateCount: houseTrumpRollCallPool.length,
    houseScoredCount: scoredHouseCount,
    houseSelectedCount: selectedHouseCount,
    selectedEvents: snapshots.map((snapshot) => ({
      actionTime: snapshot.actionTime,
      billNumber: snapshot.billNumber,
      category: snapshot.category,
      chamber: snapshot.chamber,
      congress: snapshot.congress,
      date: snapshot.date,
      id: snapshot.id,
      label: snapshot.label,
      nayTotal: snapshot.nayTotal,
      proTrumpCast: snapshot.proTrumpCast,
      question: snapshot.question,
      rollCallNumber: snapshot.rollCallNumber,
      scoreIncluded: snapshot.scoreIncluded !== false,
      session: snapshot.session,
      signalTier: snapshot.signalTier ?? 'high_signal_scored',
      sourceUrl: snapshot.sourceUrl,
      title: snapshot.title,
      trumpOutcome: snapshot.trumpOutcome,
      yeaTotal: snapshot.yeaTotal,
    })),
    senateCandidateCount: senateTrumpRollCallPool.length,
    senateScoredCount: scoredSenateCount,
    senateSelectedCount: selectedSenateCount,
  }

  writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`)
  console.log(
    `Updated legislative Trump scores for ${senators.length} senators and ${representatives.length} House members.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
