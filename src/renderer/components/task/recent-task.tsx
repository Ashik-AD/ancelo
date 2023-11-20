import type { Tasks } from '@prisma/client';
import { useAppStore } from 'renderer/store';
import style from './style.module.scss';
import TaskDuration from './TaskDuration';

export default function RecentTask() {
  const { recent, addTask, activeTaskId } = useAppStore(({ tasks }) =>
    tasks(({ recent, addTask, current }) => ({
      recent,
      addTask,
      activeTaskId: current?.id,
    }))
  );

  const renderTasks = recent.map((item, idx) => (
    <article
      className={`${style.row} ${
        item?.id == activeTaskId ? style.row_active : ''
      }`}
      key={item.id}
      onClick={() => addTask(item)}
    >
      <div className={style.cell__title}>
        <span className={`text-small bold`}>{idx + 1}</span>
        <span className={`regular medium text-ellipsis`}>{item.title}</span>
      </div>
      <div className={style.cell__description}>
        <span className={`text-ellipsis text-small`}>
          {item.description || 'No description'}
        </span>
      </div>
      <div className={style.cell_duration}>
        <TaskDuration duration={item.duration} showIcon={false} />
      </div>
    </article>
  ));
  return (
    <div className={style.card}>
      <div className={style.card__title}>
        <h5>Recent Tasks</h5>
      </div>
      <div className={style.list__container}>{renderTasks}</div>
    </div>
  );
}
