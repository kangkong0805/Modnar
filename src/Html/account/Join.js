import React, { useState } from "react";
import axios from "axios";

const Join = (props) => {

    const [inputs, setInputs] = useState({
        ID: "",
        PW: "",
        nickname: "",
        email: ""
    });
    const { ID, PW, nickname, email } = inputs;



    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSumbit = () => {
        console.log({ ID, PW, nickname, email });
        if (ID !== "" && PW !== "" && nickname !== "" && email !== "") {   // 입력 칸이 공백인지 아닌지 판단
            var reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;     // 비밀번호 입력 조건 (영문, 숫자 혼합 8 ~ 20자리)
            var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 입력 형식

            if (reg_pw.test(PW)) {                                 // 비밀번호 입력 조건에 맞게 입력했는지 판단
                if(reg_email.test(email)){
                axios.post('/signup', {     // 서버에 정보 전달
                    user_id: ID,
                    user_pw: PW,
                    user_email: email,
                    user_nickname: nickname
                })
                    .then(({ data }) => {                             // 전달 성공
                        console.log(data.sign);
                        if (data.sign === 1) {                         // 아이디가 안될 경우
                            alert("다른 아이디로 작성해주세요");
                            setInputs({
                                ...inputs,
                                ID: ""
                            });
                        } else {                                      // 회원가입 되었을 경우
                            alert("회원가입에 성공하셨습니다");
                            props.onClose();
                            document.location.href = '/';
                        }
                    })
                    .catch((error) => {                               // 전달 실패
                        console.log(error);
                    })
                } else {
                    alert("이메일 형식에 맞게 작성해주세요");
                }
            } else {
                alert("비밀번호: 영문, 숫자 혼합 8~20자리");
                console.log({ ...inputs });
            }
        } else {
            alert("입력을 해주세요");
        }
    }

    return (
        <div className="background_layer gray">
            <div id="login_layer">
                <div>
                    <img src="img/BRICK.png" alt="logo" />
                    <h1 onClick={props.onClose}>회원가입</h1>
                </div>
                아이디
                <input name="ID" type="text" value={ID} onChange={onChange} />  {/* 아이디는 무조건 입력해야 함 (안하고 회원가입 하면 서버 오류) */}
                비밀번호
                <input name="PW" type="password" value={PW} onChange={onChange} />
                닉네임
                <input name="nickname" type="text" value={nickname} onChange={onChange} />
                이메일
                <input name="email" type="text" value={email} onChange={onChange} />
                <button onClick={onSumbit}>회원가입</button>
            </div>
        </div>
    )
}

export default Join;