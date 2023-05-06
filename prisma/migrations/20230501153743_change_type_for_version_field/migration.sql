/*
  Warnings:

  - You are about to alter the column `version` on the `tbl_user_profiles` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "tbl_user_profiles" ALTER COLUMN "version" SET DATA TYPE INTEGER;
