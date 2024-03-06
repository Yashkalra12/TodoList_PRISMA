-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "todo_desc" TEXT NOT NULL,
    "todo_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
