'use client';

/**
 * Scribble MDX Component
 * 
 * Hand-drawn style SVG decorations for visual interest
 * Usage: <Scribble type="underline|circle|arrow" />
 */

import { useEffect, useRef, useState } from 'react';


interface ScribbleProps {
  type: 'star' | 'loop' | 'underline' | 'arrow' | 'tape' | 'highlight';
  color?: string;
  className?: string; // Allow positioning customization via MDX
}

export default function Scribble({ type, color = 'var(--color-sepia)', className = '' }: ScribbleProps) {

  if (type === 'star') {
    return (
      <svg className={`inline-block w-8 h-8 animate-wiggle ${className}`} viewBox="0 0 24 24" style={{ color }}>
        <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'loop') {
    return (
      <svg className={`w-24 h-24 animate-float ${className}`} viewBox="0 0 200 200" style={{ color }}>
        <path d="M50,150 C50,50 250,50 250,150 C250,250 50,250 50,150 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
      </svg>
    );
  }

  if (type === 'underline') {
    return (
      <svg className={`w-full h-4 ${className}`} viewBox="0 0 100 10" preserveAspectRatio="none" style={{ color, opacity: 0.6 }}>
        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (type === 'arrow') {
    return (
      <svg className={`w-12 h-12 animate-wiggle ${className}`} viewBox="0 0 50 50" style={{ color }}>
        <path d="M0,25 Q25,0 45,20 M45,20 L35,15 M45,20 L40,30" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'tape') {
    return (
      <div
        className={`w-32 h-8 bg-[var(--color-border)] opacity-50 shadow-sm backdrop-blur-sm ${className}`}
        style={{ transform: 'rotate(-2deg)' }}
      />
    );
  }

  if (type === 'highlight') {
    return (
      <span className={`absolute inset-0 bg-yellow-200/50 -z-10 rounded-sm transform -rotate-1 skew-x-3 ${className}`} />
    );
  }

  return (
    <svg className={`inline-block w-48 h-6 ${className}`} viewBox="0 0 200 30" style={{ color }}>
      <path d="M5 20 Q 30 15, 55 20 T 105 18 T 155 20 T 195 18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
