-- DropIndex
DROP INDEX "tbl_user_profiles_userId_name_idx";

-- AlterTable
ALTER TABLE "tbl_user_profiles" ADD COLUMN     "version" BIGINT NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "tbl_user_profiles_userId_name_version_idx" ON "tbl_user_profiles"("userId", "name", "version");
