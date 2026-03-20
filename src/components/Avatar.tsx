import { useState } from 'react'

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function resolveImageUrl(imageUrl?: string) {
  if (!imageUrl) {
    return imageUrl
  }

  if (/^http:\/\//i.test(imageUrl)) {
    return `https://${imageUrl.slice('http://'.length)}`
  }

  if (/^(?:https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith('data:')) {
    return imageUrl
  }

  if (imageUrl.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${imageUrl.slice(1)}`
  }

  return imageUrl
}

export function Avatar({
  className,
  imageUrl,
  name,
}: {
  className: string
  imageUrl?: string
  name: string
}) {
  const resolvedImageUrl = resolveImageUrl(imageUrl)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = Boolean(resolvedImageUrl) && failedSrc !== resolvedImageUrl

  return (
    <span className={className} aria-hidden="true">
      {showImage ? (
        <img
          alt=""
          className="avatar-image"
          loading="lazy"
          onError={() => setFailedSrc(resolvedImageUrl ?? null)}
          referrerPolicy="no-referrer"
          src={resolvedImageUrl}
        />
      ) : (
        <span className="avatar-fallback">{getInitials(name)}</span>
      )}
    </span>
  )
}
