export function calculateAge(birthDate: string) {
  const birth = new Date(`${birthDate}T00:00:00Z`)
  const today = new Date()
  let age = today.getUTCFullYear() - birth.getUTCFullYear()
  const monthDelta = today.getUTCMonth() - birth.getUTCMonth()

  if (monthDelta < 0 || (monthDelta === 0 && today.getUTCDate() < birth.getUTCDate())) {
    age -= 1
  }

  return age
}

export function calculateApproxAge(birthYear: number) {
  return 2026 - birthYear
}

export function getSortableAge(birthDate?: string, birthYear?: number) {
  if (birthDate) {
    return calculateAge(birthDate)
  }

  if (birthYear) {
    return calculateApproxAge(birthYear)
  }

  return null
}

export function formatAgeLabel(birthDate?: string, birthYear?: number) {
  const sortableAge = getSortableAge(birthDate, birthYear)

  if (sortableAge == null) {
    return null
  }

  if (birthDate) {
    return `Age ${sortableAge}`
  }

  return `Age ~${sortableAge}`
}
