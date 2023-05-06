/*
  Warnings:

  - You are about to drop the `Seed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeedSample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seed" DROP CONSTRAINT "Seed_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Seed" DROP CONSTRAINT "Seed_sampleId_fkey";

-- DropTable
DROP TABLE "Seed";

-- DropTable
DROP TABLE "SeedSample";

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "tbl_user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "coin" INTEGER DEFAULT 0,

    CONSTRAINT "tbl_user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_seed_samples" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "matureTime" INTEGER NOT NULL,
    "maturePrice" INTEGER NOT NULL,
    "requiredUserLevel" INTEGER NOT NULL,
    "thumbnailUrl" TEXT,

    CONSTRAINT "tbl_seed_samples_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "tbl_seeds" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,

    CONSTRAINT "tbl_seeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_profiles_userId_key" ON "tbl_user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_profiles_name_key" ON "tbl_user_profiles"("name");

-- CreateIndex
CREATE INDEX "tbl_user_profiles_userId_name_idx" ON "tbl_user_profiles"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_seed_samples_name_key" ON "tbl_seed_samples"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_seeds_ownerId_key" ON "tbl_seeds"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_seeds_sampleId_key" ON "tbl_seeds"("sampleId");

-- AddForeignKey
ALTER TABLE "tbl_seeds" ADD CONSTRAINT "tbl_seeds_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "tbl_user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_seeds" ADD CONSTRAINT "tbl_seeds_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "tbl_seed_samples"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
