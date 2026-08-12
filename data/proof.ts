/**
 * ⚠️ ZERO INVENTED CUSTOMERS. This is a legal and reputational constraint,
 * not a style preference.
 *
 * `logos` stays EMPTY until written consent exists for a named customer.
 * When it is populated, <LogoStrip /> renders the named logos instead of the
 * anonymised cards — no redesign needed.
 */

export type Logo = {
  name: string;
  /** path under /public — add the file when consent is in hand */
  src: string;
  alt: string;
  quote?: string;
  attribution?: string;
};

/** Populate ONLY with written consent from the customer. */
export const logos: Logo[] = [];

export type AnonymousProof = {
  descriptor: string;
  location: string;
  status: string;
  languages: string;
};

/** Anonymised but true. Each line must be defensible if asked. */
export const anonymousProof: AnonymousProof[] = [
  {
    descriptor: 'Fertility clinic',
    location: 'Hosur',
    status: 'Pilot in progress',
    languages: 'Tamil + English',
  },
  {
    descriptor: 'Agri outreach',
    location: 'Telangana',
    status: '80,000 calls scoped',
    languages: 'Telugu',
  },
  {
    descriptor: 'D2C · COD confirmation',
    location: '',
    status: 'Pilot in progress',
    languages: 'Hindi + English',
  },
];

export const proofHeading = 'Now onboarding';
export const proofSub =
  'No invented logos and no invented counts. This is what is actually running right now.';
