'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './home-hero.module.css';

/**
 * The rotator used to name industries, which the H1 already implied and the
 * solutions deck below covers properly. It now names the *job* instead: each
 * word is a thing a customer would actually search for, and the H1 finally
 * contains "AI voice agents" -- the term every other page on this site targets
 * and the old "AI front desk" headline did not.
 *
 * Keep every entry at or under twelve characters. `.rotator` is
 * `height: 1.08em; overflow: hidden`, so a phrase that wraps gets clipped
 * rather than wrapped, and at the 5.9rem desktop clamp that happens fast.
 */
const jobs = [
  { name: 'follow-ups.', tone: 'violet' },
  { name: 'reminders.', tone: 'pink' },
  { name: 'no-shows.', tone: 'amber' },
  { name: 'call-backs.', tone: 'violet' },
  { name: 'reception.', tone: 'pink' },
  { name: 'chasing.', tone: 'amber' },
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
            <span aria-hidden="true" /> AI coworkers for the boring work
          </p>
          <h1 id="home-heading" className={styles.title}>
            AI voice agents that handle
            <span className={styles.rotator} aria-live="polite">
              {jobs.map((job, index) => (
                <span
                  key={job.name}
                  className={styles.word}
                  data-state={index === active ? 'active' : index < active ? 'past' : 'next'}
                  data-tone={job.tone}
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
          <div className={styles.backCard} data-side="left" aria-hidden="true">
            <span>QUALIFY</span>
            <strong>Sales leads</strong>
          </div>
          <div className={styles.backCard} data-side="right" aria-hidden="true">
            <span>RESOLVE</span>
            <strong>Customer calls</strong>
          </div>
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
