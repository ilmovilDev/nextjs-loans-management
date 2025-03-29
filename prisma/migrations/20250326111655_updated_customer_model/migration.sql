/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cpf_key" ON "Customer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
