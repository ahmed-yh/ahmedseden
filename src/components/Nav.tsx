'use client';

/**
 * Navigation Component
 * 
 * Minimal floating navigation with:
 * - Hamburger menu (left) for navigation items
 * - Theme toggle (right) for light/dark mode
 * 
 * Features semi-transparent backdrop and keyboard accessibility
 */

import { useEffect, useState, useCallback } from 'react';
import { Menu, X, Sun, Moon, Home, BookOpen, User, Mail } from 'lucide-react';
import { getStoredTheme, setTheme, scrollToElement } from '@/lib/utils';

interface NavProps {
  aboutContent?: string;
  contactEmail?: string;
}

export default function Nav({
  aboutContent = 'A digital garden of thoughts, essays, and explorations.',
  contactEmail = 'hello@example.com',
}: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const theme = getStoredTheme() || 'light';
    setCurrentTheme(theme);
    setTheme(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  }, [currentTheme]);

  const handleNavClick = (action: string) => {
    setIsMenuOpen(false);
    
    switch (action) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'writings':
        scrollToElement('writings');
        break;
      case 'about':
        setIsAboutOpen(true);
        break;
      case 'contact':
        window.location.href = `mailto:${contactEmail}`;
        break;
    }
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsAboutOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Fixed navigation bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Menu button (left) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 rounded-lg bg-[var(--color-card)]/80 dark:bg-[var(--color-card-dark)]/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          {/* Theme toggle (right) */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-[var(--color-card)]/80 dark:bg-[var(--color-card-dark)]/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {currentTheme === 'light' ? (
              <Moon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Sun className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu panel */}
          <div
            id="nav-menu"
            className="fixed top-16 left-4 z-50 w-56 py-2 rounded-xl bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] shadow-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
            role="menu"
          >
            <button
              onClick={() => handleNavClick('home')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left font-sans text-sm hover:bg-[var(--color-border)]/50 dark:hover:bg-[var(--color-border-dark)]/50 transition-colors"
              role="menuitem"
            >
              <Home className="w-4 h-4 text-[var(--color-ink-muted)]" aria-hidden="true" />
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavClick('writings')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left font-sans text-sm hover:bg-[var(--color-border)]/50 dark:hover:bg-[var(--color-border-dark)]/50 transition-colors"
              role="menuitem"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-ink-muted)]" aria-hidden="true" />
              <span>Writings</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left font-sans text-sm hover:bg-[var(--color-border)]/50 dark:hover:bg-[var(--color-border-dark)]/50 transition-colors"
              role="menuitem"
            >
              <User className="w-4 h-4 text-[var(--color-ink-muted)]" aria-hidden="true" />
              <span>About</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left font-sans text-sm hover:bg-[var(--color-border)]/50 dark:hover:bg-[var(--color-border-dark)]/50 transition-colors"
              role="menuitem"
            >
              <Mail className="w-4 h-4 text-[var(--color-ink-muted)]" aria-hidden="true" />
              <span>Contact</span>
            </button>
          </div>
        </>
      )}

      {/* About modal */}
      {isAboutOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-[var(--color-overlay)] dark:bg-[var(--color-overlay-dark)]"
            onClick={() => setIsAboutOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-8 rounded-xl bg-[var(--color-card)] dark:bg-[var(--color-card-dark)] shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
          >
            <h2
              id="about-title"
              className="font-serif text-2xl font-semibold mb-4 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
            >
              About
            </h2>
            <p className="font-serif text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] leading-relaxed mb-6">
              {aboutContent}
            </p>
            <button
              onClick={() => setIsAboutOpen(false)}
              className="btn btn-outline text-sm"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
