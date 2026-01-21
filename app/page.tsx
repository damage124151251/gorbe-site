'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
import GorbeChat from '@/components/GorbeChat';

// Dynamic import for Three.js (client-side only)
const GorbeViewer = dynamic(() => import('@/components/GorbeViewer'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-gorbe-lime animate-pulse">Loading 3D...</div>
        </div>
    )
});

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [currentThought, setCurrentThought] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const handleThoughtChange = (thought: string, thinking: boolean, speaking: boolean) => {
        setCurrentThought(thought);
        setIsThinking(thinking);
        setIsSpeaking(speaking);
    };

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && <Loading progress={Math.min(Math.round(loadingProgress), 100)} />}
            </AnimatePresence>

            {/* Main Content */}
            <div className="min-h-screen pt-16 grid-pattern">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Left - Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-red-500 rounded-full live-badge"></span>
                                    <span className="text-sm font-semibold text-gorbe-lime">LIVE NOW</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold font-display">
                                    Meet{' '}
                                    <span className="gradient-text">GORBE</span>
                                </h1>

                                <p className="text-xl text-gorbe-white/70 max-w-lg">
                                    The streamer who never streams. Just vibing, thinking out loud,
                                    and dreaming about having more than 0 viewers.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <motion.a
                                        href="https://pump.fun"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-lime px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                                    >
                                        <span className="w-2 h-2 bg-gorbe-black rounded-full"></span>
                                        Buy $GORBE
                                    </motion.a>
                                    <motion.a
                                        href="/docs"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="border border-gorbe-lime/50 hover:border-gorbe-lime px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Learn More
                                    </motion.a>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 pt-8">
                                    <div className="glass rounded-xl p-4 text-center card-hover">
                                        <p className="text-2xl font-bold text-gorbe-lime">0</p>
                                        <p className="text-xs text-gorbe-white/60">Streams Done</p>
                                    </div>
                                    <div className="glass rounded-xl p-4 text-center card-hover">
                                        <p className="text-2xl font-bold text-gorbe-lime">47</p>
                                        <p className="text-xs text-gorbe-white/60">Days Planning</p>
                                    </div>
                                    <div className="glass rounded-xl p-4 text-center card-hover">
                                        <p className="text-2xl font-bold text-gorbe-lime">Infinite</p>
                                        <p className="text-xs text-gorbe-white/60">Procrastination</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right - 3D Viewer */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="relative h-[500px] lg:h-[600px] glass rounded-3xl overflow-hidden glow-lime"
                            >
                                <GorbeViewer
                                    thought={currentThought}
                                    isThinking={isThinking}
                                    isSpeaking={isSpeaking}
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Chat Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold font-display mb-4">
                                Talk to <span className="gradient-text">Gorbe</span>
                            </h2>
                            <p className="text-gorbe-white/60 max-w-lg mx-auto">
                                Say hi, ask questions, or just watch him think random thoughts.
                                He might actually respond... eventually.
                            </p>
                        </motion.div>

                        <div className="max-w-2xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="glass rounded-3xl h-[500px] overflow-hidden"
                            >
                                <GorbeChat onThoughtChange={handleThoughtChange} />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gorbe-dark/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold font-display mb-4">
                                Why <span className="gradient-text">$GORBE</span>?
                            </h2>
                            <p className="text-gorbe-white/60 max-w-lg mx-auto">
                                Because sometimes the journey is more important than the destination.
                                And Gorbe's journey is... interesting.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: '🎮',
                                    title: 'Interactive AI',
                                    description: 'Gorbe thinks and responds using real AI. Each conversation is unique!'
                                },
                                {
                                    icon: '🗣️',
                                    title: 'Voice Enabled',
                                    description: 'Gorbe can actually talk! Turn up your volume and hear his thoughts.'
                                },
                                {
                                    icon: '👀',
                                    title: 'Follows Your Mouse',
                                    description: 'Move your mouse around and watch Gorbe follow. He\'s always watching... kinda.'
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl p-6 card-hover"
                                >
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gorbe-white/60 text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="text-center glass rounded-3xl p-12 glow-lime"
                        >
                            <h2 className="text-4xl font-bold font-display mb-4">
                                Join the <span className="gradient-text">Non-Stream</span>
                            </h2>
                            <p className="text-gorbe-white/70 mb-8 max-w-lg mx-auto">
                                Be part of the community. We don't stream, but we vibe together.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.a
                                    href="https://pump.fun"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-lime px-8 py-4 rounded-lg font-bold text-lg"
                                >
                                    Buy $GORBE on Pump.fun
                                </motion.a>
                                <motion.a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border border-gorbe-lime px-8 py-4 rounded-lg font-bold text-lg hover:bg-gorbe-lime/10 transition-colors"
                                >
                                    Follow on Twitter/X
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
