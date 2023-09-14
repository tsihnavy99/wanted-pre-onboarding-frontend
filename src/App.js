import { Link } from 'react-router-dom'

import './App.css';

function App() {
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

export default App;
