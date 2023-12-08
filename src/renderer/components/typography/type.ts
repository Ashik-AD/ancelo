import { ReactNode } from 'react';
import type { HTMLAttributes } from 'react'
export type TextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4'| 'h5' | 'h6';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: string | number;
  size?: TextSize;
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface TitleProps extends HTMLAttributes<HTMLSpanElement> {
  size?: Exclude<TextSize, 'xl' | 'xxl'>;
  children: ReactNode;
}

