import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const Dibs = () => {

    const [list, setList] = useState([]);       // 모든 게시글

    useEffect(() => {
        axios.get('/myheart')
            .then(({ data }) => {
                console.log(data);
                data.map((num) => {
                    setList(prev => [...prev, num])
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <>
            <Header />
            <main>
                <ul id="postboard">
                    {
                        list !== [] ? (
                            list.map((num, key) => {
                                return (
                                    <li key={key}>
                                        <img src="img/BRICK.png" alt="img" className="post_img" />
                                        <h3>{num.title}</h3>
                                        <p>{num.tag}</p>
                                        <p>{num.board_log}</p>
                                        <img src="img/DibButton.png" alt="button" />
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
    )
}

export default Dibs;

// axios.post('/heart')