/*
  Warnings:

  - You are about to drop the column `simpleId` on the `User` table. All the data in the column will be lost.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_simpleId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "simpleId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "avatar" SET NOT NULL;
