'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThoughtBubbleProps {
  thought: string;
  isThinking: boolean;
  isSpeaking: boolean;
}

export default function ThoughtBubble({ thought, isThinking, isSpeaking }: ThoughtBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!thought) {
      setDisplayedText('');
      return;
    }

    setIsTyping(true);
    setDisplayedText('');

    let index = 0;
    const interval = setInterval(() => {
      if (index < thought.length) {
        setDisplayedText(thought.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [thought]);

  return (
    <div className="thought-bubble relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gorbe-lime/20">
        <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-yellow-400' : isSpeaking ? 'bg-gorbe-lime' : 'bg-gray-500'}`} />
        <span className="text-xs font-mono text-gray-400">
          {isThinking ? 'Processing...' : isSpeaking ? 'Speaking' : 'Idle'}
        </span>
      </div>

      {/* Thought Content */}
      <AnimatePresence mode="wait">
        {isThinking && !thought ? (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="typing-indicator"
          >
            <span />
            <span />
            <span />
          </motion.div>
        ) : thought ? (
          <motion.div
            key="thought"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-gray-200 leading-relaxed">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-gorbe-lime animate-typing" />
              )}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-gray-500 text-sm italic"
          >
            Waiting for interaction...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
