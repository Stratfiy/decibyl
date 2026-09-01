'use client';

import { useEffect, useRef } from 'react';
import styles from './cinematic-intro.module.css';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * The approved opening scene from the earlier cinematic branch.
 *
 * It stays deliberately independent from the chapter engine: the visitor
 * meets Decibyl first, then the camera dissolves into the first problem scene.
 * Scroll writes one CSS variable; all visual movement remains compositor-only.
 */
export function CinematicIntro({ total }: { total: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const read = () => {
      frame = 0;
      if (reducedMotion) return;
      const travel = section.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;
      const progress = clamp(-section.getBoundingClientRect().top / travel, 0, 1);
      stage.style.setProperty('--intro-progress', progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.intro} aria-label="Meet Decibyl">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.world} aria-hidden="true">
          {/* A still command-center scene keeps the opening crisp and makes the
              whole product workflow readable without video or autoplay. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/scene-one/decibyl-office-command-center.webp?v=20260901a"
            alt=""
            className={styles.worldMedia}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className={styles.vignette} aria-hidden="true" />
        <div className={styles.copyScrim} aria-hidden="true" />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>01 / {String(total).padStart(2, '0')} · Meet Decibyl</p>
          <h1>Your AI voice agent.</h1>
          <p className={styles.lead}>
            Answers customer calls, qualifies leads and books appointments—in the language
            your customer actually speaks.
          </p>
          <div className={styles.chips} aria-label="Decibyl capabilities">
            <span>Always available</span>
            <span>Male &amp; female voices</span>
            <span>10+ languages</span>
          </div>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span>Scroll to enter</span>
          <i />
        </div>
        <div className={styles.cloudBridge} aria-hidden="true" />
        <div className={styles.progress} aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
