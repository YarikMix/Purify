import {isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/replacement/highlitght";
import hotkeys from "hotkeys-js";

const analyzedBlocks = []

export const simplifyTextInit = async () => {
    console.log("simplifyTextInit")
    hotkeys('g', async (e) => {
        e.preventDefault()

        console.log("hotkey press")

        const selection = window.getSelection();

        if (!selection?.focusNode?.textContent) {
            return
        }

        const text = selection.toString()


        console.log("text", text)

        const response = await axios.post('http://127.0.0.1:8080/api/v1/replace', {
            blocks: [text],
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
}

function getCurrentColor() {
    console.log("getCurrentColor123")

    return {
        color: 'rgb(52, 73, 94)',
        textColor: 'rgb(255, 255, 255)',
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