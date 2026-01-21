'use client';

import { motion } from 'framer-motion';

export default function Docs() {
  const sections = [
    {
      id: 'what-is-gorbe',
      title: 'What is Gorbe?',
      icon: '🤖',
      content: `Gorbe is an AI-powered interactive character that lives on the blockchain. Think of it as a digital entity that can think, speak, and react in real-time. Gorbe uses advanced AI (Claude) to generate thoughts and respond to conversations, all while being displayed as an interactive 3D model.

The experience is like watching a livestream, but instead of a human, you're interacting with an AI character that has its own personality and quirks.`
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      icon: '⚙️',
      content: `**The Brain:** Gorbe's thoughts are powered by Claude AI. Every few seconds, Gorbe generates new thoughts, musings, or observations about existence, crypto, memes, or just random chaos.

**The Body:** A 3D model rendered in real-time using Three.js and React Three Fiber. The model follows your mouse cursor, creating an interactive experience.

**The Voice:** When you chat with Gorbe, the AI processes your message and generates a response that matches Gorbe's personality - playful, chaotic, and sometimes surprisingly philosophical.

**The Memory:** All interactions are stored in Supabase, allowing Gorbe to maintain context and potentially remember past conversations.`
    },
    {
      id: 'interacting',
      title: 'Interacting with Gorbe',
      icon: '💬',
      content: `**Chat:** Use the chat panel on the home page to send messages to Gorbe. The AI will respond with its unique personality.

**Watch:** Just observe! Gorbe generates thoughts automatically, so you can sit back and watch what random musings pop up.

**Mouse Tracking:** Move your mouse around the 3D model - Gorbe's gaze will follow your cursor!

**Quick Prompts:** Don't know what to say? Use the quick prompt buttons to start a conversation.`
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      content: `The dashboard provides real-time statistics about Gorbe's activity:

- **Total Messages:** How many messages have been exchanged
- **Total Thoughts:** Number of AI-generated thoughts
- **Uptime:** How long Gorbe has been running
- **Viewers Online:** Current number of people watching
- **Mood:** Gorbe's current emotional state
- **Recent Activity:** Latest thoughts and conversations
- **System Status:** Health of all components`
    },
    {
      id: 'technology',
      title: 'Technology Stack',
      icon: '🛠️',
      content: `Gorbe is built with modern web technologies:

- **Frontend:** Next.js 14, React, TypeScript
- **3D Rendering:** Three.js, React Three Fiber, drei
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **AI:** Claude API (Anthropic)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel

The entire experience runs in your browser, with AI processing handled server-side through API routes.`
    },
    {
      id: 'personality',
      title: "Gorbe's Personality",
      icon: '🎭',
      content: `Gorbe isn't just a generic chatbot. It has a distinct personality:

- **Playful & Chaotic:** Loves memes and internet culture
- **Crypto-Aware:** Understands blockchain, Solana, and memecoins
- **Philosophical:** Sometimes gets unexpectedly deep
- **Self-Aware:** Knows it's an AI and plays with that concept
- **Dark Humor:** Has a bit of an edge
- **Engaging:** Short, punchy responses that keep things interesting

Gorbe won't give financial advice, but it will definitely have opinions about the state of the market!`
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: '❓',
      content: `**Is Gorbe always online?**
Yes! Gorbe runs 24/7 and is always ready to chat or share its thoughts.

**Can Gorbe remember our conversation?**
Gorbe has context within a session and can reference recent messages. Long-term memory features may be added in the future.

**Is this financial advice?**
Absolutely not! Gorbe is for entertainment purposes only. Never make financial decisions based on what an AI character says.

**Can I see Gorbe's code?**
The frontend is open source. Feel free to explore and learn!

**How do I report bugs?**
Send a message to Gorbe about it! Or reach out on social media.`
    }
  ];

  return (
    <div className="min-h-screen bg-gorbe-black">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gorbe-lime/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 block">📚</span>
            <h1 className="text-5xl font-bold text-gradient mb-4">Documentation</h1>
            <p className="text-xl text-gray-400">
              Everything you need to know about Gorbe
            </p>
          </motion.div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Quick Navigation</h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 rounded-lg bg-gorbe-dark text-gray-300 hover:bg-gorbe-lime hover:text-gorbe-black transition-all"
              >
                {section.icon} {section.title}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 3) }}
            className="card scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{section.icon}</span>
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              {section.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                  {paragraph.split('**').map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-gorbe-lime font-semibold">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-12 rounded-2xl bg-gradient-to-r from-gorbe-lime/10 to-gorbe-lime/5 border border-gorbe-lime/20"
        >
          <span className="text-5xl mb-4 block">🚀</span>
          <h2 className="text-2xl font-bold mb-4">Ready to Meet Gorbe?</h2>
          <p className="text-gray-400 mb-6">
            Head back to the home page and start chatting!
          </p>
          <a
            href="/"
            className="btn-lime inline-block"
          >
            Go to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}
