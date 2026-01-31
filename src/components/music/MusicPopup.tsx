'use client';

import { useMusic } from './MusicContext';
import { XIcon } from './MusicIcons';
import Scribble from '@/components/mdx/Scribble';

export default function MusicPopup() {
    const { showPopup, dismissPopup } = useMusic();

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative bg-[#fff8f0] dark:bg-[#1a1a1a] p-8 md:p-12 rounded-lg shadow-2xl max-w-lg w-full transform transition-all scale-100 rotate-1 border-2 border-[var(--color-ink)]">

                {/* Decorative Scribbles */}
                <div className="absolute -top-6 -left-6 transform -rotate-12 scale-75 opacity-80">
                    <Scribble type="star" color="#ffb703" />
                </div>
                <div className="absolute -bottom-4 -right-4 transform rotate-6 scale-75 opacity-60">
                    <Scribble type="loop" color="#fb8500" />
                </div>

                {/* Close Button */}
                <button
                    onClick={dismissPopup}
                    className="absolute top-4 right-4 p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                    aria-label="Close"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="text-center space-y-6">
                    <h2 className="font-handwriting text-3xl md:text-4xl text-white transform -rotate-2
">
                        Playing some tunes...
                    </h2>

                    <p className="font-serif text-lg text-[var(--color-ink-muted)] leading-relaxed">
                        enjoy reading with some music
                        <br />
                        <span className="text-sm italic opacity-75">(you can stop it anytime)</span>
                    </p>

                    <div className="pt-4">
                        <button
                            onClick={dismissPopup}
                            className="group relative inline-flex items-center justify-center px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase transition-all duration-300 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[#ffb703] hover:text-black hover:-translate-y-1 hover:shadow-lg border border-[var(--color-ink)]"
                        >
                            <span>Keep Vibing</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Inline styles for the specific handwriting font if needed, 
          though layout.tsx loads fonts. We use a fallback if not available. */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
        .font-handwriting {
          font-family: 'Permanent Marker', cursive, sans-serif;
        }
      `}</style>
        </div>
    );
}
