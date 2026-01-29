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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="lazyOnload" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
