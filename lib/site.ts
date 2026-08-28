/** Site-wide constants. Change once, changes everywhere. */

const FALLBACK_URL = 'https://decibyl.ai';

/** Coerce whatever we were handed into a usable origin, or give up cleanly.
 *  Accepts a bare host ("decibyl.ai", "my-app.vercel.app") as well as a full URL. */
function toOrigin(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/**
 * Resolve the canonical site URL.
 *
 * `??` is NOT enough here: Vercel offers to import env vars from .env.example
 * and fills them in EMPTY, so NEXT_PUBLIC_SITE_URL arrives as '' rather than
 * undefined. `??` only falls back on undefined, so siteUrl became '' and
 * metadataBase's `new URL('')` threw — failing the deploy while collecting
 * page data. Every branch below is guarded, and a malformed value degrades to
 * the fallback instead of breaking the build.
 */
function resolveSiteUrl(): string {
  return (
    toOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? '') ??
    // Vercel sets these automatically — a preview deploy needs no config at all.
    toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '') ??
    toOrigin(process.env.VERCEL_URL ?? '') ??
    FALLBACK_URL
  );
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: 'Decibyl',
  legalName: 'nAutomation Labs Pvt Ltd',
  url: siteUrl,
  /** The category line. Use this, not "voice AI platform" or "voice agents" —
   *  "AI voice worker" is the deliberate reposition: a labor noun, not a tool
   *  noun. It puts Decibyl up against the cost of a BPO seat, not against
   *  Vapi/Bolna/Retell's "platform" framing, which every India competitor
   *  currently uses. See the SEO/positioning research from 12 Aug 2026. */
  tagline: 'AI voice workers, built in India, shipped for the world.',
  subline: 'Calls that confirm and close — in the language your customer actually speaks.',
  description:
    'Decibyl builds AI voice workers that run your confirmation, follow-up, and reminder calls end-to-end — not a tool that assists a human doing it. 7 Indian languages live today, plus any language your voice stack supports. Every call transcribed, recorded, and scored.',
  /** Infra footprint, referenced in comparison tables and the "built for the
   *  world" positioning. Mumbai is home base; US/EU exist for international
   *  clients who need data closer to them. */
  regions: ['Mumbai (AWS ap-south-1)', 'USA', 'Europe'],

  /** Confirmed 28 Aug 2026. One inbox for support and sales, deliberately —
   *  two addresses on a team this size is two places a mail goes unread. */
  supportEmail: 'hello@decibyl.ai',
  salesEmail: 'hello@decibyl.ai',
  /** P2, 13 Aug 2026: the callable demo line — a real inbound number with a
   *  configured demo/qualify agent on it, confirmed live. `tel` is the exact
   *  dial string; `display` is the formatted version shown on the page. */
  demoPhone: {
    tel: '+918035302788',
    display: '+91 80353 02788',
  },
  /**
   * Where the company operates from, for the footer and the `PostalAddress` in
   * the Organization schema.
   *
   * Locality only, by decision on 28 Aug 2026 — a street and a postcode are
   * not going on a public marketing site. That is enough for the two jobs this
   * field does here: it gives search engines a place to associate the entity
   * with, which an India-first company selling to Indian buyers wants, and it
   * tells a visitor where we actually are.
   *
   * `street` and `postalCode` stay in the type as optional. A GST-registered
   * entity does have to show its full registered address somewhere, and when
   * that goes up it belongs here rather than in a second copy — see
   * OPEN-ITEMS.md #4.
   */
  registeredAddress: {
    locality: 'Hosur',
    region: null,
    country: 'India',
    /** ISO 3166-1 alpha-2, for schema.org. */
    countryCode: 'IN',
    street: null,
    postalCode: null,
  } as {
    locality: string;
    region: string | null;
    country: string;
    countryCode: string;
    street: string | null;
    postalCode: string | null;
  } | null,

  external: {
    app: 'https://inapp.decibyl.ai',
    docs: 'https://docs.decibyl.ai',
  },
} as const;

export const nav = [
  { label: 'Solutions', href: '/solutions/clinics' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compare', href: '/compare' },
];
