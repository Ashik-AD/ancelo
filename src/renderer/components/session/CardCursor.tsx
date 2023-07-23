import { forwardRef, useImperativeHandle, useState } from "react";
import style from "./style.module.scss";

export type CustomCursorRef = {
  moveCursor: (event: MouseEvent) => void;
};
const CustomCursor = forwardRef<
  CustomCursorRef,
  unknown
>((prop, ref) => {
  const [coordinate, setCoordinat] = useState({
    x: 0,
    y: 0,
  });

  useImperativeHandle(ref, () => {
    return {
      moveCursor: function (evt: MouseEvent) {
        setCoordinat({
          x: evt.offsetX,
          y: evt.offsetY,
        });
      },
    };
  }, []);
  console.log(coordinate);
  return (
    <div
      className={style.custome__cursor}
      style={{ top: `${coordinate.y}px`, left: `${coordinate.x}px` }}
    >
    </div>
  );
});
export default CustomCursor;
