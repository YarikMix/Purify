import {T_AggressionState, T_AppState, T_SimplifyState, T_VideoState} from "@src/utils/types";

export const DEFAULT_AGGRESSION_STATE: T_AggressionState = {
	agreement: false,
	aggressionEnabled: false,
	aggressionFilterText: false,
	aggressionFilterImages: false,
	aggressionReplacementText: false,
	aggressionShowOriginalText: false,
	aggressionStats: {
		wordsReplaced: 0,
		wordsAnalyzed: 0,
	},
	aggressionQueue: {
		sended: 0,
		processed: 0,
	},
};

export const DEFAULT_SIMPLIFY_STATE: T_SimplifyState = {
	simplifyEnabled: false,
	simplifyDynamic: false,
	simplifyProcessing: false,
	simplifyStats: {
		wordsReplaced: 0,
		wordsAnalyzed: 0,
	},
	simplifyQueue: {
		sended: 0,
		processed: 0,
	},
};

export const DEFAULT_VIDEO_STATE: T_VideoState = {
	videoEnabled: false,
};

export const DEFAULT_APP_STATE: T_AppState = {
	ignoreList: [],
	...DEFAULT_AGGRESSION_STATE,
	...DEFAULT_SIMPLIFY_STATE,
	...DEFAULT_VIDEO_STATE,
};
