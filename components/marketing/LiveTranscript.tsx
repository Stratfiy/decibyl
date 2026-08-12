'use client';

import { useEffect, useRef, useState } from 'react';
import type { TranscriptLine } from '@/data/verticals';

/**
 * The one dark element on a light page, and the entire motion budget.
 * Types out line by line, pauses 3s, loops. Under prefers-reduced-motion it
 * renders the full transcript instantly with no typing.
 */

const CHAR_MS = 22;
const LINE_GAP_MS = 420;
const LOOP_PAUSE_MS = 3000;

export function LiveTranscript({
  lines,
  outcome,
  qaScore,
  duration,
  language,
  tag,
  money,
}: {
  lines: TranscriptLine[];
  outcome: string;
  qaScore: number;
  duration: string;
  language: string;
  tag?: string;
  /** the money figure inside the outcome, highlighted in saffron */
  money?: string;
}) {
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(lines.length);
  const [chars, setChars] = useState(Number.MAX_SAFE_INTEGER);
  const [done, setDone] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(lines.length);
      setChars(Number.MAX_SAFE_INTEGER);
      setDone(true);
      return;
    }

    let cancelled = false;
    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const run = () => {
      if (cancelled) return;
      setVisible(0);
      setChars(0);
      setDone(false);

      let elapsed = 0;
      lines.forEach((line, i) => {
        timers.current.push(
          setTimeout(() => {
            if (cancelled) return;
            setVisible(i + 1);
            setChars(0);
          }, elapsed),
        );

        const typing = line.text.length * CHAR_MS;
        for (let c = 1; c <= line.text.length; c++) {
          timers.current.push(
            setTimeout(() => {
              if (!cancelled) setChars(c);
            }, elapsed + c * CHAR_MS),
          );
        }
        elapsed += typing + LINE_GAP_MS;
      });

      timers.current.push(
        setTimeout(() => {
          if (cancelled) return;
          setDone(true);
          timers.current.push(setTimeout(run, LOOP_PAUSE_MS));
        }, elapsed),
      );
    };

    run();
    return () => {
      cancelled = true;
      clearAll();
    };
  }, [reduced, lines]);

  return (
    <div className="overflow-hidden rounded-panel bg-ink text-white shadow-[var(--shadow-lift)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
          </span>
          <span className="t-eyebrow text-white/60">Live call</span>
        </div>
        <span className="t-data text-white/60">{language}</span>
      </div>

      <div className="px-6 py-6 sm:px-7">
        <ol className="space-y-4" aria-label="Sample call transcript">
          {lines.map((line, i) => {
            if (i >= visible) return null;
            const isLast = i === visible - 1;
            const text = isLast && !reduced ? line.text.slice(0, chars) : line.text;

            if (line.speaker === 'system') {
              return (
                <li key={i} className="t-data text-white/55">
                  {text}
                </li>
              );
            }

            return (
              <li key={i} className="grid grid-cols-[72px_1fr] gap-3 sm:grid-cols-[86px_1fr]">
                <span
                  className={`t-data uppercase ${
                    line.speaker === 'agent' ? 'text-ember' : 'text-white/65'
                  }`}
                >
                  {line.speaker === 'agent' ? 'Agent' : 'Caller'}
                </span>
                <span
                  className={`text-[0.9375rem] leading-relaxed text-white/90 ${
                    line.indic ? 't-indic' : ''
                  } ${isLast && !reduced && !done ? 'caret' : ''}`}
                >
                  {text}
                </span>
              </li>
            );
          })}
        </ol>

        <div
          className={`mt-7 border-t border-white/10 pt-5 transition-opacity duration-300 ${
            done ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="inline-flex items-center gap-2 rounded-badge bg-forest px-3 py-1.5 text-[0.875rem] font-medium text-white">
            <span aria-hidden="true">✓</span>
            <span>
              {money ? (
                <>
                  {outcome.replace(money, '').replace(/·\s*$/, '')}
                  <span className="text-saffron">{money}</span>
                </>
              ) : (
                outcome
              )}
            </span>
          </p>
          <p className="t-data mt-3 text-white/60">
            QA score {qaScore} · {duration} · {language}
            {tag ? ` · ${tag}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
