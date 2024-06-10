import './editProfile.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

function dateToString(data) {
    let date = new Date(data);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function numberToGender(num) {
    switch (num) {
        case 1:
            return 'Male'
        case 2:
            return 'Female'
        default:
            return 'Secret'
    }
}

function HeadPart() {
    return (
        <div id={"head"}>
            <img src={'../image/left-arrow.svg'} alt="left-arrow" id={"leftArrow"} onClick={() => {
                window.location.href = 'http://localhost:5173/Personal/'
            }}/>
            <div id={"wordsInHead"}>My profile</div>
        </div>
    )
}

function PersonalInformation(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [nickname, setNickname] = useState('')
    const [gender, setGender] = useState(0)
    const [birthday, setBirthday] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')

    function setOnclick() {
        alert(`http://localhost:3000://user/update?gender=${gender}&signature=${description}&city=${city}&nickname=${nickname}&birthday=${birthday}&province=${province}`)
        setIsEditing(false)
    }

    if (!isEditing) {
        return (
            <>
                <div className={'Middle'}></div>
                <div id={'secondPart'}>
                    <div className={"list"} id={"avatarList"}>
                        <div className={"leftPart"}>Avatar</div>
                        <img className={"rightPart"}
                             alt={""}
                             src={props.userInformation.data.data.profile.avatarUrl}
                             onClick={() => setIsEditing(true)}></img>
                    </div>
                    <div className={"list"} id={"nicknameList"}>
                        <div className={"leftPart"}>Nickname</div>
                        <div className={"rightPart"}
                             onClick={() => setIsEditing(true)}>{props.userInformation.data.data.profile.nickname}</div>
                    </div>
                    <div className={"list"} id={"gender"}>
                        <div className={"leftPart"}>Gender</div>
                        <div
                            className={"rightPart"}
                            onClick={() => setIsEditing(true)}>{numberToGender(props.userInformation.data.data.profile.gender)}</div>
                    </div>
                </div>
                <div className={'Middle'}></div>
                <div id={"thirdPart"}>
                    <div className={"list"} id={"birthdayList"}>
                        <div className={"leftPart"}>Birthday</div>
                        <div
                            className={"rightPart"}
                            onClick={() => setIsEditing(true)}>{dateToString(props.userInformation.data.data.profile.birthday)}</div>
                    </div>
                    <div className={"list"} id={"placeList"}>
                        <div className={"leftPart"}>Place</div>
                        <div className={"rightPart"}
                             onClick={() => setIsEditing(true)}>{props.userInformation.data.data.profile.city}</div>
                    </div>
                    <div className={"list"} id={"universityList"}>
                        <div className={"leftPart"}>University</div>
                        <div className={"rightPart"}
                             onClick={() => setIsEditing(true)}>Sorry, we don&apos;t support this temporarily...
                        </div>
                    </div>
                    <div className={"list"} id={"descriptionList"}>
                        <div className={"leftPart"}>Description</div>
                        <div className={"rightPart"}
                             onClick={() => setIsEditing(true)}>{props.userInformation.data.data.profile.signature}</div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={'Middle'}></div>
                <div id={'secondPart'}>
                    <div className={"list"} id={"avatarList"}>
                        <div className={"leftPart"}>Avatar</div>
                        <img className={"rightPart"} alt={""}></img>
                    </div>
                    <div className={"list"} id={"nicknameList"}>
                        <div className={"leftPart"}>Nickname</div>
                        {/*<div className={"rightPart"}>d</div>*/}
                        <input className={"rightPart"}
                               type="text"
                               name={'nickname'}
                               onChange={e => setNickname(e.target.value)} value={nickname}/>
                    </div>
                    <div className={"list"} id={"gender"}>
                        <div className={"leftPart"}>Gender</div>
                        {/*<div className={"rightPart"}></div>*/}
                        <select name={'gender'} id={'gender'} className={"rightPart"} onChange={e => {
                            switch (e.target.value) {
                                case 'Male':
                                    setGender(1)
                                    break
                                case 'Female':
                                    setGender(2)
                                    break
                                default:
                                    setGender(0)
                            }
                        }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Secret">Secret</option>
                        </select>
                    </div>
                </div>
                <div className={'Middle'}></div>
                <div id={"thirdPart"}>
                    <div className={"list"} id={"birthdayList"}>
                        <div className={"leftPart"}>Birthday</div>
                        {/*<div className={"rightPart"}></div>*/}
                        <input type={"date"} className={"rightPart"} name={'birthday'}
                               onChange={e => setBirthday(e.target.value)} value={birthday}/>
                    </div>
                    <div className={"list"} id={"placeList"}>
                        <div className={"leftPart"}>Place</div>
                        <div className={"rightPart"}>Sorry, we don&apos;t support</div>
                    </div>
                    <div className={"list"} id={"universityList"}>
                        <div className={"leftPart"}>University</div>
                        <div className={"rightPart"}> edit it temporarily</div>
                    </div>
                    <div className={"list"} id={"descriptionList"}>
                        <div className={"leftPart"}>Description</div>
                        {/*<div className={"rightPart"}></div>*/}
                        <textarea defaultValue={"Enter the description"} cols={30} rows={10}
                                  onChange={event => setDescription(event.target.value)} value={description}></textarea>
                    </div>
                </div>
                <div id={"submitButton"} onClick={setOnclick}>Submit</div>
            </>
        )
    }

}

PersonalInformation.propTypes = {
    userInformation: PropTypes.object.isRequired,
}

export default function EditProfile() {
    const [isLoading, setIsLoading] = useState(true)
    const [userInformaton, setUserInformaton] = useState({})
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:3000/login/status?timestamp=${Date.now()}`,
            params: {
                data: {
                    profile: {
                        userId: 0,
                        avatarUrl: '',
                        birthday: 0,
                        gender: 0,
                        signature: '',
                        province: 0,
                        city: 0,
                    }
                }
            }
        }).then((r) => {
            // http://localhost:3000/user/detail?uid=8828389348
            console.log(r)
            console.log(r.data)
            console.log("1st end")
            setIsLoading(false)
            setUserInformaton(r)
        })
    }, [])
    if (isLoading) {
        return (
            <div id={"total"}>

            </div>
        )
    }
    return (
        <div id={"total"}>
            <HeadPart/>
            <PersonalInformation
                userInformation={userInformaton}
            />
        </div>
    )
}