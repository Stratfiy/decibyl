/** Site-wide constants. Change once, changes everywhere. */
const CANONICAL_URL = 'https://decibyl.ai';

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
  tagline: 'AI that gets work done.',
  subline: 'Give it a job. It can talk, remember, use your apps and take action — getting more useful as it learns the context that matters.',
  description:
    'Decibyl is an AI agent platform for real work. Give agents jobs to research, communicate, use connected apps, work with documents, run routines, remember useful context and complete repetitive work for you or your team.',
  regions: ['Mumbai (AWS ap-south-1)'],
  supportEmail: 'hello@decibyl.ai',
  salesEmail: 'hello@decibyl.ai',
  demoPhone: {
    tel: '+918035302788',
    display: '+91 80353 02788',
  },
  registeredAddress: {
    street: 'No. 86/16, Papanna Thottam, Brindhavan Nagar, TNHB Phase 7',
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
    app: 'https://app.decibyl.ai',
    signup: 'https://app.decibyl.ai/auth/signup',
    login: 'https://app.decibyl.ai/auth/login',
    docs: 'https://docs.decibyl.ai',
    whatsapp: 'https://chat.whatsapp.com/Ebd9nygrUZg37RVqgjnOYA',
    slack: 'https://join.slack.com/t/decibyl/shared_invite/zt-48zc1yr9x-au6xUu7i6nl23l7XSjtgKg',
  },
  profiles: [] as string[],
} as const;

export const nav = [
  { label: 'Product', href: '/platform' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Memory', href: '/knowledge' },
  { label: 'Voice', href: '/voice-agents' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Developers', href: '/developers' },
];
