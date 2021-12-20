import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Join = () => {
    const [inputs, setInputs] = useState({
        ID: "",
        PW: "",
        email: ""
    });
    const { ID, PW, email } = inputs;



    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSumbit = (e) => {
        console.log({ ID, PW });
        if (ID !== "" && PW !== "") {                                    // 입력 칸이 공백인지 아닌지 판단
            
            var reg_pw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;   // 영문, 숫자 혼합 8 ~ 20자리 (비밀번호 입력 조건)
            if (reg_pw.test(PW)) {                                       // 비밀번호 입력 조건에 맞게 입력했는지 판단
                axios.post('주소', {                                     // 서버에 정보 전달
                    아이디파라미터: ID,
                    비밀번호파라미터: PW,
                    이메일파라미터: email
                })
                    .then((response) => {                                // 전달 성공
                        console.log(response);
                        alert("회원가입에 성공하셨습니다.");
                        document.location.href = "/"
                    })
                    .catch((error) => {                                  // 전달 실패
                        console.log(error);
                    })
            } else {                                                     
                alert("비밀번호: 영문, 숫자 혼합 8~20자리");
                console.log({ ...inputs });
                setInputs({
                    PW: ""
                });
            }
        } else {
            alert("입력을 해주세요");
        }
    }

    return (
        <div className="background_layer white">
            <div id="join_layer">
                <h3>회원가입</h3>
                <div>
                    <img src="" alt="logo" />
                </div>
                {/* <input name="email" type="text" value={email} onChange={onChange} /> */}
                <input name="ID" type="text" value={ID} onChange={onChange} />
                <input name="PW" type="password" value={PW} onChange={onChange} />
                <button onClick={onSumbit}>로그인</button>
            </div>
        </div>
    )
}

export default Join;

// axios.post('주소', {
//     아이디파라미터: ID, 
//     비번파라미터: PW
// })