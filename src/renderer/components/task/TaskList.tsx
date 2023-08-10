import TaskItem, { TaskItemProps } from "./TaskItem";

// @Todo: implement update description feature

interface Props {
  list: TaskItemProps[];
  minimal?: boolean;
}
function TaskList({ list, minimal }: Props) {
  function handleUpdateTaskDescription(id: string) {}
  return (
    <div>
      {list?.map((task, index) => (
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
          varient={minimal ? "minimal" : "default"}
        />
      ))}
    </div>
  );
}
export default TaskList;
