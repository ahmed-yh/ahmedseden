'use client';

/**
 * Hero Component
 * 
 * Full-viewport hero with Gwern-style typography:
 * - Large serif title with tight tracking
 * - Italic quote below
 * - Social icons row
 * - CTA button to navigate to writings page
 * 
 * Features paper texture background and subtle gradient overlays
 */

import { Github, Instagram, Briefcase, Music } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  name?: string;
  quote?: string;
  socialLinks?: {
    github?: string;
    instagram?: string;
    portfolio?: string;
    spotify?: string;
  };
}

export default function Hero({
  name = 'Ahmed Yassine',
  quote = "I write about things I'm interested in and betting on there are others like me",
  socialLinks = {
    github: 'https://github.com',
    instagram: 'https://instagram.com',
    portfolio: 'https://portfolio.com',
    spotify: 'https://spotify.com',
  },
}: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center paper-texture hero-gradient overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Scribbles */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden select-none">
        {/* Top Left Scribble */}
        <svg className="absolute top-10 left-[10%] w-64 h-64 text-[var(--color-sepia)] animate-float" viewBox="0 0 200 200">
          <path d="M40,100 Q80,20 160,100 T180,180" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="2" fill="currentColor" />
          <circle cx="120" cy="40" r="1.5" fill="currentColor" />
          <circle cx="60" cy="150" r="2.5" fill="currentColor" />
        </svg>

        {/* Bottom Right Loop */}
        <svg className="absolute bottom-20 right-[5%] w-96 h-96 text-[var(--color-ink-muted)] animate-float-delayed" viewBox="0 0 300 300">
          <path d="M50,150 C50,50 250,50 250,150 C250,250 50,250 50,150 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
          <path d="M100,150 C100,200 200,200 200,150" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Random Stars */}
        <svg className="absolute top-1/4 right-[20%] w-12 h-12 text-[var(--color-sepia-dark)] animate-wiggle" viewBox="0 0 24 24">
          <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-1/3 left-[15%] w-8 h-8 text-[var(--color-ink)] animate-wiggle" viewBox="0 0 24 24" style={{ animationDelay: '2s' }}>
          <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Content container - centered with Gwern-style typography */}
      <div className="relative z-10 text-center px-6 py-12 max-w-3xl mx-auto">

        {/* Decorative "Polaroid" Frame Scribble around the title */}
        <div className="relative inline-block mb-6">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] relative z-10">
            {name}
          </h1>

          {/* Hand-drawn underline/highlight */}
          <svg className="absolute -bottom-2 left-0 w-full h-8 text-[var(--color-sepia)] -z-10 opacity-60" viewBox="0 0 300 15" preserveAspectRatio="none">
            <path d="M5,10 Q150,0 295,10" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>

          {/* Sparkle near title */}
          <svg className="absolute -top-6 -right-8 w-10 h-10 text-[var(--color-sepia)] animate-bounce duration-[3000ms]" viewBox="0 0 24 24">
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" fill="currentColor" />
          </svg>
        </div>

        {/* Italicized quote */}
        <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] mb-12 leading-relaxed max-w-2xl mx-auto relative">
          <span className="relative">
            {quote}
            {/* Quote marks decorative */}
            <span className="absolute -top-4 -left-6 text-6xl text-[var(--color-sepia)] opacity-20 font-serif font-bold">“</span>
          </span>
        </p>

        {/* Social icons row */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-[var(--color-paper)] dark:text-[var(--color-paper-dark)] group"
              aria-label="GitHub profile"
            >
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
            </a>
          )}
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-[var(--color-paper)] dark:text-[var(--color-paper-dark)] group"
              aria-label="Instagram profile"
            >
              <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
            </a>
          )}
          {socialLinks.portfolio && (
            <a
              href={socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-[var(--color-paper)] dark:text-[var(--color-paper-dark)] group"
              aria-label="Portfolio"
            >
              <Briefcase className="w-6 h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
            </a>
          )}
          {socialLinks.spotify && (
            <a
              href={socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-[var(--color-paper)] dark:text-[var(--color-paper-dark)] group"
              aria-label="Spotify profile"
            >
              <Music className="w-6 h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* CTA Button - navigate to writings page */}
        <div className="relative inline-block">
          {/* Hand drawn arrow pointing to button */}
          <svg className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 text-[var(--color-ink-muted)] hidden sm:block animate-wiggle" viewBox="0 0 50 50">
            <path d="M0,25 Q25,0 45,20 M45,20 L35,15 M45,20 L40,30" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>

          <Link
            href="/writings"
            className="btn btn-outline text-base sm:text-lg px-8 py-4 font-sans font-bold tracking-wide relative group overflow-hidden bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)] border-2 border-[var(--color-ink)] dark:border-[var(--color-ink-dark)]"
            aria-label="View my writings"
          >
            <span className="relative z-10 group-hover:text-[var(--color-paper)] dark:group-hover:text-[var(--color-paper-dark)] transition-colors duration-300">
              My Writings
            </span>
            <div className="absolute inset-0 bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>

      </div>
    </section>
  );
}
