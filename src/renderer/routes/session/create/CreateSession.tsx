import fetcher from 'lib/fetch';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import RouteNav from 'renderer/components/nav/RouteNav';
import SessionForm, {
  SessionFormState,
} from 'renderer/components/session/SessionForm';
import SelectTasks from 'renderer/components/task/SelectTasks';
import type { SelectTasksHandle } from 'renderer/components/task/SelectTasks';
import useFetch from 'renderer/hooks/useFetch';
import { useAppStore } from 'renderer/store';
import { shallow } from 'zustand/shallow';

export default function CreateSession() {
  const addSession = useAppStore(
    ({ sessions }) => sessions.getState().addSessions,
    shallow
  );
  const selectRef = useRef<SelectTasksHandle>(null);
  const { data, isLoading, error } = useFetch('/tasks');

  const router = useNavigate();

  const handleCreateSession = async (session: SessionFormState) => {
    const selectedTasks = selectRef.current?.selected();

    const res = await fetcher('/sessions', {
      method: 'POST',
      body: JSON.stringify({
        ...session,
        tasks: selectedTasks,
      }),
    });

    if (res.error) {
      toast.error(res.error);
      console.log(res.error);
      return;
    }

    addSession(res.session);
    toast.success(`${res.session.title} session created successfully`);
    router('../', { relative: 'path' });
  };

  return (
    <div>
      <RouteNav title="Create new session" css={{ marginBottom: 16 }} />
      <SessionForm onCreate={handleCreateSession} />
      <SelectTasks tasks={data?.tasks!!} ref={selectRef} />
    </div>
  );
}
