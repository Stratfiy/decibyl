/** Security claims mirrored from echowave/compliance/TRUST.md and privacy routes. */
export type SecurityPillar = { title: string; body: string };

export const pillars: SecurityPillar[] = [
  {
    title: 'India data residency',
    body: 'Decibyl runs in AWS Mumbai (ap-south-1). The database, recordings, transcripts and application data are kept in that region; we do not currently advertise multi-region failover.',
  },
  {
    title: 'Encrypted and tenant-isolated',
    body: 'Traffic uses TLS, stored data is encrypted at rest, provider credentials are encrypted, and API keys are stored as hashes. Tenant boundaries are enforced in the application and data layer.',
  },
  {
    title: 'Consent and calling controls',
    body: 'Outbound campaigns support consent attestation, calling windows and suppression controls. Recording disclosure and retention controls are part of the calling workflow; you remain responsible for having a lawful basis to contact people.',
  },
  {
    title: 'DPDP and privacy controls',
    body: 'Workspace privacy controls include export, erasure and access logging. For customer workloads, Decibyl acts as a processor under the terms and DPA while the customer remains responsible for the purpose and lawful basis of the processing.',
  },
  {
    title: 'Retention you can shorten',
    body: 'Default retention is 90 days for recordings and 365 days for transcripts, with shorter workspace retention available. Signed URLs are used for stored media instead of public file links.',
  },
  {
    title: 'Backups and access records',
    body: 'Encrypted backups are retained for 30 days and monitored for staleness. Access to sensitive customer data is logged so support and security reviews start from an auditable record.',
  },
];

export const notCertified = [
  'SOC 2 — not currently certified',
  'ISO 27001 — not currently certified',
  'HIPAA BAA — not currently offered',
  'Independent penetration test — not yet completed',
  'Multi-region failover — not currently provided',
];
