import React, { useEffect } from "react";
import Footer from "./Footer";

const Error = () => {

    const useNotification = (title, options) => {
        if (!("Notification" in window)) {
            return;
        }

        const fireNotif = () => {
            /* 권한 요청 부분 */
            if (Notification.permission !== "granted") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        /* 권한을 요청받고 nofi를 생성해주는 부분 */
                        new Notification(title, options);
                    } else {
                        return;
                    }
                });
            } else {
                /* 권한이 있을때 바로 noti 생성해주는 부분 */
                new Notification(title, options);
            }
        };
        return fireNotif;
    };

    const triggerNotif = useNotification("404 ERROR", {
        body: "url을 다시 입력하세여"
    });

    useEffect(() => {
        // triggerNotif();
        if (window.confirm("url을 다시 입력하세요")) {}
        else {
            if (window.confirm("url을 다시 입력하세여")) { window.location.reload(); return; }
            else { }
            if (prompt("'ㅇㄱㅁㄸ' 라고 적어") == "이거는 절대 못 적쥬??? 이거 적어봐 쀍뛣쒥꽱텗 ..,,.,...''''.''.'...'...oㅇooㅇㅇoㅇ0yasyas 이거 적으면 100만원 준다 ㅋㅋㄹㅃㅃ") { alert("응 안줌 ㅅㄱ") }
            else {
                alert("사실 구라고 내 질문에 대답을 하면 됨 ㅇㅇ");
                alert("자 이제 시작할게");
                alert("3");
                alert("2");
                alert("1");
                alert("START!!!");
            }
        }
    })

    return (
        <div id="error">
            <h1>404 ERROR</h1>
            <Footer />
        </div>
    )
}

export default Error;