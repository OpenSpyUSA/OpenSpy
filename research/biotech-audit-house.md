# House Biotech Audit

Date: 2026-03-30

Scope: current House roster on this site only.

Method used in this pass:
- Exact whole-word / whole-phrase matching for the user-supplied target list.
- Search order: official transcripts / government records, then official office pages / PDFs, then reliable transcripts / major news transcripts, then direct video, then secondary media quotes.
- This file is a running ledger. `checked no-hit so far` means partial work has been done and no verified attributable hit has been found yet in the checked sources; it does not mean the member has been fully cleared forever.

Target phrases:
- bioweapon
- bioweapons
- biosecurity
- biological threat
- biological threats
- embryo editing
- bioterrorism
- gain-of-function
- genetic engineering
- biological weapon
- biological weapons
- biodefense
- engineered pathogen
- biothreat
- biothreats
- bio-weapon
- bio weapon
- bioweaponization

Current audit direction:
- House by state, from the back of the roster order.
- First reverse-state tranche: `Wyoming -> Wisconsin -> West Virginia -> Washington`
- Second reverse-state tranche: `Virginia -> Virgin Islands -> Vermont -> Utah`
- Third reverse-state tranche: `Texas -> Tennessee -> South Dakota -> South Carolina`
- Fourth reverse-state tranche: `Rhode Island -> Pennsylvania -> Oregon -> Oklahoma`
- Fifth reverse-state tranche: `Ohio -> North Dakota -> North Carolina -> New York`
- Sixth reverse-state tranche: `New Mexico -> New Jersey -> New Hampshire -> Nevada`
- Seventh reverse-state tranche: `Nebraska -> Montana -> Missouri -> Mississippi`
- Eighth reverse-state tranche: `Minnesota -> Michigan -> Massachusetts -> Maryland`
- Ninth reverse-state tranche: `Maine -> Louisiana -> Kentucky -> Kansas`
- Tenth reverse-state tranche: `Iowa -> Indiana -> Illinois -> Idaho`
- Eleventh reverse-state tranche: `Hawaii -> Georgia -> Florida -> Delaware`
- Twelfth reverse-state tranche: `Connecticut -> Colorado -> California -> Arkansas`
- Thirteenth reverse-state tranche: `Arizona -> Alaska -> Alabama`

Coverage note:
- The tranche totals sum to 433 audited entries because the second tranche intentionally included the Virgin Islands delegate entry carried on the site roster. A strict current `U.S. Representative` count in `public/data/governmentData.json` is 432.

Current House exact-match findings already on site:
- 65 current House profiles already have verified entries in `src/biotechMentionEvidence.ts`

First reverse-state tranche size:
- 21 current House members
- 8 verified findings added to site data
- 13 checked no-hit so far
- 0 still incomplete in this tranche

Second reverse-state tranche progress:
- 17 current House profiles
- 9 current profiles with verified findings on site
- 8 checked no-hit so far
- 0 still incomplete in this tranche

Third reverse-state tranche progress:
- 55 current House profiles
- 8 current profiles with verified findings already on site
- 47 checked no-hit so far
- 0 still incomplete in this tranche

Fourth reverse-state tranche progress:
- 30 current House profiles
- 1 current profile with verified findings already on site
- 29 checked no-hit so far
- 0 still incomplete in this tranche

Fifth reverse-state tranche progress:
- 56 current House profiles
- 16 current profiles with verified findings already on site
- 40 checked no-hit so far
- 0 still incomplete in this tranche

Sixth reverse-state tranche progress:
- 20 current House profiles
- 3 current profiles with verified findings already on site
- 17 checked no-hit so far
- 0 still incomplete in this tranche

Seventh reverse-state tranche progress:
- 17 current House profiles
- 1 current profile with verified findings already on site
- 16 checked no-hit so far
- 0 still incomplete in this tranche

Eighth reverse-state tranche progress:
- 38 current House profiles
- 4 current profiles with verified findings on site
- 34 checked no-hit so far
- 0 still incomplete in this tranche

Ninth reverse-state tranche progress:
- 18 current House profiles
- 3 current profiles with verified findings on site
- 15 checked no-hit so far
- 0 still incomplete in this tranche

Tenth reverse-state tranche progress:
- 32 current House profiles
- 2 current profiles with verified findings on site
- 30 checked no-hit so far
- 0 still incomplete in this tranche

Eleventh reverse-state tranche progress:
- 44 current House profiles
- 0 current profiles with verified findings on site
- 44 checked no-hit so far
- 0 still incomplete in this tranche

Twelfth reverse-state tranche progress:
- 68 current House profiles
- 6 current profiles with verified findings on site
- 62 checked no-hit so far
- 0 still incomplete in this tranche

Twelfth tranche California deeper follow-up note:
- On 2026-03-31, the remaining California no-hit names in this tranche were run through the House multi-source audit in three additional batches after Ami Bera was promoted into a verified finding.
- Result: no further attributable exact-match evidence was verified from those California follow-up batches under the current workflow.
- This means the current California outcome inside the twelfth tranche remains: Jay Obernolte, Raul Ruiz, Robert Garcia, and Ami Bera verified; the rest remain checked no-hit so far.

Twelfth tranche Colorado deeper follow-up note:
- On 2026-04-10, the Colorado slice of the House multi-source audit was completed for Brittany Pettersen, Diana DeGette, Gabe Evans, Jason Crow, Jeff Crank, Jeff Hurd, Joe Neguse, and Lauren Boebert.
- Result: Lauren Boebert was promoted into a verified finding from an official first-person House issues page using the exact term `gain-of-function`; the remaining Colorado names in this tranche stayed checked no-hit so far under the current workflow.

Twelfth tranche Connecticut deeper follow-up note:
- On 2026-04-10, the Connecticut slice of the House multi-source audit was completed for Joe Courtney, Rosa DeLauro, Jahana Hayes, James Himes, and John Larson.
- Result: James Himes was promoted into a verified finding from an official office release quoting him on research into `biological threats` to pollinators; the remaining Connecticut names in this tranche stayed checked no-hit so far under the current workflow.

Twelfth tranche Arkansas deeper follow-up note:
- On 2026-04-10, the Arkansas slice of the House multi-source audit was completed for Eric Crawford, J. Hill, Bruce Westerman, and Steve Womack.
- Result: no attributable exact-match evidence was verified from the Arkansas follow-up batch under the current workflow.

Thirteenth reverse-state tranche progress:
- 17 current House profiles
- 5 current profiles with verified findings on site
- 12 checked no-hit so far
- 0 still incomplete in this tranche

## Confirmed Findings

### Robert Aderholt
- personId: `house-robert-aderholt-alabama-4th`
- classification: `direct self-use`
- source bundle:
  `official transcript` docs.house.gov opening statement PDF, Apr. 19, 2023
  https://docs.house.gov/meetings/AP/AP07/20230419/115687/HHRG-118-AP07-MState-A000055-20230419.pdf
- notable exact matches across bundle: `biodefense`
- note: the opening-statement PDF is explicitly titled for Chairman Robert B. Aderholt and uses the phrase `pandemic preparedness and biodefense` in his own statement.

### Andy Biggs
- personId: `house-andy-biggs-arizona-5th`
- classification: `direct self-use`
- source bundle:
  `official office page` Biggs House site, America First Contract
  https://biggs.house.gov/america-first-contract/contract
- notable exact matches across bundle: `gain-of-function`
- note: Biggs's official page presents the contract as his own policy document and includes the exact phrase in a plank on COVID-19 origins and U.S. funding of gain-of-function research in China.

### Ami Bera
- personId: `house-ami-bera-california-6th`
- classification: `direct self-use`
- source bundle:
  `official transcript` Congress.gov House hearing text, Dec. 8, 2021
  https://www.congress.gov/event/117th-congress/house-event/114290/text
- notable exact matches across bundle: `biosecurity`, `biological threats`, `biological weapons`, `bioterrorism`
- note: the official House Foreign Affairs hearing text attributes these phrases directly to Bera in his opening remarks on global biosecurity and emerging biological threats.

### Lauren Boebert
- personId: `house-lauren-boebert-colorado-4th`
- classification: `direct self-use`
- source bundle:
  `official office page` Boebert House issues page
  https://boebert.house.gov/issues/taxes-and-spending
- notable exact matches across bundle: `gain-of-function`
- note: the official page is written in first person and attributes the phrase directly to Boebert in policy text about cutting federal funding for gain-of-function research in China.

### James Himes
- personId: `house-james-himes-connecticut-4th`
- classification: `direct self-use`
- source bundle:
  `official office page` Himes House release, Aug. 2024
  https://himes.house.gov/2024/8/himes-celebrates-400-000-grant-for-sacred-heart-university-bee-research
- notable exact matches across bundle: `biological threats`
- note: the official release attributes the exact phrase directly to Himes in a quote supporting NSF-funded pollinator research into biological threats.

### Adam Smith
- personId: `house-adam-smith-washington-9th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` GovInfo Congressional Record, Apr. 12, 2013
  https://www.govinfo.gov/app/details/CREC-2013-04-12/CREC-2013-04-12-pt1-PgE447
- notable exact matches across bundle: `bioterrorism`
- note: the official record attributes the wording directly to Smith in extension-of-remarks text honoring Mary Selecky.

### Kim Schrier
- personId: `house-kim-schrier-washington-8th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` Congress.gov hearing text, May 11, 2022
  https://www.congress.gov/event/117th-congress/house-event/114802/text
- notable exact matches across bundle: `bioterrorism`
- note: the official hearing text attributes the wording directly to Schrier in member-day testimony on public-health emergency preparedness.

### Dan Newhouse
- personId: `house-dan-newhouse-washington-4th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` GovInfo hearing HTML, "Department of Homeland Security Appropriations for 2021"
  https://www.govinfo.gov/content/pkg/CHRG-116hhrg43031/html/CHRG-116hhrg43031.htm
- notable exact matches across bundle: `biodefense`
- note: the official hearing transcript attributes the wording directly to Newhouse in questioning about DHS science priorities and biodefense capabilities.

### Glenn Grothman
- personId: `house-glenn-grothman-wisconsin-6th`
- classification: `direct self-use`
- source bundle:
  `official office page` Grothman statement on Fauci retirement
  https://grothman.house.gov/news/documentsingle.aspx?DocumentID=3107
- notable exact matches across bundle: `gain-of-function`
- note: Grothman's official office statement directly attributes the wording to him in remarks about Fauci, NIH funding, and the Wuhan Lab.

### Bryan Steil
- personId: `house-bryan-steil-wisconsin-1st`
- classification: `signed or office-owned document`
- source bundle:
  `media quote / secondary report` WisPolitics press release, Apr. 25, 2023
  https://www.wispolitics.com/2023/wisconsin-congressional-republicans-demand-answers-on-biosafety-incident-at-uw-madison/?pdf=291516
- notable exact matches across bundle: `gain-of-function`
- note: the published press-release letter text explicitly says it was signed by Steil and uses the target language in the body of the letter.

### Scott Fitzgerald
- personId: `house-scott-fitzgerald-wisconsin-5th`
- classification: `signed or office-owned document`
- source bundle:
  `media quote / secondary report` WisPolitics press release, Apr. 25, 2023
  https://www.wispolitics.com/2023/wisconsin-congressional-republicans-demand-answers-on-biosafety-incident-at-uw-madison/?pdf=291516
- notable exact matches across bundle: `gain-of-function`
- note: the published press-release letter text explicitly says it was signed by Fitzgerald and uses the target language in the body of the letter.

### Derrick Van Orden
- personId: `house-derrick-van-orden-wisconsin-3rd`
- classification: `signed or office-owned document`
- source bundle:
  `media quote / secondary report` WisPolitics press release, Apr. 25, 2023
  https://www.wispolitics.com/2023/wisconsin-congressional-republicans-demand-answers-on-biosafety-incident-at-uw-madison/?pdf=291516
- notable exact matches across bundle: `gain-of-function`
- note: the published press-release letter text explicitly says it was signed by Van Orden and uses the target language in the body of the letter. This is stronger than the earlier partial checked-no-hit hearing sweep, which is therefore superseded.

### Thomas Tiffany
- personId: `house-thomas-tiffany-wisconsin-7th`
- classification: `direct self-use`
- source bundle:
  `media quote / secondary report` WisPolitics opinion column, Aug. 4, 2021
  https://www.wispolitics.com/2021/tom-tiffany-federal-health-officials-lack-of-transparency-leads-to-confusion-among-americans/
- notable exact matches across bundle: `gain-of-function`
- note: the page presents the text as Tiffany's own bylined opinion column, so this counts as direct self-use even though the hosting source is not an official government domain.

### John McGuire
- personId: `house-john-mcguire-virginia-5th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript, June 10, 2025
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
- notable exact matches across bundle: `bioweapon`
- note: this verified Virginia finding was already present in the codebase before the second reverse-state tranche began.

### Ben Cline
- personId: `house-ben-cline-virginia-6th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` Congress.gov HHS FY2023 budget hearing text
  https://www.congress.gov/event/117th-congress/house-event/114622/text
- notable exact matches across bundle: `gain-of-function`
- note: the official hearing transcript attributes the wording directly to Cline in questioning about HHS and gain-of-function research.

### H. Morgan Griffith
- personId: `house-h-griffith-virginia-9th`
- classification: `direct self-use`
- source bundle:
  `official office page` Griffith statement, Jan. 23, 2025
  https://morgangriffith.house.gov/news/documentsingle.aspx?DocumentID=404288
  `official office page` Griffith hearing remarks, Feb. 1, 2023
  https://morgangriffith.house.gov/news/documentsingle.aspx?DocumentID=402787
- notable exact matches across bundle: `gain-of-function`, `biodefense`
- note: official Griffith office pages attribute both terms directly to him in separate pages.

### Donald Beyer
- personId: `house-donald-beyer-virginia-8th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Beyer office page, Feb. 4, 2025
  https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6362
  `official office PDF` Signed Virginia delegation letter PDF
  https://beyer.house.gov/UploadedFiles/Congressional_Letter_-_Help_Virginia_Bird_Flu_Response_-_02-04-2025.pdf
- notable exact matches across bundle: `biosecurity`
- note: the page says Beyer and named Virginia colleagues wrote the quoted letter text that says Virginia must prioritize biosecurity.

### Eugene Vindman
- personId: `house-eugene-vindman-virginia-7th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Beyer office page, Feb. 4, 2025
  https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6362
  `official office PDF` Signed Virginia delegation letter PDF
  https://beyer.house.gov/UploadedFiles/Congressional_Letter_-_Help_Virginia_Bird_Flu_Response_-_02-04-2025.pdf
- notable exact matches across bundle: `biosecurity`
- note: the page explicitly lists Vindman among the members who wrote the quoted letter text containing the target language.

### Robert Scott
- personId: `house-robert-scott-virginia-3rd`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Beyer office page, Feb. 4, 2025
  https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6362
  `official office PDF` Signed Virginia delegation letter PDF
  https://beyer.house.gov/UploadedFiles/Congressional_Letter_-_Help_Virginia_Bird_Flu_Response_-_02-04-2025.pdf
- notable exact matches across bundle: `biosecurity`
- note: the official release says Bobby Scott was one of the members who wrote the letter, and the attached signed PDF lists Robert C. "Bobby" Scott as a signer.

### Jennifer McClellan
- personId: `house-jennifer-mcclellan-virginia-4th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Beyer office page, Feb. 4, 2025
  https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6362
  `official office PDF` Signed Virginia delegation letter PDF
  https://beyer.house.gov/UploadedFiles/Congressional_Letter_-_Help_Virginia_Bird_Flu_Response_-_02-04-2025.pdf
- notable exact matches across bundle: `biosecurity`
- note: the official release says Jennifer McClellan was one of the members who wrote the letter, and the attached signed PDF lists Jennifer L. McClellan as a signer.

### Suhas Subramanyam
- personId: `house-suhas-subramanyam-virginia-10th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Beyer office page, Feb. 4, 2025
  https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6362
  `official office PDF` Signed Virginia delegation letter PDF
  https://beyer.house.gov/UploadedFiles/Congressional_Letter_-_Help_Virginia_Bird_Flu_Response_-_02-04-2025.pdf
- notable exact matches across bundle: `biosecurity`
- note: the page explicitly lists Subramanyam among the members who wrote the quoted letter text containing the target language.

### Robert Wittman
- personId: `house-robert-wittman-virginia-1st`
- classification: `direct self-use`
- source bundle:
  `media quote / secondary report` Fox News opinion column, Sept. 15, 2021
  https://www.foxnews.com/opinion/world-truth-covid-origin-rep-wittman-rep-stefanik
- notable exact matches across bundle: `gain-of-function`
- note: the article is presented under Wittman's byline with Elise Stefanik, so this counts as attributable direct self-use rather than mere page context.

### Michael McCaul
- personId: `house-michael-mccaul-texas-10th`
- classification: `signed or office-owned document`
- source bundle:
  `official office PDF` House Foreign Affairs hosted report PDF
  https://foreignaffairs.house.gov/sites/evo-subsites/republicans-foreignaffairs.house.gov/files/migrated/uploads/2021/08/ORIGINS-OF-COVID-19-REPORT.pdf
- notable exact matches across bundle: `bioweapons`
- note: the official House-hosted report uses the target language in hosted committee material rather than as a direct self-use quote in this pass.

### Lance Gooden
- personId: `house-lance-gooden-texas-5th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Gooden STOP COVID Act release
  https://gooden.house.gov/2020/4/gooden-introduces-stop-covid-act-hold-china-accountable-coronavirus-pandemic
- notable exact matches across bundle: `bioweapon`
- note: Gooden's official office page uses the target language in office page text, but this pass does not count it as a direct self-use quote.

### Chip Roy
- personId: `house-chip-roy-texas-21st`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Roy press release reproducing signed Fauci letter
  https://roy.house.gov/media/press-releases/rep-roy-doubles-down-and-demands-answers-fauci-emails
- notable exact matches across bundle: `gain-of-function`
- note: Roy's official House press release reproduces a signed letter that uses the target language in questions about Fauci emails and Wuhan-related gain-of-function research.

### Dan Crenshaw
- personId: `house-dan-crenshaw-texas-2nd`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Crenshaw-Peters BIO Early Warning Act release
  https://crenshaw.house.gov/2023/6/crenshaw-peters-release-discussion-draft-of-the-bipartisan-bio-early-warning-act
- notable exact matches across bundle: `biosecurity`
- note: Crenshaw's official House page uses the target language in office-authored legislative release material for the BIO Early Warning Act.

### William Timmons
- personId: `house-william-timmons-south-carolina-4th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript, June 10, 2025
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
- notable exact matches across bundle: `bioweapon`, `bioweapons`
- note: the official House hearing transcript attributes target-language questioning directly to Timmons in discussion of genetic data and targeted bioweapons.

### Ronny Jackson
- personId: `house-ronny-jackson-texas-13th`
- classification: `direct self-use`
- source bundle:
  `official office page` Jackson hearing remarks page
  https://jackson.house.gov/news/documentsingle.aspx?DocumentID=1091
- notable exact matches across bundle: `gain-of-function`
- note: Jackson's official House page reproduces his own hearing remarks and directly attributes target-language use to him in questioning about Fauci, Wuhan, and gain-of-function research.

### Troy Nehls
- personId: `house-troy-nehls-texas-22nd`
- classification: `signed or office-owned document`
- source bundle:
  `official office PDF` Nehls-hosted Rogan-Malone transcript
  https://nehls.house.gov/sites/evo-subsites/nehls.house.gov/files/2022-01/JRE-Rogan-Malone-Transcript.pdf
- notable exact matches across bundle: `biodefense`
- note: Nehls's official House site hosts a transcript containing the target language, but this pass does not attribute that matched biodefense wording directly to Nehls himself.

### Nancy Mace
- personId: `house-nancy-mace-south-carolina-1st`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Mace NDAA markup release
  https://mace.house.gov/media/press-releases/rep-nancy-mace-secures-26-major-legislative-wins-fy26-ndaa-markup-house-armed
- notable exact matches across bundle: `gain-of-function`
- note: Mace's official House release uses the target language in office-authored legislative material describing her adopted amendment to ban gain-of-function pathogen research.

### Chrissy Houlahan
- personId: `house-chrissy-houlahan-pennsylvania-6th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript, Mar. 12, 2024
  https://docs.house.gov/meetings/IG/IG00/20240312/116929/HHRG-118-IG00-Transcript-20240312.pdf
- notable exact matches across bundle: `bioweapons`
- note: the official House hearing transcript attributes direct target-language use to Chrissy Houlahan.

## Checked No-Hit So Far

These entries have real checked-source work behind them. No verified attributable hit has been found in the checked material below.

### Alma Adams
- personId: `house-alma-adams-north-carolina-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Alma Adams official House site
  https://adams.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Joyce Beatty
- personId: `house-joyce-beatty-ohio-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Joyce Beatty official House site
  https://beatty.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Shontel Brown
- personId: `house-shontel-brown-ohio-11th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Shontel Brown official House site
  https://shontelbrown.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Mike Carey
- personId: `house-mike-carey-ohio-15th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mike Carey official House site
  https://carey.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Warren Davidson
- personId: `house-warren-davidson-ohio-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Warren Davidson official House site
  https://davidson.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Donald Davis
- personId: `house-donald-davis-north-carolina-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Donald Davis official House site
  https://dondavis.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Chuck Edwards
- personId: `house-chuck-edwards-north-carolina-11th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Chuck Edwards official House site
  https://edwards.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Adriano Espaillat
- personId: `house-adriano-espaillat-new-york-13th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Adriano Espaillat official House site
  https://espaillat.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Valerie Foushee
- personId: `house-valerie-foushee-north-carolina-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Valerie Foushee official House site
  https://foushee.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: the continued deeper sweep did not verify an attributable exact-match hit in the checked official office pages, House hearing records, or broader reliable transcript coverage.

### Virginia Foxx
- personId: `house-virginia-foxx-north-carolina-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Virginia Foxx official House site
  https://foxx.house.gov/
  `official transcript / government record` Congress.gov transcript, Oct. 18, 2023
  https://www.congress.gov/118/meeting/house/116474/documents/HHRG-118-VC00-Transcript-20231018.pdf
- note: targeted transcript checks and office-site review did not verify any of the biotech target phrases as attributable Foxx remarks in the checked material.

### Laura Gillen
- personId: `house-laura-gillen-new-york-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Laura Gillen official House site
  https://gillen.house.gov/
  `official transcript / government record` Congress.gov transcript, Oct. 18, 2023
  https://www.congress.gov/118/meeting/house/116474/documents/HHRG-118-VC00-Transcript-20231018.pdf
- note: targeted transcript checks and office-site review did not verify any of the biotech target phrases as attributable Gillen remarks in the checked material.

### Daniel Goldman
- personId: `house-daniel-goldman-new-york-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Daniel Goldman official House site
  https://goldman.house.gov/
  `official transcript / government record` Congress.gov transcript, Oct. 18, 2023
  https://www.congress.gov/118/meeting/house/116474/documents/HHRG-118-VC00-Transcript-20231018.pdf
- note: targeted transcript checks and office-site review did not verify any of the biotech target phrases as attributable Goldman remarks in the checked material.

### Pat Harrigan
- personId: `house-pat-harrigan-north-carolina-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Pat Harrigan official House site
  https://harrigan.house.gov/
  `congressional/government record` DOE hearing text
  https://www.congress.gov/event/119th-congress/house-event/LC74498/text
- note: targeted hearing-text checks and office-site review did not verify any of the biotech target phrases as attributable Harrigan remarks in the checked material.

### Mark Harris
- personId: `house-mark-harris-north-carolina-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mark Harris official House site
  https://markharris.house.gov/
  `official transcript` House Agriculture Subcommittee transcript, July 15, 2025
  https://docs.house.gov/meetings/AG/AG29/20250715/118471/HHRG-119-AG29-Transcript-20250715.pdf
- note: targeted transcript checks and office-site review did not verify any of the biotech target phrases as attributable Harris remarks in the checked material.

### Hakeem Jeffries
- personId: `house-hakeem-jeffries-new-york-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Hakeem Jeffries official House site
  https://jeffries.house.gov/
  `official office page` Jeffries PBS interview page, Feb. 16, 2026
  https://jeffries.house.gov/2026/02/16/leader-jeffries-on-pbs-ice-has-been-targeting-law-abiding-immigrant-families-and-brutalizing-american-communities-thats-unacceptable/
- note: targeted office-page checks did not verify any of the biotech target phrases as attributable Jeffries remarks in the checked material.

### Brad Knott
- personId: `house-brad-knott-north-carolina-13th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Brad Knott official House site
  https://knott.house.gov/
  `official transcript / government record` House Energy and Commerce event page, Dec. 17, 2025
  https://docs.house.gov/Committee/Calendar/ByEvent.aspx?EventId=118773
- note: targeted hearing-record checks and office-site review did not verify any of the biotech target phrases as attributable Knott remarks in the checked material.

### Nick LaLota
- personId: `house-nick-lalota-new-york-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Nick LaLota official House site
  https://lalota.house.gov/
  `congressional/government record` House Homeland Security hearing text, Mar. 20, 2024
  https://www.congress.gov/event/118th-congress/house-event/LC73444/text
- note: targeted hearing-text checks and office-site review did not verify any of the biotech target phrases as attributable LaLota remarks in the checked material.

### Greg Landsman
- personId: `house-greg-landsman-ohio-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Greg Landsman official House site
  https://landsman.house.gov/
  `congressional/government record` Labor-HHS-Education member day event page, Mar. 8, 2023
  https://www.congress.gov/index.php/event/118th-congress/house-event/115417
- note: targeted hearing-record checks and office-site review did not verify any of the biotech target phrases as attributable Landsman remarks in the checked material.

### Nicholas Langworthy
- personId: `house-nicholas-langworthy-new-york-23rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Nicholas Langworthy official House site
  https://langworthy.house.gov/
  `congressional/government record` Investigating the Origins of COVID-19 hearing text, Mar. 8, 2023
  https://www.congress.gov/event/118th-congress/house-event/LC70395/text
- note: targeted hearing-record checks and office-site review did not verify any of the biotech target phrases as attributable Langworthy remarks in the checked material.

### George Latimer
- personId: `house-george-latimer-new-york-16th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` George Latimer official House site
  https://latimer.house.gov/
  `official transcript / government record` Congressional Record
  https://www.congress.gov/
- note: office-page, Congressional Record, and official transcript checks did not verify any of the biotech target phrases as attributable Latimer remarks in the checked material.

### Michael Lawler
- personId: `house-michael-lawler-new-york-17th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Michael Lawler official House site
  https://lawler.house.gov/
  `official transcript / government record` Foreign Affairs and House-record checks
  https://www.congress.gov/
- note: official committee-record and office-page checks did not verify any of the biotech target phrases as attributable Lawler remarks in the checked material.

### John Mannion
- personId: `house-john-mannion-new-york-22nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` John Mannion official House site
  https://mannion.house.gov/
  `official transcript / government record` Transportation and Infrastructure member day testimony PDF, Jan. 14, 2026
  https://docs.house.gov/meetings/PW/PW00/20260114/118810/HHRG-119-PW00-Wstate-M001231-20260114.pdf
- note: targeted testimony checks and office-site review did not verify any of the biotech target phrases as attributable Mannion remarks in the checked material.

### Addison McDowell
- personId: `house-addison-mcdowell-north-carolina-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Addison McDowell official House site
  https://mcdowell.house.gov/
  `official transcript / government record` Energy and Commerce member day statement PDF, Dec. 12, 2025
  https://docs.house.gov/meetings/IF/IF00/20251212/118747/HHRG-119-IF00-MState-M001240-20251212.pdf
- note: targeted statement checks and office-site review did not verify any of the biotech target phrases as attributable McDowell remarks in the checked material.

### Max Miller
- personId: `house-max-miller-ohio-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Max Miller official House site
  https://maxmiller.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official transcript, government-record, and office-page checks did not verify any of the biotech target phrases as attributable Max Miller remarks in the checked material.

### Tim Moore
- personId: `house-tim-moore-north-carolina-14th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Tim Moore official House site
  https://timmoore.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official transcript, government-record, and office-page checks did not verify any of the biotech target phrases as attributable Tim Moore remarks in the checked material.

### Joseph Morelle
- personId: `house-joseph-morelle-new-york-25th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Joseph Morelle official House site
  https://morelle.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official transcript, government-record, and office-page checks did not verify any of the biotech target phrases as attributable Morelle remarks in the checked material.

### Gregory Murphy
- personId: `house-gregory-murphy-north-carolina-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Gregory Murphy official House site
  https://murphy.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official transcript, government-record, and office-page checks did not verify any of the biotech target phrases as attributable Murphy remarks in the checked material.

### Jerrold Nadler
- personId: `house-jerrold-nadler-new-york-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jerrold Nadler official House site
  https://nadler.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official office-page, House-record, and transcript checks did not verify any attributable exact-match use of the biotech target phrases in the checked material.

### Alexandria Ocasio-Cortez
- personId: `house-alexandria-ocasio-cortez-new-york-14th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Alexandria Ocasio-Cortez official House site
  https://ocasio-cortez.house.gov/
  `official transcript / government record` House Select Subcommittee hearing PDF, May 7, 2024
  https://www.govinfo.gov/content/pkg/CHRG-118hhrg55548/pdf/CHRG-118hhrg55548.pdf
- note: targeted office-page and hearing-record checks did not verify any attributable exact-match use of the biotech target phrases in the checked material.

### Josh Riley
- personId: `house-josh-riley-new-york-19th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Josh Riley official House site
  https://riley.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official office-page, House-record, and transcript checks did not verify any attributable exact-match use of the biotech target phrases in the checked material.

### Michael A. Rulli
- personId: `house-michael-a-rulli-ohio-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Michael A. Rulli official House site
  https://rulli.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official office-page, House-record, and transcript checks did not verify any attributable exact-match use of the biotech target phrases in the checked material.

### Patrick Ryan
- personId: `house-patrick-ryan-new-york-18th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Patrick Ryan official House site
  https://patryan.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official office-page, House-record, and transcript checks did not verify any attributable exact-match use of the biotech target phrases in the checked material.

### Elise Stefanik
- personId: `house-elise-stefanik-new-york-21st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Elise Stefanik official House site
  https://stefanik.house.gov/
  `official transcript / government record` Docs.House.gov
  https://docs.house.gov/
  `official transcript / government record` Congress.gov
  https://www.congress.gov/
- note: official office-page, House-record, and transcript checks did not verify any attributable exact-match use of the biotech target phrases in the checked material.

### Thomas R. Suozzi
- personId: `house-thomas-r-suozzi-new-york-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Thomas R. Suozzi official House site
  https://suozzi.house.gov/
  `congressional/government record` House Homeland Security CWMD oversight hearing text, Mar. 20, 2024
  https://www.congress.gov/event/118th-congress/house-event/LC73444/text
- note: target terms appear elsewhere in the checked hearing record, but the deeper attribution pass did not verify any exact-match use in remarks attributable to Suozzi, and his official office pages checked in this pass also remained clean.

### Emilia Sykes
- personId: `house-emilia-sykes-ohio-13th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Emilia Sykes official House site
  https://sykes.house.gov/
  `congressional/government record` DOE National Laboratories hearing text, Feb. 12, 2025
  https://www.congress.gov/event/119th-congress/house-event/LC74498/text
- note: the checked hearing and office-page sweep surfaced relevant lab-policy discussion, but did not verify any exact biotech target phrase in statements attributable to Sykes.

### David Taylor
- personId: `house-david-taylor-ohio-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` David Taylor official House site
  https://taylor.house.gov/
  `official transcript / government record` official House / Congress record checks
  https://docs.house.gov/
  https://www.congress.gov/
- note: the deeper review did not verify any attributable exact-match use of the biotech target phrases by Taylor. A surfaced legislative page with target-language bill text was screened out because the phrase was not clearly attributable to Taylor himself.

### Claudia Tenney
- personId: `house-claudia-tenney-new-york-24th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Claudia Tenney official House site
  https://tenney.house.gov/
  `congressional/government record` EPA-agriculture oversight hearing text
  https://www.congress.gov/event/118th-congress/house-event/LC73037/text
- note: the checked hearing record includes nearby biosafety / biosecurity discussion, but the deeper attribution pass did not verify any exact biotech target phrase in remarks attributable to Tenney.

### Paul Tonko
- personId: `house-paul-tonko-new-york-20th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Paul Tonko official House site
  https://tonko.house.gov/
  `official transcript` House Energy and Commerce transcript, Apr. 27, 2023
  https://docs.house.gov/meetings/IF/IF02/20230427/115835/HMTG-118-IF02-Transcript-20230427.pdf
- note: the checked hearing transcript contains multiple exact biotech terms, but the deeper attribution pass found those phrases in other speakers' remarks rather than in attributable Tonko wording. The office-site sweep for this batch also remained clean.

### Ritchie Torres
- personId: `house-ritchie-torres-new-york-15th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Ritchie Torres official House site
  https://ritchietorres.house.gov/
  `official transcript / government record` House / Congressional Record checks
  https://www.congress.gov/
- note: the broader House-record and office-page sweep did not verify any attributable exact whole-word / whole-phrase match from the biotech target list for Torres in the checked material.

### Nydia Velazquez
- personId: `house-nydia-velazquez-new-york-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Nydia Velazquez official House site
  https://velazquez.house.gov/
  `official transcript / government record` House / Congressional Record checks
  https://docs.house.gov/
  https://www.congress.gov/
- note: the broader office-page and official-record sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Velazquez.

### Herbert Conaway
- personId: `house-herbert-conaway-new-jersey-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Herbert Conaway official House site
  https://conaway.house.gov/
  `congressional/government record` GovInfo Congressional Record Index
  https://www.govinfo.gov/app/details/CRI-2026/CRI-2026-CONAWAY-HERBERT-C-JR-F44D67
- note: the checked official office pages and GovInfo activity index did not verify any attributable exact whole-word / whole-phrase match from the biotech target list for Conaway.

### Josh Gottheimer
- personId: `house-josh-gottheimer-new-jersey-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Josh Gottheimer official House site
  https://gottheimer.house.gov/
  `congressional/government record` Worldwide Threats to the Homeland hearing text
  https://www.congress.gov/event/117th-congress/house-event/115183/text
- note: the checked hearing record contains relevant threat-language background, but the deeper attribution pass did not verify any exact biotech target phrase in remarks attributable to Gottheimer.

### Thomas Kean
- personId: `house-thomas-kean-new-jersey-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Thomas Kean official House site
  https://kean.house.gov/
  `official transcript / government record` House / Congressional Record checks
  https://docs.house.gov/
  https://www.congress.gov/
- note: the deeper review did not verify any attributable exact whole-word / whole-phrase biotech hit for current Rep. Thomas Kean. A surfaced older hearing hit for Thomas H. Kean was screened out as a different person.

### Teresa Leger Fernandez
- personId: `house-teresa-leger-fernandez-new-mexico-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Teresa Leger Fernandez official House site
  https://fernandez.house.gov/
  `congressional/government record` Preventing Pandemics through U.S. Wildlife-borne Disease Surveillance hearing PDF
  https://www.congress.gov/117/chrg/CHRG-117hhrg47453/CHRG-117hhrg47453.pdf
- note: the checked hearing record includes target terms in witness material, but the deeper attribution pass did not verify any exact biotech target phrase in remarks attributable to Leger Fernandez herself.

### LaMonica McIver
- personId: `house-lamonica-mciver-new-jersey-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` LaMonica McIver official House site
  https://mciver.house.gov/
  `congressional/government record` House Small Business Committee hearing transcript, Mar. 11, 2025
  https://www.govinfo.gov/content/pkg/CHRG-119hhrg59421/pdf/CHRG-119hhrg59421.pdf
- note: the checked hearing transcript and office-page review did not verify any exact whole-word / whole-phrase biotech hit attributable to McIver.

### Robert Menendez
- personId: `house-robert-menendez-new-jersey-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Robert Menendez official House site
  https://menendez.house.gov/
  `congressional/government record` GovInfo Congressional Record Index
  https://www.govinfo.gov/
- note: the deeper review of Menendez's official office pages and GovInfo activity index did not verify any attributable exact whole-word / whole-phrase match from the biotech target list.

### Nellie Pou
- personId: `house-nellie-pou-new-jersey-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Nellie Pou official House site
  https://pou.house.gov/
  `congressional/government record` Brownfields Program hearing PDF, May 7, 2025
  https://www.congress.gov/119/meeting/house/118228/documents/CHRG-119hhrg60917.pdf
- note: the checked hearing transcript records Pou's remarks on brownfields cleanup and redevelopment, but did not verify any exact whole-word / whole-phrase biotech hit attributable to her.

### Melanie Stansbury
- personId: `house-melanie-stansbury-new-mexico-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Melanie Stansbury official House site
  https://stansbury.house.gov/
  `congressional/government record` Locking in the DOGE Cuts hearing PDF, June 24, 2025
  https://www.congress.gov/119/chrg/CHRG-119hhrg60814/CHRG-119hhrg60814.pdf
- note: the checked hearing transcript records Stansbury's opening statement and discussion on fiscal oversight, but did not verify any exact whole-word / whole-phrase biotech target phrase attributable to her.

### Jefferson Van Drew
- personId: `house-jefferson-van-drew-new-jersey-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jefferson Van Drew official House site
  https://vandrew.house.gov/
  `official transcript / government record` House and Congressional Record checks
  https://docs.house.gov/
  https://www.congress.gov/
- note: the checked official record and office-page sweep did not verify any attributable exact whole-word / whole-phrase biotech hit for Van Drew.

### Gabe Vasquez
- personId: `house-gabe-vasquez-new-mexico-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Gabe Vasquez official House site
  https://vasquez.house.gov/
  `official transcript / government record` House and Congressional Record checks
  https://docs.house.gov/
  https://www.congress.gov/
- note: the checked official record and office-page sweep did not verify any attributable exact whole-word / whole-phrase biotech hit for Vasquez.

### Bonnie Watson Coleman
- personId: `house-bonnie-watson-coleman-new-jersey-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Bonnie Watson Coleman official House site
  https://watsoncoleman.house.gov/
  `congressional/government record` Defending Against Bioterrorism hearing PDF
  https://www.govinfo.gov/content/pkg/CHRG-114hhrg99747/pdf/CHRG-114hhrg99747.pdf
- note: the checked Homeland Security hearing record lists Watson Coleman as present, but the deeper attribution pass did not verify any exact biotech target phrase in text attributable to her, and the office-page sweep also remained clean.

### Mark Amodei
- personId: `house-mark-amodei-nevada-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mark Amodei official House site
  https://amodei.house.gov/
  `congressional/government record` Natural Resources Subcommittee transcript, Nov. 14, 2023
  https://www.congress.gov/118/meeting/house/116529/documents/HHRG-118-II10-Transcript-20231114.pdf
- note: the checked hearing transcript and office-page sweep did not verify any exact whole-word / whole-phrase biotech hit attributable to Amodei.

### Maggie Goodlander
- personId: `house-maggie-goodlander-new-hampshire-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Maggie Goodlander official House site
  https://goodlander.house.gov/
  `congressional/government record` Transportation and Infrastructure member day hearing PDF, May 14, 2025
  https://www.govinfo.gov/content/pkg/CHRG-119hhrg61179/pdf/CHRG-119hhrg61179.pdf
- note: the checked member-day hearing record and office-page sweep did not verify any exact whole-word / whole-phrase biotech hit attributable to Goodlander.

### Steven Horsford
- personId: `house-steven-horsford-nevada-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Steven Horsford official House site
  https://horsford.house.gov/
  `congressional/government record` COVID-19's Impact on DOD and Its Servicemembers hearing PDF
  https://www.govinfo.gov/content/pkg/CHRG-118hhrg55268/pdf/CHRG-118hhrg55268.pdf
- note: the checked hearing transcript contains relevant COVID-era discussion, but the deeper attribution pass did not verify any exact biotech target phrase in text attributable to Horsford.

### Susie Lee
- personId: `house-susie-lee-nevada-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Susie Lee official House site
  https://susielee.house.gov/
  `official office page` official-site crawler pass
  https://susielee.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Lee.

### Chris Pappas
- personId: `house-chris-pappas-new-hampshire-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Chris Pappas official House site
  https://pappas.house.gov/
  `official office page` official-site crawler pass
  https://pappas.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Pappas.

### Dina Titus
- personId: `house-dina-titus-nevada-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Dina Titus official House site
  https://titus.house.gov/
  `official office page` official-site crawler pass
  https://titus.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Titus.

### Adrian Smith
- personId: `house-adrian-smith-nebraska-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Adrian Smith official House site
  https://adriansmith.house.gov/
  `official office page` official-site crawler pass
  https://adriansmith.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Adrian Smith.

### Mike Flood
- personId: `house-mike-flood-nebraska-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mike Flood official House site
  https://flood.house.gov/
  `official office page` official-site crawler pass
  https://flood.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Flood.

### Ryan Zinke
- personId: `house-ryan-zinke-montana-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Ryan Zinke official House site
  https://zinke.house.gov/
  `official office page` official-site crawler pass
  https://zinke.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Zinke.

### Troy Downing
- personId: `house-troy-downing-montana-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Troy Downing official House site
  https://downing.house.gov/
  `official office page` official-site crawler pass
  https://downing.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Downing.

### Ann Wagner
- personId: `house-ann-wagner-missouri-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Ann Wagner official House site
  https://wagner.house.gov/
  `official office page` official-site crawler pass
  https://wagner.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Wagner.

### Emanuel Cleaver
- personId: `house-emanuel-cleaver-missouri-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Emanuel Cleaver official House site
  https://cleaver.house.gov/
  `official office page` official-site crawler pass
  https://cleaver.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Cleaver.

### Eric Burlison
- personId: `house-eric-burlison-missouri-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Eric Burlison official House site
  https://burlison.house.gov/
  `official office page` official-site crawler pass
  https://burlison.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Burlison.

### Jason Smith
- personId: `house-jason-smith-missouri-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jason Smith official House site
  https://jasonsmith.house.gov/
  `official office page` official-site crawler pass
  https://jasonsmith.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Jason Smith.

### Mark Alford
- personId: `house-mark-alford-missouri-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mark Alford official House site
  https://alford.house.gov/
  `official office page` Community Funding Project Requests page
  https://alford.house.gov/community-funding-project-requests
- note: the crawler surfaced `genetic engineering` on Alford's community-funding page, but the deeper attribution pass found it only inside a hosted project title and project description rather than attributable Alford language, so it was not counted as a verified hit.

### Robert Onder
- personId: `house-robert-onder-missouri-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Robert Onder official House site
  https://onder.house.gov/
  `official office page` official-site crawler pass
  https://onder.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Onder.

### Sam Graves
- personId: `house-sam-graves-missouri-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Sam Graves official House site
  https://graves.house.gov/
  `official office page` official-site crawler pass
  https://graves.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Graves.

### Wesley Bell
- personId: `house-wesley-bell-missouri-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Wesley Bell official House site
  https://bell.house.gov/
  `official office page` official-site crawler pass
  https://bell.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Bell.

### Bennie Thompson
- personId: `house-bennie-thompson-mississippi-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Bennie Thompson official House site
  https://benniethompson.house.gov/
  `official office page` official-site crawler pass
  https://benniethompson.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Thompson.

### Michael Guest
- personId: `house-michael-guest-mississippi-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Michael Guest official House site
  https://guest.house.gov/
  `official office page` official-site crawler pass
  https://guest.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Guest.

### Mike Ezell
- personId: `house-mike-ezell-mississippi-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mike Ezell official House site
  https://ezell.house.gov/
  `official office page` official-site crawler pass
  https://ezell.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Ezell.

### Trent Kelly
- personId: `house-trent-kelly-mississippi-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Trent Kelly official House site
  https://trentkelly.house.gov/
  `official office page` official-site crawler pass
  https://trentkelly.house.gov/
  `official office page` Trent Kelly cosponsored bills page
  https://trentkelly.house.gov/legislation/cosponsoredbills.htm
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Kelly. One crawled page surfaced `gain-of-function`, but only inside an auto-generated cosponsored bill title rather than attributable Kelly language, so it was not counted as a verified hit.

### Tom Barrett
- personId: `house-tom-barrett-michigan-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Tom Barrett official House site
  https://barrett.house.gov/
  `official office page` official-site crawler pass
  https://barrett.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Barrett.

### John James
- personId: `house-john-james-michigan-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` John James official House site
  https://james.house.gov/
  `official office page` official-site crawler pass
  https://james.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for James.

### John Moolenaar
- personId: `house-john-moolenaar-michigan-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` John Moolenaar official House site
  https://moolenaar.house.gov/
  `official office page` official-site crawler pass
  https://moolenaar.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Moolenaar.

### Kristen McDonald Rivet
- personId: `house-kristen-mcdonald-rivet-michigan-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Kristen McDonald Rivet official House site
  https://mcdonaldrivet.house.gov/
  `official office page` official-site crawler pass
  https://mcdonaldrivet.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for McDonald Rivet.

### Lisa McClain
- personId: `house-lisa-mcclain-michigan-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Lisa McClain official House site
  https://mcclain.house.gov
  `official office page` official-site crawler pass
  https://mcclain.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for McClain.

### Rashida Tlaib
- personId: `house-rashida-tlaib-michigan-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Rashida Tlaib official House site
  https://tlaib.house.gov/
  `official office page` official-site crawler pass
  https://tlaib.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Tlaib.

### Shri Thanedar
- personId: `house-shri-thanedar-michigan-13th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Shri Thanedar official House site
  https://thanedar.house.gov
  `official office page` official-site crawler pass
  https://thanedar.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Thanedar.

### Tim Walberg
- personId: `house-tim-walberg-michigan-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Tim Walberg official House site
  https://walberg.house.gov/
  `official office page` official-site crawler pass
  https://walberg.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Walberg.

### Ayanna Pressley
- personId: `house-ayanna-pressley-massachusetts-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Ayanna Pressley official House site
  https://pressley.house.gov/
  `official office page` official-site multi-source pass
  https://pressley.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Pressley.

### James McGovern
- personId: `house-james-mcgovern-massachusetts-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` James McGovern official House site
  https://mcgovern.house.gov/
  `official office page` official-site multi-source pass
  https://mcgovern.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for McGovern.

### Katherine Clark
- personId: `house-katherine-clark-massachusetts-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Katherine Clark official House site
  https://katherineclark.house.gov/index.cfm/home
  `official office page` official-site multi-source pass
  https://katherineclark.house.gov/index.cfm/home
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Clark.

### Lori Trahan
- personId: `house-lori-trahan-massachusetts-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Lori Trahan official House site
  https://trahan.house.gov/
  `official office page` official-site multi-source pass
  https://trahan.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Trahan.

### Richard Neal
- personId: `house-richard-neal-massachusetts-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Richard Neal official House site
  https://neal.house.gov/
  `official office page` official-site multi-source pass
  https://neal.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Neal.

### Seth Moulton
- personId: `house-seth-moulton-massachusetts-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Seth Moulton official House site
  https://moulton.house.gov/
  `official office page` official-site multi-source pass
  https://moulton.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Moulton.

### William Keating
- personId: `house-william-keating-massachusetts-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` William Keating official House site
  https://keating.house.gov/
  `official office page` official-site multi-source pass
  https://keating.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Keating.

### Andy Harris
- personId: `house-andy-harris-maryland-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Andy Harris official House site
  https://harris.house.gov/
  `official office page` official-site multi-source pass
  https://harris.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Harris.

### Glenn Ivey
- personId: `house-glenn-ivey-maryland-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Glenn Ivey official House site
  https://ivey.house.gov/
  `official office page` official-site multi-source pass
  https://ivey.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Ivey.

### Jamie Raskin
- personId: `house-jamie-raskin-maryland-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jamie Raskin official House site
  https://raskin.house.gov/
  `official office page` official-site multi-source pass
  https://raskin.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Raskin.

### Johnny Olszewski
- personId: `house-johnny-olszewski-maryland-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Johnny Olszewski official House site
  https://olszewski.house.gov/
  `official office page` official-site multi-source pass
  https://olszewski.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Olszewski.

### Kweisi Mfume
- personId: `house-kweisi-mfume-maryland-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Kweisi Mfume official House site
  https://mfume.house.gov/
  `official office page` official-site multi-source pass
  https://mfume.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Mfume.

### Sarah Elfreth
- personId: `house-sarah-elfreth-maryland-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Sarah Elfreth official House site
  https://elfreth.house.gov/
  `official office page` official-site multi-source pass
  https://elfreth.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Elfreth.

### Chellie Pingree
- personId: `house-chellie-pingree-maine-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Chellie Pingree official House site
  https://pingree.house.gov/
  `official office page` official-site multi-source pass
  https://pingree.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Pingree.

### Jared Golden
- personId: `house-jared-golden-maine-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jared Golden official House site
  https://golden.house.gov
  `official office page` official-site multi-source pass
  https://golden.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Golden.

### Clay Higgins
- personId: `house-clay-higgins-louisiana-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Clay Higgins official House site
  https://clayhiggins.house.gov
  `official office page` official-site multi-source pass
  https://clayhiggins.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Higgins.

### Cleo Fields
- personId: `house-cleo-fields-louisiana-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Cleo Fields official House site
  https://fields.house.gov/
  `official office page` official-site multi-source pass
  https://fields.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Fields.

### Julia Letlow
- personId: `house-julia-letlow-louisiana-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Julia Letlow official House site
  https://letlow.house.gov
  `official office page` official-site multi-source pass
  https://letlow.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Letlow.

### Steve Scalise
- personId: `house-steve-scalise-louisiana-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Steve Scalise official House site
  https://scalise.house.gov/
  `official office page` official-site multi-source pass
  https://scalise.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Scalise.

### Troy Carter
- personId: `house-troy-carter-louisiana-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Troy Carter official House site
  https://troycarter.house.gov
  `official office page` official-site multi-source pass
  https://troycarter.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Carter.

### Brett Guthrie
- personId: `house-brett-guthrie-kentucky-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Brett Guthrie official House site
  https://guthrie.house.gov/
  `official office page` official-site multi-source pass
  https://guthrie.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Guthrie.

### Harold Rogers
- personId: `house-harold-rogers-kentucky-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Harold Rogers official House site
  https://halrogers.house.gov/
  `official office page` official-site multi-source pass
  https://halrogers.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Rogers.

### Morgan McGarvey
- personId: `house-morgan-mcgarvey-kentucky-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Morgan McGarvey official House site
  https://mcgarvey.house.gov
  `official office page` official-site multi-source pass
  https://mcgarvey.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for McGarvey.

### Thomas Massie
- personId: `house-thomas-massie-kentucky-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Thomas Massie official House site
  https://massie.house.gov
  `official office page` official-site multi-source pass
  https://massie.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Massie.

### Derek Schmidt
- personId: `house-derek-schmidt-kansas-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Derek Schmidt official House site
  https://schmidt.house.gov/
  `official office page` official-site multi-source pass
  https://schmidt.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Schmidt.

### Ron Estes
- personId: `house-ron-estes-kansas-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Ron Estes official House site
  https://estes.house.gov/
  `official office page` official-site multi-source pass
  https://estes.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Estes.

### Sharice Davids
- personId: `house-sharice-davids-kansas-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Sharice Davids official House site
  https://davids.house.gov/
  `official office page` official-site multi-source pass
  https://davids.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Davids.

### Tracey Mann
- personId: `house-tracey-mann-kansas-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Tracey Mann official House site
  https://mann.house.gov
  `official office page` official-site multi-source pass
  https://mann.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Mann.

### Ashley Hinson
- personId: `house-ashley-hinson-iowa-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Ashley Hinson official House site
  https://hinson.house.gov
  `official office page` official-site multi-source pass
  https://hinson.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Hinson.

### Mariannette Miller-Meeks
- personId: `house-mariannette-miller-meeks-iowa-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mariannette Miller-Meeks official House site
  https://millermeeks.house.gov/
  `official office page` Committees and Caucuses page
  https://millermeeks.house.gov/about/committees-and-caucuses
  `official office page` official-site multi-source pass
  https://millermeeks.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Miller-Meeks. One page surfaced `biodefense`, but only as the caucus title `Biodefense Caucus` in a membership list rather than substantive attributable language.

### Randy Feenstra
- personId: `house-randy-feenstra-iowa-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Randy Feenstra official House site
  https://feenstra.house.gov
  `official office page` official-site multi-source pass
  https://feenstra.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Feenstra.

### Zachary Nunn
- personId: `house-zachary-nunn-iowa-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Zachary Nunn official House site
  https://nunn.house.gov
  `official office page` official-site multi-source pass
  https://nunn.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Nunn.

### Andre Carson
- personId: `house-andre-carson-indiana-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Andre Carson official House site
  https://carson.house.gov/
  `official office page` official-site multi-source pass
  https://carson.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Carson.

### Erin Houchin
- personId: `house-erin-houchin-indiana-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Erin Houchin official House site
  https://houchin.house.gov
  `official office page` official-site multi-source pass
  https://houchin.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Houchin.

### Frank Mrvan
- personId: `house-frank-mrvan-indiana-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Frank Mrvan official House site
  https://mrvan.house.gov
  `official office page` official-site multi-source pass
  https://mrvan.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Mrvan.

### James Baird
- personId: `house-james-baird-indiana-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` James Baird official House site
  https://baird.house.gov/
  `official office page` official-site multi-source pass
  https://baird.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Baird.

### Jefferson Shreve
- personId: `house-jefferson-shreve-indiana-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jefferson Shreve official House site
  https://shreve.house.gov/
  `official office page` official-site multi-source pass
  https://shreve.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Shreve.

### Marlin Stutzman
- personId: `house-marlin-stutzman-indiana-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Marlin Stutzman official House site
  https://stutzman.house.gov/
  `official office page` official-site multi-source pass
  https://stutzman.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Stutzman.

### Rudy Yakym
- personId: `house-rudy-yakym-indiana-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Rudy Yakym official House site
  https://yakym.house.gov
  `official office page` official-site multi-source pass
  https://yakym.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Yakym.

### Victoria Spartz
- personId: `house-victoria-spartz-indiana-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Victoria Spartz official House site
  https://spartz.house.gov
  `official office page` official-site multi-source pass
  https://spartz.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Spartz.

### Bill Foster
- personId: `house-bill-foster-illinois-11th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Bill Foster official House site
  https://foster.house.gov
  `official office page` official-site multi-source pass
  https://foster.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Foster.

### Bradley Schneider
- personId: `house-bradley-schneider-illinois-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Bradley Schneider official House site
  https://schneider.house.gov
  `official office page` official-site multi-source pass
  https://schneider.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Schneider.

### Danny Davis
- personId: `house-danny-davis-illinois-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Danny Davis official House site
  https://davis.house.gov
  `official office page` official-site multi-source pass
  https://davis.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Davis.

### Delia Ramirez
- personId: `house-delia-ramirez-illinois-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Delia Ramirez official House site
  https://ramirez.house.gov
  `official office page` official-site multi-source pass
  https://ramirez.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Ramirez.

### Eric Sorensen
- personId: `house-eric-sorensen-illinois-17th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Eric Sorensen official House site
  https://sorensen.house.gov
  `official office page` official-site multi-source pass
  https://sorensen.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Sorensen.

### Janice Schakowsky
- personId: `house-janice-schakowsky-illinois-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Janice Schakowsky official House site
  https://schakowsky.house.gov
  `official office page` official-site multi-source pass
  https://schakowsky.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Schakowsky.

### Jesus Garcia
- personId: `house-jesus-garcia-illinois-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jesus Garcia official House site
  https://chuygarcia.house.gov/
  `official office page` official-site multi-source pass
  https://chuygarcia.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Garcia.

### Jonathan Jackson
- personId: `house-jonathan-jackson-illinois-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Jonathan Jackson official House site
  https://jonathanjackson.house.gov
  `official office page` official-site multi-source pass
  https://jonathanjackson.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Jackson.

### Lauren Underwood
- personId: `house-lauren-underwood-illinois-14th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Lauren Underwood official House site
  https://underwood.house.gov/
  `official office page` official-site multi-source pass
  https://underwood.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Underwood.

### Mary Miller
- personId: `house-mary-miller-illinois-15th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mary Miller official House site
  https://marymiller.house.gov
  `official office page` official-site multi-source pass
  https://marymiller.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Miller.

### Mike Bost
- personId: `house-mike-bost-illinois-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mike Bost official House site
  https://bost.house.gov/
  `official office page` official-site multi-source pass
  https://bost.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Bost.

### Mike Quigley
- personId: `house-mike-quigley-illinois-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mike Quigley official House site
  https://quigley.house.gov/
  `official office page` official-site multi-source pass
  https://quigley.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Quigley.

### Nikki Budzinski
- personId: `house-nikki-budzinski-illinois-13th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Nikki Budzinski official House site
  https://budzinski.house.gov
  `official office page` official-site multi-source pass
  https://budzinski.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Budzinski.

### Raja Krishnamoorthi
- personId: `house-raja-krishnamoorthi-illinois-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Raja Krishnamoorthi official House site
  https://krishnamoorthi.house.gov
  `official office page` official-site multi-source pass
  https://krishnamoorthi.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Krishnamoorthi.

### Robin Kelly
- personId: `house-robin-kelly-illinois-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Robin Kelly official House site
  https://robinkelly.house.gov/
  `official office page` official-site multi-source pass
  https://robinkelly.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Kelly.

### Sean Casten
- personId: `house-sean-casten-illinois-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Sean Casten official House site
  https://casten.house.gov
  `official office page` official-site multi-source pass
  https://casten.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Casten.

### Michael Simpson
- personId: `house-michael-simpson-idaho-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Michael Simpson official House site
  https://simpson.house.gov
  `official office page` official-site multi-source pass
  https://simpson.house.gov
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Simpson.

### Russ Fulcher
- personId: `house-russ-fulcher-idaho-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Russ Fulcher official House site
  https://fulcher.house.gov/
  `official office page` official-site multi-source pass
  https://fulcher.house.gov/
- note: the deeper official-site sweep for this batch did not verify any attributable exact whole-word / whole-phrase biotech hit for Fulcher.

### Harriet Hageman
- personId: `house-harriet-hageman-wyoming-at-large`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` GovInfo hearing transcript, package CHRG-118hhrg56175
  https://www.govinfo.gov/content/pkg/CHRG-118hhrg56175/pdf/CHRG-118hhrg56175.pdf
  `official transcript / government record` GovInfo hearing transcript, package CHRG-118hhrg54869
  https://www.govinfo.gov/content/pkg/CHRG-118hhrg54869/pdf/CHRG-118hhrg54869.pdf
  `official transcript / government record` Congressional Record, House Book 2, Nov. 14, 2023
  https://www.govinfo.gov/content/pkg/CREC-2023-11-14/pdf/CREC-2023-11-14-house-bk2.pdf
  `official office page` Harriet Hageman home page
  https://hageman.house.gov/
  `official office page` Harriet Hageman press releases landing page
  https://hageman.house.gov/media/press-releases
- note: no attributable target-term hit was verified in the checked sources. One Congressional Record page contained relevant terms, but they were spoken by other members and were correctly excluded as false positives.

### Mark Pocan
- personId: `house-mark-pocan-wisconsin-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Mark Pocan official House site
  https://pocan.house.gov/
- note: the interrupted audit found no attributable exact-term hit in the checked official / official-record / C-SPAN / broader web searches completed so far.

### Carol Miller
- personId: `house-carol-miller-west-virginia-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Carol Miller official House site
  https://miller.house.gov/
  `official office page` Carol Miller press releases index
  https://miller.house.gov/media/press-releases
  `congressional/government record` GovInfo
  https://www.govinfo.gov/
  `congressional/government record` Congress.gov
  https://www.congress.gov/
- note: no verified attributable hit yet in the checked official pages and initial official-record searches, but the full archive sweep is still incomplete.

### Riley Moore
- personId: `house-riley-moore-west-virginia-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Riley Moore official House site
  https://rileymoore.house.gov/
  `official office page` Riley Moore press releases index
  https://rileymoore.house.gov/media/press-releases
  `congressional/government record` GovInfo
  https://www.govinfo.gov/
  `congressional/government record` Congress.gov
  https://www.congress.gov/
- note: no verified attributable hit yet in the checked official pages and initial official-record searches, but the full archive sweep is still incomplete.

### Pramila Jayapal
- personId: `house-pramila-jayapal-washington-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Pramila Jayapal official House site
  https://jayapal.house.gov/
  `official office page` Jan. 16, 2026 Minnesota hearing page
  https://jayapal.house.gov/2026/01/16/jayapal-omar-host-hearing-on-trumps-deadly-assault-on-minnesota/
  `official office page` Mar. 7, 2023 facial-recognition bill page
  https://jayapal.house.gov/2023/03/07/jayapal-markey-lead-colleagues-on-legislation-to-ban-government-use-of-facial-recognition-and-other-biometric-technology/
- note: the official-office sweep completed so far did not yield a verified exact attributable hit, and the loose-match candidate pages were checked directly and did not contain the target phrases.

### Marilyn Strickland
- personId: `house-marilyn-strickland-washington-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Marilyn Strickland official House site
  https://strickland.house.gov/
  `official office page` June 2, 2025 salmon research page
  https://strickland.house.gov/2025/06/02/loss-of-usgs-program-could-hamper-salmon-research-critical-for-puget-sound/
  `official office page` Apr. 7, 2021 reproductive-health rights page
  https://strickland.house.gov/2021/04/07/media-press-releases-strickland-leads-freshman-members-letter-advance-reproductive-health-rights/
- note: the official-office sweep completed so far did not yield a verified exact attributable hit, and the loose-match candidate pages were checked directly and did not contain the target phrases.

### Tony Wied
- personId: `house-tony-wied-wisconsin-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` Congress.gov, Member Day Hearing on Matters Within the Committee's Tax Jurisdiction, Jan. 22, 2025
  https://www.congress.gov/event/119th-congress/house-event/117818
  `official transcript / government record` Congress.gov, House Small Business Member Day, May 6, 2025
  https://www.congress.gov/event/119th-congress/house-event/118198
  `official transcript / government record` Congress.gov hearing text
  https://www.congress.gov/event/119th-congress/house-event/LC74523/text
  `official transcript / government record` Congress.gov hearing text
  https://www.congress.gov/event/119th-congress/house-event/118485/text
  `official transcript / government record` Congress.gov hearing text
  https://www.congress.gov/event/119th-congress/house-event/LC74230/text
  `official transcript / government record` Congress.gov hearing text
  https://www.congress.gov/event/119th-congress/house-event/LC74147/text
  `official transcript / government record` Congress.gov hearing text
  https://www.congress.gov/event/119th-congress/house-event/LC74386/text
  `official transcript / government record` Congress.gov hearing text
  https://www.congress.gov/event/119th-congress/house-event/LC74499/text
  `official office page` Tony Wied official House site
  https://wied.house.gov/
  `official office page` Press releases archive
  https://wied.house.gov/media/press-releases
  `official office page` In the news
  https://wied.house.gov/media/in-the-news
  `official office page` Letters
  https://wied.house.gov/media/letters
- note: no attributable exact-term hit was verified in the checked official-record pages or across the official-site sweep completed so far.

### Suzan DelBene
- personId: `house-suzan-delbene-washington-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official office home page
  https://delbene.house.gov/
  `official office page` official office press releases landing
  https://delbene.house.gov/news/documentquery.aspx?DocumentTypeID=27
  `official office page` official office issues page
  https://delbene.house.gov/issues
  `official office page` official office voting record
  https://delbene.house.gov/voterecord
  `official office page` official office legislation page
  https://delbene.house.gov/legislation/
- note: the checked official pages plus the 10 most recent press-release pages surfaced from the press-release landing did not yield a verified attributable use of any target phrase.

### Rick Larsen
- personId: `house-rick-larsen-washington-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official office home page
  https://larsen.house.gov/
  `official office page` official office press releases landing
  https://larsen.house.gov/news/documentquery.aspx?DocumentTypeID=27
  `official office page` official office issues page
  https://larsen.house.gov/issues/
  `official office page` official office legislation page
  https://larsen.house.gov/legislation
  `official office page` official office videos page
  https://larsen.house.gov/videos
  `congressional/government record` official government record false-positive check
  https://www.congress.gov/committee-report/117th-congress/house-report/705/1
- note: the checked official pages plus the 10 most recent press-release pages surfaced from the press-release landing did not yield a verified attributable use of any target phrase. The surfaced Congress.gov report page did not yield an attributable exact-term hit for Larsen.

### Marie Gluesenkamp Perez
- personId: `house-marie-perez-washington-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` GovInfo hearing PDF, "A Review of USDA Animal Disease Prevention and Response Efforts"
  https://www.govinfo.gov/content/pkg/CHRG-118hhrg52768/pdf/CHRG-118hhrg52768.pdf
  `official office page` official House office site
  https://gluesenkampperez.house.gov/
- note: the checked official hearing record contains `biosecurity`, but the attributable-speaker check did not support a Marie Gluesenkamp Perez hit. The current official House site also did not yield an exact whole-word / whole-phrase match from the target list.

### Michael Baumgartner
- personId: `house-michael-baumgartner-washington-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Baumgartner official House home
  https://baumgartner.house.gov/
  `official office page` media landing
  https://baumgartner.house.gov/media
  `official office page` press releases
  https://baumgartner.house.gov/media/press-releases
  `official office page` in the news
  https://baumgartner.house.gov/media/in-the-news
  `official office page` RSS feed
  https://baumgartner.house.gov/rss.xml
  `official office page` national security / China issue page
  https://baumgartner.house.gov/issues/national-securitychina
  `official office page` healthcare issue page
  https://baumgartner.house.gov/issues/healthcare
  `official office page` agriculture issue page
  https://baumgartner.house.gov/issues/agriculture
  `official office page` military issue page
  https://baumgartner.house.gov/issues/military
  `congressional/government record` GovInfo Congressional Record index page for Baumgartner
  https://www.govinfo.gov/app/details/CRI-2026/CRI-2026-BAUMGARTNER-MICHAEL-918277
  `congressional/government record` Congress.gov hearing text, "Maximum Impact: Assessing the Effectiveness of the State Department's Bureau of Counterterrorism and Charting the Path Forward"
  https://www.congress.gov/event/119th-congress/house-event/LC74687/text
  `congressional/government record` Congress.gov hearing text, "California Fires and the Consequences of Overregulation"
  https://www.congress.gov/event/119th-congress/house-event/LC74115/text
- note: the checked official-office sweep did not produce an exact whole-word / whole-phrase hit, and the checked Congress.gov texts also did not yield attributable matches for the biotech-related target terms.

### Emily Randall
- personId: `house-emily-randall-washington-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` Randall official House home
  https://randall.house.gov/
  `official office page` about
  https://randall.house.gov/about
  `official office page` our district
  https://randall.house.gov/about/our-district
  `official office page` media landing
  https://randall.house.gov/media
  `official office page` press releases
  https://randall.house.gov/media/press-releases
  `official office page` in the news
  https://randall.house.gov/media/in-the-news
  `official office page` RSS feed
  https://randall.house.gov/rss.xml
  `congressional/government record` GovInfo hearing PDF, "Examining the Growth of ..."
  https://www.govinfo.gov/content/pkg/CHRG-119hhrg58805/pdf/CHRG-119hhrg58805.pdf
  `congressional/government record` GovInfo hearing PDF, "Leveraging Technology to Strengthen ..."
  https://www.govinfo.gov/content/pkg/CHRG-119hhrg59602/pdf/CHRG-119hhrg59602.pdf
  `congressional/government record` Congress.gov hearing transcript PDF, "Shaping Tomorrow ..."
  https://www.congress.gov/119/meeting/house/118621/documents/HHRG-119-GO12-Transcript-20250917.pdf
  `congressional/government record` Congress.gov hearing transcript PDF, "Safeguarding Procurement ..."
  https://www.congress.gov/119/meeting/house/118322/documents/HHRG-119-GO24-Transcript-20250604.pdf
- note: the checked official-office pages did not produce an exact whole-word / whole-phrase hit, and the checked official transcript PDFs also did not produce attributable matches for the biotech-related target terms.

### Gwen Moore
- personId: `house-gwen-moore-wisconsin-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official home page
  https://gwenmoore.house.gov/
  `official office page` biography
  https://gwenmoore.house.gov/biography
  `official office page` news landing
  https://gwenmoore.house.gov/news
  `official office page` news document index 27
  https://gwenmoore.house.gov/news/documentquery.aspx?DocumentTypeID=27
  `official office page` news document index 1951
  https://gwenmoore.house.gov/news/documentquery.aspx?DocumentTypeID=1951
  `official office page` news document index 30
  https://gwenmoore.house.gov/news/documentquery.aspx?DocumentTypeID=30
  `congressional/government record` GovInfo
  https://www.govinfo.gov/
  `official transcript` Docs.House.gov
  https://docs.house.gov/
  `congressional/government record` Congress.gov
  https://www.congress.gov/
- note: none of the exact target terms appeared on the checked official office pages, and the targeted official-record / broader web / site-targeted video searches completed so far did not surface an attributable exact-term hit.

### James Walkinshaw
- personId: `house-james-walkinshaw-virginia-11th`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/james-walkinshaw/W000831
  `official office page` official House office site
  https://walkinshaw.house.gov/
  `official office page` official House site search endpoint
  https://walkinshaw.house.gov/search
- note: no attributable exact-match use was found in the checked official government records or on the official House site, and the official-site exact-term sweep was clean across the full target list.

### Jennifer Kiggans
- personId: `house-jennifer-kiggans-virginia-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/jennifer-kiggans/K000399
  `official office page` official House office site
  https://kiggans.house.gov/
  `official office page` official House sitemap index
  https://kiggans.house.gov/sitemap.xml
- note: no attributable exact-match use was found in the checked official government record or across the current official House-domain sitemap pages, which were clean for the full target list at the time of this pass.

### Stacey Plaskett
- personId: `house-stacey-plaskett-virgin-islands-delegate`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://plaskett.house.gov/
  `official office page` official House issues page
  https://plaskett.house.gov/issues
  `official office page` official House legislation page
  https://plaskett.house.gov/legislation
  `official office page` official House press releases index
  https://plaskett.house.gov/news/documentquery.aspx?documenttypeid=27
  `official transcript / government record` House biodefense hearing transcript PDF
  https://docs.house.gov/meetings/GO/GO06/20190626/109717/HHRG-116-GO06-Transcript-20190626.pdf
- note: the checked official House-domain sweep was clean for the full target list, and the checked biodefense hearing transcript did not yield a verified attributable Plaskett hit.

### Becca Balint
- personId: `house-becca-balint-vermont-at-large`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/becca-balint/B001318
  `official office page` official House office site
  https://balint.house.gov/
  `official office page` official House site search endpoint
  https://balint.house.gov/search
- note: no attributable exact-match use was found in the checked official government records or on the official House site, and the official-site exact-term sweep was clean across the full target list.

### Celeste Maloy
- personId: `house-celeste-maloy-utah-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` GovInfo
  https://www.govinfo.gov/
  `congressional/government record` GovInfo member index page
  https://www.govinfo.gov/app/details/CRI-2025/CRI-2025-MALOY-CELESTE-78E67
  `official office page` official House site
  https://maloy.house.gov/
  `official office page` broader official House-domain material
  https://www.house.gov/
  `direct video` C-SPAN
  https://www.c-span.org/
  `direct video` YouTube
  https://www.youtube.com/
  `media quote / secondary report` AP
  https://apnews.com/
  `media quote / secondary report` Reuters
  https://www.reuters.com/
  `media quote / secondary report` ABC News
  https://abcnews.go.com/
  `media quote / secondary report` CBS News
  https://www.cbsnews.com/
  `media quote / secondary report` Fox News
  https://www.foxnews.com/
- note: no verified attributable whole-word / whole-phrase use was found in the checked government, official-site, video, or major-news sources.

### Blake Moore
- personId: `house-blake-moore-utah-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://blakemoore.house.gov/
  `official office page` official House about page
  https://blakemoore.house.gov/about
  `official office page` official House issues page
  https://blakemoore.house.gov/issues
  `official office page` official House press releases page
  https://blakemoore.house.gov/media/press-releases
  `congressional/government record` Rules Committee false-positive check
  https://rules.house.gov/bill/117/hr-4350
- note: the checked official Blake Moore pages were clean across the target list. A surfaced Rules Committee page contained relevant terms, but they were tied to other members' amendments rather than attributable Blake Moore remarks.

### Mike Kennedy
- personId: `house-mike-kennedy-utah-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` GovInfo hearing PDF, "Fixing Emergency Management: Examining FEMA's 2025 Disaster Season and Improving Recovery Efforts"
  https://www.govinfo.gov/content/pkg/CHRG-119hhrg62144/pdf/CHRG-119hhrg62144.pdf
  `official office page` official House office site
  https://mikekennedy.house.gov/
- note: the checked official hearing transcript did not produce an exact-match hit from the target list, and the official House site was also clean in this pass.

### Burgess Owens
- personId: `house-burgess-owens-utah-4th`
- classification: `checked no-hit so far`
- sources checked:
  `congressional/government record` GovInfo Congressional Record page containing Owens floor remarks
  https://www.govinfo.gov/link/crec/169/h/5315
  `official office page` official House office site
  https://owens.house.gov/
- note: the checked Congressional Record segment with attributable Owens remarks did not produce an exact-match hit from the target list, and the official House site was also clean in this pass.

### Tim Burchett
- personId: `house-tim-burchett-tennessee-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` House hearing transcript, June 10, 2025
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
  `official office page` official House office site
  https://burchett.house.gov/
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/T000481
- note: Burchett's attributable questioning in the checked June 10, 2025 hearing did not produce an exact match from the target list, and the checked official House pages were also clean in this pass.

### Pete Sessions
- personId: `house-pete-sessions-texas-17th`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` House hearing transcript, June 10, 2025
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
  `official office page` official House office site
  https://sessions.house.gov/
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/S001194
- note: Sessions' attributable questioning in the checked June 10, 2025 hearing did not produce an exact match from the target list, and the checked official House pages were also clean in this pass.

### Jasmine Crockett
- personId: `house-jasmine-crockett-texas-30th`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` House hearing transcript, June 10, 2025
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
  `official office page` official House office site
  https://crockett.house.gov/
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/C001131
- note: Crockett's attributable questioning in the checked June 10, 2025 hearing did not produce an exact match from the target list, and the checked official House pages were also clean in this pass.

### Brandon Gill
- personId: `house-brandon-gill-texas-26th`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` House hearing transcript, June 10, 2025
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
  `official office page` official House office site
  https://gill.house.gov/
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/G000597
- note: Gill's attributable questioning in the checked June 10, 2025 hearing did not produce an exact match from the target list, and the checked official House pages were also clean in this pass.

### Dusty Johnson
- personId: `house-dusty-johnson-south-dakota-at-large`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://dustyjohnson.house.gov/
  `congressional/government record` Congress.gov member page
  https://www.congress.gov/member/J000302
- note: the checked official House site and Congress.gov member page were clean for the target list in this initial third-tranche pass, but broader record work for Johnson is still open.

### Al Green
- personId: `house-al-green-texas-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://algreen.house.gov/
  `official office page` official House about page
  https://algreen.house.gov/about
  `official office page` official House media page
  https://algreen.house.gov/media
  `official office page` official House issues page
  https://algreen.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Green is still open.

### August Pfluger
- personId: `house-august-pfluger-texas-11th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://pfluger.house.gov/
  `official office page` official House about page
  https://pfluger.house.gov/about
  `official office page` official House issues page
  https://pfluger.house.gov/issues
  `official office page` official House news page
  https://pfluger.house.gov/news
  `official office page` official House press releases page
  https://pfluger.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Pfluger is still open.

### Beth Van Duyne
- personId: `house-beth-van-duyne-texas-24th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://vanduyne.house.gov/
  `official office page` official House about page
  https://vanduyne.house.gov/about
  `official office page` official House media page
  https://vanduyne.house.gov/media
  `official office page` official House issues page
  https://vanduyne.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Van Duyne is still open.

### Brian Babin
- personId: `house-brian-babin-texas-36th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://babin.house.gov/
  `official office page` official House issues page
  https://babin.house.gov/issues
  `official office page` official House news page
  https://babin.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Babin is still open.

### Christian Menefee
- personId: `house-christian-menefee-texas-18th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  http://menefee.house.gov/
  `official office page` official House about page
  http://menefee.house.gov/about
  `official office page` official House media page
  http://menefee.house.gov/media
  `official office page` official House issues page
  http://menefee.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Menefee is still open.

### Craig Goldman
- personId: `house-craig-goldman-texas-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://craiggoldman.house.gov/
  `official office page` official House about page
  https://craiggoldman.house.gov/about
  `official office page` official House media page
  https://craiggoldman.house.gov/media
  `official office page` official House issues page
  https://craiggoldman.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Goldman is still open.

### Greg Casar
- personId: `house-greg-casar-texas-35th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://casar.house.gov/
  `official office page` official House about page
  https://casar.house.gov/about
  `official office page` official House media page
  https://casar.house.gov/media
  `official office page` official House issues page
  https://casar.house.gov/issues
  `official office page` official House press releases page
  https://casar.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Casar is still open.

### Henry Cuellar
- personId: `house-henry-cuellar-texas-28th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://cuellar.house.gov/
  `official office page` official House issues page
  https://cuellar.house.gov/issues
  `official office page` official House news page
  https://cuellar.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Cuellar is still open.

### Jake Ellzey
- personId: `house-jake-ellzey-texas-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://ellzey.house.gov/
  `official office page` official House about page
  https://ellzey.house.gov/about
  `official office page` official House media page
  https://ellzey.house.gov/media
  `official office page` official House issues page
  https://ellzey.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Ellzey is still open.

### Joaquin Castro
- personId: `house-joaquin-castro-texas-20th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://castro.house.gov/
  `official office page` official House about page
  https://castro.house.gov/about
  `official office page` official House media / issues / news paths returned retired-page responses without target-term hits
  https://castro.house.gov/media
  https://castro.house.gov/issues
  https://castro.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Castro is still open.

### Jodey Arrington
- personId: `house-jodey-arrington-texas-19th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://arrington.house.gov/
  `official office page` official House issues page
  https://arrington.house.gov/issues
  `official office page` official House news page
  https://arrington.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Arrington is still open.

### John Carter
- personId: `house-john-carter-texas-31st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://carter.house.gov/
  `official office page` official House about page
  https://carter.house.gov/about
  `official office page` official House issues page
  https://carter.house.gov/issues
  `official office page` official House news page
  https://carter.house.gov/news
  `official office page` official House press releases page
  https://carter.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Carter is still open.

### Julie Johnson
- personId: `house-julie-johnson-texas-32nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://juliejohnson.house.gov/
  `official office page` official House about page
  https://juliejohnson.house.gov/about
  `official office page` official House media page
  https://juliejohnson.house.gov/media
  `official office page` official House issues page
  https://juliejohnson.house.gov/issues
  `official office page` official House press releases page
  https://juliejohnson.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Johnson is still open.

### Keith Self
- personId: `house-keith-self-texas-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://keithself.house.gov/
  `official office page` official House about page
  https://keithself.house.gov/about
  `official office page` official House media page
  https://keithself.house.gov/media
  `official office page` official House issues page
  https://keithself.house.gov/issues
  `official office page` official House press releases page
  https://keithself.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this initial Texas pass, but broader record work for Self is still open.

### Lizzie Fletcher
- personId: `house-lizzie-fletcher-texas-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://fletcher.house.gov/
  `official office page` official House about page
  https://fletcher.house.gov/about
  `official office page` official House issues page
  https://fletcher.house.gov/issues
  `official office page` official House news page
  https://fletcher.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Fletcher is still open.

### Lloyd Doggett
- personId: `house-lloyd-doggett-texas-37th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://doggett.house.gov/
  `official office page` official House about page
  https://doggett.house.gov/about
  `official office page` official House media page
  https://doggett.house.gov/media
  `official office page` official House issues page
  https://doggett.house.gov/issues
  `official office page` official House press releases page
  https://doggett.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Doggett is still open.

### Marc Veasey
- personId: `house-marc-veasey-texas-33rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://veasey.house.gov/
  `official office page` official House about page
  https://veasey.house.gov/about
  `official office page` official House issues page
  https://veasey.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Veasey is still open.

### Michael Cloud
- personId: `house-michael-cloud-texas-27th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://cloud.house.gov/
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Cloud is still open.

### Monica De La Cruz
- personId: `house-monica-de-la-cruz-texas-15th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://delacruz.house.gov/
  `official office page` official House about page
  https://delacruz.house.gov/about
  `official office page` official House issues page
  https://delacruz.house.gov/issues
  `official office page` official House news page
  https://delacruz.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for De La Cruz is still open.

### Morgan Luttrell
- personId: `house-morgan-luttrell-texas-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://luttrell.house.gov/
  `official office page` official House about page
  https://luttrell.house.gov/about
  `official office page` official House media page
  https://luttrell.house.gov/media
  `official office page` official House issues page
  https://luttrell.house.gov/issues
  `official office page` official House press releases page
  https://luttrell.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Luttrell is still open.

### Nathaniel Moran
- personId: `house-nathaniel-moran-texas-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://moran.house.gov/
  `official office page` official House about page
  https://moran.house.gov/about
  `official office page` official House issues page
  https://moran.house.gov/issues
  `official office page` official House news page
  https://moran.house.gov/news
  `official office page` official House press releases page
  https://moran.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Moran is still open.

### Pat Fallon
- personId: `house-pat-fallon-texas-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://fallon.house.gov/
  `official office page` official House about page
  https://fallon.house.gov/about
  `official office page` official House issues page
  https://fallon.house.gov/issues
  `official office page` official House news page
  https://fallon.house.gov/news
  `official office page` official House press releases page
  https://fallon.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this Texas pass, but broader record work for Fallon is still open.

### Randy Weber
- personId: `house-randy-weber-texas-14th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://weber.house.gov/
  `official office page` official House issues page
  https://weber.house.gov/issues
  `official office page` official House news page
  https://weber.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this Texas pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Roger Williams
- personId: `house-roger-williams-texas-25th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://williams.house.gov/
  `official office page` official House about page
  https://williams.house.gov/about
  `official office page` official House issues page
  https://williams.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this Texas pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Tony Gonzales
- personId: `house-tony-gonzales-texas-23rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://gonzales.house.gov/
  `official office page` official House about page
  https://gonzales.house.gov/about
  `official office page` official House media page
  https://gonzales.house.gov/media
  `official office page` official House issues page
  https://gonzales.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this Texas pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Veronica Escobar
- personId: `house-veronica-escobar-texas-16th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://escobar.house.gov/
  `official office page` official House about page
  https://escobar.house.gov/about
  `official office page` official House media page
  https://escobar.house.gov/media
  `official office page` official House issues page
  https://escobar.house.gov/issues
  `official office page` official House news page
  https://escobar.house.gov/news
  `official office page` official House press releases page
  https://escobar.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this Texas pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Vicente Gonzalez
- personId: `house-vicente-gonzalez-texas-34th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://gonzalez.house.gov/
  `official office page` official House about page
  https://gonzalez.house.gov/about
  `official office page` official House media page
  https://gonzalez.house.gov/media
  `official office page` official House issues page
  https://gonzalez.house.gov/issues
  `official office page` official House press releases page
  https://gonzalez.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this Texas pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Wesley Hunt
- personId: `house-wesley-hunt-texas-38th`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript / government record` House hearing transcript, Aug. 8, 2023
  https://docs.house.gov/meetings/GO/GO06/20230808/116299/HHRG-118-GO06-Transcript-20230808.pdf
  `official office page` official House office site
  https://hunt.house.gov/
  `official office page` official House about page
  https://hunt.house.gov/about
  `official office page` official House media page
  https://hunt.house.gov/media
  `official office page` official House issues page
  https://hunt.house.gov/issues
  `official office page` official House press releases page
  https://hunt.house.gov/media/press-releases
- note: the checked official hearing transcript and House-domain pages were clean for the target list in this pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Andrew Ogles
- personId: `house-andrew-ogles-tennessee-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://ogles.house.gov/
  `official office page` official House about page
  https://ogles.house.gov/about
  `official office page` official House media page
  https://ogles.house.gov/media
  `official office page` official House issues page
  https://ogles.house.gov/issues
  `official office page` official House press releases page
  https://ogles.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Charles Fleischmann
- personId: `house-charles-fleischmann-tennessee-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://fleischmann.house.gov/
  `official office page` official House about page
  https://fleischmann.house.gov/about
  `official office page` official House media page
  https://fleischmann.house.gov/media
  `official office page` official House issues page
  https://fleischmann.house.gov/issues
  `official office page` official House press releases page
  https://fleischmann.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### David Kustoff
- personId: `house-david-kustoff-tennessee-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://kustoff.house.gov/
  `official office page` official House about page
  https://kustoff.house.gov/about
  `official office page` official House media page
  https://kustoff.house.gov/media
  `official office page` official House issues page
  https://kustoff.house.gov/issues
  `official office page` official House press releases page
  https://kustoff.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Diana Harshbarger
- personId: `house-diana-harshbarger-tennessee-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://harshbarger.house.gov/
  `official office page` official House about page
  https://harshbarger.house.gov/about
  `official office page` official House media page
  https://harshbarger.house.gov/media
  `official office page` official House issues page
  https://harshbarger.house.gov/issues
  `official office page` official House press releases page
  https://harshbarger.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### John Rose
- personId: `house-john-rose-tennessee-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://johnrose.house.gov/
  `official office page` official House about page
  https://johnrose.house.gov/about
  `official office page` official House media page
  https://johnrose.house.gov/media
  `official office page` official House issues page
  https://johnrose.house.gov/issues
  `official office page` official House press releases page
  https://johnrose.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Matt Van Epps
- personId: `house-matt-van-epps-tennessee-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://vanepps.house.gov/
  `official office page` official House about page
  https://vanepps.house.gov/about
  `official office page` official House media page
  https://vanepps.house.gov/media
  `official office page` official House issues page
  https://vanepps.house.gov/issues
  `official office page` official House press releases page
  https://vanepps.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Scott DesJarlais
- personId: `house-scott-desjarlais-tennessee-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://desjarlais.house.gov/
  `official office page` official House issues page
  https://desjarlais.house.gov/issues
  `official office page` official House news page
  https://desjarlais.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Steve Cohen
- personId: `house-steve-cohen-tennessee-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://cohen.house.gov/
  `official office page` official House about page
  https://cohen.house.gov/about
  `official office page` official House issues page
  https://cohen.house.gov/issues
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### James Clyburn
- personId: `house-james-clyburn-south-carolina-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://clyburn.house.gov/
  `official office page` official House media page
  https://clyburn.house.gov/media
  `official office page` official House news page
  https://clyburn.house.gov/news
  `official office page` official House press releases page
  https://clyburn.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Joe Wilson
- personId: `house-joe-wilson-south-carolina-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://joewilson.house.gov/
  `official office page` official House about page
  https://joewilson.house.gov/about
  `official office page` official House media page
  https://joewilson.house.gov/media
  `official office page` official House issues page
  https://joewilson.house.gov/issues
  `official office page` official House press releases page
  https://joewilson.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Ralph Norman
- personId: `house-ralph-norman-south-carolina-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://norman.house.gov/
  `official office page` official House media page
  https://norman.house.gov/media
  `official office page` official House issues page
  https://norman.house.gov/issues
  `official office page` official House news page
  https://norman.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Sheri Biggs
- personId: `house-sheri-biggs-south-carolina-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://biggs.house.gov/
  `official office page` official House about page
  https://biggs.house.gov/about
  `official office page` official House media page
  https://biggs.house.gov/media
  `official office page` official House issues page
  https://biggs.house.gov/issues
  `official office page` official House press releases page
  https://biggs.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and broader official / government scouting did not surface an exact-match candidate page yet.

### Sylvia Garcia
- personId: `house-sylvia-garcia-texas-29th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://sylviagarcia.house.gov/
  `official office page` official House about page
  https://sylviagarcia.house.gov/about
  `official office page` official House media page
  https://sylviagarcia.house.gov/media
  `official office page` official House issues page
  https://sylviagarcia.house.gov/issues
  `official office page` official House press releases page
  https://sylviagarcia.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Russell Fry
- personId: `house-russell-fry-south-carolina-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://fry.house.gov/
  `official office page` official House about page
  https://fry.house.gov/about
  `official office page` official House issues page
  https://fry.house.gov/issues
  `official office page` official House news page
  https://fry.house.gov/news
- note: the checked official House-domain pages were clean for the target list in this pass, and no better exact-match candidate surfaced yet in follow-up scouting.

### Gabe Amo
- personId: `house-gabe-amo-rhode-island-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://amo.house.gov/
  `official office page` official House about page
  https://amo.house.gov/about
  `official office page` official House media page
  https://amo.house.gov/media
  `official office page` official House issues page
  https://amo.house.gov/issues
  `official office page` official House news page
  https://amo.house.gov/news
  `official office page` official House press releases page
  https://amo.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Cliff Bentz
- personId: `house-cliff-bentz-oregon-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://bentz.house.gov/
  `official office page` official House about page
  https://bentz.house.gov/about
  `official office page` official House media page
  https://bentz.house.gov/media
  `official office page` official House issues page
  https://bentz.house.gov/issues
  `official office page` official House news page
  https://bentz.house.gov/news
  `official office page` official House press releases page
  https://bentz.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Stephanie Bice
- personId: `house-stephanie-bice-oklahoma-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://bice.house.gov/
  `official office page` official House about page
  https://bice.house.gov/about
  `official office page` official House media page
  https://bice.house.gov/media
  `official office page` official House issues page
  https://bice.house.gov/issues
  `official office page` official House news page
  https://bice.house.gov/news
  `official office page` official House press releases page
  https://bice.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Suzanne Bonamici
- personId: `house-suzanne-bonamici-oregon-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://bonamici.house.gov/
  `official office page` official House about page
  https://bonamici.house.gov/about
  `official office page` official House media page
  https://bonamici.house.gov/media
  `official office page` official House issues page
  https://bonamici.house.gov/issues
  `official office page` official House news page
  https://bonamici.house.gov/news
  `official office page` official House press releases page
  https://bonamici.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Brendan Boyle
- personId: `house-brendan-boyle-pennsylvania-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://boyle.house.gov/
  `official office page` official House about page
  https://boyle.house.gov/about
  `official office page` official House media page
  https://boyle.house.gov/media
  `official office page` official House issues page
  https://boyle.house.gov/issues
  `official office page` official House news page
  https://boyle.house.gov/news
  `official office page` official House press releases page
  https://boyle.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Josh Brecheen
- personId: `house-josh-brecheen-oklahoma-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://brecheen.house.gov/
  `official office page` official House about page
  https://brecheen.house.gov/about
  `official office page` official House media page
  https://brecheen.house.gov/media
  `official office page` official House issues page
  https://brecheen.house.gov/issues
  `official office page` official House news page
  https://brecheen.house.gov/news
  `official office page` official House press releases page
  https://brecheen.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Robert Bresnahan
- personId: `house-robert-bresnahan-pennsylvania-8th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://bresnahan.house.gov/
  `official office page` official House about page
  https://bresnahan.house.gov/about
  `official office page` official House media page
  https://bresnahan.house.gov/media
  `official office page` official House issues page
  https://bresnahan.house.gov/issues
  `official office page` official House news page
  https://bresnahan.house.gov/news
  `official office page` official House press releases page
  https://bresnahan.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Janelle Bynum
- personId: `house-janelle-bynum-oregon-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://bynum.house.gov/
  `official office page` official House about page
  https://bynum.house.gov/about
  `official office page` official House media page
  https://bynum.house.gov/media
  `official office page` official House issues page
  https://bynum.house.gov/issues
  `official office page` official House news page
  https://bynum.house.gov/news
  `official office page` official House press releases page
  https://bynum.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Tom Cole
- personId: `house-tom-cole-oklahoma-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://cole.house.gov/
  `official office page` official House about page
  https://cole.house.gov/about
  `official office page` official House media page
  https://cole.house.gov/media
  `official office page` official House issues page
  https://cole.house.gov/issues
  `official office page` official House news page
  https://cole.house.gov/news
  `official office page` official House press releases page
  https://cole.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Madeleine Dean
- personId: `house-madeleine-dean-pennsylvania-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://dean.house.gov/
  `official office page` official House about page
  https://dean.house.gov/about
  `official office page` official House media page
  https://dean.house.gov/media
  `official office page` official House issues page
  https://dean.house.gov/issues
  `official office page` official House news page
  https://dean.house.gov/news
  `official office page` official House press releases page
  https://dean.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Christopher Deluzio
- personId: `house-christopher-deluzio-pennsylvania-17th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://deluzio.house.gov/
  `official office page` official House about page
  https://deluzio.house.gov/about
  `official office page` official House media page
  https://deluzio.house.gov/media
  `official office page` official House issues page
  https://deluzio.house.gov/issues
  `official office page` official House news page
  https://deluzio.house.gov/news
  `official office page` official House press releases page
  https://deluzio.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Maxine Dexter
- personId: `house-maxine-dexter-oregon-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://dexter.house.gov/
  `official office page` official House about page
  https://dexter.house.gov/about
  `official office page` official House media page
  https://dexter.house.gov/media
  `official office page` official House issues page
  https://dexter.house.gov/issues
  `official office page` official House news page
  https://dexter.house.gov/news
  `official office page` official House press releases page
  https://dexter.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Dwight Evans
- personId: `house-dwight-evans-pennsylvania-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://evans.house.gov/
  `official office page` official House about page
  https://evans.house.gov/about
  `official office page` official House media page
  https://evans.house.gov/media
  `official office page` official House issues page
  https://evans.house.gov/issues
  `official office page` official House news page
  https://evans.house.gov/news
  `official office page` official House press releases page
  https://evans.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Brian Fitzpatrick
- personId: `house-brian-fitzpatrick-pennsylvania-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://fitzpatrick.house.gov/
  `official office page` official House about page
  https://fitzpatrick.house.gov/about
  `official office page` official House media page
  https://fitzpatrick.house.gov/media
  `official office page` official House issues page
  https://fitzpatrick.house.gov/issues
  `official office page` official House news page
  https://fitzpatrick.house.gov/news
  `official office page` official House press releases page
  https://fitzpatrick.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Kevin Hern
- personId: `house-kevin-hern-oklahoma-1st`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://hern.house.gov/
  `official office page` official House about page
  https://hern.house.gov/about
  `official office page` official House media page
  https://hern.house.gov/media
  `official office page` official House issues page
  https://hern.house.gov/issues
  `official office page` official House news page
  https://hern.house.gov/news
  `official office page` official House press releases page
  https://hern.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Val Hoyle
- personId: `house-val-hoyle-oregon-4th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://hoyle.house.gov/
  `official office page` official House about page
  https://hoyle.house.gov/about
  `official office page` official House media page
  https://hoyle.house.gov/media
  `official office page` official House issues page
  https://hoyle.house.gov/issues
  `official office page` official House news page
  https://hoyle.house.gov/news
  `official office page` official House press releases page
  https://hoyle.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### John Joyce
- personId: `house-john-joyce-pennsylvania-13th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://johnjoyce.house.gov/
  `official office page` official House about page
  https://johnjoyce.house.gov/about
  `official office page` official House media page
  https://johnjoyce.house.gov/media
  `official office page` official House issues page
  https://johnjoyce.house.gov/issues
  `official office page` official House news page
  https://johnjoyce.house.gov/news
  `official office page` official House press releases page
  https://johnjoyce.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Mike Kelly
- personId: `house-mike-kelly-pennsylvania-16th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://kelly.house.gov/
  `official office page` official House about page
  https://kelly.house.gov/about
  `official office page` official House media page
  https://kelly.house.gov/media
  `official office page` official House issues page
  https://kelly.house.gov/issues
  `official office page` official House news page
  https://kelly.house.gov/news
  `official office page` official House press releases page
  https://kelly.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Summer Lee
- personId: `house-summer-lee-pennsylvania-12th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://summerlee.house.gov/
  `official office page` official House about page
  https://summerlee.house.gov/about
  `official office page` official House media page
  https://summerlee.house.gov/media
  `official office page` official House issues page
  https://summerlee.house.gov/issues
  `official office page` official House news page
  https://summerlee.house.gov/news
  `official office page` official House press releases page
  https://summerlee.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Frank Lucas
- personId: `house-frank-lucas-oklahoma-3rd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://lucas.house.gov/
  `official office page` official House about page
  https://lucas.house.gov/about
  `official office page` official House media page
  https://lucas.house.gov/media
  `official office page` official House issues page
  https://lucas.house.gov/issues
  `official office page` official House news page
  https://lucas.house.gov/news
  `official office page` official House press releases page
  https://lucas.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Ryan Mackenzie
- personId: `house-ryan-mackenzie-pennsylvania-7th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://mackenzie.house.gov/
  `official office page` official House about page
  https://mackenzie.house.gov/about
  `official office page` official House media page
  https://mackenzie.house.gov/media
  `official office page` official House issues page
  https://mackenzie.house.gov/issues
  `official office page` official House news page
  https://mackenzie.house.gov/news
  `official office page` official House press releases page
  https://mackenzie.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Seth Magaziner
- personId: `house-seth-magaziner-rhode-island-2nd`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://magaziner.house.gov/
  `official office page` official House about page
  https://magaziner.house.gov/about
  `official office page` official House media page
  https://magaziner.house.gov/media
  `official office page` official House issues page
  https://magaziner.house.gov/issues
  `official office page` official House news page
  https://magaziner.house.gov/news
  `official office page` official House press releases page
  https://magaziner.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Daniel Meuser
- personId: `house-daniel-meuser-pennsylvania-9th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://meuser.house.gov/
  `official office page` official House about page
  https://meuser.house.gov/about
  `official office page` official House media page
  https://meuser.house.gov/media
  `official office page` official House issues page
  https://meuser.house.gov/issues
  `official office page` official House news page
  https://meuser.house.gov/news
  `official office page` official House press releases page
  https://meuser.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Scott Perry
- personId: `house-scott-perry-pennsylvania-10th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://perry.house.gov/
  `official office page` official House about page
  https://perry.house.gov/about
  `official office page` official House media page
  https://perry.house.gov/media
  `official office page` official House issues page
  https://perry.house.gov/issues
  `official office page` official House news page
  https://perry.house.gov/news
  `official office page` official House press releases page
  https://perry.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Guy Reschenthaler
- personId: `house-guy-reschenthaler-pennsylvania-14th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://reschenthaler.house.gov/
  `official office page` official House about page
  https://reschenthaler.house.gov/about
  `official office page` official House media page
  https://reschenthaler.house.gov/media
  `official office page` official House issues page
  https://reschenthaler.house.gov/issues
  `official office page` official House news page
  https://reschenthaler.house.gov/news
  `official office page` official House press releases page
  https://reschenthaler.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Andrea Salinas
- personId: `house-andrea-salinas-oregon-6th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://salinas.house.gov/
  `official office page` official House about page
  https://salinas.house.gov/about
  `official office page` official House media page
  https://salinas.house.gov/media
  `official office page` official House issues page
  https://salinas.house.gov/issues
  `official office page` official House news page
  https://salinas.house.gov/news
  `official office page` official House press releases page
  https://salinas.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Mary Gay Scanlon
- personId: `house-mary-gay-scanlon-pennsylvania-5th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://scanlon.house.gov/
  `official office page` official House about page
  https://scanlon.house.gov/about
  `official office page` official House media page
  https://scanlon.house.gov/media
  `official office page` official House issues page
  https://scanlon.house.gov/issues
  `official office page` official House news page
  https://scanlon.house.gov/news
  `official office page` official House press releases page
  https://scanlon.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Lloyd Smucker
- personId: `house-lloyd-smucker-pennsylvania-11th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://smucker.house.gov/
  `official office page` official House about page
  https://smucker.house.gov/about
  `official office page` official House media page
  https://smucker.house.gov/media
  `official office page` official House issues page
  https://smucker.house.gov/issues
  `official office page` official House news page
  https://smucker.house.gov/news
  `official office page` official House press releases page
  https://smucker.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Glenn Thompson
- personId: `house-glenn-thompson-pennsylvania-15th`
- classification: `checked no-hit so far`
- sources checked:
  `official office page` official House office site
  https://thompson.house.gov/
  `official office page` official House about page
  https://thompson.house.gov/about
  `official office page` official House media page
  https://thompson.house.gov/media
  `official office page` official House issues page
  https://thompson.house.gov/issues
  `official office page` official House news page
  https://thompson.house.gov/news
  `official office page` official House press releases page
  https://thompson.house.gov/media/press-releases
- note: the checked official House-domain pages were clean for the target list in this fourth-tranche official-page pass; broader transcript / government-record work remains open.

### Christopher Smith
- personId: `house-christopher-smith-new-jersey-4th`
- classification: `direct self-use`
- source bundle:
  `official office PDF` Smith office-hosted speech PDF
  https://chrissmith.house.gov/uploadedfiles/2019-07-11_final_ndaa_lyme_ig_amendment_speech.pdf
- notable exact matches across bundle: `bioweapons`
- note: the official office-hosted speech PDF attributes the wording directly to Christopher Smith. This verified New Jersey finding was already present in site data before the sixth reverse-state tranche official-page sweep.

### Jake Auchincloss
- personId: `house-jake-auchincloss-massachusetts-4th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Auchincloss biotech release
  https://auchincloss.house.gov/media/press-releases/release-auchincloss-joins-bipartisan-group-of-select-committee-members-in-introducing-house-and-senate-bills-to-ban-foreign-adversary-biotech-companies-including-bgi-group
- notable exact matches across bundle: `bioweapon`
- note: the official Auchincloss office page contains the target language in quoted or background text rather than as a direct self-use entry. This verified Massachusetts finding was already present in site data before the eighth reverse-state tranche official-page sweep.

### Stephen Lynch
- personId: `house-stephen-lynch-massachusetts-8th`
- classification: `direct self-use`
- source bundle:
  `official office page` Lynch inspectors general release
  https://lynch.house.gov/2021/4/reps-lynch-maloney-hoyer-connolly-gomez-porter-and-lieu-introduce-comprehensive-inspectors-general-legislation-to-increase-transparency-independence
- notable exact matches across bundle: `biodefense`
- note: the official Lynch release attributes the target language directly to him in quoted remarks about inspectors general and lapses in national biodefense. This verified Massachusetts finding was added during the 2026-03-31 deeper eighth-tranche follow-up.

### April McClain Delaney
- personId: `house-april-mcclain-delaney-maryland-6th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` McClain Delaney Fort Detrick release
  https://mcclaindelaney.house.gov/media/press-releases/protecting-us-biodefense-and-pandemic-preparedness-rep-mcclain-delaney
- notable exact matches across bundle: `biodefense`
- note: the official McClain Delaney release uses the target language in office-authored material about a letter she sent with Maryland senators on Fort Detrick readiness, biodefense, and pandemic preparedness.

### Steny Hoyer
- personId: `house-steny-hoyer-maryland-5th`
- classification: `direct self-use`
- source bundle:
  `official office page` Hoyer shutdown remarks page
  https://hoyer.house.gov/media/press-releases/hoyer-every-authoritarian-leader-has-had-his-grim-reaper-russell-vought-donald
- notable exact matches across bundle: `biodefense`
- note: the official Hoyer remarks page attributes the target language directly to him in posted shutdown remarks where he reads aloud a headline about biodefense preparedness staff. This verified Maryland finding was added during the 2026-03-31 deeper eighth-tranche follow-up.

### Andy Barr
- personId: `house-andy-barr-kentucky-6th`
- classification: `direct self-use`
- source bundle:
  `official office page` Barr China select committee release
  https://barr.house.gov/press-releases?ContentRecord_id=83EA1EA5-4D58-4F31-A678-19DD5CB92520
  `official office page` Barr Wuhan lab release
  https://barr.house.gov/2021/8/rep-barr-covid-19-likely-leaked-from-wuhan-virology-lab-time-to-ban-gain-of-function-research
- notable exact matches across bundle: `biosecurity`, `gain-of-function`
- note: Barr's official House pages use the target language in two ways: a transcribed Barr floor speech directly attributes `biosecurity` wording to him, while a separate Barr release uses `gain-of-function` in office-authored COVID-origin material. This verified Kentucky finding was added during the 2026-03-31 deeper ninth-tranche follow-up.

### Mike Johnson
- personId: `house-mike-johnson-louisiana-4th`
- classification: `direct self-use`
- source bundle:
  `official office page` Johnson DHS shutdown remarks page
  https://mikejohnson.house.gov/news/documentsingle.aspx?DocumentID=2863
- notable exact matches across bundle: `bioterrorism`
- note: the official Johnson remarks page attributes the target language directly to him in posted remarks about the DHS shutdown, anti-bioterrorism matters, and other homeland-security issues. This verified Louisiana finding was added during the 2026-03-31 deeper ninth-tranche follow-up.

### Darin LaHood
- personId: `house-darin-lahood-illinois-16th`
- classification: `direct self-use`
- source bundle:
  `official office page` LaHood COVID-origins statement
  https://lahood.house.gov/2022/12/lahood-statement-on-intel-gop-report-on-covid-19-origins
- notable exact matches across bundle: `bioweapons`
- note: the official LaHood statement page attributes the target language directly to him in quoted remarks about COVID-19 origins, lab-leak evidence, and potential ties to China's bioweapons research program. This verified Illinois finding was added during the 2026-03-31 deeper tenth-tranche follow-up.

### Mark Messmer
- personId: `house-mark-messmer-indiana-8th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Messmer agricultural and national security release
  https://messmer.house.gov/news/documentsingle.aspx?DocumentID=206
- notable exact matches across bundle: `biosecurity`
- note: the official Messmer release uses the target language in office-authored legislative material describing his DOD and USDA Interagency Research Act and its focus on biosecurity innovation. This verified Indiana finding was added during the 2026-03-31 deeper tenth-tranche follow-up.

### James Comer
- personId: `house-james-comer-kentucky-1st`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript
  https://docs.house.gov/meetings/VC/VC00/20240501/117221/HHRG-118-VC00-Transcript-20240501.pdf
- notable exact matches across bundle: `bioweapons`
- note: the official House hearing transcript attributes direct target-language use to James Comer. This verified Kentucky finding was already present in site data before the ninth reverse-state tranche official-page sweep.

### Raul Ruiz
- personId: `house-raul-ruiz-california-25th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript, May 1, 2024
  https://docs.house.gov/meetings/VC/VC00/20240501/117221/HHRG-118-VC00-Transcript-20240501.pdf
  `official transcript` House hearing transcript, Jun. 3, 2024
  https://docs.house.gov/meetings/VC/VC00/20240603/117378/HHRG-118-VC00-Transcript-20240603.pdf
- notable exact matches across bundle: `bioweapon`
- note: official House hearing transcripts attribute direct target-language use to Raul Ruiz in rebuttal and probing remarks. This verified California finding was already present in site data before the twelfth reverse-state tranche official-page sweep.

### Robert Garcia
- personId: `house-robert-garcia-california-42nd`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript, May 1, 2024
  https://docs.house.gov/meetings/VC/VC00/20240501/117221/HHRG-118-VC00-Transcript-20240501.pdf
  `official transcript` House hearing transcript, Jun. 3, 2024
  https://docs.house.gov/meetings/VC/VC00/20240603/117378/HHRG-118-VC00-Transcript-20240603.pdf
- notable exact matches across bundle: `bioweapon`
- note: official House hearing transcripts attribute direct target-language use to Robert Garcia in critique and quotation remarks. This verified California finding was already present in site data before the twelfth reverse-state tranche official-page sweep.

### Jay Obernolte
- personId: `house-jay-obernolte-california-23rd`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` Congress.gov opening-statement PDF, Apr. 8, 2025
  https://www.congress.gov/119/meeting/house/118111/documents/HMTG-119-SY15-MState-O000019-20250408.pdf
- notable exact matches across bundle: `bioweapons`
- note: the official opening statement PDF attributes the wording directly to Obernolte. This verified California finding was already present in site data before the twelfth reverse-state tranche official-page sweep.

### Dale Strong
- personId: `house-dale-strong-alabama-5th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` Congressional Record, Mar. 10, 2025
  https://www.congress.gov/119/crec/2025/03/10/171/44/modified/CREC-2025-03-10-pt1-PgH1046.htm
- notable exact matches across bundle: `bioweapon`, `biological threats`, `bioterrorism`, `biological weapons`, `biodefense`
- note: official House floor remarks attribute direct target-language use to Dale Strong. This verified Alabama finding was already present in site data before the thirteenth reverse-state tranche official-page sweep.

### Paul Gosar
- personId: `house-paul-gosar-arizona-9th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
- notable exact matches across bundle: `bioweapon`, `bioweapons`
- note: an official House hearing transcript attributes direct target-language use to Paul Gosar. This verified Arizona finding was already present in site data before the thirteenth reverse-state tranche official-page sweep.

### Elijah Crane
- personId: `house-elijah-crane-arizona-2nd`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing transcript
  https://docs.house.gov/meetings/GO/GO00/20250610/118362/HHRG-119-GO00-Transcript-20250610.pdf
- notable exact matches across bundle: `bioweapons`
- note: an official House hearing transcript attributes direct target-language use to Elijah Crane. This verified Arizona finding was already present in site data before the thirteenth reverse-state tranche official-page sweep.

### Troy Balderson
- personId: `house-troy-balderson-ohio-12th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Balderson pandemic preparedness caucus release
  https://balderson.house.gov/news/documentsingle.aspx?DocumentID=1833
- notable exact matches across bundle: `biodefense`
- note: Balderson's official office release uses the target language in caucus-priority text describing biodefense issues. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Yvette Clarke
- personId: `house-yvette-clarke-new-york-9th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House hearing statement PDF, Dec. 17, 2025
  https://docs.house.gov/meetings/IF/IF02/20251217/118773/HHRG-119-IF02-MState-C001067-20251217.pdf
- notable exact matches across bundle: `biosecurity`
- note: the official House statement PDF attributes the wording directly to Clarke in her opening remarks on biosecurity and AI. This supersedes her earlier inclusion in the fifth-tranche official-page no-hit roster.

### Andrew Garbarino
- personId: `house-andrew-garbarino-new-york-2nd`
- classification: `signed or office-owned document`
- source bundle:
  `official transcript / government record` House CWMD hearing appendix PDF
  https://www.congress.gov/117/chrg/CHRG-117hhrg45763/CHRG-117hhrg45763.pdf
- notable exact matches across bundle: `biological threats`
- note: an official hearing appendix attributes the wording to Garbarino in a submitted written question about detecting biological threats. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Julie Fedorchak
- personId: `house-julie-fedorchak-north-dakota-at-large`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Fedorchak FY26 appropriations release
  https://fedorchak.house.gov/media/press-releases/fedorchak-votes-complete-annual-appropriations-through-regular-order
- notable exact matches across bundle: `biosecurity`, `biological threats`
- note: Fedorchak's official office release uses the target language in appropriations messaging on American biosecurity and biological threats. This supersedes her earlier inclusion in the fifth-tranche official-page no-hit roster.

### Richard Hudson
- personId: `house-richard-hudson-north-carolina-9th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Cassidy-Romney-McMorris Rodgers-Hudson oversight letter page
  https://www.cassidy.senate.gov/newsroom/press-releases/ranking-member-cassidy-romney-mcmorris-rodgers-hudson-call-on-biden-administration-to-bolster-oversight-of-pandemic-research/
- notable exact matches across bundle: `biosecurity`
- note: a published oversight-letter page explicitly says Hudson joined a letter calling for stronger domestic biosecurity oversight of pandemic research. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Jim Jordan
- personId: `house-jim-jordan-ohio-4th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House Select Subcommittee transcript, July 11, 2023
  https://docs.house.gov/meetings/VC/VC00/20230711/116185/HHRG-118-VC00-Transcript-20230711.pdf
- notable exact matches across bundle: `gain-of-function`
- note: the official House hearing transcript attributes the wording directly to Jordan in questioning about Wuhan-related gain-of-function research. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### David Joyce
- personId: `house-david-joyce-ohio-14th`
- classification: `direct self-use`
- source bundle:
  `official transcript` House Select Subcommittee transcript, May 16, 2024
  https://docs.house.gov/meetings/VC/VC00/20240516/117318/HHRG-118-VC00-Transcript-20240516.pdf
- notable exact matches across bundle: `gain-of-function`
- note: the official House hearing transcript attributes the wording directly to Joyce in remarks about EcoHealth funding and Wuhan-related gain-of-function research. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Marcy Kaptur
- personId: `house-marcy-kaptur-ohio-9th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` House Appropriations hearing text, Feb. 28, 2002
  https://www.congress.gov/event/107th-congress/house-event/LC16999/text
- notable exact matches across bundle: `biosecurity`, `bioterrorism`
- note: the official House hearing text attributes the wording directly to Kaptur in appropriations questioning about biosecurity funding and bioterrorism threats. This supersedes her earlier inclusion in the fifth-tranche official-page no-hit roster.

### Timothy Kennedy
- personId: `house-timothy-kennedy-new-york-26th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Homeland Democrats hearing statement PDF, Sept. 16, 2025
  https://democrats-homeland.house.gov/download/kennedy-091625?download=1
- notable exact matches across bundle: `biosecurity`, `bioterrorism`, `biological weapons`, `biological threat`
- note: Kennedy's official hearing statement uses multiple target phrases in office-signed material about agroterrorism, biosecurity preparedness, and biological threats. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Robert Latta
- personId: `house-robert-latta-ohio-5th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` Energy and Commerce hearing PDF, May 6, 2010
  https://www.govinfo.gov/content/pkg/CHRG-111hhrg76573/pdf/CHRG-111hhrg76573.pdf
- notable exact matches across bundle: `bioterrorism`
- note: the official House hearing transcript attributes the wording directly to Latta in remarks about imported food safety and bioterrorism threats. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Nicole Malliotakis
- personId: `house-nicole-malliotakis-new-york-11th`
- classification: `direct self-use`
- source bundle:
  `official transcript / government record` House Select Subcommittee hearing PDF, May 7, 2024
  https://www.congress.gov/118/chrg/CHRG-118hhrg55548/CHRG-118hhrg55548.pdf
  `official transcript / government record` Strengthening Biosafety and Biosecurity Standards hearing text
  https://www.congress.gov/event/118th-congress/house-event/116474/text
- notable exact matches across bundle: `gain-of-function`, `biosecurity`
- note: official House hearing records attribute the wording directly to Malliotakis in questioning about EcoHealth gain-of-function research and foreign biosecurity standards. This supersedes her earlier inclusion in the fifth-tranche official-page no-hit roster.

### Grace Meng
- personId: `house-grace-meng-new-york-6th`
- classification: `direct self-use`
- source bundle:
  `congressional/government record` Congressional Record extensions PDF, May 20, 2021
  https://www.govinfo.gov/content/pkg/CREC-2021-05-20/pdf/CREC-2021-05-20-extensions.pdf
- notable exact matches across bundle: `biosecurity`
- note: the official extension-of-remarks PDF attributes the wording directly to Meng in remarks introducing the Global Pandemic Prevention and Biosecurity Act. This supersedes her earlier inclusion in the fifth-tranche official-page no-hit roster.

### Gregory Meeks
- personId: `house-gregory-meeks-new-york-5th`
- classification: `direct self-use`
- source bundle:
  `official office page` Meeks Adelphi speech page
  https://meeks.house.gov/taxonomy/story-type/speech/america-and-world-balance-between-dominance-and-cooperation-adelphi
- notable exact matches across bundle: `biological weapons`
- note: Meeks's official House speech page attributes the wording directly to him in remarks about the Biological Weapons Convention and non-proliferation policy. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### David Rouzer
- personId: `house-david-rouzer-north-carolina-7th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Rouzer Agriculture Committee newsletter page
  https://rouzer.house.gov/news/email/show.aspx?ID=HNHKVQO6NTREZOLG655IIFZMK4
- notable exact matches across bundle: `biosecurity`
- note: Rouzer's official House newsletter uses the target language in office-authored budget messaging about enhancing livestock biosecurity. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Deborah Ross
- personId: `house-deborah-ross-north-carolina-2nd`
- classification: `direct self-use`
- source bundle:
  `official transcript` House Select Subcommittee transcript, May 16, 2024
  https://docs.house.gov/meetings/VC/VC00/20240516/117318/HHRG-118-VC00-Transcript-20240516.pdf
- notable exact matches across bundle: `gain-of-function`
- note: the official House hearing transcript attributes the wording directly to Ross in questioning about NIH definitions and oversight of gain-of-function research. This supersedes her earlier inclusion in the fifth-tranche official-page no-hit roster.

### Michael Turner
- personId: `house-michael-turner-ohio-10th`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Turner EMPOWER NIH Act release
  https://turner.house.gov/2021/6/rep-mike-turner-oh-10-introduces-empower-nih-act
- notable exact matches across bundle: `gain-of-function`
- note: Turner's official House release uses the target language in office-authored background text about Wuhan-related gain-of-function experimentation. This supersedes his earlier inclusion in the fifth-tranche official-page no-hit roster.

### Donald Norcross
- personId: `house-donald-norcross-new-jersey-1st`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Norcross DHS shutdown release
  https://norcross.house.gov/2015/2/rep-norcross-calls-congress-fund-department-homeland-security-avert
- notable exact matches across bundle: `biological threats`
- note: Norcross's official House release uses the target language in office-authored background text about countermeasures to devastating biological threats. This supersedes his earlier inclusion in the sixth-tranche official-page no-hit roster.

### Frank Pallone
- personId: `house-frank-pallone-new-jersey-6th`
- classification: `direct self-use`
- source bundle:
  `official transcript` Pallone hearing statement PDF, May 19, 2016
  https://docs.house.gov/meetings/IF/IF14/20160519/104953/HHRG-114-IF14-MState-P000034-20160519.pdf
- notable exact matches across bundle: `biological threats`, `biodefense`, `biological threat`
- note: the official House statement PDF attributes multiple target phrases directly to Pallone in remarks on public-health emergency response. This supersedes his earlier inclusion in the sixth-tranche official-page no-hit roster.

### Don Bacon
- personId: `house-don-bacon-nebraska-2nd`
- classification: `signed or office-owned document`
- source bundle:
  `official office page` Bacon national defense issue page
  https://bacon.house.gov/issues/issue?IssueID=14899
- notable exact matches across bundle: `biodefense`
- note: Bacon's official issue page explicitly says Rep. Bacon's defense priorities include increasing national biodefense readiness, so this counts as an office-owned attributable hit. This supersedes his earlier inclusion in the seventh-tranche official-page no-hit roster.

### Fifth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that fifth-tranche official-page pass. Troy Balderson, Yvette Clarke, Andrew Garbarino, Julie Fedorchak, Richard Hudson, Jim Jordan, David Joyce, Marcy Kaptur, Timothy Kennedy, Robert Latta, Nicole Malliotakis, Grace Meng, Gregory Meeks, David Rouzer, Deborah Ross, and Michael Turner are not included because later review found separate verified official-office / official-record hits for each. Broader transcript / government-record work remains open.

```tsv
personId	name	state	website
house-alma-adams-north-carolina-12th	Alma Adams	North Carolina	https://adams.house.gov
house-joyce-beatty-ohio-3rd	Joyce Beatty	Ohio	https://beatty.house.gov
house-shontel-brown-ohio-11th	Shontel Brown	Ohio	https://shontelbrown.house.gov
house-mike-carey-ohio-15th	Mike Carey	Ohio	https://carey.house.gov
house-warren-davidson-ohio-8th	Warren Davidson	Ohio	https://davidson.house.gov
house-donald-davis-north-carolina-1st	Donald Davis	North Carolina	https://dondavis.house.gov
house-chuck-edwards-north-carolina-11th	Chuck Edwards	North Carolina	https://edwards.house.gov
house-adriano-espaillat-new-york-13th	Adriano Espaillat	New York	https://espaillat.house.gov
house-valerie-foushee-north-carolina-4th	Valerie Foushee	North Carolina	https://foushee.house.gov
house-virginia-foxx-north-carolina-5th	Virginia Foxx	North Carolina	https://foxx.house.gov
house-laura-gillen-new-york-4th	Laura Gillen	New York	https://gillen.house.gov
house-daniel-goldman-new-york-10th	Daniel Goldman	New York	https://goldman.house.gov
house-pat-harrigan-north-carolina-10th	Pat Harrigan	North Carolina	https://harrigan.house.gov
house-mark-harris-north-carolina-8th	Mark Harris	North Carolina	https://markharris.house.gov
house-hakeem-jeffries-new-york-8th	Hakeem Jeffries	New York	https://jeffries.house.gov
house-brad-knott-north-carolina-13th	Brad Knott	North Carolina	https://knott.house.gov
house-nick-lalota-new-york-1st	Nick LaLota	New York	https://lalota.house.gov
house-greg-landsman-ohio-1st	Greg Landsman	Ohio	https://landsman.house.gov
house-nicholas-langworthy-new-york-23rd	Nicholas Langworthy	New York	https://langworthy.house.gov
house-george-latimer-new-york-16th	George Latimer	New York	https://latimer.house.gov
house-michael-lawler-new-york-17th	Michael Lawler	New York	https://lawler.house.gov
house-john-mannion-new-york-22nd	John Mannion	New York	https://mannion.house.gov
house-addison-mcdowell-north-carolina-6th	Addison McDowell	North Carolina	https://mcdowell.house.gov
house-max-miller-ohio-7th	Max Miller	Ohio	https://maxmiller.house.gov
house-tim-moore-north-carolina-14th	Tim Moore	North Carolina	https://timmoore.house.gov
house-joseph-morelle-new-york-25th	Joseph Morelle	New York	https://morelle.house.gov
house-gregory-murphy-north-carolina-3rd	Gregory Murphy	North Carolina	https://murphy.house.gov
house-jerrold-nadler-new-york-12th	Jerrold Nadler	New York	https://nadler.house.gov
house-alexandria-ocasio-cortez-new-york-14th	Alexandria Ocasio-Cortez	New York	https://ocasio-cortez.house.gov
house-josh-riley-new-york-19th	Josh Riley	New York	https://riley.house.gov
house-michael-a-rulli-ohio-6th	Michael A. Rulli	Ohio	https://rulli.house.gov
house-patrick-ryan-new-york-18th	Patrick Ryan	New York	https://patryan.house.gov
house-elise-stefanik-new-york-21st	Elise Stefanik	New York	https://stefanik.house.gov
house-thomas-r-suozzi-new-york-3rd	Thomas R. Suozzi	New York	https://suozzi.house.gov
house-emilia-sykes-ohio-13th	Emilia Sykes	Ohio	https://sykes.house.gov
house-david-taylor-ohio-2nd	David Taylor	Ohio	https://taylor.house.gov
house-claudia-tenney-new-york-24th	Claudia Tenney	New York	https://tenney.house.gov
house-paul-tonko-new-york-20th	Paul Tonko	New York	https://tonko.house.gov
house-ritchie-torres-new-york-15th	Ritchie Torres	New York	https://ritchietorres.house.gov
house-nydia-velazquez-new-york-7th	Nydia Velazquez	New York	https://velazquez.house.gov
```

### Sixth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that sixth-tranche official-page pass. Christopher Smith, Donald Norcross, and Frank Pallone are not included in this no-hit roster because later review found separate verified official-office / official-record hits for each. Broader transcript / government-record work remains open.

```tsv
personId	name	state	website
house-herbert-conaway-new-jersey-3rd	Herbert Conaway	New Jersey	https://conaway.house.gov
house-josh-gottheimer-new-jersey-5th	Josh Gottheimer	New Jersey	https://gottheimer.house.gov
house-thomas-kean-new-jersey-7th	Thomas Kean	New Jersey	https://kean.house.gov
house-teresa-leger-fernandez-new-mexico-3rd	Teresa Leger Fernandez	New Mexico	https://fernandez.house.gov
house-lamonica-mciver-new-jersey-10th	LaMonica McIver	New Jersey	https://mciver.house.gov
house-robert-menendez-new-jersey-8th	Robert Menendez	New Jersey	https://menendez.house.gov
house-nellie-pou-new-jersey-9th	Nellie Pou	New Jersey	https://pou.house.gov
house-melanie-stansbury-new-mexico-1st	Melanie Stansbury	New Mexico	https://stansbury.house.gov
house-jefferson-van-drew-new-jersey-2nd	Jefferson Van Drew	New Jersey	https://vandrew.house.gov
house-gabe-vasquez-new-mexico-2nd	Gabe Vasquez	New Mexico	https://vasquez.house.gov
house-bonnie-watson-coleman-new-jersey-12th	Bonnie Watson Coleman	New Jersey	https://watsoncoleman.house.gov
house-mark-amodei-nevada-2nd	Mark Amodei	Nevada	https://amodei.house.gov
house-maggie-goodlander-new-hampshire-2nd	Maggie Goodlander	New Hampshire	https://goodlander.house.gov
house-steven-horsford-nevada-4th	Steven Horsford	Nevada	https://horsford.house.gov
house-susie-lee-nevada-3rd	Susie Lee	Nevada	https://susielee.house.gov
house-chris-pappas-new-hampshire-1st	Chris Pappas	New Hampshire	https://pappas.house.gov
house-dina-titus-nevada-1st	Dina Titus	Nevada	https://titus.house.gov
```

### Seventh Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that seventh-tranche official-page pass. Don Bacon is not included in this no-hit roster because later review found a separate verified official-office hit on his issue page. Broader transcript / government-record work remains open.

```tsv
personId	name	state	website
house-adrian-smith-nebraska-3rd	Adrian Smith	Nebraska	https://adriansmith.house.gov/
house-mike-flood-nebraska-1st	Mike Flood	Nebraska	https://flood.house.gov/
house-ryan-zinke-montana-1st	Ryan Zinke	Montana	https://zinke.house.gov
house-troy-downing-montana-2nd	Troy Downing	Montana	https://downing.house.gov/
house-ann-wagner-missouri-2nd	Ann Wagner	Missouri	https://wagner.house.gov
house-emanuel-cleaver-missouri-5th	Emanuel Cleaver	Missouri	https://cleaver.house.gov
house-eric-burlison-missouri-7th	Eric Burlison	Missouri	https://burlison.house.gov
house-jason-smith-missouri-8th	Jason Smith	Missouri	https://jasonsmith.house.gov
house-mark-alford-missouri-4th	Mark Alford	Missouri	https://alford.house.gov
house-robert-onder-missouri-3rd	Robert Onder	Missouri	https://onder.house.gov/
house-sam-graves-missouri-6th	Sam Graves	Missouri	https://graves.house.gov/
house-wesley-bell-missouri-1st	Wesley Bell	Missouri	https://bell.house.gov/
house-bennie-thompson-mississippi-2nd	Bennie Thompson	Mississippi	https://benniethompson.house.gov/
house-michael-guest-mississippi-3rd	Michael Guest	Mississippi	https://guest.house.gov
house-mike-ezell-mississippi-4th	Mike Ezell	Mississippi	https://ezell.house.gov
house-trent-kelly-mississippi-1st	Trent Kelly	Mississippi	https://trentkelly.house.gov/
```

### Eighth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that eighth-tranche official-page pass. Jake Auchincloss is not included in this no-hit roster because he already had a separate verified finding on site from an official office release page. April McClain Delaney is not included because this eighth-tranche official-page pass surfaced a verified official release hit that is logged separately. As of the 2026-03-31 deeper follow-up, Stephen Lynch and Steny Hoyer have also been promoted into verified findings from broader official sources; they remain listed below only as part of the historical narrower official-page pass. Broader transcript / government-record work remains open for the remaining names.

```tsv
personId	name	state	website
house-angie-craig-minnesota-2nd	Angie Craig	Minnesota	https://craig.house.gov
house-betty-mccollum-minnesota-4th	Betty McCollum	Minnesota	https://mccollum.house.gov
house-brad-finstad-minnesota-1st	Brad Finstad	Minnesota	https://finstad.house.gov/
house-ilhan-omar-minnesota-5th	Ilhan Omar	Minnesota	https://omar.house.gov/
house-kelly-morrison-minnesota-3rd	Kelly Morrison	Minnesota	https://morrison.house.gov/
house-michelle-fischbach-minnesota-7th	Michelle Fischbach	Minnesota	https://fischbach.house.gov
house-pete-stauber-minnesota-8th	Pete Stauber	Minnesota	https://stauber.house.gov
house-tom-emmer-minnesota-6th	Tom Emmer	Minnesota	https://emmer.house.gov/
house-bill-huizenga-michigan-4th	Bill Huizenga	Michigan	https://huizenga.house.gov/
house-debbie-dingell-michigan-6th	Debbie Dingell	Michigan	https://debbiedingell.house.gov/
house-haley-stevens-michigan-11th	Haley Stevens	Michigan	https://stevens.house.gov/
house-hillary-scholten-michigan-3rd	Hillary Scholten	Michigan	https://scholten.house.gov
house-jack-bergman-michigan-1st	Jack Bergman	Michigan	https://bergman.house.gov
house-john-james-michigan-10th	John James	Michigan	https://james.house.gov
house-john-moolenaar-michigan-2nd	John Moolenaar	Michigan	https://moolenaar.house.gov/
house-kristen-mcdonald-rivet-michigan-8th	Kristen McDonald Rivet	Michigan	https://mcdonaldrivet.house.gov/
house-lisa-mcclain-michigan-9th	Lisa McClain	Michigan	https://mcclain.house.gov
house-rashida-tlaib-michigan-12th	Rashida Tlaib	Michigan	https://tlaib.house.gov/
house-shri-thanedar-michigan-13th	Shri Thanedar	Michigan	https://thanedar.house.gov
house-tim-walberg-michigan-5th	Tim Walberg	Michigan	https://walberg.house.gov/
house-tom-barrett-michigan-7th	Tom Barrett	Michigan	https://barrett.house.gov
house-ayanna-pressley-massachusetts-7th	Ayanna Pressley	Massachusetts	https://pressley.house.gov
house-james-mcgovern-massachusetts-2nd	James McGovern	Massachusetts	https://mcgovern.house.gov/
house-katherine-clark-massachusetts-5th	Katherine Clark	Massachusetts	https://katherineclark.house.gov/index.cfm/home
house-lori-trahan-massachusetts-3rd	Lori Trahan	Massachusetts	https://trahan.house.gov
house-richard-neal-massachusetts-1st	Richard Neal	Massachusetts	https://neal.house.gov/
house-seth-moulton-massachusetts-6th	Seth Moulton	Massachusetts	https://moulton.house.gov/
house-stephen-lynch-massachusetts-8th	Stephen Lynch	Massachusetts	https://lynch.house.gov/
house-william-keating-massachusetts-9th	William Keating	Massachusetts	https://keating.house.gov/
house-andy-harris-maryland-1st	Andy Harris	Maryland	https://harris.house.gov/
house-glenn-ivey-maryland-4th	Glenn Ivey	Maryland	https://ivey.house.gov
house-jamie-raskin-maryland-8th	Jamie Raskin	Maryland	https://raskin.house.gov
house-johnny-olszewski-maryland-2nd	Johnny Olszewski	Maryland	https://olszewski.house.gov/
house-kweisi-mfume-maryland-7th	Kweisi Mfume	Maryland	https://mfume.house.gov/
house-sarah-elfreth-maryland-3rd	Sarah Elfreth	Maryland	https://elfreth.house.gov/
house-steny-hoyer-maryland-5th	Steny Hoyer	Maryland	https://hoyer.house.gov/
```

### Ninth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that ninth-tranche official-page pass. James Comer is not included in this no-hit roster because he already had a separate verified finding on site from an official House hearing transcript. As of the 2026-03-31 deeper follow-up, Andy Barr and Mike Johnson have also been promoted into verified findings from broader official sources; they remain listed below only as part of the historical narrower official-page pass. Broader transcript / government-record work remains open for the remaining names.

```tsv
personId	name	state	website
house-chellie-pingree-maine-1st	Chellie Pingree	Maine	https://pingree.house.gov/
house-jared-golden-maine-2nd	Jared Golden	Maine	https://golden.house.gov
house-clay-higgins-louisiana-3rd	Clay Higgins	Louisiana	https://clayhiggins.house.gov
house-cleo-fields-louisiana-6th	Cleo Fields	Louisiana	https://fields.house.gov/
house-julia-letlow-louisiana-5th	Julia Letlow	Louisiana	https://letlow.house.gov
house-mike-johnson-louisiana-4th	Mike Johnson	Louisiana	https://mikejohnson.house.gov
house-steve-scalise-louisiana-1st	Steve Scalise	Louisiana	https://scalise.house.gov/
house-troy-carter-louisiana-2nd	Troy Carter	Louisiana	https://troycarter.house.gov
house-andy-barr-kentucky-6th	Andy Barr	Kentucky	https://barr.house.gov/
house-brett-guthrie-kentucky-2nd	Brett Guthrie	Kentucky	https://guthrie.house.gov/
house-harold-rogers-kentucky-5th	Harold Rogers	Kentucky	https://halrogers.house.gov/
house-morgan-mcgarvey-kentucky-3rd	Morgan McGarvey	Kentucky	https://mcgarvey.house.gov
house-thomas-massie-kentucky-4th	Thomas Massie	Kentucky	https://massie.house.gov
house-derek-schmidt-kansas-2nd	Derek Schmidt	Kansas	https://schmidt.house.gov/
house-ron-estes-kansas-4th	Ron Estes	Kansas	https://estes.house.gov/
house-sharice-davids-kansas-3rd	Sharice Davids	Kansas	https://davids.house.gov/
house-tracey-mann-kansas-1st	Tracey Mann	Kansas	https://mann.house.gov
```

### Tenth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that tenth-tranche official-page pass. As of the 2026-03-31 deeper follow-up, Darin LaHood and Mark Messmer have been promoted into verified findings from broader official sources; they remain listed below only as part of the historical narrower official-page pass. Broader transcript / government-record work remains open for the remaining names.

```tsv
personId	name	state	website
house-ashley-hinson-iowa-2nd	Ashley Hinson	Iowa	https://hinson.house.gov
house-mariannette-miller-meeks-iowa-1st	Mariannette Miller-Meeks	Iowa	https://millermeeks.house.gov/
house-randy-feenstra-iowa-4th	Randy Feenstra	Iowa	https://feenstra.house.gov
house-zachary-nunn-iowa-3rd	Zachary Nunn	Iowa	https://nunn.house.gov
house-andre-carson-indiana-7th	Andre Carson	Indiana	https://carson.house.gov/
house-erin-houchin-indiana-9th	Erin Houchin	Indiana	https://houchin.house.gov
house-frank-mrvan-indiana-1st	Frank Mrvan	Indiana	https://mrvan.house.gov
house-james-baird-indiana-4th	James Baird	Indiana	https://baird.house.gov/
house-jefferson-shreve-indiana-6th	Jefferson Shreve	Indiana	https://shreve.house.gov/
house-mark-messmer-indiana-8th	Mark Messmer	Indiana	https://messmer.house.gov/
house-marlin-stutzman-indiana-3rd	Marlin Stutzman	Indiana	https://stutzman.house.gov/
house-rudy-yakym-indiana-2nd	Rudy Yakym	Indiana	https://yakym.house.gov
house-victoria-spartz-indiana-5th	Victoria Spartz	Indiana	https://spartz.house.gov
house-bill-foster-illinois-11th	Bill Foster	Illinois	https://foster.house.gov
house-bradley-schneider-illinois-10th	Bradley Schneider	Illinois	https://schneider.house.gov
house-danny-davis-illinois-7th	Danny Davis	Illinois	https://davis.house.gov
house-darin-lahood-illinois-16th	Darin LaHood	Illinois	https://lahood.house.gov/
house-delia-ramirez-illinois-3rd	Delia Ramirez	Illinois	https://ramirez.house.gov
house-eric-sorensen-illinois-17th	Eric Sorensen	Illinois	https://sorensen.house.gov
house-janice-schakowsky-illinois-9th	Janice Schakowsky	Illinois	https://schakowsky.house.gov
house-jesus-garcia-illinois-4th	Jesus Garcia	Illinois	https://chuygarcia.house.gov/
house-jonathan-jackson-illinois-1st	Jonathan Jackson	Illinois	https://jonathanjackson.house.gov
house-lauren-underwood-illinois-14th	Lauren Underwood	Illinois	https://underwood.house.gov/
house-mary-miller-illinois-15th	Mary Miller	Illinois	https://marymiller.house.gov
house-mike-bost-illinois-12th	Mike Bost	Illinois	https://bost.house.gov/
house-mike-quigley-illinois-5th	Mike Quigley	Illinois	https://quigley.house.gov/
house-nikki-budzinski-illinois-13th	Nikki Budzinski	Illinois	https://budzinski.house.gov
house-raja-krishnamoorthi-illinois-8th	Raja Krishnamoorthi	Illinois	https://krishnamoorthi.house.gov
house-robin-kelly-illinois-2nd	Robin Kelly	Illinois	https://robinkelly.house.gov/
house-sean-casten-illinois-6th	Sean Casten	Illinois	https://casten.house.gov
house-michael-simpson-idaho-2nd	Michael Simpson	Idaho	https://simpson.house.gov
house-russ-fulcher-idaho-1st	Russ Fulcher	Idaho	https://fulcher.house.gov/
```

### Eleventh Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that eleventh-tranche official-page pass. Broader transcript / government-record work remains open.

```tsv
personId	name	state	website
house-ed-case-hawaii-1st	Ed Case	Hawaii	https://case.house.gov/
house-jill-tokuda-hawaii-2nd	Jill Tokuda	Hawaii	https://tokuda.house.gov
house-andrew-clyde-georgia-9th	Andrew Clyde	Georgia	https://clyde.house.gov
house-austin-scott-georgia-8th	Austin Scott	Georgia	https://austinscott.house.gov/
house-barry-loudermilk-georgia-11th	Barry Loudermilk	Georgia	https://loudermilk.house.gov
house-brian-jack-georgia-3rd	Brian Jack	Georgia	https://jack.house.gov/
house-david-scott-georgia-13th	David Scott	Georgia	https://davidscott.house.gov/
house-earl-carter-georgia-1st	Earl Carter	Georgia	https://buddycarter.house.gov/
house-henry-johnson-georgia-4th	Henry Johnson	Georgia	https://hankjohnson.house.gov/
house-lucy-mcbath-georgia-6th	Lucy McBath	Georgia	https://mcbath.house.gov
house-mike-collins-georgia-10th	Mike Collins	Georgia	https://collins.house.gov
house-nikema-williams-georgia-5th	Nikema Williams	Georgia	https://nikemawilliams.house.gov
house-richard-mccormick-georgia-7th	Richard McCormick	Georgia	https://mccormick.house.gov
house-rick-allen-georgia-12th	Rick Allen	Georgia	https://allen.house.gov
house-sanford-bishop-georgia-2nd	Sanford Bishop	Georgia	https://bishop.house.gov/
house-aaron-bean-florida-4th	Aaron Bean	Florida	https://bean.house.gov
house-anna-paulina-luna-florida-13th	Anna Paulina Luna	Florida	https://luna.house.gov
house-brian-mast-florida-21st	Brian Mast	Florida	https://mast.house.gov
house-byron-donalds-florida-19th	Byron Donalds	Florida	https://donalds.house.gov
house-carlos-gimenez-florida-28th	Carlos Gimenez	Florida	https://gimenez.house.gov
house-cory-mills-florida-7th	Cory Mills	Florida	https://mills.house.gov
house-daniel-webster-florida-11th	Daniel Webster	Florida	https://webster.house.gov/
house-darren-soto-florida-9th	Darren Soto	Florida	https://soto.house.gov
house-debbie-wasserman-schultz-florida-25th	Debbie Wasserman Schultz	Florida	https://wassermanschultz.house.gov/
house-frederica-wilson-florida-24th	Frederica Wilson	Florida	https://wilson.house.gov/
house-gus-bilirakis-florida-12th	Gus Bilirakis	Florida	https://bilirakis.house.gov/
house-jared-moskowitz-florida-23rd	Jared Moskowitz	Florida	https://moskowitz.house.gov
house-jimmy-patronis-florida-1st	Jimmy Patronis	Florida	https://patronis.house.gov/
house-john-rutherford-florida-5th	John Rutherford	Florida	https://rutherford.house.gov
house-kat-cammack-florida-3rd	Kat Cammack	Florida	https://cammack.house.gov
house-kathy-castor-florida-14th	Kathy Castor	Florida	https://castor.house.gov/
house-laurel-lee-florida-15th	Laurel Lee	Florida	https://laurellee.house.gov
house-lois-frankel-florida-22nd	Lois Frankel	Florida	https://frankel.house.gov
house-maria-salazar-florida-27th	Maria Salazar	Florida	https://salazar.house.gov
house-mario-diaz-balart-florida-26th	Mario Diaz-Balart	Florida	https://mariodiazbalart.house.gov/
house-maxwell-frost-florida-10th	Maxwell Frost	Florida	https://frost.house.gov
house-mike-haridopolos-florida-8th	Mike Haridopolos	Florida	https://haridopolos.house.gov/
house-neal-dunn-florida-2nd	Neal Dunn	Florida	https://dunn.house.gov
house-randy-fine-florida-6th	Randy Fine	Florida	https://fine.house.gov/
house-scott-franklin-florida-18th	Scott Franklin	Florida	https://franklin.house.gov
house-sheila-cherfilus-mccormick-florida-20th	Sheila Cherfilus-McCormick	Florida	https://cherfilus-mccormick.house.gov/
house-vern-buchanan-florida-16th	Vern Buchanan	Florida	https://buchanan.house.gov/
house-w-steube-florida-17th	W. Steube	Florida	https://steube.house.gov/
house-sarah-mcbride-delaware-at-large	Sarah McBride	Delaware	https://mcbride.house.gov/
```

### Twelfth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that twelfth-tranche official-page pass. Jay Obernolte, Raul Ruiz, and Robert Garcia are not included in this no-hit roster because each already had a separate verified finding on site from broader official records. As of the 2026-03-31 deeper follow-up, Ami Bera has also been promoted into a verified finding from an official hearing text; he remains listed below only as part of the historical narrower official-page pass. Broader transcript / government-record work remains open for the remaining names.

```tsv
personId	name	state	website
house-jahana-hayes-connecticut-5th	Jahana Hayes	Connecticut	https://hayes.house.gov
house-james-himes-connecticut-4th	James Himes	Connecticut	https://himes.house.gov/
house-joe-courtney-connecticut-2nd	Joe Courtney	Connecticut	https://courtney.house.gov/
house-john-larson-connecticut-1st	John Larson	Connecticut	https://larson.house.gov/
house-rosa-delauro-connecticut-3rd	Rosa DeLauro	Connecticut	https://delauro.house.gov/
house-brittany-pettersen-colorado-7th	Brittany Pettersen	Colorado	https://pettersen.house.gov
house-diana-degette-colorado-1st	Diana DeGette	Colorado	https://degette.house.gov
house-gabe-evans-colorado-8th	Gabe Evans	Colorado	https://gabeevans.house.gov/
house-jason-crow-colorado-6th	Jason Crow	Colorado	https://crow.house.gov/
house-jeff-crank-colorado-5th	Jeff Crank	Colorado	https://crank.house.gov/
house-jeff-hurd-colorado-3rd	Jeff Hurd	Colorado	https://hurd.house.gov/
house-joe-neguse-colorado-2nd	Joe Neguse	Colorado	https://neguse.house.gov/
house-lauren-boebert-colorado-4th	Lauren Boebert	Colorado	https://boebert.house.gov
house-adam-gray-california-13th	Adam Gray	California	https://gray.house.gov/
house-ami-bera-california-6th	Ami Bera	California	https://bera.house.gov
house-brad-sherman-california-32nd	Brad Sherman	California	https://sherman.house.gov
house-darrell-issa-california-48th	Darrell Issa	California	https://issa.house.gov
house-dave-min-california-47th	Dave Min	California	https://min.house.gov/
house-david-valadao-california-22nd	David Valadao	California	https://valadao.house.gov
house-derek-tran-california-45th	Derek Tran	California	https://tran.house.gov/
house-doris-matsui-california-7th	Doris Matsui	California	https://matsui.house.gov
house-eric-swalwell-california-14th	Eric Swalwell	California	https://swalwell.house.gov
house-george-whitesides-california-27th	George Whitesides	California	https://whitesides.house.gov/
house-gilbert-cisneros-california-31st	Gilbert Cisneros	California	https://cisneros.house.gov/
house-j-correa-california-46th	J. Correa	California	https://correa.house.gov
house-jared-huffman-california-2nd	Jared Huffman	California	https://huffman.house.gov
house-jim-costa-california-21st	Jim Costa	California	https://costa.house.gov/
house-jimmy-gomez-california-34th	Jimmy Gomez	California	https://gomez.house.gov/
house-jimmy-panetta-california-19th	Jimmy Panetta	California	https://panetta.house.gov
house-john-garamendi-california-8th	John Garamendi	California	https://garamendi.house.gov/
house-josh-harder-california-9th	Josh Harder	California	https://harder.house.gov/
house-juan-vargas-california-52nd	Juan Vargas	California	https://vargas.house.gov
house-judy-chu-california-28th	Judy Chu	California	https://chu.house.gov/
house-julia-brownley-california-26th	Julia Brownley	California	https://juliabrownley.house.gov
house-ken-calvert-california-41st	Ken Calvert	California	https://calvert.house.gov/
house-kevin-kiley-california-3rd	Kevin Kiley	California	https://kiley.house.gov
house-kevin-mullin-california-15th	Kevin Mullin	California	https://kevinmullin.house.gov
house-lateefah-simon-california-12th	Lateefah Simon	California	https://simon.house.gov/
house-laura-friedman-california-30th	Laura Friedman	California	https://friedman.house.gov/
house-linda-sanchez-california-38th	Linda Sanchez	California	https://lindasanchez.house.gov/
house-luz-rivas-california-29th	Luz Rivas	California	https://rivas.house.gov/
house-mark-desaulnier-california-10th	Mark DeSaulnier	California	https://desaulnier.house.gov/
house-mark-takano-california-39th	Mark Takano	California	https://takano.house.gov
house-maxine-waters-california-43rd	Maxine Waters	California	https://waters.house.gov
house-mike-levin-california-49th	Mike Levin	California	https://levin.house.gov/
house-mike-thompson-california-4th	Mike Thompson	California	https://mikethompson.house.gov/
house-nancy-pelosi-california-11th	Nancy Pelosi	California	https://pelosi.house.gov/
house-nanette-barragan-california-44th	Nanette Barragan	California	https://barragan.house.gov/
house-norma-torres-california-35th	Norma Torres	California	https://torres.house.gov/
house-pete-aguilar-california-33rd	Pete Aguilar	California	https://aguilar.house.gov/
house-ro-khanna-california-17th	Ro Khanna	California	https://khanna.house.gov
house-salud-carbajal-california-24th	Salud Carbajal	California	https://carbajal.house.gov
house-sam-liccardo-california-16th	Sam Liccardo	California	https://liccardo.house.gov/
house-sara-jacobs-california-51st	Sara Jacobs	California	https://sarajacobs.house.gov
house-scott-peters-california-50th	Scott Peters	California	https://scottpeters.house.gov
house-sydney-kamlager-dove-california-37th	Sydney Kamlager-Dove	California	https://kamlager-dove.house.gov
house-ted-lieu-california-36th	Ted Lieu	California	https://lieu.house.gov/
house-tom-mcclintock-california-5th	Tom McClintock	California	https://mcclintock.house.gov/
house-vince-fong-california-20th	Vince Fong	California	https://fong.house.gov/
house-young-kim-california-40th	Young Kim	California	https://youngkim.house.gov
house-zoe-lofgren-california-18th	Zoe Lofgren	California	https://lofgren.house.gov/
house-bruce-westerman-arkansas-4th	Bruce Westerman	Arkansas	https://westerman.house.gov/
house-eric-crawford-arkansas-1st	Eric Crawford	Arkansas	https://crawford.house.gov/
house-j-hill-arkansas-2nd	J. Hill	Arkansas	https://hill.house.gov/
house-steve-womack-arkansas-3rd	Steve Womack	Arkansas	https://womack.house.gov/
```

### Thirteenth Tranche Official-Page No-Hit Roster
- scope note: each member below was checked on the standard official House-domain paths `/`, `/about`, `/media`, `/issues`, `/news`, and `/media/press-releases`. No exact whole-word / whole-phrase hit from the target list surfaced in that thirteenth-tranche official-page pass. Elijah Crane, Paul Gosar, and Dale Strong are not included in this no-hit roster because each already had a separate verified finding on site from broader official records. As of the 2026-03-30 deeper follow-up, Andy Biggs and Robert Aderholt have also been promoted into verified findings from broader official sources; they remain listed below only as part of the historical narrower official-page pass. Broader transcript / government-record work remains open for the remaining names.

```tsv
personId	name	state	website
house-abraham-hamadeh-arizona-8th	Abraham Hamadeh	Arizona	https://hamadeh.house.gov/
house-adelita-grijalva-arizona-7th	Adelita Grijalva	Arizona	https://grijalva.house.gov/
house-andy-biggs-arizona-5th	Andy Biggs	Arizona	https://biggs.house.gov
house-david-schweikert-arizona-1st	David Schweikert	Arizona	https://schweikert.house.gov/
house-greg-stanton-arizona-4th	Greg Stanton	Arizona	https://stanton.house.gov/
house-juan-ciscomani-arizona-6th	Juan Ciscomani	Arizona	https://ciscomani.house.gov
house-yassamin-ansari-arizona-3rd	Yassamin Ansari	Arizona	https://ansari.house.gov/
house-nicholas-begich-alaska-at-large	Nicholas Begich	Alaska	https://begich.house.gov/
house-barry-moore-alabama-1st	Barry Moore	Alabama	https://barrymoore.house.gov
house-gary-palmer-alabama-6th	Gary Palmer	Alabama	https://palmer.house.gov/
house-mike-rogers-alabama-3rd	Mike Rogers	Alabama	https://mikerogers.house.gov/
house-robert-aderholt-alabama-4th	Robert Aderholt	Alabama	https://aderholt.house.gov/
house-shomari-figures-alabama-2nd	Shomari Figures	Alabama	https://figures.house.gov/
house-terri-sewell-alabama-7th	Terri Sewell	Alabama	https://sewell.house.gov/
```

## Third Tranche Incomplete

No members remain incomplete in the third reverse-state tranche.

## Fourth Tranche Incomplete

No members remain incomplete in the fourth reverse-state tranche.

## Fifth Tranche Incomplete

No members remain incomplete in the fifth reverse-state tranche.

## Sixth Tranche Incomplete

No members remain incomplete in the sixth reverse-state tranche.

## Seventh Tranche Incomplete

No members remain incomplete in the seventh reverse-state tranche.

## Eighth Tranche Incomplete

No members remain incomplete in the eighth reverse-state tranche.

## Ninth Tranche Incomplete

No members remain incomplete in the ninth reverse-state tranche.

## Tenth Tranche Incomplete

No members remain incomplete in the tenth reverse-state tranche.

## Eleventh Tranche Incomplete

No members remain incomplete in the eleventh reverse-state tranche.

## Twelfth Tranche Incomplete

No members remain incomplete in the twelfth reverse-state tranche.

## Thirteenth Tranche Incomplete

No members remain incomplete in the thirteenth reverse-state tranche.

## False Positives Already Screened Out

These are useful to keep because they explain why some tempting source pages were not counted.

### Harriet Hageman
- source:
  `congressional/government record` Congressional Record, House Book 2, Nov. 14, 2023
  https://www.govinfo.gov/content/pkg/CREC-2023-11-14/pdf/CREC-2023-11-14-house-bk2.pdf
- note: the page contains `gain-of-function` and `biodefense`, but the relevant remarks were by Mariannette Miller-Meeks and Matt Rosendale, not Hageman.

### Dan Newhouse
- source:
  `congressional/government record` Defense Health and Medical Readiness hearing text
  https://www.congress.gov/event/117th-congress/house-event/114802/text
- note: the page contains `gain-of-function` and `bioterrorism`, but the checked passages were spoken by other members, not Newhouse.

### Marie Gluesenkamp Perez
- source:
  `congressional/government record` A Review of USDA Animal Disease Prevention and Response Efforts hearing PDF
  https://www.congress.gov/118/chrg/CHRG-118hhrg52768/CHRG-118hhrg52768.pdf
- note: the page contains `biosecurity`, but the interrupted audit did not verify that wording in attributable remarks by her.

### Rick Larsen
- source:
  `congressional/government record` H. Rept. 117-705
  https://www.congress.gov/committee-report/117th-congress/house-report/705/1
- note: the surfaced official report page did not yield an attributable exact-term hit for Larsen.

### Blake Moore
- source:
  `congressional/government record` Rules Committee page for H.R. 4350
  https://rules.house.gov/bill/117/hr-4350
- note: the surfaced page contains target language tied to other members' amendments, not to attributable Blake Moore remarks.

### Thomas H. Kean / current Thomas Kean
- source:
  `congressional/government record` Viewpoints on Homeland Security hearing text
  https://www.congress.gov/event/111th-congress/house-event/LC5557/text
- note: this surfaced because witness Thomas H. Kean used biotech-related terms, but he is the former governor / commission witness, not current Rep. Thomas Kean, so it must not be attached to the current House roster member.

### Mark Alford
- source:
  `official office page` Community Funding Project Requests page
  https://alford.house.gov/community-funding-project-requests
- note: the page surfaced `genetic engineering`, but only inside a hosted community-project title and description for the University of Missouri request, not in attributable Mark Alford language.

### Trent Kelly
- source:
  `official office page` Trent Kelly cosponsored bills page
  https://trentkelly.house.gov/legislation/cosponsoredbills.htm
- note: the page surfaced `gain-of-function`, but only inside an auto-generated cosponsored bill title, `Foreign Gain-of-Function Research Prevention Act of 2021`, rather than attributable Kelly language.

### Mariannette Miller-Meeks
- source:
  `official office page` Committees and Caucuses page
  https://millermeeks.house.gov/about/committees-and-caucuses
- note: the page surfaced `biodefense`, but only as the caucus title `Biodefense Caucus` in a membership list rather than substantive attributable language by Miller-Meeks.

### Mark Messmer
- source:
  `official office PDF` DOD and USDA Interagency Research Act PDF
  https://messmer.house.gov/uploadedfiles/dod_and_usda_interagency_research_act.pdf
- note: the PDF surfaced `biosecurity`, but it is hosted bill text rather than attributed Messmer language; the verified Messmer finding in this tranche instead comes from his office-authored release page.
