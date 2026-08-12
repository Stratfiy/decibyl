/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICES.
 * Never hardcode a price in a component — import from here.
 *
 * ⚠️ UNCONFIRMED — see OPEN-ITEMS.md before deploying to production:
 *   - Growth / Scale prices are a proposal, not a decision
 *   - Overage per-minute rates are unset (render as "TBD" until confirmed)
 *   - Concurrent-call limits are estimates
 *   - `managedTiersLive` gates whether tiers sell or route to the waitlist
 */

export const GST_RATE = 0.18;

/** Set to false if managed telephony isn't wired end-to-end yet.
 *  false → tier cards show "Opening soon" and CTA routes to /waitlist. */
export const managedTiersLive = true;

/** Indicative rate for the USD toggle. Display-only, not a billing rate. */
export const USD_RATE = 88;

export type Tier = {
  id: 'starter' | 'growth' | 'scale' | 'enterprise';
  name: string;
  /** monthly price in INR, exclusive of GST. null = custom */
  priceInr: number | null;
  tagline: string;
  minutes: string;
  /** null until Nithish confirms — renders as "TBD" */
  overageInr: number | null;
  phoneNumbers: string;
  models: string;
  concurrentCalls: string;
  campaigns: boolean;
  support: string;
  cta: { label: string; href: string };
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceInr: 2999,
    tagline: 'One number, one agent, live this week.',
    minutes: '500',
    overageInr: null,
    phoneNumbers: '1 included',
    models: 'Selected',
    concurrentCalls: '5',
    campaigns: false,
    support: 'Email',
    cta: { label: 'Book a demo call', href: '/book-a-demo?tier=starter' },
  },
  {
    id: 'growth',
    name: 'Growth',
    priceInr: 9999,
    tagline: 'Outbound campaigns and a real call volume.',
    minutes: '2,000',
    overageInr: null,
    phoneNumbers: '3 included',
    models: 'Selected',
    concurrentCalls: '25',
    campaigns: true,
    support: 'WhatsApp',
    cta: { label: 'Book a demo call', href: '/book-a-demo?tier=growth' },
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    priceInr: 24999,
    tagline: 'High concurrency, every model, priority support.',
    minutes: '6,000',
    overageInr: null,
    phoneNumbers: '10 included',
    models: 'All',
    concurrentCalls: '100',
    campaigns: true,
    support: 'Priority',
    cta: { label: 'Book a demo call', href: '/book-a-demo?tier=scale' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceInr: null,
    tagline: 'Volume pricing, custom models, dedicated support.',
    minutes: 'Volume',
    overageInr: null,
    phoneNumbers: 'Unlimited',
    models: 'All + custom',
    concurrentCalls: 'Custom',
    campaigns: true,
    support: 'Dedicated',
    cta: { label: 'Talk to us', href: '/contact?topic=enterprise' },
  },
];

/** Rows for the comparison table. Keep in the order the buyer scans. */
export const comparisonRows: {
  label: string;
  key: keyof Tier | 'telephony' | 'languages' | 'humanTransfer' | 'tools' | 'qa';
}[] = [
  { label: 'Minutes included', key: 'minutes' },
  { label: 'Overage', key: 'overageInr' },
  { label: 'Telephony', key: 'telephony' },
  { label: 'Phone number', key: 'phoneNumbers' },
  { label: 'Languages', key: 'languages' },
  { label: 'Models', key: 'models' },
  { label: 'Concurrent calls', key: 'concurrentCalls' },
  { label: 'Campaigns', key: 'campaigns' },
  { label: 'Human transfer', key: 'humanTransfer' },
  { label: 'Calendar / email tools', key: 'tools' },
  { label: 'QA scoring', key: 'qa' },
  { label: 'Support', key: 'support' },
];

export const byok = {
  headline: 'BYOK / Agency',
  perMinuteUsd: 0.02,
  trialCreditUsd: 10,
  body: 'Bring your own OpenAI, Deepgram, ElevenLabs, or Sarvam keys — pay providers directly at their price. Zero markup on model costs.',
  providers: ['OpenAI', 'Deepgram', 'ElevenLabs', 'Sarvam'],
};

/**
 * Pay-as-you-go / volume-based pricing. No monthly commitment — top up
 * credit, the effective per-minute rate improves the more you put in at
 * once. Same shape as the managed tiers' "starting at" positioning: the
 * best rate (minRateInr) is what unlocks at the top of the range.
 */
export const payAsYouGo = {
  headline: 'Pay-as-you-go',
  tagline: 'Flexible credits. Top up anytime, no commitment.',
  minSpendUsd: 15,
  maxSpendUsd: 3000,
  /** rate at minSpendUsd — the "starting at ₹5/min" headline number */
  minRateInr: 5.2,
  /** rate at maxSpendUsd — the best rate, unlocked at the top of the range */
  maxRateInr: 4.2,
  body: 'Purchase credits from $15 to $3,000 — no plan to commit to, top up again whenever your balance runs low. The bigger the top-up, the lower your effective per-minute rate.',
};

/** Linear interpolation between minRateInr and maxRateInr across the spend range. */
export function payAsYouGoRateInr(spendUsd: number): number {
  const { minSpendUsd, maxSpendUsd, minRateInr, maxRateInr } = payAsYouGo;
  const clamped = Math.min(Math.max(spendUsd, minSpendUsd), maxSpendUsd);
  const t = (clamped - minSpendUsd) / (maxSpendUsd - minSpendUsd);
  return minRateInr + t * (maxRateInr - minRateInr);
}

export function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN');
}

export function formatUsd(valueInr: number): string {
  return '$' + Math.round(valueInr / USD_RATE).toLocaleString('en-US');
}

export function tierPrice(tier: Tier, currency: 'inr' | 'usd'): string {
  if (tier.priceInr === null) return 'Custom';
  return currency === 'inr' ? formatInr(tier.priceInr) : formatUsd(tier.priceInr);
}

export const starterPriceLabel = formatInr(tiers[0].priceInr as number);
