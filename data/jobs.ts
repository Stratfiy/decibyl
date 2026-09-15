/**
 * Jobs for `/jobs/[job]` — the job-post pages.
 *
 * The idea, from the September office-hours session: the buyer has already
 * written the job description and the salary. A page that quotes that job
 * back and prices a bot against it meets the buyer where they are, which a
 * per-minute rate never does.
 *
 * Every page here is a distinct job with its own tasks, limits and questions,
 * not one template with the noun swapped. Same rule as data/cities.ts.
 *
 * ⚠️ `humanSalary` is the range job posts for this role commonly advertise
 * in Indian metros. It is a reading of live posts, not a survey, and it moves.
 * Nithish re-checks these against Naukri, Indeed and Apna before each deploy
 * that touches this file; the page says "commonly advertised" and nothing
 * stronger. No invented statistics anywhere below.
 *
 * Bot prices come from data/pricing.ts via `recommendedTier`; never type a
 * rupee figure for Decibyl here.
 */

import type { Faq } from './faqs';

export type JobDirection = 'inbound' | 'outbound' | 'both';

export type Job = {
  slug: string;
  /** The title as a job post would write it. */
  title: string;
  h1: string;
  eyebrow: string;
  direction: JobDirection;
  /** Monthly, INR, as commonly advertised. Lower bound anchors the comparison. */
  humanSalary: { low: number; high: number };
  /** One paragraph on who posts this job and why the phone is the bottleneck. */
  intro: string;
  /** What the job post asks for, in the post's own vocabulary. */
  tasks: string[];
  /** What Decibyl does for each, in the same order. */
  botDoes: string[];
  /** Stated plainly. Removes the first objection. */
  doesNot: string;
  recommendedTier: 'business' | 'growth';
  /** Solution or use-case pages that go deeper. */
  related: { label: string; href: string }[];
  /** City slugs from data/cities.ts where this job is worth a link. */
  cities: string[];
  /** Integration slugs from data/integrationPages.ts the outcome writes to. */
  integrations: string[];
  /** Language codes from data/languagePages.ts this job is worth a page in. */
  languages: string[];
  /** Vertical slugs from data/verticals.ts where this job runs volume. */
  verticals: string[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};

export const jobs: Job[] = [
  {
    slug: 'clinic-receptionist',
    title: 'Clinic receptionist',
    h1: 'The clinic receptionist job, done by a bot that answers on the first ring',
    eyebrow: 'Inbound · appointments',
    direction: 'inbound',
    humanSalary: { low: 12000, high: 20000 },
    intro:
      'A single-doctor clinic or a small diagnostic centre posts this job because the phone rings while the desk is taking a payment, and every unanswered call is a patient who books elsewhere. The post usually asks for Telugu or Tamil plus Hindi and English, computer basics, and a willingness to work Saturdays. The applicant pool is thin and the turnover is high, so the job is reposted every few months.',
    tasks: [
      'Answer incoming calls and book appointments',
      'Confirm and reschedule appointments over the phone',
      'Tell patients when reports are ready and what to bring',
      'Handle walk-in and phone enquiries about timings and fees',
      'Maintain the appointment register',
    ],
    botDoes: [
      'Picks up every call, in the language the caller opens with, and books into your calendar',
      'Confirms the day before and reschedules when the patient asks, without a callback queue',
      'Answers report-ready and preparation questions from your own notes',
      'Answers timings, fees and directions from a knowledge base you edit yourself',
      'Writes every booking and outcome back to the calendar and a sheet or your CRM',
    ],
    doesNot:
      'It does not take payments at the desk, greet walk-ins, or file paper. The human who did those keeps doing them; the phone stops interrupting.',
    recommendedTier: 'business',
    related: [
      { label: 'Clinics and doctors', href: '/solutions/clinics' },
      { label: 'Diagnostics', href: '/solutions/clinics/diagnostics' },
      { label: 'Dental', href: '/solutions/clinics/dental' },
    ],
    cities: ['hyderabad', 'chennai', 'bangalore', 'pune'],
    integrations: ['google-calendar', 'google-sheets', 'whatsapp-business'],
    languages: ['ta', 'te', 'hi', 'kn', 'en'],
    verticals: ['clinics', 'dental', 'diagnostics', 'ivf-fertility'],
    faqs: [
      {
        q: 'Can it handle a patient who switches from Telugu to English mid-call?',
        a: 'Yes. Code-mixed speech is the default, not a special mode. The agent follows the caller rather than locking to the first language it heard.',
      },
      {
        q: 'What happens when the doctor is running late?',
        a: 'You change the day in the calendar or tell the agent once, and every caller after that hears the new timing. Patients already booked can be called or messaged with the change.',
      },
      {
        q: 'Do I need to give up my existing clinic number?',
        a: 'No. Forward your number to the agent during clinic hours and keep the number patients already have. Unconditional forwarding replaces the desk; forward-on-busy makes it overflow only.',
      },
      {
        q: 'Is a receptionist really replaceable?',
        a: 'The phone half is. The desk half is not, and the page above says so. Most clinics keep the person and give them back the hours the phone was taking.',
      },
    ],
    seo: {
      title: 'AI Clinic Receptionist for Phone Calls',
      description:
        'The clinic receptionist job, done by a voice bot: answers every call in Telugu, Tamil, Hindi or English, books, confirms and reschedules. Priced beside the salary.',
      keywords: ['AI clinic receptionist', 'clinic receptionist bot', 'AI appointment booking phone', 'hire receptionist alternative', 'voice bot for clinic India'],
    },
  },
  {
    slug: 'collections-telecaller',
    title: 'Collections telecaller',
    h1: 'The collections telecaller job, done by a bot that calls on time and never gets tired of it',
    eyebrow: 'Outbound · payment reminders',
    direction: 'outbound',
    humanSalary: { low: 15000, high: 25000 },
    intro:
      'An NBFC, a lending DSA or a school fee office posts this job for one reason: reminder calls are due on a schedule and a human team never keeps it. The post asks for Hindi and a regional language, a target of 150 to 200 dials a day, and a thick skin. It is the highest-attrition job in the office, and every gap in staffing is a gap in collections.',
    tasks: [
      'Call customers with dues before and after the due date',
      'Remind, confirm the promise-to-pay date and log it',
      'Share payment links and confirm receipt',
      'Escalate disputes and hardship cases to a senior',
      'Meet the daily dial and connect target',
    ],
    botDoes: [
      'Calls on the schedule you set, at the hours the rules allow, and retries the busy ones',
      'Captures the promise-to-pay date as a field, not a note, and writes it to your system',
      'Sends the payment link by SMS or WhatsApp during the call and confirms when it lands',
      'Recognises a dispute or a hardship signal and transfers to a person with the context',
      'Makes every dial in the list without a target, and reports connects, promises and refusals',
    ],
    doesNot:
      'It does not call numbers on the DND registry, call outside permitted hours, or threaten. Those are refusals built into the dial path, and they are terminal.',
    recommendedTier: 'growth',
    related: [
      { label: 'Lending and collections', href: '/solutions/lending-collections' },
      { label: 'Follow-up and reminder calls', href: '/use-cases/follow-up-reminder-calls' },
    ],
    cities: ['mumbai', 'delhi-ncr', 'hyderabad', 'ahmedabad'],
    integrations: ['rest-api', 'webhooks', 'google-sheets'],
    languages: ['hi', 'ta', 'te', 'mr', 'gu'],
    verticals: ['lending-collections', 'education'],
    faqs: [
      {
        q: 'Is automated collection calling legal in India?',
        a: 'Calling your own customers about their own account is a service call, not a promotional one, and it is permitted with consent and inside the hours the rules set. Decibyl scrubs the DND registry before every dial and refuses outside calling hours.',
      },
      {
        q: 'How does it handle someone who says they already paid?',
        a: 'It checks the status your system returns during the call if you connect it, thanks them and ends. Without the connection it logs the claim as a disputed field for a person to verify.',
      },
      {
        q: 'Can it take a payment on the call?',
        a: 'It sends the link and confirms the payment landed. It does not read card numbers or UPI PINs aloud, and it never should.',
      },
      {
        q: 'What does a promise-to-pay look like in my system?',
        a: 'A date, an amount and a confidence, written by webhook or API to the record you point it at. The transcript and recording sit behind it if a person needs to hear the call.',
      },
    ],
    seo: {
      title: 'AI Collections Telecaller for Payment Reminders',
      description:
        'The collections telecaller job, done by a voice bot: due-date reminders in Hindi and regional languages, promise-to-pay as data, DND scrubbed on every dial.',
      keywords: ['AI collections calling', 'payment reminder bot', 'collections telecaller alternative', 'NBFC AI calling', 'voice bot EMI reminder'],
    },
  },
  {
    slug: 'order-confirmation-executive',
    title: 'Order confirmation executive',
    h1: 'The order confirmation job, done by a bot that calls within the hour, not the next shift',
    eyebrow: 'Outbound · COD and NDR',
    direction: 'outbound',
    humanSalary: { low: 12000, high: 18000 },
    intro:
      'A D2C brand or a marketplace seller posts this job when cash-on-delivery returns start eating the margin. The post asks for someone to ring every COD order before dispatch, confirm the address, and ring again when the courier marks a delivery failed. The calls are short, repetitive, and only useful if they happen fast, which is exactly where a human shift falls down.',
    tasks: [
      'Call every cash-on-delivery order to confirm before dispatch',
      'Verify the address and pincode, and correct it in the panel',
      'Call failed deliveries the same day and reschedule',
      'Convert COD to prepaid with a payment link where possible',
      'Update order status in the seller panel or sheet',
    ],
    botDoes: [
      'Rings within minutes of the order, in the language on the address, and asks the one question that matters',
      'Reads the address back, takes the correction, and writes it to the order',
      'Picks up the courier NDR event and calls before the second attempt is wasted',
      'Offers the prepaid link on the call and confirms when it is paid',
      'Writes confirmed, cancelled, rescheduled or unreachable to the panel as a status, with the recording behind it',
    ],
    doesNot:
      'It does not argue a customer into keeping an order. A clear cancellation is logged as one, which saves the shipping cost you were about to spend.',
    recommendedTier: 'growth',
    related: [
      { label: 'D2C, COD and NDR recovery', href: '/solutions/d2c-ndr-recovery' },
      { label: 'Logistics', href: '/solutions/logistics' },
    ],
    cities: ['mumbai', 'delhi-ncr', 'bangalore', 'ahmedabad'],
    integrations: ['shopify', 'webhooks', 'rest-api', 'whatsapp-business'],
    languages: ['hi', 'en', 'mr', 'gu', 'ta'],
    verticals: ['d2c-ndr-recovery', 'logistics'],
    faqs: [
      {
        q: 'Can it read the order details from my store?',
        a: 'Yes, through the Shopify integration on request or a webhook from any panel that can send one. The call knows the items, the amount and the address before it dials.',
      },
      {
        q: 'What if the customer does not pick up?',
        a: 'It retries on the schedule you set and marks the order unreachable after the last attempt, so you can hold dispatch on a rule instead of a guess.',
      },
      {
        q: 'Will customers find a bot call odd?',
        a: 'The call opens by saying which brand it is calling from and why, in the customer’s language, and takes under a minute. Most customers would rather answer one clear question than receive a parcel they no longer want.',
      },
      {
        q: 'How is this different from an SMS confirmation?',
        a: 'An SMS is read by a fraction of customers and answered by fewer. A call gets a yes, a no or a corrected address, and it gets it now.',
      },
    ],
    seo: {
      title: 'AI Order Confirmation Calls for COD and NDR',
      description:
        'The order confirmation job, done by a voice bot: COD confirmation minutes after the order, address correction, same-day NDR calls, status written to your panel.',
      keywords: ['COD order confirmation call', 'NDR calling bot', 'AI order confirmation India', 'RTO reduction calls', 'D2C voice bot'],
    },
  },
  {
    slug: 'real-estate-telecaller',
    title: 'Real estate telecaller',
    h1: 'The real estate telecaller job, done by a bot that calls the enquiry while it is still warm',
    eyebrow: 'Outbound · site visits',
    direction: 'both',
    humanSalary: { low: 15000, high: 25000 },
    intro:
      'A developer’s sales office or a channel partner posts this job every launch. The post asks for someone to call portal enquiries, qualify budget and timeline, book site visits and follow up until the visit happens. Most enquiries get their first call the next day, and by then the buyer has spoken to three other projects. The job is not hard; it is time-critical, and that is what a rota cannot deliver.',
    tasks: [
      'Call new enquiries from portals and the website',
      'Qualify on budget, configuration, location and timeline',
      'Book site visits and send the location',
      'Follow up on booked visits and no-shows',
      'Update the CRM after every call',
    ],
    botDoes: [
      'Calls within minutes of the enquiry, in Hindi, Marathi, Telugu or English, and introduces the project',
      'Asks the qualification questions you set and stores the answers as fields',
      'Books a slot the sales team can see and sends the map link on WhatsApp',
      'Reminds the day before and calls no-shows the same afternoon',
      'Writes the outcome to the CRM and hands hot leads to a person live',
    ],
    doesNot:
      'It does not negotiate price or close a booking. It gets a qualified buyer to a visit with a named salesperson, which is the whole job of the first call.',
    recommendedTier: 'growth',
    related: [
      { label: 'Real estate', href: '/solutions/real-estate' },
      { label: 'Outbound sales and lead qualification', href: '/use-cases/outbound-sales-calling' },
    ],
    cities: ['hyderabad', 'pune', 'mumbai', 'bangalore'],
    integrations: ['hubspot', 'zoho-crm', 'google-calendar', 'whatsapp-business'],
    languages: ['hi', 'te', 'kn', 'mr', 'gu', 'en'],
    verticals: ['real-estate'],
    faqs: [
      {
        q: 'Where do the enquiries come from?',
        a: 'Any source that can send a webhook or a row: property portals, your website form, a campaign sheet. The call starts when the record lands.',
      },
      {
        q: 'Can it transfer a serious buyer to a salesperson immediately?',
        a: 'Yes. Set the rule, such as budget above a figure and visit within a week, and the agent warm-transfers with a spoken summary so the salesperson does not start from zero.',
      },
      {
        q: 'Is it allowed to call portal enquiries?',
        a: 'An enquiry is a request for contact, so the first call is expected. Follow-ups respect the DND registry and calling hours automatically, and a caller who asks not to be called again is marked and never dialled.',
      },
      {
        q: 'What does the sales head see?',
        a: 'Every enquiry with its qualification answers, the visit status, and the recording. No dial counts, because the dial count was never the point.',
      },
    ],
    seo: {
      title: 'AI Real Estate Telecaller for Site Visit Booking',
      description:
        'The real estate telecaller job, done by a voice bot: calls enquiries in minutes, qualifies budget and timeline, books site visits, chases no-shows, updates the CRM.',
      keywords: ['real estate telecaller AI', 'site visit booking bot', 'AI calling for real estate leads', 'property enquiry follow-up bot', 'real estate voice AI India'],
    },
  },
  {
    slug: 'admissions-counsellor-caller',
    title: 'Admissions counsellor (calling)',
    h1: 'The admissions calling job, done by a bot that reaches every parent in season',
    eyebrow: 'Both · enquiries and follow-up',
    direction: 'both',
    humanSalary: { low: 18000, high: 30000 },
    intro:
      'A coaching centre, a school or a college posts this job before every intake. The post asks for someone to answer enquiry calls, call back the ones that came in overnight, explain the course and the fee, and follow up until the form is submitted. Enquiries arrive in a six-week spike, so the office is understaffed in season and overstaffed after it.',
    tasks: [
      'Answer enquiry calls about courses, fees and eligibility',
      'Call back web and portal enquiries the same day',
      'Explain the admission process and document list',
      'Follow up on incomplete applications',
      'Book counselling sessions and campus visits',
    ],
    botDoes: [
      'Answers every enquiry call in the parent’s language, from a course and fee sheet you maintain',
      'Calls back overnight enquiries as the office opens, or earlier if you allow',
      'Walks through the process and sends the document list on WhatsApp during the call',
      'Reminds on the deadline and offers to take the missing detail over the phone',
      'Books the session into the counsellor’s calendar and confirms the day before',
    ],
    doesNot:
      'It does not counsel. A parent who wants to discuss whether the course suits their child gets a person, with the notes so far. The bot removes the queue in front of that conversation.',
    recommendedTier: 'growth',
    related: [
      { label: 'Education', href: '/solutions/education' },
      { label: 'Customer support', href: '/use-cases/customer-support' },
    ],
    cities: ['delhi-ncr', 'hyderabad', 'pune', 'chennai'],
    integrations: ['google-calendar', 'google-sheets', 'whatsapp-business', 'zoho-crm'],
    languages: ['hi', 'ta', 'te', 'kn', 'en'],
    verticals: ['education'],
    faqs: [
      {
        q: 'Can it handle the fee question without misquoting?',
        a: 'It answers from a fee sheet you own and edit, and it says so when a question is outside the sheet. It never invents a number; that is a rule in the agent, not a hope.',
      },
      {
        q: 'What about the off-season?',
        a: 'Prepaid billing means you pay for calls that happen. A quiet month costs the plan minimum and nothing more, and the agent is still answering.',
      },
      {
        q: 'Can parents reach a human?',
        a: 'Always. The agent transfers on request or on a rule you set, and the counsellor hears a summary before the parent is bridged in.',
      },
      {
        q: 'Which languages does it speak to parents in?',
        a: 'Hindi and English everywhere, plus the regional language of the city, code-mixed as parents actually speak. The languages page lists what is live today.',
      },
    ],
    seo: {
      title: 'AI Admissions Calling Bot for Schools and Coaching',
      description:
        'The admissions calling job, done by a voice bot: answers enquiries, calls back overnight leads, quotes fees from your sheet, chases applications, books sessions.',
      keywords: ['admissions enquiry bot', 'AI calling for coaching centres', 'school admissions voice AI', 'education lead follow-up calls', 'admission counsellor alternative'],
    },
  },
  {
    slug: 'customer-support-executive',
    title: 'Customer support executive (voice)',
    h1: 'The voice support job, done by a bot that takes the repeat calls and hands over the rest',
    eyebrow: 'Inbound · L1 support',
    direction: 'inbound',
    humanSalary: { low: 15000, high: 25000 },
    intro:
      'A logistics company, an appliance brand or a SaaS with an Indian customer base posts this job for the first line: where is my order, how do I reset this, what are your timings. The post asks for two or three languages and a night shift. Eighty percent of the calls are the same twenty questions, and the person who answers them all day leaves within the year.',
    tasks: [
      'Answer inbound support calls and log tickets',
      'Resolve common queries from the knowledge base',
      'Check order or account status and read it back',
      'Escalate unresolved calls to the right team',
      'Work shifts including nights and weekends',
    ],
    botDoes: [
      'Answers on the first ring, at 2am as at 2pm, and opens a ticket with the transcript attached',
      'Answers the repeat questions from your own documents, and says when it does not know',
      'Looks up the status in your system during the call and reads it back',
      'Transfers to the right team with a spoken summary, or books a callback when nobody is free',
      'Covers every shift for the same price, which is where the human rota cost was hiding',
    ],
    doesNot:
      'It does not resolve a complaint that needs judgement or a refund decision. It gets the facts, opens the ticket and hands it to the person who can, with the call already summarised.',
    recommendedTier: 'growth',
    related: [
      { label: 'Customer support', href: '/use-cases/customer-support' },
      { label: 'Logistics', href: '/solutions/logistics' },
    ],
    cities: ['bangalore', 'mumbai', 'delhi-ncr', 'chennai'],
    integrations: ['rest-api', 'webhooks', 'gmail', 'n8n'],
    languages: ['hi', 'en', 'ta', 'mr'],
    verticals: ['d2c-ndr-recovery', 'logistics', 'clinics'],
    faqs: [
      {
        q: 'How does it know my product?',
        a: 'From documents you upload and a knowledge base you edit. Update the document and the next call answers from the new version.',
      },
      {
        q: 'Can it look up an order or an account?',
        a: 'Yes, through an HTTP API tool or a pre-call data fetch, so the agent already knows who is calling when it can. Your engineer connects it once.',
      },
      {
        q: 'What is the escalation path?',
        a: 'A warm transfer to a number or a hunt group, with a spoken briefing before the caller is bridged, or a ticket and a callback when nobody can take it. You set the rule per intent.',
      },
      {
        q: 'What about quality?',
        a: 'Every call is recorded, transcribed and QA-scored. You review a sample each week and change the script the same day.',
      },
    ],
    seo: {
      title: 'AI Customer Support Voice Agent for India',
      description:
        'The voice support job, done by a bot: answers 24x7 in Hindi, regional languages and English, resolves repeat questions from your documents, escalates with context.',
      keywords: ['AI customer support voice agent', 'L1 support bot India', 'AI helpline', 'voice bot customer service', 'support executive alternative'],
    },
  },
  {
    slug: 'procurement-follow-up-executive',
    title: 'Procurement follow-up executive',
    h1: 'The purchase follow-up job, done by a bot that rings every vendor for a date',
    eyebrow: 'Outbound · vendor follow-up',
    direction: 'outbound',
    humanSalary: { low: 20000, high: 35000 },
    intro:
      'A manufacturer or a trading house posts this job under titles like purchase executive, vendor coordinator or procurement assistant. Read the post and it is one task repeated: call the vendor, ask when the material ships, chase the pending quote, note the answer in the sheet. A line stops for a missing part more often than for a missing decision, and the person whose job was to prevent it spent the day on hold.',
    tasks: [
      'Follow up with vendors on open purchase orders for dispatch dates',
      'Chase pending quotations and clarify specifications',
      'Confirm receipt of documents and invoices',
      'Update the PO tracker and flag delays to the buyer',
      'Coordinate with stores and accounts on receipts',
    ],
    botDoes: [
      'Reads the open POs from your sheet or ERP each morning and rings every vendor with a pending date',
      'Asks for the quote status, takes the number or the reason, and writes it against the RFQ',
      'Confirms which documents landed and asks for the missing ones by name',
      'Writes the dispatch date or the delay reason to the tracker and flags anything past due',
      'Leaves the buyer a list of three exceptions instead of thirty calls',
    ],
    doesNot:
      'It does not negotiate price or approve a change. It gets a date and a reason from every vendor, every day, which is the information the buyer never had time to collect.',
    recommendedTier: 'growth',
    related: [
      { label: 'Follow-up and reminder calls', href: '/use-cases/follow-up-reminder-calls' },
      { label: 'Logistics', href: '/solutions/logistics' },
    ],
    cities: ['hosur', 'chennai', 'pune', 'ahmedabad'],
    integrations: ['google-sheets', 'rest-api', 'n8n', 'gmail'],
    languages: ['hi', 'gu', 'ta', 'en'],
    verticals: ['logistics'],
    faqs: [
      {
        q: 'Can it read my PO list from Tally or SAP?',
        a: 'From a sheet export today, and from an ERP through the HTTP API tool or an n8n flow if it exposes one. The call needs the PO number, the vendor contact and the promised date; nothing else.',
      },
      {
        q: 'Vendors will talk to a bot?',
        a: 'A vendor answers a call that says which company it is calling from and which PO it is about. The question is short and the answer is a date. Vendors who prefer a message get one on WhatsApp instead.',
      },
      {
        q: 'What does the buyer get?',
        a: 'A morning exception list: which POs slipped, by how much, and what the vendor said, with the recording behind each line. The buyer spends the day on the three that matter.',
      },
      {
        q: 'Which languages do vendor calls run in?',
        a: 'Hindi and English by default, plus Tamil, Telugu, Kannada, Marathi or Gujarati where the vendor base is regional. The agent follows whichever the vendor answers in.',
      },
    ],
    seo: {
      title: 'AI Procurement Follow-up Bot for Vendor Calls',
      description:
        'The purchase follow-up job, done by a voice bot: rings every vendor with a pending PO for a dispatch date, chases quotes, writes to your tracker, flags delays.',
      keywords: ['vendor follow-up automation', 'procurement calling bot', 'purchase executive AI', 'PO follow-up calls', 'manufacturing voice AI India'],
    },
  },
  {
    slug: 'lead-qualification-telecaller',
    title: 'Lead qualification telecaller',
    h1: 'The lead qualification job, done by a bot that asks the same five questions every time',
    eyebrow: 'Outbound · inbound leads',
    direction: 'outbound',
    humanSalary: { low: 15000, high: 22000 },
    intro:
      'Any business that buys leads posts this job: an insurance agency, an ed-tech, a solar installer, a loan DSA. The post asks for someone to call every form fill, ask a fixed set of questions, and pass the good ones to sales. The questions never change and the answers are supposed to land in the CRM as fields. In practice they land in a notebook, and sales rings the lead again to ask the same things.',
    tasks: [
      'Call new leads from forms, ads and purchased lists',
      'Ask the qualification questions and record answers',
      'Tag leads as hot, warm or not eligible',
      'Transfer or book hot leads with sales',
      'Update the CRM and the daily report',
    ],
    botDoes: [
      'Calls the lead within minutes of the form, while the intent is still there',
      'Asks your questions in your order and stores each answer as a field',
      'Scores against the rules you set, so the tag is the same for every lead',
      'Warm-transfers hot leads to sales live, or books a slot the rep can see',
      'Writes to the CRM and produces the daily report as a by-product, not a chore',
    ],
    doesNot:
      'It does not cold-call purchased lists without consent, and it will not dial a number on the DND registry. A lead who asked to be contacted is called; a stranger is not.',
    recommendedTier: 'growth',
    related: [
      { label: 'Outbound sales and lead qualification', href: '/use-cases/outbound-sales-calling' },
      { label: 'Lending and collections', href: '/solutions/lending-collections' },
    ],
    cities: ['bangalore', 'delhi-ncr', 'mumbai', 'hyderabad'],
    integrations: ['hubspot', 'zoho-crm', 'webhooks', 'google-sheets'],
    languages: ['hi', 'en', 'te', 'kn', 'mr'],
    verticals: ['real-estate', 'education', 'lending-collections'],
    faqs: [
      {
        q: 'Who decides the qualification questions?',
        a: 'You do, in plain text, and you change them any time. The agent asks them in order, handles interruptions, and stores the answers as the fields you named.',
      },
      {
        q: 'Can it transfer a hot lead live?',
        a: 'Yes. Set the rule, and the agent bridges the lead to the rep after a spoken summary. If nobody is free it books a slot and sends the confirmation.',
      },
      {
        q: 'What about leads who fill the form at midnight?',
        a: 'Called at the first permitted hour, or immediately if your consent covers it. The lead does not wait for the shift to start.',
      },
      {
        q: 'Does it replace the telecaller or the sales rep?',
        a: 'The telecaller. The rep gets a lead that has already answered the five questions and is expecting the call, which is the lead the rep always wanted.',
      },
    ],
    seo: {
      title: 'AI Lead Qualification Telecaller for Inbound Leads',
      description:
        'The lead qualification job, done by a voice bot: calls every form fill in minutes, asks your questions, scores on your rules, transfers hot leads live.',
      keywords: ['lead qualification bot', 'AI telecaller for leads', 'speed to lead calling India', 'automated lead calling', 'inbound lead follow-up voice AI'],
    },
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

/** Jobs whose related pages point at a given vertical slug. */
export function jobsForVertical(verticalSlug: string): Job[] {
  return jobs.filter((j) => j.related.some((r) => r.href.endsWith(`/${verticalSlug}`)));
}

/** Jobs worth linking from a city page. */
export function jobsForCity(citySlug: string): Job[] {
  return jobs.filter((j) => j.cities.includes(citySlug));
}

export const jobsUpdatedAt = '2026-09-14';
