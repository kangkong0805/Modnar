import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Upload = () => {
  const [inputs, setInputs] = useState({
    contents: ""
  });
  const { contents } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onSumbit = (e) => {
    console.log({ contents });

  }

  const onImage = (e) =>{
    console.log(e);
  }

  return (
    <>
      <Header />
      <div className="post">
        <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
        <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple onChange={onImage}/>
      </div>
      <textarea name="contents" value={contents} onChange={onChange} />
      <button onClick={onSumbit}>업로드</button>
    </>
  )
}

export default Upload;