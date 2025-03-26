import {throttle} from "throttle-debounce";
import {isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/highlight";
import {state} from "@pages/state/extensionState";

document.addEventListener("scroll", throttle(100, () => {
    if (state.aggressionReplacementEnabled) {
        replaceAggression()
    }
}))

const analyzedBlocks = []

export const replaceAggression = async () => {
    console.log("replaceAggression")
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
        const response = await axios.post('http://127.0.0.1:8080/api/v1/replace', {
            blocks,
            preconception: true,
            agitation: true
        })

        console.log(response.data)
        // if (response.data.length > 0) {
        //     processText(response.data)
        // }
    }
}

const processText = (items) => {
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

    processRange(res)
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

    try {
        const selection = window.getSelection();
        const r = document.createRange();
        r.selectNodeContents(container);
        r.setStart(range.commonAncestorContainer, range.startOffset)
        r.setEnd(range.commonAncestorContainer, range.endOffset)
        selection.removeAllRanges();
        selection.addRange(r);

        const selectionString = selection.toString();
        if (selectionString)
            highlight(selection, container);

    } catch {
        console.log("ERROR")
    }
}
