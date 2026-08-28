/**
 * Editorial content for `/voice-ai/[language]`.
 *
 * Separate from `data/languages.ts` on purpose. That file is the product fact —
 * which languages the agent speaks, in which script, with which code-mixed
 * register — and it is read by the chips, the how-it-works page and llms.txt.
 * This file is the argument for each one, and only the seven Indic languages
 * get a page: French, Spanish and Arabic run on the underlying voice stack
 * without a custom register, so a page claiming special competence in them
 * would be the exact overreach the rest of this site avoids.
 *
 * Each page has to justify its own existence. What makes these differ is not a
 * swapped language name — it is that the *hard part* is different in each one.
 * Tamil breaks transcription through agglutination. Hindi breaks it through
 * code-mixing density. Gujarati breaks it through neglect. If a page cannot
 * say what specifically is hard, it should not exist.
 *
 * No invented statistics. Speaker counts, market sizes and accuracy figures are
 * all absent deliberately — none of them is measured here.
 */

import { languages } from './languages';

export type LanguagePage = {
  /** Must match a `code` in data/languages.ts. */
  code: string;
  /** The thing that actually makes this language hard for a voice agent. */
  hardPart: { title: string; body: string };
  /** Why it matters commercially, in that language's markets. */
  why: string;
  /** Two or three specifics, each checkable. */
  points: { title: string; body: string }[];
  /** City slugs where this language leads. */
  cities: string[];
  seo: { title: string; description: string; keywords: string[] };
};

export const languagePages: LanguagePage[] = [
  {
    code: 'hi',
    hardPart: {
      title: 'The English is load-bearing',
      body: 'Hinglish is not Hindi with English words dropped in — the two grammars interleave, and the English carries the parts that matter most to a business call: the order number, the amount, the date, the product name. A model that transcribes the Hindi well and the embedded English badly has failed the call while scoring well on the language.',
    },
    why: 'Hindi and English run on the cheapest speech stack we have, so a Hindi line goes further on the same credit than any regional-language line. For a D2C brand confirming COD orders across the north, that difference compounds over tens of thousands of calls.',
    points: [
      {
        title: 'Code-mixed by default',
        body: 'The agent is not switched into a Hinglish mode. Mixed speech is the register it expects, so a caller moving between Hindi and English mid-clause needs no handling.',
      },
      {
        title: 'Numbers read the Indian way',
        body: 'Lakh and crore, and digits read in pairs rather than singly. A stack tuned on US call-centre audio mishears exactly the fields a business call is about.',
      },
      {
        title: 'Set in genuine Devanagari',
        body: 'Hindi on this site is IBM Plex Sans Devanagari, self-hosted — a real Devanagari cut rather than a fallback face.',
      },
    ],
    cities: ['delhi-ncr', 'mumbai', 'hyderabad'],
    seo: {
      title: 'Hindi Voice AI — Hinglish Calls, Handled as the Normal Case',
      description:
        'A voice agent that answers and makes calls in Hindi with Hinglish as the default register, not a mode. Indian numbers, INR billing, GST invoicing.',
      keywords: ['Hindi voice AI', 'Hinglish voice agent', 'Hindi AI calling', 'AI voice agent Hindi India'],
    },
  },
  {
    code: 'ta',
    hardPart: {
      title: 'Meaning lives in the suffixes',
      body: 'Tamil is agglutinative: a single word can carry what English spreads across a clause, with tense, person, case and negation stacked onto a root. A transcriber that expects word boundaries in the European sense mis-segments the sentence before any language model gets a chance to reason about it, and the errors land inside the meaning rather than at the edges of it.',
    },
    why: 'Tamil is the language Decibyl was built for first, and it is the one where the gap between an Indic-trained stack and a general multilingual one is most audible to a native speaker. Tanglish — Tamil verbs with English nouns — is the everyday register in Chennai and Coimbatore, not a corner case.',
    points: [
      {
        title: 'Tanglish is the default',
        body: 'A caller mixing Tamil and English inside one clause is speaking normally, and the agent is built to expect that rather than to recover from it.',
      },
      {
        title: 'Set in a real Tamil face',
        body: 'Noto Sans Tamil, self-hosted. IBM ships a Plex Tamil cut but Google Fonts does not serve it, so we use the best Tamil family we can actually self-host rather than letting the browser guess.',
      },
      {
        title: 'Regional stack, dearer a minute',
        body: 'Tamil runs on the regional speech stack, which costs more per minute than Hindi or English. Our pricing shows included calling as a range for exactly this reason.',
      },
    ],
    cities: ['chennai', 'hosur', 'bangalore'],
    seo: {
      title: 'Tamil Voice AI — Tanglish Calls, Built Indic-First',
      description:
        'A voice agent that answers and makes calls in Tamil, with Tanglish as the default register. Built on an Indic speech stack, with Indian numbers and GST invoicing.',
      keywords: ['Tamil voice AI', 'Tanglish voice agent', 'Tamil AI calling', 'AI voice agent Tamil Nadu'],
    },
  },
  {
    code: 'te',
    hardPart: {
      title: 'Two registers on one line',
      body: 'Telugu speakers in Hyderabad move between Telugu and a Hindi-Urdu register without announcing it, often within a single exchange. An agent that decides the language at the start of the call and holds it will be wrong by the third turn, so the language has to be tracked as the caller goes rather than set once.',
    },
    why: 'Telugu covers two of India’s fastest-growing business regions, and it is well served by Indic speech models and poorly served by general multilingual ones — which is the gap worth exploiting if your customers are in Hyderabad or coastal Andhra.',
    points: [
      {
        title: 'Telugu and Hindi in the same call',
        body: 'Both live, both code-mixed with English by default. The agent follows the caller rather than locking to the language of the first sentence.',
      },
      {
        title: 'Real estate and diagnostics first',
        body: 'Site-visit follow-up and report-ready calls are the high-volume, low-variation calls that a human team never quite finishes.',
      },
      {
        title: 'Regional stack, dearer a minute',
        body: 'Like Tamil and Kannada, Telugu costs more per minute than Hindi or English. Worth sizing a pilot around rather than discovering on the first invoice.',
      },
    ],
    cities: ['hyderabad', 'bangalore', 'chennai'],
    seo: {
      title: 'Telugu Voice AI — Calls in Telugu, Hindi and English',
      description:
        'A voice agent that answers and makes calls in Telugu, code-mixed with Hindi and English by default. Indic speech stack, Indian numbers, GST invoicing.',
      keywords: ['Telugu voice AI', 'Telugu AI calling', 'AI voice agent Hyderabad', 'AI voice agent Telangana'],
    },
  },
  {
    code: 'kn',
    hardPart: {
      title: 'Kannada rarely arrives alone',
      body: 'Bangalore is the densest language mix in the country on a single phone line — Kannada with English, Tamil, Telugu and Hindi all plausible from the same caller. The hard part is not Kannada itself; it is that a Kannada line is really a five-language line, and any design that asks the caller to declare a language up front has already lost.',
    },
    why: 'Kannada is the state language of India’s largest technology market, and the one most often skipped by platforms that ship "Indian languages" as a checkbox. A business answering in Kannada in Bangalore reads as local in a way its competitors usually do not.',
    points: [
      {
        title: 'No language menu',
        body: 'The agent does not ask a caller to choose before it will listen. Kannada, English, Tamil, Telugu and Hindi are all live on the same line.',
      },
      {
        title: 'Set in a real Kannada face',
        body: 'Noto Sans Kannada, self-hosted, rather than whatever the browser falls back to.',
      },
      {
        title: 'Regional stack, dearer a minute',
        body: 'Kannada runs on the regional speech stack. The pricing page shows a range rather than one number because of exactly this.',
      },
    ],
    cities: ['bangalore', 'hosur'],
    seo: {
      title: 'Kannada Voice AI — Bangalore Calls, Five Languages, One Line',
      description:
        'A voice agent that answers calls in Kannada alongside English, Tamil, Telugu and Hindi, with no language menu. Indic speech stack, Indian numbers, GST invoicing.',
      keywords: ['Kannada voice AI', 'Kannada AI calling', 'AI voice agent Bangalore', 'AI receptionist Karnataka'],
    },
  },
  {
    code: 'mr',
    hardPart: {
      title: 'Devanagari, but not Hindi',
      body: 'Marathi shares a script with Hindi and is a different language, which is precisely the trap: a stack that routes by script rather than by language will transcribe Marathi as though it were Hindi and produce something that reads plausibly and means the wrong thing. Silent failure is worse than an obvious one, because nobody reviews a transcript that looks fine.',
    },
    why: 'Maharashtra carries a large share of India’s lending, insurance and education volume, and all three run heavy outbound. A Marathi-speaking customer answered in Hindi notices immediately.',
    points: [
      {
        title: 'Marathi as its own language',
        body: 'Not Hindi with a different vocabulary. Code-mixed with Hindi and English by default, which is how Pune and Mumbai actually speak.',
      },
      {
        title: 'Education is the standout use case',
        body: 'Admissions enquiries arrive in bursts and decay by the hour. The constraint is never the script, it is that a human team runs out of afternoon.',
      },
      {
        title: 'Data resident in Mumbai',
        body: 'Call data sits in AWS ap-south-1 by default — the same state as most of the businesses using this language.',
      },
    ],
    cities: ['pune', 'mumbai'],
    seo: {
      title: 'Marathi Voice AI — Calls in Marathi, Not Hindi With a Marathi Label',
      description:
        'A voice agent that answers and makes calls in Marathi, code-mixed with Hindi and English. Indic speech stack, data resident in Mumbai, GST invoicing.',
      keywords: ['Marathi voice AI', 'Marathi AI calling', 'AI voice agent Pune', 'AI receptionist Maharashtra'],
    },
  },
  {
    code: 'gu',
    hardPart: {
      title: 'Neglect, more than difficulty',
      body: 'Gujarati is not unusually hard to model. It is unusually badly served: most platforms list it and route it through a general multilingual voice that reads as a foreigner sounding out the script. That is worse than answering in English, because English is neutral and a bad Gujarati voice reads as a company that could not be bothered.',
    },
    why: 'An enormous amount of Indian trading and wholesale business runs in Gujarati, and it is the language where sounding local is most likely to be the thing that wins the account.',
    points: [
      {
        title: 'An Indic speech stack, not a generic voice',
        body: 'Served by models trained on Indian languages rather than a multilingual model with Gujarati in the list.',
      },
      {
        title: 'Set in a real Gujarati face',
        body: 'Noto Sans Gujarati, self-hosted. A fair test of any vendor: if they cannot typeset the language on their own marketing page, ask how carefully they modelled hearing it.',
      },
      {
        title: 'Order and payment follow-up',
        body: 'Dispatch updates, order confirmation and payment follow-up are the repetitive outbound calls that fill a trading day and never get finished.',
      },
    ],
    cities: ['ahmedabad', 'mumbai'],
    seo: {
      title: 'Gujarati Voice AI — A Voice That Sounds Gujarati',
      description:
        'A voice agent that answers and makes calls in Gujarati on an Indic speech stack, rather than a general multilingual voice. Indian numbers, GST invoicing.',
      keywords: ['Gujarati voice AI', 'Gujarati AI calling', 'AI voice agent Ahmedabad', 'AI receptionist Gujarat'],
    },
  },
  {
    code: 'en',
    hardPart: {
      title: 'Indian English is its own language',
      body: 'A stack trained on American call-centre audio mishears Indian English in the places that carry the meaning: lakh and crore, digits read in pairs, place names, and the rhythm of a sentence built by a Tamil or Marathi first-language speaker. The transcript reads fluently and the order number is wrong, which is the most expensive kind of error because nothing looks broken.',
    },
    why: 'English is the fallback register on almost every Indian business line, and the one most likely to be assumed handled and never tested. It also runs on the cheapest speech stack we have, alongside Hindi.',
    points: [
      {
        title: 'Indian English, not American English',
        body: 'Numbers, names and rhythm modelled for the way English is actually spoken here.',
      },
      {
        title: 'The cheapest minutes we sell',
        body: 'English and Hindi run on the cheapest stack, so credit goes furthest on an English line.',
      },
      {
        title: 'It is the switch language',
        body: 'Most code-mixing in India is with English. Getting English right is not a separate feature from getting Tamil or Marathi right — it is half of each.',
      },
    ],
    cities: ['bangalore', 'delhi-ncr', 'mumbai'],
    seo: {
      title: 'English Voice AI for India — Indian English, Not American English',
      description:
        'A voice agent that handles Indian English properly: lakh and crore, digits in pairs, Indian place names, and code-mixing with every Indian language.',
      keywords: ['Indian English voice AI', 'AI call answering India English', 'AI voice agent India', 'English AI receptionist India'],
    },
  },
];

/** The URL segment for a language page — the English name, lowercased.
 *  `/voice-ai/tamil` rather than `/voice-ai/ta`: a two-letter code means
 *  nothing to a reader and nothing to a search engine. */
export function languageSlug(page: LanguagePage): string {
  const record = languages.find((l) => l.code === page.code);
  return (record?.name ?? page.code).toLowerCase();
}

export function getLanguagePageBySlug(slug: string): LanguagePage | undefined {
  return languagePages.find((l) => languageSlug(l) === slug.toLowerCase());
}

/** The product record behind a page — script, native name, code-mixed label. */
export function languageRecord(page: LanguagePage) {
  return languages.find((l) => l.code === page.code);
}
