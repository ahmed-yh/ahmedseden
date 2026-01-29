'use client';

/**
 * WritingCard Component
 * 
 * Card for displaying a writing in the garden grid:
 * - Polaroid-like styling with slight rotation
 * - Optional thumbnail image
 * - Title, excerpt, tags, and date
 * - Hover effects with lift and scribble overlay
 * 
 * Uses IntersectionObserver for scroll-triggered animations
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getRandomRotation, formatReadingTime, truncate, formatDate } from '@/lib/utils';
import type { Writing } from '@/lib/types';

interface WritingCardProps {
  writing: Writing;
  index: number;
}

export default function WritingCard({ writing, index }: WritingCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const { frontmatter, readingTime } = writing;
  const rotation = getRandomRotation(frontmatter.slug);
  const staggerClass = `stagger-${(index % 6) + 1}`;

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/writings/${frontmatter.slug}`}
      className={`
        block group w-full text-left polaroid scribble-overlay
        fade-in-up ${staggerClass} ${isVisible ? 'visible' : ''}
        focus:outline-none focus:ring-2 focus:ring-[var(--color-sepia)] focus:ring-offset-2
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-label={`Read "${frontmatter.title}"`}
    >
      {/* Decorative Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] opacity-40 rotate-1 shadow-sm backdrop-blur-[1px] z-20 pointer-events-none group-hover:-top-4 transition-all duration-300" />
      {/* Thumbnail image */}
      {frontmatter.image && (
        <div className="aspect-[4/3] w-full mb-3 overflow-hidden rounded-sm bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]">
          <img
            src={frontmatter.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-serif text-lg font-semibold leading-snug text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] group-hover:text-[var(--color-sepia-dark)] dark:group-hover:text-[var(--color-sepia)] transition-colors">
          {frontmatter.title}
        </h3>

        {/* Excerpt */}
        <p className="font-serif text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] leading-relaxed">
          {truncate(frontmatter.excerpt, 120)}
        </p>

        {/* Tags */}
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-xs font-sans bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date and reading time */}
        <div className="flex items-center gap-2 pt-1 text-xs font-sans text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]">
          <span>{formatDate(frontmatter.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(readingTime)}</span>
        </div>
      </div>
    </Link>
  );
}
