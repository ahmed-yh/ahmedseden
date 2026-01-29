'use client';

/**
 * WritingsGrid Component
 * 
 * Responsive masonry-like grid for writing cards:
 * - 1 column on mobile
 * - 2 columns on tablet
 * - 3 columns on desktop
 * 
 * Features subtle dotted connection lines between cards
 */

import WritingCard from './WritingCard';
import type { Writing } from '@/lib/types';

interface WritingsGridProps {
  writings: Writing[];
  allWritings?: Writing[]; // kept optional for backward compatibility or future use, but unused now
}

export default function WritingsGrid({ writings }: WritingsGridProps) {
  return (
    <section
      id="writings"
      className="py-12 px-6 paper-texture"
      aria-label="My writings"
    >
      <div className="max-w-6xl mx-auto">
        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 garden-connections">
          {writings.map((writing, index) => (
            <WritingCard
              key={writing.frontmatter.slug}
              writing={writing}
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {writings.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-lg text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]">
              No writings yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
