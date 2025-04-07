import {useEffect, useState} from "react";

export const useSiteDomen = () => {
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

    return siteDomen
}