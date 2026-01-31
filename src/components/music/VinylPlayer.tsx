'use client';

import { useState, useEffect } from 'react';
import { useMusic } from './MusicContext';
import { PlayIcon, PauseIcon } from './MusicIcons';
import Scribble from '@/components/mdx/Scribble';

export default function VinylPlayer() {
    const { isPlaying, togglePlay, hasInteracted, trackName } = useMusic();
    const [showInfo, setShowInfo] = useState(false);

    // Handle temporary visibility of the info box
    // Triggers EVERY time isPlaying becomes true
    // MOVED: Accessing hooks must happen before any returns
    useEffect(() => {
        if (isPlaying) {
            setShowInfo(true);
            const timer = setTimeout(() => {
                setShowInfo(false);
            }, 5000); // Hide after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [isPlaying]);

    // Only show the player if the user has interacted (seen the popup)
    if (!hasInteracted) return null;

    return (
        <>
            <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          .scribble-spin {
             animation: spin 8s linear infinite;
          }
        `}</style>

            <div className="fixed bottom-6 left-6 z-50 flex items-end gap-6 animate-in slide-in-from-bottom-10 fade-in duration-700">

                {/* Vinyl Disc / Control Button */}
                <button
                    onClick={togglePlay}
                    className="group relative w-24 h-24 shrink-0 focus:outline-none transition-transform duration-300 hover:scale-105"
                    aria-label={isPlaying ? "Pause Music" : "Play Music"}
                >
                    {/* Container for the scribbly layers */}
                    <div className={`relative w-full h-full ${isPlaying ? 'scribble-spin' : ''}`}>
                        {/* Base Scribble (Outer) */}
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[var(--color-ink)] drop-shadow-xl" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M50 5 C 20 5, 5 25, 5 50 C 5 75, 25 95, 50 95 C 75 95, 95 75, 95 50 C 95 25, 75 5, 50 5 Z M 50 15 C 70 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 20 70, 15 50 C 12 30, 30 15, 50 15" strokeDasharray="3 2" />
                        </svg>

                        {/* Inner Scribble (The 'Grooves') */}
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[var(--color-ink-muted)] opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M50 25 A 25 25 0 1 0 50 75 A 25 25 0 1 0 50 25 Z" />
                            <path d="M50 35 A 15 15 0 1 0 50 65 A 15 15 0 1 0 50 35 Z" />
                        </svg>

                        {/* Center Label (Sepia Accent) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-sepia)] border-2 border-[var(--color-ink)] flex items-center justify-center shadow-inner">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-paper)]"></div>
                        </div>
                    </div>

                    {/* Play/Pause Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[var(--color-paper)]/90 rounded-full p-3 border-2 border-[var(--color-ink)] shadow-md">
                            {isPlaying ? (
                                <PauseIcon className="w-8 h-8 text-[var(--color-ink)]" />
                            ) : (
                                <PlayIcon className="w-8 h-8 text-[var(--color-ink)] ml-0.5" />
                            )}
                        </div>
                    </div>
                </button>

                {/* Track Info Box (Scribbly Background) */}
                {/* Only visible when showInfo is true */}
                <div className={`transition-all duration-700 origin-left ease-out ${showInfo ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95 pointer-events-none'}`}>
                    <div className="relative mb-4">
                        {/* Decorative Arrow */}
                        <div className="absolute -left-6 bottom-2 transform rotate-12 scale-50 opacity-80 text-[var(--color-ink)]">
                            <Scribble type="arrow" />
                        </div>

                        {/* The Box */}
                        <div className="relative bg-[var(--color-paper)] p-4 pr-6 min-w-[200px] border-2 border-[var(--color-ink)] shadow-[4px_4px_0px_var(--color-sepia)] transform -rotate-1 rounded-sm">

                            {/* Now Spinning Label */}
                            <div className="absolute -top-3 -left-2 bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-widest transform -rotate-2">
                                Now Spinning
                            </div>

                            {/* Song Title */}
                            <div className="mt-1">
                                <p className="font-handwriting text-lg leading-tight text-[var(--color-ink)] line-clamp-2">
                                    {trackName}
                                </p>
                            </div>

                            {/* Decorative Underline */}
                            <div className="mt-2 opacity-50 text-[var(--color-sepia)] max-w-[80%]">
                                <Scribble type="underline" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
