export function formatXHandle(xUrl?: string | null) {
  if (!xUrl) {
    return null
  }

  try {
    const handle = new URL(xUrl).pathname.split('/').filter(Boolean)[0]
    return handle ? `@${handle}` : null
  } catch {
    return null
  }
}
