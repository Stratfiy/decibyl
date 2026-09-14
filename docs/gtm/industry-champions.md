# Go-to-market: industry champions, region by region

Written 14 Sept 2026. Companion to `docs/designs/sell-the-job-first-wedge.md`.

Founder: Nithish Kalyan. Ran procurement and manufacturing ops at Reliance,
built 10+ procurement agents on the Jio platform and 25+ n8n workflows for
e-commerce marketing. That is the pitch: bots built by someone who did the
job, not a voice-AI vendor.

The platform already carries the partner program: application, commission in
basis points, referrals, monthly statements (`api/routes/partners.py`,
`api/services/partners/`). This is an operating model, not a build.

## Phase 0 (now to week 4): online, founder-sold
Answer the open price requests (Kriti Labs, Logicorp, doctors, e-commerce,
clothing shop). Run the Hyderabad clinic batch. Three paying accounts. The
founder is the first champion; what is learned is the playbook.

## Phase 1: one region, two industries
Hyderabad. Clinics and labs (inbound, live today). E-commerce and logistics
(the founder's n8n domain; outbound once consented calls are cleared).

Per industry, one industry champion:
- From inside the industry, not a salesperson.
- Retainer ₹15k to ₹25k a month plus 25% of every rupee their accounts top
  up for 12 months, paid through partner statements. Retainer ends at day 90
  with fewer than five paying accounts.
- First job: set up two reference customers with their own hands. What they
  get stuck on is the product backlog. Selling starts only after both run
  unattended for two weeks.
- Certification: job description to live bot in under ten minutes, watched.

## Phase 2: replicate
At five paying accounts per champion, clone: same industry in Chennai and
Bangalore, or the next industry in Hyderabad. Each champion gets a one-page
industry pack: three jobs a bot does, price anchored to local salary, the
template, objections heard so far.

## Not yet
Reseller portal, marketplace page, city launches without a champion.

## Metrics per champion
Two references live by day 30. Five paying by day 90. Churn under one
account a quarter. A day-30 miss means the industry is wrong for this city,
not the person.
