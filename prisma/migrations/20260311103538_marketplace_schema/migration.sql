/*
  Warnings:

  - You are about to drop the column `fullName` on the `CaregiverProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `CaregiverProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ratingAverage` on the `CaregiverProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `CaregiverProfile` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `city` to the `CaregiverProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `CaregiverProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'COMPLETED');

-- DropIndex
DROP INDEX "CaregiverProfile_hourlyRate_idx";

-- DropIndex
DROP INDEX "CaregiverProfile_ratingAverage_idx";

-- AlterTable
ALTER TABLE "CaregiverProfile" DROP COLUMN "fullName",
DROP COLUMN "hourlyRate",
DROP COLUMN "ratingAverage",
DROP COLUMN "ratingCount",
ADD COLUMN     "boardingRate" DOUBLE PRECISION,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "maxBoardingDogs" INTEGER,
ADD COLUMN     "services" TEXT[],
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "walkingRate" DOUBLE PRECISION,
ALTER COLUMN "yearsExperience" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "address",
DROP COLUMN "fullName",
DROP COLUMN "phone",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT,
    "age" INTEGER,
    "weight" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "serviceCategoryId" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "details" JSONB,
    "clientId" TEXT NOT NULL,
    "caregiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
