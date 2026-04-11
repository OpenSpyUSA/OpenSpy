import { useState } from 'react'

const COMPANY_MARKETCAP_LOGO_OVERRIDES: Record<string, string> = {
  '207940': '207940.KS',
  '4502': 'TAK',
  LONN: 'LONN.SW',
  'NOVO-B': 'NVO',
  NOVN: 'NVS',
  SHL: 'SHL.DE',
}

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

function getCompaniesMarketCapLogoCode(ticker?: string | null) {
  const rawSymbol = ticker?.split(':').pop()?.trim()

  if (!rawSymbol) {
    return null
  }

  return COMPANY_MARKETCAP_LOGO_OVERRIDES[rawSymbol] ?? rawSymbol
}

function getCompanyLogoCandidates({
  ticker,
  websiteUrl,
}: {
  ticker?: string | null
  websiteUrl?: string | null
}) {
  const candidates: string[] = []
  const marketCapLogoCode = getCompaniesMarketCapLogoCode(ticker)

  if (marketCapLogoCode) {
    candidates.push(
      `https://companiesmarketcap.com/img/company-logos/512/${marketCapLogoCode}.png`,
      `https://companiesmarketcap.com/img/company-logos/256/${marketCapLogoCode}.png`,
    )
  }

  if (!websiteUrl) {
    return candidates
  }

  try {
    const normalizedUrl = /^(?:https?:)?\/\//i.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`
    const parsed = new URL(normalizedUrl)
    const hostname = parsed.hostname.replace(/^www\./i, '')

    candidates.push(
      `${parsed.origin}/apple-touch-icon.png`,
      `${parsed.origin}/apple-touch-icon-precomposed.png`,
      `${parsed.origin}/favicon.ico`,
      `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`,
    )
  } catch {
    return candidates
  }

  return candidates
}

export function CompanyLogoMark({
  className,
  name,
  ticker,
  websiteUrl,
}: {
  className: string
  name: string
  ticker?: string | null
  websiteUrl?: string | null
}) {
  const candidates = getCompanyLogoCandidates({ ticker, websiteUrl })
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
