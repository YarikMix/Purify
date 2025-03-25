import {createRoot} from "react-dom/client";
import ContentScript from "@pages/content/ContentScript";
import {ReactNode} from "react";
import './style.css'

import {state, updateState} from "@pages/state/extensionState";
import {analyzeAggression} from "@pages/content/aggression";
import hotkeys from "hotkeys-js";
import axios from "axios";
import highlight from "@pages/content/neutralization/highlitght";

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

    return {
        title: 'blue',
        color: 'rgb(66, 229, 255)',
        textColor: 'rgb(255, 255, 255)',
    }
}

const analyzePreconception = () => {

}

hotkeys('g', async (e) => {
    e.preventDefault()

    console.log("hotkey press")

    const selection = window.getSelection();

    if (!selection?.focusNode?.textContent) {
        return
    }

    const text = selection.toString()

    const response = await axios.post('http://127.0.0.1:8080/api/v1/replace', {
        text: text,
        preconception: true,
        agitation: true
    })

    console.log(response.data)


    // response.data.response.map(item => {
    //     if (item.state == 2 || item.state == 1) {
    //         processText(parent, item.text, start, end)
    //     }
    // })

    const start = selection.focusNode.textContent.indexOf(text);
    const end = text.length + start;

    const parent = selection.focusNode.parentElement as HTMLElement

    response.data.blocks.forEach(block => {
        console.log("block", block)

        block.result.forEach(item => {
            console.log("item", item)

            processText(parent, item.from, item.to, start, end)
        })
    })
});


const processText = (root=document.body, from, to, start, end) => {
    console.log("processText")
    console.log("from", from)
    console.log("to", to)

    // Find all text nodes in the article. We'll search within
    // these text nodes.
    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    // Iterate over all text nodes and find matches.
    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent };
        })
        .map(({ text, el }) => {
            console.log("text", text)
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(from, startPos);
                console.log("index", index)
                if (index === -1) break;
                if (index >= start && index <= end) {
                    indices.push(index);
                }
                startPos = index + from.length;
            }

            // Create a range object for each instance of
            // str we found in the text node.
            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + from.length);
                return range;
            });
        });

    processRange(ranges, from, to)
}

const processRange = (range, from, to) => {
    if (Array.isArray(range)) {
        range.forEach(r => processRange(r, from, to))
        return
    }

    // TODO
    // if (!range.length) {
    //     return;
    // }

    let container = range.commonAncestorContainer as HTMLElement;

    while (!container.innerHTML) {
        container = container.parentNode as HTMLElement;
    }

    const selection = window.getSelection();
    const r = document.createRange();
    r.selectNodeContents(container);
    r.setStart(range.commonAncestorContainer, range.startOffset)
    r.setEnd(range.commonAncestorContainer, range.endOffset)
    selection.removeAllRanges();
    selection.addRange(r);

    const color = getCurrentColor()

    console.log("create")
    const selectionString = selection.toString();
    if (selectionString)
        highlight(from, to, container, selection, color.color, color.textColor);
}

const initialize = () => {
    state.aggressionFilterEnabled && analyzeAggression()
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




