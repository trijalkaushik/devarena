import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

interface QueuedUser {
  socketId: string;
  userId: string;
}

const queue: QueuedUser[] = [];

export function setupSocketIO(server: HttpServer) {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('🟢 New user connected:', socket.id);

    // 1️⃣ Matchmaking logic
    socket.on('joinQueue', ({ userId }) => {
      console.log(`➕ User ${userId} joined queue`);
      queue.push({ socketId: socket.id, userId });

      if (queue.length >= 2) {
        const [p1, p2] = [queue.shift()!, queue.shift()!];
        const roomId = `room-${Date.now()}`;

        // Notify both users
        io.to(p1.socketId).emit('matchFound', { id: roomId, opponentId: p2.userId });
        io.to(p2.socketId).emit('matchFound', { id: roomId, opponentId: p1.userId });

        // Join the room
        io.sockets.sockets.get(p1.socketId)?.join(roomId);
        io.sockets.sockets.get(p2.socketId)?.join(roomId);

        console.log(`🎮 Match created: ${p1.userId} vs ${p2.userId} in ${roomId}`);
      }
    });

    // 2️⃣ Room join for live code battle
    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      socket.to(roomId).emit('opponentJoined', userId);
      console.log(`🚪 ${userId} joined room ${roomId}`);
    });

    // 3️⃣ Code syncing
    socket.on('codeUpdate', ({ roomId, code }) => {
      socket.to(roomId).emit('codeUpdate', code);
    });

    // 4️⃣ Leave room on manual exit
    socket.on('leaveRoom', (roomId: string) => {
      socket.leave(roomId);
    });

    // 5️⃣ Handle disconnect
    socket.on('disconnect', () => {
      console.log('🔴 User disconnected:', socket.id);
      // Remove from queue if still waiting
      const index = queue.findIndex((q) => q.socketId === socket.id);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    });
  });
}
