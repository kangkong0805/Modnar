import axios from "axios";
import React, { useState, useEffect } from "react";

const Content = props => {
    const [inputs, setInputs] = useState({

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
        console.log({ ID, PW });
        if (ID !== "" && PW !== "") {
            axios.post('주소', {
                아이디파라미터: ID,
                비번파라미터: PW
            })
        }
    }

    return (
        <div className="">
            <div id="">

                <textarea name="content" type="text" value={content} onChange={onChange} />
                <input name="PW" type="password" value={PW} onChange={onChange} />
                <button onClick={onSumbit}>로그인</button>

                <form action="/upload" enctype="multipart/form-data" method="post">
                    <input type="file" name="attachments" multiple />
                    <input name="board_title" type="text" placeholder="글제목" id="board_title" />
                    <input name="board_description" type="text" placeholder="내용" id="board_description" />
                    <input name="board_tag" type="text" placeholder="태그" id="board_tag" />
                    <input name="board_user" type="text" placeholder="글쓴이" id="board_user" />
                    <input name="board_price" type="text" placeholder="가격" id="board_price" />
                    <input value="글 올리기" type="submit" id="dd"></input>
                </form>

            </div>
        </div>
    )
}

export default Content;