import { useCallback, useEffect, useRef, useState } from "react";

const useProgress = (duration: number, onFinish: () => void) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [progress, setProgress] = useState(0);
  const count = useRef(0);

  // const hasHour = useMemo(() => duration / 60 >= 1, [duration]);
  // const remainingHour = hasHour
  //   ? useMemo(() => formatNumber(Math.floor((duration / 60) - hour)), [
  //     hour,
  //     duration,
  //   ])
  //   : null;
  // const remainingMinute = useMemo(() =>
  //   duration != progress
  //     ? formatNumber(
  //       Math.floor((duration % 60) - minute - 1),
  //     )
  //     : "00", [minute, duration]);
  // const remainingSecond = duration != progress
  //   ? formatNumber(59 - second)
  //   : "00";

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
      if (onFinish) onFinish();
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [duration, second, progress]);
  const progressBarWidth = (count.current * 1000) / (duration * 60 * 1000) *
    100;
  return { hour, minute, second, progress: progressBarWidth } as const;
};
export default useProgress;
