import {useEffect, useState} from "react";
import {T_AppState} from "@src/utils/types";
import {DEFAULT_APP_STATE} from "@src/utils/state";

const useAppState = (): [T_AppState, (state: Partial<T_AppState>) => void] => {
	const [localState, setLocalState] = useState<T_AppState>(null);

	const syncState = () => {
		chrome.storage.sync.get<T_AppState>(DEFAULT_APP_STATE, (state) => {
			setLocalState(state);
		});
	};

	useEffect(() => {
		syncState();

		chrome.storage.onChanged.addListener(() => {
			syncState();
		});
	}, []);

	const setGlobalState = (state: Partial<T_AppState>) => {
		chrome.storage.sync.set<Partial<T_AppState>>(state);
	};

	return [localState, setGlobalState];
};

export default useAppState;
