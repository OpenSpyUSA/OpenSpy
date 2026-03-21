type RollCallVideoInput = {
  chamber: 'house' | 'senate'
  date: string
  id?: string
}

type RollCallVideoLink = {
  label: string
  url: string
}

const LONG_MONTH_INDEX: Record<string, number> = {
  april: 3,
  august: 7,
  december: 11,
  february: 1,
  january: 0,
  july: 6,
  june: 5,
  march: 2,
  may: 4,
  november: 10,
  october: 9,
  september: 8,
}

const HOUSE_ROLL_CALL_YOUTUBE_BY_DATE: Record<string, string> = {
  '10-Dec-2025': 'https://www.youtube.com/watch?v=aTnwgGM2Hkw',
  '10-Jun-2025': 'https://www.youtube.com/watch?v=t7G89s4n8_E',
  '11-Dec-2025': 'https://www.youtube.com/watch?v=ldHcn659JyY',
  '11-Jun-2025': 'https://www.youtube.com/watch?v=kuQUuFt8ugs',
  '12-Dec-2025': 'https://www.youtube.com/watch?v=mwoUA75IaZI',
  '12-Jun-2025': 'https://www.youtube.com/watch?v=oa_e3oaI2A0',
  '12-Nov-2025': 'https://www.youtube.com/watch?v=tlhLXOnMapU',
  '16-Dec-2025': 'https://www.youtube.com/watch?v=TpgYkkMP8ns',
  '17-Dec-2025': 'https://www.youtube.com/watch?v=YVjjuMbbh08',
  '17-Jul-2025': 'https://www.youtube.com/watch?v=fXHO7mNBiHY',
  '17-Mar-2026': 'https://www.youtube.com/watch?v=-tPrvgomaFM',
  '17-Sep-2025': 'https://www.youtube.com/watch?v=0beQ_yEaUJg',
  '18-Dec-2025': 'https://www.youtube.com/watch?v=-HHKt9S--jk',
  // The official Clerk upload for this just-after-midnight vote stayed under the prior day's session.
  '18-Jul-2025': 'https://www.youtube.com/watch?v=fXHO7mNBiHY',
  '18-Mar-2026': 'https://www.youtube.com/watch?v=r5Z8SdlLWR0',
  '19-Sep-2025': 'https://www.youtube.com/watch?v=UaE0epyT2bQ',
  '2-Jul-2025': 'https://www.youtube.com/watch?v=4sISzXMoq-s',
  '22-Jan-2025': 'https://www.youtube.com/watch?v=vkFRlhvaXS4',
  '22-Jan-2026': 'https://www.youtube.com/watch?v=sNS9N5z9M1w',
  // These votes were cast after midnight during the Clerk's May 21 overnight upload.
  '22-May-2025': 'https://www.youtube.com/watch?v=ISmhjrDP-WQ',
  '3-Feb-2026': 'https://www.youtube.com/watch?v=fi9kmJdzchk',
  '3-Jul-2025': 'https://www.youtube.com/watch?v=vAxoaVVhF1Y',
  '4-Jun-2025': 'https://www.youtube.com/watch?v=8-7r8jaDOwg',
  '4-Mar-2026': 'https://www.youtube.com/watch?v=iFWg1zqHtdA',
  '5-Jun-2025': 'https://www.youtube.com/watch?v=MskIBH_QV-0',
  '5-Mar-2026': 'https://www.youtube.com/watch?v=KujFZZIsdTc',
  '7-Jan-2025': 'https://www.youtube.com/watch?v=I43x_n-9-00',
}

const SENATE_CSPAN_VOTE_MOMENT_BY_ID: Record<string, string> = {
  // These offsets are based on the December 18, 2025 Senate Chronicle session timing
  // so the C-SPAN player opens near the recorded cloture vote moment.
  'senate-joshua-simmons-cloture':
    'https://www.c-span.org/congress/?chamber=senate&date=2025-12-18&offset=37493000000000',
  'senate-keith-bass-cloture':
    'https://www.c-span.org/congress/?chamber=senate&date=2025-12-18&offset=39473000000000',
  'senate-van-hook-cloture':
    'https://www.c-span.org/congress/?chamber=senate&date=2025-12-18&offset=41033000000000',
  'senate-sara-bailey-cloture':
    'https://www.c-span.org/congress/?chamber=senate&date=2025-12-18&offset=42113000000000',
}

function formatIsoDate(year: number, monthIndex: number, day: number) {
  return `${String(year).padStart(4, '0')}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function parseSenateRollCallDateToIsoDate(value: string) {
  const match = value.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4}),\s+\d{1,2}:\d{2}\s+[AP]M$/)

  if (!match) {
    return null
  }

  const [, monthText, dayText, yearText] = match
  const monthIndex = LONG_MONTH_INDEX[monthText.toLowerCase()]

  if (monthIndex == null) {
    return null
  }

  return formatIsoDate(Number(yearText), monthIndex, Number(dayText))
}

export function getRollCallVideoLink(rollCall: RollCallVideoInput): RollCallVideoLink | null {
  if (rollCall.chamber === 'senate') {
    const voteMomentUrl = rollCall.id ? SENATE_CSPAN_VOTE_MOMENT_BY_ID[rollCall.id] : null

    if (voteMomentUrl) {
      return {
        label: 'Senate vote moment (C-SPAN)',
        url: voteMomentUrl,
      }
    }

    const isoDate = parseSenateRollCallDateToIsoDate(rollCall.date)

    if (!isoDate) {
      return null
    }

    return {
      label: 'Senate floor video (C-SPAN)',
      url: `https://www.c-span.org/congress/?chamber=senate&date=${isoDate}`,
    }
  }

  const youtubeUrl = HOUSE_ROLL_CALL_YOUTUBE_BY_DATE[rollCall.date]

  if (!youtubeUrl) {
    return null
  }

  return {
    label: 'Official YouTube video',
    url: youtubeUrl,
  }
}
