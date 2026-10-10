import { redirect } from 'next/navigation';

/** Pricing is private during the invite-only pilot. */
export default function PricingPage() {
  redirect('/waitlist');
}
