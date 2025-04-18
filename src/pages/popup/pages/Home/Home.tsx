import Toggle from "@pages/popup/components/Toggle/Toggle";
import {useEffect, useState} from "react";
import SiteInfoSummary from "@pages/popup/components/SiteInfoSummary/SiteInfoSummary";
import {useSiteDomen} from "@pages/hooks/useSiteDomen";

const Home = () => {

    const siteDomen = useSiteDomen()

    return (
        <div className="flex flex-col justify-between items-center gap-8 w-full h-full">
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-stone-900 text-lg font-black">{siteDomen}</h1>
                <div className="flex justify-center items-center w-full">
                    <a href="https://2ch.hk/fiz/" target="_blank" rel="noreferrer">
                        <span className="text-stone-900 text-base">Связаться с разработчиками</span>
                    </a>
                </div>
            </div>
            <SiteInfoSummary site={siteDomen} aggressive={true} aggressivePercentage={47} agitationPercentage={13} obsceneLanguagePercentage={17} biasPercentage={3} />
            {/*<SiteInfoSummary site={siteDomen} aggressive={false} aggressivePercentage={2} agitationPercentage={5} obsceneLanguagePercentage={1} biasPercentage={2} />*/}
            <div className="grid grid-flow-row auto-cols-1">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer">
                    Оценить сайт на безопасность
                </button>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer">
                    Приостановить на этом сайте
                </button>
            </div>
        </div>
    )
}

export default Home