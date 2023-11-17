import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import style from './style.module.scss';

export type ButtonAddProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function ButtonAdd({ label, icon, onClick }: ButtonAddProps) {
  return (
    <button onClick={onClick} className={style.btn_add}>
      {icon ?? <Icon icon="lets-icons:add-round" className={`h4`} />}
      {label}
    </button>
  );
}
