import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { getIntegrationPage, integrationPages, integrationStatus, integrationStatusLabel } from '@/data/integrationPages';
import { getJob } from '@/data/jobs';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return integrationPages.map((p) => ({ tool: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  const page = getIntegrationPage(tool);
  if (!page) return {};
  return pageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/integrations/${page.slug}`,
    keywords: page.seo.keywords,
    ogTitle: `Decibyl + ${page.name}`,
    ogSubtitle: page.eyebrow,
  });
}

const statusNote: Record<string, string> = {
  live: 'Built and tested. Connect it from the dashboard today.',
  beta: 'Built and in use, not yet verified on every edge case. Start small and tell us what breaks.',
  'on-request': 'Built for paying customers on a setup call, because the field mapping differs per account. Not charged.',
  coming: 'Not built. This page should not exist; tell us if you are reading it.',
};

export default async function IntegrationPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const page = getIntegrationPage(tool);
  if (!page) notFound();

  const status = integrationStatus(page);
  const chip = integrationStatusLabel(page);
  const jobRecords = page.jobs.map((s) => getJob(s)).filter((j): j is NonNullable<typeof j> => Boolean(j));
  const siblings = integrationPages.filter((p) => p.slug !== page.slug && p.eyebrow === page.eyebrow).slice(0, 3);

  return (
    <>
      <section className="bg-canvas" aria-label={`Decibyl and ${page.name}`}>
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex flex-wrap gap-2 text-iron">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/integrations" className="hover:text-ink">Integrations</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">{page.name}</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">
              {page.eyebrow}{chip ? ` · ${chip}` : ' · Live'}
            </p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">{page.h1}</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{page.intro}</p>
            <p className="t-caption mt-6 max-w-2xl rounded-card border border-line bg-snow p-4 text-iron">
              Status: {statusNote[status]}
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="What moves">
        <SectionHead eyebrow="What moves" title={`Between Decibyl and ${page.name}`} sub="Direction matters. Each flow says which way the data goes and when." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {page.flows.map((f) => (
            <div key={f.title} className="rounded-card border border-line bg-canvas p-7">
              <p className="font-display font-bold">{f.title}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Setup">
        <SectionHead eyebrow="Setup" title="Three steps, as you do them" sub="No engineer required for the live and beta connections; on-request ones start with a call." />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {page.steps.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-snow p-7">
              <p className="t-eyebrow text-sindoor">Step {i + 1}</p>
              <p className="mt-2 font-display font-bold">{s.title}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="white" ariaLabel="Jobs this serves">
        <SectionHead eyebrow="Jobs this serves" title={`The phone jobs that end in ${page.name}`} sub="Each is a job-post page: what the post asks for, what the bot does, and the price beside the salary." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {jobRecords.map((j) => (
            <Link key={j.slug} href={`/jobs/${j.slug}`} className="group rounded-card border border-line bg-canvas p-6 transition-colors hover:border-vermilion">
              <p className="t-eyebrow text-sindoor">{j.eyebrow}</p>
              <p className="mt-2 font-display font-bold">{j.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{j.botDoes[4]}</p>
              <span className="t-data mt-3 inline-block text-sindoor group-hover:underline">See the job</span>
            </Link>
          ))}
        </div>
        {siblings.length > 0 && (
          <p className="t-caption mt-8 text-iron">
            Also in {page.eyebrow.toLowerCase()}:{' '}
            {siblings.map((s, i) => (
              <span key={s.slug}>
                <Link href={`/integrations/${s.slug}`} className="text-sindoor hover:underline">{s.name}</Link>
                {i < siblings.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        )}
      </Section>

      <Section surface="canvas" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`Connecting ${page.name}`} />
        <div className="mt-8"><FaqList faqs={page.faqs} /></div>
      </Section>

      <FinalCta title={`Connect ${page.name} on your first call.`} sub="Start free, place a browser test call, and watch the outcome land." />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Integrations', path: '/integrations' },
            { name: page.name, path: `/integrations/${page.slug}` },
          ]),
          faqSchema(page.faqs),
        ]}
      />
    </>
  );
}
