import { Route, Routes } from "react-router-dom";
import CreateRoutine from "./create/CreateRoutine";

export default function Routine(){
  return(
  <Routes>
      <Route index element={<CreateRoutine />} />
    </Routes>
  )
}
