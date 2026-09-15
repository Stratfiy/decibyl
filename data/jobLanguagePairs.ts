/**
 * Pair pages: a job crossed with a language (`/jobs/[job]/language/[language]`).
 *
 * Same rule as data/jobPairs.ts: a pair exists only if it is listed in
 * `job.languages` and written here, and the build fails otherwise. Each entry
 * says what that language makes hard for that job specifically, how numbers
 * and dates arrive in it, and the register the bot keeps. Language facts are
 * the ones data/languagePages.ts argues; job facts are data/jobs.ts. No
 * invented statistics.
 */

import type { Faq } from './faqs';
import { getJob, jobs } from './jobs';
import { languageHref } from './languagePages';

export type JobLanguagePair = {
  job: string;
  /** A code from data/languagePages.ts. */
  language: string;
  intro: string;
  points: { title: string; body: string }[];
  faqs: Faq[];
};

export const jobLanguagePairs: JobLanguagePair[] = [
  {
    "job": "clinic-receptionist",
    "language": "ta",
    "intro": "In Tamil a whole clause can arrive as one long word, and when that clause contains the patient’s name and the slot, splitting it in the wrong place changes what the caller agreed to. This job is booking, confirming or moving an appointment, so the bot must hold the patient’s name, the doctor, the slot and the reason for the visit in Tamil for Chennai, Coimbatore, Madurai, Hosur and the Tamil half of Bengaluru. It answers with “neenga”, stays unhurried with an elderly caller, brisk with a parent at a school gate, and reads the patient’s name and the slot back before writing anything, because a mis-heard slot is a patient on the wrong day.",
    "points": [
      {
        "title": "The Tamil problem, on this job",
        "body": "Agglutination defeats transcribers trained on short English words, and a Tamil caller expects “sir” or “madam” as part of the grammar of politeness. Here the words at stake are the patient’s name, the doctor, the slot and the reason for the visit. A caller saying “Dr Meena, Thursday evening, my mother, knee pain” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Tamil: numbers usually in English even from a Tamil-first caller, and “naalaikku” or “adutha vaaram” doing the work of a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the honorific plural throughout and drops into English only where the caller does. On this job that means unhurried with an elderly caller, brisk with a parent at a school gate."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Tamil if the caller switches?",
        "a": "It follows the caller. Tamil and English on one line is the normal case for patients and their families, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the patient’s name and the slot in Tamil?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard slot is a patient on the wrong day, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "clinic-receptionist",
    "language": "te",
    "intro": "This job is booking, confirming or moving an appointment, so the bot must hold the patient’s name, the doctor, the slot and the reason for the visit in Telugu for Hyderabad, Vijayawada, Visakhapatnam and Telugu speakers in Bengaluru and Chennai. A Telugu caller from a district town and one from Jubilee Hills use the same language with very different English density, and the patient’s name and the slot sits in whichever half they choose. It answers with “meeru”, stays unhurried with an elderly caller, brisk with a parent at a school gate, and reads the patient’s name and the slot back before writing anything, because a mis-heard slot is a patient on the wrong day.",
    "points": [
      {
        "title": "The Telugu problem, on this job",
        "body": "Long compound words, and a Hyderabad habit of switching to English for anything technical, so one sentence carries two languages of meaning. Here the words at stake are the patient’s name, the doctor, the slot and the reason for the visit. A caller saying “Dr Meena, Thursday evening, my mother, knee pain” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Telugu: amounts in English with “andi” softening the confirmation, and “repu” or “ee vaaram” for the schedule. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Every confirmation ends with the respectful form, because a bare “ok” in Telugu sounds curt on a business line. On this job that means unhurried with an elderly caller, brisk with a parent at a school gate."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Telugu if the caller switches?",
        "a": "It follows the caller. Telugu and English on one line is the normal case for patients and their families, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the patient’s name and the slot in Telugu?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard slot is a patient on the wrong day, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "clinic-receptionist",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the patient’s name and the slot lives. It answers with “aap”, stays unhurried with an elderly caller, brisk with a parent at a school gate, and reads the patient’s name and the slot back before writing anything, because a mis-heard slot is a patient on the wrong day. This job is booking, confirming or moving an appointment, so the bot must hold the patient’s name, the doctor, the slot and the reason for the visit in Hindi for callers across the north and the fallback language in every metro.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the patient’s name, the doctor, the slot and the reason for the visit. A caller saying “Dr Meena, Thursday evening, my mother, knee pain” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means unhurried with an elderly caller, brisk with a parent at a school gate."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for patients and their families, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the patient’s name and the slot in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard slot is a patient on the wrong day, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "clinic-receptionist",
    "language": "kn",
    "intro": "On a Bengaluru line the caller may not be a Kannada speaker at all, so the bot opens in Kannada, listens, and follows the caller into English or Hindi while still catching the patient’s name and the slot. This job is booking, confirming or moving an appointment, so the bot must hold the patient’s name, the doctor, the slot and the reason for the visit in Kannada for Bengaluru, Mysuru, Hubballi and the Karnataka side of Hosur. It answers with “neevu”, stays unhurried with an elderly caller, brisk with a parent at a school gate, and reads the patient’s name and the slot back before writing anything, because a mis-heard slot is a patient on the wrong day.",
    "points": [
      {
        "title": "The Kannada problem, on this job",
        "body": "One call can move between Kannada, English and Hindi, so the bot follows the language it hears rather than the one it assumed. Here the words at stake are the patient’s name, the doctor, the slot and the reason for the visit. A caller saying “Dr Meena, Thursday evening, my mother, knee pain” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Kannada: numbers almost always in English with Kannada carrying the courtesy, and “naale” or “munde vaara” beside English weekday names. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Staying in Kannada when the caller stays is what a local business expects; leaving it the moment the caller does is what keeps the call short. On this job that means unhurried with an elderly caller, brisk with a parent at a school gate."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Kannada if the caller switches?",
        "a": "It follows the caller. Kannada and English on one line is the normal case for patients and their families, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the patient’s name and the slot in Kannada?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard slot is a patient on the wrong day, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "clinic-receptionist",
    "language": "en",
    "intro": "This job is booking, confirming or moving an appointment, so the bot must hold the patient’s name, the doctor, the slot and the reason for the visit in English for every metro, and any business whose customers are professionals or from outside the state. Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the patient’s name and the slot included. It answers with “you”, stays unhurried with an elderly caller, brisk with a parent at a school gate, and reads the patient’s name and the slot back before writing anything, because a mis-heard slot is a patient on the wrong day.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are the patient’s name, the doctor, the slot and the reason for the visit. A caller saying “Dr Meena, Thursday evening, my mother, knee pain” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means unhurried with an elderly caller, brisk with a parent at a school gate."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for patients and their families, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the patient’s name and the slot in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard slot is a patient on the wrong day, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "collections-telecaller",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the amount and the promised date lives. This job is a due reminder and a promise-to-pay, so the bot must hold the amount due, the due date, the account number and the promised date in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays firm about the date and respectful about the person, inside the calling window, and reads the amount and the promised date back before writing anything, because a mis-heard amount is a dispute and a compliance note.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the amount due, the due date, the account number and the promised date. A caller saying “paanch hazaar, agle Shukravaar” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means firm about the date and respectful about the person, inside the calling window."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for borrowers and fee payers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the amount and the promised date in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard amount is a dispute and a compliance note, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "collections-telecaller",
    "language": "ta",
    "intro": "This job is a due reminder and a promise-to-pay, so the bot must hold the amount due, the due date, the account number and the promised date in Tamil for Chennai, Coimbatore, Madurai, Hosur and the Tamil half of Bengaluru. In Tamil a whole clause can arrive as one long word, and when that clause contains the amount and the promised date, splitting it in the wrong place changes what the caller agreed to. It answers with “neenga”, stays firm about the date and respectful about the person, inside the calling window, and reads the amount and the promised date back before writing anything, because a mis-heard amount is a dispute and a compliance note.",
    "points": [
      {
        "title": "The Tamil problem, on this job",
        "body": "Agglutination defeats transcribers trained on short English words, and a Tamil caller expects “sir” or “madam” as part of the grammar of politeness. Here the words at stake are the amount due, the due date, the account number and the promised date. A caller saying “paanch hazaar, agle Shukravaar” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Tamil: numbers usually in English even from a Tamil-first caller, and “naalaikku” or “adutha vaaram” doing the work of a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the honorific plural throughout and drops into English only where the caller does. On this job that means firm about the date and respectful about the person, inside the calling window."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Tamil if the caller switches?",
        "a": "It follows the caller. Tamil and English on one line is the normal case for borrowers and fee payers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the amount and the promised date in Tamil?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard amount is a dispute and a compliance note, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "collections-telecaller",
    "language": "te",
    "intro": "A Telugu caller from a district town and one from Jubilee Hills use the same language with very different English density, and the amount and the promised date sits in whichever half they choose. It answers with “meeru”, stays firm about the date and respectful about the person, inside the calling window, and reads the amount and the promised date back before writing anything, because a mis-heard amount is a dispute and a compliance note. This job is a due reminder and a promise-to-pay, so the bot must hold the amount due, the due date, the account number and the promised date in Telugu for Hyderabad, Vijayawada, Visakhapatnam and Telugu speakers in Bengaluru and Chennai.",
    "points": [
      {
        "title": "The Telugu problem, on this job",
        "body": "Long compound words, and a Hyderabad habit of switching to English for anything technical, so one sentence carries two languages of meaning. Here the words at stake are the amount due, the due date, the account number and the promised date. A caller saying “paanch hazaar, agle Shukravaar” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Telugu: amounts in English with “andi” softening the confirmation, and “repu” or “ee vaaram” for the schedule. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Every confirmation ends with the respectful form, because a bare “ok” in Telugu sounds curt on a business line. On this job that means firm about the date and respectful about the person, inside the calling window."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Telugu if the caller switches?",
        "a": "It follows the caller. Telugu and English on one line is the normal case for borrowers and fee payers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the amount and the promised date in Telugu?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard amount is a dispute and a compliance note, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "collections-telecaller",
    "language": "mr",
    "intro": "Pune and Mumbai callers expect a formal Marathi register from a business, and then say the amount and the promised date in Hindi or English in the same breath. This job is a due reminder and a promise-to-pay, so the bot must hold the amount due, the due date, the account number and the promised date in Marathi for Pune, Mumbai, Nashik, Nagpur and every Maharashtra business line. It answers with “tumhi”, stays firm about the date and respectful about the person, inside the calling window, and reads the amount and the promised date back before writing anything, because a mis-heard amount is a dispute and a compliance note.",
    "points": [
      {
        "title": "The Marathi problem, on this job",
        "body": "The respectful plural and “namaskar” are noticed when absent, while the detail that matters usually arrives in English or Hindi. Here the words at stake are the amount due, the due date, the account number and the promised date. A caller saying “paanch hazaar, agle Shukravaar” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Marathi: amounts and phone numbers in English or Hindi more often than in Marathi, dates in English, and “udya” or “pudhchya aathavdyat” in Marathi. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the formal register for the whole call and never slips into the familiar form. On this job that means firm about the date and respectful about the person, inside the calling window."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Marathi if the caller switches?",
        "a": "It follows the caller. Marathi and English on one line is the normal case for borrowers and fee payers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the amount and the promised date in Marathi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard amount is a dispute and a compliance note, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "collections-telecaller",
    "language": "gu",
    "intro": "This job is a due reminder and a promise-to-pay, so the bot must hold the amount due, the due date, the account number and the promised date in Gujarati for Ahmedabad, Surat, Vadodara, Rajkot and Gujarati trading families in Mumbai. Most speech stacks have heard far less Gujarati than Hindi, so names, amounts and trade words are where a general model fails first, and the amount and the promised date is exactly that kind of word. It answers with “tame”, stays firm about the date and respectful about the person, inside the calling window, and reads the amount and the promised date back before writing anything, because a mis-heard amount is a dispute and a compliance note.",
    "points": [
      {
        "title": "The Gujarati problem, on this job",
        "body": "Neglect in the training data, and a trade vocabulary for quantities, credit periods and dispatch that a general model has not seen. Here the words at stake are the amount due, the due date, the account number and the promised date. A caller saying “paanch hazaar, agle Shukravaar” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Gujarati: amounts in Gujarati numerals for trade sums, lakh above a hundred thousand, and “kaale” or “aavta athvadiye” with the date only for an invoice. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot is prompted with trade Gujarati rather than left to guess it. On this job that means firm about the date and respectful about the person, inside the calling window."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Gujarati if the caller switches?",
        "a": "It follows the caller. Gujarati and English on one line is the normal case for borrowers and fee payers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the amount and the promised date in Gujarati?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard amount is a dispute and a compliance note, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "order-confirmation-executive",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the landmark and the pincode lives. This job is a cash-on-delivery confirmation, so the bot must hold the order number, the address and landmark, the pincode read back and the amount in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays quick, because the customer did not ask for the call, and reads the landmark and the pincode back before writing anything, because a mis-heard landmark is a failed delivery and a return charge.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the order number, the address and landmark, the pincode read back and the amount. A caller saying “near the temple, opposite the bus stand, 641012” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means quick, because the customer did not ask for the call."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for online shoppers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the landmark and the pincode in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard landmark is a failed delivery and a return charge, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "order-confirmation-executive",
    "language": "en",
    "intro": "This job is a cash-on-delivery confirmation, so the bot must hold the order number, the address and landmark, the pincode read back and the amount in English for every metro, and any business whose customers are professionals or from outside the state. Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the landmark and the pincode included. It answers with “you”, stays quick, because the customer did not ask for the call, and reads the landmark and the pincode back before writing anything, because a mis-heard landmark is a failed delivery and a return charge.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are the order number, the address and landmark, the pincode read back and the amount. A caller saying “near the temple, opposite the bus stand, 641012” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means quick, because the customer did not ask for the call."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for online shoppers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the landmark and the pincode in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard landmark is a failed delivery and a return charge, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "order-confirmation-executive",
    "language": "mr",
    "intro": "Pune and Mumbai callers expect a formal Marathi register from a business, and then say the landmark and the pincode in Hindi or English in the same breath. It answers with “tumhi”, stays quick, because the customer did not ask for the call, and reads the landmark and the pincode back before writing anything, because a mis-heard landmark is a failed delivery and a return charge. This job is a cash-on-delivery confirmation, so the bot must hold the order number, the address and landmark, the pincode read back and the amount in Marathi for Pune, Mumbai, Nashik, Nagpur and every Maharashtra business line.",
    "points": [
      {
        "title": "The Marathi problem, on this job",
        "body": "The respectful plural and “namaskar” are noticed when absent, while the detail that matters usually arrives in English or Hindi. Here the words at stake are the order number, the address and landmark, the pincode read back and the amount. A caller saying “near the temple, opposite the bus stand, 641012” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Marathi: amounts and phone numbers in English or Hindi more often than in Marathi, dates in English, and “udya” or “pudhchya aathavdyat” in Marathi. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the formal register for the whole call and never slips into the familiar form. On this job that means quick, because the customer did not ask for the call."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Marathi if the caller switches?",
        "a": "It follows the caller. Marathi and English on one line is the normal case for online shoppers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the landmark and the pincode in Marathi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard landmark is a failed delivery and a return charge, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "order-confirmation-executive",
    "language": "gu",
    "intro": "Most speech stacks have heard far less Gujarati than Hindi, so names, amounts and trade words are where a general model fails first, and the landmark and the pincode is exactly that kind of word. This job is a cash-on-delivery confirmation, so the bot must hold the order number, the address and landmark, the pincode read back and the amount in Gujarati for Ahmedabad, Surat, Vadodara, Rajkot and Gujarati trading families in Mumbai. It answers with “tame”, stays quick, because the customer did not ask for the call, and reads the landmark and the pincode back before writing anything, because a mis-heard landmark is a failed delivery and a return charge.",
    "points": [
      {
        "title": "The Gujarati problem, on this job",
        "body": "Neglect in the training data, and a trade vocabulary for quantities, credit periods and dispatch that a general model has not seen. Here the words at stake are the order number, the address and landmark, the pincode read back and the amount. A caller saying “near the temple, opposite the bus stand, 641012” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Gujarati: amounts in Gujarati numerals for trade sums, lakh above a hundred thousand, and “kaale” or “aavta athvadiye” with the date only for an invoice. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot is prompted with trade Gujarati rather than left to guess it. On this job that means quick, because the customer did not ask for the call."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Gujarati if the caller switches?",
        "a": "It follows the caller. Gujarati and English on one line is the normal case for online shoppers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the landmark and the pincode in Gujarati?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard landmark is a failed delivery and a return charge, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "order-confirmation-executive",
    "language": "ta",
    "intro": "This job is a cash-on-delivery confirmation, so the bot must hold the order number, the address and landmark, the pincode read back and the amount in Tamil for Chennai, Coimbatore, Madurai, Hosur and the Tamil half of Bengaluru. In Tamil a whole clause can arrive as one long word, and when that clause contains the landmark and the pincode, splitting it in the wrong place changes what the caller agreed to. It answers with “neenga”, stays quick, because the customer did not ask for the call, and reads the landmark and the pincode back before writing anything, because a mis-heard landmark is a failed delivery and a return charge.",
    "points": [
      {
        "title": "The Tamil problem, on this job",
        "body": "Agglutination defeats transcribers trained on short English words, and a Tamil caller expects “sir” or “madam” as part of the grammar of politeness. Here the words at stake are the order number, the address and landmark, the pincode read back and the amount. A caller saying “near the temple, opposite the bus stand, 641012” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Tamil: numbers usually in English even from a Tamil-first caller, and “naalaikku” or “adutha vaaram” doing the work of a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the honorific plural throughout and drops into English only where the caller does. On this job that means quick, because the customer did not ask for the call."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Tamil if the caller switches?",
        "a": "It follows the caller. Tamil and English on one line is the normal case for online shoppers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the landmark and the pincode in Tamil?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard landmark is a failed delivery and a return charge, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "real-estate-telecaller",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the budget and the locality lives. This job is a project enquiry and a site-visit booking, so the bot must hold the budget in lakh or crore, the locality, the configuration and the visit slot in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays warm and specific, never pushy, and reads the budget and the locality back before writing anything, because a mis-heard budget sends the wrong brochure and loses the lead.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the budget in lakh or crore, the locality, the configuration and the visit slot. A caller saying “sixty to seventy lakh, 2 BHK, near the metro” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means warm and specific, never pushy."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for home buyers and investors, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the locality in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard budget sends the wrong brochure and loses the lead, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "real-estate-telecaller",
    "language": "te",
    "intro": "This job is a project enquiry and a site-visit booking, so the bot must hold the budget in lakh or crore, the locality, the configuration and the visit slot in Telugu for Hyderabad, Vijayawada, Visakhapatnam and Telugu speakers in Bengaluru and Chennai. A Telugu caller from a district town and one from Jubilee Hills use the same language with very different English density, and the budget and the locality sits in whichever half they choose. It answers with “meeru”, stays warm and specific, never pushy, and reads the budget and the locality back before writing anything, because a mis-heard budget sends the wrong brochure and loses the lead.",
    "points": [
      {
        "title": "The Telugu problem, on this job",
        "body": "Long compound words, and a Hyderabad habit of switching to English for anything technical, so one sentence carries two languages of meaning. Here the words at stake are the budget in lakh or crore, the locality, the configuration and the visit slot. A caller saying “sixty to seventy lakh, 2 BHK, near the metro” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Telugu: amounts in English with “andi” softening the confirmation, and “repu” or “ee vaaram” for the schedule. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Every confirmation ends with the respectful form, because a bare “ok” in Telugu sounds curt on a business line. On this job that means warm and specific, never pushy."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Telugu if the caller switches?",
        "a": "It follows the caller. Telugu and English on one line is the normal case for home buyers and investors, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the locality in Telugu?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard budget sends the wrong brochure and loses the lead, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "real-estate-telecaller",
    "language": "kn",
    "intro": "On a Bengaluru line the caller may not be a Kannada speaker at all, so the bot opens in Kannada, listens, and follows the caller into English or Hindi while still catching the budget and the locality. It answers with “neevu”, stays warm and specific, never pushy, and reads the budget and the locality back before writing anything, because a mis-heard budget sends the wrong brochure and loses the lead. This job is a project enquiry and a site-visit booking, so the bot must hold the budget in lakh or crore, the locality, the configuration and the visit slot in Kannada for Bengaluru, Mysuru, Hubballi and the Karnataka side of Hosur.",
    "points": [
      {
        "title": "The Kannada problem, on this job",
        "body": "One call can move between Kannada, English and Hindi, so the bot follows the language it hears rather than the one it assumed. Here the words at stake are the budget in lakh or crore, the locality, the configuration and the visit slot. A caller saying “sixty to seventy lakh, 2 BHK, near the metro” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Kannada: numbers almost always in English with Kannada carrying the courtesy, and “naale” or “munde vaara” beside English weekday names. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Staying in Kannada when the caller stays is what a local business expects; leaving it the moment the caller does is what keeps the call short. On this job that means warm and specific, never pushy."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Kannada if the caller switches?",
        "a": "It follows the caller. Kannada and English on one line is the normal case for home buyers and investors, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the locality in Kannada?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard budget sends the wrong brochure and loses the lead, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "real-estate-telecaller",
    "language": "mr",
    "intro": "Pune and Mumbai callers expect a formal Marathi register from a business, and then say the budget and the locality in Hindi or English in the same breath. This job is a project enquiry and a site-visit booking, so the bot must hold the budget in lakh or crore, the locality, the configuration and the visit slot in Marathi for Pune, Mumbai, Nashik, Nagpur and every Maharashtra business line. It answers with “tumhi”, stays warm and specific, never pushy, and reads the budget and the locality back before writing anything, because a mis-heard budget sends the wrong brochure and loses the lead.",
    "points": [
      {
        "title": "The Marathi problem, on this job",
        "body": "The respectful plural and “namaskar” are noticed when absent, while the detail that matters usually arrives in English or Hindi. Here the words at stake are the budget in lakh or crore, the locality, the configuration and the visit slot. A caller saying “sixty to seventy lakh, 2 BHK, near the metro” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Marathi: amounts and phone numbers in English or Hindi more often than in Marathi, dates in English, and “udya” or “pudhchya aathavdyat” in Marathi. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the formal register for the whole call and never slips into the familiar form. On this job that means warm and specific, never pushy."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Marathi if the caller switches?",
        "a": "It follows the caller. Marathi and English on one line is the normal case for home buyers and investors, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the locality in Marathi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard budget sends the wrong brochure and loses the lead, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "real-estate-telecaller",
    "language": "gu",
    "intro": "This job is a project enquiry and a site-visit booking, so the bot must hold the budget in lakh or crore, the locality, the configuration and the visit slot in Gujarati for Ahmedabad, Surat, Vadodara, Rajkot and Gujarati trading families in Mumbai. Most speech stacks have heard far less Gujarati than Hindi, so names, amounts and trade words are where a general model fails first, and the budget and the locality is exactly that kind of word. It answers with “tame”, stays warm and specific, never pushy, and reads the budget and the locality back before writing anything, because a mis-heard budget sends the wrong brochure and loses the lead.",
    "points": [
      {
        "title": "The Gujarati problem, on this job",
        "body": "Neglect in the training data, and a trade vocabulary for quantities, credit periods and dispatch that a general model has not seen. Here the words at stake are the budget in lakh or crore, the locality, the configuration and the visit slot. A caller saying “sixty to seventy lakh, 2 BHK, near the metro” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Gujarati: amounts in Gujarati numerals for trade sums, lakh above a hundred thousand, and “kaale” or “aavta athvadiye” with the date only for an invoice. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot is prompted with trade Gujarati rather than left to guess it. On this job that means warm and specific, never pushy."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Gujarati if the caller switches?",
        "a": "It follows the caller. Gujarati and English on one line is the normal case for home buyers and investors, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the locality in Gujarati?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard budget sends the wrong brochure and loses the lead, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "real-estate-telecaller",
    "language": "en",
    "intro": "Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the budget and the locality included. It answers with “you”, stays warm and specific, never pushy, and reads the budget and the locality back before writing anything, because a mis-heard budget sends the wrong brochure and loses the lead. This job is a project enquiry and a site-visit booking, so the bot must hold the budget in lakh or crore, the locality, the configuration and the visit slot in English for every metro, and any business whose customers are professionals or from outside the state.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are the budget in lakh or crore, the locality, the configuration and the visit slot. A caller saying “sixty to seventy lakh, 2 BHK, near the metro” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means warm and specific, never pushy."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for home buyers and investors, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the locality in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard budget sends the wrong brochure and loses the lead, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "admissions-counsellor-caller",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the course and the last date lives. This job is an admissions enquiry, so the bot must hold the course, the fee, the last date, the documents and who is calling in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays patient with a parent, direct with a student, and reads the course and the last date back before writing anything, because a mis-heard last date is a missed application.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the course, the fee, the last date, the documents and who is calling. A caller saying “B.Com, hostel, last date kab hai” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means patient with a parent, direct with a student."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for students and their parents, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the course and the last date in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard last date is a missed application, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "admissions-counsellor-caller",
    "language": "ta",
    "intro": "This job is an admissions enquiry, so the bot must hold the course, the fee, the last date, the documents and who is calling in Tamil for Chennai, Coimbatore, Madurai, Hosur and the Tamil half of Bengaluru. In Tamil a whole clause can arrive as one long word, and when that clause contains the course and the last date, splitting it in the wrong place changes what the caller agreed to. It answers with “neenga”, stays patient with a parent, direct with a student, and reads the course and the last date back before writing anything, because a mis-heard last date is a missed application.",
    "points": [
      {
        "title": "The Tamil problem, on this job",
        "body": "Agglutination defeats transcribers trained on short English words, and a Tamil caller expects “sir” or “madam” as part of the grammar of politeness. Here the words at stake are the course, the fee, the last date, the documents and who is calling. A caller saying “B.Com, hostel, last date kab hai” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Tamil: numbers usually in English even from a Tamil-first caller, and “naalaikku” or “adutha vaaram” doing the work of a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the honorific plural throughout and drops into English only where the caller does. On this job that means patient with a parent, direct with a student."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Tamil if the caller switches?",
        "a": "It follows the caller. Tamil and English on one line is the normal case for students and their parents, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the course and the last date in Tamil?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard last date is a missed application, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "admissions-counsellor-caller",
    "language": "te",
    "intro": "A Telugu caller from a district town and one from Jubilee Hills use the same language with very different English density, and the course and the last date sits in whichever half they choose. It answers with “meeru”, stays patient with a parent, direct with a student, and reads the course and the last date back before writing anything, because a mis-heard last date is a missed application. This job is an admissions enquiry, so the bot must hold the course, the fee, the last date, the documents and who is calling in Telugu for Hyderabad, Vijayawada, Visakhapatnam and Telugu speakers in Bengaluru and Chennai.",
    "points": [
      {
        "title": "The Telugu problem, on this job",
        "body": "Long compound words, and a Hyderabad habit of switching to English for anything technical, so one sentence carries two languages of meaning. Here the words at stake are the course, the fee, the last date, the documents and who is calling. A caller saying “B.Com, hostel, last date kab hai” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Telugu: amounts in English with “andi” softening the confirmation, and “repu” or “ee vaaram” for the schedule. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Every confirmation ends with the respectful form, because a bare “ok” in Telugu sounds curt on a business line. On this job that means patient with a parent, direct with a student."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Telugu if the caller switches?",
        "a": "It follows the caller. Telugu and English on one line is the normal case for students and their parents, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the course and the last date in Telugu?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard last date is a missed application, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "admissions-counsellor-caller",
    "language": "kn",
    "intro": "On a Bengaluru line the caller may not be a Kannada speaker at all, so the bot opens in Kannada, listens, and follows the caller into English or Hindi while still catching the course and the last date. This job is an admissions enquiry, so the bot must hold the course, the fee, the last date, the documents and who is calling in Kannada for Bengaluru, Mysuru, Hubballi and the Karnataka side of Hosur. It answers with “neevu”, stays patient with a parent, direct with a student, and reads the course and the last date back before writing anything, because a mis-heard last date is a missed application.",
    "points": [
      {
        "title": "The Kannada problem, on this job",
        "body": "One call can move between Kannada, English and Hindi, so the bot follows the language it hears rather than the one it assumed. Here the words at stake are the course, the fee, the last date, the documents and who is calling. A caller saying “B.Com, hostel, last date kab hai” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Kannada: numbers almost always in English with Kannada carrying the courtesy, and “naale” or “munde vaara” beside English weekday names. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Staying in Kannada when the caller stays is what a local business expects; leaving it the moment the caller does is what keeps the call short. On this job that means patient with a parent, direct with a student."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Kannada if the caller switches?",
        "a": "It follows the caller. Kannada and English on one line is the normal case for students and their parents, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the course and the last date in Kannada?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard last date is a missed application, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "admissions-counsellor-caller",
    "language": "en",
    "intro": "This job is an admissions enquiry, so the bot must hold the course, the fee, the last date, the documents and who is calling in English for every metro, and any business whose customers are professionals or from outside the state. Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the course and the last date included. It answers with “you”, stays patient with a parent, direct with a student, and reads the course and the last date back before writing anything, because a mis-heard last date is a missed application.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are the course, the fee, the last date, the documents and who is calling. A caller saying “B.Com, hostel, last date kab hai” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means patient with a parent, direct with a student."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for students and their parents, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the course and the last date in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard last date is a missed application, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "customer-support-executive",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the ticket number and the complaint lives. This job is a complaint, a status check or a refund, so the bot must hold the order or ticket number, the problem in the caller’s words and any refund amount in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays listening first, because an interrupted caller escalates, and reads the ticket number and the complaint back before writing anything, because a mis-heard ticket number is a customer explaining twice.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the order or ticket number, the problem in the caller’s words and any refund amount. A caller saying “order ending 4471, wrong size, want a refund” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means listening first, because an interrupted caller escalates."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for existing customers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the ticket number and the complaint in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard ticket number is a customer explaining twice, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "customer-support-executive",
    "language": "en",
    "intro": "This job is a complaint, a status check or a refund, so the bot must hold the order or ticket number, the problem in the caller’s words and any refund amount in English for every metro, and any business whose customers are professionals or from outside the state. Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the ticket number and the complaint included. It answers with “you”, stays listening first, because an interrupted caller escalates, and reads the ticket number and the complaint back before writing anything, because a mis-heard ticket number is a customer explaining twice.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are the order or ticket number, the problem in the caller’s words and any refund amount. A caller saying “order ending 4471, wrong size, want a refund” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means listening first, because an interrupted caller escalates."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for existing customers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the ticket number and the complaint in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard ticket number is a customer explaining twice, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "customer-support-executive",
    "language": "ta",
    "intro": "In Tamil a whole clause can arrive as one long word, and when that clause contains the ticket number and the complaint, splitting it in the wrong place changes what the caller agreed to. It answers with “neenga”, stays listening first, because an interrupted caller escalates, and reads the ticket number and the complaint back before writing anything, because a mis-heard ticket number is a customer explaining twice. This job is a complaint, a status check or a refund, so the bot must hold the order or ticket number, the problem in the caller’s words and any refund amount in Tamil for Chennai, Coimbatore, Madurai, Hosur and the Tamil half of Bengaluru.",
    "points": [
      {
        "title": "The Tamil problem, on this job",
        "body": "Agglutination defeats transcribers trained on short English words, and a Tamil caller expects “sir” or “madam” as part of the grammar of politeness. Here the words at stake are the order or ticket number, the problem in the caller’s words and any refund amount. A caller saying “order ending 4471, wrong size, want a refund” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Tamil: numbers usually in English even from a Tamil-first caller, and “naalaikku” or “adutha vaaram” doing the work of a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the honorific plural throughout and drops into English only where the caller does. On this job that means listening first, because an interrupted caller escalates."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Tamil if the caller switches?",
        "a": "It follows the caller. Tamil and English on one line is the normal case for existing customers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the ticket number and the complaint in Tamil?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard ticket number is a customer explaining twice, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "customer-support-executive",
    "language": "mr",
    "intro": "Pune and Mumbai callers expect a formal Marathi register from a business, and then say the ticket number and the complaint in Hindi or English in the same breath. This job is a complaint, a status check or a refund, so the bot must hold the order or ticket number, the problem in the caller’s words and any refund amount in Marathi for Pune, Mumbai, Nashik, Nagpur and every Maharashtra business line. It answers with “tumhi”, stays listening first, because an interrupted caller escalates, and reads the ticket number and the complaint back before writing anything, because a mis-heard ticket number is a customer explaining twice.",
    "points": [
      {
        "title": "The Marathi problem, on this job",
        "body": "The respectful plural and “namaskar” are noticed when absent, while the detail that matters usually arrives in English or Hindi. Here the words at stake are the order or ticket number, the problem in the caller’s words and any refund amount. A caller saying “order ending 4471, wrong size, want a refund” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Marathi: amounts and phone numbers in English or Hindi more often than in Marathi, dates in English, and “udya” or “pudhchya aathavdyat” in Marathi. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the formal register for the whole call and never slips into the familiar form. On this job that means listening first, because an interrupted caller escalates."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Marathi if the caller switches?",
        "a": "It follows the caller. Marathi and English on one line is the normal case for existing customers, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the ticket number and the complaint in Marathi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard ticket number is a customer explaining twice, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "procurement-follow-up-executive",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the PO number and the dispatch date lives. This job is a vendor follow-up on a purchase order, so the bot must hold the PO number, the quantity, the dispatch date, the invoice number and the transporter in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays businesslike, in the vendor’s trade vocabulary, and reads the PO number and the dispatch date back before writing anything, because a mis-heard dispatch date is a line waiting on a truck.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are the PO number, the quantity, the dispatch date, the invoice number and the transporter. A caller saying “PO 2231, two hundred pieces, Monday dispatch, invoice by mail” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means businesslike, in the vendor’s trade vocabulary."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for vendors and transporters, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the PO number and the dispatch date in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard dispatch date is a line waiting on a truck, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "procurement-follow-up-executive",
    "language": "gu",
    "intro": "This job is a vendor follow-up on a purchase order, so the bot must hold the PO number, the quantity, the dispatch date, the invoice number and the transporter in Gujarati for Ahmedabad, Surat, Vadodara, Rajkot and Gujarati trading families in Mumbai. Most speech stacks have heard far less Gujarati than Hindi, so names, amounts and trade words are where a general model fails first, and the PO number and the dispatch date is exactly that kind of word. It answers with “tame”, stays businesslike, in the vendor’s trade vocabulary, and reads the PO number and the dispatch date back before writing anything, because a mis-heard dispatch date is a line waiting on a truck.",
    "points": [
      {
        "title": "The Gujarati problem, on this job",
        "body": "Neglect in the training data, and a trade vocabulary for quantities, credit periods and dispatch that a general model has not seen. Here the words at stake are the PO number, the quantity, the dispatch date, the invoice number and the transporter. A caller saying “PO 2231, two hundred pieces, Monday dispatch, invoice by mail” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Gujarati: amounts in Gujarati numerals for trade sums, lakh above a hundred thousand, and “kaale” or “aavta athvadiye” with the date only for an invoice. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot is prompted with trade Gujarati rather than left to guess it. On this job that means businesslike, in the vendor’s trade vocabulary."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Gujarati if the caller switches?",
        "a": "It follows the caller. Gujarati and English on one line is the normal case for vendors and transporters, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the PO number and the dispatch date in Gujarati?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard dispatch date is a line waiting on a truck, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "procurement-follow-up-executive",
    "language": "ta",
    "intro": "In Tamil a whole clause can arrive as one long word, and when that clause contains the PO number and the dispatch date, splitting it in the wrong place changes what the caller agreed to. It answers with “neenga”, stays businesslike, in the vendor’s trade vocabulary, and reads the PO number and the dispatch date back before writing anything, because a mis-heard dispatch date is a line waiting on a truck. This job is a vendor follow-up on a purchase order, so the bot must hold the PO number, the quantity, the dispatch date, the invoice number and the transporter in Tamil for Chennai, Coimbatore, Madurai, Hosur and the Tamil half of Bengaluru.",
    "points": [
      {
        "title": "The Tamil problem, on this job",
        "body": "Agglutination defeats transcribers trained on short English words, and a Tamil caller expects “sir” or “madam” as part of the grammar of politeness. Here the words at stake are the PO number, the quantity, the dispatch date, the invoice number and the transporter. A caller saying “PO 2231, two hundred pieces, Monday dispatch, invoice by mail” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Tamil: numbers usually in English even from a Tamil-first caller, and “naalaikku” or “adutha vaaram” doing the work of a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the honorific plural throughout and drops into English only where the caller does. On this job that means businesslike, in the vendor’s trade vocabulary."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Tamil if the caller switches?",
        "a": "It follows the caller. Tamil and English on one line is the normal case for vendors and transporters, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the PO number and the dispatch date in Tamil?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard dispatch date is a line waiting on a truck, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "procurement-follow-up-executive",
    "language": "en",
    "intro": "Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the PO number and the dispatch date included. This job is a vendor follow-up on a purchase order, so the bot must hold the PO number, the quantity, the dispatch date, the invoice number and the transporter in English for every metro, and any business whose customers are professionals or from outside the state. It answers with “you”, stays businesslike, in the vendor’s trade vocabulary, and reads the PO number and the dispatch date back before writing anything, because a mis-heard dispatch date is a line waiting on a truck.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are the PO number, the quantity, the dispatch date, the invoice number and the transporter. A caller saying “PO 2231, two hundred pieces, Monday dispatch, invoice by mail” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means businesslike, in the vendor’s trade vocabulary."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for vendors and transporters, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the PO number and the dispatch date in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard dispatch date is a line waiting on a truck, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "lead-qualification-telecaller",
    "language": "hi",
    "intro": "A Hindi caller does not speak Hindi to a business; they speak Hinglish, and the English inside the sentence is where the budget and the callback time lives. This job is a first call to a new enquiry, so the bot must hold what the caller wants, the budget, the timeline, the location and a callback time in Hindi for callers across the north and the fallback language in every metro. It answers with “aap”, stays short and courteous, four questions and a handover, and reads the budget and the callback time back before writing anything, because a mis-heard callback time is a lead rung at the wrong moment.",
    "points": [
      {
        "title": "The Hindi problem, on this job",
        "body": "The English carries the numbers, the dates and the product names, so a stack that hears the Hindi well and the English badly has lost the call. Here the words at stake are what the caller wants, the budget, the timeline, the location and a callback time. A caller saying “budget around thirty lakh, call after 6” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Hindi: lakh and crore, phone numbers in pairs, and “15 tareekh” or “agle Somvaar” for a date. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Switching mid-sentence is the normal case, and the bot never asks a caller to pick a language. On this job that means short and courteous, four questions and a handover."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Hindi if the caller switches?",
        "a": "It follows the caller. Hindi and English on one line is the normal case for new enquiries, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the callback time in Hindi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard callback time is a lead rung at the wrong moment, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "lead-qualification-telecaller",
    "language": "en",
    "intro": "This job is a first call to a new enquiry, so the bot must hold what the caller wants, the budget, the timeline, the location and a callback time in English for every metro, and any business whose customers are professionals or from outside the state. Indian English shifts accent by region and groups numbers the Indian way, and the caller expects to be allowed to drift into Tamil or Hindi mid-call without pressing anything, the budget and the callback time included. It answers with “you”, stays short and courteous, four questions and a handover, and reads the budget and the callback time back before writing anything, because a mis-heard callback time is a lead rung at the wrong moment.",
    "points": [
      {
        "title": "The English problem, on this job",
        "body": "The accent varies by region, numbers are grouped in lakh and crore, and the caller switches languages without warning. Here the words at stake are what the caller wants, the budget, the timeline, the location and a callback time. A caller saying “budget around thirty lakh, call after 6” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In English: “the 15th” and “next Monday” with the year never said, and phone numbers read in pairs or triples. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "An English line that cannot follow the caller into their own language is the commonest complaint about voice bots in India, and the reason every language runs on one number. On this job that means short and courteous, four questions and a handover."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in English if the caller switches?",
        "a": "It follows the caller. English and English on one line is the normal case for new enquiries, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the callback time in English?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard callback time is a lead rung at the wrong moment, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "lead-qualification-telecaller",
    "language": "te",
    "intro": "A Telugu caller from a district town and one from Jubilee Hills use the same language with very different English density, and the budget and the callback time sits in whichever half they choose. It answers with “meeru”, stays short and courteous, four questions and a handover, and reads the budget and the callback time back before writing anything, because a mis-heard callback time is a lead rung at the wrong moment. This job is a first call to a new enquiry, so the bot must hold what the caller wants, the budget, the timeline, the location and a callback time in Telugu for Hyderabad, Vijayawada, Visakhapatnam and Telugu speakers in Bengaluru and Chennai.",
    "points": [
      {
        "title": "The Telugu problem, on this job",
        "body": "Long compound words, and a Hyderabad habit of switching to English for anything technical, so one sentence carries two languages of meaning. Here the words at stake are what the caller wants, the budget, the timeline, the location and a callback time. A caller saying “budget around thirty lakh, call after 6” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Telugu: amounts in English with “andi” softening the confirmation, and “repu” or “ee vaaram” for the schedule. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Every confirmation ends with the respectful form, because a bare “ok” in Telugu sounds curt on a business line. On this job that means short and courteous, four questions and a handover."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Telugu if the caller switches?",
        "a": "It follows the caller. Telugu and English on one line is the normal case for new enquiries, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the callback time in Telugu?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard callback time is a lead rung at the wrong moment, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "lead-qualification-telecaller",
    "language": "kn",
    "intro": "On a Bengaluru line the caller may not be a Kannada speaker at all, so the bot opens in Kannada, listens, and follows the caller into English or Hindi while still catching the budget and the callback time. This job is a first call to a new enquiry, so the bot must hold what the caller wants, the budget, the timeline, the location and a callback time in Kannada for Bengaluru, Mysuru, Hubballi and the Karnataka side of Hosur. It answers with “neevu”, stays short and courteous, four questions and a handover, and reads the budget and the callback time back before writing anything, because a mis-heard callback time is a lead rung at the wrong moment.",
    "points": [
      {
        "title": "The Kannada problem, on this job",
        "body": "One call can move between Kannada, English and Hindi, so the bot follows the language it hears rather than the one it assumed. Here the words at stake are what the caller wants, the budget, the timeline, the location and a callback time. A caller saying “budget around thirty lakh, call after 6” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Kannada: numbers almost always in English with Kannada carrying the courtesy, and “naale” or “munde vaara” beside English weekday names. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "Staying in Kannada when the caller stays is what a local business expects; leaving it the moment the caller does is what keeps the call short. On this job that means short and courteous, four questions and a handover."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Kannada if the caller switches?",
        "a": "It follows the caller. Kannada and English on one line is the normal case for new enquiries, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the callback time in Kannada?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard callback time is a lead rung at the wrong moment, so the read-back is not optional here."
      }
    ]
  },
  {
    "job": "lead-qualification-telecaller",
    "language": "mr",
    "intro": "This job is a first call to a new enquiry, so the bot must hold what the caller wants, the budget, the timeline, the location and a callback time in Marathi for Pune, Mumbai, Nashik, Nagpur and every Maharashtra business line. Pune and Mumbai callers expect a formal Marathi register from a business, and then say the budget and the callback time in Hindi or English in the same breath. It answers with “tumhi”, stays short and courteous, four questions and a handover, and reads the budget and the callback time back before writing anything, because a mis-heard callback time is a lead rung at the wrong moment.",
    "points": [
      {
        "title": "The Marathi problem, on this job",
        "body": "The respectful plural and “namaskar” are noticed when absent, while the detail that matters usually arrives in English or Hindi. Here the words at stake are what the caller wants, the budget, the timeline, the location and a callback time. A caller saying “budget around thirty lakh, call after 6” is heard as those fields, not as a paragraph."
      },
      {
        "title": "How numbers and dates arrive",
        "body": "In Marathi: amounts and phone numbers in English or Hindi more often than in Marathi, dates in English, and “udya” or “pudhchya aathavdyat” in Marathi. The bot accepts both forms and writes one clean value to your sheet or system."
      },
      {
        "title": "Register",
        "body": "The bot keeps the formal register for the whole call and never slips into the familiar form. On this job that means short and courteous, four questions and a handover."
      }
    ],
    "faqs": [
      {
        "q": "Does it stay in Marathi if the caller switches?",
        "a": "It follows the caller. Marathi and English on one line is the normal case for new enquiries, and nobody is asked to choose a language first."
      },
      {
        "q": "What if it mis-hears the budget and the callback time in Marathi?",
        "a": "It reads the value back before acting, and every call is recorded with a transcript. A mis-heard callback time is a lead rung at the wrong moment, so the read-back is not optional here."
      }
    ]
  }
];

export function getJobLanguagePair(job: string, language: string): JobLanguagePair | undefined {
  return jobLanguagePairs.find((p) => p.job === job && p.language === language);
}

export function languagePairsForJob(job: string): JobLanguagePair[] {
  return jobLanguagePairs.filter((p) => p.job === job);
}

export function languagePairsForLanguage(language: string): JobLanguagePair[] {
  return jobLanguagePairs.filter((p) => p.language === language);
}

/** Build-time guard: every listed language has a written pair and a page of its own. */
export function assertLanguagePairsAreConsistent(): void {
  for (const p of jobLanguagePairs) {
    const job = getJob(p.job);
    if (!job) throw new Error(`jobLanguagePairs: unknown job "${p.job}"`);
    if (!languageHref(p.language)) throw new Error(`jobLanguagePairs: language "${p.language}" has no page`);
    if (!job.languages.includes(p.language)) throw new Error(`jobLanguagePairs: ${p.job} does not list "${p.language}"`);
  }
  for (const job of jobs) {
    for (const l of job.languages) {
      if (!getJobLanguagePair(job.slug, l)) throw new Error(`jobLanguagePairs: no pair written for ${job.slug} × ${l}`);
    }
  }
}
