import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('language-menu-is-the-bug')!;

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: [
    'code-mixed voice AI',
    'Hinglish voice agent',
    'multilingual voice agent India',
    'language detection voice AI',
  ],
  ogTitle: 'The language menu is the bug',
});

export default function Post() {
  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            A voice agent that opens with &ldquo;for Hindi, press 1&rdquo; has reinvented the thing
            the caller was hoping to escape. It is an IVR with a nicer voice, and the caller can
            tell within two seconds.
          </p>
          <p>
            The menu is not a design choice. It is what a system does when it cannot handle the
            language question any other way — and on an Indian phone line, it cannot handle it that
            way at all, because the premise is wrong.
          </p>
        </BlogSection>

        <BlogSection heading="The premise: that a call has one language">
          <p>
            A language menu assumes each call is conducted in exactly one language, chosen at the
            start and held to the end. That is a reasonable model of a phone call in Frankfurt. It
            is not a description of one in Bangalore.
          </p>
          <p>
            Real Indian phone speech mixes languages inside a single sentence. Not between
            sentences, and not because the speaker lacks vocabulary — because that is the register.
            The verb is Tamil and the noun is English. The sentence is Hindi and the order number is
            English. The greeting is Kannada and the complaint that follows is in whichever language
            the caller thinks in when annoyed.
          </p>
          <p>
            Hinglish and Tanglish are not degraded Hindi and Tamil. They are what fluent speakers
            speak, and a system that treats them as an error state is wrong about its own users.
          </p>
        </BlogSection>

        <BlogSection heading="Why the menu makes it worse rather than safer">
          <p>Three costs, in the order a caller meets them:</p>
          <ul>
            <li>
              <strong>It spends the first ten seconds on admin.</strong> Those seconds are where a
              caller decides whether this is a person, a competent machine, or a wall.
            </li>
            <li>
              <strong>It asks a question with no right answer.</strong> A caller who will use both
              Kannada and English has to pick one, and is then wrong for half the call.
            </li>
            <li>
              <strong>It locks the answer in.</strong> The worst part. Having chosen Hindi, the
              caller switches to English to read out an order number — as everyone does, because
              numbers and product names live in English — and a system pinned to Hindi mistranscribes
              exactly the field the call was about.
            </li>
          </ul>
          <p>
            That last one is the expensive failure, because it is invisible. The transcript reads
            fluently. The order number is wrong. Nothing alerts anybody.
          </p>
        </BlogSection>

        <BlogSection heading="What has to be true instead">
          <p>
            The language cannot be a setting captured at the start. It has to be something the
            system tracks continuously, because the caller changes it without announcement and
            without noticing.
          </p>
          <p>That means, concretely:</p>
          <ul>
            <li>
              <strong>Speech models trained on code-mixed audio</strong>, not a monolingual model
              per language with a router in front. A router has to decide, and deciding is the part
              that fails.
            </li>
            <li>
              <strong>The embedded English handled as carefully as the Indian language.</strong>{' '}
              Indian English is its own variety — lakh and crore, digits read in pairs, place names
              a US-trained model has never heard — and it carries the payload of most business
              calls.
            </li>
            <li>
              <strong>No language state to get stuck in.</strong> If there is a mode, there is a
              wrong mode.
            </li>
          </ul>
        </BlogSection>

        <BlogSection heading="Why most platforms ship the menu anyway">
          <p>
            Not laziness — architecture. If your speech stack is a general multilingual model with
            a language parameter, you need to know the language before you can transcribe. The menu
            is the cheapest way to obtain it. Everything downstream then inherits the assumption,
            and by the time anyone notices, the menu is load-bearing.
          </p>
          <p>
            Which is why &ldquo;do you support Tamil?&rdquo; is a weak question — nearly everyone
            says yes. The question that separates vendors is{' '}
            <strong>&ldquo;what happens when the caller switches language mid-sentence?&rdquo;</strong>{' '}
            The answers divide cleanly into a description of what the model does, and a description
            of what the menu does.
          </p>
        </BlogSection>

        <BlogSection heading="A test you can run in a minute">
          <p>
            Call the agent. Open in Tamil or Hindi. Halfway through a sentence, switch to English to
            read out a number, then switch back. That is not an adversarial test — it is a Tuesday.
          </p>
          <p>
            Watch for two things: whether it keeps up, and whether the number in the transcript is
            right. A system can survive the first and fail the second, and the second is the one
            that costs money.
          </p>
          <p>
            Ours is on {''}
            <Link href="/voice-ai">a page per language</Link>, each naming what is genuinely hard
            about that language rather than listing it as supported — and there is a live number on
            the <Link href="/">home page</Link> if you would rather test it than read about it.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Switch languages mid-sentence and see what happens."
        sub="Book a demo and we'll call you back with a live agent, in the language you pick."
      />

      <JsonLd
        data={[
          articleSchema({
            title: meta.title,
            description: meta.description,
            path: `/blog/${meta.slug}`,
            publishedAt: meta.publishedAt,
            updatedAt: meta.updatedAt,
            category: meta.category,
            // Same card the metadata advertises, so the schema image and the
            // social preview are one generated image rather than two.
            ogTitle: 'The language menu is the bug',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: meta.title, path: `/blog/${meta.slug}` },
          ]),
        ]}
      />
    </>
  );
}
