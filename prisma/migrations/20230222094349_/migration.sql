/*
  Warnings:

  - Added the required column `currency` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL;
