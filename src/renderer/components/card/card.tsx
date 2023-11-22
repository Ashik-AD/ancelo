import { CSSProperties, ReactNode } from 'react';
import style from './style.module.scss';
export type CardProps = {
  children: ReactNode;
  className?: string;
  css?: CSSProperties;
};

export default function Card({ children, className, css }: CardProps) {
  return (
    <div
      className={`${style.card} ${className ? className : ''}`}
      style={css}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
