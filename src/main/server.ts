import express from "express";
import prisma from "./lib/prisma";
import bodyParser from "body-parser";
import cors from "cors";

import type { Tasks } from "@prisma/client";

const app = express();
const port = 6699;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening ${port}`);
});
app.post("/tasks", async (req, res, next) => {
  try {
    console.log(req.body)
    const { title, duration, description } = await req.body as Tasks;
    const save = await prisma.tasks.create({
      data: {
        title,
        duration: Number(duration),
        description,
      },
    });
    res.status(200).json(save)
  } catch (error) {
    res.status(400).send({ error: `Can't create task` });
    console.log(error);
    next("Something went wrong")
  }
});
app.get('/tasks', async (req, res, next) => {

})
export default app;