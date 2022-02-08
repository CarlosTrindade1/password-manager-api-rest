-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "password_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "password" ADD CONSTRAINT "password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
