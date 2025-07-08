'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import socket from '@/lib/socket';
import { useAuth } from '@/context/AuthContext';

interface MatchData {
  id: string;
  opponentId: string;
}

export default function MatchPage() {
  const auth = useAuth();             // ✅ protect against null
  const user = auth?.user;            // ✅ safely access
  const router = useRouter();
  const [status, setStatus] = useState('Waiting for opponent...');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('joinQueue', { userId: user.id });

    const handleMatchFound = (match: MatchData) => {
      console.log('✅ Match Found:', match);
      setStatus('Match found! Redirecting...');
      setTimeout(() => {
        router.push(`/battle/${match.id}`);
      }, 800);
    };

    socket.on('matchFound', handleMatchFound);

    return () => {
      socket.off('matchFound', handleMatchFound);
      socket.disconnect();
    };
  }, [user, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Searching for an opponent...</h1>
        <p className="text-gray-500">{status}</p>
      </div>
    </div>
  );
}
