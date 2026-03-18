#!/usr/bin/env python3

import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime
from io import BytesIO
from typing import Any, Dict, List, Optional

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
SENATE_HOME_URL = "https://efdsearch.senate.gov/search/home/"
SENATE_SEARCH_URL = "https://efdsearch.senate.gov/search/"
SENATE_DATA_URL = "https://efdsearch.senate.gov/search/report/data/"
MONTH_PATTERN = (
    r"(?:January|February|March|April|May|June|July|August|September|October|November|December|Ongoing)"
)


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


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
    last_name = person.get("financialDisclosureSearchHint") or person["name"].split()[-1]
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
        r"^(?P<asset>.+?\[[A-Z]{2}\])(?:\s+(?P<owner>[A-Z]{2}))?\s+"
        r"(?P<value>None|\$[0-9,]+(?:\s*-\s*|\s+)(?:\$[0-9,]+|Over \$[0-9,]+))"
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
        elif index + 1 < len(content_lines) and content_lines[index + 1].startswith("["):
            candidate = f"{line} {content_lines[index + 1]}"
            consumed = 2

        if candidate is None:
            index += 1
            continue

        matched = None

        for extra in range(consumed, min(consumed + 3, len(content_lines) - index)):
            candidate = f"{candidate} {content_lines[index + extra]}"
            matched = pattern.match(candidate)
            if matched:
                consumed = extra + 1
                break

        if matched is None:
            matched = pattern.match(candidate)

        if matched:
            entries.append(
                {
                    "label": normalize_space(matched.group("asset")),
                    "value": normalize_space(matched.group("value")),
                }
            )

        index += consumed

    deduped: Dict[str, Dict[str, str]] = {}
    for entry in entries:
        existing = deduped.get(entry["label"])
        if existing is None or parse_value_upper_bound(entry["value"]) > parse_value_upper_bound(existing["value"]):
            deduped[entry["label"]] = entry

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
        rf"^(?P<owner>[A-Z]{{2}})\s+(?P<creditor>.+?)\s+"
        rf"(?P<incurred>(?:{MONTH_PATTERN}\s+\d{{4}}|Ongoing))\s*"
        r"(?P<type>.+)$"
    )

    index = 0
    while index < len(content_lines):
        line = content_lines[index]
        if not re.match(r"^[A-Z]{2}\s+", line):
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

    index = 0
    while index < len(lines):
        line = lines[index]

        if not re.match(r"^[A-Z]{2}\s+", line):
            index += 1
            continue

        owner = line[:2]
        asset_line = line[3:]
        consumed = 1

        if index + consumed < len(lines) and lines[index + consumed].startswith("["):
            asset_line = f"{asset_line} {lines[index + consumed]}"
            consumed += 1

        meta_line = lines[index + consumed] if index + consumed < len(lines) else ""
        amount_continuation = lines[index + consumed + 1] if index + consumed + 1 < len(lines) else ""
        matched = meta_pattern.match(f"{meta_line} {amount_continuation}")

        if matched:
            consumed += 2 if amount_continuation.startswith("$") else 1
            trade_type = normalize_space(matched.group("type"))
            if trade_type == "P":
                trade_type = "Purchase"
            elif trade_type.startswith("S"):
                trade_type = trade_type.replace("S", "Sale", 1)
            trades.append(
                {
                    "assetName": normalize_space(asset_line),
                    "amount": normalize_space(matched.group("amount")),
                    "date": matched.group("transactionDate"),
                    "owner": owner,
                    "type": trade_type,
                    "sourceUrl": source_url,
                }
            )

        index += consumed

    return trades


def enrich_house_member(person: Dict[str, Any]) -> Dict[str, Any]:
    all_rows: List[Dict[str, str]] = []

    for year in build_house_search_years():
        try:
            html = fetch_text(HOUSE_SEARCH_URL, method="POST", data=build_house_query(person, year))
        except Exception:
            continue
        all_rows.extend(parse_house_search_rows(html))

    if not all_rows:
        return {}

    annual_rows = [row for row in all_rows if row["filingType"].startswith("FD")]
    ptr_rows = [row for row in all_rows if row["filingType"].startswith("PTR")]
    annual_rows.sort(key=lambda row: (int(row["filingYear"]), row["url"]), reverse=True)
    ptr_rows.sort(key=lambda row: row["url"], reverse=True)

    result: Dict[str, Any] = {}

    if annual_rows:
        try:
            annual_text = fetch_pdf_text(annual_rows[0]["url"])
            result["financialAnnualReportUrl"] = annual_rows[0]["url"]
            result["financialFilingDate"] = parse_house_filing_date(annual_text)
            result["topHoldings"] = parse_house_holdings(annual_text)[:5]
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


def fetch_senate_rows(person: Dict[str, Any]) -> List[Dict[str, str]]:
    session = get_senate_session()
    warm_page = fetch_text(SENATE_SEARCH_URL, session=session)
    csrf_match = re.search(r'name="csrfmiddlewaretoken" value="([^"]+)"', warm_page)
    if not csrf_match:
        return []

    csrf_token = csrf_match.group(1)
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
        "senator_state": person.get("stateCode", ""),
        "office_id": "",
        "first_name": person["name"].split()[0],
        "last_name": person.get("financialDisclosureSearchHint") or person["name"].split()[-1],
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
                holdings.append({"label": cells[1], "value": cells[4]})

        if "Creditor" in headers and "Amount" in headers:
            for tr in table.select("tbody tr"):
                cells = [normalize_space(td.get_text(" ", strip=True)) for td in tr.find_all("td")]
                if len(cells) < 9:
                    continue
                liabilities.append(
                    {
                        "creditor": cells[8],
                        "type": cells[4],
                        "amount": cells[7],
                    }
                )

    deduped_holdings: Dict[str, Dict[str, str]] = {}
    for entry in holdings:
        existing = deduped_holdings.get(entry["label"])
        if existing is None or parse_value_upper_bound(entry["value"]) > parse_value_upper_bound(existing["value"]):
            deduped_holdings[entry["label"]] = entry

    return {
        "topHoldings": sorted(
            deduped_holdings.values(),
            key=lambda entry: (-parse_value_upper_bound(entry["value"]), entry["label"]),
        )[:5],
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
                "owner": cells[2],
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
    if not rows:
        return {}

    annual_rows = [row for row in rows if "/view/annual/" in row["url"]]
    annual_rows.sort(key=lambda row: date_to_sort_key(row["filedAt"]), reverse=True)
    ptr_rows = [row for row in rows if "/view/ptr/" in row["url"]]
    ptr_rows.sort(key=lambda row: date_to_sort_key(row["filedAt"]), reverse=True)

    result: Dict[str, Any] = {}

    if annual_rows:
        try:
            annual_details = parse_senate_annual(annual_rows[0]["url"])
            result.update(annual_details)
            result["financialAnnualReportUrl"] = annual_rows[0]["url"]
            result["financialFilingDate"] = annual_rows[0]["filedAt"]
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
