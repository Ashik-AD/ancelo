import { Icon } from "@iconify/react";

import style from "./style.module.scss";

function TaskDuration({ duration }: { duration: string | number }) {
  return (
    <div className={style.task__duration}>
      <Icon icon="mdi:clock-outline" />
      <span className="medium">
        {calculateDuration(duration)}
      </span>
    </div>
  );
}
export default TaskDuration;

function calculateDuration(duration: number | string) {
  duration = Number(duration);

  if (duration > 60) {
    const hr = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hr}${hr > 1 ? "hrs" : "hr"} ${min}${min > 1 ? "mins" : "min"}`;
  }
  return `${duration}${duration > 1 ? "mins" : "min"}`;
}
