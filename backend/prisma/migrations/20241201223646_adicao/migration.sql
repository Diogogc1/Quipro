/*
  Warnings:

  - You are about to drop the `ranking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ranking" DROP CONSTRAINT "ranking_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ranking";
