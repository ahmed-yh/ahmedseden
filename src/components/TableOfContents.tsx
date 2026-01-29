'use client';

import { useEffect, useState } from 'react';


/**
 * TableOfContents Component
 * 
 * Brad Woods-style sidebar navigation:
 * - Extracts headings from MDX content
 * - Displays hierarchical list
 * - Highlights current section on scroll
 * - Sticky positioning on desktop
 * - Collapsible on mobile
 */

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    contentId?: string;
}

export default function TableOfContents({ contentId = 'article-content' }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Extract headings from the article content
        const article = document.getElementById(contentId);
        if (!article) return;

        const headingElements = article.querySelectorAll('h1, h2, h3, h4');
        const headingData: Heading[] = Array.from(headingElements).map((heading, index) => {
            // Create ID if it doesn't exist
            if (!heading.id) {
                const id = heading.textContent
                    ?.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '') || `heading-${index}`;
                heading.id = id;
            }

            return {
                id: heading.id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName[1]),
            };
        });

        setHeadings(headingData);
    }, [contentId]);

    useEffect(() => {
        // Track which heading is currently in view
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            // Find the heading that is closest to the top of the viewport
            const visibles = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visibles.length > 0) {
                setActiveId(visibles[0].target.id);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            // Margin triggers when heading is roughly at the top third of viewport
            rootMargin: '-80px 0px -70% 0px',
            threshold: [0, 1]
        });

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="toc-nav" aria-label="Table of contents">
            <h2 className="toc-header">
                Table of Contents
            </h2>
            <hr className="toc-separator" />
            <ul className="space-y-3 font-mono text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{
                            paddingLeft: `${(heading.level - 1) * 1}rem`,
                        }}
                    >
                        <div className="relative inline-block">
                            <a
                                href={`#${heading.id}`}
                                className={`
                  block transition-colors duration-200 relative z-10
                  ${activeId === heading.id
                                        ? 'font-bold text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]'
                                        : 'text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] hover:text-[var(--color-ink)] dark:hover:text-[var(--color-ink-dark)]'
                                    }
                `}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(heading.id);
                                    if (element) {
                                        const yOffset = -50;
                                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                        window.history.pushState(null, '', `#${heading.id}`);
                                    }
                                }}
                            >
                                {heading.text}
                            </a>
                            {activeId === heading.id && (
                                <svg
                                    className="absolute -bottom-1 -left-1 w-[110%] h-[80%] text-[var(--color-sepia)] -z-0 pointer-events-none opacity-60"
                                    viewBox="0 0 100 10"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0 5 Q 50 10 100 5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        className="animate-scribble"
                                    />
                                </svg>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
