/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "level" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_name_key" ON "UserProfile"("name");
