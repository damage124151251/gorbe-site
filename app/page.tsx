'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import ThoughtBubble from '@/components/ThoughtBubble';
import ChatPanel from '@/components/ChatPanel';

const GorbeScene = dynamic(() => import('@/components/GorbeModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gorbe-dark">
      <div className="w-16 h-16 mb-4 rounded-full border-4 border-gorbe-lime/30 border-t-gorbe-lime animate-spin" />
      <div className="text-gorbe-lime animate-pulse">Loading Gorbe...</div>
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
  const [viewerCount] = useState(Math.floor(Math.random() * 100) + 50);

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

  useEffect(() => {
    if (isLoading) return;

    const generateThought = async () => {
      try {
        setIsThinking(true);
        const response = await fetch('/api/chat');
        const data = await response.json();
        if (data.thought) {
          setCurrentThought(data.thought);
        }
      } catch (error) {
        setCurrentThought('Just vibing in the digital void...');
      } finally {
        setTimeout(() => setIsThinking(false), 2000);
      }
    };

    const initialTimeout = setTimeout(generateThought, 3000);
    const interval = setInterval(generateThought, 45000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isLoading]);

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
          context: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
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
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'gorbe',
        content: "Hmm, my circuits are fuzzy. Try again?",
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
          <div className="scene-area relative">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-400">LIVE</span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gorbe-gray/80">
              <span className="text-sm text-gray-300">{viewerCount} viewers</span>
            </div>

            <GorbeScene
              mousePosition={mousePosition}
              isThinking={isThinking}
              isSpeaking={isSpeaking}
              onLoad={() => {}}
            />
          </div>

          <div className="sidebar-area">
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

            <ThoughtBubble thought={currentThought} isThinking={isThinking} isSpeaking={isSpeaking} />

            <div className="flex-1 min-h-0">
              <ChatPanel messages={messages} onSendMessage={handleSendMessage} isThinking={isThinking} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
