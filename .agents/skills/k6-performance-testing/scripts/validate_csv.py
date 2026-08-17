#!/usr/bin/env python3
"""Validate a CSV test-data file before feeding it to k6.

Data the API can't actually consume is worse than no data, so check it up front.
This is schema-agnostic: it does NOT assume any particular columns. Pass the columns you
expect (from discovery) with --required to enforce them; otherwise it only checks structural
health (consistent width, blanks, duplicates, empty file).

Usage:
    python validate_csv.py path/to/test_data.csv
    python validate_csv.py test_users.csv --required username,password
    python validate_csv.py test_users.csv --required email,password --key email   # dedupe on a key

Exit code 0 = usable, 1 = problems found (details printed).
"""
import argparse
import csv
import sys
from collections import Counter


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate a CSV test-data file for k6.")
    ap.add_argument("path", help="Path to the CSV file")
    ap.add_argument("--required", default="",
                    help="Comma-separated columns that must exist and be non-empty")
    ap.add_argument("--key", default="",
                    help="Column to check for duplicate values (e.g. a unique username/email)")
    ap.add_argument("--min-rows", type=int, default=1,
                    help="Minimum data rows expected (default 1)")
    args = ap.parse_args()

    required = [c.strip() for c in args.required.split(",") if c.strip()]
    errors: list[str] = []
    warnings: list[str] = []

    try:
        with open(args.path, newline="", encoding="utf-8") as fh:
            reader = csv.reader(fh)
            rows = [r for r in reader]
    except FileNotFoundError:
        print(f"ERROR: file not found: {args.path}")
        return 1
    except UnicodeDecodeError as e:
        print(f"ERROR: file is not valid UTF-8: {e}")
        return 1

    if not rows:
        print("ERROR: file is empty")
        return 1

    header = [h.strip() for h in rows[0]]
    data = rows[1:]

    # header sanity
    if len(header) != len(set(header)):
        dupes = [h for h, n in Counter(header).items() if n > 1]
        errors.append(f"duplicate header column(s): {dupes}")
    if any(h == "" for h in header):
        errors.append("header contains a blank column name")

    # required columns present
    for col in required:
        if col not in header:
            errors.append(f"required column missing from header: '{col}'")

    # row count
    if len(data) < args.min_rows:
        errors.append(f"expected at least {args.min_rows} data row(s), found {len(data)}")

    # width consistency + blanks in required cells
    idx = {h: i for i, h in enumerate(header)}
    for lineno, row in enumerate(data, start=2):
        if len(row) != len(header):
            errors.append(f"row {lineno}: has {len(row)} cells, header has {len(header)}")
            continue
        for col in required:
            if col in idx and row[idx[col]].strip() == "":
                errors.append(f"row {lineno}: required column '{col}' is blank")

    # duplicate key values
    if args.key:
        if args.key not in idx:
            errors.append(f"--key column '{args.key}' not in header")
        else:
            vals = [row[idx[args.key]].strip() for row in data if len(row) == len(header)]
            dupes = [v for v, n in Counter(vals).items() if n > 1 and v != ""]
            if dupes:
                warnings.append(f"duplicate values in key column '{args.key}': {dupes[:10]}"
                                + (" ..." if len(dupes) > 10 else ""))

    # report
    print(f"file:     {args.path}")
    print(f"columns:  {header}")
    print(f"rows:     {len(data)}")
    if warnings:
        print("\nWARNINGS:")
        for w in warnings:
            print(f"  - {w}")
    if errors:
        print("\nERRORS:")
        for e in errors:
            print(f"  - {e}")
        print("\nRESULT: NOT usable — fix the errors above before running k6.")
        return 1

    print("\nRESULT: usable"
          + (" (with warnings — review whether duplicates are intended)" if warnings else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
