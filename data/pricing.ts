/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICES.
 * Never hardcode a price in a component — import from here.
 *
 * Restructured 13 Aug 2026 per the pricing/feature-ladder spec. Positioning:
 * Decibyl does not compete on ₹/min — it competes on what's included. Every
 * price here should read as an inclusion comparison, not a rate quote.
 *
 * Internal cost floors and unit economics are NOT in this file and must not be
 * added to it. This repository is public: a comment saying "never publish this"
 * sitting in it has already published it. They live in the internal pricing
 * doc; reference that, do not paste from it.
 *
 * ⚠️ STILL OPEN — see OPEN-ITEMS.md:
 *   - Regional languages (Ta/Te/Kn/Ml/Bn) run on a materially dearer stack than
 *     Hindi/English, and at Growth's effective rates that gap is uncomfortable
 *     — surcharge, fair-use cap, or fix the stack first is still Nithish's
 *     call, not shipped here. Figures in the internal doc.
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
 * plus carriage, each composed by `api/services/billing/costing.py`. Two calls of
 * identical length can cost different amounts — different model, different
 * language, different number of turns.
 *
 * So a bare "N minutes included" is a promise the engine cannot keep. ₹/min on
 * this page is an **average for a Hindi/English call**, and every minute figure
 * below carries that qualifier for a reason: regional languages
 * (Ta/Te/Kn/Ml/Bn) run on a stack that costs close to twice what Hindi/English
 * does, so a Tamil clinic — the exact buyer `/solutions/clinics` targets — exhausts the
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
 *   `advancedStack.platformFeeUsd` ← DEFAULT_PLATFORM_RATE_MICROS_USD (billing/money.py)
 *
 * If one of those moves in echowave and not here, the site quotes a price the
 * bank does not collect. That is the failure this block exists to catch.
 */

export const GST_RATE = 0.18;

/** Set to false if managed telephony isn't wired end-to-end yet.
 *  false → tier cards show "Opening soon" and CTA routes to /waitlist. */
export const managedTiersLive = true;

/** Indicative rate for the USD toggle on the main tier table, and for the
 *  developer-facing platform fee (which stays dollar-denominated — that
 *  audience is dollar-native). Display-only, not a billing rate.
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
 * All three computed on one basis, 28 Aug 2026, rather than copied from a
 * document. Bundles differ only in their model line, so each is Everyday plus
 * the difference in the model line, composed on the same basis:
 *
 *   model cost/min      Everyday ₹1.12   Natural ₹4.72   Premium ₹16.45
 *   sell/min            ₹4.91            ₹9.95           ₹26.37
 *
 * Everyday ₹4.91 is founder-confirmed — the full Sarvam stack, saarika:v2.5
 * transcription at ₹30/hour, bulbul:v2 synthesis at ₹1.50/1k characters over
 * ~405 characters a minute, and Sarvam-105B carrying the language model at
 * about a paisa a minute.
 *
 * ₹4.72 and ₹16.45 were produced by running the product's own
 * `realtime_pricing` against its July 2026 price book, not read off a table:
 * Gemini Live tokenises audio at roughly three times OpenAI's rate, so the
 * two vendors' headline per-million prices cannot be compared directly and
 * the blended figure is the only honest one. They match the independent
 * calculation in `managed_tiers.py` exactly.
 *
 * This supersedes LAUNCH-CHECKLIST.md §3.2 (₹8.30 / ₹9.37 / ₹25.79), whose
 * pipeline row assumed 2,300 synthesis characters a minute where the product
 * now derives about 405 from `CallShape`.
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
    blurb: 'The full Sarvam stack — best on Indian languages, and the cheapest to run.',
    perMinuteInr: 4.91,
  },
  {
    slug: 'natural',
    label: 'Natural',
    blurb: 'Speech-to-speech on Gemini Live. Replies the instant you stop talking.',
    perMinuteInr: 9.95,
  },
  {
    slug: 'premium',
    label: 'Premium',
    blurb: 'Speech-to-speech on OpenAI realtime. The most capable, and much the dearest.',
    perMinuteInr: 26.37,
  },
];

/**
 * The one per-minute number the site leads with, and the only one it prints
 * large.
 *
 * A minute does not have a single price — that is the whole finding behind the
 * credit model — so quoting three exact rates on a marketing page invites the
 * reader to compare the wrong number and anchors them on the dearest one. The
 * page states a floor with an asterisk instead, and lets the minute *ranges*
 * carry the spread, which they do honestly without publishing a rate card.
 *
 * ₹4.91 is Everyday, the full Sarvam stack — the cheapest bundle at its own
 * published rate. Growth and Scale carry a lower per-minute platform fee and
 * so run below it, which is why this reads "starting at" rather than "from a
 * flat".
 */
export const fromRateInr = 4.91;

export const fromRateNote =
  'Everyday · Natural · Premium — starting at ₹4.91/min. Which one you pick decides how far your credit goes.';

export const cheapestBundle = bundles[0];
export const dearestBundle = bundles[bundles.length - 1];

/** Roughly how many minutes a tier's credit buys on `bundle`. An estimate to
 *  show, never an entitlement to bill against — the same words the product's
 *  own `/agent-options/minutes` endpoint uses about its version of this.
 *
 *  Computed at the bundle's base rate for every tier, deliberately. Growth and
 *  Scale carry a lower per-minute platform fee, so they genuinely go further
 *  than these figures — but publishing a rate per tier per bundle is a rate
 *  card, and the page is not trying to be one. Understating is the safe
 *  direction; a customer finding they got more minutes than the page implied
 *  has never once complained. */
export function approximateMinutes(tier: Tier, bundle: Bundle): number | null {
  if (tier.balanceInr === null || bundle.perMinuteInr <= 0) return null;
  return Math.round(tier.balanceInr / bundle.perMinuteInr);
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
 *  adds credit, is charged per model, and calling continues. Saying anything
 *  else on this page would describe a mechanism that does not exist. */
export const outOfCreditCopy =
  'Top up whenever you like — credit is added instantly, and each call is charged at the rate for the model it runs on. There is no surprise invoice at the end of the month, because there is no overage bill: calling simply draws on the credit you have.';

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

/**
 * The technical path: pick the stack yourself instead of picking a bundle.
 *
 * This replaced a "BYOK / Agency" offer that described a product we do not
 * sell. It advertised bringing your own OpenAI, Deepgram, ElevenLabs or Sarvam
 * keys and paying those providers directly at their price, for a flat
 * $0.02/min platform fee and nothing else.
 *
 * We do not do that. Every provider key is ours, held in superadmin, and a
 * customer never contracts with a model vendor. What the Advanced tab actually
 * offers is *choice of stack*, not *choice of contract*: name the vendor and
 * model per component rather than taking a bundle's, and the usage bills
 * through us like any other call.
 *
 * The $0.02 is real — `DEFAULT_PLATFORM_RATE_MICROS_USD` in billing/money.py —
 * but it is the platform fee component on every call, alongside the model and
 * telephony cost for that call. It was never the whole bill, and the old copy
 * said it was.
 *
 * No trial-credit figure lives here any more. The signup bonus is
 * `SIGNUP_BONUS_MICROS_USD`, an environment variable the platform can change
 * without anyone touching this repository, so a number hardcoded here is a
 * number that goes stale silently on a page that promises money.
 */
export const advancedStack = {
  headline: 'Advanced',
  platformFeeUsd: 0.02,
  body:
    'Choose the vendor and model for speech, brain and voice yourself, instead of taking a bundle’s. The keys are ours — you never open an account with a model provider — and every call’s receipt itemises what each component cost.',
  providers: ['OpenAI', 'Deepgram', 'ElevenLabs', 'Sarvam', 'Gemini'],
};

/**
 * P1-3, /developers: published orchestration platform fees, USD (this stays
 * dollar-denominated — the developer audience is dollar-native, unlike the
 * rupee-denominated credits). Each figure read on that vendor's own public
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
 * Credits, which is the whole of what a customer buys outside a plan.
 *
 * This replaced a prepay rate ladder — a slider from ₹5.30/min down to
 * ₹4.20/min at ₹19,00,000 of prepay — that described a product we do not
 * sell. There is no per-minute prepay rate and no volume rate card. An
 * account adds credit, and each call is charged at the rate for the model it
 * ran on. That is it.
 *
 * The distinction matters more than it sounds. A rate ladder tells a customer
 * their per-minute price is a function of how much they pay up front, so the
 * lever is their wallet. The truth is that it is a function of which model
 * they choose, so the lever is the bundle — and a customer who understood the
 * ladder would optimise the wrong thing entirely.
 */
export const credits = {
  headline: 'Credits',
  tagline: 'Add credit whenever you need it. No commitment.',
  body: 'Outside a monthly plan you simply add credit and start calling. Each call is charged at the rate for the model it runs on, drawn from your balance — no per-minute commitment, no volume tier to negotiate, and no invoice at the end of the month.',
  points: [
    'Add any amount, any time — credit is available immediately.',
    'Charged per call at the rate for the model you chose.',
    'Nothing is billed in arrears; you spend only what you have added.',
    'Telephony and your Indian phone number are included in the rate.',
  ],
  committedNote:
    'Running steady volume? A monthly plan carries a lower per-minute platform fee than credits alone, and includes phone numbers.',
  committedHref: '/book-a-demo',
};

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
