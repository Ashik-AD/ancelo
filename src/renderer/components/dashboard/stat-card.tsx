import { ReactNode } from 'react';
import { Card } from '../card';
import style from './stat.module.scss';

export type StatCardProps = {
  label: string;
  stat: number;
  icon?: ReactNode;
};

export default function StatCard({ label, stat, icon }: StatCardProps) {
  return (
    <Card className={style.stat_mini_card}>
      {icon && <div className={style.icon}>{icon}</div>}
      <article className={style.content}>
        <span className={style.stat}>{stat}</span>
        <span className={style.label}>{label}</span>
      </article>
    </Card>
  );
}
