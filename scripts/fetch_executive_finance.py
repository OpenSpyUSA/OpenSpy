#!/usr/bin/env python3

import json
import re
import sys
import unicodedata
from datetime import datetime
from functools import lru_cache
from html import unescape
from io import BytesIO
from typing import Any, Dict, List, Optional, Tuple

import requests
from pypdf import PdfReader


REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

OGE_API_URL = "https://extapps2.oge.gov/201/Presiden.nsf/API.xsp/v2/rest"
TOP_HOLDINGS_DEFAULT_COUNT = 5
TOP_HOLDINGS_EXTENSION_THRESHOLD = 1_000_000
TOP_HOLDINGS_MIN_DISPLAY_UPPER_BOUND = 15_001
VALUE_RANGE_PATTERN = re.compile(r"(?:Over \$[0-9,]+|\$[0-9,]+\s*-\s*\$[0-9,]+|None \(or less than \$1,001\))")
LIABILITY_AMOUNT_PATTERN = re.compile(r"(?:Over \$[0-9,]+|\$[0-9,]+\s*-\s*\$[0-9,]+)")
ROW_START_PATTERN = re.compile(r"^(\d+(?:\.\d+)*\.?)\s+(.*)$")
TRADE_DETAILS_PATTERN = re.compile(
    r"\b(Purchase|Sale|Exchange)\b\s+(\d{2}/\d{2}/\d{4})\s+(?:Yes|No)\s+"
    r"(Over \$[0-9,]+|\$[0-9,]+\s*-\s*\$[0-9,]+)",
    re.IGNORECASE,
)
ELECTRONIC_SIGNATURE_DATE_PATTERN = re.compile(
    r"electronically signed on (\d{2}/\d{2}/\d{4})",
    re.IGNORECASE,
)
SCANNED_SIGNATURE_DATE_PATTERN = re.compile(
    r"\bDate:\s*([0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4})",
    re.IGNORECASE,
)
ROLE_STOP_WORDS = {
    "acting",
    "administrator",
    "agency",
    "board",
    "chair",
    "chairman",
    "chief",
    "commission",
    "commissioner",
    "committee",
    "corporation",
    "council",
    "department",
    "director",
    "executive",
    "federal",
    "independent",
    "member",
    "office",
    "of",
    "secretary",
    "the",
    "united",
    "states",
    "vice",
}
NAME_SUFFIXES = {"ii", "iii", "iv", "jr", "sr", "v"}


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def strip_diacritics(value: str) -> str:
    return unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")


def normalize_name_tokens(value: Optional[str]) -> List[str]:
    if not value:
        return []

    cleaned = strip_diacritics(value)
    cleaned = cleaned.replace(".", "").replace(",", " ").replace("&", " and ")
    cleaned = re.sub(r"\b(Jr|Sr)\.?\b", " ", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bII|III|IV|V\b", " ", cleaned)
    cleaned = re.sub(r"[^A-Za-z0-9\s-]", " ", cleaned)
    cleaned = cleaned.replace("-", " ")
    return [token.lower() for token in cleaned.split() if token and token.lower() not in NAME_SUFFIXES]


def normalize_role_tokens(value: Optional[str]) -> List[str]:
    return [token for token in normalize_name_tokens(value) if token not in ROLE_STOP_WORDS]


def build_person_name_parts(person: Dict[str, Any]) -> Dict[str, Any]:
    search_name = (
        person.get("financialDisclosureSearchName")
        or person.get("displayName")
        or person.get("officialName")
        or person.get("name")
        or ""
    )
    full_tokens = normalize_name_tokens(search_name)
    raw_last_name = person.get("financialDisclosureSearchLastName")

    if raw_last_name:
        last_tokens = normalize_name_tokens(raw_last_name)
    else:
        stripped_name = re.sub(
            r"\b(Jr|Sr)\.?\b|\bII\b|\bIII\b|\bIV\b|\bV\b",
            " ",
            strip_diacritics(search_name or ""),
            flags=re.IGNORECASE,
        )
        raw_last_segment = normalize_space(stripped_name).split(" ")[-1] if stripped_name else ""
        if "-" in raw_last_segment:
            last_tokens = normalize_name_tokens(raw_last_segment)
        else:
            last_tokens = [full_tokens[-1]] if full_tokens else []

    if full_tokens and last_tokens and full_tokens[-len(last_tokens) :] == last_tokens:
        first_tokens = full_tokens[: -len(last_tokens)] or full_tokens[:1]
    else:
        first_tokens = full_tokens[:1]

    return {
        "full_tokens": full_tokens,
        "first_tokens": first_tokens,
        "last_tokens": last_tokens,
        "normalized_full": " ".join(full_tokens),
    }


def build_row_name_parts(value: str) -> Dict[str, Any]:
    if "," in value:
        last_raw, first_raw = [segment.strip() for segment in value.split(",", 1)]
    else:
        tokens = normalize_name_tokens(value)
        return {
            "full_tokens": tokens,
            "first_tokens": tokens[:1],
            "last_tokens": tokens[-1:],
            "normalized_full": " ".join(tokens),
        }

    first_tokens = normalize_name_tokens(first_raw)
    last_tokens = normalize_name_tokens(last_raw)
    full_tokens = first_tokens + last_tokens

    return {
        "full_tokens": full_tokens,
        "first_tokens": first_tokens,
        "last_tokens": last_tokens,
        "normalized_full": " ".join(full_tokens),
    }


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


def classify_oge_document(type_text: str) -> str:
    lower = type_text.lower()

    if "278 transaction" in lower:
        return "transaction"
    if lower.startswith("annual") or " annual (" in lower:
        return "annual"
    if "nominee 278" in lower:
        return "nominee"
    if "new entrant" in lower:
        return "new_entrant"
    if "termination" in lower:
        return "termination"
    return "other"


def annual_report_label(kind: str) -> str:
    return {
        "annual": "Annual disclosure report",
        "nominee": "Nominee disclosure report",
        "new_entrant": "New entrant disclosure report",
        "termination": "Termination disclosure report",
    }.get(kind, "Financial disclosure report")


def score_role_overlap(person: Dict[str, Any], row: Dict[str, Any]) -> int:
    person_role_tokens = set(normalize_role_tokens(person.get("title")))
    row_role_tokens = set(normalize_role_tokens(row.get("title")))
    person_agency_tokens = set(normalize_role_tokens(person.get("department") or person.get("subtitle")))
    row_agency_tokens = set(normalize_role_tokens(row.get("agency")))

    score = 0

    if person_role_tokens and row_role_tokens and person_role_tokens.intersection(row_role_tokens):
        score += 3

    if person_agency_tokens and row_agency_tokens and person_agency_tokens.intersection(row_agency_tokens):
        score += 2

    return score


def score_row_match(person: Dict[str, Any], row: Dict[str, Any]) -> int:
    person_parts = build_person_name_parts(person)
    row_parts = build_row_name_parts(row["name"])

    if not person_parts["last_tokens"] or not row_parts["last_tokens"]:
        return -1

    if person_parts["last_tokens"] != row_parts["last_tokens"]:
        if person_parts["last_tokens"][-1] != row_parts["last_tokens"][-1]:
            return -1
        score = 3
    else:
        score = 6

    if person_parts["normalized_full"] == row_parts["normalized_full"]:
        score += 8

    if person_parts["first_tokens"] and row_parts["first_tokens"]:
        person_first = person_parts["first_tokens"][0]
        row_first = row_parts["first_tokens"][0]

        if person_first == row_first:
            score += 6
        elif person_first[0] == row_first[0]:
            score += 3
        elif person_first in row_parts["first_tokens"] or row_first in person_parts["first_tokens"]:
            score += 4

    score += score_role_overlap(person, row)

    return score


@lru_cache(maxsize=1)
def fetch_oge_rows() -> Tuple[Dict[str, Any], ...]:
    rows: List[Dict[str, Any]] = []
    start = 0
    page_size = 5000
    total_records: Optional[int] = None

    while True:
        length = page_size if total_records is None else min(page_size, max(total_records - start, 0))

        if length <= 0:
            break

        response = requests.get(
            OGE_API_URL,
            params={"draw": 1, "start": start, "length": length},
            headers=REQUEST_HEADERS,
            timeout=60,
        )
        response.raise_for_status()
        payload = response.json()
        page_rows = payload.get("data", [])
        total_records = payload.get("recordsTotal", total_records)

        for raw_row in page_rows:
            type_html = raw_row.get("type", "")
            href_match = re.search(r"href='([^']+)'", type_html)
            href = unescape(href_match.group(1).replace("\\/", "/")) if href_match else None
            type_text = normalize_space(unescape(re.sub(r"<[^>]+>", " ", type_html)))
            rows.append(
                {
                    "agency": raw_row.get("agency", ""),
                    "directPdf": bool(href and "$FILE/" in href and href.lower().endswith(".pdf")),
                    "docDate": raw_row.get("docDate", ""),
                    "kind": classify_oge_document(type_text),
                    "name": raw_row.get("name", ""),
                    "title": raw_row.get("title", ""),
                    "typeText": type_text,
                    "url": href,
                }
            )

        start += len(page_rows)

        if not page_rows or (total_records is not None and start >= total_records):
            break

    return tuple(rows)


@lru_cache(maxsize=256)
def fetch_pdf_pages(url: str) -> Tuple[str, ...]:
    response = requests.get(url, headers=REQUEST_HEADERS, timeout=120)
    response.raise_for_status()
    reader = PdfReader(BytesIO(response.content))
    return tuple(page.extract_text() or "" for page in reader.pages)


def normalize_page_line(line: str) -> str:
    return (
        normalize_space(
            line.replace("\xa0", " ")
            .replace("–", "-")
            .replace("—", "-")
            .replace("ﬁ", "fi")
            .replace("ﬀ", "ff")
        )
    )


def should_skip_common_pdf_line(line: str, person_name: str) -> bool:
    lower = line.lower()

    if not line or line.isdigit():
        return True
    if line == "Income Amount":
        return True
    if lower.startswith("oge form 278e") or lower.startswith("periodic transaction report"):
        return True
    if lower.startswith("instructions for part"):
        return True
    if lower.startswith("note: this is a public form"):
        return True
    if lower.startswith("if you need more pages"):
        return True
    if lower.startswith("page number"):
        return True
    if lower.startswith("# "):
        return True
    if lower == "filer's name" or lower == "creditor name" or lower == "type":
        return True
    if lower.startswith("part ") or lower.startswith("transactions") or lower.startswith("endnotes"):
        return True
    if person_name and lower == normalize_page_line(person_name).lower():
        return True
    if person_name and lower.startswith(f"{normalize_page_line(person_name).lower()} - page"):
        return True
    if lower.startswith("electronic signature") or lower.startswith("/s/ "):
        return True
    if lower.startswith("agency ethics official") or lower.startswith("u.s. office of government ethics certification"):
        return True
    if lower.startswith("other review conducted by"):
        return True
    if lower.startswith("summary of contents") or lower.startswith("privacy act statement"):
        return True

    return False


def extract_row_blocks(lines: List[str]) -> List[Tuple[str, str]]:
    rows: List[Tuple[str, str]] = []
    current_index: Optional[str] = None
    current_lines: List[str] = []

    for line in lines:
        match = ROW_START_PATTERN.match(line)

        if match:
            if current_index is not None:
                rows.append((current_index, normalize_space(" ".join(current_lines))))
            current_index = match.group(1).rstrip(".")
            current_lines = [match.group(2)]
            continue

        if current_index is not None:
            current_lines.append(line)

    if current_index is not None:
        rows.append((current_index, normalize_space(" ".join(current_lines))))

    return rows


def get_278e_asset_section(page_text: str) -> Optional[str]:
    lower = page_text.lower()

    if "part 5:" in lower or "5. spouse's employment assets" in lower:
        return "spouse"
    if "part 2:" in lower or "2. filer's employment assets" in lower:
        return "self"
    if "part 6:" in lower or "6. other assets and income" in lower:
        return "other"

    return None


def get_278e_liability_section(page_text: str) -> bool:
    lower = page_text.lower()

    if "part 8:" not in lower and "8. liabilities" not in lower:
        return False

    return (
        "# creditor name" in lower
        or "# amount year" in lower
        or "# creditor name type amount" in lower
        or ("creditor name" in lower and "amount" in lower and "type" in lower)
    )


def infer_asset_owner(section: str, description: str, parent_owner: Optional[str]) -> Optional[str]:
    lower = description.lower()

    if section == "spouse":
        return "Spouse"
    if "child" in lower or parent_owner == "Child":
        return "Child"

    return None


def parse_278e_holdings(pages: Tuple[str, ...], person_name: str) -> List[Dict[str, str]]:
    context_labels: Dict[str, str] = {}
    context_owners: Dict[str, Optional[str]] = {}
    current_section: Optional[str] = None
    holdings: List[Dict[str, str]] = []

    for page_text in pages:
        section = get_278e_asset_section(page_text)

        if not section:
            continue

        if section != current_section:
            current_section = section
            context_labels = {}
            context_owners = {}

        cleaned_lines: List[str] = []
        in_endnote = False

        for raw_line in page_text.splitlines():
            line = normalize_page_line(raw_line)

            if ROW_START_PATTERN.match(line):
                in_endnote = False

            if line.startswith("End note:"):
                in_endnote = True
                continue

            if in_endnote and not ROW_START_PATTERN.match(line):
                continue

            if should_skip_common_pdf_line(line, person_name):
                continue

            cleaned_lines.append(line)

        for row_index, body in extract_row_blocks(cleaned_lines):
            match = re.search(r"\b(Yes|No|N/A)\b", body)
            description = body
            parent_owner = None

            if "." in row_index:
                parent_index = ".".join(row_index.split(".")[:-1])
                parent_owner = context_owners.get(parent_index)
            else:
                parent_index = None

            if match:
                description = normalize_space(body[: match.start()])
                remainder = body[match.end() :].strip()
                value_match = VALUE_RANGE_PATTERN.match(remainder)

                if value_match and "value not readily ascertainable" not in description.lower():
                    label = description
                    parent_label = context_labels.get(parent_index) if parent_index else None

                    if parent_label and len(parent_label) <= 120:
                        label = f"{parent_label} - {label}"

                    label = normalize_space(label)

                    if not label or label.lower().startswith("location:"):
                        context_labels[row_index] = description
                        context_owners[row_index] = infer_asset_owner(section, description, parent_owner)
                        continue

                    owner = infer_asset_owner(section, label, parent_owner)
                    entry = {
                        "label": label,
                        "value": value_match.group(0),
                    }

                    if owner:
                        entry["owner"] = owner

                    holdings.append(entry)

            context_labels[row_index] = description
            context_owners[row_index] = infer_asset_owner(section, description, parent_owner)

    deduped_holdings: Dict[str, Dict[str, str]] = {}

    for entry in holdings:
        owner_key = entry.get("owner") or "Self"
        dedupe_key = f"{owner_key}|{entry['label']}"
        existing = deduped_holdings.get(dedupe_key)

        if existing is None or parse_value_upper_bound(entry["value"]) > parse_value_upper_bound(existing["value"]):
            deduped_holdings[dedupe_key] = entry

    return select_top_holdings(list(deduped_holdings.values()))


def parse_split_liability_page(lines: List[str]) -> List[Dict[str, str]]:
    creditor_index = lines.index("Creditor Name")
    type_index = lines.index("Type")

    amount_rows = [line for line in lines[:creditor_index] if ROW_START_PATTERN.match(line)]
    creditor_rows = [
        line
        for line in lines[creditor_index + 1 : type_index]
        if line not in {"Filer's Name"} and not line.startswith("Part 8:")
    ]
    type_rows = [line for line in lines[type_index + 1 :] if line and not should_skip_common_pdf_line(line, "")]

    liabilities: List[Dict[str, str]] = []

    for amount_row, creditor, liability_type in zip(amount_rows, creditor_rows, type_rows):
        amount_match = LIABILITY_AMOUNT_PATTERN.search(amount_row)

        if not amount_match:
            continue

        liabilities.append(
            {
                "amount": amount_match.group(0),
                "creditor": creditor,
                "type": liability_type,
            }
        )

    return liabilities


def split_inline_liability_prefix(prefix: str) -> Tuple[str, str]:
    for marker in [" Credit Card", " Personal Loan", " Line of Credit", " Mortgage", " Loan"]:
        location = prefix.rfind(marker)
        if location > 0:
            return normalize_space(prefix[:location]), normalize_space(prefix[location + 1 :])

    return normalize_space(prefix), "Liability"


def parse_inline_liability_page(lines: List[str]) -> List[Dict[str, str]]:
    liabilities: List[Dict[str, str]] = []

    for _, body in extract_row_blocks(lines):
        amount_match = LIABILITY_AMOUNT_PATTERN.search(body)

        if not amount_match:
            continue

        prefix = normalize_space(body[: amount_match.start()])

        if not prefix:
            continue
        if len(prefix) > 180:
            continue
        if any(
            snippet in prefix.lower()
            for snippet in [
                "this section",
                "value greater",
                "paid more than",
                "during the reporting period",
                "filer aggregates",
            ]
        ):
            continue

        creditor, liability_type = split_inline_liability_prefix(prefix)

        liabilities.append(
            {
                "amount": amount_match.group(0),
                "creditor": creditor,
                "type": liability_type,
            }
        )

    return liabilities


def parse_278e_liabilities(pages: Tuple[str, ...], person_name: str) -> List[Dict[str, str]]:
    liabilities: List[Dict[str, str]] = []

    for page_text in pages:
        if not get_278e_liability_section(page_text):
            continue

        cleaned_lines = [
            line
            for raw_line in page_text.splitlines()
            for line in [normalize_page_line(raw_line)]
            if not should_skip_common_pdf_line(line, person_name)
        ]

        if "Creditor Name" in cleaned_lines and "Type" in cleaned_lines:
            liabilities.extend(parse_split_liability_page(cleaned_lines))
        else:
            liabilities.extend(parse_inline_liability_page(cleaned_lines))

    deduped: Dict[str, Dict[str, str]] = {}

    for entry in liabilities:
        dedupe_key = f"{entry['creditor']}|{entry['type']}|{entry['amount']}"
        deduped[dedupe_key] = entry

    return sorted(
        deduped.values(),
        key=lambda entry: (-parse_value_upper_bound(entry["amount"]), entry["creditor"], entry["type"]),
    )[:5]


def parse_278t_trades(pages: Tuple[str, ...], person_name: str, source_url: str) -> List[Dict[str, str]]:
    trades: List[Dict[str, str]] = []

    for page_text in pages:
        cleaned_lines: List[str] = []

        for raw_line in page_text.splitlines():
            line = normalize_page_line(raw_line)

            if should_skip_common_pdf_line(line, person_name):
                continue

            cleaned_lines.append(line)

        for _, body in extract_row_blocks(cleaned_lines):
            match = TRADE_DETAILS_PATTERN.search(body)

            if not match:
                continue

            description = normalize_space(body[: match.start()])
            trade_type = match.group(1).capitalize()
            trade_date = normalize_us_date(match.group(2))
            amount = normalize_space(match.group(3))

            if not description or not trade_date:
                continue

            trades.append(
                {
                    "amount": amount,
                    "assetName": description,
                    "date": trade_date,
                    "sourceUrl": source_url,
                    "type": trade_type,
                }
            )

    deduped: Dict[str, Dict[str, str]] = {}

    for entry in trades:
        dedupe_key = f"{entry['date']}|{entry['type']}|{entry['assetName']}|{entry['amount']}"
        deduped[dedupe_key] = entry

    return list(deduped.values())


def normalize_us_date(value: Optional[str]) -> Optional[str]:
    if not value:
        return None

    for pattern in ("%m/%d/%Y", "%m/%d/%y", "%m-%d-%Y", "%m-%d-%y"):
        try:
            return datetime.strptime(value, pattern).strftime("%m/%d/%Y")
        except ValueError:
            continue

    return None


def sort_date_key(value: Optional[str]) -> Tuple[int, str]:
    if not value:
        return (0, "")

    normalized = normalize_us_date(value)

    if not normalized:
        return (0, value)

    return (1, datetime.strptime(normalized, "%m/%d/%Y").strftime("%Y-%m-%d"))


def extract_filing_date(pages: Tuple[str, ...]) -> Optional[str]:
    first_text = "\n".join(pages[:2])
    signature_match = ELECTRONIC_SIGNATURE_DATE_PATTERN.search(first_text)

    if signature_match:
        return normalize_us_date(signature_match.group(1))

    scanned_match = SCANNED_SIGNATURE_DATE_PATTERN.search(first_text)

    if scanned_match:
        return normalize_us_date(scanned_match.group(1))

    return None


def choose_primary_278_document(rows: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    for kind in ["annual", "nominee", "new_entrant", "termination"]:
        candidates = [
            row
            for row in rows
            if row["kind"] == kind and row["directPdf"]
        ]

        if candidates:
            return sorted(candidates, key=lambda row: row["docDate"], reverse=True)[0]

    return None


def choose_transaction_documents(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    return sorted(
        [row for row in rows if row["kind"] == "transaction" and row["directPdf"]],
        key=lambda row: row["docDate"],
        reverse=True,
    )


def matching_oge_rows_for_person(person: Dict[str, Any]) -> List[Dict[str, Any]]:
    scored_rows = []

    for row in fetch_oge_rows():
        score = score_row_match(person, row)

        if score >= 9:
            scored_rows.append((score, row))

    scored_rows.sort(key=lambda item: (item[0], item[1]["docDate"]), reverse=True)
    return [row for _, row in scored_rows]


def enrich_executive_person(person: Dict[str, Any]) -> Dict[str, Any]:
    matched_rows = matching_oge_rows_for_person(person)

    if not matched_rows:
        return {}

    result: Dict[str, Any] = {}
    primary_278_document = choose_primary_278_document(matched_rows)

    if primary_278_document:
        pages = fetch_pdf_pages(primary_278_document["url"])
        filing_date = extract_filing_date(pages)
        holdings = parse_278e_holdings(pages, person.get("name", ""))
        liabilities = parse_278e_liabilities(pages, person.get("name", ""))

        result["financialAnnualReportLabel"] = annual_report_label(primary_278_document["kind"])
        result["financialAnnualReportUrl"] = primary_278_document["url"]

        if filing_date:
            result["financialFilingDate"] = filing_date

        if holdings:
            result["topHoldings"] = holdings

        if liabilities:
            result["liabilities"] = liabilities

    transaction_documents = choose_transaction_documents(matched_rows)
    trades: List[Dict[str, str]] = []

    for document in transaction_documents[:8]:
        trades.extend(parse_278t_trades(fetch_pdf_pages(document["url"]), person.get("name", ""), document["url"]))

    if trades:
        deduped_trades: Dict[str, Dict[str, str]] = {}

        for entry in trades:
            dedupe_key = f"{entry['date']}|{entry['type']}|{entry['assetName']}|{entry['amount']}"
            deduped_trades[dedupe_key] = entry

        result["recentTrades"] = sorted(
            deduped_trades.values(),
            key=lambda entry: (sort_date_key(entry["date"]), entry["assetName"]),
            reverse=True,
        )[:5]

    return result


def main() -> None:
    payload = json.load(sys.stdin)
    people = payload.get("people", [])
    executive_people = [person for person in people if person.get("branchId") == "executive"]
    enriched_by_id: Dict[str, Dict[str, Any]] = {}

    for person in executive_people:
        try:
            enriched = enrich_executive_person(person)
        except Exception as error:
            print(
                f"Warning: executive finance refresh failed for {person.get('name')}: {error}",
                file=sys.stderr,
            )
            enriched = {}

        if enriched:
            enriched_by_id[person["id"]] = enriched

    json.dump(enriched_by_id, sys.stdout, indent=2)


if __name__ == "__main__":
    main()
