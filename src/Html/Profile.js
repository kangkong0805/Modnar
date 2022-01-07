import React from "react";
import { Link } from "react-router-dom";
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
                    <img src="img/BRICK.png" alt="brick"/>
                </div>
                <h3>벽돌</h3>
                <span />
                
                {/* 메뉴 */}
                <ul>
                    <li>프로필 사진</li>
                    <li>닉네임 변경</li>
                    <Link to="/upload"><li>업로드 하기</li></Link>
                    <li>내상품 관리</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile;