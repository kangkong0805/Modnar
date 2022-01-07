import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Login from './account/Login';
import Join from './account/Join';
import ChangePW from './account/ChangePW';
import Profile from './Profile';
import axios from 'axios';

const Header = () => {

  const [isLogin, setLogin] = useState(false);         // 로그인 컴포넌트 
  const [isProfile, setProfile] = useState(false);     // 프로필 컴포넌트
  const [isClick, setClick] = useState(false);         // 첫 렌더링 시 프로필 클릭되었는지 체크
  const [isJoin, setJoin] = useState(false);           // 회원가입 컴포넌트
  const [isFindPW, setFindPW] = useState(false);       // 비밀번호 찾기 컴포넌트
  const [loginCheck, setLoginCheck] = useState(() => JSON.parse(window.localStorage.getItem("loginCheck")) || false); // 로그인 되어 있는지 체크

  useEffect(() => {
    window.localStorage.setItem("loginCheck", JSON.stringify(loginCheck));  // 브라우저 상에 로그인 체크 데이터 저장 (새로고침해도 값 초기화 안됨)
  }, [loginCheck])

  const onProfile = () => {
    // triggerNotif(); //  알림 띄우기
    setClick(true);
    setProfile(!isProfile);
  }

  const useNotification = (title, options) => {
    if (!("Notification" in window)) {
      return;
    }

    const fireNotif = () => {
      /* 권한 요청 부분 */
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            /* 권한을 요청받고 nofi를 생성해주는 부분 */
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        /* 권한이 있을때 바로 noti 생성해주는 부분 */
        new Notification(title, options);
      }
    };
    return fireNotif;
  };

  const triggerNotif = useNotification("Profile", { // 제목
    body: "this is profile " + !isProfile  // 본문
  });

  const logout = () => {
    axios.post('/logout')
      .then((response) => {
        console.log(response);
        setLoginCheck(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <header>  {/* 헤더바 */}
        <div>
          <Link to="/"><img src="/img/logo.png" alt="logo" /></Link>  {/* 로고 */}
        </div>
        <nav>
          <ul>
            {loginCheck ? (
              <li onClick={logout} tapindex="0" style={{ color: isLogin ? "#000" : "#727272" }}><h3>로그아웃</h3></li>
            ) : (
              <li onClick={() => setLogin(true)} tapindex="0" style={{ color: isLogin ? "#000" : "#727272" }}><h3>로그인</h3></li>)}

            <li onClick={onProfile} style={{ color: isProfile ? "#000" : "#727272" }}><h3>프로필</h3></li>
            <Link to="/dibs"><li style={{ color: "#727272" }}><h3>찜</h3></li></Link>

            {isLogin && <Login onClose={() => setLogin(false)} join={() => setJoin(true)} findPW={() => setFindPW(true)} name={() => setLoginCheck(true)} />} {/* 로그인 창 */}
            {isJoin && <Join onClose={() => setJoin(false)} />}  {/* 회원가입 창 */}
            {isFindPW && <ChangePW onClose={() => setFindPW(false)} />} {/* 비밀번호 찾기 창 */}
            <Profile place={isProfile} start={isClick} /> {/* 프로필 창 */}

          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;