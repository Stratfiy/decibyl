'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './home-hero.module.css';

const industries = [
  ['healthcare', 'A calmer front desk.', 'Appointments, reminders and patient enquiries.', '+'],
  ['e-commerce', 'Keep orders moving.', 'Order confirmations, delivery follow-ups and support.', '↗'],
  ['logistics', 'Every delivery, connected.', 'Delivery updates, scheduling and customer calls.', '→'],
  ['real estate', 'Turn enquiries into visits.', 'Lead qualification, site visits and follow-ups.', '⌂'],
  ['insurance', 'Stay close to customers.', 'Policy enquiries, renewal reminders and routing.', '✓'],
  ['education', 'Make every enquiry count.', 'Admissions enquiries and counselling bookings.', '✦'],
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const start = useRef<{x:number; y:number} | null>(null);
  const move = (step:number) => setActive(n => (n + step + industries.length) % industries.length);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer:number | undefined;
    const sync = () => {
      window.clearInterval(timer);
      if (!media.matches && !paused && !hovered && !focused && !document.hidden)
        timer = window.setInterval(() => setActive(n => (n+1) % industries.length), 4500);
    };
    sync();
    media.addEventListener('change',sync);
    document.addEventListener('visibilitychange',sync);
    return () => { window.clearInterval(timer); media.removeEventListener('change',sync); document.removeEventListener('visibilitychange',sync); };
  }, [paused,hovered,focused]);
  return <section className={styles.hero} aria-labelledby="home-heading">
    <div className={styles.grid}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>AI voice agents for real operations</p>
        <h1 id="home-heading" className={styles.title}>Your AI front desk for
          <span className={styles.rotator}><span key={active} className={styles.word}>{industries[active][0]}.</span></span>
        </h1>
        <p className={styles.lead}>Answer every call, qualify every lead, book appointments and complete follow-ups, naturally, in 40+ languages.</p>
        <div className={styles.actions}>
          <Link href="/book-a-demo" className={styles.primaryAction}>Book a demo ↗</Link>
          <Link href="/experience" className={styles.secondaryAction}>See the 3D experience</Link>
        </div>
        <div className={styles.proof}><span><strong>24/7</strong> availability</span><span><strong>40+</strong> languages</span><span><strong>India, US &amp; EU</strong> regions</span></div>
      </div>
      <div className={styles.demo} role="region" aria-roledescription="carousel" aria-label="Industry examples"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
        onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); } }}>
        <div className={styles.stage}
          onTouchStart={e => { start.current = {x:e.touches[0].clientX,y:e.touches[0].clientY}; }}
          onTouchEnd={e => { if (!start.current) return; const dx=e.changedTouches[0].clientX-start.current.x; const dy=e.changedTouches[0].clientY-start.current.y; if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) move(dx<0 ? 1 : -1); start.current=null; }}
          onTouchCancel={() => { start.current=null; }}>
          {industries.map(([name,title,detail,icon],index) => {
            const offset=(index-active+industries.length)%industries.length;
            const position=offset===0?'active':offset===1?'next':offset===industries.length-1?'previous':'hidden';
            return <article key={name} className={styles.card} data-position={position} aria-hidden={index!==active} inert={index!==active} aria-roledescription="slide" aria-label={name}>
              <p className={styles.cardLabel}>DECIBYL / {name}</p>
              <span className={styles.symbol} aria-hidden="true">{icon}</span>
              <h2>{title}</h2><p className={styles.detail}>{detail}</p>
              <a href="tel:+918035302788" className={styles.callButton}>Call the demo agent ↗</a>
            </article>;
          })}
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous industry">←</button>
          <span aria-live={focused || paused ? 'polite':'off'}>{String(active+1).padStart(2,'0')} / 06</span>
          <button type="button" onClick={() => move(1)} aria-label="Next industry">→</button>
          <button type="button" onClick={() => setPaused(p=>!p)} aria-label={paused?'Play industry slideshow':'Pause industry slideshow'}>{paused?'Play':'Pause'}</button>
        </div>
        <p className={styles.demoHint}>Swipe to explore industries. Call to try Decibyl.</p>
      </div>
    </div>
  </section>;
}
