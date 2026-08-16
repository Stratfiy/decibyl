import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { FinalCta } from '@/components/marketing/Blocks';
import { ReferralCalculator } from '@/components/marketing/ReferralCalculator';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { referralProgram } from '@/data/referral';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Partners & Referrals — 20% of First Recharge',
  description:
    'Refer a business to Decibyl and earn 20% of their first recharge, paid the same billing cycle. Ongoing commission and reseller terms are agreed directly — built for agencies with client volume.',
  path: '/partners',
  keywords: [
    'voice AI referral program India',
    'AI agency partner program',
    'voice AI affiliate program',
  ],
  ogTitle: referralProgram.headline,
});

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="Partners and referrals">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <MeshBackground className="h-[560px] opacity-60" origin="top" />
        <Container className="relative">
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Partners & referrals</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">{referralProgram.headline}</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{referralProgram.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={referralProgram.applyCta.href} size="lg">
                {referralProgram.applyCta.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <Section surface="white" className="pt-0" ariaLabel="How it works">
        <SectionHead title="Three steps, no wholesale rate to negotiate." />
        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {referralProgram.howItWorks.map((step, i) => (
            <li key={step.title} className="rounded-card border border-line p-7">
              <p className="t-data text-iron">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="t-h3 mt-3 text-[1.0625rem]">{step.title}</h3>
              <p className="mt-2 text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Calculator */}
      <Section surface="canvas" ariaLabel="Earnings calculator">
        <ReferralCalculator />
      </Section>

      {/* Who this is for */}
      <Section surface="white" ariaLabel="Who this is for">
        <SectionHead eyebrow="Who this is for" title="Built for people with more than one lead to send." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {referralProgram.whoFor.map((item) => (
            <li key={item.title} className="rounded-card bg-snow p-7">
              <h3 className="t-h3 text-[1.0625rem]">{item.title}</h3>
              <p className="mt-2 text-slate">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Want more than a referral? */}
      <Section surface="canvas" ariaLabel="White-label reseller">
        <div className="rounded-panel border border-line bg-snow p-8 sm:p-10">
          <p className="t-eyebrow text-sindoor">Running client accounts, not just sending leads?</p>
          <h2 className="t-h2 mt-3 max-w-2xl">
            A white-label reseller tier — your brand, your pricing, your invoice — is coming.
          </h2>
          <p className="mt-4 max-w-2xl text-slate">
            If you want to run Decibyl under your own name for multiple clients rather than refer
            them to us directly, that&rsquo;s a different, deeper conversation. Wholesale rates and
            ongoing commission are set with you directly — they depend on your volume, your
            language mix, and how much of the account you want to own. Tell us what you&rsquo;re
            running today and we&rsquo;ll put real numbers in front of you.
          </p>
          <div className="mt-6">
            <Link
              href="/contact?topic=reseller"
              className="text-[0.9375rem] font-medium text-sindoor underline-offset-4 hover:underline"
            >
              Talk to us about reselling <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Section>

      <FinalCta
        title="Ready to send your first referral?"
        sub={referralProgram.applyCta.prompt}
        primary={{ label: referralProgram.applyCta.label, href: referralProgram.applyCta.href }}
        secondary={{ label: 'See published pricing', href: '/pricing' }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Partners & referrals', path: '/partners' },
        ])}
      />
    </>
  );
}
