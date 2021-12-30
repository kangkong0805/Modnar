import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";

function Upload() {
  const [tags, setTags] = useState({
    electronics: false, // 전자제품 태그
    fasion: false,      // 패션 태크
    food: false,        // 식품 태그
    free: false,        // 무료나눔 태그
    unknown: false      // 미개봉 태그
  })
  const { electronics, fasion, food, free, unknown } = tags;

  const [file, setFile] = useState([]);

  const [inputs, setInputs] = useState({
    title: "",        // 제목
    explanation: "",  // 설명
    price: 0       // 가격
  });
  const { title, explanation, price } = inputs;

  /* 선택한 파일의 이미지 추출 */
  const ShowImage = (e) => {
    console.log(e.target.files.length); // 선택한 파일의 개수

    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = (a) => {
        // console.log(a.currentTarget.result);  // 파일의 위치
        setFile((file) => [...file, a.currentTarget.result]);
      };
      if (e.target.files && e.target.files[i])
        reader.readAsDataURL(e.target.files[i]);
    }
  };

  /* 태그 버튼 클릭 시 호출 */
  const onTag = (e) => {
    const { name } = e.target;

    /* 클릭된 버튼 탐색 */
    if (name === 'electronics') {
      setTags({
        ...tags,
        electronics: !electronics
      });
    } else if (name === 'fasion') {
      setTags({
        ...tags,
        fasion: !fasion
      });
      // console.log(fasion);
    } else if (name === 'food') {
      setTags({
        ...tags,
        food: !food
      });
    } else if (name === 'free') {
      setTags({
        ...tags,
        free: !free
      });
    } else if (name === 'unknown') {
      setTags({
        ...tags,
        unknown: !unknown
      });
    }
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  /* 업록드 버튼 클릭 시 호출 */
  const onSumbit = e => {
    var checkTag = false;
    var string = "";
    for (let index in tags) {
      if (tags[index] === true) {
        checkTag = true;
        string += index + " ";
      }
    }
    /* 파일 확인 여부 */
    // if (file[0] === undefined) {
    //   alert("이미지가 있는 파일을 추가해주세요");
    // }
    /* 제목 작성 여부 */
     if (title === "") {
      alert("제목을 입력해주세요");
    }
    /* 태그 선택 확인 여부 */
    // else if (checkTag !== true) {
    //   alert("태그 체크 해 주세요");
    // }
    /* 설명 작성 여부 */
    else if (explanation === "") {
      alert("설명을 작성해주세요");
    } else {
      console.log(title, explanation, price);
      axios.post('/uploading', {
        title: title,
        content: explanation,
        tag: "abc",
        price: 10,
        file: file[0]
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <>
      <Header />
      <div className="upload">
        <form action="/uploading" enctype="multipart/form-data" method="post">
          <div id="component">
            <h2>사진</h2>
            <input type="file" name="attachments" id="picture" onClick={ShowImage} multiple="multiple"/>
            <label htmlFor="picture">
              <div id="pictureBox">
                {file[0] ? (
                  <img id="preview" src={file[0]} alt="img" />  // 선택한 파일의 이미지
                ) : (
                  <>
                    <img id="nonePicture" src="grayLogo.png" />
                    <p>사진을 선택해주세요.</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div id="title-component">
            <h2>제목</h2>
            <input type="text" id="title" value={title} name="title" onChange={onChange} /> 
          </div>

          <div id="component">
            <h2>태그</h2>
            <button className="tag" onClick={onTag} name="electronics" style={{ background: electronics ? "#f1bba4" : "#fff" }}>전자기기</button>
            <button className="tag" onClick={onTag} name="fasion" style={{ background: fasion ? "#f1bba4" : "#fff" }}>패션</button>
            <button className="tag" onClick={onTag} name="food" style={{ background: food ? "#f1bba4" : "#fff" }}>식품</button>
            <button className="tag" onClick={onTag} name="free" style={{ background: free ? "#f1bba4" : "#fff" }}>무료나눔</button>
            <button className="tag" onClick={onTag} name="unknown" style={{ background: unknown ? "#f1bba4" : "#fff" }}>미개봉</button>
          </div>

          <div id="component">
            <textarea id="description" placeholder="설명" value={explanation} name="explanation" onChange={onChange} />
          </div>

          <div id="component" className="price">
            <h2>가격</h2>
            <input type="number" id="price" min="0" step="10" value={price} name="price" onChange={onChange} />
            <h2 id="won">원</h2>
          </div>
          <input type="submit" id="uploadBtn" value={"업로드"} onClick={onSumbit} />
        </form>
      </div>
    </>
  );
}
export default Upload;