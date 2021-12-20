import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './html/Home';
import Join from './html/Join';
import Upload from './html/Upload';

function App() {
  return (
    // 라우팅(Routing): 다른경로(url 주소)에 따라 다른 View를 보여주는 것
    // React-router라는 리액트 라이브러리를 설치하여 라우팅 기능을 사용 가능
    // <Route path="경로" element={< 컴포넌트 />}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/Upload" element={<Upload/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;