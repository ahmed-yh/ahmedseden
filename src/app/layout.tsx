import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

/**
 * Root Layout
 * 
 * Provides the base HTML structure with:
 * - Font loading (Inter + Literata via Google Fonts in CSS)
 * - Dark mode support via class-based toggling
 * - SEO meta tags
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Ahmed Yassine | Digital Garden',
    template: '%s | Ahmed Yassine',
  },
  description:
    'A digital garden of essays, explorations, and evolving ideas about technology, creativity, and life.',
  keywords: ['blog', 'digital garden', 'essays', 'writing', 'technology'],
  authors: [{ name: 'Ahmed Yassine' }],
  creator: 'Ahmed Yassine',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'Ahmed Yassine | Digital Garden',
    title: 'Ahmed Yassine | Digital Garden',
    description:
      'A digital garden of essays, explorations, and evolving ideas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ahmed Yassine Digital Garden',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Yassine | Digital Garden',
    description:
      'A digital garden of essays, explorations, and evolving ideas.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { MusicProvider } from '@/components/music/MusicContext';
import MusicManager from '@/components/music/MusicManager';
import MusicPopup from '@/components/music/MusicPopup';
import VinylPlayer from '@/components/music/VinylPlayer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force Dark Mode - No script needed, just class on HTML or default variables */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`
          }}
        />
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="lazyOnload" />
      </head>
      <body className="antialiased">
        <MusicProvider>
          <MusicManager />
          <MusicPopup />
          <VinylPlayer />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
