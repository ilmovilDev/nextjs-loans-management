/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "agentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_cpf_key" ON "Agent"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_phone_key" ON "Agent"("phone");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
