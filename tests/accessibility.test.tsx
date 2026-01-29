/**
 * Accessibility Smoke Tests
 * 
 * Basic a11y checks using axe-core
 */

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Hero from '../src/components/Hero';
import Footer from '../src/components/Footer';

describe('Accessibility Tests', () => {
  // Mock IntersectionObserver
  beforeAll(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  describe('Hero Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Hero />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading hierarchy', () => {
      const { container } = render(<Hero />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
    });

    it('should have accessible social links', () => {
      const { container } = render(<Hero />);
      const links = container.querySelectorAll('a[aria-label]');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Footer Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible RSS link', () => {
      const { container } = render(<Footer rssUrl="/rss.xml" />);
      const rssLink = container.querySelector('a[aria-label="RSS feed"]');
      expect(rssLink).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('Hero button should be focusable', () => {
      const { container } = render(<Hero />);
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      button?.focus();
      expect(document.activeElement).toBe(button);
    });

    it('Social links should be keyboard accessible', () => {
      const { container } = render(<Hero />);
      const links = container.querySelectorAll('a');
      links.forEach((link) => {
        link.focus();
        expect(document.activeElement).toBe(link);
      });
    });
  });
});
