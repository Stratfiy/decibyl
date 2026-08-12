/**
 * ⚠️ ZERO INVENTED CASE STUDIES. Same rule as data/proof.ts, one level
 * further in — a case study carries a named customer, a specific challenge,
 * and a specific result, all of which have to be true and ideally
 * consented-to-in-writing before they go on the site.
 *
 * `caseStudies` stays EMPTY until a real one exists. <CaseStudiesSection />
 * falls back to the same anonymised-but-true pilots already used in
 * data/proof.ts, reframed as short case-study cards, so the page is never
 * lying — just early. Add an entry here the day the first pilot has a
 * measurable before/after and the customer has signed off on being named.
 */

export type CaseStudy = {
  slug: string;
  /** Real customer name — only with written consent. */
  customer: string;
  descriptor: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  quote?: { text: string; attribution: string };
};

export const caseStudies: CaseStudy[] = [];

export const caseStudiesHeading = 'Case studies';
export const caseStudiesSub =
  'Named write-ups land here as pilots complete and customers sign off. Until then, the pilots '
  + 'actually in progress are listed with what is true and defensible today — no invented names, '
  + 'no invented numbers.';
