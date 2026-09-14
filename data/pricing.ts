/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICES.
 * Never hardcode a price in a component — import from here.
 *
 * Rewritten 14 Sept 2026 for the credits model the product now bills in.
 * Every figure below is copied from what the platform sells, file by file,
 * so a change there is a change here on the same day:
 *
 *   plan prices, credits, numbers, USD and annual
 *       ← echowave api/services/billing/subscription_plans.py LADDER_SEED
 *   one credit = ₹0.50, charges round up per event, balances round down
 *       ← api/services/billing/credits.py
 *   Everyday voice 13 / 12 / 11 credits a minute, overage one credit more
 *       ← api/services/configuration/bundles.py, billing/costing.py (KAN-47)
 *   per-event credits (reply, knowledge answer, routine, tool, builder …)
 *       ← api/services/billing/events.py EVENT_CREDITS
 *   top-up packs, rupee and dollar, and the gated ₹500 pack
 *       ← api/services/billing/topup_packs.py
 *   every cap                        ← api/services/billing/plan_limits.py SEED
 *   the six Free steps               ← api/services/billing/onboarding_credits.py
 *   additional number ₹559           ← NUMBER_RENTAL_PRICE_PAISE (api/constants.py)
 *
 * The position, and the reason the whole rate card is on the page: most
 * credit-priced products (Emergent, for one) publish a credit count per plan
 * and nothing about what a credit buys. We publish the count, the unit, and
 * the charge for every event, because every receipt in the product already
 * itemises it and a price a customer cannot check is a price they do not
 * trust.
 *
 * Internal cost floors are NOT in this file and must not be added. This
 * repository is public.
 */

import { site } from '@/lib/site';

export const GST_RATE = 0.18;

/** Set to false if managed telephony isn't wired end-to-end yet.
 *  false → tier cards show "Opening soon" and CTA routes to /waitlist. */
export const managedTiersLive = true;

/** Rupees per credit. The unit everything else is priced in. */
export const CREDIT_INR = 0.5;

/** Indicative rate for the USD toggle where a plan has no dollar price of its
 *  own. Display-only; billing is in rupees except for the plans and packs
 *  that carry an explicit dollar figure. Matches the engine's fallback
 *  (`DEFAULT_USD_INR_PAISE = 9_600`). */
export const USD_RATE = 96;

/** Additional number beyond what a plan includes. Same price on every voice
 *  plan. `NUMBER_RENTAL_PRICE_PAISE` in the product. */
export const additionalNumberInr = 559;

export type TierId = 'free' | 'everyday' | 'business' | 'growth' | 'scale';

export type Caps = {
  bots: number | null;
  teamMembers: number | null;
  concurrentCalls: number;
  campaignDialsPerDay: number;
  routines: number | null;
  routineMinIntervalMinutes: number;
  knowledgePages: number;
  singleUploadMb: number;
  apiRequestsPerMinute: number;
  recordingRetentionDays: number;
  /** 0 means the desktop companion is not included. */
  desktopStepsPerTask: number;
  builderMessages: number | null;
  builderVoiceMinutes: number | null;
  topUpCeilingCredits: number | null;
};

export type Tier = {
  id: TierId;
  name: string;
  /** Monthly price in INR, exclusive of GST. 0 on Free. */
  priceInr: number;
  /** A published dollar price, where the plan has one (text-only plans). */
  priceUsd?: number;
  /** Annual price, ten months for twelve. */
  annualPriceInr?: number;
  tagline: string;
  /** Credits granted a month; on Free, once. */
  credits: number;
  /** Whether bots on this plan may use the phone at all. */
  voice: boolean;
  /** Credits a minute on the Everyday voice, or null on a text-only plan. */
  voiceCreditsPerMinute: number | null;
  numbers: number;
  phoneNumbers: string;
  caps: Caps;
  support: string;
  cta: { label: string; href: string };
  featured?: boolean;
  /** Overrides the generic bullet list with bespoke copy. */
  bullets?: string[];
  /** A closing line rendered under the bullets. */
  note?: string;
};

const unlimited = null;

export const freeTier: Tier = {
  id: 'free',
  name: 'Free',
  priceInr: 0,
  tagline: 'Try one bot on web chat, WhatsApp or email.',
  credits: 1000,
  voice: false,
  voiceCreditsPerMinute: null,
  numbers: 0,
  phoneNumbers: 'No phone line',
  caps: {
    bots: 1,
    teamMembers: 1,
    concurrentCalls: 0,
    campaignDialsPerDay: 0,
    routines: 2,
    routineMinIntervalMinutes: 24 * 60,
    knowledgePages: 50,
    singleUploadMb: 10,
    apiRequestsPerMinute: 30,
    recordingRetentionDays: 30,
    desktopStepsPerTask: 0,
    builderMessages: 30,
    builderVoiceMinutes: 10,
    topUpCeilingCredits: 2000,
  },
  support: 'Community',
  cta: { label: 'Start free', href: site.external.signup },
  bullets: [
    '1,000 credits, earned in six steps as you set up',
    'One bot on web chat, WhatsApp or email',
    '50 knowledge pages · 2 routines',
    'No card, no expiry on what you earn',
  ],
};

/** The four plans on sale, cheapest first. Free is `freeTier`. */
export const tiers: Tier[] = [
  {
    id: 'everyday',
    name: 'Everyday',
    priceInr: 999,
    priceUsd: 10,
    annualPriceInr: 9990,
    tagline: 'WhatsApp, email, web chat, knowledge and routines. No phone line.',
    credits: 2000,
    voice: false,
    voiceCreditsPerMinute: null,
    numbers: 0,
    phoneNumbers: 'No phone line',
    caps: {
      bots: 3,
      teamMembers: 2,
      concurrentCalls: 0,
      campaignDialsPerDay: 0,
      routines: 10,
      routineMinIntervalMinutes: 60,
      knowledgePages: 500,
      singleUploadMb: 25,
      apiRequestsPerMinute: 60,
      recordingRetentionDays: 90,
      desktopStepsPerTask: 0,
      builderMessages: 30,
      builderVoiceMinutes: 30,
      topUpCeilingCredits: 20000,
    },
    support: 'Email',
    cta: { label: 'Start free', href: `${site.external.signup}?tier=everyday` },
    bullets: [
      '2,000 credits a month · about 2,000 replies',
      'WhatsApp, email and web chat',
      '3 bots · 500 knowledge pages · 10 routines',
      'Also sold in dollars, worldwide',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    priceInr: 2999,
    annualPriceInr: 29990,
    tagline: 'The first voice plan: a phone number and 6,000 credits a month.',
    credits: 6000,
    voice: true,
    voiceCreditsPerMinute: 13,
    numbers: 1,
    phoneNumbers: '1 phone number',
    caps: {
      bots: 10,
      teamMembers: 5,
      concurrentCalls: 5,
      campaignDialsPerDay: 500,
      routines: 50,
      routineMinIntervalMinutes: 15,
      knowledgePages: 2000,
      singleUploadMb: 100,
      apiRequestsPerMinute: 300,
      recordingRetentionDays: 90,
      desktopStepsPerTask: 200,
      builderMessages: 100,
      builderVoiceMinutes: 100,
      topUpCeilingCredits: 100000,
    },
    support: 'WhatsApp',
    cta: { label: 'Start free', href: `${site.external.signup}?tier=business` },
    featured: true,
  },
  {
    id: 'growth',
    name: 'Growth',
    priceInr: 9999,
    annualPriceInr: 99990,
    tagline: 'Campaigns. Two numbers and 25,000 credits a month.',
    credits: 25000,
    voice: true,
    voiceCreditsPerMinute: 12,
    numbers: 2,
    phoneNumbers: '2 phone numbers',
    caps: {
      bots: 30,
      teamMembers: 15,
      concurrentCalls: 15,
      campaignDialsPerDay: 2000,
      routines: 200,
      routineMinIntervalMinutes: 5,
      knowledgePages: 10000,
      singleUploadMb: 250,
      apiRequestsPerMinute: 1000,
      recordingRetentionDays: 180,
      desktopStepsPerTask: 500,
      builderMessages: 300,
      builderVoiceMinutes: 300,
      topUpCeilingCredits: 500000,
    },
    support: 'WhatsApp, priority',
    cta: { label: 'Start free', href: `${site.external.signup}?tier=growth` },
  },
  {
    id: 'scale',
    name: 'Scale',
    priceInr: 19999,
    annualPriceInr: 199990,
    tagline: 'Multi-location and agencies. Four numbers and 60,000 credits a month.',
    credits: 60000,
    voice: true,
    voiceCreditsPerMinute: 11,
    numbers: 4,
    phoneNumbers: '4 phone numbers',
    caps: {
      bots: unlimited,
      teamMembers: unlimited,
      concurrentCalls: 40,
      campaignDialsPerDay: 10000,
      routines: unlimited,
      routineMinIntervalMinutes: 1,
      knowledgePages: 50000,
      singleUploadMb: 1024,
      apiRequestsPerMinute: 3000,
      recordingRetentionDays: 365,
      desktopStepsPerTask: 1000,
      builderMessages: unlimited,
      builderVoiceMinutes: unlimited,
      topUpCeilingCredits: unlimited,
    },
    support: 'Named contact',
    cta: { label: 'Start free', href: `${site.external.signup}?tier=scale` },
    note: 'Past Scale, or for a committed minute volume, we quote against your real call pattern. Scale never pays an overage rate.',
  },
];

export const allTiers: Tier[] = [freeTier, ...tiers];

/** The cheapest plan that puts a bot on the phone. Where "from ₹X a minute"
 *  and every job page's price card start. */
export const firstVoiceTier: Tier = tiers.find((t) => t.voice) ?? tiers[1];

/** The text-only plan, the one with a dollar price. */
export const textTier: Tier = tiers[0];

/* ───────────────────────────── The unit ───────────────────────────── */

export const creditUnit = {
  headline: 'One credit is fifty paise.',
  body: 'Every plan grants credits, every top-up buys them at the same fifty paise, and every event a bot performs costs a whole number of them. A charge rounds up to the next credit per event, never per month, so two accounts doing the same work see the same deductions. Your balance shows what you can spend, rounded down.',
  rules: [
    'Plan credits arrive on the first day of each cycle and are spent first.',
    'Top-up credits never expire and are spent after plan credits.',
    'Unused plan credits carry over up to one month of your plan, then lapse.',
    'Every receipt lists each event and what it cost, in credits and in rupees.',
  ],
};

/* ───────────────────────────── Voice ───────────────────────────── */

export type Bundle = {
  slug: string;
  label: string;
  blurb: string;
  /** True when the minute has a flat credit rate the plan sets. */
  flatRate: boolean;
};

/**
 * The three voices. Everyday has a flat rate a minute that the plan sets.
 * Natural and Premium are itemised: the call is charged what the speech
 * model actually cost, marked up, rounded up to whole credits, with each
 * component on the receipt. We do not print a minute price for them because
 * the product does not charge one.
 */
export const bundles: Bundle[] = [
  {
    slug: 'everyday',
    label: 'Everyday',
    blurb: 'The Sarvam stack. Best on Indian languages, and a flat rate a minute.',
    flatRate: true,
  },
  {
    slug: 'natural',
    label: 'Natural',
    blurb: 'Speech-to-speech. Replies the instant you stop talking. Itemised per call.',
    flatRate: false,
  },
  {
    slug: 'premium',
    label: 'Premium',
    blurb: 'The most capable speech model. Noticeably dearer a minute, itemised per call.',
    flatRate: false,
  },
];

export const cheapestBundle = bundles[0];
export const dearestBundle = bundles[bundles.length - 1];

/** Rupees a minute on the Everyday voice for a voice plan. */
export function voiceRateInr(tier: Tier): number | null {
  if (tier.voiceCreditsPerMinute === null) return null;
  return tier.voiceCreditsPerMinute * CREDIT_INR;
}

const growthTier = tiers[2];
const scaleTier = tiers[3];

/** The one per-minute number the site leads with: Business, the first voice
 *  plan, on the Everyday voice. Growth and Scale run cheaper. */
export const fromRateInr = voiceRateInr(firstVoiceTier) as number;

export const fromRateNote = `A voice minute on the Everyday voice is ${firstVoiceTier.voiceCreditsPerMinute} credits on Business, ${growthTier.voiceCreditsPerMinute} on Growth and ${scaleTier.voiceCreditsPerMinute} on Scale: ₹${fromRateInr.toFixed(2)}, ₹${(voiceRateInr(growthTier) as number).toFixed(2)} and ₹${(voiceRateInr(scaleTier) as number).toFixed(2)}. Natural and Premium are itemised per call.`;

/** Roughly how many Everyday voice minutes a plan's credits buy if every
 *  credit went on calls. An estimate to show, never an entitlement. */
export function approximateMinutes(tier: Tier): number | null {
  if (!tier.voiceCreditsPerMinute) return null;
  return Math.floor(tier.credits / tier.voiceCreditsPerMinute);
}

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

/** One label for "what the plan includes", used by every surface. */
export function includedCallingLabel(tier: Tier): string {
  const credits = `${tier.credits.toLocaleString('en-IN')} credits`;
  const minutes = approximateMinutes(tier);
  if (minutes === null) return `${credits} · text channels`;
  return `${credits} · about ${roundToTen(minutes).toLocaleString('en-IN')} voice minutes`;
}

export const includedCallingCaption =
  'Minutes are an estimate on the Everyday voice with every credit spent on calls. Credits also pay for replies, knowledge answers, routines and tool calls at the rates below, and a Natural or Premium voice minute is itemised, so the same credits buy fewer of those.';

export const outOfCreditCopy =
  'When the month’s plan credits are used, a voice minute costs one credit more and is paid from your top-up balance, and every other event stays at its rate. Scale never pays the overage rate. Nothing is billed in arrears: you spend only credits you hold.';

/* ───────────────────────────── Rate card ───────────────────────────── */

export type RateLine = { event: string; credits: string; detail: string };

/** Credits per event, verbatim from the product's EVENT_CREDITS table. */
export const rateCard: RateLine[] = [
  { event: 'Voice minute, Everyday voice', credits: '13 · 12 · 11', detail: 'Business · Growth · Scale. One credit more past the plan’s credits, except on Scale.' },
  { event: 'Voice minute, Natural or Premium voice', credits: 'itemised', detail: 'The speech model’s actual cost, marked up, rounded up per call. Each component on the receipt.' },
  { event: 'Text reply', credits: '1', detail: 'WhatsApp, email or web chat.' },
  { event: 'Knowledge answer', credits: '2', detail: 'A reply that read your documents. Billed as a plain reply when they had nothing on it.' },
  { event: 'Routine run', credits: '2', detail: 'A scheduled job the bot completes without a conversation.' },
  { event: 'Tool call', credits: '1', detail: 'Sheets, Calendar, Slack, and most connectors.' },
  { event: 'Tool call, premium connector', credits: '3', detail: 'A system your business runs on: Tally, Zoho, Salesforce, HubSpot, Shopify, Razorpay, Freshdesk and the like.' },
  { event: 'Builder message past the allowance', credits: '5', detail: 'Free and Everyday 30 a month, Business 100, Growth 300, Scale unlimited.' },
  { event: 'Number verification past the first two', credits: '2', detail: 'Verifying a caller ID you own.' },
  { event: 'Translation or transliteration', credits: '1 per 100 characters', detail: 'Rounded up per request.' },
  { event: 'Knowledge pages past the plan’s cap', credits: '1 per 10 pages', detail: 'Scanned pages cost more. Caps: 50 · 500 · 2,000 · 10,000 · 50,000.' },
  { event: 'Additional phone number', credits: `₹${additionalNumberInr} a month`, detail: 'Billed in rupees, not credits.' },
];

/* ───────────────────────────── Top-ups ───────────────────────────── */

export type Pack = { priceInr?: number; priceUsd?: number; credits: number; bonusCredits: number };

/** Rupee packs. The ₹500 pack exists but is gated to Campus and staff-marked
 *  early adopters, so it is not on the page. */
export const topUpPacks: Pack[] = [
  { priceInr: 999, credits: 2000, bonusCredits: 0 },
  { priceInr: 4999, credits: 10500, bonusCredits: 500 },
  { priceInr: 19999, credits: 44000, bonusCredits: 4000 },
];

/** Dollar packs for accounts billed outside India. */
export const topUpPacksUsd: Pack[] = [
  { priceUsd: 12, credits: 2000, bonusCredits: 0 },
  { priceUsd: 60, credits: 10500, bonusCredits: 500 },
  { priceUsd: 240, credits: 44000, bonusCredits: 4000 },
];

export const credits = {
  headline: 'Top-ups',
  tagline: 'Credits that never expire, at the same fifty paise.',
  body: 'Add a pack whenever you like. Top-up credits sit in their own pool, are spent after the month’s plan credits, and never lapse. Outside India the same packs are sold in dollars and invoiced as a zero-rated export.',
  points: [
    'Bought in a minute, credited instantly.',
    'Spent after plan credits, so a pack is never wasted on a month you already paid for.',
    'The larger packs carry a bonus: 5% on ₹4,999, 10% on ₹19,999.',
    'A balance ceiling per plan keeps a mistyped order from becoming a problem.',
  ],
  committedNote:
    'Steady voice volume? A monthly plan grants credits at the same rate and includes your phone numbers.',
  committedHref: '/book-a-demo',
};

/* ───────────────────────────── Free ───────────────────────────── */

/** The six steps that earn the Free plan’s 1,000 credits, verbatim. */
export const freeCreditSteps: { title: string; credits: number; body: string }[] = [
  { title: 'Verify your email', credits: 150, body: 'Enter the six-digit code we sent you.' },
  { title: 'Build your first bot', credits: 150, body: 'Describe the job, or pick one from the marketplace.' },
  { title: 'Put it on a channel', credits: 150, body: 'Send or answer a first message on WhatsApp, email or web chat.' },
  { title: 'Have a real conversation', credits: 200, body: 'A call or a message exchange with somebody other than you.' },
  { title: 'Schedule a routine, and let it run', credits: 200, body: 'Credit lands when it fires for the first time. That first run is free.' },
  { title: 'Move in', credits: 150, body: 'Upload a document to your knowledge base, or invite a teammate.' },
];

/* ───────────────────────────── Comparison ───────────────────────────── */

/** The verifiable, dated comparison against a published competitor price.
 *  Update or remove if their page changes. Never leave a stale claim up. */
export const publishedComparisonCallout = {
  text: 'For context: Aixclerate publishes ₹24,999/month for 2,000 minutes. Growth is ₹9,999 for 25,000 credits, about 2,080 minutes on the Everyday voice, with two numbers included and the same credits usable on WhatsApp, routines and tools.',
  source: 'Read on their pricing page, 8 Aug 2026.',
};

/**
 * The technical path: pick the stack yourself instead of picking a bundle.
 * Every provider key is ours; a customer never contracts with a model vendor.
 * The usage bills through credits like any other call, itemised.
 */
export const advancedStack = {
  headline: 'Advanced',
  body:
    'Choose the vendor and model for speech, brain and voice yourself, instead of taking a bundle’s. The keys are ours, you never open an account with a model provider, and every call’s receipt itemises what each component cost in credits.',
  providers: ['OpenAI', 'Deepgram', 'ElevenLabs', 'Sarvam', 'Gemini', 'Smallest'],
};

/**
 * /developers: published orchestration platform fees, USD. Decibyl has no
 * separate platform fee any more: the credit rate a minute is all-in, so its
 * row says so rather than printing a zero.
 */
export const developerPlatformFees: { name: string; feeUsd: number | null; note?: string; isDecibyl?: boolean }[] = [
  { name: 'Decibyl', feeUsd: null, note: 'none; the credit rate a minute is all-in', isDecibyl: true },
  { name: 'Plivo Voice AI Agents', feeUsd: 0.04 },
  { name: 'Vapi', feeUsd: 0.05 },
  { name: 'Telnyx', feeUsd: 0.05 },
  { name: 'Retell AI', feeUsd: 0.07 },
];

export const developerFeesCheckedNote =
  'Each competitor figure read on that vendor’s own public pricing page, 29 to 30 July 2026. Decibyl’s all-in credit rate is dated 14 Sept 2026.';

/* ───────────────────────────── Formatting ───────────────────────────── */

export function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN');
}

export function formatUsd(valueInr: number): string {
  return '$' + Math.round(valueInr / USD_RATE).toLocaleString('en-US');
}

export function formatCredits(value: number | null): string {
  return value === null ? 'Unlimited' : value.toLocaleString('en-IN');
}

export function tierPrice(tier: Tier, currency: 'inr' | 'usd'): string {
  if (tier.priceInr === 0) return '₹0';
  if (currency === 'inr') return formatInr(tier.priceInr);
  if (tier.priceUsd) return `$${tier.priceUsd}`;
  return formatUsd(tier.priceInr);
}

export const businessPriceLabel = formatInr(firstVoiceTier.priceInr);
