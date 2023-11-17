import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import fetcher from 'lib/fetch';
import CreateRoutineTask, {
  RoutineTaskRef,
} from 'renderer/components/routine/CreateRoutineTask';
import RoutineForm, {
  RoutineFormState,
} from 'renderer/components/routine/RoutineForm';
import { useNavigate } from 'react-router-dom';
import RouteNav from 'renderer/components/nav/RouteNav';

export default function CreateRoutine() {
  const router = useNavigate();
  const routineTaskRef = useRef<RoutineTaskRef>(null);
  async function onSubmit(values: RoutineFormState) {
    var routineTasks = routineTaskRef.current?.getRoutineTask() || [];
    var res = await fetcher('/routines', {
      method: 'POST',
      body: JSON.stringify({ ...values, tasks: routineTasks }),
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(`A new routine is created successfully`);
    setTimeout(() => {
      router('/routine');
    }, 2000);
  }
  return (
    <>
      <RouteNav title="Create Routine" />
      <RoutineForm onSubmit={onSubmit}>
        <button className="btn btn__primary">Create Routine</button>
        <CreateRoutineTask ref={routineTaskRef} />
      </RoutineForm>
    </>
  );
}
