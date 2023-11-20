import { Icon } from '@iconify/react';

import style from './style.module.scss';

export type TaskDurationProps = {
  duration: string | number;
  showIcon?: boolean;
};

function TaskDuration({ duration, showIcon = true }: TaskDurationProps) {
  return (
    <div className={style.task__duration}>
      {showIcon ? <Icon icon="mdi:clock-outline" /> : null}
      <span className="text-small bold">{calculateDuration(duration)}</span>
    </div>
  );
}
export default TaskDuration;

function calculateDuration(duration: number | string) {
  duration = Number(duration);

  if (duration > 60) {
    const hr = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hr}${hr > 1 ? 'hrs' : 'hr'} ${
      min > 0 ? `${min}${min > 1 ? 'mins' : 'min'}` : ''
    }`;
  }
  return `${duration}${duration > 1 ? 'mins' : 'min'}`;
}
