/*
  Warnings:

  - You are about to drop the column `complete` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `complete` on the `RoutineTasks` table. All the data in the column will be lost.
  - You are about to drop the column `complete` on the `SessionTasks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tasks" ("created_at", "description", "duration", "id", "title") SELECT "created_at", "description", "duration", "id", "title" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE TABLE "new_RoutineTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "routinesId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "RoutineTasks_routinesId_fkey" FOREIGN KEY ("routinesId") REFERENCES "Routines" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RoutineTasks" ("created_at", "duration", "id", "routinesId", "title") SELECT "created_at", "duration", "id", "routinesId", "title" FROM "RoutineTasks";
DROP TABLE "RoutineTasks";
ALTER TABLE "new_RoutineTasks" RENAME TO "RoutineTasks";
CREATE TABLE "new_SessionTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "sessionsId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SessionTasks_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SessionTasks" ("created_at", "description", "duration", "id", "sessionsId", "title") SELECT "created_at", "description", "duration", "id", "sessionsId", "title" FROM "SessionTasks";
DROP TABLE "SessionTasks";
ALTER TABLE "new_SessionTasks" RENAME TO "SessionTasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
