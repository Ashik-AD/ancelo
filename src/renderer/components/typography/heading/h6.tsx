import { ReactNode } from 'react';

import type { HTMLAttributes } from 'react'

import style from './heading.module.scss';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

function h6( {children, ...props}: HeadingProps) {
  return (<h6 className={`${style.hd} ${style.xs} ${props.className}`}>{children}</h6>)
}

export default h6;
