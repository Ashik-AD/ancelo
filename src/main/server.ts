import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '../lib/prisma';
import { thumbnailNameByTime } from '../lib/thumbnail';

import type { Sessions, Tasks } from '@prisma/client';

const app = express();
const port = 6699;
const WEEK_MS = 640173549;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening ${port}`);
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.post('/tasks', async (req, res, next) => {
  try {
    const { title, duration, description } = (await req.body) as Tasks;
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
    next('Something went wrong');
  }
});

app.get('/tasks', async (_, res) => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.json({ tasks });
  } catch (error) {
    res.json({ error: `Can't fetch task` });
    console.log(error);
  }
});

app.get('/tasks/today', async (_, res) => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];
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
        created_at: 'asc',
      },
    });
    res.json({ tasks });
  } catch (error) {
    res.json({ error: `Something went wrong` });
    console.log(error);
  }
});

app.get('/tasks/completed', async (req, res) => {
  try {
    const limit = +req.query?.limit!!;
    const skip = +req.query?.offset!!;
    const completedRecord = await prisma.tasks.findMany({
      where: {
        completed: true,
      },
      skip: skip,
      take: limit,
    });

    res.json({ lists: completedRecord, offset: skip + completedRecord.length });
  } catch (error) {
    res.json({ error: 'something went wrong' });
    console.error(error);
  }
});

app.post('tasks/completed/:id', async (req, res) => {
  try {
    const completedId = req.params.id;
    await prisma.tasks.update({
      where: {
        id: completedId,
      },
      data: {
        completed: true,
      },
    });
    res.json({ message: 'update successful' });
  } catch (error) {
    res.json({ error: error?.message });
    console.error(error);
  }
});
app.get('/sessions', async (_, res) => {
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
    res.json({ error: `Something went wrong. Session can't seems to fetch` });
  }
});
app.post('/sessions', async (req, res) => {
  const { title, description, schedule, tasks } = req.body as Pick<
    Sessions,
    'title' | 'description' | 'schedule'
  > & { tasks: Tasks[] };
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
    res.json({ error: 'Something went wrong. Cant able to create session' });
    console.log(error);
  }
});

app.get('/sessions/:sessionId/tasks', async (req, res) => {
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

app.patch('/sessions/:id', async (req, res) => {
  let id = req.params.id;

  const { title, schedule, description } = req.body as Sessions;

  try {
    let thumbnail = thumbnailNameByTime(schedule);

    const updatedSession = await prisma.sessions.update({
      where: {
        id,
      },
      data: {
        title,
        schedule,
        description,
        thumbnail,
      },
    });
    res.json({ session: updatedSession });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code) {
        res.json({ error: `Can't update database.\n error: ${error}` });
      }
    }
    res.json({ error: error.message });
  }
});

app.delete('/sessions/:id/flush', async (req, res) => {
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
    res.send({ error: `Something went wrong`, dev: error?.message });
  }
});

// @Routine routes
app.get('/routines', async (_, res) => {
  var routines = await prisma.routines.findMany({
    include: {
      tasks: true,
    },
  });

  res.json({ routines });
});

app.post('/routines', async (req, res) => {
  try {
    const { title, breakDuration, schedule, scheduleDays, tasks, theme } =
      req.body;

    if (!title?.trim() || !breakDuration || !schedule || !scheduleDays) {
      res.status(400).json({
        error: `Ahh! you should provide full information`,
      });
    }

    if (breakDuration < 5 || breakDuration > 25) {
      res.status(400).json({
        error: `I understand you want a break as you like. \n But I don't allowed to happen :)`,
      });
    }

    var addRoutine = await prisma.routines.create({
      data: {
        title,
        breakDuration,
        scheduleDays: scheduleDays.toString(),
        schedule,
        theme,
        cover: 'hell.jpg',
        tasks: {
          create: tasks,
        },
      },
    });
    res.send({ routine: addRoutine });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

app.get('/stat/count', async (_, res) => {
  try {
    const [task, uncompletedTask, session, routine] = await Promise.all([
      await prisma.tasks.count(),
      await prisma.tasks.count({
        where: {
          completed: false,
        },
      }),
      await prisma.sessions.count(),
      await prisma.routines.count(),
    ]);
    res.json({ task, uncompletedTask, session, routine });
  } catch (err: any) {
    console.log(err);
    res.send({ err: err?.message });
  }
});

type GroupDay = Record<string, number[]>;
app.get('/stat/weekly', async (_, res) => {
  try {
    const weeklyTask = await prisma.tasks.findMany({
      where: {
        created_at: {
          gte: new Date(+new Date() - WEEK_MS),
        },
      },
    });
    const groupByDay = countAndGroupRecord(weeklyTask);
    const normalized = mergeCount(groupByDay);
    res.json(normalized);

    function countAndGroupRecord(records: Tasks[]): GroupDay {
      const result: GroupDay = {};

      records?.forEach((task) => {
        const day = new Date(task.created_at).getDay();
        const counts = result[day] || [0, 0];
        if (task.completed) {
          counts[0] += 1;
        } else {
          counts[1] -= 1;
        }
        result[day] = counts;
      });
      return result;
    }

    function mergeCount(obj: GroupDay) {
      const mergeCounts = {
        completed: Array(7).fill(0),
        unCompleted: Array(7).fill(0),
      };
      for (const day in obj) {
        mergeCounts.completed[Number(day)] = obj[day][0];
        mergeCounts.unCompleted[Number(day)] = obj[day][1];
      }
      return mergeCounts;
    }
  } catch (err) {
    res.json({ error: err });
    console.error(err);
  }
});
export default app;
