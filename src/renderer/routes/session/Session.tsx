import {Routes, Route} from 'react-router-dom'
import CreateSession from './create/CreateSession';

export default function Session() {
  return (
    <section>
      <h1>Session</h1>
      <Routes>
        <Route index element={<CreateSession />} />
      </Routes>
    </section>
  );
}


