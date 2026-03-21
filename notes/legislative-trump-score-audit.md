# Legislative Trump Score Audit

Date: 2026-03-17

## Purpose

This note records why some legislative Trump scores changed after the roll-call-based rebuild, so future checks can distinguish real data changes from matching bugs.

## Senate matching fixes

Senate roll-call XML does not provide a stable member ID in the same way House XML does, so Senate matching depends on person-name parsing plus state.

The Senate matcher was tightened to handle:

- middle initials and middle names
- nickname vs. formal first name
- preferred first name vs. legal first name
- compound surnames
- common first-name equivalences such as `Tim <-> Timothy`, `Thom <-> Thomas`, `Chuck <-> Charles`, `Bernie <-> Bernard`, and `Jacky <-> Jacklyn`

This repair fixed real false negatives, including cases like `Richard J. Durbin`, which had previously shown zero counted Trump-linked votes because the name match was too strict.

## House audit result

House roll-call matching is different. It uses the member's official bioguide ID extracted from the image URL and matches it against the House Clerk XML `name-id` field, so House scoring is not exposed to the same middle-initial or nickname bug class.

As of 2026-03-21, the build scripts also hard-fail if any code path tries to fall back to House name matching. The live House scoring path must use the House Clerk bioguide ID lookup only.

Initial House audit result before the late-2025 / early-2026 House roll-call expansion:

- current House members checked: 438
- missing bioguide IDs: 0
- duplicate bioguide IDs: 0
- current members seen in at least one selected House vote: 428
- current members never seen in any selected House vote: 10

The 10 zero-sample House cases were explainable without a matching bug:

- non-voting territorial or district members: Puerto Rico Resident Commissioner, and delegates from the District of Columbia, Guam, the U.S. Virgin Islands, American Samoa, and the Northern Mariana Islands
- late-arriving special-election members whose House service began after the latest selected 2025 House scoring events

After extending the selected House roll-call set into late 2025 and early 2026, those late-arriving special-election members picked up real sample sizes. The remaining zero-sample House cases are now only the six non-voting delegate or resident-commissioner seats.

## Scope note

A zero or very low sample does not always mean a matching problem. It can also mean:

- not yet in office for the selected vote window
- delegate or resident commissioner status
- missed or abstained votes

This note is only an internal audit memo. The public site should continue to display the score, sample size, and confidence values rather than this debugging history.

For the latest Senate matcher edge cases by person name, see `notes/senate-roll-call-name-audit.md`.

As of 2026-03-21, Senate roll-call scoring also has a stronger runtime guardrail: non-exact Senate name matching is allowed only for an audited whitelist of known nickname / compound-surname cases. Any new non-exact name form now throws instead of silently matching.
