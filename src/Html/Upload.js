import React, { useEffect, useState } from "react";
import Header from "./Header";

function Upload() {
  const [tags, setTags] = useState({
    electronics: false,
    fasion: false,
    food: false,
    free: false,
    unknown: false
  })
  const { electronics, fasion, food, free, unknown } = tags;

  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

  const onChange = (e) => {
    console.log(e.target.files.length);

    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = (a) => {
        setFile((file) => [...file, a.currentTarget.result]);
      };
      if (e.target.files && e.target.files[i])
        reader.readAsDataURL(e.target.files[i]);
    }
  };

  const onClick = (e) => {
    const { name } = e.target;

    if(name == 'electronics'){
      setTags({
        ...tags,
        electronics: !electronics
      });
    } else if(name == 'fasion'){
      setTags({
        ...tags,
        fasion: !fasion
      });
    } else if(name == 'food'){
      setTags({
        ...tags,
        food: !food
      });
    } else if(name == 'free'){
      setTags({
        ...tags,
        free: !free
      });
    } else if(name == 'unknown'){
      setTags({
        ...tags,
        unknown: !unknown
      });
    }

    for(let index in tags){
      // console.log(tags[index]);
    }
  }

  return (
    <>
      <Header />
      <div className="upload">
        <div id="component">
          <h2>사진</h2>
          <input type="file" multiple onChange={onChange} id="picture" />
          <label htmlFor="picture">
            <div id="pictureBox">
              {file[0] ? (
                <img id="preview" src={file[0]} alt="img" />
              ) : (
                <>
                  <img id="nonePicture" src="grayLogo.png" />
                  <p>사진을 선택해주세요.</p>
                </>
              )}
            </div>
          </label>
          <input id="picture" type={"file"}></input>
        </div>

        <div id="title-component">
          <h2>제목</h2>
          <input type={"text"} id="title"></input>
        </div>

        <div id="component">
          <h2>태그</h2>
          <button className="tag" onClick={onClick} name="electronics" style={{ background: electronics ? "#f1bba4" : "#fff" }}>전자기기</button>
          <button className="tag" onClick={onClick} name="fasion" style={{ background: fasion ? "#f1bba4" : "#fff" }}>패션</button>
          <button className="tag" onClick={onClick} name="food" style={{ background: food ? "#f1bba4" : "#fff" }}>식품</button>
          <button className="tag" onClick={onClick} name="free" style={{ background: free ? "#f1bba4" : "#fff" }}>무료나눔</button>
          <button className="tag" onClick={onClick} name="unknown" style={{ background: unknown ? "#f1bba4" : "#fff" }}>미개봉</button>
        </div>

        <div id="component">
          <textarea id="description" placeholder="설명"></textarea>
        </div>

        <div id="component" className="price">
          <h2>가격</h2>
          <input type={"text"} id="price"></input>
          <h2 id="won">원</h2>
        </div>
        <input type="button" id="uploadBtn" value={"업로드"}></input>
      </div>
    </>
  );
}
export default Upload;