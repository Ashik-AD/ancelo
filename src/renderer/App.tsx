import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import AppLayout from "./AppLayout";
import Task from "./routes/task/Task";
export default function App() {
  return (
    <Layout>
      <AppLayout>
        <Routes>
          <Route index element={<Task />} />
        </Routes>
      </AppLayout>
    </Layout>
  );
}
