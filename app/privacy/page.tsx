export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 grid-pattern">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold font-display mb-2">Privacy Policy</h1>
                <p className="text-gorbe-white/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="glass rounded-2xl p-8 space-y-6 text-gorbe-white/80">
                    <section>
                        <h2 className="text-xl font-semibold text-gorbe-lime mb-3">Information We Collect</h2>
                        <p>
                            We collect minimal information necessary to provide our services:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gorbe-white/70">
                            <li>Chat messages you send to Gorbe (processed by AI and not stored)</li>
                            <li>Basic analytics (page views, general location)</li>
                            <li>Wallet addresses for token transactions (public blockchain data)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gorbe-lime mb-3">How We Use Information</h2>
                        <p>
                            Information is used solely to:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gorbe-white/70">
                            <li>Process your chat messages with Gorbe's AI</li>
                            <li>Improve the user experience</li>
                            <li>Display public blockchain transactions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gorbe-lime mb-3">Third-Party Services</h2>
                        <p>
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gorbe-white/70">
                            <li>Anthropic Claude API for AI responses</li>
                            <li>Vercel for hosting</li>
                            <li>Supabase for data storage</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gorbe-lime mb-3">Data Retention</h2>
                        <p>
                            Chat messages are processed in real-time and not permanently stored.
                            Blockchain data is public and permanent by nature.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gorbe-lime mb-3">Contact</h2>
                        <p>
                            For questions about this policy, reach out on Twitter/X.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
