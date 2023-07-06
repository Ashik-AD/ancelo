import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskList from "renderer/components/task/TaskList";
import { useTaskStore } from "renderer/store";
import { shallow } from "zustand/shallow";
function Task() {
  const taskList = useTaskStore(
    (state) => state.list,
    shallow,
  );

  console.log(taskList);
  return (
    <div>
      <CurrentTask />
      <TaskList list={taskList} />
      <AddTask />
    </div>
  );
}
export default Task;
