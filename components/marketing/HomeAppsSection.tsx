import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeAppsSection() {
  return (
    <Section surface="white" ariaLabel="Connected apps">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">Uses your apps</p>
          <h2 className="t-h2 mt-4">Look things up fast. Ask before changing them.</h2>
          <p className="t-body-lg mt-5 text-slate">Give a bot only the connected tools its job needs. Supported reads can run immediately; consequential writes and sends can wait for your confirmation.</p>
          <div className="mt-6 flex flex-wrap gap-2">{['CRM','Email','Calendar','Drive','Slack','Commerce','Helpdesk','APIs'].map((x)=><span key={x} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </div>
        <div className={styles.darkStage}>
          <div className={styles.appConsole}>
            <div className={styles.requestBar}>
              <small>ONE REQUEST</small>
              <p>“Check Acme and prepare the next step.”</p>
            </div>
            <div className={styles.actionStack}>
              <div className={styles.actionRow}><span className={styles.actionIcon}>C</span><div><strong>Read connected account</strong><span>Latest account context</span></div><em>Done</em></div>
              <div className={styles.actionRow}><span className={styles.actionIcon}>M</span><div><strong>Recall confirmed context</strong><span>Dana approves final terms</span></div><em>Found</em></div>
              <div className={styles.actionRow}><span className={styles.actionIcon}>→</span><div><strong>External write</strong><span>Waiting for your approval</span></div><em>Review</em></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
