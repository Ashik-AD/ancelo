-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoutineTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "routinesId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "RoutineTasks_routinesId_fkey" FOREIGN KEY ("routinesId") REFERENCES "Routines" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RoutineTasks" ("duration", "id", "routinesId", "title") SELECT "duration", "id", "routinesId", "title" FROM "RoutineTasks";
DROP TABLE "RoutineTasks";
ALTER TABLE "new_RoutineTasks" RENAME TO "RoutineTasks";
CREATE TABLE "new_Routines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "startAt" DATETIME NOT NULL,
    "finishAt" DATETIME NOT NULL,
    "repeatDays" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Routines" ("cover", "finishAt", "id", "interval", "repeatDays", "startAt", "title") SELECT "cover", "finishAt", "id", "interval", "repeatDays", "startAt", "title" FROM "Routines";
DROP TABLE "Routines";
ALTER TABLE "new_Routines" RENAME TO "Routines";
CREATE TABLE "new_SessionTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "sessionsId" TEXT,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SessionTasks_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SessionTasks" ("description", "duration", "id", "sessionsId", "title") SELECT "description", "duration", "id", "sessionsId", "title" FROM "SessionTasks";
DROP TABLE "SessionTasks";
ALTER TABLE "new_SessionTasks" RENAME TO "SessionTasks";
CREATE TABLE "new_Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "schedule" DATETIME,
    "theme" TEXT,
    "thumbnail" TEXT,
    "background" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Sessions" ("background", "description", "duration", "id", "schedule", "theme", "thumbnail", "title") SELECT "background", "description", "duration", "id", "schedule", "theme", "thumbnail", "title" FROM "Sessions";
DROP TABLE "Sessions";
ALTER TABLE "new_Sessions" RENAME TO "Sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
