import axios from "axios";
import hotkeys from "hotkeys-js";
import {API_URL} from "@src/utils/consts";
import {T_SimplifyState} from "@src/utils/types";

export const toggleSimplifyTextHotkey = async (enabled: boolean) => {
	console.log("simplifyTextInit");

	const handleHotkeyPress = (e: KeyboardEvent) => {
		e.preventDefault();

		chrome.storage.sync.get<T_SimplifyState>(["simplifyProcessing"], (state) => {
			if (!state.simplifyProcessing) {
				const selection = window.getSelection();

				console.log("selection?.focusNode", selection?.focusNode);

				console.log("selection?.focusNode?.textContent", selection?.focusNode?.textContent);

				console.log("selection.toString()", selection?.toString());

				if (!selection || !selection.focusNode || !selection.focusNode?.textContent || !selection.toString()) {
					return;
				}

				chrome.storage.sync.set({
					simplifyProcessing: true,
				});

				const text = selection.toString();

				axios.post(API_URL + "/simplify", {
					blocks: [text],
				})
					.then((response) => {
						const to = response.data.result[0].to;

						if (to && selection?.focusNode) {
							const parent = selection.focusNode.parentElement as HTMLElement;

							parent.innerText = parent.innerText.replace(
								selection.toString(),
								response.data.result[0].to,
							);
							parent.style.fontWeight = "bold";
							parent.style.fontStyle = "italic";

							if (selection.empty) {
								selection.empty();
							}
						}
					})
					.finally(() => {
						chrome.storage.sync.set({
							simplifyProcessing: false,
						});
					});
			}
		});
	};

	if (enabled) {
		hotkeys("g", handleHotkeyPress);
	} else {
		hotkeys.unbind("g");
	}
};
