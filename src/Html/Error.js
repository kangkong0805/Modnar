import React, { useEffect } from "react";
import Header from "./Header";
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
        body: "404 ERROR"
    });

    useEffect(() => {
        triggerNotif();
        setTimeout(() => {
            if (window.confirm("url을 다시 입력하세요")) { }
            else {
                if (window.confirm("url을 다시 입력하세여")) { }
                else {
                    if (window.confirm("...?")) { alert("......") }
                    else {
                        document.location.href = prompt('가고자하는 url을 적으세요');
                    }
                }

            }
        }, 5000);
    })

    return (
        <div id="error">
            <Header/>
            <h1>404 ERROR</h1>
            <Footer />
        </div>
    )
}

export default Error;