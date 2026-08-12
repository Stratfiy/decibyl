import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VerticalPage } from '@/components/marketing/VerticalPage';
import { clinicSubVerticals, getSubVertical } from '@/data/verticals';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return clinicSubVerticals.map((v) => ({ subvertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subvertical: string }>;
}): Promise<Metadata> {
  const { subvertical } = await params;
  const vertical = getSubVertical(subvertical);
  if (!vertical) return {};

  return pageMetadata({
    title: vertical.seo.title,
    description: vertical.seo.description,
    path: `/solutions/clinics/${vertical.slug}`,
    keywords: vertical.seo.keywords,
    ogTitle: vertical.h1,
    ogSubtitle: vertical.eyebrow,
  });
}

export default async function ClinicSubPage({
  params,
}: {
  params: Promise<{ subvertical: string }>;
}) {
  const { subvertical } = await params;
  const vertical = getSubVertical(subvertical);
  if (!vertical) notFound();

  return (
    <>
      <VerticalPage vertical={vertical} />
      <JsonLd
        data={[
          faqSchema(vertical.objections),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Clinics', path: '/solutions/clinics' },
            { name: vertical.name, path: `/solutions/clinics/${vertical.slug}` },
          ]),
        ]}
      />
    </>
  );
}
