import {NavLink} from "react-router-dom";
import React from "react";

type Props = {
    path: string
    label: string
    icon: React.ReactNode
}

const NavItem = ({path, label, icon}:Props) => {
    return (
        <NavLink to={path} className={({ isActive }) => [
            "flex flex-col items-center text-base",
            "px-2 py-2.5",
            "hover:bg-cprimary-300 hover:text-csecond-100",
            "rounded-md transition",
            "cursor-pointer",
            isActive ? "text-white" : "text-gray-600",
            isActive && "bg-blue-500"
        ].join(" ")}>
            {icon}
            <span>{label}</span>
        </NavLink>
    )
}

export default NavItem