import {useSiteDomen} from "@pages/hooks/useSiteDomen";
import React from "react";

const Settings = () => {
	const siteDomen = useSiteDomen();

	return (
		<div className="flex flex-col justify-between items-center gap-8 w-full h-full">
			<div className="grid grid-flow-row auto-cols-1 gap-4">
				<h1 className="text-stone-900 text-lg font-black">{siteDomen}</h1>
				<button
					type="button"
					className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
				>
					Приостановить на этом сайте
				</button>
			</div>
			<div className="grid grid-flow-row auto-cols-1">
				<div className="flex justify-center items-center w-full">
					<a href="https://2ch.hk/fiz/" target="_blank" rel="noreferrer">
						<span className="text-stone-900 text-base">Связаться с разработчиками</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Settings;
