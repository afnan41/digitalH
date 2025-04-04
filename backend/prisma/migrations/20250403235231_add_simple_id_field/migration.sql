/*
  Warnings:

  - A unique constraint covering the columns `[simpleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `simpleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "simpleId" TEXT NOT NULL,
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_simpleId_key" ON "User"("simpleId");
