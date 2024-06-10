import {useEffect, useState} from "react";
import './Personal.css'
import axios from "axios";
import PropTypes from "prop-types";

const allStatus = {
    mainPage: 1,
    move: 2, // 动态
    video: 3,
    podcast: 4
}
let userId
// let playlists


console.log("1st start")


function UpperPlacePicture() {
    return (
        <>
            <div id={"backgroundPicture"}></div>
        </>
    )
}

function BasicPersonalInformation(props) {
    console.log(`In BasicPersonalInformation function, the playlists = ${props.playlist}`)
    console.log("In this place, playlists = " + props.playlist)
    // console.log(playlists.data.profile.nickname)
    return (
        <div id={"personalInformation"}>
            <img src={props.playlist.data.profile.avatarUrl} alt={"avatar"} id={"avatar"}></img>
            <div id={"name"}>{props.playlist.data.profile.nickname}</div>
            <div id={"information"}>
                <div id={"subscribe"}>{props.playlist.data.profile.follows}</div>
                <div>&ensp;Follow&emsp;|&emsp;</div>
                <div id={"fans"}>{props.playlist.data.profile.followeds}</div>
                <div>&ensp;Followers&emsp;|&emsp;Lv.</div>
                <div id={"level"}>{props.playlist.data.level}</div>
            </div>
            <div id={"editInformationButton"}>Edit profile</div>
        </div>
    )
}

BasicPersonalInformation.propTypes = {
    playlist: PropTypes.object.isRequired,
}

function ChooseBox({status, setStatus}) {
    function clickMainPage() {
        setStatus(allStatus.mainPage)
    }

    function clickMove() {
        setStatus(allStatus.move)
    }

    function clickVideo() {
        setStatus(allStatus.video)
    }

    function clickPodcast() {
        setStatus(allStatus.podcast)
    }

    return (
        <div id={"button"}>
            <div className={"buttons" + ((status === allStatus.mainPage) ? " clicked" : "")} id={'mainPage'}
                 onClick={clickMainPage}>主页
            </div>
            <div className={"buttons" + ((status === allStatus.move) ? " clicked" : "")} id={'dongtai'}
                 onClick={clickMove}>动态
            </div>
            <div className={"buttons" + ((status === allStatus.video) ? " clicked" : "")} id={'video'}
                 onClick={clickVideo}>视频
            </div>
            <div className={"buttons" + ((status === allStatus.podcast) ? " clicked" : "")} id={'podcast'}
                 onClick={clickPodcast}>播客
            </div>
        </div>
    )
}

ChooseBox.propTypes = {
    status: PropTypes.number.isRequired,
    setStatus: PropTypes.func.isRequired
}

function LowerBoxes(props) {
    if (props.status === allStatus.mainPage) {
        if (props.playlist.data.playlist.length > 0) {
            return (
                <div className={"underShow"}>
                    <div id={"firstPart"}>
                        <div id={"taste"}>Music taste</div>
                        <div id={"boxes"}>
                            <div className={"box"} id={"myFavourite"}>
                                <div className={"smallWordInBox"}>My Favourite</div>
                                <div className={"bigWordsInBox"}>
                                    <div className={"bigWordInBox"} id={"numbersFavourite"}>
                                        {
                                            props.playlist.data.playlist[0].trackCount
                                        }</div>
                                    <div className={"bigWordInBox"}>&nbsp;Songs</div>
                                </div>
                            </div>
                            <div className={"box"} id={"played"}>
                                <div className={"smallWordInBox"}>Total listened</div>
                                <div className={"bigWordsInBox"}>
                                    <div className={"bigWordInBox"}>{props.basicInformation.data.listenSongs}</div>
                                    <div className={"bigWordInBox"}>&nbsp;Songs</div>
                                </div>
                            </div>
                            <div className={"box"} id={"keyWord"}>
                                <div className={"smallWordInBox"}>Key words</div>
                                <div className={"bigWordsInBox"}>
                                    <div className={"bigWordInBox"}>{props.timerMessage}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={"playLists"}>
                        <div id={"createPlaylist"}>
                            <div className={"playlistBig"}>Playlists Created</div>
                            <div className={"playlistSmall"}>(</div>
                            <div className={"playlistSmall"} id={"words"}>{props.playlist.data.playlist.length}</div>
                            <div className={"playlistSmall"}>)</div>
                        </div>

                        <div className={"playList"}>
                            {props.playlist.data.playlist.map(playlistOneItem => (
                                <div className={"oneItem"} key={playlistOneItem.id}>
                                    <img src={playlistOneItem.coverImgUrl} alt={"Cover"} className={"playlistPicture"}/>
                                    <div className={"rightInformation"}>
                                        <div className={"playlistName"}>{playlistOneItem.name}</div>
                                        <div className={"smallerWords"}>
                                            <div className={"trackCount smallerWord"}>{playlistOneItem.trackCount}</div>
                                            <div className={"smallerWord"}>&nbsp;Songs, played&nbsp;</div>
                                            <div className={"playCount, smallerWord"}>{playlistOneItem.playCount}</div>
                                            <div className={"smallerWord"}>&nbsp;times</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={"underShow"}>
                    <div id={"firstPart"}>
                        <div id={"taste"}>Music taste</div>
                        <div id={"boxes"}>
                            <div className={"box"} id={"myFavourite"}>
                                <div className={"smallWordInBox"}>My Favourite</div>
                                <div className={"bigWordsInBox"}>
                                    <div className={"bigWordInBox"} id={"numbersFavourite"}>
                                        --
                                    </div>
                                    <div className={"bigWordInBox"}>&nbsp;Songs</div>
                                </div>
                            </div>
                            <div className={"box"} id={"played"}>
                                <div className={"smallWordInBox"}>Total listened</div>
                                <div className={"bigWordsInBox"}>
                                    <div className={"bigWordInBox"}>{props.basicInformation.data.listenSongs}</div>
                                    <div className={"bigWordInBox"}>&nbsp;Songs</div>
                                </div>
                            </div>
                            <div className={"box"} id={"keyWord"}>
                                <div className={"smallWordInBox"}>Key words</div>
                                <div className={"bigWordsInBox"}>
                                    <div className={"bigWordInBox"}>{props.timerMessage}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={"playLists"}>
                        <div id={"createPlaylist"}>
                            <div className={"playlistBig"}>Playlists Created</div>
                            <div className={"playlistSmall"}>(</div>
                            <div className={"playlistSmall"} id={"words"}>{props.playlist.data.playlist.length}</div>
                            <div className={"playlistSmall"}>)</div>
                        </div>

                        <div className={"playList"}>
                            {props.playlist.data.playlist.map(playlistOneItem => (
                                <div className={"oneItem"} key={playlistOneItem.id}>
                                    <img src={playlistOneItem.coverImgUrl} alt={"Cover"} className={"playlistPicture"}/>
                                    <div className={"rightInformation"}>
                                        <div className={"playlistName"}>{playlistOneItem.name}</div>
                                        <div className={"smallerWords"}>
                                            <div className={"trackCount smallerWord"}>{playlistOneItem.trackCount}</div>
                                            <div className={"smallerWord"}>&nbsp;Songs, played&nbsp;</div>
                                            <div className={"playCount, smallerWord"}>{playlistOneItem.playCount}</div>
                                            <div className={"smallerWord"}>&nbsp;times</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className={"underShow"}>
                <div id={"firstPart"}>
                    <div id={"taste"}>Sorry, I didn&apos;t make it temporarily...</div>
                </div>
            </div>
        )
    }
}

LowerBoxes.propTypes = {
    status: PropTypes.number.isRequired,
    playlist: PropTypes.object.isRequired,
    basicInformation: PropTypes.object.isRequired,
    timerMessage: PropTypes.string.isRequired,
}

function LowerPlaceShow(props) {

    return (
        <div id={"lower"}>
            <ChooseBox status={props.status} setStatus={props.setStatus}/>
            <LowerBoxes
                status={props.status}
                playlist={props.playlist}
                basicInformation={props.basicInformation}
                timerMessage={props.timerMessage}
            />
        </div>
    )
}


LowerPlaceShow.propTypes = {
    status: PropTypes.number.isRequired,
    setStatus: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    basicInformation: PropTypes.object.isRequired,
    timerMessage: PropTypes.string.isRequired
}

export default function Personal() {
    const [status, setStatus] = useState(allStatus.mainPage)
    const [basicInformation, setBasicInformation] = useState({})
    const [loading, setLoading] = useState(true)
    const [playlist, setPlaylist] = useState([])
    const [timerMessage, setTimerMessage] = useState("")
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:3000/login/status`,
            params: {
                data: {
                    profile: {
                        userId: 0,
                    }
                }
            }
        }).then((r) => {
            // http://localhost:3000/user/detail?uid=8828389348
            console.log("--------------------------")
            console.log(`http://localhost:3000/login/status`)
            console.log("--------------------------")
            console.log(r.data.data)
            console.log("--------------------------")
            // if (r.data.data.profile !== null) {
                userId = r.data.data.profile.userId
                console.log("1st end")
            // } else {
            //     axios({
            //         method: "get",
            //         url: `http://localhost:3000/logout?timestamp=${Date.now()}`,
            //         params: {
            //             level: 0,
            //             listenSongs: 0,
            //             profile: {
            //                 followed: false,
            //                 follows: false,
            //             }
            //         }
            //     }).then(() => {
            //         alert("You don't sign in...")
            //     })
            //     // window.location.href = 'http://localhost:5173/login/'
            // }
        }).then(() => {
            axios({
                method: "get",
                url: `http://localhost:3000/user/detail?uid=${userId}&timestamp=${Date.now()}`,
                params: {
                    level: 0,
                    listenSongs: 0,
                    profile: {
                        followeds: 0,
                        follows: 0,
                        nickname: "",
                        avatarUrl: ""
                    }
                }
            }).then(r => {
                console.log("2nd start")
                console.log(r)
                // playlists = r
                setBasicInformation(r)
                console.log(`playlist.data.profile.nickname = ${basicInformation.data.profile.nickname}`)
                console.log("2nd end")
            }).then(() => {
                axios({
                    method: "get",
                    url: `http://localhost:3000/user/playlist?uid=${userId}&timestamp=${Date.now()}`,
                    params: {
                        playlist: [
                            {
                                name: "",
                                id: 0,
                                coverImgUrl: "",
                                trackCount: 0,
                                playCount: 0
                            }
                        ]
                    }
                }).then(r => {
                    setPlaylist(r)
                    console.log(r)
                    setLoading(false)
                })
            })


        })
        axios({
            method: "get",
            url: `http://localhost:3000/vip/timemachine?timestamp=${Date.now()}`,
            params: {
                message: ""
            }
        }).then(r => setTimerMessage(r.data.message))
    }, [basicInformation]);

    // setTimeout(() => {
    console.log("Run this")
    console.log(basicInformation)
    if (loading) {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <div id={"total"}>
                <UpperPlacePicture/>
                <BasicPersonalInformation playlist={basicInformation}/>
                <LowerPlaceShow
                    status={status}
                    setStatus={setStatus}
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                    basicInformation={basicInformation}
                    timerMessage={timerMessage}
                />
            </div>
        </>
    )
    // }, 500)
}

