/**
 * Content loading utilities for MDX files
 * Parses frontmatter and generates reading statistics at build time
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Writing, WritingFrontmatter } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'writings');

/**
 * Get all writing slugs for static generation
 */
export function getAllWritingSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get a single writing by slug
 */
export function getWritingBySlug(slug: string): Writing | null {
  let filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  const frontmatter: WritingFrontmatter = {
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    tendedDate: data.tendedDate,
    status: data.status || 'sprout',
    intendedAudience: data.intendedAudience || 'SOFTWARE ENGINEERS',
    hits: data.hits || 0,
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    image: data.image,
    slug: data.slug || slug,
    backlinks: data.backlinks || [],
  };

  return {
    frontmatter,
    content,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
  };
}

/**
 * Get all writings sorted by date (newest first)
 */
export function getAllWritings(): Writing[] {
  const slugs = getAllWritingSlugs();
  const writings = slugs
    .map((slug) => getWritingBySlug(slug))
    .filter((writing): writing is Writing => writing !== null)
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

  return writings;
}

/**
 * Get related writings based on tags and backlinks
 */
export function getRelatedWritings(currentSlug: string, limit = 4): Writing[] {
  const allWritings = getAllWritings();
  const current = getWritingBySlug(currentSlug);

  if (!current) return [];

  // Score writings by tag overlap and backlink presence
  const scored = allWritings
    .filter((w) => w.frontmatter.slug !== currentSlug)
    .map((writing) => {
      let score = 0;

      // Tag overlap
      const tagOverlap = writing.frontmatter.tags.filter((tag) =>
        current.frontmatter.tags.includes(tag)
      ).length;
      score += tagOverlap * 2;

      // Direct backlink
      if (current.frontmatter.backlinks?.includes(writing.frontmatter.slug)) {
        score += 3;
      }
      if (writing.frontmatter.backlinks?.includes(currentSlug)) {
        score += 3;
      }

      return { writing, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ writing }) => writing);
}

/**
 * Get all unique tags with counts
 */
export function getAllTags(): Map<string, number> {
  const writings = getAllWritings();
  const tagCounts = new Map<string, number>();

  writings.forEach((writing) => {
    writing.frontmatter.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return tagCounts;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
