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
  visual: 'platform' | 'voice' | 'memory' | 'apps' | 'jobs' | 'support' | 'ops' | 'procurement' | 'docs' | 'impact' | 'n8n';
  sections: MarketingSection[];
  finalTitle: string;
  finalBody: string;
};

export const marketingPages: Record<string, MarketingPage> = {
  platform: {
    path: '/platform',
    seoTitle: 'Decibyl Platform — AI That Gets Work Done',
    seoDescription: 'Decibyl coordinates bots that work across messages, voice, apps, documents, tasks, routines and memory, with approval before consequential actions.',
    eyebrow: 'THE PRODUCT',
    title: 'Tell Decibyl what needs doing.',
    lead: 'Decibyl is the manager for your AI team. Add bots for specific jobs, give them the apps and knowledge they need, and see the work, exceptions and outcomes in one place.',
    chips: ['Bots', 'Tasks', 'Apps', 'Knowledge', 'Routines', 'Voice'],
    visual: 'platform',
    sections: [
      {
        eyebrow: 'YOUR AI TEAM',
        title: 'Give each bot a job.',
        body: 'Start from a ready role or describe your own. The live marketplace currently includes practical jobs such as front desk, lead qualification, order confirmation, payment reminders, reservations, admissions, compliance reminders and internal knowledge.',
        items: [
          { title: 'Find a bot', body: 'Start from a live job template instead of a blank configuration screen.' },
          { title: 'Build your own', body: 'Describe the job in plain language, attach a brief if useful, and review the proposed setup before it changes anything.' },
          { title: 'Give it the right access', body: 'Choose the knowledge, apps, channels and tools that job actually needs.' },
        ],
      },
      {
        eyebrow: 'THE MANAGER',
        title: 'Decibyl keeps the team together.',
        body: 'On Home, Decibyl knows the workspace, confirmed facts, team activity and connected tools. Ask it for status, give it a job, or address a bot directly with its @handle.',
        items: [
          { title: 'Ask the workspace', body: 'See what bots are doing, what needs attention and what changed recently.' },
          { title: 'Delegate to a bot', body: 'Decibyl can hand a job to the bot that owns it instead of making you navigate every configuration screen.' },
          { title: 'People and bots share tasks', body: 'Assign work to a bot or teammate and follow it through To do, Doing, Waiting and Done.' },
        ],
      },
      {
        eyebrow: 'RUN THE WORK',
        title: 'Now, later, or when something happens.',
        body: 'Bots can work when you ask, respond through connected channels, run a tested routine on a schedule or act when an email/webhook trigger matches.',
        items: [
          { title: 'Routines', body: 'Schedule recurring work after the bot has passed a real test.' },
          { title: 'Triggers', body: 'Compile an email or webhook trigger from plain language, test it, then pause or resume it when needed.' },
          { title: 'Bots can hand work off', body: 'Inside a shared channel, one bot can @mention another specialist. Handoffs are deliberately capped to prevent loops.' },
        ],
      },
      {
        eyebrow: 'SEE THE RESULT',
        title: 'Work should leave evidence.',
        body: 'The product tracks runs, tasks, calls, outcomes, failures and recent activity so you can see whether the job moved forward instead of counting AI messages.',
        items: [
          { title: 'Activity and attention', body: 'See bots as working, idle, paused or needing attention.' },
          { title: 'Outcomes', body: 'Track successful outside-app actions and compare bot versions instead of treating every run as success.' },
          { title: 'Review and analytics', body: 'Inspect calls, recordings, transcripts, dispositions, failures and aggregate activity.' },
        ],
      },
    ],
    finalTitle: 'Start with one job you already repeat.',
    finalBody: 'Add a bot, give it only the access it needs, and let the work prove where Decibyl should go next.',
  },

  'voice-agents': {
    path: '/voice-agents',
    seoTitle: 'AI Voice Bots — Inbound, Outbound & Multilingual Calls | Decibyl',
    seoDescription: 'Decibyl voice bots handle inbound and outbound calls, multilingual and code-mixed conversations, transfers, DTMF, campaigns, recordings, transcripts and outcomes.',
    eyebrow: 'VOICE',
    title: 'When the job needs a conversation, your bot can call.',
    lead: 'Use voice for inbound or outbound work, including major Indian languages and code-mixed conversations. Bots can use knowledge during the call, collect keypad input, transfer when configured and save what happened.',
    chips: ['Inbound', 'Outbound', 'Indian languages', 'DTMF', 'Transfers', 'Campaigns'],
    visual: 'voice',
    sections: [
      {
        eyebrow: 'ON THE CALL',
        title: 'A call can use the same context as the rest of the job.',
        body: 'Voice is a channel for the bot, not a separate product brain.',
        items: [
          { title: 'Knowledge during calls', body: 'Answer from the bot’s approved documents and business context while the conversation is happening.' },
          { title: 'Keypad input', body: 'Collect DTMF/keypad responses for flows that need structured input.' },
          { title: 'Human transfer', body: 'Configure transfer rules so a live call can move to a person when the job requires it.' },
        ],
      },
      {
        eyebrow: 'OUTBOUND',
        title: 'Campaigns with operational controls.',
        body: 'Upload contacts, schedule calling, retry busy/no-answer cases and stop bad runs before they burn through a list.',
        items: [
          { title: 'Schedules and retries', body: 'Choose calling windows, time zones and retry behaviour for busy, unanswered and voicemail cases.' },
          { title: 'Consent controls', body: 'Campaign setup includes consent attestation and suppression controls.' },
          { title: 'Circuit breaker', body: 'A failure-rate spike can pause a campaign automatically instead of continuing blindly.' },
        ],
      },
      {
        eyebrow: 'AFTER THE CALL',
        title: 'The conversation becomes usable work.',
        body: 'Calls leave a record your team can inspect and your systems can use.',
        items: [
          { title: 'Recordings and transcripts', body: 'Review the conversation through protected media links and transcripts.' },
          { title: 'Structured outcomes', body: 'Capture dispositions, extracted fields and the result of the call.' },
          { title: 'Review and analytics', body: 'Inspect problematic calls, daily reports, durations, outcomes and campaign performance.' },
        ],
      },
    ],
    finalTitle: 'Use voice when speaking is the fastest way to finish the job.',
    finalBody: 'Voice starts on Business. The same bot can still use messages, knowledge, tools, tasks and routines around the call.',
  },

  knowledge: {
    path: '/knowledge',
    seoTitle: 'Knowledge & Memory for AI Bots | Decibyl',
    seoDescription: 'Give Decibyl bots documents and confirmed workspace memory. Extract key fields, recall decisions, correct facts, export memory and control what persists.',
    eyebrow: 'KNOWLEDGE + MEMORY',
    title: 'It remembers what matters — and lets you correct it.',
    lead: 'Decibyl separates durable confirmed facts from things it only inferred. Give bots documents and working context, confirm what should stick, and change or delete it when reality changes.',
    chips: ['Documents', 'Confirmed facts', 'Decisions', 'People', 'Corrections', 'Export'],
    visual: 'memory',
    sections: [
      {
        eyebrow: 'MEMORY',
        title: 'Useful context can compound instead of disappearing.',
        body: 'Memory is shared at the workspace level where appropriate, while bot-specific context can stay scoped to one job.',
        items: [
          { title: 'Confirmed vs inferred', body: 'User-entered facts are confirmed; learned facts remain reviewable until you confirm them.' },
          { title: 'Decisions and people', body: 'Recall decisions, reasons, people, suppliers, promises and dates from previous work.' },
          { title: 'Correct, export or forget', body: 'Confirm or reject facts, export memory as an Obsidian vault, or explicitly erase it.' },
        ],
      },
      {
        eyebrow: 'DOCUMENTS',
        title: 'Documents become working context.',
        body: 'Knowledge is not limited to a Q&A box. Uploaded files can feed answers, extraction, reminders and later bot work.',
        items: [
          { title: 'Upload and search', body: 'Store plan-sized knowledge, then let bots retrieve the relevant passages when they work.' },
          { title: 'OCR and extraction', body: 'Read scanned documents and extract fields such as dates and structured values for confirmation.' },
          { title: 'Drive and reminders', body: 'Find/send connected Google Drive files, file documents to Drive and create reminders around extracted expiry dates.' },
        ],
      },
    ],
    finalTitle: 'The next job should not start from zero.',
    finalBody: 'Keep the context that helps, keep inferred facts reviewable, and stay in control of what Decibyl remembers.',
  },

  integrations: {
    path: '/integrations',
    seoTitle: 'Decibyl Integrations — Connect Apps, APIs & Tools',
    seoDescription: 'Connect Decibyl bots to business apps, APIs and tools. Read actions can run directly; consequential writes can wait for approval.',
    eyebrow: 'APPS + TOOLS',
    title: 'Let bots work in the systems you already use.',
    lead: 'Connect the apps your work already depends on. Decibyl exposes supported actions to the right bot, keeps account selection explicit, and puts writes behind approval where needed.',
    chips: ['CRM', 'Email', 'Calendar', 'Drive', 'Commerce', 'APIs'],
    visual: 'apps',
    sections: [
      {
        eyebrow: 'CONNECTED APPS',
        title: 'Useful integrations, without pretending every catalogue entry is one click.',
        body: 'The catalogue spans many providers, but setup differs: some use managed OAuth, some need no auth and others require your own provider credentials or approval.',
        items: [
          { title: 'Work apps', body: 'Supported catalogue entries include Google Workspace, Slack, Notion, Airtable, Calendly, Outlook, Teams and more.' },
          { title: 'Systems of record', body: 'CRM, accounting, commerce, logistics, payment and helpdesk tools are treated as higher-value system-of-record actions.' },
          { title: 'Explicit accounts', body: 'When several accounts are connected, the bot uses the account you selected rather than guessing.' },
        ],
      },
      {
        eyebrow: 'READ + WRITE',
        title: 'Look things up quickly. Slow down before changing them.',
        body: 'The manager and bots use different safety paths based on the action.',
        items: [
          { title: 'Reads can run', body: 'Supported read-only lookups can execute immediately to bring context into the job.' },
          { title: 'Writes ask first', body: 'Writes and unknown consequential actions default to a confirmation card before execution.' },
          { title: 'Custom tools and APIs', body: 'Bots can also use configured HTTP/API tools and workflow actions beyond the managed app catalogue.' },
        ],
      },
    ],
    finalTitle: 'Keep the stack you already have.',
    finalBody: 'Decibyl should add a working bot layer to your tools, not force a migration just to automate a job.',
  },

  'integrations/n8n': {
    path: '/integrations/n8n',
    seoTitle: 'Decibyl + n8n — Put Bots in Front of Existing Workflows',
    seoDescription: 'Use Decibyl bots for conversation, context and delegation, then call existing n8n workflows through APIs or webhooks for deterministic automation.',
    eyebrow: 'DECIBYL + N8N',
    title: 'Keep the workflows that already work.',
    lead: 'Use Decibyl for the human-shaped part of the job—conversation, context, memory and delegation—and connect to n8n through APIs or webhooks when a deterministic workflow should take over.',
    chips: ['Bots', 'n8n', 'Webhooks', 'APIs', 'Memory', 'Voice'],
    visual: 'n8n',
    sections: [
      {
        eyebrow: 'ONE JOB, TWO LAYERS',
        title: 'Do not rebuild deterministic automation as an AI prompt.',
        body: 'Let the bot decide what needs doing; let the workflow execute the steps that should always happen the same way.',
        items: [
          { title: 'Decibyl handles context', body: 'Conversation, workspace facts, documents, approvals and which bot owns the next step.' },
          { title: 'n8n handles the fixed flow', body: 'Keep deterministic app-to-app sequences where they already run reliably.' },
          { title: 'Webhooks connect the two', body: 'Use inbound triggers and configured API actions to pass work between the bot and the workflow.' },
        ],
      },
    ],
    finalTitle: 'Add bots without throwing away your automation.',
    finalBody: 'Use AI where judgment and conversation help; keep deterministic workflows deterministic.',
  },

  'use-cases': {
    path: '/use-cases',
    seoTitle: 'AI Bot Use Cases — Find a Bot for a Real Job | Decibyl',
    seoDescription: 'Find Decibyl bots for front desk, lead qualification, order confirmation, payment reminders, reservations, admissions, compliance reminders and internal knowledge, or build your own.',
    eyebrow: 'FIND A BOT',
    title: 'Start with a job, not a feature list.',
    lead: 'The live marketplace contains practical bots you can add to your team now. If your job is different, describe it and build your own.',
    chips: ['Front desk', 'Lead qualifier', 'Order confirmation', 'Payments', 'Reservations', 'Knowledge'],
    visual: 'jobs',
    sections: [
      {
        eyebrow: 'LIVE IN THE MARKETPLACE',
        title: 'Eight practical starting points.',
        body: 'These are the currently listed job packs in the product—not a roadmap disguised as inventory.',
        items: [
          { title: 'Customer-facing', body: 'Front desk clinic, reservations desk, admissions desk and lead qualifier.' },
          { title: 'Follow-up work', body: 'Order confirmation, payment reminder and compliance reminder.' },
          { title: 'Internal knowledge', body: 'A bot that answers staff questions from the workspace knowledge base.' },
        ],
      },
      {
        eyebrow: 'BUILD YOUR OWN',
        title: 'Your job does not have to fit a template.',
        body: 'Describe the responsibility, attach a brief if useful, choose the channels/tools it needs and review the configuration before publishing.',
        items: [
          { title: 'Plain-language setup', body: 'Start from what the bot should own, not model/provider terminology.' },
          { title: 'Test before publish', body: 'Test bots in-app before putting them on a real channel or routine.' },
          { title: 'Usage, not adding a bot', body: 'Adding a marketplace bot itself costs zero; the work it runs consumes your shared credits.' },
        ],
      },
    ],
    finalTitle: 'What job would you like off your plate?',
    finalBody: 'Find a bot if the role already exists. Build your own if it does not.',
  },

  'ai-agents-for-work': {
    path: '/ai-agents-for-work',
    seoTitle: 'AI Bots for Work — Tasks, Messages, Knowledge & Routines | Decibyl',
    seoDescription: 'Use Decibyl bots for recurring tasks, messages, knowledge, connected apps, follow-ups and scheduled work, with a shared task board for people and bots.',
    eyebrow: 'AI FOR WORK',
    title: 'Give repeat work an owner.',
    lead: 'Use a bot for the jobs that keep coming back. Assign work through Tasks, let it run on a channel or routine, and bring a person back in when judgment matters.',
    chips: ['Tasks', 'Messages', 'Routines', 'Knowledge', 'Apps', 'Approvals'],
    visual: 'jobs',
    sections: [
      {
        eyebrow: 'TASKS',
        title: 'People and bots can work from the same board.',
        body: 'A task can belong to a teammate or a bot, and a bot task becomes a real run rather than a decorative checklist item.',
        items: [
          { title: 'Assign a bot', body: 'Put a job on the board with the bot’s @handle and let it return the result to the task.' },
          { title: 'Track state', body: 'Follow work through To do, Doing, Waiting and Done.' },
          { title: 'Hand work off', body: 'Bots can hand a task to another specialist within a deliberately bounded handoff depth.' },
        ],
      },
      {
        eyebrow: 'REPEAT WORK',
        title: 'Run it when it needs to run.',
        body: 'Not every job should wait for you to remember it.',
        items: [
          { title: 'Messages', body: 'Bots can respond through connected chat, WhatsApp, email and Slack paths.' },
          { title: 'Routines', body: 'Schedule tested repeat jobs.' },
          { title: 'Triggers', body: 'Start work when an email or webhook event matches your rules.' },
        ],
      },
    ],
    finalTitle: 'Start with the task you are tired of repeating.',
    finalBody: 'Give it a clear owner, a clear result and only the tools it needs.',
  },

  'ai-agents-for-customer-support': {
    path: '/ai-agents-for-customer-support',
    seoTitle: 'AI Bots for Customer Support | Decibyl',
    seoDescription: 'Decibyl support bots use knowledge and connected systems across messages or voice, with approval for consequential writes and human handoff when configured.',
    eyebrow: 'CUSTOMER SUPPORT',
    title: 'Support that can look things up and move the case forward.',
    lead: 'Give a support bot the right knowledge and connected tools. It can answer through messaging or voice, use account context and ask before consequential changes.',
    chips: ['Knowledge', 'CRM', 'Messaging', 'Voice', 'Approvals', 'Handoff'],
    visual: 'support',
    sections: [
      {
        eyebrow: 'CONTEXT FIRST',
        title: 'Do not make the customer supply information your systems already know.',
        body: 'Bots can use approved knowledge and connected app reads before they respond.',
        items: [
          { title: 'Knowledge', body: 'Use your support documents and policies during the conversation.' },
          { title: 'Account context', body: 'Read supported customer/account data from the connected system chosen for the bot.' },
          { title: 'Channel history', body: 'Use the thread context when a bot is working inside a shared channel.' },
        ],
      },
      {
        eyebrow: 'CONTROL',
        title: 'Answers can be automatic. Consequential writes do not have to be.',
        body: 'The product distinguishes reads from writes so your support automation can be useful without becoming reckless.',
        items: [
          { title: 'Read actions', body: 'Supported read-only tool actions can run without an approval round-trip.' },
          { title: 'Write approvals', body: 'Consequential writes default to a confirmation step before execution.' },
          { title: 'Human escalation', body: 'Configure call transfer or move the work to a person/task when the case needs judgment.' },
        ],
      },
    ],
    finalTitle: 'Automate the routine part of support, not accountability.',
    finalBody: 'Let bots resolve what is safe and repeatable, while people own exceptions and judgment.',
  },

  'ai-agents-for-operations': {
    path: '/ai-agents-for-operations',
    seoTitle: 'AI Bots for Operations, Routines & Triggers | Decibyl',
    seoDescription: 'Decibyl operations bots run tested routines, respond to email/webhook triggers, use connected tools, share tasks with people and surface failures and outcomes.',
    eyebrow: 'OPERATIONS',
    title: 'Put repeat operations on a schedule or trigger.',
    lead: 'Test the bot once, then let recurring work run on time or when an event arrives. Tasks, approvals and activity keep people close to exceptions.',
    chips: ['Routines', 'Triggers', 'Tasks', 'Apps', 'Approvals', 'Outcomes'],
    visual: 'ops',
    sections: [
      {
        eyebrow: 'AUTOMATIC WORK',
        title: 'A routine has to prove it works before it can run unattended.',
        body: 'Decibyl requires a successful bot test before a routine is armed, because scheduled work uses real tools and real access.',
        items: [
          { title: 'Routines', body: 'Schedule recurring bot work at the cadence the job requires.' },
          { title: 'Email triggers', body: 'Turn a matching incoming email into a bot run.' },
          { title: 'Webhook triggers', body: 'Receive external events through a signed webhook with filters and a rotatable secret.' },
        ],
      },
      {
        eyebrow: 'EXCEPTIONS',
        title: 'Automatic does not mean invisible.',
        body: 'Filtered events can be ignored without a run or charge; failures and activity remain visible to the team.',
        items: [
          { title: 'Pause and resume', body: 'Stop a routine or trigger without deleting the setup.' },
          { title: 'Task board', body: 'Put human follow-up next to bot work instead of hiding it in another tool.' },
          { title: 'Outcome tracking', body: 'Track whether a bot version produced successful outside-app actions.' },
        ],
      },
    ],
    finalTitle: 'Automate the repeatable path. Surface the exception.',
    finalBody: 'That is a better operations model than asking people to watch an automation dashboard all day.',
  },

  'ai-agents-for-procurement': {
    path: '/ai-agents-for-procurement',
    seoTitle: 'AI Bots for Procurement & Supplier Work | Decibyl',
    seoDescription: 'Use Decibyl bots with supplier emails, documents, connected systems, reminders and task handoffs for repeat procurement work while keeping approvals with people.',
    eyebrow: 'PROCUREMENT',
    title: 'Give the repeat supplier work to a bot. Keep the decision with people.',
    lead: 'Use Decibyl for document context, supplier follow-ups, connected-system lookups, recurring reminders and task handoffs. Keep approvals and commercial judgment where they belong.',
    chips: ['Documents', 'Email', 'Tasks', 'Reminders', 'Apps', 'Approvals'],
    visual: 'procurement',
    sections: [
      {
        eyebrow: 'SUPPLIER CONTEXT',
        title: 'Bring the record into the job.',
        body: 'Procurement work often lives across email, files, decisions and systems of record. A bot can bring the supported pieces together before a person has to act.',
        items: [
          { title: 'Documents', body: 'Extract dates, terms and structured fields from uploaded supplier documents for confirmation.' },
          { title: 'Connected systems', body: 'Use configured ERP, accounting, CRM or other system-of-record tools where your account has access.' },
          { title: 'Decision memory', body: 'Recall confirmed supplier facts, decisions, reasons and promises from earlier work.' },
        ],
      },
      {
        eyebrow: 'FOLLOW-THROUGH',
        title: 'Do not let the process depend on somebody remembering the next step.',
        body: 'Use tasks, routines and document-derived reminders to keep repeat coordination moving.',
        items: [
          { title: 'Tasks', body: 'Assign a bot or teammate the next action and keep the result on the board.' },
          { title: 'Expiry reminders', body: 'Confirmed expiry dates extracted from documents can create reminder tasks ahead of the date.' },
          { title: 'Approval before writes', body: 'Keep consequential external changes behind a human confirmation step.' },
        ],
      },
    ],
    finalTitle: 'Use AI for the coordination burden, not to hide the commercial decision.',
    finalBody: 'Start with one repeat supplier workflow and keep the evidence and approvals visible.',
  },

  'ai-document-analysis': {
    path: '/ai-document-analysis',
    seoTitle: 'AI Document Analysis, Knowledge & OCR | Decibyl',
    seoDescription: 'Upload documents to Decibyl for knowledge retrieval, OCR, field extraction, confirmed memory, expiry reminders and connected Google Drive workflows.',
    eyebrow: 'DOCUMENTS',
    title: 'Turn documents into context bots can actually use.',
    lead: 'Upload files into the knowledge base, read scanned documents with OCR, extract important fields for confirmation and make the approved facts available to later work.',
    chips: ['Knowledge', 'OCR', 'Extraction', 'Drive', 'Reminders', 'Memory'],
    visual: 'docs',
    sections: [
      {
        eyebrow: 'FROM FILE TO WORK',
        title: 'A document can do more than answer a question.',
        body: 'The same ingestion path can support retrieval, extraction and later bot work.',
        items: [
          { title: 'Knowledge retrieval', body: 'Chunk and embed supported files so bots can retrieve relevant passages when answering or working.' },
          { title: 'OCR', body: 'Read scanned pages where ordinary text extraction is not enough.' },
          { title: 'Structured extraction', body: 'Pull important dates and fields, then ask for confirmation before turning extracted information into settled memory.' },
        ],
      },
      {
        eyebrow: 'FOLLOW-THROUGH',
        title: 'Let the document create the next useful action.',
        body: 'Confirmed information can feed reminders, Drive workflows and future bot context.',
        items: [
          { title: 'Expiry reminders', body: 'Create reminders ahead of confirmed document expiry dates.' },
          { title: 'Google Drive', body: 'Find and send connected Drive files or file incoming documents to Drive where configured.' },
          { title: 'Identity-document safety', body: 'Sensitive identity documents use explicit approval and verified-owner destination checks before sending.' },
        ],
      },
    ],
    finalTitle: 'A file should become useful context, not another place to search.',
    finalBody: 'Upload it once, confirm what matters and let the right bots use it later.',
  },

  impact: {
    path: '/impact',
    seoTitle: 'AI Bot Outcomes & Operational Impact | Decibyl',
    seoDescription: 'Track Decibyl bot activity, outcomes, failures, calls and version performance so you can measure whether automated work actually moved forward.',
    eyebrow: 'OUTCOMES',
    title: 'Measure completed work, not AI activity.',
    lead: 'A run is not automatically a win. Decibyl records bot activity, calls, outcomes and failures so you can see what happened and whether a change improved the result.',
    chips: ['Outcomes', 'Runs', 'Failures', 'Calls', 'Versions', 'Analytics'],
    visual: 'impact',
    sections: [
      {
        eyebrow: 'EVIDENCE',
        title: 'See what happened after the prompt.',
        body: 'The useful question is whether the bot moved something outside the chat forward.',
        items: [
          { title: 'Outcome rate', body: 'Track successful outside-app actions by published bot version.' },
          { title: 'Failures', body: 'Surface missing or failing app requirements and recent run failures.' },
          { title: 'Call reports', body: 'Review dispositions, duration distributions and detailed CSV exports for voice work.' },
        ],
      },
      {
        eyebrow: 'TEAM VIEW',
        title: 'Know where attention is needed.',
        body: 'The team view combines bot status with recent activity so exceptions can rise above routine work.',
        items: [
          { title: 'Working / idle', body: 'See which bots are currently active versus waiting.' },
          { title: 'Attention', body: 'Bring failures and unresolved work to the front instead of burying them in logs.' },
          { title: 'Recent result', body: 'See the latest action or outcome without opening every run individually.' },
        ],
      },
    ],
    finalTitle: 'Give every bot a job and a result worth checking.',
    finalBody: 'When the outcome is visible, you can improve the bot instead of guessing whether automation helped.',
  },
};
