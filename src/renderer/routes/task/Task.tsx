import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskList from "renderer/components/task/TaskList";
import { useTaskStore } from "renderer/store";
import { shallow } from "zustand/shallow";
function Task() {
  const { list, start } = useTaskStore(
    (state) => ({
      list: state.list,
      start: state.start,
    }),
    shallow,
  );

  return (
    <div>
      <CurrentTask />
      <TaskList list={list} />
      <AddTask />
    </div>
  );
}
export default Task;
