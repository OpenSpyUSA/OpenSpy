import { useState } from 'react'
import { Avatar } from './components/Avatar'
import { SwissCantonMap } from './components/SwissCantonMap'
import {
  CANTONS,
  CANTON_CODE_TO_META,
  getCantonOptionLabel,
  type CantonCode,
} from './cantonMeta'
import {
  branchOrder,
  PARTY_STYLES,
  switzerlandDataset,
  type BranchId,
  type BranchOverview,
  type ChamberId,
  type Person,
} from './switzerlandData'
import './App.css'

const snapshotDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})

function formatSnapshotDate(value: string) {
  return snapshotDateFormatter.format(new Date(`${value}T00:00:00Z`))
}

function getBranchById(branchId: BranchId) {
  const branch = switzerlandDataset.branches.find((entry) => entry.id === branchId)

  if (!branch) {
    throw new Error(`Unknown branch: ${branchId}`)
  }

  return branch
}

function getBranchPeople(branchId: BranchId) {
  return switzerlandDataset.people
    .filter((person) => person.branchId === branchId)
    .sort((left, right) => left.sortOrder - right.sortOrder)
}

function getPartyStyle(partyLabel?: string) {
  return PARTY_STYLES[partyLabel ?? ''] ?? null
}

function getAge(birthDate: string | undefined, asOfDate: string) {
  if (!birthDate) {
    return null
  }

  const reference = new Date(`${asOfDate}T00:00:00Z`)
  const birth = new Date(`${birthDate}T00:00:00Z`)

  if (Number.isNaN(reference.getTime()) || Number.isNaN(birth.getTime())) {
    return null
  }

  let age = reference.getUTCFullYear() - birth.getUTCFullYear()
  const monthDelta = reference.getUTCMonth() - birth.getUTCMonth()
  const dayDelta = reference.getUTCDate() - birth.getUTCDate()

  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
    age -= 1
  }

  return age
}

function getBirthLabel(person: Person) {
  if (person.birthDate) {
    return person.birthDate
  }

  if (person.birthYear) {
    return String(person.birthYear)
  }

  return null
}

function getCantonLabel(person: Person) {
  if (!person.cantonCode) {
    return null
  }

  const meta = CANTON_CODE_TO_META[person.cantonCode as CantonCode]

  if (!meta) {
    return person.cantonName && person.cantonCode
      ? `${person.cantonName} (${person.cantonCode})`
      : null
  }

  return getCantonOptionLabel(meta.code)
}

function getPersonMeta(person: Person, asOfDate: string) {
  const age = getAge(person.birthDate, asOfDate)
  const chips: string[] = [...(person.roleChips ?? [])]

  if (person.partyLabel) {
    chips.push(person.partyLabel)
  }

  const cantonLabel = getCantonLabel(person)

  if (cantonLabel) {
    chips.push(cantonLabel)
  }

  if (age !== null) {
    chips.push(`Age ${age}`)
  }

  if (person.currentOfficeSince) {
    chips.push(`Since ${person.currentOfficeSince}`)
  }

  return chips
}

function getSelectOptions(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value)))).sort(
    (left, right) => left.localeCompare(right),
  )
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark__vertical" />
      <span className="brand-mark__horizontal" />
    </span>
  )
}

function TopBar({
  activeBranch,
  onBranchChange,
  onHome,
}: {
  activeBranch: BranchId | null
  onBranchChange: (branchId: BranchId) => void
  onHome: () => void
}) {
  return (
    <header className="topbar">
      <button className="brand-button" onClick={onHome} type="button">
        <BrandMark />
        <span className="brand-button__copy">
          <span className="brand-button__eyebrow">English-language civic atlas</span>
          <span className="brand-button__title">switzerlandspy</span>
        </span>
      </button>

      <nav aria-label="Branch navigation" className="topbar__nav">
        {branchOrder.map((branchId) => {
          const branch = getBranchById(branchId)
          const isActive = activeBranch === branchId

          return (
            <button
              className={`topbar__nav-button${isActive ? ' topbar__nav-button--active' : ''}`}
              key={branch.id}
              onClick={() => onBranchChange(branch.id)}
              type="button"
            >
              {branch.name}
            </button>
          )
        })}
      </nav>
    </header>
  )
}

function HomeView({ onBranchChange }: { onBranchChange: (branchId: BranchId) => void }) {
  return (
    <main className="shell shell--home">
      <section className="hero-panel hero-panel--home">
        <div className="hero-panel__grid">
          <div>
            <p className="eyebrow">Switzerland-specific data brief</p>
            <h1>A Switzerland-first institutional map, not a renamed U.S. clone.</h1>
            <p className="hero-copy">
              Version 1 models Switzerland as a federal republic with strong cantonal structure,
              a collegial Federal Council, a multiparty Federal Assembly, and a judiciary led by
              the Federal Supreme Court. All visible copy stays in English while preserving Swiss
              institution names where they matter.
            </p>
            <div className="hero-tags">
              <span className="tag">Collective executive</span>
              <span className="tag">Cantons are first-class</span>
              <span className="tag">Multiparty by default</span>
            </div>
          </div>

          <div className="hero-panel__aside">
            <div className="snapshot-card">
              <span className="snapshot-card__label">Data snapshot</span>
              <strong>{formatSnapshotDate(switzerlandDataset.generatedAt)}</strong>
              <p>
                The first release prioritises institutional correctness and a credible real-person
                seed over pretending to be exhaustive on day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-grid" aria-label="Branches">
        {branchOrder.map((branchId) => {
          const branch = getBranchById(branchId)

          return (
            <button
              className="branch-card"
              key={branch.id}
              onClick={() => onBranchChange(branch.id)}
              type="button"
            >
              <span className="branch-card__eyebrow">{branch.kicker}</span>
              <h2>{branch.name}</h2>
              <p>{branch.title}</p>
              <div className="branch-card__stats">
                {branch.stats.map((item) => (
                  <div className="branch-card__stat" key={`${branch.id}-${item.label}`}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </button>
          )
        })}
      </section>

      <section className="panel-grid panel-grid--home">
        <article className="panel">
          <h2>Why This Structure</h2>
          <p>
            The homepage framing follows Swiss institutions directly: Federal Council rather than
            a one-person presidency, National Council and Council of States rather than U.S.-style
            chamber renames, and the Federal Supreme Court without importing U.S. confirmation
            logic as the default story.
          </p>
        </article>

        <article className="panel">
          <h2>What Is Seeded</h2>
          <p>
            The executive branch is fully seeded for the current Federal Council and Federal
            Chancellor. The legislature and judiciary are intentionally representative subsets
            built on official profiles, with room to scale toward fuller coverage.
          </p>
        </article>
      </section>
    </main>
  )
}

function BranchHero({
  branch,
  onHome,
}: {
  branch: BranchOverview
  onHome: () => void
}) {
  return (
    <section className="hero-panel">
      <div className="branch-hero">
        <div>
          <button className="back-link" onClick={onHome} type="button">
            Home
          </button>
          <p className="eyebrow">{branch.kicker}</p>
          <h1>{branch.title}</h1>
          <p className="hero-copy">{branch.description}</p>
        </div>

        <div className="stats-grid" aria-label={`${branch.name} key figures`}>
          {branch.stats.map((item) => (
            <article className="stat-card" key={`${branch.id}-${item.label}`}>
              <span className="stat-card__value">{item.value}</span>
              <strong>{item.label}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstitutionGrid({ branch }: { branch: BranchOverview }) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <p className="eyebrow">Institutional frame</p>
        <h2>Switzerland-specific ground rules</h2>
      </div>

      <div className="panel-grid">
        {branch.institutionCards.map((card) => (
          <article className="panel" key={`${branch.id}-${card.title}`}>
            <h3>{card.title}</h3>
            {card.subtitle ? <p className="panel__subtitle">{card.subtitle}</p> : null}
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PersonCard({
  expanded,
  onToggle,
  person,
}: {
  expanded: boolean
  onToggle: () => void
  person: Person
}) {
  const partyStyle = getPartyStyle(person.partyLabel)
  const chips = getPersonMeta(person, switzerlandDataset.generatedAt)
  const birthLabel = getBirthLabel(person)

  return (
    <article
      className={`person-card${expanded ? ' person-card--expanded' : ''}`}
      style={
        partyStyle
          ? ({
              '--card-accent': partyStyle.accent,
              '--card-accent-soft': partyStyle.background,
              '--card-accent-text': partyStyle.text,
            } as React.CSSProperties)
          : undefined
      }
    >
      <button
        aria-expanded={expanded}
        className="person-card__header"
        onClick={onToggle}
        type="button"
      >
        <Avatar className="person-card__avatar" name={person.name} />

        <div className="person-card__intro">
          <span className="person-card__eyebrow">
            {person.departmentAcronym ?? person.chamberLabel ?? person.courtName}
          </span>
          <h3>{person.name}</h3>
          <p>{person.title}</p>
        </div>

        <span className="person-card__toggle">{expanded ? 'Hide' : 'Open'}</span>
      </button>

      <p className="person-card__summary">{person.summary}</p>

      {chips.length > 0 ? (
        <div className="chip-row">
          {chips.map((chip) => (
            <span className="chip" key={`${person.id}-${chip}`}>
              {chip}
            </span>
          ))}
        </div>
      ) : null}

      {expanded ? (
        <div className="person-card__body">
          <dl className="detail-grid">
            {person.departmentName ? (
              <>
                <dt>Department</dt>
                <dd>{person.departmentName}</dd>
              </>
            ) : null}
            {person.chamberLabel ? (
              <>
                <dt>Chamber</dt>
                <dd>{person.chamberLabel}</dd>
              </>
            ) : null}
            {person.courtName ? (
              <>
                <dt>Court</dt>
                <dd>{person.courtName}</dd>
              </>
            ) : null}
            {birthLabel ? (
              <>
                <dt>Birth</dt>
                <dd>{birthLabel}</dd>
              </>
            ) : null}
            {person.currentOfficeSince ? (
              <>
                <dt>Current office</dt>
                <dd>Since {person.currentOfficeSince}</dd>
              </>
            ) : null}
            {person.partyLabel ? (
              <>
                <dt>Party</dt>
                <dd>{person.partyLabel}</dd>
              </>
            ) : null}
            {getCantonLabel(person) ? (
              <>
                <dt>Canton</dt>
                <dd>{getCantonLabel(person)}</dd>
              </>
            ) : null}
            {person.seatLabel ? (
              <>
                <dt>Seat</dt>
                <dd>{person.seatLabel}</dd>
              </>
            ) : null}
          </dl>

          {person.education.length > 0 ? (
            <div className="detail-block">
              <h4>Education</h4>
              <ul>
                {person.education.map((entry) => (
                  <li key={`${person.id}-education-${entry}`}>{entry}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {person.careerHistory.length > 0 ? (
            <div className="detail-block">
              <h4>Career history</h4>
              <ul>
                {person.careerHistory.map((entry) => (
                  <li key={`${person.id}-career-${entry}`}>{entry}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {person.notes && person.notes.length > 0 ? (
            <div className="detail-block">
              <h4>Notes</h4>
              <ul>
                {person.notes.map((entry) => (
                  <li key={`${person.id}-note-${entry}`}>{entry}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="detail-block">
            <h4>Official links</h4>
            <div className="link-row">
              {person.links.map((link) => (
                <a href={link.url} key={`${person.id}-${link.label}`} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  )
}

function DepartmentGrid() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <p className="eyebrow">Departments</p>
        <h2>The seven federal departments</h2>
      </div>

      <div className="department-grid">
        {switzerlandDataset.departments.map((department) => (
          <article className="department-card" key={department.id}>
            <span className="department-card__acronym">{department.acronym}</span>
            <h3>{department.name}</h3>
            <p>{department.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExecutiveView({
  expandedPersonId,
  onTogglePerson,
}: {
  expandedPersonId: string | null
  onTogglePerson: (personId: string) => void
}) {
  const people = getBranchPeople('executive')
  const councillors = people.filter((person) => person.groupId === 'federal-council')
  const chancellery = people.filter((person) => person.groupId === 'federal-chancellery')

  return (
    <>
      <InstitutionGrid branch={getBranchById('executive')} />
      <DepartmentGrid />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Current officeholders</p>
          <h2>Federal Council</h2>
          <p className="section-heading__copy">
            The presidency is attached to the relevant councillor rather than duplicated as a
            separate standalone executive card.
          </p>
        </div>

        <div className="person-grid">
          {councillors.map((person) => (
            <PersonCard
              expanded={expandedPersonId === person.id}
              key={person.id}
              onToggle={() => onTogglePerson(person.id)}
              person={person}
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Institutional support</p>
          <h2>Federal Chancellery</h2>
        </div>

        <div className="person-grid person-grid--narrow">
          {chancellery.map((person) => (
            <PersonCard
              expanded={expandedPersonId === person.id}
              key={person.id}
              onToggle={() => onTogglePerson(person.id)}
              person={person}
            />
          ))}
        </div>
      </section>
    </>
  )
}

function LegislativeView({
  activeChamber,
  cantonFilter,
  expandedPersonId,
  onChamberChange,
  onCantonFilterChange,
  onPartyFilterChange,
  onTogglePerson,
  partyFilter,
}: {
  activeChamber: ChamberId
  cantonFilter: string
  expandedPersonId: string | null
  onChamberChange: (chamberId: ChamberId) => void
  onCantonFilterChange: (value: string) => void
  onPartyFilterChange: (value: string) => void
  onTogglePerson: (personId: string) => void
  partyFilter: string
}) {
  const branch = getBranchById('legislative')
  const chamberPeople = getBranchPeople('legislative').filter(
    (person) => person.chamberId === activeChamber,
  )
  const partyOptions = getSelectOptions(chamberPeople.map((person) => person.partyLabel))
  const cantonOptions = CANTONS.map((canton) => canton.code)
  const safePartyFilter =
    partyFilter === 'all' || partyOptions.includes(partyFilter) ? partyFilter : 'all'
  const safeCantonFilter =
    cantonFilter === 'all' || cantonOptions.includes(cantonFilter as CantonCode)
      ? cantonFilter
      : 'all'
  const partyScopedPeople = chamberPeople.filter((person) => {
    const matchesParty = safePartyFilter === 'all' || person.partyLabel === safePartyFilter

    return matchesParty
  })
  const visiblePeople = partyScopedPeople.filter((person) => {
    const matchesCanton =
      safeCantonFilter === 'all' || person.cantonCode === (safeCantonFilter as CantonCode)

    return matchesCanton
  })
  const visibleExpandedId = visiblePeople.some((person) => person.id === expandedPersonId)
    ? expandedPersonId
    : null

  return (
    <>
      <InstitutionGrid branch={branch} />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Chambers</p>
          <h2>Switch by chamber, then filter by party and canton</h2>
          <p className="section-heading__copy">
            The browsing model follows Swiss representation logic instead of forcing district-based
            assumptions.
          </p>
        </div>

        <div className="segmented-control" role="tablist" aria-label="Legislative chambers">
          <button
            aria-selected={activeChamber === 'national-council'}
            className={`segmented-control__button${
              activeChamber === 'national-council' ? ' segmented-control__button--active' : ''
            }`}
            onClick={() => onChamberChange('national-council')}
            role="tab"
            type="button"
          >
            National Council
          </button>
          <button
            aria-selected={activeChamber === 'council-of-states'}
            className={`segmented-control__button${
              activeChamber === 'council-of-states' ? ' segmented-control__button--active' : ''
            }`}
            onClick={() => onChamberChange('council-of-states')}
            role="tab"
            type="button"
          >
            Council of States
          </button>
        </div>

        <div className="panel-grid">
          <article className="panel">
            <h3>National Council</h3>
            <p>
              Represents the population. Larger cantons send larger delegations, so seat counts are
              not uniform across the country.
            </p>
          </article>
          <article className="panel">
            <h3>Council of States</h3>
            <p>
              Represents the cantons. Most full cantons send two members and the historical
              half-cantons usually send one.
            </p>
          </article>
        </div>

        <div className="toolbar">
          <label className="toolbar__field">
            <span>Party</span>
            <select onChange={(event) => onPartyFilterChange(event.target.value)} value={safePartyFilter}>
              <option value="all">All parties</option>
              {partyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="toolbar__field">
            <span>Canton</span>
            <select onChange={(event) => onCantonFilterChange(event.target.value)} value={safeCantonFilter}>
              <option value="all">All cantons</option>
              {cantonOptions.map((option) => (
                <option key={option} value={option}>
                  {getCantonOptionLabel(option)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {branch.seedNote ? <p className="seed-note">{branch.seedNote}</p> : null}

        <SwissCantonMap
          activeChamber={activeChamber}
          onSelectCantonCode={(code) => onCantonFilterChange(code ?? 'all')}
          partyFilterLabel={safePartyFilter === 'all' ? null : safePartyFilter}
          people={partyScopedPeople}
          selectedCantonCode={safeCantonFilter === 'all' ? null : (safeCantonFilter as CantonCode)}
        />

        <div className="person-grid">
          {visiblePeople.map((person) => (
            <PersonCard
              expanded={visibleExpandedId === person.id}
              key={person.id}
              onToggle={() => onTogglePerson(person.id)}
              person={person}
            />
          ))}
        </div>

        {visiblePeople.length === 0 ? (
          <p className="empty-state">No seeded profiles match the current party and canton filters.</p>
        ) : null}
      </section>
    </>
  )
}

function JudicialView({
  expandedPersonId,
  onTogglePerson,
}: {
  expandedPersonId: string | null
  onTogglePerson: (personId: string) => void
}) {
  const branch = getBranchById('judicial')
  const judges = getBranchPeople('judicial')

  return (
    <>
      <InstitutionGrid branch={branch} />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Seeded court members</p>
          <h2>Federal Supreme Court leadership and representative judges</h2>
          <p className="section-heading__copy">
            Party labels are shown only where they appear in publicly relevant official biographies
            and should be read in the Swiss institutional context.
          </p>
        </div>

        {branch.seedNote ? <p className="seed-note">{branch.seedNote}</p> : null}

        <div className="person-grid">
          {judges.map((person) => (
            <PersonCard
              expanded={expandedPersonId === person.id}
              key={person.id}
              onToggle={() => onTogglePerson(person.id)}
              person={person}
            />
          ))}
        </div>
      </section>
    </>
  )
}

function SourceBlock({ branch }: { branch: BranchOverview }) {
  return (
    <section className="section-block section-block--sources">
      <div className="section-heading">
        <p className="eyebrow">Sources</p>
        <h2>Official material used for this branch</h2>
      </div>

      <div className="link-row link-row--stacked">
        {branch.sources.map((source) => (
          <a href={source.url} key={`${branch.id}-${source.label}`} rel="noreferrer" target="_blank">
            {source.label}
          </a>
        ))}
      </div>
    </section>
  )
}

function BranchView({
  activeBranch,
  activeChamber,
  cantonFilter,
  expandedPersonId,
  onChamberChange,
  onCantonFilterChange,
  onHome,
  onPartyFilterChange,
  onTogglePerson,
  partyFilter,
}: {
  activeBranch: BranchId
  activeChamber: ChamberId
  cantonFilter: string
  expandedPersonId: string | null
  onChamberChange: (chamberId: ChamberId) => void
  onCantonFilterChange: (value: string) => void
  onHome: () => void
  onPartyFilterChange: (value: string) => void
  onTogglePerson: (personId: string) => void
  partyFilter: string
}) {
  const branch = getBranchById(activeBranch)

  return (
    <main className="shell">
      <BranchHero branch={branch} onHome={onHome} />

      {activeBranch === 'executive' ? (
        <ExecutiveView expandedPersonId={expandedPersonId} onTogglePerson={onTogglePerson} />
      ) : null}

      {activeBranch === 'legislative' ? (
        <LegislativeView
          activeChamber={activeChamber}
          cantonFilter={cantonFilter}
          expandedPersonId={expandedPersonId}
          onChamberChange={onChamberChange}
          onCantonFilterChange={onCantonFilterChange}
          onPartyFilterChange={onPartyFilterChange}
          onTogglePerson={onTogglePerson}
          partyFilter={partyFilter}
        />
      ) : null}

      {activeBranch === 'judicial' ? (
        <JudicialView expandedPersonId={expandedPersonId} onTogglePerson={onTogglePerson} />
      ) : null}

      <SourceBlock branch={branch} />
    </main>
  )
}

function App() {
  const [activeBranch, setActiveBranch] = useState<BranchId | null>(null)
  const [expandedPersonId, setExpandedPersonId] = useState<string | null>(null)
  const [activeChamber, setActiveChamber] = useState<ChamberId>('national-council')
  const [partyFilter, setPartyFilter] = useState('all')
  const [cantonFilter, setCantonFilter] = useState('all')

  function handleBranchChange(branchId: BranchId) {
    setActiveBranch(branchId)
    setExpandedPersonId(null)
  }

  function handleHome() {
    setActiveBranch(null)
    setExpandedPersonId(null)
  }

  function handleTogglePerson(personId: string) {
    setExpandedPersonId((current) => (current === personId ? null : personId))
  }

  function handleChamberChange(chamberId: ChamberId) {
    setActiveChamber(chamberId)
    setPartyFilter('all')
    setCantonFilter('all')
    setExpandedPersonId(null)
  }

  function handlePartyFilterChange(value: string) {
    setPartyFilter(value)
    setExpandedPersonId(null)
  }

  function handleCantonFilterChange(value: string) {
    setCantonFilter(value)
    setExpandedPersonId(null)
  }

  return (
    <div className="app-shell">
      <TopBar activeBranch={activeBranch} onBranchChange={handleBranchChange} onHome={handleHome} />

      {activeBranch ? (
        <BranchView
          activeBranch={activeBranch}
          activeChamber={activeChamber}
          cantonFilter={cantonFilter}
          expandedPersonId={expandedPersonId}
          onChamberChange={handleChamberChange}
          onCantonFilterChange={handleCantonFilterChange}
          onHome={handleHome}
          onPartyFilterChange={handlePartyFilterChange}
          onTogglePerson={handleTogglePerson}
          partyFilter={partyFilter}
        />
      ) : (
        <HomeView onBranchChange={handleBranchChange} />
      )}
    </div>
  )
}

export default App
