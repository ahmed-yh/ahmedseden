/**
 * Footer Component
 * 
 * Minimal footer with copyright and optional links
 */

import { Rss } from 'lucide-react';

interface FooterProps {
  name?: string;
  rssUrl?: string;
}

export default function Footer({
  name = 'Ahmed Yassine',
  rssUrl = '/rss.xml',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-sans text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]">
          © {currentYear} {name}. All rights reserved.
        </p>

        {/* RSS link */}
        <a
          href={rssUrl}
          className="flex items-center gap-2 font-sans text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] hover:text-[var(--color-sepia)] transition-colors"
          aria-label="RSS feed"
        >
          <Rss className="w-4 h-4" aria-hidden="true" />
          <span>RSS Feed</span>
        </a>
      </div>
    </footer>
  );
}
