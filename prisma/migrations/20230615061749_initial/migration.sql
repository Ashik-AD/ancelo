-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "schedule" DATETIME,
    "theme" TEXT,
    "thumbnail" TEXT,
    "background" TEXT
);

-- CreateTable
CREATE TABLE "SessionTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "sessionsId" TEXT,
    CONSTRAINT "SessionTasks_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Routines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "startAt" DATETIME NOT NULL,
    "finishAt" DATETIME NOT NULL,
    "repeatDays" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "cover" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RoutineTasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "routinesId" TEXT,
    CONSTRAINT "RoutineTasks_routinesId_fkey" FOREIGN KEY ("routinesId") REFERENCES "Routines" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
