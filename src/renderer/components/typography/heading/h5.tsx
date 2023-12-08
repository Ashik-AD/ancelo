import style from './heading.module.scss';
import type { HeadingProps } from '../type'

function h5( {children, ...props}: HeadingProps) {
  return (<h5 className={`${style.hd} ${style.s} ${props.className}`}>{children}</h5>)
}

export default h5;
