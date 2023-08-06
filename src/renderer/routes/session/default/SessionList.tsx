import { Link } from "react-router-dom";
import SessionCard from "renderer/components/session/SessionCard";
import { useAppStore } from "renderer/store";
import { shallow } from "zustand/shallow";
import style from "./style.module.scss";
import images, { Images } from "renderer/components/images";

export default function SessionList() {
  const sessions = useAppStore(
    (state) => state.sessions((state) => state.lists),
    shallow,
  );
  const renderList = sessions.map((session) => (
    <SessionCard
      key={session.id}
      {...session}
      thumbnail={images[session.thumbnail as keyof Images]}
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
