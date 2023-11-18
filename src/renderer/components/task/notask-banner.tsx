import style from './style.module.scss';
import image from '../images/index';
import AddTask from './AddTask';
function TaskBanner() {
  return (
    <article className={style.task__banner}>
      <div className={style.banner__message}>
        <h2 className="bold">Hello there!</h2>
        <p className="bold">
          No task is running. Start new task{' '}
          <AddTask>
            <span className={style.add} role="button">
              click here!
            </span>{' '}
          </AddTask>
        </p>
      </div>
      <img
        src={image.girl}
        className={style.banner__img}
        alt="girl taking note"
      />
      <img
        src={image.anima}
        className={style.banner__img_anima}
        alt="girl taking note"
      />
    </article>
  );
}
export default TaskBanner;
