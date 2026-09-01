import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { CinematicIntro } from '@/components/story/CinematicIntro';
import { ScrollStory } from '@/components/story/ScrollStory';
import { storyActTotal } from '@/components/story/acts';
import { LiveTranscript } from '@/components/marketing/LiveTranscript';
import { SlideDeck, type DeckItem } from '@/components/marketing/SlideDeck';
import { LossCalculator } from '@/components/marketing/LossCalculator';
import { LanguageChips } from '@/components/marketing/Languages';
import { CaseStudiesSection } from '@/components/marketing/CaseStudies';
import { FaqList } from '@/components/marketing/Faq';
import { FinalCta, IndianOps, PricingPreview } from '@/components/marketing/Blocks';
import { InclusionTable } from '@/components/marketing/InclusionTable';
import { LivingProofWorld } from '@/components/marketing/LivingProofWorld';
import { verticals, homepageDeckOrder, verticalHref, getVertical } from '@/data/verticals';
import { features } from '@/data/features';
import { homeFaqs } from '@/data/faqs';
import { JsonLd, faqSchema, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'AI Voice Agents for Indian Businesses',
  description:
    'AI voice agents for Indian businesses: automate sales calls, lead qualification, customer support, appointment booking and reminders in Hindi, Tamil, English and more.',
  path: '/',
  keywords: [
    'AI voice agents for business',
    'AI voice agents India',
    'voice AI agent India',
    'AI calling software India',
    'AI receptionist India',
    'voice AI platform India',
    'Hindi voice AI agent',
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

/** Which verticals get a chapter in the opening story.
 *
 *  Three, not nine — the same standing rule the nav follows and for the same
 *  reason (see the note in `components/marketing/Nav.tsx`): nine verticals
 *  against three live pilots reads as "we do everything, we've proven
 *  nothing". Adding a fourth slug here grows the story by a chapter; nothing
 *  in the component is hard-coded to a count. */
const storyVerticalSlugs = ['clinics', 'real-estate', 'd2c-ndr-recovery'];

export default function HomePage() {
  const ndr = getVertical('d2c-ndr-recovery')!;

  const storyNeeds = storyVerticalSlugs.map((slug) => {
    const v = verticals.find((x) => x.slug === slug && !x.parent)!;
    return { id: v.slug, label: v.cardTitle, pain: v.cardPain, href: verticalHref(v) };
  });

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
      <CinematicIntro total={storyActTotal(storyNeeds)} />
      <ScrollStory
        needs={storyNeeds}
        call={{
          language: ndr.sampleCall.language,
          outcome: ndr.sampleCall.outcome,
          duration: ndr.sampleCall.duration,
        }}
        phone={site.demoPhone}
      />

      <LivingProofWorld />

      {/* Where "Skip the story" lands. */}
      <section
        aria-label="Sample call"
        className="scroll-mt-24 bg-canvas pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pb-24"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="t-eyebrow text-sindoor">A real call, start to finish</p>
              <h2 className="t-h2 mt-4 text-balance">
                This is what one recovered order sounds like.
              </h2>
              <p className="t-body-lg mt-4 text-slate text-pretty">
                A courier marked the delivery failed. The agent called the buyer in the register
                she actually speaks, confirmed she’d be home, confirmed the cash amount, and booked
                the reattempt. Forty-one seconds.
              </p>
              <p className="mt-4 text-slate">
                The outcome chip at the end is the point. Not that it can talk — that something
                happened.
              </p>
            </div>
            <LiveTranscript
              lines={ndr.sampleCall.lines}
              outcome={ndr.sampleCall.outcome}
              money="₹1,840 recovered"
              qaScore={ndr.sampleCall.qaScore}
              duration={ndr.sampleCall.duration}
              language={ndr.sampleCall.language}
            />
          </div>
        </Container>
      </section>

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
