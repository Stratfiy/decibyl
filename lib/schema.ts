import { z } from 'zod';

const base = {
  /** Honeypot. Real users never see it; bots fill everything.
   *  Deliberately permissive here — a filled honeypot must return 200 and be
   *  dropped in the route, not fail validation. A 400 tells the bot it was
   *  detected; a 200 tells it nothing and it moves on. */
  company_website: z.string().max(500).optional(),
  source_page: z.string().max(300).optional(),
  referrer: z.string().max(500).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
};

const email = z.string().trim().email('Enter a valid email address').max(200);
const phone = z
  .string()
  .trim()
  .min(6, 'Enter a phone number we can call')
  .max(20)
  .regex(/^[+0-9 ()-]+$/, 'Digits, spaces, + and - only');

export const demoSchema = z.object({
  form_type: z.literal('demo'),
  name: z.string().trim().min(2, 'Tell us your name').max(120),
  email,
  phone,
  company: z.string().trim().min(2, 'Company name').max(160),
  vertical: z.string().trim().max(80).optional(),
  call_volume: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  ...base,
});

export const waitlistSchema = z.object({
  form_type: z.literal('waitlist'),
  email,
  vertical: z.string().trim().max(80).optional(),
  ...base,
});

export const contactSchema = z.object({
  form_type: z.literal('contact'),
  name: z.string().trim().min(2, 'Tell us your name').max(120),
  email,
  message: z.string().trim().min(5, 'A sentence is enough').max(2000),
  ...base,
});

export const leadSchema = z.discriminatedUnion('form_type', [
  demoSchema,
  waitlistSchema,
  contactSchema,
]);

export type LeadInput = z.infer<typeof leadSchema>;
export type FormType = LeadInput['form_type'];

export const callVolumeOptions = [
  'Under 500 calls/month',
  '500 – 2,000',
  '2,000 – 10,000',
  '10,000 – 50,000',
  'Over 50,000',
  'Not sure yet',
];
