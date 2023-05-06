-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeedSample" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "matureTime" INTEGER NOT NULL,
    "maturePrice" INTEGER NOT NULL,
    "requiredUserLevel" INTEGER NOT NULL,

    CONSTRAINT "SeedSample_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeedSample_name_key" ON "SeedSample"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Seed_ownerId_key" ON "Seed"("ownerId");

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
