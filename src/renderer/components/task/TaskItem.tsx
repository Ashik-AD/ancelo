/**
 * @params {bulletNo, id, title, description, duration, handleUpldateDescription()}
 */
import style from "./style.module.scss";
import TaskDuration from "./TaskDuration";
import { Tasks } from "@prisma/client";

export interface TaskItemProps extends Partial<Tasks> {
  title: string;
  id: string;
  duration: number;
  bulletNo?: number;
  onUpdateDescription?: (id: string) => void;
  varient?: "default" | "minimal";
}
function TaskItem(
  { id, bulletNo, title, description, duration, onUpdateDescription, varient }:
    TaskItemProps,
) {
  return (
    <article
      tabIndex={0}
      aria-label="Today's your task"
      className={style.task__item}
    >
      <span className="semiBold small">#{bulletNo}</span>
      <div className={`${style.task__details}`}>
        <p className={`${ varient == 'minimal' ? 'text-lg' : 'h4' } ${style.task__title}`}>{title}</p>
        {varient != "minimal" &&
          (
            <span
              className="text-small pointer"
              onClick={() => onUpdateDescription && onUpdateDescription(id)}
            >
              {description || "Add description"}
            </span>
          )}
      </div>
      <TaskDuration duration={duration} />
    </article>
  );
}
export default TaskItem;
