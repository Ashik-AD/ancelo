/**
 * @params {bulletNo, id, title, description, duration, handleUpldateDescription()}
 */
import { Icon } from "@iconify/react";
import style from "./style.module.scss";
function TaskItem() {
  const props = {
    id: 1,
    bulletNo: 2,
    title: "Hello world",
    description: undefined,
    duration: 234,
    handleUpdateDescription: function() {
      console.log("helllo world");
    },
  };

  return (
    <article className={style.task__item}>
      <span className="semiBold small">#{props.bulletNo}</span>
      <div className={`${style.task__details} h3`}>
        <h3 className={style.task__title}>{props.title}</h3>
        <span className="small pointer">Add description</span>
      </div>
      <div className={style.task__duration}>
        <Icon icon="mdi:clock-outline" />
        <span className="medium">
          {calculateDuration(props.duration)}
        </span>
      </div>
    </article>
  );
}
export default TaskItem;
function calculateDuration(duration: number) {
  if (duration > 60) {
    const hr = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hr}${hr > 1 ? "hrs" : "hr"} ${min}${min > 1 ? "mins" : "min"
      }`;
  }
  return `${duration}${duration > 1 ? "mins" : "min"}`;
}
