export type TranscriptLine = {
  speaker: 'agent' | 'customer' | 'system';
  text: string;
  /** true when the line is set in an Indic script and needs --font-indic */
  indic?: boolean;
};

export type Vertical = {
  slug: string;
  name: string;
  /** parent slug, for clinic sub-verticals */
  parent?: string;
  /** short label for the homepage SlideDeck */
  cardTitle: string;
  cardPain: string;
  cardLanguages: string;
  h1: string;
  sub: string;
  eyebrow: string;
  leaks: { title: string; body: string }[];
  calculator: 'clinic' | 'd2c' | 'realestate' | null;
  capabilities: string[];
  /** Stated plainly on the page — removes the buyer's first objection. */
  doesNotDo?: string;
  sampleCall: {
    language: string;
    tag?: string;
    lines: TranscriptLine[];
    outcome: string;
    qaScore: number;
    duration: string;
  };
  steps: { title: string; body: string }[];
  objections: { q: string; a: string }[];
  visibility: string[];
  recommendedTier: 'starter' | 'growth' | 'scale';
  siblings: string[];
  seo: { title: string; description: string; keywords: string[] };
};

const sharedVisibility = [
  'Full transcript of every call, searchable',
  'Recording of every call',
  'A QA score on 100% of calls — not a 2% sample',
  'Outcome written back to your system via webhook or integration',
];

export const verticals: Vertical[] = [
  // ────────────────────────────────────────────────────────────── D2C / NDR
  {
    slug: 'd2c-ndr-recovery',
    name: 'D2C · COD & NDR',
    cardTitle: 'D2C · COD & NDR',
    cardPain: 'Failed deliveries that were one call away',
    cardLanguages: 'हिन्दी · EN',
    eyebrow: 'For D2C brands, COD sellers, and e-commerce ops',
    h1: "Your COD orders don't fail at delivery. They fail at the phone call.",
    sub: 'A courier makes one attempt, marks it NDR, and the order starts its journey back to you. Decibyl calls the buyer within minutes — confirms the address, confirms the COD amount, books the reattempt, and writes the outcome back to your OMS.',
    leaks: [
      {
        title: 'One attempt, then NDR',
        body: 'The rider calls once from an unknown number, the buyer misses it, and the order is marked undelivered. Nobody calls again — the reattempt window just closes.',
      },
      {
        title: 'Buyers don’t pick up unknown numbers',
        body: 'A cold call from a courier number gets ignored. A call that opens with the buyer’s name, their order, and their language gets answered.',
      },
      {
        title: 'Fake "customer unavailable" markings',
        body: 'A rider running late marks the attempt as failed. You find out from the RTO report a week later, with no recording to check it against.',
      },
      {
        title: 'The reattempt nobody confirmed',
        body: 'Rescheduling without confirming the buyer is home just buys a second failed attempt at full forward-logistics cost.',
      },
    ],
    calculator: 'd2c',
    capabilities: [
      'Calls the buyer within minutes of the NDR event firing',
      'Confirms the delivery address and a time window the buyer will actually be home',
      'Confirms the COD amount out loud, so the rider isn’t refused at the door',
      'Schedules the reattempt and writes the outcome back to your OMS or courier panel',
      'Runs COD confirmation before dispatch, so fake and duplicate orders never ship',
      'Transfers to your ops team the moment the buyer wants to cancel or dispute',
    ],
    sampleCall: {
      language: 'Hindi (code-mixed)',
      tag: 'NDR recovery',
      lines: [
        { speaker: 'system', text: '[ringing]' },
        {
          speaker: 'agent',
          text: 'नमस्ते, Priya ji? Decibyl से बोल रहा हूँ, आपका order kal deliver नहीं हो पाया — क्या आज शाम 6 बजे तक घर पर रहेंगी?',
          indic: true,
        },
        {
          speaker: 'customer',
          text: 'हाँ, शाम को रहूँगी. But COD hi रहेगा ना?',
          indic: true,
        },
        {
          speaker: 'agent',
          text: 'जी बिल्कुल, ₹1,840 cash on delivery. मैं reattempt schedule कर देता हूँ.',
          indic: true,
        },
      ],
      outcome: 'COD confirmed · reattempt booked · ₹1,840 recovered',
      qaScore: 94,
      duration: '41s',
    },
    steps: [
      {
        title: 'Connect your order feed',
        body: 'Shopify, WooCommerce, or a webhook from your OMS. An NDR event fires and the call is queued — no dashboard for your team to watch.',
      },
      {
        title: 'The agent calls in the buyer’s language',
        body: 'Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, English, or the code-mixed register most buyers actually speak.',
      },
      {
        title: 'The outcome lands where your team already works',
        body: 'Confirmed, rescheduled, cancelled, or unreachable — written back to your OMS with the transcript and recording attached.',
      },
    ],
    objections: [
      {
        q: 'How fast does the call go out after an NDR?',
        a: 'Within minutes of your system firing the event. Speed is most of the value here — a buyer who was home when the rider came is usually still home an hour later.',
      },
      {
        q: 'What if the buyer wants to cancel?',
        a: 'The agent captures the cancellation and the reason, then writes it back so you can stop the shipment instead of paying reverse logistics on it. If the buyer is upset or disputing a charge, the call transfers to a human.',
      },
      {
        q: 'Will buyers know it’s an automated call?',
        a: 'Yes. The agent discloses that it is an automated assistant at the start, and the call is recorded with disclosure. That’s both the law and the right thing.',
      },
      {
        q: 'Does it work with my courier partner?',
        a: 'The agent works off your order and NDR data, not the courier’s. Every outcome fires a webhook — if your OMS or courier panel accepts one, it works today.',
      },
      {
        q: 'What does it cost per recovered order?',
        a: 'You pay for minutes, not outcomes. A confirmation call is typically under a minute, and our rates are published on the pricing page with no markup on model costs.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'growth',
    siblings: ['logistics', 'clinics'],
    seo: {
      title: 'NDR Recovery & COD Confirmation Calls, India',
      description:
        'Automated NDR recovery and COD confirmation calls in Hindi, Tamil, Telugu and English. Call the buyer within minutes, confirm the reattempt, cut RTO.',
      keywords: [
        'NDR recovery automation India',
        'COD confirmation calls',
        'reduce RTO',
        'NDR calling automation',
        'COD order confirmation IVR alternative',
      ],
    },
  },

  // ────────────────────────────────────────────────────────────── Clinics
  {
    slug: 'clinics',
    name: 'Clinics & doctors',
    cardTitle: 'Clinics & doctors',
    cardPain: 'Missed calls and no-shows',
    cardLanguages: 'தமிழ் · हिन्दी',
    eyebrow: 'For clinics, dental practices, and diagnostic centres',
    h1: 'Every missed call is an appointment that went to another clinic.',
    sub: 'Your front desk is with a patient, on another line, or gone for the day. Decibyl answers, books into your calendar, and calls back the no-shows — in Tamil, Hindi, Kannada, Telugu, Marathi, Gujarati, or English.',
    leaks: [
      {
        title: 'During consultation hours',
        body: 'Your receptionist is with a patient at the desk. The phone rings. The caller waits, hangs up, and calls the next clinic on the Google results page.',
      },
      {
        title: 'After 8pm and on Sundays',
        body: "Patients decide to book when they're free, not when you're open. Those calls hit voicemail, and most people don't leave one.",
      },
      {
        title: 'No-shows',
        body: 'A booked slot that nobody turns up for is a slot you turned someone else away from. A reminder call the evening before recovers a large share of them — but nobody has time to make thirty calls.',
      },
      {
        title: 'Follow-ups that never happen',
        body: "Post-procedure check-ins, review-due reminders, lapsed patients who haven't been in for a year. Everyone agrees these matter. Nobody makes the calls.",
      },
    ],
    calculator: 'clinic',
    capabilities: [
      'Answers every call, including simultaneous ones, day or night',
      'Books into Google Calendar — real slot, real confirmation, patient gets an SMS',
      'Reschedules and cancels without touching the front desk',
      'Calls the next day’s list with a reminder and confirms attendance',
      'Answers routine questions — timings, address, parking, consultation fee, doctor availability, documents to carry — from a knowledge base you upload',
      'Transfers to a human the moment something clinical, distressed, or unusual comes up',
      'Recovers no-shows with a callback the same afternoon',
    ],
    doesNotDo:
      'It does not give medical advice, triage, or discuss reports. Anything clinical routes to a human.',
    sampleCall: {
      language: 'Tamil (code-mixed)',
      tag: 'after hours',
      lines: [
        { speaker: 'system', text: '[incoming · 20:41]' },
        {
          speaker: 'customer',
          text: 'Hello, appointment வேணும். Doctor நாளைக்கு இருக்காரா?',
          indic: true,
        },
        {
          speaker: 'agent',
          text: 'கண்டிப்பா. நாளைக்கு morning 11:15, இல்ல evening 6:30 — எது convenient?',
          indic: true,
        },
        { speaker: 'customer', text: 'Evening better.' },
        {
          speaker: 'agent',
          text: 'Sari. உங்க பேரு சொல்லுங்க, SMS confirmation அனுப்பறேன்.',
          indic: true,
        },
      ],
      outcome: 'Appointment booked · Wed 6:30pm · SMS sent',
      qaScore: 96,
      duration: '38s',
    },
    steps: [
      {
        title: 'We set up your agent',
        body: 'Your timings, doctors, fees, and directions. Half a day, and no software for you to learn.',
      },
      {
        title: 'Your number stays yours',
        body: 'We forward calls to the agent. You keep the number on your board, your prescriptions, and your Google listing. Nothing to reprint.',
      },
      {
        title: 'Bookings appear in your calendar',
        body: 'The same calendar your staff already uses. Nothing new to check.',
      },
    ],
    objections: [
      {
        q: "Will patients know it's not a person?",
        a: "The agent discloses that it's an automated assistant at the start of the call, and the call is recorded with disclosure. That's both the law and the right thing. In practice patients care that they got a slot at 9pm, not who booked it.",
      },
      {
        q: "What if someone is in distress or it's an emergency?",
        a: 'The agent transfers to a human immediately, and you configure the number it transfers to. It never triages and never gives medical advice.',
      },
      {
        q: 'My patients speak Tamil, and half of it is mixed with English.',
        a: "That's the normal case, not the edge case. Code-mixed speech is the default register the agent is built for.",
      },
      {
        q: 'Does it work with my clinic software?',
        a: "Today it books into Google Calendar. Direct EMR integration is on the roadmap and not built yet — we'll tell you straight rather than promise it.",
      },
      {
        q: 'What happens to patient data?',
        a: 'Recordings and transcripts are stored in India, on AWS Mumbai (ap-south-1). You can request deletion at any time. We provide a data processing agreement.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'starter',
    siblings: ['d2c-ndr-recovery', 'education'],
    seo: {
      title: 'AI Receptionist for Clinics in India',
      description:
        'An AI receptionist that answers every clinic call in Tamil, Hindi, Kannada and English, books into your calendar, and calls back no-shows.',
      keywords: [
        'AI receptionist for clinics India',
        'clinic missed calls',
        'appointment booking automation India',
        'no-show recovery calls',
        'AI receptionist India',
      ],
    },
  },

  // ────────────────────────────────────────────────── Clinic sub-verticals
  {
    slug: 'dental',
    parent: 'clinics',
    name: 'Dental practices',
    cardTitle: 'Dental',
    cardPain: 'Evening enquiries that hit voicemail',
    cardLanguages: 'தமிழ் · हिन्दी',
    eyebrow: 'For dental practices and orthodontic clinics',
    h1: 'Dental practices lose appointments to voicemail every evening.',
    sub: 'Cost enquiries come in after work, hygiene recalls need chasing, and post-procedure check-ins never get made. Decibyl answers, quotes from your fee list, books the slot, and makes the recall calls.',
    leaks: [
      {
        title: 'The cost enquiry at 8:40pm',
        body: 'Most dental enquiries start with "how much for a root canal?" — asked in the evening, from a Google search, to whichever clinic picks up.',
      },
      {
        title: 'Hygiene recall that nobody chases',
        body: 'Six-month cleanings are the most predictable revenue in the practice and the easiest to forget. The list exists. The calls don’t.',
      },
      {
        title: 'Multi-visit treatments that stall',
        body: 'A patient who misses visit two of a four-visit plan usually just never comes back, and nobody notices until the chair sits empty.',
      },
      {
        title: 'Post-procedure check-ins',
        body: 'A call the day after an extraction prevents a complaint and earns a review. It also takes twenty minutes nobody has.',
      },
    ],
    calculator: 'clinic',
    capabilities: [
      'Quotes routine procedure costs from a fee list you upload',
      'Books consultations and treatment visits into Google Calendar',
      'Runs the hygiene recall list every month',
      'Confirms the next day’s appointments and reschedules the cancellations',
      'Makes post-procedure check-in calls and flags anything the dentist should see',
      'Transfers to a human on pain, bleeding, or any clinical question',
    ],
    doesNotDo:
      'It does not give clinical advice or assess symptoms. Anything clinical routes to a human.',
    sampleCall: {
      language: 'Tamil (code-mixed)',
      tag: 'after hours',
      lines: [
        { speaker: 'system', text: '[incoming · 20:12]' },
        {
          speaker: 'customer',
          text: 'Root canal க்கு எவ்வளவு ஆகும்?',
          indic: true,
        },
        {
          speaker: 'agent',
          text: 'Single root canal ₹6,000 முதல் ₹9,000 வரை, tooth-ஐ பொறுத்து. Consultation ₹300 — X-ray include.',
          indic: true,
        },
        { speaker: 'customer', text: 'Ok, consultation book பண்ணுங்க.', indic: true },
        {
          speaker: 'agent',
          text: 'நாளைக்கு evening 7:00 free இருக்கு. SMS அனுப்பறேன்.',
          indic: true,
        },
      ],
      outcome: 'Consultation booked · Thu 7:00pm · SMS sent',
      qaScore: 95,
      duration: '44s',
    },
    steps: [
      {
        title: 'Upload your fee list and timings',
        body: 'The agent quotes only what you give it, in the ranges you set. Half a day of setup.',
      },
      {
        title: 'Forward your practice number',
        body: 'The number on your board and your Google listing stays exactly as it is.',
      },
      {
        title: 'Recalls and confirmations run themselves',
        body: 'Hand over the recall list; the calls go out and the bookings land in your calendar.',
      },
    ],
    objections: [
      {
        q: 'Will it quote the wrong price?',
        a: 'It quotes only from the fee list you upload, as a range, and it says a final quote depends on examination. If a caller pushes past that, it transfers.',
      },
      {
        q: 'What about a patient in pain?',
        a: 'Pain, bleeding, and swelling route straight to a human on the number you configure. The agent never assesses symptoms.',
      },
      {
        q: 'Can it call our recall list?',
        a: 'Yes — upload the list and the agent runs it, books what it can, and reports back who to chase personally.',
      },
      {
        q: 'Does it integrate with our practice management software?',
        a: 'It books into Google Calendar today. Direct practice-software integration is not built yet, and we’ll say so rather than promise it.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'starter',
    siblings: ['ivf-fertility', 'diagnostics'],
    seo: {
      title: 'AI Receptionist for Dental Clinics',
      description:
        'Answer evening cost enquiries, run hygiene recalls, and confirm appointments automatically — in Tamil, Hindi and English.',
      keywords: [
        'AI receptionist dental clinic',
        'dental appointment reminder calls',
        'dental recall calls automation',
      ],
    },
  },
  {
    slug: 'ivf-fertility',
    parent: 'clinics',
    name: 'Fertility & IVF',
    cardTitle: 'IVF & fertility',
    cardPain: 'Enquiries that need an answer today',
    cardLanguages: 'हिन्दी · EN',
    eyebrow: 'For fertility centres and IVF clinics',
    h1: 'Fertility enquiries need an answer the day they call.',
    sub: 'A couple researching IVF calls four centres in an evening and books with whoever answered kindly and first. Decibyl answers every one of those calls, books the consultation, and hands anything sensitive to your counsellor immediately.',
    leaks: [
      {
        title: 'The enquiry that took a week to reach a counsellor',
        body: 'High-consideration decisions are made in the window right after the call. A callback three days later reaches someone who has already booked elsewhere.',
      },
      {
        title: 'Evening and weekend enquiries',
        body: 'Couples research after work and on Sundays, deliberately away from family. That is exactly when your desk is closed.',
      },
      {
        title: 'Cycle-stage follow-ups',
        body: 'Treatment runs over months with scans, injections, and reviews on fixed days. A missed reminder can cost a cycle.',
      },
      {
        title: 'Enquiries that never asked their real question',
        body: 'Cost, success rates, and confidentiality are asked hesitantly. A caller who does not get a patient answer simply stops calling.',
      },
    ],
    calculator: 'clinic',
    capabilities: [
      'Answers enquiry calls day, night, and Sunday, in the caller’s language',
      'Books the first consultation into your counsellor’s calendar',
      'Answers only logistical questions — timings, location, consultation fee, documents to bring',
      'Runs appointment and scan reminders across a treatment cycle',
      'Transfers to a human counsellor immediately on anything clinical, emotional, or sensitive',
    ],
    doesNotDo:
      'It does not discuss success rates, prognosis, reports, or treatment suitability. Every one of those routes to a human counsellor — this is the strictest transfer policy we run.',
    sampleCall: {
      language: 'Hindi (code-mixed)',
      tag: 'after hours',
      lines: [
        { speaker: 'system', text: '[incoming · 21:20]' },
        {
          speaker: 'customer',
          text: 'IVF के बारे में जानना था. Consultation कैसे book होता है?',
          indic: true,
        },
        {
          speaker: 'agent',
          text: 'ज़रूर. पहली consultation counsellor के साथ होती है, ₹1,000 — दोनों partners का आना बेहतर रहेगा.',
          indic: true,
        },
        {
          speaker: 'customer',
          text: 'Success rate कितना रहता है हमारी age में?',
          indic: true,
        },
        {
          speaker: 'agent',
          text: 'ये सवाल counsellor ही ठीक से बता पाएंगी — मैं अभी call transfer कर देता हूँ.',
          indic: true,
        },
      ],
      outcome: 'Transferred to counsellor · consultation slot held',
      qaScore: 97,
      duration: '52s',
    },
    steps: [
      {
        title: 'Set the transfer rules first',
        body: 'We configure what the agent will and will not discuss before anything goes live. On this vertical the list of things it hands to a human is long by design.',
      },
      {
        title: 'Forward your enquiry line',
        body: 'Your advertised number stays yours. Calls outside desk hours reach the agent instead of voicemail.',
      },
      {
        title: 'Consultations land in the counsellor’s calendar',
        body: 'With the transcript attached, so your counsellor opens the call knowing what was asked.',
      },
    ],
    objections: [
      {
        q: 'This is an extremely sensitive conversation. Is an agent appropriate?',
        a: 'For booking a consultation and answering timings and fees, yes. For anything about prognosis, reports, or treatment, no — and the agent is configured to transfer rather than attempt it.',
      },
      {
        q: 'Will it quote success rates?',
        a: 'Never. It is not permitted to discuss success rates, and the transfer fires the moment the topic comes up.',
      },
      {
        q: 'Is our patient data confidential?',
        a: 'Recordings and transcripts are stored in India on AWS Mumbai (ap-south-1), access-controlled, and deletable on request. We provide a data processing agreement.',
      },
      {
        q: 'Can it handle the couple calling in Hindi and English in the same sentence?',
        a: 'That is the default register it is built for, not an edge case.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'starter',
    siblings: ['dental', 'diagnostics'],
    seo: {
      title: 'Fertility & IVF Clinic Call Handling',
      description:
        'Answer every IVF enquiry the day it comes in, book the counsellor consultation, and transfer anything sensitive to a human immediately.',
      keywords: [
        'fertility clinic patient enquiry automation',
        'IVF clinic call handling',
        'IVF enquiry follow up',
      ],
    },
  },
  {
    slug: 'diagnostics',
    parent: 'clinics',
    name: 'Diagnostic labs',
    cardTitle: 'Diagnostics',
    cardPain: 'High call volume, low complexity',
    cardLanguages: 'हिन्दी · தமிழ்',
    eyebrow: 'For diagnostic centres and pathology labs',
    h1: 'Report-ready calls, home-collection bookings, and repeat test reminders.',
    sub: 'A lab runs hundreds of short, repetitive calls a day — is my report ready, do I need to fast, can you collect from home. That is the strongest automation fit in healthcare, and it is where Decibyl pays for itself fastest.',
    leaks: [
      {
        title: '"Is my report ready?"',
        body: 'The single highest-volume call in the building, and the one that keeps your desk from answering the calls that book revenue.',
      },
      {
        title: 'Home-collection slots nobody confirmed',
        body: 'A phlebotomist sent to an empty house is a wasted trip and a lost slot. One confirmation call the evening before prevents it.',
      },
      {
        title: 'Preparation instructions',
        body: 'A fasting test done unfasted is a repeat visit at your cost, and it started with an instruction the patient never heard.',
      },
      {
        title: 'Repeat tests that never got booked',
        body: 'Quarterly panels, thyroid follow-ups, post-treatment retests — predictable, recurring, and almost never chased.',
      },
    ],
    calculator: 'clinic',
    capabilities: [
      'Answers report-status calls day and night from your LIS or a status feed',
      'Books home-collection slots and confirms them the evening before',
      'Reads out preparation instructions — fasting, timing, documents',
      'Runs repeat-test reminder campaigns from a list you upload',
      'Quotes test prices and package inclusions from a price list you upload',
      'Transfers to a human for anything about results or interpretation',
    ],
    doesNotDo:
      'It does not read out, interpret, or discuss test results. Report content is a human conversation, always.',
    sampleCall: {
      language: 'Hindi (code-mixed)',
      tag: 'high volume',
      lines: [
        { speaker: 'system', text: '[incoming · 08:05]' },
        {
          speaker: 'customer',
          text: 'मेरा blood test report ready है क्या?',
          indic: true,
        },
        {
          speaker: 'agent',
          text: 'जी, आपका sample कल 6 बजे लिया गया था — report आज दोपहर 2 बजे तक ready हो जाएगी, SMS पर link आ जाएगा.',
          indic: true,
        },
        { speaker: 'customer', text: 'Thyroid वाला भी उसी में है?', indic: true },
        {
          speaker: 'agent',
          text: 'जी, same panel में है. Collection अगली बार घर से चाहिए तो अभी slot book कर दूँ?',
          indic: true,
        },
      ],
      outcome: 'Report status given · home collection booked',
      qaScore: 93,
      duration: '35s',
    },
    steps: [
      {
        title: 'Connect a report-status feed',
        body: 'A webhook or sheet from your LIS is enough. The agent answers from live status, not a guess.',
      },
      {
        title: 'Forward the front-desk line',
        body: 'Status calls stop reaching your desk. Booking calls still do, if you want them to.',
      },
      {
        title: 'Collections and reminders run on a schedule',
        body: 'Tomorrow’s home collections get confirmed tonight. Repeat-test lists run weekly.',
      },
    ],
    objections: [
      {
        q: 'Will it read out results?',
        a: 'No. It confirms whether a report is ready and where to collect it. Anything about the content of a report goes to a human.',
      },
      {
        q: 'Can it handle our call volume at 8am?',
        a: 'Concurrency is what the agent is for — it answers simultaneous calls. Concurrent-call limits by tier are on the pricing page.',
      },
      {
        q: 'Does it connect to our LIS?',
        a: 'Through a webhook or a status feed, yes. A direct certified LIS integration is a custom build, not something we claim off the shelf.',
      },
      {
        q: 'Where is the data stored?',
        a: 'In India, on AWS Mumbai (ap-south-1), with deletion on request and a data processing agreement.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'growth',
    siblings: ['dental', 'ivf-fertility'],
    seo: {
      title: 'Diagnostic Lab Call Automation',
      description:
        'Automate report-status calls, home-collection bookings, and repeat-test reminders for diagnostic labs — in seven Indian languages.',
      keywords: [
        'diagnostic lab call automation',
        'home collection booking calls',
        'pathology lab call handling',
      ],
    },
  },

  // ────────────────────────────────────────────────────────── Real estate
  {
    slug: 'real-estate',
    name: 'Real estate',
    cardTitle: 'Real estate',
    cardPain: 'Portal leads that went cold',
    cardLanguages: 'हिन्दी · मराठी',
    eyebrow: 'For developers, brokerages, and channel partners',
    h1: 'You paid for that portal lead. It went cold in eleven minutes.',
    sub: 'The same enquiry was sold to four of your competitors. Whoever calls first has the conversation. Decibyl calls within 60 seconds, qualifies budget, locality, timeline and possession, and books the site visit.',
    leaks: [
      {
        title: 'The 10pm enquiry',
        body: 'Property browsing happens at night and on weekends. Your first callback goes out the next working morning, roughly ten hours after the buyer’s interest peaked.',
      },
      {
        title: 'Your broker is on a site visit',
        body: 'The person best placed to sell is, by definition, busy selling. Every enquiry that arrives during a site visit waits.',
      },
      {
        title: 'The lead you bought four times over',
        body: 'Portals sell the same enquiry to several projects. Speed is the only lever you control.',
      },
      {
        title: 'Site visits booked with unqualified buyers',
        body: 'A Saturday spent driving someone whose budget is half your ticket size is the most expensive hour in the business.',
      },
    ],
    calculator: 'realestate',
    capabilities: [
      'Calls within 60 seconds of an enquiry landing from any portal or form',
      'Qualifies budget, preferred locality, timeline, and possession requirement',
      'Books the site visit into your sales team’s calendar',
      'Re-attempts unanswered leads on a schedule instead of once',
      'Hands the broker only the leads worth driving to, with the transcript attached',
      'Runs re-engagement calls on last quarter’s dormant enquiries',
    ],
    sampleCall: {
      language: 'Marathi / Hindi (code-mixed)',
      tag: '58 seconds after enquiry',
      lines: [
        { speaker: 'system', text: '[outbound · 22:14 · portal enquiry +58s]' },
        {
          speaker: 'agent',
          text: 'नमस्कार, तुम्ही आत्ताच 2BHK साठी enquiry केली होती — बोलायला वेळ आहे का?',
          indic: true,
        },
        { speaker: 'customer', text: 'हाँ बोलिए. Possession कब तक है?', indic: true },
        {
          speaker: 'agent',
          text: 'Ready possession आहे. Budget range साधारण किती ठेवली आहे?',
          indic: true,
        },
        { speaker: 'customer', text: '80 लाख तक. Site visit Sunday हो सकता है?', indic: true },
        {
          speaker: 'agent',
          text: 'Sunday 11 वाजता slot ठेवतो, confirmation SMS पाठवतो.',
          indic: true,
        },
      ],
      outcome: 'Qualified · ₹80L budget · site visit booked Sun 11:00',
      qaScore: 92,
      duration: '1m 12s',
    },
    steps: [
      {
        title: 'Point your lead feed at us',
        body: 'Housing, MagicBricks, 99acres, Meta lead ads, or your own form — a webhook is enough.',
      },
      {
        title: 'The agent calls in under a minute',
        body: 'Qualifies on your criteria, in Hindi, Marathi, Tamil, Telugu, Kannada, Gujarati, or English.',
      },
      {
        title: 'Your broker gets a shortlist, not a spreadsheet',
        body: 'Qualified leads with booked site visits land in your CRM with the recording attached.',
      },
    ],
    objections: [
      {
        q: 'Won’t a buyer be annoyed by an instant call?',
        a: 'They just filled a form asking to be contacted. The complaint we hear is the opposite one — that nobody called back.',
      },
      {
        q: 'Can it negotiate price?',
        a: 'No, and it should not. It qualifies and books. Commercial conversations go to your sales team, which is what your sales team is good at.',
      },
      {
        q: 'What if the buyer wants to speak to a person?',
        a: 'It transfers, on the number you configure, immediately.',
      },
      {
        q: 'Does it write back to our CRM?',
        a: 'Every call outcome fires a webhook. If your CRM accepts one, it works today — see the integrations section on the home page.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'growth',
    siblings: ['lending-collections', 'education'],
    seo: {
      title: 'Real Estate Lead Calling Automation',
      description:
        'Call every portal lead within 60 seconds, qualify budget and timeline, and book the site visit — in Hindi, Marathi and English.',
      keywords: [
        'real estate lead calling automation',
        'portal lead follow up',
        'site visit booking automation',
        'real estate lead qualification India',
      ],
    },
  },

  // ─────────────────────────────────────────────────── Lending & collections
  {
    slug: 'lending-collections',
    name: 'Lending & collections',
    cardTitle: 'Lending',
    cardPain: 'EMI reminders on record',
    cardLanguages: 'हिन्दी · తెలుగు',
    eyebrow: 'For NBFCs, lenders, and collections teams',
    h1: 'Reminder calls that stay polite, on-script, and on record.',
    sub: 'Early-bucket accounts usually need a nudge, not pressure. Decibyl makes the reminder call on a fixed script, sends the payment link mid-call, captures the promise to pay, and transfers to a human on any dispute or hardship. Every call recorded and scored.',
    leaks: [
      {
        title: 'Cost per agent call in early buckets',
        body: 'Accounts one or two days overdue rarely need a collections professional. Spending one on them is the most common cost leak in the function.',
      },
      {
        title: 'Scripts that drift',
        body: 'Thirty agents on a bad afternoon produce thirty different calls. Consistency is a compliance control, not a nicety.',
      },
      {
        title: 'Tone exposure',
        body: 'One aggressive call is a regulatory problem and a reputational one. Sampled QA finds it after the fact, if at all.',
      },
      {
        title: 'Accounts that only needed a reminder',
        body: 'Salary delays, forgotten mandates, failed auto-debits. A polite call on day two often closes the account without a collections process at all.',
      },
    ],
    calculator: null,
    capabilities: [
      'Makes EMI due and overdue reminder calls on a fixed, approved script',
      'Sends a payment link by SMS during the call',
      'Captures promise-to-pay date and amount, written back to your system',
      'Confirms mandate and auto-debit failures and prompts a retry',
      'Transfers to a human on any dispute, hardship, or request to stop contact',
      'Scores 100% of calls — every call, not a 2% sample',
    ],
    doesNotDo:
      'It does not negotiate settlements, threaten, escalate tone, or contact third parties. It follows one approved script and transfers when a conversation leaves it.',
    sampleCall: {
      language: 'Telugu / Hindi (code-mixed)',
      tag: 'EMI reminder · day 2',
      lines: [
        { speaker: 'system', text: '[outbound · 11:02]' },
        {
          speaker: 'agent',
          text: 'నమస్కారం sir, ఇది automated reminder call. మీ EMI ₹4,250 రెండు రోజుల నుంచి pending ఉంది.',
          indic: true,
        },
        { speaker: 'customer', text: 'Auto-debit fail అయిందా?', indic: true },
        {
          speaker: 'agent',
          text: 'అవును sir. Payment link SMS లో పంపుతున్నాను — ఈరోజు pay చేయగలరా?',
          indic: true,
        },
        { speaker: 'customer', text: 'Evening లోపు చేస్తాను.', indic: true },
      ],
      outcome: 'Promise to pay captured · today · payment link sent',
      qaScore: 98,
      duration: '47s',
    },
    steps: [
      {
        title: 'Your compliance team approves the script',
        body: 'Nothing goes live until the script and the transfer rules are signed off. The agent cannot depart from them.',
      },
      {
        title: 'Connect the account feed',
        body: 'Due and overdue lists by bucket, over a webhook or a scheduled file.',
      },
      {
        title: 'Every call is recorded, scored, and retrievable',
        body: 'With the transcript, the QA score, and the outcome written back — including the promise-to-pay date.',
      },
    ],
    objections: [
      {
        q: 'Is this compliant with RBI’s conduct expectations on recovery calls?',
        a: 'The controls you need are the ones the agent gives you by construction: a fixed approved script, disclosure at the start, calls only in permitted hours, no third-party contact, no pressure tactics, immediate transfer on distress, and a recording plus QA score for 100% of calls. Your compliance team sets the script and hours; we enforce them. We are not a law firm and this is not legal advice.',
      },
      {
        q: 'What if the borrower disputes the amount?',
        a: 'The agent stops, does not argue, and transfers to a human. Disputes are never an automated conversation.',
      },
      {
        q: 'What if someone says they are in financial hardship?',
        a: 'Transfer, immediately. Hardship is a human conversation with consequences the agent is not permitted to decide.',
      },
      {
        q: 'Can we hear the calls?',
        a: 'All of them. Full recordings, full transcripts, and a QA score on every call — which is a stronger audit position than sampled human QA.',
      },
      {
        q: 'Can it call in the borrower’s language?',
        a: 'Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, English, and the code-mixed register most borrowers actually speak.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'scale',
    siblings: ['d2c-ndr-recovery', 'real-estate'],
    seo: {
      title: 'EMI Reminder & Collections Calls, India',
      description:
        'On-script EMI reminder and soft-recovery calls, recorded and QA-scored on 100% of calls, with human transfer on any dispute or hardship.',
      keywords: [
        'EMI reminder calls automation',
        'collections voice bot India',
        'loan repayment reminder calls',
        'soft recovery calling automation',
      ],
    },
  },

  // ────────────────────────────────────────────────────────────── Logistics
  {
    slug: 'logistics',
    name: 'Logistics',
    cardTitle: 'Logistics',
    cardPain: 'Reattempts nobody confirmed',
    cardLanguages: 'हिन्दी · ગુજરાતી',
    eyebrow: 'For 3PLs, couriers, and delivery operators',
    h1: "One delivery attempt isn't a delivery attempt.",
    sub: 'Decibyl runs the confirmation layer between the failed attempt and the reattempt — at operator scale, priced per confirmed reattempt rather than per seat.',
    leaks: [
      {
        title: 'NDR marked without contact',
        body: 'A rider under time pressure marks undelivered without a conversation. The cost lands on you and your client, and neither of you has a recording.',
      },
      {
        title: 'Reattempts sent out unconfirmed',
        body: 'A second attempt to an address nobody verified is a second forward-logistics cost with the same odds as the first.',
      },
      {
        title: 'Address corrections at scale',
        body: 'A wrong pin code or a missing landmark takes forty seconds to fix on a call and days to fix through a ticket queue.',
      },
      {
        title: 'Pickup scheduling',
        body: 'Reverse pickups fail for exactly the same reason forward deliveries do — nobody confirmed the consignee would be there.',
      },
    ],
    calculator: 'd2c',
    capabilities: [
      'Calls the consignee after an NDR event and confirms availability and a time window',
      'Verifies and corrects the delivery address, including landmark and pin code',
      'Confirms the COD amount before the reattempt is dispatched',
      'Schedules reverse pickups and confirms the consignee will be present',
      'Writes structured outcomes back to your operations platform for every call',
      'Runs at the concurrency an operator needs, in seven languages',
    ],
    sampleCall: {
      language: 'Gujarati / Hindi (code-mixed)',
      tag: 'reattempt confirmation',
      lines: [
        { speaker: 'system', text: '[outbound · 18:30]' },
        {
          speaker: 'agent',
          text: 'નમસ્તે, તમારું parcel આજે deliver નહોતું થઈ શક્યું. કાલે સવારે 10 થી 1 વચ્ચે ઘરે હશો?',
          indic: true,
        },
        { speaker: 'customer', text: 'હા, પણ address માં flat number ખોટો છે — B-402.', indic: true },
        {
          speaker: 'agent',
          text: 'નોંધી લીધું, B-402. કાલે સવારે reattempt schedule કરી દઉં છું.',
          indic: true,
        },
      ],
      outcome: 'Address corrected · reattempt confirmed · Tue 10:00–13:00',
      qaScore: 91,
      duration: '39s',
    },
    steps: [
      {
        title: 'Stream NDR events to us',
        body: 'A webhook from your operations platform. No change to rider workflow.',
      },
      {
        title: 'Calls go out inside the reattempt window',
        body: 'In the consignee’s language, at the concurrency your volume needs.',
      },
      {
        title: 'Structured outcomes flow back',
        body: 'Confirmed, rescheduled, address corrected, refused, unreachable — each with a recording your client can audit.',
      },
    ],
    objections: [
      {
        q: 'Can it handle our volumes?',
        a: 'Concurrency is the point of the architecture, and limits by tier are published on the pricing page. Above Scale, volumes are priced per confirmed reattempt — talk to us.',
      },
      {
        q: 'How do we price this to our clients?',
        a: 'Most operators bill it as a per-confirmed-reattempt line item, because it maps directly to a cost their client already tracks.',
      },
      {
        q: 'Do we have to change rider workflow?',
        a: 'No. The agent works from NDR events, after the fact. Nothing changes in the rider app.',
      },
      {
        q: 'Can clients hear the calls?',
        a: 'Yes — recording, transcript, and QA score on every call. That is usually the reason operators buy it: it settles the fake-NDR argument with evidence.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'scale',
    siblings: ['d2c-ndr-recovery', 'real-estate'],
    seo: {
      title: 'Delivery Reattempt Confirmation Calls',
      description:
        'Automated NDR and reattempt confirmation calls for 3PLs and couriers — address correction, COD confirmation, and a recording on every call.',
      keywords: [
        'delivery reattempt confirmation calls',
        'logistics call automation India',
        'NDR calling for couriers',
      ],
    },
  },

  // ────────────────────────────────────────────────────────────── Education
  {
    slug: 'education',
    name: 'Education',
    cardTitle: 'Education',
    cardPain: 'Enquiries nobody called back',
    cardLanguages: 'EN · हिन्दी',
    eyebrow: 'For colleges, institutes, and edtech admissions teams',
    h1: 'Admission enquiries go cold over a weekend.',
    sub: 'A form filled on Friday evening gets a call on Monday afternoon, by which point the student has spoken to three other institutes. Decibyl calls immediately, answers fee and eligibility questions, and books the counsellor slot.',
    leaks: [
      {
        title: 'Form fills nobody calls',
        body: 'Admissions campaigns generate enquiries faster than counsellors can dial. The bottom of the list never gets called at all.',
      },
      {
        title: 'Counsellors unavailable at the enquiry peak',
        body: 'Enquiries peak in the evening and at weekends. Counsellors work weekdays. The overlap is the problem.',
      },
      {
        title: 'The same five questions, all day',
        body: 'Fees, eligibility, hostel, placement, last date. Answering them by hand is most of a counsellor’s day and none of a counsellor’s value.',
      },
      {
        title: 'Document submission follow-up',
        body: 'An admission that stalls on a missing mark sheet is a seat you may not fill, and it needed one reminder call.',
      },
    ],
    calculator: 'realestate',
    capabilities: [
      'Calls every enquiry within a minute of the form landing',
      'Answers fee, eligibility, timing, and last-date questions from material you upload',
      'Books counsellor slots into your team’s calendar',
      'Runs document-submission reminder calls until the file is complete',
      'Re-engages last season’s unconverted enquiries at the start of a new cycle',
      'Transfers to a counsellor for scholarship, placement, or admission-decision conversations',
    ],
    sampleCall: {
      language: 'Hindi (code-mixed)',
      tag: 'Sunday evening enquiry',
      lines: [
        { speaker: 'system', text: '[outbound · Sun 19:40 · form fill +42s]' },
        {
          speaker: 'agent',
          text: 'नमस्ते, आपने अभी B.Sc admission के लिए enquiry की थी — दो मिनट बात कर सकते हैं?',
          indic: true,
        },
        { speaker: 'customer', text: 'हाँ. Fees कितनी है और last date क्या है?', indic: true },
        {
          speaker: 'agent',
          text: 'First year fees ₹68,000, last date 30 तारीख़. Counsellor के साथ call कल शाम 5 बजे रख दूँ?',
          indic: true,
        },
        { speaker: 'customer', text: 'हाँ ठीक है.', indic: true },
      ],
      outcome: 'Counsellor call booked · Mon 5:00pm · SMS sent',
      qaScore: 94,
      duration: '58s',
    },
    steps: [
      {
        title: 'Connect your enquiry forms',
        body: 'Website forms, Meta and Google lead ads, or your CRM — over a webhook.',
      },
      {
        title: 'Every enquiry gets called, immediately',
        body: 'Including the ones at 9pm on a Sunday, in the language the family speaks at home.',
      },
      {
        title: 'Counsellors get booked calls',
        body: 'Not a list to dial. With the transcript, so they know what was already asked.',
      },
    ],
    objections: [
      {
        q: 'Will it answer questions about scholarships or admission chances?',
        a: 'No — those route to a counsellor. It answers published facts: fees, eligibility, dates, and location.',
      },
      {
        q: 'Can it call parents in a regional language?',
        a: 'Yes, in all seven, and in the code-mixed register most families actually use.',
      },
      {
        q: 'What about calling hours?',
        a: 'You set the permitted window. The agent will not dial outside it.',
      },
      {
        q: 'Does it work with our CRM?',
        a: 'Outcomes fire a webhook, so anything that accepts one works today. Named CRM integrations and their status are listed on the home page.',
      },
    ],
    visibility: sharedVisibility,
    recommendedTier: 'growth',
    siblings: ['real-estate', 'clinics'],
    seo: {
      title: 'Admission Enquiry Follow-Up Automation',
      description:
        'Call every admission enquiry within a minute, answer fee and eligibility questions, and book the counsellor slot — in seven Indian languages.',
      keywords: [
        'admission enquiry follow up automation',
        'education lead calling',
        'college admission calling automation India',
      ],
    },
  },
];

/** Top-level verticals only — these render at /solutions/[vertical] */
export const topLevelVerticals = verticals.filter((v) => !v.parent);

/** Clinic sub-verticals — these render at /solutions/clinics/[subvertical] */
export const clinicSubVerticals = verticals.filter((v) => v.parent === 'clinics');

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug && !v.parent);
}

export function getSubVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug && v.parent === 'clinics');
}

export function verticalHref(v: Vertical): string {
  return v.parent ? `/solutions/${v.parent}/${v.slug}` : `/solutions/${v.slug}`;
}

export function findAnyVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

/** Homepage SlideDeck order — D2C first, clinics second. */
export const homepageDeckOrder = [
  'd2c-ndr-recovery',
  'clinics',
  'real-estate',
  'lending-collections',
  'logistics',
  'education',
];
