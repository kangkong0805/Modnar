import axios from "axios";
import React, { useState } from "react";

const FindPW = (props) => {
    const [inputs, setInputs] = useState({
        email: "",
        pw: "",
        checkNum: null
    });
    const { email, pw, checkNum } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSumbitID = () => {
        console.log(email);
        // var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email !== "") {
            axios.post('/find', {
                find_pw_id: email
            })
                .then(({ data }) => {
                    console.log(data);
                    setInputs({
                        email: email,
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert("입력칸을 확인해주세요");
            setInputs({
                ...inputs,
                email: ""
            })
        }
        console.log(email);
    }

    const onSumbitCheckNum = () => {
        console.log(checkNum);
        // var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (checkNum !== "") {
            axios.post('', {
                AuthNumber: checkNum
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert("입력칸을 확인해주세요");
            setInputs({
                ...inputs,
                checkNum: ""
            })
        }
        console.log(email);
    }

    const onSumbit = () => {
        console.log(checkNum);
        // var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (checkNum !== "") {
            axios.post('/pwreset', {
                user_id: email,
                user_pw: pw
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert("입력칸을 확인해주세요");
            setInputs({
                ...inputs,
                email: ""
            })
        }
        console.log(email);
    }

    return (
        <div className="background_layer gray">
            <div id="login_layer">
                <div>
                    <img src="img/BRICK.png" alt="logo" />
                    <h1 onClick={props.onClose}>비밀번호 찾기</h1>
                </div>
                아이디
                <input name="email" type="text" value={email} onChange={onChange} />
                비밀번호
                <input name="pw" type="text" value={pw} onChange={onChange} />
                인증번호
                <input name="checkNum" type="text" value={checkNum} onChange={onChange} />
                <button onClick={onSumbitID}>아이디 인증</button>
                <button onClick={onSumbitCheckNum}>인증번호 확인</button>
                <button onClick={onSumbit}>비밀번호 변경</button>
            </div>
        </div>
    )
}

export default FindPW;

// body.find_pw_id(이메일)