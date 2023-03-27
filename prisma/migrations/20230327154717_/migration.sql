-- AlterTable
ALTER TABLE `Time` ADD COLUMN `invoiceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Time` ADD CONSTRAINT `Time_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
