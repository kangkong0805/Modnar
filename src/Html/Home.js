import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {

  const [list, setList] = useState([]);

  const Button = () => {
    axios.get('/main')
      .then(({ data }) => {
        console.log(data[0]);
        setList({
          list: data[0][0][0]
        })
        console.log(list);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <Header />
      <main>
      <button onClick={Button}>버튼</button>
        <ul>
          {/* {list.map((index, num) => {
            return (
              <>
                <li>{index.title}</li>
              </>
            )
          })} */}

          {/* {
            {list.title}
          } */}
        </ul>


      </main>
      <Footer />
    </>
  );
};

export default Home