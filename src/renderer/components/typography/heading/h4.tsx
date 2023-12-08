import type { HeadingProps } from '../type'
import style from './heading.module.scss';

function h4( {children, ...props}: HeadingProps) {
  return (<h4 className={`${style.hd} ${style.m} ${props.className}`}>{children}</h4>)
}

export default h4;
