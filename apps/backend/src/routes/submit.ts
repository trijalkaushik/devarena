import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

interface TestCase {
  input: string;
  expected: string;
}

const LANGUAGE_ID = 63;

router.post('/', async (req: Request, res: Response) => {
  const { code, testCases }: { code: string; testCases: TestCase[] } = req.body;

  if (!code || !Array.isArray(testCases)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  try {
    const results = await Promise.all(
      testCases.map(async ({ input, expected }) => {
        const response = await axios.post(
          'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
          {
            source_code: code,
            language_id: LANGUAGE_ID,
            stdin: input,
          },
          {
            headers: {
              'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
          }
        );

        const output = (response.data.stdout || '').trim();
        const passed = output === expected;

        return { input, expected, output, passed };
      })
    );

    const passedAll = results.every((r) => r.passed);

    return res.json({ passedAll, results });
  } catch (err: any) {
    console.error('❌ Code evaluation error:', err.message);
    return res.status(500).json({ error: 'Code evaluation failed', message: err.message });
  }
});

export default router;
