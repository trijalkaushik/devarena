import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    // Fetch total number of users for pagination
    const totalCount = await prisma.user.count();

    // Fetch paginated and sorted leaderboard
    const leaderboardRaw = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { wins: 'desc' },
      select: {
        username: true,
        wins: true,
        losses: true,
      },
    });

    // Add rank and win rate with explicit typing
    const leaderboard = leaderboardRaw.map(
      (user: { username: string; wins: number; losses: number }, index: number) => {
        const totalGames = user.wins + user.losses;
        const winRate = totalGames > 0 ? Math.round((user.wins / totalGames) * 100) : 0;

        return {
          rank: (page - 1) * limit + index + 1,
          username: user.username,
          wins: user.wins,
          losses: user.losses,
          winRate,
        };
      }
    );

    res.json({
      currentPage: page,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      leaderboard,
    });
  } catch (error) {
    console.error('Leaderboard fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
