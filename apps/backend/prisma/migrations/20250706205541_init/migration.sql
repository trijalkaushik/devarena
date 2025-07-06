/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `player1Id` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2Id` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "createdAt",
DROP COLUMN "score",
DROP COLUMN "userId",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "player1Id" TEXT NOT NULL,
ADD COLUMN     "player2Id" TEXT NOT NULL,
ADD COLUMN     "problemId" TEXT NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "winnerId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "losses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wins" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
