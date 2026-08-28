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

/**
 * The dynamic OG image for a given headline.
 *
 * Returned relative for `Metadata` (Next resolves it against `metadataBase`)
 * and absolute for JSON-LD, which has no base to resolve against — a relative
 * `image` in structured data is simply dropped by the validator.
 */
export function ogImagePath(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set('subtitle', subtitle);
  return `/api/og?${params.toString()}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
  ogSubtitle,
}: MetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  const ogUrl = ogImagePath(ogTitle ?? title, ogSubtitle);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      // The feed link has to be repeated here, not just in the root layout:
      // Next replaces the whole `alternates` object when a page defines one,
      // so a layout-only declaration is silently dropped from every page that
      // sets its own canonical — which is all of them.
      types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${site.name} Blog` }] },
    },
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

/**
 * Stable node identifiers.
 *
 * Every page emits an Organization block, and until these existed each one was
 * an anonymous node — so a crawler saw thirty-odd separate companies that
 * happen to share a name, rather than one company described thirty-odd times.
 * With a fixed `@id`, every other schema on the site (`publisher`, `provider`,
 * `author`) points at the same node by reference instead of restating it, and
 * the whole site resolves to a single entity. That consolidation is what a
 * brand-new domain has instead of links.
 */
const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** A reference to the Organization node, for use as publisher/provider/author. */
const orgRef = { '@id': ORG_ID };

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: siteUrl,
    // An ImageObject rather than a bare URL: Google's own Organization
    // documentation asks for one, and a bare string is what makes the logo
    // silently ineligible for the knowledge panel.
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.svg`,
      contentUrl: `${siteUrl}/logo.svg`,
    },
    email: site.supportEmail,
    description: site.description,
    // Omitted entirely while we have no profiles — see site.profiles.
    ...(site.profiles.length > 0 ? { sameAs: [...site.profiles] } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.demoPhone.tel,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    // Only the parts we actually have. An empty streetAddress or postalCode is
    // worse than an absent one — it asserts the field and says nothing, which
    // is how a validator reports a warning on every page at once.
    address: {
      '@type': 'PostalAddress',
      ...(site.registeredAddress?.street ? { streetAddress: site.registeredAddress.street } : {}),
      ...(site.registeredAddress?.locality
        ? { addressLocality: site.registeredAddress.locality }
        : {}),
      ...(site.registeredAddress?.region ? { addressRegion: site.registeredAddress.region } : {}),
      ...(site.registeredAddress?.postalCode
        ? { postalCode: site.registeredAddress.postalCode }
        : {}),
      addressCountry: site.registeredAddress?.countryCode ?? 'IN',
    },
  };
}

/**
 * The site itself, as an entity that the Organization publishes.
 *
 * This is what lets a crawler say "decibyl.ai is the website of nAutomation
 * Labs" rather than inferring it from the domain. It is also the node every
 * Article hangs off via `isPartOf`, which is how a blog post inherits the
 * publisher's identity instead of asserting its own.
 */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    description: site.description,
    inLanguage: 'en-IN',
    publisher: orgRef,
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
    // By reference, not by restatement — see ORG_ID.
    provider: orgRef,
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

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  /** Only when the post genuinely changed — see BlogPostMeta.updatedAt. */
  updatedAt?: string;
  category: string;
  /** Pass the same `ogTitle` the page's metadata uses, so the image in the
   *  schema is the card that actually exists rather than a second variant. */
  ogTitle?: string;
}) {
  const url = `${siteUrl}${input.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    // `headline` is capped at 110 characters by Google; a longer one is not
    // truncated, it invalidates the whole Article block.
    headline: input.title.slice(0, 110),
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    articleSection: input.category,
    inLanguage: 'en-IN',
    // Article rich results require an image. This is the same OG card the post
    // already renders, made absolute — structured data has no metadataBase.
    image: [`${siteUrl}${ogImagePath(input.ogTitle ?? input.title)}`],
    author: orgRef,
    publisher: orgRef,
    isPartOf: { '@id': WEBSITE_ID },
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

/**
 * The blog index as an ItemList of its posts.
 *
 * A listing page with no schema is just a page of links; as an ItemList it
 * tells Google what the eight posts are and in what order, which is what gets
 * a new blog's individual posts discovered on the first crawl rather than the
 * third.
 */
export function blogListSchema(posts: { title: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/blog#blog`,
    name: `${site.name} Blog`,
    url: `${siteUrl}/blog`,
    inLanguage: 'en-IN',
    publisher: orgRef,
    isPartOf: { '@id': WEBSITE_ID },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title.slice(0, 110),
      url: `${siteUrl}/blog/${p.slug}`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${p.slug}` },
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
