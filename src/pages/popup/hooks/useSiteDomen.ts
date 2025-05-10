import {useEffect, useState} from "react";
import useAppState from "@pages/popup/hooks/useAppState";

type Return_Type = {
	siteDomen: string;
	isDomenIgnored: boolean;
};

export const useSiteDomen = (): Return_Type => {
	const [state] = useAppState();

	const [siteDomen, setSiteDomen] = useState("");

	useEffect(() => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			const tab = tabs[0];
			if (tab?.url) {
				const url = new URL(tab.url);
				const domain = url.hostname;
				setSiteDomen(domain);
			}
		});
	}, []);

	const isDomenIgnored = state?.ignoreList?.includes(siteDomen) || false;

	return {siteDomen, isDomenIgnored};
};
