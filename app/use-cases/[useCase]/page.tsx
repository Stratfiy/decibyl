import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { FaqList } from '@/components/marketing/Faq';
import { FinalCta } from '@/components/marketing/Blocks';
import { getUseCase, useCases } from '@/data/useCases';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map((item) => ({ useCase: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ useCase: string }> }): Promise<Metadata> {
  const { useCase: slug } = await params;
  const item = getUseCase(slug);
  if (!item) return {};
  return pageMetadata({ title: item.seo.title, description: item.seo.description, path: `/use-cases/${item.slug}`, keywords: item.seo.keywords, ogTitle: item.h1, ogSubtitle: item.eyebrow });
}

export default async function UseCasePage({ params }: { params: Promise<{ useCase: string }> }) {
  const { useCase: slug } = await params;
  const item = getUseCase(slug);
  if (!item) notFound();

  return (
    <>
      <section className="bg-canvas" aria-label={item.name}>
        <Container>
          <div className="pt-12 pb-14 sm:pt-20">
            <nav aria-label="Breadcrumb"><ol className="t-data flex gap-2 text-iron"><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/use-cases">Use cases</Link></li><li aria-hidden="true">/</li><li className="text-slate">{item.name}</li></ol></nav>
            <p className="t-eyebrow mt-6 text-sindoor">{item.eyebrow}</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">{item.h1}</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{item.description}</p>
            <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href={`/book-a-demo?useCase=${item.slug}`} size="lg">Book a workflow demo</ButtonLink><ButtonLink href="/pricing" variant="secondary" size="lg">See pricing</ButtonLink></div>
          </div>
        </Container>
      </section>

      <Section surface="canvas" ariaLabel="Business problems">
        <SectionHead title="Why this workflow breaks when it stays manual" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">{item.problems.map((problem, index) => <article key={problem.title} className={`rounded-card p-7 ${['bg-peach','bg-sage','bg-sand'][index]}`}><h2 className="t-h3">{problem.title}</h2><p className="mt-3 text-[0.9375rem] text-ink/75">{problem.body}</p></article>)}</div>
      </Section>

      <Section surface="white" ariaLabel="Workflow">
        <SectionHead eyebrow="Decision flow" title="From trigger to structured outcome" sub="The input, permitted decisions, transfer rules and writeback fields are defined before the agent handles production calls." />
        <ol className="mt-10 grid gap-5 md:grid-cols-2">{item.workflow.map((step, index) => <li key={step.title} className="rounded-card border border-line p-7"><p className="t-data text-sindoor">0{index + 1}</p><h2 className="t-h3 mt-3">{step.title}</h2><p className="mt-3 text-slate">{step.body}</p></li>)}</ol>
      </Section>

      <Section surface="canvas" ariaLabel="Example call">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="t-eyebrow text-sindoor">Illustrative call</p><h2 className="t-h2 mt-3">One conversation, one next action</h2><p className="t-caption mt-4 text-iron">This illustrates the workflow and output format; it is not presented as a customer recording.</p></div><div className="rounded-panel bg-ink p-7 text-white"><p><span className="t-data text-white/60">Caller</span><br />{item.example.caller}</p><p className="mt-5"><span className="t-data text-white/60">Agent</span><br />{item.example.agent}</p><p className="mt-6 rounded-card bg-white/10 p-4"><span className="t-data text-white/60">Structured result</span><br />{item.example.result}</p></div></div>
      </Section>

      <Section surface="white" ariaLabel="Outcomes">
        <SectionHead title="Outcomes your systems can act on" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{item.outcomes.map((outcome) => <li key={outcome} className="rounded-card border border-line bg-canvas p-5">{outcome}</li>)}</ul>
      </Section>

      <Section surface="canvas" ariaLabel="Industries and languages">
        <SectionHead eyebrow="Connected architecture" title="Use the workflow inside the industry—not as a generic script" sub={<>See how it fits the relevant industry, then review <Link className="text-sindoor underline" href="/voice-ai">Hindi, Tamil, Telugu and other Indian-language voice agents</Link>.</>} />
        <div className="mt-8 flex flex-wrap gap-3">{item.industries.map((industry) => <Link key={industry.href} href={industry.href} className="rounded-button border border-line bg-snow px-5 py-3 hover:border-vermilion">{industry.label} →</Link>)}</div>
      </Section>

      <Section surface="white" ariaLabel="Questions"><SectionHead title="Questions teams ask before deployment" /><div className="mt-8"><FaqList faqs={item.faqs} /></div></Section>
      <FinalCta title="Test the workflow with a live call." sub="Bring the trigger, questions, transfer rule and outcome you need. We’ll show how the call reaches the next action." primary={{ label: 'Book a workflow demo', href: `/book-a-demo?useCase=${item.slug}` }} />
      <JsonLd data={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Use cases', path: '/use-cases' }, { name: item.name, path: `/use-cases/${item.slug}` }]), faqSchema(item.faqs)]} />
    </>
  );
}
