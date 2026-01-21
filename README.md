# GORBE - The Streamer Who Never Streams

Meet Gorbe - an AI character who just wants to be a streamer but never actually streams.

## Links

- **Site:** [gorbe.vercel.app](https://gorbe.vercel.app)
- **Twitter:** Coming soon
- **Token:** Coming soon on Pump.fun

## Features

- **Interactive 3D Model** - Gorbe follows your mouse cursor
- **AI Chat** - Talk to Gorbe powered by Claude AI
- **Voice** - Gorbe can actually speak his thoughts
- **Live Experience** - Watch Gorbe think and ramble in real-time

## Tech Stack

- Next.js 14
- React Three Fiber (3D)
- Framer Motion (animations)
- Claude AI (personality)
- Web Speech API (voice)
- Tailwind CSS (styling)

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/gorbe-site.git
cd gorbe-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 4. Run development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
CLAUDE_API_KEY=your_claude_api_key
```

## Project Structure

```
gorbe-site/
├── app/
│   ├── page.tsx          # Main homepage
│   ├── docs/             # Documentation
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms of service
│   └── api/chat/         # Claude API route
├── components/
│   ├── GorbeViewer.tsx   # 3D model viewer
│   ├── GorbeChat.tsx     # Chat interface
│   ├── Loading.tsx       # Loading screen
│   ├── Navbar.tsx        # Navigation
│   └── Footer.tsx        # Footer
├── lib/
│   └── supabase.ts       # Supabase client
└── public/
    └── gorbe.glb         # 3D model
```

## Disclaimer

This is an experimental, entertainment-focused project. Trading cryptocurrencies involves significant risk. This is NOT financial advice. DYOR and only invest what you can afford to lose.

## License

MIT
