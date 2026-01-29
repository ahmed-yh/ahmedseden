/**
 * RSS Feed Generator Script
 * 
 * Run with: npx ts-node scripts/generate-rss.ts
 * 
 * Generates rss.xml for all writings
 */

import fs from 'fs';
import path from 'path';
import { getAllWritings } from '../src/lib/content';

const SITE_URL = process.env.SITE_URL || 'https://example.com';
const SITE_TITLE = 'Ahmed Yassine | Digital Garden';
const SITE_DESCRIPTION = 'A digital garden of essays, explorations, and evolving ideas.';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSS(): string {
  const writings = getAllWritings();
  const buildDate = new Date().toUTCString();

  const items = writings.map((writing) => {
    const { frontmatter } = writing;
    const pubDate = new Date(frontmatter.date).toUTCString();
    
    return `    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <link>${SITE_URL}/writings/${frontmatter.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/writings/${frontmatter.slug}</guid>
      <description>${escapeXml(frontmatter.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      ${frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>`;

  return rss;
}

// Generate and write RSS feed
const rss = generateRSS();
const outputPath = path.join(process.cwd(), 'public', 'rss.xml');

fs.writeFileSync(outputPath, rss);
console.log(`✅ RSS feed generated at ${outputPath}`);
console.log(`   Total items: ${rss.match(/<item>/g)?.length || 0}`);
