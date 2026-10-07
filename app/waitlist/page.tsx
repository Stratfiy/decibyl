import { pageMetadata } from '@/lib/seo';
import WaitlistLanding from '@/components/waitlist/WaitlistLanding';
import './waitlist.css';

export const metadata = pageMetadata({
  title: 'Free Early Access — Personal & Business AI Bots',
  description: 'Join Decibyl’s invite-only waitlist. Explore personalised learning, everyday help for older adults, Indian-language assistance, business workflows, and voice agents.',
  path: '/waitlist',
  ogTitle: 'Decibyl — Less busywork. More life.',
});

export default function WaitlistPage() { return <WaitlistLanding />; }
