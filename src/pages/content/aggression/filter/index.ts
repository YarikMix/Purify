import {throttle} from "throttle-debounce";
import {getScrolledElems, isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/filter/highlight";
import {BLACK_LIST_WORDS, IS_DEBUG} from "@src/utils/consts";

const throttled = throttle(100, () => {
	analyzeAggression();
});

export const toggleFilterText = (enabled: boolean) => {
	console.log("toggleFilterText");
	console.log("enabled", enabled);

	const elemsWithScroll = getScrolledElems();
	if (enabled) {
		elemsWithScroll.each(function () {
			this.addEventListener("scroll", throttled);
		});

		document.addEventListener("scroll", throttled);

		analyzeAggression();
	} else {
		elemsWithScroll.each(function () {
			this.removeEventListener("scroll", throttled);
		});

		document.removeEventListener("scroll", throttled);
	}
};

const minWordsCount = 5;

const analyzedBlocks: string[] = [];

export const analyzeAggression = async () => {
	console.log("analyzeAggression");

	const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	const blocks = [];
	let currentNode = treeWalker.nextNode();
	while (currentNode) {
		if (currentNode && currentNode.textContent && currentNode.parentElement && isVisibleInViewport(currentNode.parentElement)) {
			const text = currentNode.textContent.trim().toLocaleLowerCase();
			const words = text.split(/\s+/);
			if (
				text.length > 0 &&
				!BLACK_LIST_WORDS.some((token) => text.includes(token)) &&
				words.length >= minWordsCount &&
				!analyzedBlocks.includes(text)
			) {
				blocks.push(text);
				analyzedBlocks.push(text);
			}
		}
		currentNode = treeWalker.nextNode();
	}

	if (blocks.length > 0) {
		const response = await axios.post(IS_DEBUG ? "http://127.0.0.1:5001/analyze" : "https://purify.pro/ml/analyze", {
			blocks,
		});

		if (response.data.length > 0) {
			processText(response.data);
		}
	}
};

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

	const res = [];

	// Iterate over all text nodes and find matches.
	allTextNodes
		.map((el) => {
			return {el, text: el.textContent.trim().toLocaleLowerCase()};
		})
		.forEach(({text, el}) => {
			items.forEach((item) => {
				if (text === item.block) {
					item.negative_words.map((word) => {
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
							res.push(range);
						});
					});
				}
			});
		});

	processRange(res);
};

const processRange = (range) => {
	if (Array.isArray(range)) {
		range.forEach((r) => processRange(r));
		return;
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
		r.setStart(range.commonAncestorContainer, range.startOffset);
		r.setEnd(range.commonAncestorContainer, range.endOffset);
		selection.removeAllRanges();
		selection.addRange(r);

		const selectionString = selection.toString();
		if (selectionString) highlight(selection, container);
	} catch {
		console.log("ERROR");
	}
};
