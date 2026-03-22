export const CANTONS = [
  {
    code: 'ZH',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Zürich',
    nameEn: 'Zurich',
  },
  {
    code: 'BE',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Bern / Berne',
    nameEn: 'Bern',
  },
  {
    code: 'LU',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Luzern',
    nameEn: 'Lucerne',
  },
  {
    code: 'UR',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Uri',
    nameEn: 'Uri',
  },
  {
    code: 'SZ',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Schwyz',
    nameEn: 'Schwyz',
  },
  {
    code: 'OW',
    councilOfStatesSeats: 1,
    isHalfCanton: true,
    mapName: 'Obwalden',
    nameEn: 'Obwalden',
  },
  {
    code: 'NW',
    councilOfStatesSeats: 1,
    isHalfCanton: true,
    mapName: 'Nidwalden',
    nameEn: 'Nidwalden',
  },
  {
    code: 'GL',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Glarus',
    nameEn: 'Glarus',
  },
  {
    code: 'ZG',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Zug',
    nameEn: 'Zug',
  },
  {
    code: 'FR',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Fribourg / Freiburg',
    nameEn: 'Fribourg',
  },
  {
    code: 'SO',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Solothurn',
    nameEn: 'Solothurn',
  },
  {
    code: 'BS',
    councilOfStatesSeats: 1,
    isHalfCanton: true,
    mapName: 'Basel-Stadt',
    nameEn: 'Basel-Stadt',
  },
  {
    code: 'BL',
    councilOfStatesSeats: 1,
    isHalfCanton: true,
    mapName: 'Basel-Landschaft',
    nameEn: 'Basel-Landschaft',
  },
  {
    code: 'SH',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Schaffhausen',
    nameEn: 'Schaffhausen',
  },
  {
    code: 'AR',
    councilOfStatesSeats: 1,
    isHalfCanton: true,
    mapName: 'Appenzell Ausserrhoden',
    nameEn: 'Appenzell Ausserrhoden',
  },
  {
    code: 'AI',
    councilOfStatesSeats: 1,
    isHalfCanton: true,
    mapName: 'Appenzell Innerrhoden',
    nameEn: 'Appenzell Innerrhoden',
  },
  {
    code: 'SG',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'St. Gallen',
    nameEn: 'St. Gallen',
  },
  {
    code: 'GR',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Graubünden / Grigioni / Grischun',
    nameEn: 'Graubünden',
  },
  {
    code: 'AG',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Aargau',
    nameEn: 'Aargau',
  },
  {
    code: 'TG',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Thurgau',
    nameEn: 'Thurgau',
  },
  {
    code: 'TI',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Ticino',
    nameEn: 'Ticino',
  },
  {
    code: 'VD',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Vaud',
    nameEn: 'Vaud',
  },
  {
    code: 'VS',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Valais / Wallis',
    nameEn: 'Valais',
  },
  {
    code: 'NE',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Neuchâtel',
    nameEn: 'Neuchâtel',
  },
  {
    code: 'GE',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Genève',
    nameEn: 'Geneva',
  },
  {
    code: 'JU',
    councilOfStatesSeats: 2,
    isHalfCanton: false,
    mapName: 'Jura',
    nameEn: 'Jura',
  },
] as const

export type CantonCode = (typeof CANTONS)[number]['code']

export type CantonMeta = (typeof CANTONS)[number]

export const CANTON_CODE_TO_META = Object.fromEntries(
  CANTONS.map((canton) => [canton.code, canton]),
) as Record<CantonCode, CantonMeta>

export const CANTON_MAP_NAME_TO_CODE = Object.fromEntries(
  CANTONS.map((canton) => [canton.mapName, canton.code]),
) as Record<string, CantonCode>

export function getCantonOptionLabel(code: CantonCode) {
  const canton = CANTON_CODE_TO_META[code]

  return `${canton.nameEn} (${canton.code})`
}
