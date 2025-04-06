import './style.css'

import {Actions, state} from "@pages/state/extensionState";
import replacement from "@pages/content/aggression/replacement";
import filter from "@pages/content/aggression/filter";
import images from "@pages/content/aggression/images"


try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}


const initialize = () => {
    console.log("initialize2")
    chrome.runtime.sendMessage({ type: Actions.GET_STATE }, (state) => {
        console.log("state", state)
        state.aggressionFilterEnabled && filter.init()
        // state.aggressionReplacementEnabled && replacement.init()
        images.init()
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




