'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    type: 'thought' | 'speech' | 'user';
    content: string;
    timestamp: Date;
}

interface GorbeChatProps {
    onThoughtChange?: (thought: string, isThinking: boolean, isSpeaking: boolean) => void;
}

// Gorbe's personality prompts
const GORBE_THOUGHTS = [
    "hmm... should I start streaming today? nah, maybe tomorrow",
    "I wonder if anyone would watch me play... probably not lol",
    "one day I'll be a famous streamer... one day...",
    "what if I just... never stream? that's valid too right?",
    "imagine having 10 viewers... that would be crazy",
    "I should probably get a better mic first...",
    "content ideas: 1. exist 2. maybe talk? 3. idk",
    "being a streamer is hard when you never actually stream",
    "my chat would be so lit... if I had a chat...",
    "maybe I should just become a VTuber... wait I already am one kinda",
];

export default function GorbeChat({ onThoughtChange }: GorbeChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [currentThought, setCurrentThought] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Notify parent of thought changes
    useEffect(() => {
        if (onThoughtChange) {
            onThoughtChange(currentThought, isThinking, false);
        }
    }, [currentThought, isThinking, onThoughtChange]);

    // Random thoughts periodically
    useEffect(() => {
        const thinkRandomly = () => {
            if (!isThinking && Math.random() > 0.7) {
                const randomThought = GORBE_THOUGHTS[Math.floor(Math.random() * GORBE_THOUGHTS.length)];
                setIsThinking(true);
                setCurrentThought('');

                setTimeout(() => {
                    setIsThinking(false);
                    setCurrentThought(randomThought);

                    // Speak the thought
                    speakText(randomThought);

                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        type: 'thought',
                        content: randomThought,
                        timestamp: new Date()
                    }]);

                    // Clear thought after a while
                    setTimeout(() => setCurrentThought(''), 8000);
                }, 2000);
            }
        };

        const interval = setInterval(thinkRandomly, 15000);
        // Initial thought
        setTimeout(thinkRandomly, 3000);

        return () => clearInterval(interval);
    }, [isThinking]);

    // Text-to-speech
    const speakText = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            utterance.volume = 0.8;

            // Try to get a fun voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                v.name.includes('Google') || v.name.includes('English')
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
        }
    };

    // Send message to Gorbe (uses Claude API)
    const sendMessage = async () => {
        if (!input.trim() || isThinking) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsThinking(true);
        setCurrentThought('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            const gorbeResponse = data.response || "uhhh... I forgot what I was gonna say";

            setIsThinking(false);
            setCurrentThought(gorbeResponse);
            speakText(gorbeResponse);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'speech',
                content: gorbeResponse,
                timestamp: new Date()
            }]);

            setTimeout(() => setCurrentThought(''), 10000);
        } catch (error) {
            setIsThinking(false);
            const fallback = "sorry my brain isn't working rn... try again?";
            setCurrentThought(fallback);
            speakText(fallback);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'speech',
                content: fallback,
                timestamp: new Date()
            }]);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat header */}
            <div className="glass border-b border-gorbe-lime/20 p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gorbe-lime flex items-center justify-center">
                        <span className="text-gorbe-black font-bold">G</span>
                    </div>
                    <div>
                        <h3 className="font-semibold">Gorbe's Mind</h3>
                        <p className="text-xs text-gorbe-white/60">
                            {isThinking ? 'thinking...' : 'vibing'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                    msg.type === 'user'
                                        ? 'bg-gorbe-lime text-gorbe-black'
                                        : msg.type === 'thought'
                                            ? 'bg-gorbe-gray/50 text-gorbe-white/80 italic'
                                            : 'bg-gorbe-gray text-gorbe-white'
                                }`}
                            >
                                {msg.type === 'thought' && (
                                    <span className="text-gorbe-lime text-xs block mb-1">thinking...</span>
                                )}
                                <p className="text-sm">{msg.content}</p>
                                <span className="text-[10px] opacity-50 block mt-1">
                                    {msg.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 glass border-t border-gorbe-lime/20">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Talk to Gorbe..."
                        disabled={isThinking}
                        className="flex-1 bg-gorbe-gray/50 border border-gorbe-lime/20 rounded-lg px-4 py-2 text-gorbe-white placeholder:text-gorbe-white/40 focus:outline-none focus:border-gorbe-lime disabled:opacity-50"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendMessage}
                        disabled={isThinking || !input.trim()}
                        className="btn-lime px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                        Send
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
