/*
  Warnings:

  - You are about to drop the column `winner` on the `Participation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Participation" DROP COLUMN "winner",
ADD COLUMN     "isWinner" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Participation_commander_idx" ON "public"."Participation"("commander");

-- CreateIndex
CREATE INDEX "Participation_isWinner_idx" ON "public"."Participation"("isWinner");

-- CreateIndex
CREATE INDEX "Participation_playerId_idx" ON "public"."Participation"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "public"."Player"("name");
