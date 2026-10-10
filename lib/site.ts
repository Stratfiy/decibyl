/** Site-wide constants. Change once, changes everywhere. */

/** The one domain this site is ever served from in production. Google is told
 *  this and nothing else. */
const CANONICAL_URL = 'https://decibyl.ai';

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
 * **A production build always says decibyl.ai**, and that is the important
 * part. Every canonical tag, every `<loc>` in the sitemap, the `sitemap:` line
 * in robots.txt, and every absolute URL in the JSON-LD is built from this one
 * value.
 */
function resolveSiteUrl(): string {
  const explicit = toOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? '');
  if (explicit) return explicit;
  if (process.env.VERCEL_ENV === 'production') return CANONICAL_URL;
  return (
    toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '') ??
    toOrigin(process.env.VERCEL_URL ?? '') ??
    CANONICAL_URL
  );
}

export const siteUrl = resolveSiteUrl();

export const isProductionSite =
  process.env.VERCEL_ENV === 'production' ||
  (!process.env.VERCEL_ENV && siteUrl === CANONICAL_URL);

export const site = {
  name: 'Decibyl',
  legalName: 'nAutomation Labs Pvt Ltd',
  url: siteUrl,
  tagline: 'Intelligence that grows with you.',
  subline: 'Build personalized work autopilots that remember context, connect your apps and complete recurring tasks.',
  description:
    'Decibyl Cloud lets people and businesses build personalized AI work autopilots that use connected apps, voice and messaging, remember relevant context, run routines and complete recurring tasks. Decibyl Intelligence and on-premises Managed deployments are on our roadmap.',
  regions: ['Mumbai (AWS ap-south-1)', 'USA', 'Europe'],
  supportEmail: 'hello@decibyl.ai',
  salesEmail: 'hello@decibyl.ai',
  demoPhone: {
    tel: '+918035302788',
    display: '+91 80353 02788',
  },
  registeredAddress: {
    street: 'No. 86/18, Brindhavan Nagar',
    locality: 'Hosur',
    region: 'Tamil Nadu',
    postalCode: '635109',
    country: 'India',
    countryCode: 'IN',
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
  profiles: [] as string[],
} as const;

export const nav = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Voice', href: '/voice-ai' },
  { label: 'Developers', href: '/developers' },
];
