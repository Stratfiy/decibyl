import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { topLevelVerticals, clinicSubVerticals } from '@/data/verticals';
import { competitors } from '@/data/competitors';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/pricing', priority: 0.9, freq: 'weekly' },
    { path: '/how-it-works', priority: 0.8, freq: 'monthly' },
    { path: '/solutions', priority: 0.8, freq: 'monthly' },
    { path: '/case-studies', priority: 0.6, freq: 'monthly' },
    { path: '/security', priority: 0.6, freq: 'monthly' },
    { path: '/blog', priority: 0.7, freq: 'weekly' },
    { path: '/book-a-demo', priority: 0.9, freq: 'monthly' },
    { path: '/waitlist', priority: 0.5, freq: 'monthly' },
    { path: '/contact', priority: 0.5, freq: 'monthly' },
    { path: '/legal/privacy', priority: 0.3, freq: 'yearly' },
    { path: '/legal/terms', priority: 0.3, freq: 'yearly' },
    { path: '/legal/dpdp', priority: 0.4, freq: 'yearly' },
    { path: '/legal/refund', priority: 0.3, freq: 'yearly' },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...topLevelVerticals.map((v) => ({
      url: `${siteUrl}/solutions/${v.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...clinicSubVerticals.map((v) => ({
      url: `${siteUrl}/solutions/clinics/${v.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...competitors.map((c) => ({
      url: `${siteUrl}/compare/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogPosts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
