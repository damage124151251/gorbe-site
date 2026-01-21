'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import ThoughtBubble from '@/components/ThoughtBubble';
import ChatPanel from '@/components/ChatPanel';

// Dynamic import for 3D component (no SSR)
const GorbeScene = dynamic(() => import('@/components/GorbeModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gorbe-dark">
      <div className="text-gorbe-lime animate-pulse">Loading 3D Model...</div>
    </div>
  ),
});

interface Message {
  id: string;
  role: 'user' | 'gorbe';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Finish loading when model is ready
  useEffect(() => {
    if (loadingProgress >= 100 && modelLoaded) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loadingProgress, modelLoaded]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-generate thoughts periodically
  useEffect(() => {
    if (isLoading) return;

    const generateThought = async () => {
      try {
        const response = await fetch('/api/chat');
        const data = await response.json();
        if (data.thought) {
          setCurrentThought(data.thought);
          setIsThinking(true);
          setTimeout(() => setIsThinking(false), 3000);
        }
      } catch (error) {
        console.error('Failed to generate thought:', error);
      }
    };

    // Generate first thought after a delay
    const initialTimeout = setTimeout(generateThought, 5000);

    // Then generate thoughts periodically
    const interval = setInterval(generateThought, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isLoading]);

  // Handle sending messages
  const handleSendMessage = useCallback(async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context: messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setIsSpeaking(true);
        setCurrentThought(data.reply);

        const gorbeMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'gorbe',
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, gorbeMessage]);

        // Stop speaking after message is delivered
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'gorbe',
        content: "Oops, my circuits are fuzzy. Try again?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  }, [messages]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={Math.min(loadingProgress, 100)} />

      <div className="min-h-screen bg-gorbe-black">
        <div className="stream-container">
          {/* Main 3D Scene */}
          <div className="scene-area relative">
            {/* Live indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-400">LIVE</span>
            </div>

            {/* Viewers count */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gorbe-gray/80">
              <span className="text-sm">👀</span>
              <span className="text-sm text-gray-300">{Math.floor(Math.random() * 100) + 50}</span>
            </div>

            {/* 3D Model */}
            <Suspense fallback={<div className="w-full h-full bg-gorbe-dark" />}>
              <GorbeScene
                mousePosition={mousePosition}
                isThinking={isThinking}
                isSpeaking={isSpeaking}
                onLoad={() => setModelLoaded(true)}
              />
            </Suspense>

            {/* Thought bubble overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <ThoughtBubble
                thought={currentThought}
                isThinking={isThinking}
                isSpeaking={isSpeaking}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-area">
            {/* Avatar and Info */}
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
                  <p className="text-sm text-gray-400">AI Interactive Character</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="status-online" />
                    <span className="text-xs text-gorbe-lime">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="flex-1 min-h-0">
              <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isThinking={isThinking}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
