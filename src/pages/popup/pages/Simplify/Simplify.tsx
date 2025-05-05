import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useEffect, useRef, useState} from "react";
import KeyboardTooltip from "@pages/popup/components/KeyboardTooltip/KeyboardTooltip";
import InfoBlockSimplify from "@pages/popup/components/InfoBlockSimplify/InfoBlockSimplify";
import {T_SimplifyState, T_Stats} from "@src/utils/types";
import {animated, useSpring} from "react-spring";
import {DEFAULT_SIMPLIFY_STATE} from "@src/utils/state";
import {Dropdown} from "@pages/popup/components/Dropdown/Dropdown";

export const Simplify = () => {
	const [state, setState] = useState<T_SimplifyState>(null);

	const [stats, setStats] = useState<T_Stats>(null);

	useEffect(() => {
		chrome.storage.sync.get<T_SimplifyState>(DEFAULT_SIMPLIFY_STATE, (state) => {
			setState(state);
			setStats(state.simplifyStats);
		});

		chrome.storage.onChanged.addListener((updatedState) => {
			if ("simplifyStats" in updatedState) {
				setStats(updatedState.simplifyStats.newValue);
			}
		});
	}, []);

	const handleToggleSimplifyEnabled = () => {
		chrome.storage.sync.set({
			simplifyEnabled: !state.simplifyEnabled,
		});

		setState({
			...state,
			simplifyEnabled: !state.simplifyEnabled,
		});
	};

	const ref = useRef<HTMLDivElement>(null);

	const props = useSpring({
		delay: 50,
		from: {
			height: !state?.simplifyEnabled || ref.current ? "0px" : "175px",
		},
		to: {height: state?.simplifyEnabled ? "175px" : "0px"},
	});

	if (!state) {
		return;
	}

	return (
		<div className="flex flex-col gap-8 justify-between w-full h-full">
			<div>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-stone-900 text-base font-black">Упрощение текста</h1>
					<Toggle bg="dark" value={state.simplifyEnabled} setValue={handleToggleSimplifyEnabled} />
				</div>
				<animated.nav style={props} ref={ref} className="pl-4 flex flex-col gap-4 overflow-hidden">
					<div className="flex justify-between items-center">
						<span className="text-stone-900 text-base">Режим работы</span>
						<Dropdown
							values={["На всей странице", "В выделенном тексте"]}
							selectedValue={state.simplifyDynamic ? "На всей странице" : "В выделенном тексте"}
							setValue={(value) => {
								chrome.storage.sync.set({
									simplifyDynamic: value == "На всей странице",
								});

								setState({...state, simplifyDynamic: value == "На всей странице"});
							}}
						/>
					</div>
					{!state.simplifyDynamic && (
						<div className="flex justify-between items-center">
							<span className="text-stone-900 text-base">Горячая клавиша</span>
							<div className="text-base">
								<KeyboardTooltip keys={["G"]} />
							</div>
						</div>
					)}
				</animated.nav>
			</div>
			{state.simplifyEnabled && stats && stats.wordsReplaced > 0 && stats.wordsAnalyzed > 0 && (
				<div className="flex w-full justify-center">
					<InfoBlockSimplify replaced={stats.wordsReplaced} total={stats.wordsAnalyzed} />
				</div>
			)}
		</div>
	);
};

export default Simplify;
