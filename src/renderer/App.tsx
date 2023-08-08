import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import AppLayout from "./AppLayout";
import Task from "./routes/task/Task";
import Session from "./routes/session/Session";
import Routine from "./routes/routine/Routine";
export default function App() {
  return (
    <Layout>
      <AppLayout>
        <Routes>
          <Route index element={<Task />} />
          <Route path="/index.html" element={<Task />} /> 
          <Route path="/session/*" element={<Session />} />
          <Route path='/routine/*' element={<Routine />} />
        </Routes>
      </AppLayout>
    </Layout>
  );
}
