/**
 * @params { id, title, description, duration}
 * @method { repeateTask(taskId), toggleRandomTask() }
 */
import TaskDuration from "../taskDuration/TaskDuration";
import ProgressBar from '../progressbar/ProgressBar'
import { Icon } from "@iconify/react";
import style from "./style.module.scss";
const props = {
  id: 1,
  title: `Create electron application`,
  description: "hello world",
  duration: 25,
};
function CurrentTask() {
  return (
    <div>
      <div>
        <h2>{props.title}</h2>
        <p className={`small`}>
          {props.description || `No task description`}
        </p>
      </div>
      <div className={style.task_controller}>
        <TaskDuration duration={120} />
        <div className={style.task_controls}>
          <Icon icon="pajamas:repeat" />
          <Icon icon="ri:shuffle-line" />
        </div>
      </div>
      <ProgressBar duration={25} />
    </div>
  );
}
export default CurrentTask;
