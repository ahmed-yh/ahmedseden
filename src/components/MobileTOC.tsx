'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TableOfContents from './TableOfContents';

/**
 * MobileTOC Component
 * 
 * A mobile-specific drawer for the Table of Contents.
 * Provides an app-like navigation experience on small screens.
 */
export default function MobileTOC() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Action Button (FAB) */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full shadow-lg lg:hidden hover:scale-110 transition-transform duration-200"
                aria-label="Open Table of Contents"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-[60] w-3/4 max-w-sm bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border)] pb-4">
                        <h2 className="font-serif text-xl font-bold text-[var(--color-ink)]">
                            Contents
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {/* Reuse the existing logic but style for drawer */}
                        <div onClick={() => setIsOpen(false)}>
                            <TableOfContents />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
