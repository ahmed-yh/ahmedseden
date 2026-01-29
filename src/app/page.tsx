'use client';

import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

/**
 * Home Page
 * 
 * Landing page with hero section:
 * - Hero section with Gwern-style typography
 * - Navigation to separate writings page
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)]">
      {/* Hero section */}
      <Hero
        name="Ahmed Yassine"
        quote="I write about things I'm interested in and betting on there are others like me"
        socialLinks={{
          github: 'https://github.com/ahmed-yh',
          instagram: 'https://www.instagram.com/ahmedd_yh/',
          portfolio: 'https://ahmedyassine.netlify.app',
          spotify: 'https://open.spotify.com/user/31pchudikmiougik4vwrmwch7lya',
        }}
      />

      {/* Footer */}
      <Footer name="Ahmed Yassine" rssUrl="/rss.xml" />
    </main>
  );
}
