'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './home-hero.module.css';

/**
 * The rotator names the job. Deliberately mixed: reception and call-backs are
 * voice, reorders and follow-ups need not be. The product is coworkers that do
 * the boring work, and voice is one channel they do it through -- an H1 that
 * says "AI voice agents" sells the narrowest reading of it.
 *
 * The voice keywords are not lost by saying so. /ai-receptionist,
 * /voice-ai/[language], /ai-receptionist/[city] and /use-cases exist to carry
 * that demand, and KEYWORDS.md assigns it to them. A homepage that duplicates
 * its own cluster is a homepage competing with itself; this one carries the
 * category and lets those pages carry the queries.
 *
 * One tone, not three. The old set cycled violet/pink/amber, so the headline
 * changed hue every 2.6 seconds. The motion is the interest.
 *
 * Keep every entry at or under twelve characters. `.rotator` is
 * `height: 1.08em; overflow: hidden`, so a phrase that wraps gets clipped
 * rather than wrapped.
 */
const jobs = [
  { name: 'follow-ups.' },
  { name: 'reminders.' },
  { name: 'no-shows.' },
  { name: 'reorders.' },
  { name: 'reception.' },
  { name: 'the chasing.' },
] as const;

export function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % jobs.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Voice, WhatsApp and the tools you already use
          </p>
          <h1 id="home-heading" className={styles.title}>
            AI coworkers that handle
            <span className={styles.rotator} aria-live="polite">
              {jobs.map((job, index) => (
                <span
                  key={job.name}
                  className={styles.word}
                  data-state={index === active ? 'active' : index < active ? 'past' : 'next'}
                  aria-hidden={index !== active}
                >
                  {job.name}
                </span>
              ))}
            </span>
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
