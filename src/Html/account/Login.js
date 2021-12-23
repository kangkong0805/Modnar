import axios from "axios";
import React, { useState, useEffect } from "react";
import Join from "./Join";

const Login = props => {
    const [isJoin, setJoin] = useState(false);
    const [inputs, setInputs] = useState({
        ID: "",
        PW: "",
        nickname: ""
    });
    const { ID, PW, nickname } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSumbit = () => {
        triggerNotif();
        console.log({ ID, PW, nickname });
        if (ID != "" && PW != "" && nickname != "") {
            axios.post('/nlogi', {
                user_id: ID,
                user_pw: PW,
                user_nickname: nickname
            })
                .then(({ data }) => {                                // 전달 성공
                    console.log(data.stat);
                    if (data.stat == 1) {
                        alert("아이디를 다시 입력해주세요");
                        setInputs({
                            ID: "",
                            PW: PW,
                            nickname: nickname
                        })
                    } else if (data.stat == 2) {
                        alert("비밀번호를 다시 입력해주세요");
                        setInputs({
                            ID: ID,
                            PW: "",
                            nickname: nickname
                        })
                    } else {
                        alert("성공하였습니다.");
                        props.onClose();
                    }

                })
                .catch((error) => {                                  // 전달 실패
                    console.log(error);
                })
        } else {
            alert("내용을 입력해주새요");
        }
    }

    const onJoin = () => {
        props.join();
        props.onClose();
    }

    const onFindPW = () => {
        props.findPW();
        props.onClose();
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

    const triggerNotif = useNotification("test", {
        body: "id : "+ID+", pw : "+PW+", nickname : "+nickname
    });

    return (
        <div className="background_layer gray">
            <div id="login_layer">
                <div>
                    <img src="img/BRICK.png" alt="logo" />
                    <h1 onClick={props.onClose}>로그인</h1>
                </div>
                아이디
                <input name="ID" type="text" value={ID} onChange={onChange} />
                비밀번호
                <input name="PW" type="password" value={PW} onChange={onChange} />
                닉네임
                <input name="nickname" type="text" value={nickname} onChange={onChange} />
                <button onClick={onSumbit}>로그인</button>
                <button onClick={onJoin}>회원가입</button>
                <h4 onClick={onFindPW}>비밀번호 찾기</h4>
            </div>
        </div>
    )
}

export default Login;