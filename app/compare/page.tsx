import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { competitors } from '@/data/competitors';
import { formatInr, tiers } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

/**
 * The hub above the six /compare/[competitor] pages.
 *
 * Two jobs, and they pull in the same direction. For search it is the page
 * positioned on the head term the category actually types — "best AI voice
 * agent India", "Vapi alternative India" — which the individual pages cannot
 * hold because each is pinned to one rival. For answer engines it is the
 * shape most likely to be quoted: the whole landscape on one page, each row
 * naming who a competitor is genuinely best for.
 *
 * Nothing here may assert anything the detail pages do not already say. Every
 * line comes from data/competitors.ts, and the claims about rivals are their
 * own published positioning, compressed.
 */

const compareFaqs = [
  {
    q: 'Which AI voice agent platform is best in India?',
    a: 'It depends on what you are optimising for, and the honest answer is that no single platform wins every case. For raw voice quality, ElevenLabs leads. For enterprise certification and air-gapped deployment, Gnani. For contact-centre-scale outbound, SquadStack. For the largest developer ecosystem, Vapi. Decibyl is built for teams that need Indian languages with code-mixed speech as the default, Indian telephony and DIDs, INR billing with a GST invoice, and data resident in Mumbai — and want to see the model economics rather than a blended rate.',
  },
  {
    q: 'What is the best Vapi alternative for Indian companies?',
    a: 'Vapi is strong and well-supported, but it bills in USD without a GST invoice, runs in US and EU regions, and reaches Indian phone numbers through Twilio or Vonage with your own KYC. For an Indian team those three are usually the blockers rather than the voice quality. Decibyl, Bolna and Gnani are all India-built alternatives; which fits depends on whether you need self-serve speed, transparent economics, or enterprise certification.',
  },
  {
    q: 'Why do these comparisons name things competitors do better?',
    a: 'Because a comparison page that admits no weakness is not believed, and a technical buyer fact-checks it in thirty seconds. Every page here lists where the other platform is genuinely stronger, and every competitor figure is dated to when it was read on their own published pricing page. If one of them has changed, tell us and we will correct it.',
  },
  {
    q: 'Is Decibyl certified for SOC 2 or HIPAA?',
    a: 'No. Decibyl holds no ISO 27001, SOC 2 or HIPAA certification, and says so on its security page. If your procurement process requires one, Gnani is the platform on this page that holds them. Decibyl offers India data residency in AWS Mumbai, DPDP-aligned consent handling, encryption in transit and at rest, and per-call transcripts and recordings.',
  },
];

export const metadata: Metadata = pageMetadata({
  title: 'Best AI Voice Agent Platforms in India — Compared',
  description:
    'An honest side-by-side of six voice AI platforms serving India: Vapi, Bolna, Retell, SquadStack, ElevenLabs and Gnani. Who each is genuinely best for, what they charge, and where Decibyl fits.',
  path: '/compare',
  keywords: [
    'best AI voice agent India',
    'voice AI platform comparison India',
    'Vapi alternative India',
    'Bolna vs Decibyl',
    'AI calling platform India comparison',
  ],
  ogTitle: 'Voice AI platforms in India, compared',
  ogSubtitle: 'Six platforms, what each is best for, and where we fit',
});

export default function CompareHub() {
  const starter = tiers[0];

  return (
    <>
      <section className="bg-canvas" aria-label="Comparison hub">
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
                <li className="text-slate">Compare</li>
              </ol>
            </nav>

            <h1 className="t-display mt-6 max-w-4xl text-balance">
              Voice AI platforms serving India, compared honestly
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Six platforms, including three we would recommend over ourselves in specific cases.
              Each row says who that platform is genuinely best for. Every competitor figure was
              read on their own published pricing page, with the date it was read, and we correct
              anything that goes stale.
            </p>
            <p className="t-caption mt-4 text-iron">
              We are one of the seven. Judge the page by whether the other six are described
              fairly.
            </p>
          </div>
        </Container>
      </section>

      {/* The landscape — the citable block */}
      <Section surface="white" ariaLabel="The landscape">
        <SectionHead
          eyebrow="The landscape"
          title="Who each platform is actually for"
          sub="Compressed from each platform's own positioning. Follow a row for the full comparison, including where that platform beats us."
        />

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Voice AI platforms serving India and who each is best suited to
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="t-data py-3 pr-6 font-medium text-iron">
                  Platform
                </th>
                <th scope="col" className="t-data py-3 pr-6 font-medium text-iron">
                  Best for
                </th>
                <th scope="col" className="t-data py-3 font-medium text-iron">
                  Full comparison
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line bg-blush/40">
                <th scope="row" className="py-4 pr-6 align-top font-display font-bold">
                  Decibyl
                </th>
                <td className="py-4 pr-6 align-top text-[0.9375rem] text-slate">
                  Indian teams calling in Indian languages, paying in INR with a GST invoice, with
                  call data resident in Mumbai — and who want the model economics itemised rather
                  than blended into one rate.
                </td>
                <td className="py-4 align-top text-[0.9375rem]">
                  <Link href="/pricing" className="text-sindoor hover:underline">
                    See pricing
                  </Link>
                </td>
              </tr>
              {competitors.map((c) => (
                <tr key={c.slug} className="border-b border-line last:border-0">
                  <th scope="row" className="py-4 pr-6 align-top font-display font-bold">
                    {c.name}
                  </th>
                  <td className="py-4 pr-6 align-top text-[0.9375rem] text-slate">{c.bestFor}</td>
                  <td className="py-4 align-top text-[0.9375rem]">
                    <Link href={`/compare/${c.slug}`} className="text-sindoor hover:underline">
                      Decibyl vs {c.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Where we do not win */}
      <Section surface="canvas" ariaLabel="Where we lose">
        <SectionHead
          eyebrow="Where we lose"
          title="Three cases where we would point you elsewhere"
          sub="Said here rather than buried on a detail page, because it is the fastest way to tell whether the rest of this site is worth reading."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              name: 'Gnani.ai',
              slug: 'gnani',
              when: 'Your procurement requires certification',
              why: 'SOC 2, ISO 27001, GDPR, HIPAA and PCI DSS, with on-premises and air-gapped options. We hold none of those certifications and say so on our security page.',
            },
            {
              name: 'ElevenLabs',
              slug: 'elevenlabs',
              when: 'Voice quality is the deciding factor',
              why: 'Widely regarded as the quality leader, with expressive tone adaptation and native RAG. If the voice itself is the product, that is the trade worth making.',
            },
            {
              name: 'SquadStack',
              slug: 'squadstack',
              when: 'You are replacing a telecalling floor',
              why: 'Built for high-volume Indian sales and activation outreach at contact-centre scale, on a reported 600M+ minutes of Indian audio.',
            },
          ].map((x) => (
            <div key={x.slug} className="rounded-card border border-line bg-snow p-7">
              <p className="t-eyebrow text-sindoor">{x.when}</p>
              <p className="t-h3 mt-3 font-display text-[1.15rem] font-bold">{x.name}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">{x.why}</p>
              <Link
                href={`/compare/${x.slug}`}
                className="t-data mt-4 inline-block text-sindoor hover:underline"
              >
                Read the full comparison
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* What we are for */}
      <Section surface="white" ariaLabel="Where we win">
        <SectionHead
          eyebrow="Where we win"
          title="What the other six do not combine"
          sub="Any one of these exists elsewhere. The combination is the reason to look at us."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: 'Code-mixed by default',
              b: 'Hinglish and Tanglish are the normal register, not an edge case handled by a language flag. Seven Indian languages live.',
            },
            {
              t: 'Indian telephony included',
              b: 'Indian DIDs and Indian SIP trunking in the managed plans — no separate carrier account, no KYC of your own to arrange.',
            },
            {
              t: 'INR and a GST invoice',
              b: `Plans from ${formatInr(starter.priceInr as number)}/month, billed in rupees through Razorpay, with a GST-compliant invoice your finance team accepts.`,
            },
            {
              t: 'Economics you can see',
              b: 'Model costs shown separately with zero markup on BYOK, rather than blended into a single per-minute rate you cannot audit.',
            },
          ].map((x) => (
            <div key={x.t} className="rounded-card border border-line bg-canvas p-6">
              <p className="font-display font-bold">{x.t}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{x.b}</p>
            </div>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          Data resides in {site.regions.join(', ')} — Mumbai by default, with US and EU available
          for teams serving customers outside India.
        </p>
      </Section>

      <Section surface="canvas" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title="What buyers ask before choosing" />
        <div className="mt-8">
          <FaqList faqs={compareFaqs} />
        </div>
      </Section>

      <FinalCta
        title="Compare us on a real call, not a table."
        sub="Book a demo and we'll call you back with a live agent, in the language you pick."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
          ]),
          faqSchema(compareFaqs),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Voice AI platforms serving India',
            itemListElement: competitors.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `Decibyl vs ${c.name}`,
              url: `${site.url}/compare/${c.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
