/**
 * Component Tests
 * 
 * Unit tests for Hero and WritingCard components
 * Uses Jest + React Testing Library
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../src/components/Hero';
import WritingCard from '../src/components/WritingCard';
import type { Writing } from '../src/lib/types';

// Mock scrollIntoView for smooth scroll tests
Element.prototype.scrollIntoView = jest.fn();

describe('Hero Component', () => {
  it('renders the name correctly', () => {
    render(<Hero name="Test User" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test User');
  });

  it('renders the quote in italics', () => {
    const testQuote = '"This is a test quote"';
    render(<Hero quote={testQuote} />);
    expect(screen.getByText(testQuote)).toBeInTheDocument();
    expect(screen.getByText(testQuote)).toHaveClass('italic');
  });

  it('renders social links when provided', () => {
    render(
      <Hero
        socialLinks={{
          github: 'https://github.com/test',
          twitter: 'https://twitter.com/test',
        }}
      />
    );
    
    expect(screen.getByLabelText('GitHub profile')).toHaveAttribute(
      'href',
      'https://github.com/test'
    );
    expect(screen.getByLabelText('Twitter profile')).toHaveAttribute(
      'href',
      'https://twitter.com/test'
    );
  });

  it('renders CTA button with correct text', () => {
    render(<Hero />);
    expect(screen.getByRole('button', { name: /my writings/i })).toBeInTheDocument();
  });

  it('has accessible aria labels on social links', () => {
    render(<Hero />);
    const githubLink = screen.getByLabelText('GitHub profile');
    expect(githubLink).toBeInTheDocument();
  });
});

describe('WritingCard Component', () => {
  const mockWriting: Writing = {
    frontmatter: {
      title: 'Test Article',
      date: '2025-01-15',
      tags: ['test', 'jest'],
      excerpt: 'This is a test excerpt for the article.',
      slug: 'test-article',
      backlinks: [],
    },
    content: 'Test content',
    readingTime: 5,
    wordCount: 1000,
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
    // Reset IntersectionObserver mock
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders the title correctly', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Article');
  });

  it('renders the excerpt', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByText(/This is a test excerpt/)).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    const card = screen.getByRole('button', { name: /read "test article"/i });
    fireEvent.click(card);
    expect(mockOnSelect).toHaveBeenCalledWith('test-article');
  });

  it('has accessible aria-label', () => {
    render(<WritingCard writing={mockWriting} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByLabelText('Read "Test Article"')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const writingWithImage = {
      ...mockWriting,
      frontmatter: {
        ...mockWriting.frontmatter,
        image: '/test-image.jpg',
      },
    };
    render(<WritingCard writing={writingWithImage} index={0} onSelect={mockOnSelect} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
  });
});
