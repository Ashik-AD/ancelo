import CurrentTask from 'renderer/components/task/CurrentTask';
import TaskList from 'renderer/components/task/TaskList';
import { useAppStore } from 'renderer/store';
import TaskBanner from 'renderer/components/task/notask-banner';
import RouteNav from 'renderer/components/nav/RouteNav';
import RecentTask from 'renderer/components/task/recent-task';
function Task() {
  const { list, current } = useAppStore(({ tasks }) =>
    tasks(({ list, current }) => ({ list, current }))
  );
  return (
    <>
      <RouteNav title="" />
      {!current && <TaskBanner />}
      <CurrentTask />
      <TaskList list={list} />
      <RecentTask />
    </>
  );
}
export default Task;
