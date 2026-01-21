'use client';

import { motion } from 'framer-motion';

interface LoadingProps {
    progress?: number;
}

export default function Loading({ progress = 0 }: LoadingProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-gorbe-black flex flex-col items-center justify-center"
        >
            {/* Grid background */}
            <div className="absolute inset-0 grid-pattern opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 mx-auto rounded-full bg-gorbe-lime glow-lime-strong flex items-center justify-center">
                        <span className="text-gorbe-black font-bold text-4xl font-display">G</span>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold font-display mb-4"
                >
                    <span className="gradient-text">GORBE</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-gorbe-white/60 mb-8"
                >
                    Loading the stream...
                </motion.p>

                {/* Loading dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <div className="w-3 h-3 bg-gorbe-lime rounded-full loading-dot"></div>
                    <div className="w-3 h-3 bg-gorbe-lime rounded-full loading-dot"></div>
                    <div className="w-3 h-3 bg-gorbe-lime rounded-full loading-dot"></div>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '200px', opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="h-1 bg-gorbe-gray rounded-full overflow-hidden mx-auto"
                >
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gorbe-lime"
                    />
                </motion.div>

                {/* Progress text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gorbe-lime text-sm mt-2 mono"
                >
                    {progress}%
                </motion.p>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-10 w-20 h-20 border border-gorbe-lime/20 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-10 h-10 border border-gorbe-lime/10 rounded-full animate-pulse"></div>
        </motion.div>
    );
}
