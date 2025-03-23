import useExtensionState from "@pages/hooks/useExtensionState";
import {useEffect, useRef, useState} from "react";
import {Mode} from "@pages/state/extensionState";
import "./style.css"

type HightlightPos = {
	left: number,
	top: number
}

const ContentScript = () => {
	const {mode, showTooltip, selectedHighlightId} = useExtensionState();

	const tooltipRef = useRef<HTMLElement | null>(null)

	console.log("ContentScript")
	console.log("mode", mode)

	const [pos, setPos] = useState<HightlightPos>({
		left: 0,
		top: 0
	})

	const moveToolbarToHighlight = (selectedHighlightId) => {
		console.log("moveToolbarToHighlight")
		console.log("selectedHighlightId", selectedHighlightId)

		const highlightEl = document.querySelector(`highlighter-span[data-highlight-id='${selectedHighlightId}']`)
		console.log("highlightEl", highlightEl)

		const boundingRect = highlightEl.getBoundingClientRect();
		const toolWidth = 108; // When changing this, also update the width in css #highlighter--hover-tools--container

		const tooltipHeight = tooltipRef.current?.getBoundingClientRect().height
		const tooltipOffset = 5

		setPos({
			top: boundingRect.top - tooltipHeight - tooltipOffset,
			left: boundingRect.left + (boundingRect.width / 2) - (toolWidth / 2)
		});
	}

	useEffect(() => {
		if (showTooltip && selectedHighlightId) {
			moveToolbarToHighlight(selectedHighlightId)
		}
	}, [showTooltip, selectedHighlightId]);

	console.log("pos", pos)
	console.log("showTooltip", showTooltip)

	// useEffect(() => {
	// 	if (mode == Mode.fullPage) {
	// 		console.log("ASDFSDAFASDSAADFSFDSFSSFAD")
	// 		hotkeys.unbind('g');
	//
	// 		// TODO
	// 		// axios.post('http://127.0.0.1:8080/api/v1/analyze_text', {
	// 		// 	"text": document.body.innerText
	// 		// })
	//
	// 	} else {
	// 		console.log("hotkey")
	// 		hotkeys('g', (e) => {
	// 			e.preventDefault()
	//
	// 			analyzeText()
	// 		});
	// 	}
	// }, [mode]);

	return (
		<div>
			AAASDFASDFASDFASDFASFDASDF1
			<div>{mode === Mode.fullPage ? "Меняем текст на всей странице" : "Меняем текст по хоткею"}</div>
			{showTooltip &&
				<div className="tooltip" style={{top: pos.top, left: pos.left}} ref={tooltipRef}>
					<span className="tooltiptext">
						Показываем тултип
					</span>
				</div>
			}
		</div>
	)
}

export default ContentScript