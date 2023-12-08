
import { ReactNode } from 'react';

import type { HTMLAttributes } from 'react'

import style from './heading.module.scss';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function h3( {children, ...props}: HeadingProps) {
  return (<h3 className={`${style.hd} ${style.l} ${props.className}`}>{children}</h3>)
}

export default h3;
