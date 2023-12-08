

import { ReactNode } from 'react';

import type { HTMLAttributes } from 'react'

import style from './heading.module.scss';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function h5( {children, ...props}: HeadingProps) {
  return (<h5 className={`${style.hd} ${style.s} ${props.className}`}>{children}</h5>)
}

export default h5;
