import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('ndr-rto-cost-d2c-india')!;

export const metadata: Metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: ['NDR recovery India', 'RTO reduction D2C India', 'COD confirmation calls'],
  ogTitle: meta.title,
});

export default function Post() {
  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            India&rsquo;s average ecommerce return-to-origin (RTO) rate runs 25&ndash;35%, against a
            global benchmark of 8&ndash;12%. A separate analysis across more than 180 million
            shoppers put the average closer to 23%. Either way, the gap to the rest of the world is
            three to four times, and cash-on-delivery is most of the reason why.
          </p>
        </BlogSection>

        <div className="grid gap-4 sm:grid-cols-3">
          <BlogStat value="60–70%" label="Share of Indian D2C orders that are COD" source="industry data, 2026" />
          <BlogStat value="~26%" label="Of COD shipments returned as RTO, vs. under 2% for prepaid" source="industry data, 2026" />
          <BlogStat value="₹150–300" label="Cost per RTO order to the seller" source="industry data, 2026" />
        </div>

        <BlogSection heading="Why COD drives it, specifically">
          <p>
            A prepaid order has already cleared a small commitment filter — the buyer paid before
            the parcel moved. A COD order hasn&rsquo;t. It ships on the strength of a checkout click
            with no verification that the buyer still wants it, still has the cash on hand, or
            will even be home when the courier arrives. Categories with the highest impulse-to-COD
            ratio — fashion, footwear, general merchandise — see RTO rates touching 40%, well above
            the 20&ndash;35% industry range for COD-heavy D2C brands generally. A healthy rate,
            for comparison, is under 10%.
          </p>
        </BlogSection>

        <BlogSection heading="What actually reduces it">
          <p>
            The lever that moves the number isn&rsquo;t a better courier or a stricter COD policy —
            both of those trade RTO for lost sales. The lever that has actually shown results is
            contacting the buyer before the delivery attempt, not after it fails: confirming the
            order, correcting the address if the pin doesn&rsquo;t match, and catching a
            no-longer-wanted order before a courier is dispatched for it at all. Reported recovery
            rates for structured pre-delivery outreach run 30&ndash;45% of at-risk orders,
            with a 20&ndash;30% reduction in COD RTO specifically.
          </p>
          <p>
            The reason this works better after the fact than before it is timing. A confirmation
            call within the window between order placement and dispatch catches the order before
            it becomes a delivery cost. A call after a failed delivery attempt is recovering a cost
            that&rsquo;s already been spent.
          </p>
        </BlogSection>

        <BlogSection heading="The math on one confirmation call">
          <p>
            At ₹250 per failed delivery — the middle of the published range — a D2C brand doing 200
            orders a day with a 60% COD mix and a 25% RTO rate on those COD orders is losing roughly
            ₹7,500 a day, or close to ₹225,000 a month, to deliveries that never should have
            shipped. Run your own numbers, not this example&rsquo;s, on the{' '}
            <Link href="/solutions/d2c-ndr-recovery#calculator">NDR loss calculator</Link> — it asks
            for your actual order volume, COD share, and RTO rate, and does the arithmetic against
            what you enter, not a number we chose for you.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Want this run against your actual order data?"
        sub="Book a demo. We'll price the confirmation-call volume your real RTO rate implies."
        secondary={{ label: 'See the D2C & NDR page', href: '/solutions/d2c-ndr-recovery' }}
      />

      <JsonLd
        data={[
          articleSchema({
            title: meta.title,
            description: meta.description,
            path: `/blog/${meta.slug}`,
            publishedAt: meta.publishedAt,
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
