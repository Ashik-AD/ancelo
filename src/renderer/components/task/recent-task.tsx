import { useAppStore } from 'renderer/store';
import style from './style.module.scss';
import TaskDuration from './TaskDuration';
import { shallow } from 'zustand/shallow';
import { Card, CardTitle } from '../card';

export default function RecentTask() {
  const { recent, addTask, activeTaskId, addCurrent, addStart } = useAppStore(
    ({ tasks }) =>
      tasks(({ recent, addTask, addCurrent, current, addStart }) => ({
        activeTaskId: current?.id,
        recent,
        addTask,
        addCurrent,
        addStart,
      })),
    shallow
  );
  const renderTasks = recent?.map((item, idx) => (
    <article
      className={`${style.row} ${
        item?.id == activeTaskId ? style.row_active : ''
      }`}
      key={item.id}
      onClick={() => {
        addTask(item);
        if (!activeTaskId) {
          addCurrent();
          addStart();
        }
      }}
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
    <Card>
      <CardTitle title="Recent Tasks" />
      <div className={style.list__container}>{renderTasks}</div>
    </Card>
  );
}
