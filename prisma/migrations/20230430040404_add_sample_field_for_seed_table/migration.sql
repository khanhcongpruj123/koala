/*
  Warnings:

  - A unique constraint covering the columns `[sampleId]` on the table `Seed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sampleId` to the `Seed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seed" ADD COLUMN     "sampleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seed_sampleId_key" ON "Seed"("sampleId");

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "SeedSample"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
