import {Routes, Route} from 'react-router-dom'
import CreateSession from './create/CreateSession';
import SessionList from './default/SessionList';

export default function Session() {
  return (
    <section>
      <Routes>
        <Route index element={<SessionList />} />
        <Route path='/create-new' element={<CreateSession />} />
      </Routes>
    </section>
  );
}


