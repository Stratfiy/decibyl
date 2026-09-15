/**
 * Pair pages: a job crossed with an industry (`/jobs/[job]/industry/[vertical]`).
 *
 * Only pairs listed in `job.verticals` and written here build. A clinic
 * receptionist × logistics page would be a doorway page, so it does not
 * exist. Each entry says what the job means in that industry, which is not
 * the same as what the industry page says about calls in general.
 */

import type { Faq } from './faqs';
import { getJob, jobs } from './jobs';
import { findAnyVertical } from './verticals';

export type JobVerticalPair = {
  job: string;
  /** A slug from data/verticals.ts. */
  vertical: string;
  intro: string;
  notes: { title: string; body: string }[];
  faqs: Faq[];
};

export const jobVerticalPairs: JobVerticalPair[] = [
  {
    job: 'clinic-receptionist', vertical: 'clinics',
    intro: 'In a general clinic the receptionist job is mostly the phone: new patients asking timings and fees, old patients asking whether the doctor is in, and everyone asking whether the report is ready. The bot answers all three from a knowledge base you edit, books into the doctor’s calendar, and leaves the desk to the desk.',
    notes: [
      { title: 'Timings change daily', body: 'A doctor who is late or away is one line in the calendar or one sentence to the bot; every caller after that hears the new timing.' },
      { title: 'Report-ready calls', body: 'The bot answers from your notes and never reads a result. A patient who asks what the result means is handed to a person.' },
      { title: 'Follow-ups without a queue', body: 'The day-before confirmation and the reschedule run as routines, so the desk is not calling thirty patients at 5 pm.' },
    ],
    faqs: [
      { q: 'Can it triage symptoms?', a: 'No, and it will not try. It books, confirms, answers logistics and hands anything clinical to a person.' },
      { q: 'What about walk-ins?', a: 'The person at the desk keeps them. The bot only takes the phone, which is the half that interrupts.' },
    ],
  },
  {
    job: 'clinic-receptionist', vertical: 'dental',
    intro: 'A dental practice books longer slots than a general clinic, quotes a range rather than a fee, and gets more calls that are really pain calls. The bot books by procedure length, quotes the range you set, and treats “it hurts now” as a same-day slot or a handoff, not a routine booking.',
    notes: [
      { title: 'Slot length by procedure', body: 'A cleaning and a root canal are not the same slot. The bot asks what the visit is for and books the length you set for it.' },
      { title: 'Ranges, not prices', body: 'Root canal from ₹6,000 to ₹9,000 depending on the tooth, consultation ₹300: the bot quotes what you wrote and says the dentist confirms on examination.' },
      { title: 'Pain calls', body: 'A caller in pain is offered the nearest slot today or handed to the practice, never asked to hold for a callback.' },
    ],
    faqs: [
      { q: 'Can it explain treatments?', a: 'It can read your own explanation of what a procedure involves and how long it takes. It does not give clinical advice.' },
      { q: 'Multiple chairs?', a: 'One calendar per chair or per dentist works; the bot books into the one you name for the procedure.' },
    ],
  },
  {
    job: 'clinic-receptionist', vertical: 'diagnostics',
    intro: 'For a diagnostic lab the receptionist job is preparation instructions, home-collection slots and report-ready calls, in that order. The bot tells a caller whether to fast, books the phlebotomist window, and answers “is my report ready” from a sheet the lab updates, without ever reading a value aloud.',
    notes: [
      { title: 'Preparation, said right', body: 'Fasting hours, what to bring, which tests need a prescription: the bot answers from your own list, test by test.' },
      { title: 'Home collection windows', body: 'Slots by area and by phlebotomist; the bot offers the nearest two and writes the address and landmark to the route sheet.' },
      { title: 'Report status, not results', body: 'Ready or not ready, and how to collect. A caller who wants the value is handed to the lab.' },
    ],
    faqs: [
      { q: 'Can it send the report?', a: 'It can tell the caller it has been sent to the number or email on file and trigger the send from your system; it does not read results on the phone.' },
      { q: 'Peak-hour mornings?', a: 'Every call is answered at once; the morning rush is the reason a lab posts this job and the reason the bot pays for itself there.' },
    ],
  },
  {
    job: 'clinic-receptionist', vertical: 'ivf-fertility',
    intro: 'A fertility clinic’s phone carries more anxiety per call than any other front desk, and callers often ring outside hours. The bot books consultations, answers process and cost questions from the clinic’s own wording, and hands anything about a cycle in progress to the coordinator, with the caller’s name and stage already on screen.',
    notes: [
      { title: 'First consultations', body: 'What to bring, how long it takes, whether both partners should come: answered the way the clinic wrote it, and booked into the consultant’s calendar.' },
      { title: 'Cycle-in-progress calls', body: 'Recognised by the questions asked and handed to the coordinator immediately, with context, never answered from a knowledge base.' },
      { title: 'Discretion', body: 'Recordings and transcripts stay in India, and the bot never volunteers the clinic’s specialty when it calls back a number.' },
    ],
    faqs: [
      { q: 'Can it quote package costs?', a: 'It quotes the ranges you publish and says the consultant confirms after the first visit.' },
      { q: 'After-hours calls?', a: 'Answered, booked or noted for the coordinator’s morning, with a promise of a callback time the bot then keeps.' },
    ],
  },
  {
    job: 'collections-telecaller', vertical: 'lending-collections',
    intro: 'For an NBFC or a lending DSA the collections telecaller job is a schedule: pre-due reminders, due-day reminders, and post-due follow-ups, inside the hours the rules allow. The bot keeps the schedule, captures the promise-to-pay as a field, sends the link during the call, and hands disputes and hardship to a senior with the history attached.',
    notes: [
      { title: 'Fair-practice by design', body: 'Calling window enforced, disclosure read, tone rules in the prompt, every call recorded. A complaint has an audio answer.' },
      { title: 'Promise-to-pay as data', body: 'Date and amount captured as fields and written to your LMS, so the follow-up routine reads them instead of a note.' },
      { title: 'Retries that make sense', body: 'Busy and no-answer retried at spaced intervals within the window; a refusal is not retried the same day.' },
    ],
    faqs: [
      { q: 'Does it threaten?', a: 'No. The prompt forbids it and the recording proves it. A hardship signal ends the script and hands to a person.' },
      { q: 'Can it take a payment?', a: 'It sends the link and confirms when the payment lands; it never asks for card details on the call.' },
    ],
  },
  {
    job: 'collections-telecaller', vertical: 'education',
    intro: 'A school or coaching institute chasing fees is doing collections with parents, which changes the tone entirely. The bot reminds before the due date, offers the payment link, records the promise, and never speaks to a student about money.',
    notes: [
      { title: 'Parents, not borrowers', body: 'Respectful, one reminder per cycle, and a payment link on WhatsApp; the escalation is the principal’s office, not a recovery agent.' },
      { title: 'Instalment calendars', body: 'The fee schedule is a sheet; the bot reads the next due instalment and the amount from it.' },
      { title: 'Late-fee questions', body: 'Answered from the policy you wrote, and waivers handed to the accounts office.' },
    ],
    faqs: [
      { q: 'Will it call during class hours?', a: 'It calls in the window you set, typically evenings, and never a student’s number.' },
      { q: 'Receipts?', a: 'The payment link issues the receipt; the bot confirms it has landed.' },
    ],
  },
  {
    job: 'order-confirmation-executive', vertical: 'd2c-ndr-recovery',
    intro: 'For a D2C brand the order-confirmation call exists to cut returns: confirm the cash-on-delivery order, read back the address and landmark, and catch the wrong pincode before the courier does. The bot calls within minutes of the order, in the customer’s language, and writes confirmed, cancelled or address-changed back to the order.',
    notes: [
      { title: 'Minutes after the order', body: 'The order webhook starts the call while the customer still remembers what they bought.' },
      { title: 'Address read-back', body: 'Landmark and pincode confirmed aloud; a change is written to the order before it reaches the courier.' },
      { title: 'NDR calls', body: 'When the courier marks an attempt failed, the bot calls, asks for a reattempt slot, and updates the shipment.' },
    ],
    faqs: [
      { q: 'Can it upsell?', a: 'It can offer one thing you name. It does not push, because the call is already unrequested.' },
      { q: 'Shopify or WooCommerce?', a: 'Both, through the connector; the order id and status move both ways.' },
    ],
  },
  {
    job: 'order-confirmation-executive', vertical: 'logistics',
    intro: 'A logistics operator confirming deliveries is confirming with the consignee, not the buyer: is someone home, which gate, is the payment ready. The bot calls before the vehicle leaves, confirms the window, and gives the driver a note instead of a phone call.',
    notes: [
      { title: 'Consignee, not customer', body: 'The bot asks what the driver needs to know and nothing else: presence, gate, floor, cash ready.' },
      { title: 'Driver notes', body: 'The outcome lands on the shipment as a line the driver reads on the app.' },
      { title: 'Reattempts without a call centre', body: 'A failed attempt triggers the reschedule call automatically.' },
    ],
    faqs: [
      { q: 'B2B consignees?', a: 'Yes; the bot asks for the receiving person’s name and a gate pass requirement if you list one.' },
      { q: 'Pincode-level windows?', a: 'Windows come from your sheet by pincode; the bot offers only the ones you serve.' },
    ],
  },
  {
    job: 'real-estate-telecaller', vertical: 'real-estate',
    intro: 'The real-estate telecaller job is answering the portal enquiry before the competitor does, then getting a site visit on the calendar. The bot calls the enquiry back within a minute, qualifies budget and locality, books the visit, and hands the lead to the closer with everything already asked.',
    notes: [
      { title: 'Speed to lead', body: 'A portal enquiry triggers the callback while the buyer is still on the listing.' },
      { title: 'Budget and configuration', body: 'Lakh and crore, BHK, possession timeline and locality captured as fields, not a paragraph.' },
      { title: 'Site-visit logistics', body: 'Day, time, pickup or self-drive, and a reminder the morning of the visit.' },
    ],
    faqs: [
      { q: 'RERA and disclosures?', a: 'The bot says only what you put in its knowledge base and never invents a possession date.' },
      { q: 'Multiple projects?', a: 'One bot per project or one bot with a project list; the enquiry source decides.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller', vertical: 'education',
    intro: 'Admissions season is a month of the same twelve questions from a thousand callers, and the counsellor who answers them is not counselling. The bot takes the fee, date, document and hostel questions, books the counselling slot, and lets the counsellor spend the call on the decision.',
    notes: [
      { title: 'Season load', body: 'Every call answered at once during the two weeks that matter; no engaged tone during the last-date rush.' },
      { title: 'Parent or student', body: 'The bot asks who is calling and adjusts: fees and safety for a parent, course content and placements for a student.' },
      { title: 'Counselling slots', body: 'Booked into the counsellor’s calendar with the course and the questions already asked.' },
    ],
    faqs: [
      { q: 'Scholarship questions?', a: 'Answered from your criteria and handed to a person for the decision.' },
      { q: 'Regional languages?', a: 'The caller opens in Tamil, Telugu, Kannada or Hindi and the bot follows; the counsellor gets the transcript in English.' },
    ],
  },
  {
    job: 'customer-support-executive', vertical: 'd2c-ndr-recovery',
    intro: 'D2C support is where-is-my-order, wrong item, and refund, in that order. The bot answers status from the shipment feed, files the wrong-item complaint with a photo request on WhatsApp, and starts the refund the policy allows, handing anything outside policy to a person.',
    notes: [
      { title: 'Status from the feed', body: 'The tracking event, not a script, is what the bot reads to the customer.' },
      { title: 'Complaints as tickets', body: 'Order id, issue, photo requested, and a ticket in your helpdesk before the call ends.' },
      { title: 'Refunds inside policy', body: 'Within the rules you wrote, the bot confirms the refund and the timeline; outside them, a person decides.' },
    ],
    faqs: [
      { q: 'Angry callers?', a: 'It listens first, does not interrupt, and hands to a person the moment the caller asks or the distress rule fires.' },
      { q: 'Instagram DMs?', a: 'Web chat and WhatsApp are live; other channels through the helpdesk connector.' },
    ],
  },
  {
    job: 'customer-support-executive', vertical: 'logistics',
    intro: 'For a logistics business, support means shippers asking where the truck is and consignees asking when it will arrive. The bot reads the tracking event, gives an honest window, and raises an exception for the ops desk when the answer is not good.',
    notes: [
      { title: 'One answer, both sides', body: 'Shipper and consignee get the same event, in their own language.' },
      { title: 'Exceptions, not tickets', body: 'A delayed or damaged shipment becomes an exception on the ops board with the caller’s number attached.' },
      { title: 'Proof of delivery', body: 'Sent on WhatsApp during the call when the shipment is delivered.' },
    ],
    faqs: [
      { q: 'Multiple carriers?', a: 'The bot reads whichever feed the shipment id maps to.' },
      { q: 'Claims?', a: 'Filed as an exception with the details captured; the claim decision stays with a person.' },
    ],
  },
  {
    job: 'customer-support-executive', vertical: 'clinics',
    intro: 'A clinic’s support calls are appointments that went wrong, bills that need explaining, and reports that did not arrive. The bot fixes the first, explains the second from the bill you sent it, and resends the third, leaving clinical questions to the clinic.',
    notes: [
      { title: 'Rebooking without blame', body: 'A missed or mis-booked slot is rebooked on the call, and the calendar is corrected.' },
      { title: 'Bill questions', body: 'Line items explained from the bill on file; disputes handed to accounts.' },
      { title: 'Report resend', body: 'Confirms the number or email and triggers the resend; never reads a value aloud.' },
    ],
    faqs: [
      { q: 'Prescription questions?', a: 'Handed to the doctor’s desk with the caller’s name; the bot does not answer them.' },
      { q: 'Insurance?', a: 'Answered from your TPA list: which are accepted and what to bring.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive', vertical: 'logistics',
    intro: 'Procurement follow-up in a logistics or manufacturing business is chasing vendors and transporters for dates: dispatch, arrival, invoice. The bot calls on the schedule, asks for the date against the PO, records it, and flags anything that slips, so the person who used to make forty calls a day reads a sheet instead.',
    notes: [
      { title: 'PO by PO', body: 'Each open PO gets its own follow-up on the day you set, with the vendor’s answer written against it.' },
      { title: 'Transporter tracking', body: 'Vehicle number, driver, expected arrival captured and updated on the next call.' },
      { title: 'Invoice chasing', body: 'GST invoice number and date asked for and recorded; mismatches flagged to accounts.' },
    ],
    faqs: [
      { q: 'Vendors who only speak Gujarati or Hindi?', a: 'The bot opens in whichever language the vendor uses and records the outcome in English for your sheet.' },
      { q: 'Tally?', a: 'PO and invoice details write to Tally through the connector or the desktop companion.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller', vertical: 'real-estate',
    intro: 'A real-estate lead-qualification call is four questions in ninety seconds: budget, locality, timeline, and when a person may call. The bot makes it within a minute of the enquiry, in the caller’s language, and hands the closer a qualified lead or a polite no.',
    notes: [
      { title: 'Four questions', body: 'Budget in lakh or crore, preferred localities, possession timeline, callback time. Nothing else.' },
      { title: 'Portal enquiries', body: 'Every portal lead triggers the call; duplicates are matched on the number.' },
      { title: 'Handover with context', body: 'The closer sees the answers before dialling, in English, whatever language the call was in.' },
    ],
    faqs: [
      { q: 'What if the caller wants prices now?', a: 'The bot gives the published range and books the call with a person for the rest.' },
      { q: 'Investor versus end user?', a: 'Asked, if you want it asked, and captured as a field.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller', vertical: 'education',
    intro: 'Coaching institutes and colleges get enquiries in bursts after an ad or a result day. The bot calls each back within a minute, asks the course, the class or year, the location preference and the callback time, and hands the counsellor a list sorted by intent.',
    notes: [
      { title: 'Burst days', body: 'Result day and ad day are the days a human team falls behind; the bot does not.' },
      { title: 'Parent or student', body: 'Captured on the first question, so the counsellor knows who to call.' },
      { title: 'Course fit', body: 'Class, board, target exam and preferred batch timing as fields.' },
    ],
    faqs: [
      { q: 'Fees on the call?', a: 'Published fees only; scholarship and discount questions go to the counsellor.' },
      { q: 'WhatsApp follow-up?', a: 'A brochure and the counsellor’s slot are sent on WhatsApp during the call.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller', vertical: 'lending-collections',
    intro: 'A lending enquiry needs to be qualified before an agent spends time on it: loan type, amount, income band, city, and whether the caller is salaried or self-employed. The bot asks, records, and routes to the right product team, with the disclosures read.',
    notes: [
      { title: 'Eligibility questions only', body: 'No credit decision on the call; the bot collects what the underwriter needs to start.' },
      { title: 'Disclosures', body: 'Automated-call and recording disclosures read at the open, every time.' },
      { title: 'Routing', body: 'Personal, business, gold or vehicle loan enquiries go to different queues with the fields attached.' },
    ],
    faqs: [
      { q: 'Does it collect documents?', a: 'It lists what will be needed and sends the list on WhatsApp; uploads happen through your own link.' },
      { q: 'DND numbers?', a: 'Checked before every dial; a DND number is never called.' },
    ],
  },
];

export function getJobVerticalPair(job: string, vertical: string): JobVerticalPair | undefined {
  return jobVerticalPairs.find((p) => p.job === job && p.vertical === vertical);
}

export function verticalPairsForJob(job: string): JobVerticalPair[] {
  return jobVerticalPairs.filter((p) => p.job === job);
}

export function verticalPairsForVertical(vertical: string): JobVerticalPair[] {
  return jobVerticalPairs.filter((p) => p.vertical === vertical);
}

/** Build-time guard: every listed vertical has a written pair and a real page. */
export function assertVerticalPairsAreConsistent(): void {
  for (const p of jobVerticalPairs) {
    const job = getJob(p.job);
    if (!job) throw new Error(`jobVerticalPairs: unknown job "${p.job}"`);
    if (!findAnyVertical(p.vertical)) throw new Error(`jobVerticalPairs: unknown vertical "${p.vertical}"`);
    if (!job.verticals.includes(p.vertical)) throw new Error(`jobVerticalPairs: ${p.job} does not list "${p.vertical}"`);
  }
  for (const job of jobs) {
    for (const v of job.verticals) {
      if (!getJobVerticalPair(job.slug, v)) throw new Error(`jobVerticalPairs: no pair written for ${job.slug} × ${v}`);
    }
  }
}
