import {
  compareIndependentAgenciesByImportance,
  INDEPENDENT_AGENCY_SOURCE_LABEL,
  INDEPENDENT_AGENCY_SOURCE_URL,
  independentAgencyCatalog,
  independentAgencyTotal,
} from '../independentAgencyCatalog'
import type { GovernmentPerson } from '../types'

function normalizeAgencyKey(value: string | undefined) {
  return (value ?? '').trim().toLowerCase()
}

function getIndependentAgencyPeople(peopleById: Map<string, GovernmentPerson>) {
  return [...peopleById.values()]
    .filter((person) => person.sectionId === 'independent-agencies')
    .sort((left, right) => {
      const rankDifference = compareIndependentAgenciesByImportance(
        left.department ?? left.subtitle ?? left.name,
        right.department ?? right.subtitle ?? right.name,
      )

      if (rankDifference !== 0) {
        return rankDifference
      }

      return left.sortOrder - right.sortOrder
    })
}

function getProfiledAgencyPeople(
  agencyPeopleByDepartment: Map<string, GovernmentPerson>,
  peopleById: Map<string, GovernmentPerson>,
) {
  return independentAgencyCatalog
    .flatMap((category) => category.items)
    .map((item) => {
      if (item.featuredProfileId) {
        return peopleById.get(item.featuredProfileId) ?? null
      }

      return agencyPeopleByDepartment.get(normalizeAgencyKey(item.name)) ?? null
    })
    .filter(Boolean) as GovernmentPerson[]
}

export function IndependentAgencyDirectory({
  onOpenPerson,
  peopleById,
  selectedPersonId,
}: {
  onOpenPerson: (personId: string) => void
  peopleById: Map<string, GovernmentPerson>
  selectedPersonId: string | null
}) {
  const agencyPeople = getIndependentAgencyPeople(peopleById)
  const agencyPeopleByDepartment = new Map(
    agencyPeople.map((person) => [normalizeAgencyKey(person.department ?? person.subtitle), person]),
  )
  const profiledPeople = getProfiledAgencyPeople(agencyPeopleByDepartment, peopleById)
  const showFeaturedGrid = profiledPeople.length > 0 && profiledPeople.length <= 12
  const sortedCatalog = [...independentAgencyCatalog]
    .map((category) => ({
      ...category,
      items: [...category.items].sort((left, right) =>
        compareIndependentAgenciesByImportance(left.name, right.name),
      ),
    }))
    .sort((left, right) =>
      compareIndependentAgenciesByImportance(left.items[0]?.name, right.items[0]?.name),
    )

  return (
    <section className="section-card agency-directory">
      <div className="section-card__header agency-directory__header">
        <div>
          <p className="eyebrow">{independentAgencyTotal} organizations in the official list</p>
          <h2>Independent Agencies Landscape</h2>
        </div>
        <p>
          The current U.S. Government Manual groups independent agencies and government
          corporations together. This page re-groups them by function so the executive
          branch is easier to browse.
        </p>
      </div>

      <div className="agency-directory__stats">
        <div className="stat-card">
          <strong>{independentAgencyTotal}</strong>
          <span>Official organizations</span>
        </div>
        <div className="stat-card">
          <strong>{independentAgencyCatalog.length}</strong>
          <span>Site categories</span>
        </div>
        <div className="stat-card">
          <strong>{agencyPeople.length}</strong>
          <span>Profiled leaders here</span>
        </div>
      </div>

      <div className="agency-directory__source">
        <p>
          This is a site taxonomy for readability, not an official federal taxonomy.
        </p>
        <a href={INDEPENDENT_AGENCY_SOURCE_URL} rel="noreferrer" target="_blank">
          {INDEPENDENT_AGENCY_SOURCE_LABEL}
        </a>
      </div>

      {showFeaturedGrid ? (
        <div className="agency-directory__featured">
          <div>
            <p className="eyebrow">Profiled Now</p>
            <h3>Major Chairs Already On This Site</h3>
          </div>
          <div className="agency-directory__featured-grid">
            {profiledPeople.map((person) => (
              <button
                className={`agency-featured-card${
                  selectedPersonId === person.id ? ' is-selected' : ''
                }`}
                key={person.id}
                onClick={() => onOpenPerson(person.id)}
                type="button"
              >
                <strong>{person.department ?? person.subtitle ?? person.name}</strong>
                <span>{person.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="agency-tree">
        {sortedCatalog.map((category) => (
          <article className="agency-group" key={category.id}>
            <div className="agency-group__header">
              <p className="eyebrow">{category.items.length} agencies</p>
              <h3>{category.label}</h3>
              <p>{category.description}</p>
            </div>

            <ul className="agency-group__list">
              {category.items.map((item) => {
                const profiledPerson =
                  (item.featuredProfileId ? peopleById.get(item.featuredProfileId) ?? null : null) ??
                  agencyPeopleByDepartment.get(normalizeAgencyKey(item.name)) ??
                  null

                return (
                  <li key={item.name}>
                    {profiledPerson ? (
                      <button
                        className={`agency-node agency-node--button${
                          selectedPersonId === profiledPerson.id ? ' is-selected' : ''
                        }`}
                        onClick={() => onOpenPerson(profiledPerson.id)}
                        type="button"
                      >
                        <span className="agency-node__copy">
                          <strong>{item.name}</strong>
                          <span>{item.typeLabel}</span>
                        </span>
                        <span className="agency-node__status">Open chair</span>
                      </button>
                    ) : (
                      <div className="agency-node">
                        <span className="agency-node__copy">
                          <strong>{item.name}</strong>
                          <span>{item.typeLabel}</span>
                        </span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
