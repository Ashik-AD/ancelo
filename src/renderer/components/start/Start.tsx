import { ReactNode, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";

import style from "./style.module.scss";
import { useAppStore } from "renderer/store";
import { shallow } from "zustand/shallow";
import useProgress from "renderer/hooks/useProgress";

interface Props {
  onStart: () => void;
  children?: ReactNode;
  started?: boolean;
}

export default function Start({ children, started = false, onStart }: Props) {
  const { startTask, isStarted, currentTask, loadNextTask } = useAppStore(
    ({ tasks }) =>
      tasks((task) => ({
        startTask: task.addStart,
        isStarted: task.start,
        currentTask: task.current,
        loadNextTask: task.addNext,
      }), shallow),
    shallow,
  );

  const start = started || isStarted;
  // running this hook let's me count progress globally and can sync progress automaticaly
  // component that uses progressbar component even they're unmounted and sync when mounting
  const { progress, resetTimer } = useProgress(start);
  let duration = currentTask?.duration!! * 60;

  useEffect(() => {
  
  if (progress == duration) {
    loadNextTask();
    resetTimer()
  }
  }, [progress, currentTask?.duration])

  let handleStart = useCallback(() => {
    onStart && onStart();
    startTask();
  }, [onStart, startTask]);
  return (
    <button
      className={style.start__btn}
      onClick={!started ? handleStart : undefined}
    >
      {children
        ? children
        : start
        ? <Icon icon="solar:pause-bold-duotone" />
        : <Icon icon="solar:play-bold" />}
    </button>
  );
}
