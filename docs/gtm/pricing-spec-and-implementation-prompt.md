# Decibyl pricing, rate card, caps and admin KPIs

Consolidated from the 14 September 2026 working session. This is the single source for the billing implementation. Where a number was decided in the session it is marked **decided**; where it is a proposal to fill a gap it is marked *proposed* and needs a yes from Nithish before it is seeded.

Currency: INR unless stated. USD at ₹96. All prices exclusive of 18% GST for Indian customers. Foreign customers pay USD, zero-rated under LUT.

Companion files: `Decibyl-Financial-Model.xlsx` (24-month model), `pricing-credits-decision.md` (earlier draft, superseded by this file), Jira epic I (KAN-47) and its stories KAN-52 to KAN-59 and KAN-80.

---

## 1. The unit

| Item | Value | Status |
|---|---|---|
| 1 credit | ₹0.50 of composed cost | decided |
| Customer sees | credits everywhere; rupees only on the invoice | decided |
| Internal ledger | stays in paise; credits = ceil(composed_paise / 50) per event | decided |
| Rounding | per event, up, never per month | decided |
| Plan credits | roll over while the subscription is active; lost 30 days after cancellation | decided |
| Top-up credits | never expire; consumed after plan credits | decided |
| Negative balance | voice and campaigns stop at zero; inbound calls get a 50-credit grace so a live number never goes dead mid-day; text replies stop at zero | *proposed* |

## 2. Plans

| Plan | Price / month | Credits / month | Voice bots | Numbers included | Builder messages | Knowledge pages | Concurrency (calls) | Campaign dials / day | Who |
|---|---|---|---|---|---|---|---|---|---|
| Free | ₹0 | 1,000 once, no renewal | no | 0 | 30 / month | 50 | 0 | 0 | trial; one bot; Decibyl branding on web chat |
| Everyday | ₹999 or $10 | 2,000 | **no** | 0 | 30 | 500 | 0 | 0 | WhatsApp, email, web chat, knowledge, routines |
| Business | ₹2,999 | 5,000 | yes | 1 | 100 | 2,000 | 5 | 500 | first voice plan |
| Growth | ₹7,999 | 15,000 | yes | 2 | 300 | 10,000 | 15 | 2,000 | campaigns |
| Scale | ₹19,999 | 40,000 | yes | 4 | unlimited | 50,000 | 40 | 10,000 | multi-location, agencies |
| Enterprise | quoted | committed minutes | yes | as quoted | unlimited | as quoted | as quoted | as quoted | Kriti Labs shape: prepaid minutes at ₹4.50, overage ₹5 |

Plan prices, credits, voice-from-Business, numbers and builder allowances are **decided**. Knowledge caps are **decided**. Concurrency and campaign dial caps are *proposed*; they exist to protect the media box (stage 0 handles about 40 concurrent calls) and must move up with the infra stages in `INFRASTRUCTURE.md`.

Extras:

| Extra | Price | Status |
|---|---|---|
| Additional phone number | ₹559 / month | decided (already on the site) |
| Annual billing | 10 months for 12 | decided |
| Campus Builder | Business features, 300 voice minutes / month, college email, expires 6 months after graduation | decided (KAN-69) |
| USD plans | Everyday $10 text only; Business and above are India-only because voice is India-only | decided |

## 3. Top-ups and overage

| Pack | Credits | ₹ per credit |
|---|---|---|
| ₹500 | 1,000 | 0.50 |
| ₹1,000 | 2,000 | 0.50 |
| ₹5,000 | 10,500 | 0.476 |
| ₹20,000 | 44,000 | 0.455 |

All **decided**. Never expire. Razorpay for INR; international card for USD at $6 = 1,000 credits, $55 = 10,000 (*proposed*).

Overage: when plan credits run out, voice minutes are charged at the **next tier's** per-minute credits from the top-up pool (Business overage at Growth's rate, Growth at Scale's, Scale at Scale's). **Decided.** Text and other events cost the same credits at any balance.

## 4. Rate card: what each event costs the customer

### 4.1 Voice, per minute, billed per second after the first 30 seconds

| Voice stack | Business | Growth | Scale | ₹ at Business |
|---|---|---|---|---|
| Sarvam, any Indian language incl. Hindi and Indian English | 12 | 11 | 10 | ₹6.00 |
| Premium voice (ElevenLabs, Cartesia, OpenAI Realtime) | 20 | 18 | 16 | ₹10.00 |
| Sovereign preset (Sarvam STT + Sarvam LLM + Sarvam TTS + Indian carriage) | 12 | 11 | 10 | ₹6.00 |

12/11/10 is **decided** and is the "from ₹6 per minute" marketing line. Premium at 20/18/16 is *proposed*. Sovereign sharing the Sarvam rate is *proposed* (its cost is lowest, so margin is highest there).

Included in the per-minute rate: STT, LLM, TTS, carriage, recording, transcript, QA score. Not included: the warm-transfer leg to a human, billed as carriage only at 2 credits per minute of the human leg (*proposed*).

### 4.2 Text and everything else, per event

| Event | Credits | Status |
|---|---|---|
| Text reply (WhatsApp, email, web chat, Slack) | 1 | decided |
| Knowledge answer (a reply that retrieved from the KB) | 2 | decided |
| Routine run (scheduled job execution) | 2 | decided |
| Composio tool call, standard connector | 1 | decided |
| Composio tool call, premium connector (Salesforce, HubSpot paid tiers, SAP) | 3 | decided |
| Phone or email verification | first 2 free per org, then 2 each | decided |
| Knowledge upload, typed pages over cap | 1 per 10 pages | decided |
| Knowledge upload, scanned pages over cap (OCR via Sarvam Document AI) | 2 per page | decided 14 Sept, corrected from 1 because 1 loses ₹0.02 |
| Re-embedding after a model change | 0 | decided |
| Query-time embedding | 0, inside the knowledge answer | decided |
| Builder message, within allowance | 0 | decided |
| Builder message, over allowance | 5 | decided |
| Builder voice minute (talk to build; Gemini Live or Sarvam cascade) | 5 | decided |
| Screen share minute into a builder session (frames only, 1 per 5 s) | 2 | decided |
| Desktop companion, Tally XML read or write | 1 per call | decided |
| Desktop companion, screen control, Standard (Gemini 3.8 Flash) | 2 per step | decided |
| Desktop companion, screen control, Precise (Claude Sonnet 5) | 5 per step | decided |
| Desktop companion, screen control, Expert (Claude Opus 5) | 12 per step | decided |
| WhatsApp template message (Meta charges pass-through) | 1 + Meta's per-message fee converted at cost | *proposed* |
| SMS (DLT) | 1 | *proposed* |
| Recording storage beyond 90 days | 1 per 100 minutes per month | *proposed* |

### 4.3 What a credit buys, shown on the pricing page

"1 credit = ₹0.50. A WhatsApp reply is 1 credit. A minute of a Tamil call is 12 credits. A knowledge answer is 2. You always see the count before it runs."

## 5. Cost basis and markup: how the rate card is computed

The rate card is computed, not typed. Every sell price = component list cost × component multiplier, summed, plus a per-minute platform fee for voice, then divided by ₹0.50 and rounded up.

### 5.1 Multipliers, **decided**

| Component | Multiplier |
|---|---|
| Carriage (Plivo, Twilio) | 1.15× |
| STT | 1.30× |
| LLM | 2.00× |
| TTS, standard (Sarvam, Smallest) | 1.80× |
| TTS, premium (ElevenLabs, Cartesia) | 1.40× |
| Platform fee per voice minute | ₹2.50 Business, ₹2.00 Growth, ₹1.50 Scale |
| Embeddings, self-hosted | at compute cost, no multiplier |
| Third-party SaaS pass-through (Meta templates, DLT SMS) | 1.00× plus 1 credit handling |

The flat managed markup (1.7× in the DB, 1.4× code default) is retired.

### 5.2 Provider list costs, 14 September 2026

Voice per Indic minute on the Sarvam stack: ₹3.71 list, ₹2.78 after the 30% Sarvam discount. Breakdown at 850 TTS characters and about 1,200 LLM tokens per minute:

| Component | Provider | Unit price | Per minute |
|---|---|---|---|
| STT | Sarvam | ₹30 / hour | ₹0.50 |
| TTS | Sarvam | ₹3.00 / 1,000 chars | ₹2.55 list, ₹1.79 after 30% |
| LLM | Sarvam 105B | ₹29.28 in / ₹73.20 out per 1M | about ₹0.06 |
| Carriage | Plivo India | ₹0.60 to ₹1.20 / min | ₹0.60 |

Other rows the rate book must carry, with source URL and date on each:

| Provider | Product | Price |
|---|---|---|
| Sarvam | Translate | ₹0.005 / char |
| Sarvam | Document AI | ₹0.50 / page digitise, ₹1.00 / page extract |
| AssemblyAI | Streaming STT | $0.15 / hour |
| Deepgram | Nova-3 | $0.0077 / min |
| Smallest | TTS | $0.025 / 1k chars |
| Cartesia | TTS | $0.035 / 1k chars |
| ElevenLabs | Flash TTS | $0.05 / 1k chars |
| Google | Gemini 2.5 Flash-Lite | $0.05 / $0.20 per 1M; retires 16 Oct 2026, repoint before then |
| Google | Gemini 3.8 Flash | $0.75 / $3.75 per 1M until 31 Dec 2026, then $1.50 / $7.50 |
| Google | Gemini 3.1 Flash Live | audio $3 in / $12 out per 1M, video $3 per 1M, text $0.75 / $4.50 |
| OpenAI | GPT-5 mini | $0.25 / $2 per 1M |
| OpenAI | GPT-4.1 mini | $0.40 / $1.60 per 1M |
| OpenAI | gpt-realtime-2.1 | audio $32 / $64 per 1M; mini $10 / $20 |
| Anthropic | Claude Sonnet 5 | $2 / $10 per 1M |
| Anthropic | Claude Haiku 4.5 | $1 / $5 per 1M |
| Anthropic | Claude Opus 5 | $5 / $25 per 1M |
| Twilio | India carriage | $0.0075 / min |
| Plivo | India DID rental | about ₹300 / month (our cost; customer pays ₹559) |

Sarvam commercial: ₹25,000 per month of free usage for 6 months, then 30% off list forever. Start date to be confirmed by Nithish. The free credit is applied to cost of goods in the P&L, never shown to customers.

### 5.3 Worked example, Business plan Indic minute

Cost: STT 0.50×1.30 + TTS 1.79×1.80 + LLM 0.06×2.00 + carriage 0.60×1.15 = ₹4.66, plus platform fee ₹2.50 = ₹7.16. Divided by ₹0.50 = 14.3 credits computed. Sold at 12 credits = ₹6.00 by decision, which means the platform fee is partly absorbed while the Sarvam credit runs; after month 6 the computed rate is 14 and the sold rate should move to 14/13/12 or the fee should drop to ₹1.50. **This is the one open pricing decision for month 7.**

## 6. Models: what is offered where

Two different model settings, both explicit to the customer, no hidden multipliers.

### 6.1 Builder model (the assistant that builds and edits bots)

Default `claude-sonnet-5`. Advanced section lets the owner pick `gemini-3.8-flash` (cheaper) or `claude-opus-5` (Expert). Builder messages are metered against the plan allowance regardless of model; over-allowance credits are 5 on Sonnet, 3 on Gemini, 15 on Opus.

### 6.2 Bot model (set per bot, in Advanced)

| Preset | STT | LLM | TTS | Credits / min (Business) |
|---|---|---|---|---|
| Everyday (default) | Sarvam | Sarvam 105B or Gemini 3.8 Flash | Sarvam | 12 |
| Smart | Sarvam | Claude Sonnet 5 | Sarvam | 13 |
| Deep | Sarvam | Claude Opus 5 | Sarvam | 16 |
| Premium voice | Sarvam or Deepgram | as chosen | ElevenLabs or Cartesia | 20 |
| Sovereign | Sarvam | Sarvam | Sarvam | 12 |

Smart and Deep credits are *proposed*, derived from the multipliers. The presets map onto the other agent's epic D (KAN-4) which names Everyday / Smart / Deep / Advanced; keep the names in sync.

### 6.3 Live and screen

| Capability | Model | Credits |
|---|---|---|
| Talk to build, real-time voice in the app | Gemini 3.1 Flash Live; Sarvam cascade fallback for regional languages and Sovereign | 5 / min |
| Watch the screen continuously | Gemini 3.1 Flash Live, frames only, 1 per 5 s | 2 / min |
| Act on the screen | Claude Sonnet 5 computer toolset (Precise) or Gemini 3.8 Flash (Standard); Opus 5 on request | per step, section 4.2 |
| Tally without screenshots | Tally XML on the local port | 1 / call |

Sarvam has no computer use and no live video, so screen features are excluded from the Sovereign preset and require a consent screen stating that frames go to a US provider.

## 7. Caps, limits and safeguards

| Cap | Free | Everyday | Business | Growth | Scale |
|---|---|---|---|---|---|
| Bots | 1 | 3 | 10 | 30 | unlimited |
| Team members | 1 | 2 | 5 | 15 | unlimited |
| Concurrent calls | 0 | 0 | 5 | 15 | 40 |
| Campaign dials / day | 0 | 0 | 500 | 2,000 | 10,000 |
| Calling window | n/a | n/a | 9:00 to 21:00 IST default, editable within 8:00 to 21:00 | same | same |
| Routines | 2 | 10 | 50 | 200 | unlimited |
| Routine minimum interval | daily | hourly | 15 min | 5 min | 1 min |
| Knowledge pages | 50 | 500 | 2,000 | 10,000 | 50,000 |
| Single upload | 10 MB | 25 MB | 100 MB | 250 MB | 1 GB |
| API rate limit (requests / min) | 30 | 60 | 300 | 1,000 | 3,000 |
| Webhook retries | 3 | 5 | 10 | 10 | 10 |
| Recording retention | 30 days | 90 days | 90 days | 180 days | 365 days |
| Desktop companion | no | no | yes, cap 200 steps / task | yes, 500 | yes, 1,000 |
| Builder voice minutes / month | 10 | 30 | 100 | 300 | unlimited |
| Top-up balance ceiling | 2,000 | 20,000 | 100,000 | 500,000 | none |

All *proposed* except knowledge pages, builder messages and desktop step tiers, which are decided. Every cap is a row in a `plan_limits` table, never a constant in code, and every cap shows the customer a "raise this" link that opens the upgrade or a support ticket.

Safeguards independent of plan, decided in the session or already in the platform:

- Do-not-call list checked before every dial; TRAI window enforced; every call recorded and transcribed; disclosure line read on outbound scripts.
- Acceptable-use screening of bot prompts on create and edit (KAN-41).
- Sandbox API keys cannot write; production keys never inherit staff role (KAN-83).
- Impersonation audited and time-boxed (KAN-82).
- Desktop companion: approval card before any irreversible action; inverse recorded for undo; screenshots kept last 3, pruned every 25 steps, never stored without opt-in.

## 8. Invoicing and tax, decided (KAN-80)

- Prices exclusive of GST. GSTIN and state captured at checkout, optional on Everyday, required from Business.
- CGST 9% + SGST 9% for Tamil Nadu customers, IGST 18% otherwise. SAC 998314.
- Sequential invoice numbers per financial year, credit notes for refunds.
- Foreign accounts: USD, text only, invoice marked "Supply meant for export under LUT without payment of IGST", LUT number stored, FIRC or FIRA reference recorded per settlement.
- Udyam number on every invoice for the 45-day payment rule on enterprise accounts.
- Monthly GSTR-1 export from the ledger reconciles to Razorpay settlements.

## 9. Super-admin KPIs

Everything below is a query over tables that already exist (ledger, runs, agent_events, plans, partner statements) or that this spec creates (plan_limits, rate_book, provider_cost_log). Show daily, 7-day and 30-day, with the previous period beside it.

### 9.1 Revenue

| KPI | Definition | Why |
|---|---|---|
| MRR | sum of active subscription prices, annual divided by 12 | the number |
| ARR | MRR × 12 | for the deck |
| New, expansion, contraction, churned MRR | month over month movement by org | where growth comes from |
| Net revenue retention | (start MRR + expansion − contraction − churn) / start MRR, cohort by signup month | the SaaS health number |
| Top-up revenue | packs sold, ₹ and credits | attach rate signal |
| Top-up attach rate | orgs buying a top-up / paying orgs | tells you plan sizes are right |
| Overage credits billed | credits consumed above plan at next-tier rates | upgrade trigger |
| Enterprise committed revenue | prepaid minutes contracts, recognised monthly | Kriti Labs line |
| Deferred revenue | unused prepaid credits × ₹0.50 | balance sheet liability |
| Export revenue, USD | zero-rated invoices | LUT compliance and FIRC matching |
| GST collected, by CGST/SGST/IGST | from invoices | filing |
| Partner commission liability | statements accrued, unpaid | cash planning |
| Refunds and credit notes | count and ₹ | quality signal |

### 9.2 Customers and funnel

| KPI | Definition |
|---|---|
| Free signups by source | ads, organic, referral, champion code, campus |
| Activation | first bot live within 7 days / signups |
| Free to paid conversion | paid within 30 days / signups, by source |
| CAC by channel | ads spend / paid from that channel |
| Paying orgs by plan | count and mix |
| Logo churn, revenue churn | monthly, by plan |
| Upgrade and downgrade counts | plan moves |
| Time to first paid event | median days |
| Champion-sourced accounts | by partner code, with commission |
| Campus Builder accounts | active, converted after graduation |

### 9.3 Usage and unit economics

| KPI | Definition |
|---|---|
| Voice minutes / day | by language, by plan, by provider |
| Text events / day | replies, knowledge answers, routine runs, tool calls |
| Credits consumed / day | by event type; plan credits vs top-up credits |
| Credits sold vs consumed | monthly; consumption ratio per plan (the model assumes 60 to 80%) |
| Gross margin per event type | (credits × ₹0.50 − provider cost) / revenue, per voice minute, text reply, knowledge answer, builder message, desktop step |
| Provider cost per Indic minute | actual, from provider_cost_log, against the ₹2.78 assumption |
| Sarvam credit burn | ₹ used of the ₹25,000 this month; projected exhaustion date |
| Markup realised vs configured | actual sell / actual cost per component |
| Infra cost per minute | AWS bill / minutes, monthly |
| Builder messages per org | median, and share over allowance |
| Knowledge pages per org | median, and share over cap |
| Desktop steps per task | median, and cost per task |

### 9.4 Quality and reliability

| KPI | Definition |
|---|---|
| Call answer rate | inbound answered / inbound offered |
| Call completion rate | ended normally / started |
| Transfer rate | warm transfers / calls |
| Needs-attention rate | needs_attention events / bot runs |
| Could-not rate | could_not events / bot runs |
| STT, LLM, TTS latency p50 and p95 | per provider, per language |
| End-to-end first-response latency p95 | target under 700 ms |
| Provider error rate | by provider; drives failover |
| Concurrency peak / plan cap | headroom against the media box |
| Webhook delivery success | delivered / attempted |
| Routine on-time rate | ran within 1 min of schedule |
| QA score distribution | per bot |

### 9.5 Trust and admin

| KPI | Definition |
|---|---|
| Impersonation events | who, whom, when, reason; alert on any |
| Superadmin actions | credit adjustments, rate edits, plan overrides, with note |
| AUP screen hits | prompts blocked or flagged |
| DNC hits | dials prevented |
| Calls outside window prevented | count |
| Data requests | export, erasure, with SLA |
| API key age and last use | rotate stale keys |
| Failed logins and rate-limit trips | by IP |

## 10. Implementation prompt for the platform agent

Paste the block below into a Claude Fable 5.1 session in the `echowave-redesign` repository. It assumes the repository's CLAUDE.md and AGENTS.md are loaded and the session has Jira access.

```
You are implementing credits-based pricing for Decibyl in this repository (FastAPI in api/, Next.js in ui/). The full specification is docs/gtm/pricing-spec-and-implementation-prompt.md in the stratfiy/decibyl repository; read it first and treat it as the source of truth. Work on branch claude/pricing-credits. Do not touch the thread page, the workspace shell or anything under Jira epics A to H, which another agent owns; if a change there is unavoidable, stop and say so.

Scope, in this order, one PR per step, each with tests and a migration where needed:

1. KAN-52 Credits as the unit. Add credits to the ledger as a derived view over balance_paise (1 credit = 50 paise, ceil per event). Every API response that shows balance shows credits; internal costing stays in paise. Ledger writes remain serialised per organisation (KAN-44).

2. KAN-53 Plan ladder. Seed Free, Everyday, Business, Growth, Scale, Campus Builder with price, monthly credits, voice_allowed, numbers_included, builder_allowance, knowledge_page_cap and every row in the caps table (spec section 7) as plan_limits rows, never constants. Everyday has voice_allowed=false: an Everyday org cannot attach a number or set a calling direction. Plan credits roll over while active. Annual = 10 months.

3. KAN-54 Per-component markup. Replace the flat managed markup with per-component multipliers (carriage 1.15, STT 1.30, LLM 2.00, TTS standard 1.80, TTS premium 1.40) plus a per-minute platform fee by plan (₹2.50 / ₹2.00 / ₹1.50). Keep per-model overrides. The rate card is computed from provider list cost × multiplier and rounded up to credits; the sell prices in spec section 4 are the published rounding and must be reproducible from the computation within 2 credits, with the Business Indic minute pinned at 12 while the Sarvam credit runs.

4. KAN-58 Rate book refresh. Update provider rows per spec section 5.2 with source URL and date on each row. Repoint every default off gemini-2.5-flash-lite before 16 October 2026. Builder default claude-sonnet-5.

5. KAN-55 Top-ups and overage. Packs per spec section 3, never expire, consumed after plan credits. Voice overage at the next tier's per-minute credits. Razorpay INR and international card USD.

6. KAN-56 Meter the unmetered. Text reply 1, knowledge answer 2, routine run 2, Composio standard 1 and premium 3, verification 2 free then 2, builder allowance by plan then 5 per message (3 on Gemini, 15 on Opus), builder voice minute 5, screen-share minute 2. Every event kind in the timeline carries a credit cost or an explicit included marker. Replace the daily builder cap with the allowance.

7. KAN-57 Knowledge caps. Enforce knowledge_page_cap; over cap, 1 credit per 10 typed pages and 2 credits per scanned page; show the cost before the upload runs; re-embedding free.

8. KAN-80 GST and export invoicing. GSTIN and state at checkout; CGST+SGST for Tamil Nadu, IGST otherwise; SAC 998314; sequential numbering per FY; credit notes; zero-rated USD invoices under LUT with the LUT number stored and FIRC reference per settlement; Udyam number on every invoice; monthly GSTR-1 export.

9. Super-admin KPIs. Add a read-only /admin/kpis surface (router-level get_superuser, tagged admin) exposing every KPI in spec section 9 as daily, 7-day and 30-day values with the previous period, computed from ledger, runs, agent_events, plans, plan_limits, rate_book, provider_cost_log and partner statements. Add provider_cost_log if absent: one row per billed event with provider, component, unit, quantity, list cost, discounted cost. Render it as a page under ui/src/app/superadmin gated on staffRole === superadmin, not isStaff.

Rules:
- Read api/services/billing/ and the existing rate-card and plan code before writing anything; extend, do not fork.
- Regenerate the UI client (npm run generate-client) and the docs OpenAPI dump (python -m scripts.dump_docs_openapi) after any route change; CI asserts no drift.
- Tests first: for each step write the failing test (pytest under api/tests with api/.env.test sourced), then implement. Include the worked example in spec section 5.3 as a test.
- No secrets in code. Rate-book entries carry source URL and date. Every cap has a customer-facing "raise this" path.
- Do not change published prices or credits without a note in the spec file and a Jira comment on KAN-47.
- Commit per step with conventional messages; open one PR per step against main; post the acceptance evidence (test output, a screenshot of the admin KPI page) in the PR body.

Open decisions you must not guess; ask Nithish and stop if they block a step: Smallest per-character contract rate; ElevenLabs plan; Sarvam discount start date; whether the Business Indic minute moves to 14 credits or the platform fee drops to ₹1.50 when the Sarvam credit ends; the negative-balance grace policy; concurrency and dial caps per plan.
```

---

*Prepared 14 September 2026 from the session with Nithish Kalyan. Provider prices were fetched that day from the vendors' pricing pages and will move; the rate book, not this file, is the runtime source.*
