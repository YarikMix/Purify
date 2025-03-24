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
        <div className="flex flex-col gap-8 w-full">
            <h1 className="text-stone-900 text-lg font-black">{siteDomen}</h1>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Фильтр мата</h1>
                    <Toggle bg="dark" />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">Использовать ИИ</span>
                        <Toggle bg="dark" />
                    </div>
                    <div className="flex justify-between items-center">
                        <a href="https://2ch.hk/fiz/" target="_blank" rel="noreferrer">
                            <span className="text-stone-900 text-base">Связаться с разработчиками</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home