'use client';

import { useEffect, useState } from 'react';

/**
 * PostMetadata Component
 * 
 * Displays Brad Woods-style metadata for blog posts:
 * - PLANTED: Original publish date
 * - TENDED: Last modified date
 * - STATUS: Growth stage (sprout, budding, evergreen)
 * - HITS: View count (placeholder)
 * 
 * Styled with monospace font and uppercase text
 */

interface PostMetadataProps {
    plantedDate: string;
    tendedDate?: string;
    status?: 'sprout' | 'budding' | 'evergreen';
    intendedAudience?: string;
    hits?: number;
}

export default function PostMetadata({
    plantedDate,
    tendedDate,
    status = 'sprout',
    intendedAudience = 'SOFTWARE ENGINEERS',
    hits = 7926,
}: PostMetadataProps) {
    const formatMetadataDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        }).toUpperCase();
    };

    return (
        <div className="mb-8 text-xs font-mono uppercase tracking-wider text-[var(--color-ink-muted)] dark:text-[var(--color-ink-muted-dark)] space-y-1">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
                <div>
                    <span className="font-semibold">PLANTED:</span>{' '}
                    <span>{formatMetadataDate(plantedDate)}</span>
                </div>
                <div>
                    <span className="font-semibold">TENDED:</span>{' '}
                    <span>{formatMetadataDate(tendedDate || plantedDate)}</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
                <div>
                    <span className="font-semibold">INTENDED AUDIENCE:</span>{' '}
                    <span>{intendedAudience}</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
                <div>
                    <span className="font-semibold">STATUS:</span>{' '}
                    <span>{status.toUpperCase()}</span>
                </div>
                <div>
                    <span className="font-semibold">HITS:</span>{' '}
                    <span>{hits}%</span>
                </div>
            </div>
        </div>
    );
}
