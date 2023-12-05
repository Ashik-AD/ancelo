import { ReactNode, useEffect } from 'react';
import Greeting from 'renderer/components/dashboard/greeting';
import StatCard from 'renderer/components/dashboard/stat-card';
import useFetch from 'renderer/hooks/useFetch';
import style from './layout.module.scss';
import images from 'renderer/components/images';
import WeeklyTaskStatus from 'renderer/components/dashboard/weekly-task-status';
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useFetch('/stat/count');

  return (
    <section className={style.dashboard_layout}>
      <div className={style.stat_one}>
        <div className={style.greet__gami}>
          <Greeting />
          <StatCard label="Task completed 2day" stat={32} />
          <StatCard label="Days streak" stat={7} />
        </div>
        <div className={style.stat__count}>
          <StatCard
            label="Task"
            stat={data?.task}
            icon={<img src={images.gym} />}
          />
          <StatCard
            label="Sessions"
            stat={data?.session}
            icon={<img src={images.fire} />}
          />
          <StatCard
            label="Routines"
            stat={data?.routine}
            icon={<img src={images.clock} />}
          />
          <StatCard
            label="Uncompleted task"
            stat={data?.uncompletedTask}
            icon={<img src={images.alert} />}
          />
        </div>
      </div>
      <div>
        <WeeklyTaskStatus />
      </div>
      {children}
    </section>
  );
}
