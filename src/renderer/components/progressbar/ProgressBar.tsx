/**
 * @Props {duration: number}
 */
import style from "./style.module.scss";
import useProgress from "renderer/hooks/useProgress";
import { addZeroLessThanTen, formatDuration } from "lib/formatDuration";
import { useEffect } from "react";

interface Props {
  duration: number;
  onProgressFinish?: () => void;
  reset?: boolean;
  start: boolean;
}
function ProgressBar(
  { start = false, duration, onProgressFinish, reset }: Props,
) {
  const { hour, second, minute, progress } = useProgress(start);

  useEffect(() => {
    if (progress == duration * 60) {
      onProgressFinish && onProgressFinish();
    }
  }, [progress]);
  const progressBarWidth = (progress * 1000) / (duration * 60 * 1000) *
    100;
  return (
    <div className={style.progress__bar}>
      <div className={style.timer}>
        <span className="small medium">
          {hour > 0 && `${addZeroLessThanTen(hour)}:`}
          {addZeroLessThanTen(minute)}:
          {addZeroLessThanTen(second)}
        </span>
        <span className="small medium">
          {formatDuration(duration)}
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
