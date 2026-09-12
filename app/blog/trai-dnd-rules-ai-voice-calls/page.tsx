import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('trai-dnd-rules-ai-voice-calls')!;

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: [
    'TRAI DND rules automated calls',
    'TCCCPR calling hours India',
    'AI voice agent compliance India',
    'outbound calling rules India',
  ],
  ogTitle: 'TRAI, DND and the 9-to-9 window',
});

export default function Post() {
  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            Most conversations about automated calling in India start with the model and end with
            the voice. The two rules that actually decide whether a campaign is lawful get
            mentioned last, if at all — and they are not model problems. They are dialler problems,
            and a platform either handles them at the right moment or it does not.
          </p>
          <p>
            <strong>This is not legal advice, and we are not a law firm.</strong> It is a
            description of what the rules require and how a dialler has to be built to respect
            them, written by people who had to build one. Take the compliance question itself to
            counsel.
          </p>
        </BlogSection>

        <BlogSection heading="Rule one: the calling window is nine to nine, in the recipient's time">
          <p>
            The Telecom Commercial Communications Customer Preference Regulations — TCCCPR, the
            framework TRAI administers — sets a window for commercial calls of 09:00 to 21:00. The
            part implementations get wrong is the second half of the sentence: it is nine to nine{' '}
            <strong>in the recipient&rsquo;s local time</strong>, not the sender&rsquo;s, and not
            the server&rsquo;s.
          </p>
          <p>
            For an Indian business dialling Indian numbers this distinction costs nothing, because
            both ends are in one zone. It starts mattering the moment anyone dials across zones,
            and the honest fix then is resolving the recipient&rsquo;s zone from the numbering plan
            — not quietly widening the window because the edge case is inconvenient.
          </p>
          <BlogStat
            value="09:00 – 21:00"
            label="The TCCCPR window for commercial calls, in the recipient's local time"
            source="TRAI, Telecom Commercial Communications Customer Preference Regulations"
          />
        </BlogSection>

        <BlogSection heading="The check has to run immediately before the dial, not at queue time">
          <p>
            This is the single most common way a compliant-looking system places non-compliant
            calls, and the failure is entirely undramatic.
          </p>
          <p>
            A campaign of four thousand rows starts at 20:55. The platform checks the calling
            window once, at launch, and it passes — because at 20:55 it does pass. The dialler then
            works the list for the next two hours. Every row after 21:00 is a violation, and the
            system reports a completely successful campaign, because by its own accounting it
            checked and the check was fine.
          </p>
          <p>
            The window has to be evaluated per call, at the moment of dialling. That is the only
            place where the answer is about the call being placed rather than about a campaign that
            was started.
          </p>
        </BlogSection>

        <BlogSection heading="Rule two: do-not-disturb is a registry lookup, and normalisation is most of the work">
          <p>
            Subscribers can register preferences that block commercial calls, and calling a
            registered number is a regulatory event rather than a failed delivery. The lookup
            itself is straightforward. Making it <em>work</em> is a data problem, and it is the
            part that silently fails.
          </p>
          <p>
            <code>+91 98765 43210</code>, <code>098765 43210</code> and <code>9876543210</code> are
            one number written three ways. A registry keyed on the raw string treats them as three
            different numbers, so a list that appears to be scrubbed blocks nothing at all — the
            uploaded number and the dialled number never reduce to the same key. Every number, on
            both sides, has to be normalised to one canonical form before anything is compared.
          </p>
        </BlogSection>

        <BlogSection heading="Both checks must fail closed, and that is a deliberate inversion">
          <p>
            Most guards in a billing or telephony stack should fail <em>open</em>. If a balance
            reservation errors, refusing a funded customer&rsquo;s call is worse than letting one
            uncosted call through — you can reconcile a rupee, you cannot un-refuse a customer.
          </p>
          <p>
            Compliance runs the other way, and the asymmetry is worth stating plainly:
          </p>
          <ul>
            <li>
              <strong>One call too many</strong> is a complaint to the regulator, against your
              sender identity, on the record.
            </li>
            <li>
              <strong>One call too few</strong> is a retry.
            </li>
          </ul>
          <p>
            So a do-not-disturb lookup that errors must refuse the call, not allow it. A platform
            that lets calls through when its compliance check is unavailable has chosen the
            expensive failure to avoid the cheap one.
          </p>
        </BlogSection>

        <BlogSection heading="A refusal is not an error, and it needs to be recorded as such">
          <p>
            When a row is not called, somebody will eventually ask why. If the only answer lives in
            an application log, the answer in practice is &ldquo;nobody knows&rdquo;.
          </p>
          <p>
            Each refusal should be stored against the row with a stable machine-readable reason —{' '}
            <code>dnd_listed</code>, <code>outside_calling_hours</code> — separate from whatever
            human sentence the interface shows this month. The sentence changes; the token is what
            you count, filter and produce when somebody asks how many calls were suppressed and on
            what grounds. That record is the difference between a compliance posture and a claim.
          </p>
        </BlogSection>

        <BlogSection heading="What to ask a vendor">
          <p>Four questions, each with a wrong answer that sounds fine:</p>
          <ul>
            <li>
              <strong>When do you check the calling window?</strong> &ldquo;At campaign
              start&rdquo; is the wrong answer.
            </li>
            <li>
              <strong>What happens when the DND lookup fails?</strong> &ldquo;We let the call
              through so the campaign is not held up&rdquo; is the wrong answer.
            </li>
            <li>
              <strong>How do you normalise numbers?</strong> If there is no answer, the scrubbing
              is decorative.
            </li>
            <li>
              <strong>Can you show me why a specific row was never called?</strong> If that means
              reading logs, it will not survive an actual enquiry.
            </li>
          </ul>
        </BlogSection>

        <BlogSection heading="How Decibyl handles it">
          <p>
            The calling window is evaluated immediately before each dial rather than once per
            campaign, against the organisation&rsquo;s configured timezone. Numbers are normalised
            to a canonical form on both the uploaded list and the dial path, so the two reduce to
            the same key. Both checks fail closed: a lookup that errors refuses the call. Every
            refusal is stored against the row with a stable reason token, so the question
            &ldquo;why was this number not called&rdquo; has an answer that is not a log search.
          </p>
          <p>
            We also publish what we are <em>not</em>: Decibyl holds no ISO 27001, SOC 2 or HIPAA
            certification, and says so on its{' '}
            <Link href="/security">security page</Link>. Data residency, consent handling and the
            DPDP position are set out on{' '}
            <Link href="/legal/dpdp">the DPDP page</Link>, and our{' '}
            <Link href="/solutions/lending-collections">lending and collections</Link> page leads
            with conduct expectations rather than efficiency, for the same reason this post leads
            with the window rather than the voice.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Compliance you can show someone, not claim."
        sub="Book a demo and we'll walk through the dialler's refusal record with you."
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
            ogTitle: 'TRAI, DND and the 9-to-9 window',
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
