import {createRoot} from "react-dom/client";
import ContentScript from "@pages/content/ContentScript";
import {ReactNode} from "react";
import './style.css'

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

import hotkeys from "hotkeys-js";
import highlight from "@pages/content/aggression/highlight";
import {updateState} from "@pages/state/extensionState";
import axios from "axios";
import {throttle} from "throttle-debounce";
import {isVisibleInViewport} from "@pages/content/utils";


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

async function create(color, selection = window.getSelection(), text = window.getSelection().toString()) {
    console.log("create")
    const selectionString = selection.toString();
    if (!selectionString) return;

    let container = selection.getRangeAt(0).commonAncestorContainer as HTMLElement;

    while (!container.innerHTML) {
        container = container.parentNode as HTMLElement;
    }

    highlight(text, container, selection, color.color, color.textColor);
}

document.addEventListener("scroll", throttle(100, () => {
    analyzeAggession()
}))

const analyzedBlocks = []

const analyzeAggression = async () => {
    console.log("analyzePage")
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const blocks = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        if (isVisibleInViewport(currentNode.parentElement)) {
            const text = currentNode.textContent.trim().toLocaleLowerCase()
            if (text.length > 0 && !text.includes("function") && !text.includes("self") && !analyzedBlocks.includes(text)) {
                blocks.push(text);
                analyzedBlocks.push(text)
            }
        }
        currentNode = treeWalker.nextNode();
    }

    if (blocks.length > 0) {
        const response = await axios.post('http://127.0.0.1:5001/analyze', {
            blocks
        })

        if (response.data.length > 0) {
            processText2(response.data)
        }
    }
}

const processText2 = (items) => {
    console.log("processText2")

    // Find all text nodes in the article. We'll search within
    // these text nodes.
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    const res = []

    // Iterate over all text nodes and find matches.
    allTextNodes
        .map((el) => {
            return { el, text: el.textContent.trim().toLocaleLowerCase() };
        })
        .forEach(({ text, el }) => {
            items.forEach(item => {
                if (text === item.block) {
                    item.negative_words.map(word => {
                        const indices = [];

                        let startPos = 0;
                        while (startPos < text.length) {
                            const index = text.indexOf(word, startPos);
                            if (index === -1) break;
                            indices.push(index);
                            startPos = index + word.length;
                        }

                        // Create a range object for each instance of
                        // str we found in the text node.
                        indices.forEach((index) => {
                            const range = new Range();
                            range.setStart(el, index);
                            range.setEnd(el, index + word.length);
                            res.push(range)
                        });
                    })
                }
            })
        });

    console.log("res", res)

    processRange(res)
}

const analyzePreconception = () => {

}


const processText = (root=document.body, str="форумов", start, end) => {
    console.log("processText")
    console.log("str", str)
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
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                console.log("index", index)
                if (index === -1) break;
                if (index >= start && index <= end) {
                    indices.push(index);
                }
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

    console.log("ranges", ranges)

    processRange(ranges)
}

const processRange = (range) => {
    if (Array.isArray(range)) {
        range.forEach(r => processRange(r))
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

    create(getCurrentColor(), selection);
}

hotkeys('g', async (e) => {
    e.preventDefault()

    console.log("hotkey press")

    const selection = window.getSelection();

    if (!selection?.focusNode?.textContent) {
        return
    }

    const text = selection.toString()

    const response = await axios.post('http://127.0.0.1:8080/api/v1/analyze_text', {
        "text": text
    })

    console.log(response.data)

    const start = selection.focusNode.textContent.indexOf(text);
    const end = text.length + start;

    const parent = selection.focusNode.parentElement as HTMLElement

    response.data.response.map(item => {
        if (item.state == 2 || item.state == 1) {
            processText(parent, item.text, start, end)
        }
    })

    processText(parent, text, start, end)
});


hotkeys('y', async (e) => {
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

    // const start = selection.focusNode.textContent.indexOf(text);
    // const end = text.length + start;
    //
    // const parent = selection.focusNode.parentElement as HTMLElement
    //
    // response.data.response.map(item => {
    //     if (item.state == 2 || item.state == 1) {
    //         processText(parent, item.text, start, end)
    //     }
    // })
    //
    // processText(parent, text, start, end)
});


const initialize = () => {
    console.log("initialize")

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




