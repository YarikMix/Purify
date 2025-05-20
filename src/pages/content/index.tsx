import "./style.css";

import {toggleFilterText} from "@pages/content/aggression/filter";
import {toggleReplacementText} from "@pages/content/aggression/replacement";
import {toggleFilterImages} from "@pages/content/aggression/images";

import {T_AppState} from "@src/utils/types";
import {toggleSimplifyTextHotkey} from "@pages/content/simplify/hotkey";
import {toggleSimplifyTextDynamic} from "@pages/content/simplify/automatic";
import {DEFAULT_APP_STATE} from "@src/utils/state";
import {isDomenIgnored, updateAppState} from "@pages/content/utils";
import {toggleAnalyzeVideo} from "@pages/content/video";

try {
	console.log("content script loaded");
} catch (e) {
	console.error(e);
}

const resetPageState = () => {
	chrome.storage.sync.set<T_AppState>({
		aggressionStats: {
			wordsReplaced: 0,
			wordsAnalyzed: 0,
		},
		simplifyStats: {
			wordsReplaced: 0,
			wordsAnalyzed: 0,
		},
		aggressionQueue: {
			sended: 0,
			processed: 0,
		},
		simplifyQueue: {
			sended: 0,
			processed: 0,
		},
		simplifyProcessing: false,
	});
};

const initialize = () => {
	console.log("initialize");

	resetPageState();

	chrome.storage.sync.get<T_AppState>(DEFAULT_APP_STATE, (state) => {
		if (isDomenIgnored(state)) {
			return;
		}

		if (state.aggressionEnabled) {
			state.aggressionFilterText && toggleFilterText(state.aggressionFilterText);
			state.aggressionReplacementText && toggleReplacementText(state.aggressionReplacementText);
			state.aggressionFilterImages && toggleFilterImages(state.aggressionFilterImages);
		}

		if (state.simplifyEnabled) {
			if (state.simplifyDynamic) {
				toggleSimplifyTextDynamic(true);
			} else {
				toggleSimplifyTextHotkey(true);
			}
		}

		if (state.videoEnabled) {
			toggleAnalyzeVideo(state.videoEnabled);
		}
	});

	chrome.storage.onChanged.addListener((state) => {
		if ("ignoreList" in state && state.ignoreList.newValue.includes(location.hostname)) {
			updateAppState({
				aggressionEnabled: false,
				aggressionFilterText: false,
				aggressionReplacementText: false,
				aggressionFilterImages: false,
				aggressionShowOriginalText: false,
				aggressionStats: {
					wordsReplaced: 0,
					wordsAnalyzed: 0,
				},
				aggressionQueue: {
					sended: 0,
					processed: 0,
				},
				simplifyEnabled: false,
				simplifyDynamic: false,
				simplifyProcessing: false,
				simplifyStats: {
					wordsReplaced: 0,
					wordsAnalyzed: 0,
				},
				simplifyQueue: {
					sended: 0,
					processed: 0,
				},
				videoEnabled: false,
			});

			return;
		}

		if ("aggressionEnabled" in state) {
			if (!state.aggressionEnabled.newValue) {
				toggleFilterText(false);
				toggleReplacementText(false);
				toggleFilterImages(false);
			} else {
				chrome.storage.sync.set({
					simplifyEnabled: false,
					simplifyDynamic: false,
					simplifyProcessing: false,
				});
			}
		}

		if ("aggressionFilterText" in state) {
			toggleFilterText(state.aggressionFilterText.newValue);
		}

		if ("aggressionReplacementText" in state) {
			toggleReplacementText(state.aggressionReplacementText.newValue);
		}

		if ("simplifyEnabled" in state) {
			if (!state.simplifyEnabled.newValue) {
				toggleSimplifyTextDynamic(false);
				toggleSimplifyTextHotkey(false);
			} else {
				chrome.storage.sync.set({
					aggressionEnabled: false,
					aggressionFilterText: false,
					aggressionReplacementText: false,
					aggressionShowOriginalText: false,
				});
			}
		}

		if ("simplifyDynamic" in state) {
			toggleSimplifyTextDynamic(state.simplifyDynamic.newValue);
			toggleSimplifyTextHotkey(!state.simplifyDynamic.newValue);
		}
	});
};

// if (document.readyState !== "complete") {
// 	window.addEventListener("load", () => {
// 		setTimeout(() => {
// 			initialize();
// 		}, 250);
// 	});
// } else {
// 	setTimeout(() => {
// 		initialize();
// 	}, 550);
// }

initialize();
