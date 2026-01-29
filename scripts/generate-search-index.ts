/**
 * Search Index Generator Script
 * 
 * Run with: npx ts-node scripts/generate-search-index.ts
 * 
 * Generates search-index.json for client-side search
 */

import fs from 'fs';
import path from 'path';
import { getAllWritings } from '../src/lib/content';
import { generateSearchIndex } from '../src/lib/search';

function main(): void {
  const writings = getAllWritings();
  const searchIndex = generateSearchIndex(writings);

  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

  console.log(`✅ Search index generated at ${outputPath}`);
  console.log(`   Total documents: ${searchIndex.length}`);
}

main();
