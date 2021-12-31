import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {

  const [list, setList] = useState({});

  const Button = () => {
    axios.get('/main')
      .then(({ data }) => {
        console.log(data);
        setList({
          list: data[0][0].title
        })
        console.log(list);
        Object.entries(list).map((a,index) => {
          console.log(a, index);
        })
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
          { list !== undefined ? (
          Object.values(list).map((index, num) => {
            return (
              <>
                <li>{index}</li>
              </>
            )
          })
          ) : (<></>)
          }
          

          
        </ul>


      </main>
      <Footer />
    </>
  );
};

export default Home