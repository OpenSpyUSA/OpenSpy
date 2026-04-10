# Judicial Biotech Audit

Date: 2026-03-30

Scope: current judicial roster on this site only.

Method used in this pass:
- Exact whole-word / whole-phrase matching for the user-supplied target list.
- Source family used in this judicial baseline pass: official Supreme Court oral argument transcript PDFs on `supremecourt.gov`.
- Attribution rule: count a hit only when the phrase appears in text attributed to the speaking justice in the transcript.

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

Current judicial transcript-sweep summary:
- 9 current Supreme Court justices on the site roster
- 1,037 official oral argument transcript PDFs scanned
- 2 justices with verified direct self-use hits
- 7 justices with no verified hit in this transcript-only judicial pass

## Confirmed Findings

### John G. Roberts, Jr.
- personId: `judicial-john-g-roberts-jr`
- classification: `direct self-use`
- source bundle:
  `official transcript` Trump v. Hawaii oral argument transcript, Apr. 25, 2018
  https://www.supremecourt.gov/oral_arguments/argument_transcripts/2017/17-965_l5gm.pdf
- notable exact matches across bundle: `biological weapons`
- note: the official transcript attributes the wording directly to Chief Justice Roberts in a hypothetical about entrants carrying chemical and biological weapons.

### Samuel A. Alito, Jr.
- personId: `judicial-samuel-a-alito-jr`
- classification: `direct self-use`
- source bundle:
  `official transcript` Johnson v. United States oral argument transcript, Nov. 5, 2014
  https://www.supremecourt.gov/oral_arguments/argument_transcripts/2014/13-7120_aa7i.pdf
- notable exact matches across bundle: `biological weapon`, `biological weapons`
- note: the official transcript attributes the wording directly to Justice Alito in questions about the risks and prevalence of biological weapons.

## Checked No-Hit So Far

These entries have real checked-source work behind them. No verified attributable hit was found in the official oral-argument transcript sweep used in this judicial baseline pass.

### Clarence Thomas
- personId: `judicial-clarence-thomas`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2005-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Thomas.

### Sonia Sotomayor
- personId: `judicial-sonia-sotomayor`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2005-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Sotomayor.

### Elena Kagan
- personId: `judicial-elena-kagan`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2005-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Kagan.

### Neil M. Gorsuch
- personId: `judicial-neil-m-gorsuch`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2017-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Gorsuch.

### Brett M. Kavanaugh
- personId: `judicial-brett-m-kavanaugh`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2018-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Kavanaugh.

### Amy Coney Barrett
- personId: `judicial-amy-coney-barrett`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2020-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Barrett.

### Ketanji Brown Jackson
- personId: `judicial-ketanji-brown-jackson`
- classification: `checked no-hit so far`
- sources checked:
  `official transcript` Supreme Court oral argument transcript sweep, 2022-2025
  https://www.supremecourt.gov/oral_arguments/argument_transcript.aspx
- note: the transcript-only judicial baseline pass did not verify any attributable exact whole-word / whole-phrase biotech hit for Jackson.
