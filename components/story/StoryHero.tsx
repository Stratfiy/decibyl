'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonClass } from '@/components/ui/Button';
import styles from './story.module.css';

/* ============================================================================
   The opening scroll world.

   Six chapters over one pinned stage. The camera flies to a new region of the
   rendered plate per chapter, so the sequence reads as a single continuous
   world rather than six separate images.

   Everything the page needs to say is in the DOM on the server. Scrolling
   changes which chapter is *visible*, never which chapter *exists* — and under
   `prefers-reduced-motion` the whole thing collapses to a stacked document
   (see the media query at the foot of story.module.css).
   ============================================================================ */

export type StoryNeed = { id: string; label: string; detail: string; href: string };
export type StoryLine = { speaker: 'agent' | 'customer' | 'system'; text: string; indic?: boolean };
export type StoryStat = { value: string; label: string };

type Props = {
  needs: StoryNeed[];
  call: { language: string; lines: StoryLine[]; outcome: string; duration: string; qaScore: number };
  phone: { tel: string; display: string };
  stats: StoryStat[];
};

/** Chapter labels for the rail. Order is the story order. */
const CHAPTERS = [
  'Office',
  'Missed call',
  'The answer',
  'Language',
  'Your business',
  'Outcome',
] as const;

const ACTS = CHAPTERS.length;

/** Scroll length of each chapter, in svh. Six chapters ≈ five screens of
 *  scroll before the page proper — the chapter rail and the skip link are what
 *  keep that from being a trap. */
const ACT_SCROLL_VH = 86;

/** Where the camera sits for each chapter: a scale and the origin it pushes
 *  toward, as a percentage of the plate. Chapters 0–3 fly across the office
 *  plate; 4–5 hand over to the selector plate. */
const CAMERA = [
  { plate: 0, scale: 1.02, x: 62, y: 46 },
  { plate: 0, scale: 1.42, x: 73, y: 56 },
  { plate: 0, scale: 1.78, x: 66, y: 34 },
  { plate: 0, scale: 1.62, x: 70, y: 31 },
  { plate: 1, scale: 1.06, x: 78, y: 50 },
  { plate: 1, scale: 1.38, x: 80, y: 44 },
] as const;

/* A portrait viewport already crops a 16:9 plate hard — `object-fit: cover`
   throws most of the width away before the camera does anything. Reusing the
   desktop scales there pushes the character clean out of frame and leaves the
   viewer looking at an empty wall, so narrow screens get their own, much
   flatter set. */
const CAMERA_NARROW = [
  { plate: 0, scale: 1.0, x: 60, y: 42 },
  { plate: 0, scale: 1.14, x: 66, y: 50 },
  { plate: 0, scale: 1.26, x: 62, y: 36 },
  { plate: 0, scale: 1.2, x: 64, y: 34 },
  { plate: 1, scale: 1.0, x: 70, y: 46 },
  { plate: 1, scale: 1.12, x: 72, y: 42 },
] as const;

/** Chapters whose copy is written for the light scrim. The rest run on the
 *  dark wash. */
const LIGHT_TONE = new Set([0, 4]);

/** Sub-steps resolved per chapter. Caps re-renders at 12 per chapter while
 *  still driving the ring pips and the transcript reveal. */
const SUB_STEPS = 12;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const WAVE_BARS = [0.4, 0.75, 1, 0.55, 0.85, 0.35, 0.7, 0.95, 0.5, 0.8, 0.3];
const RING_PIPS = 6;

export function StoryHero({ needs, call, phone, stats }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLVideoElement>(null);

  const [act, setAct] = useState(0);
  const [sub, setSub] = useState(0);
  const [motionReady, setMotionReady] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [need, setNeed] = useState(needs[0]?.id ?? '');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /* One passive listener, coalesced into a single rAF. It writes `--sp` for
     the continuous bits (progress bar, scroll cue) and sets the chapter, which
     is what every transition in the stylesheet keys off. */
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const read = () => {
      frame = 0;
      const travel = section.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;
      const p = clamp(-section.getBoundingClientRect().top / travel, 0, 1);

      stage.style.setProperty('--sp', p.toFixed(4));

      const raw = p * ACTS;
      const index = clamp(Math.floor(raw), 0, ACTS - 1);
      setAct(index);
      setSub(Math.round((raw - index) * SUB_STEPS));
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

  /* The selector plate only starts moving once its chapter is in reach, so the
     second video is never fetched-and-decoded during the opening. */
  useEffect(() => {
    const video = motionRef.current;
    if (!video) return;
    if (act >= 4) void video.play().catch(() => undefined);
    else video.pause();
  }, [act]);

  const goToChapter = useCallback((index: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const travel = section.offsetHeight - stage.offsetHeight;
    const top = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: top + ((index + 0.5) / ACTS) * travel, behavior: 'smooth' });
  }, []);

  const camera = (narrow ? CAMERA_NARROW : CAMERA)[act];
  const activeNeed = needs.find((n) => n.id === need) ?? needs[0];

  /* Chapter 1 counts six rings out and then gives up. */
  const ringsLit = clamp(Math.round((sub / SUB_STEPS) * (RING_PIPS + 1)), 0, RING_PIPS);
  const missed = act === 1 && ringsLit >= RING_PIPS;

  /* Chapter 3 streams the transcript in as you move through it. */
  const linesShown = act > 3 ? call.lines.length : clamp(Math.round((sub / SUB_STEPS) * (call.lines.length + 1)), 0, call.lines.length);

  const actState = (index: number) => (index === act ? 'active' : index < act ? 'past' : 'future');

  return (
    <section
      ref={sectionRef}
      className={styles.story}
      /* Routed through a custom property rather than set as `height` directly:
         an inline height would outrank the reduced-motion media query and
         leave five empty screens below the stacked document. */
      style={{ '--story-h': `${ACTS * ACT_SCROLL_VH}svh` } as React.CSSProperties}
      aria-label="Meet your Decibyl voice agent"
    >
      <div ref={stageRef} className={styles.stage}>
        {/* ---------------------------------------------------------- world */}
        <div
          className={styles.world}
          aria-hidden="true"
          style={{ transform: `scale(${camera.scale})`, transformOrigin: `${camera.x}% ${camera.y}%` }}
        >
          <div className={styles.worldPlate} data-on={camera.plate === 0}>
            {/* The 10 KB still is the LCP element. The 750 KB animated pass
                fades in over it only once it has decoded. */}
            <img
              src="/media/scene-one/decibyl-office-welcome-poster.webp"
              alt=""
              className={styles.worldMedia}
              fetchPriority="high"
              decoding="async"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/scene-one/decibyl-office-welcome-hd.webp"
              alt=""
              className={`${styles.worldMedia} ${styles.worldMotion}`}
              data-ready={motionReady}
              loading="lazy"
              decoding="async"
              onLoad={() => setMotionReady(true)}
            />
          </div>

          <div className={styles.worldPlate} data-on={camera.plate === 1}>
            <img
              src="/media/scene-two/decibyl-business-selector-poster.webp"
              alt=""
              className={styles.worldMedia}
              loading="lazy"
              decoding="async"
            />
            <video
              ref={motionRef}
              className={`${styles.worldMedia} ${styles.worldMotion}`}
              data-ready={act >= 4}
              poster="/media/scene-two/decibyl-business-selector-poster.webp"
              muted
              loop
              playsInline
              preload="none"
            >
              <source src="/media/scene-two/decibyl-business-selector.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className={styles.vignette} aria-hidden="true" />
        <div className={styles.wash} data-on={!LIGHT_TONE.has(act)} aria-hidden="true" />

        {/* ------------------------------------------------------- chapters */}
        <nav className={styles.chapters} aria-label="Story chapters">
          {CHAPTERS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={styles.chapter}
              data-active={i === act}
              aria-current={i === act ? 'true' : undefined}
              /* The rail scrolls horizontally on narrow screens; without this
                 the active chapter drifts off the end of it. */
              ref={
                i === act
                  ? (node) =>
                      node?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
                  : undefined
              }
              onClick={() => goToChapter(i)}
            >
              {label}
            </button>
          ))}
        </nav>

        <a href="#story-end" className={styles.skip}>
          Skip the story
        </a>

        <div className={styles.rail} aria-hidden="true">
          {CHAPTERS.map((label, i) => (
            <button
              key={label}
              type="button"
              tabIndex={-1}
              className={styles.railTick}
              data-active={i === act}
              data-done={i < act}
              onClick={() => goToChapter(i)}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------- copy */}
        <div className={styles.panelLayer}>
          <div className={styles.panelScrim} data-on={LIGHT_TONE.has(act)} aria-hidden="true" />

          {/* 01 — the office. Carries the H1. */}
          <div className={styles.act} data-state={actState(0)} data-tone="light">
            <div className={styles.actInner}>
              <p className={styles.count}>01 / 06</p>
              <p className={styles.eyebrow}>AI voice agents · Built in India</p>
              <h1 className={styles.title}>
                <span className={styles.extrude}>AI voice agents</span>
                <br />
                for Indian businesses.
              </h1>
              <p className={styles.lead}>
                Decibyl answers your phone, qualifies the lead, books the appointment and makes the
                follow-up call — in Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati and English.
                Every call transcribed, recorded and scored.
              </p>
              <div className={styles.chips}>
                <span className={styles.chip}>Always available</span>
                <span className={styles.chip}>10+ languages</span>
                <span className={styles.chip}>Inbound and outbound</span>
              </div>
              <div className={styles.actions}>
                <Link href="/book-a-demo" className={buttonClass('primary', 'lg')}>
                  Book a demo call
                </Link>
                <Link href="/pricing" className={buttonClass('secondary', 'lg')}>
                  See pricing
                </Link>
              </div>
              <p className={styles.phoneLine}>
                Or just call the agent:{' '}
                <a href={`tel:${phone.tel}`} className={styles.phoneLink}>
                  {phone.display}
                </a>
                . Pick your language when it answers.
              </p>
            </div>
          </div>

          {/* 02 — the missed call. */}
          <div className={styles.act} data-state={actState(1)} data-tone="dark">
            <div className={styles.actInner}>
              <p className={`${styles.count} ${styles.countOnDark}`}>02 / 06</p>
              <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>9:47 PM · after hours</p>
              <h2 className={`${styles.title} ${styles.titleOnDark}`}>
                The call you didn&rsquo;t answer was the sale.
              </h2>
              <p className={`${styles.lead} ${styles.leadOnDark}`}>
                Two lines, one receptionist, and a caller who decided to buy at nine at night. The
                second ring goes nowhere. You never find out it happened.
              </p>
              <div className={styles.pips}>
                {Array.from({ length: RING_PIPS }, (_, i) => (
                  <span key={i} className={styles.pip} data-lit={i < ringsLit} />
                ))}
                <span className={styles.pipLabel} data-missed={missed}>
                  {missed ? 'Missed call' : 'Ringing'}
                </span>
              </div>
            </div>
          </div>

          {/* 03 — the answer. */}
          <div className={styles.act} data-state={actState(2)} data-tone="dark">
            <div className={styles.actInner}>
              <p className={`${styles.count} ${styles.countOnDark}`}>03 / 06</p>
              <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>Ring one</p>
              <h2 className={`${styles.title} ${styles.titleOnDark}`}>Decibyl picks up.</h2>
              <p className={`${styles.lead} ${styles.leadOnDark}`}>
                Not a menu. Not &ldquo;press 1 for sales&rdquo;. A voice that asks what the caller
                needs, understands the answer, and does the next thing about it.
              </p>
              <div className={styles.orbRow}>
                <span className={styles.orb} aria-hidden="true">
                  <span className={styles.orbRing} />
                  <span className={styles.orbRing} />
                  <span className={styles.orbRing} />
                  <span className={styles.orbCore} />
                </span>
                <span className={styles.wave} aria-hidden="true">
                  {WAVE_BARS.map((h, i) => (
                    <span
                      key={i}
                      className={styles.waveBar}
                      style={{ height: `${h * 100}%`, animationDelay: `${i * 90}ms` }}
                    />
                  ))}
                </span>
              </div>
              <div className={styles.stats}>
                {stats.map((s) => (
                  <span key={s.value}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 04 — the language. */}
          <div className={styles.act} data-state={actState(3)} data-tone="dark">
            <div className={styles.actInner}>
              <p className={`${styles.count} ${styles.countOnDark}`}>04 / 06</p>
              <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>{call.language}</p>
              <h2 className={`${styles.title} ${styles.titleOnDark}`}>
                Code-mixed is the default, not the edge case.
              </h2>
              <div className={styles.transcript}>
                {call.lines.map((line, i) => (
                  <p
                    key={i}
                    className={styles.line}
                    data-shown={i < linesShown}
                    lang={line.indic ? 'hi' : undefined}
                  >
                    <span
                      className={`${styles.lineWho} ${
                        line.speaker === 'agent' ? '' : styles.lineWhoCaller
                      }`}
                    >
                      {line.speaker === 'agent' ? 'Agent' : line.speaker === 'customer' ? 'Caller' : '—'}
                    </span>
                    <span className={`${styles.lineText} ${line.indic ? 't-indic' : ''}`}>
                      {line.text}
                    </span>
                  </p>
                ))}
              </div>
              <p className={styles.footnote}>Illustration of a real workflow, not a call recording.</p>
            </div>
          </div>

          {/* 05 — your business. */}
          <div className={styles.act} data-state={actState(4)} data-tone="light">
            <div className={styles.actInner}>
              <p className={styles.count}>05 / 06</p>
              <p className={styles.eyebrow}>Same engine · different conversation</p>
              <h2 className={styles.title}>Which calls are you losing?</h2>
              <ul className={styles.needList}>
                {needs.map((n) => (
                  <li key={n.id}>
                    <Link
                      href={n.href}
                      className={styles.need}
                      data-active={n.id === activeNeed?.id}
                      onMouseEnter={() => setNeed(n.id)}
                      onFocus={() => setNeed(n.id)}
                    >
                      <span className={styles.needLabel}>{n.label}</span>
                      <span className={styles.needDetail}>{n.detail}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 06 — the outcome. */}
          <div className={styles.act} data-state={actState(5)} data-tone="dark">
            <div className={styles.actInner}>
              <p className={`${styles.count} ${styles.countOnDark}`}>06 / 06</p>
              <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>
                {call.duration} · QA {call.qaScore}/100
              </p>
              <h2 className={`${styles.title} ${styles.titleOnDark}`}>Something actually happened.</h2>
              <p className={`${styles.lead} ${styles.leadOnDark}`}>
                The point was never that it can talk. One failed delivery became a confirmed
                reattempt, in the register the customer actually speaks, at{' '}
                <span className={styles.money}>₹1,840</span> recovered.
              </p>
              <p className={styles.outcomeChip}>{call.outcome}</p>
              <div className={styles.actions}>
                <Link href="/book-a-demo" className={buttonClass('primary', 'lg')}>
                  Book a demo call
                </Link>
                <Link href="#calculator" className={buttonClass('secondary', 'lg')}>
                  Do the arithmetic
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cue} aria-hidden="true">
          <span>Scroll to enter</span>
          <span className={styles.cueRule} />
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressFill} />
        </div>
      </div>
    </section>
  );
}
