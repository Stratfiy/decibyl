import type { Metadata } from 'next';
import { Container } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Book a Decibyl Demo',
  description:
    'Bring a real job you want to hand off. We’ll map the agent, context, tools, approvals and expected outcome — including voice when the job needs it.',
  path: '/book-a-demo',
  ogTitle: 'Bring us a job. We’ll show how Decibyl would handle it.',
});

export default function BookDemoPage() {
  return (
    <section className="bg-canvas" aria-label="Book a demo">
      <Container>
        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_minmax(360px,520px)] lg:gap-16">
          <div>
            <p className="t-eyebrow">Book a demo</p>
            <h1 className="t-display mt-4 text-balance">Bring us a job you want off your plate.</h1>
            <p className="t-body-lg mt-6 max-w-xl text-slate text-pretty">
              We’ll map how Decibyl would handle it: what the agent needs to know, which tools it should use, what can run automatically and where you should stay in control.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                'Start from the outcome, not a feature checklist',
                'Map the apps, documents and memory the agent needs',
                'Add routines, approvals and agent handoffs where useful',
                'Test voice live when a call is part of the job',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem]">
                  <span aria-hidden="true" className="text-ink">→</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-lg text-sm leading-relaxed text-slate">
              For self-serve use, you can also start directly in the app without booking a call.
            </p>
          </div>

          <div><LeadForm variant="demo" /></div>
        </div>
      </Container>
    </section>
  );
}
