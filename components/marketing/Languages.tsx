'use client';

import { useRef, useState } from 'react';
import { languages } from '@/data/languages';

/**
 * One chip per language, in native script. A chip with a real audio sample
 * plays it on click; a chip without one is a plain chip — we ship only clips
 * we'd stand behind, and a bad clip does more damage than a missing one.
 */
export function LanguageChips() {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = (code: string, src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (playing === code) {
      setPlaying(null);
      return;
    }
    const audio = new Audio(src);
    audio.addEventListener('ended', () => setPlaying(null));
    audio.play().catch(() => setPlaying(null));
    audioRef.current = audio;
    setPlaying(code);
  };

  return (
    <ul className="flex flex-wrap gap-3">
      {languages.map((lang) => {
        const label = `${lang.native}${lang.native !== lang.name ? ` · ${lang.name}` : ''}`;

        if (!lang.sample) {
          return (
            <li
              key={lang.code}
              className="rounded-button border border-line bg-snow px-5 py-3"
              lang={lang.code}
            >
              <span
                className="t-indic text-[1.0625rem] text-ink"
                dir={lang.script === 'arabic' ? 'rtl' : undefined}
              >
                {lang.native}
              </span>
              {lang.native !== lang.name ? (
                <span className="t-caption ml-2 text-iron">{lang.name}</span>
              ) : null}
            </li>
          );
        }

        return (
          <li key={lang.code}>
            <button
              type="button"
              onClick={() => toggle(lang.code, lang.sample as string)}
              aria-label={`Play a sample call in ${lang.name}`}
              className="flex items-center gap-2 rounded-button border border-line bg-snow px-5 py-3 transition-colors hover:border-vermilion"
              lang={lang.code}
            >
              <span aria-hidden="true" className="text-vermilion">
                {playing === lang.code ? '❚❚' : '▶'}
              </span>
              <span
                className="t-indic text-[1.0625rem] text-ink"
                dir={lang.script === 'arabic' ? 'rtl' : undefined}
              >
                {lang.native}
              </span>
              <span className="t-caption text-iron">{label !== lang.native ? lang.name : ''}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
