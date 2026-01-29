'use client';

/**
 * PostReader Component
 * 
 * Modal overlay for reading posts inline:
 * - Centered narrow measure for optimal readability
 * - Gwern-style typography
 * - Expandable footnotes
 * - Related writings at bottom
 * 
 * Also serves as base for dedicated /writings/[slug] pages
 */

import { useEffect, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { formatReadingTime, formatDate } from '@/lib/utils';
import type { Writing } from '@/lib/types';
import Callout from './mdx/Callout';
import Footnote from './mdx/Footnote';
import Scribble from './mdx/Scribble';

interface PostReaderProps {
  writing: Writing;
  relatedWritings?: Writing[];
  onClose: () => void;
  onSelectRelated?: (slug: string) => void;
  mdxSource?: MDXRemoteSerializeResult;
}

// MDX components mapping
const mdxComponents = {
  Callout,
  Footnote,
  Scribble,
  // Custom link handling
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-1"
        {...props}
      >
        {children}
        {isExternal && <ExternalLink className="w-3 h-3" aria-hidden="true" />}
      </a>
    );
  },
};

export default function PostReader({
  writing,
  relatedWritings = [],
  onClose,
  onSelectRelated,
  mdxSource,
}: PostReaderProps) {
  const { frontmatter, content, readingTime, wordCount } = writing;

  // Handle Escape key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--color-overlay)] dark:bg-[var(--color-overlay-dark)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-60 p-3 rounded-lg bg-[var(--color-card)]/90 dark:bg-[var(--color-card-dark)]/90 shadow-lg hover:shadow-xl transition-all text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
        aria-label="Close"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Content panel */}
      <article className="relative z-50 min-h-screen py-16 px-6">
        <div
          className="mx-auto max-w-[780px] bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] rounded-xl shadow-xl p-8 sm:p-12"
          style={{ maxWidth: 'var(--measure-prose)' }}
        >
          {/* Header */}
          <header className="mb-10 text-center">
            <h1
              id="post-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] mb-4"
            >
              {frontmatter.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center justify-center flex-wrap gap-3 text-sm font-sans text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]">
              <span>{formatDate(frontmatter.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{formatReadingTime(readingTime)}</span>
              <span aria-hidden="true">·</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>

            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-sans bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post content */}
          <div className="prose-gwern">
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={mdxComponents} />
            ) : (
              // Fallback: render raw content as paragraphs
              content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            )}
          </div>

          {/* Related writings */}
          {relatedWritings.length > 0 && (
            <footer className="mt-16 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <h2 className="font-serif text-xl font-semibold mb-6 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">
                Related Writings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedWritings.map((related) => (
                  <button
                    key={related.frontmatter.slug}
                    onClick={() => onSelectRelated?.(related.frontmatter.slug)}
                    className="p-4 text-left rounded-lg bg-[var(--color-border)]/50 dark:bg-[var(--color-border-dark)]/50 hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border-dark)] transition-colors"
                  >
                    <h3 className="font-serif font-medium text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] mb-1">
                      {related.frontmatter.title}
                    </h3>
                    <p className="text-xs font-sans text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]">
                      {formatDate(related.frontmatter.date)}
                    </p>
                  </button>
                ))}
              </div>
            </footer>
          )}
        </div>
      </article>
    </div>
  );
}
