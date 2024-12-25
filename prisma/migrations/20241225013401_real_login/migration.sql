-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Deposito', 'Saque', 'Transferencia');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "login" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacoes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "forId" INTEGER NOT NULL,
    "tipo" "Tipo" NOT NULL,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_forId_fkey" FOREIGN KEY ("forId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
