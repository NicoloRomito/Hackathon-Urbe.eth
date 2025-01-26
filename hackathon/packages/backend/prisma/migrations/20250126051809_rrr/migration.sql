-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_nft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER,
    "address" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "companyId" INTEGER,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "nft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "nft_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_nft" ("address", "companyId", "createdAt", "id", "timestamp", "title", "tokenId", "userId") SELECT "address", "companyId", "createdAt", "id", "timestamp", "title", "tokenId", "userId" FROM "nft";
DROP TABLE "nft";
ALTER TABLE "new_nft" RENAME TO "nft";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
