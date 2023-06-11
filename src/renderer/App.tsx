import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import icon from "../../assets/icon.svg";
import "./App.css";
import { useEffect } from "react";
import Navigation from "./components/nav/Navigation";
import Layout from "./Layout";

export default function App() {
  return (
    <Layout>
    <main className={`App`}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} />
        </Routes>
      </Router>
      </main>
    </Layout>
  );
}



