/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICES.
 * Never hardcode a price in a component — import from here.
 *
 * Restructured 13 Aug 2026 per the pricing/feature-ladder spec. Positioning:
 * Decibyl does not compete on ₹/min — it competes on what's included. Every
 * price here should read as an inclusion comparison, not a rate quote.
 *
 * Internal cost floor (margin sanity only — NEVER publish these two lines):
 *   Hindi/English stack: ₹1.74/min · Regional (Ta/Te/Kn/Ml/Bn) stack: ₹3.28/min
 *
 * ⚠️ STILL OPEN — see OPEN-ITEMS.md:
 *   - Regional-language margin at Growth effective rates is thin
 *     (25–28% gross at the ₹3.28 regional cost floor) — surcharge, fair-use
 *     cap, or fix the stack first is still Nithish's call, not shipped here.
 *   - `managedTiersLive` gates whether tiers sell or route to the waitlist.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CONTRACT WITH THE BILLING ENGINE — read before changing a figure here.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * **A plan grants rupees, not minutes.** There is no `included_minutes`,
 * `minute_allowance` or `bundled_minutes` anywhere in the echowave codebase.
 * A plan grants `balance_paise` (`api/services/billing/subscription_plans.py`)
 * and each call draws that balance down by its *composed* cost: the pulsed
 * platform fee, plus the LLM, STT and TTS actually consumed at their own rates,
 * plus carriage, marked up (`api/services/billing/costing.py`). Two calls of
 * identical length can cost different amounts — different model, different
 * language, different number of turns.
 *
 * So a bare "N minutes included" is a promise the engine cannot keep. ₹/min on
 * this page is an **average for a Hindi/English call**, and every minute figure
 * below carries that qualifier for a reason: the internal stack floor is
 * ₹1.74/min for Hindi/English but ₹3.28/min for regional (Ta/Te/Kn/Ml/Bn), so
 * a Tamil clinic — the exact buyer `/solutions/clinics` targets — exhausts the
 * same balance in materially fewer minutes.
 *
 * Figures here that must track a product constant, and the file that owns each:
 *
 *   `tiers[0].balanceInr`  ← STARTER_PLAN_BALANCE_PAISE   (api/constants.py)
 *   `tiers[0].priceInr`    ← STARTER_PLAN_PRICE_PAISE     (api/constants.py)
 *   `additionalNumberInr`  ← NUMBER_RENTAL_PRICE_PAISE    (api/constants.py)
 *   `USD_RATE`             ← DEFAULT_USD_INR_PAISE        (billing/money.py)
 *   `byok.perMinuteUsd`    ← DEFAULT_PLATFORM_RATE_MICROS_USD (billing/money.py)
 *
 * If one of those moves in echowave and not here, the site quotes a price the
 * bank does not collect. That is the failure this block exists to catch.
 */

export const GST_RATE = 0.18;

/** Set to false if managed telephony isn't wired end-to-end yet.
 *  false → tier cards show "Opening soon" and CTA routes to /waitlist. */
export const managedTiersLive = true;

/** Indicative rate for the USD toggle on the main tier table, and for BYOK
 *  (which stays dollar-denominated — that audience is dollar-native).
 *  Display-only, not a billing rate.
 *
 *  Raised 28 Aug 2026 from 88 to 96 to match the engine's own fallback
 *  (`DEFAULT_USD_INR_PAISE = 9_600`, echowave `api/services/billing/money.py`).
 *  At 88 the site quoted international buyers a *higher* dollar figure than the
 *  business needs — ₹9,999 read as $114 rather than $104.
 *
 *  ⚠️ Still low. echowave `REMAINING-WORK.md` A2 puts the real rate near ₹104
 *  and calls the ₹96 fallback "roughly 8% light on every charge". Move both
 *  together once an operator puts a live rate on file — a display rate that
 *  disagrees with the billing rate is how a quote and an invoice come apart. */
export const USD_RATE = 96;

/** P0-1: additional number beyond what a tier includes. Same price on every
 *  managed tier.
 *
 *  Corrected 28 Aug 2026 from ₹399 to ₹559. ₹399 was never a price the product
 *  could charge: the billing engine rents an extra number at
 *  `NUMBER_RENTAL_PRICE_PAISE` (echowave `api/constants.py`), which is ₹559 net
 *  — "confirmed on the account, not a list price", against ₹250 of Plivo cost.
 *  The site was under-quoting a recurring line by ₹160/month/number. */
export const additionalNumberInr = 559;

export type Tier = {
  id: 'starter' | 'growth' | 'custom';
  name: string;
  /** monthly price in INR, exclusive of GST. null = quoted, not published. */
  priceInr: number | null;
  /** true → render "From ₹X" instead of a bare price. Unused since the
   *  13 Aug 2026 simplification, kept for when a published anchor returns. */
  startingAt?: boolean;
  tagline: string;
  /** Rupees of call credit the plan grants — the figure the engine settles in.
   *  Must equal the plan row's `balance_paise / 100`. null = not yet confirmed
   *  against the plan row; see the note on `minutes`. */
  balanceInr: number | null;
  /** Approximate minutes that credit buys **on a Hindi/English call**. An
   *  estimate derived from `overageInr`, never an entitlement — see the
   *  contract block at the top of this file. Always rendered with the language
   *  qualifier; never as a bare "N minutes included". */
  minutes: string;
  /** null = no fixed per-minute overage (Custom is quoted per account). */
  overageInr: number | null;
  phoneNumbers: string;
  models: string;
  concurrentCalls: string;
  /** Outbound campaigns — off on Starter, on from Growth up. */
  campaigns: boolean;
  /** 'sampled' on Starter only. Compliance posture (DPDP, residency) is
   *  never gated — only QA depth, outbound, and integration depth are. */
  qaScoring: 'sampled' | 'full';
  crmWriteback: 'webhook' | 'configured';
  customVoice: boolean;
  dedicatedNumberPool: boolean;
  namedAccountContact: boolean;
  support: string;
  cta: { label: string; href: string };
  featured?: boolean;
  /** Overrides the generic 4-line bullet list with bespoke copy. Growth
   *  reads fine off the data fields directly. */
  bullets?: string[];
  /** A closing differentiation line rendered under the bullets. */
  note?: string;
};

export const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceInr: 2999,
    tagline: 'Your agent, built and live this week.',
    // ₹2,500 is STARTER_PLAN_BALANCE_PAISE — the figure the engine actually
    // grants, and the only one on this page confirmed against a plan row.
    // ₹2,500 ÷ ₹5.30 ≈ 470 min, so the old "500 minutes" overstated even the
    // Hindi/English case by ~6% before any regional call was made.
    balanceInr: 2500,
    minutes: '~470',
    overageInr: 5.3,
    phoneNumbers: '1 phone number',
    models: 'Selected',
    concurrentCalls: '5',
    campaigns: false,
    qaScoring: 'sampled',
    crmWriteback: 'webhook',
    customVoice: false,
    dedicatedNumberPool: false,
    namedAccountContact: false,
    support: 'Email',
    cta: { label: 'Book a demo call', href: '/book-a-demo?tier=starter' },
    // Option A (chosen 13 Aug 2026): the platform plan, not a minute bundle —
    // nobody computes ₹/min on a plan that isn't sold in minutes.
    bullets: [
      'Agent build and configuration included',
      '1 Indian number, telephony included',
      '₹2,500 of calling included — about 470 min Hindi/English',
      'All Indian languages · 5 concurrent calls',
      'Transcript, recording and outcome on every call',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    priceInr: 9999,
    tagline: 'Outbound campaigns and a real call volume.',
    // ⚠️ UNCONFIRMED. No Growth plan is seeded in echowave — `ensure_seeded`
    // creates `starter` only. A Growth row can exist, created by an operator
    // through /superadmin/billing (routes/billing_dashboard.py), but nothing in
    // either repository proves what balance it grants. Until somebody reads the
    // row, this page is selling a tier whose entitlement is unverified.
    // Set balanceInr to that row's balance_paise / 100 the moment it is known.
    balanceInr: null,
    minutes: '~2,200',
    overageInr: 4.5,
    phoneNumbers: '3 phone numbers',
    models: 'Selected',
    concurrentCalls: '25',
    campaigns: true,
    qaScoring: 'full',
    crmWriteback: 'webhook',
    customVoice: false,
    dedicatedNumberPool: false,
    namedAccountContact: false,
    support: 'WhatsApp',
    cta: { label: 'Book a demo call', href: '/book-a-demo?tier=growth' },
    featured: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    priceInr: null,
    tagline: 'Past 2,200 minutes, pricing follows your actual call pattern.',
    balanceInr: null,
    minutes: 'Set with you',
    overageInr: null,
    phoneNumbers: 'Dedicated number pool',
    models: 'All + custom',
    concurrentCalls: 'Custom',
    campaigns: true,
    qaScoring: 'full',
    crmWriteback: 'configured',
    customVoice: true,
    dedicatedNumberPool: true,
    namedAccountContact: true,
    support: 'Dedicated',
    cta: { label: 'Schedule a call', href: '/contact?topic=custom' },
    bullets: [
      'Everything in Growth',
      'Volume pricing set against your real call pattern',
      'Agent designed and built for your workflows',
      'Dedicated number pool',
      'CRM write-back configured for your system',
      'Named contact and monthly QA review',
    ],
    note: 'Everything up to ₹9,999 is published above. Past that it genuinely depends on your volume and language mix — so we quote it properly rather than guess at it on a page.',
  },
];

/** One label for "what calling the plan includes", used by every surface so
 *  the qualifier can never be dropped in one place and kept in another.
 *
 *  Renders the credit where it is confirmed and the minute estimate always
 *  attributed to Hindi/English — the two things the old "500 minutes included"
 *  left out. */
export function includedCallingLabel(tier: Tier): string {
  if (tier.balanceInr === null && !/^~/.test(tier.minutes)) return tier.minutes;
  const approx = `${tier.minutes} min Hindi/English`;
  return tier.balanceInr === null ? approx : `${formatInr(tier.balanceInr)} · ${approx}`;
}

/** Why the minute figures are estimates, shown once wherever they are. Not
 *  small print for its own sake: it is the difference between a Tamil clinic
 *  feeling misled in week three and knowing what it bought on day one. */
export const includedCallingCaption =
  'Plans include call credit, not a fixed minute bundle. Minute figures are for Hindi and English — regional-language calls cost more per minute and use the credit faster.';

/** Starter's QA row reads "Sampled" in the table — this is the one-line
 *  explanation shown as a caption underneath, not a table cell. */
export const starterQaCopy =
  'Quality sampling on every agent, with full 100% call scoring from Growth.';

/** The verifiable, dated comparison against a published competitor price —
 *  update or remove if their page changes. Never leave a stale claim up.
 *  Anchored on Growth, since that's now the top published tier. */
export const publishedComparisonCallout = {
  text: 'For context: Aixclerate publishes ₹24,999/month for 2,000 minutes. Growth is ₹9,999 for 2,200 — more minutes at 40% of the price.',
  source: 'Read on their pricing page, 8 Aug 2026.',
};

export const byok = {
  headline: 'BYOK / Agency',
  perMinuteUsd: 0.02,
  trialCreditUsd: 5,
  body: 'Bring your own OpenAI, Deepgram, ElevenLabs, or Sarvam keys — pay providers directly at their price. Zero markup on model costs.',
  providers: ['OpenAI', 'Deepgram', 'ElevenLabs', 'Sarvam'],
};

/**
 * P1-3, /developers: published orchestration platform fees, USD (BYOK stays
 * dollar-denominated — this audience is dollar-native, unlike the INR
 * pay-as-you-go slider). Each figure read on that vendor's own public
 * pricing page — see developerFeesCheckedNote for the date. Restate, don't
 * paste, competitor copy; this is just the number.
 */
export const developerPlatformFees: { name: string; feeUsd: number; isDecibyl?: boolean }[] = [
  { name: 'Decibyl', feeUsd: 0.02, isDecibyl: true },
  { name: 'Plivo Voice AI Agents', feeUsd: 0.04 },
  { name: 'Vapi', feeUsd: 0.05 },
  { name: 'Telnyx', feeUsd: 0.05 },
  { name: 'Retell AI', feeUsd: 0.07 },
];

export const developerFeesCheckedNote =
  'Each figure read on that vendor’s own public pricing page, 29–30 July 2026.';

/**
 * Pay-as-you-go / volume-based pricing. No monthly commitment — prepay
 * credit, the effective per-minute rate improves the more you put in at
 * once. INR-denominated (P0-2, 13 Aug 2026) — the pitch is India-native
 * end to end, so the slider has to be too. USD stays only on /developers
 * (BYOK), where the audience is dollar-native.
 *
 * Framed ceiling-down, not floor: the slider defaults to the entry stop,
 * and the best rate is never quoted as a bare figure anywhere on the site
 * — always "up to ₹X at maximum prepay". See maxRateLabel below.
 */
export const payAsYouGo = {
  headline: 'Pay-as-you-go',
  tagline: 'Flexible credits. Prepay, no commitment.',
  headlineCopy:
    'Pay-as-you-go credits. Rate improves as you prepay — from ₹5.30/min, down to ₹4.20/min at committed volume.',
  underSlider: 'Credits never expire. No monthly commitment. Telephony included.',
  maxRateLabel: 'Up to ₹4.20/min at maximum prepay',
  committedNote:
    'Running higher volume than this? Committed-volume pricing is set with our team.',
  committedHref: '/book-a-demo',
  body: 'Prepay for credits — no plan to commit to, top up again whenever your balance runs low. The bigger the prepay, the lower your effective per-minute rate.',
  /** Published tier stops — shown as ticks under the slider. */
  tierStops: [
    { prepayInr: 2999, rateInr: 5.3 },
    { prepayInr: 25000, rateInr: 5.1 },
    { prepayInr: 100000, rateInr: 4.8 },
    { prepayInr: 500000, rateInr: 4.5 },
    { prepayInr: 1900000, rateInr: 4.2 },
  ],
};

export const payAsYouGoMinRateInr = payAsYouGo.tierStops[0].rateInr;
export const payAsYouGoMaxRateInr = payAsYouGo.tierStops[payAsYouGo.tierStops.length - 1].rateInr;
export const payAsYouGoMinPrepayInr = payAsYouGo.tierStops[0].prepayInr;
export const payAsYouGoMaxPrepayInr =
  payAsYouGo.tierStops[payAsYouGo.tierStops.length - 1].prepayInr;

/** Piecewise-linear interpolation across the published tier stops — a
 *  straight line between each adjacent pair, so the rate hits the exact
 *  published number at every stop rather than just the two endpoints. */
export function payAsYouGoRateInr(prepayInr: number): number {
  const stops = payAsYouGo.tierStops;
  const clamped = Math.min(Math.max(prepayInr, payAsYouGoMinPrepayInr), payAsYouGoMaxPrepayInr);
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (clamped >= a.prepayInr && clamped <= b.prepayInr) {
      const t = (clamped - a.prepayInr) / (b.prepayInr - a.prepayInr);
      return a.rateInr + t * (b.rateInr - a.rateInr);
    }
  }
  return payAsYouGoMaxRateInr;
}

export function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN');
}

export function formatUsd(valueInr: number): string {
  return '$' + Math.round(valueInr / USD_RATE).toLocaleString('en-US');
}

export function tierPrice(tier: Tier, currency: 'inr' | 'usd'): string {
  if (tier.priceInr === null) return 'Custom';
  const amount = currency === 'inr' ? formatInr(tier.priceInr) : formatUsd(tier.priceInr);
  return tier.startingAt ? `From ${amount}` : amount;
}

export const starterPriceLabel = formatInr(tiers[0].priceInr as number);
