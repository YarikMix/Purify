import Toggle from "@pages/popup/components/Toggle/Toggle";
import {animated, useSpring} from "react-spring";
import Option from "@pages/popup/components/Option/Option";
import React, {useRef} from "react";

const Video = () => {
	const [enabled, setEnabled] = React.useState(false);

	const [disabledAutoplay, setDisabledAutoplay] = React.useState(false);

	const [aggressionCheck, setAggressionCheck] = React.useState(false);

	const ref = useRef<HTMLDivElement>(null);

	const props = useSpring({
		delay: 100,
		from: {
			height: !enabled || ref.current ? "0px" : "100px",
		},
		to: {height: enabled ? "100px" : "0px"},
	});

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<div>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-stone-900 text-base font-black">Анализ видео</h1>
					<Toggle value={enabled} setValue={setEnabled} bg="dark" />
				</div>
				<animated.nav style={props} ref={ref} className="pl-4 flex flex-col gap-4 overflow-hidden">
					<Option
						label="Проверка на агрессию"
						value={aggressionCheck}
						onToggle={setAggressionCheck}
						disabled={!enabled}
					/>
					<Option
						label="Отключить автовоспроизведение"
						value={disabledAutoplay}
						onToggle={setDisabledAutoplay}
						disabled={!enabled}
					/>
				</animated.nav>
			</div>
		</div>
	);
};

export default Video;
