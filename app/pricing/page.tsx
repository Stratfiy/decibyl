import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { PricingTable } from '@/components/marketing/PricingTable';
import { FaqList } from '@/components/marketing/Faq';
import { FinalCta } from '@/components/marketing/Blocks';
import { byok } from '@/data/pricing';
import { pricingFaqs } from '@/data/faqs';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing — Voice AI in India, in Rupees',
  description:
    'Managed plans from ₹2,999/month with telephony included, or BYOK at $0.02/minute with zero markup on model costs. GST-compliant invoicing.',
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
              A blended per-minute rate hides the markup taken on model costs. We don’t take one.
              Managed plans include Indian telephony and phone numbers; BYOK is for teams who want
              to pay providers directly.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="canvas" className="pt-0" ariaLabel="Plans">
        <PricingTable />
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
