import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskList from "renderer/components/task/TaskList";
import { useAppStore } from "renderer/store";
function Task() {
  const taskList = useAppStore(
    (state) => state.tasks.getState().list,
  );

  return (
    <div>
      <CurrentTask />
      <TaskList list={taskList} />
      <AddTask />
    </div>
  );
}
export default Task;
