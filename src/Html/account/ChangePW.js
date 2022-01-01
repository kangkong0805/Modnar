import axios from "axios";
import React, { useEffect, useState } from "react";

const ChangePW = (props) => {
    const [inputs, setInputs] = useState({
        email: "",      // 이메일
        checkNum: null, // 인증번호
        id: "",         // 아이디
        pw: "",         // 바꿀 비밀번호
    });
    const { email, checkNum, id, pw } = inputs;
    const [isCheck, setCheck] = useState(false);    // 인증번호 확인 여부

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    /* 본인 계정의 이메일 인증  */
    const onSumbitEmail = () => {
        console.log(email);
        // var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email !== "") {
            axios.post('/find', {
                user_email: email
            })
                .then(({ data }) => {
                    console.log(data);
                    setInputs({
                        email: email
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
    }

    /* 이메일로 발급받은 인증번호 확인 */
    const onSumbitCheckNum = () => {
        console.log(checkNum);
        // var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (checkNum !== "") {
            axios.post('/pw', {
                ch_pw: checkNum
            })
                .then(({data}) => {
                    console.log(data.pwchange);
                    if(data.pwchange === "succed"){
                        setCheck(true);
                    }
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

    /* 기존의 비밀번호를 새로운 비밀번호로 변경 */
    const onSumbit = () => {
        console.log(checkNum);
        if (checkNum !== "") {
            axios.post('/pwchange', {
                ch_id: id,
                ch_pw: pw
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
                    <h1 onClick={props.onClose}>비밀번호 변경</h1>
                </div>
                {isCheck ? (
                    <>
                        아이디
                        <input name="id" type="text" value={id} onChange={onChange} />
                        비밀번호
                        <input name="pw" type="text" value={pw} onChange={onChange} />
                        <button onClick={onSumbit}>비밀번호 변경</button>
                    </>
                ) : (
                    <>
                        이메일
                        <input name="email" type="text" value={email} onChange={onChange} />
                        <button onClick={onSumbitEmail}>이메일 인증</button>
                        인증번호
                        <input name="checkNum" type="text" value={checkNum} onChange={onChange} />
                        <button onClick={onSumbitCheckNum}>인증번호 확인</button>
                    </>)
                }
            </div>
        </div>
    )
}

export default ChangePW;