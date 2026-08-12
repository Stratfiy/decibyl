import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/marketing/LegalPage';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms on which Decibyl, a product of nAutomation Labs Pvt Ltd, provides voice agent services in India.',
  path: '/legal/terms',
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      intro="The terms on which we provide the service and you use it. A signed order form or contract, where one exists, takes precedence over this page."
    >
      <LegalSection heading="The agreement">
        <p>
          These terms are between you and {site.legalName} (“Decibyl”, “we”). By using the website
          or the service you accept them. If you have a signed order form or master agreement with
          us, that document governs wherever the two conflict.
        </p>
      </LegalSection>

      <LegalSection heading="What we provide">
        <p>
          A platform that runs inbound and outbound voice calls using agents you configure with us,
          with transcripts, recordings, quality scoring, and outcome delivery to systems you
          connect. Features listed as beta, on request, or coming soon on this website are exactly
          that, and are not part of what you are buying unless your order form says so.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <ul>
          <li>Have a lawful basis to call the numbers you upload, and honour DND rules.</li>
          <li>Keep the agent’s script accurate — we say what you tell us to say.</li>
          <li>
            Do not use the service for fraud, impersonation, harassment, threats, or anything
            prohibited by Indian law. This includes recovery calls that apply pressure, contact
            third parties about a debt, or fall outside permitted hours.
          </li>
          <li>Configure a human transfer path, and keep the number it dials working.</li>
          <li>Keep your account credentials and API keys to yourself.</li>
        </ul>
        <p>
          We may suspend an account we reasonably believe is being used for any of the above, and
          we will tell you why.
        </p>
      </LegalSection>

      <LegalSection heading="Billing">
        <ul>
          <li>Plans are billed monthly in advance, in INR, through Razorpay.</li>
          <li>All published prices are exclusive of 18% GST, which is added at invoicing.</li>
          <li>Minutes included in a plan do not carry over to the next month.</li>
          <li>Overage, where applicable, is billed in arrears at the rate in your order form.</li>
          <li>On BYOK you pay your model and speech providers directly, at their price.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Your data and your agents">
        <p>
          Your call data, contact lists, recordings, and transcripts are yours. Your agent
          configuration is yours. We process all of it to run the service, as described in the{' '}
          <a href="/legal/privacy">privacy policy</a> and the{' '}
          <a href="/legal/dpdp">DPDP page</a>. On termination you can export it, and we delete it
          on request.
        </p>
      </LegalSection>

      <LegalSection heading="Availability">
        <p>
          We work hard to keep the service up, and we do not currently offer a contractual uptime
          SLA. We would rather say that plainly than publish a number we cannot stand behind.
          Enterprise agreements can include availability commitments — ask.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          To the extent Indian law permits, neither party is liable for indirect or consequential
          loss, and our total liability in any twelve-month period is capped at the fees you paid
          us in that period. Nothing here limits liability for fraud, wilful misconduct, or
          anything that cannot lawfully be limited.
        </p>
      </LegalSection>

      <LegalSection heading="Ending it">
        <p>
          You can cancel a monthly plan at any time, effective at the end of the paid period. We
          can terminate for non-payment or for a breach of the responsibilities above that is not
          fixed within a reasonable notice period.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of India, and the courts of India have exclusive
          jurisdiction over any dispute arising from them.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
