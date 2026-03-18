export type HouseVacancy = {
  districtLabel: string
  formerMember: string
  openedDate: string
  sourceLabel: string
  sourceUrl: string
  stateCode: string
  stateName: string
}

const HOUSE_VACANCY_SOURCE_LABEL = 'Clerk of the House current vacancies'
const HOUSE_VACANCY_SOURCE_URL = 'https://clerk.house.gov/Members/ViewVacancies'

export const HOUSE_VACANCIES: HouseVacancy[] = [
  {
    districtLabel: 'California 1st district',
    formerMember: 'Doug LaMalfa',
    openedDate: '2026-01-06',
    sourceLabel: HOUSE_VACANCY_SOURCE_LABEL,
    sourceUrl: HOUSE_VACANCY_SOURCE_URL,
    stateCode: 'CA',
    stateName: 'California',
  },
  {
    districtLabel: 'Georgia 14th district',
    formerMember: 'Marjorie Taylor Greene',
    openedDate: '2026-01-05',
    sourceLabel: HOUSE_VACANCY_SOURCE_LABEL,
    sourceUrl: HOUSE_VACANCY_SOURCE_URL,
    stateCode: 'GA',
    stateName: 'Georgia',
  },
  {
    districtLabel: 'New Jersey 11th district',
    formerMember: 'Mikie Sherrill',
    openedDate: '2025-11-20',
    sourceLabel: HOUSE_VACANCY_SOURCE_LABEL,
    sourceUrl: HOUSE_VACANCY_SOURCE_URL,
    stateCode: 'NJ',
    stateName: 'New Jersey',
  },
]
