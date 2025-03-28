import Toggle from "@pages/popup/components/Toggle/Toggle";
import {useEffect, useState} from "react";

const Home = () => {

    const [siteDomen ,setSiteDomen] = useState("")

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true },  (tabs) => {
            const tab = tabs[0];
            if (tab?.url) {
                const url = new URL(tab.url)
                const domain = url.hostname
                setSiteDomen(domain)
            }
        })
    }, [])

    return (
        <div className="flex flex-col justify-between items-center gap-8 w-full h-full">
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-stone-900 text-lg font-black">{siteDomen}</h1>
                <div className="flex justify-between items-center">
                    <h1 className="text-stone-900 text-base font-black">Использовать ИИ</h1>
                    <Toggle bg="dark"/>
                </div>
                <div className="flex justify-between items-center">
                    <a href="https://2ch.hk/fiz/" target="_blank" rel="noreferrer">
                        <span className="text-stone-900 text-base">Связаться с разработчиками</span>
                    </a>
                </div>
            </div>
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