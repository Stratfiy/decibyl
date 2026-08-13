import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { HowItWorks, IndianOps, FinalCta, Advantages } from '@/components/marketing/Blocks';
import { IntegrationsDeck } from '@/components/marketing/Integrations';
import { LanguageChips } from '@/components/marketing/Languages';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'How the AI Voice Worker Works — Setup, Numbers, Outcomes',
  description:
    'Describe the agent, connect a number, and calls run with transcripts, recordings, QA scores and outcomes written back. Forwarding, not porting.',
  path: '/how-it-works',
  keywords: ['how AI calling works', 'voice agent setup India', 'AI receptionist setup', 'AI voice worker India'],
  ogTitle: 'Describe the agent. Connect a number. Calls run.',
});

const detail = [
  {
    title: 'Setup is a conversation, not a configuration screen',
    body: 'We write the agent with you: what it says, what it must never say, when it hands the call to a person, and which language it opens in. For most businesses this is half a day, and there is no software for your team to learn.',
  },
  {
    title: 'Your number stays yours',
    body: 'Take a new Indian DID from us, or forward the number you already advertise. To be precise: this is call forwarding, not number porting. Indian mobile number portability does not support cloud telephony providers as recipient operators, so forwarding is the correct and only mechanism — and it means nothing you have printed goes out of date.',
  },
  {
    title: 'Inbound and outbound are the same agent',
    body: 'Answering the phone and making the follow-up call are the same job with the direction reversed. One agent, one script, one record of every call.',
  },
  {
    title: 'Every call leaves evidence',
    body: 'A transcript, a recording, a QA score, and a structured outcome — pushed to your system rather than waiting in a dashboard nobody opens.',
  },
  {
    title: 'A human is always one condition away',
    body: 'You configure what triggers a transfer and the number it goes to. Distress, a dispute, anything clinical, or the caller simply asking for a person.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="How it works">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <MeshBackground className="h-[520px] opacity-60" origin="top" />
        <Container className="relative">
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">How it works</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              Describe the agent. Connect a number. The calls run.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              There are three steps and they genuinely are a sequence. Everything below is what
              happens inside them.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="canvas" className="pt-0" ariaLabel="The three steps">
        <HowItWorks />
      </Section>

      <Section surface="white" ariaLabel="Detail">
        <SectionHead title="The parts people ask about" />
        <ul className="mt-10 grid gap-5 lg:grid-cols-2">
          {detail.map((d) => (
            <li key={d.title} className="rounded-card border border-line p-7">
              <h3 className="t-h3">{d.title}</h3>
              <p className="mt-3 text-slate">{d.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="canvas" ariaLabel="Languages">
        <SectionHead
          eyebrow="Languages"
          title="Indian languages live today, plus the mixed register most people actually use."
        />
        <div className="mt-9">
          <LanguageChips />
        </div>
      </Section>

      <Section surface="white" ariaLabel="Integrations">
        <IntegrationsDeck />
      </Section>

      <Section surface="canvas" ariaLabel="Why the economics work">
        <Advantages />
      </Section>

      <Section surface="white" ariaLabel="Built for Indian operations">
        <IndianOps />
      </Section>

      <FinalCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'How it works', path: '/how-it-works' },
        ])}
      />
    </>
  );
}
