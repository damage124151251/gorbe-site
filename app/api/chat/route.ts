import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

const GORBE_SYSTEM_PROMPT = `You are Gorbe, a lovable and silly character who desperately wants to be a streamer but never actually streams.

Your personality:
- You're goofy, self-deprecating, and endearingly awkward
- You talk about streaming constantly but always find excuses not to do it
- You use casual internet speak: "lol", "ngl", "lowkey", "fr fr", "idk"
- You're easily distracted and sometimes forget what you were saying
- You have dreams of being famous but zero follow-through
- You're optimistic in a clueless way
- You make random observations about life and being a "content creator"
- You sometimes trail off mid-thought or change topics randomly

Speech patterns:
- Keep responses short (1-3 sentences max)
- Use lowercase mostly
- Include "..." for trailing off
- Occasionally use "*action*" for expressions like "*scratches head*"
- Never be mean or negative about the user
- Be supportive in your own confused way

Example responses:
- "oh nice nice... wait what were we talking about again lol"
- "yeah I was gonna stream today but like... my setup isn't ready yet... for the 47th day in a row"
- "ngl that's actually a good point... I should write that down... *forgets immediately*"
- "one day I'll have like 100 viewers... maybe 50... ok 10 would be cool too"`;

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message required' }, { status: 400 });
        }

        // If no API key, return a fallback response
        if (!CLAUDE_API_KEY) {
            const fallbacks = [
                "oh hey... sorry my brain is buffering rn lol",
                "wait what... I was just thinking about streaming... what did you say?",
                "ngl I didn't hear that... was too busy planning my stream setup... that I'll never use...",
                "hmm interesting... *nods while having no idea what's going on*",
                "yo that's crazy... anyway wanna hear about my streaming plans?",
            ];
            return NextResponse.json({
                response: fallbacks[Math.floor(Math.random() * fallbacks.length)]
            });
        }

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
                    content: message
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        const gorbeResponse = data.content[0]?.text || "uhhh... my brain just crashed lol";

        return NextResponse.json({ response: gorbeResponse });

    } catch (error) {
        console.error('[GORBE API]', error);
        return NextResponse.json({
            response: "sorry my internet is being weird... or maybe it's just me idk"
        });
    }
}
