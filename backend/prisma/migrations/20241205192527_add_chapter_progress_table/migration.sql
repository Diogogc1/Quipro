/*
  Warnings:

  - You are about to drop the column `completed` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `currentChapterId` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `passed` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `trailId` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `trailScore` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the `ranking` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chapterId` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_trailId_fkey";

-- DropForeignKey
ALTER TABLE "ranking" DROP CONSTRAINT "ranking_userId_fkey";

-- DropIndex
DROP INDEX "progress_userId_trailId_key";

-- AlterTable
ALTER TABLE "progress" DROP COLUMN "completed",
DROP COLUMN "currentChapterId",
DROP COLUMN "passed",
DROP COLUMN "trailId",
DROP COLUMN "trailScore",
ADD COLUMN     "chapterId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ranking";

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
