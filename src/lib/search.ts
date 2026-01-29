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

/**
 * Generate search index from writings (called at build time)
 */
export function generateSearchIndex(writings: { frontmatter: { slug: string; title: string; excerpt: string; tags: string[] } }[]): SearchResult[] {
  return writings.map((writing) => ({
    slug: writing.frontmatter.slug,
    title: writing.frontmatter.title,
    excerpt: writing.frontmatter.excerpt,
    tags: writing.frontmatter.tags,
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
      results.forEach((fieldResult: { result?: (string | number)[] }) => {
        if (fieldResult?.result && Array.isArray(fieldResult.result)) {
          fieldResult.result.forEach((slug) => {
            const slugStr = String(slug);
            if (!slugSet.has(slugStr)) {
              slugSet.add(slugStr);
              const item = searchData.find((d) => d.slug === slugStr);
              if (item) {
                matches.push(item);
              }
            }
          });
        }
      });
    }
    
    return matches;
  } catch {
    // Fallback to simple filter-based search
    const lowerQuery = query.toLowerCase();
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

/**
 * Check if search is initialized
 */
export function isSearchReady(): boolean {
  return searchIndex !== null;
}
