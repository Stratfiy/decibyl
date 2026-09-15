import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeTeamSection() {
  return (
    <Section surface="canvas" ariaLabel="Agent teamwork">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Agents can work together</p>
          <h2 className="t-h2 mt-4">Bigger jobs can use specialists.</h2>
          <p className="t-body-lg mt-5 text-slate">One agent can hand part of a job to another while you keep the work visible.</p>
        </div>
        <div className={styles.darkStage}>
          <div className={styles.teamFlow}>
            <div className={styles.teamPrompt}>“Prepare me for tomorrow’s sales meeting.”</div>
            <div className={styles.teamAgents}>
              <div className={styles.teamAgent}><small>RESEARCHER</small><strong>Finds account updates</strong></div>
              <div className={styles.teamAgent}><small>ACCOUNT AGENT</small><strong>Pulls relationship history</strong></div>
              <div className={styles.teamAgent}><small>SALES AGENT</small><strong>Builds the meeting brief</strong></div>
            </div>
            <div className={styles.teamOutput}>Finished briefing → ready for you</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
