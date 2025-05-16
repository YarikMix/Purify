import $ from "jquery";
import {HIGHLIGHT_CLASS} from "@pages/content/highlight/constants";
import {T_AggressionState} from "@src/utils/types";

const showTooltip = (highlightId: string) => {
	const highlightEl = document.querySelector<HTMLElement>(`highlighter-span[data-highlight-id='${highlightId}']`);

	if (!highlightEl) {
		return;
	}

	const tooltip = document.querySelector<HTMLElement>(".highlight__tooltip");

	if (!tooltip) {
		return;
	}

	chrome.storage.sync.get<T_AggressionState>(["aggressionShowOriginalText"], (state) => {
		if (state.aggressionShowOriginalText) {
			tooltip.style.display = "block";

			$(".highlight__tooltip-text").text(highlightEl.dataset.original as string);

			const boundingRect = highlightEl.getBoundingClientRect();
			const toolWidth = 108; // When changing this, also update the width in css #highlighter--hover-tools--container

			const tooltipHeight = tooltip.getBoundingClientRect().height;
			const tooltipOffset = 5;

			tooltip.style.top = boundingRect.top - tooltipHeight - tooltipOffset + "px";
			tooltip.style.left = boundingRect.left + boundingRect.width / 2 - toolWidth / 2 + "px";
		}
	});
};

const hideTooltip = () => $(".highlight__tooltip").css("display", "none");

const initializeHighlightEventListeners = (highlightElement: HTMLElement) => {
	const highlightId = highlightElement.dataset.highlightId as string;
	highlightElement.addEventListener("mouseenter", () => showTooltip(highlightId));
	highlightElement.addEventListener("mouseleave", hideTooltip);
};

function highlight(from, to, container, selection, color, textColor) {
	console.log("highlight");
	const highlightInfo = {
		color: color ? color : "yellow",
		textColor: textColor ? textColor : "inherit",
		from: from,
		to: to,
		anchor: $(selection.anchorNode),
		anchorOffset: selection.anchorOffset,
		focus: $(selection.focusNode),
		focusOffset: selection.focusOffset,
	};

	try {
		recursiveWrapper($(container), highlightInfo);
	} catch (e) {
		return false;
	}

	if (selection.removeAllRanges) selection.removeAllRanges();

	const parent = $(container).parent();
	parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
		initializeHighlightEventListeners(el);
	});

	return true;
}

function recursiveWrapper(container, highlightInfo) {
	return _recursiveWrapper(container, highlightInfo, false, 0); // Initialize the values of 'startFound' and 'charsHighlighted'
}

function _recursiveWrapper(container, highlightInfo, startFound, charsHighlighted) {
	console.log("_recursiveWrapper");
	const {anchor, focus, anchorOffset, focusOffset, color, textColor, from, to} = highlightInfo;
	const selectionLength = from.length;

	container.contents().each((_index, element) => {
		if (charsHighlighted >= selectionLength) return;

		if (element.nodeType !== Node.TEXT_NODE) {
			const jqElement = $(element);
			if (jqElement.is(":visible") && getComputedStyle(element).visibility !== "hidden") {
				[startFound, charsHighlighted] = _recursiveWrapper(jqElement, highlightInfo, startFound, charsHighlighted);
			}
			return;
		}
		let startIndex = 0;
		if (!startFound) {
			if (!anchor.is(element) && !focus.is(element)) return;

			startFound = true;
			startIndex = Math.min(
				...[...(anchor.is(element) ? [anchorOffset] : []), ...(focus.is(element) ? [focusOffset] : [])],
			);
		}

		const {nodeValue, parentElement: parent} = element;

		if (startIndex > nodeValue.length) {
			throw new Error(`No match found for highlight string '${from}'`);
		}

		const highlightTextEl = element.splitText(startIndex);

		let i = startIndex;
		for (; i < nodeValue.length; i++) {
			while (charsHighlighted < selectionLength && from[charsHighlighted].match(/\s/u)) charsHighlighted++;

			if (charsHighlighted >= selectionLength) break;

			const char = nodeValue[i];
			if (char === from[charsHighlighted]) {
				charsHighlighted++;
			} else if (!char.match(/\s/u)) {
				throw new Error(`No match found for highlight string '${from}'`);
			}
		}

		if (parent.classList.contains(HIGHLIGHT_CLASS)) return;

		const elementCharCount = i - startIndex;
		const insertBeforeElement = highlightTextEl.splitText(elementCharCount);
		const highlightText = highlightTextEl.nodeValue;

		if (highlightText.match(/^\s*$/u)) {
			parent.normalize();
			return;
		}

		const highlightNode = document.createElement("highlighter-span");
		highlightNode.classList.add(HIGHLIGHT_CLASS);
		highlightNode.dataset.highlightId = crypto.randomUUID();
		highlightNode.dataset.original = from;
		highlightNode.style.fontWeight = "600";
		highlightNode.style.fontStyle = "italic";
		// highlightNode.style.color = textColor;
		// highlightNode.style.backgroundColor = color;
		highlightNode.textContent = to;
		highlightTextEl.remove();
		parent.insertBefore(highlightNode, insertBeforeElement);
	});

	return [startFound, charsHighlighted];
}

export default highlight;
