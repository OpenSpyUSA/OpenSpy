export const EXECUTIVE_GOODS_TRADE_AS_OF = '2025'

export const EXECUTIVE_GOODS_TRADE_SOURCE_LABEL =
  'Census FT900 Exhibit 19: U.S. Trade in Goods by Selected Countries and Areas'

export const EXECUTIVE_GOODS_TRADE_SOURCE_URL =
  'https://www.census.gov/foreign-trade/Press-Release/current_press_release/ft900.pdf'

export type ExecutiveGoodsTradeEntry = {
  balanceMillions: number
  exportsMillions: number
  importsMillions: number
}

export const EXECUTIVE_GOODS_TRADE_BY_COUNTRY: Record<string, ExecutiveGoodsTradeEntry> = {
  Australia: { balanceMillions: 18482, exportsMillions: 61194, importsMillions: 42712 },
  Belgium: { balanceMillions: 9229, exportsMillions: 43073, importsMillions: 33844 },
  Brazil: { balanceMillions: 40519, exportsMillions: 87288, importsMillions: 46769 },
  Canada: { balanceMillions: -24412, exportsMillions: 426417, importsMillions: 450829 },
  China: { balanceMillions: -168115, exportsMillions: 163988, importsMillions: 332103 },
  France: { balanceMillions: -22402, exportsMillions: 79608, importsMillions: 102010 },
  Germany: { balanceMillions: -79056, exportsMillions: 129220, importsMillions: 208276 },
  'Hong Kong': { balanceMillions: 30272, exportsMillions: 51672, importsMillions: 21400 },
  India: { balanceMillions: -63060, exportsMillions: 89210, importsMillions: 152270 },
  Ireland: { balanceMillions: -46156, exportsMillions: 119907, importsMillions: 166063 },
  Israel: { balanceMillions: -6775, exportsMillions: 23932, importsMillions: 30707 },
  Italy: { balanceMillions: -36629, exportsMillions: 56721, importsMillions: 93350 },
  Japan: { balanceMillions: -54599, exportsMillions: 136778, importsMillions: 191377 },
  Malaysia: { balanceMillions: -29771, exportsMillions: 32535, importsMillions: 62306 },
  Mexico: { balanceMillions: -194642, exportsMillions: 390732, importsMillions: 585374 },
  Netherlands: { balanceMillions: 81076, exportsMillions: 134384, importsMillions: 53308 },
  'Saudi Arabia': { balanceMillions: 13695, exportsMillions: 26516, importsMillions: 12821 },
  Singapore: { balanceMillions: 33278, exportsMillions: 90010, importsMillions: 56732 },
  Switzerland: { balanceMillions: -1752, exportsMillions: 140416, importsMillions: 142167 },
  Taiwan: { balanceMillions: -145012, exportsMillions: 69886, importsMillions: 214898 },
  'South Korea': { balanceMillions: -45479, exportsMillions: 97871, importsMillions: 143350 },
  'United Kingdom': { balanceMillions: 38352, exportsMillions: 206095, importsMillions: 167744 },
  Vietnam: { balanceMillions: -177022, exportsMillions: 19118, importsMillions: 196140 },
}
