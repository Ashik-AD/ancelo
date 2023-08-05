import express from "express";
import prisma from "../lib/prisma";
import bodyParser from "body-parser";
import cors from "cors";

import type { Sessions, Tasks } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { thumbnailNameByTime } from "../lib/thumbnail";
import path from "path";

const app = express();
const port = 6699;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening ${port}`);
});

app.use('/static', express.static(path.join(__dirname, 'public')))

app.post("/tasks", async (req, res, next) => {
  try {
    const { title, duration, description } = await req.body as Tasks;
    const save = await prisma.tasks.create({
      data: {
        title,
        duration: Number(duration),
        description,
      },
    });
    res.status(200).json(save);
  } catch (error) {
    res.status(400).send({ error: `Can't create task` });
    console.log(error);
    next("Something went wrong");
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.json({ tasks });
  } catch (error) {
    res.json({ error: `Can't fetch task` });
    console.log(error);
  }
});

app.get("/tasks/today", async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];
    const tasks = await prisma.tasks.findMany({
      where: {
        created_at: {
          gte: new Date(todayDate),
        },
        AND: {
          completed: false,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    res.json({ tasks });
  } catch (error) {
    res.json({ error: `Something went wrong` });
    console.log(error);
  }
});

app.get("/sessions", async (req, res) => {
  try {
    const sessions = await prisma.sessions.findMany({
      include: {
        _count: {
          select: {
            items: true,
          },
        },
      },
    });
    const normalize = sessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      thumbnail: session.thumbnail,
      itemsCount: session._count.items,
      created_at: session.created_at,
      schedule: session.schedule,
      duration: session.duration,
    }));
    res.json(normalize);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.json({ error: error.message });
    }
    res.json({ error: `Someting went wrong. Session can't seems to fetch` });
  }
});
app.post("/sessions", async (req, res) => {
  const { title, description, schedule, tasks } = req.body as
    & Pick<
      Sessions,
      "title" | "description" | "schedule"
    >
    & { tasks: Tasks[] };
  try {
    let thumbnail = thumbnailNameByTime(schedule);
    let duration = tasks?.reduce((acc, cur) => {
      return cur.duration + acc;
    }, 0);
    const session = await prisma.sessions.create({
      data: {
        title,
        description,
        schedule,
        thumbnail,
        duration,
        items: {
          create: tasks,
        },
      },
    });
    res.json({ session });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.json({ error: error.message });
    }
    res.json({ error: "Something went wrong. Cant able to create session" });
    console.log(error);
  }
});

app.get("/sessions/:sessionId/tasks", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const tasks = await prisma.sessionItems.findMany({
      where: {
        sessionsId: sessionId,
      },
    });
    res.send({ tasks });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.delete("/sessions/:id/flush", async (req, res) => {
  try {
    var id = req.params.id;
    if (!id) {
      throw new Error(`Invalid session id`);
    }
    await prisma.sessions.delete({ where: { id } });
    res.send({ message: `Session deleted successfully!` });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.send({ error: `Session is not found` });
    }
    console.log(error);
    res.send({ error: `Something went wrong`, dev: error.message });
  }
});
export default app;
