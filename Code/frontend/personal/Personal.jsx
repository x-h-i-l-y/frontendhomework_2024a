import { useState } from "react";
import './Personal.css'
import axios from "axios";

function UpperPlacePicture() {
    return (
        <>
            <div id={"backgroundPicture"}></div>
        </>
    )
}

function BasicPersonalInformation() {
    return (
        <>
            <img src={""} alt={"avatar"} />
        </>
    )
}

function LowerPlaceShow() {

}

export default function Personal() {
    return (
        <div id={"total"}>
            <UpperPlacePicture />
            <BasicPersonalInformation />
            <LowerPlaceShow />
        </div>
    )
}