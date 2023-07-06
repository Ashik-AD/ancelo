import { Tasks } from "@prisma/client";
import TaskItem from "./TaskItem";

interface Props {
  list: Tasks[];
}
function TaskList({ list }: Props) {
  if (list.length == 0 || !Array.isArray(list)) {
    return <h2>No Task for Today</h2>;
  }

  function handleUpdateTaskDescription(id: string) { }
  return (
    <div>
      {list.map((task, index) => (
        <TaskItem
          key={task.id}
          bulletNo={index + 2}
          id={task.id}
          title={task.title}
          description={task.description}
          duration={task.duration}
          completed={task.completed}
          onUpdateDescription={handleUpdateTaskDescription}
          created_at={task.created_at}
        />
      ))}
    </div>
  );
}
export default TaskList;
