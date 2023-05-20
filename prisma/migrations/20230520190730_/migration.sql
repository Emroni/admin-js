-- DropIndex
DROP INDEX `BankAccount_name_key` ON `BankAccount`;

-- AlterTable
ALTER TABLE `BankAccount` ADD COLUMN `color` VARCHAR(191) NULL;
