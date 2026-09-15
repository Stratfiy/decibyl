# The shelf: every role a Decibyl worker can be

**Version:** v1, 2026-09-15. Source of truth is `data/shelf.ts`; this file is generated from it.

## How this list was made

- **Job boards.** Naukri lists about 9,000 telecaller and 640 telecaller-receptionist openings; JobHai lists 13,440 customer-support and telecaller jobs, 2,000+ in Delhi NCR and 1,500 in Bengaluru. Naukri JobSpeak, January 2026: BPO hiring up 21%, hospitality and travel up 15%, insurance up 7%, healthcare up 5%, with Jaipur and Ahmedabad growing fastest.
- **n8n.** The official library holds 11,700+ workflows; the ones small businesses actually import are WhatsApp lead qualification, lead capture to Sheets, escalating invoice reminders, follow-up sequences across email, SMS and WhatsApp, and supplier invoice extraction.
- **WhatsApp automation guides and Reddit threads.** The three uses that dominate are lead qualification, order status and post-purchase follow-up, then appointment reminders and abandoned carts.
- **Agent marketplaces.** Grok Bot groups by department (sales, marketing, recruiting, operations, product) and ships an outbound prospector, a recruiting coordinator, a support queue bot and an executive assistant. Lindy ships a recruiter, an SDR, support triage and invoice processing. Zapier folded agents into AI by Zapier in July 2026 with lead enrichment, support and meeting prep. None is grouped by industry, none is phone-first, none is priced for an Indian SMB.
- **The product shelf today.** Front Desk, Order Confirmation, Payment Reminder, Lead Qualifier, Admissions, Reservations, Internal Knowledge and Compliance Reminder.

**The rule.** A role is on this list only if a business posts that job or does that task by hand every week. Roles are grouped by the industry that posts them, because that is how an owner searches, not by department.

## Summary

55 roles across 12 sectors: 11 live, 20 next (Q4 2026), 24 later (2027).

## Healthcare

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Clinics and doctors | **Clinic front desk** | Receptionist / front office executive | inbound | phone, whatsapp | Answers every call in the caller’s language and books into the doctor’s calendar; Confirms the day before and reschedules on request; Answers timings, fees and directions from a knowledge base | google-calendar, google-sheets, whatsapp-business | Business | live | Naukri and JobHai: receptionist among the most reposted SMB roles; our own jobs page |
| Diagnostic labs | **Home collection scheduler** | Lab front office / phlebotomy coordinator | inbound | phone, whatsapp | Books home-collection windows by area; Reads preparation instructions test by test; Says whether a report is ready without reading a value | google-sheets, whatsapp-business | Business | next | Diagnostics vertical page traffic; MyOperator deployment data lists booking capture as a top use |
| Hospitals | **OPD appointment desk** | Hospital front office / PRO | inbound | phone, whatsapp | Routes to the right department and books OPD slots; Answers admission, visiting hours and insurance-desk questions; Hands emergencies to a person immediately | google-calendar, rest-api | Growth | later | Healthcare hiring up 5% YoY (Naukri JobSpeak Jan 2026); multi-department routing needs concurrency |
| Pharmacies | **Refill reminder caller** | Pharmacy counter staff | routine | phone, whatsapp | Reminds chronic patients before a refill is due; Takes the reorder and sends the payment link; Flags a prescription that has expired to the pharmacist | google-sheets, razorpay | Business | later | Repeat-purchase pattern; no clinical advice on the call |
| Dental | **Dental recall and pain-call desk** | Dental receptionist | inbound | phone, whatsapp | Books by procedure length; Quotes ranges the dentist set; Treats a pain call as a same-day slot or a handoff | google-calendar, whatsapp-business | Business | next | Dental vertical page; six-month recall is a routine every practice skips |
| Fertility and IVF | **Fertility enquiry desk** | Patient coordinator | inbound | phone, whatsapp | Books first consultations and explains what to bring; Answers process and cost ranges in the clinic’s words; Hands cycle-in-progress calls to the coordinator with context | google-calendar, whatsapp-business | Growth | next | IVF vertical page; after-hours anxiety calls |
| Veterinary | **Vet appointment desk** | Clinic assistant | inbound | phone, whatsapp | Books consultations and vaccination reminders; Answers timings and what to bring; Triages an emergency to the vet | google-calendar | Business | later | Same shape as clinic front desk; small but under-served |

## Education

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Colleges and institutes | **Admissions desk** | Admissions counsellor / telecaller | both | phone, whatsapp | Answers fee, date, document and hostel questions; Books counselling slots; Calls back every enquiry within a minute in season | google-sheets, google-calendar, whatsapp-business | Growth | live | Admissions counsellor caller job page; season bursts |
| Coaching institutes | **Batch enquiry qualifier** | Counsellor / telecaller | outbound | phone, whatsapp | Asks class, board, target exam and batch timing; Sends the brochure on WhatsApp; Books the counsellor | google-sheets, whatsapp-business | Business | next | Result-day and ad-day bursts; lead-qualification job page |
| Schools | **Fee reminder caller** | Accounts / fee desk | routine | phone, whatsapp | Reminds parents before instalments; Sends the payment link and records the promise; Never speaks to a student about money | google-sheets, razorpay | Business | next | Collections × education pair page |
| Schools | **Absence and circular caller** | Front office | routine | phone, whatsapp | Calls parents of absent students by 10 am; Reads the day’s circular on request; Logs the reason given | google-sheets | Business | later | Daily routine every school does by hand |
| Ed-tech and online courses | **Course onboarding caller** | Learner success executive | outbound | phone, whatsapp | Calls new enrolments to set up the first session; Answers login and schedule questions; Flags a learner who has not logged in for a week | rest-api, whatsapp-business | Growth | later | Retention routine; ed-tech activation calls are outsourced today |

## Real estate and construction

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Builders and brokers | **Property lead qualifier** | Real-estate telecaller | outbound | phone, whatsapp | Calls back a portal enquiry within a minute; Captures budget, locality, configuration and timeline as fields; Books the site visit | google-sheets, google-calendar, whatsapp-business | Growth | live | Real-estate telecaller job page; portal speed-to-lead |
| Builders and brokers | **Site-visit reminder and no-show caller** | Telecaller | routine | phone, whatsapp | Reminds the morning of the visit; Reschedules a no-show the same day; Reports the visit outcome to the closer | google-calendar, google-sheets | Growth | next | No-show rate is the number every sales head quotes |
| Property management | **Society and facility helpdesk** | Facility manager’s desk | inbound | phone, whatsapp | Logs complaints with flat number and category; Answers maintenance dues and timings; Escalates an outage to the supervisor | google-sheets | Business | later | Housing societies and co-working spaces |
| Interiors and contractors | **Quote follow-up caller** | Sales coordinator | routine | phone, whatsapp | Follows up every quote on day 3 and day 10; Records objections as fields; Books the site measurement | google-sheets | Business | later | Quotes die in silence; a routine is the fix |

## Financial services

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Lending and NBFC | **Payment reminder caller** | Collections telecaller | routine | phone, whatsapp | Pre-due, due-day and post-due reminders inside the window; Captures promise-to-pay as a field; Hands disputes and hardship to a senior | google-sheets, rest-api, razorpay | Growth | live | Collections telecaller job page; fair-practice window enforced |
| Lending and NBFC | **Loan enquiry qualifier** | Lead generation executive | outbound | phone, whatsapp | Asks loan type, amount, income band and city; Reads the disclosures; Routes to the right product queue | google-sheets, rest-api | Growth | next | Insurance and lending lead-gen postings; DND checked before dial |
| Insurance agencies | **Policy renewal caller** | Renewal executive | routine | phone, whatsapp | Calls 30, 15 and 3 days before expiry; Sends the renewal link and confirms payment; Flags a lapsed policy to the agent | google-sheets, razorpay | Business | next | Insurance hiring up 7% YoY; renewal calls are the bulk of an agency’s phone work |
| CA and tax firms | **Document and compliance chaser** | Article / junior accountant | routine | phone, whatsapp, email | Chases clients for GST and TDS documents before the due date; Reads what is missing from a checklist; Confirms receipt and closes the item | google-sheets, tally | Business | next | Compliance reminder pack exists; monthly deadline cycle |
| Chit funds and co-operatives | **Instalment reminder caller** | Field collector’s desk | routine | phone, whatsapp | Reminds members of the monthly instalment; Records the payment mode promised; Escalates repeated misses | google-sheets | Business | later | Tamil Nadu and Kerala chit funds run on phone reminders |

## Retail, D2C and commerce

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| D2C brands | **Order confirmation caller** | Order confirmation executive | outbound | phone, whatsapp | Confirms COD orders minutes after checkout; Reads back address, landmark and pincode; Writes confirmed, cancelled or changed to the order | shopify, woocommerce, google-sheets | Business | live | Order-confirmation job page; RTO reduction |
| D2C brands | **NDR recovery caller** | Ops executive | routine | phone, whatsapp | Calls when a delivery attempt fails; Books a reattempt slot; Updates the shipment | shiprocket, delhivery, google-sheets | Business | next | D2C vertical page; NDR is the second-largest leak after RTO |
| D2C brands | **Where-is-my-order support** | Customer support executive | inbound | phone, whatsapp, web | Reads the tracking event to the customer; Files wrong-item complaints with a photo request; Starts a refund inside policy | shopify, shiprocket, freshdesk | Business | live | Support job page; MyOperator data: order status is a top-three use |
| D2C brands | **Abandoned cart caller** | Sales executive | routine | whatsapp, phone | Messages within an hour of an abandoned cart; Answers the one question that stopped the purchase; Sends a payment link | shopify, razorpay | Business | later | WhatsApp automation guides list cart recovery first; keep it text-first |
| Local retail | **Shop enquiry and stock desk** | Counter staff | inbound | phone, whatsapp | Answers timings, stock and price from a sheet; Takes a reservation for pickup; Sends directions | google-sheets | Everyday | later | Kirana, electronics and furniture stores; text-first |
| Restaurants and cloud kitchens | **Reservations and takeaway desk** | Reservation desk | inbound | phone, whatsapp | Takes table reservations by party size and time; Takes a takeaway order from the menu; Confirms and reminds | google-sheets, razorpay | Business | live | Reservations Bot exists on the shelf; hospitality hiring up 15% YoY |
| Salons, spas and gyms | **Salon and gym booking desk** | Front desk | inbound | phone, whatsapp | Books by service and stylist; Reminds and fills cancellations from a waitlist; Chases lapsed members | google-calendar, google-sheets | Business | next | High no-show, high repeat; a clinic desk with different nouns |

## Logistics and manufacturing

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Transporters | **Delivery confirmation caller** | Dispatch executive | outbound | phone, whatsapp | Confirms presence, gate and payment with the consignee; Leaves a note for the driver; Reschedules a failed attempt | google-sheets, rest-api | Business | live | Order confirmation × logistics pair page |
| Manufacturers | **Vendor follow-up caller** | Procurement executive | routine | phone, whatsapp, email | Chases every open PO for dispatch dates; Records vehicle and invoice details; Flags slips to accounts | tally, google-sheets | Growth | live | Procurement job page; Tally connector |
| Manufacturers | **Receivables chaser (B2B)** | Accounts executive | routine | phone, whatsapp, email | Chases invoices past due with the invoice number and amount; Records the promised date; Escalates 60-day items | tally, zoho-books | Growth | next | B2B collections is different from consumer collections: invoice-driven, accounts-desk to accounts-desk |
| Manufacturers | **Shift attendance and absence caller** | HR executive | routine | phone, whatsapp | Calls absent workers by 9 am; Confirms the next shift roster; Logs reasons | google-sheets | Business | later | Factory HR; Hindi and regional languages |
| Fleet and drivers | **Driver dispatch desk** | Dispatch coordinator | both | phone, whatsapp | Assigns trips and confirms pickup times with drivers; Answers where-is-my-truck for shippers; Raises exceptions to ops | google-sheets, rest-api | Growth | later | Support × logistics pair page |

## Hospitality and travel

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Hotels and homestays | **Hotel reservations desk** | Reservation executive | inbound | phone, whatsapp | Quotes availability and rates from a sheet; Takes the booking and sends the payment link; Answers check-in, parking and cancellation | google-sheets, razorpay | Business | next | Hospitality hiring up 15% YoY; Reservations Bot base |
| Travel agencies | **Travel enquiry qualifier** | Travel consultant | outbound | phone, whatsapp | Asks dates, destination, budget and group size; Sends the itinerary options; Books the consultant call | google-sheets, whatsapp-business | Business | later | Seasonal enquiry bursts; text-heavy |
| Tour and pilgrimage operators | **Pilgrimage and tour booking desk** | Booking executive | inbound | phone, whatsapp | Answers dates, seats and inclusions; Takes the booking and advance; Reminds before departure | google-sheets, razorpay | Business | later | MyOperator lists spiritual organisations among deployments; regional languages matter |

## Professional and home services

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Law firms and legal services | **Client intake desk** | Office assistant | inbound | phone, whatsapp | Takes the matter type, urgency and contact; Books the consultation; Never gives legal advice | google-calendar, google-sheets | Business | later | Intake without advice; handoff rule is the product |
| Consultancies and agencies | **Agency lead qualifier** | Business development executive | outbound | phone, whatsapp, email | Qualifies inbound enquiries on scope, budget and timeline; Books the discovery call; Sends the deck | google-calendar, hubspot | Business | next | Lead qualification job page |
| Home services (AC, plumbing, pest) | **Service booking and reminder desk** | Customer care executive | both | phone, whatsapp | Books a technician slot by area; Reminds the customer and confirms the technician; Chases AMC renewals | google-sheets, google-calendar | Business | next | High call volume, low ticket; AMC renewal is a routine |
| Automotive dealers and garages | **Service-due reminder caller** | Service advisor | routine | phone, whatsapp | Calls when a service is due by odometer or date; Books the slot and pickup; Confirms the day before | google-sheets, google-calendar | Business | next | Dealer service desks post this job every quarter |
| Automotive dealers | **Test-drive scheduler** | Sales consultant | outbound | phone, whatsapp | Calls back a web enquiry and books a test drive; Captures model and finance interest; Reminds and reports | google-sheets, google-calendar | Growth | later | Portal leads with fast decay |

## Recruitment and HR

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Staffing and recruitment | **Candidate screening caller** | Recruiter / sourcer | outbound | phone, whatsapp | Calls applicants with five screening questions; Confirms notice period, location and expected pay; Books the interview slot | google-sheets, google-calendar | Growth | next | Grok Bot and Lindy both ship a recruiting coordinator; Indian volume hiring is phone-first |
| Any employer | **Interview reminder and no-show caller** | HR coordinator | routine | phone, whatsapp | Reminds the evening before; Reschedules a no-show; Reports attendance to the recruiter | google-calendar | Business | later | No-show is the recruiter’s biggest leak |
| Any employer | **Employee HR helpdesk** | HR executive | text | whatsapp, web | Answers leave, payroll date and policy questions from the handbook; Files a ticket for anything else; Escalates grievances to a person | google-sheets | Everyday | later | Internal Knowledge Bot base; text-only |

## Every business (internal)

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Any | **Internal knowledge bot** | Office assistant | text | whatsapp, web | Answers staff questions from the company’s documents; Says when it does not know; Records the gap for the owner | google-drive | Everyday | live | Internal Knowledge Bot on the shelf |
| Any | **Compliance reminder bot** | Accounts / admin | routine | whatsapp, email | Reminds of GST, TDS, licence and renewal dates; Chases the owner until it is marked done; Logs what was filed when | google-sheets, tally | Everyday | live | Compliance Reminder Bot on the shelf |
| Any | **Review and feedback caller** | Customer care | routine | phone, whatsapp | Calls after a service and asks three questions; Records consent and the transcript; Sends the review link to happy customers | google-sheets | Business | next | Our own review caller in the plan; directories skill 10-in-30 protocol |
| Any | **Missed-call callback bot** | Front office | routine | phone, whatsapp | Calls back every missed call within two minutes; Takes the message or books; Sends a WhatsApp if unanswered | google-sheets | Business | next | Missed-call service exists in the product; make it a role |
| Any | **Vendor quote collector** | Purchase assistant | routine | phone, whatsapp, email | Calls three vendors for a quote on a list; Records price, delivery and terms; Tables them for the owner | google-sheets | Business | later | Haggle Bot on Grok’s marketplace is the enterprise version |
| Any | **Daily summary reporter** | Owner’s assistant | routine | whatsapp, email | Sends the owner a 9 pm summary of calls, bookings, dues and complaints; Flags what needs a decision; Reads it aloud on request | google-sheets | Everyday | next | Daily report service exists in the product |

## Government, NGOs and community

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Temples and religious trusts | **Darshan and seva booking desk** | Office staff | inbound | phone, whatsapp | Answers timings, seva rates and dress code; Takes seva bookings and donations by link; Reminds before the date | google-sheets, razorpay | Business | later | Spiritual organisations appear in SMB deployment data; regional languages |
| NGOs and trusts | **Donor follow-up caller** | Fundraising executive | routine | phone, whatsapp | Thanks donors and confirms 80G receipts; Reminds pledges; Records preferences | google-sheets, razorpay | Business | later | Pledge follow-up is manual everywhere |
| Panchayats and civic bodies | **Grievance intake desk** | Helpdesk operator | inbound | phone, whatsapp | Logs a complaint with location and category; Gives a ticket number and status; Escalates by rule | google-sheets | Growth | later | Sovereign tier fit; procurement-led sales |

## Agriculture and rural

| Industry | Role | Posted as | Shape | Channels | Does | Tools | Plan | Status | Why it is here |
|---|---|---|---|---|---|---|---|---|---|
| Agri-input dealers | **Seasonal order and payment reminder** | Dealer’s counter staff | routine | phone, whatsapp | Reminds farmers of seasonal inputs and credit dues; Takes the order and delivery date; Records the promise | google-sheets | Business | later | Regional languages, seasonal peaks, credit cycles |
| Dairy and FPOs | **Collection schedule caller** | Field coordinator | routine | phone | Announces collection timings and rates; Confirms quantities for the next day; Logs no-shows | google-sheets | Business | later | Daily routine over voice; low text literacy |

## Sequencing

- **Live (11 rows, 8 packs):** on the product shelf now; three rows are the same pack sold to a second industry. Site pages exist for six of them under /jobs.
- **Next (Q4 2026):** roles that are a live role with different nouns (dental recall, salon desk, hotel reservations, NDR recovery, site-visit reminders), plus the routines every business needs (review caller, missed-call callback, daily summary, receivables chaser, policy renewal, candidate screening). Each is a template plus a pack entry, not new engineering.
- **Later (2027):** roles that need concurrency, procurement-led sales or a channel we do not have yet (hospital OPD desk, grievance desk, fleet dispatch, employee helpdesk on inbound email).

## What the app agent needs to seed a role

Each row maps to a pack: slug, name, industries, channels, facts to collect at hiring (hours, address, fee list, calendar), the template prompt for Indian phone conversations, the tools, and the credit shape (per minute for calling roles, per run for routines, per reply for text). The catalogue carries everything except the prompt, which is written per role with the voice prompting guide.
