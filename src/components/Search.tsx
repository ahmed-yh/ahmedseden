'use client';

/**
 * Search Component
 * 
 * Client-side search using FlexSearch:
 * - Lazy-loads search library on demand
 * - Instant results as you type
 * - Keyboard accessible
 * - Debounced input for performance
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import { debounce } from '@/lib/utils';
import { initializeSearch, searchWritings, isSearchReady } from '@/lib/search';
import type { SearchResult } from '@/lib/types';

interface SearchProps {
  searchIndex: SearchResult[];
  onSelect?: (slug: string) => void; // Optional - component handles navigation by default
}

export default function Search({ searchIndex, onSelect }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Initialize search index when component mounts
  useEffect(() => {
    if (searchIndex.length > 0 && !isSearchReady()) {
      initializeSearch(searchIndex);
    }
  }, [searchIndex]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search - wrapped in useCallback for stable reference
  const performSearch = useCallback((searchQuery: string) => {
    const debouncedSearch = debounce(async (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const searchResults = await searchWritings(q);
      setResults(searchResults);
      setIsLoading(false);
    }, 200);

    debouncedSearch(searchQuery);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsLoading(true);
    performSearch(value);
  };

  const handleSelectResult = (slug: string) => {
    if (onSelect) {
      onSelect(slug);
    } else {
      router.push(`/writings/${slug}`);
    }

    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] shadow-lg hover:shadow-xl transition-all text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
        aria-label="Open search (Ctrl+K)"
      >
        <SearchIcon className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Search modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-[var(--color-overlay)] dark:bg-[var(--color-overlay-dark)]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Search panel */}
          <div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Search writings"
          >
            <div className="mx-4 bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] rounded-xl shadow-xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                <SearchIcon
                  className="w-5 h-5 text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search writings..."
                  className="flex-1 bg-transparent font-sans text-base text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] placeholder-[var(--color-ink-muted)] dark:placeholder-[var(--color-ink-muted-dark)] outline-none"
                  aria-label="Search query"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setResults([]);
                    }}
                    className="p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] dark:hover:text-[var(--color-ink-dark)]"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Results list */}
              <div className="max-h-80 overflow-y-auto">
                {isLoading && (
                  <div className="p-4 text-center text-sm text-[var(--color-ink-muted)]">
                    Loading...
                  </div>
                )}

                {!isLoading && query && results.length === 0 && (
                  <div className="p-4 text-center text-sm text-[var(--color-ink-muted)]">
                    No results found
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <ul role="listbox" aria-label="Search results">
                    {results.map((result) => (
                      <li key={result.slug}>
                        <button
                          onClick={() => handleSelectResult(result.slug)}
                          className="w-full p-4 text-left hover:bg-[var(--color-border)]/50 dark:hover:bg-[var(--color-border-dark)]/50 transition-colors"
                          role="option"
                          aria-selected="false"
                        >
                          <h3 className="font-serif font-medium text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] mb-1">
                            {result.title}
                          </h3>
                          <p className="text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] line-clamp-2">
                            {result.excerpt}
                          </p>
                          {result.tags.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {result.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer hint */}
              <div className="p-3 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-xs text-center text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)]">
                Press <kbd className="px-1.5 py-0.5 bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] rounded">Esc</kbd> to close
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
