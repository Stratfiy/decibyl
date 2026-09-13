'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import type { Vertical } from '@/data/verticals';
import styles from './use-case-call-stack.module.css';

type Example = { id: string; label: string; title: string; description: string; href: string; call: Vertical['sampleCall'] };

export function UseCaseCallStack({ examples }: { examples: Example[] }) {
  const [active, setActive] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = examples[active];
  const move = (step: number) => setActive(n => (n + step + examples.length) % examples.length);
  return <section className={styles.section} aria-label="Use-case sample calls">
    <div className={styles.layout}>
      <div>
        <p className="t-eyebrow text-sindoor">Different calls. Real-world workflows.</p>
        <h2 className="t-h2 mt-4 text-balance">{current.title}</h2>
        <p className="t-body-lg mt-4 text-slate">{current.description}</p>
        <div className={styles.choices} aria-label="Choose a sample call">
          {examples.map((example,index) => <button type="button" key={example.id} aria-pressed={active===index} onClick={() => setActive(index)}>{example.label}</button>)}
        </div>
        <Link className={styles.link} href={current.href}>Explore this use case <span aria-hidden="true">↗</span></Link>
        <p className={styles.note}>Illustrative sample conversations. Swipe through the stack to see the workflow and its outcome.</p>
      </div>
      <div role="region" aria-roledescription="carousel" aria-label="Sample conversation cards"
        onKeyDown={e => { if (e.key==='ArrowRight' || e.key==='ArrowLeft') { e.preventDefault(); move(e.key==='ArrowRight'?1:-1); } }}>
        <div className={styles.stack}
          onTouchStart={e => { touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}; }}
          onTouchEnd={e => { if(!touch.current)return; const dx=e.changedTouches[0].clientX-touch.current.x; const dy=e.changedTouches[0].clientY-touch.current.y; if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1); touch.current=null; }}
          onTouchCancel={() => { touch.current=null; }}>
          {examples.map((example,index) => {
            const depth=(index-active+examples.length)%examples.length;
            return <article key={example.id} className={styles.card} data-depth={depth<3?depth:'hidden'} aria-hidden={index!==active} inert={index!==active} aria-roledescription="slide" aria-label={example.label}>
              <header><span>{example.label}</span><span>{example.call.language}</span></header>
              <ol aria-label={example.label+' sample transcript'}>
                {example.call.lines.map((line,i) => <li key={i} data-speaker={line.speaker}>
                  {line.speaker!=='system' && <span className={styles.speaker}>{line.speaker==='agent'?'Agent':'Caller'}</span>}
                  <span className={line.indic?'font-indic':undefined}>{line.text}</span>
                </li>)}
              </ol>
              <footer><p>✓ {example.call.outcome}</p><span>Sample duration · {example.call.duration}</span></footer>
            </article>;
          })}
        </div>
        <div className={styles.controls}>
          <button type="button" aria-label="Previous sample call" onClick={()=>move(-1)}>←</button>
          <span role="status">{active+1} / {examples.length} · {current.label}</span>
          <button type="button" aria-label="Next sample call" onClick={()=>move(1)}>→</button>
        </div>
      </div>
    </div>
  </section>;
}
