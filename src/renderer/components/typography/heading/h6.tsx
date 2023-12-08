import style from './heading.module.scss';
import type { HeadingProps } from '../type'

function h6( {children, ...props}: HeadingProps) {
  return (<h6 className={`${style.hd} ${style.xs} ${props.className}`}>{children}</h6>)
}

export default h6;
