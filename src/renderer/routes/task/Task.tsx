import CurrentTask from 'renderer/components/task/CurrentTask';
import TaskList from 'renderer/components/task/TaskList';
import { useAppStore } from 'renderer/store';
import TaskBanner from 'renderer/components/task/notask-banner';
function Task() {
  const { list, current } = useAppStore(({ tasks }) =>
    tasks(({ list, current }) => ({ list, current }))
  );
  return (
    <>
      {!current && <TaskBanner />}
      <CurrentTask />
      <TaskList list={list} />
    </>
  );
}
export default Task;
