
import { ReactNode } from 'react';

import type { HTMLAttributes } from 'react'

import style from './heading.module.scss';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function h4( {children, ...props}: HeadingProps) {
  return (<h4 className={`${style.hd} ${style.m} ${props.className}`}>{children}</h4>)
}

export default h4;
