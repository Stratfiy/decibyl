import { site } from '@/lib/site';

/**
 * Public pricing mirror of the current echowave billing ladder (15 Sep 2026).
 * Product source of truth:
 *   api/services/billing/subscription_plans.py
 *   api/services/billing/plan_limits.py
 *   docs/account/billing.mdx
 *
 * One credit is ₹0.50. Plan credits expire at cycle end; top-up credits do not.
 * There is no seat licence and no per-minute platform fee.
 */
export const GST_RATE = 0.18;
export const managedTiersLive = true;
export const USD_RATE = 96;
export const CREDIT_VALUE_INR = 0.5;
export const additionalNumberInr = 559;

export type TierId = 'free' | 'everyday' | 'business' | 'growth' | 'scale';

export type Tier = {
  id: TierId;
  name: string;
  priceInr: number;
  annualPriceInr: number | null;
  priceUsd?: number | null;
  tagline: string;
  credits: number;
  voiceAllowed: boolean;
  voiceCreditsPerMinute: number | null;
  topupVoiceCreditsPerMinute: number | null;
  includedNumbers: number;
  bots: string;
  teamMembers: string;
  routines: string;
  knowledgePages: string;
  knowledgeStorage: string;
  maxUpload: string;
  concurrentCalls: string;
  campaignDials: string;
  builderMessages: string;
  featured?: boolean;
  cta: { label: string; href: string };
  bullets?: string[];

  /* Compatibility fields used by older SEO/voice surfaces. They mirror the
     current plan rather than reviving the retired 2026-08 pricing model. */
  balanceInr: number;
  platformFeeInr: 0;
  phoneNumbers: string;
  models: string;
  campaigns: boolean;
  qaScoring: 'sampled' | 'full';
  crmWriteback: 'webhook' | 'configured';
  customVoice: boolean;
  dedicatedNumberPool: boolean;
  namedAccountContact: boolean;
  support: string;
  note?: string;
};

const signup = (tier: TierId) => `${site.external.signup}?tier=${tier}`;

export const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    priceInr: 0,
    annualPriceInr: null,
    tagline: 'Try one bot and learn what you want to hand off.',
    credits: 1_000,
    voiceAllowed: false,
    voiceCreditsPerMinute: null,
    topupVoiceCreditsPerMinute: null,
    includedNumbers: 0,
    bots: '1',
    teamMembers: '1',
    routines: '2',
    knowledgePages: '50',
    knowledgeStorage: 'Small trial knowledge base',
    maxUpload: '10 MB',
    concurrentCalls: '—',
    campaignDials: '—',
    builderMessages: '30 / month',
    cta: { label: 'Start free', href: signup('free') },
    bullets: ['Earn up to 1,000 credits', '1 bot', 'Web chat, WhatsApp and email', '2 routines', '50 knowledge pages'],
    balanceInr: 500,
    platformFeeInr: 0,
    phoneNumbers: 'No phone line',
    models: 'Managed models',
    campaigns: false,
    qaScoring: 'sampled',
    crmWriteback: 'webhook',
    customVoice: false,
    dedicatedNumberPool: false,
    namedAccountContact: false,
    support: 'Self-serve',
  },
  {
    id: 'everyday',
    name: 'Everyday',
    priceInr: 999,
    annualPriceInr: 9_990,
    priceUsd: 10,
    tagline: 'The personal plan for your bots on messages, knowledge and routines.',
    credits: 2_000,
    voiceAllowed: false,
    voiceCreditsPerMinute: null,
    topupVoiceCreditsPerMinute: null,
    includedNumbers: 0,
    bots: '3',
    teamMembers: '2',
    routines: '10',
    knowledgePages: '500',
    knowledgeStorage: '50 MB',
    maxUpload: '25 MB',
    concurrentCalls: '—',
    campaignDials: '—',
    builderMessages: '30 / month',
    featured: true,
    cta: { label: 'Choose Everyday', href: signup('everyday') },
    bullets: ['2,000 credits / month', '3 bots', 'WhatsApp, email and web chat', '10 routines', '500 knowledge pages', 'No phone line'],
    balanceInr: 1_000,
    platformFeeInr: 0,
    phoneNumbers: 'No phone line',
    models: 'Managed models + BYOK when enabled',
    campaigns: false,
    qaScoring: 'sampled',
    crmWriteback: 'webhook',
    customVoice: false,
    dedicatedNumberPool: false,
    namedAccountContact: false,
    support: 'Self-serve',
  },
  {
    id: 'business',
    name: 'Business',
    priceInr: 2_999,
    annualPriceInr: 29_990,
    tagline: 'The first voice plan, with one number and room for a real team.',
    credits: 6_000,
    voiceAllowed: true,
    voiceCreditsPerMinute: 13,
    topupVoiceCreditsPerMinute: 14,
    includedNumbers: 1,
    bots: '10',
    teamMembers: '5',
    routines: '50',
    knowledgePages: '2,000',
    knowledgeStorage: '200 MB',
    maxUpload: '100 MB',
    concurrentCalls: '5',
    campaignDials: '500 / day',
    builderMessages: '100 / month',
    cta: { label: 'Choose Business', href: signup('business') },
    bullets: ['6,000 credits / month', '10 bots · 5 teammates', '1 phone number included', 'Voice at 13 credits/min', '50 routines', '2,000 knowledge pages'],
    balanceInr: 3_000,
    platformFeeInr: 0,
    phoneNumbers: '1 included',
    models: 'Managed models + BYOK when enabled',
    campaigns: true,
    qaScoring: 'full',
    crmWriteback: 'configured',
    customVoice: true,
    dedicatedNumberPool: false,
    namedAccountContact: false,
    support: 'Self-serve',
  },
  {
    id: 'growth',
    name: 'Growth',
    priceInr: 9_999,
    annualPriceInr: 99_990,
    tagline: 'More bots, campaigns, knowledge and calling capacity.',
    credits: 25_000,
    voiceAllowed: true,
    voiceCreditsPerMinute: 12,
    topupVoiceCreditsPerMinute: 13,
    includedNumbers: 2,
    bots: '30',
    teamMembers: '15',
    routines: '200',
    knowledgePages: '10,000',
    knowledgeStorage: '1 GB',
    maxUpload: '250 MB',
    concurrentCalls: '15',
    campaignDials: '2,000 / day',
    builderMessages: '300 / month',
    cta: { label: 'Choose Growth', href: signup('growth') },
    bullets: ['25,000 credits / month', '30 bots · 15 teammates', '2 phone numbers included', 'Voice at 12 credits/min', '200 routines', '10,000 knowledge pages'],
    balanceInr: 12_500,
    platformFeeInr: 0,
    phoneNumbers: '2 included',
    models: 'Managed models + BYOK when enabled',
    campaigns: true,
    qaScoring: 'full',
    crmWriteback: 'configured',
    customVoice: true,
    dedicatedNumberPool: false,
    namedAccountContact: true,
    support: 'Priority',
  },
  {
    id: 'scale',
    name: 'Scale',
    priceInr: 19_999,
    annualPriceInr: 199_990,
    tagline: 'High-volume work across bots, teams, routines and voice.',
    credits: 60_000,
    voiceAllowed: true,
    voiceCreditsPerMinute: 11,
    topupVoiceCreditsPerMinute: 11,
    includedNumbers: 4,
    bots: 'Unlimited',
    teamMembers: 'Unlimited',
    routines: 'Unlimited',
    knowledgePages: '50,000',
    knowledgeStorage: '5 GB',
    maxUpload: '1 GB',
    concurrentCalls: '40',
    campaignDials: '10,000 / day',
    builderMessages: 'Unlimited',
    cta: { label: 'Choose Scale', href: signup('scale') },
    bullets: ['60,000 credits / month', 'Unlimited bots, teammates and routines', '4 phone numbers included', 'Voice at 11 credits/min', '40 concurrent calls', '50,000 knowledge pages'],
    balanceInr: 30_000,
    platformFeeInr: 0,
    phoneNumbers: '4 included',
    models: 'Managed models + BYOK when enabled',
    campaigns: true,
    qaScoring: 'full',
    crmWriteback: 'configured',
    customVoice: true,
    dedicatedNumberPool: true,
    namedAccountContact: true,
    support: 'Priority',
  },
];

export const topUpPacks = [
  { priceInr: 999, credits: 2_000, bonus: 0 },
  { priceInr: 4_999, credits: 10_500, bonus: 500 },
  { priceInr: 19_999, credits: 44_000, bonus: 4_000 },
] as const;

export type Bundle = { slug: string; label: string; blurb: string; perMinuteInr: number };
/** Deprecated compatibility export. Current voice pricing is plan-based, not a
 * choice between three marketing bundles. */
export const bundles: Bundle[] = [
  { slug: 'business', label: 'Business', blurb: 'Voice is available from Business.', perMinuteInr: 6.5 },
  { slug: 'growth', label: 'Growth', blurb: 'Lower voice credit rate at higher volume.', perMinuteInr: 6.0 },
  { slug: 'scale', label: 'Scale', blurb: 'Lowest published voice credit rate.', perMinuteInr: 5.5 },
];
export const cheapestBundle = bundles[2];
export const dearestBundle = bundles[0];
export const fromRateInr = 5.5;
export const fromRateNote = 'Voice is included from Business: 13 / 12 / 11 credits per connected minute on Business / Growth / Scale.';

export function approximateMinutes(tier: Tier, _bundle?: Bundle): number | null {
  if (!tier.voiceAllowed || !tier.voiceCreditsPerMinute) return null;
  return Math.floor(tier.credits / tier.voiceCreditsPerMinute);
}

export function minutesRange(tier: Tier): { low: number; high: number } | null {
  const minutes = approximateMinutes(tier);
  return minutes === null ? null : { low: minutes, high: minutes };
}

export function includedCallingLabel(tier: Tier): string {
  if (!tier.voiceAllowed || !tier.voiceCreditsPerMinute) return `${tier.credits.toLocaleString('en-IN')} credits · no phone line`;
  return `${tier.credits.toLocaleString('en-IN')} credits · voice ${tier.voiceCreditsPerMinute} credits/min`;
}

export const includedCallingCaption =
  'Credits are shared across work. Voice is available from Business and is metered at 13 / 12 / 11 credits per connected minute on Business / Growth / Scale, in 15-second pulses. Ringing and unanswered calls are not charged.';

export const outOfCreditCopy =
  'Plan credits expire at the end of the billing cycle. Top-up credits never expire. When plan credits are used up, Business and Growth voice uses the top-up pool at one additional credit per minute; Scale stays at 11 credits/min.';

export const starterQaCopy =
  'Calls can be reviewed with transcripts, recordings, outcomes and QA tooling; the current product does not sell QA as a separate seat add-on.';

export const publishedComparisonCallout = {
  text: 'Decibyl bills work in credits: no seat licence and no per-minute platform fee. One credit is ₹0.50.',
  source: 'Current Decibyl billing model, 15 Sep 2026.',
};

export const advancedStack = {
  headline: 'Managed models or your keys',
  platformFeeUsd: 0,
  body: 'Each model slot can use a Decibyl-managed provider or, when BYOK is enabled on your account, your own provider key. With BYOK the provider bills you directly and Decibyl does not charge for that slot.',
  providers: ['OpenAI', 'Anthropic', 'Google', 'Sarvam', 'DeepSeek', 'Mistral', 'Deepgram', 'ElevenLabs'],
};

/** Kept for backwards compatibility with older components. There is no current
 * per-minute Decibyl platform fee to compare. */
export const developerPlatformFees: { name: string; feeUsd: number; isDecibyl?: boolean }[] = [
  { name: 'Decibyl', feeUsd: 0, isDecibyl: true },
];
export const developerFeesCheckedNote = 'Decibyl does not charge a separate per-minute platform fee on the current credit plans.';

export const credits = {
  headline: 'Top up credits',
  tagline: 'Add more work capacity without changing your plan.',
  body: 'Plan credits are spent first and expire at the end of the billing cycle. Top-up credits sit in a separate pool, never expire, and are used after the plan grant.',
  points: topUpPacks.map((pack) => `${formatInr(pack.priceInr)} → ${pack.credits.toLocaleString('en-IN')} credits${pack.bonus ? ` (${pack.bonus.toLocaleString('en-IN')} bonus)` : ''}`),
  committedNote: 'Need more recurring capacity? Move to the next plan; higher plans include more credits, bots, routines, knowledge and voice capacity.',
  committedHref: '/pricing',
};

export function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN');
}

export function formatUsd(valueInr: number): string {
  return '$' + Math.round(valueInr / USD_RATE).toLocaleString('en-US');
}

export function tierPrice(tier: Tier, currency: 'inr' | 'usd'): string {
  if (currency === 'usd' && tier.priceUsd != null) return `$${tier.priceUsd.toLocaleString('en-US')}`;
  if (currency === 'usd') return formatUsd(tier.priceInr);
  return formatInr(tier.priceInr);
}

export const starterPriceLabel = formatInr(tiers.find((tier) => tier.id === 'everyday')!.priceInr);
