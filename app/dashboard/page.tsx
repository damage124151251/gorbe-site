'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [copied, setCopied] = useState(false);

  // Token info - replace with real data
  const tokenInfo = {
    name: 'GORBE',
    symbol: '$GORBE',
    network: 'Solana',
    contractAddress: 'Coming Soon',
    totalSupply: '1,000,000,000',
    decimals: 9,
    launchDate: 'TBA',
    launchPlatform: 'Pump.fun',
  };

  const links = {
    twitter: 'https://twitter.com/gorbetoken',
    telegram: 'https://t.me/gorbetoken',
    pumpfun: 'https://pump.fun',
    dexscreener: 'https://dexscreener.com/solana',
  };

  const copyAddress = () => {
    if (tokenInfo.contractAddress !== 'Coming Soon') {
      navigator.clipboard.writeText(tokenInfo.contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gorbe-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Launch Info</h1>
          <p className="text-gray-400">Fair launch. No promises. Just an AI with a token.</p>
        </motion.div>

        {/* Token Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-6 text-gorbe-lime">Token Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Name</span>
                <span className="text-white font-semibold">{tokenInfo.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Symbol</span>
                <span className="text-white font-semibold">{tokenInfo.symbol}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Network</span>
                <span className="text-white font-semibold">{tokenInfo.network}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Decimals</span>
                <span className="text-white font-semibold">{tokenInfo.decimals}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Total Supply</span>
                <span className="text-white font-semibold">{tokenInfo.totalSupply}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Launch Platform</span>
                <span className="text-white font-semibold">{tokenInfo.launchPlatform}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gorbe-gray">
                <span className="text-gray-400">Launch Date</span>
                <span className="text-gorbe-lime font-semibold">{tokenInfo.launchDate}</span>
              </div>
            </div>
          </div>

          {/* Contract Address */}
          <div className="mt-6 p-4 bg-gorbe-dark rounded-xl">
            <span className="text-gray-400 text-sm block mb-2">Contract Address</span>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-gorbe-lime font-mono text-sm break-all">
                {tokenInfo.contractAddress}
              </code>
              <button
                onClick={copyAddress}
                disabled={tokenInfo.contractAddress === 'Coming Soon'}
                className="px-4 py-2 bg-gorbe-gray text-white rounded-lg hover:bg-gorbe-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-semibold mb-4 text-gorbe-lime">Social Links</h2>
            <div className="space-y-3">
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gorbe-dark rounded-xl hover:bg-gorbe-light transition-colors"
              >
                <span className="text-white">Twitter / X</span>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gorbe-dark rounded-xl hover:bg-gorbe-light transition-colors"
              >
                <span className="text-white">Telegram</span>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold mb-4 text-gorbe-lime">Trading Links</h2>
            <div className="space-y-3">
              <a
                href={links.pumpfun}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gorbe-dark rounded-xl hover:bg-gorbe-light transition-colors"
              >
                <span className="text-white">Pump.fun</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href={links.dexscreener}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gorbe-dark rounded-xl hover:bg-gorbe-light transition-colors"
              >
                <span className="text-white">DexScreener</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* How to Buy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-6 text-gorbe-lime">How to Buy</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gorbe-dark rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gorbe-lime/20 flex items-center justify-center text-gorbe-lime font-bold">1</div>
              <h3 className="font-semibold text-white mb-2">Get a Wallet</h3>
              <p className="text-sm text-gray-400">Download Phantom or Solflare wallet</p>
            </div>
            <div className="p-4 bg-gorbe-dark rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gorbe-lime/20 flex items-center justify-center text-gorbe-lime font-bold">2</div>
              <h3 className="font-semibold text-white mb-2">Get SOL</h3>
              <p className="text-sm text-gray-400">Buy SOL from an exchange</p>
            </div>
            <div className="p-4 bg-gorbe-dark rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gorbe-lime/20 flex items-center justify-center text-gorbe-lime font-bold">3</div>
              <h3 className="font-semibold text-white mb-2">Go to Pump.fun</h3>
              <p className="text-sm text-gray-400">Connect your wallet to Pump.fun</p>
            </div>
            <div className="p-4 bg-gorbe-dark rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gorbe-lime/20 flex items-center justify-center text-gorbe-lime font-bold">4</div>
              <h3 className="font-semibold text-white mb-2">Swap for GORBE</h3>
              <p className="text-sm text-gray-400">Paste the contract address and swap</p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 border border-yellow-500/30 rounded-xl bg-yellow-500/5"
        >
          <p className="text-sm text-yellow-500/80 text-center">
            This is a meme token for entertainment purposes only. Not financial advice. Always DYOR.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
