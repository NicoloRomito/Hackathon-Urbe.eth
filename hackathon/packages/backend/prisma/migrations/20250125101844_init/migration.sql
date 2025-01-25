/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `codiceFiscale` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "verifiedBy" TEXT,
    "email" TEXT NOT NULL,
    "codiceFiscale" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("address", "createdAt", "email", "id", "updatedAt", "verified", "verifiedBy") SELECT "address", "createdAt", "email", "id", "updatedAt", "verified", "verifiedBy" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_codiceFiscale_key" ON "User"("codiceFiscale");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
