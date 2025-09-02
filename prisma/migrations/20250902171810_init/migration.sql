-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CPF" TEXT,
    "CNPJ" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "reatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_CPF_key" ON "public"."User"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "User_CNPJ_key" ON "public"."User"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
