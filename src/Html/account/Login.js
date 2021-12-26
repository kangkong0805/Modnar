import axios from "axios";
import React, { useState } from "react";

const Login = props => {
    const [inputs, setInputs] = useState({
        ID: "",
        PW: "",
    });
    const { ID, PW } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSumbit = () => {
        // triggerNotif();
        console.log({ ID, PW });
        if (ID !== "" && PW !== "") {
            axios.post('/login', {
                id: ID,
                pw: PW
            })
                .then(({ data }) => {                                // 전달 성공
                    console.log(data.stat);
                    if (data.stat === 1) {                            // 아이디 잘못 적었을 때
                        alert("아이디를 다시 입력해주세요");
                        setInputs({
                            ID: "",
                            PW: PW
                        })
                    } else if (data.stat === 2) {                     // 비밀번호 잘못 적었을 때
                        alert("비밀번호를 다시 입력해주세요");
                        setInputs({
                            ID: ID,
                            PW: ""
                        })
                    } else {                                         // 로그인 성공했을 때
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
        body: "id : "+ID+", pw : "+PW
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
                <button onClick={onSumbit}>로그인</button>
                <button onClick={onJoin}>회원가입</button>
                <h4 onClick={onFindPW}>비밀번호 찾기</h4>
            </div>
        </div>
    )
}

export default Login;