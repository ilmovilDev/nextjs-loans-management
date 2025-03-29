/*
  Warnings:

  - Added the required column `amount` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestRate` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMode` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "installments" INTEGER NOT NULL,
ADD COLUMN     "interestRate" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "paymentMode" "PaymentMode" NOT NULL,
ADD COLUMN     "status" "LoansStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
