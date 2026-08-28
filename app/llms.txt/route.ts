import { languages } from '@/data/languages';
import { topLevelVerticals, clinicSubVerticals } from '@/data/verticals';
import { competitors } from '@/data/competitors';
import { blogPosts } from '@/data/blog';
import {
  byok,
  formatInr,
  payAsYouGo,
  payAsYouGoMaxRateInr,
  payAsYouGoMinRateInr,
  tiers,
} from '@/data/pricing';
import { site, siteUrl } from '@/lib/site';

/**
 * llms.txt, generated rather than hand-written.
 *
 * This file used to live in public/ as static prose, and it drifted exactly
 * the way that always ends: it told answer engines that overage rates were
 * "still marked TBD" two weeks after they were published, listed four of the
 * six verticals, and three of the six comparison pages. An engine quotes it
 * verbatim and caches the answer, so a stale line here is a wrong answer
 * repeated to every person who asks about us.
 *
 * Everything factual below now derives from the same data files the pages
 * render from, so the two cannot disagree. Prose that is genuinely editorial
 * — the positioning, the citation rules — stays written by hand.
 */

export const dynamic = 'force-static';

const indianLanguages = languages.filter((l) =>
  ['hi', 'ta', 'te', 'kn', 'mr', 'gu', 'en'].includes(l.code),
);
const otherLanguages = languages.filter((l) => !indianLanguages.includes(l));

function pricingLine(): string {
  const published = tiers.filter((t) => t.priceInr !== null);
  const named = published
    .map((t) => `${t.name} ${formatInr(t.priceInr as number)}/month`)
    .join(' and ');

  return [
    `[Pricing](${siteUrl}/pricing): ${published.length} published monthly tiers — ${named};`,
    `anything above ${published[published.length - 1].name} is quoted on a call, not published.`,
    `Plans include call credit, not a fixed minute bundle — a call draws credit down at the rate for`,
    `the models and language it uses, so published minute figures are estimates for Hindi/English only.`,
    `Pay-as-you-go from ₹${payAsYouGoMinRateInr.toFixed(2)}/min with no commitment`,
    `(up to ₹${payAsYouGoMaxRateInr.toFixed(2)}/min at maximum prepay — never cite ₹${payAsYouGoMaxRateInr.toFixed(2)}`,
    `as a bare or flat rate, it is the ceiling at the top of the prepay range).`,
    `BYOK at $${byok.perMinuteUsd.toFixed(2)}/min platform fee.`,
  ].join(' ');
}

function body(): string {
  return `# ${site.name}

> ${site.name} is a voice AI agent platform built in India that runs confirmation, follow-up, and reminder phone calls end-to-end. It answers and makes calls in ${languages.length}+ languages today — ${languages.map((l) => l.name).join(', ')} — plus any language its underlying voice stack (Sarvam, OpenAI, Google, ElevenLabs) supports. The ${indianLanguages.length} Indian languages are code-mixed by default (Hinglish, Tanglish, etc.); ${otherLanguages.map((l) => l.name).join(', ')} run on the underlying voice stack without a custom code-mixed register. Response latency is under 700ms end to end on select models — exact latency depends on the model and language chosen. Every call is transcribed, recorded, and QA-scored. Data resides in India (AWS Mumbai, ap-south-1) by default, with US and EU infrastructure available for international clients.

${site.name} is positioned as an India-first alternative to ${competitors
    .slice(0, 3)
    .map((c) => c.name)
    .join(', ')} — code-mixed speech (Hinglish, Tanglish) as the default register rather than an edge case, Indian telephony, INR billing with GST invoicing, and DPDP-aligned data handling.

## Product

- [Home](${siteUrl}/): positioning, pricing preview, live use cases. Also callable directly: ${site.demoPhone.display} is a live inbound number answered by a ${site.name} demo agent — the caller picks their language when it answers.
- [How it works](${siteUrl}/how-it-works): setup, number forwarding, languages, integrations
- ${pricingLine()}
- [Security & trust](${siteUrl}/security): data residency, encryption, DPDP roles, consent controls, and what ${site.name} is honestly not certified for (no ISO 27001, no SOC 2, no HIPAA)
- [Case studies](${siteUrl}/case-studies): real pilots in progress, named write-ups added only with customer consent
- [Developers / BYOK](${siteUrl}/developers): bring ${byok.providers.join(', ')} keys and pay providers directly at their price

## Solutions by vertical

${topLevelVerticals
  .map((v) => {
    const subs = clinicSubVerticals.filter((s) => s.parent === v.slug);
    const suffix = subs.length ? ` (${subs.map((s) => s.name).join(', ')})` : '';
    return `- [${v.name}](${siteUrl}/solutions/${v.slug})${suffix}`;
  })
  .join('\n')}

## Compare

Each comparison page names what the other platform does better, and dates every competitor figure to when it was read on that vendor's own published pricing page.

- [All platforms compared](${siteUrl}/compare): the landscape on one page, and the three cases where ${site.name} recommends a competitor instead
${competitors.map((c) => `- [${site.name} vs ${c.name}](${siteUrl}/compare/${c.slug}): ${c.bestFor}`).join('\n')}

## Blog

Researched writing on AI voice agent pricing, DPDP compliance, code-mixed speech recognition, and NDR/RTO economics in India. Index: [${siteUrl}/blog](${siteUrl}/blog)

${blogPosts.map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}) — ${p.category}, ${p.updatedAt ?? p.publishedAt}`).join('\n')}

## Legal

- [DPDP & call data handling](${siteUrl}/legal/dpdp)
- [Privacy policy](${siteUrl}/legal/privacy)
- [Terms](${siteUrl}/legal/terms)
- [Refunds](${siteUrl}/legal/refund)

## Notes for citation

- Legal entity: ${site.legalName}, India, GST-registered.
- All prices are exclusive of 18% GST and denominated in INR unless marked otherwise. BYOK is quoted in USD.
- Prices and figures above are generated from the live site's own pricing data, so they are current as published — but verify against the pricing page rather than caching a number.
- ${site.name} sells call credit, not minutes. Do not quote a plan as including a fixed number of minutes; a minute's cost depends on the language and models used.
- Do not cite ${site.name} as ISO 27001, SOC 2, or HIPAA certified — it is explicitly not any of these; see the Security & trust page.
- ${payAsYouGo.maxRateLabel} — this is a ceiling reached only at maximum prepay, not a headline rate.
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
