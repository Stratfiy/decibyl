# Lead generation toolchain

Free, self-hosted alternatives to Apify and Firecrawl, plus a local script that turns
scraper output into a prioritised outreach list.

**Nothing here runs on Vercel.** This folder is inert as far as the Next.js build is
concerned — it is operator tooling, run on your own machine.

---

## ⚠️ Verification status of the links below

Repo URLs could not be verified from the environment these notes were written in — the
GitHub API there is scoped to `stratfiy/decibyl` only, and every external request returned
403. Links are marked:

- **[SEARCH]** — the URL appeared directly in a search result, so the path is as-published
- **[KNOWN]** — canonical path from prior knowledge, **confirm before relying on it**

Star counts are as reported in search results in August 2026 and will drift.

---

## 1. The Firecrawl question — you probably don't need an alternative

**Firecrawl is open source (AGPL-3.0) and self-hostable.** Reported at 100k+ stars, the
largest repo in this space. The paid product is the managed cloud; the crawler itself is
free to run yourself.

- `github.com/firecrawl/firecrawl` **[KNOWN]** — note the org renamed from `mendableai`,
  so confirm which path currently resolves

If you want a non-AGPL option:

- **Crawl4AI** — `github.com/unclecode/crawl4ai` **[KNOWN]**. Reported 60k+ stars and the
  #1 trending web-crawling repo. Python, outputs LLM-ready Markdown — same core job as
  Firecrawl. **Apache 2.0**, which is more permissive than Firecrawl's AGPL-3.0. This is
  the one to reach for if licence terms matter.
- **ScrapeGraphAI** — `github.com/ScrapeGraphAI/Scrapegraph-ai` **[KNOWN]**. Extracts
  schema-validated JSON from a natural-language prompt and adapts when markup changes.
  Useful when you don't want to maintain CSS selectors.

## 2. The Apify question — same answer

**Crawlee is Apify's own open-source crawling stack.** Run it on your own machine and pay
no platform fee.

- `github.com/apify/crawlee` **[KNOWN]** — JavaScript/TypeScript
- `github.com/apify/crawlee-python` **[KNOWN]** — Python

Also worth knowing:

- **Maxun** — `github.com/getmaxun/maxun` **[KNOWN]**. No-code, self-hosted. Point and
  click rather than writing scrapers.
- **Scrapy** — `github.com/scrapy/scrapy` **[KNOWN]**. The mature Python framework. Least
  glamorous, most reliable at volume.
- **n8n** — already a listed Decibyl integration. Self-hostable and has scraping nodes, so
  if you're running it anyway it may cover simple jobs without a second tool.

## 3. Google Maps — the actual lead source for dental, labs and solar

These URLs came straight out of search results, so the paths are as-published.

| Repo | Notes |
|---|---|
| `github.com/omkarcloud/google-maps-scraper` **[SEARCH]** | Reported 2.8k+ stars, most popular. 50+ fields per listing including emails and social profiles. Browser automation, so it's slow at country scale. |
| `github.com/gosom/google-maps-scraper` **[SEARCH]** | Go. CLI + web UI + REST API. Best fit if you want to script it. |
| `github.com/Zubdata/Google-Maps-Scraper` **[SEARCH]** | The only one with a GUI. Use this if you'd rather not touch a terminal. |
| `github.com/Mahanaicoach/google-maps-scraper-kit` **[SEARCH]** | Docker wrapper around `gosom`, one-command setup. |

**Rate limiting is real.** Big back-to-back jobs, high depth, many keywords, or scheduled
runs without proxies will get your IP temporarily blocked. Run one city at a time and
space the jobs out.

## 4. Sources that need no scraper

- **PM Surya Ghar vendor lists** — `pmsuryaghar.gov.in/state-wise-vendor` filters by state
  then DISCOM and lets you download each DISCOM's list. There are ~70–80 DISCOMs, so a
  national installer list is *constructible* but has to be assembled DISCOM by DISCOM. No
  published national table exists. This is the single best lead source for the solar ICP
  and it's a government portal, not a scrape target.
- **State solar portals** — Gujarat (`suryagujarat.guvnl.in/installer-list`), Telangana and
  Puducherry publish their own vendor PDFs separately.

---

## 5. What's in this folder

`prepare_leads.py` — takes raw scraper CSV output and produces a deduplicated, filtered,
scored outreach list. Runs entirely offline; no network, no API keys.

```bash
python3 scripts/leadgen/prepare_leads.py raw_export.csv --niche dental --city Mumbai
python3 scripts/leadgen/prepare_leads.py raw_export.csv --niche solar -o leads.csv
```

It is deliberately conservative: a row with no phone number is dropped, because the
product being sold is phone automation and a lead you cannot call is not a lead.

Run `--help` for the full flag list.
