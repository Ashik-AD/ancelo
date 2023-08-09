/*
  Warnings:

  - You are about to drop the column `finishAt` on the `Routines` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Routines` table. All the data in the column will be lost.
  - You are about to drop the column `repeatDays` on the `Routines` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Routines` table. All the data in the column will be lost.
  - Added the required column `breakDuration` to the `Routines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Routines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleDays` to the `Routines` table without a default value. This is not possible if the table is not empty.

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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Routines" ("cover", "created_at", "id", "title") SELECT "cover", "created_at", "id", "title" FROM "Routines";
DROP TABLE "Routines";
ALTER TABLE "new_Routines" RENAME TO "Routines";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
