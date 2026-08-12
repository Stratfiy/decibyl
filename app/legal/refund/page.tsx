import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/marketing/LegalPage';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Refund & Cancellation Policy',
  description:
    'How cancellations, refunds, and billing disputes work on Decibyl plans. Required by Razorpay and worth reading anyway.',
  path: '/legal/refund',
});

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & cancellation policy"
      intro="Short, because it should be. This policy applies to plans bought directly through the website; a signed order form takes precedence where it differs."
    >
      <LegalSection heading="Cancelling">
        <p>
          Monthly plans can be cancelled at any time. Cancellation takes effect at the end of the
          period you have already paid for — the service keeps running until then, and you are not
          billed again.
        </p>
      </LegalSection>

      <LegalSection heading="Refunds">
        <ul>
          <li>
            <strong>Within 7 days of your first payment</strong>, if the service has not worked for
            you, email us and we will refund that payment in full.
          </li>
          <li>
            <strong>After that</strong>, monthly fees already paid are not refunded, because the
            capacity and telephony for the period have been provisioned. You can still cancel and
            avoid the next charge.
          </li>
          <li>
            <strong>Billing errors</strong> — if we charged you incorrectly, we refund the
            difference in full, whenever you tell us.
          </li>
          <li>
            <strong>Unused minutes</strong> in a monthly plan are not refundable and do not carry
            over.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How to ask">
        <p>
          Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> from the address on
          the account. We acknowledge within one business day. Approved refunds go back to the
          original payment method through Razorpay, typically within 5–7 working days.
        </p>
      </LegalSection>

      <LegalSection heading="GST">
        <p>
          Refunds are processed on the invoice amount including the GST charged on it, and a credit
          note is issued for your records.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
