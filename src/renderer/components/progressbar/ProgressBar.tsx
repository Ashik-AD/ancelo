/**
 * @Props {duration: number}
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import style from "./style.module.scss";

interface Props {
  duration: number;
  onProgressFinish: () => void;
  reset?: boolean;
}
function ProgressBar({ duration, onProgressFinish, reset }: Props) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [progress, setProgress] = useState(0);
  const count = useRef(0);

  const hasHour = useMemo(() => duration / 60 >= 1, [duration]);
  const remainingHour = hasHour
    ? useMemo(() => formatNumber(Math.floor((duration / 60) - hour)), [
      hour,
      duration,
    ])
    : null;
  const remainingMinute = useMemo(() =>
    duration != progress
      ? formatNumber(
        Math.floor((duration % 60) - minute - 1),
      )
      : "00", [minute, duration]);
  const remainingSecond = duration != progress
    ? formatNumber(59 - second)
    : "00";

  const calcProgress = useCallback(function calculateProgress() {
    if (second >= 59) {
      setSecond(0);
      setMinute((prevMinute) => prevMinute + 1);
      setProgress((prevProgress) => prevProgress + 1);
    } else {
      setSecond((prevSecond) => prevSecond + 1);
    }

    if (minute > 59) {
      setMinute(0);
      setHour((prevHour) => prevHour + 1);
    }
    count.current += 1;
  }, [second]);

  useEffect(() => {
    let timer = setInterval(calcProgress, 1000);
    if (progress == duration) {
      if (onProgressFinish) onProgressFinish();
      if (reset) {
        setHour(0);
        setMinute(0);
        setSecond(0);
        setProgress(0);
        count.current = 0;
      }
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [duration, second, progress, reset]);
  const progressBarWidth = (count.current * 1000) / (duration * 60 * 1000) *
    100;
  return (
    <div className={style.progress__bar}>
      <div className={style.timer}>
        <span className="small medium">
          {hour > 0 && formatNumber(hour)}
          {formatNumber(minute)}:{formatNumber(second)}
        </span>
        <span className="small medium">
          {hasHour && remainingHour}
          {hasHour && ":"}
          {remainingMinute}:{remainingSecond}
        </span>
      </div>
      <div className={style.bar}>
        <div
          className={style.bar__inner}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
    </div>
  );
}
export default ProgressBar;

function formatNumber(num: number) {
  return num < 10 ? `0${num}` : num;
}
