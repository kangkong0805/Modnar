import React from "react";

function SupHeader() {
  return (
    <>
      <div id="supHeader">
        <ul>
          <select>
            <option value="1">전자기기</option>
            <option value="2">미개봉</option>
            <option value="3">패션</option>
            <option value="4">생활</option>
            <option value="5">기타</option>
          </select>
          <select>
            <option value="a">높은가격순</option>
            <option value="b">낮은가격순</option>
            <option value="c">무료나눔</option>
          </select>
        </ul>
      </div>
    </>
  );
}

export default SupHeader;