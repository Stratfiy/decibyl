# SEO — setup, and what actually moves the numbers

Two different things live in this file. The first half is a runbook you execute once:
getting decibyl.ai verified in Google Search Console and submitted properly. The second
half is the part that decides whether any of it matters — what to do for the twelve weeks
after, when the graph is flat and it feels like nothing is working.

Read the second half before you start the first. The setup is thirty minutes of clicking.
The rest is the job.

---

## Part 0 · What is already done

Do not redo these. They are in the repo and they ship on every deploy.

| Signal | Where | State |
|---|---|---|
| Canonical tag on every page | `lib/seo.tsx` → `pageMetadata` | ✅ absolute, always `decibyl.ai` |
| Preview deploys blocked from the index | `app/robots.ts` + `isProductionSite` | ✅ `Disallow: /` on every `.vercel.app` |
| `sitemap.xml` | `app/sitemap.ts` | ✅ 57 URLs, real edit dates from `npm run dates` |
| `robots.txt` with sitemap + host | `app/robots.ts` | ✅ |
| Organization / WebSite / SoftwareApplication schema | `lib/seo.tsx`, emitted site-wide | ✅ one entity, stable `@id` |
| BreadcrumbList | 25 pages | ✅ |
| FAQPage | 8 template-driven pages | ✅ (see the note on FAQ rich results below) |
| Article schema on all 8 posts | per-post | ✅ with image, publisher, `isPartOf` |
| `llms.txt` for answer engines | `app/llms.txt/route.ts` | ✅ generated from the data files |
| RSS feed | `app/feed.xml/route.ts` | ✅ linked from every page |
| Google verification meta tag | `app/layout.tsx` | ✅ `j8NFMFrj2sh…` |
| Google verification HTML file | `public/google546caf58e3983f21.html` | ✅ a *second*, different token |
| Static generation of every marketing page | `next build` | ✅ all `○` / `●` |

**Two verification tokens is not a bug, but know why.** The meta tag and the HTML file are
different tokens, which means two different Google accounts (or two attempts from one)
have claimed this site. Both keep working. Before you start, decide which Google account
owns the property, verify with that one, and add the other person as a **user** on the
property rather than leaving two half-claimed verifications around. Delete neither file —
removing a verification token un-verifies whoever used it, silently.

**One thing left for you, not for code:** `site.profiles` in `lib/site.ts` is an empty
array. It becomes `sameAs` in the Organization schema — the LinkedIn company page, X,
Crunchbase, the GitHub org. For a domain with no backlinks, `sameAs` is the cheapest way
to tell Google that "Decibyl", "nAutomation Labs Pvt Ltd" and that LinkedIn page are one
company. Fill it in the day each profile exists. Do not put an aspirational URL there.

---

## Part 1 · Search Console setup

### 1 · Create a **Domain** property, not a URL-prefix property

<https://search.google.com/search-console> → **Add property** → left box, **Domain** →
`decibyl.ai` (no `https://`, no `www`).

A URL-prefix property only reports on `https://decibyl.ai/`. A domain property covers
`http`, `https`, `www`, non-`www`, *and every subdomain* — so `inapp.decibyl.ai` and
`docs.decibyl.ai` roll up into the same account. You want that: those subdomains will
attract queries, and you want to see them.

Verification is DNS-only. Google shows a TXT record:

```
Type: TXT   Name: @   Value: google-site-verification=…
```

Add it at your registrar, wait, click **Verify**. DNS can take an hour; it usually takes
five minutes. The meta tag and HTML file already in the repo do **not** verify a domain
property — they only verify URL-prefix properties. Keep them anyway.

### 2 · Also add the URL-prefix property `https://decibyl.ai/`

Yes, both. The domain property is the complete picture; the URL-prefix property is the one
some third-party tools and the older API integrations can actually read, and it verifies
instantly off the meta tag that is already deployed. Two properties, zero extra work.

### 3 · Submit the sitemap

**Indexing → Sitemaps → Add a new sitemap →** `sitemap.xml` → Submit.

Then check it says **Success** and **57 discovered URLs**. If it says 0, the deploy hasn't
propagated yet; re-check in an hour rather than resubmitting.

Do not submit `/feed.xml` here. It is for feed readers, not for Google.

### 4 · Prime the crawl by hand — the top 10 URLs only

**URL Inspection** (top bar) → paste the URL → **Request indexing**. There is a small
daily quota, so spend it on the pages that carry revenue intent, in this order:

1. `/` 
2. `/pricing`
3. `/solutions/clinics`
4. `/ai-receptionist`
5. `/voice-ai`
6. `/compare`
7. `/solutions/d2c-ndr-recovery`
8. `/blog/ai-voice-agent-pricing-india`
9. `/blog/dpdp-act-ai-voice-calls-guide`
10. `/how-it-works`

The other 47 URLs come in through the sitemap over the following two to six weeks. Do not
request indexing on all 57 — it does not speed anything up, and burning the quota on
`/legal/refund` is a waste of the one manual lever you have.

### 5 · Set the settings that people forget

- **Settings → Users and permissions** → add the second founder as Owner, not as a
  restricted user. One person's laptop dying should not cost you the property.
- **Settings → Association** → associate the Google Analytics / GTM property if one exists.
- Turn on email alerts (they are on by default). Coverage errors and manual actions arrive
  by mail, and a manual action you notice three weeks late is a month of traffic.

### 6 · Do the same in Bing — it takes four minutes

<https://www.bing.com/webmasters> → **Import from Google Search Console**. One OAuth click
and it copies the property and the sitemap across. Bing is single-digit share in India, but
it is also the index behind Copilot and several AI answer surfaces, and the import costs
you nothing.

### 7 · Verify the deploy, properly

```bash
curl -s https://decibyl.ai/robots.txt
curl -s https://decibyl.ai/sitemap.xml | grep -c "<loc>"       # expect 57
curl -s https://decibyl.ai/feed.xml   | grep -c "<item>"       # expect 8
curl -sI https://decibyl.ai/api/og?title=test | head -1        # expect 200
curl -s https://decibyl.ai/ | grep -o '<link rel="canonical"[^>]*>'
```

Then paste the home page and one blog post into the
[Rich Results Test](https://search.google.com/test/rich-results). You want zero errors.
Warnings about optional fields are fine and always will be.

---

## Part 2 · Why impressions are flat, and what actually changes that

### Set the expectation first

A domain registered this year, with no backlinks, in a category where the incumbents are
funded and indexed, does approximately nothing for six to ten weeks. That is not a failure
state and it is not something a technical fix accelerates. The sequence is always:

```
crawled → indexed → impressions on long-tail brand-adjacent queries
  → impressions on real category queries → clicks → rankings that hold
```

Most people give up between step three and step four, because step three looks like
"200 impressions, 1 click, position 47" and reads as failure. It is not. It is the index
telling you which of your 57 pages it understands. That list is the single most useful
piece of information you will get in month two, and it only exists if you shipped enough
pages to generate it — which this site has.

### Impressions are a function of three things you control

An impression happens when one of your URLs appears in results for a query. So:

**impressions ≈ (indexed pages) × (queries each page can plausibly match) × (position good enough to render)**

Every lever below moves exactly one of those three terms. Nothing else does.

---

### Lever 1 — Get all 57 pages indexed, then find the ones that aren't

**Indexing → Pages** is the report that matters in month one. Ignore Performance entirely
for the first three weeks; it will be empty and staring at it teaches you nothing.

What you are looking for, and what each thing means here:

| Status | What it means on this site | What to do |
|---|---|---|
| **Crawled — currently not indexed** | Google fetched it and judged it not worth storing. On a programmatic site this almost always means the page is too similar to its siblings. | Real fix: differentiate the page. See Lever 2. |
| **Discovered — currently not indexed** | Crawl budget. Normal for a new domain with 57 URLs. | Wait. Internal links from indexed pages fix this faster than resubmitting. |
| **Duplicate, Google chose a different canonical** | Something is serving the same content on two URLs. | Check it isn't a `.vercel.app` preview that escaped — `robots.ts` blocks these, so this should never appear. If it does, it's a real bug. |
| **Alternate page with proper canonical tag** | Working as designed. | Nothing. |
| **Excluded by robots.txt** | Should only ever be `/api/*` except `/api/og`. | If a real page shows up here, something in `robots.ts` regressed. |

The honest read: if 40 of 57 are indexed by week six, you are fine. If 15 are, your
programmatic pages are too thin and Lever 2 is your whole job.

### Lever 2 — The programmatic pages are the whole strategy, and they are also the risk

This site has 10 solution pages, 9 city pages, 8 language pages and 7 comparison pages
generated from four data files. That is the correct bet — it is how a site with no
authority reaches queries the incumbents ignore. But Google indexes generated pages on one
criterion: **does this page say something the sibling page doesn't?**

For every templated page, at least these have to be genuinely different, not
find-and-replaced:

- The FAQ answers. Three unique, specific questions per page beats twelve shared ones.
- One concrete number, scenario, or constraint that only applies to that vertical/city/language.
- The example call script or transcript.

The test: cover the `<h1>` and read the page. If you can't tell whether you're on the
dental page or the diagnostics page, Google can't either, and it will index one and drop
the other. **Prune before you expand.** Nine city pages that are each genuinely about that
city beats forty that aren't — and forty near-identical pages is how a site earns a
site-wide quality problem that is much harder to undo than it was to create.

### Lever 3 — Mine the Performance report for what Google already thinks you're about

From week four, this is the loop. **Performance → Search results**, set the date range to
the last 28 days, then:

**a) Sort by impressions, filter to position 8–20.** These are queries where you already
appear on page one or two and get no clicks. This is the highest-return work on the entire
site: a page at position 11 moved to position 7 can multiply its clicks, and the page
already exists. Usually the fix is that the query is a slightly different intent than the
page's `<h1>` — so add a section that answers it directly, in the words the query uses.

**b) Filter to queries with impressions and zero clicks, any position.** Read the actual
query strings. They tell you what people think you do. Half of them will be things you
hadn't thought to write about, and each one is a section, a FAQ entry, or a post.

**c) Compare Pages tab against your sitemap.** Any URL with zero impressions after eight
weeks is either not indexed (Lever 1) or not differentiated (Lever 2).

**d) Filter country = India, then not-India.** This site claims "built in India, shipped
for the world". The Performance report will tell you within two months whether the second
half is true. If international impressions are real, that is a positioning signal worth
acting on.

### Lever 4 — Title and description rewrites, because CTR compounds

Impressions get you nothing on their own. The title tag is the only lever between an
impression and a click, and it is one line in `pageMetadata` per page.

Rules that hold in this market:

- Front-load the query, not the brand. `| Decibyl` is already appended by the template.
- Put a number in it where a real one exists — a price, a language count, a per-minute rate.
- Under 60 characters or Google rewrites it. It rewrites roughly two thirds of titles
  anyway, but a good one gets rewritten less.
- The description does not affect ranking. It affects clicks. Write it as ad copy for the
  one person who has that problem right now.

Rewrite the ten worst-CTR / highest-impression pages every month. That is a 30-minute job
with measurable output, and it is the closest thing to free traffic that exists.

### Lever 5 — Publish against real questions, at a survivable rate

Eight posts is a start, not a blog. One genuinely good post every two weeks beats four
thin ones a month, and it beats a burst of twelve followed by silence — which is the
pattern every startup blog actually follows and the reason most of them stop earning
impressions by month four.

What to write, in priority order, is decided by the data, not by taste:

1. Queries from Lever 3(b) — things people already ask you for and you don't answer.
2. The comparison long tail: "X vs Y", "X pricing", "X alternatives India", "is X compliant
   with DPDP". You already have `/compare/*`; the posts feed them internal links.
3. The regulatory beat — TRAI, TCCCPR, DPDP. You have two posts here and it is the single
   most defensible content position on the site, because it needs India-specific knowledge
   that a US competitor's content team does not have and cannot fake. Update these posts
   when the rules change and note the update date honestly. A maintained regulatory guide
   accumulates links; a listicle does not.

Every post must link to at least two money pages (`/pricing`, a `/solutions/*`, a
`/compare/*`) with descriptive anchor text. Internal links are the mechanism that gets your
deep pages crawled and passes what little authority the domain has to the pages that
convert. This is free and most sites skip it.

### Lever 6 — Off-site, which is the part nobody wants to do

No amount of on-page work substitutes for the domain being cited somewhere. The realistic
list for a company at this stage, roughly in order of return per hour:

- **Google Business Profile** for the Hosur registered address. Free, and it is what makes
  the entity real to Google — it connects to the `PostalAddress` already in the schema.
- Company profiles that allow a link and are unambiguously you: LinkedIn, Crunchbase,
  AngelList, G2, Product Hunt, the Indian SaaS directories. Then put every one of them into
  `site.profiles`.
- Answer the actual questions on r/indiabusiness, r/SaaS, Indian founder communities and
  relevant Slack/WhatsApp groups. Not link-drops — answers, where the link is the citation
  for a claim you just made. This is slow and it works.
- One or two genuine partnerships or integrations with a page on the partner's site.
- Anything that produces a number nobody else has published: a survey of NDR rates across
  50 D2C brands, a teardown of what seven voice AI vendors actually charge per minute. Data
  is the only content type that reliably earns links without asking.

### Lever 7 — Answer engines, which now sit in front of search

`llms.txt` and the JSON-LD are already doing the mechanical part. The behavioural part:
ChatGPT, Perplexity, Gemini and Copilot cite pages that make a *checkable, specific claim
near the top of the page*. Buried answers do not get cited. Where a page answers a real
question, answer it in the first two sentences of a section, in plain declarative prose,
with the number in it. The FAQ blocks on this site already do this well — extend the habit
to the body copy.

Track it manually: once a month, ask each engine the ten queries you care about and record
whether decibyl.ai appears. There is no Search Console for this yet.

---

## Part 3 · The operating cadence

**Weekly, 15 minutes.** Search Console → Indexing → Pages. New errors? New "crawled — not
indexed"? That's it. Do not look at Performance weekly; the noise will make you change
things that were working.

**Monthly, 2 hours.**
1. Performance → last 28 days vs previous 28. Impressions, clicks, average position.
2. Pull the position 8–20 list (Lever 3a) and fix the top five pages.
3. Rewrite the ten worst-CTR titles (Lever 4).
4. Check `npm run dates` was run on the last content deploy, so the sitemap tells the truth.
5. Ask the four answer engines your ten queries and record the result.

**Quarterly.**
- Re-run Lighthouse on `/`, `/pricing`, and one `/solutions/*`. Core Web Vitals are a
  tiebreaker, not a lever, but a regression is worth catching.
- Re-read the ten thinnest programmatic pages as a stranger. Prune or deepen.
- Review whether any `/compare/*` page is now factually stale. A comparison page that
  misstates a competitor's current pricing is a legal and reputational problem before it is
  an SEO one.

---

## What not to do

- **Do not buy links, or "guest post packages", or directory bundles.** In this market the
  offers arrive within a week of the domain being indexed. They are the one category of
  mistake that is expensive to undo.
- **Do not add review or rating schema until real reviews exist.** `lib/seo.tsx` already
  refuses to, deliberately. Fabricated `AggregateRating` is a manual-action risk, and a
  manual action costs months.
- **Do not expect FAQ rich results.** Google restricted FAQ rich results to
  well-known authoritative sites in 2023. Keep the `FAQPage` schema — it still helps
  parsing and answer engines — but do not treat missing FAQ stars as a bug to fix.
- **Do not chase "AI voice agent" as a head term.** It is a two-year fight against funded
  incumbents. The winnable set is specific: *"AI receptionist for dental clinic Bangalore"*,
  *"Bolna vs Vapi pricing India"*, *"is AI calling legal under DPDP"*. Win five hundred of
  those and the head term follows. It does not work in the other direction.
- **Do not add a `www` redirect chain, a second domain, or a `/in/` locale prefix.** Every
  one of those splits the signal that this site currently has all in one place.
- **Do not delete or rename a URL that has impressions.** If a page must move, 301 it. A
  404 on an indexed URL throws away everything that URL earned.
