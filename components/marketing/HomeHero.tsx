import Link from 'next/link';
import styles from './home-hero.module.css';

const capabilities = ['Bots', 'Tasks', 'WhatsApp', 'Email', 'Apps', 'Documents', 'Routines', 'Voice'];

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span aria-hidden="true" /> Give repeat work a bot</p>
          <h1 id="home-heading" className={styles.title}>
            AI that gets <span className={styles.accentLine}>work done.</span>
          </h1>
          <p className={styles.lead}>
            Tell Decibyl what needs doing. It can give the job to the right bot, use your apps and
            knowledge, run on a channel or schedule, and bring you in before important actions.
          </p>
          <div className={styles.actions}>
            <Link href="https://app.decibyl.ai/auth/signup" className={styles.primaryAction}>
              Get started free <span aria-hidden="true">→</span>
            </Link>
            <Link href="/use-cases" className={styles.secondaryAction}>Find a bot</Link>
          </div>
          <div className={styles.jobChips} aria-label="Decibyl capabilities">
            {capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>
          <p className={styles.memoryLine}>
            <strong>Gets smarter as it works.</strong> Confirmed facts, decisions, people and useful
            document context can carry into the next job. Inferred facts stay reviewable until you confirm them.
          </p>
        </div>

        <div className={styles.demo} aria-label="Decibyl coordinating a bot">
          <div className={styles.agentOrb} aria-hidden="true"><i /><b /></div>
          <div className={styles.workCard}>
            <div className={styles.cardTop}>
              <div>
                <p>DECIBYL</p>
                <h2>Get the follow-up moving</h2>
              </div>
              <span className={styles.live}><i /> Coordinating</span>
            </div>

            <div className={styles.thread}>
              <div className={styles.userBubble}>Check Acme and get the right person to follow up.</div>
              <div className={styles.agentBubble}>@account-desk owns this. I pulled the confirmed account context and prepared the next step.</div>
            </div>

            <div className={styles.timeline}>
              <div className={styles.step}>
                <span className={styles.stepIcon}>01</span>
                <div><strong>Read workspace</strong><small>Open task + confirmed context</small></div>
                <em>Done</em>
              </div>
              <div className={styles.step}>
                <span className={styles.stepIcon}>02</span>
                <div><strong>Delegate to bot</strong><small>@account-desk · job owner</small></div>
                <em>Working</em>
              </div>
              <div className={styles.step}>
                <span className={styles.stepIcon}>03</span>
                <div><strong>External write</strong><small>Follow-up ready to send</small></div>
                <em className={styles.review}>Review</em>
              </div>
            </div>

            <div className={styles.contextNote}>
              <span>Confirmed memory used</span>
              <p>Dana approves final terms. Annual plan was chosen.</p>
            </div>
          </div>

          <div className={styles.floatCard} data-side="left">
            <span>TASK</span><strong>Bot finished</strong><small>Result added to the board</small>
          </div>
          <div className={styles.floatCard} data-side="right">
            <span>ROUTINE</span><strong>Runs every morning</strong><small>Tested before it was armed</small>
          </div>
        </div>
      </div>
    </section>
  );
}
