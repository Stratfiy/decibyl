/**
 * Everything here has to be true and traceable to a real control — same
 * discipline as data/proof.ts and data/caseStudies.ts. This page exists so a
 * security/procurement reviewer doesn't have to read four legal pages to get
 * a straight answer. Full legal language stays in /legal/dpdp and /legal/privacy;
 * this is the skimmable version, cross-linked to those.
 */

export type SecurityPillar = {
  title: string;
  body: string;
};

export const pillars: SecurityPillar[] = [
  {
    title: 'Data residency, your choice',
    body: 'Call audio, transcripts, and lead data are stored in India — AWS Mumbai (ap-south-1) — by default. US and EU infrastructure is available for teams who need data closer to customers outside India.',
  },
  {
    title: 'Encrypted in transit and at rest',
    body: 'All call content and stored data is encrypted in transit and at rest. Access to call content is limited to the people who need it to run your account, with audit logs on that access.',
  },
  {
    title: 'Consent and calling controls you actually get',
    body: 'Permitted calling windows, do-not-call suppression lists, and an immediate stop on request are built in, not an add-on. You are responsible for a lawful basis to call your list — we give you the controls to honour it.',
  },
  {
    title: 'DPDP-aligned, roles stated plainly',
    body: 'For calls run on your account, you are the data fiduciary and Decibyl is your data processor. A data processing agreement covers this — ask for it before you sign, not after.',
  },
  {
    title: 'Disclosure on every call, not configurable off',
    body: 'The agent identifies itself as automated and discloses that the call is recorded at the start of every call. A caller who asks for a person is transferred.',
  },
  {
    title: 'GST-compliant billing',
    body: 'Every invoice is GST-compliant, issued via Razorpay, with the platform fee and provider cost shown separately rather than blended into one rate.',
  },
];

export const notCertified = [
  'ISO 27001',
  'SOC 2',
  'HIPAA (a US framework — it does not apply to Indian clinical data regardless)',
];
