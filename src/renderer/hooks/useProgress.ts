import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../store";
import { playAlert } from "renderer/components/play-alert/PlayAlert";

export type UseProgressProps = {
  start: boolean;
};
interface Cb {
  hour: number;
  minute: number;
  second: number;
  progress: number;
}

class Counter {
  private static instance: Counter;
  private progress: number = 0;
  private hour: number = 0;
  private minute: number = 0;
  private second: number = 0;
  private timer: any;
  private cb: any;
  private constructor() {}

  public static getInstance() {
    if (!Counter.instance) {
      Counter.instance = new Counter();
    }
    return Counter.instance;
  }

  public getValues() {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      progress: this.progress,
    };
  }

  public incrementEachSecond(cb: (value: Cb) => void) {
    this.cb = cb;

    const calcTime = () => {
      if (this.second >= 59) {
        this.second = 0;
        this.minute += 1;
      } else {
        this.second++;
      }

      if (this.minute > 59) {
        this.minute = 0;
        this.hour += 1;
      }
      this.progress++;

      this.cb({
        hour: this.hour,
        second: this.second,
        minute: this.minute,
        progress: this.progress,
      });
    };

    if (!this.timer) {
      this.timer = setInterval(calcTime, 1000);
    }
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public reset() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.progress = 0;
  }
}

export default function useProgress(start: boolean) {
  const { current, isStart, setNextTask } = useAppStore(
    ({ tasks }) =>
      tasks((state) => ({
        current: state.current,
        isStart: state.start,
        setNextTask: state.addNext,
      })),
  );

  const intervalTime = useAppStore(({ settings }) =>
    settings(({ interval }) => interval)
  );

  const counter = useMemo(() => Counter.getInstance(), [current?.id]);
  const time = useMemo(() => counter.getValues(), [current?.id]);

  const [second, setSecond] = useState(time.second);
  const [minute, setMinute] = useState(time.minute);
  const [hour, setHour] = useState(time.hour);
  const [progress, setProgress] = useState(time.progress);

  const onIncrementCount = ({ hour, second, minute, progress }: Cb) => {
    setSecond(second);
    setMinute(minute);
    setHour(hour);
    setProgress(progress);
  };

  useEffect(() => {
    if (start || isStart) {
      counter.incrementEachSecond(onIncrementCount);
    }
    return () => {
      counter.incrementEachSecond(() => {});
    };
  }, [current?.id, start, isStart]);

  useEffect(() => {
    if (minute == current?.duration) {
      playAlert.play();
      counter.stop();
      counter.reset();
      setMinute(0);
      setTimeout(() => {
        playAlert.play();
        setNextTask();
        counter.incrementEachSecond(onIncrementCount)
      }, intervalTime);
    }
  }, [minute, current?.id, intervalTime]);

  return {
    second,
    hour,
    minute,
    progress,
  } as const;
}
