import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import AppLayout from "./AppLayout";
import Task from "./routes/Task";

export default function App() {
  return (
    <Layout>
      <AppLayout>
          <Routes>
            <Route path="/" element={<Task />} />
          </Routes>
      </AppLayout>
    </Layout>
  );
}
