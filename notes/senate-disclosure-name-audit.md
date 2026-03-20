## Senate Disclosure Name Audit

Updated: 2026-03-20

This note tracks senators whose Senate eFD search names needed special handling beyond the public display name.

Confirmed search-name fixes:

- Jack Reed -> John F. Reed
- Chuck Grassley -> Charles E. Grassley
- Ben Ray Lujan -> use ASCII spelling for Senate eFD
- Chris Van Hollen -> keep `Van Hollen` together as the last name
- Jim Banks -> James Banks / James E. Banks
- Shelley Moore Capito -> Shelley Capito / Shelley M. Capito
- Jon Ossoff -> Thomas Jonathan Ossoff
- Lisa Blunt Rochester -> keep `Blunt Rochester` together as the last name
- Catherine Cortez Masto -> keep `Cortez Masto` together as the last name

Search aliases added as Senate eFD fallbacks:

- Margaret Wood Hassan -> Margaret Hassan / Maggie Hassan
- Jacky Rosen -> Jacklyn Rosen / Jacklyn S. Rosen
- Bill Cassidy -> William Cassidy / William M. Cassidy
- Bill Hagerty -> William Hagerty / William F. Hagerty
- Mike Lee -> Michael Lee / Michael S. Lee
- Ted Cruz -> Rafael Cruz / Rafael Edward Cruz
- Pete Ricketts -> Peter Ricketts / John Peter Ricketts
- Tommy Tuberville -> Thomas Tuberville / Thomas H. Tuberville
- Ted Budd -> Theodore Budd
- Katie Boyd Britt -> Katie Britt
- Richard J. Durbin -> Richard Durbin / Dick Durbin
- Mike Crapo -> Michael Crapo / Michael D. Crapo
- Edward J. Markey -> Edward Markey / Ed Markey

Systemic parser fixes added:

- Senate eFD search now tries multiple first-name variants, including versions without middle initials.
- Senate eFD annual reports now count both `/view/annual/` pages and `Annual Report` rows served through `/view/paper/`.
- Senate annual report URL and filing date are now preserved even when holdings parsing is incomplete.

Direct annual-report fallback added:

- Shelley Moore Capito
  Search-name fields use `Shelley Capito`, and the current Senate dataset also carries a manual official annual-report fallback:
  `Annual Report for CY 2024` filed `05/12/2025`
  `https://efdsearch.senate.gov/search/view/annual/56ff880c-f3ce-468c-99cd-a65364d4a0ad/`

- Tammy Duckworth
  Search-name fields now use `Ladda Tammy Duckworth`, and the current Senate dataset also carries a manual official annual-report fallback:
  `Annual Report for CY 2024` filed `07/31/2025`
  `https://efdsearch.senate.gov/search/view/annual/04a80b6d-cfca-4892-8926-b6ef44fdcf29/`
