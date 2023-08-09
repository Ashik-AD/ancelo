import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import TaskList from "../task/TaskList";
import TaskItem, { TaskItemProps } from "../task/TaskItem";
import Input from "../form/Input";
import style from "./style.module.scss";

export type RoutineTaskState = TaskItemProps;

export type RoutineTaskRef = {
  getRoutineTask: () => RoutineTaskState[];
};

const CreateRoutineTask = forwardRef<RoutineTaskRef>((_, ref) => {
  const [tasks, setTasks] = useState<RoutineTaskState[]>([]);

  useImperativeHandle(ref, () => {
    return {
      getRoutineTask: () => tasks,
    };
  }, [tasks]);

  const handleAddTask = (task: RoutineTaskState) => {
    var taskList = tasks.slice();
    taskList.push(task);
    setTasks(taskList);
  };
  return (
    <div className={style.create__routine__task}>
      <div>
        <h4>Create task</h4>
        <TaskList list={tasks} />
      </div>
      <TaskForm onCreate={handleAddTask} />
    </div>
  );
});

export default CreateRoutineTask;

function TaskForm(
  { onCreate }: {
    onCreate: (task: RoutineTaskState) => void;
  },
) {
  const [task, setTask] = useState<RoutineTaskState | null>(null);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setTask((prevTask) => ({
      ...prevTask!!,
      [name]: value,
    }));
  };

  const genUniqueId = () =>
    Math.floor(Math.random() * Date.now() / 1000).toString();
  const handleCreateTask = () => {
    if (task) return;
    setTask({
      title: "",
      duration: 25,
      id: genUniqueId(),
    });
  };

  const handleSubmitTask = () => {
    if (task?.title && task?.duration >= 5) {
      onCreate(task);
      setTask({
        title: "",
        duration: 25,
        id: "",
      });
      return;
    }
  };

  return (
    <div className={style.create__task}>
      {task && (
        <TaskItem
          {...task}
          title={task?.title || "#task name"}
        />
      )}
      <div className={`${style.wrapper}`}>
        <Input
          type="text"
          name="title"
          label="Title"
          role="button"
          value={task?.title || ""}
          placeholder="#task name"
          onChange={handleInputChange}
          onFocus={handleCreateTask}
          onBlur={handleSubmitTask}
          onKeyDown={(evt) => {
            if (evt.key == "Enter") {
              handleSubmitTask();
              evt.preventDefault();
            }
          }}
        />
        <Input
          type="number"
          name="duration"
          label="Duration"
          value={task?.duration || 25}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
