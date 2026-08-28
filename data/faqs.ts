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
    a: 'Not on the managed plans — telephony and models are included, and there are no API keys for you to manage. If you would rather bring your own keys, the BYOK plan is a $0.02 per-minute platform fee and you pay providers directly at their price, with zero markup from us.',
  },
  {
    q: 'Do you mark up model costs?',
    a: 'No. Sarvam STT/TTS runs roughly 7× cheaper than US alternatives and handles Indian languages better; Indian SIP trunking runs roughly 5× cheaper than Twilio-class providers; and there is no third-party orchestration layer sitting in the middle taking its own fee. We charge a platform fee and show the provider cost separately — check the arithmetic yourself on the pricing page rather than trusting a blended rate.',
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
    q: 'What counts as a minute?',
    a: 'Connected call time, billed on the actual duration of calls the agent handles. Ringing time is not billed.',
  },
  {
    q: 'What happens when my included calling runs out?',
    a: 'Your plan includes call credit rather than a fixed minute bundle, and calls draw it down as they happen. Once it is used, calling continues at ₹5.30/min on Starter and ₹4.50/min on Growth. Above Growth it is quoted against your actual volume. Credit does not carry into the next month.',
  },
  {
    q: 'Why do you quote credit instead of a flat number of minutes?',
    a: 'Because a minute is not one price. What a call costs depends on the language, the models it uses and how many turns it takes — a Tamil call costs more per minute than a Hindi or English one. Quoting credit means the number on your invoice matches the number on this page. The minute figures here are estimates for Hindi and English, and we say so rather than quoting a bundle we would have to qualify later.',
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
    q: 'What does "zero markup" actually mean?',
    a: 'A blended per-minute rate hides the margin taken on model costs. We charge a platform fee and show the provider cost separately, so you can check the arithmetic yourself. On BYOK you pay the providers directly at their list price and we never touch it.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes, up or down. Talk to us and we will move you at the next billing cycle.',
  },
];
