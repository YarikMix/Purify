import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useEffect, useRef, useState} from "react";
import KeyboardTooltip from "@pages/popup/components/KeyboardTooltip/KeyboardTooltip";
import InfoBlockSimplify from "@pages/popup/components/InfoBlockSimplify/InfoBlockSimplify";
import {DEFAULT_SIMPLIFY_STATE, T_SimplifyState, T_Stats} from "@src/types";
import {animated, useSpring} from "react-spring";

export const Simplify = () => {
	const [state, setState] = useState<T_SimplifyState>(null);

	const [stats, setStats] = useState<T_Stats>(null);

	useEffect(() => {
		chrome.storage.sync.get<T_SimplifyState>(
			DEFAULT_SIMPLIFY_STATE,
			(state) => {
				setState(state);
				setStats(state.simplifyStats);
			},
		);

		chrome.storage.onChanged.addListener((updatedState) => {
			if ("simplifyStats" in updatedState) {
				setStats(updatedState.simplifyStats.newValue);
			}
		});
	}, []);

	const handleToggleSimplifyEnabled = () => {
		chrome.storage.sync.set({
			simplifyEnabled: !state.simplifyEnabled,
			simplifyDynamic: !state.simplifyEnabled,
		});

		setState({
			...state,
			simplifyEnabled: !state.simplifyEnabled,
			simplifyDynamic: !state.simplifyEnabled,
		});
	};

	const handleToggleSimplifyDynamic = () => {
		chrome.storage.sync.set({
			simplifyDynamic: !state.simplifyDynamic,
		});

		setState({
			...state,
			simplifyDynamic: !state.simplifyDynamic,
		});
	};

	const ref = useRef<HTMLDivElement>(null);

	const props = useSpring({
		delay: 50,
		from: {
			height:
				!state?.simplifyEnabled || ref.current
					? "0px"
					: "75px",
		},
		to: {height: state?.simplifyEnabled ? "75px" : "0px"},
	});

	if (!state) {
		return;
	}

	return (
		<div className="flex flex-col gap-8 justify-between w-full h-full">
			<div>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-stone-900 text-base font-black">
						Упрощение текста
					</h1>
					<Toggle
						bg="dark"
						value={state.simplifyEnabled}
						setValue={
							handleToggleSimplifyEnabled
						}
					/>
				</div>
				<animated.nav
					style={props}
					ref={ref}
					className="pl-4 flex flex-col gap-4 overflow-hidden"
				>
					<div className="flex justify-between items-center">
						<span className="text-stone-900 text-base">
							На всей странице
						</span>
						<Toggle
							bg="dark"
							value={
								state.simplifyDynamic
							}
							setValue={
								handleToggleSimplifyDynamic
							}
						/>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-stone-900 text-base">
							В выделенном тексте
						</span>
						<div className="text-base">
							<KeyboardTooltip
								keys={["G"]}
							/>
						</div>
					</div>
				</animated.nav>
			</div>
			{state.simplifyEnabled &&
				stats &&
				stats.wordsReplaced > 0 &&
				stats.wordsAnalyzed > 0 && (
					<div className="flex w-full justify-center">
						<InfoBlockSimplify
							replaced={
								stats.wordsReplaced
							}
							total={
								stats.wordsAnalyzed
							}
						/>
					</div>
				)}
		</div>
	);
};

export default Simplify;
