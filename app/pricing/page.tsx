import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { PricingTable } from '@/components/marketing/PricingTable';
import { PayAsYouGo } from '@/components/marketing/PayAsYouGo';
import { FaqList } from '@/components/marketing/Faq';
import { FinalCta } from '@/components/marketing/Blocks';
import {
  additionalNumberInr,
  bundles,
  byok,
  cheapestBundle,
  dearestBundle,
  formatInr,
  fromRateInr,
  fromRateNote,
} from '@/data/pricing';
import { pricingFaqs } from '@/data/faqs';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing — Voice AI in India, in Rupees',
  description:
    'Managed plans from ₹2,999/month with telephony and Indian phone numbers included. Three voice bundles starting at ₹4.91/min, credits with no commitment, or BYOK at $0.02/minute with zero markup on model costs. GST-compliant invoicing.',
  path: '/pricing',
  keywords: [
    'voice AI pricing India',
    'AI calling cost per minute India',
    'voice agent pricing INR',
    'AI receptionist price India',
  ],
  ogTitle: 'Published prices, in rupees, with the GST line stated',
});

export default function PricingPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="Pricing">
        <Container>
          <div className="pt-14 pb-10 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Pricing</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              A platform fee you can read, and the provider cost shown separately.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Most platforms quote a rate. Here&rsquo;s what the rate has to cover: the number, the
              telephony, the agent build, QA scoring on every call, and India data residency —
              included, not itemised extras. Credits are below if you would rather not commit to a
              plan, and BYOK is for teams who want to pay providers directly.
            </p>
            <p className="t-caption mt-4 text-iron">
              Three voice bundles — Everyday, Natural and Premium — starting at ₹
              {fromRateInr.toFixed(2)}/min.
            </p>
            <p className="t-caption mt-4 text-iron">
              Additional numbers {formatInr(additionalNumberInr)}/month each — every plan includes
              at least one number with telephony.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="canvas" className="pt-0" ariaLabel="Plans">
        <PricingTable />
      </Section>

      {/* The bundles. This is the half of the pricing story that makes the
          minute range on the table above legible: the plan sets the credit,
          the bundle sets how fast it is spent. */}
      <Section surface="white" ariaLabel="Voice bundles">
        <SectionHead
          eyebrow="What sets the rate"
          title="Three voices to build your agent on"
          sub="Your plan decides how much credit you get. The voice you pick decides how far it goes — it is the single biggest factor in your bill, so it is on the price page rather than buried in the product."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {bundles.map((b) => (
            <div
              key={b.slug}
              className={`rounded-card p-7 ${
                b.slug === cheapestBundle.slug
                  ? 'border-2 border-sindoor bg-snow'
                  : 'border border-line bg-snow'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[1.15rem] font-bold">{b.label}</p>
                {b.slug === cheapestBundle.slug ? (
                  <span className="t-eyebrow text-sindoor">Start here</span>
                ) : null}
              </div>
              <p className="mt-3 text-[0.9375rem] text-slate">{b.blurb}</p>
            </div>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          {cheapestBundle.label} is where almost everyone should start — it is the best option we
          have on Indian languages as well as the cheapest a minute. {dearestBundle.label} is for
          when speech quality is genuinely the deciding factor, and costs several times as much a
          minute, which is why the included-calling figures above are a range rather than one
          number. {fromRateNote}
        </p>
      </Section>

      {/* Credits — no commitment, charged per model, no prepay rate card */}
      <Section surface="white" ariaLabel="Credits">
        <PayAsYouGo />
      </Section>

      {/* BYOK — the technical/agency path, not the default */}
      <Section surface="white" ariaLabel="Bring your own keys">
        <div className="rounded-panel bg-ink p-8 text-white sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="t-eyebrow text-ember">{byok.headline}</p>
              <h2 className="t-h2 mt-4">
                ${byok.perMinuteUsd.toFixed(2)}
                <span className="t-data ml-1 font-normal text-white/60">per minute, platform fee</span>
              </h2>
              <p className="t-body-lg mt-4 max-w-xl text-white/75">{byok.body}</p>
              <p className="t-data mt-6 text-white/50">
                Bring {byok.providers.join(', ')} · ${byok.trialCreditUsd} trial credit at signup
              </p>
            </div>
            <div className="rounded-card bg-white/5 p-7">
              <p className="t-eyebrow text-white/50">Who this is for</p>
              <p className="mt-3 text-[0.9375rem] text-white/80">
                Agencies running client accounts, and technical teams that already hold provider
                contracts. If you want telephony, numbers, and setup handled for you, the managed
                plans above are the better fit.
              </p>
            </div>
          </div>
        </div>

        <p className="t-body-lg mt-10 max-w-3xl text-ink">
          A blended per-minute rate hides the model markup. We charge a platform fee and show you
          the provider cost separately.
        </p>
      </Section>

      <Section surface="canvas" ariaLabel="Pricing questions">
        <SectionHead eyebrow="Pricing FAQ" title="What the invoice actually looks like." />
        <div className="mt-10">
          <FaqList faqs={pricingFaqs} />
        </div>
      </Section>

      <FinalCta
        title="Want the arithmetic run on your volumes?"
        sub="Book a demo. We’ll price your actual call pattern rather than a plan name."
        secondary={{ label: 'Compare with Vapi', href: '/compare/vapi' }}
      />

      <JsonLd
        data={[
          faqSchema(pricingFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
        ]}
      />
    </>
  );
}
