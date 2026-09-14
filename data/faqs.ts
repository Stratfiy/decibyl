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
    a: 'No. Every price on this page is exclusive of 18% GST, which is added at invoicing for accounts billed in India. Accounts billed outside India are invoiced in dollars as a zero-rated export.',
  },
  {
    q: 'What is a credit, and what does one cost?',
    a: 'One credit is fifty paise. Plans grant credits every month, top-up packs sell them at the same fifty paise, and every event a bot performs costs a whole number of them. A charge rounds up to the next credit per event; your balance shows what you can spend, rounded down.',
  },
  {
    q: 'How much does an AI calling agent cost in India?',
    a: 'On Decibyl, voice plans start at ₹2,999 a month with a phone number, telephony and 6,000 credits included, and a minute on the Everyday voice is 13 credits, ₹6.50, falling to ₹6 on Growth and ₹5.50 on Scale. The number worth checking on any vendor is what sits under the headline rate: whether telephony, the number, the speech and language models and concurrency are inside it or billed separately. Every rate on this page is shown with what it contains.',
  },
  {
    q: 'What counts as a minute?',
    a: 'Connected call time, on the actual duration of calls the bot handles. Ringing time is not billed. A Natural or Premium voice minute is itemised at what the speech model cost, marked up and rounded up per call, and each component is on the receipt.',
  },
  {
    q: 'What happens when my plan credits run out?',
    a: 'Voice minutes cost one credit more and are paid from your top-up balance; every other event stays at its rate. Scale never pays the overage rate. Nothing is billed in arrears: you spend only credits you hold, so there is no surprise invoice at the end of the month.',
  },
  {
    q: 'Do unused credits carry over?',
    a: 'Plan credits carry over up to one month of your plan, then lapse. Top-up credits never expire and are spent after plan credits, so a pack is never wasted on a month you already paid for.',
  },
  {
    q: 'Why is the included calling shown as an estimate?',
    a: 'Because credits also pay for replies, knowledge answers, routines and tool calls, and because a Natural or Premium voice minute is itemised rather than flat. The minute figure assumes every credit goes on Everyday voice calls. Your receipt shows the real split.',
  },
  {
    q: 'Which voice should I start on?',
    a: 'Everyday, for almost everyone. It is the best option we have on Indian languages, carries one flat rate for every language, and is the cheapest a minute. Move to Natural if the pause before the reply matters, and to Premium only when speech quality is the deciding factor.',
  },
  {
    q: 'How much does an additional phone number cost?',
    a: 'Additional numbers are ₹559 a month each, exclusive of GST, billed in rupees rather than credits. Every voice plan includes at least one number with telephony.',
  },
  {
    q: 'Is telephony included, or do I pay a carrier separately?',
    a: 'Included on every voice plan, along with the phone numbers listed in each tier. There is no separate carrier bill to reconcile.',
  },
  {
    q: 'What does an itemised receipt actually show?',
    a: 'Every event, its credits and its rupees. A call closes with each component priced at the rate it actually ran on; a routine, a tool call or a knowledge answer shows as its own line at the published rate. You can check the arithmetic against the rate card on this page.',
  },
  {
    q: 'Can I pay annually, or in dollars?',
    a: 'Annual is ten months for twelve on every paid plan. Everyday is sold at $10 a month to accounts billed outside India, and top-up packs come in dollar sizes for the same accounts. Voice plans are billed in rupees because voice is India-only.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes, up or down, at the next billing cycle. A cap you hit in the product shows the plan that lifts it.',
  },
];
