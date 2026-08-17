#!/usr/bin/env python3
"""
Turn raw scraper output into a prioritised outreach list.

Runs entirely offline — no network, no API keys, no dependencies beyond the
standard library. Feed it whatever CSV your Google Maps scraper produced and it
will normalise, deduplicate, filter and score the rows.

    python3 prepare_leads.py raw.csv --niche dental --city Mumbai
    python3 prepare_leads.py raw.csv --niche solar --min-reviews 10 -o leads.csv

Column names differ between scrapers, so every field is resolved by trying a
list of likely headers rather than assuming one schema.
"""

from __future__ import annotations

import argparse
import csv
import math
import re
import sys
from pathlib import Path

# Columns are looked up by trying each candidate in order, case-insensitively.
FIELDS: dict[str, tuple[str, ...]] = {
    "name": ("name", "title", "business_name", "company", "place_name"),
    "phone": ("phone", "phone_number", "telephone", "mobile", "contact", "phones"),
    "address": ("address", "full_address", "formatted_address", "location", "street"),
    "website": ("website", "site", "url", "web", "domain"),
    "rating": ("rating", "stars", "review_rating", "avg_rating", "score"),
    "reviews": ("reviews", "review_count", "reviews_count", "user_ratings_total", "num_reviews"),
    "category": ("category", "categories", "type", "types", "main_category"),
    "city": ("city", "locality", "town"),
}

# Multi-location operators run call centres and buy centrally — a much harder,
# slower sale than an owner-operated single location. Down-ranked, not dropped.
CHAIN_HINTS = (
    "apollo", "clove", "sabka", "partha", "fortis", "max ", "manipal", "narayana",
    "dr. lal", "lal path", "metropolis", "thyrocare", "srl ", "vijaya diagnostic",
    "tata ", "adani", "vikram solar", "waaree", "loom solar", "luminous",
)


def norm_header(h: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", h.strip().lower()).strip("_")


def pick(row: dict[str, str], key: str) -> str:
    """Resolve a logical field to whichever column the scraper actually used."""
    for candidate in FIELDS[key]:
        val = row.get(candidate)
        if val and val.strip():
            return val.strip()
    return ""


def normalize_phone(raw: str) -> str | None:
    """Return a single Indian number as +91XXXXXXXXXX, or None if unusable.

    Scrapers often pack several numbers into one cell; we take the first that
    validates. Mobile numbers start 6-9. Landlines are accepted at 10-11 digits
    since STD code lengths vary by city.
    """
    if not raw:
        return None
    for chunk in re.split(r"[,;/|]| and ", raw):
        digits = re.sub(r"\D", "", chunk)
        if digits.startswith("91") and len(digits) == 12:
            digits = digits[2:]
        elif digits.startswith("0") and len(digits) in (11, 12):
            digits = digits[1:]
        if len(digits) == 10 and digits[0] in "6789":
            return f"+91{digits}"
        if 10 <= len(digits) <= 11:  # landline with STD code
            return f"+91{digits}"
    return None


def to_float(s: str) -> float | None:
    try:
        return float(re.sub(r"[^\d.]", "", s))
    except (ValueError, TypeError):
        return None


def to_int(s: str) -> int | None:
    digits = re.sub(r"[^\d]", "", s or "")
    return int(digits) if digits else None


def looks_like_chain(name: str) -> bool:
    low = name.lower()
    return any(hint in low for hint in CHAIN_HINTS)


def score(lead: dict, niche: str) -> float:
    """0-100. Higher = call first.

    The logic is deliberately simple and explainable — if a lead ranks high you
    should be able to see why from the row itself. Weights are a starting point,
    not a tuned model; revise them once you know what actually converts.
    """
    pts = 0.0

    # Review count is the best available proxy for how many customers — and so
    # how many phone calls — this business actually handles. Log-scaled because
    # 500 reviews is not 10x better than 50.
    reviews = lead.get("reviews") or 0
    if reviews:
        pts += min(40.0, 13.0 * math.log10(reviews + 1))

    # Rating band. 3.5-4.8 is the sweet spot: established enough to afford it,
    # imperfect enough to still be fixing things. A flawless 5.0 on six reviews
    # is usually a new business or a seeded one.
    rating = lead.get("rating")
    if rating is not None:
        if 3.5 <= rating <= 4.8:
            pts += 20.0
        elif rating > 4.8:
            pts += 8.0
        elif rating >= 3.0:
            pts += 10.0

    # A website means they already buy software. Mild positive, never required —
    # plenty of the target segment has none, and that's the point.
    if lead.get("website"):
        pts += 8.0

    # Owner-operated single locations decide in one conversation. Chains don't.
    if lead.get("is_chain"):
        pts -= 25.0

    cat = (lead.get("category") or "").lower()
    name = (lead.get("name") or "").lower()
    blob = f"{cat} {name}"

    if niche == "dental":
        # Multi-chair and multi-speciality practices carry more call volume.
        if any(w in blob for w in ("multispeciality", "multi speciality", "multi-speciality")):
            pts += 12.0
        if any(w in blob for w in ("implant", "orthodont", "cosmetic")):
            pts += 8.0  # higher treatment values, so one recovered call is worth more
    elif niche == "solar":
        if any(w in blob for w in ("solar", "renewable", "epc", "energy")):
            pts += 12.0
        if any(w in blob for w in ("rooftop", "installation", "installer")):
            pts += 8.0
    elif niche == "lab":
        if any(w in blob for w in ("diagnostic", "pathology", "lab", "imaging", "scan")):
            pts += 12.0
        if "collection" in blob:
            pts += 6.0  # home collection = booking calls on top of report queries
    elif niche == "coaching":
        if any(w in blob for w in ("coaching", "institute", "academy", "classes", "tuition")):
            pts += 10.0
        if any(w in blob for w in ("neet", "jee", "iit", "upsc", "competitive")):
            pts += 14.0  # test prep LTV dwarfs general tuition

    return round(max(0.0, min(100.0, pts)), 1)


def load(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8-sig", errors="replace") as fh:
        sample = fh.read(8192)
        fh.seek(0)
        try:
            dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
        except csv.Error:
            dialect = csv.excel
        reader = csv.DictReader(fh, dialect=dialect)
        if not reader.fieldnames:
            return []
        reader.fieldnames = [norm_header(h) for h in reader.fieldnames]
        return [dict(r) for r in reader]


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Clean, dedupe and score scraped business rows into an outreach list."
    )
    ap.add_argument("input", type=Path, help="raw CSV from the scraper")
    ap.add_argument(
        "--niche",
        default="generic",
        choices=["dental", "solar", "lab", "coaching", "generic"],
        help="applies niche-specific scoring signals",
    )
    ap.add_argument("--city", help="keep only rows whose address/city contains this")
    ap.add_argument("--min-reviews", type=int, default=0, help="drop rows below this")
    ap.add_argument("--min-score", type=float, default=0.0, help="drop rows below this")
    ap.add_argument("-o", "--output", type=Path, help="write here instead of stdout")
    args = ap.parse_args()

    if not args.input.exists():
        print(f"error: {args.input} not found", file=sys.stderr)
        return 1

    rows = load(args.input)
    if not rows:
        print("error: no rows parsed — check the file has a header line", file=sys.stderr)
        return 1

    leads: dict[str, dict] = {}
    dropped_nophone = dropped_dupe = dropped_filter = 0

    for row in rows:
        phone = normalize_phone(pick(row, "phone"))
        # No phone, no lead. We sell phone automation; a business we cannot call
        # is not a prospect, however good the rest of the row looks.
        if not phone:
            dropped_nophone += 1
            continue

        address = pick(row, "address")
        city = pick(row, "city")
        if args.city and args.city.lower() not in f"{address} {city}".lower():
            dropped_filter += 1
            continue

        reviews = to_int(pick(row, "reviews"))
        if args.min_reviews and (reviews or 0) < args.min_reviews:
            dropped_filter += 1
            continue

        name = pick(row, "name")
        lead = {
            "name": name,
            "phone": phone,
            "city": city,
            "address": address,
            "website": pick(row, "website"),
            "category": pick(row, "category"),
            "rating": to_float(pick(row, "rating")),
            "reviews": reviews,
            "is_chain": looks_like_chain(name),
        }
        lead["score"] = score(lead, args.niche)

        if lead["score"] < args.min_score:
            dropped_filter += 1
            continue

        # Dedupe on phone — the same practice appears under several listings.
        # Keep whichever row scored higher, since it's the more complete record.
        existing = leads.get(phone)
        if existing is None or lead["score"] > existing["score"]:
            if existing is not None:
                dropped_dupe += 1
            leads[phone] = lead
        else:
            dropped_dupe += 1

    ranked = sorted(leads.values(), key=lambda x: x["score"], reverse=True)

    cols = ["score", "name", "phone", "city", "rating", "reviews", "website", "category", "address"]
    out = args.output.open("w", newline="", encoding="utf-8") if args.output else sys.stdout
    try:
        writer = csv.DictWriter(out, fieldnames=cols, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(ranked)
    finally:
        if args.output:
            out.close()

    print(
        f"\n{len(rows)} rows in → {len(ranked)} leads out\n"
        f"  dropped: {dropped_nophone} no phone, {dropped_dupe} duplicate, "
        f"{dropped_filter} filtered\n"
        f"  niche: {args.niche}"
        + (f"  ·  written to {args.output}" if args.output else ""),
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
