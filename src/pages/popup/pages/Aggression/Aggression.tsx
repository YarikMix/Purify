import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useRef} from "react";
import Option from "@pages/popup/components/Option/Option";
import {animated, useSpring} from "react-spring";
import useAppState from "@pages/popup/hooks/useAppState";
import ProgressBar from "@pages/popup/components/ProgressBar/ProgressBar";

const Aggression = () => {
	const [state, setState] = useAppState();

	const handleToggleAggressionEnabled = () => {
		setState({
			aggressionEnabled: !state.aggressionEnabled,
			aggressionFilterText: !state.aggressionEnabled,
			aggressionReplacementText: false,
			aggressionShowOriginalText: false,
		});
	};

	const handleToggleFilterText = () => {
		setState({
			aggressionFilterText: !state.aggressionFilterText,
			aggressionReplacementText: false,
			aggressionShowOriginalText: false,
		});
	};

	const handleToggleReplacementText = () => {
		let aggressionShowOriginalTextNewValue = state.aggressionShowOriginalText;

		if (state.aggressionReplacementText) {
			aggressionShowOriginalTextNewValue = false;
		}

		setState({
			aggressionFilterText: false,
			aggressionReplacementText: !state.aggressionReplacementText,
			aggressionShowOriginalText: aggressionShowOriginalTextNewValue,
		});
	};

	const handleToggleShowOriginalText = () => {
		setState({
			aggressionShowOriginalText: !state.aggressionShowOriginalText,
		});
	};

	const handleToggleFilterImages = () => {
		setState({
			aggressionFilterImages: !state.aggressionFilterImages,
		});
	};

	const ref = useRef<HTMLDivElement>(null);

	const props = useSpring({
		delay: 100,
		from: {
			height: !state?.aggressionEnabled || ref.current ? "0px" : "175px",
		},
		to: {height: state?.aggressionEnabled ? "175px" : "0px"},
	});

	if (!state) {
		return;
	}

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<div>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-stone-900 text-base font-black">Анализ агрессии</h1>
					<Toggle value={state.aggressionEnabled} setValue={handleToggleAggressionEnabled} bg="dark" />
				</div>
				<animated.nav style={props} ref={ref} className="pl-4 flex flex-col gap-4 overflow-hidden">
					<Option
						label="Фильтровать мат"
						value={state.aggressionFilterText}
						onToggle={handleToggleFilterText}
						disabled={!state.aggressionEnabled}
					/>
					<Option
						label="Заменять агрессию"
						value={state.aggressionReplacementText}
						onToggle={handleToggleReplacementText}
						disabled={!state.aggressionEnabled}
					/>
					<Option
						label="Отображать оригинал при наведении"
						value={state.aggressionShowOriginalText}
						onToggle={handleToggleShowOriginalText}
						disabled={!state.aggressionEnabled || !state.aggressionReplacementText}
						sub={true}
					/>
					<Option
						label="Фильтровать изображения"
						value={state.aggressionFilterImages}
						onToggle={handleToggleFilterImages}
						disabled={!state.aggressionEnabled}
					/>
				</animated.nav>
			</div>
			{state.aggressionEnabled && state.aggressionReplacementText && (
				<ProgressBar
					currentValue={state.aggressionQueue.processed}
					maxValue={state.aggressionQueue.sended}
					label="Обработка текста на сайте"
				/>
			)}
		</div>
	);
};

export default Aggression;
