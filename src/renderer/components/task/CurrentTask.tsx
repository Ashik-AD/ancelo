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
import { useEffect, useState } from "react";
import ProgressProvider from "renderer/ProgressProvider";

function CurrentTask() {
  const { current, listLength, setNextTask } = useTaskStore((state) => ({
    current: state.current,
    start: state.start,
    setNextTask: state.addNext,
    listLength: state.list.length
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
      <ProgressProvider>
      <ProgressBar
        duration={current.duration}
        onProgressFinish={setNextTask}
        reset={listLength != 0 || current ? true : false}
      />
      </ProgressProvider>
    </div>
  );
}
export default CurrentTask;
