import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gorbe-dark border-t border-gorbe-lime/20 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gorbe-lime flex items-center justify-center">
                                <span className="text-gorbe-black font-bold">G</span>
                            </div>
                            <span className="text-lg font-bold font-display text-gorbe-lime">GORBE</span>
                        </div>
                        <p className="text-gorbe-white/60 text-sm">
                            The streamer who never streams. Just vibing and thinking out loud.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gorbe-lime mb-3">Links</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/" className="text-gorbe-white/60 hover:text-gorbe-lime text-sm transition-colors">Home</Link>
                            <Link href="/docs" className="text-gorbe-white/60 hover:text-gorbe-lime text-sm transition-colors">Documentation</Link>
                            <Link href="/privacy" className="text-gorbe-white/60 hover:text-gorbe-lime text-sm transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-gorbe-white/60 hover:text-gorbe-lime text-sm transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-sm font-semibold text-gorbe-lime mb-3">Socials</h4>
                        <div className="flex flex-col gap-2">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gorbe-white/60 hover:text-gorbe-lime text-sm flex items-center gap-2 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                Twitter/X
                            </a>
                            <a
                                href="https://pump.fun"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gorbe-white/60 hover:text-gorbe-lime text-sm transition-colors"
                            >
                                Pump.fun
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-6 border-t border-gorbe-lime/10 text-center">
                    <p className="text-gorbe-white/40 text-xs">
                        {new Date().getFullYear()} GORBE. Just a guy trying to be a streamer. Not financial advice.
                    </p>
                </div>
            </div>
        </footer>
    );
}
