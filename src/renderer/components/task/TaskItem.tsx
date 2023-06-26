/**
 * @params {bulletNo, id, title, description, duration, handleUpldateDescription()}
 */
import style from "./style.module.scss";
import TaskDuration from "../taskDuration/TaskDuration";
function TaskItem() {
  const props = {
    id: 1,
    bulletNo: 2,
    title: "Hello world",
    description: undefined,
    duration: 234,
    handleUpdateDescription: function() {
      console.log("helllo world");
    }
  };

  return (
    <article className={style.task__item}>
      <span className="semiBold small">#{props.bulletNo}</span>
      <div className={`${style.task__details} h3`}>
        <h3 className={style.task__title}>{props.title}</h3>
        <span className="small pointer">Add description</span>
      </div>
      <TaskDuration duration={25} />
    </article>
  );
}
export default TaskItem;
