import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')
const KNOWN_PARTISAN_SKEW_EXCEPTIONS = new Set([
  // Bipartisan USMCA support pulled Democrats even more strongly onto Trump's preferred side.
  'senate-usmca-waive',
  // Moderates crossed over, but the anti-repeal Medicaid-protection amendment still marks Nay as the Trump side.
  'senate-obamacare-heller-medicaid',
])

function normalizeLegislativeCast(cast) {
  const normalized = (cast ?? '').trim().toLowerCase()

  if (normalized === 'yea' || normalized === 'aye') {
    return 'yea'
  }

  if (normalized === 'nay' || normalized === 'no') {
    return 'nay'
  }

  return normalized
}

function expectedVotePosition(voteCast, proTrumpCast) {
  const cast = normalizeLegislativeCast(voteCast)
  const trumpCast = normalizeLegislativeCast(proTrumpCast)

  if (cast === 'did not vote' || cast === 'not voting' || cast === 'present') {
    return 'missed'
  }

  if (!cast || !trumpCast) {
    return null
  }

  return cast === trumpCast ? 'pro' : 'anti'
}

function main() {
  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const selectedEvents = dataset.legislativeTrumpRollCalls?.selectedEvents ?? []
  const scoredEventIds = new Set(selectedEvents.filter((event) => event.scoreIncluded !== false).map((event) => event.id))
  const duplicateEventIds = [...new Set(selectedEvents.map((event) => event.id).filter((id, index, items) => items.indexOf(id) !== index))]
  const people = dataset.people ?? []
  const legislativePeople = people.filter((person) => person.branchId === 'legislative')

  const executiveHistoryMismatches = []
  const legislativeScoredCountMismatches = []
  const partisanSkewReviewQueue = []

  for (const person of people) {
    for (const service of person.executiveCongressServiceHistory ?? []) {
      for (const vote of service.votes ?? []) {
        const expected = expectedVotePosition(vote.voteCast, vote.proTrumpCast)

        if (expected && vote.position !== expected) {
          executiveHistoryMismatches.push({
            expected,
            personId: person.id,
            position: vote.position,
            voteCast: vote.voteCast,
            voteId: vote.id,
          })
        }
      }
    }

    if (person.branchId !== 'legislative') {
      continue
    }

    const positions = person.trumpRollCallPositions ?? {}
    const scoredPositions = Object.entries(positions).filter(([eventId]) => scoredEventIds.has(eventId))
    const proCount = scoredPositions.filter(([, position]) => position === 'pro').length
    const antiCount = scoredPositions.filter(([, position]) => position === 'anti').length
    const missedCount = scoredPositions.filter(([, position]) => position === 'missed').length
    const notInOfficeCount = scoredPositions.filter(([, position]) => position === 'not_in_office').length

    if (
      proCount !== person.trumpProCount ||
      antiCount !== person.trumpAntiCount ||
      missedCount !== person.trumpMissedCount ||
      notInOfficeCount !== person.trumpNotInOfficeCount
    ) {
      legislativeScoredCountMismatches.push({
        antiActual: antiCount,
        antiStored: person.trumpAntiCount,
        missedActual: missedCount,
        missedStored: person.trumpMissedCount,
        notInOfficeActual: notInOfficeCount,
        notInOfficeStored: person.trumpNotInOfficeCount,
        personId: person.id,
        proActual: proCount,
        proStored: person.trumpProCount,
      })
    }
  }

  for (const event of selectedEvents) {
    if (event.scoreIncluded === false || event.category === 'nominations') {
      continue
    }

    let republicanPro = 0
    let republicanTotal = 0
    let democraticPro = 0
    let democraticTotal = 0

    for (const person of legislativePeople) {
      const position = person.trumpRollCallPositions?.[event.id]

      if (position !== 'pro' && position !== 'anti') {
        continue
      }

      if (person.alignmentLabel === 'Republican') {
        republicanTotal += 1
        if (position === 'pro') {
          republicanPro += 1
        }
      }

      if (person.alignmentLabel === 'Democratic') {
        democraticTotal += 1
        if (position === 'pro') {
          democraticPro += 1
        }
      }
    }

    if (republicanTotal === 0 || democraticTotal === 0) {
      continue
    }

    const republicanRate = republicanPro / republicanTotal
    const democraticRate = democraticPro / democraticTotal
    const skew = Number((republicanRate - democraticRate).toFixed(3))

    if (skew < -0.15 && !KNOWN_PARTISAN_SKEW_EXCEPTIONS.has(event.id)) {
      partisanSkewReviewQueue.push({
        category: event.category,
        chamber: event.chamber,
        democraticPro: `${democraticPro}/${democraticTotal}`,
        id: event.id,
        label: event.label,
        republicanPro: `${republicanPro}/${republicanTotal}`,
        skew,
      })
    }
  }

  partisanSkewReviewQueue.sort((left, right) => left.skew - right.skew)

  const senateProcedureVotes = selectedEvents
    .filter(
      (event) =>
        event.chamber === 'senate' &&
        event.category === 'impeachment' &&
        event.label?.toLowerCase().includes('procedures'),
    )
    .map((event) => ({
      id: event.id,
      label: event.label,
      proTrumpCast: event.proTrumpCast,
      trumpOutcome: event.trumpOutcome,
    }))

  const summary = {
    duplicateSelectedEventIds: duplicateEventIds,
    executiveHistoryMismatches,
    executiveProfilesWithCongressHistory: people.filter(
      (person) => (person.executiveCongressServiceHistory?.length ?? 0) > 0,
    ).length,
    legislativeProfiles: legislativePeople.length,
    legislativeScoredCountMismatches,
    partisanSkewReviewQueue,
    scoredEvents: selectedEvents.filter((event) => event.scoreIncluded !== false).length,
    selectedEvents: selectedEvents.length,
    senateImpeachmentProcedureVotes: senateProcedureVotes,
  }

  console.log(JSON.stringify(summary, null, 2))

  if (
    duplicateEventIds.length > 0 ||
    executiveHistoryMismatches.length > 0 ||
    legislativeScoredCountMismatches.length > 0
  ) {
    process.exitCode = 1
  }
}

main()
