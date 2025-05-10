import Toggle from "@pages/popup/components/Toggle/Toggle";
import React from "react";
import useAppState from "@pages/popup/hooks/useAppState";

const Video = () => {
	const [state, setState] = useAppState();

	const toggleVideoAnalyzeEnabled = () => {
		setState({
			videoEnabled: !state.videoEnabled,
		});
	};

	if (!state) {
		return null;
	}

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<div>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-stone-900 text-base font-black">Анализ видео</h1>
					<Toggle value={state.videoEnabled} setValue={toggleVideoAnalyzeEnabled} bg="dark" />
				</div>
			</div>
		</div>
	);
};

export default Video;
