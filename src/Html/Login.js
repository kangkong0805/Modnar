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

    const onSumbit = (e) => {
        console.log({ ID, PW, nickname });
        if (ID != "" && PW != "" && nickname != "") {
            axios.post('/login', {
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

    return (
        <div className="background_layer gray">
            <div id="login_layer">
                <div>
                    <img src="" alt="logo" />
                </div>
                <input name="ID" type="text" value={ID} onChange={onChange} />
                <input name="PW" type="password" value={PW} onChange={onChange} />
                <input name="nickname" type="text" value={nickname} onChange={onChange} />
                <button onClick={onSumbit}>로그인</button>
                <button onClick={() => setJoin(true)}>회원가입</button>
                {isJoin && <Join onClose={() => setJoin(false)} />}
            </div>
        </div>
    )
}

export default Login;