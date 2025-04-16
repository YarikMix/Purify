import {throttle} from "throttle-debounce";
import {getScrolledElems, isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/replacement/highlitght";
import {T_AggressionState, T_SimplifyState} from "@src/types";
import {API_URL} from "@src/consts";

const throttled = throttle(100, () => {
    analyzePage()
})

export const toggleSimplifyTextDynamic = (enabled:boolean) => {
    console.log("simplifyTextDynamicInit")
    console.log("enabled", enabled)

    const elemsWithScroll = getScrolledElems()

    if (enabled) {
        elemsWithScroll.each(function() {
            this.addEventListener("scroll", throttled)
        })

        document.addEventListener("scroll", throttled)

        analyzePage()
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

export const analyzePage = async () => {
    console.log("analyzePage")
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const blocks = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        // if (isVisibleInViewport(currentNode.parentElement)) {
        //     const text = currentNode.textContent.trim()
        //     if (text.length > 0 && !text.includes("function") && !text.includes("self") && !analyzedBlocks.includes(text)) {
        //         blocks.push(text);
        //         analyzedBlocks.push(text)
        //     }
        // }
        const text = currentNode.textContent.trim()
        if (text.length > 0 && !text.includes("function") && !text.includes("self") && !analyzedBlocks.includes(text)) {
            blocks.push(text);
            analyzedBlocks.push(text)
        }
        currentNode = treeWalker.nextNode();
    }

    console.log("blocks original", blocks)

    if (blocks.length > 0) {
        const response = await axios.post(API_URL + '/simplify', {
            blocks
        })

        console.log(response.data)

        if (response.data.result.length > 0) {
            chrome.storage.sync.get<T_SimplifyState>(["simplifyDynamic"], (state) => {

                console.log("state", state)
                processText(response.data.result.filter(item => item.from && item.to))
            });
        }
    }
}

const processText = (items) => {
    console.log("processText")
    console.log("items", items)



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
            return { el, text: el.textContent };
        })
        .forEach(({ text, el }) => {
            items.forEach(item => {
                if (text === item.from) {
                    console.log("sadfasdfas")
                    const indices = [];

                    let startPos = 0;
                    while (startPos < text.length) {
                        const index = text.indexOf(item.from, startPos);
                        if (index === -1) break;
                        indices.push(index);
                        startPos = index + item.from.length;
                    }

                    // Create a range object for each instance of
                    // str we found in the text node.
                    indices.forEach((index) => {
                        const range = new Range();
                        range.setStart(el, index);
                        range.setEnd(el, index + item.from.length);
                        res.push({
                            from: item.from,
                            to: item.to,
                            range
                        })
                    });

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
                highlight(data.from, data.to, container, selection, color.color, color.textColor, false);

        } catch {
            console.log("ERROR")
        }
    }

    res.forEach(r => processRange(r))
}