
import type { TitleProps } from '../type'
import style from './title.module.scss'

function title({children, className, size = 'l', ...props} : TitleProps) {
  return(<span className={`${style.title} ${style[size]} ${className ? className: ''}`} {...props}> {children}</span>)
}
export default title;
