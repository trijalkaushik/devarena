import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { username, email, password: hash }
    });
    res.json({ message: "Registered", user: { id: user.id, username, email } });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router;
