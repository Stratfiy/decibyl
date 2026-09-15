import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketingLanding } from '@/components/marketing/MarketingLanding';
import { marketingPages } from '@/data/marketingPages';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(marketingPages).map((key) => ({ slug: key.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = marketingPages[slug.join('/')];
  if (!page) return {};
  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: page.path,
    ogTitle: page.title,
  });
}

export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = marketingPages[slug.join('/')];
  if (!page) notFound();

  return (
    <>
      <MarketingLanding page={page} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: page.title, path: page.path },
        ])}
      />
    </>
  );
}
