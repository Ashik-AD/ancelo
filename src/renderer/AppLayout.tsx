import { ReactNode } from "react";
import Navigation from "./components/nav/Navigation";
import Style from "./layout.module.scss";
import { BrowserRouter as Router } from "react-router-dom";
function AppLayout({ children }: { children: ReactNode }) {
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
