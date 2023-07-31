import { ReactNode } from "react";

import style from './style.module.scss';

export interface BannerProps {
  image: string;
  children: ReactNode;
}

export default function Banner({ image, children }: BannerProps) {
  return (
    <div className={style.banner} style={{backgroundImage: `url(${image})`}}>
      {children}
    </div>
  );
}
