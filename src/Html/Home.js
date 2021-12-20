import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';

const Home = () => {
  const [ip, setIp] = useState(''); // IP주소 변수 선언

  function callback(data) {         // IP주소 값을 설정합니다.
    setIp(data);
  }

  useEffect(                        // 첫번째 렌더링을 다 마친 후 실행합니다.
    () => {
      axios.post('/api/ip',{
          // url: '/api' + '/ip',
          // method: 'post',
          /**
           * 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로
           * 운영 환경에 배포할 경우에는 15~16행을 주석 처리합니다.
           * 
           * ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제
           */
          // baseURL: 'http://localhost:8080',
          // withCredentials: true,
        }
      ).then(function (response) {
        console.log(response);
        callback(response.data);      // 클라이언트의 IP주소를 반환
      });
    }, []
  );
  return (
    <>
      <Header />
      <main>
        이 기기의 IP주소는 {ip}입니다.<br/>
      </main>
    </>
  );
};

export default Home;