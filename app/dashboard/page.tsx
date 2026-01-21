'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/StatsCard';

interface Stats {
  totalMessages: number;
  totalThoughts: number;
  uptimeHours: number;
  viewersOnline: number;
  mood: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    totalThoughts: 0,
    uptimeHours: 0,
    viewersOnline: 0,
    mood: 'Neutral',
  });

  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string;
    type: 'message' | 'thought';
    content: string;
    time: string;
  }>>([]);

  // Simulate fetching stats
  useEffect(() => {
    // Initial stats
    setStats({
      totalMessages: Math.floor(Math.random() * 1000) + 500,
      totalThoughts: Math.floor(Math.random() * 500) + 200,
      uptimeHours: Math.floor(Math.random() * 100) + 24,
      viewersOnline: Math.floor(Math.random() * 100) + 50,
      mood: ['Happy', 'Curious', 'Playful', 'Philosophical'][Math.floor(Math.random() * 4)],
    });

    // Simulated recent activity
    setRecentActivity([
      { id: '1', type: 'thought', content: 'Contemplating the nature of digital existence...', time: '2 min ago' },
      { id: '2', type: 'message', content: 'Someone asked about my favorite meme', time: '5 min ago' },
      { id: '3', type: 'thought', content: 'Why do humans find chaos so entertaining?', time: '12 min ago' },
      { id: '4', type: 'message', content: 'Discussion about Solana trends', time: '18 min ago' },
      { id: '5', type: 'thought', content: 'Processing the meaning of green candles...', time: '25 min ago' },
    ]);

    // Update viewers periodically
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        viewersOnline: Math.max(20, prev.viewersOnline + Math.floor(Math.random() * 10) - 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const moods = ['😊 Happy', '🤔 Curious', '😈 Chaotic', '🧠 Philosophical', '😴 Chill'];

  return (
    <div className="min-h-screen bg-gorbe-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Dashboard</h1>
          <p className="text-gray-400">Monitor Gorbe's activity and stats in real-time</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              title="Total Messages"
              value={stats.totalMessages.toLocaleString()}
              icon="💬"
              change="+12%"
              changeType="positive"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCard
              title="Total Thoughts"
              value={stats.totalThoughts.toLocaleString()}
              icon="💭"
              change="+8%"
              changeType="positive"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsCard
              title="Uptime"
              value={`${stats.uptimeHours}h`}
              icon="⏱️"
              change="99.9%"
              changeType="neutral"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsCard
              title="Viewers Online"
              value={stats.viewersOnline}
              icon="👀"
              change="Live"
              changeType="positive"
            />
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 card"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>📜</span> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gorbe-dark/50 hover:bg-gorbe-dark transition-colors"
                >
                  <span className="text-xl">
                    {activity.type === 'thought' ? '💭' : '💬'}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200">{activity.content}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mood & Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Current Mood */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🎭</span> Current Mood
              </h2>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <span
                    key={mood}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      mood.includes(stats.mood)
                        ? 'bg-gorbe-lime text-gorbe-black font-semibold'
                        : 'bg-gorbe-dark text-gray-400'
                    }`}
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🖥️</span> System Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">3D Engine</span>
                  <span className="flex items-center gap-2 text-gorbe-lime">
                    <div className="w-2 h-2 rounded-full bg-gorbe-lime" />
                    Running
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Brain</span>
                  <span className="flex items-center gap-2 text-gorbe-lime">
                    <div className="w-2 h-2 rounded-full bg-gorbe-lime" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database</span>
                  <span className="flex items-center gap-2 text-gorbe-lime">
                    <div className="w-2 h-2 rounded-full bg-gorbe-lime" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Chat System</span>
                  <span className="flex items-center gap-2 text-gorbe-lime">
                    <div className="w-2 h-2 rounded-full bg-gorbe-lime" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📊</span> Quick Stats
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Response Rate</span>
                    <span className="text-gorbe-lime">98%</span>
                  </div>
                  <div className="h-2 bg-gorbe-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gorbe-lime rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Thought Generation</span>
                    <span className="text-gorbe-lime">85%</span>
                  </div>
                  <div className="h-2 bg-gorbe-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gorbe-lime rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Engagement Score</span>
                    <span className="text-gorbe-lime">92%</span>
                  </div>
                  <div className="h-2 bg-gorbe-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gorbe-lime rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
