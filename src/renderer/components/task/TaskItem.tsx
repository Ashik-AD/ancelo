/**
 * @params {bulletNo, id, title, description, duration, handleUpldateDescription()}
 */
import {Icon} from '@iconify/react'
import style from './style.module.scss'
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
        <span className="small">Add description</span>
      </div>
      <div>
        <Icon icon='mdi:clock-outline' />
        {props.duration}min
      </div>
    </article>
  );
}
export default TaskItem
