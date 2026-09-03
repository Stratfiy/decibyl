import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('dpdp-act-ai-voice-calls-guide')!;

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: ['DPDP Act AI voice calls', 'DPDP compliance India', 'DPDP Rules 2025 automated calling'],
  ogTitle: meta.title,
});

export default function Post() {
  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            The Ministry of Electronics and Information Technology notified the Digital Personal
            Data Protection Rules, 2025 on 13 November 2025, operationalising the DPDP Act, 2023.
            The Rules run on an 18-month phased compliance window — full compliance is required by
            13 May 2027, rolled out in three phases. If you run automated outbound or inbound
            calling in India, that clock is already running.
          </p>
          <p className="t-caption text-iron">
            This is a practical summary, not legal advice — talk to counsel before you rely on it
            for a compliance decision.
          </p>
        </BlogSection>

        <BlogSection heading="What the Rules actually require, in plain terms">
          <p>
            The core requirement is <strong>free, informed, explicit consent</strong> before you
            process someone&rsquo;s personal data — a phone call carrying voice, and often name and
            transaction details, counts. The Rules are specific about how that consent has to be
            asked for: a standalone, clear, plain-language notice describing exactly what data is
            collected and exactly why, not a clause buried in a longer terms document.
          </p>
          <p>
            For a voice call specifically, that translates into two things most automated calling
            setups skip: the call has to disclose that it&rsquo;s automated, and it has to disclose
            that it&rsquo;s recorded, before either becomes relevant to the conversation.
          </p>
        </BlogSection>

        <BlogStat
          value="18 months"
          label="Compliance window from notification (13 Nov 2025) to full compliance (13 May 2027)"
          source="MeitY, Digital Personal Data Protection Rules, 2025"
        />

        <BlogSection heading="The fiduciary/processor split, and why it matters for calling">
          <p>
            Under the Act, whoever decides who gets called and why is the{' '}
            <strong>data fiduciary</strong>. Whoever carries out that instruction and keeps the
            record — the calling platform — is the <strong>data processor</strong>. The obligations
            differ, and a lot of the confusion in this space comes from vendors being vague about
            which one they are.
          </p>
          <p>
            A data processing agreement should make this explicit in writing. If a vendor
            can&rsquo;t produce one before you sign, that&rsquo;s worth treating as a signal, not
            a formality to chase down later.
          </p>
        </BlogSection>

        <BlogSection heading="A five-point checklist for an automated calling program">
          <ul>
            <li>The agent identifies itself as automated at the start of every call.</li>
            <li>The agent discloses that the call is recorded, also at the start.</li>
            <li>
              A caller who asks for a person gets transferred — this isn&rsquo;t optional under a
              genuine disclosure obligation.
            </li>
            <li>
              You have do-not-call suppression and permitted calling windows enforced at the
              platform level, not left to individual agents to remember.
            </li>
            <li>
              You know where the recordings and transcripts are actually stored, and you have a
              deletion path that works within your contracted retention period.
            </li>
          </ul>
        </BlogSection>

        <BlogSection heading="Where Decibyl sits on this">
          <p>
            We built to this checklist, not around it — disclosure on every call isn&rsquo;t
            configurable off, and data sits in Mumbai (AWS ap-south-1) by default. The full
            breakdown of roles, retention, and what we are and aren&rsquo;t certified for is on{' '}
            <Link href="/security">Security &amp; trust</Link>, and the complete legal language is
            on <Link href="/legal/dpdp">DPDP &amp; call data handling</Link>.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Need the DPA before you evaluate a vendor?"
        sub="Ask for it before you sign, not after. We'll send it directly."
        secondary={{ label: 'Read the full DPDP page', href: '/legal/dpdp' }}
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
