import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';
import SupHeader from './SupHeader';
import Footer from './Footer';

const Home = () => {

  const [list, setList] = useState([]);          // 모든 게시글
  const [check, setCheck] = useState(false);     // 게시글이 화면에 띄워져 있는지 체크
  const [isDib, setDib] = useState([]);

  useEffect(() => {
    setCheck({ check: true });
    if (check === false) {
      axios.get('/main')
        .then(({ data }) => {
          console.log(data);
          console.log(isDib);
          data[0].map((num) => {
            setList(prev => [...prev, num])
          })
        })
        .catch((error) => {
          console.log(error);
          return (
            <p>ㅈ버그</p>
          );
        })
    }
  }, [])

  const onDib = (e, key) => {
    console.log(isDib[key], key);
    axios.post('/heart', {
      board_id: e
    })
      .then(({ data }) => {
        console.log(data);
        // setDib({
        //   ...isDib,
        //   [key]: !isDib[key]
        // });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onComment = (e) => {
    console.log(e.id, e.content);
    axios.post('/comment', {
      board_id: e.id,
      cm_content: e.content
    })
      .then(({ data }) => {
        console.log(data);
        document.location.href = '/board/?board_id=' + e.id 
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const UpdateComment = (e) => {
    console.log(e.id, e.content);
    axios.post('/update', {
      board_id: e.id,
      cm_content: e.content
    })
      .then(({ data }) => {
        console.log(data);
        document.location.href = '/board/?board_id=' + e.id 
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>  
      <Header />
      <SupHeader/>
      <main>
        <ul id="postboard">
          {
            list !== [] ? (
              list.map((num, key) => {
                return (
                  <li key={key}>
                    <img src="img/BRICK.png" alt="img" className="post_img" onClick={() => { onComment(num) }} />
                    <h3 onClick={() => { onComment(num) }}>{num.title}</h3>
                    <p onClick={() => { onComment(num) }}>{num.tag}</p>
                    <p onClick={() => { onComment(num) }}>{num.board_log}</p>
                    <img src={isDib[key] ? "img/DibButton_on.png" : "img/DibButton_off.png"} alt={num.id} onClick={() => onDib(num.id, key)} />
                  </li>
                );
              })
            ) : (
              <h1>게시글이 없어요...</h1>)
          }

        </ul>
      </main>
      <Footer />
    </>
  );
};

export default Home