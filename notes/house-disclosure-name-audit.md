## House Disclosure Name Audit

Updated: 2026-03-20

This note tracks House members whose Clerk disclosure search names needed special handling beyond the display name.

Confirmed search-name fixes applied:

- Marie Perez -> Marie Gluesenkamp Perez
- Monica De La Cruz -> keep `De La Cruz` together as the last name
- Teresa Leger Fernandez -> keep `Leger Fernandez` together as the last name
- Debbie Wasserman Schultz -> keep `Wasserman Schultz` together as the last name
- Jefferson Van Drew -> keep `Van Drew` together as the last name
- Beth Van Duyne -> keep `Van Duyne` together as the last name
- Derrick Van Orden -> keep `Van Orden` together as the last name
- Ashley Hinson -> Clerk search works under `Arenholz`
- Aumua Amata Radewagen -> Clerk search works under `Amata`
- Matt Van Epps -> candidate filing is indexed under `Matthew Robert Van Epps` / `Van Epps`

Confirmed official-index fallback cases applied:

- Ashley Hinson -> House Clerk `2024FD` index lists her annual report as `Arenholz, Ashley Hinson`
- Anna Paulina Luna -> House Clerk `2024FD` index lists her annual report under the compound last name `Paulina Luna`
- Nydia Velazquez -> House Clerk `2024FD` index lists her annual report as `Nydia M. Velázquez`

Current status after the latest House pass:

- House profiles total: 438
- House disclosure-report links present: 438
- House disclosure-report links still missing: 0

Notes on the remaining gap:

- House Clerk's `ViewMemberSearchResult` endpoint is not a complete source of truth for current full-disclosure filings. For edge cases, the official `2024FD.zip` index is now used as a fallback.
- For current House members, `New Filer` reports are now accepted as the best available full-disclosure filing when no incumbent-style annual filing is present.
- For four very recent current House members, the best available official filing on the Clerk side is still a `Candidate Report`, and the site now labels those links accordingly:
- Adelita Grijalva
- Christian Menefee
- Matt Van Epps
- James Walkinshaw
