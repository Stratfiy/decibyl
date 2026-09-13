export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: 'What languages does Decibyl support?',
    a: 'Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, English, French, Spanish, and Arabic live today on every plan — plus any language your voice stack supports, since Decibyl runs on Sarvam, OpenAI, Google, and ElevenLabs underneath.',
  },
  {
    q: 'Can it handle Hinglish or code-mixed speech?',
    a: 'Yes, and this is the point rather than a feature. Most Indian business calls switch between a regional language and English inside a single sentence. Code-mixed speech is the default register the agent is built for, not an edge case it tolerates.',
  },
  {
    q: 'Do I need my own OpenAI or ElevenLabs account?',
    a: 'No. Every provider key is ours, so there is nothing for you to sign up for and nothing to manage. If you want to choose the models rather than take a bundle, the Advanced tab lets you name the vendor and model for speech, brain and voice — still on our keys, still one bill.',
  },
  {
    q: 'Why is Decibyl cheaper per minute than a US platform?',
    a: 'The stack underneath, not a discount. Sarvam STT/TTS runs roughly 7\u00d7 cheaper than US alternatives and handles Indian languages better; Indian SIP trunking runs roughly 5\u00d7 cheaper than Twilio-class providers; and there is no third-party orchestration layer sitting in the middle taking its own fee. Each bundle\u2019s per-minute rate is published on the pricing page.',
  },
  {
    q: 'Do I get a GST invoice?',
    a: 'Yes. Decibyl is built by nAutomation Labs Pvt Ltd, an India-registered, GST-compliant company. Billing runs through Razorpay and every invoice is GST-compliant. All published prices are exclusive of 18% GST.',
  },
  {
    q: 'Where is call data stored?',
    a: 'In India, on AWS Mumbai (ap-south-1). Recordings and transcripts stay in region, and you can request deletion at any time.',
  },
  {
    q: 'Can the agent transfer to a human?',
    a: 'Yes, on every plan. You configure the number, and the conditions — distress, a clinical question, a dispute, or simply the caller asking for a person.',
  },
  {
    q: 'How fast does the agent respond?',
    a: 'Under 700ms end to end on select models — close enough to conversational that callers talk to it normally rather than waiting for it. Exact latency depends on the model and language you pick; we tell you the number for your setup before you commit to it.',
  },
  {
    q: 'Do you support inbound as well as outbound?',
    a: 'Both. Inbound reception and outbound campaigns run on the same agent, with the same transcripts, recordings, and QA scoring.',
  },
  {
    q: 'Can I use my existing phone number?',
    a: 'Yes — you forward your existing number to the agent. You keep the number on your board, your listing, and your printed material, and nothing needs reprinting. To be precise about the mechanism: this is call forwarding, not number porting. Indian mobile number portability does not support cloud telephony providers as recipient operators, so forwarding is the correct and only route.',
  },
  {
    q: 'Is Decibyl a voicebot, an AI calling agent, or an AI voice agent?',
    a: 'Buyers in India use all three names for the same job, and vendors are not consistent either, so the label matters less than the architecture behind it. An older voicebot sits in front of an IVR menu and routes the caller to a human or a recorded branch. Decibyl is voice-native: the agent holds the whole conversation, handles interruptions, switches between Hindi and English mid-sentence, and completes the task on the call. If you are comparing vendors, ask which of the two you are being sold — a voicebot add-on to a telephony plan and a voice-native calling agent are often priced alike and behave very differently.',
  },
  {
    q: 'Can this replace our telecalling team?',
    a: 'For the repetitive, high-volume part of it, yes — confirmation, follow-up, reminder and first-pass qualification calls are exactly what the agent is built to run end to end, in the language the customer answers in. What it does not replace is the judgement call: a negotiation, an upset customer, or anything that needs someone to make a decision your policy does not already cover. The realistic pattern is that telecallers stop dialling lists and start taking the transfers that matter, which is also the version your team will actually cooperate with.',
  },
  {
    q: 'How is this different from Vapi or Bolna?',
    a: 'Three structural things: an Indic-native model stack, Indian telephony, and no third-party orchestration layer taking a fee in the middle. That combination is why the per-minute economics work in India. We keep honest comparison pages for Vapi, Bolna, and Retell — including where each of them is genuinely stronger than us.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: 'Are prices inclusive of GST?',
    a: 'No — every price on this page is exclusive of 18% GST, which is added at invoicing.',
  },
  {
    q: 'How much does an AI calling agent cost in India?',
    a: 'On Decibyl, from ₹4.91/min on the Everyday bundle, with managed plans from ₹2,999/month that include telephony and an Indian number, exclusive of 18% GST. The number worth checking on any vendor is not the headline per-minute rate but what sits underneath it: whether telephony, the phone number, the speech and language models, concurrency beyond a few simultaneous calls, and setup are inside that rate or billed separately. A low advertised rate with four separate lines under it frequently costs more than a higher published one that includes them, which is why every rate on this page is shown with what it contains.',
  },
  {
    q: 'What counts as a minute?',
    a: 'Connected call time, billed on the actual duration of calls the agent handles. Ringing time is not billed.',
  },
  {
    q: 'What happens when my included credit runs out?',
    a: 'You top up, and calling continues. Credit is added instantly, and there is no overage bill and no invoice at the end of the month — calling simply draws on the credit you have, so you can never be billed for a month you did not intend to spend. Unused plan credit does not carry into the next billing month.',
  },
  {
    q: 'Why is the included calling shown as a range of minutes?',
    a: 'Because a minute is not one price, and the biggest factor is which voice you choose. Everyday runs an Indic-optimised pipeline and is the cheapest a minute. Natural and Premium are speech-to-speech models that reply the instant you stop talking, and Premium — the most capable speech model available — costs around five times what Everyday does for the same minute. Regional languages also cost more than Hindi or English on any bundle. The range shows the dearest and cheapest ends so you can see the real spread before you pick.',
  },
  {
    q: 'Which voice bundle should I start on?',
    a: 'Everyday, for almost everyone. It is the best option we have on Indian languages and the cheapest to run, so it gives you the most calling for the same credit. Move to Natural if the pause before the agent replies matters for your use case, and to Premium only when speech quality is genuinely the deciding factor — at its rate a Starter plan buys around a hundred minutes rather than several hundred.',
  },
  {
    q: 'How much does an additional phone number cost?',
    a: 'Additional numbers are ₹559/month each, exclusive of GST. Every plan includes at least one number with telephony.',
  },
  {
    q: 'Is telephony included, or do I pay a carrier separately?',
    a: 'Included on the managed plans, along with the phone numbers listed in each tier. There is no separate Twilio-style carrier bill to reconcile.',
  },
  {
    q: 'What does an itemised call receipt actually show?',
    a: 'A blended per-minute rate hides where the money went. Every Decibyl call closes with the platform fee and each provider component — speech-to-text, the model, text-to-speech, telephony — as its own line, priced at the rate that call actually ran on. You are billed for what the call cost rather than a rounded-up minute, and you can check the arithmetic against the published bundle rate yourself.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes, up or down. Talk to us and we will move you at the next billing cycle.',
  },
];
