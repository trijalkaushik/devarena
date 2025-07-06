import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.get('/random', async (req, res) => {
  const problems = await prisma.problem.findMany();
  const random = problems[Math.floor(Math.random() * problems.length)];
  res.json(random);
});

export default router;
