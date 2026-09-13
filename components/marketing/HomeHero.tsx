import Link from 'next/link';
import styles from './home-hero.module.css';

/**
 * The headline is static, and that is the decision worth recording.
 *
 * It used to rotate a job noun every 2.6 seconds. That cost a headline nobody
 * could read during the transition, five of six words hidden from crawlers and
 * screen readers, and a twelve-character ceiling that forced bland words --
 * "reorders", "reception" -- because nothing sharper would fit. None of the
 * products this one is measured against (ElevenLabs, Make, Wiza, Zelt) rotate
 * their h1; the motion never earned the space it took.
 *
 * "AI coworkers that do the boring work" also says the thing an H1 naming one
 * channel could not: voice is how some of this gets done, not what it is. The
 * eyebrow carries the channels, the voice cluster carries the voice queries.
 */
export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Voice, WhatsApp and the tools you already use
          </p>
          <h1 id="home-heading" className={styles.title}>
            AI coworkers that do <span className={styles.accent}>the boring work.</span>
          </h1>
          <p className={styles.lead}>
            They call, chase, confirm and write back to your tools — in 40+ languages, and
            they check with you before anything that matters.
          </p>
          <div className={styles.actions}>
            <Link href="/book-a-demo" className={styles.primaryAction}>
              Build your voice agent <span aria-hidden="true">→</span>
            </Link>
            <Link href="/experience" className={styles.secondaryAction}>
              See the 3D experience
            </Link>
          </div>
          <div className={styles.proof} aria-label="Product highlights">
            <span><strong>24/7</strong> availability</span>
            <span><strong>40+</strong> languages</span>
            <span><strong>India, US &amp; EU</strong> regions</span>
          </div>
        </div>

        <div className={styles.demo} aria-label="Live Decibyl voice agent">
          {/* Depth behind the agent card, nothing more. These used to carry
              labels (QUALIFY / Sales leads, RESOLVE / Customer calls) that no
              one could read: at 1440px the agent card spans 895-1263px, so the
              left card showed a 54px sliver of its text and the right card's
              label sat at 1084px, entirely behind it. A clipped word looks
              broken; a clean edge looks deliberate. */}
          <div className={styles.backCard} data-side="left" aria-hidden="true" />
          <div className={styles.backCard} data-side="right" aria-hidden="true" />
          <div className={styles.agentCard}>
            <div className={styles.status}><i /> Live agent</div>
            <div className={styles.orb} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>DECIBYL</p>
            <h2>Ask anything</h2>
            <a href="tel:+918035302788" className={styles.callButton}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M7.1 3.5l2.2 4.8-1.7 1.5c1.1 2.3 2.9 4.1 5.2 5.2l1.5-1.7 4.8 2.2-.8 4c-.2.9-1 1.5-1.9 1.5C9 20.4 3.1 14.5 2.5 7.1c-.1-.9.6-1.7 1.5-1.9l3.1-.7z" fill="currentColor" />
              </svg>
              Call the AI receptionist
            </a>
          </div>
          <p className={styles.demoHint}>No form. Tap to speak with a real agent.</p>
        </div>
      </div>
    </section>
  );
}
