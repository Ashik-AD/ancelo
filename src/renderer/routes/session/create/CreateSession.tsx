import fetcher from "lib/fetch";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import SessionForm, { SessionFormState } from "renderer/components/session/SessionForm";
import SelectTasks from "renderer/components/task/SelectTasks";
import type { SelectTasksHandle } from "renderer/components/task/SelectTasks";
import useFetch from "renderer/hooks/useFetch";

export default function CreateSession() {
  const selectRef = useRef<SelectTasksHandle>(null);
  const {data, isLoading, error} = useFetch('/tasks')

  const handleCreateSession = async (session: SessionFormState ) => {
    const selectedTasks = selectRef.current?.selected()
   
    const res = await fetcher('/sessions', {
      method: 'POST',
      body: JSON.stringify({
        ...session,
        tasks: selectedTasks
      })
    })

    if(res.error){
      toast.error(res.error)
      console.log(res.error)
      return;
    }

    toast.success(`${res.session.title} session created successfully`)
  }

  return (
    <div>
      <SessionForm onCreate={handleCreateSession} />
      <SelectTasks tasks={data?.tasks!!} ref={selectRef}/>
    </div>
  );
}
