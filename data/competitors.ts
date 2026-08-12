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
  { feature: 'Indian languages', them: them.languages, us: 'All 7, code-mixed as the default register' },
  { feature: 'Indian phone numbers (DIDs)', them: them.dids, us: 'Indian DIDs, Indian SIP trunking included' },
  { feature: 'INR billing + GST invoice', them: them.billing, us: 'INR-first, GST-compliant invoice via Razorpay' },
  { feature: 'Data residency', them: them.residency, us: 'India — AWS Mumbai (ap-south-1)' },
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
      'Decibyl is built for one market. Indian languages with code-mixed speech as the normal case, Indian telephony, INR billing with a GST invoice, and call data resident in India. If your callers speak Hindi or Tamil and your finance team needs a GST invoice, that combination is the whole reason we exist.',
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
      'Building for a global or US audience, or want the biggest ecosystem? Use Vapi. Calling Indian customers in Indian languages, paying in INR, and answering to an Indian finance and compliance process? That is what we built.',
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
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
