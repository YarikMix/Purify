import {useSiteDomen} from "@pages/popup/hooks/useSiteDomen";
import React from "react";
import useAppState from "@pages/popup/hooks/useAppState";

const Settings = () => {
	const [state, setState] = useAppState();

	const {siteDomen, isDomenIgnored} = useSiteDomen();

	const toggleIgnoreList = () => {
		const isDomenIgnored = state.ignoreList.includes(siteDomen);

		setState({
			ignoreList: isDomenIgnored
				? state.ignoreList.filter((domen) => domen != siteDomen)
				: [...state.ignoreList, siteDomen],
		});
	};

	if (!state) {
		return null;
	}

	return (
		<div className="flex flex-col justify-between items-center gap-8 w-full h-full">
			<div className="grid grid-flow-row auto-cols-1 gap-4">
				<h1 className="text-stone-900 text-lg font-black">{siteDomen}</h1>
			</div>
			{isDomenIgnored && (
				<div className="flex flex-1 justify-center items-center w-full h-full px-4">
					<span className="text-stone-900 text-base">
						Вы решили приостановить работу Purify на этом сайте.
					</span>
				</div>
			)}
			<div className="grid grid-flow-row auto-cols-1">
				<button
					type="button"
					className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
					onClick={toggleIgnoreList}
				>
					{isDomenIgnored ? "Возобновить на этом сайте" : "Приостановить на этом сайте"}
				</button>
				<div className="flex justify-center items-center w-full">
					<a href="https://t.me/Yaroslav738" target="_blank" rel="noreferrer">
						<span className="text-stone-900 text-base">Связаться с разработчиками</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Settings;
