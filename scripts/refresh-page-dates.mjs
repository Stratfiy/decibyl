#!/usr/bin/env node
/**
 * Rewrite data/pageDates.ts from git history.
 *
 * The sitemap's lastModified has to be true or it is worse than absent, and a
 * hand-maintained date is a date that goes stale the first time somebody is in
 * a hurry. So the dates come from the one record that cannot lie about when a
 * file changed: the commit that last touched it.
 *
 *     npm run dates
 *
 * Only the blocks between the GENERATED markers are rewritten; the prose and
 * the helper around them are left alone.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(root, 'data', 'pageDates.ts');

/** Mirrors SITE_EPOCH in data/pageDates.ts — the oldest date we would claim. */
const EPOCH = '2026-08-12';

/**
 * Route → every file whose content the page renders. The date claimed is the
 * newest across the set.
 *
 * Listing only the `page.tsx` is not enough and the first run proved it:
 * /pricing came back as 13 Aug on a day its prices had just changed, because
 * the edit was in data/pricing.ts and the route file had not been touched.
 * A page is its data and its components, not just its entry file.
 */
const ROUTES = {
  '/': ['app/page.tsx', 'components/marketing/Blocks.tsx', 'components/marketing/Hero.tsx', 'data/pricing.ts', 'data/faqs.ts', 'data/proof.ts'],
  '/pricing': ['app/pricing/page.tsx', 'components/marketing/PricingTable.tsx', 'components/marketing/PayAsYouGo.tsx', 'data/pricing.ts', 'data/faqs.ts'],
  '/how-it-works': ['app/how-it-works/page.tsx', 'data/integrations.ts', 'data/languages.ts'],
  '/solutions': ['app/solutions/page.tsx', 'data/verticals.ts'],
  '/case-studies': ['app/case-studies/page.tsx', 'data/caseStudies.ts'],
  '/security': ['app/security/page.tsx', 'data/security.ts'],
  '/developers': ['app/developers/page.tsx', 'data/pricing.ts'],
  '/partners': ['app/partners/page.tsx', 'data/referral.ts'],
  '/blog': ['app/blog/page.tsx', 'data/blog.ts'],
  '/book-a-demo': ['app/book-a-demo/page.tsx', 'components/forms/LeadForm.tsx'],
  '/waitlist': ['app/waitlist/page.tsx', 'components/forms/LeadForm.tsx'],
  '/contact': ['app/contact/page.tsx', 'components/forms/LeadForm.tsx'],
  '/legal/privacy': ['app/legal/privacy/page.tsx'],
  '/legal/terms': ['app/legal/terms/page.tsx'],
  '/legal/dpdp': ['app/legal/dpdp/page.tsx'],
  '/legal/refund': ['app/legal/refund/page.tsx'],
  '/compare': ['app/compare/page.tsx', 'data/competitors.ts'],
  '/ai-receptionist': ['app/ai-receptionist/page.tsx', 'data/cities.ts'],
  '/voice-ai': ['app/voice-ai/page.tsx', 'data/languagePages.ts'],
};

const DERIVED = {
  verticalsUpdatedAt: ['data/verticals.ts', 'components/marketing/VerticalPage.tsx'],
  competitorsUpdatedAt: ['data/competitors.ts', 'app/compare/[competitor]/page.tsx'],
  citiesUpdatedAt: ['data/cities.ts', 'app/ai-receptionist/[city]/page.tsx'],
  languagePagesUpdatedAt: ['data/languagePages.ts', 'app/voice-ai/[language]/page.tsx'],
};

/** Last commit date for a path, as YYYY-MM-DD, or null if git has nothing.
 *  Null rather than today: the sitemap's fallback is the site epoch, and
 *  claiming a page changed today because we could not tell is the exact bug
 *  this script exists to remove. */
function lastCommitDate(relPath) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPath], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

function replaceBlock(source, name, body) {
  const start = `/* ${name}:START */`;
  const end = `/* ${name}:END */`;
  const pattern = new RegExp(`${escapeRe(start)}[\\s\\S]*?${escapeRe(end)}`);
  if (!pattern.test(source)) throw new Error(`Marker ${name} not found in data/pageDates.ts`);
  return source.replace(pattern, `${start}\n${body}\n${end}`);
}

/** The newest commit date across a set of files, or null if git knows none.
 *  ISO dates sort lexicographically, so a plain string compare is correct. */
function newestDate(files) {
  const dates = files.map(lastCommitDate).filter(Boolean);
  return dates.length ? dates.sort().at(-1) : null;
}

let missing = 0;

const entries = Object.entries(ROUTES).map(([route, files]) => {
  const date = newestDate(files);
  if (!date) {
    missing += 1;
    console.warn(`  no git date for ${route} — keeping the epoch fallback`);
  }
  return `  '${route}': '${date ?? EPOCH}',`;
});

const derived = Object.entries(DERIVED).map(([name, files]) => {
  const date = newestDate(files);
  if (!date) missing += 1;
  return `export const ${name} = '${date ?? EPOCH}';`;
});

let source = readFileSync(target, 'utf8');
source = replaceBlock(
  source,
  'GENERATED',
  `export const pageDates: Record<string, string> = {\n${entries.join('\n')}\n};`,
);
source = replaceBlock(source, 'GENERATED:DERIVED', derived.join('\n'));
writeFileSync(target, source);

console.log(
  `data/pageDates.ts refreshed — ${Object.keys(ROUTES).length} routes, ` +
    `${Object.keys(DERIVED).length} derived${missing ? `, ${missing} without a git date` : ''}.`,
);
