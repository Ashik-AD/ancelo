import { ReactNode } from 'react';

import type { HTMLAttributes } from 'react'

import style from './heading.module.scss';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function h2( {children, ...props}: HeadingProps) {
  return (<h2 className={`${style.hd} ${style.xl} ${props.className}`}>{children}</h2>)
}

export default h2;
