/*
  Warnings:

  - You are about to drop the column `currency` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billing` on the `Project` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `currency`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `billing`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `rate` INTEGER NOT NULL;
