/*
  Warnings:

  - The `is_active` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deleted_at" DROP NOT NULL,
DROP COLUMN "is_active",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "user_id" DROP NOT NULL;
