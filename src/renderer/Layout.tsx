import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Style from "./layout.module.scss";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={Style.root__layout}>
      <div className={Style.side__bar}>
        <h2>Music Player Bar</h2>
      </div>
      <div className={Style.main__content}>
        <Toaster />
        {children}
      </div>
    </div>
  );
}
export default Layout;
