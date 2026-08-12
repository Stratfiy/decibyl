import type { Metadata } from 'next';
import { site, siteUrl } from './site';
import { tiers } from '@/data/pricing';
import type { Faq } from '@/data/faqs';

type MetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogTitle?: string;
  ogSubtitle?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
  ogSubtitle,
}: MetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  const params = new URLSearchParams({ title: ogTitle ?? title });
  if (ogSubtitle) params.set('subtitle', ogSubtitle);
  const ogUrl = `/api/og?${params.toString()}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl],
    },
  };
}

/* ─────────────────────────────── JSON-LD ─────────────────────────────── */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    email: site.supportEmail,
    description: site.description,
    address: site.registeredAddress
      ? {
          '@type': 'PostalAddress',
          streetAddress: site.registeredAddress.street,
          addressLocality: site.registeredAddress.locality,
          addressRegion: site.registeredAddress.region,
          postalCode: site.registeredAddress.postalCode,
          addressCountry: 'IN',
        }
      : { '@type': 'PostalAddress', addressCountry: 'IN' },
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    description: site.description,
    provider: { '@type': 'Organization', name: site.legalName },
    offers: tiers
      .filter((t) => t.priceInr !== null)
      .map((t) => ({
        '@type': 'Offer',
        name: t.name,
        price: String(t.priceInr),
        priceCurrency: 'INR',
        url: `${siteUrl}/pricing`,
      })),
    // NOTE: no Product/AggregateRating until real reviews exist. Fake review
    // schema is a manual-action risk with Google.
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
