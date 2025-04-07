import {throttle} from "throttle-debounce";
import {getScrolledElems, isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/replacement/highlitght";
import {T_AggressionState} from "@src/types";
import $ from "jquery";
import {HIGHLIGHT_CLASS} from "@pages/content/highlight/constants";

const throttled = throttle(100, () => {
    replaceAggression()
})

export const toggleReplacementText = (enabled:boolean) => {
    console.log("toggleReplacementText")
    console.log("enabled", enabled)

    const elemsWithScroll = getScrolledElems()

    if (enabled) {
        console.log("replacement.init")

        elemsWithScroll.each(function() {
            this.addEventListener("scroll", throttled)
        })

        document.addEventListener("scroll", throttled)

        replaceAggression()

        const tooltip = document.createElement("div")

        const span = document.createElement("span")
        span.classList.add("highlight__tooltip-text")

        tooltip.appendChild(span)

        tooltip.classList.add("highlight__tooltip")

        document.body.appendChild(tooltip)
    } else {

        elemsWithScroll.each(function() {
            this.removeEventListener("scroll", throttled)
        })

        document.removeEventListener("scroll", throttled)
    }
}

function getCurrentColor() {
    console.log("getCurrentColor1234123")

    return {
        color: 'rgb(52, 73, 94)',
        textColor: 'rgb(255, 255, 255)',
    }
}

const analyzedBlocks = []

export const replaceAggression = async () => {
    console.log("replaceAggression")
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const blocks = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        if (isVisibleInViewport(currentNode.parentElement)) {
            const text = currentNode.textContent.trim()
            if (text.length > 0 && !text.includes("function") && !text.includes("self") && !analyzedBlocks.includes(text)) {
                blocks.push(text);
                analyzedBlocks.push(text)
            }
        }
        currentNode = treeWalker.nextNode();
    }

    if (blocks.length > 0) {
        const response = await axios.post('http://127.0.0.1:8080/api/v1/replace', {
            blocks,
            preconception: true,
            agitation: true
        })

        console.log(response.data)

        if (response.data.blocks.length > 0) {
            chrome.storage.sync.get<T_AggressionState>(["aggressionShowOriginalText"], (state) => {
                processText(response.data.blocks, state.aggressionShowOriginalText)
            });
        }
    }
}

const processText = (items, showTooltip:boolean) => {
    console.log("processText")
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
            return { el, text: el.textContent.trim() };
        })
        .forEach(({ text, el }) => {
            items.forEach(item => {
                if (text === item.text) {
                    item.result.map(i => {
                        console.log("i", i)
                        const indices = [];

                        let startPos = 0;
                        while (startPos < text.length) {
                            const index = text.indexOf(i.from, startPos);
                            if (index === -1) break;
                            indices.push(index);
                            startPos = index + i.from.length;
                        }

                        // Create a range object for each instance of
                        // str we found in the text node.
                        indices.forEach((index) => {
                            const range = new Range();
                            range.setStart(el, index);
                            range.setEnd(el, index + i.from.length);
                            res.push({
                                from: i.from,
                                to: i.to,
                                range
                            })
                        });
                    })
                }
            })
        });

    console.log("res1", res)

    const processRange = (data) => {
        console.log("processRange")
        console.log("data", data)

        let container = data.range.commonAncestorContainer as HTMLElement;

        while (!container.innerHTML) {
            container = container.parentNode as HTMLElement;
        }

        try {
            const selection = window.getSelection();
            const r = document.createRange();
            r.selectNodeContents(container);
            r.setStart(data.range.commonAncestorContainer, data.range.startOffset)
            r.setEnd(data.range.commonAncestorContainer, data.range.endOffset)
            selection.removeAllRanges();
            selection.addRange(r);

            const color = getCurrentColor()

            const selectionString = selection.toString();
            if (selectionString)
                highlight(data.from, data.to, container, selection, color.color, color.textColor, showTooltip);

        } catch {
            console.log("ERROR")
        }
    }

    res.forEach(r => processRange(r))
}