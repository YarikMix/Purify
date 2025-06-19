import React from "react";
import Logo from "@pages/popup/components/Logo/Logo";
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import Stats from "@pages/popup/pages/Stats/Stats";
import Aggression from "@pages/popup/pages/Aggression/Aggression";
import Simplify from "@pages/popup/pages/Simplify/Simplify";
import {FaAngry} from "react-icons/fa";
import NavItem from "@pages/popup/components/NavItem/NavItem";
import {BsFeather} from "react-icons/bs";
import {IoIosStats, IoMdSettings} from "react-icons/io";
import Settings from "@pages/popup/pages/Settings/Settings";
import Video from "@pages/popup/pages/Video/Video";
import useAppState from "@pages/popup/hooks/useAppState";
import {useSiteDomen} from "@pages/popup/hooks/useSiteDomen";
import {FaVideo} from "react-icons/fa6";
import AgreementModal from "@pages/popup/components/AgreementModal/AgreementModal";

export default function Popup() {
	const navigate = useNavigate();

	const [state] = useAppState();

	const {isDomenIgnored} = useSiteDomen();

	if (!state) {
		return null;
	}

	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-sky-50 flex flex-col min-h-screen">
			{!state.agreement && <AgreementModal />}

			<header className="flex flex-col gap-4 p-3 bg-gray-800">
				<div className="flex justify-center items-center px-4 relative">
					<Logo />
					<button
						onClick={() => navigate("/settings")}
						className="absolute right-0 cursor-pointer rounded-full bg-blue-500 p-1 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-600 focus:shadow-none active:bg-blue-700 hover:bg-blue-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					>
						<IoMdSettings color="#F5F5F5" fontSize={20} />
					</button>
				</div>
				<div className="flex justify-between">
					<NavItem
						path="/stats"
						label="Статистика"
						icon={<IoIosStats fontSize={16} />}
						disabled={isDomenIgnored}
					/>
					<NavItem
						path="/aggression"
						label="Агрессия"
						icon={<FaAngry fontSize={16} />}
						disabled={isDomenIgnored}
					/>
					<NavItem
						path="/simplify"
						label="Упрощение"
						icon={<BsFeather fontSize={16} />}
						disabled={isDomenIgnored}
					/>
					<NavItem path="/video" label="Видео" icon={<FaVideo fontSize={16} />} disabled={isDomenIgnored} />
				</div>
			</header>
			<div className="text-slate-500 p-4 grow">
				<Routes>
					<Route path="/settings" element={<Settings />} />
					{!isDomenIgnored && <Route path="/stats" element={<Stats />} />}
					{!isDomenIgnored && <Route path="/simplify" element={<Simplify />} />}
					{!isDomenIgnored && <Route path="/aggression" element={<Aggression />} />}
					{!isDomenIgnored && <Route path="/video" element={<Video />} />}
					{!isDomenIgnored && <Route path="/settings" element={<Settings />} />}
					<Route path="*" element={<Navigate to="/settings" />} />
				</Routes>
			</div>
		</div>
	);
}
