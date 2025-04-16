import React, {useEffect} from "react";
import Logo from "@pages/popup/components/Logo/Logo";
import {Route, Routes} from 'react-router-dom';
import Home from "@pages/popup/pages/Home/Home";
import Aggression from "@pages/popup/pages/Aggression/Aggression";
import Simplify from "@pages/popup/pages/Simplify/Simplify";
import {FaAngry} from "react-icons/fa";
import NavItem from "@pages/popup/components/NavItem/NavItem";
import {IoSettingsSharp} from "react-icons/io5";
import {BsFeather} from "react-icons/bs";

export default function Popup() {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-sky-50 flex flex-col min-h-screen">
            <header className="flex flex-col gap-4 p-3 bg-gray-800">
                <div className="flex justify-center items-center px-4 relative">
                    <Logo/>
                </div>
                <div className="flex justify-between">
                    <NavItem path="/" label="Настройки" icon={<IoSettingsSharp fontSize={16} />} />
                    <NavItem path="/aggression" label="Агрессия" icon={<FaAngry fontSize={16} />} />
                    <NavItem path="/simplify" label="Упрощение" icon={<BsFeather fontSize={16} />} />
                </div>
            </header>
            <div className="text-slate-500 p-4 grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/simplify" element={<Simplify />}/>
                    <Route path="/aggression" element={<Aggression />} />
                </Routes>
            </div>
        </div>
    );
}
