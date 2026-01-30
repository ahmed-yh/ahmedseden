import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getWritingBySlug, getRelatedWritings, getAllWritings } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { Writing } from '@/lib/types';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import PostMetadata from '@/components/PostMetadata';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Callout from '@/components/mdx/Callout';
import Footnote from '@/components/mdx/Footnote';
import Scribble from '@/components/mdx/Scribble';
import MobileTOC from '@/components/MobileTOC';

/**
 * Writing Page
 */

const mdxComponents = {
  Callout,
  Footnote,
  Scribble,
};

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all writings
export async function generateStaticParams() {
  const writings = getAllWritings();
  return writings.map((writing: Writing) => ({ slug: writing.frontmatter.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);
  const isPublic = writing?.frontmatter.isPublic;

  if (!writing || !isPublic) {
    return {
      title: 'Not Found',
    };
  }

  const { frontmatter } = writing;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
      images: frontmatter.image ? [{ url: frontmatter.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.image ? [frontmatter.image] : [],
    },
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing || !writing.frontmatter.isPublic) {
    notFound();
  }

  const { frontmatter, content } = writing;
  const relatedWritings = getRelatedWritings(slug, 4);

  return (
    <div className="min-h-screen post-page-bg font-serif text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">

      <MobileTOC /> {/* Mobile Navigation Drawer */}

      <div className="post-layout">
        {/* Left Pane: Sticky Sidebar */}
        <aside className="toc-sidebar">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/writings"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] hover:text-[var(--color-ink)] dark:hover:text-[var(--color-ink-dark)] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              Back
            </Link>
          </div>

          <div className="sticky top-8">
            <TableOfContents />
          </div>
        </aside>

        {/* Right Pane: Scrollable Content */}
        <div className="post-content-wrapper">
          <main className="post-content">
            <article id="article-content">
              {/* Header */}
              <header className="mb-12 border-b border-[var(--color-ink)] pb-8 border-dashed">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
                  {frontmatter.title}
                </h1>

                {/* Post Metadata */}
                <PostMetadata
                  plantedDate={frontmatter.date}
                  tendedDate={frontmatter.tendedDate}
                  status={frontmatter.status}
                  intendedAudience={frontmatter.intendedAudience}
                  hits={frontmatter.hits}
                />
              </header>

              {/* Featured image */}
              {frontmatter.image && (
                <figure className="mb-12">
                  <img
                    src={frontmatter.image}
                    alt=""
                    className="w-full border border-[var(--color-ink)] p-1 bg-white dark:bg-black/10"
                    loading="eager"
                  />
                </figure>
              )}

              {/* Content */}
              <div className="prose-gwern max-w-none">
                <MDXRemote source={content} components={mdxComponents} />
              </div>

              {/* Footer / Related */}
              {relatedWritings.length > 0 && (
                <footer className="mt-24 pt-12 border-t border-[var(--color-ink)]">
                  <h2 className="font-serif text-2xl font-bold mb-8">
                    Related Writings
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    {relatedWritings.map((related) => (
                      <Link
                        key={related.frontmatter.slug}
                        href={`/writings/${related.frontmatter.slug}`}
                        className="group block border-l-2 border-[var(--color-ink-muted)] pl-4 hover:border-[var(--color-sepia)] transition-colors"
                      >
                        <h3 className="font-serif text-lg font-bold group-hover:text-[var(--color-sepia)] transition-colors">
                          {related.frontmatter.title}
                        </h3>
                        <p className="text-sm font-mono text-[var(--color-ink-muted)] mt-1">
                          {formatDate(related.frontmatter.date)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </footer>
              )}
            </article>

            <div className="mt-24">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
