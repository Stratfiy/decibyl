import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { site } from '@/lib/site';
import type { MarketingPage } from '@/data/marketingPages';
import styles from './marketing-landing.module.css';

const scenes: Record<MarketingPage['visual'], { label: string; request: string; steps: [string, string][]; result: string }> = {
  platform: { label: 'ACCOUNT MANAGER', request: 'Check Acme, follow up and update me.', steps: [['Read CRM', 'Latest account activity'], ['Recall context', 'Annual plan · Dana approves'], ['Prepare action', 'Follow-up ready for review']], result: 'Job ready to complete' },
  voice: { label: 'VOICE AGENT', request: 'Answer the call, verify the order and resolve it.', steps: [['Conversation', 'English + Hindi'], ['Use knowledge', 'Order + policy context'], ['Save outcome', 'Resolved · transcript ready']], result: 'Call completed' },
  memory: { label: 'MEMORY', request: 'What should the agent remember for next time?', steps: [['People', 'Dana is the approver'], ['Decision', 'Annual plan preferred'], ['Correction', 'New supplier from August']], result: 'Useful context retained' },
  apps: { label: 'CONNECTED WORK', request: 'Find the account, draft the reply and update the CRM.', steps: [['Read', 'CRM + email'], ['Reason', 'Use account context'], ['Write', 'Waiting for approval']], result: 'Action ready' },
  jobs: { label: 'YOUR JOB', request: 'Research competitors every morning and send what changed.', steps: [['Research', 'Sources checked'], ['Routine', 'Weekdays · 8:00 AM'], ['Deliver', 'WhatsApp summary']], result: 'Agent ready' },
  support: { label: 'SUPPORT', request: 'Help this customer without making them repeat everything.', steps: [['Read history', 'Account + recent issue'], ['Resolve', 'Policy + action'], ['Escalate', 'Human only if needed']], result: 'Case moved forward' },
  ops: { label: 'OPERATIONS', request: 'Run the daily check and only surface exceptions.', steps: [['Check', 'Systems + status'], ['Compare', 'Against expected state'], ['Report', '3 exceptions found']], result: 'Routine finished' },
  procurement: { label: 'PROCUREMENT', request: 'Prepare the supplier update before tomorrow’s review.', steps: [['Research', 'Supplier changes'], ['Documents', 'Dates + terms extracted'], ['Brief', 'Decision context prepared']], result: 'Review brief ready' },
  docs: { label: 'DOCUMENT AGENT', request: 'Read this contract and use the important parts in the next task.', steps: [['Extract', 'Renewal · 12 Nov'], ['Remember', 'Notice period · 60 days'], ['Use', 'Available to agents']], result: 'Working context ready' },
  security: { label: 'CONTROL', request: 'Let the agent work, but ask before external writes.', steps: [['Read tools', 'Allowed'], ['Memory', 'Controlled'], ['External write', 'Approval required']], result: 'Boundaries applied' },
  pricing: { label: 'USAGE', request: 'Start with one useful agent and scale from there.', steps: [['Agent count', 'Not the billing unit'], ['Credits', 'Shared usage balance'], ['Calling', 'Shown separately']], result: 'Pay for useful work' },
  impact: { label: 'OUTCOME', request: 'Did the agent actually save work?', steps: [['Baseline', '12 min per task'], ['Coverage', '68% handled'], ['Outcome', '8.2 hrs/week released']], result: 'Impact measured' },
  n8n: { label: 'DECIBYL + N8N', request: 'Understand the request, then run the right workflow.', steps: [['Decibyl', 'Context + decision'], ['n8n', 'Deterministic execution'], ['Decibyl', 'Report the outcome']], result: 'Workflow completed' },
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
            <p>Decibyl can bring useful context from previous work into the next job—people, decisions, preferences and documents—while keeping corrections and control in your hands.</p>
          </div>
          <div className={styles.memoryStack} aria-label="Examples of remembered context">
            <div><span>PERSON</span><strong>Dana approves final terms</strong></div>
            <div><span>DECISION</span><strong>Use the annual plan</strong></div>
            <div><span>PREFERENCE</span><strong>Keep reports concise</strong></div>
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
            <Link className={styles.darkLink} href="/use-cases">Explore jobs</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function ProductScene({ scene }: { scene: { label: string; request: string; steps: [string, string][]; result: string } }) {
  return (
    <div className={styles.scene} aria-label="Example Decibyl agent workflow">
      <div className={styles.sceneGlow} />
      <div className={styles.scenePanel}>
        <div className={styles.sceneTop}>
          <div><span>{scene.label}</span><strong>Working</strong></div>
          <i aria-hidden="true" />
        </div>
        <div className={styles.request}>{scene.request}</div>
        <div className={styles.steps}>
          {scene.steps.map(([title, detail], i) => (
            <div className={styles.step} key={title}>
              <b>{i + 1}</b>
              <div><strong>{title}</strong><small>{detail}</small></div>
              <em>{i === scene.steps.length - 1 ? 'Ready' : 'Done'}</em>
            </div>
          ))}
        </div>
        <div className={styles.result}><span>RESULT</span><strong>{scene.result}</strong></div>
      </div>
      <div className={`${styles.floatChip} ${styles.floatOne}`}><span>MEMORY</span><strong>Context recalled</strong></div>
      <div className={`${styles.floatChip} ${styles.floatTwo}`}><span>ACTION</span><strong>Approval when needed</strong></div>
      <div className={styles.orb} aria-hidden="true" />
    </div>
  );
}
