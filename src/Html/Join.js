import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Join = (props) => {

    const [inputs, setInputs] = useState({
        ID: "",
        PW: "",
        nickname: ""
    });
    const { ID, PW, nickname } = inputs;



    const onChange = (e) => {
        const { value, name } = e.target;
        console.log(value, name);
        setInputs({
            ...inputs,
            [name]: value
        });
    };
/**
 * 
 * @param {*} e 
 */
    const onSumbit = (e) => {
        console.log({ ID, PW, nickname });
        if (ID !== "" && PW !== "" && nickname !== "") {   // 입력 칸이 공백인지 아닌지 판단

            var reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;                                              // 비밀번호 입력 조건 (영문, 숫자 혼합 8 ~ 20자리)
            var req_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;    // 이메일 입력 조건

            if (reg_pw.test(PW)) {                                 // 비밀번호 입력 조건에 맞게 입력했는지 판단

                axios.post('/signup', {     // 서버에 정보 전달
                    make_id: ID,
                    make_pw: PW,
                    make_nickname: nickname
                })
                    .then(({ data }) => {                             // 전달 성공
                        console.log(data.sign);
                        if (data.sign == 1) {                         // 아이디가 안될 경우
                            alert("다른 아이디로 작성해주세요");
                            setInputs({
                                ID: "",
                                PW: PW,
                                nickname: nickname  
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
                alert("비밀번호: 영문, 숫자 혼합 8~20자리");
                console.log({ ...inputs });
            }
        } else {
            alert("입력을 해주세요");
        }
    }

    return (
        // <div className="background_layer white">/
        <div id="join_layer">
            <h3>회원가입</h3>
            <div>
                <img src="" alt="logo" />
            </div>
            {/* <input name="nickname" type="text" value={nickname} onChange={onChange} /> */}
            <input name="ID" type="text" value={ID} onChange={onChange} />  {/* 아이디는 무조건 입력해야 함 (안하고 회원가입 하면 서버 오류) */}
            <input name="PW" type="text" value={PW} onChange={onChange} />
            <input name="nickname" type="text" value={nickname} onChange={onChange} />
            <button onClick={onSumbit}>회원가입</button>
        </div>
        // </div>
    )
}

export default Join;