export const HOUSE_NAME_MATCHING_FORBIDDEN_MESSAGE =
  'House roll-call matching by name is forbidden. Use bioguideId-based lookup only.'

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

export const senateNonExactMatchGuardrailsByPersonId = new Map([
  [
    'senate-bernard-sanders',
    {
      allowedFirstNameModes: ['equivalent'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['bernie'],
      allowedVoteLastNames: ['sanders'],
    },
  ],
  [
    'senate-catherine-cortez-masto',
    {
      allowedFirstNameModes: ['exact'],
      allowedSurnameModes: ['last_two_exact'],
      allowedVoteFirstNames: ['catherine'],
      allowedVoteLastNames: ['cortez masto'],
    },
  ],
  [
    'senate-chris-van-hollen',
    {
      allowedFirstNameModes: ['exact'],
      allowedSurnameModes: ['last_two_exact'],
      allowedVoteFirstNames: ['chris'],
      allowedVoteLastNames: ['van hollen'],
    },
  ],
  [
    'senate-chuck-grassley',
    {
      allowedFirstNameModes: ['equivalent'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['charles'],
      allowedVoteLastNames: ['grassley'],
    },
  ],
  [
    'senate-cindy-hyde-smith',
    {
      allowedFirstNameModes: ['exact'],
      allowedSurnameModes: ['last_two_exact'],
      allowedVoteFirstNames: ['cindy'],
      allowedVoteLastNames: ['hyde smith'],
    },
  ],
  [
    'senate-jack-reed',
    {
      allowedFirstNameModes: ['equivalent'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['john'],
      allowedVoteLastNames: ['reed'],
    },
  ],
  [
    'senate-jacky-rosen',
    {
      allowedFirstNameModes: ['equivalent'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['jacklyn'],
      allowedVoteLastNames: ['rosen'],
    },
  ],
  [
    'senate-lisa-blunt-rochester',
    {
      allowedFirstNameModes: ['exact'],
      allowedSurnameModes: ['last_two_exact'],
      allowedVoteFirstNames: ['lisa'],
      allowedVoteLastNames: ['blunt rochester'],
    },
  ],
  [
    'senate-margaret-wood-hassan',
    {
      allowedFirstNameModes: ['equivalent'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['maggie'],
      allowedVoteLastNames: ['hassan'],
    },
  ],
  [
    'senate-thom-tillis',
    {
      allowedFirstNameModes: ['prefix'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['thomas'],
      allowedVoteLastNames: ['tillis'],
    },
  ],
  [
    'senate-tim-kaine',
    {
      allowedFirstNameModes: ['prefix'],
      allowedSurnameModes: ['last_one_exact'],
      allowedVoteFirstNames: ['timothy'],
      allowedVoteLastNames: ['kaine'],
    },
  ],
])

export function normalizeNameMatch(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(jr|jr\.|sr|sr\.|ii|iii|iv|v)\b/gi, ' ')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

export function removeSingleLetterNameTokens(value) {
  return value
    .split(' ')
    .filter((token) => token.length > 1)
    .join(' ')
}

export function buildNormalizedNameTokens(value) {
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

export function classifySenateNameMatch(voteEntry, person) {
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
  const firstNameMode = classifyFirstNameMatch(personFirstName, voteFirstName)
  const surnameMode = classifySurnameMatch(personLastOne, personLastTwo, voteLastName)

  if (!firstNameMode || !surnameMode) {
    return null
  }

  return {
    exact: firstNameMode === 'exact' && surnameMode === 'last_one_exact',
    firstNameMode,
    personFirstName,
    personLastOne,
    personLastTwo,
    rawVoteName: `${voteEntry.firstName ?? ''} ${voteEntry.lastName ?? ''}`.replace(/\s+/g, ' ').trim(),
    surnameMode,
    voteFirstName,
    voteLastName,
  }
}

export function isSenateNonExactMatch(match) {
  return Boolean(match && !match.exact)
}

function buildSenateMatchContextLabel(person, match, contextLabel) {
  const pieces = [
    `${person.id}`,
    contextLabel ? `during ${contextLabel}` : '',
    `for XML name "${match.rawVoteName || `${match.voteFirstName} ${match.voteLastName}`.trim()}"`,
  ].filter(Boolean)

  return pieces.join(' ')
}

export function assertSenateMatchGuardrail(person, match, contextLabel = '') {
  if (!isSenateNonExactMatch(match)) {
    return
  }

  const guardrail = senateNonExactMatchGuardrailsByPersonId.get(person.id)

  if (!guardrail) {
    throw new Error(
      `Unexpected non-exact Senate name match for ${buildSenateMatchContextLabel(person, match, contextLabel)}.`,
    )
  }

  if (
    guardrail.allowedFirstNameModes &&
    !guardrail.allowedFirstNameModes.includes(match.firstNameMode)
  ) {
    throw new Error(
      `Unexpected Senate first-name match mode "${match.firstNameMode}" for ${buildSenateMatchContextLabel(person, match, contextLabel)}.`,
    )
  }

  if (guardrail.allowedVoteFirstNames && !guardrail.allowedVoteFirstNames.includes(match.voteFirstName)) {
    throw new Error(
      `Unexpected Senate XML first name "${match.voteFirstName}" for ${buildSenateMatchContextLabel(person, match, contextLabel)}.`,
    )
  }

  if (guardrail.allowedSurnameModes && !guardrail.allowedSurnameModes.includes(match.surnameMode)) {
    throw new Error(
      `Unexpected Senate surname match mode "${match.surnameMode}" for ${buildSenateMatchContextLabel(person, match, contextLabel)}.`,
    )
  }

  if (guardrail.allowedVoteLastNames && !guardrail.allowedVoteLastNames.includes(match.voteLastName)) {
    throw new Error(
      `Unexpected Senate XML last name "${match.voteLastName}" for ${buildSenateMatchContextLabel(person, match, contextLabel)}.`,
    )
  }
}

export function getMatchedSenateVoteEntryForPerson(entries, person, contextLabel = '') {
  const matches = []

  for (const entry of entries) {
    const match = classifySenateNameMatch(entry, person)

    if (!match) {
      continue
    }

    assertSenateMatchGuardrail(person, match, contextLabel)
    matches.push({ entry, match })
  }

  if (matches.length > 1) {
    throw new Error(
      `Multiple Senate vote entries matched ${person.id} during ${contextLabel}: ${matches
        .map((item) => item.match.rawVoteName || `${item.match.voteFirstName} ${item.match.voteLastName}`.trim())
        .join(', ')}`,
    )
  }

  return matches[0] ?? null
}

export function findMatchingSenatorForVoteEntry(entry, senators, contextLabel = '') {
  const matches = []

  for (const person of senators) {
    const match = classifySenateNameMatch(entry, person)

    if (!match) {
      continue
    }

    assertSenateMatchGuardrail(person, match, contextLabel)
    matches.push({ match, person })
  }

  if (matches.length > 1) {
    throw new Error(
      `Senate XML name "${matches[0].match.rawVoteName || `${matches[0].match.voteFirstName} ${matches[0].match.voteLastName}`.trim()}" matched multiple senators during ${contextLabel}: ${matches
        .map((item) => item.person.id)
        .join(', ')}`,
    )
  }

  return matches[0] ?? null
}

export function extractBioguideIdFromImageUrl(imageUrl) {
  const match = imageUrl?.match(/\/photo\/[A-Z]\/([A-Z0-9]+)\.jpg$/)
  return match ? match[1] : undefined
}

export function getHouseCastForRepresentative(entries, person) {
  const bioguideId = extractBioguideIdFromImageUrl(person.imageUrl)

  if (!bioguideId) {
    throw new Error(
      `Missing House bioguideId for ${person.id}. ${HOUSE_NAME_MATCHING_FORBIDDEN_MESSAGE}`,
    )
  }

  return entries.get(bioguideId)
}
