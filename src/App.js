import { HashRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ToDo from './pages/ToDo';

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/todo" element={<ToDo/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
