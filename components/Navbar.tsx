'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gorbe-lime/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gorbe-lime flex items-center justify-center">
                            <span className="text-gorbe-black font-bold text-lg">G</span>
                        </div>
                        <span className="text-xl font-bold font-display">
                            <span className="text-gorbe-lime">GORBE</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-gorbe-white/80 hover:text-gorbe-lime transition-colors">
                            Home
                        </Link>
                        <Link href="/docs" className="text-gorbe-white/80 hover:text-gorbe-lime transition-colors">
                            Docs
                        </Link>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gorbe-white/80 hover:text-gorbe-lime transition-colors"
                        >
                            Twitter/X
                        </a>
                        <motion.a
                            href="https://pump.fun"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-lime px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full live-badge"></span>
                            Buy $GORBE
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gorbe-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden py-4 border-t border-gorbe-lime/20"
                    >
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="text-gorbe-white/80 hover:text-gorbe-lime">Home</Link>
                            <Link href="/docs" className="text-gorbe-white/80 hover:text-gorbe-lime">Docs</Link>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gorbe-white/80 hover:text-gorbe-lime">
                                Twitter/X
                            </a>
                            <a
                                href="https://pump.fun"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-lime px-4 py-2 rounded-lg font-semibold text-center"
                            >
                                Buy $GORBE
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
