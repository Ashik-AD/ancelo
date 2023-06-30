import fetcher from "main/lib/fetch";
import { useEffect } from "react";
import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskList from "renderer/components/task/TaskList";
import { useTaskStore } from "renderer/store";
import { shallow } from "zustand/shallow";
import type { Tasks } from "@prisma/client";
function Task() {
  const { list, setList, setCurrentTask } = useTaskStore(
    (state) => ({
      list: state.list,
      setList: state.setList,
      start: state.start,
      setCurrentTask: state.setCurrent,
    }),
    shallow,
  );

  useEffect(() => {
    fetcher("/tasks/today").then((res) => {
      setCurrentTask(res.tasks[0]);
      setList(res.tasks);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <CurrentTask />
      <TaskList list={list} />
      <AddTask />
    </div>
  );
}
export default Task;
