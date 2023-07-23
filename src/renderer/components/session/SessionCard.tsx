import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sessions } from "lib/api";
import CustomCursor from "./CardCursor";
import type { CustomCursorRef } from "./CardCursor";
import style from "./style.module.scss";

export default function SessionCard(
  {
    title,
    description,
    duration,
    schedule,
    thumbnail,
    itemsCount,
    id,
  }: Sessions,
) {
  const cursorRef = useRef<CustomCursorRef>(null);
  const boundedRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let element = boundedRef.current;
    element?.addEventListener(
      "mousemove",
      cursorRef.current?.moveCursor,
      false,
    );
    return () => {
      element?.removeEventListener("mousemove", cursorRef.current?.moveCursor);
    };
  }, []);
  return (
    <Link to={id} relative="path">
      <article
        className={style.session__card}
        style={{ backgroundImage: `url(${thumbnail})` }}
        ref={boundedRef}
      >
        <div className={style.thumbnail__wrapper}>
          <img
            src={thumbnail}
            className={style.thumbnail}
            alt={`thumbnail of ${title} session`}
          />
        </div>
        <div className={style.card__content}>
          <div className={style.card__content__header}>
            <h4>{title}</h4>
            <p className={`text-small`}>{description || "no description"}</p>
          </div>
          <div className={style.card__stat}>
            <span>{itemsCount} task{itemsCount > 1 && ""}</span>
            {duration && <span>{duration}</span>}
            <span>{schedule || "No Schedule"}</span>
          </div>
        </div>
        <CustomCursor ref={cursorRef} />
      </article>
    </Link>
  );
}
