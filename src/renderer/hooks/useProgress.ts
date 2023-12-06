import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../store';
import { playAlert } from 'renderer/components/play-alert/PlayAlert';
import progressCounter, { ProgressCountCb } from '../../lib/progress_counter';
import { shallow } from 'zustand/shallow';

export type UseProgressProps = {
  start: boolean;
};

export default function useProgress(start: boolean) {
  const { current, isStart, setNextTask, allTaskCompleted, setCompleted } =
    useAppStore(
      ({ tasks }) =>
        tasks((state) => ({
          current: state.current,
          isStart: state.start,
          setNextTask: state.addNext,
          allTaskCompleted: state.list?.length == 0,
          setCompleted: state.addCompleted,
        })),
      shallow
    );

  const intervalTime = useAppStore(({ settings }) =>
    settings(({ interval }) => interval)
  );

  const counter = useMemo(() => progressCounter, [current?.id]);
  const time = useMemo(() => counter.getProgress(), [current?.id]);

  const [second, setSecond] = useState(time.second);
  const [minute, setMinute] = useState(time.minute);
  const [hour, setHour] = useState(time.hour);
  const [progress, setProgress] = useState(time.progress);

  const onIncrementCount = ({
    hour,
    second,
    minute,
    progress,
  }: ProgressCountCb) => {
    setSecond(second);
    setMinute(minute);
    setHour(hour);
    setProgress(progress);
  };

  useEffect(() => {
    if (allTaskCompleted) {
      counter.stop();
      counter.reset();
    }
  }, [allTaskCompleted]);

  useEffect(() => {
    if (start || isStart) {
      counter.startProgress(onIncrementCount);
    }
    return () => {
      counter.startProgress(() => {});
    };
  }, [current?.id, start, isStart]);

  useEffect(() => {
    if (minute == current?.duration) {
      playAlert.play();
      counter.stop();
      counter.reset();
      setMinute(0);
      fetch(`http://localhost:6699/tasks/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(current),
      })
        .then(() => setCompleted(current))
        .catch(console.log);

      if (!allTaskCompleted) {
        setTimeout(() => {
          playAlert.play();
          setNextTask();
          counter.startProgress(onIncrementCount);
        }, intervalTime);
      } else {
        setNextTask();
      }
    }
  }, [minute, current?.id, intervalTime]);

  return {
    second,
    hour,
    minute,
    progress,
  } as const;
}
