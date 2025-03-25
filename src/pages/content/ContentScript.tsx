import useExtensionState from "@pages/hooks/useExtensionState";
import {useEffect, useRef, useState} from "react";
import "./style.css"

type HightlightPos = {
	left: number,
	top: number
}

const ContentScript = () => {
	const {mode, showTooltip, selectedHighlightId} = useExtensionState();

	const tooltipRef = useRef<HTMLDivElement | null>(null)

	console.log("ContentScript")
	console.log("mode", mode)

	const [pos, setPos] = useState<HightlightPos>({
		left: 0,
		top: 0
	})

	const [text, setText] = useState("")

	const moveToolbarToHighlight = (selectedHighlightId:string) => {
		console.log("moveToolbarToHighlight")
		console.log("selectedHighlightId", selectedHighlightId)

		const highlightEl = document.querySelector(`highlighter-span[data-highlight-id='${selectedHighlightId}']`)
		console.log("highlightEl", highlightEl)

		if (!highlightEl || !tooltipRef.current) {
			return
		}

		const boundingRect = highlightEl.getBoundingClientRect();
		const toolWidth = 108; // When changing this, also update the width in css #highlighter--hover-tools--container

		const tooltipHeight = tooltipRef.current?.getBoundingClientRect().height
		const tooltipOffset = 5

		setPos({
			top: boundingRect.top - tooltipHeight - tooltipOffset,
			left: boundingRect.left + (boundingRect.width / 2) - (toolWidth / 2)
		});

		setText(highlightEl.textContent)
	}

	useEffect(() => {
		if (showTooltip && selectedHighlightId) {
			moveToolbarToHighlight(selectedHighlightId)
		}
	}, [showTooltip, selectedHighlightId]);

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

	console.log("showTooltip", showTooltip)

	if (showTooltip) {
		return (
			<div className="tooltip" style={{top: pos.top, left: pos.left}} ref={tooltipRef}>
				<span className="tooltiptext">
					{text}
				</span>
			</div>
		)
	}
}

export default ContentScript