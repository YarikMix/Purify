import "./style.css";

import { toggleFilterText } from "@pages/content/aggression/filter";
import { toggleReplacementText } from "@pages/content/aggression/replacement";
import { toggleFilterImages } from "@pages/content/aggression/images";

import { DEFAULT_APP_STATE, T_AppState } from "@src/types";
import { toggleSimplifyTextHotkey } from "@pages/content/simplify/hotkey";
import { toggleSimplifyTextDynamic } from "@pages/content/simplify/automatic";
import sendPageStats from "@pages/content/stats";

try {
	console.log("content script loaded");
} catch (e) {
	console.error(e);
}

const clearPageStats = () => {
	chrome.storage.sync.set<T_AppState>({
		aggressionStats: {
			wordsReplaced: 0,
			wordsAnalyzed: 0,
		},
		simplifyStats: {
			wordsReplaced: 0,
			wordsAnalyzed: 0,
		},
	});
};

const initialize = () => {
	console.log("initialize");

	clearPageStats();
	sendPageStats();

	chrome.storage.sync.get<T_AppState>(DEFAULT_APP_STATE, (state) => {
		console.log("state", state);

		if (state.aggressionEnabled) {
			state.aggressionFilterText &&
				toggleFilterText(state.aggressionFilterText);
			state.aggressionReplacementText &&
				toggleReplacementText(
					state.aggressionReplacementText,
				);
			state.aggressionFilterImages &&
				toggleFilterImages(
					state.aggressionFilterImages,
				);
		}

		if (state.simplifyEnabled) {
			if (state.simplifyDynamic) {
				toggleSimplifyTextDynamic(true);
			} else {
				toggleSimplifyTextHotkey(true);
			}
		}
	});

	chrome.storage.onChanged.addListener((state) => {
		console.log("chrome.storage.onChanged");
		console.log("state", state);

		if ("aggressionEnabled" in state) {
			if (!state.aggressionEnabled.newValue) {
				toggleFilterText(false);
				toggleReplacementText(false);
				toggleFilterImages(false);
			}
		}

		if ("aggressionFilterText" in state) {
			toggleFilterText(state.aggressionFilterText.newValue);
		}

		if ("aggressionReplacementText" in state) {
			toggleReplacementText(
				state.aggressionReplacementText.newValue,
			);
		}

		if ("simplifyEnabled" in state) {
			if (!state.simplifyEnabled.newValue) {
				toggleSimplifyTextDynamic(false);
				toggleSimplifyTextHotkey(false);
			}
		}

		if ("simplifyDynamic" in state) {
			toggleSimplifyTextDynamic(
				state.simplifyDynamic.newValue,
			);
			toggleSimplifyTextHotkey(
				!state.simplifyDynamic.newValue,
			);
		}
	});
};

if (document.readyState !== "complete") {
	window.addEventListener("load", () => {
		setTimeout(() => {
			initialize();
		}, 250);
	});
} else {
	setTimeout(() => {
		initialize();
	}, 550);
}
