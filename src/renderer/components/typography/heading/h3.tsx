
import type { HeadingProps } from '../type'
import style from './heading.module.scss';

function h3( {children, ...props}: HeadingProps) {
  return (<h3 className={`${style.hd} ${style.l} ${props.className}`}>{children}</h3>)
}

export default h3;
