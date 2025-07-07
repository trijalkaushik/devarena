-- CreateTable
CREATE TABLE "Leaderboard" (
    "userId" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("userId")
);
