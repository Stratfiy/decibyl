import { blogPosts } from '@/data/blog';
import { site, siteUrl } from '@/lib/site';

/**
 * RSS 2.0 for the blog.
 *
 * Worth having for a site with no audience yet, because a feed is how the
 * places that *do* have an audience pick posts up without anyone asking:
 * newsletter tools, Feedly, aggregator bots, and several of the AI answer
 * engines poll feeds far more eagerly than they re-crawl a listing page. It
 * costs one static file and it is generated from `data/blog.ts`, so it cannot
 * drift from the index the way a hand-written feed would.
 */
export const dynamic = 'force-static';

/** XML has five reserved characters and a feed reader is unforgiving about
 *  all of them — one raw `&` in a title invalidates the whole document. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RSS wants RFC 822. `data/blog.ts` stores plain ISO dates, which parse as
 *  UTC midnight; that is the date we mean, so no timezone maths is needed. */
function rfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

export function GET(): Response {
  const sorted = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const latest = sorted[0];

  const items = sorted
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${rfc822(post.updatedAt ?? post.publishedAt)}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} Blog`)}</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(
      'Practical, researched writing on AI voice agents, pricing, DPDP compliance, and NDR recovery in India.',
    )}</description>
    <language>en-IN</language>
    <copyright>${escapeXml(site.legalName)}</copyright>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${latest ? `    <lastBuildDate>${rfc822(latest.updatedAt ?? latest.publishedAt)}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
