import React from "react";
import Logo from "@pages/popup/components/Logo/Logo";
import {Route, Routes} from 'react-router-dom';
import Home from "@pages/popup/pages/Home/Home";
import Aggression from "@pages/popup/pages/Aggression/Aggression";
import Simplify from "@pages/popup/pages/Simplify/Simplify";
import Preconception from "@pages/popup/pages/Preconception/Preconception";
import {PiWrenchFill} from "react-icons/pi";
import {FaAngry} from "react-icons/fa";
import {FaEye} from "react-icons/fa6";
import ToggleAppEnabled from "@pages/popup/components/ToggleAppEnabled/ToggleAppEnabled";
import NavItem from "@pages/popup/components/NavItem/NavItem";
import SettingsButton from "@pages/popup/components/SettingsButton/SettingsButton";

export default function Popup() {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-sky-50">
            <header className="flex flex-col gap-4 p-3 bg-gray-800">
                <div className="flex justify-between items-center px-4">
                    <ToggleAppEnabled />
                    <Logo/>
                    <SettingsButton />
                </div>
                <div className="flex justify-between">
                    <NavItem path="/simplify" label="Упростить" icon={<PiWrenchFill fontSize={16} />} />
                    <NavItem path="/aggression" label="Агрессия" icon={<FaAngry fontSize={16} />} />
                    <NavItem path="/preconception" label="Предвзятость" icon={<FaEye fontSize={16} />} />
                </div>
            </header>
            <div className="text-slate-500 p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/simplify" element={<Simplify />}/>
                    <Route path="/aggression" element={<Aggression />} />
                    <Route path="/preconception" element={<Preconception />} />
                </Routes>
            </div>
        </div>
    );
}
