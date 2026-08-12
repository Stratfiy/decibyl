export type Language = {
  code: string;
  /** English name */
  name: string;
  /** name set in its own script */
  native: string;
  script: 'devanagari' | 'tamil' | 'telugu' | 'kannada' | 'gujarati' | 'latin';
  /** Audio sample path under /public/audio. null = no production-grade clip yet.
   *  ⚠️ Ship only clips Nithish will stand behind — a bad clip does more damage
   *  than a missing one. Chips with null render without a play control. */
  sample: string | null;
  codeMixed?: string;
};

export const languages: Language[] = [
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    script: 'devanagari',
    sample: null,
    codeMixed: 'Hinglish',
  },
  {
    code: 'ta',
    name: 'Tamil',
    native: 'தமிழ்',
    script: 'tamil',
    sample: null,
    codeMixed: 'Tanglish',
  },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', script: 'telugu', sample: null },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'kannada', sample: null },
  { code: 'mr', name: 'Marathi', native: 'मराठी', script: 'devanagari', sample: null },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', script: 'gujarati', sample: null },
  { code: 'en', name: 'English', native: 'English', script: 'latin', sample: null },
];

export const languageNames = languages.map((l) => l.name).join(', ');
