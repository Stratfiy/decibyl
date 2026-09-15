export type MarketingSection = {
  eyebrow?: string;
  title: string;
  body: string;
  items: { title: string; body: string }[];
};

export type MarketingPage = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  chips: string[];
  visual: 'platform' | 'voice' | 'memory' | 'apps' | 'jobs' | 'support' | 'ops' | 'procurement' | 'docs' | 'security' | 'pricing' | 'impact' | 'n8n';
  sections: MarketingSection[];
  finalTitle: string;
  finalBody: string;
};

export const marketingPages: Record<string, MarketingPage> = {
  platform: {
    path: '/platform', seoTitle: 'Decibyl Platform — AI That Gets Work Done',
    seoDescription: 'Explore Decibyl agents, memory, apps, voice, documents, routines, approvals and multi-agent work in one platform.',
    eyebrow: 'THE PRODUCT', title: 'Everything Decibyl can do.',
    lead: 'Give an agent a job. It can talk, remember, use your apps, work on a schedule, collaborate with other agents and ask before important actions.',
    chips: ['Voice', 'Apps', 'Documents', 'Routines', 'Memory', 'Multi-agent'], visual: 'platform',
    sections: [
      { eyebrow: 'START WITH THE JOB', title: 'From request to finished work.', body: 'Describe what you want done. Decibyl figures out the context, tools and steps underneath.', items: [
        { title: 'Ready agents', body: 'Start from a useful role instead of an empty builder.' },
        { title: 'Build from a brief', body: 'Describe the job in plain language and review the setup.' },
        { title: 'Skills and tools', body: 'Add voice, apps, documents, APIs and workflows only when the job needs them.' },
      ]},
      { eyebrow: 'RUN THE WORK', title: 'Let work happen when it needs to.', body: 'Run on demand, on a schedule or when something changes.', items: [
        { title: 'Routines', body: 'Repeat useful work without prompting it again.' },
        { title: 'Triggers', body: 'Start from email, webhooks and supported events.' },
        { title: 'Campaigns', body: 'Run structured outreach or calling work at scale.' },
      ]},
      { eyebrow: 'GETS SMARTER', title: 'It remembers what matters.', body: 'Useful context can carry from one job to the next instead of disappearing after every conversation.', items: [
        { title: 'People and relationships', body: 'Keep context around who matters and how they are connected.' },
        { title: 'Decisions and preferences', body: 'Remember what was decided and how you like work done.' },
        { title: 'Documents and facts', body: 'Use important information from the files your work depends on.' },
      ]},
    ], finalTitle: 'What would you hand off first?', finalBody: 'Start with one useful job. Add more capability only when the work proves it needs it.'
  },
  'voice-agents': {
    path: '/voice-agents', seoTitle: 'AI Voice Agents — Calls That Get Work Done | Decibyl',
    seoDescription: 'AI voice agents for inbound and outbound calls with 40+ languages, knowledge, transfers, DTMF, campaigns, transcripts and structured outcomes.',
    eyebrow: 'VOICE', title: 'AI agents that can talk.',
    lead: 'Answer and make calls, work in 40+ languages, use your knowledge during the conversation, collect keypad input, transfer to a person and save what happened.',
    chips: ['Inbound', 'Outbound', '40+ languages', 'DTMF', 'Transfers', 'Campaigns'], visual: 'voice',
    sections: [
      { eyebrow: 'REAL CONVERSATIONS', title: 'More than a talking bot.', body: 'A useful call usually needs context, actions and a clear outcome.', items: [
        { title: 'Use knowledge live', body: 'Answer from documents and business context while the call is happening.' },
        { title: 'Collect and verify', body: 'Capture keypad input and structured information when the flow requires it.' },
        { title: 'Transfer when needed', body: 'Hand off to a person when the caller asks or your rules say so.' },
      ]},
      { eyebrow: 'AFTER THE CALL', title: 'The conversation becomes usable work.', body: 'Do not leave the result trapped in a transcript.', items: [
        { title: 'Recordings and transcripts', body: 'Review what actually happened.' },
        { title: 'Structured outcomes', body: 'Save dispositions, fields and summaries for the next system.' },
        { title: 'Follow-up actions', body: 'Update tools or continue the job after the call ends.' },
      ]},
    ], finalTitle: 'Use voice when a conversation is the fastest path.', finalBody: 'Voice is one Decibyl skill—not the whole product.'
  },
  knowledge: {
    path: '/knowledge', seoTitle: 'Knowledge & Memory for AI Agents | Decibyl',
    seoDescription: 'Give Decibyl agents documents, decisions, preferences, people context and durable memory so the next job starts smarter.',
    eyebrow: 'KNOWLEDGE + MEMORY', title: 'Memory that makes agents more useful.',
    lead: 'Give agents your documents and useful context. Decibyl can remember people, decisions, preferences and facts so the next job starts with more understanding.',
    chips: ['Documents', 'People', 'Decisions', 'Preferences', 'Corrections', 'Recall'], visual: 'memory',
    sections: [
      { eyebrow: 'WORKING CONTEXT', title: 'Remember the things that change the next decision.', body: 'Memory is useful only when it improves the work.', items: [
        { title: 'Confirmed facts', body: 'Keep information you explicitly approved as durable context.' },
        { title: 'Inferred context', body: 'Keep useful observations separate from confirmed facts.' },
        { title: 'Corrections', body: 'Update context when the world changes instead of carrying old assumptions forward.' },
      ]},
      { eyebrow: 'YOUR KNOWLEDGE', title: 'Documents become part of the job.', body: 'Files are not just for Q&A. Agents can use them while taking action.', items: [
        { title: 'Search and answer', body: 'Find the right information without opening every file.' },
        { title: 'Extract fields', body: 'Pull dates, values and structured details from documents.' },
        { title: 'Use context during work', body: 'Bring the right facts into calls, messages and workflows.' },
      ]},
    ], finalTitle: 'The more useful context it has, the less you repeat yourself.', finalBody: 'Keep control of what should be remembered and correct it whenever it changes.'
  },
  integrations: {
    path: '/integrations', seoTitle: 'AI Agent Integrations — Apps, APIs & Workflows | Decibyl',
    seoDescription: 'Connect Decibyl agents to the apps, APIs and workflows where your work already happens.',
    eyebrow: 'APPS + TOOLS', title: 'Your agents can use the tools you already use.',
    lead: 'Connect the systems where work happens. Agents can read context, use workflows and APIs, and ask for approval before important writes.',
    chips: ['CRM', 'Email', 'Calendar', 'Drive', 'APIs', 'Webhooks'], visual: 'apps',
    sections: [
      { eyebrow: 'READ', title: 'Bring the right context into the job.', body: 'Let agents look up what they need instead of asking you to copy it over.', items: [
        { title: 'Customer context', body: 'Read relevant CRM and account information.' },
        { title: 'Files and documents', body: 'Use the knowledge already stored in your workspace.' },
        { title: 'Messages and events', body: 'Start from incoming work where supported.' },
      ]},
      { eyebrow: 'ACT', title: 'Move the work forward.', body: 'Answers matter more when the agent can safely take the next step.', items: [
        { title: 'Use APIs', body: 'Call your own services and business logic.' },
        { title: 'Run workflows', body: 'Trigger existing automation instead of rebuilding it.' },
        { title: 'Approval before writes', body: 'Keep consequential changes behind a human check.' },
      ]},
    ], finalTitle: 'Keep the stack you already have.', finalBody: 'Decibyl should add an agent layer to your work, not force you to replace every system underneath it.'
  },
  'integrations/n8n': {
    path: '/integrations/n8n', seoTitle: 'Decibyl + n8n — AI Agents for Your Existing Workflows',
    seoDescription: 'Keep your n8n workflows and use Decibyl agents for context, memory, voice, decisions and job delegation.',
    eyebrow: 'DECIBYL + N8N', title: 'Keep your n8n workflows. Give them an agent.',
    lead: 'Use n8n for workflow logic and Decibyl for the agent that understands the job, talks to people, remembers context and decides when to run the workflow.',
    chips: ['n8n', 'Agents', 'Memory', 'Voice', 'Webhooks', 'APIs'], visual: 'n8n',
    sections: [
      { eyebrow: 'DIVIDE THE JOB', title: 'Let each layer do what it is good at.', body: 'Do not force a workflow engine to be the agent, or an agent to replace a workflow engine.', items: [
        { title: 'Decibyl understands', body: 'Goals, context, memory and conversation.' },
        { title: 'n8n executes', body: 'Deterministic workflow steps and app-to-app automation.' },
        { title: 'Your systems stay put', body: 'Keep the connections and logic you already invested in.' },
      ]},
    ], finalTitle: 'Add intelligence without throwing away automation.', finalBody: 'Use Decibyl in front of the workflows you already trust.'
  },
  'use-cases': {
    path: '/use-cases', seoTitle: 'AI Agent Use Cases — Start With a Job | Decibyl',
    seoDescription: 'Explore Decibyl AI agents for research, support, sales, voice, operations, documents and recurring work.',
    eyebrow: 'WHAT DO YOU WANT DONE?', title: 'Start with a job, not a blank canvas.',
    lead: 'Choose a ready agent or describe the work in your own words. Start with one useful job and add tools, memory, voice or routines only when you need them.',
    chips: ['Research', 'Support', 'Sales', 'Voice', 'Operations', 'Documents'], visual: 'jobs',
    sections: [
      { eyebrow: 'EVERYDAY WORK', title: 'Jobs people repeat are good places to start.', body: 'The best first agent is usually not the most ambitious one. It is the job you keep doing again.', items: [
        { title: 'Research', body: 'Track competitors, topics, suppliers or accounts and surface what changed.' },
        { title: 'Follow-up', body: 'Keep leads, invoices, customers or internal requests moving.' },
        { title: 'Reports', body: 'Collect updates and turn them into a useful recurring summary.' },
      ]},
      { eyebrow: 'CUSTOMER WORK', title: 'Agents can work with people too.', body: 'Use the right channel for the job.', items: [
        { title: 'Calls', body: 'Answer, qualify, verify, book or follow up by voice.' },
        { title: 'Support', body: 'Answer questions and take approved actions in connected systems.' },
        { title: 'Messaging', body: 'Continue work through chat, email or WhatsApp where connected.' },
      ]},
    ], finalTitle: 'Describe the job you wish someone would just handle.', finalBody: 'That is usually a better starting point than asking which AI feature you should use.'
  },
  'ai-agents-for-work': {
    path: '/ai-agents-for-work', seoTitle: 'AI Agents for Work — Hand Off Repetitive Tasks | Decibyl',
    seoDescription: 'AI agents for research, follow-ups, reports, calls, inbox work and repetitive admin.',
    eyebrow: 'AI AGENTS FOR WORK', title: 'Hand off the work you keep doing.',
    lead: 'Research, follow-ups, reports, calls, inbox work and repetitive admin. Give Decibyl the job and keep control of the important decisions.',
    chips: ['Research', 'Follow-up', 'Admin', 'Reports', 'Calls', 'Apps'], visual: 'jobs',
    sections: [
      { eyebrow: 'FOR YOURSELF', title: 'Use an agent for the work that follows you around.', body: 'Not every useful job belongs to a company process.', items: [
        { title: 'Research and monitoring', body: 'Track topics and bring back only what changed.' },
        { title: 'Follow-ups and reminders', body: 'Keep small commitments from slipping through.' },
        { title: 'Files and information', body: 'Find the right document or fact when you need it.' },
      ]},
      { eyebrow: 'FOR A TEAM', title: 'Give repeat work an owner.', body: 'Agents can take the routine steps while people stay responsible for judgment.', items: [
        { title: 'Sales support', body: 'Research accounts, prepare follow-ups and update systems.' },
        { title: 'Operations', body: 'Run checks, chase updates and prepare recurring reports.' },
        { title: 'Customer work', body: 'Answer, call, message and escalate when needed.' },
      ]},
    ], finalTitle: 'Start with the task you are tired of repeating.', finalBody: 'You can always add more agents after the first one proves useful.'
  },
  'ai-agents-for-customer-support': {
    path: '/ai-agents-for-customer-support', seoTitle: 'AI Agents for Customer Support | Decibyl',
    seoDescription: 'AI support agents that answer questions, use connected systems, take approved actions and escalate when needed.',
    eyebrow: 'CUSTOMER SUPPORT', title: 'Support that can answer and act.',
    lead: 'Answer questions, look up context, update systems, follow policies and hand off when a person should take over.',
    chips: ['Knowledge', 'CRM', 'Actions', 'Voice', 'Messaging', 'Escalation'], visual: 'support',
    sections: [
      { eyebrow: 'RESOLVE MORE', title: 'Do not stop at generating a reply.', body: 'Useful support often requires looking something up or changing something.', items: [
        { title: 'Use customer context', body: 'Read the account and recent history before responding.' },
        { title: 'Follow policies', body: 'Use the right knowledge and limits for each request.' },
        { title: 'Take approved actions', body: 'Update connected tools when the request is safe to complete.' },
      ]},
      { eyebrow: 'HANDOFF', title: 'Keep people close for the cases that need them.', body: 'Escalation should be part of the job design, not a failure mode.', items: [
        { title: 'Ask before sensitive writes', body: 'Pause for approval when the action deserves review.' },
        { title: 'Transfer calls', body: 'Move a live conversation to a person when needed.' },
        { title: 'Carry the context forward', body: 'Give the human the useful history instead of making the customer repeat it.' },
      ]},
    ], finalTitle: 'Give support an agent that can finish the routine work.', finalBody: 'Keep your team focused on exceptions, judgment and relationships.'
  },
  'ai-agents-for-operations': {
    path: '/ai-agents-for-operations', seoTitle: 'AI Agents for Operations & Recurring Work | Decibyl',
    seoDescription: 'AI agents for recurring checks, follow-ups, updates, reports, approvals and operational workflows.',
    eyebrow: 'OPERATIONS', title: 'Put repeat operations on autopilot — with limits.',
    lead: 'Let agents handle recurring checks, follow-ups, updates and reports while approvals keep sensitive actions under your control.',
    chips: ['Schedules', 'Checks', 'Follow-ups', 'Reports', 'Approvals', 'Apps'], visual: 'ops',
    sections: [
      { eyebrow: 'RUN AGAIN', title: 'The best operations work should not depend on someone remembering.', body: 'Turn a repeat process into a routine that runs when it should.', items: [
        { title: 'Scheduled checks', body: 'Run daily, weekly or at the cadence the job needs.' },
        { title: 'Event-driven work', body: 'Start when a webhook, email or supported event arrives.' },
        { title: 'Recurring reports', body: 'Collect changes and prepare a useful summary automatically.' },
      ]},
      { eyebrow: 'CONTROL', title: 'Automation should have boundaries.', body: 'Give agents enough access to help without giving them unlimited authority.', items: [
        { title: 'Scoped tools', body: 'Give each agent only the systems its job requires.' },
        { title: 'Approval gates', body: 'Review consequential writes before they happen.' },
        { title: 'Visible work history', body: 'See what the agent did and what outcome it produced.' },
      ]},
    ], finalTitle: 'Make routine work boring again.', finalBody: 'The point is not more automation. It is fewer things your team has to remember to push forward.'
  },
  'ai-agents-for-procurement': {
    path: '/ai-agents-for-procurement', seoTitle: 'AI Agents for Procurement Work | Decibyl',
    seoDescription: 'AI agents for procurement research, supplier follow-up, document collection, analysis and recurring coordination.',
    eyebrow: 'PROCUREMENT', title: 'AI agents for the work between the big decisions.',
    lead: 'Research suppliers, follow up, collect documents, summarize changes and keep routine coordination moving while your team owns commercial decisions.',
    chips: ['Supplier research', 'Follow-up', 'Documents', 'Analysis', 'Reminders', 'Reports'], visual: 'procurement',
    sections: [
      { eyebrow: 'RESEARCH', title: 'Prepare the context before the conversation.', body: 'Let an agent collect and structure the information your team needs to decide.', items: [
        { title: 'Supplier monitoring', body: 'Track relevant changes, news and signals.' },
        { title: 'Document review', body: 'Extract useful dates, terms and fields from files.' },
        { title: 'Comparison prep', body: 'Organize inputs so a buyer can focus on the trade-off.' },
      ]},
      { eyebrow: 'COORDINATION', title: 'Keep the small follow-ups moving.', body: 'Procurement loses time between decisions as much as during them.', items: [
        { title: 'Chase missing inputs', body: 'Follow up on documents, confirmations and responses.' },
        { title: 'Prepare updates', body: 'Turn scattered progress into a concise status report.' },
        { title: 'Remember decisions', body: 'Keep context around why a choice was made and what changed later.' },
      ]},
    ], finalTitle: 'Use AI for the coordination. Keep people on the commercial judgment.', finalBody: 'That is where the leverage is most useful.'
  },
  'ai-document-analysis': {
    path: '/ai-document-analysis', seoTitle: 'AI Document Analysis & Agent Workflows | Decibyl',
    seoDescription: 'Use AI agents to search, extract, remember and act on information from PDFs, Drive and business documents.',
    eyebrow: 'DOCUMENTS', title: 'Turn documents into working context.',
    lead: 'Let agents read files, extract the details that matter, answer questions and use that information while completing the next job.',
    chips: ['PDFs', 'Drive', 'OCR', 'Extraction', 'Search', 'Memory'], visual: 'docs',
    sections: [
      { eyebrow: 'UNDERSTAND', title: 'Find the part of the file that matters.', body: 'Move from a folder of documents to usable context.', items: [
        { title: 'Search', body: 'Find relevant information across your knowledge.' },
        { title: 'Extract', body: 'Pull structured values, dates and fields.' },
        { title: 'Summarize', body: 'Condense long material into the decision context you need.' },
      ]},
      { eyebrow: 'USE IT', title: 'The document can change what the agent does next.', body: 'Analysis becomes more valuable when it feeds the job.', items: [
        { title: 'During calls', body: 'Use the right policy or account fact while speaking.' },
        { title: 'During workflows', body: 'Pass extracted values into the next step.' },
        { title: 'In memory', body: 'Keep durable facts available for future work.' },
      ]},
    ], finalTitle: 'Do more than chat with a PDF.', finalBody: 'Let the information become part of the work.'
  },
  security: {
    path: '/security', seoTitle: 'Security & Control for AI Agents | Decibyl',
    seoDescription: 'Control agent access, approvals, memory and action visibility with Decibyl security and governance features.',
    eyebrow: 'SECURITY + CONTROL', title: 'Let agents act without giving up control.',
    lead: 'Choose what agents can access, what they can remember and which actions need your approval. Keep the work visible.',
    chips: ['Approvals', 'Access', 'Memory controls', 'Auditability', 'Privacy', 'Human handoff'], visual: 'security',
    sections: [
      { eyebrow: 'PERMISSIONS', title: 'Give the job enough access — not unlimited access.', body: 'The safest useful agent is scoped to what it actually needs.', items: [
        { title: 'Tool access', body: 'Choose which connected systems each agent can use.' },
        { title: 'Approval gates', body: 'Require review before sensitive or consequential writes.' },
        { title: 'Human escalation', body: 'Make handoff part of the design for cases that need judgment.' },
      ]},
      { eyebrow: 'VISIBILITY', title: 'See what the agent knew and did.', body: 'Control improves when actions and context are inspectable.', items: [
        { title: 'Work history', body: 'Review tasks, calls and actions.' },
        { title: 'Memory controls', body: 'Correct useful context and decide what should persist.' },
        { title: 'Outcome records', body: 'Track what the job actually produced.' },
      ]},
    ], finalTitle: 'Useful autonomy needs visible boundaries.', finalBody: 'Give agents room to handle routine work while people keep authority where it matters.'
  },
  pricing: {
    path: '/pricing', seoTitle: 'AI Agent Pricing & Credits | Decibyl',
    seoDescription: 'Explore proposed Decibyl credit-based pricing for AI agents, workflows and voice usage.',
    eyebrow: 'PRICING', title: 'Start with the work. Scale when it proves useful.',
    lead: 'The proposed launch model uses a shared credit balance across AI and workflow usage, with calling and phone costs shown separately where applicable.',
    chips: ['Unlimited agents', 'Shared credits', 'Usage visibility', 'Voice separate', 'BYOK options'], visual: 'pricing',
    sections: [
      { eyebrow: 'PROPOSED LAUNCH PLANS', title: 'Choose the usage that fits.', body: 'Prices are shown before applicable taxes and remain subject to final launch terms.', items: [
        { title: 'Recharge · ₹500', body: '500 credits for occasional use and testing.' },
        { title: 'Starter · ₹999/month', body: '999 credits for regular individual use.' },
        { title: 'Growth · ₹2,999/month', body: '2,999 credits for recurring team workflows.' },
        { title: 'Business · ₹9,999/month', body: '9,999 credits for more active business usage.' },
      ]},
      { eyebrow: 'WHAT USAGE MEANS', title: 'Different jobs use different resources.', body: 'Model, speech, workflow and telephony consumption varies with the job.', items: [
        { title: 'AI and speech', body: 'Model tokens, speech recognition and speech generation depend on actual usage.' },
        { title: 'Workflow execution', body: 'Running work consumes compute based on the steps involved.' },
        { title: 'Calling', body: 'Carrier and number costs remain visible rather than disappearing into a generic plan.' },
      ]},
    ], finalTitle: 'Start with one useful agent.', finalBody: 'Measure what it does before deciding how much capacity you need.'
  },
  impact: {
    path: '/impact', seoTitle: 'AI Agent Impact — Measure Work Saved | Decibyl',
    seoDescription: 'Measure the operational impact of AI agents with time saved, coverage, response time and outcomes.',
    eyebrow: 'IMPACT', title: 'Measure work saved, not AI activity.',
    lead: 'Track the human effort, response time and outcomes that change when an agent takes over repeat work.',
    chips: ['Time saved', 'Coverage', 'Response time', 'Outcomes', 'Baseline', 'ROI'], visual: 'impact',
    sections: [
      { eyebrow: 'START WITH A BASELINE', title: 'Compare against the way the job works today.', body: 'An agent is useful when it changes an operational result, not because it generated more activity.', items: [
        { title: 'Human time', body: 'Estimate the minutes currently spent per task.' },
        { title: 'Coverage', body: 'Measure what share of the work the agent can actually take.' },
        { title: 'Outcome quality', body: 'Track whether the result is better, faster or cheaper.' },
      ]},
    ], finalTitle: 'Give every agent a job and a result to improve.', finalBody: 'That makes the value visible to users, teams and businesses.'
  }
};
