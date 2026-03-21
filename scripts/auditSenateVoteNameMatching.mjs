import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const datasetPath = resolve(__dirname, '../public/data/governmentData.json')
const notePath = resolve(__dirname, '../notes/senate-roll-call-name-audit.md')

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

function getEquivalentFirstNames(value) {
  return FIRST_NAME_EQUIVALENTS.get(value) ?? [value]
}

function classifyFirstNameMatch(personFirstName, voteFirstName) {
  if (!personFirstName || !voteFirstName) {
    return null
  }

  if (personFirstName === voteFirstName) {
    return 'exact'
  }

  if (
    (personFirstName.startsWith(voteFirstName) || voteFirstName.startsWith(personFirstName)) &&
    Math.min(personFirstName.length, voteFirstName.length) >= 3
  ) {
    return 'prefix'
  }

  const personEquivalents = getEquivalentFirstNames(personFirstName)
  const voteEquivalents = getEquivalentFirstNames(voteFirstName)

  if (personEquivalents.some((candidate) => voteEquivalents.includes(candidate))) {
    return 'equivalent'
  }

  return null
}

function classifySurnameMatch(personLastOne, personLastTwo, voteLastName) {
  if (personLastOne === voteLastName) {
    return 'last_one_exact'
  }

  if (personLastTwo === voteLastName) {
    return 'last_two_exact'
  }

  if (voteLastName.endsWith(` ${personLastOne}`)) {
    return 'vote_last_extends_person_last'
  }

  if (personLastTwo.endsWith(` ${voteLastName}`)) {
    return 'vote_last_is_tail_of_compound'
  }

  return null
}

function classifySenateNameMatch(voteEntry, person) {
  if (person.stateCode !== voteEntry.stateCode) {
    return null
  }

  const voteFirstName = buildNormalizedNameTokens(voteEntry.firstName ?? voteEntry.name)[0] ?? ''
  const voteLastName = removeSingleLetterNameTokens(normalizeNameMatch(voteEntry.lastName ?? voteEntry.name))
  const personTokens = buildNormalizedNameTokens(person.name)

  if (personTokens.length === 0) {
    return null
  }

  const personFirstName = personTokens[0]
  const personLastOne = personTokens.slice(-1).join(' ')
  const personLastTwo = personTokens.slice(-2).join(' ')
  const surnameMode = classifySurnameMatch(personLastOne, personLastTwo, voteLastName)

  if (!surnameMode) {
    return null
  }

  const firstNameMode = classifyFirstNameMatch(personFirstName, voteFirstName)

  if (!firstNameMode) {
    return null
  }

  return {
    firstNameMode,
    personFirstName,
    personLastOne,
    personLastTwo,
    rawVoteName: `${voteEntry.firstName} ${voteEntry.lastName}`.trim(),
    surnameMode,
    voteFirstName,
    voteLastName,
  }
}

function buildSenateRollCallXmlUrl(congress, session, voteNumber) {
  return `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(
    voteNumber,
  ).padStart(5, '0')}.xml`
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'OpenSpy Senate name audit',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return response.text()
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

function buildNote(summary, senatorsWithNotes) {
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
    `- senators needing non-exact handling in at least one matched vote: ${summary.nonExactSenators}`,
    `- senator-event ambiguous matches: ${summary.ambiguousSenatorEvents}`,
    `- same-entry ambiguous collisions: ${summary.ambiguousEntryCollisions}`,
    '',
    '## Non-Exact Senators',
    '',
  ]

  if (senatorsWithNotes.length === 0) {
    lines.push('No current senator needed non-exact handling in the checked vote set.')
  } else {
    for (const senator of senatorsWithNotes) {
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
    'House roll-call scoring is now guarded separately: the build scripts hard-fail if any code path tries to use House name matching instead of House Clerk bioguide ID lookup.',
  )

  if (summary.ambiguousEntryExamples.length > 0) {
    lines.push('', '## Ambiguous Entry Examples', '')

    for (const example of summary.ambiguousEntryExamples) {
      lines.push(
        `- ${example.eventLabel}: XML \`${example.rawVoteName}\` in ${example.stateCode} matched ${example.matches.join(', ')}`,
      )
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
        id: senator.id,
        matchedEvents: 0,
        name: senator.name,
        stateCode: senator.stateCode,
      },
    ]),
  )

  const ambiguousEntryCollisions = []
  let ambiguousSenatorEvents = 0

  await mapWithConcurrency(selectedEvents, 8, async (event) => {
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

      const displayNeedsCleanup =
        normalizeNameMatch(senator.name) !== buildNormalizedNameTokens(senator.name).join(' ')

      if (displayNeedsCleanup) {
        record.categories.add('display_name_cleanup')
      }

      if (match.firstNameMode === 'equivalent') {
        record.categories.add('equivalent_first_name')
      }

      if (match.firstNameMode === 'prefix') {
        record.categories.add('prefix_first_name')
      }

      if (match.surnameMode !== 'last_one_exact') {
        record.categories.add('compound_or_extended_surname')
      }

      if (
        (match.firstNameMode !== 'exact' || match.surnameMode !== 'last_one_exact') &&
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

  const senatorsWithNotes = [...senatorAudit.values()]
    .filter((record) => record.categories.size > 0)
    .map((record) => ({
      ...record,
      categories: [...record.categories],
    }))
    .sort((left, right) => {
      if (right.categories.length !== left.categories.length) {
        return right.categories.length - left.categories.length
      }

      return left.name.localeCompare(right.name)
    })

  const exactOnlySenators = [...senatorAudit.values()].filter(
    (record) => record.matchedEvents > 0 && record.categories.size === 0,
  ).length
  const summary = {
    ambiguousEntryCollisions: ambiguousEntryCollisions.length,
    ambiguousEntryExamples: ambiguousEntryCollisions.slice(0, 10),
    ambiguousSenatorEvents,
    currentSenators: senators.length,
    exactOnlySenators,
    nonExactSenators: senatorsWithNotes.length,
    selectedEvents: selectedEvents.length,
  }

  writeFileSync(notePath, buildNote(summary, senatorsWithNotes))

  console.log(
    JSON.stringify(
      {
        ...summary,
        notePath,
        senatorsWithNotes: senatorsWithNotes.map((record) => ({
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
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
