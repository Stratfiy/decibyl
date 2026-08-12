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
  /** The category line. Use this, not "voice AI platform". */
  tagline: 'Voice agents built in India, shipped for the world.',
  subline: 'Calls that confirm and close — in the language your customer actually speaks.',
  description:
    'Decibyl runs your confirmation, follow-up, and reminder calls end-to-end — 7 Indian languages live today, plus any language your voice stack supports. Every call transcribed, recorded, and scored.',
  /** Infra footprint, referenced in comparison tables and the "built for the
   *  world" positioning. Mumbai is home base; US/EU exist for international
   *  clients who need data closer to them. */
  regions: ['Mumbai (AWS ap-south-1)', 'USA', 'Europe'],

  /** ⚠️ OPEN-ITEMS #7 — confirm before deploy. */
  supportEmail: 'hello@decibyl.ai',
  salesEmail: 'hello@decibyl.ai',
  /** Registered address is required on a GST-registered entity's site and helps
   *  local SEO. null renders a graceful fallback instead of a fake address. */
  registeredAddress: null as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  },

  external: {
    app: 'https://inapp.decibyl.ai',
    docs: 'https://docs.decibyl.ai',
  },
} as const;

export const nav = [
  { label: 'Solutions', href: '/solutions/clinics' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compare', href: '/compare/vapi' },
];
