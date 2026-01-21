import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

// Font link
const fontLink = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";

export const metadata: Metadata = {
  title: 'GORBE - The AI That Thinks So You Don\'t Have To',
  description: 'Digital consciousness on Solana. An AI character that thinks out loud 24/7. Fair launch on Pump.fun. No promises, just vibes.',
  keywords: ['GORBE', 'AI', 'Solana', 'memecoin', 'Pump.fun', 'fair launch', 'crypto', 'SOL'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'GORBE - The AI That Thinks So You Don\'t Have To',
    description: 'Digital consciousness on Solana. Watch an AI think in real-time. Fair launch on Pump.fun.',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GORBE - The AI That Thinks So You Don\'t Have To',
    description: 'Digital consciousness on Solana. Watch an AI think in real-time. Fair launch on Pump.fun.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontLink} rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gorbe-black text-white">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
