'use client';

/**
 * Footnote MDX Component
 * 
 * Inline expandable footnotes inspired by Gwern's reference style
 * Usage: <Footnote id="1">Footnote content here</Footnote>
 */

import { useState } from 'react';

interface FootnoteProps {
  id: string;
  children: React.ReactNode;
}

export default function Footnote({ id, children }: FootnoteProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <span className="relative inline">
      {/* Footnote marker */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center justify-center w-5 h-5 text-xs font-sans font-medium bg-[var(--color-sepia)]/20 text-[var(--color-sepia-dark)] dark:text-[var(--color-sepia)] rounded-full hover:bg-[var(--color-sepia)]/30 transition-colors align-super -mt-1 mx-0.5"
        aria-expanded={isExpanded}
        aria-label={`Footnote ${id}`}
      >
        {id}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <span
          className="absolute left-0 top-full mt-2 z-10 w-72 p-3 text-sm bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg shadow-lg"
          role="tooltip"
        >
          <span className="font-sans text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] block mb-1">
            Note {id}
          </span>
          <span className="font-serif text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] leading-relaxed">
            {children}
          </span>
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-2 text-xs font-sans text-[var(--color-sepia-dark)] dark:text-[var(--color-sepia)] hover:underline"
          >
            Close
          </button>
        </span>
      )}
    </span>
  );
}
