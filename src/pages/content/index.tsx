import {createRoot} from "react-dom/client";
import ContentScript from "@pages/content/ContentScript";
import {ReactNode} from "react";
import './style.css'

import {updateState} from "@pages/state/extensionState";
import {analyzeAggression} from "@pages/content/aggression";

const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

export const showTooltip = (id) => {
    console.log("showTooltip")
    console.log("id", id)
    updateState({
        selectedHighlightId: id,
        showTooltip: true
    })
}

export const hideTooltip = () => {
    console.log("hideTooltip")
    updateState({
        selectedHighlightId: null,
        showTooltip: false
    })
}

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(
  <ContentScript /> as ReactNode
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}



export const DEFAULT_COLOR_TITLE = "dark";
export const DEFAULT_COLORS = [
    {
        title: 'yellow',
        color: 'rgb(255, 246, 21)',
    },
    {
        title: 'green',
        color: 'rgb(68, 255, 147)',
    },
    {
        title: 'blue',
        color: 'rgb(66, 229, 255)',
    },
    {
        title: 'pink',
        color: 'rgb(244, 151, 255)',
    },
    {
        title: 'dark',
        color: 'rgb(52, 73, 94)',
        textColor: 'rgb(255, 255, 255)',
    },
];


function getCurrentColor() {
    console.log("getCurrentColor")
    const colorTitle = DEFAULT_COLOR_TITLE;
    const colorOptions = DEFAULT_COLORS;
    return colorOptions.find((colorOption) => colorOption.title === colorTitle) || colorOptions[0];
}

const analyzePreconception = () => {

}

// const processText = (root=document.body, str="форумов", start, end) => {
//     // Find all text nodes in the article. We'll search within
//     // these text nodes.
//     const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
//     const allTextNodes = [];
//     let currentNode = treeWalker.nextNode();
//     while (currentNode) {
//         allTextNodes.push(currentNode);
//         currentNode = treeWalker.nextNode();
//     }
//
//     // Iterate over all text nodes and find matches.
//     const ranges = allTextNodes
//         .map((el) => {
//             return { el, text: el.textContent };
//         })
//         .map(({ text, el }) => {
//             const indices = [];
//             let startPos = 0;
//             while (startPos < text.length) {
//                 const index = text.indexOf(str, startPos);
//                 console.log("index", index)
//                 if (index === -1) break;
//                 if (index >= start && index <= end) {
//                     indices.push(index);
//                 }
//                 startPos = index + str.length;
//             }
//
//             // Create a range object for each instance of
//             // str we found in the text node.
//             return indices.map((index) => {
//                 const range = new Range();
//                 range.setStart(el, index);
//                 range.setEnd(el, index + str.length);
//                 return range;
//             });
//         });
//
//     processRange(ranges)
// }

// hotkeys('g', async (e) => {
//     e.preventDefault()
//
//     console.log("hotkey press")
//
//     const selection = window.getSelection();
//
//     if (!selection?.focusNode?.textContent) {
//         return
//     }
//
//     const text = selection.toString()
//
//     const response = await axios.post('http://127.0.0.1:8080/api/v1/analyze_text', {
//         "text": text
//     })
//
//     console.log(response.data)
//
//     const start = selection.focusNode.textContent.indexOf(text);
//     const end = text.length + start;
//
//     const parent = selection.focusNode.parentElement as HTMLElement
//
//     response.data.response.map(item => {
//         if (item.state == 2 || item.state == 1) {
//             processText(parent, item.text, start, end)
//         }
//     })
//
//     processText(parent, text, start, end)
// });


// hotkeys('y', async (e) => {
//     e.preventDefault()
//
//     console.log("hotkey press")
//
//     const selection = window.getSelection();
//
//     if (!selection?.focusNode?.textContent) {
//         return
//     }
//
//     const text = selection.toString()
//
//     const response = await axios.post('http://127.0.0.1:8080/api/v1/replace', {
//         text: text,
//         preconception: true,
//         agitation: true
//     })
//
//     console.log(response.data)
//
//     // const start = selection.focusNode.textContent.indexOf(text);
//     // const end = text.length + start;
//     //
//     // const parent = selection.focusNode.parentElement as HTMLElement
//     //
//     // response.data.response.map(item => {
//     //     if (item.state == 2 || item.state == 1) {
//     //         processText(parent, item.text, start, end)
//     //     }
//     // })
//     //
//     // processText(parent, text, start, end)
// });


const initialize = () => {
    analyzeAggression()
    analyzePreconception()
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




