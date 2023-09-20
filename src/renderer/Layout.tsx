import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Style from "./layout.module.scss";
import PlayAlert from "./components/play-alert/PlayAlert";
import MiniTask from "./components/task/MiniTask";
import Sidebar from "./components/sidebar/Sidebar";
import Navigation from "./components/nav/Navigation";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={Style.root__layout}>
      <Sidebar>
        <Navigation />
        <MiniTask />
      </Sidebar>
      <div className={Style.main__content}>
        {children}
        <Toaster />
        <PlayAlert />
      </div>
    </div>
  );
}
export default Layout;
