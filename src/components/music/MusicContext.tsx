'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react';

interface MusicContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    showPopup: boolean;
    dismissPopup: () => void;
    hasInteracted: boolean;
    triggerMusicExperience: () => void;
    playMusic: () => void;
    trackName: string;
    isMusicReady: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [trackName, setTrackName] = useState<string>('Loading Music...');
    const [isMusicReady, setIsMusicReady] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio object
    useEffect(() => {
        // Fetch available tracks from API
        fetch('/api/music')
            .then(res => res.json())
            .then(data => {
                if (data.tracks && data.tracks.length > 0) {
                    // Pick a random track
                    const randomTrack = data.tracks[Math.floor(Math.random() * data.tracks.length)];

                    // Extract clean name (e.g., "/music/chill.mp3" -> "chill")
                    const filename = randomTrack.split('/').pop() || '';
                    const name = decodeURIComponent(filename).replace(/\.[^/.]+$/, '').replace(/-/g, ' ');

                    if (name) setTrackName(name);

                    const audio = new Audio(randomTrack);
                    audio.loop = true;
                    audio.volume = 0.5;
                    audioRef.current = audio;
                    setIsMusicReady(true);
                } else {
                    console.warn("No local music found in 'public/music'");
                    setTrackName("No Music Found");
                }
            })
            .catch(err => {
                console.error("Failed to fetch music list:", err);
                setTrackName("Error Loading Music");
            });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => {
                        console.warn("Playback failed:", error);
                        setIsPlaying(false);
                    });
            }
        }
    }, [isPlaying]);

    // Used for the initial auto-play attempt
    const triggerMusicExperience = useCallback(() => {
        if (hasInteracted) return;

        setHasInteracted(true);
        setShowPopup(true);

        // Attempt silent auto-play
        if (audioRef.current && !isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => {
                        // Expected failure on many browsers without user gesture
                        console.log("Auto-play blocked (waiting for interaction):", error);
                    });
            }
        }
    }, [hasInteracted, isPlaying]);

    // Force play (for use in buttons)
    const playMusic = useCallback(() => {
        if (!audioRef.current) return;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(error => console.error("Manual play failed:", error));
        }
    }, []);

    const dismissPopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    return (
        <MusicContext.Provider
            value={{
                isPlaying,
                togglePlay,
                showPopup,
                dismissPopup,
                hasInteracted,
                triggerMusicExperience,
                playMusic,
                trackName,
                isMusicReady,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}
