import { ReactNode } from "react";

import style from './style.module.scss'
import TaskDuration from "../task/TaskDuration";

export type StatsProps = {
  totalTask: number;
  duration: string | number;
  schedule: string;
  children?: ReactNode;
};

function Stats({ totalTask, duration, schedule, children }: StatsProps) {
  return (
    <article className={style.stats}>
      <span className="text-small semiBold">{totalTask} task{totalTask > 1 ? "s" : ""}</span>
      <TaskDuration duration={duration || 0} />
      <span className="text-small semiBold">Start at: {schedule}</span>
      {children}
    </article>
  );
}
export default Stats;
