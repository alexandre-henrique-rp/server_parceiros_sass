-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "senha" TEXT,
    "telefone" TEXT,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "telefone2" TEXT,
    "whatsapp2" BOOLEAN NOT NULL DEFAULT false,
    "cpf" TEXT NOT NULL,
    "datanasc" TEXT NOT NULL,
    "cep" TEXT,
    "endereco" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "estado" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "pixkey" TEXT,
    "voucher" INTEGER,
    "avatar" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "custo" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
