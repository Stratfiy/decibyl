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

## Reference: Emergent's model (read 14 Sept 2026)

Free 10 credits/month; Standard $20 for 100; Pro $200 for 750; Team $300
for 1,250 shared. Credits spend per AI action (landing page 10-20, auth
25-40, deploy ~50); top-ups $0.20-0.27 per credit; annual about 17% off;
unused credits expire monthly. The two complaints in every review: credits
expire, and per-action costs are not published upfront.

## Decisions (revised 14 Sept: credits, not rupees, by founder's call)

1. **The unit is a credit, and 1 credit = ₹0.50 of composed cost.** Small
   enough that a message is a whole credit, large enough that a call is a
   two-digit number. The ledger stays in paise; credits are a display
   conversion (`CREDIT_PAISE = 50`), so the billing engine is unchanged.
2. **Publish the rate card in credits.** Fixes Emergent's transparency
   complaint. Approximate costs at today's composed rates:

   | What | Business | Growth | Scale |
   |---|---|---|---|
   | Voice minute, Hindi or English, everyday voice | 11 | 10 | 9 |
   | Voice minute, Telugu / Tamil / Kannada / Malayalam / Bengali | 18 | 16 | 15 |
   | WhatsApp or web reply (text bot) | 1 | 1 | 1 |
   | Knowledge answer from documents | 2 | 2 | 2 |
   | Scheduled routine run | 2 | 2 | 2 |
   | Phone number | ₹559/month add-on, outside credits | | |

   The regional figure publishes the surcharge data/pricing.ts flags as
   open, as a number rather than a range. The number stays outside credits
   because a fixed cost inside a credit pool is the deploy-cost complaint.
3. **Plans.** Ratios follow Emergent's ladder.

   | Plan | ₹/month | Credits/month | Voice | Numbers |
   |---|---|---|---|---|
   | Free | 0 | 1,000 once, no card | browser test calls only | none |
   | Everyday | 499 | 1,000 | none, text channels only | none |
   | Business (was Starter) | 2,999 | 5,000 | yes | 1 |
   | Growth | 7,999 | 15,000 | yes | 2 |
   | Scale | 19,999 | 40,000 | yes | 4 |
   | Custom | on commit | negotiated | yes | pool |

   Seeded balances change to match: Business ₹2,500, Growth ₹7,500,
   Scale ₹20,000; fee tiers ₹2.50 / ₹2.00 / ₹1.50 per minute unchanged.
4. **Top-ups.** ₹1,000 buys 2,000 credits on every plan. Higher plans get
   more per rupee through the lower per-minute cost, not a different
   credit price.
5. **Rollover.** Plan credits roll over while subscribed; top-up credits
   never expire. Fixes Emergent's expiry complaint at zero cost, because
   the ledger has no expiry today. Revisit a cap only if rollover balances
   exceed three months' grants.
6. **Annual.** Two months free, about 17%.
7. **Receipts in credits.** Every call and conversation shows its credits
   in the dashboard; the per-call receipt exists, it changes unit.
8. **Markup.** Unchanged: 1.7x on managed provider cost, platform fee by
   tier, 40 to 50 percent gross margin target on Hindi/English. Everyday
   margin is the token markup; no speech or carriage cost.
9. **Free credit.** 1,000 credits on signup, no card; first recharge
   minimum ₹1,000.

**Sequencing.** data/pricing.ts on this site has a hard contract with
`scripts/seed_subscription_plans.py` in the platform repo: seed the plans
and the credit constant there first, then change the site. Everyday sells
the channels layer in PR #231 and its successors, so it ships with them.

## What changes on the site

- Pricing page: plans in credits, the credit rate card above, the
  no-expiry line and the free 1,000. The per-minute bundle table becomes
  a credits-per-minute table.
- Dashboard: receipts change unit from rupees to credits.
- Platform: set the ₹3/min pay-as-you-go global default (PRICING-DECISIONS
  §2.1, still unset) and the 1.7x managed markup as the code default so a
  fresh install does not regress to 1.4x (§2.9).
