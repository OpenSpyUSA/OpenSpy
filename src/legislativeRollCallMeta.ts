import type { LegislativeTrumpRollCall } from './types'

type RollCallNarrative = {
  stage: string
  summary: string
  trumpLink: string
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function getRollCallText(event: LegislativeTrumpRollCall) {
  return `${event.label} ${event.title}`.toLowerCase()
}

function parseNominationTitle(title: string) {
  const cleaned = normalizeText(title)
  const match = cleaned.match(/^(.+?),\s+of\s+.+?,\s+to be\s+(.+?)(?:\.|$)/i)

  if (!match) {
    return null
  }

  return {
    nominee: match[1],
    office: match[2].replace(/\.$/, ''),
  }
}

function describeTopic(event: LegislativeTrumpRollCall) {
  const text = getRollCallText(event)
  const nomination = parseNominationTitle(event.title)

  if (text.includes('kayla hamilton act')) {
    return 'The Kayla Hamilton Act would tighten how the federal government places unaccompanied migrant children, require more information-sharing with Homeland Security, and bar placement with sponsors who are unlawfully present in the United States.'
  }

  if (text.includes('rescissions act')) {
    return 'The Rescissions Act would cancel previously appropriated federal funds, with the 2025 package focusing on foreign-aid accounts, related agencies, and the Corporation for Public Broadcasting.'
  }

  if (text.includes('laken riley act')) {
    return 'The Laken Riley Act centered on mandatory federal detention for certain undocumented migrants accused of listed crimes, making it one of the clearest immigration-enforcement tests of the Trump agenda.'
  }

  if (text.includes('one big beautiful bill')) {
    return "This was part of Trump's large reconciliation package on taxes, spending, and immigration policy, so even procedural votes became loyalty tests inside the GOP coalition."
  }

  if (
    text.includes('sanctuary-city') ||
    text.includes('sanctuary cities') ||
    text.includes('no sanctuary for criminals')
  ) {
    return 'This vote was about penalizing sanctuary jurisdictions or pushing local governments to cooperate more fully with federal immigration enforcement.'
  }

  if (text.includes("kate's law")) {
    return "Kate's Law would increase criminal penalties for people who reenter the United States illegally after removal, a signature Trump-era immigration theme."
  }

  if (text.includes('border security and immigration reform act')) {
    return "This measure bundled wall and enforcement priorities into a broader immigration bill aligned with Trump's first-term border agenda."
  }

  if (text.includes('support for ice')) {
    return 'This resolution signaled support for Immigration and Customs Enforcement during an intense partisan fight over deportation and interior enforcement.'
  }

  if (text.includes('d.c. federal immigration compliance act')) {
    return 'This bill sought to force the District of Columbia into closer compliance with federal immigration-enforcement requirements.'
  }

  if (text.includes('fy2026 dhs appropriations')) {
    return 'This appropriations fight was about funding the Department of Homeland Security, including border, detention, and immigration-enforcement priorities central to Trump.'
  }

  if (
    text.includes('continuing appropriations') ||
    text.includes('consolidated appropriations act, 2026')
  ) {
    return 'This was part of a federal funding fight over keeping the government open and locking in spending terms that affected Trump-era policy priorities.'
  }

  if (
    text.includes('american health care act') ||
    text.includes('obamacare repeal') ||
    text.includes('medicaid expansion')
  ) {
    return "This vote was part of the Republican effort to repeal or roll back the Affordable Care Act, one of Trump's top first-term domestic goals."
  }

  if (text.includes('tax cuts and jobs act')) {
    return 'This was part of the 2017 Trump tax overhaul, including lower corporate taxes and broad changes to the individual and business tax code.'
  }

  if (text.includes('border emergency')) {
    return "This vote tested whether Congress would uphold or reject Trump's use of emergency powers to redirect money toward border-wall construction."
  }

  if (text.includes('iran war powers')) {
    return "This vote tested whether Congress would restrict Trump's ability to use military force against Iran without additional authorization."
  }

  if (text.includes('impeachment')) {
    return 'This was a direct vote on whether to impeach Trump, structure his impeachment trial, or acquit him.'
  }

  if (
    text.includes('january 6') ||
    text.includes('electoral objection') ||
    text.includes('bannon contempt') ||
    text.includes('meadows contempt') ||
    text.includes('navarro and scavino contempt')
  ) {
    return "This vote dealt with Trump's attempt to contest the 2020 election or with later investigations into January 6 and efforts to obstruct them."
  }

  if (text.includes('usmca')) {
    return 'This vote concerned the U.S.-Mexico-Canada Agreement, the Trump-backed trade deal that replaced NAFTA.'
  }

  if (text.includes('tariff emergency')) {
    return "This vote tested whether Congress would unwind or preserve emergency-based tariff authority tied to Trump's trade policy."
  }

  if (nomination) {
    return `${nomination.nominee} was being advanced for ${nomination.office}, making this a Senate test of support for Trump's personnel choices.`
  }

  switch (event.category) {
    case 'appropriations':
      return "This was a funding vote on a bill or rule that affected Trump's governing priorities."
    case 'emergency-powers':
      return "This vote was about Congress checking or protecting presidential emergency power used by Trump."
    case 'health-care':
      return "This was a health-policy vote tied to Trump's agenda or to a high-profile Trump nominee."
    case 'immigration':
      return "This was an immigration-enforcement or border-security vote tied closely to Trump's platform."
    case 'impeachment':
      return 'This was a direct institutional test of whether Congress would punish or protect Trump.'
    case 'jan6':
      return "This vote concerned Trump's 2020 election challenge or the January 6 aftermath."
    case 'nominations':
      return "This was a Senate staffing vote on one of Trump's nominees."
    case 'reconciliation':
      return "This vote was part of a major reconciliation package tied to Trump's domestic agenda."
    case 'rescissions':
      return "This vote was about clawing back money already appropriated by Congress at Trump's request."
    case 'tariffs':
      return "This vote tested Congress's willingness to support or unwind Trump's tariff posture."
    case 'taxes':
      return "This vote was part of Trump's tax agenda."
    case 'trade':
      return "This vote was tied to Trump's trade policy or to personnel needed to carry it out."
    case 'veto-override':
      return "This vote asked whether Congress would override Trump's veto."
    case 'war-powers':
      return "This vote tested whether Congress would limit Trump's unilateral military authority."
    default:
      return 'This was one of the higher-signal congressional votes used on the site to track alignment with Trump-related policy or power fights.'
  }
}

function describeStage(event: LegislativeTrumpRollCall) {
  const label = event.label.toLowerCase()
  const question = normalizeText(event.question).toLowerCase()

  if (label.includes('rule previous question')) {
    return 'This was a House floor-control vote on the previous question. In practice, passing it keeps the majority in charge of the rule and blocks the minority from seizing the floor agenda.'
  }

  if (label.includes('rule adoption') || question.includes('agreeing to the resolution')) {
    return 'This was a House rule vote setting the terms of debate, amendments, and timing for the underlying measure before the chamber reached the main bill.'
  }

  if (label.includes('recommit') || question.includes('recommit')) {
    return 'This was a last-step House motion that would have sent the bill back or altered it before final passage.'
  }

  if (label.includes('conference report') || question.includes('conference report')) {
    return 'This vote approved the negotiated House-Senate compromise text.'
  }

  if (label.includes('concur') || question.includes('motion to concur')) {
    return 'This was a House concurrence vote to accept the Senate-amended version so the measure could move toward enactment.'
  }

  if (question === 'on passage' || question === 'on passage of the bill') {
    return `This was the ${event.chamber === 'house' ? 'House' : 'Senate'}'s final passage vote on the measure itself.`
  }

  if (question === 'on the nomination') {
    return 'This was the Senate’s final confirmation vote on the nominee.'
  }

  if (question === 'on the cloture motion') {
    return 'This was a Senate cloture vote to cut off debate and move toward a final vote.'
  }

  if (question === 'on the motion to proceed') {
    return 'This was a Senate vote to take up the bill or nomination on the floor.'
  }

  if (question === 'on the motion to table') {
    return 'This was a Senate motion to shut down or postpone reconsideration and protect the earlier result.'
  }

  if (question === 'on overriding the veto' || question.includes('objections of the president')) {
    return 'This was a vote on whether to override a Trump veto and enact the measure despite presidential opposition.'
  }

  if (question === 'guilty or not guilty') {
    return 'This was a Senate impeachment-trial verdict vote.'
  }

  if (question === 'on agreeing to the objection') {
    return 'This was a vote on an objection to a state’s electoral votes during the 2020 Electoral College count.'
  }

  if (question === 'on the decision of the chair') {
    return 'This was a Senate vote on whether to sustain the presiding officer’s ruling under budget rules, including Byrd Rule disputes.'
  }

  if (question === 'on the joint resolution') {
    return 'This was a direct chamber vote on a joint resolution, often the main vehicle for disapproval of presidential actions.'
  }

  if (question === 'on the motion') {
    return 'This was a chamber motion vote that determined whether the bill, nomination, or parliamentary step could move forward.'
  }

  return `This roll call was recorded as "${event.question}", which was the formal parliamentary question before the chamber at that stage.`
}

function describeTrumpLink(event: LegislativeTrumpRollCall) {
  const outcomeLabel =
    event.trumpOutcome === 'pro'
      ? 'The final result ended on the Trump-aligned side.'
      : event.trumpOutcome === 'anti'
        ? 'The Trump-aligned side lost this vote.'
        : 'The final Trump-alignment outcome is not available in the current snapshot.'

  const categoryNote = (() => {
    switch (event.category) {
      case 'nominations':
        return "It counts because support for Trump's nominees is one of the cleanest tests of Senate alignment."
      case 'impeachment':
        return 'It counts because impeachment and acquittal votes are direct institutional tests of support for Trump himself.'
      case 'jan6':
        return 'It counts because it directly concerns Trump’s election challenge or the investigations that followed January 6.'
      case 'rescissions':
        return 'It counts because the rescissions package was pushed by Trump and measured support for cutting money he wanted clawed back.'
      case 'tariffs':
        return 'It counts because it tested whether members backed or resisted Trump-linked tariff authority.'
      case 'reconciliation':
        return "It counts because this package was one of Trump's flagship legislative efforts."
      default:
        return 'It counts because this vote was selected as a higher-signal test of whether a member backed or resisted a Trump-linked policy, nominee, or power claim.'
    }
  })()

  return `${categoryNote} For scoring on this site, a ${event.proTrumpCast} counts as the Trump-aligned vote in this roll call. ${outcomeLabel}`
}

export function describeLegislativeRollCall(event: LegislativeTrumpRollCall): RollCallNarrative {
  return {
    stage: describeStage(event),
    summary: describeTopic(event),
    trumpLink: describeTrumpLink(event),
  }
}
