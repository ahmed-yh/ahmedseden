/**
 * Core type definitions for the Digital Garden blog
 */

export interface WritingFrontmatter {
  title: string;
  date: string;
  tendedDate?: string;
  status?: 'sprout' | 'budding' | 'evergreen';
  intendedAudience?: string;
  hits?: number;
  tags: string[];
  excerpt: string;
  image?: string;
  slug: string;
  backlinks?: string[];
}

export interface Writing {
  frontmatter: WritingFrontmatter;
  content: string;
  readingTime: number;
  wordCount: number;
}

export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export interface SearchIndex {
  writings: SearchResult[];
}

export type Theme = 'light' | 'dark' | 'system';
