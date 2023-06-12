import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import AppLayout from "./AppLayout";

export default function App() {
  return (
    <Layout>
      <AppLayout>
          <Routes>
            <Route path="/" element={<h1>Hello world</h1>} />
          </Routes>
      </AppLayout>
    </Layout>
  );
}
