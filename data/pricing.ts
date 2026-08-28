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
 *   every tier's `priceInr`, `balanceInr`, `platformFeeInr` and phone-number
 *     count ← scripts/seed_subscription_plans.py, which is the ladder as sold
 *   `tiers[0]` also ← STARTER_PLAN_{PRICE,BALANCE}_PAISE (api/constants.py),
 *     the two the deployment seeds before an operator runs that script
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
  id: 'starter' | 'growth' | 'scale' | 'custom';
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
  /** Per-minute platform fee for this tier, in rupees. This is the number the
   *  ladder actually discounts — `platform_rate_mpaise` on the plan row. Every
   *  other per-minute figure on this page is derived from it plus the bundle
   *  the customer picks. */
  platformFeeInr: number | null;

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
    balanceInr: 2500,
    platformFeeInr: 2.5,
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
    bullets: [
      'Agent build and configuration included',
      '1 Indian number, telephony included',
      '₹2,500 of call credit included',
      'All Indian languages · 5 concurrent calls',
      'Transcript, recording and outcome on every call',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    priceInr: 7999,
    tagline: 'Two numbers and enough calling to run a real campaign.',
    balanceInr: 7200,
    platformFeeInr: 2.0,
    phoneNumbers: '2 phone numbers',
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
    id: 'scale',
    name: 'Scale',
    priceInr: 19999,
    tagline: 'Four numbers, a large knowledge base, and volume calling.',
    balanceInr: 18500,
    platformFeeInr: 1.5,
    phoneNumbers: '4 phone numbers',
    models: 'All + custom',
    concurrentCalls: '100',
    campaigns: true,
    qaScoring: 'full',
    crmWriteback: 'configured',
    customVoice: true,
    dedicatedNumberPool: false,
    namedAccountContact: true,
    support: 'Priority',
    cta: { label: 'Book a demo call', href: '/book-a-demo?tier=scale' },
  },
  {
    id: 'custom',
    name: 'Custom',
    priceInr: null,
    tagline: 'Past Scale, pricing follows your actual call pattern.',
    balanceInr: null,
    platformFeeInr: null,
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
      'Everything in Scale',
      'Volume pricing set against your real call pattern',
      'Agent designed and built for your workflows',
      'Dedicated number pool',
      'CRM write-back configured for your system',
      'Named contact and monthly QA review',
    ],
    note: 'Everything up to ₹19,999 is published above. Past that it genuinely depends on your volume and language mix — so we quote it properly rather than guess at it on a page.',
  },
];

/**
 * The three voice bundles, and what a minute costs on each.
 *
 * This is the missing half of the pricing story, and the reason a single
 * minute figure was never sayable. A bundle chooses the speech stack, and the
 * stacks are not close to each other: Everyday runs a pipeline built on Indic
 * models, Natural and Premium are speech-to-speech, and Premium is roughly
 * five times the price of Everyday for the same minute.
 *
 * `perMinuteInr` is the all-in charge at Starter's platform fee (₹2.50) — the
 * fee, the models, and carriage. A tier with a lower platform fee subtracts
 * the difference; see `bundleRateInr`.
 *
 * Sources, all from the product repo rather than assumed here:
 *   Natural  ₹9.37/min  · Premium ₹25.79/min — LAUNCH-CHECKLIST.md §3.2,
 *     measured against the seeded price book at ₹96/USD with Plivo carriage.
 *   Everyday ₹5.30/min  — the rate this site has published since 13 Aug.
 *
 * ⚠️ Everyday is the least certain of the three. §3.2 lists the Sarvam pipeline
 * at ₹8.30/min, but that table assumes 2,300 synthesis characters a minute, and
 * the product has since derived the real figure from `CallShape` at ~405 —
 * the old number was about six times human speech and roughly doubled the
 * Everyday quote. ₹5.30 sits between the two and is already public. Settle it
 * with `scripts/pricing/measure.sql` §1 rather than by argument.
 */
export type Bundle = {
  slug: string;
  label: string;
  blurb: string;
  perMinuteInr: number;
};

export const bundles: Bundle[] = [
  {
    slug: 'everyday',
    label: 'Everyday',
    blurb: 'Best on Indian languages, and the cheapest to run.',
    perMinuteInr: 5.3,
  },
  {
    slug: 'natural',
    label: 'Natural',
    blurb: 'Speech-to-speech. Replies the instant you stop talking.',
    perMinuteInr: 9.37,
  },
  {
    slug: 'premium',
    label: 'Premium',
    blurb: 'The most capable speech model. Noticeably dearer a minute.',
    perMinuteInr: 25.79,
  },
];

/** The platform fee the bundle rates above are quoted at. */
const BUNDLE_RATE_BASIS_FEE_INR = 2.5;

export const cheapestBundle = bundles[0];
export const dearestBundle = bundles[bundles.length - 1];

/** What a minute on `bundle` costs an account on `tier`.
 *
 *  The platform fee is an additive line on every call, so a tier that charges
 *  ₹1.50 rather than ₹2.50 makes every bundle exactly ₹1.00 a minute cheaper.
 *  That is the whole of what the ladder discounts — see `platformFeeInr`. */
export function bundleRateInr(tier: Tier, bundle: Bundle): number | null {
  if (tier.platformFeeInr === null) return null;
  return bundle.perMinuteInr - (BUNDLE_RATE_BASIS_FEE_INR - tier.platformFeeInr);
}

/** Roughly how many minutes a tier's credit buys on `bundle`. An estimate to
 *  show, never an entitlement to bill against — the same words the product's
 *  own `/agent-options/minutes` endpoint uses about its version of this. */
export function approximateMinutes(tier: Tier, bundle: Bundle): number | null {
  const rate = bundleRateInr(tier, bundle);
  if (rate === null || tier.balanceInr === null || rate <= 0) return null;
  return Math.round(tier.balanceInr / rate);
}

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

/** The minute range a tier's credit buys, dearest bundle to cheapest. */
export function minutesRange(tier: Tier): { low: number; high: number } | null {
  const high = approximateMinutes(tier, cheapestBundle);
  const low = approximateMinutes(tier, dearestBundle);
  if (high === null || low === null) return null;
  return { low: roundToTen(low), high: roundToTen(high) };
}

/** One label for "what calling the plan includes", used by every surface so
 *  the range can never be dropped in one place and kept in another. */
export function includedCallingLabel(tier: Tier): string {
  if (tier.balanceInr === null) return 'Set with you';
  const range = minutesRange(tier);
  if (!range) return `${formatInr(tier.balanceInr)} of call credit`;
  return `${formatInr(tier.balanceInr)} · ${range.low.toLocaleString('en-IN')}–${range.high.toLocaleString('en-IN')} min`;
}

/** Why the figure is a range, shown once wherever the range is. Not small
 *  print for its own sake: the spread between the cheapest and dearest bundle
 *  is roughly five to one, and a customer who picks Premium expecting Everyday
 *  minutes is a support ticket the product's own launch checklist predicted. */
export const includedCallingCaption =
  'Plans include call credit, not a fixed minute bundle. How far it goes depends on the voice you choose — Everyday is the cheapest a minute and best on Indian languages; Premium is the most capable speech model and around five times the price. Regional languages cost more per minute than Hindi or English on any bundle.';

/** What happens when the credit runs out. There is no arrears billing in the
 *  product — no overage line, no invoice at the end of the month. The account
 *  tops up, at the pay-as-you-go rate, and calling continues. Saying anything
 *  else on this page would describe a mechanism that does not exist. */
export const outOfCreditCopy =
  'Top up whenever you like — credit is added instantly and never expires within your billing month. There is no surprise invoice at the end of the month, because there is no overage bill: calling simply draws on the credit you have.';

/** Starter's QA row reads "Sampled" in the table — this is the one-line
 *  explanation shown as a caption underneath, not a table cell. */
export const starterQaCopy =
  'Quality sampling on every agent, with full 100% call scoring from Growth.';

/** The verifiable, dated comparison against a published competitor price —
 *  update or remove if their page changes. Never leave a stale claim up.
 *  Anchored on Growth, since that's now the top published tier. */
export const publishedComparisonCallout = {
  text: 'For context: Aixclerate publishes ₹24,999/month for 2,000 minutes. Scale is ₹19,999 and Growth ₹7,999 — and unlike a minute bundle, unused credit is not the only thing you are buying.',
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
