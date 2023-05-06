-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "coin" INTEGER DEFAULT 0;

-- CreateIndex
CREATE INDEX "UserProfile_userId_name_idx" ON "UserProfile"("userId", "name");
