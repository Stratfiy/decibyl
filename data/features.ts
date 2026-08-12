export type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
};

export const features: Feature[] = [
  {
    eyebrow: 'Inbound',
    title: 'Answers every call at once',
    body: 'Concurrent calls, day or night. Nobody hears a ring tone and dials your competitor instead.',
    meta: 'Inbound · 24×7',
  },
  {
    eyebrow: 'Outbound',
    title: 'Campaigns from a list',
    body: 'Upload the list, set the window, and the calls go out — reminders, confirmations, follow-ups.',
    meta: 'Growth tier and above',
  },
  {
    eyebrow: 'Handoff',
    title: 'Transfers to a human',
    body: 'On distress, on dispute, on anything clinical, or simply when the caller asks. You set the conditions and the number.',
    meta: 'Every plan',
  },
  {
    eyebrow: 'Quality',
    title: 'QA on 100% of calls',
    body: 'Every call scored, not a 2% sample. Sampled QA finds a bad call after it has already cost you something.',
    meta: '100%, not 2%',
  },
  {
    eyebrow: 'Record',
    title: 'Transcript and recording, every call',
    body: 'Searchable transcripts and audio you can hand to a client, a regulator, or a new hire.',
    meta: 'Retrievable',
  },
  {
    eyebrow: 'Tools',
    title: 'Books, sends, and writes back',
    body: 'Calendar slots, confirmation SMS and email, and a webhook to your own system at the end of every call.',
    meta: 'Calendar · SMS · Webhook',
  },
  {
    eyebrow: 'Build',
    title: 'MCP-native agent building',
    body: 'Define and change agents from Claude Code. India’s first voice agent platform built this way.',
    meta: 'MCP',
  },
  {
    eyebrow: 'Latency',
    title: '~2.6 second responses',
    body: 'Close enough to conversational that callers talk normally instead of waiting for the machine.',
    meta: '~2.6s end to end',
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
    title: 'Describe the agent',
    body: 'What it should say, what it must never say, when it transfers to a human, and which language it opens in. Written in plain sentences, not a flow chart.',
  },
  {
    title: 'Connect a number',
    body: 'Take an Indian DID from us, or forward the number you already advertise. Your printed material stays valid — this is forwarding, not porting.',
  },
  {
    title: 'Calls run, outcomes write back',
    body: 'Inbound and outbound, in Indian languages and beyond, with the transcript, recording, QA score, and structured outcome landing in your system.',
  },
];

/** Trust strip — provable facts only. */
export const trustStrip = [
  '~2.6s response latency',
  '7+ languages',
  'Data in India (ap-south-1)',
  'GST invoicing',
  'Zero markup on model costs',
];
