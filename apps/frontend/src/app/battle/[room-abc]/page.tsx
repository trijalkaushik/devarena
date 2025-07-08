'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import socket from '@/lib/socket';
import { useAuth } from '@/context/AuthContext';

export default function BattleRoomPage() {
  const { roomId } = useParams();
  const { user } = useAuth();

  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    if (!roomId || !user) return;

    if (!socket.connected) {
      socket.connect();
    }

    console.log(`🚪 Joining room ${roomId} as ${user.id}`);
    socket.emit('joinRoom', { roomId, userId: user.id });

    // Show opponent when they join
    socket.on('opponentJoined', (opponent: string) => {
      console.log('👤 Opponent joined:', opponent);
      setOpponentId(opponent);
    });

    // Receive code updates
    socket.on('codeUpdate', (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.off('opponentJoined');
      socket.off('codeUpdate');
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId, user]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit('codeUpdate', { roomId, code: newCode });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">🔥 Battle Room</h1>
      <div className="flex items-center justify-between text-gray-600 mb-4">
        <span>Room ID: {roomId}</span>
        <span>
          Opponent: {opponentId ? opponentId : 'Waiting for opponent...'}
        </span>
      </div>

      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Start coding..."
        className="w-full h-[400px] p-4 border rounded-md font-mono text-sm"
      />
    </div>
  );
}

