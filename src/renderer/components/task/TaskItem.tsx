/**
 * @params {bulletNo, id, title, description, duration, handleUplodDateDescription()}
 */
import { useState } from 'react';
import style from './style.module.scss';
import TaskDuration from './TaskDuration';
import { Icon } from '@iconify/react';
import { useAppStore } from 'renderer/store';
import { shallow } from 'zustand/shallow';

import type { Tasks } from '@prisma/client';

export interface TaskItemProps extends Partial<Tasks> {
  title: string;
  id: string;
  duration: number;
  bulletNo?: number;
  variant?: 'default' | 'minimal';
  onUpdateDescription?: (id: string) => void;
}
function TaskItem(props: TaskItemProps) {
  const {
    id,
    bulletNo,
    title,
    description,
    duration,
    onUpdateDescription,
    variant,
  } = props;
  const { startNewTask, currentTaskId } = useAppStore(({ tasks }) =>
    tasks(
      ({ startNewTask, listId }) => ({
        currentTaskId: listId,
        startNewTask,
      }),
      shallow
    )
  );
  const [IsShowPlayBtn, setIsShowPlayBtn] = useState(false);

  return (
    <article
      tabIndex={0}
      aria-label="Today's your task"
      className={`${style.task__item} ${
        currentTaskId == id ? style.task__item_active : ''
      }`}
      onMouseOver={() => setIsShowPlayBtn(true)}
      onMouseLeave={() => setIsShowPlayBtn(false)}
    >
      <div className={style.bullet_play}>
        {IsShowPlayBtn ? (
          <Icon
            icon="basil:play-solid"
            onClick={() => startNewTask(props as Tasks)}
          />
        ) : (
          <span className="semiBold text-small">#{bulletNo}</span>
        )}
      </div>
      <div className={`${style.task__details}`}>
        <p
          className={`${variant == 'minimal' ? 'text-lg' : 'h5 medium'} ${
            style.task__title
          }`}
        >
          {title}
        </p>
        {variant != 'minimal' && (
          <span
            className="text-small text-ellipsis pointer"
            onClick={() => onUpdateDescription && onUpdateDescription(id)}
          >
            {description || 'Add description'}
          </span>
        )}
      </div>
      <TaskDuration duration={duration} showIcon={false} />
    </article>
  );
}
export default TaskItem;
