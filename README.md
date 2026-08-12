# decibyl-web

Marketing site for **Decibyl** — India's revenue recovery layer. Next.js 15 (App Router),
TypeScript, Tailwind v4, Supabase for lead storage, deployed on Vercel.

Every marketing page is statically generated. That is non-negotiable: the whole point of the
`/solutions/*` and `/compare/*` routes is to rank, and a client-rendered SPA doesn't.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in the values, see below
npm run dev                    # http://localhost:3000
```

```bash
npm run build                  # production build — all routes should print ○ or ●
npm run typecheck
```

---

## Deploying for free — the whole runbook

Everything below fits inside free tiers: Vercel Hobby, Supabase Free, and a domain you already
own. Total cost is ₹0 plus the domain.

### 1 · Push the repo to GitHub

Already done if you're reading this in the repo. If you're starting from a local copy:

```bash
git remote add origin https://github.com/<you>/decibyl-web.git
git push -u origin main
```

### 2 · Create the Supabase project (5 minutes)

1. Go to <https://supabase.com> → **New project**.
2. Name it `decibyl`, pick a strong database password, and choose region
   **South Asia (Mumbai) `ap-south-1`**. This matters — the site tells people their data is in
   India, so it has to actually be.
3. Wait for it to provision, then open **SQL Editor → New query**.
4. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and run it.
5. Go to **Project Settings → API** and copy two values:
   - **Project URL** → this is `SUPABASE_URL`
   - **`service_role` secret** → this is `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ The `service_role` key bypasses row-level security. It is server-only. Never prefix it with
> `NEXT_PUBLIC_`, never paste it into a client component, never commit it. The table has RLS
> enabled with zero policies, so the `anon` key can't read or write leads even if it leaks.

### 3 · Deploy to Vercel (5 minutes)

1. Go to <https://vercel.com> → **Add New → Project** → import the GitHub repo.
2. Vercel auto-detects Next.js. Leave the build settings alone.
3. **You can deploy with no environment variables at all** — the site builds and previews fine
   without them, and picks up its own URL from Vercel. Forms will show a "we couldn't save that"
   message until Supabase is wired. When you're ready, open **Environment Variables** and add:

   | Name | Value | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://decibyl.ai` | Production |
   | `SUPABASE_URL` | from step 2 | All |
   | `SUPABASE_SERVICE_ROLE_KEY` | from step 2 | All |
   | `N8N_LEAD_WEBHOOK_URL` | your n8n webhook URL | All (optional) |
   | `N8N_WEBHOOK_SECRET` | any long random string | All (optional) |

   Leave `NEXT_PUBLIC_SITE_URL` **unset** on Preview and Development — with nothing set, canonical
   tags and OG images resolve from Vercel's own `VERCEL_URL`, so a preview points at itself rather
   than at production.

   > ⚠️ If Vercel offers to import variables from `.env.example`, skip it — or delete the empty
   > rows afterwards. An env var that is present-but-empty is not the same as absent, and empty
   > values are what most "builds locally, fails on Vercel" deploys turn out to be.

4. **Deploy.** First build takes about two minutes.

### 4 · Point the domain at it

1. In Vercel: **Project → Settings → Domains → Add** `decibyl.ai` and `www.decibyl.ai`.
2. Vercel shows the DNS records to create. At your registrar:
   - `A` record on `@` → `76.76.21.21`
   - `CNAME` on `www` → `cname.vercel-dns.com`
   (Use whatever values Vercel actually shows — they occasionally change.)
3. `inapp.decibyl.ai` and `docs.decibyl.ai` stay on their own hosts. This site only links to them.
4. TLS is issued automatically once DNS propagates.

### 5 · Turn on analytics (free)

**Project → Analytics → Enable.** Vercel Web Analytics is cookieless and free on Hobby. If you
want the client script as well:

```bash
npm i @vercel/analytics
```

then add `<Analytics />` from `@vercel/analytics/next` to `app/layout.tsx`.

### 6 · Verify the deploy

- [ ] `https://decibyl.ai/sitemap.xml` lists all 23 routes
- [ ] `https://decibyl.ai/robots.txt` points at the sitemap
- [ ] Submit the sitemap in Google Search Console
- [ ] Submit a test lead on `/book-a-demo` and confirm the row lands in Supabase → **Table
      Editor → leads**
- [ ] `curl -I https://decibyl.ai/` returns `x-vercel-cache` and `200`
- [ ] Run Lighthouse on `/` and `/pricing`

---

## Lead capture

Three forms, one table, one endpoint.

| Form | Route | Promise made |
|---|---|---|
| Book a demo | `/book-a-demo` | "We'll call you back with a live agent." |
| Join waitlist | `/waitlist` | "Early access when self-serve opens." |
| Contact | `/contact` | "We'll reply within one business day." |

`POST /api/leads` does, in order:

1. Zod-validate by `form_type` (`lib/schema.ts`)
2. Honeypot check — hidden `company_website` field. If filled: **return 200 and drop.** A 400
   would tell the bot it was caught.
3. Rate limit — 5 requests / 10 min / IP hash (`lib/rate-limit.ts`)
4. Insert into Supabase with the service role key
5. Fire the n8n webhook — awaited, but a webhook failure never fails the request. The lead is
   already saved.
6. Return `{ ok: true }`

Attribution (`source_page`, `referrer`, all five UTMs) is captured on every submission from day
one. You will want those cohorts in three months.

**Calculator hand-off:** the loss calculator passes the visitor's own numbers to `/book-a-demo` as
query params, so the lead arrives pre-qualified with their volume estimate already in the message
field. That's how you know which leads to call first.

### The rate limiter's actual scope

It's an in-memory fixed window, so it's per serverless instance — a burst spread across cold
instances can exceed 5. It stops scripted form spam, which is what it's for. If lead volume ever
justifies it, move the counter to Upstash Redis; the interface in `lib/rate-limit.ts` won't change.

---

## The n8n flow (build this separately)

```
Webhook  ←  POST from /api/leads, signed with HMAC-SHA256 in x-decibyl-signature
 ├─ WhatsApp/Telegram alert to Nithish            ← build this node FIRST
 ├─ Notion: create page in Leads DB, write notion_id back to Supabase
 └─ IF form_type = 'demo'
      └─ Decibyl outbound API → live demo call to the lead's number
           └─ outcome webhook → update demo_outcome in Supabase
```

Verify the signature in n8n before trusting the payload:

```js
crypto.createHmac('sha256', $env.N8N_WEBHOOK_SECRET)
      .update(JSON.stringify($json.body))
      .digest('hex') === $headers['x-decibyl-signature']
```

**Speed-to-lead is the whole game.** A founder who books a demo at 11:00pm and gets a call at
11:00:20 remembers it. Build the alert node before anything else in the flow.

---

## Structure

```
app/
  page.tsx                          home — 15 sections, all SSG
  pricing/                          INR/USD toggle, full table, BYOK block
  how-it-works/
  solutions/page.tsx                index
  solutions/[vertical]/             SSG from data/verticals.ts
  solutions/clinics/                flagship (own route — see note below)
  solutions/clinics/[subvertical]/  dental · ivf-fertility · diagnostics
  compare/[competitor]/             SSG from data/competitors.ts
  book-a-demo/  waitlist/  contact/
  legal/{privacy,terms,dpdp,refund}/
  api/leads/route.ts                single POST handler, all three forms
  api/og/route.tsx                  dynamic OG images
  sitemap.ts  robots.ts
components/
  marketing/SlideDeck.tsx           the signature component — built once, used 3×
  marketing/LossCalculator.tsx      3 variants from one config object
  marketing/LiveTranscript.tsx      the only dark element, the whole motion budget
  marketing/VerticalPage.tsx        the 10-block shared template
  forms/LeadForm.tsx                variant-driven
data/
  pricing.ts        SINGLE SOURCE OF TRUTH for every price
  verticals.ts      7 verticals + 3 clinic sub-verticals
  competitors.ts  faqs.ts  languages.ts  integrations.ts  proof.ts  features.ts
lib/
  supabase.ts       server client, service role, `server-only` guarded
  schema.ts  seo.tsx  rate-limit.ts  site.ts
```

> **Why `/solutions/clinics` has its own route:** the static `clinics/` segment already exists for
> the sub-vertical pages, and in the App Router a static segment takes precedence over its dynamic
> sibling — `/solutions/clinics` would 404 rather than fall through to `[vertical]`. So clinics
> gets `app/solutions/clinics/page.tsx` and is excluded from the `[vertical]` params.

### Adding a vertical

Add an object to `data/verticals.ts`. That's the entire change — the route, the SEO metadata, the
FAQ schema, the sitemap entry, the nav dropdown, and the footer link all follow from the data.
No new component.

### Changing a price

`data/pricing.ts`, one file. Nothing in a component hardcodes a number.

---

## Design system

Tokens live in `app/globals.css` under `@theme`. The short version:

- **Vermilion `#F0431C` is the only action colour.** Every primary button, every link, every
  active state. There is no second action colour.
- **Saffron `#FFB627` appears only on numbers that represent money.** That restraint is what makes
  the calculator output land.
- **Canvas stays cool (`#F4F5F7`), never cream.** Warm cream plus muted orange is the single most
  recognisable AI-generated look on the internet; the cool floor under a hot accent is what makes
  this read as designed.
- **Pill buttons at `999px`**, pastel surfaces on card backgrounds only, gradient text on the hero
  headline once per page, no gradient on a button fill.
- **Motion budget: the transcript panel.** Everything else is a 150ms fade or nothing.

Contrast note: vermilion on white is ~4.0:1 — fine for large text, buttons, and links at 16px+,
**not** for body copy. Body text is always `--color-ink` `#211814`.

Fonts, self-hosted via `next/font/google`: Plus Jakarta Sans (display), IBM Plex Sans (body),
IBM Plex Mono (data), IBM Plex Sans Devanagari, and Noto Sans for Tamil, Telugu, Kannada and
Gujarati. IBM ships a Plex Tamil cut but Google Fonts doesn't serve it, so Tamil is Noto.

---

## Content rules — enforced, not stylistic

1. **Never fabricate a customer, doctor, brand, testimonial, or logo.** `data/proof.ts` ships with
   an empty `logos` array and renders anonymised-but-true cards instead. Populate `logos` only
   with written consent; the component swaps over with no redesign.
2. **Every claim must be provable.** No "No.1", no invented counts, no uptime SLA, no ISO 27001 /
   SOC 2 / HIPAA, no EMR integration.
3. **Every integration carries a truthful status chip.** `data/integrations.ts` defaults are
   deliberately conservative — anything not provable from the brief is marked `coming`. An
   unmarked logo you can't deliver costs you the deal and the referral.
4. **Sample calls are labelled as illustrations**, not as recordings of real customer calls.

---

## Before you point the domain at it

See [`OPEN-ITEMS.md`](OPEN-ITEMS.md). Several numbers on the site are proposals rather than
decisions, and the integration status tiers need confirming one by one.
