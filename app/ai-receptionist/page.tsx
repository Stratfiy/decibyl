import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { cities, cityLanguages } from '@/data/cities';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

/**
 * The parent for `/ai-receptionist/[city]`.
 *
 * A set of city pages with no hub is the mistake `/compare` was making: the
 * pages pass no authority to each other, and nothing is positioned for the
 * term without a city attached.
 */

export const metadata: Metadata = pageMetadata({
  title: 'AI Receptionist & AI Calling Agent for Indian Businesses',
  description:
    'An AI voice agent that answers your phone in the language your caller opens with — Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati and English, code-mixed by default. Indian numbers, INR billing, GST invoice.',
  path: '/ai-receptionist',
  keywords: [
    'AI receptionist India',
    'AI phone answering India',
    'AI call answering service India',
    'virtual receptionist India',
    'AI calling agent India',
    'AI telecalling agent India',
  ],
  ogTitle: 'An AI receptionist that speaks your caller’s language',
  ogSubtitle: 'Eight cities, seven Indian languages, one phone number',
});

export default function ReceptionistHub() {
  return (
    <>
      <section className="bg-canvas" aria-label="AI receptionist">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex gap-2 text-iron">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">AI receptionist</li>
              </ol>
            </nav>

            <h1 className="t-display mt-6 max-w-4xl text-balance">
              An AI receptionist that answers in the language your caller opens with
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Not a menu. Not &ldquo;press 1 for Hindi&rdquo;. The caller talks, and the agent
              keeps up — including when they switch language halfway through a sentence, which in
              most of India is simply how people speak. Every call is transcribed, recorded and
              scored, and the number is an Indian one with telephony included.
            </p>
            <p className="t-caption mt-4 text-iron">
              Try it before reading any further: {site.demoPhone.display} is a live number answered
              by one of these agents.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="Cities">
        <SectionHead
          eyebrow="By city"
          title="Where the language mix changes the answer"
          sub="These pages differ because the callers do. A Bangalore line takes five languages; a Chennai line is Tamil and Tanglish; an Ahmedabad line is Gujarati. Same product, genuinely different problem."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/ai-receptionist/${c.slug}`}
              className="group rounded-card border border-line bg-canvas p-6 transition-colors hover:border-vermilion"
            >
              <p className="font-display text-[1.15rem] font-bold">{c.name}</p>
              <p className="t-data mt-1 text-iron">{c.state}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">
                {cityLanguages(c)
                  .map((l) => l.name)
                  .join(' · ')}
              </p>
            </Link>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          Somewhere else in India? The agent works anywhere an Indian number reaches — these are
          the cities we have written up, not the ones we serve.
        </p>
      </Section>

      <FinalCta
        title="Give it your hardest caller."
        sub="Book a demo and we'll call you back with a live agent, in the language you pick."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'AI receptionist', path: '/ai-receptionist' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'AI receptionist by city',
            itemListElement: cities.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `AI receptionist in ${c.name}`,
              url: `${site.url}/ai-receptionist/${c.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
