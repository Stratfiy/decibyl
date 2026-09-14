import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { PricingTable } from '@/components/marketing/PricingTable';
import { PayAsYouGo } from '@/components/marketing/PayAsYouGo';
import { FaqList } from '@/components/marketing/Faq';
import { FinalCta } from '@/components/marketing/Blocks';
import {
  additionalNumberInr,
  advancedStack,
  bundles,
  cheapestBundle,
  creditUnit,
  firstVoiceTier,
  formatInr,
  freeCreditSteps,
  fromRateInr,
  fromRateNote,
  rateCard,
  textTier,
  tiers,
  voiceRateInr,
} from '@/data/pricing';
import { pricingFaqs } from '@/data/faqs';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';
import { RelatedPosts } from '@/components/marketing/RelatedPosts';

export const metadata: Metadata = pageMetadata({
  title: `AI Calling Agent Pricing India — from ₹${fromRateInr.toFixed(2)}/min`,
  description: `Plans from ${formatInr(textTier.priceInr)}/month for text channels and ${formatInr(firstVoiceTier.priceInr)}/month with a phone number. One credit is fifty paise, a voice minute is ${firstVoiceTier.voiceCreditsPerMinute} credits, and the charge for every event a bot performs is published. GST invoicing, top-ups that never expire.`,
  path: '/pricing',
  keywords: [
    'AI calling agent price India',
    'AI voice agent pricing India',
    'voice AI pricing India',
    'AI calling cost per minute India',
    'voicebot pricing India',
    'AI receptionist price India',
    'AI agent credits pricing',
  ],
  ogTitle: 'Published prices, in credits and rupees, with every charge stated',
});

const voiceTiers = tiers.filter((t) => t.voice);

export default function PricingPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="Pricing">
        <Container>
          <div className="pt-14 pb-10 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Pricing</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              One credit is fifty paise. Here is what every credit buys.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Most credit-priced products tell you how many credits a plan has and stop there. We
              publish the unit, the charge for every event a bot performs, the caps on every plan,
              and the top-up packs, because every receipt in the product already itemises it and a
              price you cannot check is a price you do not trust.
            </p>
            <p className="t-caption mt-4 text-iron">{fromRateNote}</p>
            <p className="t-caption mt-4 text-iron">
              Additional numbers {formatInr(additionalNumberInr)}/month each. Every voice plan
              includes at least one number with telephony.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="canvas" className="pt-0" ariaLabel="Plans">
        <PricingTable />
      </Section>

      {/* The unit */}
      <Section surface="white" ariaLabel="The credit">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="t-eyebrow text-sindoor">The unit</p>
            <h2 className="t-h2 mt-3 text-balance">{creditUnit.headline}</h2>
            <p className="t-body-lg mt-5 text-slate text-pretty">{creditUnit.body}</p>
          </div>
          <ul className="rounded-card border border-line bg-snow p-8 space-y-3">
            {creditUnit.rules.map((r) => (
              <li key={r} className="flex gap-3 text-[0.9375rem] text-slate">
                <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-vermilion" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Rate card */}
      <Section surface="canvas" ariaLabel="Rate card">
        <SectionHead
          eyebrow="Rate card"
          title="What each event costs, in credits"
          sub="The same table the product charges from. If a line here and a line on your receipt ever disagree, the receipt is wrong and we will fix it."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
            <thead>
              <tr className="border-b border-line text-iron">
                <th className="py-3 pr-6 font-medium">Event</th>
                <th className="py-3 pr-6 font-medium">Credits</th>
                <th className="py-3 font-medium">Detail</th>
              </tr>
            </thead>
            <tbody>
              {rateCard.map((line) => (
                <tr key={line.event} className="border-b border-line align-top">
                  <td className="py-4 pr-6 font-display font-bold">{line.event}</td>
                  <td className="t-data py-4 pr-6 whitespace-nowrap">{line.credits}</td>
                  <td className="py-4 text-slate">{line.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Voices */}
      <Section surface="white" ariaLabel="Voices">
        <SectionHead
          eyebrow="What sets the voice rate"
          title="Three voices. One has a flat rate, two are itemised."
          sub="The plan decides how many credits you have. The voice decides how many a minute costs."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {bundles.map((b) => (
            <div
              key={b.slug}
              className={`rounded-card p-7 ${
                b.slug === cheapestBundle.slug ? 'border-2 border-sindoor bg-snow' : 'border border-line bg-snow'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[1.15rem] font-bold">{b.label}</p>
                {b.slug === cheapestBundle.slug ? <span className="t-eyebrow text-sindoor">Start here</span> : null}
              </div>
              <p className="mt-3 text-[0.9375rem] text-slate">{b.blurb}</p>
              {b.flatRate ? (
                <ul className="t-data mt-5 space-y-1 text-ink">
                  {voiceTiers.map((t) => (
                    <li key={t.id}>
                      {t.name}: {t.voiceCreditsPerMinute} credits · ₹{voiceRateInr(t)?.toFixed(2)} a minute
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="t-data mt-5 text-ink">
                  Charged what the speech model cost, marked up, rounded up per call. Each component on the receipt.
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          {cheapestBundle.label} is where almost everyone should start: the best option we have on
          Indian languages, and the only voice with a flat rate. Move to Natural if the pause before
          the reply matters, and to Premium only when speech quality is the deciding factor.
        </p>
      </Section>

      {/* Top-ups */}
      <Section surface="canvas" ariaLabel="Top-ups">
        <PayAsYouGo />
      </Section>

      {/* Free */}
      <Section surface="white" ariaLabel="Free plan">
        <SectionHead
          eyebrow="Free"
          title="1,000 credits, earned in six steps"
          sub="No card. Each step lands its credits the moment it is done, so a working bot is funded before you decide anything."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {freeCreditSteps.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-canvas p-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="t-eyebrow text-sindoor">Step {i + 1}</p>
                <p className="t-data text-ink">{s.credits} credits</p>
              </div>
              <p className="mt-2 font-display font-bold">{s.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Advanced — the technical path, not the default */}
      <Section surface="canvas" ariaLabel="Choose your own stack">
        <div className="rounded-panel bg-ink p-8 text-white sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="t-eyebrow text-ember">{advancedStack.headline}</p>
              <h2 className="t-h2 mt-4">Pick the stack, not just the voice.</h2>
              <p className="t-body-lg mt-4 max-w-xl text-white/75">{advancedStack.body}</p>
              <p className="t-data mt-6 text-white/50">{advancedStack.providers.join(' · ')}</p>
            </div>
            <div className="rounded-card bg-white/5 p-7">
              <p className="t-eyebrow text-white/50">Who this is for</p>
              <p className="mt-3 text-[0.9375rem] text-white/80">
                Teams with an opinion about which model should answer the phone. If you would
                rather pick one card and get on with it, the three voices above do the choosing
                for you.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Pricing questions">
        <SectionHead eyebrow="Pricing FAQ" title="What the invoice actually looks like." />
        <div className="mt-10">
          <FaqList faqs={pricingFaqs} />
        </div>
      </Section>

      <Container>
        <RelatedPosts path="/pricing" />
      </Container>
      <FinalCta
        title="Want the arithmetic run on your volumes?"
        sub="Book a demo. We will price your actual call pattern rather than a plan name."
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
