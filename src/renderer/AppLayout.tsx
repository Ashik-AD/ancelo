import { ReactNode } from 'react';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import fetcher from '../lib/fetch';
import Style from './layout.module.scss';
import { toast } from 'react-hot-toast';
import { useAppStore } from './store';

function AppLayout({ children }: { children: ReactNode }) {
  const { setTasks, setSessions, setRoutine, setRecentTask } = useAppStore(
    (state) => ({
      setTasks: state.tasks.getState().addList,
      setSessions: state.sessions.getState().addLists,
      setRoutine: state.routines.getState().setRoutine,
      setRecentTask: state.tasks.getState().setRecent,
    }),
    shallow
  );

  useEffect(() => {
    (async function () {
      const [taskList, sessionList, routineList] = await Promise.all([
        await fetcher('/tasks/today'),
        await fetcher('/sessions'),
        await fetcher('/routines'),
      ]);

      const netError = taskList.error || sessionList.error;
      if (netError) {
        toast.error(netError);
        console.log(netError);
      }

      setTasks(taskList.tasks);
      setSessions(sessionList);
      setRoutine(routineList.routines);
    })();
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('ipc-get-recent-task');
    window.electron.ipcRenderer.on('ipc-get-recent-task', (args: any) => {
      console.log(args?.data);
      if (args || args.hasOwnProperty('data')) {
        setRecentTask(args.data);
      }
    });
  }, []);

  return (
    <main className={`content__main ${Style.app__layout}`}>{children}</main>
  );
}
export default AppLayout;
