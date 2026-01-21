'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import ThoughtBubble from '@/components/ThoughtBubble';
import ChatPanel from '@/components/ChatPanel';

// Dynamic import for 3D component with error boundary
const GorbeScene = dynamic(() => import('@/components/GorbeModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gorbe-dark">
      <div className="text-6xl mb-4 animate-bounce">🤖</div>
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

function FallbackAvatar({ isThinking, isSpeaking }: { isThinking: boolean; isSpeaking: boolean }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gorbe-dark relative">
      <div className={`text-9xl ${isThinking ? 'animate-pulse' : 'animate-bounce'}`}>🤖</div>
      <div className="text-gorbe-lime text-2xl font-bold mt-4">GORBE</div>
      <div className="text-gray-400 text-sm mt-2">
        {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Online'}
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : 'bg-gorbe-lime'}`} />
        <span className="text-sm text-gray-400 font-mono">
          {isThinking ? 'Processing...' : 'Live'}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [use3D, setUse3D] = useState(true);
  const [viewerCount] = useState(Math.floor(Math.random() * 100) + 50);

  // Loading progress simulation
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
        }
      } catch (error) {
        console.error('Thought error:', error);
        setCurrentThought('Just vibing in the digital void...');
      } finally {
        setTimeout(() => setIsThinking(false), 2000);
      }
    };

    // First thought
    const initialTimeout = setTimeout(generateThought, 3000);
    // Periodic thoughts
    const interval = setInterval(generateThought, 45000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isLoading]);

  // Handle chat messages
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
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'gorbe',
        content: "Hmm, my circuits are a bit fuzzy. Try again?",
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
          {/* Main Scene Area */}
          <div className="scene-area relative">
            {/* Live indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-400">LIVE</span>
            </div>

            {/* Viewers */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gorbe-gray/80">
              <span className="text-sm">👀</span>
              <span className="text-sm text-gray-300">{viewerCount}</span>
            </div>

            {/* Toggle 3D button */}
            <button
              onClick={() => setUse3D(!use3D)}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-gorbe-gray/80 text-xs text-gray-400 hover:text-white transition-colors"
            >
              {use3D ? '2D Mode' : '3D Mode'}
            </button>

            {/* 3D or Fallback */}
            {use3D ? (
              <GorbeScene
                mousePosition={mousePosition}
                isThinking={isThinking}
                isSpeaking={isSpeaking}
                onLoad={() => {}}
              />
            ) : (
              <FallbackAvatar isThinking={isThinking} isSpeaking={isSpeaking} />
            )}

            {/* Thought bubble */}
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
                  <p className="text-sm text-gray-400">AI Interactive Character</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="status-online" />
                    <span className="text-xs text-gorbe-lime">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat */}
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
