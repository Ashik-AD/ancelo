import useFetch from 'renderer/hooks/useFetch';
import { Card, CardTitle } from '../card';
import TaskItem from './TaskItem';

import style from './style.module.scss';
import { Tasks } from '@prisma/client';

export default function CompletedTask() {
  const { data, error } = useFetch('/tasks/completed?limit=10&offset=0');
  const renderCompletedTask = data?.lists.map((task: Tasks, idx: number) => (
    <TaskItem key={task.id} bulletNo={idx + 1} {...task} />
  ));
  return (
    <Card>
      <CardTitle title="Completed Tasks" />
      <div className={style.list__container}>{renderCompletedTask}</div>
    </Card>
  );
}
