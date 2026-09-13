import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/marketing/LegalPage';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Data Processing Agreement',
  description:
    'The DPA on which Decibyl, a product of nAutomation Labs Pvt Ltd, processes personal data for customers — under the DPDP Act and, for EEA and UK customers, the GDPR with Standard Contractual Clauses.',
  path: '/legal/dpa',
});

export default function DpaPage() {
  return (
    <LegalPage
      title="Data processing agreement"
      intro="How we handle personal data you ask us to process. This forms part of the terms of service and is accepted in the app before an agent can run a campaign."
    >
      <LegalSection heading="Who is who">
        <p>
          You are the <strong>Data Fiduciary</strong> under the DPDP Act, and the{' '}
          <strong>controller</strong> under the GDPR where it applies. You decide who is called,
          what is said, and why. {site.legalName} is the <strong>Data Processor</strong> — we
          process on your documented instructions and for no purpose of our own.
        </p>
        <p>
          Configuring an agent, uploading a list, and running a campaign are your instructions. So
          is this page and your order form. We will tell you if an instruction appears to breach
          applicable law rather than carry it out quietly.
        </p>
      </LegalSection>

      <LegalSection heading="What we process">
        <ul>
          <li>
            <strong>Contact data</strong> you upload — phone numbers, names, and whatever fields
            you attach to them.
          </li>
          <li>
            <strong>Call content</strong> — audio, recordings, transcripts, and what the
            conversation produced.
          </li>
          <li>
            <strong>Knowledge you attach</strong> — documents your agents answer from.
          </li>
          <li>
            <strong>Account data</strong> — your users, their access, and the audit trail of what
            they did.
          </li>
        </ul>
        <p>
          We process it to run the service, to bill for it, to keep it secure, and to support you.
          Nothing else. <strong>We do not train models on your data</strong>, and we require the
          same of every model vendor we send it to.
        </p>
      </LegalSection>

      <LegalSection heading="What you are responsible for">
        <ul>
          <li>
            Having the consent, or another lawful basis, for every person your agents contact —
            under the law of that person&rsquo;s country, not only ours.
          </li>
          <li>Honouring DND, do-not-call, and any request to stop.</li>
          <li>Giving the notice your own data principals are entitled to.</li>
          <li>The accuracy of what you upload and what you tell your agents to say.</li>
        </ul>
        <p>
          We supply the tools — a do-not-call list, calling-window controls, consent attestations,
          and the recording disclosure — and we cannot verify that a given number consented. That
          is yours.
        </p>
      </LegalSection>

      <LegalSection heading="What we are responsible for">
        <ul>
          <li>Processing only on your instructions, and telling you if we think one is unlawful.</li>
          <li>
            Keeping the technical and organisational measures described on our{' '}
            <a href="/security">security page</a>, which forms Annex II of this agreement.
          </li>
          <li>Binding everyone with access to confidentiality, and granting it on need only.</li>
          <li>Helping you answer a data principal, a regulator, or a security review.</li>
          <li>Deleting or returning the data when we are done, as below.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Sub-processors">
        <p>
          We use sub-processors — telephony carriers, speech and language model vendors, hosting,
          and payments. The current list is published and{' '}
          <strong>generated from the system rather than maintained by hand</strong>, so it cannot
          quietly go out of date.
        </p>
        <p>
          We give <strong>30 days&rsquo; notice</strong> before adding one. You may object within
          that period; if we cannot resolve your objection, you may terminate the affected service
          without penalty for the unused period.
        </p>
        <p>
          Each sub-processor is bound by terms no less protective than these, and we remain
          responsible to you for what they do.
        </p>
      </LegalSection>

      <LegalSection heading="Rights of the people in your data">
        <p>
          If someone asks you for access, correction, erasure, or a copy of their data, the tools
          to answer are in the product — export, erasure, and a record of who accessed what. If a
          request reaches us directly we forward it to you rather than answering it ourselves,
          because it is yours to answer.
        </p>
        <p>
          An erasure stores a one-way hash of the number rather than the number, so a deleted
          person stays deleted without us keeping the thing they asked us to delete.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <ul>
          <li>
            <strong>Recordings and transcripts:</strong> 90 days by default, configurable. Deletion
            removes the stored audio, not merely the row that pointed at it.
          </li>
          <li>
            <strong>After your account closes:</strong> 90 days to export, then deleted.
          </li>
          <li>
            <strong>Financial records:</strong> eight years, because the Companies Act 2013 s128
            requires books of account to be kept that long. This one is law rather than choice.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="If there is a breach">
        <p>
          We will tell you <strong>without undue delay and within 48 hours</strong> of becoming
          aware of a personal data breach affecting your data, with what we know, what we are
          doing, and what we recommend. Notifying the Data Protection Board or affected people is
          yours to do as Data Fiduciary; we will give you what you need to do it.
        </p>
        <p>
          We can tell you what was reached between two timestamps, by whom, and across how many
          calls — counts and identifiers, never the content, because a breach report containing
          the compromised data is a second incident.
        </p>
      </LegalSection>

      <LegalSection heading="Where the data goes">
        <p>
          The platform runs in <strong>{site.regions[0]}</strong>. Recordings and transcripts come
          to rest in India.
        </p>
        <p>
          Speech and language vendors differ by the tier you choose for an agent, and we compute
          that answer rather than assert it: an agent on the Indic speech tier is processed in
          India end to end, and pointing any component at a foreign vendor removes that guarantee
          by itself instead of leaving a stale badge on a page. Attaching a knowledge base is the
          exception worth naming — it sends document text to a foreign vendor at ingest even when
          every model on the call is Indian.
        </p>
        <p>
          <strong>For customers established in the EEA or the UK:</strong> transfers out of the
          EEA or UK are made under the European Commission&rsquo;s Standard Contractual Clauses
          (Decision 2021/914), <strong>Module Two, controller to processor</strong>, incorporated
          into this agreement by reference and completed as follows — Annex I by the parties and
          the description of processing above, Annex II by our{' '}
          <a href="/security">security page</a>, and Annex III by the published sub-processor
          list. The UK Addendum applies for UK transfers. If processing must remain inside the
          EEA, tell us before contracting and we will scope it with you.
        </p>
      </LegalSection>

      <LegalSection heading="Audit">
        <p>
          We will give you the information reasonably needed to show we are meeting this
          agreement, and will accept one audit a year on reasonable notice, under confidentiality,
          at your cost — unless the audit finds material non-compliance, in which case it is ours.
        </p>
        <p>
          <strong>We hold no security certification.</strong> We are not SOC 2 audited, not ISO
          27001 certified, and have not commissioned an independent penetration test. Our{' '}
          <a href="/security">security page</a> sets out the measures that are actually in place,
          and which of them are enforced by code rather than by intention. We would rather show you
          that than imply a certificate we do not hold.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          The liability provisions of the{' '}
          <a href="/legal/terms">terms of service</a> apply to this agreement, and the cap is
          shared rather than additional — one cap across both documents, not two.
        </p>
      </LegalSection>

      <LegalSection heading="Grievances and governing law">
        <p>
          Grievance officer under DPDP s13:{' '}
          <strong>Nithishkalyan Pulluru Rajasekar</strong>, {site.legalName}
          {site.registeredAddress
            ? `, ${[
                site.registeredAddress.street,
                site.registeredAddress.locality,
                site.registeredAddress.region,
                site.registeredAddress.postalCode,
              ]
                .filter(Boolean)
                .join(', ')}`
            : ''}
          . Email{' '}
          <a href="mailto:grievances@decibyl.ai">grievances@decibyl.ai</a>. We answer within 30
          days.
        </p>
        <p>
          This agreement is governed by the laws of India, and the courts of India have exclusive
          jurisdiction. Where it conflicts with the terms of service on the handling of personal
          data, this agreement prevails.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
