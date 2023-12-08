import { HTMLAttributes } from "react";
import type { TextSize } from "../type";

import style from './paragraph.module.scss'

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: string | number;
  size?: TextSize;
}
export default function Pg({className, size = 'm', children, ...rest}: ParagraphProps) {

  return(
  <p className={`${style.pg} ${style[size]} ${className ? className : '' }`} {...rest}>{children}</p>
  )
}
