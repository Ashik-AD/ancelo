import { Tasks } from "@prisma/client";
import TaskItem from "./TaskItem";

interface Props {
  list: Tasks[];
}
function TaskList({ list }: Props) {
  if (list.length < 1) {
    return <h2>No Task for Today</h2>;
  }
  return (
    <div>
      {list.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          duration={task.duration}
        />
      ))}
    </div>
  );
}
export default TaskList;
