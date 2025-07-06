# 🎮 DevArena — Live Coding Battles & Interview Platform

![GitHub repo size](https://img.shields.io/github/repo-size/trijalkaushik/devarena)
![License](https://img.shields.io/github/license/trijalkaushik/devarena)
![GitHub issues](https://img.shields.io/github/issues/trijalkaushik/devarena)
![GitHub pull requests](https://img.shields.io/github/issues-pr/trijalkaushik/devarena)
![Stars](https://img.shields.io/github/stars/trijalkaushik/devarena?style=social)

> 🚀 **DevArena** is a real-time full-stack web platform for **coding battles**, **mock interviews**, and **developer duels**. It combines a live Monaco editor, real-time collaboration, video/audio chat, leaderboards, and more — all powered by Next.js, Express, TypeScript, and WebSockets.

---

## 🧠 Features

- ⚔️ 1v1 Dev Battles with time limits, problem sets, and auto-scoring
- 🧑‍💻 Live Monaco Code Editor with syntax highlighting
- 🎥 Video + Audio Chat using WebRTC (or Daily API)
- 🔁 Real-time Collaboration via Socket.IO
- 📊 Leaderboards, matchmaking & player XP system
- 🧪 Mock Interviews with interviewer & candidate mode
- 📦 Shared Types & Utilities across apps
- 🚀 Powered by Monorepo (pnpm + TurboRepo)

---

## 🧱 Monorepo Folder Structure

```
devarena/
├── apps/
│   ├── frontend/       # Next.js + TailwindCSS
│   └── backend/        # Express + Prisma + Socket.IO
├── packages/
│   └── common/         # Shared types, constants, helpers
├── .github/            # GitHub Actions workflows
├── tsconfig.base.json  # Shared TS config
├── turbo.json          # TurboRepo config
├── pnpm-workspace.yaml # Monorepo package paths
└── README.md
```

---

## 🛠️ Tech Stack

| Layer        | Tech Used |
|--------------|-----------|
| Frontend     | **Next.js**, **React**, **TailwindCSS**, **TypeScript** |
| Backend      | **Express.js**, **Socket.IO**, **Prisma ORM**, **TypeScript** |
| Realtime     | **Socket.IO**, **WebRTC**, **Daily.co** (optional) |
| Database     | **PostgreSQL** via Prisma |
| Deployment   | **Vercel (frontend)** + **Railway/Render (backend)** |
| Tooling      | **pnpm**, **TurboRepo**, **GitHub Actions** |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/trijalkaushik/devarena.git
cd devarena
pnpm install
```

### 2. Setup Environment Variables

Create the following `.env` files:

#### `apps/frontend/.env`
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

#### `apps/backend/.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/devarena
```

> Replace with your actual DB credentials.

---

### 3. Start Development

```bash
pnpm dev
```

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:3001

---

## 📬 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

```bash
pnpm install
pnpm dev
```

Make sure everything runs smoothly and opens a PR 🎯

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## ⭐ Star DevArena if you find it useful!

![GitHub stars](https://img.shields.io/github/stars/trijalkaushik/devarena?style=social)
