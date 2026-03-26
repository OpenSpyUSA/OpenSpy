# Senate Roll-Call Name Audit

Updated: 2026-03-24

## Scope

This audit re-fetched every currently selected Senate Trump-linked roll call on the site and replayed the live Senate name matcher against all current senators.

## Summary

- selected Senate roll calls checked: 361
- current senators checked: 100
- senators with fully exact first-name and surname matching on all matched votes: 68
- senators needing any display-name cleanup but still matching exactly after normalization: 21
- senators requiring a non-exact runtime whitelist rule: 11
- current Senate non-exact whitelist entries in code: 11
- senator-event ambiguous matches: 0
- same-entry ambiguous collisions: 0
- guardrail drift findings: 0

## Display-Cleanup Only Senators

- Adam B. Schiff (CA)
- Angela D. Alsobrooks (MD)
- Angus S., Jr. King (ME)
- Charles E. Schumer (NY)
- Christopher A. Coons (DE)
- Cory A. Booker (NJ)
- Cynthia M. Lummis (WY)
- Edward J. Markey (MA)
- Gary C. Peters (MI)
- James C. Justice (WV)
- James E. Risch (ID)
- John R. Curtis (UT)
- John W. Hickenlooper (CO)
- Kirsten E. Gillibrand (NY)
- Mark R. Warner (VA)
- Mazie K. Hirono (HI)
- Michael F. Bennet (CO)
- Raphael G. Warnock (GA)
- Richard J. Durbin (IL)
- Roger F. Wicker (MS)
- Susan M. Collins (ME)

## Non-Exact Runtime Guardrail Senators

- Bernard Sanders (VT): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Bernie Sanders`; Trump no-cuts Medicaid amendment test -> XML `Bernie Sanders`; Obamacare repeal reserve-fund vote 2 -> XML `Bernie Sanders`.
- Catherine Cortez Masto (NV): Compound Or Extended Surname. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Catherine Cortez Masto`; Trump no-cuts Medicaid amendment test -> XML `Catherine Cortez Masto`; Obamacare repeal reserve-fund vote 2 -> XML `Catherine Cortez Masto`.
- Chris Van Hollen (MD): Compound Or Extended Surname. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Chris Van Hollen`; Trump no-cuts Medicaid amendment test -> XML `Chris Van Hollen`; Obamacare repeal reserve-fund vote 2 -> XML `Chris Van Hollen`.
- Chuck Grassley (IA): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Charles Grassley`; Trump no-cuts Medicaid amendment test -> XML `Charles Grassley`; Obamacare repeal reserve-fund vote 2 -> XML `Charles Grassley`.
- Cindy Hyde-Smith (MS): Compound Or Extended Surname. Examples: Kavanaugh cloture -> XML `Cindy Hyde-Smith`; Kavanaugh confirmation -> XML `Cindy Hyde-Smith`; First border emergency disapproval -> XML `Cindy Hyde-Smith`.
- Jack Reed (RI): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 1 -> XML `John Reed`; Trump no-cuts Medicaid amendment test -> XML `John Reed`; Obamacare repeal reserve-fund vote 2 -> XML `John Reed`.
- Jacky Rosen (NV): Equivalent First Name. Examples: First border emergency disapproval -> XML `Jacklyn Rosen`; Second border emergency disapproval -> XML `Jacklyn Rosen`; Border emergency veto override attempt -> XML `Jacklyn Rosen`.
- Lisa Blunt Rochester (DE): Compound Or Extended Surname. Examples: Canada tariff emergency termination -> XML `Lisa Blunt Rochester`; Global tariff emergency termination -> XML `Lisa Blunt Rochester`; Tabling reconsideration on global tariff emergency -> XML `Lisa Blunt Rochester`.
- Margaret Wood Hassan (NH): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Maggie Hassan`; Trump no-cuts Medicaid amendment test -> XML `Maggie Hassan`; Obamacare repeal reserve-fund vote 2 -> XML `Maggie Hassan`.
- Thom Tillis (NC): Prefix First Name. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Thomas Tillis`; Trump no-cuts Medicaid amendment test -> XML `Thomas Tillis`; Obamacare repeal reserve-fund vote 2 -> XML `Thomas Tillis`.
- Tim Kaine (VA): Prefix First Name. Examples: Obamacare repeal reserve-fund vote 1 -> XML `Timothy Kaine`; Trump no-cuts Medicaid amendment test -> XML `Timothy Kaine`; Obamacare repeal reserve-fund vote 2 -> XML `Timothy Kaine`.

## Guardrail

House roll-call scoring is guarded separately: the build scripts hard-fail if any code path tries to use House name matching instead of House Clerk bioguide ID lookup.
Senate roll-call scoring now permits non-exact name matching only for a fixed whitelist of audited senators and audited XML name forms. Any new non-exact name form throws instead of silently scoring.
