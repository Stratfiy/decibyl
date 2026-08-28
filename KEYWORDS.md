# Keyword research — where Decibyl ranks, and the vocabulary it isn't using

Researched 28 Aug 2026. Companion to [`SEO.md`](SEO.md), which covers Search Console and the
operating loop. This file is about *which words*, and whether the site actually uses them.

---

## Read this before the tables

**There are no search-volume numbers in this document, deliberately.** Real monthly volume comes
from Google Keyword Planner, Ahrefs or Semrush. Nobody here has access to those, and a table of
invented volumes is worse than no table — you would prioritise a roadmap on numbers somebody made
up. Where a term is called "high demand" below, the evidence is stated: competitors have built
dedicated pages for it, which is a company spending money on the belief that the demand is real.

**Get the real numbers yourself, free, in this order:**

1. **Bing Webmaster Tools → Keyword Research.** You already set this up. It gives actual search
   volumes, free, no credit card, filterable by country. Bing's absolute numbers are smaller than
   Google's, but the *relative* ranking between two terms is directionally reliable — which is all
   you need to prioritise.
2. **Google Keyword Planner** (<https://ads.google.com> → Tools → Keyword Planner). Free with a
   Google Ads account. Without an active campaign it shows bucketed ranges ("1K–10K") rather than
   exact figures. Still enough to sort terms into tiers.
3. **Your own Search Console, from about week four.** This is the best source you will ever have,
   because it is *your* queries, not a market average. Performance → Queries. Everything in the
   speculative column below gets replaced by fact within two months.

**And one correction that changes what "using a keyword" means:** every page on this site passes a
`keywords` array into `pageMetadata`, which renders `<meta name="keywords">`. **Google has ignored
that tag since 2009.** It is not a ranking signal and never will be. It is harmless, it documents
intent usefully for whoever edits the page next, and it should stay — but populating it is not
"using" a keyword.

What actually carries a keyword, in descending order of weight:

1. The `<title>` tag
2. The `<h1>`, and the `<h2>`s
3. The URL slug
4. The first ~100 words of body copy
5. Internal link anchor text pointing *at* the page
6. The FAQ questions, verbatim, in the words a person would type

Every recommendation below targets those six. None of them targets the meta tag.

---

## What the market actually calls this product

The single most useful finding. Searched across Indian vendor sites, comparison posts and
roundups, here is the vocabulary in live commercial use — with whether this site uses it:

| Term in market use | Who's built pages on it | On decibyl.ai? |
|---|---|---|
| **AI calling agent** | DigiBrood, Dialnexa, Dhiyo AI Labs, Troika Tech | ⚠️ one meta keyword only |
| **AI telecaller / AI telecalling agent** | Troika Tech, Teleautomation, SparkTG | ❌ **zero occurrences** |
| **AI caller** | Caller Digital (whole brand) | ❌ zero |
| **voice bot / voicebot** | SquadStack (`/voicebot/` path), Cyfuture, SparkTG | ❌ zero |
| **AI voice agent** | Nearly everyone | ✅ well covered |
| **AI receptionist** | Vocaldice, CallMissed, BookAIClinic, ChairFill, ConnectAI | ✅ well covered |
| **call centre / contact centre automation** | SquadStack, Gnani, Exotel | ❌ zero |
| **IVR replacement / IVR alternative** | Ravan.ai, Ojiva, Quensulting, SwanDigitals | ⚠️ one passing mention |
| **AI voice worker** | **Decibyl only** | ✅ it's your title tag |

### The uncomfortable one

**"AI voice worker" is your homepage title tag, and essentially nobody searches for it.**

It is a genuinely good *positioning* choice — `lib/site.ts` documents the reasoning, and the
reasoning is sound: a labour noun puts you against the cost of a BPO seat rather than against
Vapi's "platform" framing. That argument is right, and I'm not proposing you abandon it.

But positioning and search are different jobs, and right now one string is being asked to do both.
A term you invented cannot have search demand by definition — that's what makes it distinctive,
and it's also what makes it invisible. Your most valuable piece of on-page real estate is
currently spent on a phrase nobody types.

**The standard resolution is to split the two:** the `<title>` carries the term people search, the
`<h1>` and the body carry the positioning. Your H1 — *"It calls, confirms, and closes — in the
language your customer speaks"* — already does the positioning job beautifully and doesn't need to
change. Only the title tag does.

This is a real decision with a real trade-off, not an obvious fix, which is why I haven't made it
unilaterally. See "Decisions for you" at the bottom.

---

## The keyword map, by tier

Tier order is by *winnability for a domain launched this month*, not by volume. Chasing Tier 1
first is the most common way to waste a year.

### Tier 1 · Category head terms — 12+ months, don't lead with these

| Term | Status | Note |
|---|---|---|
| AI voice agent India | ✅ covered | `/`, `/solutions` |
| AI calling agent India | ⚠️ **weak** | No page owns this. Multiple vendors have dedicated pages. |
| AI telecaller India | ❌ **absent** | The native Indian job-title framing. Fits your labour-noun positioning better than anyone else's. |
| voice bot India | ❌ absent | Older term, still heavily searched by enterprise buyers |
| AI receptionist India | ✅ strong | `/ai-receptionist` + 8 city pages |
| voice AI India | ✅ covered | |

**Read:** you own the *receptionist* half of the category vocabulary and almost none of the
*calling agent / telecaller* half. Those are the same product to a buyer. Half your category
traffic is going to pages you didn't write.

### Tier 2 · Comparison terms — highest intent on the site, 3–6 months

Someone searching these is choosing a vendor **this week**. Your `/compare/*` structure is the
right build; the competitor set is incomplete.

| Term | Status |
|---|---|
| Vapi / Bolna / Retell / SquadStack / ElevenLabs / Gnani alternative | ✅ all six built |
| **MyOperator alternative** | ❌ missing — large established Indian brand, ranks for the head terms |
| **Caller Digital alternative** | ❌ missing — appeared in *every single search I ran*; they've executed a serious programmatic content play |
| **Ringg AI alternative** | ❌ missing |
| **Exotel / Ozonetel / Knowlarity alternative** | ❌ missing — incumbent Indian CPaaS, where the budget currently sits |
| **Sarvam** | ❌ missing — the Indian model layer; buyers ask "why not just use Sarvam directly" |
| **AI voice agent vs IVR** | ❌ **missing — biggest single gap** |
| **AI voice agent vs human telecaller** | ❌ **missing — second biggest** |

#### Why the last two matter more than any competitor page

Confirmed live commercial content from Ojiva, Ravan.ai, Edesy, Caller Digital, SparkTG, CarmaOne
and VoxTurn — all targeting *"AI voice agent vs IVR"* and *"AI vs telecaller cost"*. The published
economics they compete on:

- AI: **₹3–8 per call**, 10,000+ calls/day
- Human telecaller: **₹26–72 per call** fully loaded, 80–120 calls/day
- Legacy IVR: ₹0.50–1.50/call but 10–30% resolution vs 60–80% for voice AI

**This is your positioning, written as a search query, by other people.** Decibyl's entire
argument is that it's a worker replacing a seat, not a tool. The query *"AI vs telecaller cost"*
is a buyer asking exactly that question — and you have no page for it while seven competitors do.

A `/compare/ivr` and a `/compare/telecaller` are the two highest-value pages you could add. They
also aren't really competitor pages, so the existing `data/competitors.ts` shape may not fit.

### Tier 3 · Pricing — very high intent, 2–4 months

| Term | Status |
|---|---|
| voice AI pricing India | ✅ `/pricing` + blog post |
| AI calling cost per minute India | ✅ covered |
| **AI calling agent price per call** | ⚠️ **framing gap** |

The market quotes **per call** (₹3–8/call, ₹0.50/call, ₹8/call) as often as per minute. You sell
credit, and your `credit-not-minutes` post argues — correctly — that a per-minute number is
dishonest. Fine. But a buyer searching "AI calling cost per call India" needs to find you, then be
told why the question is wrong. Right now they don't find you at all.

Cheapest fix: one section in the existing pricing post doing the per-call arithmetic for a typical
2-minute confirmation call, so the page matches the query without abandoning your position.

### Tier 4 · Vertical + use case — winnable NOW, and your real moat

This is the strongest part of the site. Genuinely good coverage:

`AI voice agent for clinics India` · `AI receptionist dental clinic` · `IVF clinic call handling` ·
`diagnostic lab call automation` · `NDR recovery automation India` · `COD confirmation calls` ·
`reduce RTO` · `EMI reminder calls automation` · `collections voice bot India` ·
`real estate lead calling automation` · `admission enquiry follow up automation` ·
`delivery reattempt confirmation calls`

Low competition, high intent, and the pages already exist. **Don't add more verticals — deepen
these.** Google indexes generated pages on whether each says something its siblings don't.

Two additions worth considering, both with confirmed competitor activity:
- **COD verification** as a distinct term from "COD confirmation" (Caller Digital has a dedicated page)
- **Shopify / WooCommerce** named integrations — D2C buyers search by their stack

### Tier 5 · Language pages — unique to you, and incomplete

Live: Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, Indian English (7).

Competitors advertise 13–32 Indian languages. Missing, in order of market size:

| Language | Why it matters |
|---|---|
| **Bengali** | ~97M speakers, Kolkata is a major D2C and BFSI market. Biggest single gap. |
| **Malayalam** | Kerala, high clinic and diagnostics density |
| **Punjabi** | Punjab/Delhi NCR, strong in logistics and lending |
| **Odia / Assamese / Bhojpuri** | Long tail, low competition, cheap to add if the stack supports them |

**This is a product question before it is an SEO one.** Your content rules forbid claiming a
capability you can't deliver, and that rule is correct. Only ship a language page for a language
the stack genuinely handles.

### Tier 6 · City pages — winnable, low volume each, compounding

Live: Hosur, Bangalore, Chennai, Hyderabad, Mumbai, Pune, Delhi NCR, Ahmedabad (8).

Obvious gaps: **Kolkata** (blocked on Bengali), **Kochi** (blocked on Malayalam), **Coimbatore**,
**Jaipur**, **Lucknow**, **Indore**, **Surat**, **Nagpur**, **Chandigarh**.

Same warning as Tier 4: nine genuinely-differentiated city pages beat thirty templated ones, and
thirty near-identical pages can earn a site-wide quality problem that is far harder to undo than
it was to create. Expand only when each new page has a real local fact in it — the language mix,
a named industrial cluster, a specific business density.

### Tier 7 · Compliance — your most defensible position, already strong

`TRAI DND rules automated calls` · `TCCCPR calling hours India` · `DPDP compliance AI calling` ·
`AI voice agent compliance India` · `outbound calling rules India`

A US-headquartered competitor cannot credibly write this and won't risk getting it wrong. Two
posts live. This is the content most likely to earn links and get cited by AI answer engines.

Gaps worth writing: **"is AI calling legal in India"** (the actual phrasing a nervous founder
types), **DPDP consent requirements for outbound calls**, **RBI collections calling rules** (ties
directly to your lending vertical).

---

## Also found: what buyers compare on

Recurring evaluation criteria across every roundup. These belong in your comparison tables as
named, numbered specs:

| Spec | Market benchmark | On your site? |
|---|---|---|
| Latency | sub-400ms is the stated bar | ❌ not surfaced |
| ASR accuracy for Indian accents | >85% WER floor; 92–96% Hindi claimed | ❌ not surfaced |
| Concurrent calls | 300+ for enterprise | ✅ dedicated blog post |
| Language count | 13–32 claimed by competitors | ⚠️ 7 — a comparison weakness |
| Compliance | TRAI/DPDP built-in | ✅ strong |
| Billing | INR, GST invoice | ✅ strong differentiator vs US vendors |

Latency and accuracy are the two specs a technical buyer asks for first, and you publish neither.
If your real numbers are good, publishing them is free differentiation. If they're not, that's
worth knowing before a prospect asks.

### One distribution channel, not a keyword

The head terms are dominated by *"Top 10 AI Voice Agents in India 2026"* listicles — MyOperator,
Caller Digital, Dialnexa, Tabbly, Vyora, EchoLeads, Vomyra. Decibyl appears in none of them.

Some are competitor-owned and unwinnable. Many are neutral affiliate blogs that will happily add a
vendor who emails them a factual entry and a working demo number. **You have a callable demo line
— that's a materially stronger pitch than a screenshot.** Getting into five of these roundups is a
week of outreach and reaches more in-market buyers than three months of your own ranking.

---

## Decisions for you

Three things I deliberately did not change, because each is a judgement call with a real
trade-off, not an obvious fix.

1. **The homepage title tag.** Keep "AI Voice Worker" (distinctive, on-brand, invisible to search)
   or lead with "AI Calling Agent" / "AI Voice Agent" (searched, generic, keeps the positioning in
   the H1 where it already lives)?
2. **`/compare/ivr` and `/compare/telecaller`.** Highest-value pages available. Needs a data shape
   that isn't vendor-vs-vendor, and needs your real cost-per-call arithmetic.
3. **Bengali, Malayalam, Punjabi.** Product capability question first. If the stack handles them,
   each is a language page plus a city page.

---

## Sources

Market vocabulary and competitor positioning researched from:
SquadStack, Caller Digital, MyOperator, Ringg AI, DotCall, Dialnexa, DigiBrood, Troika Tech,
Teleautomation, Cyfuture, SparkTG, Ravan.ai, Ojiva, Edesy, Quensulting, CarmaOne, VoxTurn,
Vocaldice, CallMissed, BookAIClinic, ChairFill, ConnectAI, Brightcall, AppEQ, Tabbly, Vyora,
EchoLeads, Vomyra, Lumay, Webxion, Rootle, ZenXAI (Aug 2026).

No search-volume figures were taken from these sources, because none publish any. They are
evidence of *commercial belief* in a term, not of its volume.
