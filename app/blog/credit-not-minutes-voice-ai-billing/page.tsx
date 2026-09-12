import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { bundles, cheapestBundle, dearestBundle, formatInr, tiers } from '@/data/pricing';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('credit-not-minutes-voice-ai-billing')!;

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: [
    'voice AI cost per minute India',
    'AI voice agent billing',
    'voice AI pricing model',
    'AI calling cost India',
  ],
  ogTitle: 'Why we sell credit, not minutes',
});

export default function Post() {
  const starter = tiers[0];
  const ratio = dearestBundle.perMinuteInr / cheapestBundle.perMinuteInr;

  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            Every voice AI pricing page in India sells minutes. Ours used to. In August we took the
            minute bundles off and replaced them with call credit, and this post is the working —
            because the reason is not a positioning preference. It is that we could not make the
            arithmetic honest.
          </p>
        </BlogSection>

        <BlogSection heading="A minute does not have a price">
          <p>
            A voice agent call is not one product. It is a speech-to-text model, a language model,
            a text-to-speech model (or a single speech-to-speech model doing all three), plus
            telephony carriage. Each is metered separately, by the vendor, on its own unit — audio
            seconds, tokens, characters.
          </p>
          <p>
            So the cost of a minute depends on which models the call ran on. Not slightly. Here are
            our own three voice bundles, all doing the same job:
          </p>
          <ul>
            {bundles.map((b) => (
              <li key={b.slug}>
                <strong>{b.label}</strong> — ₹{b.perMinuteInr.toFixed(2)}/min. {b.blurb}
              </li>
            ))}
          </ul>
          <BlogStat
            value={`${ratio.toFixed(1)}×`}
            label={`The spread between our cheapest and dearest voice, for the same minute of the same call`}
          />
          <p>
            A customer on {dearestBundle.label} burns credit more than {Math.floor(ratio)} times
            faster than one on {cheapestBundle.label}. If we sold both a &ldquo;500 minute&rdquo;
            bundle, one of those two customers would be badly wrong about what they bought — and
            we would have known which one when we sold it.
          </p>
        </BlogSection>

        <BlogSection heading="Language moves it again">
          <p>
            On top of the model choice, Indian regional languages — Tamil, Telugu, Kannada,
            Malayalam, Bengali — run on a dearer speech stack than Hindi or English. Same agent,
            same script, same call length; different cost per minute.
          </p>
          <p>
            Which produces the specific failure that made us change: a Tamil clinic and a Delhi D2C
            brand buy the same plan on the same day, and the clinic runs out first. Nothing is
            broken, nobody was overcharged, and the clinic is right to feel misled — because the
            page told them they had bought a number of minutes, and minutes were never the thing
            being sold.
          </p>
        </BlogSection>

        <BlogSection heading="Nobody else is selling all-in minutes either">
          <p>
            This is worth knowing before you compare pricing pages, because the minute figures are
            not comparable and are rarely what they look like.
          </p>
          <p>
            Look closely at a platform advertising, say, 5,000 minutes at $350, 20,000 at $1,200,
            50,000 at $2,500. Divide each price by its minutes and you get $0.070, $0.060, $0.050 —
            which will be exactly that vendor&rsquo;s published <em>platform fee</em>, to the cent,
            on all three tiers. The &ldquo;included minutes&rdquo; are the plan price divided by the
            fee. They are fee-minutes.
          </p>
          <p>
            Speech, the language model, the voice and the telephony are still charged on top,
            drawn from a separate balance. So a plan that reads as 5,000 minutes of calling is
            5,000 minutes of <em>one line item</em>, and the rest arrives separately. The
            arithmetic is not hidden — it is just not the arithmetic the number implies.
          </p>
        </BlogSection>

        <BlogSection heading="What we do instead">
          <p>
            A plan grants rupees. {starter.name} at {formatInr(starter.priceInr as number)}/month
            includes {formatInr(starter.balanceInr as number)} of call credit, an Indian number and
            the telephony. Each call draws that credit down by what it actually cost — the pulsed
            platform fee, the models it ran on, the carriage — and when the credit runs out you top
            up. There is no overage bill and no invoice at the end of the month, because you can
            only spend credit you have added.
          </p>
          <p>
            Our <Link href="/pricing">pricing page</Link> still shows minutes, but as a{' '}
            <strong>range</strong>: what the credit buys on the dearest voice, and on the cheapest.
            The range is wide because the truth is wide. A single number in the middle would be
            more persuasive and wrong for almost everybody.
          </p>
        </BlogSection>

        <BlogSection heading="How to compare two quotes properly">
          <p>Four questions that make per-minute claims comparable:</p>
          <ul>
            <li>
              <strong>Which models does that rate assume?</strong> A rate without a model named is
              not a rate.
            </li>
            <li>
              <strong>Is telephony inside it or billed separately?</strong> Indian carriage is
              small per minute and not zero.
            </li>
            <li>
              <strong>What does a regional-language minute cost?</strong> If the answer is the same
              as Hindi, ask what speech model serves Tamil.
            </li>
            <li>
              <strong>What happens when the bundle runs out?</strong> Overage billed in arrears is
              a different product from credit you top up, and only one of them can surprise you.
            </li>
          </ul>
        </BlogSection>

        <BlogSection heading="The honest caveat">
          <p>
            Credit is harder to sell than minutes. &ldquo;₹2,500 of calling&rdquo; requires a
            second sentence where &ldquo;500 minutes&rdquo; does not, and we lost a clean headline
            number by doing this. We think the trade is right: a number that is easy to compare and
            wrong for half the people reading it is worse for us than one that needs explaining,
            because the explaining happens either way — before the sale, or in month three.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="See the arithmetic against your own call pattern."
        sub="Book a demo and we'll work through what your minutes actually cost."
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
            ogTitle: 'Why we sell credit, not minutes',
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
