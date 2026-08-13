import type { Metadata } from 'next';
import { Container } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { trustStrip } from '@/data/features';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Book a Demo Call',
  description:
    'Book a demo and we’ll call you back with a live voice agent, in the Indian language you choose. See the transcript, recording, and QA score afterwards.',
  path: '/book-a-demo',
  ogTitle: 'We’ll call you back with a live agent',
});

export default function BookDemoPage() {
  return (
    <section className="bg-canvas" aria-label="Book a demo">
      <Container>
        <div className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(360px,520px)] lg:gap-16">
          <div>
            <p className="t-eyebrow text-sindoor">Book a demo</p>
            <h1 className="t-display mt-4 text-balance">
              The demo is a phone call, because the product is a phone call.
            </h1>
            <p className="t-body-lg mt-6 max-w-xl text-slate text-pretty">
              Tell us the language and the job. We’ll call you back with a live agent doing exactly
              that, then send you the transcript, the recording, and the QA score.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                'A real call, not a screen share of a dashboard',
                'In Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, English, French, Spanish, or Arabic',
                'Transcript, recording, and QA score sent afterwards',
                'Pricing run against your actual call volume',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem]">
                  <span aria-hidden="true" className="text-vermilion">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="t-data mt-10 text-iron">{trustStrip.join(' · ')}</p>
          </div>

          <div>
            <LeadForm variant="demo" />
          </div>
        </div>
      </Container>
    </section>
  );
}
