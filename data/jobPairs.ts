/**
 * Pair pages: a job crossed with an integration (`/jobs/[job]/for/[tool]`)
 * and a job crossed with a city (`/jobs/[job]/in/[city]`).
 *
 * This is the Zapier shape — the catalogue multiplied — with one rule that
 * Zapier's own pages break: a pair only exists here if somebody wrote it.
 * There is no fallback template that swaps the noun. If a pair is not in
 * these arrays, the page does not build, and the sitemap does not list it.
 *
 * Pairs are drawn only from `job.integrations` and `job.cities` in
 * data/jobs.ts, so an integration marked "coming" in data/integrations.ts can
 * never get a pair page (it has no page of its own to be listed under), and a
 * city is only paired with the jobs that actually run volume there.
 *
 * Every entry carries copy that is true of that pair specifically: what moves
 * between the bot and that tool for that job, or what changes about that job
 * in that city. Prices come from data/pricing.ts at render time, never here.
 * No invented statistics. Same rule as data/jobs.ts and data/cities.ts.
 */

import type { Faq } from './faqs';
import { getCity } from './cities';
import { getIntegrationPage } from './integrationPages';
import { getJob, jobs } from './jobs';

export type JobIntegrationPair = {
  job: string;
  tool: string;
  /** One paragraph on why this job ends in this tool. */
  intro: string;
  /** What moves, for this job, in this tool. Three items. */
  moves: { title: string; body: string }[];
  faqs: Faq[];
};

export type JobCityPair = {
  job: string;
  city: string;
  /** One paragraph on this job in this city. */
  intro: string;
  /** What is different here. Two items. */
  notes: { title: string; body: string }[];
  faqs: Faq[];
};

export const jobIntegrationPairs: JobIntegrationPair[] = [
  // ─── Clinic receptionist ───
  {
    job: 'clinic-receptionist',
    tool: 'google-calendar',
    intro:
      'A clinic that books on paper cannot let a bot book at all, and a clinic that books in Google Calendar already has the one thing the bot needs: a source of truth for free slots. Connected, the receptionist bot reads the doctor’s calendar while the patient is on the line, offers the two nearest free slots, and writes the booking as an event with the patient’s number in the description. The desk sees it the moment the call ends, and a reschedule is an event move, not a phone tag.',
    moves: [
      { title: 'Free slots, read live', body: 'The bot checks the calendar you point it at during the call, so it never offers a slot the doctor blocked that morning.' },
      { title: 'Booking as an event', body: 'Patient name, number and reason for visit go into the event; a second calendar for a second doctor works the same way.' },
      { title: 'Confirmations and moves', body: 'The day-before confirmation reads the event; a reschedule on the phone moves it, and the desk never retypes anything.' },
    ],
    faqs: [
      { q: 'We use one calendar for three doctors. Does that work?', a: 'Yes, as long as each doctor is a distinct calendar or a colour the bot can filter on. One shared calendar with no way to tell doctors apart is the one setup we ask you to fix first.' },
      { q: 'Can the bot block lunch and leave?', a: 'It does not need to. Block them in the calendar as you do today and the bot treats them as busy.' },
    ],
  },
  {
    job: 'clinic-receptionist',
    tool: 'google-sheets',
    intro:
      'Plenty of clinics keep the appointment register in a sheet, not a calendar, and the receptionist job post literally says “maintain the appointment register”. Connected to Google Sheets, the bot appends a row for every call: who called, what they wanted, the slot given, and the outcome. The register stays the register; it just fills itself in, including the calls that came in during lunch.',
    moves: [
      { title: 'A row per call', body: 'Time, caller number, language, intent, slot booked and the bot’s outcome land as columns you named.' },
      { title: 'Fees and timings, read from a tab', body: 'Keep a tab with consultation fees, timings and report turnaround; the bot answers from it and you edit it without calling anyone.' },
      { title: 'A daily tab for the desk', body: 'Filter the sheet to today and the desk has its morning list before the doctor arrives.' },
    ],
    faqs: [
      { q: 'Will it overwrite rows we edit by hand?', a: 'No. The bot appends and updates only the rows it created, matched on the call id in the first column.' },
      { q: 'Can we move to a calendar later?', a: 'Yes. Google Calendar is a separate connection; many clinics run both, sheet for the register and calendar for the doctor.' },
    ],
  },
  {
    job: 'clinic-receptionist',
    tool: 'whatsapp-business',
    intro:
      'A patient who booked on the phone expects the time and the address on WhatsApp before they hang up. That is the message the desk sends by hand a hundred times a week. With WhatsApp Business connected, the receptionist bot sends the approved booking template during the call, the reminder template the day before, and the report-ready template when you mark it, all from the clinic’s own number.',
    moves: [
      { title: 'Booking confirmation, during the call', body: 'Date, time, doctor, address and a map link, sent before the caller hangs up.' },
      { title: 'Day-before reminder', body: 'The bot sends the reminder template and, if the patient replies to cancel, calls to offer a new slot.' },
      { title: 'Report ready and what to bring', body: 'Preparation instructions for a scan or a fasting test go out as a template the patient can read twice.' },
    ],
    faqs: [
      { q: 'Do we need Meta template approval?', a: 'Yes, once per template. We give you the three templates most clinics use and they are usually approved within a day.' },
      { q: 'Can the patient reply and get an answer?', a: 'Simple replies like “cancel” or “change” trigger a call back from the bot. Free-text WhatsApp conversations are a separate message channel, not part of the phone job.' },
    ],
  },

  // ─── Collections telecaller ───
  {
    job: 'collections-telecaller',
    tool: 'rest-api',
    intro:
      'A lender’s dues list lives in a loan management system, and that system decides who is called, when, and how often the rules allow. The REST API lets that system be the caller. It posts the day’s list, the bot dials on schedule, and the system pulls back the promise-to-pay date, the disposition and the recording for every account. Nobody exports a CSV at 9am.',
    moves: [
      { title: 'Dues list in', body: 'Your LMS posts the accounts due, with the amount, the language and the allowed calling window, as one request.' },
      { title: 'Disposition out', body: 'Promise date, promised amount, refusal reason or unreachable, as fields on the run, plus the recording link.' },
      { title: 'Balance lookup mid-call', body: 'If the borrower asks the outstanding amount, the bot calls your endpoint and reads the live figure back.' },
    ],
    faqs: [
      { q: 'Can we enforce RBI calling hours?', a: 'Yes. Set the window per campaign; calls outside it are held, not dropped, and the API reports what was held.' },
      { q: 'Is there a Python SDK?', a: 'Python and TypeScript, wrapping the same endpoints, documented with a collections example.' },
    ],
  },
  {
    job: 'collections-telecaller',
    tool: 'webhooks',
    intro:
      'Collections runs on what happened after the call: a promise date that must be tracked, a dispute that must reach a senior, a refusal that changes the bucket. With webhooks, every call posts its outcome to your URL the second it ends, so the promise lands in the tracker, the dispute opens a ticket, and the refusal moves the account, without anyone reading transcripts to find out.',
    moves: [
      { title: 'Promise-to-pay as a field', body: 'The date and amount arrive under the names you set, not buried in a transcript.' },
      { title: 'Dispute and hardship events', body: 'When the bot transfers or flags a case, the webhook carries the reason so your team opens the right queue.' },
      { title: 'Payment link outcomes', body: 'Link sent, link paid and link expired arrive as separate events for reconciliation.' },
    ],
    faqs: [
      { q: 'Is the payload signed?', a: 'Every post carries a signature you verify, and failed deliveries retry with backoff.' },
      { q: 'Can we get the recording?', a: 'A signed link, valid for the period you choose. Audio stays in the Mumbai region unless you copy it.' },
    ],
  },
  {
    job: 'collections-telecaller',
    tool: 'google-sheets',
    intro:
      'A school fee office or a small NBFC does not have a loan system; it has a sheet with names, amounts and due dates. That sheet is enough. Connected to Google Sheets, the collections bot reads the rows due, calls each one in the borrower’s language, and writes the promise date and the outcome back to the same row. The office keeps the sheet it already trusts and stops keeping the call log next to it.',
    moves: [
      { title: 'Rows due today, read each morning', body: 'The bot picks rows by due date and status; a row marked paid is skipped without anyone editing the list.' },
      { title: 'Promise and outcome written back', body: 'Promise date, amount promised, connected or not, and the recording link land in columns you name.' },
      { title: 'Retries from the same sheet', body: 'Busy and unreachable rows are retried at the interval you set, and the attempt count is a column.' },
    ],
    faqs: [
      { q: 'How many rows can it handle?', a: 'Campaign size follows your plan’s calling credit, not the sheet. Thousands of rows is normal.' },
      { q: 'Can a person edit the sheet while the bot runs?', a: 'Yes. The bot updates only the columns it owns, matched on the row id.' },
    ],
  },

  // ─── Order confirmation executive ───
  {
    job: 'order-confirmation-executive',
    tool: 'shopify',
    intro:
      'For a Shopify store in India, the order confirmation job is the whole difference between a COD return rate you can live with and one you cannot. Connected to Shopify, a new cash-on-delivery order triggers a call within minutes, the bot reads the items and the address back, takes a correction, offers the prepaid link, and tags the order so your fulfilment rule holds or releases it. The store keeps working the way it does; the calls happen inside it.',
    moves: [
      { title: 'Order to call', body: 'A COD order fires the call with the items, the amount and the customer’s language guessed from the address.' },
      { title: 'Call to order', body: 'Confirmed, cancelled or address-corrected is written back as a tag and a note on the order.' },
      { title: 'Prepaid conversion', body: 'The bot offers the payment link on the call; if paid, the order’s payment status updates before dispatch.' },
    ],
    faqs: [
      { q: 'Does it work with Shiprocket or Delhivery NDR?', a: 'The NDR call is a second trigger from the courier event, delivered by webhook. The order-side write-back is the same.' },
      { q: 'Can we exclude repeat customers?', a: 'Yes. Set a rule on order count or tag and those orders skip the call.' },
    ],
  },
  {
    job: 'order-confirmation-executive',
    tool: 'webhooks',
    intro:
      'Not every seller is on Shopify. A marketplace seller, a WooCommerce store or a brand on its own panel has an order event somewhere, and a webhook is how it reaches the bot and how the answer comes back. The order confirmation bot receives the order, calls, and posts confirmed, cancelled, rescheduled or unreachable to your URL with the corrected address, so your panel updates before the courier is booked.',
    moves: [
      { title: 'Order in', body: 'Post the order id, items, amount, address and phone; the bot calls in the language you send or the one it infers.' },
      { title: 'Outcome out', body: 'Status, corrected address fields, prepaid link paid or not, and the recording link, signed and retried.' },
      { title: 'Courier NDR in', body: 'Post the failed-delivery event and the bot calls before the second attempt is wasted.' },
    ],
    faqs: [
      { q: 'We use WooCommerce. Is there a plugin?', a: 'No plugin needed. WooCommerce fires order webhooks natively; point one at the bot and map the fields.' },
      { q: 'How fast is the call after the order?', a: 'Within minutes by default. You can set a delay or a calling window per campaign.' },
    ],
  },
  {
    job: 'order-confirmation-executive',
    tool: 'rest-api',
    intro:
      'A brand with its own order system, or an agency running confirmation calls for several stores, wants the calls under code. The REST API lets your backend create the call from the order event, look up the run, and read the outcome fields, all with a key scoped to the organisation. It is also how you batch: post a night’s orders as a list and the bot works through them when the calling window opens.',
    moves: [
      { title: 'Create a call from an order', body: 'One request with the order and the phone number; the response is a run id you can poll or wait on by webhook.' },
      { title: 'Read the result', body: 'The run carries confirmed or cancelled, the corrected address as fields, and the transcript.' },
      { title: 'Order lookup mid-call', body: 'If the customer asks what is in the order, the bot calls your endpoint and reads the lines back.' },
    ],
    faqs: [
      { q: 'Can one key run several stores?', a: 'One organisation, one key, many agents. Give each store its own agent and number.' },
      { q: 'Is there a sandbox?', a: 'Sandbox keys exist and are read-only for anything that would place a real call.' },
    ],
  },
  {
    job: 'order-confirmation-executive',
    tool: 'whatsapp-business',
    intro:
      'The confirmation call is half the job; the other half is the message the customer keeps. With WhatsApp Business connected, the order confirmation bot sends the order summary template during the call, the prepaid link as a message the customer can pay from later, and the reschedule confirmation after a failed delivery. Fewer customers claim they never ordered when the order is sitting in their chat.',
    moves: [
      { title: 'Order summary, during the call', body: 'Items, amount and delivery address, sent from your WhatsApp Business number while the customer is on the line.' },
      { title: 'Prepaid link as a message', body: 'The link the bot offered on the call arrives in the chat, so a customer who says “later” can still pay before dispatch.' },
      { title: 'Delivery reschedule', body: 'After an NDR call, the new attempt date goes out as a template the customer can forward to whoever is home.' },
    ],
    faqs: [
      { q: 'Do we need our own WhatsApp Business account?', a: 'Yes, with the number verified by Meta. We connect to it; the messages come from you.' },
      { q: 'What if the customer replies on WhatsApp?', a: 'Replies like “cancel” trigger a call back. Full WhatsApp conversations are a separate channel you can add.' },
    ],
  },

  // ─── Real estate telecaller ───
  {
    job: 'real-estate-telecaller',
    tool: 'hubspot',
    intro:
      'A developer’s sales office on HubSpot already has the enquiry as a contact and the site visit as a deal stage. The step that waits for a person is the first call. Connected, a contact entering the new-enquiry list triggers the bot, it asks budget, configuration and timeline, books the site visit, and logs the call as an engagement with the answers as properties. The rep opens HubSpot and the lead is already qualified.',
    moves: [
      { title: 'Contact to call', body: 'A list membership or a stage change fires the call within minutes of the portal enquiry.' },
      { title: 'Call to engagement', body: 'Transcript, recording and the qualification answers land on the contact as properties you map.' },
      { title: 'Route', body: 'Hot leads move stage and get a task for the rep; a warm transfer is available when a rep is free.' },
    ],
    faqs: [
      { q: 'Which HubSpot tier do we need?', a: 'Workflows to trigger the call need Marketing or Sales Hub Professional. Logging engagements works on the free CRM.' },
      { q: 'Can it dedupe leads that enquired twice?', a: 'HubSpot dedupes on email or phone; the bot sees one contact and calls once.' },
    ],
  },
  {
    job: 'real-estate-telecaller',
    tool: 'zoho-crm',
    intro:
      'Zoho CRM is where most Indian developers and channel partners keep portal leads, and the gap between a lead arriving and a caller ringing it is where the buyer talks to another project. Connected to Zoho, a new lead triggers the bot within minutes, in Hindi, Marathi, Telugu or English, the qualification answers fill the fields the rep would have typed, and the record shows the site visit booked, the recording and the next step.',
    moves: [
      { title: 'Lead to call', body: 'A new lead from 99acres, MagicBricks or the website fires the call as soon as it lands in Zoho.' },
      { title: 'Call to record', body: 'Budget, configuration, timeline and visit slot are written to the fields you map; the recording is attached.' },
      { title: 'Hot to human', body: 'A lead that qualifies is assigned to a rep and, if one is free, transferred live.' },
    ],
    faqs: [
      { q: 'Which Zoho edition?', a: 'Workflow rules that call a webhook need Standard or above. Field write-back works on every paid edition.' },
      { q: 'Can it handle Zoho Bigin?', a: 'On request. The lead and call objects differ; tell us and we will confirm the mapping.' },
    ],
  },
  {
    job: 'real-estate-telecaller',
    tool: 'google-calendar',
    intro:
      'A site visit is an appointment with a location, and a site visit nobody wrote down is a no-show. Connected to Google Calendar, the real estate bot books the visit into the sales team’s calendar during the call, with the buyer’s number and the configuration they asked about in the event, and reminds the day before. The team sees who is coming to which tower on Saturday without asking the caller.',
    moves: [
      { title: 'Visit slots, read live', body: 'The bot offers the slots the site office keeps free and never double-books a Sunday afternoon.' },
      { title: 'Visit as an event', body: 'Buyer name, number, budget and preferred configuration go into the event for the rep who meets them.' },
      { title: 'Reminders and no-shows', body: 'The day-before reminder reads the calendar; a missed visit triggers the follow-up call the same afternoon.' },
    ],
    faqs: [
      { q: 'One calendar per project?', a: 'Yes, or one per sales rep. The bot books into the calendar the agent is pointed at.' },
      { q: 'Can the buyer get the invite?', a: 'If they give an email, the invite is sent. Most buyers prefer the WhatsApp message with the map link.' },
    ],
  },
  {
    job: 'real-estate-telecaller',
    tool: 'whatsapp-business',
    intro:
      'Every real estate enquiry ends with “send me the details”. With WhatsApp Business connected, the bot sends the brochure link, the price sheet and the site location as approved templates during the call, from the project’s number, and the visit reminder the day before. The buyer has everything in one chat, and the rep who calls next is not asked for the brochure again.',
    moves: [
      { title: 'Brochure and price sheet, during the call', body: 'Links to the documents the buyer asked for, sent while the bot still has them on the line.' },
      { title: 'Site location and visit confirmation', body: 'The booked slot and a map link, so the buyer can forward it to whoever is driving.' },
      { title: 'Visit reminder', body: 'The day-before template; a reply of “reschedule” triggers a call to offer a new slot.' },
    ],
    faqs: [
      { q: 'Can each project have its own number?', a: 'Yes. Each project is an agent with its own WhatsApp Business number and templates.' },
      { q: 'Do templates need RERA text?', a: 'Put the RERA number in the template footer; Meta approves it as part of the template.' },
    ],
  },

  // ─── Admissions counsellor ───
  {
    job: 'admissions-counsellor-caller',
    tool: 'google-calendar',
    intro:
      'Counselling sessions and campus visits are appointments, and in admissions season the counsellor’s calendar is the scarce resource. Connected to Google Calendar, the admissions bot books the parent into a free session slot during the enquiry call, puts the student’s name, course and phone in the event, and confirms the day before. The counsellor arrives to a calendar that filled itself.',
    moves: [
      { title: 'Session slots, read live', body: 'The bot offers the counsellor’s free slots, including the evening ones parents actually pick.' },
      { title: 'Session as an event', body: 'Student, course of interest, class or year and the parent’s number go into the event.' },
      { title: 'Confirmation and reschedule', body: 'The day-before confirmation reads the calendar; a reschedule on the phone moves the event.' },
    ],
    faqs: [
      { q: 'Several counsellors, one calendar each?', a: 'Yes. The bot can round-robin across calendars or book into the one for that course.' },
      { q: 'Campus visits as well?', a: 'A second calendar for visits works the same way, with the location in the event.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller',
    tool: 'google-sheets',
    intro:
      'Most coaching centres and schools run admissions from a sheet: enquiry, course, fee quoted, form status. The admissions bot reads that sheet each morning for the overnight enquiries to call back, answers course and fee questions from a tab you maintain, and writes the outcome and the next step to the enquiry’s row. The sheet becomes the pipeline, and the office stops reconciling call notes against it.',
    moves: [
      { title: 'Enquiries to call, read from rows', body: 'New rows and rows marked follow-up are called at the office’s opening time or earlier if you allow.' },
      { title: 'Course and fee sheet, read live', body: 'Fees, eligibility and document lists come from a tab you edit; a change is live on the next call.' },
      { title: 'Outcome and next step, written back', body: 'Interested, session booked, documents pending or not eligible, with the recording link, on the same row.' },
    ],
    faqs: [
      { q: 'Can it read Google Forms responses?', a: 'Forms writes to a sheet; point the bot at that sheet and every response is an enquiry to call.' },
      { q: 'What about a deadline column?', a: 'Rows with a deadline get the reminder call at the offset you set.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller',
    tool: 'whatsapp-business',
    intro:
      'Parents ask the same thing at the end of every admissions call: send me the fee structure and the document list. With WhatsApp Business connected, the bot sends both as approved templates during the call, from the institute’s number, then the session confirmation and the deadline reminder. The parent has the checklist in a chat they will actually reopen.',
    moves: [
      { title: 'Fee structure and document list', body: 'Sent during the call as templates the parent can forward to the other parent.' },
      { title: 'Session or visit confirmation', body: 'Date, time, counsellor and campus address with a map link.' },
      { title: 'Deadline reminder', body: 'A template a few days before the form deadline; a reply triggers a call to take the missing detail.' },
    ],
    faqs: [
      { q: 'Can we send the brochure PDF?', a: 'As a link in the template or as a media message, whichever your template approval allows.' },
      { q: 'Multiple courses, one number?', a: 'Yes. Templates are chosen by the course the bot heard on the call.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller',
    tool: 'zoho-crm',
    intro:
      'A college or a coaching chain with more than one centre usually runs admissions on Zoho CRM, and the lead that arrives at 11pm from a portal is the one nobody calls until noon. Connected to Zoho, the admissions bot calls the lead as the office opens or earlier, records the course of interest, class, city and budget as fields, books the counselling session, and leaves the record ready for the counsellor.',
    moves: [
      { title: 'Lead to call', body: 'A new lead from Shiksha, Collegedunia or the website triggers the call on the schedule you set.' },
      { title: 'Call to record', body: 'Course, eligibility answers, session booked and the recording land on the lead as fields.' },
      { title: 'Hot to counsellor', body: 'Leads that meet your rule are assigned and, when a counsellor is free, transferred live.' },
    ],
    faqs: [
      { q: 'Can we use Zoho Recruit or Zoho Campaigns instead?', a: 'The CRM connection is Zoho CRM. Other Zoho apps can be reached through the REST API or n8n.' },
      { q: 'Does it write to custom modules?', a: 'On request. Standard Leads and Contacts work out of the box.' },
    ],
  },

  // ─── Customer support executive ───
  {
    job: 'customer-support-executive',
    tool: 'rest-api',
    intro:
      'Where is my order, what is my balance, has the technician been assigned: the support calls worth automating are the ones answered from your own system. The REST API is how the support bot looks that up mid-call, and how your ticketing system receives the ticket the bot opened. Nothing is copied into Decibyl; the bot asks your API the question the caller asked.',
    moves: [
      { title: 'Status lookup, mid-call', body: 'The bot calls your endpoint with the order or account number the caller gave and reads the answer back.' },
      { title: 'Ticket out', body: 'Unresolved calls create a ticket in your system with the transcript, the caller’s number and the category the bot assigned.' },
      { title: 'Callback in', body: 'When your team resolves the ticket, your system can ask the bot to call the customer with the update.' },
    ],
    faqs: [
      { q: 'How is the lookup authenticated?', a: 'With a credential you store in the agent’s HTTP tool; it is never shown again and can be rotated any time.' },
      { q: 'What if our API is slow?', a: 'The bot tells the caller it is checking and waits up to the timeout you set, then offers a callback.' },
    ],
  },
  {
    job: 'customer-support-executive',
    tool: 'webhooks',
    intro:
      'A support desk wants every call to leave a trace in the tool the team already watches. With webhooks, each call posts its outcome, category, transcript and recording link to your URL as it ends, so Freshdesk, Zendesk, a Slack channel or your own panel gets the ticket or the note without a connector for each. Escalations carry the reason, so the right team sees them first.',
    moves: [
      { title: 'Call ended, with category', body: 'Resolved, escalated or callback booked, plus the category the bot assigned and the fields it captured.' },
      { title: 'Transfer events', body: 'When the bot hands off, the event carries a spoken summary as text so the agent taking the call has context.' },
      { title: 'Night and weekend digests', body: 'Post to a queue overnight and let your morning script open the tickets in order.' },
    ],
    faqs: [
      { q: 'Can we get a daily CSV instead?', a: 'Use n8n or a small script on the webhook; the payload has everything a CSV row needs.' },
      { q: 'Does it work with Freshdesk?', a: 'Freshdesk accepts a webhook to create tickets; map the fields once and every call becomes one.' },
    ],
  },
  {
    job: 'customer-support-executive',
    tool: 'gmail',
    intro:
      'Some support outcomes belong in an email the customer can search for later: the ticket number, the steps the bot walked through, the address to send a return to. Connected to Gmail, the support bot sends that summary from a mailbox you own, so a reply lands with a person, and copies the account manager when the caller is a business customer. No noreply address, no lost thread.',
    moves: [
      { title: 'Ticket summary to the customer', body: 'Ticket number, what was done and what happens next, sent from support@ your domain.' },
      { title: 'Escalation email to the team', body: 'An unresolved call emails the right team with the transcript attached and the recording linked.' },
      { title: 'Logged on the thread', body: 'Replies come back to the same mailbox, so the conversation continues where a person can see it.' },
    ],
    faqs: [
      { q: 'Google Workspace only?', a: 'Gmail and Google Workspace. Other mailboxes can be reached through n8n or the REST API.' },
      { q: 'Can it attach the recording?', a: 'A signed link, not the file, so your mailbox does not fill with audio.' },
    ],
  },
  {
    job: 'customer-support-executive',
    tool: 'n8n',
    intro:
      'An ops team that already runs n8n has the glue for support: the workflow that opens a ticket, updates a sheet, pings Slack and emails the customer is three nodes long. Connected to Decibyl, a support call fires that workflow when it ends, and a workflow can ask the bot to call a customer back when a ticket closes. Nothing new to host; the call becomes one more trigger.',
    moves: [
      { title: 'The call fires the workflow', body: 'Outcome, category, fields and transcript arrive as the trigger payload; branch on category.' },
      { title: 'n8n starts the call', body: 'A ticket closed, a shipment delayed or a row added starts a callback with the context in the prompt.' },
      { title: 'Mid-call lookups', body: 'An n8n webhook node can answer the bot’s status question by reading your systems on the way.' },
    ],
    faqs: [
      { q: 'Self-hosted n8n behind a VPN?', a: 'The bot needs to reach the webhook URL. Expose that one path or use n8n cloud for the trigger.' },
      { q: 'Is there a Decibyl node?', a: 'Not yet. The HTTP Request node with your API key does everything the node would.' },
    ],
  },

  // ─── Procurement follow-up executive ───
  {
    job: 'procurement-follow-up-executive',
    tool: 'google-sheets',
    intro:
      'The PO tracker is a sheet in almost every mid-sized manufacturer, and the procurement follow-up job is the person who keeps it current by phone. Connected to Google Sheets, the bot reads the open POs each morning, calls every vendor with a pending line, and writes the dispatch date or the delay reason back to the row. The buyer opens the tracker at 10am and it is already today’s.',
    moves: [
      { title: 'Open POs, read each morning', body: 'Rows with a pending status and a vendor number are the call list; a row marked received is skipped.' },
      { title: 'Dispatch date or delay, written back', body: 'Committed date, delay reason, transporter and LR number land in the columns you name.' },
      { title: 'Exceptions flagged', body: 'Anything past due or slipped twice gets a flag column and a line in the buyer’s morning summary.' },
    ],
    faqs: [
      { q: 'Our tracker is in Excel on a shared drive.', a: 'Move it to Google Sheets or export it nightly; the bot reads Sheets. The REST API is the alternative for Excel-based systems.' },
      { q: 'Can it chase quotes from the same sheet?', a: 'Yes. An RFQ tab with a pending status works exactly like the PO tab.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive',
    tool: 'rest-api',
    intro:
      'A manufacturer on an ERP, whether SAP Business One, Tally with a purchase module or a custom system, has the open POs in a table already. The REST API lets the ERP be the caller: it posts the pending lines each morning, the bot rings the vendors, and the ERP pulls back the committed dates and delay reasons to update the schedule. The tracker sheet disappears because the ERP is the tracker.',
    moves: [
      { title: 'Pending POs in', body: 'Your ERP posts the PO number, item, vendor, contact and due date as the day’s list.' },
      { title: 'Commitments out', body: 'Dispatch date, delay reason, partial quantity and transporter details as fields on each run.' },
      { title: 'PO lookup mid-call', body: 'If the vendor asks which line, the bot calls your endpoint and reads the PO detail back.' },
    ],
    faqs: [
      { q: 'We are on Tally. Is there a connector?', a: 'Not a native one. Tally exports the purchase register on a schedule and a small script posts it; we document the pattern.' },
      { q: 'Can it call in the vendor’s language?', a: 'Set the language per vendor in the payload, or let the bot follow whatever the vendor answers in.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive',
    tool: 'n8n',
    intro:
      'Procurement in a plant that runs n8n usually means the PO list comes from one system and the schedule lives in another. n8n bridges them, and Decibyl becomes the node that makes the calls. A workflow pulls the open POs, starts the follow-up calls, and writes each vendor’s committed date to the ERP, the sheet and the buyer’s Slack, in one graph.',
    moves: [
      { title: 'n8n starts the calls', body: 'A schedule node reads open POs from your system and starts a call per vendor with the lines in the prompt.' },
      { title: 'The call fires the workflow', body: 'Committed date and delay reason arrive as the trigger; branch to ERP update, sheet row and Slack.' },
      { title: 'Mid-call lookups', body: 'The bot asks n8n for the PO detail the vendor questions, and n8n reads it from wherever it lives.' },
    ],
    faqs: [
      { q: 'Can we throttle calls to a vendor?', a: 'Yes, in the workflow or in the campaign settings; one call per vendor per day is a common rule.' },
      { q: 'Is Tally reachable from n8n?', a: 'Through Tally’s XML interface on the machine that runs it, or through a nightly export; both are documented patterns.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive',
    tool: 'gmail',
    intro:
      'Vendors expect the follow-up in writing as well as on the phone. Connected to Gmail, the procurement bot emails the vendor what it heard, from the buyer’s mailbox: PO number, committed dispatch date, documents still pending. The vendor now has a written commitment to honour, and the buyer has a thread to point at when the date slips.',
    moves: [
      { title: 'Commitment email to the vendor', body: 'PO, line, quantity and the date the vendor gave on the call, sent from the buyer’s address.' },
      { title: 'Missing documents by name', body: 'Invoice, test certificate, e-way bill: the bot lists what has not landed and asks for it.' },
      { title: 'Exception summary to the buyer', body: 'One email at the end of the run with the three vendors who slipped, not thirty call notes.' },
    ],
    faqs: [
      { q: 'Can the email copy the buyer?', a: 'Yes. Set cc rules per vendor or per PO value.' },
      { q: 'Does it read replies?', a: 'Not yet. Replies land in the buyer’s mailbox as normal email.' },
    ],
  },

  // ─── Lead qualification telecaller ───
  {
    job: 'lead-qualification-telecaller',
    tool: 'hubspot',
    intro:
      'A team on HubSpot already scores leads on form fields; the qualification call is the score that needs a voice. Connected, a form submission or a list membership triggers the bot within minutes, it asks the questions in your order, and the answers land on the contact as properties that your existing workflows can branch on. Hot leads get a task and, when a rep is free, a live transfer.',
    moves: [
      { title: 'Contact to call', body: 'A form fill, an ad lead or a list membership fires the call while the intent is fresh.' },
      { title: 'Call to properties', body: 'Each qualification answer becomes a property; the transcript and recording go on the engagement.' },
      { title: 'Route', body: 'The score the bot computes moves the lifecycle stage and assigns the owner your rules name.' },
    ],
    faqs: [
      { q: 'Can we use HubSpot’s own scoring?', a: 'Yes. The bot writes the raw answers; HubSpot scores them as it scores any property.' },
      { q: 'Does it respect do-not-call?', a: 'Contacts on the DNC list you maintain in Decibyl are skipped, whatever HubSpot says.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller',
    tool: 'zoho-crm',
    intro:
      'For an insurance agency, a solar installer or a loan DSA on Zoho CRM, the lead qualification job is the gap between the form and the rep. Connected to Zoho, every new lead is called within minutes, in the language on the form, the fixed questions are asked in your order, and the answers are written as fields the rep would otherwise ask again. The tag is the same for every lead because the rule is the same.',
    moves: [
      { title: 'Lead to call', body: 'A lead from a landing page, a Meta form or a purchased list triggers the call as it lands in Zoho.' },
      { title: 'Call to record', body: 'Eligibility, budget, timeline and interest level become fields; the recording is attached to the lead.' },
      { title: 'Hot to human', body: 'A lead that meets your rule is assigned to a rep and transferred live if one is free.' },
    ],
    faqs: [
      { q: 'Purchased lists with thousands of numbers?', a: 'Upload them as a Zoho import or a campaign list in Decibyl; the bot works through them inside the calling window.' },
      { q: 'What about Zoho’s lead scoring?', a: 'The bot writes the answers; Zoho scores them with the rules you already have.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller',
    tool: 'webhooks',
    intro:
      'A lead-buying business without a CRM still has a place leads go: a sheet, a panel, a Slack channel, a dialer. Webhooks send the qualification outcome there the moment the call ends, with each answer as a named field and the tag the bot assigned. The daily report writes itself from the events, and sales never rings a lead to ask what the bot already asked.',
    moves: [
      { title: 'Answers as fields', body: 'Every qualification question arrives under the name you gave it, not as a paragraph to parse.' },
      { title: 'Tag and score', body: 'Hot, warm or not eligible, with the score the bot computed, so your system routes without reading.' },
      { title: 'Transfer events', body: 'When the bot hands a hot lead to a rep, the event carries the summary the rep heard.' },
    ],
    faqs: [
      { q: 'Can we get leads into a Google Sheet without n8n?', a: 'Google Sheets has its own connection; use that when the sheet is the destination.' },
      { q: 'Is there a retry if our endpoint is down?', a: 'Yes, with backoff. The request log shows every delivery and its response.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller',
    tool: 'google-sheets',
    intro:
      'Most lead-buying businesses start with a sheet: leads in one tab, sales works from another. Connected to Google Sheets, the qualification bot reads new rows as they arrive, calls each lead, and writes the answers, the tag and the recording link to the same row. Sales filters on “hot” and calls those first; the daily report is a pivot, not a chore.',
    moves: [
      { title: 'New leads, read as rows arrive', body: 'A Meta form, a website form or a purchased list dropped into the sheet becomes the call list.' },
      { title: 'Answers and tag, written back', body: 'Each question is a column; hot, warm or not eligible is a column sales filters on.' },
      { title: 'Retries and the daily count', body: 'Busy and unreachable rows are retried; connects, qualified and transferred are counted per day.' },
    ],
    faqs: [
      { q: 'Can it read a Meta Lead Ads sheet directly?', a: 'Yes, if you route Meta leads to a sheet, which most businesses already do.' },
      { q: 'Will it call a row twice?', a: 'No. The bot marks the row on the first attempt and only retries by the rule you set.' },
    ],
  },
];

export const jobCityPairs: JobCityPair[] = [
  // ─── Clinic receptionist ───
  {
    job: 'clinic-receptionist',
    city: 'hyderabad',
    intro:
      'A clinic in Hyderabad posts the receptionist job asking for Telugu, Hindi and English because that is the order the phone rings in: a patient from Kukatpally opens in Telugu, a family from the IT corridor opens in Hindi, and the report number is read out in English. A bot that answers only one of those loses the other two. Diagnostics centres carry the most volume here, and their calls are report-ready and preparation questions more than bookings.',
    notes: [
      { title: 'Telugu and Hindi in the same call', body: 'Both are live and code-mixed by default; the bot follows the patient rather than locking to the first language it heard.' },
      { title: 'Diagnostics questions, not just bookings', body: 'Fasting instructions, report turnaround and what to bring are answered from notes you keep, which is most of a diagnostics desk’s calls.' },
    ],
    faqs: [
      { q: 'Do Telugu minutes cost more?', a: 'Regional-language voices cost more a minute than Hindi or English; the plan’s calling credit covers it, and the rate card says exactly how much.' },
      { q: 'Can it give directions to the clinic?', a: 'Yes, from the address and landmarks you write into the knowledge base, and it can send a map link on WhatsApp.' },
    ],
  },
  {
    job: 'clinic-receptionist',
    city: 'chennai',
    intro:
      'In Chennai the receptionist post asks for Tamil and English, and what the phone actually delivers is Tanglish: a sentence that starts in Tamil, names the doctor in English and ends in Tamil. That register is the default here, not a special mode, which matters because a bot that sounds like a textbook is hung up on. Clinics and diagnostics are the bulk of the calls, and Saturday mornings are the peak the desk never covers.',
    notes: [
      { title: 'Tanglish is the register', body: 'The bot speaks the code-mixed Tamil a Chennai patient uses, and the Tamil on this site is set in real Tamil type for the same reason.' },
      { title: 'Saturday is the test', body: 'The busiest hours are the ones a single receptionist cannot hold; the bot picks up every call and the desk takes payments.' },
    ],
    faqs: [
      { q: 'Does it handle a Telugu-speaking patient in Chennai?', a: 'Yes. Telugu is common on Chennai lines and the bot switches when the caller does.' },
      { q: 'Can it read Tamil names correctly?', a: 'It confirms the spelling back in the language the caller used, which is how a good receptionist does it too.' },
    ],
  },
  {
    job: 'clinic-receptionist',
    city: 'bangalore',
    intro:
      'A Bangalore clinic post asks for Kannada, English and “any other language”, because the phone brings five: Kannada from the neighbourhood, English from the tech parks, Tamil, Telugu and Hindi from everyone who moved here. No receptionist speaks all five and no IVR menu should ask a patient to pick. The bot answers in the language the caller opens with and switches when they do. Clinics and dental practices around Whitefield and Koramangala run the volume.',
    notes: [
      { title: 'Five languages, one line, no menu', body: 'The bot does not ask “press 1 for Kannada”; it listens to the first sentence and answers in kind.' },
      { title: 'The English is not American English', body: 'Indian English with Indian names, addresses and numbers is the model’s default, so an appointment for a patient on Bannerghatta Road is booked, not misheard.' },
    ],
    faqs: [
      { q: 'Can it book across two branches?', a: 'Yes. Each branch is a calendar; the bot asks which is nearer or reads it from the caller’s area.' },
      { q: 'Do dental practices use it differently?', a: 'Mostly for recalls and confirmations; the dental solution page covers the outbound half.' },
    ],
  },
  {
    job: 'clinic-receptionist',
    city: 'pune',
    intro:
      'Pune’s clinic receptionist post asks for Marathi, Hindi and English, and the calls mix all three inside a sentence. The city also has a particular pattern: clinics near the colleges and the IT parks get a surge of new-patient calls at the start of every academic year and every project cycle, and the desk that copes in March is swamped in July. The bot answers the same on both days.',
    notes: [
      { title: 'Marathi with Hindi and English mixed in', body: 'The bot speaks the Marathi a Pune patient uses, with the Hindi and English words that belong in it, rather than a formal register nobody calls in.' },
      { title: 'Seasonal surges without seasonal hiring', body: 'The July spike is absorbed by the same bot at the same price; nobody is hired for six weeks and let go.' },
    ],
    faqs: [
      { q: 'Is Marathi as good as Hindi?', a: 'Marathi is live and code-mixed by default. Listen to it first; the demo number picks up in whichever you choose.' },
      { q: 'Can it take a callback number for the doctor?', a: 'Yes, and it writes it to the calendar event or the sheet row so the doctor sees it between patients.' },
    ],
  },

  // ─── Collections telecaller ───
  {
    job: 'collections-telecaller',
    city: 'mumbai',
    intro:
      'Mumbai is where the lenders are, and a collections telecaller post here asks for Hindi, Marathi and English and a thick skin. What the post does not say is that collections in Mumbai is a compliance problem first: calling windows, scripted disclosures, no harassment, every call recorded. A bot follows the script every time and keeps the recording, which is the part a human team is worst at.',
    notes: [
      { title: 'Compliance first', body: 'The bot calls only inside the window you set, says the disclosure the same way every time, and every call is recorded and transcribed.' },
      { title: 'The data does not leave the region', body: 'Recordings and transcripts stay in AWS Mumbai; a lender’s auditor can be told exactly where they are.' },
    ],
    faqs: [
      { q: 'Can it call in Gujarati as well?', a: 'Yes. Gujarati is common on Mumbai lines and is live.' },
      { q: 'What happens with a hardship case?', a: 'The bot recognises the signal, stops the reminder script, and transfers to a person with the context.' },
    ],
  },
  {
    job: 'collections-telecaller',
    city: 'delhi-ncr',
    intro:
      'Delhi NCR collections posts ask for Hindi and English and mean Hinglish, one language with two vocabularies, which is what the bot speaks by default. It is also the cheapest calling minute of any language Decibyl runs, which matters when the list is thousands of accounts a month. The NBFCs and fintech lenders in Gurgaon and Noida run the largest campaigns here.',
    notes: [
      { title: 'Hinglish is one language', body: 'The bot does not switch between Hindi and English; it speaks the mix a Delhi borrower uses and understands the mix they answer in.' },
      { title: 'The cheapest minute', body: 'Hindi and English voices cost less a minute than regional ones, so a Delhi campaign goes further on the same plan.' },
    ],
    faqs: [
      { q: 'Can it handle Punjabi speakers?', a: 'Punjabi speakers in NCR mostly answer in Hinglish; the bot follows them. A Punjabi voice is on the language roadmap.' },
      { q: 'How many calls a day?', a: 'As many as the calling window and your credit allow; the bot does not have a dial target.' },
    ],
  },
  {
    job: 'collections-telecaller',
    city: 'hyderabad',
    intro:
      'Hyderabad’s lenders and microfinance offices post the collections job asking for Telugu and Hindi, and the borrowers answer in both, sometimes in the same sentence. The bot handles that switch. What is different here is the mix of borrowers: a lot of small-ticket loans, a lot of first-time borrowers, and reminder calls that need patience more than pressure.',
    notes: [
      { title: 'Telugu and Hindi in the same call', body: 'Both are live and code-mixed by default; the bot follows the borrower.' },
      { title: 'Small tickets, many calls', body: 'The economics of a ₹3,000 EMI reminder only work when the call costs a few rupees; the bot’s per-minute cost is on the rate card.' },
    ],
    faqs: [
      { q: 'Does Telugu cost more a minute?', a: 'Regional voices cost more than Hindi; the plan’s credit covers it, and the rate card shows the exact figure.' },
      { q: 'Can it send the payment link on WhatsApp?', a: 'Yes, during the call, and it confirms when the link is paid.' },
    ],
  },
  {
    job: 'collections-telecaller',
    city: 'ahmedabad',
    intro:
      'In Ahmedabad the collections post asks for Gujarati and Hindi, and the borrowers who answer in Gujarati expect Gujarati that sounds like Gujarati, not Hindi with the endings changed. That is the test the bot has to pass here. Trading businesses and NBFCs run the volume, and the accountant on the other side needs a GST invoice for the service, which the plan includes.',
    notes: [
      { title: 'Gujarati that sounds like Gujarati', body: 'The Gujarati voice is a Gujarati voice; listen to it on the demo number before you decide.' },
      { title: 'A GST invoice your accountant accepts', body: 'Billed in rupees with a GST-compliant invoice, which is the question every Ahmedabad finance office asks first.' },
    ],
    faqs: [
      { q: 'Can it call business borrowers, not just retail?', a: 'Yes. Trade credit follow-up is the same job with a different script; the procurement page covers the supplier side.' },
      { q: 'Does it work with our Tally receivables?', a: 'Through a nightly export to a sheet or the REST API; the pattern is documented.' },
    ],
  },

  // ─── Order confirmation executive ───
  {
    job: 'order-confirmation-executive',
    city: 'mumbai',
    intro:
      'D2C brands in Mumbai post the order confirmation job the month the COD return rate crosses what the margin can carry. The customers are in Hindi, Marathi, English and Gujarati, often all four across one day’s orders, and the calls have to happen within minutes of the order, which is the part a shift cannot do. The bot rings in the language the address suggests and switches if it guessed wrong.',
    notes: [
      { title: 'Four languages, one order queue', body: 'The bot picks the language from the address and follows the customer if they answer in another.' },
      { title: 'The economics are in the reverse leg', body: 'Every return costs the outbound and the inbound shipping plus the packaging; a confirmed order before dispatch is the cheapest return you never ship.' },
    ],
    faqs: [
      { q: 'Does it work with our Shopify store?', a: 'Yes, natively. Other panels connect by webhook or the REST API.' },
      { q: 'Can it call the NDRs the same day?', a: 'Yes, from the courier’s failed-delivery event, before the second attempt is wasted.' },
    ],
  },
  {
    job: 'order-confirmation-executive',
    city: 'delhi-ncr',
    intro:
      'Delhi NCR has the densest cluster of D2C brands and marketplace sellers in the country, and every one of them posts this job. The customers speak Hinglish, the orders arrive around the clock, and the courier NDR rate is the number the founder watches. The bot confirms every COD order within minutes and calls every failed delivery the same day, on the cheapest minutes Decibyl runs.',
    notes: [
      { title: 'Hinglish is one language', body: 'The bot speaks the mix a Delhi customer uses; there is no Hindi-or-English switch to get wrong.' },
      { title: 'The economics are in the reverse leg', body: 'NDR calls before the second attempt and prepaid conversion on the confirmation call are where the margin comes back.' },
    ],
    faqs: [
      { q: 'We sell on Amazon and Flipkart too. Does it help there?', a: 'Marketplace orders come with limited phone access; the bot works best on your own store and on marketplace orders where the number is available.' },
      { q: 'Can it convert COD to prepaid?', a: 'Yes. It offers the link on the call and confirms when it is paid.' },
    ],
  },
  {
    job: 'order-confirmation-executive',
    city: 'bangalore',
    intro:
      'Bangalore’s D2C brands sell across the country, so the order confirmation job here is multilingual by default: a Kannada address on Mysore Road, a Tamil one in Hosur, a Hindi one in Pune, an English one in Indiranagar. The bot picks the language from the address and follows the customer. The founders here also tend to want the calls under code, which the API and webhooks give them.',
    notes: [
      { title: 'Five languages, one line, no menu', body: 'The bot answers in the language it hears and does not ask the customer to choose.' },
      { title: 'Clinics and D2C are where the volume is', body: 'D2C is the larger of the two here, and the bot handles the confirmation and the NDR call from the same order.' },
    ],
    faqs: [
      { q: 'Can we run it from our own backend?', a: 'Yes. The REST API starts the call from the order event and reads the outcome back.' },
      { q: 'Does it handle a customer who says “not now”?', a: 'It offers a callback slot and calls again at that time.' },
    ],
  },
  {
    job: 'order-confirmation-executive',
    city: 'ahmedabad',
    intro:
      'Ahmedabad’s sellers are textile, apparel and trading businesses that moved online, and their customers answer in Gujarati and Hindi. The order confirmation post here asks for both. The bot speaks Gujarati that sounds like Gujarati, confirms the address that the customer typed in English, and offers the prepaid link, which matters more here because COD is the default for a first order.',
    notes: [
      { title: 'Gujarati that sounds like Gujarati', body: 'Listen to the Gujarati voice on the demo number; it is the test every Ahmedabad seller runs first.' },
      { title: 'Trading businesses live on follow-up', body: 'The same bot that confirms a retail order chases a wholesale buyer for the payment on the next one.' },
    ],
    faqs: [
      { q: 'Do we get a GST invoice?', a: 'Yes, billed in rupees with a GST-compliant invoice.' },
      { q: 'Can it handle B2B order confirmations?', a: 'Yes. The script changes, the flow does not.' },
    ],
  },

  // ─── Real estate telecaller ───
  {
    job: 'real-estate-telecaller',
    city: 'hyderabad',
    intro:
      'Hyderabad is launching more projects than any city in the south, and every launch posts the telecaller job asking for Telugu, Hindi and English. The enquiry arrives from 99acres at 11pm and gets its first call the next afternoon, by which time the buyer has spoken to three other towers. The bot calls within minutes, in Telugu or Hindi as the buyer answers, qualifies, and books the site visit.',
    notes: [
      { title: 'Telugu and Hindi in the same call', body: 'A buyer from Kokapet opens in Telugu and asks the price in English; the bot follows.' },
      { title: 'Real estate carries the volume', body: 'Site visits booked into the sales calendar and no-shows called the same afternoon are where the bot pays for itself.' },
    ],
    faqs: [
      { q: 'Can it answer questions about the project?', a: 'From the brochure and the price sheet you upload; it says when it does not know and books the visit.' },
      { q: 'Does it work with our Zoho or HubSpot?', a: 'Both have a page; the lead triggers the call and the answers land on the record.' },
    ],
  },
  {
    job: 'real-estate-telecaller',
    city: 'pune',
    intro:
      'Pune’s developers post the telecaller job around every launch in Hinjewadi, Wakad and Kharadi, asking for Marathi, Hindi and English. The buyers are IT employees who enquire at night and want a site visit on Saturday. The bot calls back within minutes, in the Marathi that mixes Hindi and English the way Pune does, qualifies on budget and configuration, and books the Saturday slot before another project does.',
    notes: [
      { title: 'Marathi with Hindi and English mixed in', body: 'The bot speaks the register a Pune buyer uses, not a formal Marathi nobody enquires in.' },
      { title: 'Outbound campaigns start at Growth', body: 'A launch campaign to a purchased list is an outbound job, and the plan that includes outbound campaigns is the one to start on.' },
    ],
    faqs: [
      { q: 'Can it call a database of past enquiries?', a: 'Yes, as a campaign, inside the calling window, skipping anyone on your do-not-call list.' },
      { q: 'Does it send the location on WhatsApp?', a: 'Yes, during the call, with the visit time.' },
    ],
  },
  {
    job: 'real-estate-telecaller',
    city: 'mumbai',
    intro:
      'A Mumbai channel partner posts the telecaller job for a dozen projects at once, asking for Hindi, Marathi, English and Gujarati, because the buyers come from all four. The enquiries are expensive and the follow-up is where they are lost. The bot calls every portal lead within minutes, qualifies in the language the buyer answers in, books the visit, and follows up on the no-shows that a human team writes off.',
    notes: [
      { title: 'Hindi, Marathi, English and Gujarati', body: 'All four are live; the bot follows the buyer rather than the script’s first language.' },
      { title: 'Follow-up is the job', body: 'A booked visit reminded the day before and a no-show called the same afternoon are the calls a busy rota never makes.' },
    ],
    faqs: [
      { q: 'Can one bot handle several projects?', a: 'One agent per project keeps the script and the number clean; the CRM connection is shared.' },
      { q: 'Does it respect RERA advertising rules?', a: 'The script and the WhatsApp templates carry the RERA number where you put it; the bot says what you wrote.' },
    ],
  },
  {
    job: 'real-estate-telecaller',
    city: 'bangalore',
    intro:
      'Bangalore buyers enquire in Kannada, English, Tamil, Telugu and Hindi, and a developer’s telecaller post cannot ask for all five. The bot answers in whichever the buyer opens with. The projects along Sarjapur, Whitefield and the airport road get enquiries from the tech parks at night and from other cities on weekends; the bot calls both within minutes and books the visit into the sales team’s calendar.',
    notes: [
      { title: 'Five languages, one line, no menu', body: 'The bot does not make an NRI buyer or a Kannada-speaking family press a number.' },
      { title: 'Real estate is where the volume is', body: 'Alongside clinics and D2C, real estate enquiries are the largest outbound job in Bangalore.' },
    ],
    faqs: [
      { q: 'Can it call NRI numbers?', a: 'Outbound calls are to Indian numbers. NRI buyers who enquire with an Indian number are called; others get the WhatsApp message.' },
      { q: 'Does it know the project details?', a: 'From the documents you upload; it says when it does not know and books the visit.' },
    ],
  },

  // ─── Admissions counsellor ───
  {
    job: 'admissions-counsellor-caller',
    city: 'delhi-ncr',
    intro:
      'Delhi NCR’s coaching centres and schools post the admissions counsellor job before every intake, asking for Hindi and English and meaning Hinglish. Enquiries arrive in a six-week spike from Shiksha, Collegedunia and the website, overnight, and the office is understaffed in season and overstaffed after it. The bot answers the enquiry calls, calls back the overnight ones as the office opens, and books the counselling sessions.',
    notes: [
      { title: 'Hinglish is one language', body: 'The parent who asks “fees kitni hai for the two-year batch” gets an answer in the same register.' },
      { title: 'The season without the seasonal hire', body: 'The same bot at the same price absorbs the six-week spike; no counsellor is hired for the season and let go.' },
    ],
    faqs: [
      { q: 'Can it explain fee structures?', a: 'From the sheet you maintain, including instalments and scholarships you list.' },
      { q: 'Does it follow up on incomplete forms?', a: 'Yes, on the schedule you set, and it can take the missing detail over the phone.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller',
    city: 'hyderabad',
    intro:
      'Hyderabad’s intermediate colleges, coaching chains and engineering colleges post the admissions job asking for Telugu, Hindi and English, because the parent opens in Telugu and the student asks about placements in English. The bot follows both. Intake season here is compressed and the calls are about fees, hostels and eligibility more than anything else, which a fee sheet answers.',
    notes: [
      { title: 'Telugu and Hindi in the same call', body: 'Parent and student on one call in two languages is the normal case, and the bot handles the handover.' },
      { title: 'Fees, hostels and eligibility', body: 'Most calls are answered from a sheet you maintain; the ones that are not get a counselling session booked.' },
    ],
    faqs: [
      { q: 'Can it handle EAMCET rank questions?', a: 'If you give it the cutoff table, it answers from it; otherwise it books the session.' },
      { q: 'Does Telugu cost more?', a: 'Regional voices cost more a minute; the plan’s credit covers it, and the rate card is public.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller',
    city: 'pune',
    intro:
      'Pune is a student city, and its colleges and coaching institutes post the admissions job every June asking for Marathi, Hindi and English. Admissions calls here decay by the hour: a parent who enquired at 10pm and hears back at noon has already visited another institute. The bot calls back overnight enquiries as the office opens, in the Marathi mix Pune speaks, and books the counselling session.',
    notes: [
      { title: 'Admissions calls decay by the hour', body: 'The callback that happens at 9am instead of noon is the one that books the session; the bot does not wait for the counsellor to arrive.' },
      { title: 'Marathi with Hindi and English mixed in', body: 'The register a Pune parent uses, not a textbook Marathi.' },
    ],
    faqs: [
      { q: 'Can it call before the office opens?', a: 'Yes, if you allow it; many institutes start at 8am for the overnight enquiries.' },
      { q: 'Does it handle hostel and transport questions?', a: 'From a sheet you maintain; it says when it does not know.' },
    ],
  },
  {
    job: 'admissions-counsellor-caller',
    city: 'chennai',
    intro:
      'Chennai’s schools, engineering colleges and coaching centres post the admissions job asking for Tamil and English, and the parent who calls speaks Tanglish: the course name in English, everything else in Tamil. The bot speaks that register. Intake season brings a spike of calls about fees, eligibility and the document list, and the bot answers them from a sheet and sends the list on WhatsApp during the call.',
    notes: [
      { title: 'Tanglish is the register', body: 'The bot speaks the Tamil a Chennai parent uses, with the English course names and numbers that belong in it.' },
      { title: 'The document list on WhatsApp', body: 'Sent during the call, so the parent has the checklist before they hang up.' },
    ],
    faqs: [
      { q: 'Can it handle Telugu-speaking parents?', a: 'Yes. Telugu is common on Chennai lines and is live.' },
      { q: 'Does it book campus visits?', a: 'Into a calendar you point it at, with the campus address in the event.' },
    ],
  },

  // ─── Customer support executive ───
  {
    job: 'customer-support-executive',
    city: 'bangalore',
    intro:
      'Bangalore’s SaaS companies, appliance brands and logistics startups post the voice support job for the first line, asking for two or three languages and a night shift. The callers speak five languages and the twenty questions are the same in all of them. The bot answers in the language it hears, at 2am as at 2pm, from your documents, and looks up order status in your system during the call.',
    notes: [
      { title: 'Five languages, one line, no menu', body: 'A customer in Kannada and a customer in Hindi get the same answer from the same knowledge base.' },
      { title: 'The night shift is the cost', body: 'The bot covers every shift for the same price, which is where the human rota cost was hiding.' },
    ],
    faqs: [
      { q: 'Can it open tickets in our system?', a: 'Yes, by webhook or the REST API, with the transcript attached.' },
      { q: 'Does it read from our help centre?', a: 'Upload the articles or point it at the pages; it answers from them and says when it does not know.' },
    ],
  },
  {
    job: 'customer-support-executive',
    city: 'mumbai',
    intro:
      'Mumbai’s appliance brands, broadband providers and logistics companies post the support job asking for Hindi, Marathi and English and a night shift. The calls are where is my order, when is the technician coming, and how do I reset this, in all three languages and often two per call. The bot answers from your documents, looks up the status in your system, and transfers the rest with a spoken summary.',
    notes: [
      { title: 'Hindi, Marathi, English and Gujarati', body: 'All four are live; the bot follows the caller.' },
      { title: 'The data does not leave the region', body: 'Call recordings and transcripts stay in AWS Mumbai, which a compliance team can be told plainly.' },
    ],
    faqs: [
      { q: 'Can it schedule a technician visit?', a: 'If your system exposes slots, the bot books one; otherwise it opens a ticket with the preferred time.' },
      { q: 'Does it handle angry callers?', a: 'It stays calm, offers a person, and transfers with the context. It does not argue.' },
    ],
  },
  {
    job: 'customer-support-executive',
    city: 'delhi-ncr',
    intro:
      'Delhi NCR’s consumer brands and service companies post the support job asking for Hindi and English, and the callers speak Hinglish. Volume is the issue here: a broadband outage or a festival sale brings a spike no rota covers. The bot answers every call on the first ring, at the cheapest minute Decibyl runs, and a spike costs credit rather than overtime.',
    notes: [
      { title: 'Hinglish is one language', body: 'The bot answers “order kahan hai” in the same register, from your system.' },
      { title: 'The cheapest minute', body: 'Hindi and English support minutes cost the least, so a high-volume desk goes further on the same plan.' },
    ],
    faqs: [
      { q: 'What happens in an outage spike?', a: 'Every call is answered; the bot reads the outage notice you post and books callbacks for the rest.' },
      { q: 'Can it escalate to WhatsApp?', a: 'It can send a template with the ticket number during the call.' },
    ],
  },
  {
    job: 'customer-support-executive',
    city: 'chennai',
    intro:
      'Chennai’s logistics companies, appliance service centres and SaaS firms post the support job asking for Tamil and English, and the caller speaks Tanglish. Logistics is the largest of the three here, and the calls are where is my shipment, in a mix of Tamil and English with a consignment number read out digit by digit. The bot looks the number up in your system during the call and reads the status back in the same register.',
    notes: [
      { title: 'Tanglish is the register', body: 'The bot speaks the Tamil a Chennai caller uses, and hears a consignment number read in English inside it.' },
      { title: 'Logistics carries the volume', body: 'Shipment status lookups from your system are most of the calls, and the bot does them without a ticket.' },
    ],
    faqs: [
      { q: 'Can it track a shipment mid-call?', a: 'Yes, through the REST API tool that calls your tracking endpoint.' },
      { q: 'Does it handle Telugu callers?', a: 'Yes. Telugu is common on Chennai lines and is live.' },
    ],
  },

  // ─── Procurement follow-up executive ───
  {
    job: 'procurement-follow-up-executive',
    city: 'hosur',
    intro:
      'Hosur is where Decibyl is built, and it is an industrial town: auto components, engineering, packaging, all of it running on suppliers who need a call to ship. The procurement follow-up post here asks for Tamil, Kannada and English because the vendors are on both sides of the state border. The bot calls every vendor with a pending line each morning, in whichever language the vendor answers, and updates the tracker.',
    notes: [
      { title: 'A border town speaks two state languages', body: 'A vendor in Hosur answers in Tamil and one in Attibele answers in Kannada; the bot handles both on the same run.' },
      { title: 'Industrial suppliers run on callbacks', body: 'The vendor who says “I will call you back” never does; the bot calls again at the interval you set and writes down what it heard.' },
    ],
    faqs: [
      { q: 'Can it read our PO tracker sheet?', a: 'Yes. Google Sheets is the simplest connection; the REST API is the alternative for an ERP.' },
      { q: 'Will it handle a vendor who argues about the PO?', a: 'It notes the dispute and flags it for the buyer; it does not negotiate.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive',
    city: 'chennai',
    intro:
      'Chennai’s manufacturers and their supplier base speak Tamil on the phone and English on the PO, and the procurement follow-up post asks for both. A buyer here spends the afternoon chasing dispatch dates from vendors in Ambattur, Sriperumbudur and Oragadam. The bot makes those calls each morning, in Tanglish, and leaves the buyer three exceptions instead of thirty calls.',
    notes: [
      { title: 'Tanglish is the register', body: 'A vendor who says the material “dispatch aagum Thursday” is understood, and the date is written to the tracker.' },
      { title: 'Logistics and manufacturing carry the volume', body: 'Follow-up on dispatch, transporter and documents is most of the job, and the bot does it from the sheet or the ERP.' },
    ],
    faqs: [
      { q: 'Can it confirm the LR number and transporter?', a: 'Yes, and it writes both to the row.' },
      { q: 'Does it work with SAP Business One?', a: 'Through the REST API; the pattern is documented.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive',
    city: 'pune',
    intro:
      'Pune’s auto and engineering plants in Chakan, Pimpri and Chinchwad post the procurement follow-up job asking for Marathi, Hindi and English, because the vendors answer in all three. The buyer’s day is spent on the phone confirming dispatch dates and chasing test certificates. The bot makes the calls each morning in the vendor’s language and leaves the buyer the exceptions.',
    notes: [
      { title: 'Marathi with Hindi and English mixed in', body: 'The register a Pune vendor uses, with the English part numbers and dates inside it.' },
      { title: 'Documents chased by name', body: 'Invoice, test certificate, e-way bill: the bot asks for what is missing and writes down what was promised.' },
    ],
    faqs: [
      { q: 'Can it call at a fixed time each day?', a: 'Yes, the morning run is a schedule you set.' },
      { q: 'Does it integrate with our ERP?', a: 'Through the REST API or n8n; Google Sheets is the simplest start.' },
    ],
  },
  {
    job: 'procurement-follow-up-executive',
    city: 'ahmedabad',
    intro:
      'Ahmedabad’s trading houses and manufacturers live on follow-up: pending quotes, pending dispatch, pending documents, all chased by phone in Gujarati and Hindi. The procurement follow-up post asks for both. The bot speaks Gujarati that sounds like Gujarati, makes the morning calls from the tracker, and writes the answers back, and the accountant gets a GST invoice for the service.',
    notes: [
      { title: 'Trading businesses live on follow-up', body: 'Quote status, dispatch date and payment receipt are one job here, and the bot runs all three from the same sheet.' },
      { title: 'Gujarati that sounds like Gujarati', body: 'Listen to it on the demo number; it is the test every Ahmedabad buyer runs first.' },
    ],
    faqs: [
      { q: 'Can it chase quotations too?', a: 'Yes. An RFQ tab with a pending status works like the PO tab.' },
      { q: 'Does it work with Tally?', a: 'Through a nightly export to a sheet or the REST API; the pattern is documented.' },
    ],
  },

  // ─── Lead qualification telecaller ───
  {
    job: 'lead-qualification-telecaller',
    city: 'bangalore',
    intro:
      'Bangalore’s ed-techs, insurance agencies and solar installers post the lead qualification job asking for Kannada, English and Hindi, and the leads come in five languages from across the country. The bot calls each lead within minutes of the form, in the language it hears, asks the fixed questions, and writes the answers as fields. The founders here want it under code, and the API and webhooks give them that.',
    notes: [
      { title: 'Five languages, one line, no menu', body: 'A lead from a Kannada ad and a lead from a Hindi ad are qualified by the same bot with the same questions.' },
      { title: 'Under code', body: 'Leads in by API or webhook, answers out as fields; the CRM connection is optional.' },
    ],
    faqs: [
      { q: 'Can it call Meta Lead Ads leads?', a: 'Yes, from the sheet or CRM Meta writes to, within minutes.' },
      { q: 'Does it score the lead?', a: 'Against the rules you set, so the tag is the same for every lead.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller',
    city: 'delhi-ncr',
    intro:
      'Delhi NCR is where the lead-buying businesses are: loan DSAs, insurance agencies, ed-techs, solar. The post asks for Hindi and English and means Hinglish, and the lists are thousands of numbers a month. The bot calls every lead within minutes of the form or works through the purchased list inside the calling window, on the cheapest minutes Decibyl runs, and passes the hot ones to sales live.',
    notes: [
      { title: 'Hinglish is one language', body: 'The bot asks “aapka budget kya hai” and understands the answer in whichever mix comes back.' },
      { title: 'The cheapest minute', body: 'Hindi and English cost the least a minute, so a large list goes further on the same plan.' },
    ],
    faqs: [
      { q: 'Does it skip do-not-call numbers?', a: 'Yes. Your DNC list is checked before every dial.' },
      { q: 'Can it transfer hot leads live?', a: 'Yes, when a rep is free; otherwise it books a slot the rep can see.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller',
    city: 'mumbai',
    intro:
      'Mumbai’s insurance agencies, loan DSAs and real estate channel partners post the lead qualification job asking for Hindi, Marathi and English, and the leads answer in all three plus Gujarati. The bot follows them. The lists are large and compliance matters: calling windows, DNC, recordings. The bot keeps all three and writes every answer to the CRM as a field.',
    notes: [
      { title: 'Hindi, Marathi, English and Gujarati', body: 'All four are live; the bot follows the lead rather than the form’s language.' },
      { title: 'Compliance first', body: 'Calling windows, DNC and recordings are enforced by the campaign, not remembered by a caller.' },
    ],
    faqs: [
      { q: 'Can it qualify insurance leads on age and income?', a: 'It asks the questions you set and stores the answers; the eligibility rule is yours.' },
      { q: 'Does it write to Zoho or HubSpot?', a: 'Both have a page; the answers land on the record as fields.' },
    ],
  },
  {
    job: 'lead-qualification-telecaller',
    city: 'hyderabad',
    intro:
      'Hyderabad’s ed-techs, real estate channel partners and loan DSAs post the lead qualification job asking for Telugu, Hindi and English. The leads answer in Telugu and ask the price in English. The bot follows the switch, asks the questions in your order, and writes the answers as fields, so the rep who calls next already knows the budget.',
    notes: [
      { title: 'Telugu and Hindi in the same call', body: 'Both are live and code-mixed by default; the bot follows the lead.' },
      { title: 'Regional minutes cost more', body: 'Telugu voices cost more a minute than Hindi; the rate card shows the figure and the plan’s credit covers it.' },
    ],
    faqs: [
      { q: 'Can it call leads from a Google Sheet?', a: 'Yes. New rows become the call list and the answers are written back.' },
      { q: 'Does it handle a lead who wants a callback?', a: 'It books the slot and calls again at that time.' },
    ],
  },
];

/* ─── Helpers ─── */

export function getJobIntegrationPair(job: string, tool: string): JobIntegrationPair | undefined {
  return jobIntegrationPairs.find((p) => p.job === job && p.tool === tool);
}

export function getJobCityPair(job: string, city: string): JobCityPair | undefined {
  return jobCityPairs.find((p) => p.job === job && p.city === city);
}

export function integrationPairsForJob(job: string): JobIntegrationPair[] {
  return jobIntegrationPairs.filter((p) => p.job === job);
}

export function cityPairsForJob(job: string): JobCityPair[] {
  return jobCityPairs.filter((p) => p.job === job);
}

export function integrationPairsForTool(tool: string): JobIntegrationPair[] {
  return jobIntegrationPairs.filter((p) => p.tool === tool);
}

export function cityPairsForCity(city: string): JobCityPair[] {
  return jobCityPairs.filter((p) => p.city === city);
}

/**
 * Every pair must reference a real job, a real integration page and a real
 * city, and must be one the job itself lists; and every job's listed
 * integrations and cities must have a written pair, or the job page links to
 * a 404. Called from the route files at build time so a typo fails the build
 * rather than shipping a broken URL in the sitemap.
 */
export function assertPairsAreConsistent(): void {
  for (const p of jobIntegrationPairs) {
    const job = getJob(p.job);
    if (!job) throw new Error(`jobPairs: unknown job "${p.job}"`);
    if (!getIntegrationPage(p.tool)) throw new Error(`jobPairs: unknown integration page "${p.tool}" for ${p.job}`);
    if (!job.integrations.includes(p.tool)) throw new Error(`jobPairs: ${p.job} does not list integration "${p.tool}"`);
  }
  for (const p of jobCityPairs) {
    const job = getJob(p.job);
    if (!job) throw new Error(`jobPairs: unknown job "${p.job}"`);
    if (!getCity(p.city)) throw new Error(`jobPairs: unknown city "${p.city}" for ${p.job}`);
    if (!job.cities.includes(p.city)) throw new Error(`jobPairs: ${p.job} does not list city "${p.city}"`);
  }
  for (const job of jobs) {
    for (const t of job.integrations) {
      if (!getJobIntegrationPair(job.slug, t)) throw new Error(`jobPairs: no pair written for ${job.slug} × ${t}`);
    }
    for (const c of job.cities) {
      if (!getJobCityPair(job.slug, c)) throw new Error(`jobPairs: no pair written for ${job.slug} × ${c}`);
    }
  }
}
