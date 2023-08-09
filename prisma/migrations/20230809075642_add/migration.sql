/*
  Warnings:

  - Added the required column `theme` to the `Routines` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Routines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "schedule" DATETIME NOT NULL,
    "scheduleDays" TEXT NOT NULL,
    "breakDuration" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Routines" ("breakDuration", "cover", "created_at", "id", "schedule", "scheduleDays", "title") SELECT "breakDuration", "cover", "created_at", "id", "schedule", "scheduleDays", "title" FROM "Routines";
DROP TABLE "Routines";
ALTER TABLE "new_Routines" RENAME TO "Routines";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
