import type { Metadata } from 'next';
import { Container } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { byok } from '@/data/pricing';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Join the Waitlist',
  description:
    'Get early access when self-serve signup opens. One email when it does, and nothing else.',
  path: '/waitlist',
  ogTitle: 'Early access when self-serve opens',
});

export default function WaitlistPage() {
  return (
    <section className="bg-canvas" aria-label="Join the waitlist">
      <Container>
        <div className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(340px,460px)] lg:gap-16">
          <div>
            <p className="t-eyebrow text-sindoor">Waitlist</p>
            <h1 className="t-display mt-4 text-balance">
              Self-serve is coming. Get in the first group.
            </h1>
            <p className="t-body-lg mt-6 max-w-xl text-slate text-pretty">
              Today we set up agents with you, because getting the script and the transfer rules
              right is most of whether it works. Self-serve signup is next, and this list gets it
              first.
            </p>
            <p className="mt-6 max-w-xl text-slate">
              In a hurry? <a className="text-sindoor underline-offset-4 hover:underline" href="/book-a-demo">Book a demo</a>{' '}
              instead — we can have an agent running on your number this week.
            </p>
            <p className="t-data mt-10 text-iron">
              BYOK opens with ${byok.trialCreditUsd} of trial credit.
            </p>
          </div>

          <div>
            <LeadForm variant="waitlist" />
          </div>
        </div>
      </Container>
    </section>
  );
}
