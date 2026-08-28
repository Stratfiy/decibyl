import type { MetadataRoute } from 'next';
import { isProductionSite, siteUrl } from '@/lib/site';

/**
 * Preview deploys must not be indexable.
 *
 * Every branch push builds a full copy of this site on a `.vercel.app` host,
 * and this repository is connected to two Vercel projects, so there are
 * several complete copies of every page live at any moment. Indexed, they
 * compete with decibyl.ai for its own content — the duplicate that Search
 * Console reports as "Alternate page with proper canonical tag" at best, and
 * as the winning URL at worst.
 *
 * Production is unchanged: everything allowed except the API.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        // `/api/og` has to stay reachable. Every page's OG and Twitter card
        // points at it, and the crawlers that render those previews —
        // facebookexternalhit, Twitterbot, LinkedInBot, Slackbot, WhatsApp —
        // all read robots.txt first and refuse a disallowed image. A blanket
        // `/api/` disallow therefore turned every share of this site into a
        // text-only link, which is the difference between a post that gets
        // clicked and one that doesn't. `allow` is more specific than the
        // `disallow` below, so it wins for every crawler that supports the
        // directive, and the lead endpoint stays closed either way.
        allow: ['/', '/api/og'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
