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
                user_id: ID,
                user_pw: PW
            })
                .then(({ data }) => {                                // 전달 성공
                    console.log(data.login);
                    if (data.login === "noid") {                            // 아이디 잘못 적었을 때
                        alert("아이디를 다시 입력해주세요");
                        setInputs({
                            ID: "",
                            PW: PW
                        })
                    } else if (data.login === "nopw") {                     // 비밀번호 잘못 적었을 때
                        alert("비밀번호를 다시 입력해주세요");
                        setInputs({
                            ID: ID,
                            PW: ""
                        })
                    } else if (data.login === "succed") {                    // 로그인 성공했을 때
                        alert("성공하였습니다.");
                        props.name();
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

    return (
        <div className="background_layer gray">
      <div id="login_layer">
        <div>
          <img src="BRICK.png" alt="logo" />
          <h1 onClick={props.onClose}>로그인</h1>
        </div>
        <input
          name="ID"
          type="text"
          value={ID}
          onChange={onChange}
          placeholder="아이디"
        />
        <input
          name="PW"
          type="password"
          value={PW}
          onChange={onChange}
          placeholder="비밀번호"
        />
        <button onClick={onSumbit}>로그인</button>
        <span>
          <h4 onClick={onFindPW}> 비밀번호 찾기&nbsp; </h4>
          <h3 onClick={onJoin}> &nbsp;회원가입</h3>
        </span>
      </div>
    </div>
    )
}

export default Login;