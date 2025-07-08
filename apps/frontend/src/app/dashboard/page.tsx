'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Flame, Trophy, ShieldCheck, Clock3, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  interface LeaderboardUser {
    username: string;
    wins: number;
    losses?: number;
  }
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);
  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/leaderboard');
        const data = await res.json();
        console.log("📊 Leaderboard response:", data);
  
        // Use fallback if data is not an array
        setLeaderboard(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setLeaderboard([]); // fallback on error
      }
    };
    fetchLeaderboard();
  }, []);
  
  

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Welcome Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Welcome, {user.username} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-2">Gear up to code. Compete. Conquer.</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-6">
          <Image
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
            alt="avatar"
            width={96}
            height={96}
            className="rounded-full ring-4 ring-purple-600/30"
            />  
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-sm text-gray-400">{user.email}</p>
              <div className="mt-4">
                <p className="text-sm mb-1 text-gray-300">XP</p>
                <div className="w-48 h-2 bg-gray-700 rounded-full">
                  <div className="h-full w-3/5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-wrap justify-center gap-4 text-center text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4 rounded-lg bg-gray-800">🏆 Champion</div>
          <div className="p-4 rounded-lg bg-gray-800">🔥 Streak Master</div>
          <div className="p-4 rounded-lg bg-gray-800">💻 100 Battles</div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-3 gap-4 text-center text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <ShieldCheck className="mx-auto mb-1 text-green-400" />
            <p className="text-gray-400">Wins</p>
            <p className="text-xl font-bold">12</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <Flame className="mx-auto mb-1 text-red-400" />
            <p className="text-gray-400">Losses</p>
            <p className="text-xl font-bold">4</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <Clock3 className="mx-auto mb-1 text-yellow-400" />
            <p className="text-gray-400">Last Match</p>
            <p className="text-sm font-semibold">2 hours ago</p>
          </div>
        </motion.div>

        {/* Find Match Button */}
        <motion.button
          onClick={() => router.push('/match')}
          className="w-full flex justify-center items-center gap-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-lg rounded-xl font-bold shadow-lg transition transform hover:scale-105 animate-pulse"
          whileTap={{ scale: 0.95 }}
        >
          <Flame className="w-5 h-5" />
          Find a Match
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Leaderboard Section */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" /> Leaderboard
          </h3>
          <ul className="space-y-2 text-sm">
          {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
  leaderboard.map((user, i) => (
    <li key={i} className="flex justify-between">
      <span>{i + 1}. {user.username}</span>
      <span className="text-gray-400">{user.wins} Wins</span>
    </li>
  ))
) : (
  <p className="text-gray-500 text-sm">No leaderboard data available.</p>
)}
          </ul>
        </motion.div>

        {/* Collapsible Activity Feed */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="flex justify-between w-full text-left font-semibold text-white"
            onClick={() => setExpanded(!expanded)}
          >
            Recent Activity
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm mt-4 space-y-2 text-gray-300"
              >
                <li>🏆 Won a match against CodeSlayer</li>
                <li>🔥 3-match win streak achieved!</li>
                <li>🛠️ Updated profile avatar</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}