import { Route, Routes } from "react-router-dom";
import CreateSession from "./create/CreateSession";
import SessionList from "./default/SessionList";

export default function Session() {
  return (
    <Routes>
      <Route index element={<SessionList />} />
      <Route path="/create" element={<CreateSession />} />
      <Route path="/detail/:id" element={<h1>Hello </h1>} />
    </Routes>
  );
}
