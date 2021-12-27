import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './html/Home';
import Dibs from './html/Dibs';
import Upload from './html/Upload';
import Error from './html/Error';

function App() {
  return (
    // 라우팅(Routing): 다른경로(url 주소)에 따라 다른 View를 보여주는 것
    // React-router라는 리액트 라이브러리를 설치하여 라우팅 기능을 사용 가능
    // <Route path="경로" element={< 컴포넌트 />}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dibs" element={<Dibs/>} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// // import "./styles.css";

// const useNotification = (title, options) => {
//   if (!("Notification" in window)) {
//     return;
//   }

//   const fireNotif = () => {
//     /* 권한 요청 부분 */
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//           /* 권한을 요청받고 nofi를 생성해주는 부분 */
//           new Notification(title, options);
//         } else {
//           return;
//         }
//       });
//     } else {
//       /* 권한이 있을때 바로 noti 생성해주는 부분 */
//       new Notification(title, options);
//     }
//   };
//   return fireNotif;
// };

// const App = () => {
//   const triggerNotif = useNotification("tlqkf", {
//     body: "tprtm"
//   });
//   return (
//     <div className="App">
//       <button onClick={triggerNotif}> Push notification </button>
//     </div>
//   );
// };

// export default App;