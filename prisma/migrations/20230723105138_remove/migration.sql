/*
  Warnings:

  - You are about to drop the column `count` on the `Sessions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER,
    "schedule" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "background" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sessions" ("background", "created_at", "description", "duration", "id", "schedule", "thumbnail", "title") SELECT "background", "created_at", "description", "duration", "id", "schedule", "thumbnail", "title" FROM "Sessions";
DROP TABLE "Sessions";
ALTER TABLE "new_Sessions" RENAME TO "Sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
