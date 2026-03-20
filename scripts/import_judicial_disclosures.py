#!/usr/bin/env python3

import argparse
import json
import re
import shutil
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from pypdf import PdfReader


CURRENT_JUSTICE_FILES: Dict[str, str] = {
    "judicial-john-g-roberts-jr": "Roberts-John-G-Jr-Annual-2024.pdf",
    "judicial-clarence-thomas": "Thomas-Clarence-Annual-2024.pdf",
    "judicial-samuel-a-alito-jr": "Alito-Samuel-A-Annual-2024.pdf",
    "judicial-sonia-sotomayor": "Sotomayor-Sonia-Annual-2024.pdf",
    "judicial-elena-kagan": "Kagan-Elena-Annual-2024.pdf",
    "judicial-neil-m-gorsuch": "Gorsuch-Neil-M-Annual-2024.pdf",
    "judicial-brett-m-kavanaugh": "Kavanaugh-Brett-M-Annual-2024.pdf",
    "judicial-amy-coney-barrett": "Barrett-Amy-C-Annual-2024.pdf",
    "judicial-ketanji-brown-jackson": "Jackson-Ketanji-B-Annual-2024.pdf",
}

JUDICIAL_PERIODIC_TRANSACTION_REPORTS: Dict[str, List[Dict[str, object]]] = {
    "judicial-john-g-roberts-jr": [
        {
            "filename": "Roberts-John-G-Jr-Periodic-Transaction-Report-2025-08-29.pdf",
            "trades": [
                {
                    "amount": "$15,001 - $50,000",
                    "assetName": "Macrae Inc. (Common)",
                    "date": "07/31/2025",
                    "type": "Buy",
                }
            ],
        }
    ],
    "judicial-samuel-a-alito-jr": [
        {
            "filename": "Alito-Samuel-A-Periodic-Transaction-Report-2025-05-01.pdf",
            "trades": [
                {
                    "amount": "$1,000 - $15,000",
                    "assetName": "Boeing Corp. Common Stock",
                    "date": "04/28/2025",
                    "type": "Sold",
                }
            ],
        },
        {
            "filename": "Alito-Samuel-A-Periodic-Transaction-Report-2025-07-31.pdf",
            "trades": [
                {
                    "amount": "$1,000 - $15,000",
                    "assetName": "1000 shares Loccitane Luxembourg common stock",
                    "date": "10/24/2024",
                    "type": "Sold",
                },
                {
                    "amount": "$15,001 - $50,000",
                    "assetName": "75 shares Caterpillar common stock",
                    "date": "10/03/2024",
                    "type": "Sold",
                },
                {
                    "amount": "$15,001 - $50,000",
                    "assetName": "Virginia Beach VA GO Pub Impt.",
                    "date": "08/24/2024",
                    "type": "Redeemed",
                },
            ],
        },
    ],
}

VALUE_CODES = {
    "J": "$15,000 or less",
    "K": "$15,001 - $50,000",
    "L": "$50,001 - $100,000",
    "M": "$100,001 - $250,000",
    "N": "$250,001 - $500,000",
    "O": "$500,001 - $1,000,000",
    "P1": "$1,000,001 - $5,000,000",
    "P2": "$5,000,001 - $25,000,000",
    "P3": "$25,000,001 - $50,000,000",
    "P4": "More than $50,000,000",
}

METHOD_CODES = {"Q", "R", "S", "T", "U", "V", "W"}
INCOME_CODES = {"A", "B", "C", "D", "E", "F", "G", "H", "H1", "H2", "None"}
TOP_HOLDINGS_DEFAULT_COUNT = 5
TOP_HOLDINGS_EXTENSION_THRESHOLD = 1_000_000
TOP_HOLDINGS_MIN_DISPLAY_UPPER_BOUND = 15_001
JUDICIAL_NOTE = (
    "Annual disclosure report links here are local mirrors of the official judiciary PDFs, "
    "because the federal judiciary portal requires an entry form before opening reports."
)


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def parse_value_upper_bound(value: Optional[str]) -> int:
    if not value:
        return 0

    numbers = [int(match.replace(",", "")) for match in re.findall(r"\$([0-9,]+)", value)]
    if not numbers:
        return 0

    if "More than $" in value:
        return numbers[-1] * 2

    return max(numbers)


def parse_value_lower_bound(value: Optional[str]) -> int:
    if not value:
        return 0

    numbers = [int(match.replace(",", "")) for match in re.findall(r"\$([0-9,]+)", value)]
    if not numbers:
        return 0

    if "More than $" in value:
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


def sort_by_date_desc(entries: List[Dict[str, str]]) -> List[Dict[str, str]]:
    def key(entry: Dict[str, str]) -> Tuple[int, str]:
        for pattern in ("%m/%d/%Y", "%m/%d/%y"):
            try:
                return (1, datetime.strptime(entry["date"], pattern).strftime("%Y-%m-%d"))
            except (KeyError, ValueError):
                continue
        return (0, entry.get("date", ""))

    return sorted(entries, key=key, reverse=True)


def extract_report_date(report_text: str) -> Optional[str]:
    match = re.search(r"3\. Date of Report\s*\n([^\n]+)", report_text)
    if not match:
        return None
    return clean_text(match.group(1))


def parse_liabilities(report_text: str) -> List[Dict[str, str]]:
    match = re.search(r"VI\. LIABILITIES\.(.*?)VII\. INVESTMENTS and TRUSTS", report_text, re.S)
    if not match:
        return []

    liabilities: List[Dict[str, str]] = []

    for raw_line in match.group(1).splitlines():
        line = clean_text(raw_line)
        row_match = re.match(r"^\d+\.\s*(.+)$", line)

        if not row_match:
            continue

        row_text = clean_text(row_match.group(1))
        if not row_text:
            continue

        parts = row_text.split()
        value_code = parts[-1]
        if value_code not in VALUE_CODES:
            continue

        amount = VALUE_CODES[value_code]
        core = clean_text(" ".join(parts[:-1]))
        if " Mortgage on " in core:
            creditor, liability_type = core.split(" Mortgage on ", 1)
            creditor = clean_text(creditor)
            liability_type = f"Mortgage on {clean_text(liability_type)}"
        else:
            description_match = re.search(
                r"\b(Priority Credit Line|Credit Line|Line of Credit|HELOC|Loan|Promissory Note|Note)\b.*$",
                core,
                re.IGNORECASE,
            )

            if description_match:
                creditor = clean_text(core[: description_match.start()])
                liability_type = clean_text(core[description_match.start() :])
            else:
                creditor = core
                liability_type = "Liability"

        liabilities.append(
            {
                "amount": amount,
                "creditor": creditor,
                "type": liability_type,
            }
        )

    return liabilities


def parse_section_vii_rows(reader: PdfReader) -> List[str]:
    rows: List[str] = []

    for page in reader.pages:
        page_text = page.extract_text() or ""
        if "VII. INVESTMENTS and TRUSTS" not in page_text:
            continue

        marker = "E =$15,001 - $50,000"
        marker_index = page_text.find(marker)
        if marker_index == -1:
            continue

        page_body = page_text[marker_index + len(marker) :]
        page_body = page_body.split("FINANCIAL DISCLOSURE REPORT")[0]

        current_row: Optional[str] = None

        for raw_line in page_body.splitlines():
            line = clean_text(raw_line)
            if not line:
                continue

            row_match = re.match(r"^(\d+)\.\s*(.*)$", line)
            if row_match:
                if current_row:
                    rows.append(clean_text(current_row))
                current_row = row_match.group(2).strip()
                continue

            if current_row:
                current_row += f" {line}"

        if current_row:
            rows.append(clean_text(current_row))

    return rows


def split_inline_transaction(row_text: str) -> Tuple[str, Optional[Dict[str, str]]]:
    match = re.search(
        r"\b(Buy(?: \(add'l\))?|Sold(?: \(part\))?|Sold|Redeemed|Open|"
        r"Spinoff(?: \(from line \d+\))?|Donated(?: \(part\))?)\s+"
        r"(\d{2}/\d{2}/\d{2})(?:\s+([A-Z0-9]+))?(?:\s+([A-Z0-9]+))?\s*$",
        row_text,
    )

    if not match:
        return row_text, None

    return clean_text(row_text[: match.start()]), {
        "date": match.group(2),
        "type": match.group(1),
        "valueCode": match.group(3),
    }


def is_transaction_only_row(row_text: str) -> bool:
    return bool(
        re.match(
            r"^(Buy(?: \(add'l\))?|Sold(?: \(part\))?|Sold|Redeemed|Open|"
            r"Spinoff(?: \(from line \d+\))?|Donated(?: \(part\))?)\b",
            row_text,
        )
    )


def extract_holding_label_and_value(row_text: str) -> Tuple[Optional[str], Optional[str]]:
    tokens = row_text.split()
    if len(tokens) >= 2 and tokens[-1] in METHOD_CODES and tokens[-2] in VALUE_CODES:
        value_code = tokens[-2]
        core_tokens = tokens[:-2]
    elif tokens and tokens[-1] in VALUE_CODES:
        value_code = tokens[-1]
        core_tokens = tokens[:-1]
    else:
        return clean_text(row_text), None

    income_index = None
    for index in range(len(core_tokens) - 1, -1, -1):
        if core_tokens[index] in INCOME_CODES:
            income_index = index
            break

    label_tokens = core_tokens if income_index is None else core_tokens[:income_index]
    label = clean_text(" ".join(label_tokens).lstrip("-").strip())
    return label or None, VALUE_CODES.get(value_code)


def should_keep_holding(label: Optional[str], value: Optional[str]) -> bool:
    if not label or not value:
        return False

    ignored_exact_labels = {
        "Individual Assets (H)",
        "Roth IRA (H)",
        "Traditional IRA (H)",
        "Traditonal IRA (H)",
    }

    if label in ignored_exact_labels:
        return False

    if re.fullmatch(r"Account #\d+ \(H\)", label):
        return False

    return True


def parse_holdings(reader: PdfReader) -> List[Dict[str, str]]:
    holdings: List[Dict[str, str]] = []

    for row_text in parse_section_vii_rows(reader):
        if is_transaction_only_row(row_text):
            continue

        holding_part, _ = split_inline_transaction(row_text)
        label, value = extract_holding_label_and_value(holding_part)

        if should_keep_holding(label, value):
            holdings.append({"label": label, "value": value})

    deduped: Dict[str, Dict[str, str]] = {}
    for holding in holdings:
        current = deduped.get(holding["label"])
        if current is None or parse_value_upper_bound(holding["value"]) > parse_value_upper_bound(
            current["value"]
        ):
            deduped[holding["label"]] = holding

    return select_top_holdings(list(deduped.values()))


def import_judicial_disclosures(
    data_path: Path,
    source_dir: Path,
    public_dir: Path,
    periodic_dir: Optional[Path] = None,
) -> None:
    dataset = json.loads(data_path.read_text())
    people = dataset.get("people", [])
    people_by_id = {person["id"]: person for person in people}

    public_dir.mkdir(parents=True, exist_ok=True)

    for person_id, filename in CURRENT_JUSTICE_FILES.items():
        source_path = source_dir / filename
        if not source_path.exists():
            raise FileNotFoundError(f"Missing judicial PDF: {source_path}")

        destination_path = public_dir / filename
        shutil.copy2(source_path, destination_path)

        reader = PdfReader(str(source_path))
        report_text = "\n".join((page.extract_text() or "") for page in reader.pages)
        person = people_by_id.get(person_id)

        if person is None:
            raise KeyError(f"Could not find person id {person_id} in dataset")

        person["financialAnnualReportLabel"] = "Annual disclosure report"
        person["financialAnnualReportUrl"] = f"judicial-disclosures/{filename}"
        person["financialDisclosureNote"] = JUDICIAL_NOTE

        filing_date = extract_report_date(report_text)
        if filing_date:
            person["financialFilingDate"] = filing_date

        liabilities = parse_liabilities(report_text)
        if liabilities:
            person["liabilities"] = liabilities
        else:
            person.pop("liabilities", None)

        top_holdings = parse_holdings(reader)
        if top_holdings:
            person["topHoldings"] = top_holdings
        else:
            person.pop("topHoldings", None)

        recent_trades: List[Dict[str, str]] = []
        if periodic_dir and periodic_dir.exists():
            for report in JUDICIAL_PERIODIC_TRANSACTION_REPORTS.get(person_id, []):
                filename = report["filename"]
                report_source_path = periodic_dir / str(filename)
                if not report_source_path.exists():
                    raise FileNotFoundError(f"Missing judicial PTR PDF: {report_source_path}")

                report_destination_path = public_dir / str(filename)
                shutil.copy2(report_source_path, report_destination_path)
                report_url = f"judicial-disclosures/{filename}"

                for trade in report["trades"]:
                    recent_trades.append(
                        {
                            "amount": str(trade["amount"]),
                            "assetName": str(trade["assetName"]),
                            "date": str(trade["date"]),
                            "sourceUrl": report_url,
                            "type": str(trade["type"]),
                        }
                    )

        if recent_trades:
            person["recentTrades"] = sort_by_date_desc(recent_trades)
        else:
            person.pop("recentTrades", None)

    data_path.write_text(json.dumps(dataset, indent=2) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data",
        default="public/data/governmentData.json",
        help="Path to the generated government data JSON.",
    )
    parser.add_argument(
        "--source-dir",
        default="69bd06fc90195",
        help="Directory containing manually downloaded judiciary disclosure PDFs.",
    )
    parser.add_argument(
        "--public-dir",
        default="public/judicial-disclosures",
        help="Public directory where mirrored judiciary PDFs should be copied.",
    )
    parser.add_argument(
        "--periodic-dir",
        default="69bd0bf84c692",
        help="Directory containing manually downloaded judiciary periodic transaction report PDFs.",
    )
    args = parser.parse_args()

    import_judicial_disclosures(
        data_path=Path(args.data),
        source_dir=Path(args.source_dir),
        public_dir=Path(args.public_dir),
        periodic_dir=Path(args.periodic_dir),
    )


if __name__ == "__main__":
    main()
