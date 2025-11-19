/*
  Warnings:

  - You are about to drop the column `assignedUserId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assignedUserId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `assignedUserId`,
    ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
