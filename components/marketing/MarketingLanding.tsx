import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { site } from '@/lib/site';
import type { MarketingPage } from '@/data/marketingPages';
import styles from './marketing-landing.module.css';

type Scene = { label: string; request: string; owner?: string; steps: [string, string][]; result: string };

const scenes: Record<MarketingPage['visual'], Scene> = {
  platform: {
    label: 'DECIBYL',
    request: 'Check what needs attention and get the right bot on it.',
    owner: '@operations',
    steps: [['Read workspace', 'Tasks + confirmed context'], ['Delegate', 'Operations bot owns the job'], ['Review result', 'Exception ready for you']],
    result: 'Work moved forward',
  },
  voice: {
    label: 'VOICE BOT',
    request: 'Answer the call, check the order and hand off if needed.',
    owner: '@order-desk',
    steps: [['Conversation', 'Multilingual + code-mixed'], ['Use context', 'Order + approved knowledge'], ['Save outcome', 'Transcript + result']],
    result: 'Call completed',
  },
  memory: {
    label: 'MEMORY',
    request: 'What should Decibyl carry into the next job?',
    steps: [['Confirmed fact', 'Dana approves final terms'], ['Decision', 'Annual plan chosen'], ['Correction', 'Supplier changed in August']],
    result: 'Context ready for reuse',
  },
  apps: {
    label: 'CONNECTED WORK',
    request: 'Find the account and prepare the next action.',
    owner: '@account-desk',
    steps: [['Read', 'Connected account context'], ['Prepare', 'Action drafted'], ['Write', 'Waiting for approval']],
    result: 'Ready for confirmation',
  },
  jobs: {
    label: 'BOT TEAM',
    request: 'Give this repeat job an owner.',
    steps: [['Find a bot', 'Choose a live job pack'], ['Give access', 'Only the tools it needs'], ['Test', 'Publish when it works']],
    result: 'Bot ready for the job',
  },
  support: {
    label: 'SUPPORT BOT',
    request: 'Resolve this without making the customer repeat everything.',
    owner: '@support',
    steps: [['Read context', 'History + knowledge'], ['Resolve', 'Safe action prepared'], ['Escalate', 'Person only when needed']],
    result: 'Case moved forward',
  },
  ops: {
    label: 'ROUTINE',
    request: 'Run the check automatically and surface only the exception.',
    owner: '@operations',
    steps: [['Trigger', 'Schedule or event'], ['Run bot', 'Real tools + task context'], ['Surface', 'Exception needs attention']],
    result: 'Routine finished',
  },
  procurement: {
    label: 'PROCUREMENT BOT',
    request: 'Prepare the supplier follow-up before the review.',
    owner: '@supplier-desk',
    steps: [['Documents', 'Terms + dates extracted'], ['Recall', 'Confirmed supplier context'], ['Task', 'Follow-up ready']],
    result: 'Review context prepared',
  },
  docs: {
    label: 'DOCUMENT WORK',
    request: 'Read this file and make the important parts useful later.',
    steps: [['Read', 'Text or OCR'], ['Confirm', 'Dates + fields reviewed'], ['Use', 'Knowledge + reminders']],
    result: 'Working context created',
  },
  impact: {
    label: 'OUTCOMES',
    request: 'Did the bot actually move the job forward?',
    steps: [['Run', 'Work completed'], ['Outcome', 'Outside-app result recorded'], ['Compare', 'Version + failures visible']],
    result: 'Result is inspectable',
  },
  n8n: {
    label: 'DECIBYL + N8N',
    request: 'Understand the request, then hand the fixed steps to the workflow.',
    steps: [['Decibyl', 'Context + delegation'], ['n8n', 'Deterministic execution'], ['Bot', 'Continue with the outcome']],
    result: 'Workflow completed',
  },
};

export function MarketingLanding({ page }: { page: MarketingPage }) {
  const scene = scenes[page.visual];
  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{page.eyebrow}</p>
            <h1 className={styles.title}>{page.title}</h1>
            <p className={styles.lead}>{page.lead}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={site.external.signup}>Get started <span>→</span></a>
              <Link className={styles.secondary} href="/how-it-works">How it works</Link>
            </div>
            <div className={styles.chips}>{page.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
          <ProductScene scene={scene} />
        </Container>
      </section>

      {page.sections.map((section, index) => (
        <section key={section.title} className={`${styles.section} ${index % 2 ? styles.soft : ''}`}>
          <Container>
            <div className={styles.sectionHead}>
              <div>
                {section.eyebrow ? <p className={styles.eyebrow}>{section.eyebrow}</p> : null}
                <h2>{section.title}</h2>
              </div>
              <p>{section.body}</p>
            </div>
            <div className={styles.cards} data-count={section.items.length}>
              {section.items.map((item, itemIndex) => (
                <article className={styles.card} key={item.title}>
                  <div className={styles.cardIndex}>{String(itemIndex + 1).padStart(2, '0')}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className={styles.memoryBand}>
        <Container className={styles.memoryGrid}>
          <div>
            <p className={styles.darkEyebrow}>CONTEXT THAT COMPOUNDS</p>
            <h2>Gets smarter as it works.</h2>
            <p>Decibyl can carry confirmed facts, decisions, people and useful document context into later work. Learned facts stay reviewable until you confirm them, and you can correct, export or delete memory.</p>
          </div>
          <div className={styles.memoryStack} aria-label="Examples of confirmed workspace memory">
            <div><span>CONFIRMED</span><strong>Dana approves final terms</strong></div>
            <div><span>DECISION</span><strong>Annual plan chosen</strong></div>
            <div><span>CORRECTION</span><strong>Supplier changed in August</strong></div>
          </div>
        </Container>
      </section>

      <section className={styles.finalCta}>
        <Container className={styles.finalGrid}>
          <div>
            <p className={styles.darkEyebrow}>START WITH SOMETHING REAL</p>
            <h2>{page.finalTitle}</h2>
            <p>{page.finalBody}</p>
          </div>
          <div className={styles.finalActions}>
            <a className={styles.lightButton} href={site.external.signup}>Get started <span>→</span></a>
            <Link className={styles.darkLink} href="/use-cases">Find a bot</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function ProductScene({ scene }: { scene: Scene }) {
  return (
    <div className={styles.scene} aria-label="Example Decibyl work flow">
      <div className={styles.sceneGlow} />
      <div className={styles.scenePanel}>
        <div className={styles.sceneTop}>
          <div><span>{scene.label}</span><strong>{scene.owner ?? 'Working'}</strong></div>
          <i aria-hidden="true" />
        </div>
        <div className={styles.request}>{scene.request}</div>
        <div className={styles.steps}>
          {scene.steps.map(([title, detail], i) => (
            <div className={styles.step} key={`${title}-${i}`}>
              <b>{i + 1}</b>
              <div><strong>{title}</strong><small>{detail}</small></div>
              <em>{i === scene.steps.length - 1 ? 'Ready' : 'Done'}</em>
            </div>
          ))}
        </div>
        <div className={styles.result}><span>RESULT</span><strong>{scene.result}</strong></div>
      </div>
      <div className={`${styles.floatChip} ${styles.floatOne}`}><span>MEMORY</span><strong>Confirmed context</strong></div>
      <div className={`${styles.floatChip} ${styles.floatTwo}`}><span>CONTROL</span><strong>Writes ask first</strong></div>
      <div className={styles.orb} aria-hidden="true" />
    </div>
  );
}
