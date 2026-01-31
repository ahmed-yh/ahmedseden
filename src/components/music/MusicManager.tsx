'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMusic } from './MusicContext';

export default function MusicManager() {
    const pathname = usePathname();
    const { triggerMusicExperience, hasInteracted, isMusicReady } = useMusic();

    useEffect(() => {
        // Check if we are in the writings section AND music is loaded
        if (pathname?.startsWith('/writings') && !hasInteracted && isMusicReady) {
            // Small delay to ensure page load feels settled before popup
            const timer = setTimeout(() => {
                triggerMusicExperience();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [pathname, hasInteracted, triggerMusicExperience]);

    return null; // This component has no UI, just logic
}
