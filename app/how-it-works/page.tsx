import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'How Decibyl Works — Give AI a Job',
  description:
    'Tell Decibyl what needs doing, connect the context and tools it needs, then let the agent work with approvals where they matter.',
  path: '/how-it-works',
  keywords: ['how AI agents work', 'AI agent setup', 'AI agents for work', 'agent automation'],
  ogTitle: 'Start with the job. Decibyl handles the setup underneath.',
});

const steps = [
  {
    number: '01',
    title: 'Tell it what needs doing.',
    body: 'Start in plain language. Describe the job, the result you want and any limits that matter. You do not need to begin with a workflow diagram.',
  },
  {
    number: '02',
    title: 'Give it the context and tools it needs.',
    body: 'Connect documents, apps, channels and knowledge. Decibyl can use those tools while keeping access scoped to the job.',
  },
  {
    number: '03',
    title: 'Let it work. Review the important parts.',
    body: 'Run the job now, on a schedule or when something happens. Sensitive actions can wait for your approval while routine work keeps moving.',
  },
];

const capabilities = [
  ['Talk', 'Voice, chat, WhatsApp and email when the job involves people.'],
  ['Remember', 'Keep useful context about people, decisions, preferences and documents.'],
  ['Use apps', 'Read connected systems, use APIs and trigger workflows.'],
  ['Run again', 'Turn repeat work into routines, schedules and event-driven jobs.'],
  ['Work together', 'Let specialist agents hand parts of a larger job to each other.'],
  ['Ask first', 'Require approval before important writes or consequential actions.'],
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="How Decibyl works">
        <Container className="relative">
          <div className="pt-16 pb-14 sm:pt-24 sm:pb-20">
            <p className="t-eyebrow">How it works</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">Start with the job, not the setup.</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Tell Decibyl what you want done. It turns that into an agent with the right context, tools and controls underneath.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={site.external.signup} size="lg">Get started</ButtonLink>
              <ButtonLink href="/platform" variant="secondary" size="lg">See everything it can do</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="Three steps">
        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="rounded-card border border-line bg-white p-7 sm:p-8">
              <p className="t-eyebrow">{step.number}</p>
              <h2 className="t-h3 mt-5">{step.title}</h2>
              <p className="mt-4 text-slate">{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Capabilities">
        <SectionHead
          eyebrow="Under the hood"
          title="Simple to ask. Powerful when the job needs more."
          sub="Add only what the job needs. Voice is one skill. Memory is context. Apps are tools. Routines decide when work runs."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([title, body]) => (
            <article key={title} className="rounded-card border border-line bg-white p-6">
              <h3 className="t-h3">{title}</h3>
              <p className="mt-3 text-sm text-slate">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Memory">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="t-eyebrow">Gets smarter as it works</p>
            <h2 className="t-h2 mt-4">The next job can start with more context.</h2>
            <p className="t-body-lg mt-5 text-slate">
              Decibyl can bring back useful facts from previous work instead of making every agent start from zero. Correct the context when something changes.
            </p>
            <Link href="/knowledge" className="mt-6 inline-flex font-semibold text-ink underline underline-offset-4">Explore memory →</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['People and relationships', 'Decisions and changes', 'Preferences and ways of working', 'Documents and important facts'].map((item) => (
              <div key={item} className="rounded-card border border-line bg-canvas p-5 text-sm font-semibold text-ink">{item}</div>
            ))}
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Voice">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="t-eyebrow">When the job needs a conversation</p>
            <h2 className="t-h2 mt-4">Agents can call too.</h2>
            <p className="t-body-lg mt-5 text-slate">Use voice for inbound support, follow-ups, verification, bookings and other jobs where a conversation is the fastest interface.</p>
          </div>
          <div className="rounded-card bg-ink p-7 text-white">
            <p className="text-sm font-semibold">Answer call → check context → resolve → update system</p>
            <p className="mt-3 text-sm text-white/60">Multilingual · transfers · DTMF · transcripts · structured outcomes</p>
          </div>
        </div>
      </Section>

      <section className="bg-ink py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <p className="t-eyebrow text-white/50">Start with something real</p>
            <h2 className="t-h2 mt-4 text-white">What would you hand off first?</h2>
            <p className="mt-5 text-white/65">Pick one useful job. Connect what it needs. Let Decibyl prove itself there first.</p>
            <div className="mt-8"><ButtonLink href={site.external.signup} size="lg">Get started</ButtonLink></div>
          </div>
        </Container>
      </section>

      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How it works', path: '/how-it-works' }])} />
    </>
  );
}
