function dedupeStrings(values) {
  const seen = new Set()
  const result = []

  for (const value of values) {
    if (!value || seen.has(value)) {
      continue
    }

    seen.add(value)
    result.push(value)
  }

  return result
}

export function stripDiacritics(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const personNamingOverrides = {
  'house-marie-perez-washington-3rd': {
    officialName: 'Marie Gluesenkamp Perez',
    aliases: ['Marie Gluesenkamp Perez'],
    financialDisclosureSearchLastName: 'Gluesenkamp Perez',
    financialDisclosureSearchName: 'Marie Gluesenkamp Perez',
  },
  'house-monica-de-la-cruz-texas-15th': {
    financialDisclosureSearchLastName: 'De La Cruz',
  },
  'house-teresa-leger-fernandez-new-mexico-3rd': {
    financialDisclosureSearchLastName: 'Leger Fernandez',
  },
  'house-jefferson-van-drew-new-jersey-2nd': {
    financialDisclosureSearchLastName: 'Van Drew',
  },
  'house-beth-van-duyne-texas-24th': {
    financialDisclosureSearchLastName: 'Van Duyne',
  },
  'house-derrick-van-orden-wisconsin-3rd': {
    financialDisclosureSearchLastName: 'Van Orden',
  },
  'house-debbie-wasserman-schultz-florida-25th': {
    financialDisclosureSearchLastName: 'Wasserman Schultz',
  },
  'house-ashley-hinson-iowa-2nd': {
    officialName: 'Ashley Hinson Arenholz',
    aliases: ['Ashley Hinson Arenholz'],
    financialDisclosureSearchLastName: 'Arenholz',
    financialDisclosureSearchName: 'Ashley Hinson Arenholz',
  },
  'house-anna-paulina-luna-florida-13th': {
    aliases: ['Anna Luna'],
    financialDisclosureSearchLastName: 'Paulina Luna',
  },
  'house-nydia-velazquez-new-york-7th': {
    aliases: ['Nydia M. Velazquez'],
    financialDisclosureSearchName: 'Nydia M. Velazquez',
  },
  'house-aumua-amata-radewagen-american-samoa-delegate': {
    aliases: ['Aumua Amata'],
    financialDisclosureSearchLastName: 'Amata',
    financialDisclosureSearchName: 'Aumua Amata',
  },
  'senate-jack-reed': {
    officialName: 'John F. Reed',
    aliases: ['John Reed'],
    financialDisclosureSearchName: 'John F. Reed',
  },
  'senate-chuck-grassley': {
    officialName: 'Charles E. Grassley',
    aliases: ['Charles Grassley'],
    financialDisclosureSearchName: 'Charles E. Grassley',
  },
  'senate-ben-ray-lujan': {
    aliases: ['Ben Ray Lujan'],
    financialDisclosureSearchName: 'Ben Ray Lujan',
  },
  'senate-lisa-blunt-rochester': {
    financialDisclosureSearchLastName: 'Blunt Rochester',
  },
  'senate-catherine-cortez-masto': {
    financialDisclosureSearchLastName: 'Cortez Masto',
  },
  'senate-jim-banks': {
    aliases: ['James Banks', 'James E. Banks'],
    financialDisclosureSearchName: 'James Banks',
  },
  'senate-shelley-moore-capito': {
    aliases: ['Shelley Capito', 'Shelley M. Capito'],
    financialDisclosureSearchLastName: undefined,
    financialDisclosureSearchName: 'Shelley Capito',
  },
  'senate-chris-van-hollen': {
    aliases: ['Christopher Van Hollen', 'Christopher J. Van Hollen'],
    financialDisclosureSearchLastName: 'Van Hollen',
  },
  'senate-margaret-wood-hassan': {
    aliases: ['Margaret Hassan', 'Maggie Hassan'],
  },
  'senate-jacky-rosen': {
    aliases: ['Jacklyn Rosen', 'Jacklyn S. Rosen'],
  },
  'senate-bill-cassidy': {
    aliases: ['William Cassidy', 'William M. Cassidy'],
  },
  'senate-bill-hagerty': {
    aliases: ['William Hagerty', 'William F. Hagerty'],
  },
  'senate-mike-lee': {
    aliases: ['Michael Lee', 'Michael S. Lee'],
  },
  'senate-ted-cruz': {
    aliases: ['Rafael Cruz', 'Rafael Edward Cruz'],
  },
  'senate-pete-ricketts': {
    aliases: ['Peter Ricketts', 'John Peter Ricketts'],
  },
  'senate-tommy-tuberville': {
    aliases: ['Thomas Tuberville', 'Thomas H. Tuberville'],
  },
  'senate-ted-budd': {
    aliases: ['Theodore Budd'],
  },
  'senate-katie-boyd-britt': {
    aliases: ['Katie Britt'],
  },
  'senate-tammy-duckworth': {
    officialName: 'Ladda Tammy Duckworth',
    aliases: ['Tammy Duckworth', 'Ladda Duckworth'],
    financialDisclosureSearchName: 'Ladda Tammy Duckworth',
  },
  'senate-richard-j-durbin': {
    aliases: ['Richard Durbin', 'Dick Durbin'],
  },
  'senate-mike-crapo': {
    aliases: ['Michael Crapo', 'Michael D. Crapo'],
  },
  'senate-edward-j-markey': {
    aliases: ['Edward Markey', 'Ed Markey'],
  },
  'senate-jon-ossoff': {
    aliases: ['Jonathan Ossoff', 'Thomas Jonathan Ossoff'],
    financialDisclosureSearchName: 'Thomas Jonathan Ossoff',
  },
}

export function resolvePersonNaming(person) {
  const override = personNamingOverrides[person.id] ?? {}
  const displayName = override.displayName ?? person.displayName ?? person.name
  const officialName = override.officialName ?? person.officialName ?? displayName
  const aliases = dedupeStrings([
    ...(Array.isArray(person.aliases) ? person.aliases : []),
    ...(Array.isArray(override.aliases) ? override.aliases : []),
  ]).filter((alias) => alias !== displayName)

  return {
    aliases: aliases.length ? aliases : undefined,
    displayName,
    financialDisclosureSearchLastName: Object.prototype.hasOwnProperty.call(
      override,
      'financialDisclosureSearchLastName',
    )
      ? override.financialDisclosureSearchLastName
      : person.financialDisclosureSearchLastName,
    financialDisclosureSearchName:
      override.financialDisclosureSearchName ??
      person.financialDisclosureSearchName ??
      officialName ??
      displayName,
    officialName,
  }
}
