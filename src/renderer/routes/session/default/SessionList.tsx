import { Link } from "react-router-dom";
import SessionCard from "renderer/components/session/SessionCard";
import { useAppStore } from "renderer/store";
import { shallow } from "zustand/shallow";
import style from "./style.module.scss";
import morning from "../../../../images/thumbnail_morning.png";
import afternoon from "../../../../images/thumbnail_afternoon.png";
import evening from "../../../../images/thumbnail_evening.png";
import night from "../../../../images/thumbnail_night.png";

type Thumbnails = {
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
};
const thumbnails: Thumbnails = {
  morning,
  afternoon,
  evening,
  night,
};

export default function SessionList() {
  const sessions = useAppStore(
    (state) => state.sessions((state) => state.lists),
    shallow,
  );
  const renderList = sessions.map((session) => (
    <SessionCard
      key={session.id}
      {...session}
      thumbnail={thumbnails[session.thumbnail as keyof Thumbnails]}
    />
  ));
  return (
    <div className={style.session__list__wrapper}>
      {renderList}
      <Link to="create/" relative="path">
        Create New Session
      </Link>
    </div>
  );
}
