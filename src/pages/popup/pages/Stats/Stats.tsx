import React from "react";
import {AGGRESSIVE_THRESHOLD} from "@src/utils/consts";
import SiteRatingBlock from "@pages/popup/components/SiteInfoSummary/SiteRatingBlock";
import InfoBlockAggressive from "@pages/popup/components/InfoBlockAggressive/InfoBlockAggressive";
import useAppState from "@pages/popup/hooks/useAppState";
import SiteSecurityInfo from "@pages/popup/components/SiteSecurityInfo/SiteSecurityInfo";

const Stats = () => {
	const [state] = useAppState();

	if (!state) {
		return;
	}

	return (
		<div className="flex flex-col justify-between items-center gap-8 w-full h-full px-3">
			<SiteRatingBlock />
			{state.aggressionEnabled && state.aggressionStats.wordsReplaced > 0 && state.aggressionStats.wordsAnalyzed > 0 && (
				<div className="flex flex-col gap-4 items-center w-full">
					<SiteSecurityInfo
						aggressive={
							Math.round(state.aggressionStats.wordsReplaced) /
								state.aggressionStats.wordsAnalyzed >
							AGGRESSIVE_THRESHOLD
						}
					/>
					<InfoBlockAggressive
						replaced={Math.round(state.aggressionStats.wordsReplaced)}
						total={state.aggressionStats.wordsAnalyzed}
					/>
				</div>
			)}
		</div>
	);
};

export default Stats;
