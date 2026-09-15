import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import {
  Inter,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Kannada,
  Noto_Sans_Gujarati,
  Noto_Sans_Arabic,
} from 'next/font/google';
import './globals.css';
import './refined.css';
import { Nav } from '@/components/marketing/Nav';
import { Footer } from '@/components/marketing/Footer';
import { site, siteUrl } from '@/lib/site';
import { JsonLd, organizationSchema, softwareApplicationSchema, webSiteSchema } from '@/lib/seo';

const displayInter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-bricolage',
  display: 'swap',
  preload: false,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const plexDeva = IBM_Plex_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500'],
  variable: '--font-plex-deva',
  display: 'swap',
});

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

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Decibyl — AI That Gets Work Done',
    template: '%s | Decibyl',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  robots: { index: true, follow: true },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${site.name} Blog` }] },
  },
  icons: {
    icon: [
      { url: '/decibyl-mark.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: ['/decibyl-mark.svg'],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'j8NFMFrj2shPvdT9CObTaU84Zu-MdPhtMOxpmSEprcE',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAFAF8',
  width: 'device-width',
  initialScale: 1,
};

const fontVars = [
  displayInter.variable,
  inter.variable,
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
        <Script
          id="decibyl-widget"
          src="https://app.decibyl.ai/embed/decibyl-widget.js?token=emb_A7ryxkjGa-AoEHs06g557a3tLVoQbN1ieHNGnKA_U5s&environment=production&apiEndpoint=https://api.decibyl.ai"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
