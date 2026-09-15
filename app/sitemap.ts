import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { topLevelVerticals, clinicSubVerticals } from '@/data/verticals';
import { competitors } from '@/data/competitors';
import { blogPosts } from '@/data/blog';
import { cities } from '@/data/cities';
import { languagePages, languageSlug } from '@/data/languagePages';
import { useCases } from '@/data/useCases';
import { jobs, jobsUpdatedAt } from '@/data/jobs';
import { jobCityPairs, jobIntegrationPairs } from '@/data/jobPairs';
import { jobLanguagePairs } from '@/data/jobLanguagePairs';
import { jobVerticalPairs } from '@/data/jobVerticalPairs';
import { integrationPages, integrationPagesUpdatedAt } from '@/data/integrationPages';
import {
  citiesUpdatedAt,
  jobPairsUpdatedAt,
  competitorsUpdatedAt,
  languagePagesUpdatedAt,
  lastModified,
  verticalsUpdatedAt,
} from '@/data/pageDates';

/**
 * Every date here is a real edit date, not the build time.
 *
 * This file used to set `lastModified: now` on all 31 non-blog URLs, so every
 * deploy told Google the whole site had just changed. A sitemap that always
 * claims everything is fresh says nothing, and the pages that genuinely did
 * change lose the signal they should have carried. Dates now come from
 * `data/pageDates.ts`, which is regenerated from git with `npm run dates`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/pricing', priority: 0.9, freq: 'weekly' },
    { path: '/how-it-works', priority: 0.8, freq: 'monthly' },
    { path: '/solutions', priority: 0.8, freq: 'monthly' },
    { path: '/use-cases', priority: 0.85, freq: 'monthly' },
    { path: '/shelf', priority: 0.85, freq: 'weekly' },
    { path: '/compare', priority: 0.85, freq: 'monthly' },
    { path: '/ai-receptionist', priority: 0.85, freq: 'monthly' },
    { path: '/voice-ai', priority: 0.85, freq: 'monthly' },
    { path: '/jobs', priority: 0.85, freq: 'monthly' },
    { path: '/integrations', priority: 0.8, freq: 'monthly' },
    { path: '/case-studies', priority: 0.6, freq: 'monthly' },
    { path: '/security', priority: 0.6, freq: 'monthly' },
    { path: '/developers', priority: 0.7, freq: 'monthly' },
    { path: '/partners', priority: 0.7, freq: 'monthly' },
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
      lastModified: lastModified(p.path),
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    // Vertical pages all render from data/verticals.ts, so they move when it does.
    ...topLevelVerticals.map((v) => ({
      url: `${siteUrl}/solutions/${v.slug}`,
      lastModified: new Date(verticalsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...clinicSubVerticals.map((v) => ({
      url: `${siteUrl}/solutions/clinics/${v.slug}`,
      lastModified: new Date(verticalsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...competitors.map((c) => ({
      url: `${siteUrl}/compare/${c.slug}`,
      lastModified: new Date(competitorsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Programmatic long-tail. Both sets render from one data file each, so
    // they move when it does.
    ...cities.map((c) => ({
      url: `${siteUrl}/ai-receptionist/${c.slug}`,
      lastModified: new Date(citiesUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...languagePages.map((p) => ({
      url: `${siteUrl}/voice-ai/${languageSlug(p)}`,
      lastModified: new Date(languagePagesUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...useCases.map((item) => ({
      url: `${siteUrl}/use-cases/${item.slug}`,
      lastModified: lastModified('/use-cases'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...jobIntegrationPairs.map((p) => ({
      url: `${siteUrl}/jobs/${p.job}/for/${p.tool}`,
      lastModified: new Date(jobPairsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...jobCityPairs.map((p) => ({
      url: `${siteUrl}/jobs/${p.job}/in/${p.city}`,
      lastModified: new Date(jobPairsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...jobLanguagePairs.map((p) => ({
      url: `${siteUrl}/jobs/${p.job}/language/${languageSlug(languagePages.find((l) => l.code === p.language)!)}`,
      lastModified: new Date(jobPairsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...jobVerticalPairs.map((p) => ({
      url: `${siteUrl}/jobs/${p.job}/industry/${p.vertical}`,
      lastModified: new Date(jobPairsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...jobs.map((j) => ({
      url: `${siteUrl}/jobs/${j.slug}`,
      lastModified: new Date(jobsUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...integrationPages.map((p) => ({
      url: `${siteUrl}/integrations/${p.slug}`,
      lastModified: new Date(integrationPagesUpdatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogPosts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
