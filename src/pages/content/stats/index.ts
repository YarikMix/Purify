import axios from "axios";
import {API_URL, BLACK_LIST} from "@src/consts";

const analyzedBlocks: string[] = [];

const minWordsCount = 5;

const sendPageStats = async () => {
	const treeWalker = document.createTreeWalker(
		document.body,
		NodeFilter.SHOW_TEXT,
	);
	const blocks: string[] = [];
	let currentNode = treeWalker.nextNode();
	while (currentNode) {
		if (currentNode?.textContent) {
			const text = currentNode.textContent.trim();
			const words = text.split(/\s+/);
			if (
				text.length > 0 &&
				!BLACK_LIST.some((token) =>
					text.includes(token),
				) &&
				words.length >= minWordsCount
			) {
				blocks.push(text);
				analyzedBlocks.push(text);
			}
		}

		currentNode = treeWalker.nextNode();
	}

	console.log("blocks", blocks);

	const HTTP_SCHEMA_REGEXP = new RegExp("^https?://");
	const rawUrl = window.location.href;
	const url = rawUrl.replace(HTTP_SCHEMA_REGEXP, "");

	if (blocks.length > 0) {
		const response = await axios.post(
			API_URL + "/save_analytics/",
			{
				url,
				blocks,
			},
		);

		console.log(response.data);
	}
};

export default sendPageStats;
