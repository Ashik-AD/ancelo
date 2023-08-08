import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskList from "renderer/components/task/TaskList";
import { useAppStore } from "renderer/store";
import { playAlert } from "renderer/components/play-alert/PlayAlert";
function Task() {
  const taskList = useAppStore(
    ({tasks}) => tasks(({list}) => list) 
  );

  return (
    <>
      <CurrentTask />
      <TaskList list={taskList} />
    </>
  );
}
export default Task;
