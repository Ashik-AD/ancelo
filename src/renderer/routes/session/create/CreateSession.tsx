import { useState, useEffect, useRef } from "react";
import SelectTasks from "renderer/components/task/SelectTasks";
import SessionForm from "./components/SessionForm";
import fetcher from "lib/fetch";
import type { SelectTasksHandle } from "renderer/components/task/SelectTasks";

export default function CreateSession() {
  const [ tasks, setTasks ] = useState();
  const selectRef = useRef<SelectTasksHandle>(null);

  useEffect(() => {
    let fetchTask;
    fetchTask = async () => {
      const res = await fetcher('/tasks');
      if(res.error) {
        console.log(res.error)
        return;
      }
      setTasks(res.tasks)
    };
    fetchTask();

    return () => {
      fetchTask = null;
    };
  }, []);

  return (
    <div>
      <SessionForm />
      <SelectTasks tasks={tasks!!} ref={selectRef}/>
    </div>
  );
}
