'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }
  
      loginUser(data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      
      <motion.div
        className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-gray-700 bg-black/70 text-white shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Login to DevArena
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <motion.p
              className="text-red-500 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            const fakeUser = {
              id: 'dev-user-123',
              username: 'trijaldev',
              email: 'trijal@example.com',
            };
            localStorage.setItem('token', 'fake.jwt.token');
            localStorage.setItem('user', JSON.stringify(fakeUser));
            router.push('/dashboard');
          }}
          className="w-full py-2 mt-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition duration-200"
        >
          🚀 Dev Login (Bypass)
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don’t have an account? <a href="/register" className="text-indigo-400 hover:underline">Register</a>
        </p>
      </motion.div>
    </div>
  );
}
