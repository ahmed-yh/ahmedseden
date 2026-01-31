import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const musicDir = path.join(process.cwd(), 'public', 'music');

        // Create directory if it doesn't exist
        if (!fs.existsSync(musicDir)) {
            return NextResponse.json({ tracks: [] });
        }

        const files = fs.readdirSync(musicDir);

        // Filter for audio files
        const tracks = files
            .filter(file => /\.(mp3|wav|ogg|m4a)$/i.test(file))
            .map(file => `/music/${file}`);

        return NextResponse.json({ tracks });
    } catch (error) {
        console.error('Error reading music directory:', error);
        return NextResponse.json({ tracks: [] }, { status: 500 });
    }
}
