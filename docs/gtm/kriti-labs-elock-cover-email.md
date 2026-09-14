# Cover email for the KritiLabs Elock proposal

Attach: `Decibyl-Proposal-KritiLabs-Elock.docx`

Subject: Elock Support Voice Agent, proposal and price

Hi [name],

Thank you for the workflow document. It is unusually complete: states,
decision logic and acceptance criteria for all five flows (Manual OTP,
Secondary OTP, Normal Open, Normal Lock, Invoice Not Received). Attached is
our proposal against it.

The short version:

- Every state in your document maps to a node Decibyl already has. The work
  is configuration plus four API connections on your side: customer
  validation, OTP status, Manual / Secondary OTP trigger, and trip check.
- Your acceptance criteria become test calls you can hear on staging before
  go-live, including "no OTP API is ever called before authentication" and
  "Manual OTP only after spoken consent".
- Tamil, Hindi and English on one number, 24x7, warm transfer to your live
  agent with a spoken briefing.
- Sized for the 1,000 calls a day you mentioned: about 100,000 to 120,000
  minutes a month at a 4-minute average. That fits inside Decibyl's planned
  concurrency with headroom, and we load-test at twice your peak in week 2.
- ₹75,000 one-time setup (waived on six months prepaid), a ₹50,000 pilot on
  ten percent of traffic credited against month one, then ₹4.50 a minute on
  a 100,000-minute commitment, about ₹4.5 lakh a month, GST inclusive. That
  is what a 13-person 24x7 desk costs, for a line with no queue.

If you send staging API access and five test TT/invoice pairs this week, the
Manual OTP flow can take test calls within three working days.

Two things get us started: the engineer who owns the OTP APIs, and a week
of call logs (count per hour, average duration) so the commitment is built
on your numbers rather than my 4-minute assumption.

Nithish Kalyan
Decibyl · decibyl.ai

---

What I need from you before sending, Nithish:
1. Confirm the email and phone you want on the proposal (it says
   nithish@decibyl.ai; change it in the docx if that is not live).
2. The number is ₹4.50/min GST-inclusive, which is ₹3.81 net. Managed
   provider cost on these flows with pre-recorded instruction audio is
   roughly ₹2 to ₹2.50/min, so margin is 35 to 45 percent. Do not go below
   ₹4.00 incl. GST without the characters-per-minute query from the
   pricing study; below ₹3.50 you are paying them to use it.
3. The 4-minute average is a guess. Their call logs replace it. If real
   calls are 2.5 minutes, the commitment drops to 75,000 minutes and the
   monthly figure to about ₹3.4 lakh; say so on the call, it builds trust.
4. Concurrency: 15 to 20 at peak is inside the 40-call fleet plan, but the
   5-calls-per-vCPU figure in INFRASTRUCTURE.md is an estimate, not a
   measurement. Run scripts/load_ramp.py at 40 concurrent before you sign.
5. The setup fee pays for recording the instruction lines in three
   languages with a real voice, plus the load test. Keep it.
