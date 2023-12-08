import style from "./label.module.scss";
import type { LabelProps } from "../type";

export default function label(
  { className, size = "m", children, ...rest }: LabelProps,
) {
  return (
    <span
      className={`${style.label} ${style[size]} ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </span>
  );
}
