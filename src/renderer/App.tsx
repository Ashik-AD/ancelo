import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layout';
import AppLayout from './AppLayout';
import Task from './routes/task/Task';
import Session from './routes/session/Session';
import Routine from './routes/routine/Routine';
import Dashboard from './routes/dashboard/dashboard';
export default function App() {
  return (
    <Layout>
      <AppLayout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/index.html" element={<Dashboard />} />
          <Route path="/task/*" element={<Task />} />
          <Route path="/session/*" element={<Session />} />
          <Route path="/routine/*" element={<Routine />} />
        </Routes>
      </AppLayout>
    </Layout>
  );
}
