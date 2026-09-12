/**
 * When each page last genuinely changed.
 *
 * The sitemap used to stamp `new Date()` on every URL at build time, so each
 * deploy told Google that all thirty-odd pages had just changed. A freshness
 * signal that always says "everything is new" carries no information, and it
 * hides the pages that really are stale behind the ones that are not.
 *
 * These dates are derived from git — the last commit that touched the file
 * behind each route. Regenerate them with:
 *
 *     npm run dates
 *
 * Run it before a deploy that changed page content. If a route is missing
 * here, the sitemap falls back to `SITE_EPOCH` rather than to today, because
 * an under-claim costs a re-crawl and an over-claim costs credibility.
 */

/** The oldest date we would ever claim: the site's first public build. */
export const SITE_EPOCH = '2026-08-12';

/**
 * Route path → ISO date (YYYY-MM-DD).
 *
 * Generated section — `npm run dates` rewrites everything between the markers.
 */
/* GENERATED:START */
export const pageDates: Record<string, string> = {
  '/': '2026-09-03',
  '/pricing': '2026-09-03',
  '/how-it-works': '2026-09-03',
  '/solutions': '2026-09-03',
  '/use-cases': '2026-09-03',
  '/case-studies': '2026-08-13',
  '/security': '2026-09-03',
  '/developers': '2026-09-03',
  '/partners': '2026-09-03',
  '/blog': '2026-09-03',
  '/book-a-demo': '2026-08-17',
  '/waitlist': '2026-08-17',
  '/contact': '2026-08-17',
  '/legal/privacy': '2026-08-12',
  '/legal/terms': '2026-08-28',
  '/legal/dpdp': '2026-08-12',
  '/legal/refund': '2026-08-12',
  '/compare': '2026-09-03',
  '/ai-receptionist': '2026-09-03',
  '/voice-ai': '2026-09-03',
};
/* GENERATED:END */

/** Vertical and competitor pages render from one data file each, so they all
 *  move when that file does. Kept separate from the map above because the
 *  route list is derived, not enumerated. */
/* GENERATED:DERIVED:START */
export const verticalsUpdatedAt = '2026-09-03';
export const competitorsUpdatedAt = '2026-09-03';
export const citiesUpdatedAt = '2026-09-03';
export const languagePagesUpdatedAt = '2026-09-03';
/* GENERATED:DERIVED:END */

/** The date to claim for `path`, or the epoch if we have no better answer. */
export function lastModified(path: string): Date {
  return new Date(pageDates[path] ?? SITE_EPOCH);
}
