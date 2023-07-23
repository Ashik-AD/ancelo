/*
  Warnings:

  - You are about to drop the `SessionTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `theme` on the `Sessions` table. All the data in the column will be lost.
  - Made the column `thumbnail` on table `Sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SessionTasks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SessionItems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "sessionsId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SessionItems_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    "count" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sessions" ("background", "created_at", "description", "duration", "id", "schedule", "thumbnail", "title") SELECT "background", "created_at", "description", "duration", "id", "schedule", "thumbnail", "title" FROM "Sessions";
DROP TABLE "Sessions";
ALTER TABLE "new_Sessions" RENAME TO "Sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
