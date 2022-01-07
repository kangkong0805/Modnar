import axios from "axios";
import React, { useState } from "react";

const ChangePW = (props) => {
    const [inputs, setInputs] = useState({
        email: "",      // 이메일
        checkNum: 0, // 인증번호
        id: "",         // 아이디
        pw: "",         // 바꿀 비밀번호
    });
    const { email, checkNum, id, pw } = inputs;
    const [isCheckNum, setCheckNum] = useState({});
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
        var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email.match(reg_email)) {
            axios.post('/find', {
                user_email: email
            })
                .then(({ data }) => {
                    alert("입력하신 이메일에서 인증번호를 확인해주세요");
                    setCheckNum({isCheckNum: data})
                    console.log([data], Object.values(isCheckNum));
                })
                .catch((error) => {
                    console.log(error);
                })
            } else {
            alert("잘못된 이메일을 입력하셨습니다");
            setInputs({
                ...inputs,
                email: ""
            })
        }
    }

    /* 이메일로 발급받은 인증번호 확인 */
    const onSumbitCheckNum = () => {
        console.log(checkNum.toString() === isCheckNum['isCheckNum'].toString());
        // var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (checkNum.toString() === isCheckNum['isCheckNum'].toString()) {
            alert("인증번호가 확인이 되었습니다");
            setCheck({isCheck: true});
        } else {
            alert("인증번호를 잘못 입력하셨습니다");
            setInputs({
                ...inputs,
                checkNum: ""
            })
        }
    }

    /* 기존의 비밀번호를 새로운 비밀번호로 변경 */
    const onSumbit = () => {
        console.log(checkNum);
        if (checkNum !== "") {
            axios.post('/pwchange', {
                ch_id: id,
                ch_pw: pw
            })
                .then(({data}) => {
                    console.log(data);
                    if(data.pwchange){
                        alert("비밀번호가 변경되었습니다");
                        props.onClose();
                    } else {
                        alert("아이디를 확인해주세요");
                        setInputs({
                            ...inputs,
                            id: ""
                        })
                    }
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
                {isCheck ? (    // 인증받았는지 확인
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
                        <input name="checkNum" type="number" value={checkNum} onChange={onChange} />
                        <button onClick={onSumbitCheckNum}>인증번호 확인</button>
                    </>)
                }
            </div>
        </div>
    )
}

export default ChangePW;