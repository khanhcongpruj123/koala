/*
  Warnings:

  - Made the column `coin` on table `tbl_user_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbl_user_profiles" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedLands" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "coin" SET NOT NULL;

-- CreateTable
CREATE TABLE "tbl_user_profile_levels" (
    "level" INTEGER NOT NULL,
    "maxLands" INTEGER NOT NULL DEFAULT 0,
    "requiredExp" INTEGER NOT NULL,

    CONSTRAINT "tbl_user_profile_levels_pkey" PRIMARY KEY ("level")
);
