import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { useCases } from '@/data/useCases';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'AI Voice Agent Use Cases for Business',
  description: 'AI voice agent use cases for business: outbound sales, lead qualification, customer support, telecalling automation, follow-up and reminder calls.',
  path: '/use-cases',
  keywords: [
    'AI voice agent use cases',
    'voice agents for business',
    'voice agent for business',
    'AI calling automation India',
    'telecalling automation',
    'AI telecalling agent India',
    'contact centre automation India',
  ],
  ogTitle: 'AI voice agents that complete business workflows',
});

export default function UseCasesPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="AI voice agent use cases">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Use cases</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">AI voice agents for the calls that move work forward</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              A voice agent should not stop at conversation. It should qualify, resolve, confirm,
              schedule, transfer, or write the next action back to your business system.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="Business workflows">
        <SectionHead title="Choose the workflow, then make the outcome measurable" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {useCases.map((item) => (
            <Link key={item.slug} href={`/use-cases/${item.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-canvas p-7 transition-colors hover:border-vermilion">
              <p className="t-eyebrow text-sindoor">{item.eyebrow}</p>
              <h2 className="t-h3 mt-4">{item.name}</h2>
              <p className="mt-3 text-[0.9375rem] text-slate">{item.description}</p>
              <span className="t-data mt-auto pt-6 text-sindoor group-hover:underline">Explore the workflow →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Industry voice agents">
        <SectionHead eyebrow="By industry" title="Looking for an industry-specific voice agent?" sub="Our industry pages cover the scripts, constraints, systems and outcomes unique to each operating environment." />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-button border border-line bg-snow px-5 py-3 hover:border-vermilion" href="/solutions/clinics">Voice agents for clinics</Link>
          <Link className="rounded-button border border-line bg-snow px-5 py-3 hover:border-vermilion" href="/solutions/real-estate">Voice agents for real estate</Link>
          <Link className="rounded-button border border-line bg-snow px-5 py-3 hover:border-vermilion" href="/solutions/d2c-ndr-recovery">Voice agents for D2C</Link>
          <Link className="rounded-button border border-line bg-snow px-5 py-3 hover:border-vermilion" href="/solutions/lending-collections">Voice agents for collections</Link>
          <Link className="rounded-button border border-line bg-snow px-5 py-3 hover:border-vermilion" href="/solutions">All industries</Link>
        </div>
      </Section>

      <FinalCta />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Use cases', path: '/use-cases' }])} />
    </>
  );
}
