import {IoSettingsSharp} from "react-icons/io5";
import React from "react";
import {useNavigate} from "react-router-dom";

const SettingsButton = () => {
    const navigate = useNavigate()

    return <IoSettingsSharp fontSize={24} className="cursor-pointer text-white" onClick={() => navigate("/")}/>
}

export default SettingsButton