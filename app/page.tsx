import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { HomeHero } from '@/components/marketing/HomeHero';
import { UseCaseCallStack } from '@/components/marketing/UseCaseCallStack';
import { SlideDeck, type DeckItem } from '@/components/marketing/SlideDeck';
import { LossCalculator } from '@/components/marketing/LossCalculator';
import { LanguageChips } from '@/components/marketing/Languages';
import { CaseStudiesSection } from '@/components/marketing/CaseStudies';
import { FaqList } from '@/components/marketing/Faq';
import { FinalCta, IndianOps, PricingPreview } from '@/components/marketing/Blocks';
import { InclusionTable } from '@/components/marketing/InclusionTable';
import { verticals, homepageDeckOrder, verticalHref, getVertical } from '@/data/verticals';
import { features } from '@/data/features';
import { homeFaqs } from '@/data/faqs';
import { JsonLd, faqSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'AI Voice Agents for Indian Businesses',
  description:
    'AI voice agents for Indian businesses — an AI calling agent that runs sales, support, appointment booking and reminder calls in Hindi, Tamil, English and more.',
  path: '/',
  keywords: [
    'AI voice agents for business',
    'AI voice agents India',
    'voice agent for business',
    'Indian voice agent',
    'voice AI agent India',
    'AI calling agent India',
    'AI calling software India',
    'voicebot India',
    'AI receptionist India',
    'voice AI platform India',
    'Hindi voice AI agent',
    'telecalling automation India',
  ],
  ogTitle: 'The AI voice worker that answers your phone',
  ogSubtitle: 'It calls, confirms, and closes — in the language your customer speaks.',
});

const painPoints = [
  {
    title: '“We’re on another call.”',
    body: 'Two lines, one receptionist. The second caller hears a ring tone and then dials your competitor. You never find out it happened.',
    surface: 'bg-peach',
  },
  {
    title: '“They called at 9pm.”',
    body: 'People decide to buy, book, or confirm when they’re free — evenings, Sundays, lunch breaks. Your team isn’t there. Voicemail doesn’t convert.',
    surface: 'bg-sage',
  },
  {
    title: '“Nobody followed up.”',
    body: 'The no-show who needed a reminder. The NDR order that needed one confirmation call. The portal lead that went cold in eleven minutes. Everyone agrees these calls matter. Nobody has time to make them.',
    surface: 'bg-sand',
  },
  {
    title: '“It’s in Tamil, half in English.”',
    body: 'Most Indian business calls are code-mixed. Agents built for clean English fall apart on the first sentence, and IVR trees make people press 0 for a human.',
    surface: 'bg-mistblue',
  },
];

export default function HomePage() {


  const useCaseCards: DeckItem[] = homepageDeckOrder.map((slug) => {
    const v = verticals.find((x) => x.slug === slug && !x.parent)!;
    return {
      id: v.slug,
      eyebrow: v.slug === 'd2c-ndr-recovery' ? 'Primary' : undefined,
      title: v.cardTitle,
      body: v.cardPain,
      meta: v.cardLanguages,
      indic: true,
      href: verticalHref(v),
      linkLabel: 'Explore',
    };
  });

  const featureCards: DeckItem[] = features.map((f) => ({
    id: f.title,
    eyebrow: f.eyebrow,
    title: f.title,
    body: f.body,
    meta: f.meta,
  }));

  return (
    <>
      <HomeHero />

      <UseCaseCallStack examples={[
        ['d2c-ndr-recovery', 'Order recovery', 'One call. A second chance to deliver.', 'Confirm the buyer’s availability, clarify COD details and arrange a delivery reattempt.'],
        ['clinics', 'Appointments', 'A booked appointment, without the hold music.', 'Answer patient enquiries, find an appointment slot and send the confirmation.'],
        ['real-estate', 'Lead qualification', 'From a new enquiry to a site visit.', 'Understand the buyer’s requirements, qualify their budget and book the next conversation.'],
        ['logistics', 'Delivery support', 'Get the details right. Get the delivery moving.', 'Resolve address questions and confirm the next delivery window with the customer.'],
        ['education', 'Admissions', 'Help the next student take the next step.', 'Answer course enquiries and book a counselling call with your admissions team.'],
      ].map(([slug,label,title,description]) => {
        const vertical = getVertical(slug)!;
        return { id: slug, label, title, description, href: verticalHref(vertical), call: vertical.sampleCall };
      })} />

      {/* Pain points */}
      <Section surface="canvas" ariaLabel="The problem">
        <SectionHead
          title="The call you didn’t answer was the sale."
          sub="Every business we work with is losing money in the same four places."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {painPoints.map((p) => (
            <li key={p.title} className={`rounded-card p-7 ${p.surface}`}>
              <h3 className="t-h3">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/75">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="t-data mt-8 text-slate">
          Every one of these is a phone call that either happened late, or didn’t happen.
        </p>
      </Section>

      {/* Use cases — SlideDeck */}
      <Section surface="canvas" ariaLabel="Use cases">
        <SlideDeck
          idPrefix="usecases"
          title="Where businesses lose calls"
          sub="Same engine. Different conversation."
          items={useCaseCards}
        />
      </Section>

      {/* Loss calculator */}
      <Section surface="canvas" ariaLabel="Loss calculator" id="calculator">
        <SectionHead
          eyebrow="Your numbers, not ours"
          title="We won’t quote you a statistic. Do the arithmetic yourself."
          sub="Move the sliders to match your business. Nothing here is our claim — every number below is yours."
        />
        <div className="mt-10">
          <LossCalculator variants={['clinic', 'd2c', 'realestate']} />
        </div>
      </Section>

      {/* Features — SlideDeck */}
      <Section surface="canvas" ariaLabel="Features">
        <SlideDeck
          idPrefix="features"
          title="What the agent actually does"
          sub="Inbound and outbound on the same agent, with the same record of every call."
          items={featureCards}
        />
      </Section>

      {/* What's actually included */}
      <Section surface="white" ariaLabel="What's actually included">
        <InclusionTable />
      </Section>

      {/* Languages */}
      <Section surface="canvas" ariaLabel="Languages" id="languages">
        <SectionHead
          eyebrow="Languages"
          title="Indian languages live today, and any language your stack speaks."
          sub="Hinglish and Tanglish aren’t an edge case we tolerate — code-mixed speech is the default register the agent is built for."
        />
        <div className="mt-9">
          <LanguageChips />
        </div>
      </Section>

      {/* Built for Indian operations */}
      <Section surface="white" ariaLabel="Built for Indian operations">
        <IndianOps />
      </Section>

      {/* Case studies */}
      <Section surface="white" ariaLabel="Case studies">
        <CaseStudiesSection />
      </Section>

      {/* Pricing preview */}
      <Section surface="white" ariaLabel="Pricing preview">
        <PricingPreview />
      </Section>

      {/* FAQ */}
      <Section surface="canvas" ariaLabel="Frequently asked questions">
        <SectionHead eyebrow="FAQ" title="The questions we get asked first." />
        <div className="mt-10">
          <FaqList faqs={homeFaqs} />
        </div>
      </Section>

      <FinalCta />

      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
