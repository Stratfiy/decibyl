import type { Metadata } from 'next';
import { ActionHome } from '@/components/marketing/ActionHome';
import { pageMetadata } from '@/lib/seo';
export const metadata: Metadata = pageMetadata({
  title: 'Bots that do the boring work',
  description: 'Meet Decibyl. AI bots for your everyday life and your business. Research, use connected apps, handle calls and run routines. Free, invite-only early access.',
  path: '/',
  keywords: ['AI personal assistant', 'AI agents for business', 'AI bots', 'AI voice agents', 'workflow automation'],
  ogTitle: 'Big plans. Less boring work.',
  ogSubtitle: 'For your everyday life. And your business. Join the waitlist.',
});
export default function HomePage() { return <ActionHome />; }
