import { useParams } from "react-router-dom";
import Banner from "renderer/components/banner/Banner";
import images, { Images } from "renderer/components/images";
import TaskList from "renderer/components/task/TaskList";
import useFetch from "renderer/hooks/useFetch";
import { useAppStore } from "renderer/store";
import Stats from "renderer/components/stats/Stats";
import Start from "renderer/components/start/Start";
import ActionDropdown from "renderer/components/session/ActionDropdown";
import { shallow } from "zustand/shallow";

export default function Detail() {
  const { id } = useParams();
  const { session, started, addList, addListId, addToCurrentTask } =
    useAppStore(
      ({ sessions, tasks }) => ({
        session: sessions((session) =>
          session.lists.find((item) => item.id == id)
        )!!,
        started: tasks((task) => task.start && task.listId == id),
        addListId: tasks.getState().addListId,
        addList: tasks.getState().addList,
        addToCurrentTask: tasks.getState().addCurrent,
      }),
      shallow,
    );
  const { data, isLoading, error } = useFetch(`/sessions/${id}/tasks`);

  let handleStart = () => {
    addList(data?.tasks);
    addToCurrentTask();
    addListId(id!!);
  };

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
        duration={session?.duration!!}
        schedule={session?.schedule!!}
      >
        <ActionDropdown {...session} />
      </Stats>
      <Start onStart={handleStart} started={started} />

      <h4>Tasks</h4>
      {data?.tasks && <TaskList list={data?.tasks} />}
    </div>
  );
}
