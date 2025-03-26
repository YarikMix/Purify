import './style.css'

import {Actions} from "@pages/state/extensionState";
import replacement from "@pages/content/aggression/replacement";
import filter from "@pages/content/aggression/filter";


try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}


const initialize = () => {
    console.log("initialize")
    chrome.runtime.sendMessage({ type: Actions.GET_STATE }, (state) => {
        console.log("state", state)
        state.aggressionFilterEnabled && filter.init()
        state.aggressionReplacementEnabled && replacement.init()
    });
}


if(document.readyState !== 'complete') {
    window.addEventListener("load", () => {
        setTimeout(() => {
            initialize()
        }, 1500)
    });
} else {
    setTimeout(() => {
        initialize()
    }, 500)
}




