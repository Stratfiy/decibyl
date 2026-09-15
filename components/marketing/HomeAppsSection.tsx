import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeAppsSection() {
  return (
    <Section surface="white" ariaLabel="Connected apps">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Uses your apps</p>
          <h2 className="t-h2 mt-4">It doesn’t stop at an answer.</h2>
          <p className="t-body-lg mt-5 text-slate">Agents can read the tools you already use, gather context, use workflows and ask before important actions.</p>
          <div className="mt-6 flex flex-wrap gap-2">{['CRM','Calendar','Email','Drive','WhatsApp','APIs','Webhooks'].map((x)=><span key={x} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </div>
        <div className={styles.darkStage}>
          <div className={styles.appConsole}>
            <div className={styles.requestBar}>
              <small>ONE REQUEST</small>
              <p>“Check Acme, follow up and update me.”</p>
            </div>
            <div className={styles.actionStack}>
              <div className={styles.actionRow}><span className={styles.actionIcon}>C</span><div><strong>Read CRM</strong><span>Latest deal + activity</span></div><em>Done</em></div>
              <div className={styles.actionRow}><span className={styles.actionIcon}>M</span><div><strong>Recall memory</strong><span>Dana approves annual plans</span></div><em>Found</em></div>
              <div className={styles.actionRow}><span className={styles.actionIcon}>→</span><div><strong>Send follow-up</strong><span>Waiting for your approval</span></div><em>Review</em></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
