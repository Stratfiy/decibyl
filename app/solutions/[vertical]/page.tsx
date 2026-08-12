import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VerticalPage } from '@/components/marketing/VerticalPage';
import { getVertical, topLevelVerticals } from '@/data/verticals';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

/** `clinics` is excluded — it has its own route at app/solutions/clinics. */
export function generateStaticParams() {
  return topLevelVerticals.filter((v) => v.slug !== 'clinics').map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical: slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) return {};

  return pageMetadata({
    title: vertical.seo.title,
    description: vertical.seo.description,
    path: `/solutions/${vertical.slug}`,
    keywords: vertical.seo.keywords,
    ogTitle: vertical.h1,
    ogSubtitle: vertical.eyebrow,
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical: slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();

  return (
    <>
      <VerticalPage vertical={vertical} />
      <JsonLd
        data={[
          faqSchema(vertical.objections),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: vertical.name, path: `/solutions/${vertical.slug}` },
          ]),
        ]}
      />
    </>
  );
}
