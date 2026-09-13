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
          A platform on which you configure agents that do a job for your business, on whichever
          channel the job needs. An agent answers a call, places one on a campaign, replies to a
          message on WhatsApp or web chat, or runs on a schedule with nobody on the other end.
          You get transcripts, recordings where the channel produces audio, quality scoring, and
          outcome delivery to systems you connect. Features listed as beta, on request, or coming
          soon on this website are exactly that, and are not part of what you are buying unless
          your order form says so.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <ul>
          <li>Have a lawful basis to contact the people you upload, and honour DND rules.</li>
          <li>Keep the agent’s script accurate — we say what you tell us to say.</li>
          <li>
            Stay inside <a href="#acceptable-use">acceptable use</a>, below. Those limits are a
            condition of the account, not guidance.
          </li>
          <li>
            For voice agents, configure a human transfer path and keep the number it dials
            working.
          </li>
          <li>Keep your account credentials and API keys to yourself.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Consent is yours to hold">
        <p>
          You are responsible for the consent of the people your agents contact. We provide the
          do-not-call list, the consent attestations and the calling-window controls, and we
          enforce the TCCCPR window of 09:00 to 21:00 on outbound calling. We do not and cannot
          verify that a given number consented to be contacted, and nothing on this platform
          should be read as us having done so.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          You must not use the service for any of the following. Each is either unlawful in a
          market we serve, or regulated by a body we are not registered with, or both. We may
          suspend an account immediately where we reasonably believe it is being used for any of
          them &mdash; a platform that has to wait a week before stopping a scam campaign is part
          of the problem &mdash; and we will tell you why.
        </p>
        <ul>
          <li>
            <strong>Deception and extraction of money.</strong> Fraudulent, deceptive or
            &ldquo;scam&rdquo; calls of any kind. Pressuring, frightening or misleading someone
            into making a payment or disclosing a payment instrument, an OTP, a password or any
            credential. Impersonating a bank, a government body, a courier, a law enforcement
            agency or a utility.
          </li>
          <li>
            <strong>Impersonating a person or organisation</strong> without their authority.
          </li>
          <li>
            <strong>Concealing that the recipient is speaking with an automated agent</strong>{' '}
            where they ask, or where the law of their location requires the disclosure. Several
            jurisdictions now require it; where they do not, honesty is still a condition of using
            this platform.
          </li>
          <li>
            <strong>Medical advice.</strong> Agents must not diagnose, offer treatment advice, or
            tell anybody whether to take, change or stop a medication. Booking, reminding,
            confirming, and answering factual questions about a practice are not advice and are
            permitted.
          </li>
          <li>
            <strong>Financial, investment, insurance or legal advice.</strong> These require
            registration with SEBI, IRDAI or a bar council, which you must hold directly if you
            advise.
          </li>
          <li>
            <strong>Emergency or life-safety use.</strong> The service must not be relied on to
            reach emergency services, and must not be placed anywhere a failure to connect could
            cause harm.
          </li>
          <li>
            <strong>Debt collection</strong>, unless you are licensed to collect and comply with
            the collection rules of the recipient&rsquo;s country. Recovery calls must not apply
            pressure, contact third parties about a debt, or fall outside permitted hours.
          </li>
          <li>
            <strong>Political campaigning or election calls</strong>, which carry their own
            restrictions in every market we serve.
          </li>
          <li>
            <strong>Calls to children</strong>, or the deliberate collection of a
            child&rsquo;s personal data. The DPDP Act&rsquo;s children&rsquo;s-data provisions
            apply and are strict.
          </li>
          <li>
            <strong>Recording without disclosure.</strong> Recording is disclosed to the
            recipient. You must not disable that disclosure where the law of either
            party&rsquo;s location requires consent to record.
          </li>
          <li>
            <strong>Circumventing a do-not-call or do-not-disturb register</strong>, a revoked
            consent, or a request to stop calling.
          </li>
          <li>
            <strong>Adult content, gambling, or any product whose sale is restricted in the
            recipient&rsquo;s state</strong>, without the licence that market requires.
          </li>
          <li>
            <strong>Harassment or threats</strong>, and anything otherwise prohibited by Indian
            law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Billing">
        <ul>
          <li>Plans are billed monthly in advance, in INR, through Razorpay.</li>
          <li>All published prices are exclusive of 18% GST, which is added at invoicing.</li>
          <li>
            A plan includes call credit rather than a fixed number of minutes. Calls draw that
            credit down at the rate for the models and language used, and unused credit does not
            carry over to the next month.
          </li>
          <li>
            There is no overage billing. When a plan&rsquo;s credit is exhausted, calling continues
            only against credit you add; nothing is billed in arrears.
          </li>
          <li>
            Model, speech and telephony providers are contracted by us, not by you. Their cost is
            charged on to your account as itemised lines on each call, and you do not hold or
            supply provider keys.
          </li>
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
