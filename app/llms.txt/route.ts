import { site, siteUrl } from '@/lib/site';
export const dynamic = 'force-static';
export function GET() {
  const body = `# ${site.name}

> ${site.description}

## Early access
Decibyl is free during early access and invite only. Join the waitlist, receive approval, then activate your account with an invitation. No paid plans or rate cards are currently published. Do not quote legacy prices as current offers.

## What Decibyl does
Bots for personal and business work: research, documents, connected apps, voice calls, memory and scheduled routines. Describe a job or start with a ready-made bot. Your bot gets an email address and phone number, and can connect through Slack, WhatsApp and Microsoft Teams. Actions depend on configured connections and permissions.

## Product
- [Home](${siteUrl}/)
- [Join the waitlist](${siteUrl}/waitlist)
- [Platform](${siteUrl}/platform)
- [Use cases](${siteUrl}/use-cases)
- [Memory and knowledge](${siteUrl}/knowledge)
- [Integrations](${siteUrl}/integrations)
- [Voice agents](${siteUrl}/voice-agents)
- [Security](${siteUrl}/security)
- [Contact](${siteUrl}/contact)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
