import { useAppStore } from "renderer/store";
import style from "./style.module.scss";
import TaskDuration from "./TaskDuration";
import { Tasks } from "@prisma/client";
import Modal from "../modal/Modal";
import { useState } from "react";
import { useModal } from "renderer/hooks/useModal";

export default function MiniTask() {
  const { currentTask, queue } = useAppStore(({ tasks }) =>
    tasks((task) => ({
      currentTask: task.current,
      queue: task.list.slice(0, 1),
    }))
  );
  return (
    <article
      className={style.mini__task}
      tabIndex={0}
      aria-label="Mini task player for showing current running task and next task"
    >
      <MiniView
        {...currentTask}
      />
      <Queue list={queue} />
    </article>
  );
}

function MiniView({ title, description }: Partial<Tasks>) {
  return (
    <article className={style.current__running__task}>
      <img
        src="http://localhost:6699/static/images/task.jpg"
        alt="current active task banner"
        className={style.banner}
      />
      <h4 className={style.title}>{title}</h4>
      <p className={`text-small medium color`}>{description}</p>
    </article>
  );
}

function Queue({ list }: { list: Tasks[] }) {
  var isQueueEmpty = !list || list?.length == 0;

  var renderQueue = list?.map((item) => <QueueItem {...item} />);
  return (
    <article className={style.queue__task}>
      <p className={`text-small bold ${style.divider__title}`}>
        Next in queue
      </p>
      {isQueueEmpty ? "Please add task" : renderQueue}
    </article>
  );
}

function QueueItem({ title, duration, ...rest }: Tasks) {
  var {showModal, onToggle} = useModal()
  return (
    <>
      <article className={`${style.task}`} onClick={onToggle}>
        <span className={`${style.task__thumbnail}`}>🍀</span>
        <div className={`${style.body}`}>
          <h5 className={style.title}>{title}</h5>
          <TaskDuration duration={duration} />
        </div>
      </article>

      {
        showModal && 
      <Modal onClose={onToggle}>
        <h1>Hello mom</h1>
      </Modal>
      }
    </>
  );
}
