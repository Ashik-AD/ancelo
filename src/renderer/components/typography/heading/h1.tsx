import style from './heading.module.scss';
import type { HeadingProps } from '../type'

function h1( {children, ...props}: HeadingProps) {
  return (<h1 className={`${style.hd} ${style.xxl} ${props.className}`}>{children}</h1>)
}
export default h1;
