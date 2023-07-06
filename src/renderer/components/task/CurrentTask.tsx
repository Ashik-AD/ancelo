/**
 * @params { id, title, description, duration}
 * @method { repeateTask(taskId), toggleRandomTask() }
 */
import TaskDuration from "../taskDuration/TaskDuration";
import ProgressBar from "../progressbar/ProgressBar";
import { Icon } from "@iconify/react";
import style from "./style.module.scss";
import { useTaskStore } from "renderer/store";
import { shallow } from "zustand/shallow";

function CurrentTask() {
  const { current, start } = useTaskStore((state) => ({
    current: state.current,
    start: state.start,
  }), shallow);
  if (!current) return null;
  return (
    <div className={style.current__task}>
      <div className={style.task__title}>
        <h2>{current.title}</h2>
        <p className={`small`}>
          {current.description || `No task description`}
        </p>
      </div>
      <div className={style.task__controller}>
        <TaskDuration duration={Number(current?.duration)} />
        <div className={style.task__controls}>
          <Icon icon="pajamas:repeat" />
          <Icon icon="ri:shuffle-line" />
        </div>
      </div>
      {<ProgressBar duration={current.duration} />}
    </div>
  );
}
export default CurrentTask;
