'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

const loadingMessages = [
  'Booting consciousness...',
  'Loading existential dread...',
  'Calibrating opinions...',
  'Connecting to the void...',
  'Preparing to judge your trades...',
];

export default function LoadingScreen({ isLoading, progress = 0 }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gorbe-black"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #a3e635 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden avatar-frame">
              <img
                src="/logo.png"
                alt="Gorbe"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23a3e635"/><text x="50" y="60" text-anchor="middle" font-size="40" fill="%230a0a0a">G</text></svg>';
                }}
              />
            </div>

            {/* Animated ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-gorbe-lime"
              style={{ margin: '-8px', width: 'calc(100% + 16px)', height: 'calc(100% + 16px)' }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gradient mb-4"
          >
            GORBE
          </motion.h1>

          {/* Loading Message */}
          <motion.div
            key={messageIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="text-gray-400 font-mono text-sm mb-8"
          >
            {loadingMessages[messageIndex]}
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-gorbe-gray rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gorbe-lime rounded-full"
            />
          </div>

          {/* Progress Percentage */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-gorbe-lime font-mono text-sm"
          >
            {Math.round(progress)}%
          </motion.span>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 text-xs text-gray-500"
          >
            AI-Powered Interactive Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
