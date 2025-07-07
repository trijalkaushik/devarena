import express from 'express';
import axios from 'axios';

const router = express.Router();

// Language ID 63 = Node.js; update this if needed
const LANGUAGE_ID = 63;

router.post('/', async (req, res) => {
  const { code, testCases } = req.body;

  if (!code || !Array.isArray(testCases)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  try {
    const results = await Promise.all(
      testCases.map(async ({ input, expected }: any) => {
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

    res.json({ passedAll, results });
  } catch (err: any) {
    console.error('❌ Code evaluation error:', err.message);
    res.status(500).json({ error: 'Code evaluation failed', message: err.message });
  }
});

export default router;
