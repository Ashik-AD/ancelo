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
  const { addTaskList } = useAppStore(
    ({ tasks }) =>
      tasks((state) => ({
        addTaskList: state.addList,
      }), shallow),
    shallow,
  );
  const addSessionList = useAppStore(
    ({ sessions }) => sessions.getState().addLists,
    shallow,
  );

  useEffect(() => {
    (async function () {
      const [taskList, sessionList] = await Promise.all([
        await fetcher("/tasks/today"),
        await fetcher("/sessions"),
      ]);

      const netError = taskList.error || sessionList.error;
      if (netError) {
        toast.error(netError);
        console.log(netError);
      }

      addTaskList(taskList.tasks);
      addSessionList(sessionList);
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
