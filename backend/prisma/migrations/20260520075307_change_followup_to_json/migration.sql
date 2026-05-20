/*
  Warnings:

  - Changed the type of `followUp` on the `Query` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Query" DROP COLUMN "followUp",
ADD COLUMN     "followUp" JSONB NOT NULL;
