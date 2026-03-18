export function getTrumpBand(score: number) {
  if (score >= 8) {
    return 'hot'
  }

  if (score >= 5) {
    return 'warm'
  }

  if (score >= 2) {
    return 'cool'
  }

  return 'cold'
}

export function formatTrumpScore(score: number) {
  const formatted = Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1)
  return `Trump ${formatted}/10`
}
