# Pricing: credits per month, decided against the engine we already have

Written 14 Sept 2026. Reads with PRICING-DECISIONS.md in the platform repo,
which stays the record of truth for rates.

## The finding

The billing engine already is a credit system. A plan grants rupees
(`balance_paise`), and each call draws down its composed cost: pulsed
platform fee, plus LLM, STT and TTS at their own rates, plus carriage, each
marked up (1.7x managed, live in the database). Numbers are a monthly
rental on the same ledger. There is nothing to build to sell "credits";
there is a presentation decision and three plan-sizing decisions.

## Decisions

1. **One credit is one rupee.** Do not invent an abstract unit the way
   app-builder tools do. Indian SMBs buy prepaid recharges in rupees and
   read GST invoices in rupees; an abstract credit makes "what did that
   call cost" unanswerable, which is the complaint buyers already have
   about competitors. Call it credit on the page if the word helps; the
   number is rupees.
2. **Composed cost stays visible.** Every call shows its own receipt: fee,
   speech in, model, speech out, carriage. This is the differentiator over
   flat per-minute vendors and over abstract-credit vendors alike. Already
   built (per-call receipts in the dashboard).
3. **An everyday door under the business ladder.** Founder's call, 14
   Sept: ₹2,999 is a business entry, and the product is for people too.
   The number rental (₹559/month) is what makes Starter dear, and an
   everyday user does not need one: bots on WhatsApp, the web widget and
   scheduled routines, with outbound from the shared platform pool that
   the admin telephony routes already expose.

   | Plan | ₹/month | Credit | Numbers | Fee/min |
   |---|---|---|---|---|
   | Free | 0 | 500 once, no card | none | 3.00 |
   | Everyday | 499 | 450 | none; own number is the ₹559 add-on | 3.00 |
   | Business (was Starter) | 2,999 | 2,500 | 1 | 2.50 |
   | Growth | 7,999 | 7,200 | 2 | 2.00 |
   | Scale | 19,999 | 18,500 | 4 | 1.50 |
   | Custom | on commit | | pool | negotiated |

   The plan buys a cheaper platform fee and included numbers; credit is
   spent at the same composed rates on every plan. Everyday margin at full
   use is about ₹190 on ₹450 of credit at the 1.7x managed markup.

   **Sequencing.** data/pricing.ts on this site has a hard contract with
   `scripts/seed_subscription_plans.py` in the platform repo. Seed Everyday
   there first (balance ₹450, fee ₹3.00/min, zero numbers, shared outbound
   allowed), then add the tier here. Platform change waits for PR #231.
4. **Credit never expires; the plan renews it.** The ledger has no expiry
   and adding one is platform work. Unused credit carries forward, top-ups
   sit on the same balance, and the monthly plan adds its grant on renewal.
   Say it plainly; it reads as generosity and costs nothing.
5. **Markup.** 1.7x on managed provider cost, platform fee by tier, target
   40 to 50 percent gross margin on a managed Hindi/English minute. Do not
   quote margin on regional languages until the characters-per-minute
   query in COMPETITIVE-PRICING-STUDY.md is run; they cost close to twice
   as much and the pricing page already shows included calling as a range
   for that reason. Fair-use note now, surcharge only with data.
6. **Free ₹500 credit on signup, no card.** About 60 minutes of Hindi or
   English on the everyday voice. First recharge minimum stays ₹1,000.
7. **Jobs pages sell the plan, not the rate.** The job-post pages quote the
   plan that runs the job beside the salary. The rate card sits underneath
   for anyone who asks.

## What changes on the site

- Pricing page: "credit" is defined once as rupees; the per-minute table by
  voice bundle stays; add the free ₹500 line and the no-expiry line.
- Dashboard: nothing; receipts exist.
- Platform: set the ₹3/min pay-as-you-go global default (PRICING-DECISIONS
  §2.1, still unset) and the 1.7x managed markup as the code default so a
  fresh install does not regress to 1.4x (§2.9).
