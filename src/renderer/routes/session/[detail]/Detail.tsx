import { useParams } from "react-router-dom";
import Banner from "renderer/components/banner/Banner";
import images, { Images } from "renderer/components/images";
import TaskList from "renderer/components/task/TaskList";
import useFetch from "renderer/hooks/useFetch";
import { useAppStore } from "renderer/store";
import { shallow } from "zustand/shallow";
import Stats from "renderer/components/stats/Stats";
import Start from "renderer/components/start/Start";

export default function Detail() {
  const { id } = useParams();
  const session = useAppStore(
    ({ sessions }) =>
      sessions((session) => session.lists.find((item) => item.id == id)),
    shallow,
  );
  const { data, isLoading, error } = useFetch(`/sessions/${id}/tasks`);

  return (
    <div className={`content__full`}>
      <Banner image={images[session?.thumbnail as keyof Images]}>
        <div>
          <h1>{session?.title}</h1>
          <p>{session?.description}</p>
        </div>
      </Banner>
      <Stats
        totalTask={session?.itemsCount!!}
        duration={session?.duration?.toString()!!}
        schedule={session?.schedule!!}
      />
      <Start />

      <h4>Tasks</h4>
      {data?.tasks && <TaskList list={data?.tasks} />}
    </div>
  );
}
