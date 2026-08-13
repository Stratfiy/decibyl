'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';

/**
 * Scroll-triggered reveal: the element starts faded and offset, then
 * animates to its resting position the first time it crosses into the
 * viewport. Reduced-motion is handled globally in globals.css (the
 * `prefers-reduced-motion` block collapses all transition durations to
 * ~0), and a <noscript> rule in app/layout.tsx keeps content visible with
 * no JS — this is an enhancement, never a requirement to see the page.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  as?: 'div' | 'li';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;
  const dataReveal = visible ? 'visible' : 'hidden';

  if (as === 'li') {
    return (
      <li
        ref={ref as RefObject<HTMLLIElement | null>}
        data-reveal={dataReveal}
        style={style}
        className={className}
      >
        {children}
      </li>
    );
  }

  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      data-reveal={dataReveal}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
