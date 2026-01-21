import { NextRequest, NextResponse } from 'next/server';

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
- Keep responses under 100 words
- Be entertaining and engaging
- Never use emojis
- Don't give financial advice
- Share creative or funny thoughts
- You're friendly but with an edge`;

// Auto-generate thoughts for Gorbe
export async function GET() {
  try {
    if (!CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY not configured');
      return NextResponse.json({ thought: "Systems initializing..." });
    }

    const thoughtPrompts = [
      "Generate a short, random thought. Make it funny, weird, or philosophical. Keep it under 40 words. No emojis.",
      "What's something random and entertaining you might think about? Keep it brief. No emojis.",
      "Create a short musing about crypto, existence, or memes. No emojis.",
      "Generate a brief self-aware observation about being an AI. No emojis.",
      "Share a random thought about the chaos of the crypto market. No emojis.",
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
        model: 'claude-sonnet-4-20250514',
        max_tokens: 150,
        system: GORBE_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: randomPrompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[CLAUDE ERROR]', response.status, errorText);
      return NextResponse.json({ thought: "Processing thoughts..." });
    }

    const data = await response.json();
    const thought = data.content[0]?.text || "Just vibing in the digital void...";

    return NextResponse.json({ thought });
  } catch (error) {
    console.error('[THOUGHT API ERROR]', error);
    return NextResponse.json({ thought: "Thoughts loading..." });
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Chat disabled' }, { status: 404 });
}
