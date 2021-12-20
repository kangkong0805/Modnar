import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Login from './Login';

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isJoin, setJoin] = useState(false);

  return (
    <>
      <font>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Ruda&display=swap" rel="stylesheet" />
      </font>

      <header>
        <div>
          {/* <Link to="/"><img src="" alt="Logo"></img></Link> */}
          <h1>Logo</h1>
        </div>
        <nav>
          <ul>
            <li tapindex="0"><h3>로그인</h3></li>
            <li><h3>프로필</h3></li>
            <li><h3>찜</h3></li>
            {isLogin && <Login onClose={() => setLogin(false)} />}
          </ul>
        </nav>

      </header>
    </>
  );
};

export default Header;