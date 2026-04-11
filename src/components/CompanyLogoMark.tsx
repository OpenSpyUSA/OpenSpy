import { useState } from 'react'

function getCompanyMarkLabel(name: string) {
  const words = name
    .replace(/[^A-Za-z0-9&.\- ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !['and', 'of', 'the', 'co', 'inc', 'corp', 'corporation'].includes(word.toLowerCase()))

  if (words.length === 0) {
    return name.slice(0, 2).toUpperCase()
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

function getCompanyLogoCandidates(websiteUrl?: string | null) {
  if (!websiteUrl) {
    return []
  }

  try {
    const normalizedUrl = /^(?:https?:)?\/\//i.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`
    const parsed = new URL(normalizedUrl)
    const hostname = parsed.hostname.replace(/^www\./i, '')

    return [
      `${parsed.origin}/favicon.ico`,
      `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`,
    ]
  } catch {
    return []
  }
}

export function CompanyLogoMark({
  className,
  name,
  websiteUrl,
}: {
  className: string
  name: string
  websiteUrl?: string | null
}) {
  const candidates = getCompanyLogoCandidates(websiteUrl)
  const [candidateIndex, setCandidateIndex] = useState(0)
  const currentCandidate = candidates[candidateIndex]

  if (!currentCandidate) {
    return (
      <span
        aria-label={`${name} logo fallback`}
        className={`${className} ${className}--fallback`}
        title={name}
      >
        <span className="company-logo-mark__fallback">{getCompanyMarkLabel(name)}</span>
      </span>
    )
  }

  return (
    <span className={className} title={name}>
      <img
        alt={`${name} logo`}
        className="company-logo-mark__image"
        decoding="async"
        loading="lazy"
        onError={() => setCandidateIndex((index) => index + 1)}
        referrerPolicy="no-referrer"
        src={currentCandidate}
      />
    </span>
  )
}
