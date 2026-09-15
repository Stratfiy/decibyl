import Link from 'next/link';
import styles from './home-hero.module.css';

const jobs = ['Voice', 'WhatsApp', 'Email', 'Apps', 'Documents', 'Routines', 'Memory', 'Multi-agent'];

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> AI agents that do the work
          </p>
          <h1 id="home-heading" className={styles.title}>
            AI that gets
            <span className={styles.accentLine}>work done.</span>
          </h1>
          <p className={styles.lead}>
            Give Decibyl a job. Your agents can talk, remember, use your apps, work across channels,
            run on their own and take action — with you in control when it matters.
          </p>
          <div className={styles.actions}>
            <Link href="https://app.decibyl.ai" className={styles.primaryAction}>
              Get started free <span aria-hidden="true">→</span>
            </Link>
            <Link href="/how-it-works" className={styles.secondaryAction}>
              Explore everything it can do
            </Link>
          </div>
          <div className={styles.jobChips} aria-label="Decibyl capabilities">
            {jobs.map((job) => <span key={job}>{job}</span>)}
          </div>
          <p className={styles.memoryLine}>
            <strong>Gets smarter as it works.</strong> Decibyl can remember useful context, decisions,
            people, preferences and documents so your agents do not start from zero every time.
          </p>
        </div>

        <div className={styles.demo} aria-label="Decibyl agent completing work">
          <div className={styles.workCard}>
            <div className={styles.cardTop}>
              <div>
                <p>ACCOUNT MANAGER</p>
                <h2>Follow up with Acme</h2>
              </div>
              <span className={styles.live}><i /> Working</span>
            </div>

            <div className={styles.thread}>
              <div className={styles.userBubble}>Check the account, follow up and update me.</div>
              <div className={styles.agentBubble}>
                I found the last conversation, checked the CRM and drafted the follow-up.
              </div>
            </div>

            <div className={styles.timeline}>
              <div className={styles.step}>
                <span className={styles.stepIcon}>1</span>
                <div><strong>Read CRM</strong><small>Previous deal + latest activity</small></div>
                <em>Done</em>
              </div>
              <div className={styles.step}>
                <span className={styles.stepIcon}>2</span>
                <div><strong>Used memory</strong><small>Annual plan · Dana approves</small></div>
                <em>Remembered</em>
              </div>
              <div className={styles.step}>
                <span className={styles.stepIcon}>3</span>
                <div><strong>Send follow-up</strong><small>Ready for your approval</small></div>
                <em className={styles.review}>Review</em>
              </div>
            </div>

            <div className={styles.contextNote}>
              <span>Memory updated</span>
              <p>Acme prefers annual contracts. Dana is the final approver.</p>
            </div>
          </div>

          <div className={styles.floatCard} data-side="left">
            <span>VOICE</span>
            <strong>Call completed</strong>
            <small>Lead qualified · 2m 14s</small>
          </div>
          <div className={styles.floatCard} data-side="right">
            <span>ROUTINE</span>
            <strong>Runs every morning</strong>
            <small>Research → summary → WhatsApp</small>
          </div>
        </div>
      </div>
    </section>
  );
}
