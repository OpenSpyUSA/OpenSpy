#!/usr/bin/env python3

import csv
import json
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime
from functools import lru_cache
from io import BytesIO, StringIO
from typing import Any, Dict, List, Optional
from zipfile import ZipFile

import requests
from bs4 import BeautifulSoup
from pypdf import PdfReader


REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

HOUSE_SEARCH_URL = "https://disclosures-clerk.house.gov/FinancialDisclosure/ViewMemberSearchResult"
HOUSE_BASE_URL = "https://disclosures-clerk.house.gov/"
HOUSE_FINANCIAL_DISCLOSURE_INDEX_URL_TEMPLATE = (
    "https://disclosures-clerk.house.gov/public_disc/financial-pdfs/{year}FD.zip"
)
SENATE_HOME_URL = "https://efdsearch.senate.gov/search/home/"
SENATE_SEARCH_URL = "https://efdsearch.senate.gov/search/"
SENATE_DATA_URL = "https://efdsearch.senate.gov/search/report/data/"
MONTH_PATTERN = (
    r"(?:January|February|March|April|May|June|July|August|September|October|November|December|Ongoing)"
)
TOP_HOLDINGS_DEFAULT_COUNT = 5
TOP_HOLDINGS_EXTENSION_THRESHOLD = 1_000_000
TOP_HOLDINGS_MIN_DISPLAY_UPPER_BOUND = 15_001
HOUSE_OWNER_CODE_LABELS = {
    "DC": "Child",
    "JT": "Joint",
    "SP": "Spouse",
}
HOUSE_FULL_DISCLOSURE_INDEX_FILING_TYPES = {"O", "H"}
HOUSE_OWNER_CODE_PATTERN = "|".join(sorted(HOUSE_OWNER_CODE_LABELS))
MANUAL_SENATE_ANNUAL_OVERRIDES: Dict[str, Dict[str, str]] = {
    "senate-shelley-moore-capito": {
        "filedAt": "05/12/2025",
        "url": "https://efdsearch.senate.gov/search/view/annual/56ff880c-f3ce-468c-99cd-a65364d4a0ad/",
    },
    "senate-tammy-duckworth": {
        "filedAt": "07/31/2025",
        "url": "https://efdsearch.senate.gov/search/view/annual/04a80b6d-cfca-4892-8926-b6ef44fdcf29/",
    }
}
HOUSE_ASSET_CODE_PATTERN = r"[A-Z0-9]{2}"
HOUSE_HOLDING_CONTEXT_PATTERN = re.compile(
    r"\b(?:IRA|ACCOUNT|PENSION|401\(K\)|ANNUITY|BROKERAGE|PORTFOLIO|CASH)\b",
    re.IGNORECASE,
)


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def strip_diacritics(value: str) -> str:
    return unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")


def normalize_search_name(value: Optional[str]) -> str:
    if not value:
        return ""

    cleaned = strip_diacritics(value)
    cleaned = re.sub(r"\b(Jr|Sr)\.?\b", " ", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bII|III|IV|V\b", " ", cleaned)
    cleaned = re.sub(r"[^A-Za-z\s.'-]", " ", cleaned)
    return normalize_space(cleaned)


def clean_pdf_text(value: str) -> str:
    return "".join(ch if (ch == "\n" or 32 <= ord(ch) < 127) else " " for ch in value)


def date_to_sort_key(value: Optional[str]) -> tuple:
    if not value:
        return (0, "")

    for pattern in ("%m/%d/%Y", "%m/%d/%y"):
        try:
            return (1, datetime.strptime(value, pattern).strftime("%Y-%m-%d"))
        except ValueError:
            continue

    return (0, value)


def parse_value_upper_bound(value: Optional[str]) -> int:
    if not value:
        return 0

    cleaned = value.replace(",", "")
    numbers = [int(match) for match in re.findall(r"\$([0-9]+)", cleaned)]

    if "Over $" in value and numbers:
        return numbers[-1] * 2

    if numbers:
        return max(numbers)

    return 0


def parse_value_lower_bound(value: Optional[str]) -> int:
    if not value:
        return 0

    cleaned = value.replace(",", "")
    numbers = [int(match) for match in re.findall(r"\$([0-9]+)", cleaned)]

    if not numbers:
        return 0

    if "Over $" in value:
        return numbers[0] + 1

    return numbers[0]


def select_top_holdings(entries: List[Dict[str, str]]) -> List[Dict[str, str]]:
    filtered_entries = [
        entry
        for entry in entries
        if parse_value_upper_bound(entry.get("value")) >= TOP_HOLDINGS_MIN_DISPLAY_UPPER_BOUND
    ]
    sorted_entries = sorted(
        filtered_entries,
        key=lambda entry: (-parse_value_upper_bound(entry["value"]), entry["label"]),
    )

    if len(sorted_entries) <= TOP_HOLDINGS_DEFAULT_COUNT:
        return sorted_entries

    selected = list(sorted_entries[:TOP_HOLDINGS_DEFAULT_COUNT])

    for entry in sorted_entries[TOP_HOLDINGS_DEFAULT_COUNT:]:
        if parse_value_lower_bound(entry["value"]) > TOP_HOLDINGS_EXTENSION_THRESHOLD:
            selected.append(entry)
            continue
        break

    return selected


def normalize_owner_label(value: Optional[str], default: Optional[str] = None) -> Optional[str]:
    normalized = normalize_space(value or "")
    if not normalized:
        return default

    upper = normalized.upper()

    if upper in HOUSE_OWNER_CODE_LABELS:
        return HOUSE_OWNER_CODE_LABELS[upper]
    if upper in {"SELF", "FILER"}:
        return "Self"
    if upper == "JOINT":
        return "Joint"
    if "SPOUSE" in upper:
        return "Spouse"
    if "CHILD" in upper or "DEPENDENT" in upper:
        return "Child"
    if "JOINT" in upper:
        return "Joint"

    return normalized


def make_holding_dedupe_key(entry: Dict[str, str]) -> str:
    owner = normalize_owner_label(entry.get("owner"), default="Self") or "Self"
    return f"{owner}|{entry['label']}"


def should_merge_house_holding_prefix(line: str, next_line: str) -> bool:
    current = normalize_space(line)
    following = normalize_space(next_line)

    if not current or "[" in current or "]" in current:
        return False

    if "[" not in following or "]" not in following:
        return False

    if "$" in current or current.startswith(("L :", "D :", "Asset Owner", "Filing ID", "#", "* ")):
        return False

    word_count = len(current.split())

    if following.startswith("["):
        return True

    if HOUSE_HOLDING_CONTEXT_PATTERN.search(current) and word_count <= 5:
        return False

    return word_count >= 4 or len(current) >= 24


def load_json_stdin() -> Dict[str, Any]:
    return json.load(sys.stdin)


def fetch_text(
    url: str,
    method: str = "GET",
    data: Optional[Dict[str, Any]] = None,
    session=None,
    headers: Optional[Dict[str, str]] = None,
) -> str:
    requester = session or requests
    response = requester.request(
        method,
        url,
        data=data,
        headers={**REQUEST_HEADERS, **(headers or {})},
        timeout=30,
    )
    response.raise_for_status()
    return response.text


def fetch_pdf_text(url: str) -> str:
    response = requests.get(url, headers=REQUEST_HEADERS, timeout=40)
    response.raise_for_status()
    reader = PdfReader(BytesIO(response.content))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    return clean_pdf_text(text)


def build_house_search_years() -> List[int]:
    current_year = date.today().year
    return [current_year, current_year - 1, current_year - 2]


def build_house_query(person: Dict[str, Any], filing_year: int) -> Dict[str, str]:
    last_name = (
        person.get("financialDisclosureSearchLastName")
        or person.get("financialDisclosureSearchHint")
        or person["name"].split()[-1]
    )
    return {
        "LastName": last_name,
        "FilingYear": str(filing_year),
        "State": person.get("stateCode") or "",
        "District": "",
    }


def parse_house_search_rows(html: str) -> List[Dict[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    rows: List[Dict[str, str]] = []

    for tr in soup.select("tbody tr"):
        cells = [normalize_space(td.get_text(" ", strip=True)) for td in tr.find_all("td")]
        anchor = tr.find("a")

        if len(cells) < 4 or anchor is None or not anchor.get("href"):
            continue

        rows.append(
            {
                "name": cells[0],
                "office": cells[1],
                "filingYear": cells[2],
                "filingType": cells[3],
                "url": requests.compat.urljoin(HOUSE_BASE_URL, anchor["href"]),
            }
        )

    return rows


def is_house_full_disclosure_search_row(row: Dict[str, str]) -> bool:
    filing_type = normalize_space(row.get("filingType", ""))
    return filing_type.startswith("FD") or filing_type == "New Filer"


def parse_house_holdings(text: str) -> List[Dict[str, str]]:
    lines = [normalize_space(line) for line in text.splitlines() if normalize_space(line)]
    start_index = None
    end_index = None

    for index, line in enumerate(lines):
        if line.startswith("Asset Owner Value of Asset"):
            start_index = index + 2
            break

    for index, line in enumerate(lines):
        if "Creditor Date Incurred Type Amount of" in line:
            end_index = index
            break

    if start_index is None:
        return []

    content_lines = lines[start_index:end_index]
    entries: List[Dict[str, str]] = []
    pattern = re.compile(
        rf"^(?P<asset>.+?\[{HOUSE_ASSET_CODE_PATTERN}\])(?:\s+(?P<owner>{HOUSE_OWNER_CODE_PATTERN}))?\s+"
        r"(?P<value>None|Undetermined|\$[0-9,]+(?:\s*-\s*|\s+)(?:\$[0-9,]+|Over \$[0-9,]+))"
    )

    index = 0
    while index < len(content_lines):
        line = content_lines[index]

        if line.startswith(("L :", "D :", "Asset Owner", "Filing ID", "#", "$1,000?")):
            index += 1
            continue

        candidate = None
        consumed = 1

        if "[" in line and "]" in line:
            candidate = line
        elif index + 1 < len(content_lines) and should_merge_house_holding_prefix(
            line, content_lines[index + 1]
        ):
            candidate = f"{line} {content_lines[index + 1]}"
            consumed = 2

        if candidate is None:
            index += 1
            continue

        matched = pattern.match(candidate)

        if matched is None:
            for extra in range(consumed, min(consumed + 3, len(content_lines) - index)):
                candidate = f"{candidate} {content_lines[index + extra]}"
                matched = pattern.match(candidate)
                if matched:
                    consumed = extra + 1
                    break

        if matched:
            entries.append(
                {
                    "label": normalize_space(matched.group("asset")),
                    "owner": normalize_owner_label(matched.group("owner"), default="Self"),
                    "value": normalize_space(matched.group("value")),
                }
            )

        index += consumed

    deduped: Dict[str, Dict[str, str]] = {}
    for entry in entries:
        dedupe_key = make_holding_dedupe_key(entry)
        existing = deduped.get(dedupe_key)
        if existing is None or parse_value_upper_bound(entry["value"]) > parse_value_upper_bound(existing["value"]):
            deduped[dedupe_key] = entry

    return sorted(
        deduped.values(),
        key=lambda entry: (-parse_value_upper_bound(entry["value"]), entry["label"]),
    )


def parse_house_liabilities(text: str) -> List[Dict[str, str]]:
    lines = [normalize_space(line) for line in text.splitlines() if normalize_space(line)]
    start_index = None
    end_index = None

    for index, line in enumerate(lines):
        if "Creditor Date Incurred Type Amount of" in line:
            start_index = index + 2
            break

    if start_index is None:
        return []

    for index in range(start_index, len(lines)):
        if lines[index].startswith("Position Name of Organization"):
            end_index = index
            break

    content_lines = lines[start_index:end_index]
    rows: List[Dict[str, str]] = []
    line_pattern = re.compile(
        rf"^(?:(?P<owner>{HOUSE_OWNER_CODE_PATTERN})\s+)?(?P<creditor>.+?)\s+"
        rf"(?P<incurred>(?:{MONTH_PATTERN}\s+\d{{4}}|Ongoing))\s*"
        r"(?P<type>.+)$"
    )

    index = 0
    while index < len(content_lines):
        line = content_lines[index]
        if line.startswith(("Position Name of Organization", "Owner Creditor Date Incurred Type Amount of")):
            index += 1
            continue

        description = line
        consumed = 1

        while index + consumed < len(content_lines) and not content_lines[index + consumed].startswith("$"):
            if re.match(r"^[A-Z]{2}\s+", content_lines[index + consumed]):
                break
            description = f"{description} {content_lines[index + consumed]}"
            consumed += 1

        amount_prefix_match = re.search(r"(\$[0-9,]+\s*-\s*)$", description)
        amount_prefix = amount_prefix_match.group(1) if amount_prefix_match else ""
        description = re.sub(r"\s+\$[0-9,]+\s*-\s*$", "", description)
        amount_parts: List[str] = []
        while index + consumed < len(content_lines) and content_lines[index + consumed].startswith("$"):
            amount_parts.append(content_lines[index + consumed])
            consumed += 1

        matched = line_pattern.match(description)
        amount = normalize_space(f"{amount_prefix} {' '.join(amount_parts)}")

        if matched and amount:
            rows.append(
                {
                    "creditor": normalize_space(matched.group("creditor")),
                    "owner": normalize_owner_label(matched.group("owner"), default="Self"),
                    "type": normalize_space(matched.group("type")),
                    "amount": amount,
                }
            )

        index += consumed

    return rows


def parse_house_filing_date(text: str) -> Optional[str]:
    matched = re.search(r"Filing Date:\s*([0-9]{2}/[0-9]{2}/[0-9]{4})", text)
    return matched.group(1) if matched else None


def parse_house_ptr_trades(text: str, source_url: str) -> List[Dict[str, str]]:
    lines = [normalize_space(line) for line in text.splitlines() if normalize_space(line)]
    trades: List[Dict[str, str]] = []
    meta_pattern = re.compile(
        r"^(?P<type>.+?)\s+"
        r"(?P<transactionDate>[0-9]{2}/[0-9]{2}/[0-9]{4})"
        r"(?P<notificationDate>[0-9]{2}/[0-9]{2}/[0-9]{4})"
        r"(?P<amount>None|\$[0-9,]+(?:\s*-\s*|\s+)(?:\$[0-9,]+|Over \$[0-9,]+))"
    )
    skipped_prefixes = (
        "ID Owner Asset Transaction",
        "Type",
        "Date Notification",
        "Date",
        "Amount Cap.",
        "Gains >",
        "$200?",
        "Filing ID #",
        "F S :",
        "S O :",
        "D :",
        "I V D",
        "I P O",
        "C S",
        "* For the complete list",
        "Digitally Signed:",
        "Yes",
        "No",
    )

    index = 0
    while index < len(lines):
        line = lines[index]

        if line.startswith(skipped_prefixes):
            index += 1
            continue

        owner_match = re.match(rf"^(?:(?P<owner>{HOUSE_OWNER_CODE_PATTERN})\s+)?(?P<asset>.+)$", line)
        if owner_match is None:
            index += 1
            continue

        owner = normalize_owner_label(owner_match.group("owner"), default="Self")
        consumed = 1
        candidate_lines = [normalize_space(owner_match.group("asset"))]
        matched = None
        asset_line = candidate_lines[0]

        while index + consumed <= len(lines) and consumed <= 4:
            combined = normalize_space(" ".join(candidate_lines))
            split_match = re.match(
                rf"^(?P<asset>.+?\[{HOUSE_ASSET_CODE_PATTERN}\])\s+(?P<meta>.+)$",
                combined,
            )
            if split_match:
                meta_candidate = split_match.group("meta")
                matched = meta_pattern.match(meta_candidate)
                if matched:
                    asset_line = normalize_space(split_match.group("asset"))
                    break

            if index + consumed >= len(lines):
                break

            next_line = lines[index + consumed]
            if next_line.startswith(skipped_prefixes):
                break

            candidate_lines.append(next_line)
            consumed += 1

        if matched:
            trade_type = normalize_space(matched.group("type"))
            if trade_type == "P":
                trade_type = "Purchase"
            elif trade_type.startswith("S"):
                trade_type = trade_type.replace("S", "Sale", 1)
            trades.append(
                {
                    "assetName": asset_line,
                    "amount": normalize_space(matched.group("amount")),
                    "date": matched.group("transactionDate"),
                    "owner": owner,
                    "type": trade_type,
                    "sourceUrl": source_url,
                }
            )

        index += max(consumed, 1)

    return trades


def build_house_state_district_code(person: Dict[str, Any]) -> Optional[str]:
    state_code = person.get("stateCode")
    district = normalize_space(str(person.get("district") or ""))

    if not state_code or not district:
        return None

    district_lower = district.lower()
    if district_lower in {"at-large", "at large"}:
        district_number = 0
    else:
        matched = re.search(r"(\d+)", district_lower)
        if not matched:
            return None
        district_number = int(matched.group(1))

    return f"{state_code}{district_number:02d}"


def build_house_name_variants(person: Dict[str, Any]) -> List[str]:
    variants: List[str] = []

    for value in [
        person.get("financialDisclosureSearchName"),
        person.get("officialName"),
        person.get("displayName"),
        person.get("name"),
        *(person.get("aliases") or []),
    ]:
        normalized_value = normalize_search_name(value)
        if normalized_value and normalized_value not in variants:
            variants.append(normalized_value)

    return variants


def tokenize_house_name(value: str) -> List[str]:
    return [token for token in normalize_search_name(value).lower().split() if token]


@lru_cache(maxsize=4)
def fetch_house_fd_index_rows(year: int) -> List[Dict[str, str]]:
    response = requests.get(
        HOUSE_FINANCIAL_DISCLOSURE_INDEX_URL_TEMPLATE.format(year=year),
        headers=REQUEST_HEADERS,
        timeout=30,
    )
    response.raise_for_status()

    with ZipFile(BytesIO(response.content)) as archive:
        with archive.open(f"{year}FD.txt") as handle:
            text = handle.read().decode("utf-8-sig")

    return list(csv.DictReader(StringIO(text), delimiter="\t"))


def find_house_annual_row_from_index(person: Dict[str, Any], year: int) -> Optional[Dict[str, str]]:
    target_state_district = build_house_state_district_code(person)
    if not target_state_district:
        return None

    name_variants = build_house_name_variants(person)
    if not name_variants:
        return None

    matches: List[Dict[str, str]] = []

    try:
        index_rows = fetch_house_fd_index_rows(year)
    except Exception:
        return None

    for row in index_rows:
        if row.get("FilingType") not in HOUSE_FULL_DISCLOSURE_INDEX_FILING_TYPES:
            continue
        if row.get("StateDst") != target_state_district:
            continue

        row_tokens = set(tokenize_house_name(f"{row.get('First', '')} {row.get('Last', '')}"))
        if not row_tokens:
            continue

        for variant in name_variants:
            variant_tokens = tokenize_house_name(variant)
            if len(variant_tokens) < 2:
                continue
            if all(token in row_tokens for token in variant_tokens):
                matches.append(
                    {
                        "filedAt": row.get("FilingDate", ""),
                        "filingType": row.get("FilingType", ""),
                        "filingYear": row.get("Year", str(year)),
                        "url": (
                            f"{HOUSE_BASE_URL}public_disc/financial-pdfs/"
                            f"{row.get('Year', year)}/{row.get('DocID')}.pdf"
                        ),
                    }
                )
                break

    if not matches:
        return None

    matches.sort(
        key=lambda row: (
            int(row.get("filingYear") or 0),
            date_to_sort_key(row.get("filedAt")),
            row.get("url", ""),
        ),
        reverse=True,
    )
    return matches[0]


def enrich_house_member(person: Dict[str, Any]) -> Dict[str, Any]:
    all_rows: List[Dict[str, str]] = []

    for year in build_house_search_years():
        try:
            html = fetch_text(HOUSE_SEARCH_URL, method="POST", data=build_house_query(person, year))
        except Exception:
            continue
        all_rows.extend(parse_house_search_rows(html))

    annual_rows = [row for row in all_rows if is_house_full_disclosure_search_row(row)]
    ptr_rows = [row for row in all_rows if row["filingType"].startswith("PTR")]
    if not annual_rows:
        for year in build_house_search_years():
            fallback_annual_row = find_house_annual_row_from_index(person, year)
            if fallback_annual_row:
                annual_rows.append(fallback_annual_row)

    annual_rows.sort(
        key=lambda row: (
            int(row.get("filingYear") or 0),
            date_to_sort_key(row.get("filedAt")),
            row["url"],
        ),
        reverse=True,
    )
    ptr_rows.sort(key=lambda row: row["url"], reverse=True)

    result: Dict[str, Any] = {}

    if annual_rows:
        result["financialAnnualReportUrl"] = annual_rows[0]["url"]
        if annual_rows[0].get("filedAt"):
            result["financialFilingDate"] = annual_rows[0]["filedAt"]
        try:
            annual_text = fetch_pdf_text(annual_rows[0]["url"])
            parsed_filing_date = parse_house_filing_date(annual_text)
            if parsed_filing_date:
                result["financialFilingDate"] = parsed_filing_date
            result["topHoldings"] = select_top_holdings(parse_house_holdings(annual_text))
            result["liabilities"] = parse_house_liabilities(annual_text)[:5]
        except Exception:
            pass

    trades: List[Dict[str, str]] = []
    for row in ptr_rows[:3]:
        try:
            ptr_text = fetch_pdf_text(row["url"])
            trades.extend(parse_house_ptr_trades(ptr_text, row["url"]))
        except Exception:
            continue

    if trades:
        trades.sort(key=lambda trade: date_to_sort_key(trade.get("date")), reverse=True)
        result["recentTrades"] = trades[:5]

    return result


def get_senate_session() -> requests.Session:
    session = requests.Session()
    senate_headers = {**REQUEST_HEADERS, "Referer": SENATE_SEARCH_URL}
    home_html = fetch_text(SENATE_HOME_URL, session=session, headers={"Referer": SENATE_SEARCH_URL})
    csrf_match = re.search(r'name="csrfmiddlewaretoken" value="([^"]+)"', home_html)
    if not csrf_match:
        raise RuntimeError("Unable to initialize Senate search session.")

    session.post(
        SENATE_HOME_URL,
        headers=senate_headers,
        data={
            "csrfmiddlewaretoken": csrf_match.group(1),
            "prohibition_agreement": "1",
        },
        timeout=30,
    )
    return session


def build_senate_query_name(full_name: str, explicit_last_name: Optional[str] = None) -> Optional[Dict[str, str]]:
    normalized_full_name = normalize_search_name(full_name)
    if not normalized_full_name:
        return None

    normalized_last_name = normalize_search_name(explicit_last_name)

    if normalized_last_name:
        if normalized_full_name.lower().endswith(normalized_last_name.lower()):
            first_name = normalized_full_name[: -len(normalized_last_name)].strip(" ,")
        else:
            tokens = normalized_full_name.split()
            last_name_token_count = len(normalized_last_name.split())
            if len(tokens) <= last_name_token_count:
                return None
            first_name = " ".join(tokens[:-last_name_token_count])

        if not first_name:
            return None

        return {"first_name": first_name, "last_name": normalized_last_name}

    tokens = normalized_full_name.split()
    if len(tokens) < 2:
        return None

    return {
        "first_name": " ".join(tokens[:-1]),
        "last_name": tokens[-1],
    }


def expand_senate_query_variants(query_name: Dict[str, str]) -> List[Dict[str, str]]:
    variants = [query_name]
    first_name_tokens = query_name["first_name"].replace(".", " ").split()

    if not first_name_tokens:
        return variants

    without_initials = [token for token in first_name_tokens if len(token) > 1]
    compact_first_names = []

    if without_initials:
        compact_first_names.append(" ".join(without_initials))
        compact_first_names.append(without_initials[0])
    else:
        compact_first_names.append(first_name_tokens[0])

    seen = {(query_name["first_name"].lower(), query_name["last_name"].lower())}

    for first_name in compact_first_names:
        normalized_first_name = normalize_space(first_name)
        if not normalized_first_name:
            continue

        key = (normalized_first_name.lower(), query_name["last_name"].lower())
        if key in seen:
            continue

        seen.add(key)
        variants.append(
            {
                "first_name": normalized_first_name,
                "last_name": query_name["last_name"],
            }
        )

    return variants


def build_senate_search_candidates(person: Dict[str, Any]) -> List[Dict[str, str]]:
    primary_last_name = person.get("financialDisclosureSearchLastName") or person.get(
        "financialDisclosureSearchHint"
    )
    candidate_names: List[str] = []

    for value in [
        person.get("financialDisclosureSearchName"),
        person.get("officialName"),
        person.get("displayName"),
        person.get("name"),
        *(person.get("aliases") or []),
    ]:
        if value and value not in candidate_names:
            candidate_names.append(value)

    candidates: List[Dict[str, str]] = []
    seen = set()

    for full_name in candidate_names:
        query_name = build_senate_query_name(full_name, explicit_last_name=primary_last_name)
        if not query_name:
            continue

        for variant in expand_senate_query_variants(query_name):
            key = (variant["first_name"].lower(), variant["last_name"].lower())
            if key in seen:
                continue

            seen.add(key)
            candidates.append(variant)

    if not candidates and person.get("name"):
        fallback = build_senate_query_name(person["name"])
        if fallback:
            candidates.append(fallback)

    return candidates


def fetch_senate_rows_for_query(
    session: requests.Session,
    csrf_token: str,
    state_code: str,
    first_name: str,
    last_name: str,
) -> List[Dict[str, str]]:
    search_payload = {
        "draw": "1",
        "start": "0",
        "length": "200",
        "search[value]": "",
        "search[regex]": "false",
        "order[0][column]": "4",
        "order[0][dir]": "desc",
        "columns[0][data]": "0",
        "columns[0][name]": "",
        "columns[0][searchable]": "true",
        "columns[0][orderable]": "true",
        "columns[0][search][value]": "",
        "columns[0][search][regex]": "false",
        "columns[1][data]": "1",
        "columns[1][name]": "",
        "columns[1][searchable]": "true",
        "columns[1][orderable]": "true",
        "columns[1][search][value]": "",
        "columns[1][search][regex]": "false",
        "columns[2][data]": "2",
        "columns[2][name]": "",
        "columns[2][searchable]": "true",
        "columns[2][orderable]": "true",
        "columns[2][search][value]": "",
        "columns[2][search][regex]": "false",
        "columns[3][data]": "3",
        "columns[3][name]": "",
        "columns[3][searchable]": "true",
        "columns[3][orderable]": "true",
        "columns[3][search][value]": "",
        "columns[3][search][regex]": "false",
        "columns[4][data]": "4",
        "columns[4][name]": "",
        "columns[4][searchable]": "true",
        "columns[4][orderable]": "true",
        "columns[4][search][value]": "",
        "columns[4][search][regex]": "false",
        "report_types": "[]",
        "filer_types": "[1]",
        "submitted_start_date": "01/01/2012 00:00:00",
        "submitted_end_date": "",
        "candidate_state": "",
        "senator_state": state_code,
        "office_id": "",
        "first_name": first_name,
        "last_name": last_name,
        "csrfmiddlewaretoken": csrf_token,
    }

    session.post(
        SENATE_SEARCH_URL,
        headers={**REQUEST_HEADERS, "Referer": SENATE_SEARCH_URL},
        data={
            "csrfmiddlewaretoken": csrf_token,
            "last_name": search_payload["last_name"],
            "first_name": search_payload["first_name"],
            "filer_type": "1",
            "senator_state": search_payload["senator_state"],
        },
        timeout=30,
    )

    response = session.post(
        SENATE_DATA_URL,
        headers={
            **REQUEST_HEADERS,
            "Referer": SENATE_SEARCH_URL,
            "X-CSRFToken": csrf_token,
            "X-Requested-With": "XMLHttpRequest",
        },
        data=search_payload,
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    rows: List[Dict[str, str]] = []

    for item in payload.get("data", []):
        report_html = item[3]
        href_match = re.search(r'href="([^"]+)"', report_html)
        label = normalize_space(BeautifulSoup(report_html, "html.parser").get_text(" ", strip=True))
        if not href_match:
            continue
        rows.append(
            {
                "title": label,
                "filedAt": item[4],
                "url": requests.compat.urljoin(SENATE_SEARCH_URL, href_match.group(1)),
            }
        )

    return rows


def fetch_senate_rows(person: Dict[str, Any]) -> List[Dict[str, str]]:
    session = get_senate_session()
    warm_page = fetch_text(SENATE_SEARCH_URL, session=session)
    csrf_match = re.search(r'name="csrfmiddlewaretoken" value="([^"]+)"', warm_page)
    if not csrf_match:
        return []

    csrf_token = csrf_match.group(1)
    candidates = build_senate_search_candidates(person)
    best_rows: List[Dict[str, str]] = []
    best_score = (-1, -1)

    for candidate in candidates:
        rows = fetch_senate_rows_for_query(
            session,
            csrf_token,
            person.get("stateCode", ""),
            candidate["first_name"],
            candidate["last_name"],
        )
        annual_count = sum(1 for row in rows if is_senate_annual_row(row))
        score = (annual_count, len(rows))

        if score > best_score:
            best_rows = rows
            best_score = score

        if annual_count > 0:
            return rows

    return best_rows


def is_senate_annual_row(row: Dict[str, str]) -> bool:
    url = row.get("url", "")
    title = row.get("title", "")

    if "/view/annual/" in url:
        return True

    if "/view/paper/" in url and title.startswith("Annual Report"):
        return True

    return False


def parse_senate_annual(url: str) -> Dict[str, Any]:
    session = get_senate_session()
    html = fetch_text(url, session=session, headers={"Referer": SENATE_SEARCH_URL})
    soup = BeautifulSoup(html, "html.parser")
    holdings: List[Dict[str, str]] = []
    liabilities: List[Dict[str, str]] = []

    for table in soup.find_all("table"):
        headers = [normalize_space(th.get_text(" ", strip=True)) for th in table.find_all("th")]
        if not headers:
            continue

        if "Asset" in headers and "Value" in headers:
            for tr in table.select("tbody tr"):
                cells = [normalize_space(td.get_text(" ", strip=True)) for td in tr.find_all("td")]
                if len(cells) < 7:
                    continue
                holdings.append(
                    {
                        "label": cells[1],
                        "owner": normalize_owner_label(cells[3], default="Self"),
                        "value": cells[4],
                    }
                )

        if "Creditor" in headers and "Amount" in headers:
            for tr in table.select("tbody tr"):
                cells = [normalize_space(td.get_text(" ", strip=True)) for td in tr.find_all("td")]
                if len(cells) < 9:
                    continue
                liabilities.append(
                    {
                        "creditor": cells[8],
                        "owner": normalize_owner_label(cells[3], default="Self"),
                        "type": cells[4],
                        "amount": cells[7],
                    }
                )

    deduped_holdings: Dict[str, Dict[str, str]] = {}
    for entry in holdings:
        dedupe_key = make_holding_dedupe_key(entry)
        existing = deduped_holdings.get(dedupe_key)
        if existing is None or parse_value_upper_bound(entry["value"]) > parse_value_upper_bound(existing["value"]):
            deduped_holdings[dedupe_key] = entry

    return {
        "topHoldings": select_top_holdings(list(deduped_holdings.values())),
        "liabilities": liabilities[:5],
    }


def parse_senate_ptr(url: str) -> List[Dict[str, str]]:
    session = get_senate_session()
    html = fetch_text(url, session=session, headers={"Referer": SENATE_SEARCH_URL})
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table")
    if table is None:
        return []

    headers = [normalize_space(th.get_text(" ", strip=True)) for th in table.find_all("th")]
    if "Transaction Date" not in headers or "Asset Name" not in headers:
        return []

    rows: List[Dict[str, str]] = []
    for tr in table.select("tbody tr"):
        cells = [normalize_space(td.get_text(" ", strip=True)) for td in tr.find_all("td")]
        if len(cells) < 9:
            continue
        rows.append(
            {
                "date": cells[1],
                "owner": normalize_owner_label(cells[2], default="Self"),
                "ticker": cells[3],
                "assetName": cells[4],
                "type": cells[6],
                "amount": cells[7],
                "sourceUrl": url,
            }
        )
    return rows


def enrich_senator(person: Dict[str, Any]) -> Dict[str, Any]:
    rows = fetch_senate_rows(person)
    annual_rows = [row for row in rows if is_senate_annual_row(row)]
    manual_annual_override = MANUAL_SENATE_ANNUAL_OVERRIDES.get(person.get("id", ""))
    if manual_annual_override and not any(row["url"] == manual_annual_override["url"] for row in annual_rows):
        annual_rows.append(manual_annual_override)
    annual_rows.sort(key=lambda row: date_to_sort_key(row["filedAt"]), reverse=True)
    ptr_rows = [row for row in rows if "/view/ptr/" in row["url"]]
    ptr_rows.sort(key=lambda row: date_to_sort_key(row["filedAt"]), reverse=True)

    result: Dict[str, Any] = {}

    if annual_rows:
        result["financialAnnualReportUrl"] = annual_rows[0]["url"]
        result["financialFilingDate"] = annual_rows[0]["filedAt"]
        try:
            annual_details = parse_senate_annual(annual_rows[0]["url"])
            result.update(annual_details)
        except Exception:
            pass

    trades: List[Dict[str, str]] = []
    for row in ptr_rows[:3]:
        try:
            trades.extend(parse_senate_ptr(row["url"]))
        except Exception:
            continue

    if trades:
        trades.sort(key=lambda trade: date_to_sort_key(trade.get("date")), reverse=True)
        result["recentTrades"] = trades[:5]

    return result


def enrich_legislator(person: Dict[str, Any]) -> Dict[str, Any]:
    try:
        if person.get("sectionId") == "house":
            return {"id": person["id"], **enrich_house_member(person)}
        if person.get("sectionId") == "senate":
            return {"id": person["id"], **enrich_senator(person)}
    except Exception:
        return {"id": person["id"]}

    return {"id": person["id"]}


def main() -> None:
    payload = load_json_stdin()
    people = payload.get("people", [])
    results: Dict[str, Dict[str, Any]] = {}

    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(enrich_legislator, person) for person in people]
        for future in as_completed(futures):
            item = future.result()
            results[item["id"]] = {key: value for key, value in item.items() if key != "id" and value}

    json.dump(results, sys.stdout)


if __name__ == "__main__":
    main()
