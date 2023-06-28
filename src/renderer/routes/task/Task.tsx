import AddTask from "renderer/components/task/AddTask";
import CurrentTask from "renderer/components/task/CurrentTask";
import TaskItem from "renderer/components/task/TaskItem";

function Task() {
  return (
    <div>
      <CurrentTask id={1} title="Hello world" duration={25}/>
      <TaskItem />
      <TaskItem />
      <AddTask />
    </div>
  );
}
export default Task;
