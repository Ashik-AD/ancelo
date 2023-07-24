import { useCallback, useState } from "react";
import style from "./style.module.scss";

const CustomCursor = () => {
  const [coordinate, setCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const updateCoordinate = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const {offsetY, offsetX} = e.nativeEvent
    setCoordinate({
      x: offsetX - 30,
      y: offsetY - 30
    })
  }, []);
  return (
    <>
      <div
        className={style.custome__cursor}
        style={{ top: `${coordinate.y}px`, left: `${coordinate.x}px` }}
      >
      </div>
      <div className={style.cursor__overlay} onMouseMove={updateCoordinate}></div>
    </>
  );
};
export default CustomCursor;
