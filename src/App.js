// import './App.css';
// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from './Html/Home';

// function App() {
//   return (
//     // 라우팅(Routing): 다른경로(url 주소)에 따라 다른 View를 보여주는 것
//     // React-router라는 리액트 라이브러리를 설치하여 라우팅 기능을 사용 가능
//     // <Route path="경로" element={< 컴포넌트 />}
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import customAxios from './customAxios.js';

function App() {
  // IP주소 변수 선언
  const [ip, setIp] = useState('');

  // IP주소 값을 설정합니다.
  function callback(data) {
    setIp(data);
  }

  // 첫번째 렌더링을 다 마친 후 실행합니다.
  useEffect(
    () => {
      // 클라이언트의 IP주소를 알아내는 백엔드의 함수를 호출합니다.
      customAxios('/ip', callback);
    }, []
  );

  return (
    <div className="App">
      <header className="App-header">
        이 기기의 IP주소는 {ip}입니다.
      </header>
    </div>
  );
}

export default App;