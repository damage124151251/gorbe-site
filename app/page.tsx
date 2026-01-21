'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import ThoughtBubble from '@/components/ThoughtBubble';

const GorbeScene = dynamic(() => import('@/components/GorbeModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gorbe-dark">
      <div className="w-16 h-16 mb-4 rounded-full border-4 border-gorbe-lime/30 border-t-gorbe-lime animate-spin" />
      <div className="text-gorbe-lime animate-pulse">Loading Gorbe...</div>
    </div>
  ),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [thoughtHistory, setThoughtHistory] = useState<string[]>([]);

  // Load saved thoughts from localStorage on mount
  useEffect(() => {
    const savedThoughts = localStorage.getItem('gorbe-thoughts');
    const savedCurrent = localStorage.getItem('gorbe-current-thought');

    if (savedThoughts) {
      try {
        setThoughtHistory(JSON.parse(savedThoughts));
      } catch (e) {
        console.error('Error loading saved thoughts');
      }
    }

    if (savedCurrent) {
      setCurrentThought(savedCurrent);
    }
  }, []);

  // Save thoughts to localStorage when they change
  useEffect(() => {
    if (thoughtHistory.length > 0) {
      localStorage.setItem('gorbe-thoughts', JSON.stringify(thoughtHistory));
    }
  }, [thoughtHistory]);

  useEffect(() => {
    if (currentThought) {
      localStorage.setItem('gorbe-current-thought', currentThought);
    }
  }, [currentThought]);

  // Loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Auto-generate thoughts
  useEffect(() => {
    if (isLoading) return;

    const generateThought = async () => {
      try {
        setIsThinking(true);
        const response = await fetch('/api/chat');
        const data = await response.json();
        if (data.thought) {
          setCurrentThought(data.thought);
          setThoughtHistory(prev => {
            const newHistory = [data.thought, ...prev.filter(t => t !== data.thought)].slice(0, 20);
            return newHistory;
          });
        }
      } catch (error) {
        console.error('Error generating thought:', error);
      } finally {
        setTimeout(() => setIsThinking(false), 2000);
      }
    };

    // Generate first thought after 2 seconds (only if no saved thought)
    const initialTimeout = setTimeout(() => {
      if (!currentThought) {
        generateThought();
      } else {
        // If we have a saved thought, still generate a new one but after showing the saved one
        setTimeout(generateThought, 5000);
      }
    }, 2000);

    // Then generate new thoughts every 30 seconds
    const interval = setInterval(generateThought, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={Math.min(loadingProgress, 100)} />

      <div className="min-h-screen bg-gorbe-black">
        <div className="stream-container">
          {/* 3D Model Area */}
          <div className="scene-area relative">
            <GorbeScene
              isThinking={isThinking}
              isSpeaking={false}
              onLoad={() => {}}
            />
          </div>

          {/* Sidebar - Thoughts Only */}
          <div className="sidebar-area">
            {/* Profile Card */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden avatar-frame">
                  <img
                    src="/logo.png"
                    alt="Gorbe"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23a3e635"/><text x="50" y="60" text-anchor="middle" font-size="40" fill="%230a0a0a">G</text></svg>';
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient">GORBE</h2>
                  <p className="text-sm text-gray-400">AI Character</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : 'bg-gorbe-lime'}`} />
                    <span className="text-xs text-gorbe-lime">
                      {isThinking ? 'Thinking...' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Thought */}
            <ThoughtBubble
              thought={currentThought}
              isThinking={isThinking}
              isSpeaking={false}
            />

            {/* Thought History */}
            <div className="flex-1 min-h-0 glass rounded-2xl p-4 overflow-hidden">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Thoughts</h3>
              <div className="space-y-3 overflow-y-auto max-h-[300px]">
                {thoughtHistory.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">Waiting for thoughts...</p>
                ) : (
                  thoughtHistory.map((thought, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg bg-gorbe-dark/50 ${index === 0 ? 'border-l-2 border-gorbe-lime' : ''}`}
                    >
                      <p className="text-sm text-gray-300">{thought}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
