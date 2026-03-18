import { useState } from 'react'

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
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
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = Boolean(imageUrl) && failedSrc !== imageUrl

  return (
    <span className={className} aria-hidden="true">
      {showImage ? (
        <img
          alt=""
          className="avatar-image"
          loading="lazy"
          onError={() => setFailedSrc(imageUrl ?? null)}
          src={imageUrl}
        />
      ) : (
        <span className="avatar-fallback">{getInitials(name)}</span>
      )}
    </span>
  )
}
