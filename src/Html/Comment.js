import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header"

function Comment() {
    const [postData, setPostData] = useState("");
    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(" ");

    useEffect(() => {
        axios.get(window.location.href)
            .then(({ data }) => {
                setPostData(data[0][0]);
                console.log(data[1]);
                data[1].map((index) => {
                    setComments(prev => [...prev, index]);
                })
                setCurrentUser(data[3]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const onComment = () => {
        axios.post('/comment', {
            cm_content: input,
            board_id: postData.id
        })
            .then(({ data }) => {
                console.log(data);
                if (data.comment === "succed") {
                    alert("댓글이 등록되었습니다");
                    document.location.href = window.location.href
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteComment = (e) => {
        axios.post('/cmdel', {
            comment_id: e
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onAdopt = (e) => {
        axios.post('/select', {
            comment_id: e
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div id="comment_layer">
            <Header />
            <div className="post">
                <section className="poster">
                    <span id="post-profile">
                        <div id="profile-picture"></div>
                        <div id="profile-text">
                            <p id="name">벽돌</p>
                            <p id="time">12시간전</p>
                        </div>
                    </span>
                    <div id="post-picture"></div>
                </section>

                <section className="post-text">
                    <h1 id="post-title">{postData.title}</h1>
                    <p id="post-tag">#{postData.tag}</p>
                    <p id="post-description">{postData.content}</p>
                    <div id="priceJjim">
                        <p id="post-price">{postData.price}</p>
                        <img src="/img/DibButton.png" alt="찜" id="jjim" />
                    </div>
                </section>

                <section className="comments">
                    <input type="text" autoComplete="off" id="comment-input" value={input} onChange={onChange} />
                    <button id="pen" onClick={onComment}>
                        <img src="/img/pen.png" alt="submit" />
                    </button>
                    {
                        comments.map((index, key) => {
                            return (
                                <div id="comment" key={key}>
                                    <span id="comment-profile"></span>
                                    <p id="profile-name">{index.user_id}</p>
                                    <p id="profile-time">13시간 전</p>
                                    <p id="comment-text">{index.content}</p>
                                    <button id="comment-btn">
                                        {
                                            index.stat === "2" ? (
                                                <img id="bin" src="/img/bin.png" alt="삭제" style={{ width: "30px" }} onClick={() => { deleteComment(index.id) }} />
                                            ) : (
                                                index.stat === "1" ? (
                                                    <img id="bin" src="/img/adopt.png" alt="채택" style={{ width: "30px" }} onClick={() => { onAdopt(index.id) }} />
                                                ) : (
                                                    <img id="bin" src="/img/notAdopt.png" alt="불채택" style={{ width: "30px" }} onClick={() => { onAdopt(index.id) }} />
                                                )
                                            )
                                        }
                                        {
                                            currentUser === index.user_id ? (
                                                <img id="bin" src="/img/bin.png" alt="불채택" style={{ width: "30px" }} onClick={() => { onAdopt(index.id) }} />
                                            ) : (<></>)
                                        }
                                    </button>
                                </div>
                            )
                        })
                    }
                </section>
            </div>
        </div>
    );
}

export default Comment

// 0: 일반
// 1: 채택
// 2: 글쓴이가 쓴 댓글