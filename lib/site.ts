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
 * value. If it resolves to anything else on a production build, Google is told
 * the real pages live somewhere they do not, and the domain does not index.
 *
 * It used to fall through to `VERCEL_PROJECT_PRODUCTION_URL` before reaching
 * the known domain, which is a coin-flip: that variable is whatever Vercel
 * considers the project's production domain, and this repository is connected
 * to *two* Vercel projects. The one that does not own decibyl.ai resolves it to
 * a `.vercel.app` host — a green deploy that quietly publishes a whole site of
 * canonicals pointing at the wrong origin. Vercel's own variables are now used
 * only for previews, where a guessed origin is harmless and correct.
 *
 * `??` is NOT enough here: Vercel offers to import env vars from .env.example
 * and fills them in EMPTY, so NEXT_PUBLIC_SITE_URL arrives as '' rather than
 * undefined. `??` only falls back on undefined, so siteUrl became '' and
 * metadataBase's `new URL('')` threw — failing the deploy while collecting
 * page data. Every branch below is guarded, and a malformed value degrades to
 * the canonical domain instead of breaking the build.
 */
function resolveSiteUrl(): string {
  // An explicit setting always wins — it is the only way to move the domain.
  const explicit = toOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? '');
  if (explicit) return explicit;

  // A production build is decibyl.ai, whichever project built it.
  if (process.env.VERCEL_ENV === 'production') return CANONICAL_URL;

  // Previews and branch deploys describe themselves; nothing indexes them.
  return (
    toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '') ??
    toOrigin(process.env.VERCEL_URL ?? '') ??
    CANONICAL_URL
  );
}

export const siteUrl = resolveSiteUrl();

/** True only on the real production build of the real domain.
 *
 *  Used to keep preview deploys out of the index, and to keep a preview's
 *  `noindex` from ever reaching production. `VERCEL_ENV` is unset when running
 *  locally, so `npm run dev` is treated as non-production, which is right. */
export const isProductionSite =
  process.env.VERCEL_ENV === 'production' ||
  // Off Vercel entirely (a local build), the canonical domain means production.
  // On Vercel, only VERCEL_ENV counts: NEXT_PUBLIC_SITE_URL is commonly set for
  // every environment at once, and a preview that inherits it would otherwise
  // both claim to be decibyl.ai and invite Google to index the claim.
  (!process.env.VERCEL_ENV && siteUrl === CANONICAL_URL);

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
   * The full registered address, confirmed 28 Aug 2026. It satisfies the
   * GST-registered entity's obligation to display it, and it is the strongest
   * local signal available to a company nobody has heard of yet: a complete
   * PostalAddress with a locality, a region and a postcode is what associates
   * the entity with a real place.
   *
   * Every part is optional in the type and the schema omits whatever is
   * absent, so a future change of address is one edit here and nowhere else.
   */
  registeredAddress: {
    street: 'No. 86/18, Brindhavan Nagar',
    locality: 'Hosur',
    // Hosur 635109 is in Krishnagiri district, Tamil Nadu. Stated because a
    // PostalAddress without a region is weaker for local search, and because
    // an Indian reader expects the state on a registered address.
    region: 'Tamil Nadu',
    postalCode: '635109',
    country: 'India',
    /** ISO 3166-1 alpha-2, for schema.org. */
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
} as const;

export const nav = [
  { label: 'Solutions', href: '/solutions/clinics' },
  { label: 'Languages', href: '/voice-ai' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compare', href: '/compare' },
];
