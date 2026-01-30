/**
 * Search utilities using FlexSearch
 * Index is generated at build time and loaded client-side on demand
 */

import FlexSearch from 'flexsearch';
import { SearchResult } from './types';

// Use 'any' for FlexSearch due to complex type definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let searchIndex: any = null;
let searchData: SearchResult[] = [];

interface FlexSearchFieldResult {
  field: string;
  result: (string | number | { id: string | number })[];
}

/**
 * Generate search index from writings (called at build time)
 */
export function generateSearchIndex(writings: { frontmatter: { slug: string; title: string; excerpt: string; tags: string[]; isPublic: boolean } }[]): SearchResult[] {
  return writings.map((writing) => ({
    slug: writing.frontmatter.slug,
    title: writing.frontmatter.title,
    excerpt: writing.frontmatter.excerpt,
    tags: writing.frontmatter.tags,
    isPublic: writing.frontmatter.isPublic,
  }));
}

/**
 * Initialize the search index with data
 */
export function initializeSearch(data: SearchResult[]): void {
  searchData = data;

  // Create FlexSearch document index
  // FlexSearch has complex types, using dynamic access
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DocumentIndex = (FlexSearch as any).Document || (FlexSearch as any).default?.Document || FlexSearch;

  searchIndex = new DocumentIndex({
    document: {
      id: 'slug',
      index: ['title', 'excerpt', 'tags'],
      store: true,
    },
    tokenize: 'forward',
    cache: true,
  });

  // Add all documents to the index
  data.forEach((item) => {
    searchIndex?.add(item.slug, item);
  });
}

/**
 * Search writings by query
 */
export async function searchWritings(query: string): Promise<SearchResult[]> {
  if (!searchIndex || !query.trim()) {
    return [];
  }

  try {
    const results = await searchIndex.search(query, {
      limit: 10,
      enrich: true,
    });

    // Deduplicate results from different fields
    const slugSet = new Set<string>();
    const matches: SearchResult[] = [];

    if (Array.isArray(results)) {
      (results as FlexSearchFieldResult[]).forEach((fieldResult) => {
        // FlexSearch v0.8+ returns field results like { field: 'title', result: [...] }
        const fieldMatches = fieldResult.result || [];

        fieldMatches.forEach((match) => {
          // If enrich: true, match might be an object or a slug
          const slug = typeof match === 'object' && match !== null ? match.id : match;
          const slugStr = String(slug);

          if (!slugSet.has(slugStr)) {
            slugSet.add(slugStr);
            const item = searchData.find((d) => d.slug === slugStr && d.isPublic !== false);
            if (item) {
              matches.push(item);
            }
          }
        });
      });
    }

    return matches;
  } catch {
    // Fallback to simple filter-based search
    const lowerQuery = query.toLowerCase();
    return searchData.filter(
      (item) =>
        (item.isPublic !== false) && (
          item.title.toLowerCase().includes(lowerQuery) ||
          item.excerpt.toLowerCase().includes(lowerQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
    );
  }
}

/**
 * Check if search is initialized
 */
export function isSearchReady(): boolean {
  return searchIndex !== null;
}
