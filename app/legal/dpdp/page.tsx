import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/marketing/LegalPage';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'DPDP & Call Data Handling',
  description:
    'How Decibyl handles consent, disclosure, recording, and data residency for voice calls under India’s DPDP Act.',
  path: '/legal/dpdp',
  keywords: ['DPDP compliance voice AI', 'call recording consent India', 'data residency India'],
});

export default function DpdpPage() {
  return (
    <LegalPage
      title="DPDP & call data handling"
      intro="Voice calls carry personal data, and automated voice calls carry a disclosure obligation on top of it. This page says exactly how we handle both."
    >
      <LegalSection heading="Roles">
        <p>
          For calls run on your account, <strong>you are the data fiduciary</strong> and{' '}
          <strong>{site.legalName} is your data processor</strong>. You decide who gets called and
          why; we carry out that instruction and keep the record. We sign a data processing
          agreement covering this — ask us for it before you sign the contract, not after.
        </p>
      </LegalSection>

      <LegalSection heading="Disclosure on every call">
        <p>
          The agent identifies itself as an automated assistant at the start of every call, and
          discloses that the call is recorded. This is not configurable off. A caller who asks to
          speak to a person is transferred.
        </p>
      </LegalSection>

      <LegalSection heading="Consent and calling lists">
        <p>
          You are responsible for having a lawful basis to call the numbers you upload, and for
          honouring DND registration and any sector rules that apply to you. We provide the
          controls — permitted calling windows, do-not-call suppression lists, and an immediate
          stop on request — and we expect them to be used.
        </p>
      </LegalSection>

      <LegalSection heading="Data residency">
        <p>
          Call audio, recordings, and transcripts are stored in India, on AWS Mumbai (ap-south-1).
          We will tell you, in the DPA, which sub-processors touch call content and where.
        </p>
      </LegalSection>

      <LegalSection heading="Retention and deletion">
        <p>
          You set the retention period in your contract. You can request deletion of any recording,
          transcript, or contact record at any time, and we action it across primary storage and
          backups within 30 days.
        </p>
      </LegalSection>

      <LegalSection heading="Erasure requests from call recipients">
        <p>
          If someone your agent called asks us directly to delete their data, we will acknowledge
          it, notify you as the fiduciary, and help you action it. We do not delete your business
          records without telling you.
        </p>
      </LegalSection>

      <LegalSection heading="What we are not">
        <p>
          We are not ISO 27001 certified, not SOC 2 certified, and not HIPAA-covered — HIPAA is a
          US framework and does not apply to Indian clinical data in any case. If a vendor tells
          you otherwise about their own product, ask to see the certificate. We would rather list
          what we don’t have than have you find out during procurement.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          Data encrypted in transit and at rest, access to call content limited to the people who
          need it to run your account, and audit logs on that access. Report a suspected
          vulnerability to <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and we
          will acknowledge within one business day.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
