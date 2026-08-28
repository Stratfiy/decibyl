import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import {
  Plus_Jakarta_Sans,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Kannada,
  Noto_Sans_Gujarati,
  Noto_Sans_Arabic,
} from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/marketing/Nav';
import { Footer } from '@/components/marketing/Footer';
import { site, siteUrl } from '@/lib/site';
import { JsonLd, organizationSchema, softwareApplicationSchema, webSiteSchema } from '@/lib/seo';

/* Self-hosted via next/font — no render-blocking font CDN, no CLS on load. */

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
});

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/* The typographic argument for the whole positioning: a US-built site cannot
   set its own headline in Tamil. IBM Plex has genuine Devanagari and Tamil
   cuts; Noto covers Telugu, Kannada and Gujarati. */

const plexDeva = IBM_Plex_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500'],
  variable: '--font-plex-deva',
  display: 'swap',
});

/* Note: IBM ships a Plex Tamil cut but Google Fonts does not serve it, so the
   Tamil face is Noto Sans Tamil — the best-quality Tamil family available to
   next/font. Devanagari stays on IBM Plex. */
const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500'],
  variable: '--font-noto-tamil',
  display: 'swap',
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: ['400', '500'],
  variable: '--font-noto-telugu',
  display: 'swap',
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500'],
  variable: '--font-noto-kannada',
  display: 'swap',
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: ['400', '500'],
  variable: '--font-noto-gujarati',
  display: 'swap',
});

/* French and Spanish read fine on IBM Plex (Latin) — no separate face needed.
   Arabic needs its own cut, and its own reading direction; handled per-chip
   in components/marketing/Languages.tsx. */
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Decibyl — Voice AI Agents for Indian Businesses',
    template: '%s | Decibyl',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  robots: { index: true, follow: true },
  // Advertises the blog feed on every page, which is where feed readers and
  // aggregators look for it — a feed nothing links to is a feed nobody finds.
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${site.name} Blog` }] },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  verification: {
    google: 'j8NFMFrj2shPvdT9CObTaU84Zu-MdPhtMOxpmSEprcE',
  },
};

export const viewport: Viewport = {
  themeColor: '#F4F5F7',
  width: 'device-width',
  initialScale: 1,
};

const fontVars = [
  jakarta.variable,
  plex.variable,
  plexMono.variable,
  plexDeva.variable,
  notoTamil.variable,
  notoTelugu.variable,
  notoKannada.variable,
  notoGujarati.variable,
  notoArabic.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVars}>
      <body>
        {/* Scroll-reveal is an enhancement, never a requirement to see the
            page — this keeps every [data-reveal] element visible with JS
            disabled. */}
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-button focus:bg-vermilion focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[organizationSchema(), webSiteSchema(), softwareApplicationSchema()]} />
        {/* "Try us now" live voice widget — loaded after the page is
            interactive so it never blocks first paint or LCP. */}
        <Script
          id="decibyl-widget"
          src="https://app.decibyl.ai/embed/decibyl-widget.js?token=emb_A7ryxkjGa-AoEHs06g557a3tLVoQbN1ieHNGnKA_U5s&environment=production&apiEndpoint=https://api.decibyl.ai"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
