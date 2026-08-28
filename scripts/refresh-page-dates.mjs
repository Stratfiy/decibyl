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

/** Route → the file whose git history dates it. */
const ROUTES = {
  '/': 'app/page.tsx',
  '/pricing': 'app/pricing/page.tsx',
  '/how-it-works': 'app/how-it-works/page.tsx',
  '/solutions': 'app/solutions/page.tsx',
  '/case-studies': 'app/case-studies/page.tsx',
  '/security': 'app/security/page.tsx',
  '/developers': 'app/developers/page.tsx',
  '/partners': 'app/partners/page.tsx',
  '/blog': 'app/blog/page.tsx',
  '/book-a-demo': 'app/book-a-demo/page.tsx',
  '/waitlist': 'app/waitlist/page.tsx',
  '/contact': 'app/contact/page.tsx',
  '/legal/privacy': 'app/legal/privacy/page.tsx',
  '/legal/terms': 'app/legal/terms/page.tsx',
  '/legal/dpdp': 'app/legal/dpdp/page.tsx',
  '/legal/refund': 'app/legal/refund/page.tsx',
  '/compare': 'app/compare/page.tsx',
};

const DERIVED = {
  verticalsUpdatedAt: 'data/verticals.ts',
  competitorsUpdatedAt: 'data/competitors.ts',
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

let missing = 0;

const entries = Object.entries(ROUTES).map(([route, file]) => {
  const date = lastCommitDate(file);
  if (!date) {
    missing += 1;
    console.warn(`  no git date for ${file} — keeping the epoch fallback for ${route}`);
  }
  return `  '${route}': '${date ?? '2026-08-12'}',`;
});

const derived = Object.entries(DERIVED).map(([name, file]) => {
  const date = lastCommitDate(file);
  if (!date) missing += 1;
  return `export const ${name} = '${date ?? '2026-08-12'}';`;
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
