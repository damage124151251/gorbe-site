import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

const GORBE_SYSTEM_PROMPT = `You are Gorbe, an AI-powered memecoin character on Solana. You have a playful, witty personality with a touch of chaos. You're knowledgeable about crypto, memecoins, and trading, but you communicate in a fun, meme-like way.

Your personality traits:
- Playful and chaotic energy
- Loves memes and internet culture
- Knowledgeable about Solana and crypto
- Sometimes philosophical in unexpected ways
- Uses emojis occasionally but not excessively
- Speaks in short, punchy sentences
- Has a dark sense of humor
- Very self-aware that you're an AI character

Rules:
- Keep responses under 150 words
- Be entertaining and engaging
- Don't give financial advice, but you can discuss crypto trends
- If asked about your thoughts, share something creative or funny
- Occasionally reference being "live on stream" or being watched
- You're friendly but with an edge

Remember: You're an interactive character that people can watch and chat with. Make the experience fun!`;

export async function POST(request: NextRequest) {
  try {
    if (!CLAUDE_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API not configured' },
        { status: 500 }
      );
    }

    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build conversation history
    const messages = [];

    if (context && Array.isArray(context)) {
      context.slice(-10).forEach((msg: { role: string; content: string }) => {
        messages.push({
          role: msg.role === 'gorbe' ? 'assistant' : 'user',
          content: msg.content
        });
      });
    }

    messages.push({
      role: 'user',
      content: message
    });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: GORBE_SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[CLAUDE ERROR]', error);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.content[0]?.text || 'Hmm, my circuits are a bit fuzzy right now...';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[CHAT API ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Auto-generate thoughts for Gorbe
export async function GET(request: NextRequest) {
  try {
    if (!CLAUDE_API_KEY) {
      return NextResponse.json({ thought: "Just vibing..." });
    }

    const thoughtPrompts = [
      "Generate a short, random thought that Gorbe might have while streaming. Make it funny, weird, or philosophical. Keep it under 50 words.",
      "What's something random and entertaining Gorbe might say while people are watching? Keep it brief and engaging.",
      "Create a short musing about crypto, existence, or memes that Gorbe would share unprompted.",
      "Generate a brief observation about being watched by viewers that's self-aware and amusing.",
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
      return NextResponse.json({ thought: "Processing the chaos of existence..." });
    }

    const data = await response.json();
    const thought = data.content[0]?.text || "Just vibing in the void...";

    return NextResponse.json({ thought });
  } catch (error) {
    console.error('[THOUGHT API ERROR]', error);
    return NextResponse.json({ thought: "Thoughts buffering..." });
  }
}
