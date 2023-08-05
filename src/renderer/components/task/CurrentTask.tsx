/**
 * @params { id, title, description, duration}
 * @method { repeateTask(taskId), toggleRandomTask() }
 */
import TaskDuration from "./TaskDuration";
import ProgressBar from "../progressbar/ProgressBar";
import { Icon } from "@iconify/react";
import style from "./style.module.scss";
import { useAppStore } from "renderer/store";
import { shallow } from "zustand/shallow";

function CurrentTask() {
  const { current, listLength, start } = useAppStore(
    ({ tasks }) =>
      tasks((state) => ({
        current: state.current,
        start: state.start,
        listLength: state.list.length,
      })),
    shallow,
  );

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
      <ProgressBar
        duration={current.duration}
        reset={listLength != 0 || current ? true : false}
        start={start}
      />
    </div>
  );
}
export default CurrentTask;
