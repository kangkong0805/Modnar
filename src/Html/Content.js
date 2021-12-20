import axios from "axios";
import React, { useState, useEffect } from "react";

const Content = props => {
    const [inputs, setInputs] = useState({
        ID: "",
        PW: ""
    });
    const { ID, PW } = inputs;



    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSumbit = (e) => {
        console.log({ID, PW});
        if(ID !== "" && PW !== "") {
            axios.post('주소', {
                아이디파라미터: ID,
                비번파라미터: PW
            })
        }
    }

    return (
        <div className="">
            <div id="login_layer">
                
                <textarea name="content" type="text" value={content} onChange={onChange} />
                <input name="PW" type="password" value={PW} onChange={onChange} />
                <button onClick={onSumbit}>로그인</button>
            </div>
        </div>
    )
}

export default Content;