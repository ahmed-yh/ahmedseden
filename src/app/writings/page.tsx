import WritingsGrid from '@/components/WritingsGrid';
import Search from '@/components/Search';
import Footer from '@/components/Footer';
import { getAllWritings } from '@/lib/content';
import type { SearchResult } from '@/lib/types';

/**
 * Writings Page
 * 
 * Dedicated page for browsing all writings:
 * - Fetches content dynamically from MDX files
 * - Polaroid-style masonry grid
 * - Integrated search functionality
 * - Separate from hero section
 */

export default function WritingsPage() {
    // Fetch all writings dynamically at build time
    const writings = getAllWritings();

    // Generate search index from writings
    const searchIndex: SearchResult[] = writings.map((w) => ({
        slug: w.frontmatter.slug,
        title: w.frontmatter.title,
        excerpt: w.frontmatter.excerpt,
        tags: w.frontmatter.tags,
    }));

    return (
        <main className="min-h-screen bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-10 select-none overflow-hidden h-full">
                <svg className="absolute top-20 -left-10 w-96 h-96 text-[var(--color-sepia)] animate-float-delayed" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                    <path d="M50,50 Q150,150 50,150" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg className="absolute top-1/3 -right-20 w-80 h-80 text-[var(--color-ink-muted)] animate-float" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" />
                </svg>
            </div>

            {/* Page header */}
            <div className="pt-32 pb-12 px-6 text-center relative z-10">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] mb-4 inline-block relative">
                    My Writings
                    {/* Hand-drawn scribble under title */}
                    <svg className="absolute -bottom-2 -left-4 w-[110%] h-4 text-[var(--color-sepia)] opacity-60 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                </h1>
                <p className="font-serif text-lg sm:text-xl italic text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] max-w-2xl mx-auto">
                    A collection of thoughts, ideas, and explorations
                </p>
            </div>

            {/* Introduction */}
            <div className="max-w-3xl mx-auto px-6 mb-16 relative z-10">
                <div className="relative p-8 md:p-10 rounded-2xl bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-sm transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {/* Decorative "Tape" element */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[var(--color-border)] opacity-50 rotate-[-2deg] shadow-sm backdrop-blur-sm" />

                    <div className="prose prose-lg dark:prose-invert font-serif leading-relaxed text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] mx-auto text-center">
                        <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                            Hello, I'm Ahmed. Probably like you, I'm that person who is constantly coming up with lots of little project ideas. Whether that be ideas for apps, websites, games, businesses; whatever. I have them all stored on a list in my phone, and I know you probably have one of those lists too.
                        </p>
                        <p className="mb-6">
                            The problem is I never seem to get round to completing them, or even starting them for that matter. The list just grows bigger and bigger.
                        </p>
                        <p className="text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] italic">
                            The goal of this website is to try and explore as many of these ideas as I can.
                        </p>
                    </div>
                </div>
            </div>

            {/* Writings grid */}
            <WritingsGrid
                writings={writings}
            />

            {/* Search - Client component that handles interaction */}
            <Search
                searchIndex={searchIndex}
            />

            {/* Footer */}
            <Footer name="Ahmed Yassine" rssUrl="/rss.xml" />
        </main>
    );
}
