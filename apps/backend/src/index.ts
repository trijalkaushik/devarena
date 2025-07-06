import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  res.send('DevArena Backend running');
});

app.listen(3001, () => {
  console.log('Backend on http://localhost:3001');
});
