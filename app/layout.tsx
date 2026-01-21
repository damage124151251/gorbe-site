import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
    title: 'GORBE | The Streamer Who Never Streams',
    description: 'Meet Gorbe - an AI character who just wants to be a streamer. Watch him think, talk, and interact live!',
    keywords: ['gorbe', 'ai', 'streamer', 'solana', 'memecoin', 'interactive'],
    openGraph: {
        title: 'GORBE | The Streamer Who Never Streams',
        description: 'Meet Gorbe - an AI character who just wants to be a streamer.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GORBE | The Streamer Who Never Streams',
        description: 'Meet Gorbe - an AI character who just wants to be a streamer.',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col bg-gorbe-black text-gorbe-white">
                <SmoothScroll>
                    <Navbar />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </SmoothScroll>
            </body>
        </html>
    );
}
