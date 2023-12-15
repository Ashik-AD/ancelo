import { ReactNode } from "react";
import type { HTMLAttributes } from "react";
export type TextSize = "xs" | "s" | "m" | "l";
export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Base<T> extends HTMLAttributes<T> {
  children: ReactNode;
  size?: TextSize;
}
export type FormLabel = Base<HTMLLabelElement> & {
  htmlFor?: string;
};

export type ParagraphProps = Base<HTMLParagraphElement>;
export type LabelProps<T> = Base<T>;

export type HeadingProps = Omit<Base<HTMLHeadingElement>, 'size'>;

export type TitleProps = Base<HTMLSpanElement>;
