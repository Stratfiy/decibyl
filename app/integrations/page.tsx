import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { integrationPages, integrationStatusLabel } from '@/data/integrationPages';
import { integrations, statusLabel } from '@/data/integrations';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Decibyl Integrations: CRM, Calendar, WhatsApp',
  description:
    'Every system a Decibyl call reads from or writes to, each with its true status: webhooks, REST API, Google Calendar, Gmail, Sheets, n8n, WhatsApp, Zoho, HubSpot.',
  path: '/integrations',
  keywords: ['voice AI integrations', 'AI calling CRM integration', 'Decibyl integrations', 'voice bot Google Calendar Zoho HubSpot'],
});

export default function IntegrationsIndexPage() {
  const withPage = new Set(integrationPages.map((p) => p.name));
  const coming = integrations.filter((i) => !withPage.has(i.name));
  return (
    <>
      <section className="bg-canvas" aria-label="Integrations">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Your team does not change how it works</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              The call ends. The system your team already opens knows what happened.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Every connection below carries a status that is true today. Anything not built says so, and
              nothing here gets a page until it is. Under all of it sits a webhook: if your system accepts
              one, it works now.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="Connections with a page">
        <SectionHead
          eyebrow="Built"
          title="What moves, in which direction, and how to connect it"
          sub="Each page shows the flows, the three setup steps, and the jobs the connection usually serves."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {integrationPages.map((p) => {
            const chip = integrationStatusLabel(p);
            return (
              <Link
                key={p.slug}
                href={`/integrations/${p.slug}`}
                className="group rounded-card border border-line bg-canvas p-7 transition-colors hover:border-vermilion"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="t-eyebrow text-sindoor">{p.eyebrow}</p>
                  {chip && <span className="rounded-full border border-line px-2 py-0.5 t-data text-iron">{chip}</span>}
                </div>
                <p className="mt-3 font-display text-[1.15rem] font-bold">{p.name}</p>
                <p className="mt-3 text-[0.9375rem] text-slate">{p.flows[0].body}</p>
                <span className="t-data mt-4 inline-block text-sindoor group-hover:underline">Read the page</span>
              </Link>
            );
          })}
        </div>
      </Section>

      {coming.length > 0 && (
        <Section surface="canvas" ariaLabel="Not built yet">
          <SectionHead
            eyebrow="Not built yet"
            title="Listed so you do not have to ask"
            sub="These are on the plan and not in the product. Until one ships it has no page and no logo without this label."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {coming.map((i) => (
              <li key={i.name} className="rounded-full border border-line bg-snow px-4 py-2 text-[0.9375rem]">
                {i.name} <span className="text-iron">· {statusLabel[i.status] ?? 'Live'}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FinalCta title="Your system takes a webhook?" sub="Then it is integrated. Start free and post the first outcome today." />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Integrations', path: '/integrations' }])} />
    </>
  );
}
