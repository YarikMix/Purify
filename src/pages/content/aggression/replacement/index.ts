import {throttle} from "throttle-debounce";
import {getScrolledElems, isVisibleInViewport, updateAppState} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/replacement/highlitght";
import {API_URL, BLACK_LIST_WORDS} from "@src/utils/consts";
import {DEFAULT_AGGRESSION_STATE} from "@src/utils/state";

const throttled = throttle(100, () => {
	replaceAggression();
});

export const toggleReplacementText = (enabled: boolean) => {
	console.log("toggleReplacementText");
	console.log("enabled", enabled);

	const elemsWithScroll = getScrolledElems();

	if (enabled) {
		console.log("replacement.init");

		elemsWithScroll.each(function () {
			this.addEventListener("scroll", throttled);
		});

		document.addEventListener("scroll", throttled);

		replaceAggression();

		const tooltip = document.createElement("div");

		const span = document.createElement("span");
		span.classList.add("highlight__tooltip-text");

		tooltip.appendChild(span);

		tooltip.classList.add("highlight__tooltip");

		document.body.appendChild(tooltip);
	} else {
		elemsWithScroll.each(function () {
			this.removeEventListener("scroll", throttled);
		});

		document.removeEventListener("scroll", throttled);
	}
};

function getCurrentColor() {
	console.log("getCurrentColor1234123");

	return {
		color: "rgb(52, 73, 94)",
		textColor: "rgb(255, 255, 255)",
	};
}

const analyzedBlocks: string[] = [];

const minWordsCount = 5;

let aggressionWordsCount = 0;
let totalWordsCount = 0;

export const replaceAggression = async () => {
	console.log("replaceAggression");
	const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	const blocks = [];
	let currentNode = treeWalker.nextNode();
	while (currentNode) {
		if (isVisibleInViewport(currentNode.parentElement)) {
			if (currentNode.textContent) {
				const text = currentNode.textContent.trim();
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
		}
		currentNode = treeWalker.nextNode();
	}

	if (blocks.length > 0) {
		chrome.storage.sync.get(DEFAULT_AGGRESSION_STATE, (state) => {
			updateAppState({
				aggressionQueue: {
					sended: (state.aggressionQueue.sended || 0) + blocks.length,
					processed: state.aggressionQueue.processed || 0,
				},
			});
		});

		const response = await axios.post(API_URL + "/replace", {
			blocks,
			preconception: true,
			agitation: true,
			site: location.hostname,
		});

		if (response.data.blocks.length > 0) {
			processText(response.data.blocks);

			chrome.storage.sync.get(DEFAULT_AGGRESSION_STATE, (state) => {
				updateAppState({
					aggressionQueue: {
						sended: state.aggressionQueue.sended || 0,
						processed: (state.aggressionQueue.processed || 0) + blocks.length,
					},
					aggressionStats: {
						wordsReplaced: aggressionWordsCount,
						wordsAnalyzed: totalWordsCount,
					},
				});
			});
		}
	}
};

const processText = (items) => {
	console.log("processText");
	console.log("items", items);

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
			return {el, text: el.textContent.trim()};
		})
		.forEach(({text, el}) => {
			items.forEach((item) => {
				if (text === item.text) {
					item.result.map((i) => {
						console.log("i", i);
						aggressionWordsCount += i.from.split(/\s+/).length;
						totalWordsCount += item.text.split(/\s+/).length;
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
								range,
							});
						});
					});
				}
			});
		});

	console.log("res1", res);

	const processRange = (data) => {
		console.log("processRange");
		console.log("data", data);

		let container = data.range.commonAncestorContainer as HTMLElement;

		while (!container.innerHTML) {
			container = container.parentNode as HTMLElement;
		}

		try {
			const selection = window.getSelection();
			const r = document.createRange();
			r.selectNodeContents(container);
			r.setStart(data.range.commonAncestorContainer, data.range.startOffset);
			r.setEnd(data.range.commonAncestorContainer, data.range.endOffset);
			selection.removeAllRanges();
			selection.addRange(r);

			const color = getCurrentColor();

			const selectionString = selection.toString();
			if (selectionString) highlight(data.from, data.to, container, selection, color.color, color.textColor);
		} catch {
			console.log("ERROR");
		}
	};

	res.forEach((r) => processRange(r));
};
