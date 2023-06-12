import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Style from "./Style.module.scss";

function Navigation() {
  return (
    <nav className={Style.app__navigation}>
      <div className={Style.nav__main}>
        <NavItem
          path="/"
          icon={<Icon icon="vscode-icons:file-type-taskfile" />}
          label={"My Task"}
        />
        <NavItem
          path="/session"
          icon={<Icon icon="fluent-emoji:mushroom" />}
          label={"Session"}
        />
        <NavItem
          path="/routine"
          icon={<Icon icon="fluent-emoji:smiling-face-with-sunglasses" />}
          label={"Routine"}
        />
        <NavItem
          path="/music"
          icon={<Icon icon="flat-color-icons:music" />}
          label={"Music"}
        />
      </div>
      <div className={Style.nav__setting}>
        <NavItem
          icon={<Icon icon="basil:settings-alt-outline" />}
          path="/setting"
          label={"Setting"}
        />
      </div>
    </nav>
  );
}
export default Navigation;

function NavItem(
  { icon, label, path }: {
    label: string;
    icon: ReactNode;
    path: string;
  },
) {
  return (
    <NavLink
      to={path}
      role="button"
      className={({isActive}) =>
        `${isActive ? Style.nav__item_active : ""
        } btn ${Style.nav__item} small `}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
  );
}
