import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useTaskStore } from "./store";
import { shallow } from "zustand/shallow";

interface Cb {
  hour: number;
  minute: number;
  second: number;
  progress: number;
}
export const ProgressContext = createContext<Cb | null>(null);

class Counter {
  private static instance: Counter;
  private progress: number = 0;
  private hour: number = 0;
  private minute: number = 0;
  private second: number = 0;
  private timer: any;
  private cb: any;
  private constructor() { }

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

  public reset() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.progress = 0;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
export default function ProgressProvider(
  { children }: { children: ReactNode },
) {
  const current = useTaskStore((state) => state.current, shallow);
  const counter = useMemo(() => Counter.getInstance(), []);
  const time = useMemo(() => counter.getValues(), [current]);

  const [second, setSecond] = useState(() => time.second);
  const [minute, setMinute] = useState(() => time.minute);
  const [hour, setHour] = useState(() => time.hour);
  const [progress, setProgress] = useState(() => time.progress);

  useEffect(() => {
    let onIncrementCount = null;
    onIncrementCount = ({ hour, second, minute, progress }: Cb) => {
      setSecond(second);
      setMinute(minute);
      setHour(hour);
      setProgress(progress);
      console.log("calling...");
    };
    counter.incrementEachSecond(onIncrementCount);
    return () => {
      onIncrementCount = null;
      counter.incrementEachSecond(() => { });
      console.log("unmounting...");
    };
  }, []);
  return (
    <ProgressContext.Provider value={{ second, hour, minute, progress }}>
      {children}
    </ProgressContext.Provider>
  );
}
