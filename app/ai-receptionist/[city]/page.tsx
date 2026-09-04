import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { cities, cityLanguages, cityVerticals, getCity } from '@/data/cities';
import { verticalHref } from '@/data/verticals';
import { fromRateInr, tiers, tierPrice } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return pageMetadata({
    title: city.seo.title,
    description: city.seo.description,
    path: `/ai-receptionist/${city.slug}`,
    keywords: city.seo.keywords,
    ogTitle: `AI receptionist in ${city.name}`,
    ogSubtitle: cityLanguages(city)
      .map((l) => l.name)
      .join(' · '),
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const langs = cityLanguages(city);
  const verts = cityVerticals(city);
  const starter = tiers[0];

  const faqs = [
    {
      q: `Which languages does the agent speak in ${city.name}?`,
      a: `${langs.map((l) => l.name).join(', ')} — all live today, and code-mixed by default, so a caller switching between them mid-sentence is the normal case rather than a failure. Decibyl also speaks the other Indian languages on its list, plus any language its underlying voice stack supports.`,
    },
    {
      q: `Do I get a phone number in ${city.name}?`,
      a: `You get an Indian number with telephony included in the plan — no separate carrier account and no KYC of your own to arrange. Every managed plan includes at least one number; extra numbers are ₹559/month each. You can also forward an existing number to the agent and keep the number your customers already have.`,
    },
    {
      q: 'What does it cost?',
      a: `Plans start at ${tierPrice(starter, 'inr')}/month including the number and the telephony, with call credit included. Calling starts at ₹${fromRateInr.toFixed(2)}/min on the Everyday voice; how far your credit goes depends on which voice you choose. Prices are exclusive of 18% GST, billed in rupees with a GST-compliant invoice.`,
    },
    {
      q: 'Can it transfer to a person?',
      a: 'Yes. The agent hands off to a human when the call needs one — the point is to take the repetitive calls off your team, not to trap a caller with a machine that cannot help them.',
    },
    {
      q: 'Where is the call data stored?',
      a: `In India by default — AWS Mumbai, ap-south-1 — with US and EU infrastructure available for teams serving customers outside India. Every call is transcribed and recorded, and QA scoring can be run on all of them. Decibyl is not ISO 27001, SOC 2 or HIPAA certified, and says so plainly on its security page.`,
    },
  ];

  return (
    <>
      <section className="bg-canvas" aria-label={`AI receptionist in ${city.name}`}>
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex flex-wrap gap-2 text-iron">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/ai-receptionist" className="hover:text-ink">
                    AI receptionist
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">{city.name}</li>
              </ol>
            </nav>

            <p className="t-eyebrow mt-6 text-sindoor">
              {city.name} · {city.state}
            </p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              An AI receptionist for {city.name}, in the language your caller opens with
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{city.intro}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {langs.map((l) => (
                <span
                  key={l.code}
                  className="rounded-full border border-line bg-snow px-4 py-2 text-[0.9375rem]"
                >
                  <span className="font-indic">{l.native}</span>
                  <span className="text-iron"> · {l.name}</span>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel={`Calling in ${city.name}`}>
        <SectionHead
          eyebrow="What is different here"
          title={`Answering a phone in ${city.name}`}
          sub="Three things that decide whether an agent is usable in this city rather than merely available."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {city.notes.map((n) => (
            <div key={n.title} className="rounded-card border border-line bg-canvas p-7">
              <p className="font-display font-bold">{n.title}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">{n.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Where it earns its keep">
        <SectionHead
          eyebrow="Where it earns its keep"
          title={`The calls worth handing over in ${city.name}`}
          sub="Each of these has a page of its own that works through the economics properly, with your numbers rather than ours."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {verts.map((v) => (
            <Link
              key={v.slug}
              href={verticalHref(v)}
              className="group rounded-card border border-line bg-snow p-7 transition-colors hover:border-vermilion"
            >
              <p className="t-eyebrow text-sindoor">{v.cardTitle}</p>
              <p className="mt-3 font-display text-[1.15rem] font-bold">{v.name}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">{v.cardPain}</p>
              <span className="t-data mt-4 inline-block text-sindoor group-hover:underline">
                Read the full case
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`Starting in ${city.name}`} />
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
        <p className="t-caption mt-6 text-iron">
          Or just call the agent yourself: {site.demoPhone.display}. It picks up, and you choose the
          language when it answers.
        </p>
      </Section>

      <FinalCta
        title={`Hear it answer in ${langs[0].name}.`}
        sub="Book a demo and we'll call you back with a live agent, in the language you pick."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'AI receptionist', path: '/ai-receptionist' },
            { name: city.name, path: `/ai-receptionist/${city.slug}` },
          ]),
          faqSchema(faqs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `AI receptionist in ${city.name}`,
            serviceType: 'AI voice agent',
            provider: { '@type': 'Organization', name: site.legalName, url: site.url },
            areaServed: {
              '@type': 'City',
              name: city.name,
              containedInPlace: { '@type': 'AdministrativeArea', name: city.state },
            },
            availableLanguage: langs.map((l) => l.name),
            url: `${site.url}/ai-receptionist/${city.slug}`,
          },
        ]}
      />
    </>
  );
}
