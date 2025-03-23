import {createRoot} from "react-dom/client";
import ContentScript from "@pages/content/ContentScript";
import {ReactNode} from "react";
import './style.css'

const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

export const showTooltip = (id) => {
    console.log("test")
    console.log("id", id)
    updateState({
        selectedHighlightId: id,
        showTooltip: true
    })
}

export const hideTooltip = () => {
    console.log("test")
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

import hotkeys from "hotkeys-js";
import highlight from "@pages/content/highlight/highlight/highlight";
import {updateState} from "@pages/state/extensionState";
import axios from "axios";


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

async function create(color, selection = window.getSelection()) {
    console.log("create")
    const selectionString = selection.toString();
    if (!selectionString) return;

    let container = selection.getRangeAt(0).commonAncestorContainer as HTMLElement;

    while (!container.innerHTML) {
        container = container.parentNode as HTMLElement;
    }

    const response = await axios.post('http://127.0.0.1:8080/api/v1/analyze_text', {
        "text": selectionString
    })

    console.log(response.data)

    response.data.response.map(item => {
        if (item.state == 2 || item.state == 1) {
            console.log("highlight")
            highlight(item.text, container, selection, color.color, color.textColor);
        }
    })


}

const analyzeText = async () => {
    console.log("analyzeText")
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    const ranges = allTextNodes.map(el => el.textContent.trim()).filter(el => el.length > 0)

    console.log(ranges)
}

const doReplacement = () => {
    const str = "форумов"

    // Find all text nodes in the article. We'll search within
    // these text nodes.
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    // Iterate over all text nodes and find matches.
    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                if (index === -1) break;
                indices.push(index);
                startPos = index + str.length;
            }

            // Create a range object for each instance of
            // str we found in the text node.
            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + str.length);
                return range;
            });
        });

    processRange(ranges.filter(range => range.length))
}

const processRange = (range) => {
    if (Array.isArray(range)) {
        range.forEach(r => processRange(r))
        return
    }

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

    create(getCurrentColor(), selection);
}

const initialize = () => {
    console.log("initialize")
    // initializeHoverTools();

    analyzeText()

    // doReplacement()

    hotkeys('g', async (e) => {
        e.preventDefault()

        await create(getCurrentColor())
    });
}


if(document.readyState !== 'complete') {
    window.addEventListener("load", () => {
        setTimeout(() => {
            initialize()
        }, 1500)
    });
} else {
    initialize();
}




