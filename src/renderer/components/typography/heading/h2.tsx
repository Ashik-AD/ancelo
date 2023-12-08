import type { HeadingProps } from '../type'
import style from './heading.module.scss';

function h2( {children, ...props}: HeadingProps) {
  return (<h2 className={`${style.hd} ${style.xl} ${props.className}`}>{children}</h2>)
}

export default h2;
