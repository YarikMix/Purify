import { Actions, state } from "../state/extensionState";

chrome.runtime.onInstalled.addListener(() => {
	if (!chrome.runtime.lastError) {
		chrome.storage.local.set(state);

		chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
			if (message.type === Actions.GET_STATE) {
				sendResponse(state);
			}

			if (message.type === Actions.SET_STATE) {
				Object.assign(state, message.payload);
				chrome.storage.local.set(state);
			}
		});
	}
});