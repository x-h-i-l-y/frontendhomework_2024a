import { useState } from "react";
import './Login.css'

function Inbox() {
    const [getCode, setGetCode] = useState[false]
    let getTime = null
    let showTime = 0
    function handleClickGetCode() {
        if (getCode) {
            setGetCode(false)
        } else {
            setGetCode(true)
        }

        if(getCode) {
            getTime = new Date().getTime()
            setInterval(() => {
                let newTime = new Date().getTime()
                showTime = newTime - getTime
            }, 1000)
        }
    }
    return (
        <>
            <div className="numberInput" id="number">
                <input id="tel" type="tel" maxLength={11} value={"请输入手机号"}></input>
            </div>
            <div className="numberInput" id="code">
                <input id="codes" type="number" maxLength={6} value={"请输入验证码"}></input>
                <div className="buttonGetCode" onClick={handleClickGetCode}>{getCode ? "Get the code" : `Wait(${showTime})`}</div>
            </div>
            <div className="buttonForSubmit"></div>
        </>
    )
}
export default function Login() {
    return (
        <div id="total">
            <image src="../image/icon.png" className="images"></image>
            <Inbox />
        </div>
    )
}