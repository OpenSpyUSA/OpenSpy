# Senate Roll-Call Name Audit

Updated: 2026-03-21

## Scope

This audit re-fetched every currently selected Senate Trump-linked roll call on the site and replayed the live Senate name matcher against all current senators.

## Summary

- selected Senate roll calls checked: 333
- current senators checked: 100
- senators with fully exact first-name and surname matching on all matched votes: 68
- senators needing non-exact handling in at least one matched vote: 32
- senator-event ambiguous matches: 0
- same-entry ambiguous collisions: 0

## Non-Exact Senators

- Adam B. Schiff (CA): Display Name Cleanup.
- Angela D. Alsobrooks (MD): Display Name Cleanup.
- Angus S., Jr. King (ME): Display Name Cleanup.
- Bernard Sanders (VT): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Bernie Sanders`; Obamacare repeal reserve-fund vote 6 -> XML `Bernie Sanders`; Obamacare repeal reserve-fund vote 1 -> XML `Bernie Sanders`.
- Catherine Cortez Masto (NV): Compound Or Extended Surname. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Catherine Cortez Masto`; Obamacare repeal reserve-fund vote 6 -> XML `Catherine Cortez Masto`; Obamacare repeal reserve-fund vote 1 -> XML `Catherine Cortez Masto`.
- Charles E. Schumer (NY): Display Name Cleanup.
- Chris Van Hollen (MD): Compound Or Extended Surname. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Chris Van Hollen`; Obamacare repeal reserve-fund vote 6 -> XML `Chris Van Hollen`; Obamacare repeal reserve-fund vote 1 -> XML `Chris Van Hollen`.
- Christopher A. Coons (DE): Display Name Cleanup.
- Chuck Grassley (IA): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Charles Grassley`; Obamacare repeal reserve-fund vote 6 -> XML `Charles Grassley`; Obamacare repeal reserve-fund vote 1 -> XML `Charles Grassley`.
- Cindy Hyde-Smith (MS): Compound Or Extended Surname. Examples: Kavanaugh cloture -> XML `Cindy Hyde-Smith`; Kavanaugh confirmation -> XML `Cindy Hyde-Smith`; First border emergency disapproval -> XML `Cindy Hyde-Smith`.
- Cory A. Booker (NJ): Display Name Cleanup.
- Cynthia M. Lummis (WY): Display Name Cleanup.
- Edward J. Markey (MA): Display Name Cleanup.
- Gary C. Peters (MI): Display Name Cleanup.
- Jack Reed (RI): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 3 -> XML `John Reed`; Obamacare repeal reserve-fund vote 6 -> XML `John Reed`; Obamacare repeal reserve-fund vote 1 -> XML `John Reed`.
- Jacky Rosen (NV): Equivalent First Name. Examples: First border emergency disapproval -> XML `Jacklyn Rosen`; Second border emergency disapproval -> XML `Jacklyn Rosen`; USMCA passage -> XML `Jacklyn Rosen`.
- James C. Justice (WV): Display Name Cleanup.
- James E. Risch (ID): Display Name Cleanup.
- John R. Curtis (UT): Display Name Cleanup.
- John W. Hickenlooper (CO): Display Name Cleanup.
- Kirsten E. Gillibrand (NY): Display Name Cleanup.
- Lisa Blunt Rochester (DE): Compound Or Extended Surname. Examples: Canada tariff emergency termination -> XML `Lisa Blunt Rochester`; Tabling reconsideration on global tariff emergency -> XML `Lisa Blunt Rochester`; Global tariff emergency termination -> XML `Lisa Blunt Rochester`.
- Margaret Wood Hassan (NH): Equivalent First Name. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Maggie Hassan`; Obamacare repeal reserve-fund vote 6 -> XML `Maggie Hassan`; Obamacare repeal reserve-fund vote 1 -> XML `Maggie Hassan`.
- Mark R. Warner (VA): Display Name Cleanup.
- Mazie K. Hirono (HI): Display Name Cleanup.
- Michael F. Bennet (CO): Display Name Cleanup.
- Raphael G. Warnock (GA): Display Name Cleanup.
- Richard J. Durbin (IL): Display Name Cleanup.
- Roger F. Wicker (MS): Display Name Cleanup.
- Susan M. Collins (ME): Display Name Cleanup.
- Thom Tillis (NC): Prefix First Name. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Thomas Tillis`; Obamacare repeal reserve-fund vote 6 -> XML `Thomas Tillis`; Obamacare repeal reserve-fund vote 1 -> XML `Thomas Tillis`.
- Tim Kaine (VA): Prefix First Name. Examples: Obamacare repeal reserve-fund vote 3 -> XML `Timothy Kaine`; Obamacare repeal reserve-fund vote 6 -> XML `Timothy Kaine`; Obamacare repeal reserve-fund vote 1 -> XML `Timothy Kaine`.

## Guardrail

House roll-call scoring is now guarded separately: the build scripts hard-fail if any code path tries to use House name matching instead of House Clerk bioguide ID lookup.
