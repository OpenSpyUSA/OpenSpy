import type { LegislativeTrumpRollCall } from './types'

const HOUSE_MONTH_INDEX: Record<string, number> = {
  Apr: 3,
  Aug: 7,
  Dec: 11,
  Feb: 1,
  Jan: 0,
  Jul: 6,
  Jun: 5,
  Mar: 2,
  May: 4,
  Nov: 10,
  Oct: 9,
  Sep: 8,
}

const FULL_MONTH_INDEX: Record<string, number> = {
  April: 3,
  August: 7,
  December: 11,
  February: 1,
  January: 0,
  July: 6,
  June: 5,
  March: 2,
  May: 4,
  November: 10,
  October: 9,
  September: 8,
}

const matrixDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: '2-digit',
})

const detailDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})

const detailDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  hour: '2-digit',
  hour12: true,
  minute: '2-digit',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})

type RollCallTemporalInfo = {
  dayKey: string
  hasTime: boolean
  timestamp: number
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function padNumber(value: number) {
  return String(value).padStart(2, '0')
}

function ordinalizeNumber(value: number) {
  const ones = value % 10
  const tens = value % 100

  if (tens >= 11 && tens <= 13) {
    return `${value}th`
  }

  if (ones === 1) {
    return `${value}st`
  }

  if (ones === 2) {
    return `${value}nd`
  }

  if (ones === 3) {
    return `${value}rd`
  }

  return `${value}th`
}

function parseClockTime(value?: string | null) {
  const normalized = normalizeText(value ?? '')
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i)

  if (!match) {
    return null
  }

  let hour = Number(match[1]) % 12

  if (match[3].toUpperCase() === 'PM') {
    hour += 12
  }

  return {
    hour,
    minute: Number(match[2]),
  }
}

function parseHouseDate(value: string) {
  const match = value.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/)

  if (!match) {
    return null
  }

  const [, dayText, monthText, yearText] = match
  const monthIndex = HOUSE_MONTH_INDEX[monthText]

  if (monthIndex == null) {
    return null
  }

  return {
    day: Number(dayText),
    dayKey: `${yearText}-${padNumber(monthIndex + 1)}-${padNumber(Number(dayText))}`,
    monthIndex,
    year: Number(yearText),
  }
}

function parseSenateDate(value: string) {
  const normalized = normalizeText(value)
  const match = normalized.match(
    /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})(?:,\s+(\d{1,2}):(\d{2})\s+([AP]M))?$/,
  )

  if (!match) {
    return null
  }

  const [, monthText, dayText, yearText, hourText, minuteText, meridiem] = match
  const monthIndex = FULL_MONTH_INDEX[monthText]

  if (monthIndex == null) {
    return null
  }

  const day = Number(dayText)
  const year = Number(yearText)
  const hasTime = Boolean(hourText && minuteText && meridiem)
  let hour = 0
  let minute = 0

  if (hasTime) {
    hour = Number(hourText) % 12

    if (meridiem?.toUpperCase() === 'PM') {
      hour += 12
    }

    minute = Number(minuteText)
  }

  return {
    day,
    dayKey: `${yearText}-${padNumber(monthIndex + 1)}-${padNumber(day)}`,
    hasTime,
    hour,
    minute,
    monthIndex,
    year,
  }
}

function getRollCallTemporalInfo(event: LegislativeTrumpRollCall): RollCallTemporalInfo | null {
  if (event.chamber === 'house') {
    const houseDate = parseHouseDate(event.date)

    if (!houseDate) {
      return null
    }

    const time = parseClockTime(event.actionTime)

    return {
      dayKey: houseDate.dayKey,
      hasTime: Boolean(time),
      timestamp: Date.UTC(
        houseDate.year,
        houseDate.monthIndex,
        houseDate.day,
        time?.hour ?? 0,
        time?.minute ?? 0,
      ),
    }
  }

  const senateDate = parseSenateDate(event.date)

  if (senateDate) {
    return {
      dayKey: senateDate.dayKey,
      hasTime: senateDate.hasTime,
      timestamp: Date.UTC(
        senateDate.year,
        senateDate.monthIndex,
        senateDate.day,
        senateDate.hour,
        senateDate.minute,
      ),
    }
  }

  const parsed = Date.parse(event.date)

  if (Number.isNaN(parsed)) {
    return null
  }

  return {
    dayKey: '',
    hasTime: /\d{1,2}:\d{2}/.test(event.date),
    timestamp: parsed,
  }
}

function getHouseQuestionRecencyRank(event: LegislativeTrumpRollCall) {
  const label = normalizeText(event.label).toLowerCase()
  const question = normalizeText(event.question).toLowerCase()

  if (
    question === 'on passage' ||
    question === 'on passage of the bill' ||
    question === 'on the nomination' ||
    question === 'guilty or not guilty' ||
    question === 'on overriding the veto' ||
    question === 'on agreeing to the objection'
  ) {
    return 5
  }

  if (
    question.includes('agreeing to the resolution') ||
    question.includes('motion to concur') ||
    question.includes('conference report') ||
    label.includes('rule adoption')
  ) {
    return 4
  }

  if (question === 'on ordering the previous question' || label.includes('previous question')) {
    return 3
  }

  if (
    question.includes('recommit') ||
    question === 'on the motion to proceed' ||
    question === 'on the cloture motion' ||
    question === 'on the motion to table'
  ) {
    return 2
  }

  return 1
}

function formatSessionLabel(session?: string) {
  if (!session) {
    return null
  }

  const cleaned = normalizeText(session)

  if (!cleaned) {
    return null
  }

  if (/^\d+$/.test(cleaned)) {
    return `${ordinalizeNumber(Number(cleaned))} Session`
  }

  if (/^\d+(st|nd|rd|th)$/i.test(cleaned)) {
    return `${cleaned} Session`
  }

  if (/session/i.test(cleaned)) {
    return cleaned
  }

  return `${cleaned} Session`
}

export function compareLegislativeRollCallsByRecency(
  left: LegislativeTrumpRollCall,
  right: LegislativeTrumpRollCall,
  leftIndex = 0,
  rightIndex = 0,
) {
  const leftInfo = getRollCallTemporalInfo(left)
  const rightInfo = getRollCallTemporalInfo(right)

  if (leftInfo && rightInfo && leftInfo.timestamp !== rightInfo.timestamp) {
    return rightInfo.timestamp - leftInfo.timestamp
  }

  if (leftInfo && !rightInfo) {
    return -1
  }

  if (!leftInfo && rightInfo) {
    return 1
  }

  if (
    left.chamber === 'house' &&
    right.chamber === 'house' &&
    leftInfo?.dayKey &&
    leftInfo.dayKey === rightInfo?.dayKey
  ) {
    if (
      Number.isFinite(left.rollCallNumber) &&
      Number.isFinite(right.rollCallNumber) &&
      left.rollCallNumber !== right.rollCallNumber
    ) {
      return (right.rollCallNumber ?? 0) - (left.rollCallNumber ?? 0)
    }

    const rankDifference = getHouseQuestionRecencyRank(right) - getHouseQuestionRecencyRank(left)

    if (rankDifference !== 0) {
      return rankDifference
    }
  }

  return leftIndex - rightIndex
}

export function formatRollCallMatrixDateLabel(event: LegislativeTrumpRollCall) {
  const info = getRollCallTemporalInfo(event)

  if (!info) {
    return event.date
  }

  return matrixDateFormatter.format(new Date(info.timestamp))
}

export function formatRollCallReferenceLine(event: LegislativeTrumpRollCall) {
  const parts: string[] = []

  if (Number.isFinite(event.rollCallNumber)) {
    parts.push(`Roll Call ${event.rollCallNumber}`)
  }

  if (event.billNumber) {
    parts.push(`Bill Number: ${event.billNumber}`)
  }

  return parts.length ? parts.join(' | ') : null
}

export function formatRollCallRecordedLine(event: LegislativeTrumpRollCall) {
  const parts: string[] = []
  const info = getRollCallTemporalInfo(event)

  if (info) {
    parts.push(
      (info.hasTime ? detailDateTimeFormatter : detailDateFormatter).format(new Date(info.timestamp)),
    )
  } else if (event.date) {
    parts.push(event.date)
  }

  if (Number.isFinite(event.congress)) {
    const sessionLabel = formatSessionLabel(event.session)
    parts.push(
      `${ordinalizeNumber(event.congress ?? 0)} Congress${sessionLabel ? `, ${sessionLabel}` : ''}`,
    )
  } else {
    const sessionLabel = formatSessionLabel(event.session)

    if (sessionLabel) {
      parts.push(sessionLabel)
    }
  }

  return parts.length ? parts.join(' | ') : null
}
