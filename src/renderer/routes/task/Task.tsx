import fetcher from "main/lib/fetch";
import { useEffect } from "react";
import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskList from "renderer/components/task/TaskList";
import { useTaskStore } from "renderer/store";
import { shallow } from "zustand/shallow";
function Task() {
  const { list, setList } = useTaskStore(
    (state) => ({ list: state.list, setList: state.setList }),
    shallow,
  );

  useEffect(() => {
    fetcher("/tasks/today").then((res) => {
      console.log(res.tasks)
      setList(res.tasks);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <CurrentTask id={1} title="Hello world" duration={25} />
      <TaskList list={list} />
      <AddTask />
    </div>
  );
}
export default Task;
