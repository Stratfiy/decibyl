'use client';

import { useState } from 'react';
import styles from './autopilot-companion.module.css';

/**
 * Original Decibyl SVG companion. No third-party avatar assets or rendering engines.
 * This is decorative/product guidance only, not a connected agent or chat endpoint.
 */
export function AutopilotCompanion() {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.avatar}
        aria-label={active ? 'Hide autopilot hint' : 'Show autopilot hint'}
        aria-expanded={active}
        onClick={() => setActive((value) => !value)}
      >
        <svg viewBox="0 0 144 156" role="img" aria-label="A friendly charcoal Decibyl companion" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="decibylCompanionBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#49484B" />
              <stop offset="1" stopColor="#1D1D1F" />
            </linearGradient>
            <radialGradient id="decibylCompanionGlow"><stop stopColor="#E1D6F1" /><stop offset="1" stopColor="#E1D6F1" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="72" cy="139" rx="48" ry="10" fill="#2A2930" opacity=".11" />
          <circle cx="72" cy="75" r="69" fill="url(#decibylCompanionGlow)" />
          <path d="M35 95c-8-25-5-52 10-66C56 18 88 18 100 30c18 17 19 49 7 70-10 20-60 19-72-5Z" fill="url(#decibylCompanionBody)" />
          <path d="M39 55c4-19 20-28 34-29 22-1 39 17 39 39" fill="none" stroke="#77747A" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="56" cy="74" rx="7" ry="10" fill="#FFFDFD" className={styles.eye}/>
          <ellipse cx="88" cy="74" rx="7" ry="10" fill="#FFFDFD" className={styles.eye}/>
          <circle cx="57" cy="76" r="2.8" fill="#232323" /><circle cx="89" cy="76" r="2.8" fill="#232323" />
          <path d="M62 98q10 9 21 0" stroke="#E7DBE6" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <circle cx="109" cy="34" r="9" fill="#DCEDE6" stroke="#fff" strokeWidth="2"/>
          <circle cx="109" cy="34" r="3" fill="#455F56"/>
        </svg>
        <span className={styles.status}><span className={styles.dot}/> Ready to help</span>
      </button>
      <div className={styles.hint} data-open={active}>
        <strong>What would you put on autopilot?</strong>
        <p>Start with one repeat task. Connect your tools and stay in control of approvals.</p>
        <a href="https://inapp.decibyl.ai">Build your autopilot <span aria-hidden="true">→</span></a>
      </div>
    </div>
  );
}
