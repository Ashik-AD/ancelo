import { Icon } from '@iconify/react';
import { CSSProperties, ReactNode, useState } from 'react';
import style from './Style.module.scss';
export type RouteNavProps = {
  title: string;
  children?: ReactNode;
  css?: CSSProperties;
};

function RouteNav({ title, children, css }: RouteNavProps) {
  let history = window.history;
  function handleBackBtnClick() {
    history.back();
  }
  window.addEventListener('popstate', (eve) => {
    console.log(eve);
  });
  return (
    <article className={style.route__nav} style={css}>
      <div className={style.title_btn}>
        <button onClick={handleBackBtnClick} className={style.btn_back}>
          <Icon icon="mingcute:left-line" />
        </button>
        <h4>{title}</h4>
      </div>
      {children}
    </article>
  );
}
export default RouteNav;
