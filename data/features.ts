export type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
};

export const features: Feature[] = [
  {
    eyebrow: 'The shelf',
    title: 'Hire a role, not a chatbot',
    body: 'Clinic front desk, property lead qualifier, collections caller, order confirmer. Each card says what the job is, what it speaks, what it needs access to, and what it costs a month. Pick one and it is working the same afternoon.',
    meta: 'Roles ready for Indian businesses',
  },
  {
    eyebrow: 'Build',
    title: 'Tell Decibyl the job',
    body: 'Describe it in plain sentences, typed or spoken. Decibyl builds the worker, shows you what it changed, and lets you hear it before anything goes live. Edit it the same way: "@reception, shorter Tamil greeting."',
    meta: 'Type it or say it',
  },
  {
    eyebrow: 'Channels',
    title: 'Phone, WhatsApp, email, web chat, SMS',
    body: 'One worker, every door the customer uses. The phone line is Indian, the WhatsApp is the business number, and the same memory and tools sit behind all of them.',
    meta: 'Voice is one channel, not the product',
  },
  {
    eyebrow: 'Routines',
    title: 'Work that runs on a schedule',
    body: 'Chase the pending invoices at 10, confirm tomorrow’s appointments at 6, send the daily summary at 9. A routine is armed only after a test run, and every run is on the timeline.',
    meta: 'Armed after a test run',
  },
  {
    eyebrow: 'Memory',
    title: 'Remembers, but asks before it believes',
    body: 'What a caller said last week is there next week. A fact learned from a call stays out of every worker’s prompt until somebody confirms it, so a misheard address never becomes the record. Gaps sit beside facts: "twelve callers asked about Saturday hours."',
    meta: 'Confirmed facts only',
  },
  {
    eyebrow: 'Tools',
    title: 'Writes to Tally, Zoho, Sheets and 100 more',
    body: 'The outcome of every conversation lands where you already look. Systems your business runs on are premium connectors; a desktop companion for software with no API is on the way.',
    meta: 'Composio · Tally · Zoho · Sheets',
  },
  {
    eyebrow: 'Receipts',
    title: 'A price you can check',
    body: 'One credit is fifty paise. Every event a worker performs has a published credit price, and every receipt lists each one. No blended minute, no surprise invoice.',
    meta: 'Published rate card',
  },
  {
    eyebrow: 'Check it',
    title: 'Tested before it meets a customer',
    body: 'Hear it on a real call, try it as a caller in a test frame, or run a scripted caller and let a judge grade it. Every test is stamped as a test and never touches your customer data.',
    meta: 'Hear it · Try it · Check it',
  },
  {
    eyebrow: 'Handoff',
    title: 'Transfers to a human',
    body: 'On distress, on dispute, on anything clinical, or simply when the caller asks. You set the conditions and the number.',
    meta: 'Every plan',
  },
  {
    eyebrow: 'Open',
    title: 'MCP-native',
    body: 'Define and change workers from Claude Code or any coding agent. The same builder, the same price estimate before the first call.',
    meta: 'MCP · SDK',
  },
];

/** The three structural advantages — §1 of the brief. The CMO core. */
export const advantages: { advantage: string; claim: string; why: string }[] = [
  {
    advantage: 'Indic-native stack',
    claim: 'Sarvam STT/TTS — roughly 7× cheaper than US alternatives and better on Indian languages.',
    why: 'Provable in our pricing.',
  },
  {
    advantage: 'Indian telephony',
    claim: 'Indian SIP trunking, roughly 5× cheaper than Twilio-class providers.',
    why: 'Provable in our pricing.',
  },
  {
    advantage: 'Full ownership',
    claim: 'No third-party orchestration layer, so no orchestration fee.',
    why: 'Provable in our pricing.',
  },
];

export const indianOps: { title: string; body: string }[] = [
  {
    title: 'GST-compliant invoicing',
    body: 'Billing through Razorpay, invoices your finance team can actually file. All prices exclusive of 18% GST.',
  },
  {
    title: 'Indian phone numbers',
    body: 'Indian DIDs included on managed plans, on Indian SIP trunking — not a US number with an Indian accent.',
  },
  {
    title: 'DPDP-aligned consent',
    body: 'Automated-assistant disclosure at the start of every call, recording disclosure, and deletion on request.',
  },
  {
    title: 'Data resident in India',
    body: 'Recordings and transcripts stored on AWS Mumbai (ap-south-1). No round trip through a US region.',
  },
];

export const howItWorks: { title: string; body: string }[] = [
  {
    title: 'Tell Decibyl the job',
    body: 'Pick a role from the shelf or describe the job in plain sentences, typed or spoken. Decibyl builds the worker and you hear it before it goes anywhere.',
  },
  {
    title: 'Put it on your channels',
    body: 'Forward the number you already advertise, connect the WhatsApp, the email or the website. Nothing you print changes.',
  },
  {
    title: 'It works, and writes it down',
    body: 'Calls, messages and routines run in the customer’s language. Every outcome lands in Tally, Zoho or Sheets, and every action is on the timeline with a receipt.',
  },
];

/** Trust strip — provable facts only. */
export const trustStrip = [
  'Phone · WhatsApp · email · web chat',
  '10+ Indian languages',
  'Data in India (ap-south-1)',
  'Published rate card, GST invoicing',
];

/**
 * P0-5, 13 Aug 2026: replaces the old ₹/min "why the economics work" table.
 * Category columns, not named competitors — these don't go stale the way a
 * named comparison does. Named comparisons live on /compare/*.
 */
export const inclusionComparison: {
  feature: string;
  decibyl: string;
  developer: string;
  bundle: string;
}[] = [
  {
    feature: 'Indian phone number',
    decibyl: 'Included',
    developer: 'Buy separately',
    bundle: '₹250–₹1,500/mo extra',
  },
  {
    feature: 'Telephony minutes',
    decibyl: 'Included',
    developer: 'Billed separately',
    bundle: 'Sometimes',
  },
  {
    feature: 'Agent built for you',
    decibyl: 'Included',
    developer: 'You build it',
    bundle: 'Setup fee, often ₹1,000–₹20,000',
  },
  { feature: 'QA scoring', decibyl: 'Every call', developer: 'Not offered', bundle: 'Not offered' },
  {
    feature: 'Data residency',
    decibyl: 'India (ap-south-1)',
    developer: 'US default',
    bundle: 'Varies',
  },
  { feature: 'GST invoice', decibyl: 'Yes', developer: 'No INR billing', bundle: 'Yes' },
  { feature: 'Human handoff', decibyl: 'Every plan', developer: 'Build it yourself', bundle: 'Varies' },
];
