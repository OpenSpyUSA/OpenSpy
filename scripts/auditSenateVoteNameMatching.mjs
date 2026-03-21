import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  assertSenateMatchGuardrail,
  buildNormalizedNameTokens,
  classifySenateNameMatch,
  isSenateNonExactMatch,
  normalizeNameMatch,
  senateNonExactMatchGuardrailsByPersonId,
} from './legislativeVoteMatching.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')
const notePath = resolve(__dirname, '../notes/senate-roll-call-name-audit.md')

async function fetchText(url) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
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

    await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)))
  }

  throw new Error(`Failed to fetch ${url} after retries`)
}

function buildSenateRollCallXmlUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.xml`
}

function parseSenateVoteXml(xml) {
  return [
    ...xml.matchAll(
      /<member>[\s\S]*?<last_name>([^<]+)<\/last_name>[\s\S]*?<first_name>([^<]+)<\/first_name>[\s\S]*?<party>([^<]*)<\/party>[\s\S]*?<state>([^<]*)<\/state>[\s\S]*?<vote_cast>([^<]+)<\/vote_cast>[\s\S]*?<\/member>/g,
    ),
  ].map((match) => ({
    cast: match[5].trim(),
    firstName: match[2].trim(),
    lastName: match[1].trim(),
    name: `${match[2].trim()} ${match[1].trim()}`.trim(),
    partyCode: match[3].trim(),
    stateCode: match[4].trim(),
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

function sentenceCaseLabel(value) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function getAuditCategoriesForMatch(person, match) {
  const categories = []
  const displayNeedsCleanup =
    normalizeNameMatch(person.name) !== buildNormalizedNameTokens(person.name).join(' ')

  if (displayNeedsCleanup) {
    categories.push('display_name_cleanup')
  }

  if (match.firstNameMode === 'equivalent') {
    categories.push('equivalent_first_name')
  }

  if (match.firstNameMode === 'prefix') {
    categories.push('prefix_first_name')
  }

  if (match.surnameMode !== 'last_one_exact') {
    categories.push('compound_or_extended_surname')
  }

  return categories
}

function buildNote(summary, displayCleanupOnlySenators, nonExactGuardrailSenators, guardrailDrift) {
  const lines = [
    '# Senate Roll-Call Name Audit',
    '',
    `Updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## Scope',
    '',
    'This audit re-fetched every currently selected Senate Trump-linked roll call on the site and replayed the live Senate name matcher against all current senators.',
    '',
    '## Summary',
    '',
    `- selected Senate roll calls checked: ${summary.selectedEvents}`,
    `- current senators checked: ${summary.currentSenators}`,
    `- senators with fully exact first-name and surname matching on all matched votes: ${summary.exactOnlySenators}`,
    `- senators needing any display-name cleanup but still matching exactly after normalization: ${summary.displayCleanupOnlySenators}`,
    `- senators requiring a non-exact runtime whitelist rule: ${summary.nonExactGuardrailSenators}`,
    `- current Senate non-exact whitelist entries in code: ${summary.guardrailEntries}`,
    `- senator-event ambiguous matches: ${summary.ambiguousSenatorEvents}`,
    `- same-entry ambiguous collisions: ${summary.ambiguousEntryCollisions}`,
    `- guardrail drift findings: ${summary.guardrailDriftCount}`,
    '',
    '## Display-Cleanup Only Senators',
    '',
  ]

  if (displayCleanupOnlySenators.length === 0) {
    lines.push('None.')
  } else {
    for (const senator of displayCleanupOnlySenators) {
      lines.push(`- ${senator.name} (${senator.stateCode})`)
    }
  }

  lines.push('', '## Non-Exact Runtime Guardrail Senators', '')

  if (nonExactGuardrailSenators.length === 0) {
    lines.push('None.')
  } else {
    for (const senator of nonExactGuardrailSenators) {
      const categories = senator.categories.map(sentenceCaseLabel).join('; ')
      const examples = senator.examples
        .map((example) => `${example.eventLabel} -> XML \`${example.rawVoteName}\``)
        .join('; ')

      lines.push(
        `- ${senator.name} (${senator.stateCode}): ${categories}${examples ? `. Examples: ${examples}.` : '.'}`,
      )
    }
  }

  lines.push('', '## Guardrail', '')
  lines.push(
    'House roll-call scoring is guarded separately: the build scripts hard-fail if any code path tries to use House name matching instead of House Clerk bioguide ID lookup.',
  )
  lines.push(
    'Senate roll-call scoring now permits non-exact name matching only for a fixed whitelist of audited senators and audited XML name forms. Any new non-exact name form throws instead of silently scoring.',
  )

  if (guardrailDrift.length > 0) {
    lines.push('', '## Guardrail Drift', '')

    for (const item of guardrailDrift) {
      lines.push(`- ${item}`)
    }
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  const dataset = JSON.parse(readFileSync(datasetPath, 'utf8'))
  const selectedEvents =
    dataset.legislativeTrumpRollCalls?.selectedEvents?.filter((event) => event.chamber === 'senate') ?? []
  const senators = (dataset.people ?? []).filter(
    (person) => person.branchId === 'legislative' && person.sectionId === 'senate',
  )
  const senatorsByState = new Map()

  for (const senator of senators) {
    const list = senatorsByState.get(senator.stateCode) ?? []
    list.push(senator)
    senatorsByState.set(senator.stateCode, list)
  }

  const senatorAudit = new Map(
    senators.map((senator) => [
      senator.id,
      {
        categories: new Set(),
        examples: [],
        hasNonExactMatch: false,
        id: senator.id,
        matchedEvents: 0,
        name: senator.name,
        stateCode: senator.stateCode,
      },
    ]),
  )

  const ambiguousEntryCollisions = []
  const guardrailDrift = []
  let ambiguousSenatorEvents = 0

  await mapWithConcurrency(selectedEvents, 2, async (event) => {
    const xmlUrl = buildSenateRollCallXmlUrl(event.congress, event.session, event.rollCallNumber)
    const xml = await fetchText(xmlUrl)
    const entries = parseSenateVoteXml(xml)

    for (const senator of senators) {
      const matches = entries
        .map((entry) => {
          const match = classifySenateNameMatch(entry, senator)
          return match ? { entry, match } : null
        })
        .filter(Boolean)

      if (matches.length > 1) {
        ambiguousSenatorEvents += 1
      }

      if (matches.length === 0) {
        continue
      }

      const { match } = matches[0]
      const record = senatorAudit.get(senator.id)

      if (!record) {
        continue
      }

      record.matchedEvents += 1

      const categories = getAuditCategoriesForMatch(senator, match)
      for (const category of categories) {
        record.categories.add(category)
      }

      if (isSenateNonExactMatch(match)) {
        record.hasNonExactMatch = true

        try {
          assertSenateMatchGuardrail(senator, match, event.id)
        } catch (error) {
          guardrailDrift.push(
            `${senator.name} (${senator.stateCode}) on ${event.id}: ${error instanceof Error ? error.message : String(error)}`,
          )
        }
      }

      if (
        (isSenateNonExactMatch(match) || categories.includes('display_name_cleanup')) &&
        record.examples.length < 3
      ) {
        record.examples.push({
          eventId: event.id,
          eventLabel: event.label,
          rawVoteName: match.rawVoteName,
        })
      }
    }

    for (const entry of entries) {
      const stateSenators = senatorsByState.get(entry.stateCode) ?? []
      const matchingNames = stateSenators
        .filter((senator) => classifySenateNameMatch(entry, senator))
        .map((senator) => senator.name)

      if (matchingNames.length > 1) {
        ambiguousEntryCollisions.push({
          eventId: event.id,
          eventLabel: event.label,
          matches: matchingNames,
          rawVoteName: `${entry.firstName} ${entry.lastName}`.trim(),
          stateCode: entry.stateCode,
        })
      }
    }
  })

  const auditedSenators = [...senatorAudit.values()]
  const displayCleanupOnlySenators = auditedSenators
    .filter(
      (record) =>
        record.categories.size === 1 &&
        record.categories.has('display_name_cleanup') &&
        !record.hasNonExactMatch,
    )
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((record) => ({
      name: record.name,
      stateCode: record.stateCode,
    }))

  const nonExactGuardrailSenators = auditedSenators
    .filter((record) => record.hasNonExactMatch)
    .map((record) => ({
      ...record,
      categories: [...record.categories].filter((category) => category !== 'display_name_cleanup'),
    }))
    .sort((left, right) => left.name.localeCompare(right.name))

  const exactOnlySenators = auditedSenators.filter(
    (record) => record.matchedEvents > 0 && record.categories.size === 0,
  ).length

  const observedNonExactIds = new Set(nonExactGuardrailSenators.map((record) => record.id))
  const missingWhitelistIds = [...senateNonExactMatchGuardrailsByPersonId.keys()].filter(
    (personId) => !observedNonExactIds.has(personId),
  )
  for (const personId of missingWhitelistIds) {
    const senator = senators.find((person) => person.id === personId)
    guardrailDrift.push(
      `Whitelist entry ${personId} (${senator?.name ?? 'unknown'}) did not appear as a non-exact match in the current selected vote set.`,
    )
  }

  const summary = {
    ambiguousEntryCollisions: ambiguousEntryCollisions.length,
    ambiguousSenatorEvents,
    currentSenators: senators.length,
    displayCleanupOnlySenators: displayCleanupOnlySenators.length,
    exactOnlySenators,
    guardrailDriftCount: guardrailDrift.length,
    guardrailEntries: senateNonExactMatchGuardrailsByPersonId.size,
    nonExactGuardrailSenators: nonExactGuardrailSenators.length,
    selectedEvents: selectedEvents.length,
  }

  writeFileSync(
    notePath,
    buildNote(summary, displayCleanupOnlySenators, nonExactGuardrailSenators, guardrailDrift),
  )

  console.log(
    JSON.stringify(
      {
        ...summary,
        guardrailDrift,
        notePath,
        nonExactGuardrailSenators: nonExactGuardrailSenators.map((record) => ({
          categories: record.categories,
          examples: record.examples,
          name: record.name,
          stateCode: record.stateCode,
        })),
      },
      null,
      2,
    ),
  )

  if (
    ambiguousEntryCollisions.length > 0 ||
    ambiguousSenatorEvents > 0 ||
    guardrailDrift.length > 0
  ) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
