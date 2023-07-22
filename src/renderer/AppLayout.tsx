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
  const { addTaskList, addCurrentTask } = useAppStore(
    ({ tasks }) =>
      tasks((state) => ({
        addTaskList: state.addList,
        addCurrentTask: state.addCurrent,
      })),
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
      addCurrentTask();
      addSessionList(sessionList);
    })();
  }, []);

  return (
    <Router>
      <div className={Style.app__layout}>
        <div className="nav__wrapper">
          <Navigation />
        </div>
        <section>{children}</section>
      </div>
    </Router>
  );
}
export default AppLayout;
