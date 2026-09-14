# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-09-15

Auto-drafted from the Decibyl site data (data/jobs.ts, data/competitors.ts, data/pricing.ts, lib/site.ts), the pricing spec (docs/gtm/pricing-spec-and-implementation-prompt.md) and the financial model. Founder review pending; see the open questions at the end.

## Product Overview
**One-liner:** AI workers for Indian businesses. On the phone, on WhatsApp, on email, in your books.
**What it does:** Decibyl lets a small business describe a job in plain words, by typing or by talking, and get a working voice or text agent that answers calls on an Indian number in the language the caller opens with, writes every outcome to the tool the business already uses (Tally, Zoho, Google Sheets, WhatsApp) and runs routines on a schedule. Screen share and a desktop companion let the agent do the clicking too.
**Product category:** AI workers for small business (the shelf of roles, built by talking, working on every channel). Search demand still arrives as "AI receptionist", "AI telecaller", "voice bot for clinic", so those remain the SEO doors; they are not the brand claim. Voice is one channel, and voice agents are a commodity by 2026.
**Product type:** Self-serve SaaS with an assisted onboarding tier.
**Business model:** Monthly plans with included credits (1 credit = ₹0.50), a voice minute at 13, 12 or 11 credits by plan, top-ups that never expire, annual at 10 for 12. Free plan with a one-time 1,000 credits. GST charged in India, zero-rated USD invoicing abroad under LUT.

## Target Audience
**Target companies:** Indian SMBs with a phone-heavy front desk and 1 to 50 staff: clinics and diagnostic labs, coaching institutes and colleges, real-estate brokers, D2C brands with COD orders, NBFC and collections agencies, CA and procurement offices. Secondary: Indian-diaspora and global SMBs on text channels.
**Decision-makers:** The owner or the one person who runs operations. There is rarely a second stakeholder.
**Primary use case:** Replace or extend the person who answers the phone and updates the register.
**Jobs to be done:**
- Never miss a call, in any language, at any hour, without hiring a second receptionist.
- Get the outcome of every call written down where the business already looks.
- Chase people (payments, confirmations, follow-ups) without a telecaller on payroll.
**Use cases:** Clinic receptionist, collections telecaller, order-confirmation executive, real-estate telecaller, admissions counsellor, customer-support executive, procurement follow-up, lead qualification (each has a page under /jobs).

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Owner-operator (user, buyer, payer in one) | Missed calls, salary cost, being on call themselves | Cannot hire, train and retain a ₹15k to ₹25k receptionist; loses customers after hours | A worker for a fraction of one salary, live in an afternoon, no code |
| Ops lead at a 20 to 50 seat firm (champion) | Data landing in Zoho or Sheets, audit trail | Telecallers do not update the CRM; owner asks for numbers | Every call becomes a row with a recording and a timestamp |
| CA or accountant (technical influencer) | GST invoice, Tally entries, data residency | Foreign SaaS without GST invoice; data outside India | Indian entity, GST invoice, data in AWS Mumbai, Tally XML integration |

## Problems & Pain Points
**Core problem:** The phone is the business's front door and nobody reliable is standing at it. Calls go unanswered after 7 pm, in the wrong language, or during the one call the owner is already on.
**Why alternatives fall short:**
- Global voice platforms (Vapi, Retell, ElevenLabs Agents) are developer tools priced in USD per minute with no Indian number, no GST invoice and weak Indic speech.
- Indian call-centre outsourcing (SquadStack) sells human minutes at ₹8 to ₹15 and needs volume commitments.
- IVR and cloud telephony (Exotel, MyOperator) route calls but do not hold a conversation or write the outcome anywhere.
- Enterprise bots (Yellow.ai, Gnani) start at lakhs a year and need an implementation team.
**What it costs them:** A missed enquiry call in real estate or admissions is worth ₹500 to ₹5,000 in lost margin; a receptionist costs ₹15k to ₹25k a month plus attrition every eight months.
**Emotional tension:** The owner is the fallback for every call and cannot leave the phone. Hiring feels risky; a bot feels risky in a different way ("what if it says something wrong to a patient?").

## Competitive Landscape
**Direct:** Bolna, Gnani.ai, Yellow.ai (Indian voice agents) — fall short because they sell to enterprises through sales teams, not self-serve at ₹999 to ₹19,999.
**Secondary:** Vapi, Retell AI, ElevenLabs Agents (global voice platforms) — fall short because they are developer products, USD-priced, no Indian carriage, no GST invoice.
**Indirect:** Hiring a receptionist or telecaller; SquadStack-style outsourced callers; Exotel and MyOperator IVR — fall short on cost, hours, language coverage, or because they do not act on the call outcome.
(Full profiles in data/competitors.ts and /compare.)

## Differentiation
**Key differentiators, in the order we lead with them:**
1. The shelf: roles a business hires (clinic front desk, property lead qualifier, collections, order confirmer), each priced a month.
2. Tell Decibyl the job: built by talking or typing, edited by handle, heard before it goes live; Decibyl coordinates the workers.
3. Every channel from one worker: phone, WhatsApp, email, web chat, SMS, with the same memory and tools behind all of them.
4. Routines: scheduled work armed only after a test run.
5. Memory that asks before it believes: facts from calls stay out of prompts until confirmed; gaps shown beside facts.
6. Writes to Tally, Zoho, Sheets and 100 more; desktop companion for software without an API.
7. A price you can check: one credit is fifty paise, a published rate card, itemised receipts.
8. Tested before it meets a customer: Hear it, Try it, Check it, all stamped as tests.
9. Indian Pvt Ltd, GST invoice, LUT for exports, data resident in AWS Mumbai, Sovereign option.
Indic-first speech is still true and still cheaper; it is the floor, not the pitch.
**How we do it differently:** The unit of the product is a job ("clinic receptionist"), not a feature ("STT + LLM + TTS"). Pricing sits beside a salary, not beside API costs.
**Why that's better:** An owner can judge it in one sentence: "this does the ₹18k job for ₹2,999."
**Why customers choose us:** It picks up in Tamil at 9 pm and the appointment is in the sheet by 9:01.

## Objections
| Objection | Response |
|-----------|----------|
| "It will say something wrong to a patient or a customer." | Every reply is logged with a recording and a timestamp; a human handoff rule is one sentence; medical or legal answers are refused by default. Call the demo number and try to break it. |
| "My callers speak Tamil / Hindi mixed with English." | Sarvam models are trained on code-mixed Indian speech; the demo line answers in the language the caller opens with. |
| "What does a minute really cost me?" | 13, 12 or 11 credits by plan, ₹6.50 to ₹5.50 a minute, and every other charge is on the published rate card; top-ups never expire. |
| "Is my data going abroad?" | Voice and call data stay in AWS Mumbai; the DPA is public at /legal/dpa. |

**Anti-persona:** Enterprises needing SSO, on-premise deployment or a dedicated success team; call centres wanting to resell minutes; anyone whose calls are mostly outbound cold sales at scale (compliance and reputation risk).

## Switching Dynamics
**Push:** Missed calls after hours, receptionist attrition, CRM never updated, owner tied to the phone.
**Pull:** Live in an afternoon, priced beside the salary, answers in the caller's language, outcome lands in the tool they already use.
**Habit:** "The girl at the desk knows our patients." Paper registers. Fear of changing the number customers know (solved by forwarding, not porting).
**Anxiety:** Bot embarrassing the business; hidden per-minute bills; data leaving India; the vendor disappearing (bootstrapped, founder-run).

## Customer Language
**How they describe the problem:**
- "Calls come after 7 and nobody picks up."
- "She left, now I am on the phone all day."
- "The telecaller never updates the sheet."
**How they describe us:**
- "Bot that talks Tamil and books the appointment."
- "Like a receptionist but on the phone system."
**Words to use:** worker, job, picks up, writes it down, in your language, beside the salary, Indian number, GST invoice, recording.
**Words to avoid:** LLM, STT, TTS, pipeline, prompt, agentic, hallucination, "AI-powered", "revolutionary", "voice AI platform" (that is the commodity shelf we are not on), "hire" until the legal wording pass lands (say "runs the job", "pick a role").
**Glossary:**
| Term | Meaning |
|------|---------|
| Worker / agent | One configured voice or text bot doing one job |
| Credit | Billing unit, ₹0.50; voice minutes cost 10 to 12 credits |
| Routine | A scheduled action the worker runs without a call |
| Knowledge base (KB) | Uploaded documents the worker answers from |
| Desktop companion | Local app that lets the worker operate Tally and other desktop software |
| Sovereign | Plan flag restricting all providers to Indian-hosted models |

## Brand Voice
**Tone:** Plain, confident, unhurried. Speaks like a careful colleague, not a launch video.
**Style:** Short declarative sentences. Numbers beside real things (salary, minutes). No hype adjectives, no em-dashes, Indian English spelling.
**Personality:** Practical, honest about limits, local, technical underneath, warm without being cute.

## Proof Points
**Metrics:** Demo line answers in 11 Indian languages; 155 public pages covering jobs, cities, languages, tools; voice from ₹6 a minute against ₹8 to ₹15 for human callers. (Customer metrics to be added after the first ten paying accounts.)
**Customers:** None public yet. Design-partner outreach in progress (Kriti Labs, Logicorp).
**Testimonials:**
> (none yet; collect from first ten accounts)
**Value themes:**
| Theme | Proof |
|-------|-------|
| Cheaper than the salary | Price cards on every /jobs page show plan price beside advertised salary |
| Speaks the caller's language | Live demo number; Sarvam Indic models |
| Outcome lands in your tool | Integration pages for Tally, Zoho, Sheets, WhatsApp |
| Indian, compliant, resident | Pvt Ltd, GST, LUT, AWS Mumbai, public DPA |

## Goals
**Business goal:** Bootstrapped to EBITDA breakeven by month 6 to 10 (financial model base case), ₹1 crore ARR by month 24.
**Conversion action:** Call the demo number, then sign up for the Free plan and build a worker by talking to it.
**Current metrics:** Pre-launch. Targets from the model: 5% free-to-paid conversion, ₹250 blended CAC, ads ₹25k rising to ₹2L a month.

## Open questions for the founder
- Which two jobs get the launch budget first (clinic receptionist and collections are the model's assumption)?
- Confirm the final plan names after the pricing reconciliation on KAN-47.
- Add CIN and GSTIN once ready for the footer and this doc.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v2 (2026-09-15) — Repositioned from voice-first to AI workers on every channel; differentiators re-ranked with the shelf and Decibyl-as-builder first, after the founder's call that voice agents are a commodity.
- v1 (2026-09-14) — Initial context, auto-drafted from site data, pricing spec and financial model.
