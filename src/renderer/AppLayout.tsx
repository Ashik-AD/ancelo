import { ReactNode } from "react";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import fetcher from "../lib/fetch";
import Navigation from "./components/nav/Navigation";
import Style from "./layout.module.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppStore } from "./store";

function AppLayout({ children }: { children: ReactNode }) {
  const { setTasks, setSessions, setRotuines } = useAppStore( (state) => ({
    setTasks: state.tasks.getState().addList,
    setSessions: state.sessions.getState().addLists,
    setRotuines: state.routines.getState().setRoutine
  }), shallow);
  const addSessionList = useAppStore(
    ({ sessions }) => sessions.getState().addLists,
    shallow,
  );

  useEffect(() => {
    (async function () {
      const [ taskList, sessionList, routineList ] = await Promise.all([
        await fetcher("/tasks/today"),
        await fetcher("/sessions"),
        await fetcher('/routines')
      ]);

      const netError = taskList.error || sessionList.error;
      if (netError) {
        toast.error(netError);
        console.log(netError);
      }

      setTasks(taskList.tasks);
      setSessions(sessionList);
      setRotuines(routineList)
    })();
  }, []);

  return (
    <main className={`content__main ${Style.app__layout}`}>
      <Router>
        <div className="nav__wrapper">
          <Navigation />
        </div>
        {children}
      </Router>
    </main>
  );
}
export default AppLayout;
