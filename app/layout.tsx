import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

// Font link
const fontLink = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";

export const metadata: Metadata = {
  title: 'GORBE - AI Interactive Experience',
  description: 'Meet Gorbe - An AI-powered interactive character that thinks, speaks, and reacts live.',
  keywords: ['AI', 'interactive', 'Solana', 'memecoin', '3D', 'streaming'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'GORBE - AI Interactive Experience',
    description: 'Meet Gorbe - An AI-powered interactive character that thinks, speaks, and reacts live.',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GORBE - AI Interactive Experience',
    description: 'Meet Gorbe - An AI-powered interactive character that thinks, speaks, and reacts live.',
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
