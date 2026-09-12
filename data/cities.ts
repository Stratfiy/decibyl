/**
 * Cities for `/ai-receptionist/[city]`.
 *
 * These are the long-tail pages the original sitemap planned and never built.
 * The whole risk with a route like this is that it produces doorway pages —
 * one template, a swapped city name, nothing a reader could not have guessed.
 * Google has been demoting that shape for years and is right to.
 *
 * So every field below is something that genuinely differs by city and is
 * checkable:
 *
 *   `languages`  which languages a caller in that city actually opens with,
 *                and therefore which of ours matter there. Bangalore and
 *                Chennai are not the same page because the callers are not
 *                speaking the same language.
 *   `verticals`  the businesses that actually run phone volume there, each
 *                pointing at a real solution page rather than describing
 *                itself.
 *   `intro`      one paragraph written for that city, not templated.
 *
 * **No invented statistics.** Same rule as data/blog.ts and data/proof.ts: no
 * "43% of clinics in Pune" figures, because nobody measured that and a made-up
 * number is worse than no number. What each page claims is what the product
 * does and which languages it does it in.
 */

import { languages } from './languages';
import { findAnyVertical } from './verticals';

export type City = {
  slug: string;
  /** Display name, as a resident would write it. */
  name: string;
  state: string;
  /** Language codes, most likely first. Must exist in data/languages.ts. */
  languages: string[];
  /** Vertical slugs whose pages are worth reading from here. */
  verticals: string[];
  /** One paragraph specific to this city. */
  intro: string;
  /** What makes calling here different — two or three lines, city-specific. */
  notes: { title: string; body: string }[];
  seo: { title: string; description: string; keywords: string[] };
};

export const cities: City[] = [
  {
    slug: 'hosur',
    name: 'Hosur',
    state: 'Tamil Nadu',
    languages: ['ta', 'kn', 'en', 'hi'],
    verticals: ['clinics', 'logistics', 'd2c-ndr-recovery'],
    intro:
      'Hosur is where Decibyl is built, which is the only reason this page leads the list rather than a metro. It also happens to be the hardest kind of place to answer a phone well: a Tamil Nadu industrial town on the Karnataka border, where a caller may open in Tamil, switch to Kannada because they commute from Bangalore, and read out an order number in English. An agent that handles one of those and fumbles the other two is not usable here.',
    notes: [
      {
        title: 'A border town speaks two state languages',
        body: 'Tamil and Kannada both turn up on the same line, often from the same caller. Both are live, and code-mixing between them and English is the normal register rather than an exception the agent has to be configured for.',
      },
      {
        title: 'Industrial suppliers run on callbacks',
        body: 'Manufacturing and logistics around Hosur move on confirmation and follow-up calls — dispatch confirmations, delivery windows, payment follow-ups. That is the work these agents do end to end.',
      },
      {
        title: 'We are here',
        body: 'The registered office is in Hosur. For a first pilot that means a conversation in person rather than a support ticket across three time zones.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Hosur — Tamil & Kannada',
      description:
        'An AI voice agent that answers and makes calls in Hosur in Tamil, Kannada, English and Hindi. Built in Hosur, with Indian numbers and INR billing.',
      keywords: ['AI receptionist Hosur', 'AI call answering Hosur', 'voice AI Tamil Nadu', 'AI phone agent Hosur'],
    },
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    languages: ['kn', 'en', 'ta', 'te', 'hi'],
    verticals: ['clinics', 'd2c-ndr-recovery', 'real-estate'],
    intro:
      'Bangalore is the hardest language problem in the country on a single phone line. A clinic in Indiranagar takes calls in Kannada, English, Tamil, Telugu and Hindi in the same afternoon, frequently more than one of them inside a single sentence. Most voice platforms handle this by asking the caller to pick a language first, which is a menu by another name. Ours does not: code-mixed speech is the default register, so the caller talks and the agent keeps up.',
    notes: [
      {
        title: 'Five languages, one line, no menu',
        body: 'Kannada, English, Tamil, Telugu and Hindi are all live. The agent does not ask a caller to choose before it will listen, because a caller who has to choose has already had a worse experience than a person answering.',
      },
      {
        title: 'The English is not American English',
        body: 'Indian English carries its own vocabulary and rhythm — a lakh, a crore, "do the needful", numbers read in pairs. A model tuned on US call-centre audio mishears exactly the parts that matter, which is why the speech stack is Indic-first.',
      },
      {
        title: 'Clinics and D2C are where the volume is',
        body: 'Appointment confirmation and COD order confirmation are the two highest-volume repetitive calls in the city, and both are entirely scriptable — which is what makes them worth handing over.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Bangalore — Kannada & Tamil',
      description:
        'An AI voice agent that answers calls in Bangalore in Kannada, English, Tamil, Telugu and Hindi, code-mixed by default. Indian numbers, INR billing, GST invoice.',
      keywords: ['AI receptionist Bangalore', 'AI call answering Bangalore', 'Kannada voice AI', 'AI phone agent Bengaluru'],
    },
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    languages: ['ta', 'en', 'te'],
    verticals: ['clinics', 'logistics', 'lending-collections'],
    intro:
      'Chennai runs on Tamil, and Tamil is where most voice AI quietly gives up. It is agglutinative — meaning is carried in suffixes stacked onto a root — so a transcriber trained to expect word boundaries in the European sense mis-segments the sentence before any model gets to reason about it. Tanglish makes it harder again: the verb is Tamil, the noun is English, and the number is read in either. This is the language the product was built for first.',
    notes: [
      {
        title: 'Tanglish is the register, not an edge case',
        body: 'A Chennai caller mixing Tamil and English inside one clause is speaking normally. The agent is built to expect that rather than to recover from it.',
      },
      {
        title: 'The site is set in real Tamil type',
        body: 'Every Tamil word on this site is set in Noto Sans Tamil, self-hosted. A small thing, and a fair test: a platform that cannot typeset Tamil on its own marketing page is unlikely to have thought hard about hearing it.',
      },
      {
        title: 'Clinics, logistics and collections',
        body: 'Appointment reminders, delivery confirmation and payment follow-up are the three call types with enough volume and enough repetition to be worth automating first.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Chennai — Tamil & Tanglish',
      description:
        'An AI voice agent answering calls in Chennai in Tamil, English and Telugu, with Tanglish as the default register. Indian numbers, INR billing, GST invoice.',
      keywords: ['AI receptionist Chennai', 'Tamil voice AI', 'AI call answering Chennai', 'Tanglish voice agent'],
    },
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    languages: ['te', 'hi', 'en'],
    verticals: ['clinics', 'real-estate', 'd2c-ndr-recovery'],
    intro:
      'Hyderabad is a Telugu city with a Hindi-Urdu register running through it, and callers move between the two without announcing it. For a voice agent that means the language cannot be decided at the start of the call and held — it has to be tracked as the caller goes. Telugu also carries a real cost consequence: it runs on the regional speech stack, which is dearer a minute than Hindi or English, and we would rather you knew that before the invoice than after.',
    notes: [
      {
        title: 'Telugu and Hindi in the same call',
        body: 'Both are live and both are code-mixed with English by default. The agent follows the caller rather than locking to whichever language the first sentence happened to be in.',
      },
      {
        title: 'Regional languages cost more a minute',
        body: 'Telugu runs on a dearer speech stack than Hindi or English. Our pricing page says so and shows included calling as a range for exactly this reason, rather than quoting one number that would only be true for some callers.',
      },
      {
        title: 'Real estate and diagnostics carry the volume',
        body: 'Site-visit follow-up and report-ready calls are high-frequency, low-variation, and almost never made in time by a human team. Those are the ones worth handing over first.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Hyderabad — Telugu & Hindi',
      description:
        'An AI voice agent answering calls in Hyderabad in Telugu, Hindi and English, code-mixed by default. Indian numbers, INR billing, GST invoice.',
      keywords: ['AI receptionist Hyderabad', 'Telugu voice AI', 'AI call answering Hyderabad', 'AI phone agent Telangana'],
    },
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    languages: ['hi', 'mr', 'en', 'gu'],
    verticals: ['lending-collections', 'd2c-ndr-recovery', 'real-estate'],
    intro:
      'Mumbai is where the compliance question arrives before the language question. Lending, collections and insurance run their outbound from here, and every one of those calls is regulated — what may be said, when it may be said, and what has to be recorded. An agent that is merely fluent is not sufficient; it has to be auditable. Every Decibyl call is transcribed, recorded and scored, and the data sits in AWS Mumbai by default, which is the same city.',
    notes: [
      {
        title: 'Hindi, Marathi, English and Gujarati',
        body: 'All four are live, and Mumbai callers mix them freely. Gujarati matters more here than its speaker count suggests, because so much of the trading business runs in it.',
      },
      {
        title: 'The data does not leave the city',
        body: 'Call data is resident in AWS Mumbai, ap-south-1, by default. For a lender answering to an Indian compliance process, where the recording lives is not a footnote.',
      },
      {
        title: 'Collections is a compliance problem first',
        body: 'Our lending and collections page leads with conduct expectations rather than efficiency, and says plainly that we are not a law firm. Worth reading before a pilot.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Mumbai — Hindi & Marathi',
      description:
        'An AI voice agent for Mumbai businesses, calling in Hindi, Marathi, English and Gujarati. Data resident in AWS Mumbai, DPDP-aligned, GST invoicing.',
      keywords: ['AI receptionist Mumbai', 'Marathi voice AI', 'AI calling Mumbai', 'AI collections calls India'],
    },
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    languages: ['mr', 'hi', 'en'],
    verticals: ['education', 'clinics', 'real-estate'],
    intro:
      'Pune is a Marathi-first city with an unusually large education and training sector, and education has a call pattern almost nobody staffs properly: admissions enquiries arrive in bursts around intake, and every one of them goes cold if nobody calls back the same day. It is the clearest case in the country for an agent that never gets to the end of the list and stops.',
    notes: [
      {
        title: 'Marathi with Hindi and English mixed in',
        body: 'All three are live and code-mixed by default. Marathi runs on the Devanagari script, set here in genuine IBM Plex Sans Devanagari rather than a fallback face.',
      },
      {
        title: 'Admissions calls decay by the hour',
        body: 'An enquiry answered the same day converts differently from one answered on Thursday. The constraint is never the script, it is that a human team runs out of afternoon.',
      },
      {
        title: 'Outbound campaigns start at Growth',
        body: 'Answering the phone works on any plan. Calling a list back is an outbound campaign, which is a Growth feature — worth knowing before pricing a pilot around it.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Pune — Marathi & Hindi',
      description:
        'An AI voice agent answering and making calls in Pune in Marathi, Hindi and English. Indian numbers, INR billing, GST invoice, DPDP-aligned.',
      keywords: ['AI receptionist Pune', 'Marathi voice AI', 'AI call answering Pune', 'admissions calling automation'],
    },
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi, Haryana and Uttar Pradesh',
    languages: ['hi', 'en'],
    verticals: ['d2c-ndr-recovery', 'lending-collections', 'real-estate'],
    intro:
      'Delhi NCR is Hinglish country, and it is also where most of India’s D2C order volume is confirmed or lost. A COD order that nobody confirms becomes a delivery attempt that fails, and a failed delivery costs the forward leg, the reverse leg and the margin on a product that comes back unsellable. That call is short, scripted, and made at a volume no human team wants.',
    notes: [
      {
        title: 'Hinglish is one language, not two',
        body: 'Hindi and English inside a single sentence is how NCR actually speaks. The agent treats that as the default register rather than switching modes mid-call.',
      },
      {
        title: 'The economics are in the reverse leg',
        body: 'Our NDR and RTO page works through what a failed COD delivery actually costs a D2C brand, using your own numbers rather than ours.',
      },
      {
        title: 'Cheapest minutes of any language we run',
        body: 'Hindi and English run on the cheapest speech stack we have, so credit goes further here than on a regional-language line. The pricing page shows the range rather than one figure for exactly this reason.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Delhi NCR — Hindi & Hinglish',
      description:
        'An AI voice agent for Delhi NCR businesses, calling in Hindi and English with Hinglish as the default register. COD confirmation, NDR recovery, GST invoicing.',
      keywords: ['AI receptionist Delhi', 'Hinglish voice AI', 'AI calling Gurgaon', 'COD confirmation calls India'],
    },
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    languages: ['gu', 'hi', 'en'],
    verticals: ['d2c-ndr-recovery', 'logistics', 'lending-collections'],
    intro:
      'Ahmedabad runs a great deal of business in Gujarati, and Gujarati is among the least served languages in voice AI — most platforms list it and route it through a generic multilingual model that sounds like a foreigner reading phonetically. That is worse than English, because it reads as a company that could not be bothered. Gujarati here runs on an Indic speech stack and is set on this site in a real Gujarati face.',
    notes: [
      {
        title: 'Gujarati that sounds like Gujarati',
        body: 'Served by an Indic speech stack rather than a general multilingual model. If a voice reads as the wrong region to your customer, no cost saving justifies it.',
      },
      {
        title: 'Trading businesses live on follow-up',
        body: 'Order confirmation, dispatch updates and payment follow-up are the repetitive outbound calls that fill a day and never quite get finished.',
      },
      {
        title: 'A GST invoice your accountant accepts',
        body: 'Billed in rupees through Razorpay with a GST-compliant invoice. Obvious, and not true of the US platforms you would otherwise be comparing.',
      },
    ],
    seo: {
      title: 'AI Receptionist in Ahmedabad — Gujarati & Hindi',
      description:
        'An AI voice agent answering calls in Ahmedabad in Gujarati, Hindi and English, on an Indic speech stack. Indian numbers, INR billing, GST invoice.',
      keywords: ['AI receptionist Ahmedabad', 'Gujarati voice AI', 'AI call answering Gujarat', 'AI phone agent Ahmedabad'],
    },
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Language records for a city, in the order the city lists them. */
export function cityLanguages(city: City) {
  return city.languages
    .map((code) => languages.find((l) => l.code === code))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
}

/** Vertical records for a city, skipping any slug that no longer exists. */
export function cityVerticals(city: City) {
  return city.verticals
    .map((slug) => findAnyVertical(slug))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));
}
