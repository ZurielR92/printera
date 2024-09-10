/*
  Warnings:

  - You are about to drop the column `default_cost_id` on the `Element` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Element" DROP CONSTRAINT "Element_default_cost_id_fkey";

-- DropIndex
DROP INDEX "Element_default_cost_id_key";

-- AlterTable
ALTER TABLE "Element" DROP COLUMN "default_cost_id",
ADD COLUMN     "default_cost" INTEGER NOT NULL DEFAULT 0;
