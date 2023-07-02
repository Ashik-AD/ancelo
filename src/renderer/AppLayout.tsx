import { ReactNode } from "react";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import fetcher from "main/lib/fetch";
import Navigation from "./components/nav/Navigation";
import Style from "./layout.module.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { useTaskStore } from "./store";

function AppLayout({ children }: { children: ReactNode }) {
  const { setList, setCurrentTask } = useTaskStore(
    (state) => ({
      setList: state.setList,
      setCurrentTask: state.setCurrent,
    }),
    shallow,
  );

  useEffect(() => {
    fetcher("/tasks/today").then((res) => {
      setList(res.tasks);
      setCurrentTask(res.tasks[0]);
    })
      .catch((err) => {
        console.log(err);
      });
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
