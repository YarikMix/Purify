import {throttle} from "throttle-debounce";
import {getScrolledElems, isVisibleInViewport, updateAppState} from "@pages/content/utils";
import axios from "axios";
import highlight from "@pages/content/aggression/replacement/highlitght";
import {API_URL, BLACK_LIST_WORDS} from "@src/utils/consts";
import {DEFAULT_APP_STATE} from "@src/utils/state";

const throttled = throttle(100, () => {
	analyzePage();
});

export const toggleSimplifyTextDynamic = (enabled: boolean) => {
	console.log("simplifyTextDynamicInit");
	console.log("enabled", enabled);

	const elemsWithScroll = getScrolledElems();

	if (enabled) {
		elemsWithScroll.each(function () {
			this.addEventListener("scroll", throttled);
		});

		document.addEventListener("scroll", throttled);

		analyzePage();
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

let wordsReplaced = 0;

let wordsAnalyzed = 0;

export const analyzePage = async (minWordsCount = 5) => {
	console.log("analyzePage");
	const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	const blocks: string[] = [];
	let currentNode = treeWalker.nextNode();
	while (currentNode) {
		if (currentNode?.textContent) {
			const text = currentNode.textContent.trim();
			const words = text.split(/\s+/);
			if (
				text.length > 0 &&
				!BLACK_LIST_WORDS.some((token) => text.includes(token)) &&
				!analyzedBlocks.includes(text) &&
				words.length >= minWordsCount
			) {
				blocks.push(text);
				analyzedBlocks.push(text);
			}
		}

		currentNode = treeWalker.nextNode();
	}

	console.log("blocks", blocks);

	if (blocks.length > 0) {
		chrome.storage.sync.get(DEFAULT_APP_STATE, (state) => {
			console.log("state", state);

			updateAppState({
				simplifyQueue: {
					...state.simplifyQueue,
					sended: state.simplifyQueue.sended + blocks.length,
				},
			});
		});

		const response = await axios.post(API_URL + "/simplify", {
			blocks,
		});

		console.log(response.data);

		if (response.data.result.length > 0) {
			chrome.storage.sync.get(DEFAULT_APP_STATE, (state) => {
				console.log("state", state);
				processText(response.data.result.filter((item) => item.from && item.to));

				updateAppState({
					simplifyStats: {
						wordsReplaced,
						wordsAnalyzed,
					},
					simplifyQueue: {
						...state.simplifyQueue,
						processed: state.simplifyQueue.processed + blocks.length,
					},
				});
			});
		}
	}
};

type T_Item = {
	from: string;
	to: string;
	range: Range;
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
		if (isVisibleInViewport(currentNode.parentElement)) {
			if (currentNode.textContent) {
				const text = currentNode.textContent.trim();
				if (text.length > 0) {
					allTextNodes.push(currentNode);
				}
			}
		}

		currentNode = treeWalker.nextNode();
	}

	const res: T_Item[] = [];

	// Iterate over all text nodes and find matches.
	allTextNodes
		.map((el) => {
			return {el, text: el.textContent};
		})
		.forEach(({text, el}) => {
			items.forEach((item) => {
				if (text === item.from) {
					wordsReplaced += Math.max(item.from.split(/\s+/).length - item.to.split(/\s+/).length, 0);
					wordsAnalyzed += item.from.split(/\s+/).length;

					console.log("text", text);
					const indices = [];

					let startPos = 0;
					while (startPos < text.length) {
						const index = text.indexOf(item.from, startPos);
						if (index === -1) break;
						indices.push(index);
						startPos = index + item.from.length;
					}

					console.log("indices", indices);

					// Create a range object for each instance of
					// str we found in the text node.
					indices.forEach((index) => {
						const range = new Range();
						range.setStart(el, index);
						range.setEnd(el, index + item.from.length);
						res.push({
							from: item.from,
							to: item.to,
							range,
						});
					});
				}
			});
		});

	console.log("res1", res);

	const processRange = (data: T_Item) => {
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
			if (selectionString) highlight(data.from, data.to, container, selection, color.color, color.textColor, false);
		} catch {
			console.log("ERROR");
		}
	};

	res.forEach((r) => processRange(r));
};
