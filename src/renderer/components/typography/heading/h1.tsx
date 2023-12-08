
import { ReactNode } from 'react';

import type { HTMLAttributes } from 'react'

import style from './heading.module.scss';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function h1( {children, ...props}: HeadingProps) {
  return (<h1 className={`${style.hd} ${style.xxl} ${props.className}`}>{children}</h1>)
}
export default h1;
