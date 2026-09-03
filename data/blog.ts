/**
 * Blog index metadata. SINGLE SOURCE OF TRUTH for /blog, the sitemap, and
 * each post's own schema — the post's actual prose lives in its own file
 * under app/blog/<slug>/page.tsx (same pattern as the legal pages), so this
 * stays in sync manually. Add an entry here whenever a post is added.
 *
 * Every number or claim inside a post must be either true of the product
 * (pulled from data/*.ts) or attributed to a named external source. No
 * invented statistics — same rule as data/proof.ts and data/security.ts.
 */

export type BlogPostMeta = {
  slug: string;
  title: string;
  /** Short form for the <title> tag only, when the editorial headline runs past
   *  the ~60 characters Google will render. The H1 always uses `title`; this
   *  exists so a good headline does not have to be shortened to suit a SERP. */
  seoTitle?: string;
  description: string;
  category: string;
  /** ISO date, e.g. '2026-08-12' */
  publishedAt: string;
  /** ISO date of the last substantive revision. Omit while a post is
   *  untouched since publication — `articleSchema` then reports
   *  `dateModified` equal to `datePublished`, which is the truth.
   *  Set it when the prose or a figure inside the post actually changes;
   *  a post that says it was revised and was not is worse than one that
   *  says nothing. */
  updatedAt?: string;
  readingMinutes: number;
  /**
   * Money pages this post should link to, as absolute paths.
   *
   * SEO.md Lever 5: "Every post must link to at least two money pages with
   * descriptive anchor text." Before this field existed, five of the eight
   * posts linked to none, and nothing on the site linked *to* a post — so
   * posts were reachable only from /blog, got crawled last, and passed
   * nothing onward to the pages that convert.
   *
   * One field, both directions: `RelatedPages` renders these at the foot of
   * the post, and `postsRelatedTo()` inverts the mapping so a solution or
   * use-case page can list the posts pointing at it. Keep it to pages the
   * post genuinely bears on — a link that does not follow from the argument
   * is the kind of internal linking Google learned to discount.
   */
  related?: { href: string; label: string }[];
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'ai-voice-agent-pricing-india',
    title: 'AI Voice Agent Pricing in India: What the Per-Minute Rate Actually Hides',
    seoTitle: 'AI Voice Agent Pricing India: What ₹/min Hides',
    description:
      'Published rates range from ₹2 to ₹20/min for what looks like the same thing. The difference is what is bundled into that number, and what shows up later.',
    category: 'Pricing',
    publishedAt: '2026-08-12',
    readingMinutes: 7,
    related: [
      { href: '/pricing', label: 'what Decibyl publishes, per minute and per plan' },
      { href: '/compare', label: 'how nine platforms in India actually price' },
    ],
  },
  {
    slug: 'dpdp-act-ai-voice-calls-guide',
    title: 'The DPDP Act and AI Voice Calls: A Practical Guide, Not a Legal Opinion',
    seoTitle: 'DPDP Act and AI Voice Calls: Practical Guide',
    description:
      'The DPDP Rules, 2025 give India an 18-month compliance runway ending May 2027. Here is what an automated calling program actually needs to do, in plain terms.',
    category: 'Compliance',
    publishedAt: '2026-08-12',
    readingMinutes: 8,
    related: [
      { href: '/security', label: 'how Decibyl handles consent, residency and deletion' },
      { href: '/legal/dpdp', label: 'our DPDP position in full' },
    ],
  },
  {
    slug: 'why-voice-ai-fails-at-hinglish',
    title: 'Why Most Voice AI Fails at Hinglish, and What "Code-Mixed by Default" Actually Means',
    seoTitle: 'Why Voice AI Fails at Hinglish',
    description:
      'Word error rate climbs 30–50% the moment a caller switches languages mid-sentence. The reason is architectural, not a data problem you fix by adding more Hindi.',
    category: 'Product',
    publishedAt: '2026-08-12',
    readingMinutes: 6,
    related: [
      { href: '/voice-ai', label: 'the Indian languages and code-mixed speech we support' },
      { href: '/solutions/clinics', label: 'clinics, where the language switch happens most' },
    ],
  },
  {
    slug: 'ndr-rto-cost-d2c-india',
    title: 'The Real Cost of a Missed NDR Call for Indian D2C Brands',
    seoTitle: 'The Real Cost of a Missed NDR Call, for D2C India',
    description:
      "India's RTO rate runs 3–4× the global benchmark, and cash-on-delivery is most of why. The math on what one confirmation call is actually worth.",
    category: 'D2C & Logistics',
    publishedAt: '2026-08-12',
    readingMinutes: 6,
    related: [
      { href: '/solutions/d2c-ndr-recovery', label: 'NDR and RTO recovery calling for D2C' },
      { href: '/pricing', label: 'what a recovery campaign costs per minute' },
    ],
  },
  {
    slug: 'trai-dnd-rules-ai-voice-calls',
    title: 'TRAI, DND and the 9-to-9 Window: What Automated Calling in India Has to Obey',
    seoTitle: 'TRAI, DND and AI Calling Rules in India',
    description:
      'DND scrubbing and the TCCCPR calling window decide whether an outbound campaign is lawful. What they require, and where implementations quietly get them wrong.',
    category: 'Compliance',
    publishedAt: '2026-08-28',
    readingMinutes: 8,
    related: [
      { href: '/security', label: 'how the calling window and DND scrubbing are enforced' },
      { href: '/use-cases/outbound-sales-calling', label: 'compliant outbound calling in practice' },
    ],
  },
  {
    slug: 'credit-not-minutes-voice-ai-billing',
    title: 'Why We Sell Credit, Not Minutes — and Why Nobody Can Honestly Sell You Minutes',
    seoTitle: 'Why We Sell Credit, Not Minutes',
    description:
      'A minute of voice AI has no single price. The model decides it, and the spread is more than five to one — which makes every "500 minutes included" a rounded number.',
    category: 'Pricing',
    publishedAt: '2026-08-28',
    readingMinutes: 7,
    related: [
      { href: '/pricing', label: 'the credit model and the three voice bundles' },
      { href: '/compare', label: 'how other platforms bill for the same thing' },
    ],
  },
  {
    slug: 'concurrent-calls-explained',
    title: 'What Concurrent Calls Actually Means, and How Many You Need',
    seoTitle: 'What Concurrent Calls Means, and How Many You Need',
    description:
      'The number every voice AI vendor puts on a pricing table and nobody explains. What it limits, what happens when you hit it, and how to work out your own.',
    category: 'Technical',
    publishedAt: '2026-08-28',
    readingMinutes: 6,
    related: [
      { href: '/pricing', label: 'concurrency on each plan' },
      { href: '/how-it-works', label: 'how calls are set up and run' },
    ],
  },
  {
    slug: 'language-menu-is-the-bug',
    title: 'If Your Voice Agent Asks the Caller to Pick a Language, You Have Built an IVR',
    seoTitle: 'A Language Menu on a Voice Agent Is an IVR',
    description:
      '“Press 1 for Hindi” is the thing the caller was trying to escape. Why code-mixed speech has to be the default register on an Indian phone line.',
    category: 'Product',
    publishedAt: '2026-08-28',
    readingMinutes: 7,
    related: [
      { href: '/voice-ai', label: 'code-mixed speech as the default register' },
      { href: '/ai-receptionist', label: 'an inbound agent with no language menu' },
    ],
  },
];

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Posts that point at a given page, so the page can link back to them.
 *  The inverse of `BlogPostMeta.related` — see the note there. */
export function postsRelatedTo(path: string): BlogPostMeta[] {
  return blogPosts.filter((p) => p.related?.some((r) => r.href === path));
}
