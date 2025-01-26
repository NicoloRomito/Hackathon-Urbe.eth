/*
  Warnings:

  - You are about to drop the column `companyId` on the `nft` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `nft` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_nft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_nft" ("address", "createdAt", "id", "timestamp", "title", "tokenId") SELECT "address", "createdAt", "id", "timestamp", "title", "tokenId" FROM "nft";
DROP TABLE "nft";
ALTER TABLE "new_nft" RENAME TO "nft";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
