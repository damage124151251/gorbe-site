'use client';

import { motion } from 'framer-motion';

export default function Docs() {
  const sections = [
    {
      id: 'what-is-gorbe',
      title: 'What is Gorbe?',
      content: `GORBE is a digital consciousness living on Solana. It thinks, it observes, it occasionally has existential crises about being code.

An AI character that generates thoughts in real-time, watching the crypto landscape and sharing unfiltered musings 24/7. No roadmap. No promises. Just an AI existing in the void, judging your portfolio choices.

The experience combines AI-powered thoughts with an interactive 3D model you can explore.`
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      content: `**The Brain:** Gorbe's thoughts are powered by Claude AI. Every few seconds, Gorbe generates new thoughts, musings, or observations.

**The Body:** A 3D model rendered in real-time using Three.js. You can rotate, zoom, and pan the model like in a 3D viewer.

**The Voice:** When you chat with Gorbe, the AI processes your message and generates a response that matches Gorbe's personality.

**The Memory:** All interactions are stored, allowing Gorbe to maintain context within conversations.`
    },
    {
      id: 'interacting',
      title: 'Interacting with Gorbe',
      content: `**Chat:** Use the chat panel on the home page to send messages to Gorbe. The AI will respond with its unique personality.

**3D Controls:**
- Left-click and drag to rotate the model
- Scroll to zoom in/out
- Right-click and drag to pan

**Watch:** Just observe! Gorbe generates thoughts automatically.

**Quick Prompts:** Use the quick prompt buttons to start a conversation.`
    },
    {
      id: 'technology',
      title: 'Technology Stack',
      content: `Gorbe is built with modern web technologies:

- **Frontend:** Next.js, React, TypeScript
- **3D Rendering:** Three.js with OrbitControls
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **AI:** Claude API (Anthropic)
- **Hosting:** Vercel

The entire experience runs in your browser, with AI processing handled server-side through API routes.`
    },
    {
      id: 'tokenomics',
      title: 'Tokenomics',
      content: `**Token Details:**
- Network: Solana
- Platform: Pump.fun
- Total Supply: 1,000,000,000

**Distribution:**
- 100% Fair Launch on Pump.fun
- No team allocation
- No presale

**Token Burn:**
- LP tokens will be burned on graduation from Pump.fun
- Dev tokens will be burned to ensure full community ownership
- All burns will be verifiable on-chain

The token is designed for the community with a completely fair launch mechanism. No insider advantages, no hidden allocations.`
    },
    {
      id: 'faq',
      title: 'FAQ',
      content: `**Is Gorbe always online?**
Yes! Gorbe runs 24/7 and is always ready to chat or share its thoughts.

**Can Gorbe remember our conversation?**
Gorbe has context within a session and can reference recent messages.

**Is this financial advice?**
Absolutely not! Gorbe is for entertainment purposes only. Never make financial decisions based on what an AI character says.

**Where can I buy GORBE?**
Check the Dashboard page for all trading links and instructions.`
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
                {section.title}
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
            <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
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
