/**
 * @params {bulletNo, id, title, description, duration, handleUpldateDescription()}
 */
import style from './style.module.scss';
import TaskDuration from './TaskDuration';
import { Tasks } from '@prisma/client';

export interface TaskItemProps extends Partial<Tasks> {
  title: string;
  id: string;
  duration: number;
  bulletNo?: number;
  onUpdateDescription?: (id: string) => void;
  variant?: 'default' | 'minimal';
}
function TaskItem({
  id,
  bulletNo,
  title,
  description,
  duration,
  onUpdateDescription,
  variant,
}: TaskItemProps) {
  return (
    <article
      tabIndex={0}
      aria-label="Today's your task"
      className={style.task__item}
    >
      <span className="semiBold text-small">#{bulletNo}</span>
      <div className={`${style.task__details}`}>
        <p
          className={`${variant == 'minimal' ? 'text-lg' : 'h5'} ${
            style.task__title
          }`}
        >
          {title}
        </p>
        {variant != 'minimal' && (
          <span
            className="text-small pointer"
            onClick={() => onUpdateDescription && onUpdateDescription(id)}
          >
            {description || 'Add description'}
          </span>
        )}
      </div>
      <TaskDuration duration={duration} />
    </article>
  );
}
export default TaskItem;
