import { ReactNode } from "react";
import { NavLink, useRoutes } from "react-router-dom";

import Style from "./Style.module.scss";

function Navigation() {
  return (
    <nav className={Style.app__navigation}>
      <NavLink
        to={"/"}
        children={<NavItem icon={"🍄"} label={"My Task"} />}
      />
      <NavLink
        to={"/routine"}
        children={<NavItem icon={"😎"} label={"Routine"} />}
      />
    </nav>
  );
}
export default Navigation;

function NavItem(
  { icon, label, isActive }: {
    label: string;
    icon: ReactNode;
    isActive?: boolean;
  },
) {
  return (
    <button className={`${isActive && "nav__item--active"} nav__item`}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
