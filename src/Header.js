import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src="" alt="logo"></img>

      <nav>
        <ul>
          <li>상품</li>
          <li>판매</li>
          <Link to="login"><li>로그인</li></Link>
          <Link to="/join"><li>회원가입</li></Link>
        </ul>
      </nav>

    </header>
  );
};

export default Header;