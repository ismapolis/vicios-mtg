/*
  Warnings:

  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Winner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Winner" DROP CONSTRAINT "Winner_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Winner" DROP CONSTRAINT "Winner_matchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Winner" DROP CONSTRAINT "Winner_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MatchPlayers" DROP CONSTRAINT "_MatchPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MatchPlayers" DROP CONSTRAINT "_MatchPlayers_B_fkey";

-- DropTable
DROP TABLE "public"."Deck";

-- DropTable
DROP TABLE "public"."Winner";

-- DropTable
DROP TABLE "public"."_MatchPlayers";

-- CreateTable
CREATE TABLE "public"."Participation" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "commander" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Participation" ADD CONSTRAINT "Participation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participation" ADD CONSTRAINT "Participation_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
