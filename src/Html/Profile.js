import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = props => {

    return (
        <div id="profile_background">
            <div id="profile"
                style={{
                    right: props.place ? "0px" : "-302px",  // 프로필 위치 설정
                    animation: props.place ? "slidein 0.7s" : props.start ? "slideout 0.7s" : null  // 프로필 애니메이션 설정
                }}
            >

                <div className="img">
                    {/* <img src="" alt="logo" /> */}
                </div>
                <h3>이름</h3>
                <span />
                <ul>
                    <li>프로필 사진</li>
                    <li>닉네임 변경</li>
                    <li>업로드 변경</li>
                    <li>내상품 관리</li>
                </ul>

            </div>
        </div>
    )
}

export default Profile;