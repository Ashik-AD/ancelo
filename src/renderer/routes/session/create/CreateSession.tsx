import SelectTasks from "renderer/components/task/SelectTasks";
import SessionForm from "./components/SessionForm";
import { useState, useEffect } from "react";
import fetcher from "lib/fetch";

export default function CreateSession() {
  const [ tasks, setTasks ] = useState();

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
      <SelectTasks tasks={tasks!!}/>
    </div>
  );
}
