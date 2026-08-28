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
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
