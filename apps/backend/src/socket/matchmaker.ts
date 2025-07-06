// apps/backend/src/socket/matchmaker.ts

import { Server, Socket } from 'socket.io';

interface QueuedPlayer {
  socketId: string;
  userId: string;
}

const queue: QueuedPlayer[] = [];

export function initMatchmaking(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('🔌 New connection:', socket.id);

    socket.on('joinQueue', ({ userId }) => {
      console.log(`📥 ${userId} joined queue`);
      queue.push({ socketId: socket.id, userId });

      if (queue.length >= 2) {
        const player1 = queue.shift()!;
        const player2 = queue.shift()!;

        const matchId = generateMatchId();

        io.to(player1.socketId).emit('matchFound', {
          id: matchId,
          opponent: player2.userId,
        });

        io.to(player2.socketId).emit('matchFound', {
          id: matchId,
          opponent: player1.userId,
        });

        console.log(`🎯 Match made: ${player1.userId} vs ${player2.userId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected:', socket.id);
      const idx = queue.findIndex(p => p.socketId === socket.id);
      if (idx !== -1) queue.splice(idx, 1);
    });
  });
}

function generateMatchId() {
  return Math.random().toString(36).substring(2, 10);
}
