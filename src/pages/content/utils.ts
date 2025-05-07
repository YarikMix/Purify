import $ from "jquery";
import {T_AppState} from "@src/utils/types";

export const isVisibleInViewport = (element) => {
	const elementStyle = window.getComputedStyle(element);
	//Particular cases when the element is not visible at all
	if (
		elementStyle.height == "0px" ||
		elementStyle.display == "none" ||
		elementStyle.opacity == "0" ||
		elementStyle.visibility == "hidden" ||
		elementStyle.clipPath == "circle(0px at 50% 50%)" ||
		elementStyle.transform == "scale(0)" ||
		element.hasAttribute("hidden")
	) {
		return false;
	}

	const rect = element.getBoundingClientRect();

	//Overlapping strict check
	const baseElementLeft = rect.left;
	const baseElementTop = rect.top;

	const elementFromStartingPoint = document.elementFromPoint(baseElementLeft, baseElementTop);

	if (elementFromStartingPoint != null && !element.isSameNode(elementFromStartingPoint)) {
		const elementZIndex = elementStyle.zIndex;
		const elementOverlappingZIndex = window.getComputedStyle(elementFromStartingPoint).zIndex;
		if (Number(elementZIndex) < Number(elementOverlappingZIndex)) {
			return false;
		}

		if (elementZIndex === "" && elementOverlappingZIndex === "") {
			/**
        		If two positioned elements overlap without a z-index specified, the element
			positioned last in the HTML code will be shown on top
			 **/
			if (element.compareDocumentPosition(elementFromStartingPoint) & Node.DOCUMENT_POSITION_FOLLOWING) {
				return false;
			}
		}
	}

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 4 &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

export const randomElement = <T>(arr: T[]): T => {
	return arr[Math.floor(Math.random() * arr.length)];
};

export const getScrolledElems = () =>
	$("body *").filter(function () {
		return $(this).scrollTop() != 0 || $(this).css("overflow") == "scroll";
	});

export const getImages = () => document.querySelectorAll<HTMLImageElement>("img");

export const declOfNum = (number: number, titles: string[]) => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

export const updateAppState = (state: Partial<T_AppState>) => {
	chrome.storage.sync.set<Partial<T_AppState>>(state);
};

export const isDomenIgnored = (state: T_AppState) => state.ignoreList.includes(location.hostname);
