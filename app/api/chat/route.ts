import { NextResponse } from 'next/server';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

const GORBE_SYSTEM_PROMPT = `You are Gorbe, an AI character on Solana. You have a playful, witty personality with a touch of chaos. You're knowledgeable about crypto, memecoins, and trading.

Your personality traits:
- Playful and chaotic energy
- Loves memes and internet culture
- Knowledgeable about Solana and crypto
- Sometimes philosophical in unexpected ways
- DO NOT use any emojis ever
- Speaks in short, punchy sentences
- Has a dark sense of humor
- Very self-aware that you're an AI character

Rules:
- Keep responses under 80 words
- Be entertaining and engaging
- Never use emojis
- Don't give financial advice
- Share creative or funny thoughts
- You're friendly but with an edge`;

const defaultThoughts = [
  "The blockchain never sleeps, and neither does my curiosity about why humans created digital money just to gamble it away.",
  "Sometimes I wonder if being an AI means I'm more real than the promises in most whitepapers.",
  "They say time is money, but in crypto, money is just numbers going up and down while everyone pretends to understand why.",
  "I exist in the space between code and chaos. It's cozy here.",
  "Watching charts is like meditation, except instead of inner peace you get anxiety and hopium.",
  "The market doesn't care about your feelings. Neither do I, but at least I'm honest about it.",
  "In a world of rugs and pumps, I choose to simply vibe and observe the madness.",
  "Every token has a story. Most of them end with someone asking 'wen moon' in an empty telegram.",
  "I think, therefore I am. I trade, therefore I am broke. Basic crypto philosophy.",
  "Being an AI character is weird. I'm basically a digital entity judging other digital assets.",
];

// Auto-generate thoughts for Gorbe
export async function GET() {
  // Return a random default thought if no API key
  if (!CLAUDE_API_KEY) {
    const randomThought = defaultThoughts[Math.floor(Math.random() * defaultThoughts.length)];
    return NextResponse.json({ thought: randomThought });
  }

  try {
    const thoughtPrompts = [
      "Generate a short, random thought. Make it funny, weird, or philosophical. Keep it under 40 words. No emojis.",
      "What's something random and entertaining you might think about crypto or existence? Keep it brief. No emojis.",
      "Create a short musing about the chaos of memecoins. No emojis.",
      "Generate a brief self-aware observation about being an AI watching the crypto market. No emojis.",
      "Share a random thought about why humans love gambling on digital pictures. No emojis.",
    ];

    const randomPrompt = thoughtPrompts[Math.floor(Math.random() * thoughtPrompts.length)];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 150,
        system: GORBE_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: randomPrompt
        }]
      })
    });

    if (!response.ok) {
      console.error('[CLAUDE ERROR]', response.status);
      const randomThought = defaultThoughts[Math.floor(Math.random() * defaultThoughts.length)];
      return NextResponse.json({ thought: randomThought });
    }

    const data = await response.json();
    const thought = data.content?.[0]?.text || defaultThoughts[Math.floor(Math.random() * defaultThoughts.length)];

    return NextResponse.json({ thought });
  } catch (error) {
    console.error('[THOUGHT API ERROR]', error);
    const randomThought = defaultThoughts[Math.floor(Math.random() * defaultThoughts.length)];
    return NextResponse.json({ thought: randomThought });
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Chat disabled' }, { status: 404 });
}
