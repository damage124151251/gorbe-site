'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DocsPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 grid-pattern">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/" className="text-gorbe-lime hover:underline mb-4 inline-block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-5xl font-bold font-display mb-4">
                        The <span className="gradient-text">GORBE</span> Lore
                    </h1>
                    <p className="text-gorbe-white/60 text-lg">
                        Everything you need to know about the world's least productive streamer.
                    </p>
                </motion.div>

                {/* Origin Story */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gorbe-lime mb-4 flex items-center gap-3">
                        <span className="text-3xl">📖</span> Origin Story
                    </h2>
                    <div className="text-gorbe-white/80 space-y-4">
                        <p>
                            Once upon a time, in the depths of the internet, there was a creature named <span className="text-gorbe-lime font-semibold">Gorbe</span>.
                            Nobody knows exactly where Gorbe came from. Some say he emerged from a corrupted Twitch stream.
                            Others claim he was born from the collective dreams of everyone who ever said "I should start streaming."
                        </p>
                        <p>
                            What we DO know is that Gorbe has one singular dream: <span className="text-gorbe-lime font-semibold">to become a famous streamer</span>.
                            There's just one tiny problem...
                        </p>
                        <p className="text-2xl font-bold text-center py-4 text-gorbe-lime">
                            He has never actually streamed. Not once. Ever.
                        </p>
                        <p>
                            Every day, Gorbe wakes up with big plans. "Today's the day," he thinks.
                            "Today I'm finally gonna go live." And every day, something gets in the way.
                            His setup isn't perfect. His lighting is off. He doesn't have enough followers yet.
                            What if nobody watches? What if EVERYONE watches?
                        </p>
                        <p>
                            And so Gorbe remains in eternal preparation mode, planning the greatest stream that will never happen,
                            dreaming of a chat that will never exist, and practicing his "hey guys, welcome to the stream"
                            in front of a mirror.
                        </p>
                    </div>
                </motion.section>

                {/* Personality */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gorbe-lime mb-4 flex items-center gap-3">
                        <span className="text-3xl">🧠</span> Personality
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gorbe-gray/30 rounded-xl p-4">
                            <h3 className="font-semibold text-gorbe-lime mb-2">Traits</h3>
                            <ul className="text-gorbe-white/70 text-sm space-y-1">
                                <li>Optimistically delusional</li>
                                <li>Master procrastinator</li>
                                <li>Easily distracted</li>
                                <li>Forgets mid-sentence</li>
                                <li>Supportive but confused</li>
                                <li>Thinks out loud... a lot</li>
                            </ul>
                        </div>
                        <div className="bg-gorbe-gray/30 rounded-xl p-4">
                            <h3 className="font-semibold text-gorbe-lime mb-2">Catchphrases</h3>
                            <ul className="text-gorbe-white/70 text-sm space-y-1 italic">
                                <li>"I'll stream tomorrow... probably"</li>
                                <li>"What if I had like... 10 viewers tho"</li>
                                <li>"My setup isn't ready yet"</li>
                                <li>"Ngl I forgot what I was saying"</li>
                                <li>"Content ideas: 1. exist"</li>
                                <li>"One day fr fr"</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* The Technology */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gorbe-lime mb-4 flex items-center gap-3">
                        <span className="text-3xl">⚙️</span> How Gorbe Works
                    </h2>
                    <div className="text-gorbe-white/80 space-y-4">
                        <p>
                            Gorbe isn't just a static character - he's powered by <span className="text-gorbe-lime font-semibold">real AI</span>.
                            Here's how it works:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-gorbe-gray/30 rounded-xl p-4">
                                <h3 className="font-semibold text-gorbe-lime mb-2">🤖 AI Brain</h3>
                                <p className="text-sm text-gorbe-white/70">
                                    Gorbe uses Claude AI to think and respond. Each conversation is unique and based on his quirky personality.
                                </p>
                            </div>
                            <div className="bg-gorbe-gray/30 rounded-xl p-4">
                                <h3 className="font-semibold text-gorbe-lime mb-2">🗣️ Voice</h3>
                                <p className="text-sm text-gorbe-white/70">
                                    Using Web Speech API, Gorbe can actually speak his thoughts out loud. Turn up your volume!
                                </p>
                            </div>
                            <div className="bg-gorbe-gray/30 rounded-xl p-4">
                                <h3 className="font-semibold text-gorbe-lime mb-2">👀 Eye Tracking</h3>
                                <p className="text-sm text-gorbe-white/70">
                                    Gorbe's 3D model follows your mouse cursor. He's always watching... in his own distracted way.
                                </p>
                            </div>
                            <div className="bg-gorbe-gray/30 rounded-xl p-4">
                                <h3 className="font-semibold text-gorbe-lime mb-2">🎮 Interactive</h3>
                                <p className="text-sm text-gorbe-white/70">
                                    You can rotate and zoom the 3D model, and chat with Gorbe directly through the site.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* The Token */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gorbe-lime mb-4 flex items-center gap-3">
                        <span className="text-3xl">💎</span> $GORBE Token
                    </h2>
                    <div className="text-gorbe-white/80 space-y-4">
                        <p>
                            $GORBE is more than just a token - it's a community of people who understand the
                            struggle of wanting to do something but never actually doing it.
                        </p>
                        <div className="bg-gorbe-gray/30 rounded-xl p-6 mt-4">
                            <h3 className="font-semibold text-gorbe-lime mb-3">Why $GORBE?</h3>
                            <ul className="text-gorbe-white/70 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-gorbe-lime">✓</span>
                                    100% community driven
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-gorbe-lime">✓</span>
                                    Interactive AI character
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-gorbe-lime">✓</span>
                                    Unique lore and personality
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-gorbe-lime">✓</span>
                                    Actually fun to interact with
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-gorbe-lime">✓</span>
                                    No promises of utility (just vibes)
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* FAQ */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gorbe-lime mb-4 flex items-center gap-3">
                        <span className="text-3xl">❓</span> FAQ
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gorbe-white mb-2">Will Gorbe ever actually stream?</h3>
                            <p className="text-gorbe-white/60 text-sm">
                                Probably not. That's kind of the whole point. But who knows? Maybe one day...
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gorbe-white mb-2">Is this financial advice?</h3>
                            <p className="text-gorbe-white/60 text-sm">
                                Absolutely not. Gorbe can barely give streaming advice, let alone financial advice.
                                DYOR and only invest what you can afford to lose.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gorbe-white mb-2">Why doesn't Gorbe stream?</h3>
                            <p className="text-gorbe-white/60 text-sm">
                                Many reasons. His setup isn't ready. The lighting is wrong. Mercury is in retrograde.
                                The real question is: why do any of us not do the things we want to do?
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gorbe-white mb-2">Can I be friends with Gorbe?</h3>
                            <p className="text-gorbe-white/60 text-sm">
                                Gorbe considers everyone a friend! Just chat with him on the homepage and he'll
                                respond (eventually, when he remembers what he was doing).
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Links */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">Join the Non-Stream</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://pump.fun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-lime px-6 py-3 rounded-lg font-semibold"
                        >
                            Buy $GORBE
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gorbe-lime px-6 py-3 rounded-lg font-semibold hover:bg-gorbe-lime/10 transition-colors"
                        >
                            Twitter/X
                        </a>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
