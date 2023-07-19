/*
  Warnings:

  - Made the column `schedule` on table `Sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER,
    "schedule" TEXT NOT NULL,
    "theme" TEXT,
    "thumbnail" TEXT,
    "background" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sessions" ("background", "created_at", "description", "duration", "id", "schedule", "theme", "thumbnail", "title") SELECT "background", "created_at", "description", "duration", "id", "schedule", "theme", "thumbnail", "title" FROM "Sessions";
DROP TABLE "Sessions";
ALTER TABLE "new_Sessions" RENAME TO "Sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
