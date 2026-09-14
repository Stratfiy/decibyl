# Decibyl: marketing, growth and finance plan

**Version:** v1, 2026-09-14
**Owner:** roadmap agent (marketing, growth, finance). Product is owned by the app agent (Jira epics A to H, echowave-redesign).
**Inputs:** `.agents/product-marketing.md`, `docs/gtm/Decibyl-Financial-Model.xlsx`, `docs/gtm/pricing-spec-and-implementation-prompt.md`, `docs/gtm/self-serve-gtm.md`, `docs/gtm/industry-champions.md`, Jira epics I to P.
**Method:** the marketing-plan skill (AARRR, portfolio not campaign), cut to what a bootstrapped founder plus two agents can run.

## 1. Executive summary

Three bets for the next 12 months:

1. **Own "AI receptionist in <language> in <city>" in Indian search and in AI answers.** The 155 programmatic pages are live; the next 160 (job × language, job × vertical) plus schema, llms.txt and directory backlinks make Decibyl the page that Google, ChatGPT and Perplexity return for the question an owner actually types.
2. **Sell one job first: the clinic receptionist.** Tamil Nadu and Karnataka clinics, inbound only, priced beside the ₹15k to ₹25k salary. Real-estate enquiry is the second job. Collections waits for Q1 2027 and a compliance checklist.
3. **Spend nothing we cannot measure.** Ads stay at ₹25k a month on Google Search intent keywords until the funnel reports a blended CAC under ₹400 for two consecutive months. Then and only then ads step to ₹1L.

90-day outcome: public launch in the week of 2026-10-19, 30 paying accounts, first two champion partners signed, CAC and free-to-paid conversion measured and written back into the model. 12-month outcome: EBITDA breakeven by month 6 to 10 depending on conversion, ₹1 crore ARR run-rate by month 24 per the model's base case.

## 2. Strategic frame

**Category claim:** AI receptionist and telecaller for Indian small businesses. Not "voice AI platform". The shelf is the job title.

**Market-quality gate:** large problem (a missed enquiry is worth ₹500 to ₹5,000; a receptionist costs ₹15k to ₹25k a month) and high frequency (every day, after 7 pm, in the wrong language). Best quadrant. The compounding portfolio approach fits.

**ICP for the first 90 days:** single-location clinics, diagnostic labs and dental practices with 1 to 5 doctors in Chennai, Coimbatore, Madurai and Bengaluru, where the owner or the practice manager buys. Secondary: real-estate brokers with 2 to 20 telecallers in the same cities.

**Business-model logic:** Business plan at ₹2,999 with one number and 5,000 credits is the anchor. Free plan is for builders and trials, not a permanent tier. Voice minutes are the value metric; plan price is the mental anchor beside the salary.

**Brand voice non-negotiables:** plain, numbers beside real things, no hype adjectives, no "hire a bot" until the wording pass lands, Indian English.

**Growth phase:** ₹0 to ₹10k MRR. Binding constraint is the founder's hours, not budget or channels. Every move below must run without the founder on the phone all day.

## 3. Current state

| Area | State | Score (0 to 5) |
|---|---|---|
| Positioning and context doc | Written today, founder review pending | 3 |
| Website and programmatic SEO | 155 pages, sitemap, OG, llms.txt, DPA, claims fixed | 4 |
| Pricing | Decided; reconciliation with app agent open on KAN-47 | 3 |
| Analytics | PostHog on site and app; no funnel dashboard, no CAC write-back | 1 |
| Email and lifecycle | Resend wired; no sequences | 0 |
| Paid | Nothing running | 0 |
| Social and founder presence | Nothing scheduled | 0 |
| Directories and reviews | None submitted | 0 |
| Partnerships | Kriti Labs proposal, Logicorp quote pending | 1 |
| Campus | Plan written (epic L), nothing started | 1 |
| Finance | 24-month model with balance sheet; opening cash ₹5L; no accounting cadence | 3 |
| Compliance and entity | Pvt Ltd, GST, LUT; Udyam, DPIIT, StartupTN not filed | 2 |

Already done and worth acknowledging: the site claims pass, the pair-page system with build-time consistency guard, the pricing spec, the financial model, epics I to P in Jira, and on the product side the credits ledger, the OpenAPI split and the API reference.

## 4. Acquisition

**Owned (the compounding assets)**
- Programmatic SEO, phase 1 remainder: 80 job × language and 80 job × vertical pages, same guard pattern, each hand-written intro and FAQ. Skill: programmatic-seo, schema. Leading indicator: indexed pages and impressions in Search Console weekly.
- AI-answer optimisation: llms-full.txt, FAQ schema on every pair page, one comparison hub per competitor, "best AI receptionist in India" listicle written by us. Skill: ai-seo. Indicator: monthly citation check in ChatGPT, Perplexity and Google AI Overviews for 20 tracked queries.
- Demo phone line as the front door: every page ends with the number. Indicator: demo calls per week, language mix.
- WhatsApp broadcast list and a monthly email, "What the bot answered this month", with one real anonymised call per issue. Skill: emails.

**Rented**
- Founder LinkedIn, three posts a week: one call transcript, one number, one build-in-public note. Skill: social. Indicator: profile visits to site sessions.
- YouTube Shorts and Instagram Reels in Tamil and Hindi: 30-second clips of the bot answering a real-style call. Batch 12 at a time. Skill: video.
- Reddit r/indianstartups, r/india_tech and IndieHackers for the launch week only.

**Borrowed**
- Clinic-software and CA partners: practice-management vendors, three Chennai CA firms, one dental supplies distributor. Offer: 20% recurring for referred accounts through the partner program. Skill: co-marketing, referrals.
- NIT Durgapur alumni network and E-Cell (epic L, KAN-70) for builders and champions.
- Directory layer: Product Hunt anchor, then Indian and AI directories (details in §9). Skill: directory-submissions.

**Paid**
- Google Search only, exact and phrase match on "AI receptionist", "clinic receptionist software", "call answering service" plus city modifiers, Tamil and English. ₹25k a month, one campaign, landing on the matching /jobs or /ai-receptionist page. Skill: ads, ad-creative. Kill rule: pause any ad group above ₹600 cost per free signup after ₹5k spend.
- No Meta, no LinkedIn ads before month 4.

**Skipped, with reason:** cold email at scale (deliverability, and owners answer WhatsApp, not email), podcasts and events (founder time), influencer spend (no budget), Bing and Quora.

## 5. Activation

- Demo call to signup: the number answers, offers to send a signup link on WhatsApp, and the link lands on the builder with the caller's language preselected. Needs the app agent (filed as a request on epic M, not a product decision).
- First-run promise: a worker live on a test number in 15 minutes. Onboarding checklist in the app, three steps: describe the job, hear it, connect the tool. Skill: onboarding.
- Lifecycle emails and WhatsApp: day 0 welcome with the demo transcript, day 2 "your bot's first call", day 5 "connect Tally or Sheets", day 9 upgrade nudge with the minutes used. Skill: emails.
- Paywall moment: the 1,000 free credits run out inside the first real week if the bot is used. The limit-reached screen shows minutes used, the salary comparison and the Business plan. Skill: paywalls.

## 6. Retention

- Weekly "your bot this week" WhatsApp digest: calls answered, languages, outcomes written, minutes left.
- Churn signals from the admin KPIs: no calls in 7 days, credits unused, number not forwarded. Daily loop, founder gets a list of five accounts to call. Skill: churn-prevention, marketing-loops.
- Cancellation flow with a pause option and a "switch to text-only" save offer.
- Failed-payment dunning through Razorpay with WhatsApp reminders on day 1, 3 and 7.

## 7. Referral

- Partner program already in the product: every account gets a referral link worth one month of credits for both sides. Surface it in the weekly digest and on the invoice.
- Champions (KAN-76): two Chennai industry champions on retainer plus 25% commission from month 4, once the champion dashboard exists.
- Campus champions (KAN-72) follow in bootstrap-3.

## 8. Revenue and finance

**Pricing:** as reconciled on KAN-47. The app agent's shipped numbers are the source of truth until the founder decides the eight open rows. Finance position: adopt list-cost margins (no vendor discount in margin), cap rollover at one month, keep ₹19,999 Scale with a 35,000 grant.

**Budget, months 1 to 3 (bootstrapped tier):**

| Line | ₹ per month | Note |
|---|---|---|
| Google Search ads | 25,000 | model Assumptions, ads month 1 to 3 |
| Tools (Resend, PostHog, domain, Canva) | 4,000 | |
| Directory and review listings | 2,000 | G2 and Capterra free tiers, Product Hunt free |
| Content production (Tamil voice talent for Reels) | 3,000 | |
| Champion retainer | 0 | starts month 4 |
| **Total marketing** | **34,000** | about 7% of month-6 model revenue |

Step-ups are earned, not scheduled: ads to ₹1L when CAC is under ₹400 for two months and free-to-paid at or above 4%; to ₹2L when EBITDA is positive for two months.

**Cash:** opening ₹5L, lowest point ₹2.1L negative in the base case at month 4 to 5. Decision: secure a ₹3L buffer now, in this order: founder loan to the company at a documented interest rate, then the StartupTN TANSEED grant application, then a Sarvam credit extension request. No equity raise this year.

**Unit-economics targets to write back to the model monthly:** blended CAC (all marketing spend divided by new paid accounts, salaries included), free-to-paid conversion, plan mix, voice minutes per paid account, gross margin per plan, monthly churn per plan.

**Compliance calendar (finance owns):** Udyam registration this month, DPIIT recognition this month, GST returns monthly, LUT renewal in April, FIRC on every USD receipt, TDS on champion retainers, board minutes quarterly.

**Accounting cadence:** Tally as the book, Razorpay and bank reconciled weekly, the model's Actuals column filled on the 5th of every month.

## 9. 90-day roadmap

Owners: F = founder (Nithish), R = roadmap agent, A = app agent (requests only), C = champion.

**Weeks 1 to 2, unblock (2026-09-14 to 2026-09-27)**
- Founder reviews the context doc and decides the KAN-47 rows. F
- Job × language and job × vertical pages shipped; PR opened from the SEO branch. R
- Search Console, PostHog funnel dashboard, UTM plan; CAC sheet linked to the model. R
- Udyam and DPIIT filed; ₹3L buffer decision made. F
- Directory readiness: logo pack, 3 screenshots, 60-second demo video, tagline variants. R
- Request to app agent: demo-line to WhatsApp signup link; limit-reached screen copy. R to A

**Weeks 3 to 4, foundation (2026-09-28 to 2026-10-11)**
- Lifecycle emails and WhatsApp digest written and loaded in Resend. R
- Google Search campaign built, paused until launch day. R
- 12 Reels recorded in Tamil and Hindi. F with voice talent
- Product Hunt page drafted, hunter secured, 50 supporters on a WhatsApp list. F, R
- Three clinic-software and CA partner conversations opened. F
- Logicorp quote sent and followed up (KAN-79). F

**Weeks 5 to 8, velocity (2026-10-12 to 2026-11-08)**
- Public launch week of 2026-10-19: Product Hunt Tuesday, LinkedIn and Reddit same day, ads on, WhatsApp list told. All
- Directory batch: BetaList, TAAFT, Futurepedia, AlternativeTo, SaaSHub, G2, Capterra, StartupTN portal, Inc42 and YourStory directories. R
- 10-in-30 reviews protocol on G2 and Capterra using the first accounts. F
- Diwali (2026-11-08) offer: annual at 10 for 12 already exists; add three months of number rental free for annual signups in November. R
- Weekly loops start (§11). R

**Weeks 9 to 12, compound (2026-11-09 to 2026-12-06)**
- First CAC and conversion read; step-up decision on ads. F, R
- First two champions signed for a January start (KAN-76). F
- Second job (real-estate enquiry) gets its ad group and Reels set. R
- Case study from the first clinic, with the owner's numbers, published as a page and a PDF for partners. R
- Model Actuals filled for October and November; plan v2. R

## 10. 12-month outlook

| Quarter | Milestone | What unlocks it |
|---|---|---|
| Q4 2026 | Launch, 30 paying, CAC measured | This plan |
| Q1 2027 | 120 paying, champions live, ads ₹1L if earned, collections job with compliance checklist, campus pilot at NIT Durgapur | CAC under ₹400, EBITDA near zero |
| Q2 2027 | EBITDA positive, mobile apps in stores (epic K) with ASO, first Hindi-belt cities (Jaipur, Lucknow, Indore) | App agent ships epics K and O; ASO skill |
| Q3 2027 | 400 paying, USD text-only plan marketed to diaspora SMBs, second champion city (Bengaluru) | LUT invoicing live, gross margin above 60% |

Growth will be linear with two step functions: the champion channel in Q1 and the app-store listing in Q2. No hockey stick is assumed anywhere in the model.

## 11. Marketing operations stack and loops

| Stage | Skills | Tools |
|---|---|---|
| Acquisition | programmatic-seo, ai-seo, schema, ads, ad-creative, social, video, directory-submissions, co-marketing | Search Console, Google Ads, PostHog, Canva, Resend |
| Activation | onboarding, signup, emails, paywalls | Resend, WhatsApp Business API (in product), PostHog |
| Retention | churn-prevention, emails, marketing-loops | Admin KPIs, Razorpay |
| Referral | referrals, community-marketing | Partner program in product |
| Revenue | pricing, paywalls | Credits ledger, Tally, model xlsx |

Loops, run by the roadmap agent on a schedule:
- Weekly Monday: rankings and index coverage for 40 tracked queries; act only on a two-week drop.
- Every 3 days once ads run: CPA per ad group; pause above the kill rule.
- Daily once accounts exist: churn signal list of five accounts for the founder.
- Monthly on the 5th: model Actuals fill, CAC write-back, plan changelog.
- Weekly Friday: competitor pricing and positioning diff for the nine profiles in data/competitors.ts.

## 12. Idea bank, decided

Now: programmatic SEO, AI-answer pages, demo line, Product Hunt, directories, Google Search ads, lifecycle emails, WhatsApp digest, founder LinkedIn, Reels, partner referrals, Diwali annual offer, case study.
Q1 2027: champions, collections job, campus pilot, G2 badges, comparison pages refresh, webinar for clinic owners with a partner.
Q2 2027 and later: mobile apps and ASO, Hindi-belt expansion, community for builders, free tool (missed-call cost calculator), affiliate program for CAs.
Skip: cold email at scale, paid influencers, events and conferences, Meta and LinkedIn ads before month 4, PR agency, podcasts as a channel.

## 13. Measurement, RACI, open decisions

**North star:** paid voice minutes per week.
**Leading indicators:** demo calls per week, free signups per week, free-to-paid within 14 days, CAC, weekly active workers, minutes per paid account, churn per plan.

| Work | Founder | Roadmap agent | App agent | Champion |
|---|---|---|---|---|
| Marketing plan, budget, finance | A | R | I | I |
| Site, SEO, content, directories, ads | C | R | I | I |
| Product changes the plan needs | I | C | R | I |
| Partner and customer conversations | R | C | I | R |
| Pricing final numbers | A | R | C | I |

**Open decisions for the founder**
1. The eight KAN-47 pricing rows.
2. ₹3L cash buffer route.
3. Tamil voice talent for Reels: founder's own voice or a paid voice.
4. Product Hunt hunter and launch date confirmation (week of 2026-10-19 proposed).
5. Whether collections stays in Q1 or is dropped for compliance risk.

## Changelog
- v1 (2026-09-14) — Initial plan after the founder handed marketing, growth and finance to the roadmap agent.
