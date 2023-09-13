import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ToDo from './pages/ToDo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/todo" element={<ToDo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
