#!/usr/bin/env python3

import json
import re
import sys
from collections import defaultdict
from datetime import date, datetime
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import quote

import requests
from bs4 import BeautifulSoup


SPARQL_URL = "https://query.wikidata.org/sparql"
WIKIDATA_SEARCH_URL = "https://www.wikidata.org/w/api.php"
REQUEST_HEADERS = {
    "Accept": "application/json",
    "User-Agent": "usaspy/1.0 (background enrichment)",
}
GENERIC_SCHOOL_LABELS = {
    "school",
    "secondary school",
    "secondary school in arkansas",
    "secondary school in the united states",
}
NON_LEGISLATIVE_ENTITY_OVERRIDES = {
    "Donald J. Trump": "Q22686",
    "J.D. Vance": "Q28935729",
    "James C. Justice": "Q20684288",
    "Jimmy Patronis": "Q6201036",
    "Sean Duffy": "Q1729888",
    "Jerome H. Powell": "Q6182718",
    "John G. Roberts, Jr.": "Q11153",
    "Samuel A. Alito, Jr.": "Q11138",
    "Clarence Thomas": "Q11142",
    "Sonia Sotomayor": "Q11107",
    "Elena Kagan": "Q11105",
    "Neil M. Gorsuch": "Q15488345",
    "Brett M. Kavanaugh": "Q4962244",
    "Amy Coney Barrett": "Q29863844",
    "Ketanji Brown Jackson": "Q6395324",
}
MANUAL_X_URL_OVERRIDES = {
    "Andrew N. Ferguson": "https://x.com/AFergusonFTC",
    "Donald J. Trump": "https://x.com/realDonaldTrump",
    "J.D. Vance": "https://x.com/JDVance",
    "Jimmy Patronis": "https://x.com/PatronisFL",
    "Marie Perez": "https://x.com/repmgp",
    "Paul S. Atkins": "https://x.com/SECPaulSAtkins",
    "Richard McCormick": "https://x.com/RepMcCormick",
}
MANUAL_BIRTH_YEAR_OVERRIDES = {
    "Paul S. Atkins": 1958,
}
MONTH_PATTERN = r"(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}"
DEGREE_ABBREVIATIONS = {
    "BA": "Bachelor of Arts",
    "BS": "Bachelor of Science",
    "BBA": "Bachelor of Business Administration",
    "JD": "Juris Doctor",
    "JD.": "Juris Doctor",
    "MBA": "Master of Business Administration",
    "MA": "Master of Arts",
    "MS": "Master of Science",
    "MD": "Doctor of Medicine",
    "PHD": "Doctor of Philosophy",
    "LLM": "Master of Laws",
}
CAREER_LABEL_REPLACEMENTS = {
    "member of the United States House of Representatives": "U.S. representative",
    "United States senator": "U.S. senator",
}
GENERIC_POSITION_LABELS = {
    "chairperson",
    "director",
    "party chair",
    "president",
    "prosecutor",
}
LOW_SIGNAL_OCCUPATIONS = {
    "actor",
    "academic",
    "businessperson",
    "chief executive officer",
    "judge",
    "jurist",
    "lawyer",
    "merchant",
    "politician",
    "teacher",
    "writer",
}
LOW_SIGNAL_OCCUPATION_PRIORITY = {
    "chief executive officer": 2,
    "judge": 3,
    "jurist": 3,
    "lawyer": 4,
    "politician": 1,
}
POSITION_MERGE_GAP_DAYS = 14
TRANSITIONAL_POSITION_LABELS = {
    "President-elect of the United States",
}
GENERIC_X_HANDLES = {
    "democrats",
    "federalreserve",
    "gop",
    "housedemocrats",
    "housegop",
    "potus",
    "republicans",
    "senatedems",
    "senategop",
    "twitter",
    "vp",
    "whitehouse",
    "x",
}


def load_payload() -> Dict[str, Any]:
    return json.load(sys.stdin)


def chunked(values: List[str], size: int) -> List[List[str]]:
    return [values[index : index + size] for index in range(0, len(values), size)]


def normalize_name(value: str) -> str:
    cleaned = re.sub(r"\b(Jr|Sr)\.?\b", " ", value, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bII|III|IV|V\b", " ", cleaned)
    cleaned = re.sub(r"[^a-z0-9]+", " ", cleaned.lower())
    return "".join(cleaned.split())


def extract_bioguide_id(image_url: Optional[str]) -> Optional[str]:
    if not image_url:
        return None

    matched = re.search(r"/photo/[A-Z]/([A-Z]\d{6})\.jpg", image_url)
    return matched.group(1) if matched else None


def fetch_json(url: str, params: Dict[str, Any]) -> Dict[str, Any]:
    response = requests.get(url, params=params, headers=REQUEST_HEADERS, timeout=45)
    response.raise_for_status()
    return response.json()


def fetch_text(url: str) -> str:
    response = requests.get(url, headers=REQUEST_HEADERS, timeout=45)
    response.raise_for_status()
    return response.text


def fetch_sparql_rows(query: str) -> List[Dict[str, Any]]:
    payload = fetch_json(SPARQL_URL, {"format": "json", "query": query})
    return payload.get("results", {}).get("bindings", [])


def fetch_legislative_rows(bioguide_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for bioguide_chunk in chunked(bioguide_ids, 80):
        values = " ".join(f'"{item}"' for item in bioguide_chunk)
        query = f"""
SELECT ?bioguide ?person ?birthDate ?schoolLabel ?degreeLabel ?majorLabel WHERE {{
  VALUES ?bioguide {{ {values} }}
  ?person wdt:P1157 ?bioguide .
  OPTIONAL {{ ?person wdt:P569 ?birthDate. }}
  OPTIONAL {{
    ?person p:P69 ?educationStatement .
    ?educationStatement ps:P69 ?school .
    OPTIONAL {{ ?educationStatement pq:P512 ?degree . }}
    OPTIONAL {{ ?educationStatement pq:P812 ?major . }}
  }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def score_search_result(person: Dict[str, Any], item: Dict[str, Any]) -> int:
    label = item.get("label") or ""
    description = (item.get("description") or "").lower()
    score = 0

    if normalize_name(label) == normalize_name(person["name"]):
        score += 100

    if person["branchId"] == "judicial":
        if "supreme court" in description or "justice" in description:
            score += 70
    elif person["branchId"] == "executive":
        title = (person.get("title") or "").lower()
        department = (person.get("department") or "").lower()

        if "vice president" in title and "vice president" in description:
            score += 70
        elif "president" in title and "president of the united states" in description:
            score += 70
        elif "secretary" in title and "secretary" in description:
            score += 55
        elif "chair" in title and ("chair" in description or "chairman" in description):
            score += 55

        if department and any(token for token in department.split() if token in description):
            score += 15

    if item.get("match", {}).get("language") == "en":
        score += 1

    return score


def resolve_non_legislative_entity(person: Dict[str, Any]) -> Optional[str]:
    explicit_id = person.get("wikidataId")
    if explicit_id:
        return explicit_id

    override = NON_LEGISLATIVE_ENTITY_OVERRIDES.get(person["name"])
    if override:
        return override

    search_terms = [
        person["name"],
        f'{person["name"]} {person.get("title", "")}'.strip(),
    ]
    seen_ids = set()
    candidates: List[Tuple[int, str]] = []

    for term in search_terms:
        payload = fetch_json(
            WIKIDATA_SEARCH_URL,
            {
                "action": "wbsearchentities",
                "format": "json",
                "language": "en",
                "limit": 7,
                "search": term,
            },
        )
        for item in payload.get("search", []):
            entity_id = item.get("id")
            if not entity_id or entity_id in seen_ids:
                continue
            seen_ids.add(entity_id)
            candidates.append((score_search_result(person, item), entity_id))

        if candidates:
            best = max(candidates, key=lambda entry: entry[0])
            if best[0] >= 60:
                return best[1]

    if candidates:
        return max(candidates, key=lambda entry: entry[0])[1]

    return None


def fetch_non_legislative_rows(entity_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for entity_chunk in chunked(entity_ids, 60):
        values = " ".join(f"wd:{entity_id}" for entity_id in entity_chunk)
        query = f"""
SELECT ?person ?birthDate ?image ?schoolLabel ?degreeLabel ?majorLabel WHERE {{
  VALUES ?person {{ {values} }}
  OPTIONAL {{ ?person wdt:P569 ?birthDate. }}
  OPTIONAL {{ ?person wdt:P18 ?image. }}
  OPTIONAL {{
    ?person p:P69 ?educationStatement .
    ?educationStatement ps:P69 ?school .
    OPTIONAL {{ ?educationStatement pq:P512 ?degree . }}
    OPTIONAL {{ ?educationStatement pq:P812 ?major . }}
  }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def fetch_legislative_position_rows(bioguide_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for bioguide_chunk in chunked(bioguide_ids, 60):
        values = " ".join(f'"{item}"' for item in bioguide_chunk)
        query = f"""
SELECT ?bioguide ?positionLabel ?positionStart ?positionEnd WHERE {{
  VALUES ?bioguide {{ {values} }}
  ?person wdt:P1157 ?bioguide .
  OPTIONAL {{
    ?person p:P39 ?positionStatement .
    ?positionStatement ps:P39 ?position .
    OPTIONAL {{ ?positionStatement pq:P580 ?positionStart . }}
    OPTIONAL {{ ?positionStatement pq:P582 ?positionEnd . }}
  }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def fetch_non_legislative_position_rows(entity_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for entity_chunk in chunked(entity_ids, 50):
        values = " ".join(f"wd:{entity_id}" for entity_id in entity_chunk)
        query = f"""
SELECT ?person ?positionLabel ?positionStart ?positionEnd WHERE {{
  VALUES ?person {{ {values} }}
  OPTIONAL {{
    ?person p:P39 ?positionStatement .
    ?positionStatement ps:P39 ?position .
    OPTIONAL {{ ?positionStatement pq:P580 ?positionStart . }}
    OPTIONAL {{ ?positionStatement pq:P582 ?positionEnd . }}
  }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def fetch_legislative_occupation_rows(bioguide_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for bioguide_chunk in chunked(bioguide_ids, 80):
        values = " ".join(f'"{item}"' for item in bioguide_chunk)
        query = f"""
SELECT ?bioguide ?occupationLabel WHERE {{
  VALUES ?bioguide {{ {values} }}
  ?person wdt:P1157 ?bioguide .
  OPTIONAL {{ ?person wdt:P106 ?occupation . }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def fetch_legislative_x_rows(bioguide_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for bioguide_chunk in chunked(bioguide_ids, 80):
        values = " ".join(f'"{item}"' for item in bioguide_chunk)
        query = f"""
SELECT ?bioguide ?xHandle WHERE {{
  VALUES ?bioguide {{ {values} }}
  ?person wdt:P1157 ?bioguide .
  OPTIONAL {{ ?person wdt:P2002 ?xHandle . }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def fetch_non_legislative_occupation_rows(entity_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for entity_chunk in chunked(entity_ids, 60):
        values = " ".join(f"wd:{entity_id}" for entity_id in entity_chunk)
        query = f"""
SELECT ?person ?occupationLabel WHERE {{
  VALUES ?person {{ {values} }}
  OPTIONAL {{ ?person wdt:P106 ?occupation . }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def fetch_non_legislative_x_rows(entity_ids: List[str]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for entity_chunk in chunked(entity_ids, 60):
        values = " ".join(f"wd:{entity_id}" for entity_id in entity_chunk)
        query = f"""
SELECT ?person ?xHandle WHERE {{
  VALUES ?person {{ {values} }}
  OPTIONAL {{ ?person wdt:P2002 ?xHandle . }}
}}
"""
        rows.extend(fetch_sparql_rows(query))

    return rows


def parse_date(value: str) -> Optional[date]:
    if not value:
        return None

    try:
        return datetime.strptime(value[:10], "%Y-%m-%d").date()
    except ValueError:
        return None


def compute_age(birth_date: date) -> int:
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))


def degree_rank(value: Optional[str]) -> int:
    if not value:
        return 0

    lower = value.lower()

    if any(token in lower for token in ["doctor", "doctorate", "juris doctor", "phd", "dphil"]):
        return 5
    if any(token in lower for token in ["master", "mba", "m.a.", "m.s.", "ll.m", "llm"]):
        return 4
    if "bachelor" in lower:
        return 3
    if "associate" in lower:
        return 2
    if "high school" in lower or "secondary" in lower:
        return 1

    return 0


def school_rank(value: Optional[str]) -> int:
    if not value:
        return 0

    lower = value.lower()

    if "law school" in lower or "medical school" in lower:
        return 4
    if "graduate school" in lower or "university" in lower:
        return 3
    if "college" in lower:
        return 2
    if "academy" in lower or "high school" in lower or "secondary" in lower:
        return 1

    return 0


def normalize_degree_abbreviation(value: str) -> Optional[str]:
    cleaned = re.sub(r"[^A-Za-z.]", "", value).upper().replace(".", "")
    return DEGREE_ABBREVIATIONS.get(cleaned)


def pick_best_degree(degrees: List[str]) -> Optional[str]:
    normalized = []
    for degree in degrees:
        full_degree = normalize_degree_abbreviation(degree) or degree
        normalized.append(full_degree)

    if not normalized:
        return None

    return max(normalized, key=degree_rank)


def fetch_enwiki_title(entity_id: str) -> Optional[str]:
    payload = fetch_json(
        WIKIDATA_SEARCH_URL,
        {
            "action": "wbgetentities",
            "format": "json",
            "props": "sitelinks",
            "ids": entity_id,
        },
    )
    return (
        payload.get("entities", {})
        .get(entity_id, {})
        .get("sitelinks", {})
        .get("enwiki", {})
        .get("title")
    )


def parse_birth_date_from_text(value: str) -> Optional[str]:
    matched = re.search(MONTH_PATTERN, value)
    if not matched:
        return None

    try:
        return datetime.strptime(matched.group(0), "%B %d, %Y").date().isoformat()
    except ValueError:
        return None


def parse_birth_year_from_text(value: str) -> Optional[int]:
    matched = re.search(r"\b(18|19|20)\d{2}\b", value)
    if not matched:
        return None

    year = int(matched.group(0))
    if 1800 <= year <= 2100:
        return year

    return None


def parse_wikipedia_infobox(entity_id: str) -> Dict[str, Any]:
    title = fetch_enwiki_title(entity_id)
    if not title:
        return {}

    html = fetch_text(f"https://en.wikipedia.org/wiki/{quote(title.replace(' ', '_'))}")
    soup = BeautifulSoup(html, "html.parser")
    infobox = soup.find("table", class_="infobox")

    if infobox is None:
        return {}

    birth_date = None
    birth_year = None
    highest_degree = None
    highest_school = None

    for row in infobox.find_all("tr"):
        header = row.find("th")
        value_cell = row.find("td")

        if header is None or value_cell is None:
            continue

        header_text = " ".join(header.get_text(" ", strip=True).split())
        value_text = " ".join(value_cell.get_text(" ", strip=True).split())

        if header_text == "Born" and not birth_date:
            birth_date = parse_birth_date_from_text(value_text)
            if birth_date:
                birth_year = int(birth_date[:4])
            elif birth_year is None:
                birth_year = parse_birth_year_from_text(value_text)

        if header_text not in {"Education", "Alma mater"}:
            continue

        links = [link.get_text(" ", strip=True) for link in value_cell.find_all("a")]
        degrees = [text for text in links if normalize_degree_abbreviation(text)]
        schools = [text for text in links if text and not normalize_degree_abbreviation(text)]

        degree = pick_best_degree(degrees)
        school = schools[-1] if schools else None

        if degree and (highest_degree is None or degree_rank(degree) > degree_rank(highest_degree)):
            highest_degree = degree
            highest_school = school or highest_school
        elif highest_school is None and school:
            highest_school = school

    result = {}
    if birth_date:
        result["birthDate"] = birth_date
    elif birth_year:
        result["birthYear"] = birth_year
    if highest_degree:
        result["highestDegree"] = highest_degree
    if highest_school:
        result["highestEducationSchool"] = highest_school

    return result


def normalize_role_tokens(value: str) -> List[str]:
    normalized = value.lower().replace("u.s.", "united states")
    tokens = re.findall(r"[a-z0-9]+", normalized)
    stop_words = {"and", "board", "department", "for", "of", "the", "united", "states"}
    replacements = {
        "representatives": "representative",
        "senators": "senator",
    }
    cleaned = []

    for token in tokens:
        if token in stop_words:
            continue
        cleaned.append(replacements.get(token, token))

    return cleaned


def format_career_label(label: str) -> str:
    replacement = CAREER_LABEL_REPLACEMENTS.get(label)
    if replacement:
        return replacement

    if label and label[0].islower():
        return label[0].upper() + label[1:]

    return label


def format_career_date_range(start_date: Optional[str], end_date: Optional[str]) -> Optional[str]:
    start_year = start_date[:4] if start_date else None
    end_year = end_date[:4] if end_date else None

    if start_year and end_year:
        return start_year if start_year == end_year else f"{start_year}-{end_year}"
    if start_year and not end_year:
        return f"{start_year}-present"
    if end_year and not start_year:
        return f"through {end_year}"

    return None


def summarize_career_record(record: Dict[str, Any]) -> str:
    label = format_career_label(record["label"])
    date_range = format_career_date_range(record.get("startDate"), record.get("endDate"))
    return f"{label} ({date_range})" if date_range else label


def build_name_token_info(name: str) -> Dict[str, Any]:
    tokens = re.sub(r"[^a-z0-9]+", " ", name.lower()).split()
    return {
        "compact": "".join(tokens),
        "first": tokens[0] if tokens else "",
        "given_names": "".join(tokens[:-1]) if len(tokens) > 1 else "",
        "initials": "".join(token[0] for token in tokens),
        "last": tokens[-1] if tokens else "",
    }


def is_institutional_x_handle(handle: str, person: Dict[str, Any], token_info: Dict[str, Any]) -> bool:
    if handle in GENERIC_X_HANDLES:
        return True

    signals = [
        token_info["last"],
        token_info["first"] if len(token_info["first"]) >= 3 else "",
        token_info["given_names"] if len(token_info["given_names"]) >= 2 else "",
        token_info["initials"] if len(token_info["initials"]) >= 2 else "",
    ]
    has_name_signal = any(signal and signal in handle for signal in signals)

    if has_name_signal:
        return False

    if re.search(
        r"(committee|congress|dems|democrats|gop|house|judiciary|office|press|republicans|senate|whitehouse)",
        handle,
    ):
        return True

    if person.get("branchId") == "executive" and re.search(r"(gov|policy|press|staff|team)", handle):
        return True

    return False


def score_x_handle(person: Dict[str, Any], handle: str) -> int:
    token_info = build_name_token_info(person["name"])

    if not handle or is_institutional_x_handle(handle, person, token_info):
        return -100

    score = 0

    if token_info["compact"] and token_info["compact"] in handle:
        score += 12
    if token_info["last"] and token_info["last"] in handle:
        score += 7
    if len(token_info["first"]) >= 3 and token_info["first"] in handle:
        score += 3
    if len(token_info["given_names"]) >= 2 and token_info["given_names"] in handle:
        score += 4
    if len(token_info["initials"]) >= 2 and token_info["initials"] in handle:
        score += 2

    if re.match(r"^(rep|sen|speaker|sec|secretary|ag|judge|justice|gov|potus|vp|leader)", handle):
        score += 1
    if person.get("sectionId") == "house" and handle.startswith("rep"):
        score += 2
    if person.get("sectionId") == "senate" and (handle.startswith("sen") or handle.startswith("leader")):
        score += 2
    if person.get("branchId") == "executive" and re.match(r"^(potus|president|sec|vp|ag)", handle):
        score += 2

    if "press" in handle:
        score -= 2

    return score


def choose_best_x_url(person: Dict[str, Any], handles: List[str]) -> Optional[str]:
    unique_handles = []
    seen = set()

    for handle in handles:
        normalized = (handle or "").strip().lstrip("@")
        if not normalized:
            continue
        normalized_lower = normalized.lower()
        if normalized_lower in seen:
            continue
        seen.add(normalized_lower)
        unique_handles.append(normalized)

    if not unique_handles:
        return None

    scored_candidates = sorted(
        (
            {
                "handle": handle,
                "score": score_x_handle(person, handle.lower()),
            }
            for handle in unique_handles
        ),
        key=lambda item: (-item["score"], item["handle"].lower()),
    )

    best = scored_candidates[0]
    second = scored_candidates[1] if len(scored_candidates) > 1 else None

    if best["score"] < 1:
        return None

    if second and best["score"] == second["score"] and best["score"] < 8:
        return None

    return f'https://x.com/{best["handle"]}'


def build_x_background(
    rows: List[Dict[str, Any]], key_name: str, person_lookup: Dict[str, Dict[str, Any]]
) -> Dict[str, Dict[str, Any]]:
    handles_by_key: Dict[str, List[str]] = defaultdict(list)

    for row in rows:
        key_value = row.get(key_name, {}).get("value")
        handle = row.get("xHandle", {}).get("value")
        if key_value and handle:
            handles_by_key[key_value].append(handle)

    result: Dict[str, Dict[str, Any]] = {}

    for key_value, person in person_lookup.items():
        best_x_url = choose_best_x_url(person, handles_by_key.get(key_value, []))
        if best_x_url:
            result[key_value] = {"xUrl": best_x_url}

    return result


def collapse_position_records(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    grouped: Dict[str, List[Dict[str, Any]]] = defaultdict(list)

    for record in records:
        label = record.get("label")
        if not label:
            continue
        grouped[label].append(record)

    collapsed_records: List[Dict[str, Any]] = []

    for label, label_records in grouped.items():
        sorted_records = sorted(
            label_records,
            key=lambda item: (item.get("startDate") or "", item.get("endDate") or ""),
        )
        merged: List[Dict[str, Any]] = []

        for record in sorted_records:
            candidate = {
                "category": "position",
                "label": label,
                "startDate": record.get("startDate"),
                "endDate": record.get("endDate"),
                "isCurrent": not record.get("endDate"),
            }

            if not merged:
                merged.append(candidate)
                continue

            previous = merged[-1]
            previous_end = parse_date(previous.get("endDate")) if previous.get("endDate") else None
            current_start = parse_date(candidate.get("startDate")) if candidate.get("startDate") else None

            if previous_end and current_start:
                gap_days = (current_start - previous_end).days
                if 0 <= gap_days <= POSITION_MERGE_GAP_DAYS:
                    previous["startDate"] = previous.get("startDate") or candidate.get("startDate")
                    previous["endDate"] = candidate.get("endDate")
                    previous["isCurrent"] = not candidate.get("endDate")
                    continue

            if (
                not previous.get("startDate")
                and not previous.get("endDate")
                and not candidate.get("startDate")
                and not candidate.get("endDate")
            ):
                continue

            merged.append(candidate)

        collapsed_records.extend(merged)

    return collapsed_records


def is_current_like_position(record: Dict[str, Any], person: Dict[str, Any]) -> bool:
    if not record.get("isCurrent"):
        return False

    label = record.get("label") or ""

    if person.get("branchId") == "legislative" and label in {
        "United States senator",
        "member of the United States House of Representatives",
    }:
        return True

    position_tokens = set(normalize_role_tokens(label))
    title_tokens = set(normalize_role_tokens(person.get("title") or ""))

    if not position_tokens or not title_tokens:
        return False

    overlap = position_tokens & title_tokens
    return bool(overlap) and (position_tokens <= title_tokens or title_tokens <= position_tokens)


def pick_occupation_records(occupation_labels: List[str], limit: int) -> List[Dict[str, Any]]:
    unique_labels: List[str] = []
    seen = set()

    for label in occupation_labels:
        normalized = label.lower()
        if not label or normalized in seen:
            continue
        seen.add(normalized)
        unique_labels.append(label)

    if not unique_labels:
        return []

    preferred = [label for label in unique_labels if label.lower() not in LOW_SIGNAL_OCCUPATIONS]
    if preferred:
        candidates = sorted(preferred, key=lambda item: (item.count(" "), len(item)), reverse=True)
    else:
        candidates = sorted(
            unique_labels,
            key=lambda item: (
                LOW_SIGNAL_OCCUPATION_PRIORITY.get(item.lower(), 0),
                item.count(" "),
                len(item),
            ),
            reverse=True,
        )
        limit = min(limit, 1)

    return [
        {
            "category": "occupation",
            "label": format_career_label(label),
            "summary": format_career_label(label),
        }
        for label in candidates[:limit]
    ]


def build_career_background(
    position_rows: List[Dict[str, Any]],
    occupation_rows: List[Dict[str, Any]],
    key_name: str,
    person_lookup: Dict[str, Dict[str, Any]],
) -> Dict[str, Dict[str, Any]]:
    positions_by_key: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    occupations_by_key: Dict[str, List[str]] = defaultdict(list)

    for row in position_rows:
        key_value = row.get(key_name, {}).get("value")
        label = row.get("positionLabel", {}).get("value")

        if not key_value or not label:
            continue

        start_date = parse_date(row.get("positionStart", {}).get("value", ""))
        end_date = parse_date(row.get("positionEnd", {}).get("value", ""))
        positions_by_key[key_value].append(
            {
                "label": label,
                "startDate": start_date.isoformat() if start_date else None,
                "endDate": end_date.isoformat() if end_date else None,
            }
        )

    for row in occupation_rows:
        key_value = row.get(key_name, {}).get("value")
        label = row.get("occupationLabel", {}).get("value")

        if key_value and label:
            occupations_by_key[key_value].append(label)

    result: Dict[str, Dict[str, Any]] = {}

    for key_value, person in person_lookup.items():
        collapsed_positions = collapse_position_records(positions_by_key.get(key_value, []))
        collapsed_positions = [
            record
            for record in collapsed_positions
            if record.get("label") not in TRANSITIONAL_POSITION_LABELS
        ]

        filtered_positions = [
            record
            for record in collapsed_positions
            if record.get("label", "").lower() not in GENERIC_POSITION_LABELS
        ]
        if filtered_positions:
            collapsed_positions = filtered_positions

        display_positions = [
            record for record in collapsed_positions if not is_current_like_position(record, person)
        ]
        if not display_positions:
            display_positions = collapsed_positions

        display_positions = sorted(
            display_positions,
            key=lambda item: (
                1 if item.get("isCurrent") else 0,
                item.get("endDate") or item.get("startDate") or "",
                item.get("startDate") or "",
                item.get("label") or "",
            ),
            reverse=True,
        )

        career_history = []
        for record in display_positions[:4]:
            summary = summarize_career_record(record)
            career_history.append(
                {
                    **record,
                    "label": format_career_label(record["label"]),
                    "summary": summary,
                }
            )

        if not career_history:
            occupation_records = pick_occupation_records(
                occupations_by_key.get(key_value, []),
                limit=2,
            )
            career_history.extend(occupation_records)

        deduped_history = []
        seen_summaries = set()
        for record in career_history:
            summary = record["summary"]
            if summary in seen_summaries:
                continue
            seen_summaries.add(summary)
            deduped_history.append(record)

        if deduped_history:
            result[key_value] = {"careerHistory": deduped_history}

    return result


def summarize_record(school: str, degree: Optional[str], field: Optional[str]) -> str:
    if degree and field:
        return f"{degree} in {field}, {school}"
    if degree:
        return f"{degree}, {school}"
    if field:
        return f"{field}, {school}"
    return school


def pick_highest_education(records: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    cleaned_records = []

    for record in records:
        school = (record.get("school") or "").strip()
        if not school or school.lower() in GENERIC_SCHOOL_LABELS:
            continue

        degree = (record.get("degree") or "").strip() or None
        field = (record.get("field") or "").strip() or None
        cleaned_records.append(
            {
                "degree": degree,
                "field": field,
                "school": school,
                "summary": summarize_record(school, degree, field),
            }
        )

    if not cleaned_records:
        return None

    return max(
        cleaned_records,
        key=lambda item: (
            degree_rank(item.get("degree")),
            school_rank(item.get("school")),
            1 if item.get("field") else 0,
            len(item.get("school") or ""),
        ),
    )


def build_background_rows(
    rows: List[Dict[str, Any]], key_name: str
) -> Dict[str, Dict[str, Any]]:
    grouped: Dict[str, Dict[str, Any]] = {}

    for row in rows:
        key_value = row.get(key_name, {}).get("value")
        if not key_value:
            continue

        item = grouped.setdefault(key_value, {"birthDate": None, "records": defaultdict(set)})

        birth_date = row.get("birthDate", {}).get("value")
        if birth_date and not item["birthDate"]:
            item["birthDate"] = birth_date

        image_url = row.get("image", {}).get("value")
        if image_url and not item.get("imageUrl"):
            item["imageUrl"] = image_url

        school = row.get("schoolLabel", {}).get("value")
        degree = row.get("degreeLabel", {}).get("value")
        major = row.get("majorLabel", {}).get("value")

        if school:
            record_key = (school, degree or "")
            if major:
                item["records"][record_key].add(major)
            else:
                item["records"][record_key]

    result: Dict[str, Dict[str, Any]] = {}

    for key_value, item in grouped.items():
        education_records = []

        for (school, degree), majors in item["records"].items():
            education_records.append(
                {
                    "degree": degree or None,
                    "field": ", ".join(sorted(majors)) if majors else None,
                    "school": school,
                }
            )

        birth_date = parse_date(item["birthDate"]) if item.get("birthDate") else None
        highest_education = pick_highest_education(education_records)

        result[key_value] = {
            "birthDate": birth_date.isoformat() if birth_date else None,
            "birthYear": birth_date.year if birth_date else None,
            "education": [
                {
                    "degree": record.get("degree"),
                    "field": record.get("field"),
                    "school": record["school"],
                    "summary": summarize_record(record["school"], record.get("degree"), record.get("field")),
                }
                for record in education_records
                if record.get("school")
            ],
            "highestDegree": highest_education.get("degree") if highest_education else None,
            "highestEducationField": highest_education.get("field") if highest_education else None,
            "highestEducationSchool": highest_education.get("school") if highest_education else None,
            "imageUrl": item.get("imageUrl"),
        }

    return result


def main() -> None:
    payload = load_payload()
    people = payload.get("people", [])
    legislative_people = []
    non_legislative_people = []

    for person in people:
        bioguide_id = extract_bioguide_id(person.get("imageUrl"))
        if person.get("branchId") == "legislative" and bioguide_id:
            legislative_people.append({**person, "bioguideId": bioguide_id})
        else:
            non_legislative_people.append(person)

    legislative_rows = fetch_legislative_rows([person["bioguideId"] for person in legislative_people])
    legislative_background = build_background_rows(legislative_rows, "bioguide")
    legislative_position_rows = fetch_legislative_position_rows(
        [person["bioguideId"] for person in legislative_people]
    )
    legislative_occupation_rows = fetch_legislative_occupation_rows(
        [person["bioguideId"] for person in legislative_people]
    )
    legislative_x_rows = fetch_legislative_x_rows([person["bioguideId"] for person in legislative_people])
    legislative_career = build_career_background(
        legislative_position_rows,
        legislative_occupation_rows,
        "bioguide",
        {person["bioguideId"]: person for person in legislative_people},
    )
    legislative_x = build_x_background(
        legislative_x_rows,
        "bioguide",
        {person["bioguideId"]: person for person in legislative_people},
    )

    non_legislative_entity_map = {}
    for person in non_legislative_people:
        entity_id = resolve_non_legislative_entity(person)
        if entity_id:
            non_legislative_entity_map[person["id"]] = entity_id

    non_legislative_rows = fetch_non_legislative_rows(list(set(non_legislative_entity_map.values())))
    non_legislative_background = build_background_rows(non_legislative_rows, "person")
    non_legislative_position_rows = fetch_non_legislative_position_rows(
        list(set(non_legislative_entity_map.values()))
    )
    non_legislative_occupation_rows = fetch_non_legislative_occupation_rows(
        list(set(non_legislative_entity_map.values()))
    )
    non_legislative_x_rows = fetch_non_legislative_x_rows(list(set(non_legislative_entity_map.values())))
    entity_url_to_id = {
        f"http://www.wikidata.org/entity/{entity_id}": person_id
        for person_id, entity_id in non_legislative_entity_map.items()
    }
    non_legislative_people_by_entity_url = {
        f"http://www.wikidata.org/entity/{entity_id}": next(
            person for person in non_legislative_people if person["id"] == person_id
        )
        for person_id, entity_id in non_legislative_entity_map.items()
    }
    non_legislative_career = build_career_background(
        non_legislative_position_rows,
        non_legislative_occupation_rows,
        "person",
        non_legislative_people_by_entity_url,
    )
    non_legislative_x = build_x_background(
        non_legislative_x_rows,
        "person",
        non_legislative_people_by_entity_url,
    )

    results: Dict[str, Dict[str, Any]] = {}

    for person in legislative_people:
        item = {
            **legislative_background.get(person["bioguideId"], {}),
            **legislative_career.get(person["bioguideId"], {}),
            **legislative_x.get(person["bioguideId"], {}),
        }
        if item:
            results[person["id"]] = {key: value for key, value in item.items() if value}

    for entity_url, item in non_legislative_background.items():
        person_id = entity_url_to_id.get(entity_url)
        if person_id:
            merged = {
                **non_legislative_x.get(entity_url, {}),
                **non_legislative_career.get(entity_url, {}),
                **item,
            }
            results[person_id] = {key: value for key, value in merged.items() if value}

    for entity_url, item in non_legislative_career.items():
        person_id = entity_url_to_id.get(entity_url)
        if person_id and person_id not in results:
            results[person_id] = {key: value for key, value in item.items() if value}

    for entity_url, item in non_legislative_x.items():
        person_id = entity_url_to_id.get(entity_url)
        if person_id and person_id not in results:
            results[person_id] = {key: value for key, value in item.items() if value}

    for person in people:
        override_x_url = MANUAL_X_URL_OVERRIDES.get(person["name"])
        if not override_x_url:
            continue

        results[person["id"]] = {
            **results.get(person["id"], {}),
            "xUrl": override_x_url,
        }

    fallback_entity_map = dict(non_legislative_entity_map)

    for person in people:
        current = results.get(person["id"], {})
        needs_birth = not current.get("birthDate") and not current.get("birthYear")
        needs_school = not current.get("highestEducationSchool")

        if not needs_birth and not needs_school:
            continue

        if person["id"] in fallback_entity_map:
            continue

        entity_id = resolve_non_legislative_entity(person)
        if entity_id:
            fallback_entity_map[person["id"]] = entity_id

    for person_id, entity_id in fallback_entity_map.items():
        current = results.get(person_id, {})
        if (current.get("birthDate") or current.get("birthYear")) and current.get("highestEducationSchool"):
            continue

        fallback = parse_wikipedia_infobox(entity_id)
        if not fallback:
            continue

        results[person_id] = {
            **fallback,
            **current,
        }

    people_by_id = {person["id"]: person for person in people}
    for person_id, person in people_by_id.items():
        if results.get(person_id, {}).get("birthDate") or results.get(person_id, {}).get("birthYear"):
            continue

        override_year = MANUAL_BIRTH_YEAR_OVERRIDES.get(person["name"])
        if override_year:
            results[person_id] = {
                **results.get(person_id, {}),
                "birthYear": override_year,
            }

    json.dump(results, sys.stdout)


if __name__ == "__main__":
    main()
