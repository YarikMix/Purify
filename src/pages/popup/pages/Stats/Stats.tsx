import {useSiteDomen} from "@pages/hooks/useSiteDomen";
import React, {useState} from "react";
import axios from "axios";
import {API_URL} from "@src/utils/consts";
import SiteInfoSummary from "@pages/popup/components/SiteInfoSummary/SiteInfoSummary";

const Stats = () => {
	const siteDomen = useSiteDomen();

	const [stats, setStats] = useState<{
		aggressive_percent: number;
		aggitation_percent: number;
		mat_percent: number;
		bias_percent: number;
		resume: boolean;
	}>();

	// const urls: Record<string, Record<string, number>> = {
	// 	"2ch.hk": {
	// 		aggressivePercentage: 47,
	// 		agitationPercentage: 13,
	// 		obsceneLanguagePercentage: 17,
	// 		biasPercentage: 3,
	// 	},
	// 	"www.cbr.ru": {
	// 		aggressivePercentage: 228,
	// 		agitationPercentage: 228,
	// 		obsceneLanguagePercentage: 228,
	// 		biasPercentage: 228,
	// 	},
	// 	"www.woman.ru/": {
	// 		aggressivePercentage: 322,
	// 		agitationPercentage: 322,
	// 		obsceneLanguagePercentage: 322,
	// 		biasPercentage: 322,
	// 	},
	// };

	const handleEstimateSiteBtnClick = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		console.log("handleEstimateSiteBtnClick");

		const response = await axios.get(API_URL + `/analytics?url=${siteDomen}`);

		console.log(response.data);

		const {aggressive_percent, aggitation_percent, mat_percent, bias_percent} = response.data;

		setStats({
			...response.data,
			resume: aggressive_percent + aggitation_percent + mat_percent + bias_percent == 0,
		});
	};

	console.log("stats", stats);

	return (
		<div className="flex flex-col justify-between items-center gap-8 w-full h-full">
			<div className="grid grid-flow-row auto-cols-1 gap-4">
				<h1 className="text-stone-900 text-lg font-black">{siteDomen}</h1>
				<button
					type="button"
					onClick={handleEstimateSiteBtnClick}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
				>
					Оценить сайт на безопасность
				</button>
			</div>
			{stats && <SiteInfoSummary site={siteDomen} aggressive={!stats.resume} {...stats} />}
			{/*<SiteInfoSummary site={siteDomen} aggressive={false} aggressivePercentage={2} agitationPercentage={5} obsceneLanguagePercentage={1} biasPercentage={2} />*/}
		</div>
	);
};

export default Stats;
