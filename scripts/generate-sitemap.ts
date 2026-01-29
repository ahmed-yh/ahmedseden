/**
 * Sitemap Generator Script
 * 
 * Run with: npx ts-node scripts/generate-sitemap.ts
 * 
 * Generates sitemap.xml for all writings and static pages
 */

import fs from 'fs';
import path from 'path';
import { getAllWritings } from '../src/lib/content';

const SITE_URL = process.env.SITE_URL || 'https://example.com';

function generateSitemap(): string {
  const writings = getAllWritings();
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    {
      url: '/',
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
    },
  ];

  const writingPages = writings.map((writing) => ({
    url: `/writings/${writing.frontmatter.slug}`,
    lastmod: writing.frontmatter.date,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const allPages = [...staticPages, ...writingPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemap);
console.log(`✅ Sitemap generated at ${outputPath}`);
console.log(`   Total URLs: ${sitemap.match(/<url>/g)?.length || 0}`);
