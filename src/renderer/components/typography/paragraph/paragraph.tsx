import style from './paragraph.module.scss'
import type { ParagraphProps } from '../type'

export default function Pg({className, size = 'm', children, ...rest}: ParagraphProps) {

  return(
  <p className={`${style.pg} ${style[size]} ${className ? className : '' }`} {...rest}>{children}</p>
  )
}
