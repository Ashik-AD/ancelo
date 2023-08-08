import { ChangeEvent, useEffect, useState, useTransition } from "react";
import style from "./style.module.scss";
interface Props {
  onPick: (color: string) => void;
  color?: string;
  label?: string;
}
export default function ColorPicker({ onPick, color, label }: Props) {
  const [pickColor, setPickColor] = useState(color || "#ffffff");
  const [_, startTransition] = useTransition();

  const handlePick = (evt: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setPickColor(evt.target.value);
    });
  };

  useEffect(() => {
    onPick && onPick(pickColor);
  }, [pickColor]);

  return (
    <div className={style.color__picker}>
      <label htmlFor="pick color for your routine theme">
        {label &&
          <span className={style.input__label}>{label}</span>}
        <span
          className={style.color__preview}
          style={{ background: pickColor }}
        >
        </span>
        <input
          type="color"
          aria-hidden="true"
          className={style.hidden}
          value={pickColor}
          onChange={handlePick}
        />
      </label>
    </div>
  );
}
