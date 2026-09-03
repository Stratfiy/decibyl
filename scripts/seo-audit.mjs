#!/usr/bin/env node
/**
 * Audit the built site for the on-page problems that actually cost rankings.
 *
 *     npm run build && npm run seo:audit
 *
 * Why this exists, and why it reads the *built* HTML rather than the source:
 * what Google sees is the rendered page, not the JSX that produced it. A
 * templated page can look well-differentiated in `data/verticals.ts` and still
 * render as ninety-percent the same words as its sibling, which is the single
 * failure mode SEO.md Lever 2 warns about and the one nobody catches by eye.
 *
 * Deliberately zero-dependency and fully offline. No API keys, no paid
 * services, no crawling anyone else's site — so it runs in CI, on a laptop,
 * and inside a sandbox with no egress. Everything it reports is derived from
 * our own output.
 *
 * What it checks, mapped to the levers in SEO.md:
 *
 *   Lever 2  Sibling similarity. Programmatic pages that say the same thing
 *            get one indexed and the rest dropped. This is the headline check.
 *   Lever 5  Internal links. Contextual (non-navigation) inbound links are what
 *            get deep pages crawled and pass authority to pages that convert.
 *   Lever 4  Titles and descriptions — length, duplication, emptiness. The only
 *            lever between an impression and a click.
 *   Part 0   Canonical and H1 hygiene, which the repo already gets right and
 *            which this keeps from silently regressing.
 */

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP_DIR = join(root, '.next', 'server', 'app');

/* ── thresholds ───────────────────────────────────────────────────────────
 * Tuned to flag genuine problems, not to produce a long list. A check that
 * cries wolf gets ignored, which is worse than not running it. */
const SIMILARITY_WARN = 0.5;   // two siblings sharing >50% of their phrasing
const SIMILARITY_FAIL = 0.7;   // near-duplicates; expect one to be dropped
const TITLE_MAX = 60;          // beyond this Google rewrites it
const DESC_MIN = 70;
const DESC_MAX = 165;
const GLOBAL_LINK_RATIO = 0.9; // a target linked from >=90% of pages is nav/footer

/* ── html helpers ─────────────────────────────────────────────────────── */

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

/**
 * Visible text only.
 *
 * Stripping <script> first is not optional: Next inlines the whole RSC payload
 * into `self.__next_f.push(...)`, which is many kilobytes of near-identical
 * framework noise on every page. Leaving it in makes every pair of pages look
 * ~99% similar and the entire similarity check meaningless.
 */
const visibleText = (html) =>
  decode(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();

/** Word 5-grams. Phrase-level overlap catches find-and-replace templating that
 *  bag-of-words similarity misses — the words differ, the sentences don't. */
function shingles(text, n = 5) {
  const words = text.toLowerCase().replace(/[^a-z0-9₹\s]/g, ' ').split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(' '));
  return out;
}

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const s of small) if (large.has(s)) shared++;
  return shared / (a.size + b.size - shared);
};

/* ── load ─────────────────────────────────────────────────────────────── */

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Built file path → the route it serves. */
const routeOf = (file) => {
  const rel = relative(APP_DIR, file).split(sep).join('/').replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};

/** The group a page belongs to, for sibling comparison. Top-level pages are
 *  their own group and never compared — they are supposed to differ. */
const groupOf = (route) => {
  const parts = route.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  return `/${parts.slice(0, -1).join('/')}`;
};

async function main() {
  let files;
  try {
    files = await htmlFiles(APP_DIR);
  } catch {
    console.error('No build output found. Run `npm run build` first.');
    process.exit(2);
  }

  const pages = files
    .map((file) => {
      const html = readFileSync(file, 'utf8');
      const route = routeOf(file);
      const text = visibleText(html);
      return {
        route,
        title: pick(html, /<title[^>]*>([^<]*)<\/title>/i),
        description: pick(html, /<meta name="description" content="([^"]*)"/i),
        canonical: pick(html, /<link rel="canonical" href="([^"]*)"/i),
        h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
        words: text.split(' ').length,
        shingles: shingles(text),
        links: new Set(
          [...html.matchAll(/href="(\/[^"#?]*)"/g)]
            .map((m) => m[1].replace(/\/$/, '') || '/')
            .filter((h) => !h.startsWith('/_next') && !h.startsWith('/api'))
        ),
      };
    })
    .filter((p) => p.route !== '/_not-found');

  const findings = [];
  const add = (severity, check, detail) => findings.push({ severity, check, detail });

  /* ── Lever 2 · sibling similarity ─────────────────────────────────── */
  const groups = new Map();
  for (const p of pages) {
    const g = groupOf(p.route);
    if (!g) continue;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(p);
  }

  const pairs = [];
  for (const [group, members] of groups) {
    if (members.length < 2) continue;
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const score = jaccard(members[i].shingles, members[j].shingles);
        pairs.push({ group, a: members[i].route, b: members[j].route, score });
      }
    }
  }
  pairs.sort((x, y) => y.score - x.score);

  for (const p of pairs) {
    if (p.score >= SIMILARITY_FAIL)
      add('FAIL', 'sibling-similarity', `${(p.score * 100).toFixed(0)}% identical phrasing — ${p.a} vs ${p.b}`);
    else if (p.score >= SIMILARITY_WARN)
      add('WARN', 'sibling-similarity', `${(p.score * 100).toFixed(0)}% shared phrasing — ${p.a} vs ${p.b}`);
  }

  /* ── Lever 5 · internal links ─────────────────────────────────────── */
  const inbound = new Map(pages.map((p) => [p.route, new Set()]));
  for (const p of pages)
    for (const target of p.links)
      if (inbound.has(target) && target !== p.route) inbound.get(target).add(p.route);

  // A target linked from nearly every page is navigation, not a contextual
  // link. Counting those would report every page as well-linked and hide the
  // pages that genuinely have no editorial link pointing at them.
  const globalTargets = new Set(
    [...inbound.entries()]
      .filter(([, srcs]) => srcs.size >= pages.length * GLOBAL_LINK_RATIO)
      .map(([route]) => route)
  );

  const contextual = new Map(
    [...inbound.entries()].map(([route, srcs]) => {
      const real = [...srcs].filter((s) => !globalTargets.has(route));
      return [route, real.length];
    })
  );

  for (const [route, count] of [...contextual].sort((a, b) => a[1] - b[1])) {
    if (globalTargets.has(route)) continue;
    if (count === 0) add('FAIL', 'orphan-page', `${route} — no contextual inbound links, only navigation`);
    else if (count === 1) add('WARN', 'thin-linking', `${route} — only 1 contextual inbound link`);
  }

  /* ── Lever 4 · titles and descriptions ────────────────────────────── */
  const byTitle = new Map();
  const byDesc = new Map();
  for (const p of pages) {
    if (!p.title) { add('FAIL', 'missing-title', p.route); continue; }
    if (p.title.length > TITLE_MAX)
      add('WARN', 'title-length', `${p.title.length} chars (>${TITLE_MAX}, Google will rewrite) — ${p.route}`);
    byTitle.set(p.title, [...(byTitle.get(p.title) ?? []), p.route]);

    if (!p.description) { add('FAIL', 'missing-description', p.route); continue; }
    if (p.description.length > DESC_MAX)
      add('WARN', 'description-length', `${p.description.length} chars (>${DESC_MAX}, truncated) — ${p.route}`);
    if (p.description.length < DESC_MIN)
      add('WARN', 'description-length', `${p.description.length} chars (<${DESC_MIN}, wasted space) — ${p.route}`);
    byDesc.set(p.description, [...(byDesc.get(p.description) ?? []), p.route]);
  }
  for (const [title, routes] of byTitle)
    if (routes.length > 1) add('FAIL', 'duplicate-title', `"${title}" on ${routes.join(', ')}`);
  for (const [, routes] of byDesc)
    if (routes.length > 1) add('FAIL', 'duplicate-description', routes.join(', '));

  /* ── hygiene ──────────────────────────────────────────────────────── */
  for (const p of pages) {
    if (!p.canonical) add('FAIL', 'missing-canonical', p.route);
    else if (!p.canonical.startsWith('http')) add('FAIL', 'relative-canonical', `${p.route} → ${p.canonical}`);
    if (!p.h1) add('WARN', 'missing-h1', p.route);
    if (p.words < 300) add('WARN', 'thin-content', `${p.words} words — ${p.route}`);
  }

  /* ── report ───────────────────────────────────────────────────────── */
  const fails = findings.filter((f) => f.severity === 'FAIL');
  const warns = findings.filter((f) => f.severity === 'WARN');

  console.log(`\nSEO audit — ${pages.length} pages\n${'='.repeat(60)}`);

  const byCheck = new Map();
  for (const f of findings) byCheck.set(f.check, [...(byCheck.get(f.check) ?? []), f]);
  for (const [check, items] of [...byCheck].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${items[0].severity === 'FAIL' ? '✗' : '!'} ${check} (${items.length})`);
    for (const i of items.slice(0, 12)) console.log(`    ${i.detail}`);
    if (items.length > 12) console.log(`    … and ${items.length - 12} more`);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Most-similar sibling pairs (Lever 2 — the differentiation risk):`);
  for (const p of pairs.slice(0, 8))
    console.log(`  ${(p.score * 100).toFixed(0).padStart(3)}%  ${p.a}  vs  ${p.b}`);

  console.log(`\n${fails.length} failures, ${warns.length} warnings`);
  if (!findings.length) console.log('Clean.');
  process.exit(fails.length ? 1 : 0);
}

main();
