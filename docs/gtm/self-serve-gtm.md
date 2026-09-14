> Superseded for budget, sequencing and finance by [marketing-growth-finance-plan.md](./marketing-growth-finance-plan.md) (2026-09-14). This file keeps the funnel detail.

# Decibyl self-serve GTM strategy

Written 14 Sept 2026. Companion to `docs/designs/sell-the-job-first-wedge.md`
(the first sale) and `docs/gtm/industry-champions.md` (the human channel).
This is the machine: how the product sells itself once the first sales prove
the offer.

## 1. What kind of SaaS this is, and who to copy

Usage-based, SMB and mid-market, India-first, sold to non-technical buyers
with a developer surface underneath. The closest playbooks, and the one
thing to take from each:

| Company | What they did that applies | Take |
|---|---|---|
| Synthflow | No-code builder, templates for the top 20 service-business jobs, time to first call under 30 minutes; 62% of agencies chose it because "no developer required" | Templates are the product; agencies are the channel |
| Retell | $10 free credits, cleanest self-serve for inbound | Free credits, not free trials; make inbound the default path |
| Bland | The demo is a phone number you call | Every job page has a number; "hear it" beats "read about it" |
| Vapi | Docs, llms.txt, MCP server, developer community | The MCP surface is a wedge for the 5% who build, and they bring the 95% |
| Zapier | 63,000 programmatic integration pages, 60% of traffic, bottom-funnel intent | Job x city x language x integration pages, generated from data |
| AiSensy / Wati | India SMB signup in Hindi, WhatsApp activation nudges, Razorpay in the flow | Onboard in the buyer's language; nudge on WhatsApp, not email |
| Razorpay / Zoho | Self-serve core plus a partner network that does the last mile | Champions and agencies close what the website opens |

Benchmarks: India self-serve B2B trial-to-paid runs 8% at baseline and 28%
in the top quartile, and the gap is activation nudges plus founder-led saves.
AI answered 14% of US small-business inbound calls in late 2025, up from 2%
a year earlier. The category is moving; the question is who gets the Indian
SMB to the first call fastest.

## 2. The loop

```
Job page (SEO)  ->  Hear it (call the bot)  ->  Sign up in your language
     ^                                                   |
     |                                          Template -> first call < 10 min
     |                                                   |
 Referral / partner  <-  Day-14 report  <-  ₹1,000 top-up (₹500 free credit first)
```

Every stage exists in the product today except the free credit and the
day-14 report (ROADMAP item 5). Nothing here needs the channels or memory
work to ship.

## 3. Five motions, in the order they compound

### 3.1 Product-led core (weeks 1 to 4)
- **Time to first call is the metric.** Target under 10 minutes from signup.
  Measure it per template; it is the only activation number that matters.
- **₹500 free credit on signup, no card**, roughly 60 minutes. Retell gives
  $10; this is the INR equivalent and it fits the prepaid ledger. First
  recharge stays at ₹1,000 minimum.
- **Onboarding in the buyer's language.** Signup and the first template
  wizard in Hindi, Telugu and Tamil, not just the bot's voice.
- **WhatsApp activation nudges** on real events: template created but no
  test call; first call done but no number; credit at 20%. The India
  playbook says this, not email, is what lifts 8% to 28%.
- **Founder-led save.** Every account that runs a first call and does not
  top up in 7 days gets a personal WhatsApp from Nithish. At current volume
  that is minutes a day and it is where the objections come from.

### 3.2 Programmatic SEO (weeks 2 to 8)
The marketing site already has compare pages, city pages and vertical pages.
Extend them along the axes buyers search:
- **Job x city x language**: "Telugu receptionist bot for clinics in
  Hyderabad". Generated from `data/verticals.ts`, `data/cities.ts` and
  `data/languages.ts`; hundreds of pages from data that already exists.
- **Integration pages**: "Decibyl + Zoho CRM", "+ Tally", "+ Practo",
  "+ Shopify", "+ Google Calendar", one per tool the HTTP API tool or n8n
  can reach. Zapier's 60% of traffic comes from exactly this.
- **Job-post pages**: "AI telecaller for collections, ₹6,000 a month" with
  the salary comparison from the design doc. These are the marketplace idea
  from office hours, built as SEO pages rather than a product.
- Each page carries a phone number to call and a "start with this template"
  link that deep-links into signup with the template preselected.

### 3.3 The demo is a phone number (weeks 1 to 2)
- One public number per top job (clinic front desk, collections, order
  confirmation), each running the real template. Bland grew on this.
- "Hear it on WhatsApp": a 30-second recording per job, shareable.
- The embed widget on decibyl.ai already exists; put it on every job page.

### 3.4 Partners and agencies (weeks 4 to 12)
- Industry champions per `industry-champions.md`: retainer plus 25% for 12
  months through the existing partner statements.
- **Agency white-label**: the reseller tier in the PRD. Synthflow's biggest
  channel is agencies who want no-code; Decibyl's per-account rates and
  commission statements already support it. Package it as "run bots for your
  clients under your brand, we bill you at wholesale".
- n8n and Zapier community: Nithish has 25 workflows; publish the ones that
  call Decibyl as templates in the n8n library with a Decibyl node.

### 3.5 Developer and MCP wedge (ongoing)
- Docs get an llms.txt and the docs MCP endpoint, like Vapi and Bolna.
- "Build a bot from Claude Code" is already documented; make it the
  developer landing page. Developers inside SMBs and agencies are the people
  who install the first bot and then hand it to the owner.

## 4. Packaging for self-serve

Keep prepaid and usage-based; it is the edge. Show three doors, not a rate
card:
- **Try**: ₹500 free credit, one bot, test calls in the browser, no number.
- **Job**: a monthly top-up anchored to the job (₹4,000 to ₹8,000), one
  number, unlimited bots, QA on every call.
- **Team**: committed minutes from 20,000 a month at a lower per-minute
  rate, priority support, partner-managed if wanted.

The rate card stays underneath; the doors are framing.

## 5. Metrics that decide the next quarter

| Metric | Baseline to beat | Where it lives |
|---|---|---|
| Signup to first call | under 10 min, over 60% of signups | activation event |
| First call to paid | 8% baseline, 28% target | ledger |
| Day-14 active (calls without founder) | 50% of paid | run table |
| Minutes per account, month over month | growing | billing overview |
| CAC by channel | SEO near zero, champion under ₹5,000 | partner statements |
| Payback | under 3 months | derived |

## 6. Ninety days

- **Days 1 to 30**: first three paying accounts founder-sold (design doc).
  Free credit, activation events, WhatsApp nudges live. Three public demo
  numbers. Day-14 report shipped.
- **Days 31 to 60**: 200 programmatic pages live from existing data. First
  champion hired in Hyderabad. Integration pages for the top 10 tools.
  Agency white-label packaged.
- **Days 61 to 90**: second industry champion. llms.txt and docs MCP. n8n
  templates published. Read the six metrics and cut whichever motion is not
  moving them.

## 7. Who does what with five people

- Nithish: founder-led sales, saves, champions, pricing.
- One engineer: activation events, free credit, day-14 report, nudges.
- One engineer: programmatic pages, demo numbers, integration pages.
- Two commission reps: only after the template gallery makes setup a
  ten-minute job; until then they are not multiplied by anything.

## Sources
- Synthflow no-code, templates, agencies: synthflow.ai/blog/vapi-ai-alternatives; builts.ai/blog/vapi-vs-bland-ai-vs-retell-ai
- Retell free credits and pricing: tested.media/retell-vs-vapi-vs-bland-vs-synthflow
- Deepgram State of Voice AI 2025 via fewertools.com
- India trial-to-paid 8% to 28%: richautomate.in/blog/whatsapp-b2b-saas-trial-to-paid-india-2026
- AiSensy onboarding, Wati, Interakt: m.aisensy.com/blog/whatsapp-api-providers
- Zapier programmatic SEO: salt.agency/blog/how-zapier-quadrupled-organic-traffic; viewengine.ai/learn/zapier-programmatic-seo-strategy-millions-organic-traffic
