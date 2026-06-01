-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "capturadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pokemon_tipo_idx" ON "Pokemon"("tipo");
