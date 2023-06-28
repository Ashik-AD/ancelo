/**
 * @params { id, title, description, duration}
 * @method { repeateTask(taskId), toggleRandomTask() }
 */
import TaskDuration from "../taskDuration/TaskDuration";
import ProgressBar from '../progressbar/ProgressBar'
import { Icon } from "@iconify/react";
import style from "./style.module.scss";
interface Props {
  id: number;
  title: string;
  description?: string;
  duration: number;
}
function CurrentTask(props: Props) {
  return (
    <div className={style.current__task}>
      <div className={style.task__title}>
        <h2>{props.title}</h2>
        <p className={`small`}>
          {props.description || `No task description`}
        </p>
      </div>
      <div className={style.task__controller}>
        <TaskDuration duration={120} />
        <div className={style.task__controls}>
          <Icon icon="pajamas:repeat" />
          <Icon icon="ri:shuffle-line" />
        </div>
      </div>
      <ProgressBar duration={props.duration} />
    </div>
  );
}
export default CurrentTask;
