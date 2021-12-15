import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Login from './Login';

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isJoin, setJoin] = useState(false);

  return (
    <header>
      <div>
        <Link to="/"><img src="" alt="logo"></img></Link>
      </div>
      <nav>
        <ul>
          <li>상품</li>
          <li>판매</li>
          <li onClick={() => setLogin(true)}>로그인</li>
          <Link to="join"><li>회원가입</li></Link>
          {isLogin && <Login onClose={() => setLogin(false)} />}
        </ul>
      </nav>

    </header>
  );
};

export default Header;