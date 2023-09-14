import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ToDo from './pages/ToDo';
import './App.css';

function App() {
  const Main = () => {
    return (
      <div className="main-container">
        <div className="content-container">
          <ul>
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/signin">로그인</Link></li>
            <li><Link to="/todo">ToDo</Link></li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/todo" element={<ToDo/>} />
      </Routes>
        
    </BrowserRouter>
  );
}

export default App;
