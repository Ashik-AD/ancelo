/**
 * @Props {duration: number}
 */
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import style from "./style.module.scss";
import useProgress from "renderer/hooks/useProgress";

interface Props {
  duration: number;
  onProgressFinish: () => void;
  reset?: boolean;
}
function ProgressBar({ duration, onProgressFinish, reset }: Props) {
  const {hour, second, minute, progress, stopTimer, resetTimer}= useProgress()
  if(progress == duration * 60){
    stopTimer()
  }
  const progressBarWidth = (progress * 1000) / (duration * 60 * 1000) *
    100;
  return (
    <div className={style.progress__bar}>
      <div className={style.timer}>
        <span className="small medium">
          {hour > 0 && `${formatNumber(hour)}:`}
          {formatNumber(minute)}:{formatNumber(second)}
        </span>
      </div>
      <div className={style.bar}>
        <div
          className={style.bar__inner}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
    </div>
  )
}
export default ProgressBar;

function formatNumber(num: number) {
  return num < 10 ? `0${num}` : num;
}
