import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeRoutinesSection() {
  return (
    <Section surface="white" ariaLabel="Routines and triggers">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">Runs when work shows up</p>
          <h2 className="t-h2 mt-4">Schedule it, or trigger it from an event.</h2>
          <p className="t-body-lg mt-5 text-slate">A routine has to pass a real bot test before it can run unattended. Email and webhook triggers can also start work when their rules match.</p>
        </div>
        <div className={`${styles.stage} ${styles.routineStack}`}>
          <div className={styles.routineCard}><span className={styles.routineDot} /><div><strong>Every morning</strong><p>Review open work → summarize exceptions → send the update</p></div></div>
          <div className={styles.routineCard}><span className={styles.routineDot} /><div><strong>When an email matches</strong><p>Read the message → run the bot → add the result to the task</p></div></div>
          <div className={styles.routineCard}><span className={styles.routineDot} /><div><strong>When a webhook fires</strong><p>Check the event → apply filters → start the configured job</p></div></div>
        </div>
      </div>
    </Section>
  );
}
