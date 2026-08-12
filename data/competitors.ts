export type Competitor = {
  slug: string;
  name: string;
  /** Who they are genuinely best for. Be fair — a technical buyer fact-checks. */
  summaryThem: string;
  summaryUs: string;
  strongerThem: { title: string; body: string }[];
  strongerUs: { title: string; body: string }[];
  table: { feature: string; them: string; us: string }[];
  verdict: string;
  relatedVerticals: string[];
  seo: { title: string; description: string; keywords: string[] };
};

const sharedTable = (them: {
  languages: string;
  dids: string;
  billing: string;
  residency: string;
  mcp: string;
  byok: string;
  markup: string;
  onboarding: string;
}) => [
  {
    feature: 'Indian languages',
    them: them.languages,
    us: '7 live, code-mixed by default — plus any language your stack supports',
  },
  { feature: 'Indian phone numbers (DIDs)', them: them.dids, us: 'Indian DIDs, Indian SIP trunking included' },
  { feature: 'INR billing + GST invoice', them: them.billing, us: 'INR-first, GST-compliant invoice via Razorpay' },
  { feature: 'Data residency', them: them.residency, us: 'India, US, or EU — Mumbai (ap-south-1) by default' },
  { feature: 'MCP-native agent building', them: them.mcp, us: 'Yes — build agents from Claude Code' },
  { feature: 'BYOK', them: them.byok, us: 'Yes — $0.02/min platform fee, pay providers directly' },
  { feature: 'Markup model', them: them.markup, us: 'Zero markup on model costs, shown separately' },
  { feature: 'Managed onboarding', them: them.onboarding, us: 'Managed setup, typically half a day' },
];

export const competitors: Competitor[] = [
  {
    slug: 'vapi',
    name: 'Vapi',
    summaryThem:
      'Vapi is a mature, developer-first voice platform with a large ecosystem, good documentation, and instant self-serve signup. If you are building in the US or Europe, want to pick your own STT/LLM/TTS stack, and your callers speak English, Vapi is a strong and well-supported default — and it will keep getting better faster than a smaller platform can.',
    summaryUs:
      'Decibyl is built India-first. Indian languages with code-mixed speech as the normal case, Indian telephony, INR billing with a GST invoice, and data resident in Mumbai by default — with US and EU infrastructure available for teams serving customers outside India too. If your callers speak Hindi or Tamil and your finance team needs a GST invoice, that combination is the whole reason we exist; it just doesn\'t stop there.',
    strongerThem: [
      {
        title: 'Larger ecosystem and more mature docs',
        body: 'More integrations, more community examples, more people who have hit your bug before. That is real and worth money.',
      },
      {
        title: 'Instant self-serve onboarding',
        body: 'Sign up and ship in an afternoon without talking to anyone. Our managed tiers involve a setup conversation.',
      },
      {
        title: 'Breadth of model and vendor choice',
        body: 'A wider menu of providers and configurations for teams who want to tune every layer themselves.',
      },
      {
        title: 'Track record at scale outside India',
        body: 'More production deployments and more operating history than we have.',
      },
    ],
    strongerUs: [
      {
        title: 'Indic-native stack',
        body: 'Sarvam STT/TTS — roughly 7× cheaper than US alternatives and better on Indian languages. Code-mixed Hinglish and Tanglish are the default register, not an edge case.',
      },
      {
        title: 'Indian telephony',
        body: 'Indian SIP trunking, roughly 5× cheaper than Twilio-class providers, with Indian DIDs included in the managed tiers.',
      },
      {
        title: 'Full ownership of the stack',
        body: 'No third-party orchestration layer sitting in the middle, so there is no orchestration fee to pass on to you.',
      },
      {
        title: 'Indian billing and data residency',
        body: 'INR pricing, GST-compliant invoicing, and call data in AWS Mumbai (ap-south-1) — which is what actually gets a DPDP-conscious buyer to sign.',
      },
    ],
    table: sharedTable({
      languages: 'Strong English; Indian language support via third-party providers',
      dids: 'Via Twilio/Vonage — Indian DIDs need your own KYC and arrangement',
      billing: 'USD, no GST invoice',
      residency: 'US/EU regions',
      mcp: 'No',
      byok: 'Yes',
      markup: 'Platform fee plus provider costs',
      onboarding: 'Self-serve, instant',
    }),
    verdict:
      'Want the biggest ecosystem and don\'t need Indian telephony or GST billing? Use Vapi. Calling Indian customers in Indian languages, paying in INR, and answering to an Indian finance and compliance process — with the option to run on US or EU infrastructure when you also serve customers there? That is what we built.',
    relatedVerticals: ['d2c-ndr-recovery', 'clinics'],
    seo: {
      title: 'Vapi Alternative India — Honest Comparison',
      description:
        'Decibyl vs Vapi for Indian teams: Indian languages, Indian DIDs, INR and GST billing, data residency — and where Vapi is genuinely stronger.',
      keywords: ['Vapi alternative India', 'Vapi vs Decibyl', 'Vapi India pricing', 'voice AI platform India'],
    },
  },
  {
    slug: 'bolna',
    name: 'Bolna',
    summaryThem:
      'Bolna is an Indian voice AI platform with real Indian-language support and a self-serve product that gets you calling quickly. They have been in market longer than we have and have a wider set of live customers. For a team that wants an Indian platform with instant signup and does not need to see the model economics, Bolna is a reasonable choice.',
    summaryUs:
      'We compete on the cost structure and on what you can audit. We own the stack end to end with no orchestration layer in the middle, we publish a platform fee with the provider cost shown separately rather than a blended per-minute rate, and we score 100% of calls rather than a sample.',
    strongerThem: [
      {
        title: 'Longer in market',
        body: 'More operating history and a broader live customer base than we have today. That matters and we are not going to pretend otherwise.',
      },
      {
        title: 'Instant self-serve onboarding',
        body: 'Sign up and start without a conversation.',
      },
      {
        title: 'Broader published integration list',
        body: 'More named integrations available off the shelf today.',
      },
    ],
    strongerUs: [
      {
        title: 'Zero markup, shown separately',
        body: 'A blended per-minute rate hides the model markup. We charge a platform fee and show the provider cost separately, so you can check the arithmetic.',
      },
      {
        title: 'MCP-native',
        body: 'Build and modify agents from Claude Code. As far as we know we are the first voice agent platform in India to work this way.',
      },
      {
        title: 'QA on 100% of calls',
        body: 'Every call scored, not a 2% sample. In regulated verticals this is the difference between an audit position and an anecdote.',
      },
      {
        title: 'Full stack ownership',
        body: 'No third-party orchestration layer, which is where a chunk of the per-minute cost usually goes.',
      },
    ],
    table: sharedTable({
      languages: 'Yes — Indian languages supported',
      dids: 'Indian DIDs available',
      billing: 'INR billing available',
      residency: 'Check current provider documentation',
      mcp: 'No',
      byok: 'Limited',
      markup: 'Blended per-minute rate',
      onboarding: 'Self-serve, instant',
    }),
    verdict:
      'Both platforms speak your customer’s language. Choose Bolna for a longer track record and instant self-serve. Choose Decibyl if you want to see the model cost separately from the platform fee, want every call scored, or want to build agents from your own tooling over MCP.',
    relatedVerticals: ['d2c-ndr-recovery', 'lending-collections'],
    seo: {
      title: 'Bolna Alternative — Honest Comparison',
      description:
        'Decibyl vs Bolna for Indian teams: pricing transparency, MCP-native agent building, QA on 100% of calls, and where Bolna is genuinely stronger.',
      keywords: ['Bolna alternative', 'Bolna vs Decibyl', 'Indian voice AI platform comparison'],
    },
  },
  {
    slug: 'retell',
    name: 'Retell AI',
    summaryThem:
      'Retell is a polished, developer-friendly voice platform with strong English conversation quality and a clean product experience. For English-language use cases in North America — appointment setting, qualification, support triage — it is a genuinely good product with a mature dashboard.',
    summaryUs:
      'Retell is built for English-speaking markets. If your calls are in Hindi, Tamil, or Telugu, mix two languages in a sentence, need an Indian number, and have to appear on a GST invoice, you are working against the grain of the product rather than with it.',
    strongerThem: [
      {
        title: 'English conversation quality and latency tuning',
        body: 'A well-engineered English experience with a lot of production hours behind it.',
      },
      {
        title: 'Mature dashboard and analytics',
        body: 'More polish in the product surface than a younger platform has.',
      },
      {
        title: 'US telephony and compliance surface',
        body: 'Better fit if your calls, your customers, and your regulators are American.',
      },
    ],
    strongerUs: [
      {
        title: 'Code-mixed Indian speech',
        body: 'Hinglish and Tanglish are the default register we are built for, not a stretch case.',
      },
      {
        title: 'Indian telephony economics',
        body: 'Indian SIP trunking, roughly 5× cheaper than Twilio-class providers, with DIDs included.',
      },
      {
        title: 'INR, GST, and ap-south-1',
        body: 'Priced in rupees, invoiced with GST, and stored in India.',
      },
      {
        title: 'Zero markup on model costs',
        body: 'Platform fee and provider cost shown separately.',
      },
    ],
    table: sharedTable({
      languages: 'Strong English; limited Indian language coverage',
      dids: 'US-first; Indian DIDs are not the primary path',
      billing: 'USD, no GST invoice',
      residency: 'US regions',
      mcp: 'No',
      byok: 'Limited',
      markup: 'Blended per-minute rate',
      onboarding: 'Self-serve, instant',
    }),
    verdict:
      'Calling North America in English? Retell is a good product and we would not try to talk you out of it. Calling India, in Indian languages, with Indian billing? Use us.',
    relatedVerticals: ['clinics', 'real-estate'],
    seo: {
      title: 'Retell AI Alternative India — Comparison',
      description:
        'Decibyl vs Retell AI: Indian languages and code-mixed speech, Indian DIDs, INR and GST billing, data residency — and where Retell is stronger.',
      keywords: ['Retell alternative India', 'Retell vs Decibyl', 'Retell AI India'],
    },
  },
  {
    slug: 'squadstack',
    name: 'SquadStack',
    summaryThem:
      'SquadStack builds voice AI specifically for high-volume Indian sales, lending, and activation outreach, trained on a reported 600M+ minutes of real Indian contact-centre audio. If you are a large consumer brand replacing a telecalling team at serious scale — SquadStack cites 40 lakh+ calls a day across its customer base — it has the training data and the omnichannel tooling (call, WhatsApp, SMS, in-app) that a smaller platform will not have built yet.',
    summaryUs:
      'Decibyl publishes its prices and gets you live in about half a day. SquadStack runs on custom enterprise pricing — reported to start around ₹5 lakh+ a year — reached through a sales conversation, not a page you can read before one.',
    strongerThem: [
      {
        title: 'Scale and training data',
        body: 'A reported 600M+ minutes of real Indian contact-centre audio and 40 lakh+ calls a day across its customer base. Few platforms anywhere have that much real call data to train sales-conversation handling on.',
      },
      {
        title: 'Omnichannel beyond voice',
        body: 'Call, WhatsApp, SMS, and in-app engagement in one platform, with quality monitoring and A/B testing built in — useful if voice is one channel of several in your outreach motion, not the whole thing.',
      },
      {
        title: 'Built specifically for high-volume sales and lending outreach',
        body: 'Lead qualification, onboarding, renewals, and collections are the core workflow, not a general-purpose calling layer adapted to fit them.',
      },
    ],
    strongerUs: [
      {
        title: 'Published pricing',
        body: 'A number you can read on the pricing page, not a figure you get after a sales call.',
      },
      {
        title: 'Live in about half a day',
        body: 'No enterprise sales cycle to get through before your first call runs.',
      },
      {
        title: 'MCP-native agent building',
        body: 'Build and modify agents from Claude Code — not published as a SquadStack capability.',
      },
      {
        title: 'Zero markup, shown separately',
        body: 'A platform fee with the provider cost shown apart from it, rather than a custom quote you cannot itemise.',
      },
    ],
    table: sharedTable({
      languages: '8+ languages incl. Hindi, Hinglish, Tamil, Telugu — trained on Indian contact-centre audio',
      dids: 'Not published',
      billing: 'Custom enterprise pricing, ₹5L+/year typical; GST invoicing not published',
      residency: 'Not published',
      mcp: 'No',
      byok: 'Not published',
      markup: 'Custom quote — not itemised',
      onboarding: 'Enterprise sales process, not self-serve',
    }),
    verdict:
      'Replacing a large telecalling team for high-volume sales or lending outreach, with an enterprise budget and an ops team to run it? SquadStack has the scale and the training data for exactly that. Want to see the price today and be live this week? That is Decibyl.',
    relatedVerticals: ['lending-collections', 'd2c-ndr-recovery'],
    seo: {
      title: 'SquadStack Alternative — Honest Comparison',
      description:
        'Decibyl vs SquadStack for Indian teams: published pricing, fast setup, MCP-native agent building — and where SquadStack’s scale is genuinely stronger.',
      keywords: ['SquadStack alternative', 'SquadStack vs Decibyl', 'voice AI platform India comparison'],
    },
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs Agents',
    summaryThem:
      'ElevenLabs is widely regarded as the voice-quality leader in the market — Expressive Mode adapts tone to conversation context, RAG is built into the platform natively, and you can plug in Gemini, Claude, or GPT as the reasoning layer directly. It already has real enterprise traction in India: Cars24, Razorpay, and Unacademy use ElevenLabs Agents for domain-specific assistants. To be precise about what is being compared here: Decibyl uses ElevenLabs as one of the voice providers in its own stack, alongside Sarvam, OpenAI, and Google. This page compares against ElevenLabs’ own Agents platform — the end-to-end orchestration product — not against the underlying voice models Decibyl may call on.',
    summaryUs:
      'Decibyl is built around Indian telephony, INR billing with a GST invoice, and code-mixed Hinglish and Tanglish as the default register — not a general multilingual capability configured toward it.',
    strongerThem: [
      {
        title: 'Voice quality leadership',
        body: 'Widely regarded as the best-sounding TTS in the market, with an Expressive Mode that adapts delivery to what the caller is feeling.',
      },
      {
        title: 'Bring your own LLM',
        body: 'Gemini, Claude, or GPT can sit behind the voice layer directly, for teams who want to choose and swap the reasoning model themselves.',
      },
      {
        title: 'RAG built in natively',
        body: 'Agents pull from a knowledge base without bolting on separate retrieval infrastructure.',
      },
      {
        title: 'Real enterprise traction in India already',
        body: 'Cars24, Razorpay, and Unacademy are named users of ElevenLabs Agents for domain-specific assistants — genuine proof at scale.',
      },
    ],
    strongerUs: [
      {
        title: 'Indian telephony included',
        body: 'Indian DIDs and SIP trunking, not a Twilio-class integration bolted on.',
      },
      {
        title: 'INR billing and a GST invoice',
        body: 'Priced and invoiced the way an Indian finance team needs, not converted from USD after the fact.',
      },
      {
        title: 'India data residency by default',
        body: 'Mumbai (ap-south-1) by default, not a US/EU region with India as an afterthought.',
      },
      {
        title: 'Code-mixed speech as the default register',
        body: 'Hinglish and Tanglish are what the agent is built for, not a general multilingual capability aimed at it.',
      },
    ],
    table: sharedTable({
      languages: '31 languages (70+ across the broader voice platform); strong general multilingual, not code-mixed-specific',
      dids: 'Telephony via Twilio/SIP integration — no Indian DIDs natively included',
      billing: 'USD, $0.10–0.30/min depending on tier; no GST invoice',
      residency: 'US/EU regions',
      mcp: 'No',
      byok: 'Partial — bring your own LLM (Gemini, Claude, GPT); voice stays ElevenLabs',
      markup: 'Blended per-minute rate (voice + LLM + platform)',
      onboarding: 'Self-serve, instant',
    }),
    verdict:
      'Want the best raw voice quality in the market and the flexibility to plug in any major LLM yourself? ElevenLabs Agents is a genuinely strong choice. Need Indian telephony, INR billing with GST, and code-mixed speech handled as the default rather than configured toward it? That is what Decibyl is built around.',
    relatedVerticals: ['clinics', 'real-estate'],
    seo: {
      title: 'ElevenLabs Agents Alternative India — Comparison',
      description:
        'Decibyl vs ElevenLabs Agents: Indian telephony, INR and GST billing, data residency, code-mixed speech — and where ElevenLabs genuinely leads on voice quality.',
      keywords: ['ElevenLabs Agents alternative', 'ElevenLabs vs Decibyl', 'ElevenLabs Conversational AI India'],
    },
  },
  {
    slug: 'gnani',
    name: 'Gnani.ai',
    summaryThem:
      'Gnani is a serious India-built enterprise voice AI company, and the most compliance-heavy platform on this page: SOC 2, ISO 27001, GDPR, HIPAA, and PCI DSS certifications, with cloud, private cloud, on-premises, and air-gapped deployment options. Its speech models handle 12+ Indian languages with genuine mid-sentence code-switching, reportedly trained on 14 million hours of real telephonic audio, and it is proven at large regulated enterprises — HDFC Bank, Airtel, and Tata Motors are named customers. If your procurement process requires a specific certificate or your compliance mandate rules out cloud entirely, this is the most direct answer on this page, and Decibyl is honest that it is not there yet — see Security & trust.',
    summaryUs:
      'Decibyl publishes its prices and is live in about half a day. Gnani does not publish pricing and runs a reported 3–6 month enterprise sales cycle with an 8–16 week deployment — built for a different kind of buyer and a different kind of timeline.',
    strongerThem: [
      {
        title: 'Compliance certifications Decibyl does not have',
        body: 'SOC 2, ISO 27001, GDPR, HIPAA, and PCI DSS. Decibyl is explicitly not certified for any of these today — if your procurement process requires one of these certificates specifically, that is the whole answer, and Gnani has it.',
      },
      {
        title: 'On-premises and air-gapped deployment',
        body: 'For a compliance mandate that rules out cloud entirely, this is not a nice-to-have difference — a cloud-only platform, including Decibyl, is simply not eligible.',
      },
      {
        title: 'Real Indian-language code-switching depth at scale',
        body: '12+ Indian languages with genuine mid-sentence code-switching, reportedly trained on 14 million hours of real telephonic audio — deep, specific investment in exactly this problem.',
      },
      {
        title: 'Proven at large regulated enterprises already',
        body: 'HDFC Bank, Airtel, and Tata Motors are named customers — evidence at a scale Decibyl does not have yet.',
      },
    ],
    strongerUs: [
      {
        title: 'Published pricing',
        body: 'A number you can read today, not a figure that emerges after a 3–6 month sales cycle.',
      },
      {
        title: 'Live in about half a day',
        body: 'Not an 8–16 week deployment.',
      },
      {
        title: 'Zero markup, shown separately',
        body: 'A platform fee with the provider cost itemised apart from it.',
      },
      {
        title: 'Self-serve managed tiers alongside enterprise',
        body: 'A path in below a six-figure-rupee monthly minimum, for teams that are not yet the large regulated enterprise Gnani is built for.',
      },
    ],
    table: sharedTable({
      languages: '40+ languages/dialects; 12+ Indian languages with mid-sentence code-switching',
      dids: 'Not published — enterprise telephony integration',
      billing: 'Custom/outcome-based pricing; GST invoicing not published',
      residency: 'Cloud, private cloud, on-premises, or air-gapped — enterprise-configured',
      mcp: 'No',
      byok: 'Not published',
      markup: 'Custom quote — not itemised',
      onboarding: '3–6 month sales cycle, 8–16 week deployment',
    }),
    verdict:
      'A large, regulated enterprise with an on-premises or air-gapped mandate and a procurement team that needs a specific compliance certificate? Gnani is built for exactly that, and it shows — this is the one comparison on this page where we are not the more compliant option. Want to see the price today and be live this week without a multi-month sales cycle? That is Decibyl.',
    relatedVerticals: ['lending-collections', 'clinics'],
    seo: {
      title: 'Gnani.ai Alternative — Honest Comparison',
      description:
        'Decibyl vs Gnani.ai for Indian teams: published pricing, fast setup — and where Gnani’s compliance certifications and on-prem deployment are genuinely stronger.',
      keywords: ['Gnani alternative', 'Gnani.ai vs Decibyl', 'Gnani voice AI India'],
    },
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
