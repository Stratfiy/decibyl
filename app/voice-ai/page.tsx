import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { languagePages, languageRecord, languageSlug } from '@/data/languagePages';
import { languages } from '@/data/languages';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Multilingual AI Voice Agents for Indian Languages',
  description:
    'Multilingual AI voice agents in Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati and Indian English—built for code-mixed business calls in India.',
  path: '/voice-ai',
  keywords: [
    'Indian language voice AI',
    'voice AI Hindi Tamil Telugu',
    'code-mixed voice agent',
    'Indic speech AI',
  ],
  ogTitle: 'Voice AI in Indian languages',
  ogSubtitle: 'Seven languages, code-mixed by default',
});

/** The three that run on the underlying voice stack without a custom
 *  code-mixed register — listed honestly, but without a page each. */
const beyondIndic = languages.filter((l) => ['fr', 'es', 'ar'].includes(l.code));

export default function LanguageHub() {
  return (
    <>
      <section className="bg-canvas" aria-label="Voice AI by language">
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
                <li className="text-slate">Voice AI by language</li>
              </ol>
            </nav>

            <h1 className="t-display mt-6 max-w-4xl text-balance">
              Multilingual AI voice agents for Indian languages
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Most platforms list Indian languages as a checkbox. The interesting question is not
              whether a vendor supports Tamil — it is whether they can say what makes Tamil hard.
              Each page below answers that for one language, and then says what we do about it.
            </p>
            <p className="t-caption mt-4 text-iron">
              Code-mixing — Hinglish, Tanglish — is the default register on every one of these, not
              a mode you switch on.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="Languages">
        <SectionHead
          eyebrow="By language"
          title="The hard part, one language at a time"
          sub="Different problems, not one problem with the name swapped."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {languagePages.map((p) => {
            const record = languageRecord(p);
            if (!record) return null;
            return (
              <Link
                key={p.code}
                href={`/voice-ai/${languageSlug(p)}`}
                className="group flex flex-col rounded-card border border-line bg-canvas p-7 transition-colors hover:border-vermilion"
              >
                <p className="font-display text-[1.5rem] font-bold">
                  <span className="font-indic">{record.native}</span>
                </p>
                <p className="t-data mt-1 text-iron">
                  {record.name}
                  {record.codeMixed ? ` · ${record.codeMixed}` : ''}
                </p>
                <p className="mt-4 font-display font-bold">{p.hardPart.title}</p>
                <span className="t-data mt-4 inline-block text-sindoor group-hover:underline">
                  Read the detail
                </span>
              </Link>
            );
          })}
        </div>

        <p className="t-caption mt-8 text-iron">
          Beyond these seven, {beyondIndic.map((l) => l.name).join(', ')} run on the underlying
          voice stack without a custom code-mixed register — live, but not built the way the Indic
          set is, so they get no page claiming otherwise.
        </p>
      </Section>

      <FinalCta
        title="Give it the language you were told was unsupported."
        sub="Book a demo and we'll call you back with a live agent, in the language you pick."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Voice AI by language', path: '/voice-ai' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Voice AI by Indian language',
            itemListElement: languagePages.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${languageRecord(p)?.name} voice AI`,
              url: `${site.url}/voice-ai/${languageSlug(p)}`,
            })),
          },
        ]}
      />
    </>
  );
}
