/*
  Warnings:

  - A unique constraint covering the columns `[chapterId,userId]` on the table `progress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastChapterAccessedId" INTEGER DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "progress_chapterId_userId_key" ON "progress"("chapterId", "userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_lastChapterAccessedId_fkey" FOREIGN KEY ("lastChapterAccessedId") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
