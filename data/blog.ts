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
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'ai-voice-agent-pricing-india',
    title: 'AI Voice Agent Pricing in India: What the Per-Minute Rate Actually Hides',
    description:
      'Published rates range from ₹2 to ₹20/min for what looks like the same thing. The difference is what is bundled into that number, and what shows up later.',
    category: 'Pricing',
    publishedAt: '2026-08-12',
    readingMinutes: 7,
  },
  {
    slug: 'dpdp-act-ai-voice-calls-guide',
    title: 'The DPDP Act and AI Voice Calls: A Practical Guide, Not a Legal Opinion',
    description:
      'The DPDP Rules, 2025 give India an 18-month compliance runway ending May 2027. Here is what an automated calling program actually needs to do, in plain terms.',
    category: 'Compliance',
    publishedAt: '2026-08-12',
    readingMinutes: 8,
  },
  {
    slug: 'why-voice-ai-fails-at-hinglish',
    title: 'Why Most Voice AI Fails at Hinglish, and What "Code-Mixed by Default" Actually Means',
    description:
      'Word error rate climbs 30–50% the moment a caller switches languages mid-sentence. The reason is architectural, not a data problem you fix by adding more Hindi.',
    category: 'Product',
    publishedAt: '2026-08-12',
    readingMinutes: 6,
  },
  {
    slug: 'ndr-rto-cost-d2c-india',
    title: 'The Real Cost of a Missed NDR Call for Indian D2C Brands',
    description:
      "India's RTO rate runs 3–4× the global benchmark, and cash-on-delivery is most of why. The math on what one confirmation call is actually worth.",
    category: 'D2C & Logistics',
    publishedAt: '2026-08-12',
    readingMinutes: 6,
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
