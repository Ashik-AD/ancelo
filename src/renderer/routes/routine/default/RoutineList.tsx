import { Routines, RoutineTasks } from '@prisma/client';
import { formatTime12Sys } from 'lib/time';
import DayScheduleSelect from 'renderer/components/day-schedule/DayScheduleSelect';
import TaskList from 'renderer/components/task/TaskList';
import { useAppStore } from 'renderer/store';
import { shallow } from 'zustand/shallow';

import { Icon } from '@iconify/react';

import style from './style.module.scss';
import { ReactNode, useRef, useState } from 'react';
import TaskDuration from 'renderer/components/task/TaskDuration';
import { Link } from 'react-router-dom';
import RouteNav from 'renderer/components/nav/RouteNav';
import ButtonAdd from 'renderer/components/button/button-add';

export default function RoutineList() {
  const routines = useAppStore(
    (state) => state.routines(({ list }) => list),
    shallow
  );

  const render = routines.map((routine) => (
    <RoutineCard key={routine.id} {...routine} />
  ));
  return (
    <>
      <RouteNav title="Routine">
        <Link to="./create">
          <ButtonAdd label="New Routine" />
        </Link>
      </RouteNav>
      {render}
    </>
  );
}

interface RoutineCardProps extends Routines {
  tasks?: RoutineTasks[];
}
function RoutineCard(props: RoutineCardProps) {
  const {
    id,
    title,
    cover,
    theme,
    schedule,
    scheduleDays,
    breakDuration,
    tasks,
  } = props;

  var shortTasksPrev = tasks
    ?.slice(0, 2)
    ?.reduce((ac, cur) => cur.title + ', ' + ac, '');

  var routineDuration = tasks?.reduce((ac, cur) => cur.duration + ac, 0);

  return (
    <article className={`flex ${style.routine__card}`}>
      <div className={style.card_thumbnail} style={{ background: theme }}>
        <img src={`http://localhost:6699/static/images/routine.png`} />
      </div>
      <div className={style.card_details}>
        <div className={style.details_titles}>
          <p className={`h3`}>{title}</p>
          <p className={`medium`}>{shortTasksPrev}</p>
        </div>
        <div
          className={`flex item-end content-space ${style.details__schedules}`}
        >
          <div className={`flex text-small bold ${style.schedules_times}`}>
            <span>Start at: {formatTime12Sys(schedule)}</span>
            <span>Break: {breakDuration}min each</span>
            {routineDuration && <TaskDuration duration={routineDuration} />}
          </div>
          <DayScheduleSelect
            selected={scheduleDays.split(',')}
            onSelect={() => {}}
          />
        </div>
        <Accordion>
          <TaskList list={tasks!!} minimal />
        </Accordion>
      </div>
      <div className={style.card__overlay} style={{ background: theme }} />
    </article>
  );
}

function Accordion({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`flex flex-col ${style.accordion}`}>
      <div
        className={`${style.accordion_divider} ${
          open ? style.accordion_divider_open : style.accordion_divider_close
        }`}
      />
      <div
        className={`${style.accordion__content}`}
        style={open ? { height: contentRef.current?.clientHeight } : {}}
      >
        <div ref={contentRef} className="inner__content">
          {children}
        </div>
      </div>
      <div className={style.accordion__action}>
        <Icon
          icon={`fluent:caret-${open ? 'up' : 'down'}-12-filled`}
          className={style.action_btn}
          role="button"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        />
      </div>
    </div>
  );
}
