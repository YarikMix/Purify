import './style.css'

import {toggleFilterText} from "@pages/content/aggression/filter";
import {toggleReplacementText} from "@pages/content/aggression/replacement";
import {toggleFilterImages} from "@pages/content/aggression/images";

import {DEFAULT_AGGRESSION_STATE, DEFAULT_APP_STATE, T_AppState} from "@src/types";
import {simplifyTextHotkeyInit} from "@pages/content/simplify/hotkey";
import {simplifyTextDynamicInit} from "@pages/content/simplify/automatic";


try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}


const initialize = () => {
    console.log("initialize")
    chrome.storage.sync.get<T_AppState>(DEFAULT_APP_STATE, (state) => {

        console.log("state", state)

        if (state.aggressionEnabled) {
            state.aggressionFilterText && toggleFilterText(state.aggressionFilterText)
            state.aggressionReplacementText && toggleReplacementText(state.aggressionReplacementText)
            state.aggressionFilterImages && toggleFilterImages(state.aggressionFilterImages)
        }

        if (state.simplifyEnabled) {
            if (state.simplifyDynamic) {
                simplifyTextDynamicInit(true)
            } else {
                simplifyTextHotkeyInit(true)
            }
        }
    });

    chrome.storage.onChanged.addListener((state) => {
        if ("aggressionFilterText" in state) {
            toggleFilterText(state.aggressionFilterText.newValue)
        }

        // if ("simplifyDynamic" in state) {
        //     simplifyTextDynamicInit(state.aggressionFilterText.newValue)
        //     simplifyTextHotkeyInit(!state.simplifyDynamic.newValue)
        // }
    });
}


if(document.readyState !== 'complete') {
    window.addEventListener("load", () => {
        setTimeout(() => {
            initialize()
        }, 250)
    });
} else {
    setTimeout(() => {
        initialize()
    }, 550)
}




