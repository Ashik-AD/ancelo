import { useAppStore } from 'renderer/store';
import style from './style.module.scss';
import TaskDuration from './TaskDuration';
import { Tasks } from '@prisma/client';

export default function MiniTask() {
  const { currentTask, queue } = useAppStore(({ tasks }) =>
    tasks(({ current, list }) => ({
      currentTask: current,
      queue: list.slice(0, 1),
    }))
  );

  return (
    <article
      className={style.mini__task}
      tabIndex={0}
      aria-label="Mini task player for showing current running task and next task"
    >
      <MiniView {...currentTask} />
      <Queue list={queue} />
    </article>
  );
}

function MiniView({ title, description }: Partial<Tasks>) {
  return (
    <article className={style.current__running__task}>
      <img
        src="http://localhost:6699/static/images/task.jpg"
        alt="current active task banner"
        className={style.banner}
      />
      <h4 className={style.title}>{title}</h4>
      <p className={`text-small medium color`}>{description}</p>
    </article>
  );
}

function Queue({ list }: { list: Tasks[] }) {
  var isQueueEmpty = !list || list?.length == 0;

  var renderQueue = list?.map((item) => <QueueItem {...item} />);
  return (
    <article className={style.queue__task}>
      <p className={`text-small bold ${style.divider__title}`}>Next in queue</p>
      {isQueueEmpty ? 'Please add task' : renderQueue}
    </article>
  );
}

function QueueItem({ title, duration, description, created_at }: Tasks) {
  return (
    <article className={style.queue__item}>
      <div className={`${style.task}`}>
        <span className={`${style.task__thumbnail}`}>🍀</span>
        <div className={`${style.body}`}>
          <h5 className={style.title}>{title}</h5>
          <TaskDuration duration={duration} />
        </div>
      </div>
      <div className={`${style.task__popup}`}>
        <h3>{title}</h3>
        <p className="medium">{description}</p>
        <div className={style.meta}>
          <TaskDuration duration={duration} />
          <span>Created at: {created_at.toString()}</span>
        </div>
      </div>
    </article>
  );
}
