import type { Metadata } from 'next';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { bundles, cheapestBundle, dearestBundle, formatInr, fromRateInr, tiers } from '@/data/pricing';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('ai-voice-agent-pricing-india')!;

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: ['AI voice agent pricing India', 'voice AI cost per minute India', 'AI calling pricing India'],
  ogTitle: meta.title,
});

export default function Post() {
  const starter = tiers[0];

  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            Search for &ldquo;AI voice agent pricing India&rdquo; and you&rsquo;ll get a wall of
            numbers: ₹2/min here, ₹6/min there, ₹5/min flat somewhere else. Reviewing the rates
            published by managed and self-serve voice AI platforms in India as of August 2026, the
            effective range runs from roughly ₹2/min to ₹20/min for what is marketed as the same
            thing. That spread isn&rsquo;t noise. It&rsquo;s three different numbers wearing one
            label.
          </p>
        </BlogSection>

        <BlogSection heading="The number on the page is rarely the number you pay">
          <p>
            A per-minute rate can mean the cost of the underlying model and telephony, or it can
            mean that cost plus a platform markup baked in and never itemised. Both get called
            &ldquo;pricing.&rdquo; The second one is more common, because a blended rate is easier
            to market and harder to audit.
          </p>
          <p>
            The gap matters more once you account for connect rate. A quoted per-minute price
            covers connected talk time — it says nothing about how many dials it takes to get one.
            The effective cost per completed outcome typically runs two to four times the quoted
            per-minute rate once failed connects, IVR time, and platform fees are factored in.
            Nobody puts that multiplier on the pricing page.
          </p>
        </BlogSection>

        <BlogSection heading="Three things to actually ask, before you ask for a rate">
          <ul>
            <li>
              <strong>Is the platform fee shown separately from the provider cost?</strong> If a
              vendor can&rsquo;t break out what goes to the model/telephony provider versus what
              they keep, you can&rsquo;t tell if you&rsquo;re getting a fair markup or an
              unfavourable one — you&rsquo;re trusting a single blended number.
            </li>
            <li>
              <strong>Does the rate change with volume, and is that change disclosed upfront?</strong>{' '}
              A platform that only reveals its best rate after a sales call isn&rsquo;t pricing
              transparently, it&rsquo;s negotiating from an information advantage.
            </li>
            <li>
              <strong>What&rsquo;s included in the monthly figure versus billed per minute?</strong>{' '}
              Telephony, phone numbers, and support sit inside some vendors&rsquo; base fee and
              outside others&rsquo; — two quotes that look identical on the top line can differ by
              30&ndash;40% once those are added back in.
            </li>
          </ul>
        </BlogSection>

        <BlogSection heading="What this actually costs on Decibyl">
          <p>
            We publish the split rather than blend it. Managed plans start at{' '}
            {formatInr(starter.priceInr as number)}/month with telephony and phone numbers
            included — no separate line item to hunt for. For teams that don&rsquo;t want a
            monthly commitment, you add credit and each call is charged at the rate for the model
            it ran on — there is no prepay rate card, because the lever that actually moves your
            per-minute cost is which model you pick, not how much you pay up front. BYOK is a flat
            platform fee on top of whatever your own OpenAI, Deepgram,
            ElevenLabs, or Sarvam account already charges you — you can check the arithmetic
            yourself, because nothing is blended into a single number.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <BlogStat
              value={`₹${fromRateInr.toFixed(2)}–₹${dearestBundle.perMinuteInr.toFixed(2)}/min`}
              label={`Decibyl, ${cheapestBundle.label} to ${dearestBundle.label} — the model sets the rate, not the plan`}
            />
            <BlogStat
              value="₹2–₹20/min"
              label="Published range across Indian voice AI platforms"
              source="survey of public pricing pages, August 2026"
            />
          </div>
        </BlogSection>

        <BlogSection heading="The honest caveat">
          <p>
            None of this is a claim that Decibyl is the cheapest — it isn&rsquo;t always, and a
            vendor that tells you they&rsquo;re the cheapest for every use case is the one to be
            skeptical of. The actual answer depends on your connect rate, your call length, and
            whether you&rsquo;re calling in one language or seven. What&rsquo;s worth insisting on,
            from whoever you pick, is a rate you can check the arithmetic on.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Want the arithmetic run on your volumes?"
        sub="Book a demo. We'll price your actual call pattern rather than a plan name."
        secondary={{ label: 'See the full pricing page', href: '/pricing' }}
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
