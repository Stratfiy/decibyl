import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { formatInr, tiers } from '@/data/pricing';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('concurrent-calls-explained')!;

export const metadata: Metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: [
    'concurrent calls voice agent',
    'concurrency AI calling',
    'how many concurrent calls do I need',
    'voice AI capacity planning',
  ],
  ogTitle: 'What concurrent calls actually means',
});

export default function Post() {
  const published = tiers.filter((t) => t.priceInr !== null);

  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            Every voice AI pricing table has a concurrency row. Almost none of them explain it, and
            buyers reasonably assume bigger is better and pay for headroom they will never touch —
            or, more expensively, size it from a monthly call volume and discover the limit during
            their first campaign.
          </p>
          <p>Here is what the number is, and how to work out your own.</p>
        </BlogSection>

        <BlogSection heading="It is how many calls can be live at the same instant">
          <p>
            Not calls per day. Not calls per month. The number of phone conversations your agent
            can hold <em>simultaneously</em>.
          </p>
          <p>
            Five concurrent calls means five people can be talking to your agent at 11:04 on
            Tuesday. It says nothing about how many can be talking at 11:05. If your calls average
            three minutes, five concurrent lines can carry roughly a hundred calls an hour — which
            is a lot more capacity than the number 5 sounds like.
          </p>
          <BlogStat
            value="~100/hour"
            label="What 5 concurrent lines carry at a 3-minute average call length"
          />
        </BlogSection>

        <BlogSection heading="The arithmetic">
          <p>The formula is short, and it is the same one call centres have used for decades:</p>
          <p>
            <strong>
              concurrency needed = calls per hour × average call length in minutes ÷ 60
            </strong>
          </p>
          <p>
            A clinic taking 40 calls a day, clustered into maybe four busy hours, at two minutes a
            call: that is 10 calls an hour × 2 ÷ 60 = 0.33. One line covers it, and five is
            comfortable headroom for the moments when three people ring at once.
          </p>
          <p>
            A D2C brand confirming 2,000 COD orders in a morning is a different shape entirely.
            Outbound is worse than inbound here, because you control the timing and will naturally
            fire the whole list at once. 2,000 calls over three hours at 90 seconds each is 667 an
            hour × 1.5 ÷ 60 = about 17 concurrent lines.
          </p>
        </BlogSection>

        <BlogSection heading="Inbound and outbound need different headroom, for opposite reasons">
          <p>
            <strong>Inbound is bursty and you do not control it.</strong> Your average hour is
            irrelevant; what matters is your worst ten minutes. A campaign, a festival, an outage
            at a competitor — everyone rings at once. Size inbound for the peak, not the mean,
            because the cost of being short is a caller who hears a busy tone and does not ring
            back.
          </p>
          <p>
            <strong>Outbound is smooth and you do control it.</strong> The dialler decides the
            pace, so concurrency sets your throughput rather than your reliability. Being short
            here means the campaign takes longer, which is usually survivable — and sometimes
            actively good, because a list of 2,000 calls placed in twenty minutes is a spike your
            own team cannot handle when people start calling back.
          </p>
        </BlogSection>

        <BlogSection heading="What actually happens when you hit the limit">
          <p>
            On inbound, a caller arriving above the limit gets a busy signal or falls through to
            whatever your number does next. This is why sizing inbound on averages is a false
            economy: the failure is invisible to you and completely visible to the customer.
          </p>
          <p>
            On outbound, the dialler simply holds the row until a line frees. Nothing is lost;
            the campaign runs longer.
          </p>
          <p>
            Concurrency is separate from cost. A minute costs the same whether it is your first
            simultaneous call or your twenty-fifth — you are not billed for idle lines, and raising
            the ceiling does not raise the rate. Which means the honest way to size it is to the
            traffic you actually have, not the traffic you would like to describe.
          </p>
        </BlogSection>

        <BlogSection heading="A rule of thumb, and the ceilings we sell">
          <p>Sizing is not delicate. Take your busiest realistic hour, apply the formula, double it.</p>
          <ul>
            {published.map((t) => (
              <li key={t.id}>
                <strong>
                  {t.name} — {t.concurrentCalls} concurrent
                </strong>{' '}
                at {formatInr(t.priceInr as number)}/month.
              </li>
            ))}
          </ul>
          <p>
            Most inbound businesses — a clinic, a dental practice, a diagnostics lab — never
            approach five. Outbound campaigns are what move you up the ladder, and outbound is a{' '}
            {published[1].name} feature, which is usually the real reason to be on that tier rather
            than the concurrency number next to it.
          </p>
        </BlogSection>

        <BlogSection heading="The question worth asking a vendor">
          <p>
            <strong>Is concurrency a hard limit or a soft one?</strong> A hard limit means call
            twenty-six is refused. A soft one means it is queued or throttled. Both are defensible;
            they fail very differently, and it should be in writing which one you have bought.
          </p>
          <p>
            And a second: does the limit apply per agent or per account? If you run three agents on
            one account, a per-account ceiling is shared between them — which is fine, as long as
            you knew.
          </p>
          <p>
            Ours are listed on the <Link href="/pricing">pricing page</Link>, next to what the plan
            actually includes.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Not sure what your peak hour looks like?"
        sub="Book a demo and we'll size it from your real call pattern rather than a tier table."
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
