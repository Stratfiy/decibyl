import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import {
  getLanguagePageBySlug,
  languagePages,
  languageRecord,
  languageSlug,
} from '@/data/languagePages';
import { getCity } from '@/data/cities';
import { fromRateInr, tiers, tierPrice } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return languagePages.map((p) => ({ language: languageSlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}): Promise<Metadata> {
  const { language: slug } = await params;
  const page = getLanguagePageBySlug(slug);
  if (!page) return {};
  const record = languageRecord(page);

  return pageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/voice-ai/${languageSlug(page)}`,
    keywords: page.seo.keywords,
    ogTitle: `${record?.name} voice AI`,
    ogSubtitle: page.hardPart.title,
  });
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language: slug } = await params;
  const page = getLanguagePageBySlug(slug);
  if (!page) notFound();

  const record = languageRecord(page);
  if (!record) notFound();

  const cities = page.cities.map((s) => getCity(s)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const starter = tiers[0];
  const isCheapStack = page.code === 'hi' || page.code === 'en';

  const faqs = [
    {
      q: `Does the agent really speak ${record.name}, or is it translating?`,
      a: `It speaks it. ${record.name} runs on a speech stack trained on Indian languages rather than a general multilingual model with ${record.name} in its list${record.codeMixed ? `, and ${record.codeMixed} — mixing with English inside a sentence — is the default register rather than a mode you switch on` : ', and mixing with English inside a sentence is the default register rather than a mode you switch on'}.`,
    },
    {
      q: `Can one agent handle ${record.name} and other languages on the same number?`,
      a: 'Yes, and it should. The agent does not ask a caller to choose a language before it will listen, and it follows a caller who switches mid-call. All seven Indian languages are live on the same line, plus any language the underlying voice stack supports.',
    },
    {
      q: `What does a ${record.name} call cost?`,
      a: isCheapStack
        ? `${record.name} runs on the cheapest speech stack we have, so credit goes further here than on a regional-language line. Plans start at ${tierPrice(starter, 'inr')}/month with the number and telephony included, and calling starts at ₹${fromRateInr.toFixed(2)}/min on the Everyday voice. Exclusive of 18% GST.`
        : `${record.name} runs on the regional speech stack, which costs more per minute than Hindi or English — so the same credit buys fewer ${record.name} minutes, and our pricing page shows included calling as a range rather than one number for exactly that reason. Plans start at ${tierPrice(starter, 'inr')}/month with the number and telephony included. Exclusive of 18% GST.`,
    },
    {
      q: 'Is the call recorded and transcribed?',
      a: 'Every call, with a QA score on all of them rather than a sample. Data is resident in India by default — AWS Mumbai, ap-south-1 — with US and EU available for teams serving customers outside India.',
    },
  ];

  return (
    <>
      <section className="bg-canvas" aria-label={`${record.name} voice AI`}>
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
                  <Link href="/voice-ai" className="hover:text-ink">
                    Voice AI by language
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">{record.name}</li>
              </ol>
            </nav>

            <p className="t-eyebrow mt-6 text-sindoor">
              <span className="font-indic">{record.native}</span>
              {record.codeMixed ? ` · ${record.codeMixed}` : ''}
            </p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              {record.name} AI voice agent for real business calls
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{page.why}</p>
          </div>
        </Container>
      </section>

      {/* The differentiating block: what is genuinely hard about this language */}
      <Section surface="white" ariaLabel="The hard part">
        <div className="max-w-3xl">
          <p className="t-eyebrow text-sindoor">The hard part</p>
          <h2 className="t-h2 mt-3 text-balance">{page.hardPart.title}</h2>
          <p className="t-body-lg mt-5 text-slate text-pretty">{page.hardPart.body}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {page.points.map((p) => (
            <div key={p.title} className="rounded-card border border-line bg-canvas p-7">
              <p className="font-display font-bold">{p.title}</p>
              <p className="mt-3 text-[0.9375rem] text-slate">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {cities.length ? (
        <Section surface="canvas" ariaLabel="Where this language leads">
          <SectionHead
            eyebrow="Where it leads"
            title={`Cities where ${record.name} is the first language on the line`}
            sub="Each of these pages covers the full language mix a caller there actually uses."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/ai-receptionist/${c.slug}`}
                className="group rounded-card border border-line bg-snow p-7 transition-colors hover:border-vermilion"
              >
                <p className="font-display text-[1.15rem] font-bold">{c.name}</p>
                <p className="t-data mt-1 text-iron">{c.state}</p>
                <span className="t-data mt-4 inline-block text-sindoor group-hover:underline">
                  AI receptionist in {c.name}
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <Section surface="white" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`${record.name} on a real phone line`} />
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
        <p className="t-caption mt-6 text-iron">
          Or hear it: {site.demoPhone.display} is a live number answered by one of these agents,
          and you pick the language when it answers.
        </p>
      </Section>

      <FinalCta
        title={`Hear it answer in ${record.name}.`}
        sub="Book a demo and we'll call you back with a live agent, in the language you pick."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Voice AI by language', path: '/voice-ai' },
            { name: record.name, path: `/voice-ai/${languageSlug(page)}` },
          ]),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
