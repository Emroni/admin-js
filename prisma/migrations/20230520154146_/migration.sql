-- AlterTable
ALTER TABLE `Expense` ADD COLUMN `fromBankAccountId` INTEGER NULL,
    ADD COLUMN `toBankAccountId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_fromBankAccountId_fkey` FOREIGN KEY (`fromBankAccountId`) REFERENCES `BankAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_toBankAccountId_fkey` FOREIGN KEY (`toBankAccountId`) REFERENCES `BankAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
