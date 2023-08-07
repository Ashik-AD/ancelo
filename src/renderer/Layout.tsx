import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Style from "./layout.module.scss";
import PlayAlert from "./components/play-alert/PlayAlert";
import MiniTask from "./components/task/MiniTask";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={Style.root__layout}>
      <div className={Style.side__bar}>
        <MiniTask />
        <h2>Music Player Bar</h2>
      </div>
      <div className={Style.main__content}>
        {children}
        <Toaster />
        <PlayAlert />
      </div>
    </div>
  );
}
export default Layout;
