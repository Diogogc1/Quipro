-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pontuacao" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trilha" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "concluida" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capitulo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "trilhaId" INTEGER NOT NULL,

    CONSTRAINT "Capitulo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- AddForeignKey
ALTER TABLE "Capitulo" ADD CONSTRAINT "Capitulo_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "Trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
