import type { Metadata } from 'next';
import { Container } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Questions about Decibyl, pricing, integrations, or data handling? We reply within one business day.',
  path: '/contact',
  ogTitle: 'Talk to us',
});

export default function ContactPage() {
  return (
    <section className="bg-canvas" aria-label="Contact">
      <Container>
        <div className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(340px,520px)] lg:gap-16">
          <div>
            <p className="t-eyebrow text-sindoor">Contact</p>
            <h1 className="t-display mt-4 text-balance">Ask us something specific.</h1>
            <p className="t-body-lg mt-6 max-w-xl text-slate text-pretty">
              Integration questions, data handling, procurement paperwork, or whether we can do the
              thing you have in mind. We reply within one business day.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="t-eyebrow text-iron">Email</dt>
                <dd className="mt-1">
                  <a
                    className="text-[1.0625rem] text-vermilion underline-offset-4 hover:underline"
                    href={`mailto:${site.supportEmail}`}
                  >
                    {site.supportEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-eyebrow text-iron">Company</dt>
                <dd className="mt-1 text-[1.0625rem]">{site.legalName}</dd>
              </div>
              <div>
                <dt className="t-eyebrow text-iron">Data residency</dt>
                <dd className="mt-1 text-[1.0625rem]">India · AWS Mumbai (ap-south-1)</dd>
              </div>
            </dl>
          </div>

          <div>
            <LeadForm variant="contact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
