import { Tasks } from "@prisma/client";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Checkbox from "../form/Checkbox";
import TaskItem from "./TaskItem";
import style from "./style.module.scss";

export interface SelectTasksProps {
  tasks: Tasks[];
}
export type SelectedTasks  = {
  title: string,
  description: string,
  duration: number
}
type ExtendedTasks = Tasks & {
  selected: boolean;
};
export interface SelectTasksHandle {
  selected: () => SelectedTasks[];
}

const SelectTasks = forwardRef<SelectTasksHandle, SelectTasksProps>(
  ({ tasks }, ref) => {
    const [selectedTasks, setSelectedTasks] = useState<ExtendedTasks[]>(
      tasks as ExtendedTasks[],
    );

    useImperativeHandle(ref, () => ({
      selected: function () {
        let normalizedTasks: SelectedTasks[] = [];

        selectedTasks?.forEach((task) => {
          if (task["selected"] === true) {
            normalizedTasks.push({
              title: task.title,
              description: task.description,
              duration: task.duration,
            });
          }
        });
        return normalizedTasks;
      },
    }), [selectedTasks]);

    useEffect(() => {
      setSelectedTasks(tasks as ExtendedTasks[]);
    }, [tasks]);

    const handleSelectTask = (id: string) => {
      setSelectedTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id == id) {
            task.selected = !task.selected;
            return {
              ...task,
            };
          }
          return { ...task };
        })
      );
    };

    const renderTasks = selectedTasks?.map((task, index) => (
      <RenderSelectItem
        key={task.id}
        onSelect={() => handleSelectTask(task.id)}
      >
        <Checkbox
          onCheck={() => {}}
          value={task.id}
          checked={task.selected}
        />
        <TaskItem
          onUpdateDescription={() => console.log}
          bulletNo={index + 1}
          {...task}
        />
      </RenderSelectItem>
    ));

    return (
      <div className={style.select__tasks__wrapper}>
        <h4>Select multiple select</h4>
        {renderTasks}
      </div>
    );
  },
);
export default SelectTasks;

function RenderSelectItem(
  { children, onSelect }: { onSelect: () => void; children: ReactNode },
) {
  return (
    <div className={style.select__item} onClick={onSelect}>
      {children}
    </div>
  );
}
