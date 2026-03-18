function normalizeText(value) {
  return (value ?? '').replace(/\s+/g, ' ').trim().toLowerCase()
}

export const LEGISLATIVE_WEIGHTING_NOTE =
  'Final passage, final confirmation, impeachment verdict, electoral objection, veto-override, and direct joint-resolution votes count most; routine procedural votes such as previous-question, rule, cloture, recommit, and reserve-fund tests count less; direct Trump-power categories such as impeachment, Jan. 6, tariffs, emergency powers, and war powers get a modest bonus.'

export function getLegislativeRollCallStageWeight(event) {
  const label = normalizeText(event.label)
  const question = normalizeText(event.question)

  if (label.includes('reserve-fund vote')) {
    return 0.25
  }

  if (label.includes('rule previous question') || question === 'on ordering the previous question') {
    return 0.3
  }

  if (label.includes('rule adoption') || question.includes('agreeing to the resolution')) {
    return 0.45
  }

  if (label.includes('cloture') || question === 'on the cloture motion') {
    return 0.55
  }

  if (label.includes('motion to proceed') || question === 'on the motion to proceed') {
    return 0.65
  }

  if (label.includes('motion to executive session')) {
    return 0.6
  }

  if (
    label.includes('commit motion') ||
    label.includes('recommit motion') ||
    question.includes('recommit')
  ) {
    return 0.45
  }

  if (label.includes('motion to table') || question === 'on the motion to table') {
    return 0.7
  }

  if (label.includes('chair ruling') || question === 'on the decision of the chair') {
    return 0.75
  }

  if (label.includes('budget waiver')) {
    return 0.75
  }

  if (label.includes('conference request')) {
    return 0.8
  }

  if (label.includes('conference report') || question.includes('conference report')) {
    return 0.95
  }

  if (label.includes('concur') || question.includes('motion to concur')) {
    return 0.95
  }

  if (question === 'guilty or not guilty' || label.includes('conviction vote')) {
    return 1.1
  }

  if (question === 'on agreeing to the objection' || label.includes('electoral objection')) {
    return 1.05
  }

  if (
    question === 'on the nomination' ||
    question === 'on passage' ||
    question === 'on passage of the bill' ||
    question === 'on the joint resolution' ||
    question === 'on overriding the veto' ||
    question.includes('objections of the president to the contrary') ||
    label.includes('confirmation') ||
    label.includes('passage') ||
    label.includes('veto override')
  ) {
    return 1
  }

  if (question === 'on the motion') {
    return 0.7
  }

  return 0.8
}

export function getLegislativeRollCallCategoryWeight(event) {
  switch (event.category) {
    case 'impeachment':
    case 'jan6':
      return 1.25
    case 'emergency-powers':
    case 'war-powers':
    case 'tariffs':
    case 'veto-override':
      return 1.15
    case 'nominations':
    case 'immigration':
    case 'rescissions':
    case 'reconciliation':
      return 1.05
    default:
      return 1
  }
}

export function getLegislativeRollCallWeight(event) {
  const stageWeight = getLegislativeRollCallStageWeight(event)
  const categoryWeight = getLegislativeRollCallCategoryWeight(event)
  const highlightWeight = event.highlight ? 1.05 : 1

  return Number((stageWeight * categoryWeight * highlightWeight).toFixed(3))
}
