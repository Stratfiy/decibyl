# Keyword map — what we target, what we were missing, what we cannot win yet

Companion to `SEO.md`. That file is the runbook and the operating cadence; this one is the
target list. Researched 3 Sep 2026 against live SERPs.

Read `SEO.md` Part 2 first. Nothing here overrides it — in particular, none of this makes
the head terms winnable faster than the domain earns them.

---

## Part 0 · The finding that changes what we build

**The head terms are not product-page queries. They are listicle queries.**

Search `AI voice agent India`, `best voice agent for business`, or `Indian voice agent`
today and every result on page one is the same shape: a vendor's blog post titled
*"Best/Top 10 AI Voice Agents in India 2026"*. Checked 3 Sep 2026 — myoperator.com,
acefone.com, omnidim.io, squadstack.ai, vyora.ai, caller.digital, vomyra.com, tabbly.io,
echoleads.ai. Not one product landing page among them.

That is Google telling us the intent behind those queries is **comparison, not purchase**.
It has three consequences and they decide the whole strategy:

1. **`/` and `/voice-ai` cannot rank for the head terms**, no matter how they are written.
   They are the wrong content type for the intent. Optimising them harder is wasted work.
2. **`/compare` is our head-term page.** It is already the right shape — a ranked, honest
   landscape of the category — and it is already titled for it. Everything we do for the
   head terms goes into that page and the `/compare/*` pages beneath it.
3. **The listicles are the real competitor set.** Ranking above them is one route. Being
   *named inside them* is a faster one, and it is outreach work, not SEO work.

### The corollary nobody likes

We are not in any of those listicles. Every one of them is a competitor's blog. Getting
Decibyl added to even three is worth more first-year traffic than any on-page change in
this document, and it costs emails rather than engineering. Put it on the founder's list,
not the backlog.

---

## Part 1 · The brand collision, which is urgent and cheap to fix

Searching `decibyl.ai voice agent` on 3 Sep 2026 returns **decibri.com** — "Decibri:
Unified Audio AI for Python, Node.js, and Rust" — and Decagon. It does not return us.

This is worse than ordinary invisibility. Decibri is a real, indexed company **in our exact
category** with a name one character-cluster away from ours. Google is not failing to find
Decibyl; it is substituting a more established near-match. Every branded query we earn
through demos, decks and word of mouth leaks to them until the entity is disambiguated.

Fixes, in order of return per hour, none of which are code:

1. **Fill `site.profiles` in `lib/site.ts`.** It is still `[]`, so the Organization schema
   emits no `sameAs` at all. LinkedIn company page, X, Crunchbase, GitHub org, YouTube —
   each one added is a separate corroboration that "Decibyl", "nAutomation Labs Pvt Ltd"
   and this domain are one entity. This is the single highest-value empty field on the site.
2. **Google Business Profile** for the Hosur registered address. It connects to the
   `PostalAddress` already in the schema and it is what makes the entity real.
3. Get the exact string "Decibyl" onto pages we do not own — directories, a Product Hunt
   listing, partner sites. Entity disambiguation is a function of independent mentions.

Until at least the first of these is done, brand search is a leak, and no amount of
category-keyword work compensates for it.

---

## Part 2 · The vocabulary we were missing

Indian buyers do not consistently say "AI voice agent". A repo-wide audit on 3 Sep 2026
found the terms they *do* use were close to absent:

| Term | Files before | Why it matters | Status |
|---|---|---|---|
| `voicebot` | **0** | The dominant India phrasing. MyOperator and SquadStack both rank under it; SquadStack serves it from `/voicebot`. | Shipped |
| `AI calling agent` | 1 | Very high commercial intent — most "price" queries use this phrasing, not "voice agent". | Shipped |
| `telecalling` | 2 | What an Indian business calls the team this replaces. High-intent, low competition. | Shipped |
| `contact centre / center` | 0 | Enterprise phrasing for the same budget. | Partly shipped |
| `cold calling` | 0 | Adjacent outbound intent. | Not shipped — see Part 5 |

**What "shipped" means here, precisely.** The `keywords` meta array is ignored by Google
and always has been; it is kept for internal documentation and answer-engine parsing only.
The changes that can actually move a ranking are the ones in **titles, descriptions, H1s
and body copy**, and those are where this vocabulary went:

- `/pricing` title is now `AI Calling Agent Pricing India — from ₹4.91/min` — the query
  front-loaded, with a real number in it, per `SEO.md` Lever 4. The old title
  ("Pricing — Voice AI in India, in Rupees") could not match the phrasing buyers type.
- `/voice-ai` title is now `Indian Language AI Voice Agents & Voicebots`, which is also the
  only page carrying the exact string "Indian voice agent".
- `/use-cases` carries "telecalling automation" in its description.
- Three new site-wide FAQs carry the vocabulary as genuine answers rather than stuffing:
  the voicebot-vs-calling-agent-vs-voice-agent distinction, "can this replace our
  telecalling team", and "how much does an AI calling agent cost in India".

The terminology FAQ does double duty. It is the honest answer to a real buyer confusion,
and it is the kind of specific, checkable, near-the-top claim that answer engines cite
(`SEO.md` Lever 7).

---

## Part 3 · The target map

One page owns each cluster. Where two pages could target a term, the one listed owns it and
the other links to it — competing against ourselves is how both pages lose.

### Head terms — `/compare` only, and slowly

`AI voice agent`, `AI voice agent India`, `best voice agent for business`,
`Indian voice agent`, `voice agent for business`, `best AI voice agent India`

Owned by `/compare`. Expect nothing for two to three quarters. These are a listicle SERP
against funded incumbents on aged domains; we win them as a consequence of the long tail,
never as a shortcut to it.

### Category terms — the product pages

| Cluster | Page |
|---|---|
| AI receptionist, AI phone answering, virtual receptionist, inbound voicebot | `/ai-receptionist` |
| Indian-language voice AI, Hindi/Tamil/Telugu voicebot, Hinglish calling agent, code-mixed | `/voice-ai` + `/voice-ai/[language]` |
| AI voice agent use cases, telecalling automation, contact centre automation | `/use-cases` |
| Industry voicebot, AI calling by industry | `/solutions` + `/solutions/[vertical]` |
| Setup, how AI calling works | `/how-it-works` |

### Commercial-intent terms — the highest-converting set we have

| Cluster | Page |
|---|---|
| AI calling agent price India, AI voice agent pricing India, cost per minute, voicebot pricing | `/pricing` |
| `<vendor>` alternative, `<vendor>` vs Decibyl, `<vendor>` pricing India | `/compare/[competitor]` |

**This tier is the whole near-term game.** Nine `/compare/*` pages now exist — Vapi, Bolna,
Retell, SquadStack, ElevenLabs, Gnani, and newly Exotel, MyOperator and Yellow.ai. "X
alternative" queries convert far better than category queries and are dramatically less
contested, and `SEO.md` Lever 5 already ranks them second only to mining Search Console.

The three added on 3 Sep 2026 close the biggest structural hole in the set: every prior
comparison was against another *voice AI platform*, while a large share of Indian buyers
are actually deciding between a voice agent and the **cloud telephony or omnichannel suite
they already pay for**. Exotel and MyOperator cover the first, Yellow.ai the second.

### Regulatory terms — the defensible position

TRAI, TCCCPR, DND, DPDP + AI calling. Owned by `/blog/trai-dnd-rules-ai-voice-calls` and
`/blog/dpdp-act-ai-voice-calls-guide`. `SEO.md` Lever 5 is right that this is the most
defensible content on the site: it needs India-specific knowledge a US competitor's content
team cannot fake. Maintain these; do not let them go stale.

---

## Part 4 · Pricing claims in comparison pages — a standing constraint

Every competitor figure in `data/competitors.ts` carries the date it was read. Hold that
line. It is the reason the pages are believable, and `SEO.md` is right that a comparison
page misstating a rival's current price is a legal problem before it is an SEO one.

**The three entries added on 3 Sep 2026 need a verification pass before anyone treats them
as final.** They were written in an environment whose network policy blocked direct access
to vendor pricing pages, so they deliberately assert only what is structurally durable and
was corroborated across multiple independent sources:

- Exotel publishes telephony plans but not per-agent AI voice pricing.
- MyOperator sells its AI voicebot as a separately priced add-on to a telephony plan.
- Yellow.ai's enterprise plan is quote-based with no publicly listed price.

No specific rupee figure is claimed for any of the three. That is the correct default when
a number cannot be read at source, and it is also the more useful answer for a buyer. Before
the next content deploy, open each vendor's own pricing page, confirm those three
statements, and re-date them.

---

## Part 5 · What is still missing

Ordered by return, honestly assessed.

1. **Get listed in the competitor listicles.** Restated because it outranks everything
   below it. Founder work, not engineering.
2. **`site.profiles` is still empty.** See Part 1. Highest-value empty field on the site.
3. **Language coverage gaps.** Seven Indian languages are live; **Bengali, Malayalam and
   Punjabi are not** — and competitors list all three. Bengali is the second-most-spoken
   language in India, and `data/pricing.ts` already prices a regional stack covering
   Malayalam and Bengali (`Ta/Te/Kn/Ml/Bn`), which suggests the capability may be closer
   than the marketing site claims. **This is a product question before it is an SEO one.**
   If those languages genuinely work, each is a `/voice-ai/[language]` page against real
   search demand. Do not add the pages first — the site currently says "seven Indian
   languages" in several places, and a page claiming an eighth is a false claim, not a
   keyword.
4. **More comparison pages.** The India SERP names Knowlarity, Ozonetel, Haptik,
   Caller Digital, SuperBot, VoiceGenie and OmniDimension. Each is a legitimate
   "X alternative" target. Add them only with verified, dated pricing, and only if the
   page says something specific — nine differentiated pages beat twenty near-identical
   ones, and `SEO.md` Lever 2 explains why the latter is actively harmful.
   **Sarvam is not a comparison target** — we build on their STT/TTS, and a "vs" page
   against a supplier would be both wrong and self-defeating.
5. **Use-case coverage.** Only three `/use-cases/*` pages exist. Payment and EMI collection,
   COD confirmation, feedback and CSAT surveys, and recruitment screening are all real
   query clusters partly served by verticals but with no use-case page of their own.
6. **"Cold calling" and outbound-compliance vocabulary** remain unused. Worth a section
   rather than a page, and it must be handled carefully alongside the TRAI/DND content —
   the compliant framing is the differentiator, so leading with "cold calling" without it
   would undercut our own strongest position.

---

## Part 6 · How to tell whether any of this worked

Do not judge it on rankings for the head terms; they will not move this quarter and
watching them will make us change things that were working.

The signal that this document succeeded, in order of appearance:

1. **Weeks 2–6** — the new `/compare/exotel`, `/compare/myoperator` and `/compare/yellow-ai`
   pages get indexed at all. Check Indexing → Pages, not Performance.
2. **Weeks 6–12** — impressions appear for queries containing "voicebot", "AI calling agent"
   or "telecalling". Those strings barely existed on the site before 3 Sep 2026, so any
   impression on them is attributable to this change and to nothing else. This is the
   cleanest read we will get.
3. **Month 3+** — clicks on `<vendor> alternative` queries. That is the tier that converts.

If (2) shows nothing by week twelve, the vocabulary was not the constraint and the honest
conclusion is that the domain lacks the authority to rank for anything yet — which sends us
back to Part 0's corollary and `SEO.md` Lever 6, both of which are outreach, not code.
