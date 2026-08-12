/** Site-wide constants. Change once, changes everywhere. */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://decibyl.ai').replace(
  /\/$/,
  '',
);

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
