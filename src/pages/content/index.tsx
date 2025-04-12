import './style.css'

import {toggleFilterText} from "@pages/content/aggression/filter";
import {toggleReplacementText} from "@pages/content/aggression/replacement";
import {toggleFilterImages} from "@pages/content/aggression/images";

import {T_AppState} from "@src/types";
import {simplifyTextInit} from "@pages/content/simplify/hotkey";


try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}


const initialize = () => {
    console.log("aggression initialized")
    chrome.storage.sync.get<T_AppState>(["aggressionEnabled", "aggressionFilterText", "aggressionFilterImages", "aggressionReplacementText", "aggressionShowOriginalText"], (state) => {
        if (state.aggressionEnabled) {
            // state.aggressionFilterText && toggleFilterText(state.aggressionFilterText)
            // state.aggressionReplacementText && toggleReplacementText(state.aggressionReplacementText)
            // state.aggressionFilterImages && toggleFilterImages(state.aggressionFilterImages)
            // simplifyTextInit()
        }
    });

    chrome.storage.onChanged.addListener((state) => {
        if ("aggressionFilterText" in state) {
            toggleFilterText(state.aggressionFilterText.newValue)
        }
    });
}


if(document.readyState !== 'complete') {
    window.addEventListener("load", () => {
        setTimeout(() => {
            initialize()
        }, 250)
    });
} else {
    initialize()
}




