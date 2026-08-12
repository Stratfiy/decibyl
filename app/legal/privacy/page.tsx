import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/marketing/LegalPage';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'What Decibyl collects, why, where it is stored, how long it is kept, and how to have it deleted.',
  path: '/legal/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What we collect, why we collect it, where it lives, and how to get it deleted. Written to be read rather than to be survived."
    >
      <LegalSection heading="Who we are">
        <p>
          Decibyl is a product of {site.legalName}, a company registered in India. We are the data
          fiduciary for information collected through this website, and a data processor for call
          data we handle on behalf of our customers.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect from this website">
        <ul>
          <li>
            <strong>Details you type into a form</strong> — name, email, phone number, company,
            the vertical you picked, your rough call volume, and any message you write.
          </li>
          <li>
            <strong>Attribution</strong> — the page you submitted from, the referring URL, and any
            UTM parameters in the link you arrived on.
          </li>
          <li>
            <strong>Technical data</strong> — your browser user-agent, and a salted one-way hash of
            your IP address used only for rate limiting. We do not store your raw IP address.
          </li>
          <li>
            <strong>Analytics</strong> — aggregate page-view data via Vercel Analytics. It does not
            use cookies and does not build a cross-site profile of you.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Call data, when you are a customer">
        <p>
          When you run an agent with us, we process the audio, recordings, transcripts, and
          outcomes of calls that agent handles, along with the contact details you supply for
          outbound calling. That data belongs to you. We process it to deliver the service, to
          produce QA scores, and to write outcomes back to systems you connect. We do not sell it,
          and we do not use your call content to train third-party models.
        </p>
      </LegalSection>

      <LegalSection heading="Where it is stored">
        <p>
          Recordings and transcripts are stored in India, on AWS Mumbai (ap-south-1). Some
          sub-processors used to build the site and route email may process limited data outside
          India; call content stays in region.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <ul>
          <li>Website leads: up to 24 months from your last contact with us, then deleted.</li>
          <li>
            Call recordings and transcripts: for the retention period agreed in your contract. If
            none is agreed, 12 months, then deleted.
          </li>
          <li>Billing records: as long as Indian tax law requires us to keep them.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          Only the service providers we need to run the product: cloud hosting and storage
          (AWS Mumbai), our website host (Vercel), our database provider (Supabase), speech and
          language model providers used to run calls, telephony operators that carry the calls, and
          Razorpay for payments. Each processes data on our instructions. We do not sell personal
          data to anyone.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us for a copy of the personal data we hold about you, ask us to correct it,
          or ask us to delete it. Email{' '}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and we will respond within
          30 days. If you are a call recipient rather than our customer, we will route your request
          to the business whose agent called you and help them action it.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This site sets no advertising or tracking cookies. Anything stored in your browser is
          strictly necessary to make the page work.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If we change this policy materially we will update the date at the top and, for
          customers, tell you by email before it takes effect.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
