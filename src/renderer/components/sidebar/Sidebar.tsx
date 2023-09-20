import { ReactNode } from "react";
import style from './style.module.scss';

export default function Sidebar({ children } : { children: ReactNode } ) {

  return(
  <article className={style.sidebar}>{children}</article>
  )
}
