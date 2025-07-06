import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  const leaderboard = await prisma.user.findMany({
    orderBy: { wins: 'desc' },
    select: { username: true, wins: true, losses: true }
  });

  res.json(leaderboard);
});

export default router;
