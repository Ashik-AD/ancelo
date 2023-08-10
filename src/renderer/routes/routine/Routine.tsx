import { Route, Routes } from "react-router-dom";
import CreateRoutine from "./create/CreateRoutine";
import RoutineList from "./default/RoutineList";

export default function Routine() {
  return (
    <Routes>
      <Route index element={<RoutineList />} />
      <Route path="/create" element={<CreateRoutine />} />
    </Routes>
  );
}
