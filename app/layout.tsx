import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import {
  Bricolage_Grotesque,
  Manrope,
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

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-bricolage',
  display: 'swap',
  preload: true,
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
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
  bricolage.variable,
  manrope.variable,
  plexMono.variable,
  plexDeva.variable,
  notoTamil.variable,
  notoTelugu.variable,
  notoKannada.variable,
  notoGujarati.variable,
  notoArabic.variable,
].join(' ');

/**
 * The public embed token for the "Try us now" widget.
 *
 * Unset means the widget does not render at all, rather than rendering broken.
 * A visitor clicking a dead microphone is a worse failure than no microphone,
 * and a build that silently ships a 404ing script is one nobody notices.
 *
 * If this is empty in production the widget is simply gone — so it has to be
 * set in the hosting environment before this ships.
 */
const widgetToken = process.env.NEXT_PUBLIC_DECIBYL_WIDGET_TOKEN?.trim() ?? '';

if (process.env.NODE_ENV === 'production' && !widgetToken) {
  console.warn(
    '[layout] NEXT_PUBLIC_DECIBYL_WIDGET_TOKEN is not set — the "Try us now" voice widget will not render.',
  );
}

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
            interactive so it never blocks first paint or LCP.

            The token comes from the environment rather than from this file, and
            it is worth being precise about what that does and does not buy.

            It does NOT make the token secret. This is a public embed token: it
            is handed to every visitor's browser by design, and anyone can read
            it in the page source. No amount of environment plumbing changes
            that, and pretending otherwise would be worse than leaving it here.

            What it does buy is that the token is no longer committed to a
            public git repository — where it sits in history forever, is
            greppable by anyone browsing the repo, and cannot be changed without
            a code change and a deploy. From an environment variable it rotates
            in the hosting dashboard in seconds.

            The control that actually protects this token is domain scoping. In
            echowave-redesign, `public_embed.validate_origin()` returns True for
            EVERY origin when the token's `allowed_domains` list is empty — so
            an unscoped token works on anybody's site, billed to us. Scoping it
            to decibyl.ai in superadmin is the fix; this is housekeeping. */}
        {widgetToken ? (
          <Script
            id="decibyl-widget"
            src={`https://app.decibyl.ai/embed/decibyl-widget.js?token=${encodeURIComponent(widgetToken)}&environment=production&apiEndpoint=https://api.decibyl.ai`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
