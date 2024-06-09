import {useState} from "react";
import './Login.css'
import icon from '../image/icon.png'
import axios from 'axios'

function Inbox() {
    const [enterMobilePhone, setEnterMobilePhone] = useState('')
    const [enterPassword, setEnterPassword] = useState('')
    // let checkResult = {
    //     code: 200,
    //     data: true,
    //     message: null
    // }
    let passwordRight = {
        message: null,
        code: 503, // true: 200, false: 503
    }

    function clickSubmit() {
        console.log(`http://localhost:3000/login/cellphone?phone=${enterMobilePhone}&password=${enterPassword}`)
        axios({
            method: 'get',
            url: `http://localhost:3000/login/cellphone?phone=${enterMobilePhone}&password=${enterPassword}`,
            params: {
                message: null,
                code: 502, // true: 200, false: 502
            }
        }).then(r => {
            passwordRight = r;
        }).then(() => {
            console.log(passwordRight)
            console.log(passwordRight.data.code)
            if (passwordRight.data.code === 200) {
                console.log("right!")
                window.location.href = 'http://localhost:5173/personal/'
            } else {
                alert('Wrong phone number or password')
            }
        }).then(() => {
            axios({
                method: "get",
                url: `http://localhost:3000/login/status?timestamp=${Date.now()}`,
                params: {
                    data: {
                        profile: {
                            userId: 0,
                        }
                    }
                }
            }).then((r) => {
                console.log(r)
            })
        })
    }

    return (
        <>
            <div className="numberInput" id="number">
                <input
                    type={"text"}
                    maxLength={11}
                    id={"tel"}
                    defaultValue={"Tel No."}
                    onChange={e => setEnterMobilePhone(e.target.value)}
                />

            </div>
            <div className="numberInput" id="code">
                <input
                    id="codes"
                    type="password"
                    maxLength={50}
                    min={0}
                    defaultValue={"Password"}
                    onChange={e => setEnterPassword(encodeURIComponent(e.target.value))}
                />
            </div>
            <div
                className="buttonForSubmit"
                onClick={clickSubmit}>验证码登录
            </div>
        </>
    )
}

export default function Login() {
    return (
        <div id="total">
            <img
                src={icon}
                className="images"
                alt={'icon'}
            />
            <Inbox/>
        </div>
    )
}