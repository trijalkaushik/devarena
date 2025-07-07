import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer, Server as HttpServer } from 'http';
import { setupSocketIO } from './socket';
import authRoutes from './routes/auth';
import problemRoutes from './routes/problem';
import leaderboardRoutes from './routes/leaderboard';
import submitRoutes from './routes/submit';

dotenv.config();

const app = express();
const httpServer: HttpServer = createServer(app);

// Setup Socket.IO
setupSocketIO(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/submit', submitRoutes);

app.get('/', (_req, res) => {
  res.send('DevArena backend is live 🚀');
});

// Only start ONE server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running at http://localhost:${PORT}`);
});
