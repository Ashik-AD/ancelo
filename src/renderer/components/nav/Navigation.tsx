import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Style from './Style.module.scss';

function Navigation() {
  return (
    <nav className={Style.app__navigation}>
      <div className={Style.nav__main}>
        <NavItem
          path="/index.html"
          icon={<Icon icon="akar-icons:home-alt1" />}
          label={'Dashboard'}
        />
        <NavItem
          path="/task"
          icon={<Icon icon="vscode-icons:file-type-taskfile" />}
          label={'My Task'}
        />
        <NavItem
          path="/session"
          icon={<Icon icon="fluent-emoji:mushroom" />}
          label={'Session'}
        />
        <NavItem
          path="/routine"
          icon={<Icon icon="fluent-emoji:smiling-face-with-sunglasses" />}
          label={'Routine'}
        />
      </div>
    </nav>
  );
}
export default Navigation;

function NavItem({
  icon,
  label,
  path,
}: {
  label: string;
  icon: ReactNode;
  path: string;
}) {
  return (
    <NavLink
      to={path}
      role="button"
      className={({ isActive }) =>
        `${isActive ? 'low_op_bg text_primary' : 'text_secondary'} btn ${
          Style.nav__item
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
