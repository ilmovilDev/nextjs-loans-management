-- CreateEnum
CREATE TYPE "LoansStatus" AS ENUM ('ACTIVE', 'PAID', 'OVERDUE');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);
