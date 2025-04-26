import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useEffect, useRef, useState} from "react";
import Option from "@pages/popup/components/Option/Option";
import SiteSecurityInfo from "@pages/popup/components/SiteSecurityInfo/SiteSecurityInfo";
import InfoBlockAggressive from "@pages/popup/components/InfoBlockAggressive/InfoBlockAggressive";
import {T_AggressionState, T_Stats} from "@src/types";
import {animated, useSpring} from "react-spring";
import {AGGRESSIVE_THRESHOLD} from "@src/consts";

const Aggression = () => {
	const [state, setState] = useState<T_AggressionState>(null);

	const [stats, setStats] = useState<T_Stats>(null);

	useEffect(() => {
		chrome.storage.sync.get<T_AggressionState>(
			[
				"aggressionEnabled",
				"aggressionFilterText",
				"aggressionFilterImages",
				"aggressionReplacementText",
				"aggressionShowOriginalText",
				"aggressionStats",
			],
			(state) => {
				setState(state);
				setStats(state.aggressionStats);
			},
		);

		chrome.storage.onChanged.addListener((updatedState) => {
			if ("aggressionStats" in updatedState) {
				setStats(updatedState.aggressionStats.newValue);
			}
		});
	}, []);

	const handleToggleAggressionEnabled = () => {
		chrome.storage.sync.set({
			aggressionEnabled: !state.aggressionEnabled,
			aggressionFilterText: !state.aggressionEnabled,
			aggressionReplacementText: false,
			aggressionShowOriginalText: false,
		});

		setState({
			...state,
			aggressionEnabled: !state.aggressionEnabled,
			aggressionFilterText: !state.aggressionEnabled,
			aggressionReplacementText: false,
			aggressionShowOriginalText: false,
			aggressionFilterImages: false,
		});
	};

	const handleToggleFilterText = () => {
		chrome.storage.sync.set({
			aggressionFilterText: !state.aggressionFilterText,
			aggressionReplacementText: false,
			aggressionShowOriginalText: false,
		});

		setState({
			...state,
			aggressionFilterText: !state.aggressionFilterText,
			aggressionReplacementText: false,
			aggressionShowOriginalText: false,
		});
	};

	const handleToggleReplacementText = () => {
		let aggressionShowOriginalTextNewValue =
			state.aggressionShowOriginalText;

		if (state.aggressionReplacementText) {
			aggressionShowOriginalTextNewValue = false;
		}

		chrome.storage.sync.set<T_AggressionState>({
			aggressionFilterText: false,
			aggressionReplacementText:
				!state.aggressionReplacementText,
			aggressionShowOriginalText:
				aggressionShowOriginalTextNewValue,
		});

		setState({
			...state,
			aggressionFilterText: false,
			aggressionReplacementText:
				!state.aggressionReplacementText,
			aggressionShowOriginalText:
				aggressionShowOriginalTextNewValue,
		});
	};

	const handleToggleShowOriginalText = () => {
		chrome.storage.sync.set({
			aggressionShowOriginalText:
				!state.aggressionShowOriginalText,
		});

		setState({
			...state,
			aggressionShowOriginalText:
				!state.aggressionShowOriginalText,
		});
	};

	const handleToggleFilterImages = () => {
		chrome.storage.sync.set({
			aggressionFilterImages: !state.aggressionFilterImages,
		});

		setState({
			...state,
			aggressionFilterImages: !state.aggressionFilterImages,
		});
	};

	const ref = useRef<HTMLDivElement>(null);

	const props = useSpring({
		delay: 100,
		from: {
			height:
				!state?.aggressionEnabled || ref.current
					? "0px"
					: "150px",
		},
		to: {height: state?.aggressionEnabled ? "150px" : "0px"},
	});

	if (!state) {
		return;
	}

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<div>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-stone-900 text-base font-black">
						Анализ агрессии
					</h1>
					<Toggle
						value={state.aggressionEnabled}
						setValue={
							handleToggleAggressionEnabled
						}
						bg="dark"
					/>
				</div>
				<animated.nav
					style={props}
					ref={ref}
					className="pl-4 flex flex-col gap-4 overflow-hidden"
				>
					<Option
						label="Фильтровать мат"
						value={
							state.aggressionFilterText
						}
						onToggle={
							handleToggleFilterText
						}
						disabled={
							!state.aggressionEnabled
						}
					/>
					<Option
						label="Заменять агрессию"
						value={
							state.aggressionReplacementText
						}
						onToggle={
							handleToggleReplacementText
						}
						disabled={
							!state.aggressionEnabled
						}
					/>
					<Option
						label="Отображать оригинальный текст"
						value={
							state.aggressionShowOriginalText
						}
						onToggle={
							handleToggleShowOriginalText
						}
						disabled={
							!state.aggressionEnabled ||
							!state.aggressionReplacementText
						}
						sub={true}
					/>
					<Option
						label="Фильтровать изображения"
						value={
							state.aggressionFilterImages
						}
						onToggle={
							handleToggleFilterImages
						}
						disabled={
							!state.aggressionEnabled
						}
					/>
				</animated.nav>
			</div>
			{state.aggressionEnabled &&
				stats &&
				stats.wordsReplaced > 0 &&
				stats.wordsAnalyzed > 0 && (
					<div className="flex flex-col gap-4 items-center">
						<SiteSecurityInfo
							aggressive={
								Math.round(
									stats.wordsReplaced *
										1.5,
								) /
									stats.wordsAnalyzed >
								AGGRESSIVE_THRESHOLD
							}
						/>
						<InfoBlockAggressive
							replaced={Math.round(
								stats.wordsReplaced *
									1.5,
							)}
							total={
								stats.wordsAnalyzed
							}
						/>
					</div>
				)}
		</div>
	);
};

export default Aggression;
