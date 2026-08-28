# Open items — confirm before pointing decibyl.ai at this

The site is built and deploys. These are the things that are **unconfirmed**, where they live in
the code, and what happens today if you do nothing. Nothing here blocks a preview deploy; several
things here should block a public one.

---

## Reconciled against the product, 28 Aug 2026

The site's prices were read against the billing engine in `Stratfiy/echowave-redesign`
for the first time. Three things were wrong on this side and are now fixed; two are
decisions only you can make.

### Fixed here

| What | Was | Now | Why |
|---|---|---|---|
| Additional number | ₹399/mo | **₹559/mo** | `NUMBER_RENTAL_PRICE_PAISE` is ₹559 net, "confirmed on the account, not a list price", against ₹250 of Plivo cost. ₹399 was never collectable. Appeared on the home page, `/pricing` and the pricing FAQ — under-quoting a recurring line by 29%. |
| USD display rate | ₹88 | **₹96** | Matches the engine's `DEFAULT_USD_INR_PAISE`. At 88 we quoted international buyers a *higher* dollar figure than we need: ₹9,999 read as $114 instead of $104. |
| "500 minutes included" | minute bundle | **₹2,500 credit · ~470 min Hindi/English** | See below. |

### The minutes problem, and why the copy changed

**There is no minute allowance anywhere in the product.** No `included_minutes`,
`minute_allowance` or `bundled_minutes` exists in the echowave codebase. A plan grants
`balance_paise` — rupees — and each call draws that down by its *composed* cost: pulsed
platform fee + the LLM, STT and TTS actually consumed at their own rates + carriage,
marked up (`api/services/billing/costing.py`). Two calls of the same length can cost
different amounts.

So "500 minutes included, then ₹5.30/min" was a promise the engine could not keep, in
two separate ways:

1. **The arithmetic never worked.** Starter grants ₹2,500 (`STARTER_PLAN_BALANCE_PAISE`).
   At the published ₹5.30/min that is ~470 minutes, not 500 — a ~6% overstatement before
   anything else goes wrong.
2. **Regional languages break it much harder.** The internal stack floor is ₹1.74/min
   Hindi/English but ₹3.28/min regional. A Tamil clinic — the exact buyer
   `/solutions/clinics` and `/solutions/clinics/ivf-fertility` are written for — exhausts
   the same ₹2,500 in materially fewer minutes than the page implied.

Every minute figure on the site now carries the Hindi/English qualifier, and the unit is
stated as credit. `data/pricing.ts` carries a CONTRACT block naming which product
constant each figure must track, so the next drift is catchable by reading one file.

Note this is the positioning you already chose — the Starter comment dated 13 Aug 2026
says "the platform plan, not a minute bundle". The bullets just hadn't caught up.

### Open — needs your decision

**R1 · Growth's entitlement is unverified.** `ensure_seeded` in echowave creates the
`starter` plan only. A Growth row can be created by an operator through
`/superadmin/billing`, and one may well exist in production — but nothing in either
repository proves what balance it grants. `/pricing` currently sells Growth at ₹9,999 as
the featured tier. **Read the plan row and tell me its `balance_paise`**; I will set
`tiers[1].balanceInr` and the minute estimate follows from it. Until then the site is
selling a tier whose entitlement nobody has checked.

**R2 · The USD rate is still low.** ₹96 matches the engine, but echowave
`REMAINING-WORK.md` A2 puts the real rate near ₹104 and calls ₹96 "roughly 8% light on
every charge". Both need to move together — a display rate that disagrees with the
billing rate is how a quote and an invoice come apart. This is item A2 on their side.

---

## Blocking — do not launch publicly without these

### 1 · Integration status tiers → `data/integrations.ts`

Every card carries a status chip and the chip must be true. I set conservative defaults: anything
not provable from the brief is marked `coming`. Go through the list and set each to `live`,
`beta`, `on-request`, or `coming`.

Currently marked **live** (i.e. I am asserting these work today — correct me if not):
Webhooks · REST API · Google Calendar · Gmail

Currently **beta**: Google Sheets · n8n · WhatsApp Business
Currently **on-request**: Zoho CRM · HubSpot · Shopify
Everything else: **coming soon**.

### 2 · Is the outcome webhook actually live?

The line under the integrations deck — *"Every call outcome fires a webhook. If your system
accepts one, it works today"* — is the strongest sentence in that section and it appears on the
home page, `/how-it-works`, and inside four vertical pages' objection answers. It has to be true
today. If it isn't, tell me and I'll rewrite those five places.

### 3 · Are the managed tiers actually live? → `data/pricing.ts`

`managedTiersLive` is currently `true`, so the pricing cards sell. If telephony-included managed
service isn't wired end to end, set it to `false` — the cards flip to "Opening soon → join
waitlist" automatically, no other edit needed. Taking money for something unbuilt is worse than a
waitlist.

### 4 · Registered address + support email → `lib/site.ts`

`supportEmail` is currently `hello@decibyl.ai` — confirm or change. `registeredAddress` is `null`,
so the footer and the `Organization` schema render without one. A GST-registered entity needs a
visible address, and it helps local SEO. Fill in the object and both update.

### 5 · Legal pages need a lawyer's eye

`/legal/{privacy,terms,dpdp,refund}` are careful drafts written to match what the product
actually does — retention periods, sub-processor list, refund window, liability cap. They are not
legal advice and have not been reviewed by counsel. Numbers I chose that you may want to change:
24-month lead retention, 12-month default call-data retention, 7-day first-payment refund window,
12-month fee liability cap.

---

## Numbers that are proposals, not decisions

### 6 · Overage rate per minute per tier → `data/pricing.ts`

**Resolved 13 Aug 2026** per the pricing/feature-ladder spec: Starter ₹5.30, Growth ₹4.50, Scale
₹4.00. Managed stays custom-quoted (no fixed overage). These are now public on `/pricing` — still
worth an eventual COGS check (internal floor: ₹1.74/min Hindi/English, ₹3.28/min regional), but
they're a shipped decision, not a placeholder.

The pay-as-you-go rate is also resolved and INR-denominated: ₹5.30/min at the ₹2,999 entry stop,
sliding to ₹4.20/min at the ₹19,00,000 top stop. Full stop table in `data/pricing.ts`
(`payAsYouGo.tierStops`).

**Still genuinely open:** regional-language margin. At the ₹3.28/min regional cost floor, Scale's
₹4.00 overage is 18% gross and Growth's ₹4.50 is 27% — thin, and worse than it looks once you
account for the bundled minutes at the monthly price. Surcharge on regional overage, a fair-use
cap on regional share of the bundle, or fixing the stack cost first is Nithish's call — nothing
in the shipped spec resolves this, and no UI changes accordingly until it's decided.

### 7 · Growth and Scale prices, and concurrent-call limits

**Resolved 13 Aug 2026**: Growth ₹9,999/2,200 min, Scale ₹34,999/8,000 min, 5 / 25 / 100
concurrent calls. A new Managed tier (from ₹75,000/month) was also added. All four are in
`data/pricing.ts`, shipped, not proposals.

### 8 · Calculator defaults → `components/marketing/LossCalculator.tsx`

Defaults that match reality make the whole page credible. Currently:

| Variant | Defaults I used | What I need |
|---|---|---|
| clinic | 40 calls/day, 25% missed, 40% book, ₹800/appointment | Real volumes from the Hosur pilot; consultation fee ranges by clinic type |
| d2c | 200 orders/day, 60% COD, 25% RTO, **₹250 per failed delivery** | The forward + reverse + dead-margin number you'd defend to a CFO |
| realestate | 300 leads/month, ₹900/lead, 55% never contacted in an hour | Portal CPL you actually see |

### 9 · USD conversion rate → `data/pricing.ts`

**Partly resolved 28 Aug 2026**: raised 88 → 96 to match the engine's own constant. Still
below the ~₹104 real rate — see R2 above. Wiring it to a rate source remains the right
end state; today it is a hand-maintained figure in two repositories that must agree.

---

## Content you need to supply

### 10 · Language audio samples → `data/languages.ts` + `public/audio/`

All seven `sample` fields are `null`, so the chips render as plain chips with no play control.
Drop a clip in `public/audio/` and set the path for each language you'd stand behind. Ship only
those — a bad clip does more damage than a missing one.

### 11 · Two audio samples for the vertical pages

One Tamil clinic booking, one Hindi NDR call. A 40-second clip outperforms the entire page of
copy. The transcript panels are on the pages already; audio goes next to them.

### 12 · Written consent from the Hosur doctor → `data/proof.ts`

`logos` is empty, so the "Now onboarding" section renders the three anonymised-but-true cards.
Add a `Logo` object with the file path and the section swaps to named logos automatically. One
real named logo beats twelve invented ones, and it unlocks the referral chain.

### 13 · Human transfer — live and tested?

Six pages lean on it, and on `/solutions/clinics` and `/solutions/clinics/ivf-fertility` it is the
safety net the whole argument rests on. If it isn't tested end to end, say so and I'll soften
those pages.

### 14 · Does the $10 BYOK trial credit survive under managed pricing?

If yes, it's a strong above-the-fold hook and belongs in the hero. It's currently only on
`/pricing` and `/waitlist`.

---

## Palette deviations I made, and why

The design spec gives exact token values *and* a Lighthouse ≥95 accessibility floor. On four
points those two requirements conflicted, so I moved the token and kept the floor. Lighthouse is
now 96–97 on accessibility across the site. Each change is one line in `app/globals.css` if you
want it back.

| Token | Spec | Now | Why |
|---|---|---|---|
| `--color-iron` | `#8A8F99` | `#676C77` | Caption text at 13–14px was 3.2:1. Now 4.8:1. |
| `--color-blush` | `#FFD9D2` | `#FFE2DC` | One shade lighter so link text on that card clears 4.5:1. |
| — | — | `--color-saffron-deep: #A85E00` | `#FFB627` on the light canvas is **1.6:1** — effectively unreadable. Saffron stays exactly as specified on the dark transcript panel; the deep tone carries the same money-only meaning on light surfaces, and it is the only place it's used. |
| Small vermilion text | vermilion | `--color-sindoor` | The spec's own rule is "vermilion for links at 16px+ weight 500". Eyebrows (12px) and card links (15px) broke that rule, so they use the deep brand red instead. Headlines, buttons, and 16px+ links are unchanged. |

**One contrast failure is deliberately left in.** White on vermilion pill buttons is 3.8:1, and the
spec says explicitly that white text on vermilion is fine. It's the signature of the whole system,
so I kept it rather than quietly restyling every button. Switching primary buttons to
`--color-sindoor` would take them to 5.6:1 if you'd rather clear AA fully — it's one line in
`components/ui/Button.tsx`.

---

## Things I decided, so you know

- **Tamil is set in Noto Sans Tamil, not IBM Plex.** IBM ships a Plex Tamil cut but Google Fonts
  doesn't serve it, and `next/font` can only self-host what Google serves. Devanagari is genuine
  IBM Plex. Telugu, Kannada and Gujarati are Noto.
- **Sample transcripts are labelled as illustrations** on the vertical pages, not as recordings of
  real customer calls — they're written examples of the script and outcome format.
- **The lending page leads with compliance, not efficiency**, and its objection answer on RBI
  conduct expectations explicitly says we're not a law firm. Worth a compliance read.
- **`/solutions/collections` from the original sitemap is `/solutions/lending-collections`**, per
  the use-case spec which supersedes it.
- **Phase 2 routes** (`/ai-receptionist/[city]`, `/voice-ai/[language]`, `/blog/[slug]`) are not
  built. The `[vertical]` and `[competitor]` routes are already data-driven, so those are a
  data-file addition rather than a rebuild when you want them.
